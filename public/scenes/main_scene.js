Main = {
  // Preload
  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  },

  // Create
  create() {
    // Background
    this.add.image(400, 300, "sky");
    this.physics.world.setBounds(
      0,
      0,
      game_width,
      game_height,
      true,
      true,
      false,
      true
    );

    // Inputs
    cursors = this.input.keyboard.createCursorKeys();

    // Platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 580, "ground").setScale(2).refreshBody();
    platforms.create(400, 420, "ground");
    platforms.create(50, 260, "ground");
    platforms.create(750, 260, "ground");
    platforms.create(400, 100, "ground");

    // Player
    player = this.physics.add.sprite(100, 450, "dude");
    player.setBounce(0);
    player.setCollideWorldBounds(true);

    // Stars
    stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 64 },
    });

    for (i = 0; i < 4; i++) {
      stars.create(280 + 64 * i, 240, "star");
    }

    stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.6, 0.8));
    });

    // Bombs
    bombs = this.physics.add.group({});

    // Interface
    scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "24px",
      fill: "#000",
    });

    // Collisions
    this.physics.add.collider(platforms, player);
    this.physics.add.collider(platforms, stars);
    this.physics.add.collider(platforms, bombs);
    this.physics.add.collider(player, stars, collectStar, null, this);
    this.physics.add.overlap(player, bombs, hitBomb, null, this);

    // Animations
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: this.anims.generateFrameNumbers("dude", { start: 4, end: 4 }),
      frameRate: 24,
    });
  },

  // Update
  update() {
    // Left and Right
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("turn");
    }

    // Jump
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-360);
    }
  },
};

// Helper Functions
function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText("Score: " + score);

  if (stars.countActive(true) === 0) {
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, child.y - 48, true, true);
    });

    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, "bomb");
    bomb.setScale(1.5);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}

function hitBomb(player, bomb) {
  if (player.x - bomb.x <= 10 && player.y - bomb.y <= 10) {
    this.physics.pause();
    player.setTint(0xff0000);
    gameOver = true;
  }
}
