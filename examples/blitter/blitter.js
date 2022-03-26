import phaser from 'phaser/src/phaser.js';
import Blitter from '../../plugins/gameobjects/blitter/Blitter.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var blitter = new Blitter(this, 400, 300, 'mushroom');
        this.add.existing(blitter);

        blitter
            .add(undefined, {
                x: -6, y: -6,
                angle: 45,
                alpha: 0.3,
                scale: 1.2,

                color: 0xff0000, tintEffect: 1
            })
            .add(undefined, {
                x: -3, y: -3,
                angle: 45,
                alpha: 0.8,
                scale: 1.2,

                color: 0xff0000, tintEffect: 1
            })
            .add(undefined, {
                x: 0, y: 0,
                angle: 45,
                scale: 1.2,
            })
    }

    update(time) { }
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
};

var game = new Phaser.Game(config);