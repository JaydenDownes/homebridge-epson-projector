const { Accessory, Service, Characteristic, uuid } = require('homebridge');
const EpsonProjectorAccessory = require('./EpsonProjectorAccessory');

class EpsonProjectorPlatform {
  constructor(log, config, api) {
    this.log = log;
    this.config = config;
    this.api = api;
    this.accessories = [];

    if (api) {
      this.api.on('didFinishLaunching', this.didFinishLaunching.bind(this));
    }
  }

  didFinishLaunching() {
    if (this.config.projectors && this.config.projectors instanceof Array) {
      this.config.projectors.forEach(projectorConfig => {
        this.addAccessory(projectorConfig);
      });
    }
  }

  addAccessory(projectorConfig) {
    const uuidGen = uuid.generate(`homebridge:epson-projector:${projectorConfig.name}`);
    const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuidGen);

    if (existingAccessory) {
      this.log(`Restoring existing accessory from cache: ${existingAccessory.displayName}`);
      existingAccessory.context = projectorConfig;
      new EpsonProjectorAccessory(this.log, projectorConfig, existingAccessory, this.api);
    } else {
      this.log(`Adding new accessory: ${projectorConfig.name}`);
      const accessory = new Accessory(projectorConfig.name, uuidGen);
      accessory.context = projectorConfig;
      new EpsonProjectorAccessory(this.log, projectorConfig, accessory, this.api);
      this.api.registerPlatformAccessories('homebridge-epson-projector', 'EpsonProjectorPlatform', [accessory]);
    }
  }

  configureAccessory(accessory) {
    this.accessories.push(accessory);
  }
}

module.exports = EpsonProjectorPlatform;
