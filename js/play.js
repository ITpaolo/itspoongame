var playState = {

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //game.state.start('pausemenu');

        map = this.game.add.tilemap('map');
        map.addTilesetImage('desert', 'tiles', 'coin', 'crate', 'crate32', 'star', 'stone', 'explosion', 'standing-still', 'ZombieMove');
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

        cherrys = this.game.add.group();
        cherrys.enableBody = true;

        coins = this.game.add.group();
        coins.enableBody = true;

        crate = this.game.add.group();
        crate.enableBody = true;

        stars = this.game.add.group();
        stars.enableBody = true;

        stonebigs = this.game.add.group();
        stonebigs.enableBody = true;

        explosion = this.game.add.group();
        explosion.enableBody = true;

        standingstill = this.game.add.group();
        standingstill.enableBody = true;

        zombies = this.game.add.group();
        zombies.enableBody = true;

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);


        map.createFromObjects('ol1', 10, 'wall', 0, true, false, walls);
        map.createFromObjects('ol1', 31, 'cherry', 0, true, false, cherrys);
        map.createFromObjects('ol1', 60, 'coin', 0, true, false, coins);
        map.createFromObjects('ol1', 72, 'crate', 0, true, false, crate);
        map.createFromObjects('ol1', 32, 'kisten', 0, true, false, kisten);
        map.createFromObjects('ol1', 34, 'trap', 0, true, false, trap);
        map.createFromObjects('ol1', 62, 'star', 0, true, false, stars);
        map.createFromObjects('ol1', 73, 'stonebig', 0, true, false, stonebigs);
        map.createFromObjects('ol1', 74, 'explosion', 0, true, false, explosion);
        map.createFromObjects('ol1', 89, 'dude', 0, true, false, standingstill);
        map.createFromObjects('ol1', 90, 'zombies', 0, true, false, zombies);


        walls.immovable = true;
        walls.moves = false;
        walls.setAll('body.immovable', 'body', true);

        kisten.immovable = false;
        kisten.moves = false;
        kisten.setAll('body.mass', 'body', 1);
        kisten.setAll('body.collideWorldBounds', true);

        stonebigs.immovable = false;
        stonebigs.moves = false;
        stonebigs.setAll('body.mass', 'body', 1);
        stonebigs.setAll('body.collideWorldBounds', true);

        crate.immovable = false;
        crate.moves = false;
        crate.setAll('body.mass', 'body', 1);
        crate.setAll('body.collideWorldBounds', true);

        console.log('Anzahl Wände: ' + walls.length);
        console.log('Anzahl Kisten: ' + kisten.length);
        console.log('Anzahl Coins: ' + coins.length);
        console.log('Anzahl Kirschen: ' + cherrys.length);
        console.log('Anzahl crate: ' + crate.length);
        console.log('Anzahl star: ' + stars.length);
        console.log('Anzahl Stonebig: ' + stonebigs.length);

        sprite = this.game.add.sprite(50, 500, 'zombies');
        sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(sprite);

        spriteBot1 = this.game.add.sprite(50, 300, 'zombies');
        spriteBot1.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(spriteBot1);

        this.game.physics.arcade.enable(sprite, Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(zombies, Phaser.Physics.ARCADE);
        sprite.body.collideWorldBounds = false;

        coins.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
        coins.callAll('animations.play', 'animations', 'spin');

        explosion.callAll('animations.add', 'animations', 'explosions', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
        explosion.callAll('animations.play', 'animations', 'explosions');

        standingstill.callAll('animations.add', 'animations', 'walk', [0, 1, 2, 3, 4, 5], 10, true);
        standingstill.callAll('animations.play', 'animations', 'walk');

        zombies.callAll('animations.add', 'animations', 'zombieswalk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15], 10, true);
        zombies.callAll('animations.play', 'animations', 'zombieswalk');

        var walk = sprite.animations.add('walk');
        var walkBot = spriteBot1.animations.add('walk');


        CherryText = this.game.add.text(16, 8, 'Cherrys: 0', {fontSize: '32px', fill: '#000'});
        CoinText = this.game.add.text(16, 32, 'Coins: 0', {fontSize: '32px', fill: '#000'});
        StarText = this.game.add.text(16, 57, 'Stars: 0', {fontSize: '32px', fill: '#000'});
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
    collectCherry: function (player, cherrys) {

        console.log('cherry');
        cherrys.kill();
        cherry += 1;
        CherryText.text = 'Cherrys: ' + cherry;

    },
    collectCoin: function (player, coins) {

        console.log('Coins');
        coins.kill();

        coin += 1;
        CoinText.text = 'Coins: ' + coin;

    },
    collectStar: function (player, stars) {

        console.log('stars');
        stars.kill();

        star += 1;
        StarText.text = 'Stars: ' + star;

    },
    collectCrate: function (player, crate) {

        crate.kill();
    },

    update: function () {
        //  Collide the player and the coins with the maps
        //this.game.physics.arcade.collide(sprite, boxes, this.collectBox);
        this.game.physics.arcade.overlap(sprite, cherrys, this.collectCherry);
        this.game.physics.arcade.overlap(sprite, coins, this.collectCoin);
        this.game.physics.arcade.overlap(sprite, stars, this.collectStar);
        this.game.physics.arcade.overlap(sprite, crate, this.collectCrate);
        this.game.physics.arcade.collide(bullets, walls, this.BulletsWall);
        this.game.physics.arcade.collide(bullets, spriteBot1, this.BulletsSpriteBot1);
        this.game.physics.arcade.collide(sprite, walls);
        this.game.physics.arcade.collide(sprite, kisten);
        this.game.physics.arcade.collide(walls, kisten);
        this.game.physics.arcade.collide(sprite, crate);
        this.game.physics.arcade.collide(walls, crate);
        this.game.physics.arcade.collide(sprite, stonebigs);
        this.game.physics.arcade.collide(walls, stonebigs);

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