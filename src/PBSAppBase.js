import { AppBase, StorageGame } from '@jollywise/jollygoodgame';
import { addPlugins } from './helpers';

export default class PBSAppBase extends AppBase {
  constructor(opts) {
    super(opts);

    // saves initial settings from PBS, which is coming from saved localstorage state
    this.defaults = {
      captionsMuted: null,
      soundVolume: null,
      voVolume: null,
      musicVolume: null,
      sfxVolume: null,
    };
  }

  addSpringroll(springRoll) {
    addPlugins(this, springRoll, new StorageGame(''), this.defaults);
  }

  captionsMuted(value) {
    this.defaults.captionsMuted = value;
    this.captions && this.captions.setMute(value);
  }

  soundVolume(value) {
    this.defaults.soundVolume = value;
    this.settings.plugin && this.settings.plugin.soundVolume(value);
  }

  voVolume(value) {
    this.defaults.voVolume = value;
    this.settings.plugin && this.settings.plugin.voVolume(value);
  }

  musicVolume(value) {
    this.defaults.musicVolume = value;
    this.settings.plugin && this.settings.plugin.musicVolume(value);
  }

  sfxVolume(value) {
    this.defaults.sfxVolume = value;
    this.settings.plugin && this.settings.plugin.sfxVolume(value);
  }
}
