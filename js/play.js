var playState = {

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //game.state.start('pausemenu');

        map = this.game.add.tilemap('map');
        map.addTilesetImage('floor', 'table', 'door', 'wall', 'box', 'paolo', 'alex', 'margus', 'marcel', 'philipp', 'tobias', 'screen');
        map.setCollisionBetween(1, 99);

        layer = map.createLayer('level1');

        layer.resizeWorld();
        layer.wrap = true;

        map.createFromObjects('OL1', 2147483658, 'paolo', 0, true, false, paolo);
        map.createFromObjects('OL1', 6, 'box', 0, true, false, box);
        map.createFromObjects('OL1', 2147483655, 'alex', 0, true, false, alex);
        map.createFromObjects('OL1', 8, 'marcel', 0, true, false, marcel);
        map.createFromObjects('OL1', 9, 'margus', 0, true, false, margus);
        map.createFromObjects('OL1', 11, 'philipp', 0, true, false, philipp);
        map.createFromObjects('OL1', 12, 'tobias', 0, true, false, tobias);
        map.createFromObjects('OL1', 13, 'screen', 0, true, false, screen);
        map.createFromObjects('OL1', 14, 'screenBack', 0, true, false, screenBack);


        //console.log('Anzahl Wände: ' + walls.length);

        spritePaolo = this.game.add.sprite(10, 10, 'paolo');
        spritePaolo.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(paolo);

        spriteAlex = this.game.add.sprite(50, 300, 'alex');
        spriteAlex.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(alex);

        spriteMarcel = this.game.add.sprite(50, 300, 'marcel');
        spriteMarcel.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(marcel);

        spriteMargus = this.game.add.sprite(50, 300, 'margus');
        spriteMargus.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(margus);

        spritePhilipp = this.game.add.sprite(50, 300, 'philipp');
        spritePhilipp.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(philipp);

        spriteTobias = this.game.add.sprite(50, 300, 'tobias');
        spriteTobias.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(tobias);

        this.game.physics.arcade.enable(spritePaolo, Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(spriteAlex, Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(spriteMarcel, Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(spriteMargus, Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(spritePhilipp, Phaser.Physics.ARCADE);
        this.game.physics.arcade.enable(spriteTobias, Phaser.Physics.ARCADE);
        spritePaolo.body.collideWorldBounds = false;

        /*zombies.callAll('animations.add', 'animations', 'zombieswalk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15], 10, true);
         zombies.callAll('animations.play', 'animations', 'zombieswalk');

         var walk = sprite.animations.add('walk');
         var walkBot = spriteBot1.animations.add('walk');


         PauseText = this.game.add.text(16, 600, 'Press "Backspace" for Pause Game', {fontSize: '32px', fill: '#000'});
         */
        this.game.camera.follow(spritePaolo, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        cursors = this.game.input.keyboard.createCursorKeys();


        /*spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
         spaceKey.onDown.add(pausemenuState.togglePause, this);*/

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
        this.game.physics.arcade.collide(layer, paolo);
        this.game.physics.arcade.collide(paolo, alex);
        this.game.physics.arcade.collide(paolo, margus);
        this.game.physics.arcade.collide(paolo, marcel);
        this.game.physics.arcade.collide(paolo, philipp);
        this.game.physics.arcade.collide(paolo, tobias);
        /*
         spriteBot1.body.velocity.x = 0;
         spriteBot1.body.velocity.y = 0;
         this.game.physics.arcade.moveToObject(spriteBot1, sprite, 30);

         sprite.rotation = game.physics.arcade.angleToPointer(sprite);
         spriteBot1.rotation = game.physics.arcade.angleBetween(spriteBot1, sprite);

         this.moving = true;

         //Fix Moevement WASD, ex. S,D Parallel == Animation Stop!
         if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
         sprite.x -= 1;
         //sprite.animations.play('walk', 10, true);
         }

         if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
         sprite.x += 1;
         //sprite.animations.play('walk', 10, true);
         }


         if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
         sprite.y -= 1;
         //sprite.animations.play('walk', 10, true);
         }

         if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
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

         if (game.input.activePointer.isDown) {
         this.fire();
         }
         */

        if (cursors.up.isDown) {
            this.game.physics.arcade.accelerationFromRotation(spritePaolo.rotation, 4000, spritePaolo.body.acceleration);
        }
        else {
            spritePaolo.body.acceleration.set(0);
        }

        if (cursors.left.isDown) {
            spritePaolo.body.angularVelocity = -100;
        }
        else if (cursors.right.isDown) {
            spritePaolo.body.angularVelocity = 100;
        }
        else {
            spritePaolo.body.angularVelocity = 0;
        }

    }

    /*
     fire: function () {

     if (game.time.now > nextFire && bullets.countDead() > 0) {
     nextFire = game.time.now + fireRate;

     var bullet = bullets.getFirstDead();

     bullet.reset(sprite.x - 8, sprite.y - 8);

     game.physics.arcade.moveToPointer(bullet, 200);
     }

     }*/

};