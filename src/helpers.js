import { StoragePlugin, TrackingPlugin, SettingsPlugin, CaptionsPlugin } from './pbs/plugins';
import { SafeScaleManager } from 'springroll';

export const addPlugins = (scope, springRoll, storage, defaults) => {
  const { defaultDimensions, safeDimensions } = scope;
  scope.springRoll = springRoll;

  // PBS Scaling
  const onWindowResize = (opts) => {
    // https://github.com/SpringRoll/Springroll-Seed/blob/templates/phaser3/src/SpringrollGame.js
    if (!scope.viewportController) {
      return;
    }
    /*
     * Adjusting the canvas css screws up pointer events - so reverting to phaser scaling
     * and sending through the springroll scale options to viewportController
     */

    // const { scaleRatio } = opts;
    // scope.canvas.style.width = `${defaultDimensions.width * scaleRatio}px`;
    // scope.canvas.style.height = `${defaultDimensions.height * scaleRatio}px`;

    // pass on the springroll scale values to viewportController
    scope.viewportController.updateViewportCanvasBounds(opts);
  };

  const options = {
    width: defaultDimensions.width,
    height: defaultDimensions.height,
    safeWidth: safeDimensions.width || defaultDimensions.width,
    safeHeight: safeDimensions.height || defaultDimensions.height,
    callback: onWindowResize,
  };

  if (scope.isBooted) {
    scope.safeScale = new SafeScaleManager(options);
  } else {
    scope.events.once('boot', () => {
      scope.safeScale = new SafeScaleManager(options);
    });
  }

  // PBS Saves
  storage.plugin = new StoragePlugin(springRoll);
  scope.saves.storage = storage;

  // PBS Tracking
  scope.tracking.plugin = new TrackingPlugin(springRoll, true);

  // PBS Settings
  scope.settings.plugin = new SettingsPlugin(springRoll, defaults.soundVolume);
  // restores default volume mute state
  scope.settings.audio = defaults.soundVolume === 1 ? true : false;

  // Captions
  scope.captions = new CaptionsPlugin(springRoll, defaults.captionsMuted);
};
