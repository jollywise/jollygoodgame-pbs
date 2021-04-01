// eslint-disable-next-line no-unused-vars
import { getConfigBase } from '@jollywise/jollygoodgame';

export const getConfigPBS = (opts = {}) => {
  const conf = getConfigBase(opts);

  conf.scale = {
    mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    parent: conf.parent,
    width: conf.width,
    height: conf.height,
  };

  return conf;
};

export const getConfigSpringroll = () => {
  return {
    features: {
      captions: true,
      vo: true,
      music: true,
      sfx: true,
    },
  };
};
