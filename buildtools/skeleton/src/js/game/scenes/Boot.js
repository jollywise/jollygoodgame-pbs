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
    this.scene.start(this.loadKey, { booted: true });
  }
}
