import { AppBase } from '@jollywise/jollygoodgame';
import GameController from 'game/controller/GameController';

export default class App extends AppBase {
  constructor(opts) {
    super(opts);

    this.controller = new GameController({
      game: this,
    });
  }
}
