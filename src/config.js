// eslint-disable-next-line no-unused-vars
import { getConfigBase } from '@jollywise/jollygoodgame';

export const getConfigPBS = (opts) => {
  const conf = getConfigBase(opts);

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
}
