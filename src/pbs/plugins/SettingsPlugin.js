import EventEmitter from 'eventemitter3';
import { SETTINGS_EVENTS } from '@jollywise/jollygoodgame';

export class SettingsPlugin extends EventEmitter {
  constructor(springRoll) {
    super();
    this.springRoll = springRoll;
    this.supported = this.isSupported();
  }

  set audio(audio) {
    if (this.supported) {
      // this.springRoll.setAudio(audio); // SpringRoll save
    }
  }

  set motion(motion) {
    if (this.supported) {
      // this.springRoll.setMotion(motion); // SpringRoll save
    }
  }

  set captions(captions) {
    if (this.supported) {
      // this.springRoll.setSubtitles(captions); // SpringRoll save
    }
  }

  showSettings() {
    if (!this.supported) {
      return false;
    }
    // return this.springRoll.showSettings(
    //   this.onSettingChanged.bind(this),
    //   this.onSettingsClosed.bind(this)
    // );
    return false;
  }

  onSettingChanged(key, value) {
    switch (key) {
      case 'audio':
        this.emit(SETTINGS_EVENTS.CHANGED, { key, value });
        break;
      case 'motion':
        this.emit(SETTINGS_EVENTS.CHANGED, { key, value });
        break;
      case 'subtitles':
        this.emit(SETTINGS_EVENTS.CHANGED, { key: 'captions', value });
        break;
    }
  }

  onSettingsClosed() {
    this.emit(SETTINGS_EVENTS.CLOSED);
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
