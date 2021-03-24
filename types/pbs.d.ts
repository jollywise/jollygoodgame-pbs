export const PBS_STATS_BASE;
export const SETTINGS_EVENTS;

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
  constructor(springRoll: any, debug?: boolean);
  addStats();
}

export class CaptionsPlugin {
  constructor(springRoll: any, initialMuteState: boolean);
  setData(data?: object)
  setMute(val: boolean)
  playCaption(name: string, time?: number, args?: object)
  stopCaption()
  destroy()
}
