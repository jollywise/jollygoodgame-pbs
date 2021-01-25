import EventEmitter from 'eventemitter3';
import { SETTINGS_EVENTS } from '@jollywise/jollygoodgame';

export class SettingsPlugin extends EventEmitter {
  constructor(springRoll) {
    super();
    this.springRoll = springRoll;
    this.supported = this.isSupported();

    if (this.supported) {
      springRoll.state.soundVolume.subscribe((value) => {
        this.emit(SETTINGS_EVENTS.CHANGED, { key: 'audio', value });
      });

      springRoll.state.voVolume.subscribe((value) => {
        this.emit(SETTINGS_EVENTS.CHANGED, { key: 'vo', value });
      });

      springRoll.state.musicVolume.subscribe((value) => {
        this.emit(SETTINGS_EVENTS.CHANGED, { key: 'music', value });
      });

      springRoll.state.sfxVolume.subscribe((value) => {
        this.emit(SETTINGS_EVENTS.CHANGED, { key: 'sfx', value });
      });

      // springRoll.state.captionsMuted.subscribe((value) => {
      //   this.emit(SETTINGS_EVENTS.CHANGED, { key: 'captions', value: !value });
      // });
    }
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
