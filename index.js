const EpsonProjectorPlatform = require('./lib/EpsonProjectorPlatform');

module.exports = (homebridge) => {
  homebridge.registerPlatform('homebridge-epson-projector', 'EpsonProjectorPlatform', EpsonProjectorPlatform, true);
};
