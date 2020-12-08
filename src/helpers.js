import { StoragePlugin, TrackingPlugin, SettingsPlugin } from './pbs/plugins';
import { SafeScaleManager } from 'springroll';

export const addPlugins = (scope, opts, storage) => {
  const { springRoll } = opts;
  const { defaultDimensions, safeDimensions } = scope;
  scope.springRoll = springRoll;

  // PBS Pause subscription
  springRoll.state.pause.subscribe((value) => {
    console.log('SpringRoll paused', value);
    if (value) {
      scope.controller.pauseGame();
    } else {
      scope.controller.resumeGame();
    }
  });

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
  scope.settings.plugin = new SettingsPlugin(springRoll);
};
