/* __SHORTCUTS_ENABLED__:false */

import './../scss/main.scss';
import App from 'App';
import Boot from 'game/scenes/Boot';
import Load from 'game/scenes/Load';
import { dOMReady, getConfigBase } from '@jollywise/jollygoodgame';

let SHORTCUTS_ENABLED = false;
if (__SHORTCUTS_ENABLED__) {
  // minifier will drop this condition if __SHORTCUTS_ENABLED__ = false
  SHORTCUTS_ENABLED = true;
}
const paths = { base: './', assets: 'assets/' };
const gameConfig = getConfigBase();

dOMReady(() => {
  const config = { ...gameConfig, scene: [Boot, Load] };
  new App({ config, paths });
});
