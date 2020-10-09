import { Application } from 'springroll';

export const bootstrapPBS = ({ springRollConfig }) => {
  const promise = new Promise((resolve) => {
    const springRoll = new Application(springRollConfig);
    springRoll.state.ready.subscribe((isReady) => {
      if (isReady) {
        resolve({ success: true, springRoll: springRoll });
      }
    });
  });
  return promise;
};
