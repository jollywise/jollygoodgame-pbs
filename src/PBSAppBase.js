import { AppBase, StorageGame } from '@jollywise/jollygoodgame';
import { addPlugins } from './helpers';
import SnapFloor from 'phaser/src/math/snap/SnapFloor';
import Size from 'phaser/src/structs/Size';

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

    this.patchScaler();
  }

  patchScaler() {
    console.log('Patching scaler to provide correct aspect ratio handling');
    // fix for keeping aspect ration between 4:3 and 7:3
    Phaser.Structs.Size.prototype.setSize = function (width, height) {
      if (width === undefined) {
        width = 0;
      }
      if (height === undefined) {
        height = width;
      }

      switch (this.aspectMode) {
        case Size.NONE:
          this._width = this.getNewWidth(SnapFloor(width, this.snapTo.x));
          this._height = this.getNewHeight(SnapFloor(height, this.snapTo.y));
          this.aspectRatio = this._height === 0 ? 1 : this._width / this._height;
          break;

        case Size.WIDTH_CONTROLS_HEIGHT:
          this._width = this.getNewWidth(SnapFloor(width, this.snapTo.x));
          this._height = this.getNewHeight(this._width * (1 / this.aspectRatio), false);
          break;

        case Size.HEIGHT_CONTROLS_WIDTH:
          {
            let w2 = this.getNewWidth(SnapFloor(width, this.snapTo.x));
            let h2 = this.getNewHeight(SnapFloor(height, this.snapTo.y));

            const sc0 = h2 / 720;
            w2 /= sc0;
            h2 /= sc0;

            let scale = 1;
            const safeW = 960;
            const safeH = 720;
            if (h2 < safeH) {
              scale = h2 / safeH;
            }
            if (w2 < safeW && scale > w2 / safeW) {
              scale = w2 / safeW;
            }

            if (w2 > 1680) {
              w2 = 1680;
            } else {
              w2 = Math.floor(w2);
            }
            if (h2 > 720) {
              h2 = 720;
            } else {
              h2 = Math.floor(h2);
            }

            w2 = Math.floor(w2 * scale);
            h2 = Math.floor(h2 * scale);

            if (w2 % 2 === 1) {
              w2++;
            }
            this._height = h2 * sc0;
            this._width = this._height * this.aspectRatio;
          }
          break;

        case Size.FIT:
          this.constrain(width, height, true);
          break;

        case Size.ENVELOP:
          this.constrain(width, height, false);
          break;
      }

      return this;
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
