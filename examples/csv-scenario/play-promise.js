import phaser from 'phaser/src/phaser.js';
import CSVScenarioPlugin from '../../plugins/csvscenario-plugin.js';

var csvString =
    `0,print,hello
1,print,world`;

class ActionKlass extends Phaser.Events.EventEmitter {
    constructor(scene) {
        super();
        this.scene = scene;
    }

    // callbacks
    print(s) {
        console.log(s);
    }
}

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var scenario = this.plugins.get('rexCSVScenario').add(this);
        var myCmds = new ActionKlass(this);

        this.input.on('pointerup', function () {
            scenario.continue('click');
        });

        scenario
            .load(csvString, myCmds, {
                timeUnit: 'sec'
            })
            .playPromise()
            .then(function () {
                console.log('scenario complete')
            })

        // scenario.setTimeScale(0.5);
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
            key: 'rexCSVScenario',
            plugin: CSVScenarioPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);