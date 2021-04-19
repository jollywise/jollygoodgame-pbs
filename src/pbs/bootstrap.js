import { Application, Debugger } from 'springroll';
import { GoogleAnalytics } from 'springroll-google-analytics-plugin';
import { LoggingPanel } from 'springroll-logging-panel-plugin';

export const bootstrapPBS = ({ springRollConfig, app }) => {
  const promise = new Promise((resolve) => {
    Debugger.minLevel('GENERAL');
    Debugger.enable(__DEBUG__);
    if (__DEBUG__) {
      Application.uses(new LoggingPanel());
    }
    Application.uses(new GoogleAnalytics());
    const springRoll = new Application(springRollConfig);

    springRoll.state.ready.subscribe((isReady) => {
      if (isReady) {
        console.log('SpringRoll initialised');
        app.addSpringroll(springRoll);

        // https://projects.pbs.org/bitbucket/projects/NC/repos/road-trip/pull-requests/16
        // if the game is being hosted inside of a springroll container, disable Phaser's auto-pause functionality for
        // audio, since it interferes with the blur/focus cycle of the container
        app.sound.pauseOnBlur = false;

        resolve({ success: true, springRoll: springRoll });
      }
    });

    // PBS Pause subscription
    springRoll.state.pause.subscribe((value) => {
      console.log('SpringRoll paused', value);
      if (value) {
        app.controller.pauseGame();
      } else {
        app.controller.resumeGame();
      }
    });

    // PBS Captions Muted subscription
    springRoll.state.captionsMuted.subscribe((value) => {
      console.log('SpringRoll captionsMuted', value);
      app.captionsMuted(value);
    });

    springRoll.state.soundVolume.subscribe((value) => {
      console.log('SpringRoll soundVolume', value);
      app.soundVolume(value);
    });

    springRoll.state.voVolume.subscribe((value) => {
      console.log('SpringRoll voVolume', value);
      app.voVolume(value);
    });

    springRoll.state.musicVolume.subscribe((value) => {
      console.log('SpringRoll musicVolume', value);
      app.musicVolume(value);
    });

    springRoll.state.sfxVolume.subscribe((value) => {
      console.log('SpringRoll sfxVolume', value);
      app.sfxVolume(value);
    });
  });
  return promise;
};
