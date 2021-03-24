import './../scss/main.scss';
import App from 'App';
import Boot from 'game/scenes/Boot';
import Load from 'game/scenes/Load';
import { dOMReady, getConfigBase } from '@jollywise/jollygoodgame';

const paths = { base: './', assets: 'assets/' };
const gameConfig = getConfigBase();

dOMReady(() => {
  const config = { ...gameConfig, scene: [Boot, Load] };
  new App({ config, paths });
});
