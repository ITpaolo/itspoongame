var loadState = {
    preload: function() {

        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

        var tilemapdebug = this.game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'tmw_desert_spacing.png');
        this.game.load.image('cherry', 'cherry.png');
        this.game.load.spritesheet('coin', 'coin.png', 16, 16, 12);
        this.game.load.image('star', 'star.png');
        this.game.load.image('wall', 'wall.png');
        this.game.load.image('kisten', 'Crate32.png');
        this.game.load.image('crate', 'Crate64.png');
        this.game.load.image('trap', 'wall.png');
        this.game.load.image('stonebig', 'assets/stone.png');
        this.game.load.image('gameoverscreen', 'assets/gameover.png');
        this.game.load.image('imagepausemenu', 'assets/pausemenu.png');
        this.game.load.image('imagepausemenupic', 'assets/pausemenu.png');
        this.game.load.image('bullet', 'assets/bullet.png');
        this.game.load.spritesheet('dude', 'standing-still.png', 32, 32);
        this.game.load.spritesheet('explosion', 'explosion.png', 32, 32, 10);
        this.game.load.spritesheet('zombies', 'assets/zombies/zombieMove.png', 32, 32);

        this.game.load.image('startscreen', 'startgame.png');
        this.game.load.image('startgamebutton', 'startgamebutton.png');
        this.game.load.bitmapFont('carrier_command', 'fonts/carrier_command.png', 'fonts/carrier_command.xml');

    },

    create: function() {
        game.state.start('menu');

    }
};