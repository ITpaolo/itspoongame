var menuState = {
    create: function() {

        var startscreen = game.add.sprite(0,0,'startscreen');
        startscreen = game.add.bitmapText(170, 250, 'carrier_command','Game Name',32);
        startscreen = game.add.bitmapText(190, 350, 'carrier_command','Start Game',23);

        var image = game.add.sprite(326, 360, 'startgamebutton');
        image.anchor.set(0.5);
        image.inputEnabled = true;
        image.events.onInputDown.add(this.start, this);

    },

    start: function() {
        game.state.start('play');
    }

};