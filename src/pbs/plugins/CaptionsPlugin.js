import { CaptionPlayer, HtmlRenderer, CaptionFactory } from 'springroll';

export class CaptionsPlugin {
  constructor(springRoll, initialMuteState) {
    this.springRoll = springRoll;
    this.supported = this.isSupported();

    if (this.supported) {
      springRoll.state.captionsMuted.subscribe((value) => {
        this.setMute(value)
      });
    }

    const captionsElement = document.getElementById('captions');
    this.captionPlayer = new CaptionPlayer({}, new HtmlRenderer(captionsElement));
    this.setMute(initialMuteState);
  }

  setData(data) {
    this.captionPlayer.captions = CaptionFactory.createCaptionMap(data);
  }

  setMute(val) {
    if (val === true) {
      this.captionPlayer.stop();
    }
    console.log('CaptionsPlugin.setMute', val);
    this.isMuted = val;
  }

  playCaption(name, time = 0, args = {}) {
    if (this.isMuted) {
      return;
    }
    this.captionPlayer.start(name, time, args);
  }

  stopCaption() {
    this.captionPlayer.stop();
  }

  update(time) {
    if (time) {
      this.captionPlayer.update(time);
    }
  }

  destroy() {
    this.springRoll = null;
    this.captionPlayer.captions = null;
    this.captionPlayer = null;
  }

  isSupported() {
    if (typeof this.springRoll !== 'undefined') {
      console.log('PBS CaptionsPlugin registered');
      return true;
    }
    console.warn('PBS CaptionsPlugin : SpringRoll not available');
    return false;
  }
}
