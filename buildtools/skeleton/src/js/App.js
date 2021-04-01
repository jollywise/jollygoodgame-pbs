import { PBSAppBase } from '@jollywise/jollygoodgame-pbs';
import GameController from 'game/controller/GameController';

export default class App extends PBSAppBase {
  constructor(opts) {
    super(opts);

    this.controller = new GameController({
      game: this,
      forceRotation: 'none',
    });
  }
}
