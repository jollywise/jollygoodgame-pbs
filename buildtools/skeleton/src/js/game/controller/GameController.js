import { GameControllerBase, SceneControllerBase } from '@jollywise/jollygoodgame';
import { KEYS, SCENE_MAP } from 'game/constants/SceneConstants';
import PlayerModel from 'game/model/PlayerModel';

class GameController extends GameControllerBase {
  constructor(opts) {
    super(opts);
    const sceneManager = this.game.scene;
    const sceneController = new SceneControllerBase(sceneManager);
    sceneController.addSceneMap(SCENE_MAP);
    this.setSceneController(sceneController);
  }

  assetsLoaded() {
    super.assetsLoaded();
    const saveId = this.saves.setSaveId('mynewsave');
    const playerOptions = { slotId: 'slot' };
    this.playerModel = new PlayerModel(this.saves, saveId, { playerOptions });

    this.showWelcome();
  }

  showWelcome() {
    this.sceneController.switchScene(KEYS.Welcome, { data: {} });
  }
}

export default GameController;
