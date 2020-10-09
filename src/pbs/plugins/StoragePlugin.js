export class StoragePlugin {
  constructor(springRoll) {
    this.springRoll = springRoll;
    this.supported = this.isSupported();
  }

  get key() {
    return null;
  }
  set key(val) {}

  deleteGameData(saveId) {
    if (this.springRoll) {
      this.springRoll.setGameData(saveId, JSON.stringify({}));
    } else {
      console.warn('SpringRoll not available');
    }
  }

  setGameData(saveId, value) {
    const savesString = JSON.stringify(value);
    if (this.springRoll) {
      this.springRoll.setGameData(saveId, savesString);
    } else {
      console.warn('SpringRoll not available');
    }
  }

  getGameData() {
    const settings = this.loadData();
    return settings.gameData || {};
  }

  // internal
  isSupported() {
    if (typeof this.springRoll !== 'undefined') {
      console.log('PBS StoragePlugin registered');
      return true;
    }
    console.warn('PBS TrackingPlugin : SpringRoll not available');
    return false;
  }

  loadData() {
    if (this.springRoll) {
      const settings = this.springRoll.getAllSettings();
      return settings || {};
    } else {
      console.warn('SpringRoll not available');
    }
    return {};
  }

  destroy() {
    this.springRoll = '';
    this.data = null;
  }
}
