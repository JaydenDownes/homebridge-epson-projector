const { Service, Characteristic } = require('homebridge').hap;
const { PythonShell } = require('python-shell');
const path = require('path');

class EpsonProjectorAccessory {
  constructor(log, config, accessory, api) {
    this.log = log;
    this.config = config;
    this.accessory = accessory;
    this.api = api;

    this.service = new Service.Television(config.name, 'Television');
    this.service.setCharacteristic(Characteristic.ConfiguredName, config.name);
    this.service.setCharacteristic(Characteristic.SleepDiscoveryMode, Characteristic.SleepDiscoveryMode.ALWAYS_DISCOVERABLE);

    this.service.getCharacteristic(Characteristic.Active)
      .on('set', this.setPower.bind(this))
      .on('get', this.getPower.bind(this));

    this.volumeService = new Service.TelevisionSpeaker(config.name + ' Volume', 'Volume');
    this.volumeService
      .setCharacteristic(Characteristic.Active, Characteristic.Active.ACTIVE)
      .setCharacteristic(Characteristic.VolumeControlType, Characteristic.VolumeControlType.ABSOLUTE);

    this.volumeService.getCharacteristic(Characteristic.VolumeSelector)
      .on('set', this.setVolume.bind(this));

    this.inputService = new Service.InputSource(config.name + ' Source', 'Source');
    this.inputService.setCharacteristic(Characteristic.Identifier, 1)
      .setCharacteristic(Characteristic.ConfiguredName, 'HDMI1')
      .setCharacteristic(Characteristic.IsConfigured, Characteristic.IsConfigured.CONFIGURED)
      .setCharacteristic(Characteristic.InputSourceType, Characteristic.InputSourceType.HDMI);

    this.inputService.getCharacteristic(Characteristic.ConfiguredName)
      .on('set', this.setSource.bind(this));

    this.accessory.addService(this.service);
    this.accessory.addService(this.volumeService);
    this.accessory.addService(this.inputService);
  }

  setPower(state, callback) {
    const command = state === 1 ? 'TURN_ON' : 'TURN_OFF';
    PythonShell.run(path.join(__dirname, 'control_projector.py'), {
      args: [command, this.config.host]
    }, (err, result) => {
      if (err) {
        this.log(`Failed to set power: ${err}`);
        callback(err);
      } else {
        this.log(`Set power to ${state}`);
        callback(null, state);
      }
    });
  }

  getPower(callback) {
    PythonShell.run(path.join(__dirname, 'control_projector.py'), {
      args: ['GET_POWER', this.config.host]
    }, (err, result) => {
      if (err) {
        this.log(`Failed to get power state: ${err}`);
        callback(err);
      } else {
        const state = result && result[0] === 'ON' ? 1 : 0;
        this.log(`Current power state: ${state}`);
        callback(null, state);
      }
    });
  }

  setVolume(volume, callback) {
    const command = volume === Characteristic.VolumeSelector.INCREMENT ? 'VOL_UP' : 'VOL_DOWN';
    PythonShell.run(path.join(__dirname, 'control_projector.py'), {
      args: [command, this.config.host]
    }, (err, result) => {
      if (err) {
        this.log(`Failed to set volume: ${err}`);
        callback(err);
      } else {
        this.log(`Set volume to ${volume}`);
        callback(null, volume);
      }
    });
  }

  setSource(source, callback) {
    const command = `SET_SOURCE_${source}`;
    PythonShell.run(path.join(__dirname, 'control_projector.py'), {
      args: [command, this.config.host]
    }, (err, result) => {
      if (err) {
        this.log(`Failed to set source: ${err}`);
        callback(err);
      } else {
        this.log(`Set source to ${source}`);
        callback(null, source);
      }
    });
  }
}

module.exports = EpsonProjectorAccessory;
