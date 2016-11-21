var playState = {

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //game.state.start('pausemenu');

        map = this.game.add.tilemap('map');
        map.addTilesetImage('tiles', 'minimap1', 'minimap2', 'zombies');
        map.setCollisionBetween(1, 99);

        layer = map.createLayer('level1');

        layer.resizeWorld();
        layer.wrap = true;

        walls = this.game.add.group();
        walls.enableBody = true;
        this.game.physics.enable(walls);

        kisten = this.game.add.group();
        kisten.enableBody = true;
        this.game.physics.enable(kisten);

        zombies = this.game.add.group();
        zombies.enableBody = true;

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);


        map.createFromObjects('ol1', 16, 'zombies', 0, true, false, zombies);


        walls.immovable = true;
        walls.moves = false;
        walls.setAll('body.immovable', 'body', true);

        kisten.immovable = false;
        kisten.moves = false;
        kisten.setAll('body.mass', 'body', 1);
        kisten.setAll('body.collideWorldBounds', true);


        console.log('Anzahl Wände: ' + walls.length);
        console.log('Anzahl Kisten: ' + kisten.length);

        sprite = this.game.add.sprite(50, 500, 'zombies');
        sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(sprite);

        spriteBot1 = this.game.add.sprite(50, 300, 'zombies');
        spriteBot1.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(spriteBot1);

        this.game.physics.arcade.enable(sprite, Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(zombies, Phaser.Physics.ARCADE);
        sprite.body.collideWorldBounds = false;

        zombies.callAll('animations.add', 'animations', 'zombieswalk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15], 10, true);
        zombies.callAll('animations.play', 'animations', 'zombieswalk');

        var walk = sprite.animations.add('walk');
        var walkBot = spriteBot1.animations.add('walk');


        PauseText = this.game.add.text(16, 600, 'Press "Backspace" for Pause Game', {fontSize: '32px', fill: '#000'});

        this.game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        cursors = this.game.input.keyboard.createCursorKeys();


        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(pausemenuState.togglePause, this);

    },

    BulletsSpriteBot1: function (bullets) {

        bullets.kill();

    },
    BulletsWall: function (bullets) {

        bullets.kill();

    },

    /*collectStar: function (player, stars) {

        console.log('stars');
        stars.kill();

        star += 1;
        StarText.text = 'Stars: ' + star;

    },*/


    update: function () {
        //  Collide the player and the coins with the maps
        //this.game.physics.arcade.collide(sprite, boxes, this.collectBox);
        //this.game.physics.arcade.overlap(sprite, cherrys, this.collectCherry);
        this.game.physics.arcade.collide(bullets, walls, this.BulletsWall);
        this.game.physics.arcade.collide(bullets, spriteBot1, this.BulletsSpriteBot1);
        this.game.physics.arcade.collide(sprite, walls);
        this.game.physics.arcade.collide(sprite, kisten);
        this.game.physics.arcade.collide(walls, kisten);

        spriteBot1.body.velocity.x = 0;
        spriteBot1.body.velocity.y = 0;
        this.game.physics.arcade.moveToObject(spriteBot1, sprite, 30);

        sprite.rotation = game.physics.arcade.angleToPointer(sprite);
        spriteBot1.rotation = game.physics.arcade.angleBetween(spriteBot1, sprite);

        this.moving = true;

        //Fix Moevement WASD, ex. S,D Parallel == Animation Stop!
        if (game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            sprite.x -= 1;
            //sprite.animations.play('walk', 10, true);
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            sprite.x += 1;
            //sprite.animations.play('walk', 10, true);
        }


        if (game.input.keyboard.isDown(Phaser.Keyboard.W))
        {
            sprite.y -= 1;
            //sprite.animations.play('walk', 10, true);
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.S))
        {
            sprite.y += 1;
            //sprite.animations.play('walk', 10, true);
        }

        // Wenn alle Tasten oben, dann stoppen
        if (!game.input.keyboard.isDown(Phaser.Keyboard.A)
        && !game.input.keyboard.isDown(Phaser.Keyboard.W)
        && !game.input.keyboard.isDown(Phaser.Keyboard.S)
        && !game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.moving = false;
        }



        if (this.moving) {
            sprite.animations.play('walk', 10, true);
            spriteBot1.animations.play('walk', 10, true);

        } else {
            sprite.animations.stop('walk', 10, true);
            spriteBot1.animations.play('walk', 10, true);
        }

        if (game.input.activePointer.isDown)
        {
            this.fire();
        }

        /* // Alt-Movement
        if (cursors.up.isDown)
        {
            this.game.physics.arcade.accelerationFromRotation(sprite.rotation, 4000, sprite.body.acceleration);
        }
        else
        {
            sprite.body.acceleration.set(0);
        }

        if (cursors.left.isDown)
        {
            sprite.body.angularVelocity = -100;
        }
        else if (cursors.right.isDown)
        {
            sprite.body.angularVelocity = 100;
        }
        else
        {
            sprite.body.angularVelocity = 0;
        }

    },*/

        if (sprite.body.y > 650) {
            game.state.start('gameover');
        }

    },

    fire: function() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToPointer(bullet, 200);
    }

}

};