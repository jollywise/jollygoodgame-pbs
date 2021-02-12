export class TrackingPlugin {
  constructor(springRoll, debug = false) {
    this.plugin = springRoll.getPlugin('GoogleAnalytics');
    this.debug = debug;
    this.supported = this.isSupported();
    this.startTime = Date.now();
    this.screenName = '';
    this.stats = {};

    window.addEventListener('unload', () => {
      const duration = (Date.now() - this.startTime) / 1000;
      this.track({ action: 'Quit', value: duration });
    });
  }

  track(opts) {
    if (this.supported) {
      this.trackInternal(opts);
    }
  }

  setPage({ id }) {
    this.screenName = id;
  }

  addStats(stats) {
    this.stats = stats;
  }

  // internal
  trackInternal({ category = '', action = '', label = '', value = '' }) {
    if (category === '') {
      category = this.stats.APP_NAME;
    }

    if (label === '' && this.screenName !== '') {
      label = 'ScreenName_' + this.screenName;
    }

    this.debug &&
      console.log('[STATS] springRollGoogleAnalytics.event', category, action, label, value);

    this.plugin.event(category, action, label, value);
  }

  isSupported() {
    if (typeof this.plugin !== 'undefined' && this.plugin !== null) {
      console.log('PBS TrackingPlugin registered');
      return true;
    }
    console.warn('PBS TrackingPlugin : SpringRollGoogleAnalytics not available');
    return false;
  }

  destroy() {
    this.plugin = null;
    this.stats = null;
  }
}
