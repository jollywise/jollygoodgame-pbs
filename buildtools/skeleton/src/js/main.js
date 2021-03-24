import './../scss/main.scss';
import App from 'App';
import Boot from 'game/scenes/Boot';
import Load from 'game/scenes/Load';
import { dOMReady, VIEWPORT_TYPE } from '@jollywise/jollygoodgame';
import { bootstrapPBS, getConfigPBS, getConfigSpringroll } from '@jollywise/jollygoodgame-pbs';

const springRollConfig = getConfigSpringroll(); // add to the base stuff if needed
const paths = { base: './', assets: 'assets/' };
const gameConfig = getConfigPBS();

dOMReady(() => {
  const config = { ...gameConfig, scene: [Boot, Load] };
  const options = {
    shortcutsContainerId: 'shortcuts-container',
    viewPortType: VIEWPORT_TYPE.CANVAS_BOUNDS,
  };
  const app = new App({
    config,
    paths,
    options,
  });
  bootstrapPBS({ springRollConfig, app });
});
