import { LoadBase } from '@jollywise/jollygoodgame';
import { KEYS } from 'game/constants/SceneConstants';
import { FONTS } from 'game/constants/AppFonts';
import LoadScreen from 'game/display/ui/loading/LoadScreen';

export default class Load extends LoadBase {
  constructor() {
    super({ key: KEYS.Load, active: false, debug: false });
  }

  renderScene() {
    this.loadScreen = new LoadScreen(this);
  }

  preload() {
    super.preload({ fonts: FONTS.APP });
    const assetPack = require('../../../assets/assetpack.json');
    this.load.path = this.game.appUrls.resolveRelativeUrl('assets/');
    this.load.addPack(assetPack, 'preload');
    this.load.addPack(assetPack, 'base_audio');
    this.load.addPack(assetPack, 'ui');
    this.load.on('progress', this.loadScreen.setProgress, this.loadScreen);
  }

  loadComplete() {
    this.load.off('progress', this.loadScreen.setProgress, this.loadScreen);
    this.game.controller.assetsLoaded();
  }

  shutdown() {
    if (this.loadScreen) {
      this.loadScreen.destroy(true);
      this.loadScreen = null;
    }
  }
}
