import { StoragePlugin, TrackingPlugin, SettingsPlugin } from './pbs/plugins';
import { SafeScaleManager } from 'springroll';

export const addPlugins = (scope, opts, storage) => {
  const { springRoll } = opts;
  scope.springRoll = springRoll;

  springRoll.state.pause.subscribe((value) => {
    console.log('SpringRoll paused', value);
  });

  springRoll.state.soundVolume.subscribe((value) => {
    console.log('SpringRoll volume', value);
  });

  scope.events.once('boot', () => {
    scope.safeScale = new SafeScaleManager({
      width: scope.defaultWidth,
      height: scope.defaultHeight,
      safeWidth: scope.safeWidth || scope.defaultWidth,
      safeHeight: scope.safeHeight || scope.defaultHeight,
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
