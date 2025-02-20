import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';

const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var gridGraphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: COLOR_DARK,
                alpha: 1
            }
        });

        var board = this.rexBoard.add.board({
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 20,
            height: 18
        })
            .forEachTileXY(function (tileXY, board) {
                var points = board.getGridPoints(tileXY.x, tileXY.y, true);
                gridGraphics.strokePoints(points, true);
            }, this);

        board
            .setInteractive()
            .on('tiledown', function (pointer, tileXY) {
                Phaser.Actions.Call(board.tileZToChessArray(0), function (gameObject) {
                    gameObject.destroy();
                });

                if (!board.contains(tileXY.x, tileXY.y)) {
                    return;
                }

                this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_PRIMARY).setScale(0.7);
                var resultTileXYArray = board.getTileXYAtDirection(tileXY, [0, 2, 4], { end: 3 });
                var resultTileXY;
                for (var i = 0, cnt = resultTileXYArray.length; i < cnt; i++) {
                    resultTileXY = resultTileXYArray[i];
                    if (!board.contains(resultTileXY.x, resultTileXY.y)) {
                        continue;
                    }
                    this.rexBoard.add.shape(board, resultTileXY.x, resultTileXY.y, 0, COLOR_LIGHT).setScale(0.7);
                }
            }, this)

    }

    update() { }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 400,
        y: 100,
        cellWidth: 100,
        cellHeight: 50,
        type: 1
    });
    return grid;
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 50,
        y: 50,
        cellWidth: 36,
        cellHeight: 36,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

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
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        }]
    }
};

var game = new Phaser.Game(config);