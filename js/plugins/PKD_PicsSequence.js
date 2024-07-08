//=============================================================================
// PKD_PicsSequence.js (ver.1.1)
//=============================================================================
// [Update History]
// v1.1 (30.05.2022)
// v1.0 (15.03.2021) - release

/*:
 * @plugindesc v1.1 - Play pictures sequence based animations
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/pictures-sequences/
 *
 * @help
 * [Description]
 * Plugin allows you play animations consists of picture sequences, on screen or events.
 * You also able to control animations during play (pause \ resume, change speed)
 *
 * -------------------------
 * [Usage]
 * 
 * Sequance pictures naming rule: Name_1.png, Name_2.png, Name_3.png and etc...
 * Name - picture name
 * _1, _2, _3 - frames (starts from 1, not 0)
 * 
 * Example: Actor1_1.png, Actor1_2.png, Actor1_3.png
 * 
 * 
 * Plugin not have plugin commands.
 *
 * Script calls:
 * 
 * PSeq.play(id, x, y, name, frames, delay, loop, level); - play sequence on screen
 * 
 * id - unique animation ID for refer to this animation in
 *  other script calls (Clear, Pause, Speed)
 * (animations with same ID overwrite each other)
 * x,y - coordinates in pixels
 * name - picture name in quotes without numbers
 * frames - pictures count
 * delay - delay between frame change in seconds, can be decimal
 * loop - true for looping
 * level - "scene", "above", "below". Default is "scene"
 *
 * Example: PSeq.play(1, 150, 100, "Actor1", 3, 0.5, true);
 * (file names should be as in example above: Actor1_1.png, Actor1_2.png, Actor1_3.png)
 *
 * Example: PSeq.play(1, 150, 100, "Actor1", 3, 0.5, true, "below");
 * (animation will be below Pictures)
 * 
 * PSeq.playOnActor(id, x, y, name, frames, speed, loop);
 *  - play on player (x, y - offset in pixels)
 * 
 * PSeq.playOnEvent(id, eventId, x, y, name, frames, speed, loop);
 * - play on event (eventId) (x, y - offset in pixels)
 *
 * PSeq.pause(id) - pause \ play animation by id
 * PSeq.delay(id, delay) - change animation speed (frames change delay) by id
 * PSeq.clear(id) - remove animation by id
 * PSeq.clearAll() - remove all animations
 * 
 * ------------------------
 * [Terms of Use]
 * See at plugin web page
 *
 * [Help]
 * https://kdworkshop.net/discord-server/
 *
 * [Support Author]
 * https://www.patreon.com/KageDesu
 *
 * 
 * @param picSeqFolder
 * @text Folder
 * @desc Folder with pictures for animations. Should be in img folder.
 * @default pictures
 */

(function () {

    // * Load parameters
    let parameters = PluginManager.parameters('PKD_PicsSequence');
    let PSeqFolder = String(parameters.picSeqFolder || 'pictures');

    //@[GLOBAL]
    window.PSeq = {};

    ImageManager.loadPSeqAnimation = function (filename) {
        return this.loadBitmap('img/%1/'.format(PSeqFolder), filename);
    };

    PSeq.init = function () {
        this._animations = {};
    };

    PSeq.play = function (id, x, y, name, frames, delay, loop, level = "screen") {
        if(this._animations[id]) {
            PSeq.clear(id);
        }
        var bitmaps = [];
        for (var i = 1; i <= frames; i++) {
            bitmaps.push(ImageManager.loadPSeqAnimation(`${name}_${i}`));
        }
        var scene = SceneManager._scene;
        if (scene != null) {
            try {
                var sprite = new PSeq.Sprite_AnimationImage();
                switch (level) {
                    case "below":
                        scene._spriteset.__pkdAnimLayerBelow.addChild(sprite);
                        break;
                    case "above":
                        scene._spriteset.__pkdAnimLayerAbove.addChild(sprite);
                        break;
                    default:
                        scene.addChild(sprite);
                        break;
                }
                sprite.addImages(bitmaps);
                sprite.move(x, y);
                sprite.play(Math.round(delay * 60), loop);
                this._animations[id] = sprite;
            } catch (error) {
                console.warn('Something wrong with PSeq.play');
            }
        }
    };

    PSeq.playOnActor = function (id, x, y, name, frames, delay, loop) {
        var scene = SceneManager._scene;
        var sset = scene._spriteset._characterSprites;
        var plSprite = sset.find((s) => s._character == $gamePlayer);
        PSeq.playOnChar(id, plSprite, x, y, name, frames, delay, loop);
    };

    PSeq.playOnEvent = function (id, eventId, x, y, name, frames, delay, loop) {
        var scene = SceneManager._scene;
        var sset = scene._spriteset._characterSprites;
        var event = $gameMap.event(eventId);
        if (event) {
            var plSprite = sset.find((s) => s._character == event);
            PSeq.playOnChar(id, plSprite, x, y, name, frames, delay, loop);
        }
    };

    PSeq.playOnChar = function (id, charSprite, x, y, name, frames, delay, loop) {
        if(this._animations[id]) {
            PSeq.clear(id);
        }
        var bitmaps = [];
        for (var i = 1; i <= frames; i++) {
            bitmaps.push(ImageManager.loadPSeqAnimation(`${name}_${i}`));
        }
        if (charSprite != null) {
            try {
                var sprite = new PSeq.Sprite_AnimationImage();
                charSprite.addChild(sprite);
                sprite.addImages(bitmaps);
                sprite.move(x, y);
                sprite.play(Math.round(delay * 60), loop);
                sprite.setCharaMode();
                this._animations[id] = sprite;
            } catch (error) {
                console.warn('Something wrong with PSeq.play');
            }
        }
    };


    PSeq.clear = function (id) {
        var sprite = this._animations[id];
        if (sprite != null) {
            sprite.removeFromParent();
            this._animations[id] = null;
        }
    };

    PSeq.pause = function (id) {
        var sprite = this._animations[id];
        if (sprite != null) {
            sprite.pause();
        }
    };

    PSeq.delay = function (id, delay) {
        var sprite = this._animations[id];
        if (sprite != null) {
            sprite._maxWait = Math.round(delay * 60);
        }
    };

    PSeq.clearAll = function () {
        if (this._animations != null) {
            for (var item in PSeq._animations) {
                PSeq.clear(item);
            }
        }
        this._animations = {};
    };


    (function () {

        function Sprite_AnimationImage() {
            this.initialize.apply(this, arguments);
        }

        PSeq.Sprite_AnimationImage = Sprite_AnimationImage;

        Sprite_AnimationImage.prototype = Object.create(Sprite.prototype);
        Sprite_AnimationImage.prototype.constructor = Sprite_AnimationImage;

        Sprite_AnimationImage.prototype.initialize = function () {
            Sprite.prototype.initialize.call(this);
            this._wait = 0;
            this._looping = false;
            this._frameIndex = -1;
            this._animSprites = [];
            this._paused = false;
        };

        var _ = Sprite_AnimationImage.prototype;

        //?[NEW]
        _.addImages = function (bitmaps) {
            bitmaps.forEach(b => {
                var s = new Sprite(b);
                this._animSprites.push(s);
                s.visible = false;
                this.addChild(s);
            });
        };

        //?[NEW]
        _.play = function (speed, loop) {
            this._looping = loop;
            this._maxWait = speed;
            if (this._animSprites.length > 0)
                this._frameIndex = 0;
        };

        //?[NEW]
        _.update = function () {
            Sprite.prototype.update.call(this);
            try {
                if (this._frameIndex >= 0 && this._wait == 0) {
                    this.showNextFrame();
                    this._frameIndex++;
                    this._wait = 1;
                }
                if (this._wait > 0) {
                    if (this._paused == false)
                        this._wait++;
                    if (this._wait > this._maxWait)
                        this._wait = 0;
                }
                if (this._frameIndex == this._animSprites.length) {
                    this._wait = 1;
                    if (this._looping == true) {
                        this._frameIndex = 0;
                    } else {
                        //Stop at last frame
                        this._frameIndex = -1;
                    }
                }
            } catch (e) {
                console.warn(e, ' while update animation frame');
            }
        };

        //?[NEW]
        _.showNextFrame = function () {
            this._animSprites.forEach(s => s.visible = false);
            if (this._frameIndex >= 0) {
                if (this._frameIndex < this._animSprites.length)
                    this._animSprites[this._frameIndex].visible = true;
            }
        };

        _.setCharaMode = function () {
            this._animSprites.forEach(s => {
                s.anchor.x = 0.5;
                s.anchor.y = 1;
            });
        };

        //?[NEW]
        _.pause = function () {
            this._paused = !this._paused;
        };

        _.removeFromParent = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };

        //@[ALIAS]
        var _alias_Scene_Base_terminate = Scene_Base.prototype.terminate;
        Scene_Base.prototype.terminate = function () {
            _alias_Scene_Base_terminate.call(this);
            PSeq.clearAll();
        };

        //@[ALIAS]
        var _alias_Scene_Base_initialize = Scene_Base.prototype.initialize;
        Scene_Base.prototype.initialize = function () {
            _alias_Scene_Base_initialize.call(this);
            PSeq.init();
        };
    })();

    //@[ALIAS]
    var _alias_Spriteset_Base_createPictures = Spriteset_Base.prototype.createPictures;
    Spriteset_Base.prototype.createPictures = function () {
        this.__pkdAnimLayerBelow = new Sprite();
        this.addChild(this.__pkdAnimLayerBelow);
        _alias_Spriteset_Base_createPictures.call(this);
        this.__pkdAnimLayerAbove = new Sprite();
        this.addChild(this.__pkdAnimLayerAbove);
    };

})();