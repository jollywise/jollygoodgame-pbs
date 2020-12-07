import { StoragePlugin, TrackingPlugin, SettingsPlugin } from './pbs/plugins';
import { SafeScaleManager } from 'springroll';

export const addPlugins = (scope, opts, storage) => {
  const { springRoll } = opts;
  const { defaultDimensions, safeDimensions } = scope;
  scope.springRoll = springRoll;

  springRoll.state.pause.subscribe((value) => {
    console.log('SpringRoll paused', value);
    if (value) {
      scope.controller.pauseGame();
    } else {
      scope.controller.resumeGame();
    }
  });

  scope.events.once('boot', () => {
    scope.safeScale = new SafeScaleManager({
      width: defaultDimensions.width,
      height: defaultDimensions.height,
      safeWidth: safeDimensions.width || defaultDimensions.width,
      safeHeight: safeDimensions.height || defaultDimensions.height,
      callback: (opts) => {
        console.log('Window scale changed', opts);
      },
    });
  });

  // PBS Saves
  storage.plugin = new StoragePlugin(springRoll);
  scope.saves.storage = storage;

  // PBS Tracking
  scope.tracking.plugin = new TrackingPlugin(springRoll, true);

  // PBS Settings
  scope.settings.plugin = new SettingsPlugin(springRoll);
};
