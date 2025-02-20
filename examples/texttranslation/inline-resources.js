import phaser from 'phaser/src/phaser.js';
import TextTranslationPlugin from '../../plugins/texttranslation-plugin.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.translation.on('languageChanged', function (lng) {
            console.log(`Change language to '${lng}'`)
        })

        this.translation.initI18Next(this, {
            resources: {
                'en': {
                    'ui': {
                        'save': 'Save'
                    }
                },
                'zh': {
                    'ui': {
                        'save': '儲存'
                    }
                },
            },
            lng: 'en',
            ns: 'ui'
        })
    }

    create() {
        var textObject = this.add.text(100, 300, '');
        textObject.translation = this.translation.add(textObject, {
            translationKey: 'save'
        });

        var bbCodeTextObject = this.add.rexBBCodeText(300, 300, '');
        bbCodeTextObject.translation = this.translation.add(bbCodeTextObject, {
            translationKey: 'save'
        });

        this.input.once('pointerdown', function () {
            this.translation.changeLanguage('zh');
        }, this)
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
        global: [
            {
                key: 'TextTranslation',
                plugin: TextTranslationPlugin,
                start: true,
                mapping: 'translation'  // Get TextTranslationPlugin via scene.translation
            },
            {
                key: 'BBCodeTextPlugin',
                plugin: BBCodeTextPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);