import { BootBase } from '@jollywise/jollygoodgame';
import { KEYS } from 'game/constants/SceneConstants';
import { FONTS } from 'game/constants/AppFonts';

export default class Boot extends BootBase {
  constructor() {
    super({ key: KEYS.Boot, active: true, debug: false });
  }

  preload() {
    super.preload({ fonts: FONTS.BOOT });
    const assetPack = require('../../../assets/assetpack.json');
    this.load.path = this.game.appUrls.resolveRelativeUrl('assets/');
    this.load.addPack(assetPack, 'boot');
    this.load.addPack(assetPack, 'bootui');
  }

  loadComplete() {
    this.assetsReady = true;
  }

  update(time, delta) {
    time, delta;
    if (this.assetsReady && this.fontsReady) {
      this.allDone();
    }
  }

  allDone() {
    this.load.off('start', this.handleLoadStart);
    this.load.off('progress', this.handleLoadProgress);
    this.load.off('fileprogress', this.handleFileLoadProgress);
    this.load.off('loaderror', this.handleLoadError);
    this.load.off('complete', this.handleLoadComplete);

    this.scene.start(this.loadKey, { booted: true });
  }
}
