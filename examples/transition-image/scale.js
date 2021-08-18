import 'phaser';
import TransitionImagePlugin from '../../plugins/transitionimage-plugin';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');
    }

    create() {
        var image = this.add.rexTransitionImage(400, 300, 'classroom', {
            duration: 500,

            onStart: function (frontImage, backImage, t, parent) {
                frontImage.setScale(1);
                backImage.setVisible(true);
            },

            onProgress: function (frontImage, backImage, t, parent) {
                frontImage.setScale(1 - t);
            },

            onComplete: function (frontImage, backImage, t, parent) {
                frontImage.setScale(1);
                backImage.setVisible(false);
            },
        })

        image.transit('road')
            .once('complete', function () {
                console.log('complete')
            })

    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexTransitionImage',
            plugin: TransitionImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);