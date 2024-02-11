// Environment
const game_width = 800;
const game_height = 600;
let score = 0;
let score_label;

// Game Config
const config = {
  type: Phaser.AUTO,
  width: game_width,
  height: game_height,
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
