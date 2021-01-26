import EventEmitter from 'eventemitter3';
import { SETTINGS_EVENTS } from '@jollywise/jollygoodgame';

export class SettingsPlugin extends EventEmitter {
  constructor(springRoll) {
    super();
    this.springRoll = springRoll;
    this.supported = this.isSupported();
  }

  soundVolume(value) {
    this.emit(SETTINGS_EVENTS.CHANGED, { key: 'audio', value });
  }
  voVolume(value) {
    this.emit(SETTINGS_EVENTS.CHANGED, { key: 'vo', value });
  }
  musicVolume(value) {
    this.emit(SETTINGS_EVENTS.CHANGED, { key: 'music', value });
  }
  sfxVolume(value) {
    this.emit(SETTINGS_EVENTS.CHANGED, { key: 'sfx', value });
  }

  showSettings() {
    return false;
  }

  isSupported() {
    if (typeof this.springRoll !== 'undefined') {
      console.log('PBS SettingsPlugin registered');
      return true;
    }
    console.warn('PBS SettingsPlugin : SpringRoll not available');
    return false;
  }
}
