## Introduction

Clamp game object inside target bounds.

- Author: Rex
- Arcade behavior of game object

## Live demos

- [Drag inside bounds](https://codepen.io/rexrainbow/pen/ExEKNaO)
- [Target bounds](https://codepen.io/rexrainbow/pen/oNqxYRL)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/bounds)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexboundsplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboundsplugin.min.js', true);
    ```
- Add bounds behavior
    ```javascript
    var bounds = scene.plugins.get('rexboundsplugin').add(gameObject, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import BoundsPlugin from 'phaser3-rex-plugins/plugins/bounds-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexBounds',
                plugin: BoundsPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add bounds behavior
    ```javascript
    var bounds = scene.plugins.get('rexBounds').add(gameObject, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import Bounds from 'phaser3-rex-plugins/plugins/bounds.js';
    ```
- Add bounds behavior
    ```javascript
    var bounds = new Bounds(gameObject, config);
    ```

### Create instance

```javascript
var bounds = scene.plugins.get('rexBounds').add(gameObject, {
    // target: undefined,
    // bounds: undefined,
    // enable: true,
    // alignMode: 0
});
```

- `target` :     
    - A game object : Update target bounds from this game object in each tick.
    - `undefined`, `null`, or `false` : Set target bounds in `bounds` parameter. Default behavior.
- `bounds` : Target bounds used when `target` is not a game object.
    - A [rectangle object](geom-rectangle.md)
    - An object :
        ```javascript
        {
            width: 0, height: 0,
            x: 0, y: 0,
            centerX: 0, centerY: 0,            
        }
        ```
        - `width`, `height` : Size of target bounds.
        - `x`, `y`, or `centerX`, `centerY` : Position of target bounds.
- `enable` :
    - `true` : Clamp game object at left/right/top/bottom bounds.
    - `false` : Don't clamp game object at any bound
    - An objecct : Set `true` to clamp at a bound 
        ```javascript
        {
            left: true,
            right: true,
            top: true,
            bottom: true
        }
        ```
- `alignMode` : 
    - `0`, or `'bounds'` : Align bounds of game object to target bound. Default behavior.
    - `1`, or `'origin'` : Set position of game object to target bound.

### Target game object

- Set
    ```javascript
    bounds.setBoundsTarget(gameObject);
    // bounds.boundsTarget = gameObject;
    ```
- Clear
    ```javascript
    bounds.setBoundsTarget();
    // bounds.boundsTarget = undefined;
    ```
- Get
    ```javascript
    var gameObject = bounds.boundsTarget;
    ```

### Target bounds

- Set
    ```javascript
    bounds.setBounds(bounds);
    ```
    - `bounds` : Target bounds used when `target` is not a game object.
        - A [rectangle](geom-rectangle.md)
        - An object :
            ```javascript
            {
                width: 0, height: 0,
                x: 0, y: 0,
                centerX: 0, centerY: 0,            
            }
            ```
            - `width`, `height` : Size of target bounds.
            - `x`, `y`, or `centerX`, `centerY` : Position of target bounds.
- Get
    ```javascript
    var rect = bounds.bounds;
    ```
    - `rect` : A [rectangle object](geom-rectangle.md)

### Enable

- Set
    - Enable all bounds
        ```javascript
        bounds.setEnable();
        //  bounds.setEnable(true);
        ```
    - Disable all bounds
        ```javascript
        bounds.setEnable(false);
        ```
    - Enable bounds via object
        ```javascript
        bounds.setEnable({
            left: true,
            right: true,
            top: true,
            bottom: true
        });
        ```
- Get
    ```javascript
    var enable = bounds.enable;
    ```
    - `true` : Has any enabled bounds
    - `false` : All bounds are disabled.
- Get enabled of a bound
    ```javascript
    var enableLeftBound = bounds.boundsEnable.left;
    var enableRightBound = bounds.boundsEnable.right;
    var enableTopBound = bounds.boundsEnable.top;
    var enableBottomBound = bounds.boundsEnable.bottom;
    ```

### Align mond

- Set
    ```javascript
    bounds.setAlignMode(mode);
    ```
    - `0`, or `'bounds'` : Align bounds of game object to target bound.
    - `1`, or `'origin'` : Set position of game object to target bound.
- Get
    ```javascript
    var alignMode = bounds.alignMode;
    ```
    - `0` : Align bounds of game object to target bound.
    - `1` : Set position of game object to target bound.

### Hit result

- Game object is hitting any bound
    ```javascript
    var isHitAny = bounds.isHitAny;
    ```
- Game object is hitting a bound
    ```javascript
    var isHitLeft = this.isHitLeft;
    var isHitRight = this.isHitRight;
    var isHitTop = this.isHitTop;
    var isHitBottom = this.isHitBottom;
    ```

### Event

- On hit any bound
    ```javascript
    bounds.on('hitany', function(gameObject, bounds) {

    })
    ```
- On hit left bound
    ```javascript
    bounds.on('hitleft', function(gameObject, bounds) {

    })
    ```
- On hit right bound
    ```javascript
    bounds.on('hitright', function(gameObject, bounds) {

    })
    ```
- On hit top bound
    ```javascript
    bounds.on('hittop', function(gameObject, bounds) {

    })
    ```
- On hit bottom bound
    ```javascript
    bounds.on('hitbottom', function(gameObject, bounds) {

    })
    ```