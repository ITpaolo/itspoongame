var loadState = {
    preload: function () {

        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

        var tilemapdebug = this.game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);

        this.game.load.image('floor', 'assets/floor.png');
        this.game.load.image('table', 'assets/table.png');
        this.game.load.image('door', 'assets/door.png');
        this.game.load.image('wall', 'assets/wall.png');
        this.game.load.image('box', 'assets/box.png');
        this.game.load.image('paolo', 'assets/Character/paolo.png', 32, 32);
        this.game.load.image('alex', 'assets/Character/alex.png', 32, 32);
        this.game.load.image('margus', 'assets/Character/margus.png', 32, 32);
        this.game.load.image('marcel', 'assets/Character/marcel.png', 32, 32);
        this.game.load.image('philipp', 'assets/Character/philipp.png', 32, 32);
        this.game.load.image('tobias', 'assets/Character/tobias.png', 32, 32);
        this.game.load.image('screen', 'assets/screen.png');

        // this.game.load.spritesheet('screenback', 'screenback.png', 32, 32);

        /*

         this.game.load.image('tobias', 'tobias.png', 32, 32);
        this.game.load.image('gameoverscreen', 'assets/gameover.png');
         this.game.load.image('imagepausemenu', 'assets/pausemenu.png');
         this.game.load.image('imagepausemenupic', 'assets/pausemenu.png');

         this.game.load.image('startscreen', 'startgame.png');
         this.game.load.image('startgamebutton', 'startgamebutton.png');
         this.game.load.bitmapFont('carrier_command', 'fonts/carrier_command.png', 'fonts/carrier_command.xml');

        */
    },

    create: function () {
        game.state.start('menu');

    }
};