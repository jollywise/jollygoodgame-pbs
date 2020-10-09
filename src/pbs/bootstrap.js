import { Application } from 'springroll';

export const bootstrapPBS = (opts) => {
  const promise = new Promise((resolve) => {
    const springRoll = new Application(opts);
    springRoll.state.ready.subscribe((isReady) => {
      if (isReady) {
        resolve({ success: true, springRoll: springRoll });
      }
    });
  });
  return promise;
};
