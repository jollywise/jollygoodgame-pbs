export class TrackingPlugin {
  constructor(springRoll, debug = false) {
    this.springRoll = springRoll;
    this.debug = debug;
    this.supported = this.isSupported();
  }

  track(opts) {
    if (this.supported) {
      this.trackInternal(opts);
    }
  }

  setPage(opts) {
    if (this.supported) {
      this.setPageInternal(opts);
    }
  }

  trackGameLoaded() {
    this.track(this.stats.GAME_LOADED, 'true');
  }

  addStats(stats) {
    this.stats = stats;
  }

  // internal
  trackInternal(actionName = '', actionType = '', params = {}) {
    // params.container = STATS.CONTAINER;
    this.debug && console.log('[STATS] springRoll.sendStatsEvent', actionName, actionType, params);
    // this.springRoll.sendStatsEvent(actionName, actionType, params);
  }

  setPageInternal({ id }) {
    this.debug && console.log('[STATS] springRoll.setStatsScreen', id);
    // this.springRoll.setStatsScreen(id);
  }

  isSupported() {
    if (typeof this.springRoll !== 'undefined') {
      console.log('PBS TrackingPlugin registered');
      return true;
    }
    console.warn('PBS TrackingPlugin : SpringRoll not available');
    return false;
  }

  destroy() {
    this.springRoll = '';
    this.stats = null;
  }
}
