import { CaptionPlayer, HtmlRenderer, CaptionFactory } from 'springroll';

export class CaptionsPlugin {
  constructor(initialMuteState, debug = false) {
    this.debug = debug;
    const captionsElement = document.getElementById('captions');
    this.captionPlayer = new CaptionPlayer({}, new HtmlRenderer(captionsElement));
    this.setMute(initialMuteState);
    console.log('PBS CaptionsPlugin created', this.captionPlayer);
  }

  setData(data) {
    console.log('CaptionsPlugin.setData', data);
    this.captionPlayer.captions = CaptionFactory.createCaptionMap(data);
  }

  setMute(val) {
    if (val === true) {
      this.captionPlayer.stop();
    }
    this.isMuted = val;
  }

  playCaption(name, time = 0, args = {}) {
    if (this.isMuted) {
      return;
    }
    console.log('playCaption', name, time, args);
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
    this.captionPlayer.captions = null;
    this.captionPlayer = null;
  }
}
