export const PBS_STATS_BASE;
export const SETTINGS_EVENTS;
export const SPRINGROLL_CONFIG_BASE;

export function bootstrapPBS(opts: object);

export class SettingsModel {
  constructor(opts: object);
}

export class Settings {
  constructor(springRoll: any, model: SettingsModel);
}

export class StoragePlugin {
  constructor(springRoll: any);
  key;
}

export class TrackingPlugin {
  constructor(springRoll: any, debug: boolean);
  addStats();
}
