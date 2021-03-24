export default class LoadScreen extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);
    scene.add.existing(this);

    const { x, y } = scene.game.centerPoint;

    this.add(scene.add.rectangle(840, 360, 1680, 720));
    this.add(scene.add.rectangle(x - 150, y - 15, 300, 30, 0x505050).setOrigin(0));
    this.loadBar = scene.add.rectangle(x - 150, y - 15, 300, 30, 0xcccccc).setOrigin(0);
    this.add(this.loadBar);

    this.setProgress(0);
  }

  setProgress(value) {
    this.loadBar.scaleX = Phaser.Math.Clamp(value, 0, 1);
  }

  destroy() {
    this.bg = null;
    this.loadTrack = null;
    this.loadBar = null;
    super.destroy(true);
  }
}
