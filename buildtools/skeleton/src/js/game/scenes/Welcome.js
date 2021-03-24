import { KEYS } from 'game/constants/SceneConstants';
import { SceneBase } from '@jollywise/jollygoodgame';
export default class Welcome extends SceneBase {
  constructor() {
    super({ key: KEYS.Welcome, active: false });
  }
  create() {
    super.create();
    this.add
      .text(840, 300, this.game.controller.copyModel.get('title_welcome'), {
        font: '64px sans-serif',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    this.add
      .text(840, 420, 'setup is successful', { font: '48px sans-serif', color: '#ffffff' })
      .setOrigin(0.5);
  }
}
