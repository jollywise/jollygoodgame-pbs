import { StoragePlugin, TrackingPlugin, SettingsPlugin } from './pbs/plugins';

export const addPlugins = (scope, opts, storage) => {
  const { springRoll } = opts;
  scope.springRoll = springRoll;

  // PBS Saves
  storage.plugin = new StoragePlugin(springRoll);
  scope.saves.storage = storage;

  // PBS Tracking
  scope.tracking.plugin = new TrackingPlugin(springRoll, true);

  // PBS Settings
  scope.settings.plugin = new SettingsPlugin(springRoll);
};
