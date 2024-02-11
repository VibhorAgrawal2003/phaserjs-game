// Environment
const width = 800;
const height = 600;
let score = 0;
let score_label;

// Game Config
const config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  scene: Main,
  parent: game_container,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 360 },
    },
  },
};

// Launch Game
const game = new Phaser.Game(config);
