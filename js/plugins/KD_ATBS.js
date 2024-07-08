/*
 * Official Web Page
 * <https://kagedesuworkshop.blogspot.ru/p/atbs.html>
 *
 * License
 * Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * <https://creativecommons.org/licenses/by-nc-sa/4.0/>
 *
 * Copyright (c) 2018 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kagedesuworkshop.blogspot.ru/>
 *
 */

//=============================================================================
// KageDesu_ATBS
//=============================================================================
//Version 1.0 (22.06.2018)

/*:
 * @author Pheonix KageDesu
 * @plugindesc v1.0.202 The active - time battle system
 * @help https: //kagedesuworkshop.blogspot.ru/p/atbs.html
 *
 * @param KD ATBS 
 * 
 * @param Common Settings
 * @param Controls
 * @param Strings
 * @param Animations
 * @param Interface
 * 
 * @param Controls_Key_W
 * @parent Controls
 * @text Top Circle Segment Key
 * @type string
 * @default w
 * 
 * @param Controls_Key_D
 * @parent Controls
 * @text Right Circle Segment Key
 * @type string
 * @default d
 * 
 * @param Controls_Key_S
 * @parent Controls
 * @text Down Circle Segment Key
 * @type string
 * @default s
 * 
 * @param Controls_Key_A
 * @parent Controls
 * @text Left Circle Segment Key
 * @type string
 * @default a
 * 
 * @param Controls_Key_E
 * @parent Controls
 * @text Menu Circle Binding Key
 * @type string
 * @default e
 * 
 * @param Controls_Key_SP
 * @parent Controls
 * @text Help Key
 * @type string
 * @default space
 * 
 * @param Common_AllowFB
 * @parent Common Settings
 * @text Allow Fast Battle?
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 * 
 * @param Common_Formula
 * @parent Common Settings
 * @text Formula for wait turn timer
 * @type string
 * @default ((def + mdf) / 2) / agi
 * @desc Leave field empty for plugin default formula
 * 
 * @param Common_Guard
 * @parent Common Settings
 * @text State for Guard Skill
 * @type state
 * @default 2
 * @desc Default guard state (don't change this if you don't know what you do)
 * 
 * @param Strings_Popup
 * @parent Strings
 * @text Popup
 *
 * @param STRING_POPUP_EVADE
 * @parent Strings_Popup
 * @type String
 * @text Evade
 * @default Evade
 *
 * @param STRING_POPUP_MISS
 * @parent Strings_Popup
 * @type String
 * @text Miss
 * @default Miss
 *
 * @param STRING_POPUP_FAIL
 * @parent Strings_Popup
 * @type String
 * @text Fail
 * @default Fail
 *
 * @param STRING_POPUP_ABSORB
 * @parent Strings_Popup
 * @type String
 * @text Absorb
 * @default Absorb
 *
 * @param STRING_POPUP_IMMUNE
 * @parent Strings_Popup
 * @type String
 * @text Immune
 * @default Immune
 *
 * @param STRING_POPUP_WEAK
 * @parent Strings_Popup
 * @type String
 * @text Weak
 * @default Weak
 *
 * @param STRING_POPUP_SKILL
 * @parent Strings_Popup
 * @type String
 * @text Skill ready
 * @default Ready!
 * 
 * @param STRING_WAIT_TURN
 * @parent Strings
 * @type String
 * @text Wait for turn
 * @default Wait for turn
 * 
 * @param STRING_TIMER_READY
 * @parent Strings
 * @type String
 * @text Action
 * @default Action!
 * 
 * @param STRING_FAST_BATTLE
 * @parent Strings
 * @type String
 * @text Fast battle
 * @default Fast battle
 * 
 * @param Animation_EnemyAttack
 * @parent Animations
 * @text Default Enemy Attack
 * @type animation
 * @default 6
 * @desc This animation playing on Actor 's portrait when the Enemy hit with basic Attack
 * 
 * @param Animation_EnemyMoving
 * @parent Animations
 * @text Enemy moving
 * @type struct<EnemyInBattleAnimation>
 * @desc Wiggle animation of the enemies in the battle
 * @default {"PlayAnimation":"true","MoveStep":"2","MoveTime":"32"}
 * 
 * 
 * @param Interface_Font
 * @parent Interface
 * @text Main Plugin Text Font
 * @type string
 * @default
 * @desc Leave field empty for plugin default font
 */
/*~struct~EnemyInBattleAnimation:
 * @param PlayAnimation
 * @text Play?
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 * 
 * @param MoveStep
 * @text Moving Step
 * @type number
 * @min 0
 * @max 10
 * @default 2
 * @desc The percentage of the size of the image on which to move the image
 * 
 * @param MoveTime
 * @text Moving Time
 * @type number
 * @default 32
 * @min 0
 * @max 1000
 * @desc Once in how many frames to move the picture
 */

//@[CODE STANDARD X1]

/* jshint -W097 */
/* jshint -W117 */

"use strict";

var Imported = Imported || {};
Imported.KDATBS = true;

var KD_ATBS = {};
KD_ATBS.Version = '1.0';
KD_ATBS.Build = 202;

KD_ATBS.Versions = {
    'KD ATBS': KD_ATBS.Version + ' : ' + KD_ATBS.Build,
    'CoffeeScript CLI': '2.3.1'
};

KD_ATBS.LIBS = {};

KD_ATBS.register = function (library) {
    this.LIBS[library.name] = library;
};

//var DEV = DEV || {}; //! Comment this line on release

(function () {
    var _SceneManager_catchException_ATBS = SceneManager.catchException;
    SceneManager.catchException = function (e) {
        SceneManager._printATBSInfo();
        _SceneManager_catchException_ATBS.call(this, e);
    };

    SceneManager._printATBSInfo = function () {
        console.error("Using KD ATBS [Version: " + KD_ATBS.Version + " ; Build: " + KD_ATBS.Build + " ; on MV  " + Utils.RPGMAKER_VERSION + "]");
    };

    var _SceneManager_onError_ATBS = SceneManager.onError;
    SceneManager.onError = function (e) {
        SceneManager._printATBSInfo();
        _SceneManager_onError_ATBS.call(this, e);
    };

    var _JsonEx_decode = JsonEx._decode;
    JsonEx._decode = function (value, circular, registry) {
        var type = Object.prototype.toString.call(value);
        if (type === '[object Object]' || type === '[object Array]') {
            if (value['@']) {
                var constructor = KD_ATBS.LIBS[value['@']] || KDCore[value['@']];
                if (constructor) {
                    value = this._resetPrototype(value, constructor.prototype);
                    value['@'] = null;
                }
            }
        }
        return _JsonEx_decode.call(this, value, circular, registry);
    };
})();


// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var KDCore;

KDCore = KDCore || {};

KDCore.Version = '1.0';

KDCore.LIBS = {};

KDCore.register = function(library) {
  return this.LIBS[library.name] = library;
};

(function() {
  var BitmapSrc, Color, DevLog, ParametersManager, SDK, StringsLoader;
  //Array Extension
  //------------------------------------------------------------------------------
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.include = function(value) {
    return this.indexOf(value) !== -1;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  //Number Extension
  //------------------------------------------------------------------------------
  Number.prototype.do = function(method) {
    return SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  //Sprite Extension
  //------------------------------------------------------------------------------
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX, floatY) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  //Bitmap Extension
  //------------------------------------------------------------------------------
  Bitmap.prototype.fillAll = function(color) {
    return this.fillRect(0, 0, this.width, this.height, color.CSS);
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    return this.drawOnMe(bitmap, x, y, size, size);
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
  //SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  //Color
  //------------------------------------------------------------------------------
  Color = class Color {
    constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
      this.r = r1;
      this.g = g1;
      this.b = b1;
      this.a = a1;
    }

    getLightestColor(lightLevel) {
      var bf, newColor, p;
      bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
      p = 0;
      newColor = [0, 0, 0, 0];
      if (bf - lightLevel >= 0) {
        if (bf >= 0) {
          p = Math.abs(bf - lightLevel) / lightLevel;
        }
        newColor = this.ARR.map(function(c) {
          return c - (p * c);
        });
      } else {
        if (bf >= 0) {
          p = (lightLevel - bf) / (255 - bf);
        }
        newColor = this.ARR.map(function(c) {
          return [(255 - c) * p + c, 255].min();
        });
      }
      return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
    }

    clone() {
      return this.reAlpha(this.a);
    }

    reAlpha(newAlpha) {
      return new Color(this.r, this.g, this.b, newAlpha || 255);
    }

    static AddConstantColor(name, color) {
      color.toHex();
      color.toArray();
      color.toCSS();
      SDK.setConstantToObject(Color, name, color);
    }

    toHex() {
      var b, g, r;
      if (this._colorHex != null) {
        return this._colorHex;
      }
      r = Math.floor(this.r).toString(16).padStart(2, "0");
      g = Math.floor(this.g).toString(16).padStart(2, "0");
      b = Math.floor(this.b).toString(16).padStart(2, "0");
      return this._colorHex = '#' + r + g + b;
    }

    toArray() {
      if (this._colorArray != null) {
        return this._colorArray;
      }
      return this._colorArray = [this.r, this.g, this.b, this.a];
    }

    toCSS() {
      var na, nb, ng, nr;
      if (this._colorCss != null) {
        return this._colorCss;
      }
      nr = Math.round(this.r);
      ng = Math.round(this.g);
      nb = Math.round(this.b);
      na = this.a / 255;
      return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
    }

    static Random() {
      var a, b, c;
      a = SDK.rand(1, 254);
      b = SDK.rand(1, 254);
      c = SDK.rand(1, 254);
      return new Color(a, b, c, 255);
    }

    static FromHex(hexString) {
      var color, result;
      result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
      color = null;
      if (result != null) {
        color = {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        };
      }
      if (color != null) {
        return new Color(color.r, color.g, color.b, 255);
      } else {
        return Color.NONE;
      }
    }

  };
  Object.defineProperties(Color.prototype, {
    R: {
      get: function() {
        return this.r;
      },
      configurable: true
    },
    G: {
      get: function() {
        return this.g;
      },
      configurable: true
    },
    B: {
      get: function() {
        return this.b;
      },
      configurable: true
    },
    A: {
      get: function() {
        return this.a;
      },
      configurable: true
    },
    ARR: {
      get: function() {
        return this.toArray();
      },
      configurable: true
    },
    CSS: {
      get: function() {
        return this.toCSS();
      },
      configurable: true
    },
    HEX: {
      get: function() {
        return this.toHex();
      },
      configurable: true
    }
  });
  Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));
  Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));
  Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));
  Color.AddConstantColor('RED', new Color(255, 0, 0, 255));
  Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));
  Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));
  Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));
  Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));
  Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));
  Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));
  //DevLog
  //------------------------------------------------------------------------------
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.WHITE);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

  };
  BitmapSrc = (function() {
    
    //BitmapSrc
    //------------------------------------------------------------------------------
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          pw = Window_Base._iconWidth;
          ph = Window_Base._iconHeight;
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //ParametersManager
  //------------------------------------------------------------------------------
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] !== void 0;
  };
  ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var path;
      if (filename) {
        path = filename.split('/');
        filename = path.last();
        path = path.first() + '/';
        return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
      } else {
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

  };
  //StringsLoader
  //------------------------------------------------------------------------------
  StringsLoader = class StringsLoader {
    constructor(_parameters) {
      this._parameters = _parameters;
    }

    loadAllStringsToObject(object) {
      var strings;
      strings = this._collect(object);
      this._writeNewString(object, strings);
    }

    _collect(object) {
      var properties, strings;
      properties = Object.getOwnPropertyNames(object);
      strings = properties.filter(function(item) {
        return item.includes("STRING_");
      });
      return strings;
    }

    _writeNewString(object, strings) {
      var j, len, string;
      for (j = 0, len = strings.length; j < len; j++) {
        string = strings[j];
        this._setStringFromPluginParametersToObject(object, string);
      }
    }

    _setStringFromPluginParametersToObject(object, stringName) {
      var newValue;
      newValue = this._parameters[stringName];
      if (newValue) {
        object[stringName] = newValue;
      }
    }

  };
  //EXTENSION TO GLOBAL
  //------------------------------------------------------------------------------
  KDCore.SDK = SDK;
  KDCore.Color = Color;
  KDCore.DevLog = DevLog;
  KDCore.BitmapSrc = BitmapSrc;
  KDCore.ParametersManager = ParametersManager;
  KDCore.StringsLoader = StringsLoader;
})();

// ■ END KDCore.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ATBS_Input.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var IKey, alias_atbs_input_onKeyDown, alias_atbs_input_onKeyUp, i, j, k;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  
  //[81, 87, 88, 90, 32] pageup, pagedown, escape, ok, ok
  //GAMEPAD: W - Y, D - B, S - A, A - X
  alias_atbs_input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    alias_atbs_input_onKeyDown.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode);
  };
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      this._currentState[symbol] = state;
    }
  };
  alias_atbs_input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    alias_atbs_input_onKeyUp.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode, false);
  };
  Input.isCancel = function() {
    if (Input.isGamepad()) {
      return Input.isTriggered('pageup'); //LB
    } else {
      return Input.isTriggered('cancel') || TouchInput.isCancelled();
    }
  };
  Input.isGamepad = function() {
    var e;
    try {
      return navigator.getGamepads().item(0) != null;
    } catch (error) {
      e = error;
      console.error(e);
      return false;
    }
  };
  IKey = function() {
    throw new Error('This is a static class');
  };
  IKey.W = function() {
    if (Input.isGamepad()) {
      return 'menu';
    } else {
      return 'pagedown';
    }
  };
  IKey.A = function() {
    if (Input.isGamepad()) {
      return 'cancel';
    } else {
      return 'a';
    }
  };
  IKey.S = function() {
    if (Input.isGamepad()) {
      return 'ok';
    } else {
      return 's';
    }
  };
  IKey.D = function() {
    if (Input.isGamepad()) {
      return 'shift';
    } else {
      return 'd';
    }
  };
  IKey.SPACE = function() {
    if (Input.isGamepad()) {
      return 'pagedown';
    } else {
      return 'ok';
    }
  };
  IKey.E = function() {
    if (Input.isGamepad()) {
      return 'pagedown';
    } else {
      return 'e';
    }
  };
  IKey.getButtonImage = function(symbol, size) {
    var e;
    try {
      if (Input.isGamepad()) {
        return IKey.getGamepagButtonImage(symbol, size);
      } else {
        return IKey.getKeyboardButtonImage(symbol, size);
      }
    } catch (error) {
      e = error;
      console.error(e);
      return ImageManager.loadEmptyBitmap();
    }
  };
  IKey.getGamepagButtonImage = function(symbol, size) {
    var keyBitmap, letter;
    letter = IKey.getGamepadLetter(symbol);
    keyBitmap = KDCore.BitmapSrc.LoadFromMemory("xbox" + letter).bitmap;
    return IKey._createButtonBitmap(keyBitmap, size);
  };
  IKey._createButtonBitmap = function(srcBitmap, size) {
    var bitmap;
    bitmap = new Bitmap(size, size);
    bitmap.drawOnMe(srcBitmap, 0, 0, size, size);
    return bitmap;
  };
  IKey.getGamepadLetter = function(symbol) {
    if (symbol === IKey.W()) {
      return 'Y';
    }
    if (symbol === IKey.A()) {
      return 'X';
    }
    if (symbol === IKey.S()) {
      return 'A';
    }
    if (symbol === IKey.D()) {
      return 'B';
    }
    return "";
  };
  IKey.getKeyboardButtonImage = function(symbol, size) {
    var keyBitmap, newKeyBitmap;
    if (symbol === IKey.W()) { //!TEMP
      symbol = 'W';
    }
    keyBitmap = ATBS_ResourceManager.keyboardButton.bitmap;
    newKeyBitmap = IKey._createButtonBitmap(keyBitmap, size);
    IKey._drawSymbol(newKeyBitmap, symbol, size);
    return newKeyBitmap;
  };
  IKey._drawSymbol = function(bitmap, symbol, size) {
    if (bitmap.width <= 24) {
      bitmap.fontSize = 16;
    }
    if (symbol != null) {
      return bitmap.drawText(symbol.toUpperCase(), 0, 0, bitmap.width, bitmap.height - 4, 'center');
    }
  };
  IKey.isTriggerW = function() {
    return this._isTriggered(IKey.W());
  };
  IKey._isTriggered = function(iKey) {
    return Input.isTriggered(iKey);
  };
  IKey.isTriggerD = function() {
    return this._isTriggered(IKey.D());
  };
  IKey.isTriggerA = function() {
    return this._isTriggered(IKey.A());
  };
  IKey.isTriggerS = function() {
    return this._isTriggered(IKey.S());
  };
  KD_ATBS.register(IKey);
})();

// ■ END ATBS_Input.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ATBS_System.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
KD_ATBS.SYSTEM = {};

(function ($) {
      KDCore.SDK.setConstantToObject($, 'PLAYER_WINDOW_WIDTH', 260);
      KDCore.SDK.setConstantToObject($, 'ALLY_WINDOW_WIDTH', 124);
      KDCore.SDK.setConstantToObject($, 'PARTY_WINDOW_HEIGHT', 120);

      KDCore.SDK.setConstantToObject($, 'MINIMUM_WAIT_TIME', 20);
      KDCore.SDK.setConstantToObject($, 'WAIT_TIME_KOEF', 140);
      KDCore.SDK.setConstantToObject($, 'FAST_BATTLE_TIME_KOEF', 0.2);
      KDCore.SDK.setConstantToObject($, 'TURN_TIME', 180); //3 seconds

      KDCore.SDK.setConstantToObject($, 'FORMULA', "((def + mdf) / 2) / agi");

      $.FONT = 'VL-Gothic-Regular';

      $.STRING_POPUP_EVADE = 'Evade';
      $.STRING_POPUP_MISS = 'Miss';
      $.STRING_POPUP_FAIL = 'Fail';
      $.STRING_POPUP_ABSORB = 'Absorb';
      $.STRING_POPUP_IMMUNE = 'Immune';
      $.STRING_POPUP_WEAK = 'Weak';
      $.STRING_POPUP_SKILL = 'Ready!';
      
      $.STRING_WAIT_TURN = 'Wait for turn';
      $.STRING_TIMER_READY = 'Action!';
      $.STRING_FAST_BATTLE = "Fast battle";

})(KD_ATBS.SYSTEM);

var ATBS_ResourceManager = {};
ATBS_ResourceManager.iconAttackSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABtklEQVRIS2MMtLb+z4AE1h89yojMp5TNCLJg3ZEjYHMe/P3DUGTvwEBNSzAsAFlETUvAFvD6N8NDorHIFsymliXg8IZZoqwizHD3zluGhaWOYEuCbGwoDi54hIIsMSiexiAhJcZw9NB1qlmCkmJAlnj0rmEQF+NkuHjhIUNdoB7FPsFIkiBL4hdvBRtMDUuwpnlkS0AW+Svyk+0TnJkKZsnLV9/BQUauJXhzLSxOYGk4zVyCZJ8QLBaQIx7kG1ItIWgBLJ/AIh6XJe1u0f9PfX2AkW+IsgCXJbCMCDLcO1KU4dzBSwwbb/9EsYRoC7BZAsqQnzfWMsxtsWTYtPAcw/NnkgzoviDJApglIBpUfnEsLmRQlNRhSK+UZJjZ/hzDcJA6ki2ApShQ5JtxKzDcf36FIafIkaF+zmms5RZZFoDCHORqEHjy4A/D1uWvGSSlnmOEP1k+QI5QWJj7q7LDi3uKIhkWByADkSMUFFwwMZDPQL6CBRlZQQSrx5GrVpAYKDUJOnQzrJHRYlimIASOE7IswNYQAFnQmGLKcLNmJ4MO01+GKjlR6lqAnIRBbJjvqOYDXM0bAHuvBCiKpTEHAAAAAElFTkSuQmCC";
ATBS_ResourceManager.iconAttack = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.iconAttackSrc, 'icon_attack');
ATBS_ResourceManager.iconDefenseSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB50lEQVRIS5WVP0hCURTGP8e2oIxoMvoDzlYEIk1BDUHiUoik2GBtUXNDuBU5VUuSBRENJSSUEBH1FBwSJJAHYWA0ZlvYWJyn93Hf//vuolfvPb/7fefccz0QGOFg8I9fli+XPQLblCW2C1ngaDKJSCKBj0YDRycFvD1dQRRiAPCnZYHpJBScRr3VxnPhQRiiAVBwfdAXSUK9N4BarY2oT0aPP6CAGIS+26kxAK5LJazsPmJktE+1eXBoAMXbJuQvGXhvIb3ULwwyBezkXzU5JEDm9E75ze/1m4J+5SrOs1mDGmEFDKCB0KSraCIUwkY8LgbQK6A4F/dVjQJVCYD0JOAKoM8BJVjxvztYcPbpCpDJ5bCd/1RCsUTzAArKhj7px1vrzhat7h3iUvrWVJGZAhVSkVA8CIPKWSjJBKCKuGn5hBSkvE2MzUcsL5+hisZnIlhLLGhsslIgVyT1TpjZY9qL6DazPDjmwMEeW8DcvoSp4Y5NTIG+esiexVjMtgGaNjt9HsyqSMQey3att0mvgDay01tVD6sy0/eAAKRi86yK5dlOJ+UvGt/wrJJrC6A/eQjfFih4avrHtjT5Tmn5ovEAdYPL4EJPJrPK7ckdLWILmBI2d/NcOirgIbyvog++MEDzvLmc/AMHcaEo5rZH7QAAAABJRU5ErkJggg==";
ATBS_ResourceManager.iconDefense = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.iconDefenseSrc, 'icon_defense');
ATBS_ResourceManager.iconSkillsSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB40lEQVRIS2NkoDFgJMb8QGvr/9jUrT96lKB+vApABqdxJDJohhtjdcf1lWcZZv2Yz4DPIqwWoBsMMwjZFmSL8VmEYQHI8P74KWCzCLkQ3SGFC3MwfINiAcxwbC4GWYgcFOjxAvMRuiUoFmx3nvMfFN4gRUF1fQwmBqrwUDlz4TbDuqYiOB+fPLJD4BbAXA8zPMbNDCVib7x6D+aDLAJZrCEmiCE/Y9p6hkd75oHFYZbALYC5vv/pOYaMrEAMA0Caluw6hdVwmNyZY1ewWwByfa1pLcNC/qcMJlY6DOiuBxkA8gEh14P0du1JZ1A5xg33BdgHyBZQ4nqYBV3ncuD5A26BnEsS1VwPCo3m083geECxgBquBwUPVgtgyQ5b6sAV9qDgLWiYB/Y5ctjjtACUCmAA5ht8KQcU8aCkiWwBKMOJ68oggggUwaDwBwGQQhiAWQYSA6V7kEEwgCyG7npQMQMqCTz3poCDHx4Hd6y+YpSYTly5KIYiK0B2ACx4sBUXKDkZ2Xsgw2CWckrwgs3+/uIzQ5nLTBRf7vs2GZ7u0V0P9wFMByw/vLz8BJyOsQGQpTALYZaCUg5RhR0s0+ErrnGVoiC9BItrZJ9gq1CQfUR2hYNsCM2qTPSwp1mljzWWSRQEANKleiiGc7cZAAAAAElFTkSuQmCC";
ATBS_ResourceManager.iconSkills = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.iconSkillsSrc, 'icon_skills');
ATBS_ResourceManager.iconItemsSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABr0lEQVRIS7WWO0sDQRDHJz5Qm0RPRAgxENRCDAkq2qSwEGvRUvBL+Hn8DhIUO9EmjRDSKAgKgSgBiZ6vQiT4YFbmmJvb1xVuk3A7+//Nzvz39jLgObZrtR8eethoZHyWOoNIeGt+BJbXK5B9mILz61Oo33wqfRfICJDCMltfUALgEk4LigBphX1BCoDiWOPq3i4Mdi59eqeN+SqW1fq7VhsOmo+qPxFgf+dFLZoYqkC/vJEKhMI4uvUj6L29q/9oggTg+SP4g4yFXiCdMG3NCqAgE8gmnAqgA/FSdJ5eVUhxMhfrCT5vhaPxEmGTg7m+tcHh7TCQKAXqxHEuBiAnrc72ID9QMIIkgItzMImjbsxFuWATjs9OVHI6kA7AhVdKBVjMr8FV98Ju0+/stBakKxEmg8IzSyXl/2b7XiWY6AGeA2lTCcKFMmMpjGXTNpkDpHs4COeq4wuJjGU/rDuQVqLzgCAcvBT/blMJoPLg8+hVQTbFX9t5sJ0DKUxVsN4H8uCZbIr1poxleb1uNAJJgE3YuAOZAb+IyKY+wt4ACuRfFa6Lnifp/Kqwvv08Jn8Bs3BqKFe1v+gAAAAASUVORK5CYII=";
ATBS_ResourceManager.iconItems = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.iconItemsSrc, 'icon_items');

ATBS_ResourceManager.iconSetupSrc = "data:image/png;base64,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";
ATBS_ResourceManager.iconSetup = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.iconSetupSrc, 'icon_setup');

ATBS_ResourceManager.circleSegmentSrc = "data:image/png;base64,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";
ATBS_ResourceManager.circleSegment = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.circleSegmentSrc, 'circle_segment');
ATBS_ResourceManager.circleSegmentSmallSrc = "data:image/png;base64,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";
ATBS_ResourceManager.circleSegmentSmall = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.circleSegmentSmallSrc, 'circle_segment_small');

ATBS_ResourceManager.keyboardButtonSrc = "data:image/png;base64,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";
ATBS_ResourceManager.keyboardButton = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.keyboardButtonSrc,'keyboard_button');
ATBS_ResourceManager.xboxASrc = "data:image/png;base64,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";
ATBS_ResourceManager.xboxBSrc = "data:image/png;base64,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";
ATBS_ResourceManager.xboxXSrc = "data:image/png;base64,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";
ATBS_ResourceManager.xboxYSrc = "data:image/png;base64,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";

ATBS_ResourceManager.xboxA = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.xboxASrc, 'xboxA');
ATBS_ResourceManager.xboxB = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.xboxBSrc, 'xboxB');
ATBS_ResourceManager.xboxY = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.xboxYSrc, 'xboxY');
ATBS_ResourceManager.xboxX = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.xboxXSrc, 'xboxX');

ATBS_ResourceManager.iconBattleSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACLUlEQVRIS51Wu0oDQRS96WztjA/cIr0WgoKICfkBxVLEqIVYSZqgQkiWFEKaYGkhRoKljx8QlURQtIh9ipWoSWdrp5xr7jK7s09vk92ZM+fc185NgmJYeTT5U/7sJWIcochgkJfOemSuJ8lLBPsirO5rAipQ9RTkNF0jaucdIoLfzn/RcW1YE/eMgL19LTBZvz1EI9Pff+RiAxG8ghj7fpH5pkgVAbk5VbX5Wdwl5lebwBqICMhVAlXcz3PRDy2yX+dI7sO6ShNYnp+3u0Et8tXDgwPrhXNjcJ4PqeBavc68vW6X5jIZfn68vaVqsUhCAHyhUqHkxITtA/DAuJ1KCBgbT3d3NG4YtLKxQW+djqcIcCAXcSEUPDjE7m9uiAUuWy1euzg9pXfLol3T5PejUsl+RhTXjQZ7vbS2RpOplPZBQwQY7MPyuZwu8Nxs0s7BARPsbW7ahDiAwzA/AXFSMqAJSJhC5PYWEYUJgAPO4VcTQBpAioIhl7PptJ0GrEeJQDgcKULRYB+WRTMLC/wMMgiAWPItEbjX1UK/NJs0Zhi8hK7iIq9ubfHC+ckJd4gIgFyiQEToCthiNmtHJmJYADmaBJ0ofNp3oBIgVdLrIFe/A4gIOXCIHg6qBrznVRHlK42CgVjoZQdQ0ICJfRdJiHJj9uv7PEjcxnMgd8jXeJBI6MBxDBpNhuILeHluD5jBhJOIZIwGReGIAORes1Ud+GpNwv4IhBZZzch/B88vN2eCkiYwMWEAAAAASUVORK5CYII=";
ATBS_ResourceManager.iconEscapeSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACLklEQVRIS61VTShEURj9BqthoaRsJpKwkYVkMeMvfws2pGyVWVmQYinZT0nJQs/Ccoo8YuGnEBYSkQ2lhiZFk1IkyV/n8r3uu+++N2/K3b133z3nfOc777sB8ljd4fC3ur18eBjwOqPuuX4M8ProAFVU1tjOGKODlAmJlgDg0dgsLW7E6f42aREUFYeot6OPMiFxEHiBM1MmJFoCtmZmLmZTjweAX12e0L4x78sqLUF+WyNVFZc5/AcBwLH+hUCXlovba3r5eKCPnUtr26vprhXgNKrgBWB+p0sW9nREWoLGlhYanpyk6YkJ2kgmiCJdlJfYpP7OIddkIXFPW3tChExkI0CC4P99qJoCq3FaN5fINE1aPT8WzdXFliv8DLZStKmO6muD1BOJWCQWAYNXf+VY6k/zmihVkKKi5LnVdF2yAL4w1vzb/ONXmhpptxPwX4sPtr5yHerlfqj+x/cfXcFxTlQgjwXYAEVY2a/bQjlI6WCN2hp+VfI6S5VYtkC5sXsktp5XxvUVQB1yLicGB/CMkaEjgDUAh/euFqlV8M8kR1TuDSer8LFQ2MMEXIWjAgbi8YxRISvHkNMli5sLYCxYJINbPbAZ+9eTnOZKerl7F7ZkJW4cyYJ6jqVcgZwgVwK27K28VBDokiWrZ+XqT5aWgKeqLlkIBCLKqdGB+yZQkyWnTTceZMs971e3azOTkZ32AleTJbJuzAuRfu7mtARqhP0C8znfBGqU/T7/ACG0iSjvPJdaAAAAAElFTkSuQmCC";
ATBS_ResourceManager.iconFastBattleSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB6UlEQVRIS2NkwAMCra3/g6TXHz3KiE8dPjmcGkGGz22xZFizejXD9osyZFuC1QKQ4UumpDEsnV3HICElxzB/+z/qWYDscpDhIEA1C0CGN6aYMpw4vR7schA4rzWF4UJvFuU+gBk+Z/VqBh0FFrAFIMMdZVQYFMUYGPKi3ciyBBwHyIZLiHCDXf47YDWDEvcPhhg3M4bDp7+RbQkjLsNBLn/4/grYMpglV9dtYdh1eBJJPgFbIMv/AJ6UhVO2MYRZyzK8fsgOFkO25MnDbyQHFTyIkDOLQfE0sCUtxy7BhZcE2DOQbQF6TgT5CpslHYam5PkAW1ZHtgQkz/MdEmQgAEpRyABfUYK3jIGVRTDDJi3dxVBx/jQDyCfIAF8SJqkQA1nIVdLKkC5tymBrygW2g1ASJtkCmC9AloBSGHo+QQ86iiyAJWOQJaAUNu/cHQb5TYUMRvZ6DA+enmXwqznMSLIFoNSVZKQCjgtkAIqXvQ2+DH7xRuAiHgTSpj0kzQJYsYJuCczw0Px4cBEPArA6hCQfwFwMS8Ign4AAusuRKyiyLED2CSzMt+zfBrbs9F1RlLKKIgv8VdnBEQoq4kGlMLrhIAspsgBUOYEMB4HHHxWwlrIUWWCq/JrhxZuvOA2nyAeweADR+MoiACv8FSgwp/ukAAAAAElFTkSuQmCC";

ATBS_ResourceManager.iconBattle = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.iconBattleSrc, 'icon_battle');
ATBS_ResourceManager.iconEscape = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.iconEscapeSrc, 'icon_escape');
ATBS_ResourceManager.iconFastBattle = KDCore.BitmapSrc.LoadFromBase64(ATBS_ResourceManager.iconFastBattleSrc, 'icon_fastBattle');
// ■ END ATBS_System.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_LayerObject.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var UI_LayerObject;
  //?[PARENT]
  UI_LayerObject = class UI_LayerObject {
    constructor(layer) {
      this.layer = layer;
      this._isVisible = true;
    }

    isVisible() {
      return this._isVisible;
    }

    show() {
      this._isVisible = true;
    }

    hide() {
      this._isVisible = false;
    }

    terminate() {}

    update() {}

    move(x, y) {}

  };
  KD_ATBS.register(UI_LayerObject);
})();

// ■ END UI_LayerObject.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManagerATBS.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var BattleManagerATBS;

BattleManagerATBS = function() {
  throw new Error('This is a static class');
};

BattleManagerATBS.init = function() {
  this._isFastBattleAllowed = true;
  this._isFastBattleExists = true;
  if (KD_ATBS.Parameters.isLoaded()) {
    this._isFastBattleExists = KD_ATBS.Parameters.getFastBattleMode();
  }
  this._initGuardState();
  return this._initFormula();
};

BattleManagerATBS._initGuardState = function() {
  var guardState, stateId;
  stateId = 2;
  if (KD_ATBS.Parameters.isLoaded()) {
    stateId = KD_ATBS.Parameters.getGuardStateId();
    if (stateId === 0) {
      stateId = 2;
    }
  }
  guardState = $dataStates[stateId];
  if (guardState.iconIndex === 0) {
    guardState.autoRemovalTiming = 1;
    return guardState.iconIndex = 81;
  }
};

BattleManagerATBS._initFormula = function() {
  if (KD_ATBS.Parameters.isLoaded()) {
    return this.FORMULA = KD_ATBS.Parameters.getWaitTimeFormula();
  } else {
    return this.FORMULA = KD_ATBS.Parameters.convertFormula(KD_ATBS.SYSTEM.FORMULA);
  }
};

BattleManagerATBS.initBattle = function(scene) {
  UIManagerATBS.init(scene);
  $gameSystem.onBattleStart();
  $gameParty.onBattleStart();
  $gameTroop.onBattleStart();
  this.battleProcess = new KD_ATBS.LIBS.BattleProcess();
  this._phase = 'start';
  this._fastBattleMode = false;
  this._battleTurnTimer = new Game_TimerABS();
  BattleManager.displayStartMessages();
  return this.battleInput = new KD_ATBS.LIBS.InputBattle(scene);
};

BattleManagerATBS.isFastBattleMode = function() {
  return this._fastBattleMode === true;
};

BattleManagerATBS.update = function() {
  UIManagerATBS.update();
  this.battleInput.update();
  if (BattleManagerATBS.isBusy()) {
    return this._updateWhenBusy();
  } else {
    return this._updateMain();
  }
};

BattleManagerATBS.isBusy = function() {
  return $gameMessage.isBusy();
};

BattleManagerATBS._updateWhenBusy = function() {
  var ref;
  this.hide();
  return (ref = this.playerInput) != null ? ref.updateForWait() : void 0;
};

BattleManagerATBS._updateMain = function() {
  if (!BattleManagerATBS.isBattleEnd()) {
    UIManagerATBS.show();
  }
  this._updatePhases();
  if (this.isBattle()) {
    return this._updateInBattle();
  } else {
    if (!BattleManagerATBS.isBattleEnd()) {
      return this._updateOnStart();
    }
  }
};

BattleManagerATBS._updatePhases = function() {
  if (this._phase === 'start') {
    this.battleProcess.processEvent();
  }
  if (this._phase === 'battle') {
    this._updateBattlePhase();
  }
  if (this._phase === 'final') {
    this._updateFinalPhase();
  }
  if (BattleManagerATBS.isBattleEnd()) {
    return BattleManager.updateBattleEnd();
  }
};

BattleManagerATBS._updateBattlePhase = function() {
  var i, item, len, ref;
  this._battleTurnTimer.update();
  ref = this.getAllBattleMembers();
  for (i = 0, len = ref.length; i < len; i++) {
    item = ref[i];
    item.updateInBattle();
  }
  if (this.isTurnEnd()) {
    return this._turnEnd();
  }
};

BattleManagerATBS.getAllBattleMembers = function() {
  return $gameParty.battleMembers().concat($gameTroop.members());
};

BattleManagerATBS.isTurnEnd = function() {
  var ref;
  return (ref = this._battleTurnTimer) != null ? ref.isReady() : void 0;
};

BattleManagerATBS._turnEnd = function() {
  var i, item, len, ref;
  ref = this.getAllBattleMembers();
  for (i = 0, len = ref.length; i < len; i++) {
    item = ref[i];
    item.onTurnEnd();
  }
  this.battleProcess.processEvent();
  return this._turnStart();
};

BattleManagerATBS._turnStart = function() {
  var turnTime;
  turnTime = KD_ATBS.SYSTEM.TURN_TIME;
  if (BattleManagerATBS.isFastBattleMode()) {
    turnTime *= KD_ATBS.SYSTEM.FAST_BATTLE_TIME_KOEF;
  }
  this._battleTurnTimer.start(turnTime);
  return $gameTroop.increaseTurn();
};

BattleManagerATBS._updateFinalPhase = function() {
  return this._phase = 'battleEnd';
};

BattleManagerATBS._updateInBattle = function() {
  this.battleProcess.processEvent();
  this._processEnemy();
  this._processPlayer();
  this._processAlly();
  return this.checkBattleEnd();
};

BattleManagerATBS._processEnemy = function() {
  $gameTroop.members().forEach(function(member) {
    return BattleManagerATBS._makeActionForBattler(member);
  });
};

BattleManagerATBS._makeActionForBattler = function(battler) {
  if (battler.isReadyForAction() && battler.isAlive()) {
    battler.makeActions();
    this.battleProcess.makeBattleAction(battler);
  }
};

BattleManagerATBS._processPlayer = function() {
  var player;
  if (BattleManagerATBS.isFastBattleMode()) {
    player = $gameParty.leader();
    return BattleManagerATBS._makeActionForBattler(player);
  } else {
    return this.playerInput.update();
  }
};

BattleManagerATBS._processAlly = function() {
  $gameParty.battleMembers().forEach(function(member) {
    if (!member.isPlayer()) {
      return BattleManagerATBS._makeActionForBattler(member);
    }
  });
};

BattleManagerATBS.checkBattleEnd = function() {
  if ((this._phase != null) && this._phase !== 'final') {
    if ($gameParty.isEmpty()) {
      this.abortBattle();
      return true;
    }
    if ($gameParty.isAllDead()) {
      this._onBattleEnd();
      BattleManager.processDefeat();
      return true;
    }
    if ($gameTroop.isAllDead()) {
      this._onBattleEnd();
      BattleManager.processVictory();
      return true;
    }
  } else {
    return false;
  }
};

BattleManagerATBS.abortBattle = function() {
  return BattleManager.abort();
};

BattleManagerATBS._onBattleEnd = function() {
  this.hide();
  this._fastBattleMode = false;
  return this._phase = 'final';
};

BattleManagerATBS.hide = function() {
  var ref;
  UIManagerATBS.hide();
  this.battleInput.hide();
  return (ref = this.playerInput) != null ? ref.hide() : void 0;
};

BattleManagerATBS._updateOnStart = function() {
  var ref;
  if (!this.battleInput.isOpen()) {
    return (ref = this.battleInput) != null ? ref.open() : void 0;
  }
};

BattleManagerATBS.terminate = function() {
  return UIManagerATBS.terminate();
};

BattleManagerATBS.canUseFastBattle = function() {
  return this._isFastBattleAllowed === true && this._isFastBattleExists === true;
};

BattleManagerATBS.isBattle = function() {
  return this._phase === 'battle';
};

BattleManagerATBS.isBattleEnd = function() {
  return this._phase === 'battleEnd' || this._phase === 'final';
};

BattleManagerATBS.startBattle = function() {
  this.playerInput = new KD_ATBS.LIBS.InputPlayer(this.battleInput.layer);
  this.battleInput.setAnotherInput(this.playerInput);
  UIManagerATBS.onBattleStart();
  this._phase = 'battle';
  this._turnStart();
  return this.battleProcess.processEvent();
};

BattleManagerATBS.setFastBattleMode = function() {
  var i, item, len, ref;
  this._fastBattleMode = true;
  ref = this.getAllBattleMembers();
  for (i = 0, len = ref.length; i < len; i++) {
    item = ref[i];
    item.setFastBattleMode();
  }
};

BattleManagerATBS.isActionForced = function() {
  return this.battleProcess.isActionForced();
};

BattleManagerATBS.setForceActionBattler = function(battler) {
  return this.battleProcess.setForceActionBattler(battler);
};

BattleManagerATBS.activateBattleInput = function() {
  var ref;
  return (ref = this.battleInput) != null ? ref.activate() : void 0;
};

BattleManagerATBS.clickExternalTarget = function(battler) {
  var ref;
  return (ref = this.playerInput) != null ? ref.clickExternalTarget(battler) : void 0;
};

BattleManagerATBS.allowFastBattleMode = function(isAllowed) {
  return this._isFastBattleAllowed = isAllowed;
};

// ■ END BattleManagerATBS.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleUIManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var UIManagerATBS;

UIManagerATBS = function() {
  throw new Error('This is a static class');
};

UIManagerATBS.init = function(scene) {
  this.scene = scene;
  this.spriteset = new Spriteset_Battle();
  this.scene.addChild(this.spriteset);
  this.layerManager = new KD_ATBS.LIBS.BattleLayers(this.scene); //spriteset!
  this.interfaceManager = new KD_ATBS.LIBS.BattleInterfaces(this.layerManager);
  return this._isHidden = false;
};

UIManagerATBS.onBattleStart = function() {
  this.interfaceManager.onBattleStart();
  return this.show();
};

UIManagerATBS.update = function() {
  return this.interfaceManager.update();
};

UIManagerATBS.terminate = function() {
  return this.interfaceManager.terminate();
};

UIManagerATBS.show = function() {
  this.interfaceManager.show();
  return this._isHidden = false;
};

UIManagerATBS.hide = function() {
  this.interfaceManager.hide();
  return this._isHidden = true;
};

UIManagerATBS.isHidden = function() {
  return this._isHidden === true;
};

UIManagerATBS.getEnemySprite = function(enemy) {
  return this.spriteset._enemySprites.find(function(sprite) {
    return sprite._enemy === enemy;
  });
};

UIManagerATBS.getActorSprite = function(actor) {
  return this.spriteset._actorSprites.find(function(sprite) {
    return sprite._actor === actor;
  });
};

UIManagerATBS.selectEnemy = function(enemyIndex, iconIndex) {
  if (this.interfaceManager != null) {
    return this.interfaceManager.selectEnemy(enemyIndex, iconIndex);
  }
};

UIManagerATBS.deselectAllEnemies = function() {
  if (this.interfaceManager != null) {
    return this.interfaceManager.deselectAllEnemies();
  }
};

UIManagerATBS.onAnyBeenKiled = function(subject, target) {
  if (this.interfaceManager != null) {
    return this.interfaceManager.pushKillInfo(subject, target);
  }
};

UIManagerATBS.onEnemyTransform = function(enemyIndex) {
  var ref;
  return (ref = this.interfaceManager) != null ? ref.onEnemyTransform(enemyIndex) : void 0;
};

// ■ END BattleUIManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ParametersManagerATBS.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var ParametersManagerATBS;

ParametersManagerATBS = class ParametersManagerATBS extends KDCore.ParametersManager {
  constructor() {
    super('KD ATBS');
  }

  getControlKeys() {
    var keys;
    keys = [];
    keys[0] = this.getString('Controls_Key_W');
    keys[1] = this.getString('Controls_Key_D');
    keys[2] = this.getString('Controls_Key_S');
    keys[3] = this.getString('Controls_Key_A');
    keys[4] = this.getString('Controls_Key_SP');
    keys[5] = this.getString('Controls_Key_E');
    return keys;
  }

  loadAllStrings() {
    var loader;
    loader = new KDCore.StringsLoader(this._parameters);
    return loader.loadAllStringsToObject(KD_ATBS.SYSTEM);
  }

  getWaitTimeFormula() {
    var formula;
    formula = this.getString('Common_Formula');
    if (formula === "") {
      formula = KD_ATBS.SYSTEM.FORMULA;
    }
    return this.convertFormula(formula);
  }

  convertFormula(formula) {
    formula = formula.replace(/attackSpeed/i, 'this.attackSpeed()');
    formula = formula.replace(/hp/i, 'this.hp');
    formula = formula.replace(/mp/i, 'this.mp');
    formula = formula.replace(/tp/i, 'this.tp');
    formula = formula.replace(/mhp/i, 'this.mhp');
    formula = formula.replace(/mmp/i, 'this.mmp');
    formula = formula.replace(/atk/i, 'this.atk');
    formula = formula.replace(/def/i, 'this.def');
    formula = formula.replace(/mat/i, 'this.mat');
    formula = formula.replace(/mdf/i, 'this.mdf');
    formula = formula.replace(/agi/i, 'this.agi');
    formula = formula.replace(/luk/i, 'this.luk');
    return formula;
  }

  getFastBattleMode() {
    return this._getBooleanFromCache('Common_AllowFB');
  }

  _getBooleanFromCache(name) {
    return this.getFromCacheOrInit(name, function() {
      var object;
      object = this.getBoolean(name);
      return object;
    });
  }

  getGuardStateId() {
    return this.getNumber('Common_Guard');
  }

  loadFont() {
    var font;
    font = this.getString('Interface_Font');
    if (font !== "") {
      return KD_ATBS.SYSTEM.FONT = font;
    }
  }

  getEnemyAttackAnimId() {
    return this._getNumberFromCache("Animation_EnemyAttack");
  }

  _getNumberFromCache(name) {
    return this.getFromCacheOrInit(name, function() {
      var object;
      object = this.getNumber(name);
      return object;
    });
  }

  getEnemyMovingData() {
    var name;
    name = 'Animation_EnemyMoving';
    return this.getFromCacheOrInit(name, function() {
      var object;
      object = this.getObject(name);
      this.convertField(object, 'PlayAnimation');
      this.convertField(object, 'MoveStep');
      this.convertField(object, 'MoveTime');
      return object;
    });
  }

};

// ■ END ParametersManagerATBS.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ATBS_InputExtension.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var KEYS_GAME, KEYS_RAW, UNSAFE;
  UNSAFE = ['q', 'w', 'x', 'z', 'space'];
  KEYS_RAW = ['w', 'd', 's', 'a', 'space', 'e'];
  KEYS_GAME = ['pagedown', 'd', 's', 'a', 'ok', 'e'];
  //?[NEW]
  KD_ATBS.LIBS.IKey.loadUserConfig = function() {
    var i, j, ref;
    if (!KD_ATBS.Parameters.isLoaded()) {
      return;
    }
    KEYS_RAW = KD_ATBS.Parameters.getControlKeys();
    for (i = j = 0, ref = KEYS_RAW.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      KEYS_GAME[i] = KD_ATBS.LIBS.IKey.convertUnsafeSymbols(KEYS_RAW[i]);
    }
  };
  //?[NEW]
  KD_ATBS.LIBS.IKey.convertUnsafeSymbols = function(symbol) {
    symbol = symbol.toLowerCase();
    if (!UNSAFE.includes(symbol)) {
      return symbol;
    }
    if (symbol === 'q') {
      return 'pageup';
    }
    if (symbol === 'w') {
      return 'pagedown';
    }
    if (symbol === 'x') {
      return 'escape';
    }
    if (symbol === 'z') {
      return 'ok';
    }
    if (symbol === 'space') {
      return 'ok';
    }
  };
  //?[OVER]
  KD_ATBS.LIBS.IKey.W = function() {
    if (Input.isGamepad()) {
      return 'menu';
    } else {
      return KEYS_GAME[0];
    }
  };
  KD_ATBS.LIBS.IKey.D = function() {
    if (Input.isGamepad()) {
      return 'cancel';
    } else {
      return KEYS_GAME[1];
    }
  };
  KD_ATBS.LIBS.IKey.S = function() {
    if (Input.isGamepad()) {
      return 'ok';
    } else {
      return KEYS_GAME[2];
    }
  };
  KD_ATBS.LIBS.IKey.A = function() {
    if (Input.isGamepad()) {
      return 'shift';
    } else {
      return KEYS_GAME[3];
    }
  };
  KD_ATBS.LIBS.IKey.SPACE = function() {
    if (Input.isGamepad()) {
      return 'pagedown';
    } else {
      return KEYS_GAME[4];
    }
  };
  KD_ATBS.LIBS.IKey.E = function() {
    if (Input.isGamepad()) {
      return 'pagedown';
    } else {
      return KEYS_GAME[5];
    }
  };
  //?[END OVER]

  //?[OVER]
  KD_ATBS.LIBS.IKey.getKeyboardButtonImage = function(symbol, size) {
    var keyBitmap, newKeyBitmap;
    symbol = KD_ATBS.LIBS.IKey.convertIKeyToLetter(symbol);
    keyBitmap = ATBS_ResourceManager.keyboardButton.bitmap;
    newKeyBitmap = KD_ATBS.LIBS.IKey._createButtonBitmap(keyBitmap, size);
    KD_ATBS.LIBS.IKey._drawSymbol(newKeyBitmap, symbol, size);
    return newKeyBitmap;
  };
  //?[NEW]
  KD_ATBS.LIBS.IKey.convertIKeyToLetter = function(symbol) {
    if (symbol === KD_ATBS.LIBS.IKey.W()) {
      symbol = KEYS_RAW[0];
    }
    if (symbol === KD_ATBS.LIBS.IKey.D()) {
      symbol = KEYS_RAW[1];
    }
    if (symbol === KD_ATBS.LIBS.IKey.S()) {
      symbol = KEYS_RAW[2];
    }
    if (symbol === KD_ATBS.LIBS.IKey.A()) {
      symbol = KEYS_RAW[3];
    }
    if (symbol === KD_ATBS.LIBS.IKey.SPACE()) {
      symbol = KEYS_RAW[4];
    }
    if (symbol === KD_ATBS.LIBS.IKey.E()) {
      symbol = KEYS_RAW[5];
    }
    return symbol;
  };
})();

// ■ END ATBS_InputExtension.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleInterfaces.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var BattleInterfaces, UI_LayerObject;
  UI_LayerObject = KD_ATBS.LIBS.UI_LayerObject;
  BattleInterfaces = class BattleInterfaces extends UI_LayerObject {
    constructor(layerManager) {
      super(null);
      this.layerManager = layerManager;
    }

    onBattleStart() {
      this._createPartyInterface();
      this._createTroopInterface();
      return this._createBattleInterface();
    }

    _createPartyInterface() {
      return this._party = new KD_ATBS.LIBS.PartyInterface(this.layerManager.getParty());
    }

    _createTroopInterface() {
      return this._troop = new KD_ATBS.LIBS.TroopInterface(this.layerManager.getTroop());
    }

    _createBattleInterface() {
      return this._battle = new KD_ATBS.LIBS.BattleInterface(this.layerManager.getBattleLog());
    }

    isCreated() {
      return this._party != null;
    }

    selectEnemy(enemyIndex, iconIndex) {
      if (this._troop != null) {
        return this._troop.select(enemyIndex, iconIndex);
      }
    }

    pushKillInfo(subject, target) {
      return this._battle.pushKillInfo(subject, target);
    }

    deselectAllEnemies() {
      if (this._troop != null) {
        return this._troop.deselectAll();
      }
    }

    onEnemyTransform(enemyIndex) {
      var ref;
      return (ref = this._troop) != null ? ref.onEnemyTransform(enemyIndex) : void 0;
    }

    show() {
      return UI_LayerObject.prototype.show.call(this);
    }

    hide() {
      if (!this.isCreated()) {
        return;
      }
      UI_LayerObject.prototype.hide.call(this);
      this._party.hide();
      this._troop.hide();
      return this._battle.hide();
    }

    update() {
      if (!this.isCreated()) {
        return;
      }
      if (!this.isVisible()) {
        return;
      }
      this._party.update();
      this._troop.update();
      return this._battle.update();
    }

    terminate() {
      if (!this.isCreated()) {
        return;
      }
      this._party.terminate();
      this._troop.terminate();
      return this._battle.terminate();
    }

  };
  KD_ATBS.register(BattleInterfaces);
})();

// ■ END BattleInterfaces.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleLog.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    class BattleLog {
        constructor() {
            this._logWindow = new Window_BattleLog();
        }

        showAnimation(subject, targets, animationId) {
            if (animationId < 0) {
                this._show_attack_animation(subject, targets);
            } else {
                this._logWindow.showNormalAnimation(targets, animationId, false);
            }
        }

        _show_attack_animation(subject, targets) {
            if (subject.isEnemy()) {
                SoundManager.playEnemyAttack();
            }
            this._logWindow.showActorAttackAnimation(subject, targets);
        }

        onActionResult(subject, target) {
            if (target.result().used) {
                this._on_damage(target);
                this._on_failure(target);
                if (target.result().isStatusAffected())
                    this._on_affected_status(target);
                if (!target.isAlive()) {
                    UIManagerATBS.onAnyBeenKiled(subject, target);
                }
            }
        }

        onCounterAttack(target) {
            target.performCounter();
        }

        onMagicReflection(target) {
            target.performReflection();
        }

        onSubstitute(substitute, target) {
            substitute.performSubstitute(target);
        }

        _on_damage(target) {
            if (target.result().missed) {

                if (target.result().physical) {
                    target.performMiss();
                } else {
                    this._on_failure();
                }

            } else if (target.result().evaded) {
                if (target.result().physical) {
                    target.performEvasion();
                } else {
                    target.performMagicEvasion();
                }
            } else {
                //HP
                if (target.result().hpAffected) {
                    if (target.result().hpDamage > 0 && !target.result().drain) {
                        target.performDamage();
                    }
                    if (target.result().hpDamage < 0) {
                        target.performRecovery();
                    }
                }
                //MP
                if (target.isAlive() && target.result().mpDamage !== 0) {
                    if (target.result().mpDamage < 0) {
                        target.performRecovery();
                    }
                }
                //TP
                if (target.isAlive() && target.result().tpDamage !== 0) {
                    if (target.result().tpDamage < 0) {
                        target.performRecovery();
                    }
                }
            }
            KD_ATBS.LIBS.PopInfoManagerABS.makeItemPopUp(target);
        }

        //?[EMPTY]
        _on_failure(target) {}

        _on_affected_status(target) {
            let states = target.result().addedStateObjects();
            states.forEach(function (state) {
                var state_msg = target.isActor() ? state.message1 : state.message2;
                if (state.id === target.deathStateId())
                    target.performCollapse();
                this._add_state_info(target, state_msg);
            }.bind(this));
        }

        //?[EMPTY]
        _add_state_info(target, msg) {}
    }

    KD_ATBS.register(BattleLog);
})();
// ■ END BattleLog.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[OVER EMPTY]
BattleManager.startBattle = function () {};

//?[OVER]
BattleManager.isTurnEnd = function () {
    return BattleManagerATBS.isTurnEnd();
};

//?[OVER]
BattleManager.abort = function () {
    BattleManager.processAbort();
};

//?[OVER]
BattleManager.isActionForced = function () {
    return BattleManagerATBS.isActionForced();
};

//?[OVER]
BattleManager.forceAction = function (battler) {
    BattleManagerRTBS.getProcess().setForceActionBattler(battler);
};

var alias_BattleManager_processAbort_pkd = BattleManager.processAbort;
BattleManager.processAbort = function () {
    BattleManagerATBS._onBattleEnd();
    alias_BattleManager_processAbort_pkd.call(this);
};

//?[OVER EMPTY]
BattleManager.startTurn = function () {};

// ■ END BattleManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleProcess.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    class BattleProcess {
        constructor() {
            this._subject = null;
            this._action = null;
            this._forceAction = null;
            this._log = new KD_ATBS.LIBS.BattleLog();
        }

        makeBattleAction(battler) {
            this._subject = battler;
            this._process_action();
        }

        _process_action() {
            if (this._subject == null || !this._subject.currentAction()) {
                return;
            }
            var action = this._subject.currentAction();
            if (action) {
                this._action = action;
                action.prepare();
                if (action.isValid()) {
                    this._start_action();
                    this._end_action();
                }
                this._subject.removeCurrentAction();
            }
        }

        _start_action() {
            if (!BattleManagerATBS.isFastBattleMode()) {
                this._subject.requestEffect('whiten');
            }
            var targets = this._action.makeTargets();
            this._subject.useItem(this._action.item());
            this._action.applyGlobal();
            if (!BattleManagerATBS.isFastBattleMode())
                this._log.showAnimation(this._subject, targets, this._action.item().animationId);
            targets.forEach(function (target) {
                this._invoke_action(target, this._action);
            }.bind(this));
        }

        _end_action() {
            this._subject.performActionEnd();
            this._subject.onAllActionsEnd();
            BattleManagerATBS.checkBattleEnd();
            this._subject.makeActions();
        }

        _invoke_action(target, action) {
            if (Math.random() < action.itemCnt(target)) {
                this.invokeCounterAttack(this._subject, target);
            } else if (Math.random() < action.itemMrf(target)) {
                this.invokeMagicReflection(this._subject, target);
            } else {
                this.invokeNormalAction(this._subject, target);
            }
            this._subject.setLastTarget(target);
        }

        invokeCounterAttack(subject, target) {
            this._log.onCounterAttack(target);
            var action = new Game_Action(target);
            action.setAttack();
            action.apply(subject);
            this._log.onActionResult(subject, target);
        }

        invokeMagicReflection(subject, target) {
            this._log.onMagicReflection(target);
            this._action.apply(subject);
            this._log.onActionResult(subject, target);
        }

        invokeNormalAction(subject, target) {
            var realTarget = this.applySubstitute(target);
            this._action.apply(realTarget);
            this._log.onActionResult(subject, target);
        }

        applySubstitute(target) {
            if (this.checkSubstitute(target)) {
                var substitute = target.friendsUnit().substituteBattler();
                if (substitute && target !== substitute) {
                    this._log.onSubstitute(substitute, target);
                    return substitute;
                }
            }
            return target;
        }

        checkSubstitute(target) {
            return target.isDying() && !this._action.isCertainHit();
        }

        isActionForced() {
            return this._forceAction != null;
        }

        setForceActionBattler(battler) {
            this._forceAction = battler;
        }

        processForcedAction() {
            if (this.isActionForced()) {
                var last_subject = this._subject;
                this._subject = this._forceAction;
                this._forceAction = null;
                this._process_action();
                this._subject = last_subject;
            }
        }

        processEvent() {
            this.processForcedAction();
            $gameTroop.updateInterpreter();
            if ($gameTroop.isEventRunning() || BattleManagerATBS.checkBattleEnd()) {
                return;
            }
            $gameTroop.setupBattleEvent();
            if ($gameTroop.isEventRunning() || SceneManager.isSceneChanging()) {
                return;
            }
        }
    }
    KD_ATBS.register(BattleProcess);
})();
// ■ END BattleProcess.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Action.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
var pkd_GameAction_makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function (target, critical) {
    KD_ATBS.LIBS.PopInfoManagerABS.calcRate(this.calcElementRate(target));
    return pkd_GameAction_makeDamageValue.call(this, target, critical);
};

var pkd_GameAction_executeDamage = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function (target, value) {
    pkd_GameAction_executeDamage.call(this, target, value);
    KD_ATBS.LIBS.PopInfoManagerABS.makeDamagePopUp(target);
    if (this.isDrain()) {
        KD_ATBS.LIBS.PopInfoManagerABS.makeDrainPopUp(this.subject());
    }
};

var pkd_GameAction_itemEffectRecoverHp = Game_Action.prototype.itemEffectRecoverHp;
Game_Action.prototype.itemEffectRecoverHp = function (target, effect) {
    pkd_GameAction_itemEffectRecoverHp.call(this, target, effect);
    KD_ATBS.LIBS.PopInfoManagerABS.makeDamagePopUp(target);
};

var pkd_GameAction_itemEffectRecoverMp = Game_Action.prototype.itemEffectRecoverMp;
Game_Action.prototype.itemEffectRecoverMp = function (target, effect) {
    pkd_GameAction_itemEffectRecoverMp.call(this, target, effect);
    KD_ATBS.LIBS.PopInfoManagerABS.makeDamagePopUp(target);
};

var pkd_GameAction_itemEffectGainTp = Game_Action.prototype.itemEffectGainTp;
Game_Action.prototype.itemEffectGainTp = function (target, effect) {
    pkd_GameAction_itemEffectGainTp.call(this, target, effect);
    KD_ATBS.LIBS.PopInfoManagerABS.makeDamagePopUp(target);
};

var pkd_GameAction_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function (target, value) {
    pkd_GameAction_executeHpDamage.call(this, target, value);
    if (value == 0) {
        KD_ATBS.LIBS.PopInfoManagerABS.makeZeroDamagePopUp(target);
    }
};
// ■ END Game_Action.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

var pkd_GameActor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function () {
    pkd_GameActor_initMembers.call(this);
    this._circleBattleSkillsIds = [0, 0, 0, 0]; //ID Навыков для круга
    this._resetAtbsSkillMembers();
};

Game_Actor.prototype._resetAtbsSkillMembers = function () {
    this._skillsIdAndTimersForRecharge = {}; //ID навыка -> таймер
    this._circleBattleSkillsSet = null;
};

//?[OVER]
Game_Actor.prototype.isSpriteVisible = function () {
    return true;
};

var pkd_GameActor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
    pkd_GameActor_setup.call(this, actorId);
    this._waitMod = $dataActors[actorId].meta.WaitMod || 1;
};

//?[NEW]
Game_Actor.prototype.addBattleSkill = function (item, index) {
    this._circleBattleSkillsSet = null;
    try {
        var sameIndex = this._getSameSkillIndex(item.id);
        if (sameIndex == index) {
            this._circleBattleSkillsIds[index] = 0;
        } else {
            if (sameIndex >= 0)
                this._circleBattleSkillsIds[sameIndex] = 0;
            this._circleBattleSkillsIds[index] = item.id;
        }
    } catch (e) {
        console.error(e);
        this._circleBattleSkillsIds[index] = 0;
    }
};

Game_Actor.prototype._getSameSkillIndex = function (itemId = -1) {
    return this._circleBattleSkillsIds.indexOf(itemId);
};

var pkd_GameActor_resetStateCounts = Game_Actor.prototype.resetStateCounts;
Game_Actor.prototype.resetStateCounts = function (stateId) {
    pkd_GameActor_resetStateCounts.call(this, stateId);
    if (this.isFastBattle())
        this._stateSteps[stateId] *= KD_ATBS.SYSTEM.FAST_BATTLE_TIME_KOEF;

};

//?[NEW]
Game_Actor.prototype.getRechargeSkills = function () {
    return this._skillsIdAndTimersForRecharge;
};

//?[NEW]
Game_Actor.prototype.getBattleItemsCount = function () {
    return this.getBattleItems().length;
};

//?[NEW]
Game_Actor.prototype.hasItems = function () {
    return $gameParty.hasBattleItems();
};

//?[NEW]
Game_Actor.prototype.hasSkills = function () {
    return this._circleBattleSkillsIds.some((skill) => skill > 0);
};

//?[NEW]
Game_Actor.prototype.canUseSkills = function () {
    if (this.hasSkills()) {
        return this._circleBattleSkillsIds.some(((skillId) => this.canUse($dataSkills[skillId])).bind(this));
    }
    return false;
};

var pkd_GameActor_usableSkills = Game_Actor.prototype.usableSkills;
Game_Actor.prototype.usableSkills = function () {
    if ($gameParty.inBattle()) {
        var list = [];
        this._circleBattleSkillsIds.forEach(function (skillId) {
            if (skillId != 0)
                list.push($dataSkills[skillId]);
        }.bind(this));
        return list.filter(function (skill) {
            return this.canUse(skill);
        }, this);
    } else
        return pkd_GameActor_usableSkills.call(this);
};

//?[NEW]
Game_Actor.prototype.isSkillReady = function (skill_id) {
    var timer = this._skillsIdAndTimersForRecharge[skill_id];
    if (timer)
        return timer.isReady();
    else
        return true;
};

//?[NEW]
Game_Actor.prototype.startSkillRecharge = function (skill_id, koef = 1) {
    if (skill_id == this.guardSkillId())
        return;
    var time = 0;
    if (skill_id != this.attackSkillId()) {
        time = Math.abs($dataSkills[skill_id].speed) * koef * 60;
    }
    this._skillsIdAndTimersForRecharge[skill_id] = new Game_TimerABS(time);
};

//?[NEW]
Game_Actor.prototype.getBattleSkills = function () {
    if (this._circleBattleSkillsSet == null) {
        this._collectBattleSkills();
    }
    return this._circleBattleSkillsSet;
};

Game_Actor.prototype._collectBattleSkills = function () {
    this._circleBattleSkillsSet = [];
    KDCore.SDK.times(4, function (i) {
        if (this._circleBattleSkillsIds[i] > 0) {
            this._circleBattleSkillsSet[i] = $dataSkills[this._circleBattleSkillsIds[i]];
        } else {
            this._circleBattleSkillsSet[i] = null;
        }
    }.bind(this));
};

//?[NEW]
Game_Actor.prototype.getBattleItems = function () {
    return $gameParty.getBattleItems();
};

Game_Actor.prototype.meetsSkillConditions = function (skill) {
    var base = Game_BattlerBase.prototype.meetsSkillConditions.call(this, skill);
    if ($gameParty.inBattle())
        return (base && this.isSkillReady(skill.id));
    else return base;
};

Game_Actor.prototype.paySkillCost = function (skill) {
    Game_BattlerBase.prototype.paySkillCost.call(this, skill);
    if (skill.speed > 0)
        this.startSkillRecharge(skill.id);
};

Game_Actor.prototype.onBattleStart = function () {
    Game_Battler.prototype.onBattleStart.call(this);
    this._circleBattleSkillsIds.forEach(function (id) {
        if (id != 0) {
            try {
                var item = new Game_Item($dataSkills[id]);
                if (item.isInitialReload())
                    this.startSkillRecharge(id, item.PrepareKoef || 1);
            } catch (e) {
                console.error(e);
            }
        }
    }.bind(this));
};

Game_Actor.prototype.onBattleEnd = function () {
    Game_Battler.prototype.onBattleEnd.call(this);
    this._timer.reset();
    this._resetAtbsSkillMembers();
};

//?[NEW]
Game_Actor.prototype.updateInBattle = function () {
    Game_Battler.prototype.updateInBattle.call(this);
    for (var key in this._skillsIdAndTimersForRecharge) {
        if (this._skillsIdAndTimersForRecharge.hasOwnProperty(key)) {
            var timer = this._skillsIdAndTimersForRecharge[key];
            if (timer) {
                timer.update();
                if (timer.isReady()) {
                    KD_ATBS.LIBS.PopInfoManagerABS.makeSkillRechargePopUp(this, key);
                    delete this._skillsIdAndTimersForRecharge[key];
                }
            }
        }
    }
};

//?[OVER]
Game_Actor.prototype.isAutoBattle = function () {
    if (this.isFastBattle() == true)
        return true;
    else
        return !this.isPlayer();
};

//?[NEW OVER]
Game_Actor.prototype.isPlayer = function () {
    return ($gameParty.leader() == this);
};

//?[OVER]
Game_Actor.prototype.performDamage = function () {
    Game_Battler.prototype.performDamage.call(this);
    if (this.isPlayer()) {
        $gameScreen.startShake(5, 5, 10);
    }
    SoundManager.playActorDamage();
};

var pkd_GameActor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function (skillId) {
    pkd_GameActor_learnSkill.call(this, skillId);
    var slot = this._getEmptySkillSlot();
    if (slot != -1) {
        this._circleBattleSkillsIds[slot] = skillId;
        this._circleBattleSkillsSet = null;
    }
};

Game_Actor.prototype._getEmptySkillSlot = function () {
    return this._circleBattleSkillsIds.indexOf(0);
};

var pkd_GameActor_forgetSkill = Game_Actor.prototype.forgetSkill;
Game_Actor.prototype.forgetSkill = function (skillId) {
    pkd_GameActor_forgetSkill.call(this, skillId);
    var index = this._circleBattleSkillsIds.indexOf(skillId);
    if (index >= 0) {
        this._circleBattleSkillsIds[index] = 0;
        this._circleBattleSkillsSet = null;
    }
};

//?[NEW]
Game_Actor.prototype._calculateWaitTime = function () {
    Game_Battler.prototype._calculateWaitTime.call(this);
    this._waitTime = Math.round(this._waitTime * this._waitMod);
    if (this.isAutoBattle()) {
        this._calculateWaitTimeForPartyAI();
    }
    this._timer.setMaxTime(this._waitTime);
};

Game_Actor.prototype._calculateWaitTimeForPartyAI = function () {
    var brainSpeed = KDCore.SDK.rand(this.agi / 2, this.agi * 1.5);
    if (this.isFastBattle()) {
        brainSpeed *= KD_ATBS.SYSTEM.FAST_BATTLE_TIME_KOEF;
    }
    this._waitTime = Math.floor(this._waitTime + brainSpeed);
};

// ■ END Game_Actor.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    var pkd_GameBattler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function () {
        pkd_GameBattler_initMembers.call(this);
        this._waitTime = KD_ATBS.SYSTEM.MINIMUM_WAIT_TIME;
        this._additionWaitTimeKoef = 1.0;
        this._createNewTimer();
    };

    Game_Battler.prototype._createNewTimer = function () {
        this._timer = new Game_TimerABS();
    };

    Game_Battler.prototype._calculateWaitTime = function () {
        this._calculateBaseTime();
        this._calculateTimeDependsOnAttackSpeed();
        this._applyFastBattleKoefToTime();
        this._timer.setMaxTime(this._waitTime);
    };

    Game_Battler.prototype._calculateBaseTime = function () {
        var value = this._calculateFormula();
        this._waitTime = KD_ATBS.SYSTEM.MINIMUM_WAIT_TIME + (value * KD_ATBS.SYSTEM.WAIT_TIME_KOEF);
        this._waitTime *= this._additionWaitTimeKoef;
    };

    Game_Battler.prototype._calculateFormula = function () {
        var value = 0;
        try {
            /* jshint -W061 */
            value = eval(BattleManagerATBS.FORMULA);
        } catch (err) {
            value = 0;
            console.error("Can't calculate wait time formula " + err);
        }
        return value;
    };

    Game_Battler.prototype._calculateTimeDependsOnAttackSpeed = function () {
        var attackSpeed = this.attackSpeed();
        if (attackSpeed > 0)
            this._waitTime -= this.attackSpeed();
        else
            this._waitTime += this.attackSpeed();

        this._waitTime = Math.max(KD_ATBS.SYSTEM.MINIMUM_WAIT_TIME, this._waitTime);
    };

    Game_Battler.prototype._applyFastBattleKoefToTime = function () {
        if (this.isFastBattle()) {
            this._waitTime *= KD_ATBS.SYSTEM.FAST_BATTLE_TIME_KOEF;
        }
    };

    //?[NEW]
    Game_Battler.prototype.isFastBattle = function () {
        return BattleManagerATBS.isFastBattleMode();
    };

    //?[NEW]
    Game_Battler.prototype.setFastBattleMode = function () {
        this._calculateWaitTime();
    };

    var pkd_GameBattler_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function () {
        pkd_GameBattler_onBattleStart.call(this);
        this._createNewTimer();
        this._calculateWaitTime();
    };

    var pkd_GameBattler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
    Game_Battler.prototype.onBattleEnd = function () {
        pkd_GameBattler_onBattleEnd.call(this);
        this.clearInfoPops();
    };

    var pkd_GameBattler_canMove = Game_Battler.prototype.canMove;
    Game_Battler.prototype.canMove = function () {
        var baseValue = pkd_GameBattler_canMove.call(this);
        if ($gameParty.inBattle())
            return (baseValue && this.isReadyForAction());
        else
            return baseValue;
    };

    //?[NEW]
    Game_Battler.prototype.isReadyForAction = function () {
        return this.getTimer().isReady();
    };

    //?[NEW]
    Game_Battler.prototype.getTimer = function () {
        return this._timer;
    };

    //?[OVER]
    Game_Battler.prototype.onTurnEnd = function () {
        this.regenerateAll();
    };

    //?[OVER]
    Game_Battler.prototype.onAllActionsEnd = function () {
        this.clearResult();
        this.removeStatesAuto(1);
        this.resetWait();
        this._additionWaitTimeKoef = 1.0;
    };

    //?[NEW]
    Game_Battler.prototype.resetWait = function () {
        this._calculateWaitTime();
        this._timer.reset();
    };

    //?[OVER]
    Game_Battler.prototype.resetStateCounts = function (stateId) {
        var state = $dataStates[stateId];
        var variance = 0;
        if (state.autoRemovalTiming != 1) {
            variance += Math.max(state.maxTurns - state.minTurns, 0);
            this._stateTurns[stateId] = (state.minTurns + Math.randomInt(1 + variance)) * 60;
            if (this.isFastBattle())
                this._stateTurns[stateId] *= KD_ATBS.SYSTEM.FAST_BATTLE_TIME_KOEF;
        } else {
            this._stateTurns[stateId] = 1; //After Action
        }
    };

    //?[OVER]
    Game_Battler.prototype.overwriteBuffTurns = function (paramId, turns) {
        var newTurns = turns * 60;
        if (this.isFastBattle())
            newTurns *= KD_ATBS.SYSTEM.FAST_BATTLE_TIME_KOEF;

        if (this._buffTurns[paramId] < newTurns) {
            this._buffTurns[paramId] = newTurns;
        }
    };

    var pkd_GameBattler_useItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function (item) {
        if ($gameParty.inBattle()) {
            var i = new Game_Item(item);
            if (i.isInstantCast()) {
                this._additionWaitTimeKoef = 0;
            } else {
                this._additionWaitTimeKoef = i.timeMod;
            }
        }
        pkd_GameBattler_useItem.call(this, item);
    };

    Game_Battler.prototype.addNewState = function (stateId) {
        Game_BattlerBase.prototype.addNewState.call(this, stateId);
        if (this._states.include(stateId))
            KD_ATBS.LIBS.PopInfoManagerABS.makeStatePopUp(this, stateId, false);
    };

    var pkd_GameBattler_addBuff = Game_Battler.prototype.addBuff;
    Game_Battler.prototype.addBuff = function (paramId, turns) {
        KD_ATBS.LIBS.PopInfoManagerABS.makeBuffPopUp(this, paramId, true);
        pkd_GameBattler_addBuff.call(this, paramId, turns);
    };

    var pkd_GameBattler_addDebuff = Game_Battler.prototype.addDebuff;
    Game_Battler.prototype.addDebuff = function (paramId, turns) {
        KD_ATBS.LIBS.PopInfoManagerABS.makeBuffPopUp(this, paramId, false);
        pkd_GameBattler_addDebuff.call(this, paramId, turns);
    };

    var pkd_GameBattler_regenerateAll = Game_Battler.prototype.regenerateAll;
    Game_Battler.prototype.regenerateAll = function () {
        this.clearResult();
        pkd_GameBattler_regenerateAll.call(this);
        if (this.isAlive())
            KD_ATBS.LIBS.PopInfoManagerABS.makeDamagePopUp(this);
    };

    //?[NEW]
    Game_Battler.prototype.updateInBattle = function () {
        this._timer.update();
        this.updateStateTurns();
        this.updateBuffTurns();
        this.removeStatesAuto(2);
        this.removeBuffsAuto();
    };
})();
// ■ END Game_Battler.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_BattlerBase.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

var pkd_GameBattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function () {
    pkd_GameBattlerBase_initMembers.call(this);
    this.clearInfoPops();
};

//?[NEW]
Game_BattlerBase.prototype.clearInfoPops = function () {
    this._popupsAtbs = [];
};

var pkd_GameBattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
Game_BattlerBase.prototype.eraseState = function (stateId) {
    if (this._states.include(stateId)) {
        KD_ATBS.LIBS.PopInfoManagerABS.makeStatePopUp(this, stateId, true);
    }
    pkd_GameBattlerBase_eraseState.call(this, stateId);
};

//?[NEW]
Game_BattlerBase.prototype.getInfoPops = function () {
    return this._popupsAtbs;
};

//?[NEW]
Game_BattlerBase.prototype.addInfoPop = function (info) {
    this._popupsAtbs.push(info);
};

//?[NEW]
Game_BattlerBase.prototype.isPlayer = function () {
    return false;
};
// ■ END Game_BattlerBase.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
var pkd_GameEnemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function (enemyId, x, y) {
    pkd_GameEnemy_setup.call(this, enemyId, x, y);
    this._waitMod = $dataEnemies[enemyId].meta.WaitMod || 1;
    this._atbsAttackAnimationId1 = 6;
    if(KD_ATBS.Parameters.isLoaded()) {
        this._atbsAttackAnimationId1 = KD_ATBS.Parameters.getEnemyAttackAnimId();
    }
};

//?[NEW]
Game_Enemy.prototype.attackAnimationId1 = function () {
    return this._atbsAttackAnimationId1;
};

//?[NEW]
Game_Enemy.prototype.attackAnimationId2 = function () {
    return 0;
};

var pkd_GameEnemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function (enemyId) {
    pkd_GameEnemy_transform.call(this, enemyId);
    UIManagerATBS.onEnemyTransform(this.index());
    this.resetWait();
};

//?[NEW]
Game_Enemy.prototype._calculateWaitTime = function () {
    Game_Battler.prototype._calculateWaitTime.call(this);
    var brainSpeed = KDCore.SDK.rand(this.agi, this.agi + ((this.def + this.mdf) / 2));
    if (this.isFastBattle()) {
        brainSpeed *= KD_ATBS.SYSTEM.FAST_BATTLE_TIME_KOEF;
    }
    this._waitTime = Math.floor(this._waitTime + brainSpeed);
    this._waitTime = Math.round(this._waitTime * this._waitMod);
    this._timer.setMaxTime(this._waitTime);
};
// ■ END Game_Enemy.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ATBS') {
            switch (args[0]) {
                case 'enableFastBattle':
                    BattleManagerATBS.allowFastBattleMode(true);
                    break; 
                case 'disableFastBattle':
                    BattleManagerATBS.allowFastBattleMode(false);
                    break;
            }
        }
    };
})();
// ■ END Game_Interpreter.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Item.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
var pkd_GameItem_initialize = Game_Item.prototype.initialize;
Game_Item.prototype.initialize = function (item) {
    pkd_GameItem_initialize.call(this, item);
    this._paramsATBS = {};
    if (item)
        this._loadExtraATBS();
};

Game_Item.prototype._loadExtraATBS = function () {
    var temp = this.object();
    if (this.isUsableItem()) {
        this._paramsATBS.timeMod = temp.meta.TimeMod || 1;
        this._paramsATBS.prepareKoef = temp.meta.PrepareKoef || 0;
    }
};

//Мгновенное исполнение?
//?[NEW]
Game_Item.prototype.isInstantCast = function () {
    return (this.isUsableItem() && (this._paramsATBS.timeMod <= 0));
};

//Подготовка в начале боя?
//?[NEW]
Game_Item.prototype.isInitialReload = function () {
    return (this.isSkill() && (this._paramsATBS.prepareKoef > 0));
};


Object.defineProperties(Game_Item.prototype, {
    timeMod: {
        get: function () {
            return this._paramsATBS.timeMod || 1;
        },
        configurable: true
    },
    PrepareKoef: {
        get: function () {
            return this._paramsATBS.prepareKoef || 0;
        },
        configurable: true
    },
    id: {
        get: function () {
            return this.this._itemId;
        },
        configurable: true
    }
});

// ■ END Game_Item.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
var pkd_GameParty_initAllItems = Game_Party.prototype.initAllItems;
Game_Party.prototype.initAllItems = function () {
    pkd_GameParty_initAllItems.call(this);
    this._circleBattleItemsIds = [0, 0, 0, 0]; //Вещи для круга (ID)
    this._circleBattleItemsSet = null;
};

//?[NEW]
Game_Party.prototype.getBattleItems = function () {
    if (this._circleBattleItemsSet == null) {
        this._collectBattleItems();
    }
    return this._circleBattleItemsSet;
};

Game_Party.prototype._collectBattleItems = function () {
    this._circleBattleItemsSet = [];
    KDCore.SDK.times(4, function (i) {
        if (this._circleBattleItemsIds[i] > 0) {
            this._circleBattleItemsSet[i] = $dataItems[this._circleBattleItemsIds[i]];
        } else {
            this._circleBattleItemsSet[i] = null;
        }
    }.bind(this));
};

//?[NEW]
Game_Party.prototype.addBattleItem = function (item, index) {
    this._circleBattleItemsSet = null;
    try {
        var sameIndex = this._getSameItemIndex(item.id);
        if (sameIndex == index) {
            this._circleBattleItemsIds[index] = 0;
        } else {
            if (sameIndex >= 0)
                this._circleBattleItemsIds[sameIndex] = 0;
            this._circleBattleItemsIds[index] = item.id;
        }
    } catch (e) {
        console.error(e);
        this._circleBattleItemsIds[index] = 0;
    }
};

Game_Party.prototype._getSameItemIndex = function (itemId = - 1) {
   return this._circleBattleItemsIds.indexOf(itemId);
};


var pkd_GameParty_loseItem = Game_Party.prototype.loseItem;
Game_Party.prototype.loseItem = function (item, amount, includeEquip) {
    pkd_GameParty_loseItem.call(this, item, amount, includeEquip);
    this.useBattleItem(item);
};

//?[NEW]
Game_Party.prototype.useBattleItem = function (item) {
    if (!this.hasItem(item, false)) {
        try {
            var index = this._circleBattleItemsIds.indexOf(item.id);
            if (index != -1) {
                this._circleBattleItemsIds[index] = 0;
                this._circleBattleItemsSet = null;
            }
        } catch (e) {
            console.error(e);
        }
    }
};

//?[NEW]
Game_Party.prototype.hasBattleItems = function () {
    return this._circleBattleItemsIds.some((item) => item > 0);
};

var pkd_GameParty_onBattleStart = Game_Party.prototype.onBattleStart;
Game_Party.prototype.onBattleStart = function () {
    pkd_GameParty_onBattleStart.call(this);
    this._circleBattleItemsSet = null;
};

// ■ END Game_Party.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_TimerABS.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[FROM ALPHA ABS 1.2]
function Game_TimerABS() {
  this.initialize.apply(this, arguments);
}
Game_TimerABS.prototype.initialize = function (frameCount) {
  this._paused = false;
  this._mValue = frameCount || 0;
  this._value = 0;
};

Game_TimerABS.prototype.getMaxValue = function () {
  return this._mValue;
};

Game_TimerABS.prototype.getValue = function () {
  return this._value;
};

Game_TimerABS.prototype.setMaxTime = function (frameCount) {
  frameCount = Math.abs(Math.round(frameCount));
  this._mValue = frameCount;
  if (this._value > this._mValue)
    this._value = this._mValue;
};

Game_TimerABS.prototype.reset = function () {
  this._value = 0;
};

Game_TimerABS.prototype.update = function () {
  if (!this.isReady()) {
    if (!this._paused) {
      if (this._value < this._mValue)
        this._value += 1;
    }
  }
};

Game_TimerABS.prototype.isReady = function () {
  return (this._value >= this._mValue);
};

Game_TimerABS.prototype.stop = function () {
  this.start(0);
};

Game_TimerABS.prototype.start = function (frameCount) {
  this._value = 0;
  this._mValue = Math.abs(Math.round(frameCount));
  this._paused = false;
};

Game_TimerABS.prototype.pause = function () {
  if (this._paused)
    return;
  if (this._mValue == 0)
    return;
  this._paused = true;
};

Game_TimerABS.prototype.resume = function () {
  this._paused = false;
};

// ■ END Game_TimerABS.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ InputBattle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var IKey, InputBattle;
  IKey = KD_ATBS.LIBS.IKey;
  InputBattle = class InputBattle {
    constructor(layer, anotherInput = null) {
      this.layer = layer;
      this.anotherInput = anotherInput;
      this.activate();
      this._createCircle();
    }

    activate() {
      this._waitAnotherInputMode = false;
      return this._isWaiting = false;
    }

    _createCircle() {
      this._circle = new KD_ATBS.LIBS.UI_InputCircle(false);
      this._circle.move(Graphics.width / 2, (Graphics.height / 2) - 80);
      this._circle.applyBattleStartMode();
      this._circle.showHelpers();
      this._circle.addClickListener(1, (function() {
        return this._onClick(1);
      }).bind(this));
      this._circle.addClickListener(2, (function() {
        return this._onClick(2);
      }).bind(this));
      this._circle.addClickListener(3, (function() {
        return this._onClick(3);
      }).bind(this));
      if (!BattleManager.canEscape()) {
        this._circle.disableSegment(1);
      }
      if (!BattleManagerATBS.canUseFastBattle()) {
        this._circle.disableSegment(3);
      }
      if (BattleManagerATBS.isBattle()) {
        this._circle.disableSegment(3);
      }
      return this.layer.addChild(this._circle);
    }

    hide() {
      return this._circle.close();
    }

    isOpen() {
      return this._circle.isOpen();
    }

    open() {
      return this._circle.open();
    }

    setAnotherInput(input) {
      return this.anotherInput = input;
    }

    update() {
      if (BattleManagerATBS.isBattleEnd()) {
        if (this.isOpen()) {
          this._circle.close();
        }
        return;
      }
      if (this._waitAnotherInputMode === true) {
        return this._updateOnWait();
      } else {
        return this._updateMain();
      }
    }

    _updateOnWait() {
      if (this.isOpen()) {
        return this._circle.close();
      } else {
        if (!this._isWaiting) {
          if (this.anotherInput != null) {
            this.anotherInput.activate();
          }
          return this._isWaiting = true;
        }
      }
    }

    _updateMain() {
      if (BattleManagerATBS.isBusy()) {
        return this._circle.close();
      } else {
        this._circle.open();
        if (BattleManagerATBS.isBattle()) {
          return this._updateInBattleLogic();
        } else {
          return this._updateStartLogic();
        }
      }
    }

    _updateInBattleLogic() {
      if (IKey.isTriggerS() || Input.isTriggered('ok') || Input.isCancel()) {
        this._onClickInBattle(2);
      }
      if (IKey.isTriggerD()) {
        return this._onClickInBattle(1);
      }
    }

    _onClickInBattle(index) {
      if (!this.isOpen()) {
        return;
      }
      switch (index) {
        case 1:
          return this._onEscape();
        case 2:
          this._circle.click(2);
          return this._toBattleInput();
      }
    }

    _onEscape() {
      var result;
      if (!BattleManager.canEscape()) {
        return;
      }
      this._circle.click(1);
      result = BattleManager.processEscape();
      if (!result) {
        if (!BattleManagerATBS.isBattle()) {
          this._startBattle();
        }
        return this._toBattleInput();
      }
    }

    _startBattle() {
      this._circle.disableSegment(3);
      BattleManagerATBS.startBattle();
      return this._circle.close();
    }

    _toBattleInput() {
      return this._waitAnotherInputMode = true;
    }

    _updateStartLogic() {
      if (IKey.isTriggerS() || Input.isTriggered('ok') || Input.isCancel()) {
        this._onClickInStart(2);
      }
      if (IKey.isTriggerA()) {
        this._onClickInStart(3);
      }
      if (IKey.isTriggerD()) {
        return this._onClickInStart(1);
      }
    }

    _onClickInStart(index) {
      if (!this.isOpen()) {
        return;
      }
      switch (index) {
        case 1:
          return this._onEscape();
        case 2:
          this._circle.click(2);
          this._toBattleInput();
          return this._startBattle();
        case 3:
          return this._onFastBattle();
      }
    }

    _onFastBattle() {
      if (!BattleManagerATBS.canUseFastBattle()) {
        return;
      }
      this._circle.click(3);
      BattleManagerATBS.setFastBattleMode();
      this._startBattle();
      return this._toBattleInput();
    }

    _onClick(index) {
      if (BattleManagerATBS.isBattle()) {
        return this._onClickInBattle(index);
      } else {
        return this._onClickInStart(index);
      }
    }

  };
  KD_ATBS.register(InputBattle);
})();

// ■ END InputBattle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Input_ChoiseItem.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var IKey, InputChoiseItem;
  IKey = KD_ATBS.LIBS.IKey;
  InputChoiseItem = class InputChoiseItem {
    constructor(parentInput, targetSelectInput) {
      this.parentInput = parentInput;
      this.targetSelectInput = targetSelectInput;
      this._phase = 'wait';
      this._type = 'items';
      this._items = null;
      this._disabledIndexes = [];
      this._selectedItem = null;
      this._isActionComplete = false;
      this._isSelectTarget = false;
      this.battler = $gameParty.leader();
      this._createCircle();
    }

    _createCircle() {
      this._circle = new KD_ATBS.LIBS.UI_InputCircleSmall(false);
      this._circle.move(this.parentInput._circle.x, this.parentInput._circle.y);
      this.parentInput.layer.addChild(this._circle);
      this._circle.addClickListener(0, (function() {
        if (this.isOpen()) {
          return this._onItemSelect(0);
        }
      }).bind(this));
      this._circle.addClickListener(1, (function() {
        if (this.isOpen()) {
          return this._onItemSelect(1);
        }
      }).bind(this));
      this._circle.addClickListener(2, (function() {
        if (this.isOpen()) {
          return this._onItemSelect(2);
        }
      }).bind(this));
      this._circle.addClickListener(3, (function() {
        if (this.isOpen()) {
          return this._onItemSelect(3);
        }
      }).bind(this));
    }

    isOpen() {
      return this._circle.isOpen();
    }

    update() {
      this.refreshSegments();
      switch (this._phase) {
        case 'wait':
          this._updateOnWait();
          break;
        case 'main':
          this._updateOnMain();
          break;
        case 'action':
          this._updateOnAction();
      }
      return this._updateHelpers();
    }

    refreshSegments() {
      var i, item, j, ref, results;
      if (this._phase === 'wait') {
        return;
      }
      results = [];
      for (i = j = 0, ref = this._items.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        item = this._items[i];
        if (!item) {
          continue;
        }
        if (this.battler.canUse(item)) {
          this._circle.enableSegment(i);
          results.push(this._disabledIndexes.delete(i));
        } else {
          this._circle.disableSegment(i);
          if (!this._disabledIndexes.include(i)) {
            results.push(this._disabledIndexes.push(i));
          } else {
            results.push(void 0);
          }
        }
      }
      return results;
    }

    _updateOnWait() {
      if (this._isSelectTarget === true) {
        this._isSelectTarget = false;
        this.targetSelectInput.stop();
      }
      return this._circle.close();
    }

    _updateOnMain() {
      if (this.parentInput.isOpen()) {
        return;
      }
      this._circle.open();
      return this._updateOnMainButtons();
    }

    _updateOnMainButtons() {
      if (Input.isTriggered(IKey.W())) {
        this._onItemSelect(0);
      }
      if (Input.isTriggered(IKey.D())) {
        this._onItemSelect(1);
      }
      if (Input.isTriggered(IKey.S())) {
        this._onItemSelect(2);
      }
      if (Input.isTriggered(IKey.A())) {
        this._onItemSelect(3);
      }
      if (Input.isCancel()) {
        return this._onActionEnd();
      }
    }

    _onItemSelect(index) {
      var e;
      if (this._disabledIndexes.includes(index)) {
        return;
      }
      try {
        this._circle.deselectAll();
        return this._processItemSelect(index);
      } catch (error) {
        e = error;
        return console.error(e);
      }
    }

    _processItemSelect(index) {
      var inputAction;
      this._selectedItem = this._items[index];
      inputAction = this.battler.inputtingAction();
      if (inputAction == null) {
        return;
      }
      if (this._type === 'skills') {
        inputAction.setSkill(this._selectedItem.id);
        this.battler.setLastBattleSkill(this._selectedItem);
      } else {
        inputAction.setItem(this._selectedItem.id);
        $gameParty.setLastItem(this._selectedItem);
      }
      this._circle.select(index);
      return this._selectItemOnCircle(inputAction);
    }

    _selectItemOnCircle(inputAction) {
      var e;
      try {
        this.targetSelectInput.setIcon(this._selectedItem.iconIndex);
        if (inputAction.needsSelection()) {
          if (inputAction.isForOpponent()) {
            this.targetSelectInput.setSelectEnemyMode();
          }
          if (inputAction.isForFriend() || inputAction.isForDeadFriend()) {
            this.targetSelectInput.setSelectAllyMode();
          }
          this._circle.close();
          return this._phase = 'action';
        } else {
          return this._perform();
        }
      } catch (error) {
        e = error;
        return console.error(e);
      }
    }

    _perform() {
      BattleManagerATBS.battleProcess.makeBattleAction(this.battler);
      return this._onActionEnd();
    }

    _onActionEnd() {
      this._circle.close();
      this._selectedItem = null;
      this._phase = 'wait';
      return this._isActionComplete = true;
    }

    _updateOnAction() {
      if (this.isOpen()) {
        return;
      }
      if (this._checkAndPerformFastAction()) {
        return;
      }
      if (!this._isSelectTarget) {
        this.targetSelectInput.activate();
        this._isSelectTarget = true;
      }
      if (Input.isTriggered('ok')) {
        if (this._selectedItem != null) {
          this._perform();
        }
      }
      if (Input.isCancel()) {
        this.targetSelectInput.stop();
        this._isSelectTarget = false;
        this._selectedItem = null;
        this._circle.deselectAll();
        this.refreshSegments();
        return this._phase = 'main';
      }
    }

    _checkAndPerformFastAction() {
      var action, units;
      action = this.battler.inputtingAction();
      if (action == null) {
        return;
      }
      if (action.isForUser()) {
        this.targetSelectInput.setExternalTarget(this.battler);
        this._perform();
        return true;
      }
      units = [];
      if (action.isForFriend()) {
        units = $gameParty.battleMembers();
      }
      if (action.isForOpponent()) {
        units = $gameTroop.aliveMembers();
      }
      if (units.length === 1) {
        this.targetSelectInput.setExternalTarget(units[0]);
        this._perform();
        return true;
      }
      return false;
    }

    _updateHelpers() {
      if (Input.isPressed(IKey.SPACE())) {
        return this._circle.showHelpers();
      } else {
        return this._circle.hideHelpers();
      }
    }

    onTargetClick() {
      if (this._selectedItem != null) {
        return this._perform();
      }
    }

    openItems() {
      this._type = 'items';
      return this.open();
    }

    open() {
      this._initItems();
      this._circle.open();
      this._isActionComplete = false;
      return this._phase = 'main';
    }

    _initItems() {
      this._disabledIndexes = [];
      this._circle.resetAllSegments();
      if (this._type === 'skills') {
        this._items = this.battler.getBattleSkills();
      } else {
        this._items = this.battler.getBattleItems();
      }
      return this._setupItems();
    }

    _setupItems() {
      var helpersArray, i, iconsArray, j;
      iconsArray = [null, null, null, null];
      helpersArray = ['', '', '', ''];
      for (i = j = 0; j < 4; i = ++j) {
        if (this._items[i]) {
          iconsArray[i] = this._items[i].iconIndex;
          helpersArray[i] = this._items[i].name;
        } else {
          this._disabledIndexes.push(i);
          this._circle.hideSegment(i);
        }
      }
      this._circle.setIcons(iconsArray);
      this._circle.setHelpers(helpersArray);
      return this.refreshSegments();
    }

    openSkills() {
      this._type = 'skills';
      return this.open();
    }

    isComplete() {
      return this._isActionComplete === true;
    }

    close() {
      return this._onActionEnd();
    }

  };
  KD_ATBS.register(InputChoiseItem);
})();

// ■ END Input_ChoiseItem.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ InputPlayer.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var IKey, InputPlayer;
  IKey = KD_ATBS.LIBS.IKey;
  InputPlayer = class InputPlayer {
    constructor(layer) {
      this.layer = layer;
      this._phase = 'wait';
      this._isAllIconsDisabled = false;
      this._isSelectTarget = false;
      this.battler = $gameParty.leader();
      this.activate();
      this._createCircle();
      this._createTargetSelect();
      this._createChoise();
    }

    activate() {
      this._waitAnotherInputMode = false;
      return this._isWaiting = false;
    }

    _createCircle() {
      this._circle = new KD_ATBS.LIBS.UI_InputCircle(false);
      this._circle.move(Graphics.width / 2, (Graphics.height / 2) - 80);
      this._circle.applyBattleMode();
      this._circle.addClickListener(0, (function() {
        return this._onClick(0);
      }).bind(this));
      this._circle.addClickListener(1, (function() {
        return this._onClick(1);
      }).bind(this));
      this._circle.addClickListener(2, (function() {
        return this._onClick(2);
      }).bind(this));
      this._circle.addClickListener(3, (function() {
        return this._onClick(3);
      }).bind(this));
      return this.layer.addChild(this._circle);
    }

    _createTargetSelect() {
      return this.targetSelectInput = new KD_ATBS.LIBS.InputTargetSelect();
    }

    _createChoise() {
      return this.choiseInput = new KD_ATBS.LIBS.InputChoiseItem(this, this.targetSelectInput);
    }

    isOpen() {
      return this._circle.isOpen();
    }

    update() {
      this._updateMain();
      if (this._waitAnotherInputMode === false) {
        return this._updateCircle();
      } else {
        return this._updateTransitionToBack();
      }
    }

    _updateMain() {
      this.choiseInput.update();
      this._checkMainPhase();
      if (!this._checkWaitPhase()) {
        return this._checkItemsPhase();
      }
    }

    _checkMainPhase() {
      var ref;
      if (this._isReady() && this.battler.isAlive()) {
        if (this._phase === 'wait') {
          this._phase = 'main';
          return (ref = this.battler) != null ? ref.makeActions() : void 0;
        }
      } else {
        return this._phase = 'wait';
      }
    }

    _isReady() {
      var ref;
      return ((ref = this.battler) != null ? ref.isReadyForAction() : void 0) && BattleManagerATBS.isBattle();
    }

    _checkWaitPhase() {
      if (this._phase === 'wait') {
        this._cancelTargeting();
        this._circle.close();
        this.choiseInput.close();
        return true;
      } else {
        return false;
      }
    }

    _cancelTargeting() {
      if (this._isSelectTarget === false) {
        return;
      }
      return this._stopTargeting();
    }

    _stopTargeting() {
      this._isSelectTarget = false;
      return this.targetSelectInput.stop();
    }

    _checkItemsPhase() {
      var ref;
      if (this._phase !== 'items') {
        return;
      }
      if (!((ref = this.battler) != null ? ref.canMove() : void 0)) {
        this.choiseInput.close();
        this._phase = 'main';
        return this._cancelTargeting();
      }
    }

    _updateCircle() {
      if (this._phase !== 'wait') {
        this.targetSelectInput.update();
      }
      switch (this._phase) {
        case 'main':
          this._updateOnMainPhase();
          break;
        case 'attack':
          this._updateOnAttack();
          break;
        case 'defense':
          this._updateOnDefence();
          break;
        case 'items':
          this._updateOnItems();
      }
    }

    _updateOnMainPhase() {
      var ref;
      this._circle.open();
      if ((ref = this.battler) != null ? ref.canMove() : void 0) {
        this._checkSegments();
        if (this.isOpen()) {
          return this._updateOnMainButtons();
        }
      } else {
        if (this._isAllIconsDisabled !== true) {
          this._isAllIconsDisabled = true;
          return this._circle.disableAllSegments();
        }
      }
    }

    _checkSegments() {
      this._circle.resetAllSegments();
      this._isAllIconsDisabled = false;
      if (!this.battler.hasItems()) {
        this._circle.disableSegment(0);
      }
      if (!this.battler.canUseSkills()) {
        this._circle.disableSegment(3);
      }
      if (!this.battler.canAttack()) {
        return this._circle.disableSegment(2);
      }
    }

    _updateOnMainButtons() {
      this._updateHelpers();
      if (Input.isTriggered(IKey.S())) {
        this._onAttack();
      }
      if (Input.isTriggered(IKey.D())) {
        this._onDefence();
      }
      if (Input.isTriggered(IKey.A())) {
        this._onSkills();
      }
      if (Input.isTriggered(IKey.W())) {
        this._onItems();
      }
      if (Input.isCancel()) {
        return this._waitAnotherInputMode = true;
      }
    }

    _updateHelpers() {
      if (Input.isPressed(IKey.SPACE())) {
        return this._circle.showHelpers();
      } else {
        return this._circle.hideHelpers();
      }
    }

    _onAttack() {
      var ref, ref1;
      if (!((ref = this.battler) != null ? ref.canAttack() : void 0)) {
        return;
      }
      if ((ref1 = this.battler) != null) {
        ref1.makeActions();
      }
      this._phase = 'attack';
      this.targetSelectInput.setIcon(ATBS_ResourceManager.iconAttack.bitmap);
      this.targetSelectInput.setSelectEnemyMode();
      this._circle.click(2);
      return this._circle.close();
    }

    _onDefence() {
      var ref;
      if ((ref = this.battler) != null) {
        ref.makeActions();
      }
      this._phase = 'defense';
      this._circle.click(1);
      return this._circle.close();
    }

    _onSkills() {
      var ref, ref1;
      if (!((ref = this.battler) != null ? ref.canUseSkills() : void 0)) {
        return;
      }
      if ((ref1 = this.battler) != null) {
        ref1.makeActions();
      }
      this._phase = 'items';
      this._circle.click(3);
      this._circle.close();
      return this.choiseInput.openSkills();
    }

    _onItems() {
      var ref, ref1;
      if (!((ref = this.battler) != null ? ref.hasItems() : void 0)) {
        return;
      }
      if ((ref1 = this.battler) != null) {
        ref1.makeActions();
      }
      this._phase = 'items';
      this._circle.click(0);
      this._circle.close();
      return this.choiseInput.openItems();
    }

    _updateOnAttack() {
      if (this.isOpen()) {
        return;
      }
      if (!this._checkSingleEnemy()) {
        if (this._isSelectTarget === false) {
          this.targetSelectInput.activate();
          this._isSelectTarget = true;
        }
      }
      if (Input.isTriggered('ok')) {
        this._onTargetSelected();
      }
      if (Input.isCancel()) {
        return this._performEnd();
      }
    }

    _checkSingleEnemy() {
      var alive;
      alive = $gameTroop.aliveMembers();
      if (alive.length === 1) {
        this.targetSelectInput.setExternalTarget(alive[0]);
        this._onTargetSelected();
        return true;
      }
      return false;
    }

    _onTargetSelected() {
      var action, ref;
      action = (ref = this.battler) != null ? ref.inputtingAction() : void 0;
      if (action != null) {
        action.setAttack();
        return this._perform();
      } else {
        return this._performEnd();
      }
    }

    _perform() {
      BattleManagerATBS.battleProcess.makeBattleAction(this.battler);
      return this._performEnd();
    }

    _performEnd() {
      this._stopTargeting();
      this._circle.close();
      return this._phase = 'wait';
    }

    _updateOnDefence() {
      var action, ref;
      action = (ref = this.battler) != null ? ref.inputtingAction() : void 0;
      if (action != null) {
        action.setGuard();
        return this._perform();
      }
    }

    _updateOnItems() {
      if (this.isOpen()) {
        return;
      }
      if (this.choiseInput.isComplete()) {
        if (!this.choiseInput.isOpen()) {
          return this._phase = 'wait';
        }
      }
    }

    _updateTransitionToBack() {
      if (this.isOpen()) {
        return this._circle.close();
      } else {
        if (this._isWaiting === false) {
          BattleManagerATBS.activateBattleInput();
          return this._isWaiting = true;
        }
      }
    }

    _onClick(index) {
      if (!this.isOpen()) {
        return;
      }
      if (index === 0) {
        this._onItems();
      }
      if (index === 1) {
        this._onDefence();
      }
      if (index === 2) {
        this._onAttack();
      }
      if (index === 3) {
        return this._onSkills();
      }
    }

    refresh() {
      var ref;
      return (ref = this.choiseInput) != null ? ref.refreshSegment() : void 0;
    }

    updateForWait() {
      return this._updateMain();
    }

    hide() {
      return this._phase = 'wait';
    }

    clickExternalTarget(battler) {
      if (!this.targetSelectInput.isActive()) {
        return;
      }
      if (battler.isEnemy() && this.targetSelectInput.isActiveForEnemies()) {
        this._clickExternal(battler);
        return;
      }
      if (battler.isActor() && !this.targetSelectInput.isActiveForEnemies()) {
        this._clickExternal(battler);
      }
    }

    _clickExternal(battler) {
      this.targetSelectInput.setExternalTarget(battler);
      return this._onTargetClick();
    }

    _onTargetClick() {
      var ref;
      if (this.isOpen()) {
        return;
      }
      if (this._phase === 'attack') {
        return this._onTargetSelected();
      } else {
        return (ref = this.choiseInput) != null ? ref.onTargetClick() : void 0;
      }
    }

  };
  KD_ATBS.register(InputPlayer);
})();

// ■ END InputPlayer.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ InputTargetSelect.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var InputTargetSelect;
  InputTargetSelect = class InputTargetSelect {
    constructor() {
      this._isActive = false;
      this._indexes = {
        'ally': -1,
        'enemy': -1
      };
      this._iconIndex = null;
      this._currentTarget = null;
      this.setSelectEnemyMode();
    }

    setSelectEnemyMode() {
      this._selectMode = 'enemy';
      this._selectUnit = $gameTroop.aliveMembers.bind($gameTroop);
      return this._refreshSizeForSelection();
    }

    _refreshSizeForSelection() {
      return this._size = this._selectUnit().length;
    }

    setSelectAllyMode() {
      this._selectMode = 'ally';
      this._selectUnit = $gameParty.battleMembers.bind($gameParty);
      return this._refreshSizeForSelection();
    }

    isActiveForEnemies() {
      return this.isActive() && this.isEnemySelectMode();
    }

    isActive() {
      return this._isActive === true;
    }

    isEnemySelectMode() {
      return this._selectMode === 'enemy';
    }

    setIcon(icon) {
      return this._iconIndex = icon;
    }

    activate() {
      this._isActive = true;
      if (this._getIndex() < 0) {
        this._resetIndex();
      }
      this._checkIndex();
      return this._setTarget();
    }

    _getIndex() {
      return this._indexes[this._selectMode];
    }

    _resetIndex() {
      return this._setIndex(0);
    }

    _setIndex(index) {
      return this._indexes[this._selectMode] = index;
    }

    _checkIndex() {
      if (this._size !== this._selectUnit().length) {
        this._resetIndex();
        this._refreshSizeForSelection();
      }
      if (this._isIndexBiggerThanUnit()) {
        return this._resetIndex();
      }
    }

    _isIndexBiggerThanUnit() {
      return this._getIndex() >= this._selectUnit().length;
    }

    _setTarget() {
      this._currentTarget = this._selectUnit()[this._getIndex()];
      if (!this.isEnemySelectMode()) {
        $gameParty.select(null);
      }
      return this._selectTarget();
    }

    _selectTarget() {
      this._setTargetToPlayerAction();
      if (this.isEnemySelectMode()) {
        return UIManagerATBS.selectEnemy(this._currentTarget.index(), this._iconIndex);
      } else {
        return this._currentTarget.select();
      }
    }

    _setTargetToPlayerAction() {
      var action;
      action = $gameParty.leader().inputtingAction();
      if (action) {
        return action.setTarget(this._currentTarget.index());
      }
    }

    stop() {
      if (this.isEnemySelectMode()) {
        UIManagerATBS.deselectAllEnemies();
      } else {
        $gameParty.select(null);
      }
      this._isActive = false;
      return this.setSelectEnemyMode();
    }

    update() {
      if (!this.isActive()) {
        return;
      }
      if (Input.isTriggered('right')) {
        this._next_target();
      }
      if (Input.isTriggered('left')) {
        this._prev_target();
      }
      if ((this._currentTarget != null) && !this._currentTarget.isAlive()) {
        return this._next_target();
      }
    }

    _next_target() {
      this._upIndex();
      if (this._isIndexBiggerThanUnit()) {
        this._resetIndex();
      }
      return this._setTarget();
    }

    _prev_target() {
      this._upIndex(-1);
      if (this._getIndex() < 0) {
        this._setIndex(this._selectUnit().length - 1);
      }
      return this._setTarget();
    }

    _upIndex(value = 1) {
      var index;
      index = this._getIndex();
      return this._setIndex(index + value);
    }

    setExternalTarget(target) {
      if (target == null) {
        return;
      }
      this._currentTarget = target;
      this._setTargetToPlayerAction();
      return this._setIndex(target.index());
    }

  };
  KD_ATBS.register(InputTargetSelect);
})();

// ■ END InputTargetSelect.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Interface_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var BattleInterface;
  BattleInterface = class BattleInterface extends KD_ATBS.LIBS.UI_LayerObject {
    constructor(layer) {
      super(layer);
      this._createKillCounter();
      this._createPopupMachines();
    }

    _createKillCounter() {
      this._killInfo = new KD_ATBS.LIBS.UI_KillCounter(100);
      this._killInfo.move(10, 5);
      return this.layer.addChild(this._killInfo);
    }

    _createPopupMachines() {
      var battler, i, j, len, len1, ref, ref1, results;
      this._enemies = $gameTroop.members();
      this._party = $gameParty.battleMembers();
      this._allyMachines = [];
      this._allyMachines2 = [];
      this._enemyMachines = [];
      ref = this._enemies;
      for (i = 0, len = ref.length; i < len; i++) {
        battler = ref[i];
        this._createMachineForEnemy(battler);
      }
      ref1 = this._party;
      results = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        battler = ref1[j];
        results.push(this._createMachineForAlly(battler));
      }
      return results;
    }

    _createMachineForEnemy(battler) {
      var machine, sprite, x, y;
      sprite = UIManagerATBS.getEnemySprite(battler);
      if (sprite == null) {
        return;
      }
      x = sprite.getRelativeScreenXPos();
      y = sprite.getRelativeScreenYPos();
      machine = new KD_ATBS.LIBS.ABSObject_PopUpMachine(x, y, sprite.width, 4, this.layer);
      return this._enemyMachines.push(machine);
    }

    _createMachineForAlly(battler) {
      var sprite, x, y;
      sprite = UIManagerATBS.getActorSprite(battler);
      if (sprite == null) {
        return;
      }
      x = sprite.getRelativeScreenXPos();
      y = sprite.getRelativeScreenYPos();
      this._createMainMachine(x, y);
      return this._createMachineForStates(x, y);
    }

    _createMainMachine(x, y) {
      var machine;
      machine = new KD_ATBS.LIBS.ABSObject_PopUpMachine(x, y, 96, 1, this.layer);
      machine.setNoEffectMode();
      return this._allyMachines.push(machine);
    }

    _createMachineForStates(x, y) {
      var machine;
      machine = new KD_ATBS.LIBS.ABSObject_PopUpMachine(x - 10, y - 60, 110, 4, this.layer);
      return this._allyMachines2.push(machine);
    }

    pushKillInfo(subject, target) {
      if ((subject != null) && (target != null)) {
        if (this._killInfo != null) {
          return this._killInfo.push(subject, target);
        }
      }
    }

    //?[OVER]
    hide() {
      return this._clearAll();
    }

    _clearAll() {
      var i, j, k, len, len1, len2, machine, ref, ref1, ref2, results;
      try {
        ref = this._enemyMachines;
        for (i = 0, len = ref.length; i < len; i++) {
          machine = ref[i];
          machine.clear();
        }
        ref1 = this._allyMachines;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          machine = ref1[j];
          machine.clear();
        }
        ref2 = this._allyMachines2;
        results = [];
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          machine = ref2[k];
          results.push(machine.clear());
        }
        return results;
      } catch (error) {

      }
    }

    
    //?[OVER]
    show() {}

    
    //?[OVER]
    update() {
      var e, i, j, k, len, len1, len2, machine, ref, ref1, ref2, results;
      try {
        this._updatePopUps();
        ref = this._enemyMachines;
        for (i = 0, len = ref.length; i < len; i++) {
          machine = ref[i];
          machine.update();
        }
        ref1 = this._allyMachines;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          machine = ref1[j];
          machine.update();
        }
        ref2 = this._allyMachines2;
        results = [];
        for (k = 0, len2 = ref2.length; k < len2; k++) {
          machine = ref2[k];
          results.push(machine.update());
        }
        return results;
      } catch (error) {
        e = error;
        return console.error(e);
      }
    }

    _updatePopUps() {
      var battler, i, index, j, len, len1, ref, ref1, results;
      ref = this._enemies;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        battler = ref[index];
        if (battler != null) {
          this._updatePopUpForBattler(battler, index);
        }
      }
      ref1 = this._party;
      results = [];
      for (index = j = 0, len1 = ref1.length; j < len1; index = ++j) {
        battler = ref1[index];
        if (battler != null) {
          results.push(this._updatePopUpForBattler(battler, index));
        }
      }
      return results;
    }

    _updatePopUpForBattler(battler, index) {
      var i, item, items, len;
      items = battler.getInfoPops();
      if (items.length === 0) {
        return;
      }
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        if (battler.isEnemy()) {
          this._enemyMachines[index].push(item);
        } else {
          if (item.hasIcon()) {
            this._allyMachines2[index].push(item);
          } else {
            this._allyMachines[index].push(item);
          }
        }
      }
      return battler.clearInfoPops();
    }

    //?[OVER]
    terminate() {
      return this._clearAll();
    }

  };
  KD_ATBS.register(BattleInterface);
})();

// ■ END Interface_Battle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Interface_Layers.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var BattleLayers;
  BattleLayers = class BattleLayers {
    constructor(parent) {
      this.parent = parent;
      this.width = Graphics.boxWidth;
      this.height = Graphics.boxHeight;
      this._crateLayers();
    }

    _crateLayers() {
      this._createPartyLayer();
      this._createTroopLayer();
      this._createBattleLogLayer();
      return this._createInputLayer();
    }

    _createPartyLayer() {
      var allyWindowsWidth, width, x, y;
      this._partyLayer = new Sprite();
      y = this.height - KD_ATBS.SYSTEM.PARTY_WINDOW_HEIGHT - 2;
      width = KD_ATBS.SYSTEM.PLAYER_WINDOW_WIDTH;
      allyWindowsWidth = KD_ATBS.SYSTEM.ALLY_WINDOW_WIDTH + 2;
      allyWindowsWidth *= $gameParty.battleMembers().length - 1;
      width += allyWindowsWidth;
      this._partyLayer.setFrame(0, 0, width, KD_ATBS.SYSTEM.PARTY_WINDOW_HEIGHT);
      x = (this.width / 2) - (width / 2);
      this._partyLayer.move(x, y);
      return this.parent.addChild(this._partyLayer);
    }

    _createTroopLayer() {
      this._troopLayer = new Sprite();
      this._troopLayer.setFrame(0, 0, this.width, this.height);
      return this.parent.addChild(this._troopLayer);
    }

    _createBattleLogLayer() {
      this._battleLogLayer = new Sprite();
      this._battleLogLayer.setFrame(0, 0, this.width, this.height);
      return this.parent.addChild(this._battleLogLayer);
    }

    _createInputLayer() {
      this._inputLayer = new Sprite();
      this._inputLayer.setFrame(0, 0, this.width, this.height);
      return this.parent.addChild(this._inputLayer);
    }

    getLayers() {
      return [this._partyLayer, this._troopLayer, this._battleLogLayer, this._inputLayer];
    }

    getParty() {
      return this._partyLayer;
    }

    getTroop() {
      return this._troopLayer;
    }

    getBattleLog() {
      return this._battleLogLayer;
    }

    getInput() {
      return this._inputLayer;
    }

  };
  KD_ATBS.register(BattleLayers);
})();

// ■ END Interface_Layers.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Interface_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var PartyInterface;
  PartyInterface = class PartyInterface extends KD_ATBS.LIBS.UI_LayerObject {
    constructor(layer) {
      super(layer);
      this._createLeader();
      this._createAllies();
    }

    _createLeader() {
      this._player = new KD_ATBS.LIBS.UI_LayerObjectPartyLeader(this.layer);
      return UIManagerATBS.spriteset.pushExternalActorSprite(this._player.getActorSprite());
    }

    _createAllies() {
      var alliesCount, dx;
      this._allies = [];
      alliesCount = $gameParty.battleMembers().count() - 1;
      dx = KD_ATBS.SYSTEM.PLAYER_WINDOW_WIDTH + 2;
      return alliesCount.do((function(index) {
        var ally;
        ally = new KD_ATBS.LIBS.UI_LayerObjectAlly(this.layer, index + 1);
        ally.move(dx, 0);
        this._allies.push(ally);
        UIManagerATBS.spriteset.pushExternalActorSprite(ally.getActorSprite());
        return dx += KD_ATBS.SYSTEM.ALLY_WINDOW_WIDTH + 2;
      }).bind(this));
    }

    //?[OVER]
    hide() {
      var ally, i, len, ref, results;
      this._player.hide();
      ref = this._allies;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        ally = ref[i];
        results.push(ally.hide());
      }
      return results;
    }

    //?[OVER]
    update() {
      var ally, i, len, ref, results;
      this._player.update();
      ref = this._allies;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        ally = ref[i];
        results.push(ally.update());
      }
      return results;
    }

    //?[OVER]
    terminate() {
      var ally, i, len, ref, results;
      this._player.terminate();
      ref = this._allies;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        ally = ref[i];
        results.push(ally.terminate());
      }
      return results;
    }

  };
  KD_ATBS.register(PartyInterface);
})();

// ■ END Interface_Party.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Interface_Troop.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var TroopInterface;
  TroopInterface = class TroopInterface extends KD_ATBS.LIBS.UI_LayerObject {
    constructor(layer) {
      super(layer);
      this._items = [];
      this._sprites = [];
      this._isSelected = false;
      this._create();
    }

    _create() {
      var i, j, ref, results, size;
      size = $gameTroop.members().length;
      results = [];
      for (i = j = 0, ref = size; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        results.push(this._items.push(this._createInfo(i)));
      }
      return results;
    }

    _createInfo(enemyIndex) {
      var item, position;
      item = new KD_ATBS.LIBS.UI_LayerObjectEnemyInfo(this.layer, enemyIndex, 80);
      position = this._getPosition(enemyIndex);
      item.move(position.x, position.y);
      return item;
    }

    _getPosition(enemyIndex) {
      var enemySprite, xx, yy;
      enemySprite = UIManagerATBS.getEnemySprite($gameTroop.members()[enemyIndex]);
      this._sprites[enemyIndex] = enemySprite;
      if (!enemySprite) {
        return {
          x: 0,
          y: 0
        };
      }
      xx = enemySprite.x;
      yy = enemySprite.y - enemySprite.height - enemySprite.height / 2;
      return {
        x: xx,
        y: yy
      };
    }

    select(index, iconIndex) {
      var ref;
      this.deselectAll();
      if (this._items[index]) {
        this._items[index].select(iconIndex);
      }
      this._isSelected = true;
      return (ref = this._sprites[index]) != null ? ref.startEffect('ATBSTarget') : void 0;
    }

    deselectAll() {
      var item, j, len, ref, results;
      this._isSelected = false;
      ref = this._items;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        if (item != null) {
          results.push(item.deselect());
        }
      }
      return results;
    }

    hide() {
      var item, j, len, ref, results;
      ref = this._items;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        if (item != null) {
          results.push(item.hide());
        }
      }
      return results;
    }

    show() {
      var item, j, len, ref, results;
      ref = this._items;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        if (item != null) {
          results.push(item.show());
        }
      }
      return results;
    }

    isSelected() {
      return this._isSelected === true;
    }

    update() {
      var item, j, len, ref, results;
      ref = this._items;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        if (item != null) {
          results.push(item.update());
        }
      }
      return results;
    }

    onEnemyTransform(index) {}

  };
  //enemyInfo = @_items[index]
  //@layer.removeChild enemyInfo.sprite if enemyInfo?
  //@_items[index] = @_createInfo(index)
  KD_ATBS.register(TroopInterface);
})();

// ■ END Interface_Troop.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

var _alias_Scene_Battle_create_ATBS = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function () {
    BattleManagerATBS.initBattle(this);
    _alias_Scene_Battle_create_ATBS.call(this);
};

//?[OVER]
Scene_Battle.prototype.createDisplayObjects = function () {
    this.createWindowLayer();
    this.createMessageWindow();
    this.createScrollTextWindow();
};

//?[OVER]
Scene_Battle.prototype.update = function () {
    var active = this.isActive();
    $gameTimer.update(active);
    $gameScreen.update();
    if (active && !this.isBusy()) {
        BattleManagerATBS.update();
    }
    Scene_Base.prototype.update.call(this);
};

var _alias_Scene_Battle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function () {
    _alias_Scene_Battle_terminate.call(this);
    BattleManagerATBS.terminate();
};

//?[OVER]
Scene_Battle.prototype.stop = function () {
    Scene_Base.prototype.stop.call(this);
    if (this.needsSlowFadeOut()) {
        this.startFadeOut(this.slowFadeSpeed(), false);
    } else {
        this.startFadeOut(this.fadeSpeed(), false);
    }
};


// ■ END Scene_Battle.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Battle.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[OVER]
Spriteset_Battle.prototype.createActors = function () {
    this._actorSprites = [];
};

//?[NEW]
Spriteset_Battle.prototype.pushExternalActorSprite = function (actorSprite) {
   this._actorSprites.push(actorSprite);
};
// ■ END Spriteset_Battle.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_ActorATBS.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

function Sprite_ActorATBS() {
    this.initialize.apply(this, arguments);
}

KD_ATBS.register(Sprite_ActorATBS);

Sprite_ActorATBS.prototype = Object.create(Sprite_Actor.prototype);
Sprite_ActorATBS.prototype.constructor = Sprite_ActorATBS;

Sprite_ActorATBS.prototype.initialize = function (battler) {
    Sprite_Actor.prototype.initialize.call(this, battler);
    this._isHideByMessage = false;
};

Sprite_ActorATBS.prototype.createMainSprite = function () {
    this._mainSprite = new Sprite_Base();
    this.addChild(this._mainSprite);
    this._effectTarget = this._mainSprite;
};

Sprite_ActorATBS.prototype.createShadowSprite = function () {
    this._shadowSprite = new Sprite();
};

Sprite_ActorATBS.prototype.createWeaponSprite = function () {
    this._weaponSprite = new Sprite_Weapon();
};

Sprite_ActorATBS.prototype.createStateSprite = function () {
    this._stateSprite = new Sprite_StateOverlay();
};

Sprite_ActorATBS.prototype.moveToStartPosition = function () {
    this.startMove(0, 300, 0);
};

Sprite_ActorATBS.prototype.setActorHome = function (index) {
    if (index == 0)
        this.setHome(4, 0);
    else {
        this.setHome(0, 0);
    }
};

Sprite_ActorATBS.prototype.updateMotion = function () {}; //EMPTY

Sprite_ActorATBS.prototype.updateBitmap = function () {
    Sprite_Battler.prototype.updateBitmap.call(this);
    var name = this._actor.battlerName();
    if (this._battlerName !== name) {
        this._battlerName = name;
        this._mainSprite.bitmap = this._createActorPortrait();
    }
    this._updateDeadEffect();
};

Sprite_ActorATBS.prototype._createActorPortrait = function () {
    var bitmap = new Bitmap(96, 96);
    var faceIndex = this._actor.faceIndex();
    var faceName = this._actor.faceName();
    var pw = Window_Base._faceWidth;
    var ph = Window_Base._faceHeight;
    var sw = pw;
    var sh = ph;
    var sx = faceIndex % 4 * pw + (pw - sw) / 2;
    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
    var temp = ImageManager.loadFace(faceName);
    temp.addLoadListener(function () {
        bitmap.blt(temp, sx, sy, sw, sh, 0, 0, 96, 96);
    }.bind(this));
    return bitmap;
};

Sprite_ActorATBS.prototype._updateDeadEffect = function () {
    if (!this._actor) return;
    if (!this._actor.isAlive() && !this._actor.isSelected()) {
        this._effectTarget.setBlendColor([255, 128, 128, 94]);
    } else {
        this._effectTarget.setBlendColor([0, 0, 0, 0]);
    }
};

Sprite_ActorATBS.prototype.updateFrame = function () {
    if (!BattleManagerATBS.isFastBattleMode() && BattleManagerATBS.isBattle()) {
        this.processTouchATBS();
    }
};

Sprite_ActorATBS.prototype.updateVisibility = function () {
    Sprite_Actor.prototype.updateVisibility.call(this);
    if (BattleManagerATBS.isBusy() || UIManagerATBS.isHidden()) {
        this._isHideByMessage = true;
        this.visible = false;
    } else {
        if (this._isHideByMessage == true) {
            this._isHideByMessage = false;
            this.moveToStartPosition();
        }
    }
};

Sprite_ActorATBS.prototype._isTouchedATBS = function () {
    var screenX = this.getRelativeScreenXPos();
    var screenY = this.getRelativeScreenYPos();
    var x2 = screenX + this._mainSprite.width;
    var y2 = screenY + this._mainSprite.height;
    return ((TouchInput.x > screenX) && (TouchInput.x < x2) && (TouchInput.y > screenY) && (TouchInput.y < y2));
};

Sprite_ActorATBS.prototype._isTargetingForMe = function () {
    return true;
};

Sprite_ActorATBS.prototype._callClickHandlerATBS = function () {
    BattleManagerATBS.clickExternalTarget(this._actor);
};

// ■ END Sprite_ActorATBS.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Animation.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
var pkd_SpriteAnimation_updatePosition = Sprite_Animation.prototype.updatePosition;
Sprite_Animation.prototype.updatePosition = function () {
    if (this._target.parent instanceof Sprite_ActorATBS) {
        try {
            this._updatePositionForATBSActor();
        } catch (e) {
            console.error(e);
        }
    } else {
        pkd_SpriteAnimation_updatePosition.call(this);
    }
};

Sprite_Animation.prototype._updatePositionForATBSActor = function () {
    var parent = this._target.parent;
    if (this._animation.position === 3) { //Screen
        this.x = this.parent.width / 2;
        this.y = this.parent.height / 2;
    } else {
        this.x = parent.x + this._target.height / 2;
        this.y = parent.y;

        if (this._animation.position === 0) { //Up
            //this.y -= this._target.height;
        } else if (this._animation.position === 1) { //Center
            this.y += this._target.height / 2;
        } else if (this._animation.position === 2) { //Down
            this.y += this._target.height;
        }
    }
};

var pkd_SpriteAnimation_updateCellSprite = Sprite_Animation.prototype.updateCellSprite;
Sprite_Animation.prototype.updateCellSprite = function (sprite, cell) {
    pkd_SpriteAnimation_updateCellSprite.call(this, sprite, cell);
    if (this._target.parent instanceof Sprite_ActorATBS) {
        try {
            this._updateCellSpriteForATBSActor(sprite, cell);
        } catch (e) {
            console.error(e);
        }
    }
};

Sprite_Animation.prototype._updateCellSpriteForATBSActor = function (sprite, cell) {
    if (cell[0] >= 0) {
        sprite.x = 0;
        sprite.y = 0;
        sprite.scale.x = (sprite.scale.x / 4);
        sprite.scale.y = (sprite.scale.y / 4);
    }
};
// ■ END Sprite_Animation.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Battler.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

var _alias_Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function () {
   _alias_Sprite_Battler_initMembers.call(this, arguments);
   this._touching = false;
};

//?[NEW]
Sprite_Battler.prototype.processTouchATBS = function () {
   if (this._isTargetingForMe()) {
       if (TouchInput.isTriggered() && this._isTouchedATBS()) 
            this._touching = true;
       if (this._touching) {
           if (TouchInput.isReleased() || !this._isTouchedATBS()) {
               this._touching = false;
               if (TouchInput.isReleased()) {
                   this._callClickHandlerATBS();
               }
           }
       }
   } else {
       this._touching = false;
   }
};

Sprite_Battler.prototype._isTargetingForMe = function () {
   return false;
};

Sprite_Battler.prototype._isTouchedATBS = function () {
   return false;
};

//?[EMPTY]
Sprite_Battler.prototype._callClickHandlerATBS = function () {};

//?[NEW]
Sprite_Battler.prototype.getRelativeScreenXPos = function () {
    return KDCore.SDK.toGlobalCoord(this, 'x');
};

//?[NEW]
Sprite_Battler.prototype.getRelativeScreenYPos = function () {
    return KDCore.SDK.toGlobalCoord(this, 'y');
};
// ■ END Sprite_Battler.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Enemy.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
Sprite_Enemy.ANIM_STEP_PERCENT = 2; //Процент анимации движения (процент от картинки, на сколько сдвигать)
Sprite_Enemy.ANIM_STEP_TIME = 32; //Время анимации движения (раз в ANIM_STEP_TIME кадров)

var _alias_Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function () {
   _alias_Sprite_Enemy_initMembers.call(this);
    this._playATBSMoving = true;
    if (KD_ATBS.Parameters.isLoaded()) {
        var data = KD_ATBS.Parameters.getEnemyMovingData();
        this._playATBSMoving = data.PlayAnimation;
        Sprite_Enemy.ANIM_STEP_PERCENT = data.MoveStep;
        Sprite_Enemy.ANIM_STEP_TIME = data.MoveTime;
    }
};

var pkd_SpriteEnemy_startEffect = Sprite_Enemy.prototype.startEffect;
Sprite_Enemy.prototype.startEffect = function (effectType) {
    this._effectType = effectType;
    if (this._effectType == 'ATBSTarget') {
        this._effectDuration = 20;
        this.revertToNormal();
    } else {
        pkd_SpriteEnemy_startEffect.call(this, effectType);
    }
};

var pkd_SpriteEnemy_updateEffect = Sprite_Enemy.prototype.updateEffect;
Sprite_Enemy.prototype.updateEffect = function () {
    if (this._effectType == 'ATBSTarget') {
        this.setupEffect();
        if (this._effectDuration > 0) {
            this._effectDuration--;
            this._updateATBSTargetEffect();

            if (this._effectDuration === 0) {
                this._effectType = null;
            }
        }
    } else {
        pkd_SpriteEnemy_updateEffect.call(this);
    }
};

//?[NEW]
Sprite_Enemy.prototype._updateATBSTargetEffect = function () {
    var alpha = 128 - (16 - this._effectDuration) * 10;
    this.setBlendColor([60, 210, 235, alpha]);
};

var pkd_SpriteEnemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function (battler) {
    pkd_SpriteEnemy_setBattler.call(this, battler);
    this._animation_discale = Sprite_Enemy.ANIM_STEP_PERCENT / 100;
    this._animation_flag = true;
    this._animation_step = 1.0 / (Sprite_Enemy.ANIM_STEP_TIME * 60);
};

var pkd_SpriteEnemy_updatePosition = Sprite_Enemy.prototype.updatePosition;
Sprite_Enemy.prototype.updatePosition = function () {
    pkd_SpriteEnemy_updatePosition.call(this);
    if (!BattleManagerATBS.isFastBattleMode() && BattleManagerATBS.isBattle()) {
        if (this._playATBSMoving == true)
            this._updateATBSAnimation();
        this.processTouchATBS();
    }
};

//?[NEW]
Sprite_Enemy.prototype._updateATBSAnimation = function () {
    if (this._animation_flag === undefined) {
        return;
    }
    if (this._animation_flag) {
        this.scale.y -= this._animation_step;
    } else {
        this.scale.y += this._animation_step;
    }

    if ((this.scale.y < (1.0 - this._animation_discale)) && this._animation_flag) {
        this._animation_flag = false;
        return;
    }

    if ((this.scale.y > 1) && !this._animation_flag) {
        this._animation_flag = true;
    }
};

Sprite_Enemy.prototype._isTouchedATBS = function () {
    var screenX = this.getRelativeScreenXPos();
    var screenY = this.getRelativeScreenYPos();
    var x2 = screenX + this.bitmap.width;
    var y2 = screenY + this.bitmap.height;
    return ((TouchInput.x > screenX) && (TouchInput.x < x2) && (TouchInput.y > screenY) && (TouchInput.y < y2));
};


Sprite_Enemy.prototype.getRelativeScreenXPos = function() {
    return Sprite_Battler.prototype.getRelativeScreenXPos.call(this) - (this.bitmap.width / 2);
}; 

Sprite_Enemy.prototype.getRelativeScreenYPos = function () {
    return Sprite_Battler.prototype.getRelativeScreenYPos.call(this) - this.height;
};

Sprite_Enemy.prototype._isTargetingForMe = function () {
    return true;
};

Sprite_Enemy.prototype._callClickHandlerATBS = function () {
    BattleManagerATBS.clickExternalTarget(this._enemy);
};
// ■ END Sprite_Enemy.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_ActorName.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Color, UI_ActorName;
  Color = KDCore.Color;
  UI_ActorName = (function() {
    class UI_ActorName extends Sprite {
      constructor(width, height, actorIndex) {
        super(new Bitmap(width, height));
        this.actorIndex = actorIndex;
        this.refresh();
      }

      refresh() {
        this.bitmap.clear();
        this._drawBackground();
        return this._drawActorName();
      }

      _drawBackground() {
        return this.bitmap.fillAll(UI_ActorName.BACKGROUND_COLOR);
      }

      //TODO: plugin parameters: textColor, font (from default font)
      _drawActorName() {
        var actor, text;
        actor = this._getActor();
        text = actor != null ? actor.name() : "";
        this.bitmap.fontSize = 18;
        this.bitmap.fontFace = KD_ATBS.SYSTEM.FONT;
        return this.bitmap.drawText(text, 0, 0, this.bitmap.width, this.bitmap.height, 'center');
      }

      _getActor() {
        return $gameParty.battleMembers()[this.actorIndex];
      }

    };

    UI_ActorName.BACKGROUND_COLOR = new Color(0, 0, 0, 80);

    return UI_ActorName;

  }).call(this);
  KD_ATBS.register(UI_ActorName);
})();

// ■ END UI_ActorName.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_Circle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var UI_Circle;
  UI_Circle = class UI_Circle extends Sprite {
    constructor(segmentBitmap, iconSize = 36) {
      super(new Bitmap(200, 200));
      this.segmentBitmap = segmentBitmap;
      this.iconSize = iconSize;
      this._initParameters();
      this._createSegments();
      this._moveSegments(this._maxRadius());
      this._postConfigurate();
    }

    _initParameters() {
      this.anchor.x = 0.5;
      return this.anchor.y = 0.5;
    }

    _createSegments() {
      this._segments = [];
      this._icons = [];
      this._helpers = [];
      this._inputs = [];
      this._createSegment(0, 0);
      this._createSegment(1, Math.PI / 2);
      this._createSegment(2, Math.PI);
      this._createSegment(3, -Math.PI / 2);
      this._segments.forEach((function(segment) {
        return this.addChild(segment);
      }).bind(this));
      this._configurateSegmentsElements();
      return this._createInputZones();
    }

    _createSegment(index, rotation = 0) {
      var helper, icon, segment;
      segment = this._createSegmentElement(rotation);
      icon = this._createIconForSegment(rotation);
      helper = this._createHelperForSegment();
      if (index === 2) { //down text upwards
        helper.rotation = -rotation;
      }
      segment.addChild(icon);
      segment.addChild(helper);
      this._segments[index] = segment;
      this._icons[index] = icon;
      this._helpers[index] = helper;
    }

    _createSegmentElement(rotation = 0) {
      var segment;
      segment = new Sprite();
      segment.bitmap = this.segmentBitmap;
      segment.anchor.x = 0.5;
      segment.anchor.y = 0.5;
      segment.rotation = rotation;
      return segment;
    }

    _createIconForSegment(rotation = 0) {
      var icon;
      icon = new Sprite(new Bitmap(this.iconSize, this.iconSize));
      icon.anchor.x = 0.5;
      icon.anchor.y = 0.5;
      icon.rotation = -rotation;
      return icon;
    }

    _createHelperForSegment() {
      var help;
      help = new Sprite(new Bitmap(this.segmentBitmap.width, this.segmentBitmap.height));
      help.anchor.x = 0.5;
      help.anchor.y = 0.5;
      return help;
    }

    _configurateSegmentsElements() {
      var dy;
      dy = -this.segmentBitmap.height;
      this._helpers.forEach(function(item) {
        return item.move(0, dy);
      });
      return this._icons.forEach(function(item) {
        return item.move(0, -5);
      });
    }

    _createInputZones() {
      var down, left, raduis, right, top;
      raduis = this._maxRadius();
      top = new Sprite_Button();
      top.bitmap = new Bitmap(this.segmentBitmap.width, this.segmentBitmap.height);
      top.moveToCenter(0, -raduis);
      this._inputs.push(top);
      right = new Sprite_Button();
      right.bitmap = new Bitmap(this.segmentBitmap.height, this.segmentBitmap.width);
      right.moveToCenter(raduis, 0);
      this._inputs.push(right);
      down = new Sprite_Button();
      down.bitmap = top.bitmap;
      down.moveToCenter(0, raduis);
      this._inputs.push(down);
      left = new Sprite_Button();
      left.bitmap = right.bitmap;
      left.moveToCenter(-raduis, 0);
      this._inputs.push(left);
      return this._inputs.forEach((function(item) {
        return this.addChild(item);
      }).bind(this));
    }

    _moveSegments(radius) {
      if (radius == null) {
        radius = this._maxRadius();
      }
      this._segments[0].move(0, -radius); //TOP
      this._segments[2].move(0, radius); //DOWN
      this._segments[3].move(-radius, 0); //LEFT
      return this._segments[1].move(radius, 0); //RIGHT
    }

    _maxRadius() {
      return Math.floor(this.segmentBitmap.height / 4 + this.segmentBitmap.width / 2);
    }

    _minRadius() {
      return Math.floor(this.segmentBitmap.width / 2);
    }

    _postConfigurate() {} //EMPTY

  };
  if (window.KDCore !== void 0) {
    KDCore.register(UI_Circle);
  }
})();

// ■ END UI_Circle.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_ClickIcon.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    function UI_ClickIcon() {
        this.initialize.apply(this, arguments);
    }

    UI_ClickIcon.prototype = Object.create(Sprite_Button.prototype);
    UI_ClickIcon.prototype.constructor = UI_ClickIcon;

    UI_ClickIcon.prototype.initialize = function (iconBitmap) {
        Sprite_Button.prototype.initialize.call(this);
        this.bitmap = iconBitmap;
        this._hover = null;
        this.bitmap.addLoadListener(function () {
            this._hover = new Sprite(new Bitmap(this.width, this.height));
            this.addChild(this._hover);
        }.bind(this));

        this._clicked = false;
        this._keySymbol = null;
    };

    UI_ClickIcon.prototype.setClickHandler = function (handler) {
        this._handlerX = handler;
        Sprite_Button.prototype.setClickHandler.call(this, function () {
            if (this.isClicked()) {
                this.reset();
                this._handlerX();
            } else {
                this._clicked = true;
                this._hover.bitmap.fillAll(KDCore.Color.WHITE.reAlpha(150));
                this._handlerX();
            }
        });
    };

    UI_ClickIcon.prototype.reset = function () {
        this._clicked = false;
        this._hover.bitmap.clear();
    };

    UI_ClickIcon.prototype.update = function () {
        Sprite_Button.prototype.update.call(this);
        if (this._keySymbol != null) {
            if (this.visible && Input.isTriggered(this._keySymbol)) {
                this.callClickHandler();
            }
        }
    };

    UI_ClickIcon.prototype.drawIconText = function (text) {
        var spr = new Sprite();
        spr.bitmap = new Bitmap(this.width, this.height);
        spr.bitmap.fontSize = 22;
        spr.bitmap.drawText(text, 0, 0, this.width - 4, this.height, 'right');
        this.addChild(spr);
    };

    UI_ClickIcon.prototype.setKeyHandler = function (symbol) {
        this._keySymbol = symbol;
        if (!Utils.isMobileDevice() && !Input.isGamepad())
            this.drawIconText(KD_ATBS.LIBS.IKey.convertIKeyToLetter(symbol).toUpperCase());
    };

    UI_ClickIcon.prototype.isClicked = function () {
        return (this._clicked == true);
    };
    KDCore.register(UI_ClickIcon);
})();
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_EnemyName.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var UI_ActorName, UI_EnemyName;
  UI_ActorName = KD_ATBS.LIBS.UI_ActorName;
  UI_EnemyName = class UI_EnemyName extends UI_ActorName {
    //OVER
    _drawBackground() {} //*EMPTY

    
    //OVER
    _getActor() {
      return $gameTroop.members()[this.actorIndex];
    }

  };
  KD_ATBS.register(UI_EnemyName);
})();

// ■ END UI_EnemyName.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_Gauge.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------
(function () {

  function UI_Gauge() {
    this.initialize.apply(this, arguments);
  }
  
  if (window.KDCore !== undefined)
    KDCore.register(UI_Gauge);

  UI_Gauge.prototype = Object.create(Sprite.prototype);
  UI_Gauge.prototype.constructor = UI_Gauge;

  UI_Gauge.prototype.initialize = function (width, height) {
    Sprite.prototype.initialize.call(this, new Bitmap(width + 2 || 1, height + 2 || 1));
    this.reset();
  };

  UI_Gauge.prototype.reset = function () {
    this._backgroundColor = '#000000';
    this._startColor = '#FFFFFF';
    this._endColor = '#FFFFFF';
    this._currentValue = 0;
    this._maxValue = 0;
    this._centerText = null;
    this._leftText = null;
    this._rightText = null;
    this._gaugeWidth = 0;
    this._lastValue = -1;
  };

  UI_Gauge.prototype.applyGeneratedGradient = function () {
    if (window.KDCore === undefined) return;
    var color = KDCore.Color.FromHex(this._startColor);
    this._endColor = color.getLightestColor(230).CSS;
  };

  UI_Gauge.prototype.setFont = function (fontName) {
    this.bitmap.fontFace = fontName;
  };

  UI_Gauge.prototype.setMaxValue = function (value) {
    this._maxValue = value;
    this._updateGaugeWidth();
  };

  UI_Gauge.prototype._updateGaugeWidth = function () {
    if (this._maxValue > 0 && this._currentValue < this._maxValue)
      this._gaugeWidth = Math.floor(
        (100 * this._currentValue / this._maxValue) * ((this.bitmap.width - 2) / 100));
    else
      this._gaugeWidth = this.bitmap.width;
  };

  UI_Gauge.prototype.setValue = function (value) {
    this._currentValue = value;
    this._updateGaugeWidth();
  };

  UI_Gauge.prototype.setGaugeColors = function (startHexColor, endHexColor) {
    this._startColor = startHexColor;
    this._endColor = endHexColor || this._startColor;
  };

  UI_Gauge.prototype.setBackgroundColor = function (hexColor) {
    this._backgroundColor = hexColor;
  };

  UI_Gauge.prototype.setCenterText = function (text, color) {
    this._centerText = this._makeTextData(text, color);
  };

  UI_Gauge.prototype._makeTextData = function (textValue, colorValue) {
    return {
      text: textValue || '',
      color: colorValue || '#FFFFFF'
    };
  };

  UI_Gauge.prototype.setRightText = function (text, color) {
    this._rightText = this._makeTextData(text, color);
  };

  UI_Gauge.prototype.setLeftText = function (text, color) {
    this._leftText = this._makeTextData(text, color);
  };

  UI_Gauge.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this._updateValues();
    if (this._isValueChanged()) {
      this.refresh();
    }
  };

  UI_Gauge.prototype._updateValues = function () {
    //EMPTY
  };

  UI_Gauge.prototype._isValueChanged = function () {
    return (this._currentValue != this._lastValue);
  };

  UI_Gauge.prototype.refresh = function () {
    this._lastValue = this._currentValue;
    this._drawAll();
  };

  UI_Gauge.prototype._drawAll = function () {
    this._drawBackground();
    this._drawGaugeLine();
    this._drawTexts();
  };

  UI_Gauge.prototype._drawBackground = function () {
    this.bitmap.fillRect(0, 0, this.width, this.height, this._backgroundColor);
  };

  UI_Gauge.prototype._drawGaugeLine = function () {
    this.bitmap.gradientFillRect(0, 1, this._gaugeWidth, this.height - 2,
      this._startColor,
      this._endColor,
      false);

  };

  UI_Gauge.prototype._drawTexts = function () {
    this._setTextFontSize();
    this._drawText(this._leftText, 'left');
    this._drawText(this._centerText, 'center');
    this._drawText(this._rightText, 'right');
  };

  UI_Gauge.prototype._setTextFontSize = function () {
    this.bitmap.fontSize = this.bitmap.height - 4;
  };

  UI_Gauge.prototype._drawText = function (textData, position) {
    if (textData && textData.text != '') {
      var prevtextColor = this.bitmap.textColor;
      this.bitmap.textColor = textData.color;
      this.bitmap.drawText(textData.text, 4, 0, this.bitmap.width - 8, this.bitmap.height, position);
      this.bitmap.textColor = prevtextColor;
    }
  };

})();

//■ END UI_Gauge
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_GaugeABS.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------
(function () {

  //?[FROM ALPHA ABS 1.2]
  function UI_GaugeABS() {
    this.initialize.apply(this, arguments);
  }

  KD_ATBS.register(UI_GaugeABS);
  var UI_Gauge = KDCore.LIBS.UI_Gauge;

  UI_GaugeABS.prototype = Object.create(UI_Gauge.prototype);
  UI_GaugeABS.prototype.constructor = UI_GaugeABS;

  UI_GaugeABS.prototype.initialize = function (width, height) {
    UI_Gauge.prototype.initialize.call(this, width, height);
    this._battler = null;
    this._isShowValue = true;
  };

  UI_GaugeABS.prototype.setBattler = function (battler) {
    this._battler = battler;
    if (this._battler) {
      this._configGaugeForBattler();
    } else {
      this.reset();
    }
    this.refresh();
  };

  UI_GaugeABS.prototype._configGaugeForBattler = function () {
    //EMPTY
  };

  //{Font Name, Color, Background Color, Visible, Show value}
  UI_GaugeABS.prototype.applyPluginParameters = function (pluginParams) {
    try {
      this._applyFont(pluginParams['Font Name']);
      this._applyColors(pluginParams);

      this._isShowValue = pluginParams['Show value'];
      this.visible = pluginParams.Visible;

    } catch (e) {
      console.error('ERROR while apply Plugin Parameters on UI_Gauge ' + e.name);
      this.reset();
    } finally {
      this.refresh();
    }
  };

  UI_GaugeABS.prototype._applyFont = function (fontName) {
    if (fontName)
      this.setFont(fontName);
  };

  UI_GaugeABS.prototype._applyColors = function (pluginParams) {
    this.setBackgroundColor(pluginParams['Background Color']);
    this._applyGaugeColors(pluginParams.Color);
  };

  UI_GaugeABS.prototype._applyGaugeColors = function (colors) {
    if (colors) {
      var color1 = colors['Color 1'];
      var color2 = colors['Color 2'];
      this.setGaugeColors(color1, color2);
      if (color2 == '')
        this.applyGeneratedGradient();
    }
  };

})();


//■ END UI_GaugeABS
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_GaugesForABS.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

  //?[FROM ALPHA ABS 1.2]
  function UI_GaugeABS_HP() {
    this.initialize.apply(this, arguments);
  }

  KD_ATBS.register(UI_GaugeABS_HP);
  var UI_GaugeABS = KD_ATBS.LIBS.UI_GaugeABS;
  var Color = KDCore.Color;

  UI_GaugeABS_HP.prototype = Object.create(UI_GaugeABS.prototype);
  UI_GaugeABS_HP.prototype.constructor = UI_GaugeABS_HP;

  UI_GaugeABS_HP.prototype.initialize = function (width, height) {
    UI_GaugeABS.prototype.initialize.call(this, width, height);
    this.setGaugeColors(this._mainGaugeHexColor());
    this.applyGeneratedGradient();
  };

  UI_GaugeABS_HP.prototype._mainGaugeHexColor = function () {
    return Color.RED.HEX;
  };

  //OVER
  UI_GaugeABS_HP.prototype._configGaugeForBattler = function () {
    UI_GaugeABS.prototype._configGaugeForBattler.call(this);
    this.setLeftText(this._leftGaugeText());
  };

  UI_GaugeABS_HP.prototype._leftGaugeText = function () {
    return TextManager.hpA;
  };

  //OVER
  UI_GaugeABS_HP.prototype._updateValues = function () {
    UI_GaugeABS.prototype._updateValues.call(this);
    if (this._battler) {
      this._updateMaxValue();
      this.setValue(this._currentGaugeValue());
    }
  };

  UI_GaugeABS_HP.prototype._updateMaxValue = function () {
    if (this._maxGaugeValue() != this._maxValue) {
      this.setMaxValue(this._maxGaugeValue());
      this.refresh();
    }
  };

  UI_GaugeABS_HP.prototype._maxGaugeValue = function () {
    return this._battler.mhp;
  };

  UI_GaugeABS_HP.prototype._currentGaugeValue = function () {
    return this._battler.hp;
  };

  //OVER
  UI_GaugeABS_HP.prototype.refresh = function () {
    if (this._isShowValue == true)
      this.setRightText(this._currentValue);
    UI_GaugeABS.prototype.refresh.call(this);
  };


  //?[FROM ALPHA ABS 1.2]
  function UI_GaugeABS_MP() {
    this.initialize.apply(this, arguments);
  }

  KD_ATBS.register(UI_GaugeABS_MP);
  var UI_GaugeABS_HP = KD_ATBS.LIBS.UI_GaugeABS_HP;

  UI_GaugeABS_MP.prototype = Object.create(UI_GaugeABS_HP.prototype);
  UI_GaugeABS_MP.prototype.constructor = UI_GaugeABS_MP;

  UI_GaugeABS_MP.prototype.initialize = function (width, height) {
    UI_GaugeABS_HP.prototype.initialize.call(this, width, height);
  };

  UI_GaugeABS_MP.prototype._mainGaugeHexColor = function () {
    return Color.BLUE.HEX;
  };

  UI_GaugeABS_MP.prototype._leftGaugeText = function () {
    return TextManager.mpA;
  };

  UI_GaugeABS_MP.prototype._maxGaugeValue = function () {
    return this._battler.mmp;
  };

  UI_GaugeABS_MP.prototype._currentGaugeValue = function () {
    return this._battler.mp;
  };


  //?[FROM ALPHA ABS 1.2]
  function UI_GaugeABS_TP() {
    this.initialize.apply(this, arguments);
  }

  KD_ATBS.register(UI_GaugeABS_TP);
  var UI_GaugeABS_HP = KD_ATBS.LIBS.UI_GaugeABS_HP;

  UI_GaugeABS_TP.prototype = Object.create(UI_GaugeABS_HP.prototype);
  UI_GaugeABS_TP.prototype.constructor = UI_GaugeABS_TP;

  UI_GaugeABS_TP.prototype.initialize = function (width, height) {
    UI_GaugeABS_HP.prototype.initialize.call(this, width, height);
  };

  UI_GaugeABS_TP.prototype._mainGaugeHexColor = function () {
    return Color.GREEN.HEX;
  };

  UI_GaugeABS_TP.prototype._leftGaugeText = function () {
    return TextManager.tpA;
  };

  UI_GaugeABS_TP.prototype._maxGaugeValue = function () {
    return this._battler.maxTp();
  };

  UI_GaugeABS_TP.prototype._currentGaugeValue = function () {
    return this._battler.tp;
  };


  //?[FROM ALPHA ABS 1.2]
  function UI_GaugeABS_HPE() {
    this.initialize.apply(this, arguments);
  }

  KD_ATBS.register(UI_GaugeABS_HPE);
  var UI_GaugeABS_HP = KD_ATBS.LIBS.UI_GaugeABS_HP;

  UI_GaugeABS_HPE.prototype = Object.create(UI_GaugeABS_HP.prototype);
  UI_GaugeABS_HPE.prototype.constructor = UI_GaugeABS_HPE;

  UI_GaugeABS_HPE.prototype.initialize = function (width, height) {
    UI_GaugeABS_HP.prototype.initialize.call(this, width, height);
    this._isShowInPercent = true;
  };

  UI_GaugeABS_HPE.prototype.setShowInPercent = function (bool) {
    this._isShowInPercent = bool;
  };

  UI_GaugeABS_HPE.prototype._leftGaugeText = function () {
    return '';
  };

  //OVER
  UI_GaugeABS_HPE.prototype.refresh = function () {
    if (this._isShowValue == true && this._battler)
      this.setCenterText(this._textForValue());
    UI_GaugeABS.prototype.refresh.call(this);
  };

  UI_GaugeABS_HPE.prototype._textForValue = function () {
    if (this._isShowInPercent) {
      return this._getValueInPercent();
    } else {
      return this._currentValue;
    }
  };

  UI_GaugeABS_HPE.prototype._getValueInPercent = function () {
    var percent = Math.floor((this._currentValue * 100) / this._maxGaugeValue());
    if (percent <= 0)
      percent = 1;
    return (percent + '%');
  };

})();
// ■ END UI_GaugesForABS.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_GaugesForATBS.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

(function () {
    function UI_GaugeATBS_WT() {
        this.initialize.apply(this, arguments);
    }

    KD_ATBS.register(UI_GaugeATBS_WT);
    var UI_GaugeABS = KD_ATBS.LIBS.UI_GaugeABS;
    var Color = KDCore.Color;

    UI_GaugeATBS_WT.prototype = Object.create(UI_GaugeABS.prototype);
    UI_GaugeATBS_WT.prototype.constructor = UI_GaugeATBS_WT;

    UI_GaugeATBS_WT.prototype.initialize = function (width, height) {
        UI_GaugeABS.prototype.initialize.call(this, width, height);
        this.setGaugeColors(this._mainGaugeHexColor());
        this.applyGeneratedGradient();
        this._isFullInfoMode = true;
    };

    UI_GaugeATBS_WT.prototype._mainGaugeHexColor = function () {
        return Color.MAGENTA.HEX;
    };

    //OVER
    UI_GaugeATBS_WT.prototype._configGaugeForBattler = function () {
        UI_GaugeABS.prototype._configGaugeForBattler.call(this);
        this._battlerTimer = this._battler.getTimer();
    };

    //OVER
    UI_GaugeATBS_WT.prototype._updateValues = function () {
        if (this._battler) {
            this._updateMaxValue();
            this.setValue(this._currentGaugeValue());
            if (this._isFullInfoMode == true)
                this._setTimerText();
        }
    };

    UI_GaugeATBS_WT.prototype._updateMaxValue = function () {
        if (this._maxGaugeValue() != this._maxValue) {
            this.setMaxValue(this._maxGaugeValue());
            this.refresh();
        }
    };

    UI_GaugeATBS_WT.prototype._maxGaugeValue = function () {
        return this._battlerTimer.getMaxValue();
    };

    UI_GaugeATBS_WT.prototype._currentGaugeValue = function () {
        return this._battlerTimer.getValue();
    };

    UI_GaugeATBS_WT.prototype._setTimerText = function () {
        if (this._battlerTimer.isReady()) {
            this.setCenterText(KD_ATBS.SYSTEM.STRING_TIMER_READY)
            this.setRightText('');
        } else {
            this.setCenterText('');
            this.setRightText(this._getValueForRightText());
        }
    };

    UI_GaugeATBS_WT.prototype._getValueForRightText = function () {
        var value = (this._maxGaugeValue() - this._currentGaugeValue()) / 60;
        return value.toFixed(1);
    };

    //NEW
    UI_GaugeATBS_WT.prototype.setMiniInfoMode = function () {
        this._isFullInfoMode = false;
    };

})();

// ■ END UI_GaugesForATBS.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_InnerCircleButtons.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Color, IKey, UI_InnerCircleButtons;
  Color = KDCore.Color;
  IKey = KD_ATBS.LIBS.IKey;
  UI_InnerCircleButtons = (function() {
    class UI_InnerCircleButtons extends Sprite {
      constructor(isOpen = true) {
        super(new Bitmap(100, 100));
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this._disabledIndexes = [];
        this._createButtons();
        this.visible = isOpen;
      }

      _createButtons() {
        this._buttons = [];
        4..do(this._createButton.bind(this));
        this._moveButtons();
        return this._loadIcons();
      }

      _createButton(index) {
        var button, size;
        size = UI_InnerCircleButtons.BUTTON_SIZE;
        button = new Sprite(new Bitmap(size, size));
        button.anchor.x = 0.5;
        button.anchor.y = 0.5;
        button.opacity = 200;
        this._buttons[index] = button;
        this.addChild(button);
        return button;
      }

      _moveButtons() {
        var radius;
        radius = this._getMovingSize();
        this._buttons[0].move(0, -radius);
        this._buttons[2].move(0, radius);
        this._buttons[1].move(radius, 0);
        return this._buttons[3].move(-radius, 0);
      }

      _getMovingSize() {
        return UI_InnerCircleButtons.BUTTON_SIZE;
      }

      _loadIcons() {
        this._buttons[0].bitmap.drawOnMe(IKey.getButtonImage(IKey.W(), UI_InnerCircleButtons.BUTTON_SIZE));
        this._buttons[1].bitmap.drawOnMe(IKey.getButtonImage(IKey.D(), UI_InnerCircleButtons.BUTTON_SIZE));
        this._buttons[2].bitmap.drawOnMe(IKey.getButtonImage(IKey.S(), UI_InnerCircleButtons.BUTTON_SIZE));
        return this._buttons[3].bitmap.drawOnMe(IKey.getButtonImage(IKey.A(), UI_InnerCircleButtons.BUTTON_SIZE));
      }

      isOpen() {
        return this.visible === true;
      }

      open() {
        return this.visible = true;
      }

      close() {
        return this.visible = false;
      }

      select(index) {
        this.deselectAll();
        return this._select(index);
      }

      deselectAll() {
        return this._resetColors();
      }

      _resetColors() {
        var i, item, j, len, len1, ref, ref1, results;
        ref = this._buttons;
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          item.setBlendColor(Color.NONE.ARR);
        }
        ref1 = this._disabledIndexes;
        results = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          item = ref1[j];
          results.push(this._setDisableColorToButton(item));
        }
        return results;
      }

      _setDisableColorToButton(index) {
        var disabledColor;
        disabledColor = KD_ATBS.LIBS.UI_SelectCircle.COLOR_DISABLED.ARR;
        return this._buttons[index].setBlendColor(disabledColor);
      }

      _select(index) {
        var selectColor;
        if (Input.isGamepad()) {
          return;
        }
        if (this._disabledIndexes.includes(index)) {
          return;
        }
        selectColor = KD_ATBS.LIBS.UI_SelectCircle.COLOR_SELECT.ARR;
        return this._buttons[index].setBlendColor(selectColor);
      }

      disableSegment(index) {
        if (!this._disabledIndexes.includes(index)) {
          this._disabledIndexes.push(index);
        }
        return this._setDisableColorToButton(index);
      }

      enableAllSegments() {
        return 4..do(this.enableSegment.bind(this));
      }

      enableSegment(index) {
        this._disabledIndexes.delete(index);
        return this._buttons[index].setBlendColor(Color.NONE.ARR);
      }

      hideAllSegments() {
        return 4..do(this.hideSegment.bind(this));
      }

      hideSegment(index) {
        return this._buttons[index].visible = false;
      }

      showAllSegments() {
        return 4..do(this.showSegment.bind(this));
      }

      showSegment(index) {
        return this._buttons[index].visible = true;
      }

      resetAllSegments() {
        this.showAllSegments();
        this.deselectAll();
        return this.enableAllSegments();
      }

    };

    UI_InnerCircleButtons.BUTTON_SIZE = 24;

    return UI_InnerCircleButtons;

  }).call(this);
  KD_ATBS.register(UI_InnerCircleButtons);
})();

// ■ END UI_InnerCircle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_InputCircle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var IKey, UI_InputCircle;
  IKey = KD_ATBS.LIBS.IKey;
  UI_InputCircle = class UI_InputCircle extends Sprite {
    constructor(isOpen = true) {
      super(new Bitmap(200, 200));
      //TODO: Load parameters from plugin setting
      this._createCircles(isOpen);
    }

    _createCircles(isOpen) {
      this._circle = new KD_ATBS.LIBS.UI_SelectCircle(ATBS_ResourceManager.circleSegment.bitmap, isOpen);
      this._circle2 = new KD_ATBS.LIBS.UI_SelectCircle(ATBS_ResourceManager.circleSegmentSmall.bitmap, isOpen, 24);
      this.addChild(this._circle);
      return this.addChild(this._circle2);
    }

    applyBattleStartMode() {
      var down, left, right, top;
      this._applyStandardKeys();
      top = ImageManager.loadEmptyBitmap();
      right = ATBS_ResourceManager.iconEscape.bitmap;
      down = ATBS_ResourceManager.iconBattle.bitmap;
      left = ATBS_ResourceManager.iconFastBattle.bitmap;
      this._circle2.setIcons([top, right, down, left]);
      this.setHelpers(['', TextManager.escape, TextManager.fight, KD_ATBS.SYSTEM.STRING_FAST_BATTLE]);
      return this.hideSegment(0);
    }

    _applyStandardKeys() {
      var a, d, s, size, w;
      size = this._circle.iconSize;
      w = IKey.getButtonImage(IKey.W(), size);
      d = IKey.getButtonImage(IKey.D(), size);
      s = IKey.getButtonImage(IKey.S(), size);
      a = IKey.getButtonImage(IKey.A(), size);
      return this._circle.setIcons([w, d, s, a]);
    }

    applyBattleMode() {
      var down, left, right, top;
      this._applyStandardKeys();
      this.setHelpers([TextManager.item, TextManager.guard, TextManager.attack, TextManager.skill]);
      top = ATBS_ResourceManager.iconItems.bitmap;
      right = ATBS_ResourceManager.iconDefense.bitmap;
      down = ATBS_ResourceManager.iconAttack.bitmap;
      left = ATBS_ResourceManager.iconSkills.bitmap;
      return this._circle2.setIcons([top, right, down, left]);
    }

    isOpen() {
      return this._circle.isOpen();
    }

    addClickListener(index, method) {
      return this._circle.addClickListener(index, method);
    }

    setHelpers(helpersArray) {
      return this._circle.setHelpers(helpersArray);
    }

    showHelpers() {
      return this._circle.showHelpers();
    }

    hideHelpers() {
      return this._circle.hideHelpers();
    }

    select(index) {
      SoundManager.playCursor();
      return this._performMethod(this.select.name, [index]);
    }

    click(index) {
      SoundManager.playOk();
      return this._performMethod(this.click.name, [index]);
    }

    deselectAll() {
      return this._performMethod(this.deselectAll.name);
    }

    hideAllSegments() {
      return this._performMethod(this.hideAllSegments.name);
    }

    hideSegment(index) {
      return this._performMethod(this.hideSegment.name, [index]);
    }

    showAllSegments() {
      return this._performMethod(this.showAllSegments.name);
    }

    showSegment(index) {
      return this._performMethod(this.showSegment.name, [index]);
    }

    disableAllSegments() {
      return this._performMethod(this.disableAllSegments.name);
    }

    disableSegment(index) {
      return this._performMethod(this.disableSegment.name, [index]);
    }

    enableAllSegments() {
      return this._performMethod(this.enableAllSegments.name);
    }

    enableSegment(index) {
      return this._performMethod(this.enableSegment.name, [index]);
    }

    resetAllSegments() {
      return this._performMethod(this.resetAllSegments.name);
    }

    open() {
      this._circle.open();
      if (this.isOpen()) {
        return;
      }
      return this._needOpenSmallCircle = true;
    }

    close() {
      this._circle.close();
      if (!this.isOpen()) {
        return;
      }
      return this._circle2.opacity = 0;
    }

    _performMethod(methodName, args) {
      var e;
      try {
        this._circle[methodName].apply(this._circle, args);
        if (this._circle2[methodName] != null) {
          this._circle2[methodName].apply(this._circle2, args);
        }
      } catch (error) {
        e = error;
        console.error(e);
      }
    }

    update() {
      Sprite.prototype.update.call(this);
      if (this._needOpenSmallCircle === true && this.isOpen()) {
        this._openSmallCircle();
        return this._needOpenSmallCircle = false;
      }
    }

    _openSmallCircle() {
      return this._circle2.opacity = 255;
    }

  };
  KD_ATBS.register(UI_InputCircle);
})();

// ■ END UI_InputCircle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_InputCircleSmall.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var UI_InputCircle, UI_InputCircleSmall;
  UI_InputCircle = KD_ATBS.LIBS.UI_InputCircle;
  UI_InputCircleSmall = class UI_InputCircleSmall extends UI_InputCircle {
    
    //?[OVER]
    _createCircles(isOpen) {
      this._circle = new KD_ATBS.LIBS.UI_SelectCircle(ATBS_ResourceManager.circleSegmentSmall.bitmap, isOpen, 24);
      this._circle2 = new KD_ATBS.LIBS.UI_InnerCircleButtons(isOpen);
      this.addChild(this._circle);
      return this.addChild(this._circle2);
    }

    //?[OVER EMPTY]
    applyBattleStartMode() {}

    //?[OVER EMPTY]
    applyBattleMode() {}

    //?[OVER]
    click(index) {
      SoundManager.playOk();
      this._circle.click(index);
      return this._circle2.deselectAll();
    }

    setIcons(iconsArray) {
      return this._circle.setIcons(iconsArray);
    }

    _openSmallCircle() {
      UI_InputCircle.prototype._openSmallCircle.call(this);
      return this._circle2.open();
    }

  };
  KD_ATBS.register(UI_InputCircleSmall);
})();

// ■ END UI_InputCircleSmall.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_KillCounter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Color, SDK, UI_KillCounter;
  Color = KDCore.Color;
  SDK = KDCore.SDK;
  UI_KillCounter = (function() {
    class UI_KillCounter extends Sprite {
      constructor(lineWidth, stackSize = 4) {
        super(new Bitmap(lineWidth * 2 || 1, stackSize * (UI_KillCounter.LINE_HEIGHT + 2)));
        this._lineWidth = lineWidth * 2;
        this._stackSize = stackSize;
        this._initItems();
      }

      _initItems() {
        this._items = [];
        this._timers = [];
        return SDK.times(this._stackSize, (function() {
          this._items.push(null);
          this._timers.push(null);
        }).bind(this));
      }

      clear() {
        this._items.forEach((function(item) {
          if (item == null) {
            this._parent.removeChild(item);
          }
        }).bind(this));
        return this._initItems();
      }

      push(who, another) {
        var item;
        item = this._items.shift();
        if (item != null) {
          this.removeChild(item);
        }
        this._pushNewItem(this._createNewItem(who, another));
        return this._step();
      }

      _pushNewItem(item) {
        this._items.push(item);
        this.addChild(this._items.last());
      }

      //TODO: attackIcon from parameters
      _createNewItem(who, another) {
        var newItem, newItemBitmap;
        newItemBitmap = new Bitmap(this.width, UI_KillCounter.LINE_HEIGHT);
        newItemBitmap.addLoadListener((function() {
          var b, dx;
          dx = this._drawInfoLine(0, who, newItemBitmap);
          b = ATBS_ResourceManager.iconAttack.bitmap;
          newItemBitmap.drawOnMe(b, dx + 4, 0);
          this._drawInfoLine(dx + b.width + 8, another, newItemBitmap);
        }).bind(this));
        return newItem = new Sprite(newItemBitmap);
      }

      //TODO: Colors, textFont from parameters
      _drawInfoLine(dx, battler, bitmap) {
        var color;
        color = battler.isEnemy() ? Color.RED : Color.GREEN;
        if (battler.isPlayer()) {
          color = Color.AQUA;
        }
        bitmap.textColor = color.CSS;
        bitmap.fontFace = KD_ATBS.SYSTEM.FONT;
        bitmap.drawText(battler.name(), dx, 0, this._lineWidth / 2, UI_KillCounter.LINE_HEIGHT);
        dx += bitmap.measureTextWidth(battler.name());
        return dx;
      }

      _step() {
        this._stepItems();
        return this._stepTimers();
      }

      _stepItems() {
        return SDK.times(this._items.length, (function(i) {
          var index, item;
          index = this._items.length - 1 - i;
          item = this._items[index];
          if (item == null) {
            return;
          }
          this._items[index].y = (UI_KillCounter.LINE_HEIGHT + 1) * i;
        }).bind(this));
      }

      _stepTimers() {
        var newTimer;
        this._timers.shift();
        newTimer = new Game_TimerABS();
        newTimer.start(UI_KillCounter.TIME);
        return this._timers.push(newTimer);
      }

      update() {
        Sprite.prototype.update.call(this);
        return this._updateTimers();
      }

      _updateTimers() {
        return SDK.times(this._stackSize, (function(i) {
          var index, timer;
          index = this._timers.length - 1 - i;
          timer = this._timers[index];
          if (timer == null) {
            return;
          }
          timer.update();
          if (timer.isReady()) {
            this._removeItemByTimer(index);
          }
        }).bind(this));
      }

      _removeItemByTimer(index) {
        var item;
        item = this._items[index];
        if (item != null) {
          this.removeChild(item);
        }
        this._timers[index] = null;
        return this._items[index] = null;
      }

    };

    UI_KillCounter.LINE_HEIGHT = 24;

    UI_KillCounter.TIME = 120;

    return UI_KillCounter;

  }).call(this);
  KD_ATBS.register(UI_KillCounter);
})();

// ■ END UI_KillCounter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_LayerObjectActorBg.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Color, UI_LayerObject, UI_LayerObjectActorBg;
  UI_LayerObject = KD_ATBS.LIBS.UI_LayerObject;
  Color = KDCore.Color;
  UI_LayerObjectActorBg = class UI_LayerObjectActorBg extends UI_LayerObject {
    constructor(layer, width, height) {
      super(layer);
      this.width = width;
      this.height = height;
      this._create();
    }

    _create() {
      var bitmap, color;
      bitmap = new Bitmap(this.width, this.height);
      bitmap.fillAll(new Color(0, 0, 50, 100));
      color = Color.WHITE.reAlpha(48).CSS;
      bitmap.fillRect(this._lineStartPosition(), 2, 2, this.height - 4, color);
      this._drawAnotherLine(bitmap, color);
      this.sprite = new Sprite(bitmap);
      return this.layer.addChild(this.sprite);
    }

    _lineStartPosition() {
      return 104;
    }

    _drawAnotherLine(bitmap, color) {
      return bitmap.fillRect(bitmap.width - 27, 2, 2, this.height - 4, color);
    }

    move(x, y) {
      return this.sprite.move(x, y);
    }

    show() {
      UI_LayerObject.prototype.show.call(this);
      return this.sprite.visible = true;
    }

    hide() {
      UI_LayerObject.prototype.hide.call(this);
      return this.sprite.visible = false;
    }

    terminate() {
      return this.layer.removeChild(this.sprite);
    }

  };
  KD_ATBS.register(UI_LayerObjectActorBg);
})();

// ■ END UI_LayerObjectActorBg.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_LayerObjectActorGauges.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Color, SDK, UI_LayerObject, UI_LayerObjectActorGauges;
  UI_LayerObject = KD_ATBS.LIBS.UI_LayerObject;
  Color = KDCore.Color;
  SDK = KDCore.SDK;
  UI_LayerObjectActorGauges = class UI_LayerObjectActorGauges extends UI_LayerObject {
    constructor(layer, width, height) {
      super(layer);
      this.width = width;
      this.height = height;
      this._gauges = [];
      this._asyncGaugesIndexex = [];
      this._spacing = 4;
      this._thread = null;
      this._create();
    }

    _create() {
      this.sprite = new Sprite(new Bitmap(this.width, this.height));
      return this.layer.addChild(this.sprite);
    }

    addASyncGauge(gauge) {
      this.addGauge(gauge);
      this._asyncGaugesIndexex.push(this._gauges.length - 1);
      if (this._thread == null) {
        return this._startUpdateThread();
      }
    }

    addGauge(gauge) {
      this._gauges.push(gauge);
      this.sprite.addChild(gauge);
      return this._moveGauges();
    }

    _moveGauges() {
      return SDK.times(this._gauges.length, (function(i) {
        var item, itemPrev;
        if (i === 0) {
          return;
        }
        itemPrev = this._gauges[i - 1];
        item = this._gauges[i];
        return item.move(0, itemPrev.y + itemPrev.height + this._spacing);
      }).bind(this));
    }

    _startUpdateThread() {
      this._thread = setInterval((function() {
        this._updateManual();
      }).bind(this), 200);
    }

    _updateManual() {
      return this._asyncGaugesIndexex.forEach((function(item) {
        if (this._gauges[item] != null) {
          this._gauges[item].manualUpdate();
        }
      }).bind(this));
    }

    setSpacing(spacing) {
      this._spacing = spacing;
      return this._moveGauges();
    }

    move(x, y) {
      return this.sprite.move(x, y);
    }

    show() {
      UI_LayerObject.prototype.show.call(this);
      return this.sprite.visible = true;
    }

    hide() {
      UI_LayerObject.prototype.hide.call(this);
      return this.sprite.visible = false;
    }

    terminate() {
      if (this._thread != null) {
        this._stopThread();
      }
      return this.layer.removeChild(this.sprite);
    }

    _stopThread() {
      return clearInterval(this._thread);
    }

  };
  KD_ATBS.register(UI_LayerObjectActorGauges);
})();

// ■ END UI_LayerObjectActorGauges.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_LayerObjectAlly.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var UI_LayerObjectAlly;
  UI_LayerObjectAlly = class UI_LayerObjectAlly extends KD_ATBS.LIBS.UI_LayerObject {
    constructor(layer, index) {
      super(layer);
      this._thread = null;
      this.setActorIndex(index);
    }

    setActorIndex(index) {
      var ref;
      this.index = index;
      this._battler = (ref = $gameParty.battleMembers()[this.index]) != null ? ref : null;
      return this.refresh();
    }

    refresh() {
      if (this._hasBeenCreated()) {
        this.terminate();
        this._clear();
      }
      if (this._battler != null) {
        this._createAll();
      }
      return this.hide();
    }

    _hasBeenCreated() {
      return this._background != null;
    }

    //?[OVER]
    terminate() {
      if (this._background == null) {
        return;
      }
      this._background.terminate();
      this._gauges.terminate();
      if (this._thread != null) {
        return this._stopThread();
      }
    }

    _stopThread() {
      return clearInterval(this._thread);
    }

    _clear() {
      return this.layer.removeChild(this._mainSprite);
    }

    _createAll() {
      this._mainSprite = new Sprite();
      this._createBackground();
      this._createActor();
      this._createName();
      this._createGauges();
      this._createBars();
      this._startUpdateThread();
      return this.layer.addChild(this._mainSprite);
    }

    _createBackground() {
      return this._background = new KD_ATBS.LIBS.UI_LayerObjectAllyBg(this._mainSprite, KD_ATBS.SYSTEM.ALLY_WINDOW_WIDTH, KD_ATBS.SYSTEM.PARTY_WINDOW_HEIGHT);
    }

    _createActor() {
      this._actor = new KD_ATBS.LIBS.Sprite_ActorATBS(this._battler);
      return this._mainSprite.addChild(this._actor);
    }

    _createName() {
      this._name = new KD_ATBS.LIBS.UI_ActorName(96, 24, this.index);
      return this._mainSprite.addChild(this._name);
    }

    _createGauges() {
      var gaugeHeigth, gaugeWidth, playerHpGauge, playerWtGauge, width;
      width = 96;
      this._gauges = new KD_ATBS.LIBS.UI_LayerObjectActorGauges(this._mainSprite, width, 24);
      this._gauges.setSpacing(0);
      gaugeWidth = width - 1;
      gaugeHeigth = 16;
      playerHpGauge = new KD_ATBS.LIBS.UI_GaugeABS_HPE(gaugeWidth, gaugeHeigth);
      playerHpGauge.setBattler(this._battler);
      playerWtGauge = new KD_ATBS.LIBS.UI_GaugeATBS_WT(gaugeWidth, gaugeHeigth);
      playerWtGauge.setMiniInfoMode();
      playerWtGauge.setBattler(this._battler);
      this._gauges.move(1, (KD_ATBS.SYSTEM.PARTY_WINDOW_HEIGHT - gaugeHeigth * 2) - 2);
      this._gauges.addGauge(playerHpGauge);
      return this._gauges.addGauge(playerWtGauge);
    }

    _createBars() {
      this._statusBar = new KD_ATBS.LIBS.UI_StatusBar(Graphics.height / 2, this._battler);
      this._statusBar.setLimit(4);
      this._statusBar.setNoDrawTimersMode();
      this._statusBar.move(99, -this._statusBar.height + KD_ATBS.SYSTEM.PARTY_WINDOW_HEIGHT - 8);
      return this._mainSprite.addChild(this._statusBar);
    }

    _startUpdateThread() {
      this._thread = setInterval((function() {
        this._updateManual();
      }).bind(this), 200);
    }

    _updateManual() {
      if (!this.isVisible()) {
        return;
      }
      return this._statusBar.manualUpdate();
    }

    show() {
      if (this.isVisible()) {
        return;
      }
      KD_ATBS.LIBS.UI_LayerObject.prototype.show.call(this);
      this._background.show();
      this._name.visible = true;
      this._statusBar.visible = true;
      return this._gauges.show();
    }

    hide() {
      if (!this.isVisible()) {
        return;
      }
      KD_ATBS.LIBS.UI_LayerObject.prototype.hide.call(this);
      this._background.hide();
      this._name.visible = false;
      this._statusBar.visible = false;
      return this._gauges.hide();
    }

    move(x, y) {
      return this._mainSprite.move(x, y);
    }

    //?[OVER]
    update() {
      if (this._actor.visible === false) {
        return this.hide();
      } else {
        if (this._actor.inHomePosition()) {
          return this.show();
        }
      }
    }

    getActorSprite() {
      return this._actor;
    }

  };
  KD_ATBS.register(UI_LayerObjectAlly);
})();

// ■ END UI_LayerObjectAlly.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_LayerObjectAllyBg.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Color, UI_LayerObjectActorBg, UI_LayerObjectAllyBg;
  UI_LayerObjectActorBg = KD_ATBS.LIBS.UI_LayerObjectActorBg;
  Color = KDCore.Color;
  UI_LayerObjectAllyBg = class UI_LayerObjectAllyBg extends UI_LayerObjectActorBg {
    _lineStartPosition() {
      return 96;
    }

    _drawAnotherLine(bitmap, color) {} //*EMPTY

  };
  KD_ATBS.register(UI_LayerObjectAllyBg);
})();

// ■ END UI_LayerObjectAllyBg.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_LayerObjectEnemyInfo.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var UI_LayerObject, UI_LayerObjectEnemyInfo;
  UI_LayerObject = KD_ATBS.LIBS.UI_LayerObject;
  UI_LayerObjectEnemyInfo = class UI_LayerObjectEnemyInfo extends UI_LayerObject {
    constructor(layer, enemyIndex = 0, width = 100) {
      super(layer);
      this.enemyIndex = enemyIndex;
      this.width = width;
      this._selected = false;
      this._iconIndex = null;
      this.battler = $gameTroop.members()[this.enemyIndex];
      this._create();
    }

    _create() {
      this.sprite = new Sprite(new Bitmap(this.width, 60));
      this.sprite.anchor.x = 0.5;
      if (this.battler != null) {
        this._createSelectCursor();
        this._createName();
        this._createHPGauge();
      }
      return this.layer.addChild(this.sprite);
    }

    _createSelectCursor() {
      this.spriteCursor = new Sprite(new Bitmap(24, 24));
      this.spriteCursor.anchor.x = 0.5;
      return this.sprite.addChild(this.spriteCursor);
    }

    _createName() {
      this.nameSprite = new KD_ATBS.LIBS.UI_EnemyName(this.width, 24, this.enemyIndex);
      this.nameSprite.move(0, this.spriteCursor.height);
      this.nameSprite.anchor.x = 0.5;
      return this.sprite.addChild(this.nameSprite);
    }

    _createHPGauge() {
      this.hpGauge = new KD_ATBS.LIBS.UI_GaugeABS_HPE(this.width, 16);
      this.hpGauge.setBattler(this.battler);
      this.hpGauge.move(0, this.nameSprite.height + this.nameSprite.y);
      this.hpGauge.anchor.x = 0.5;
      return this.sprite.addChild(this.hpGauge);
    }

    select(iconIndex) {
      if ((this.battler != null) && this.battler.isAlive()) {
        this._iconIndex = iconIndex;
        this._selected = true;
        return this._drawCursor();
      } else {
        return this.deselect();
      }
    }

    _drawCursor() {
      if (this.spriteCursor == null) {
        return;
      }
      this.spriteCursor.bitmap.clear();
      if (this._iconIndex != null) {
        return this.spriteCursor.bitmap.drawIcon(0, 0, this._iconIndex, 24);
      }
    }

    deselect() {
      this._iconIndex = null;
      this._selected = false;
      return this._drawCursor();
    }

    update() {
      if ((this.battler != null) && this.battler.isAlive()) {
        if (!this.isVisible()) {
          this.show();
        }
        return this._updateOpacity();
      } else {
        this.deselect();
        return this.hide();
      }
    }

    _updateOpacity() {
      return this.sprite.opacity = this.isSelected() ? 255 : 120;
    }

    isSelected() {
      return this._selected === true;
    }

    move(x, y) {
      return this.sprite.move(x, y);
    }

    show() {
      UI_LayerObject.prototype.show.call(this);
      return this.sprite.visible = true;
    }

    hide() {
      UI_LayerObject.prototype.hide.call(this);
      return this.sprite.visible = false;
    }

    terminate() {
      return this.layer.removeChild(this.sprite);
    }

    
    //?TEST
    test() {
      this.battler = $gameParty.leader();
      this.layer.removeChild(this.sprite);
      this._create();
      return this.update();
    }

  };
  KD_ATBS.register(UI_LayerObjectEnemyInfo);
})();

// ■ END UI_LayerObjectEnemyInfo.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_LayerObjectPartyLeader.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var UI_LayerObjectPartyLeader;
  UI_LayerObjectPartyLeader = class UI_LayerObjectPartyLeader extends KD_ATBS.LIBS.UI_LayerObject {
    constructor(layer) {
      super(layer);
      this._thread = null;
      this._createBackground();
      this._createActor();
      this._createName();
      this._createGauges();
      this._createBars();
      this._startUpdateThread();
      this.hide();
    }

    _createBackground() {
      return this._background = new KD_ATBS.LIBS.UI_LayerObjectActorBg(this.layer, KD_ATBS.SYSTEM.PLAYER_WINDOW_WIDTH, KD_ATBS.SYSTEM.PARTY_WINDOW_HEIGHT);
    }

    _createActor() {
      this._actor = new KD_ATBS.LIBS.Sprite_ActorATBS($gameParty.leader());
      return this.layer.addChild(this._actor);
    }

    _createName() {
      this._playerName = new KD_ATBS.LIBS.UI_ActorName(96, 24, 0);
      this._playerName.move(4, 0);
      return this.layer.addChild(this._playerName);
    }

    _createGauges() {
      var battler, gaugeHeigth, gaugeWidth, playerHpGauge, playerMpGauge, playerTpGauge, playerWtGauge, readyGauge, width;
      width = KD_ATBS.SYSTEM.PLAYER_WINDOW_WIDTH - 144;
      this._playerGauges = new KD_ATBS.LIBS.UI_LayerObjectActorGauges(this.layer, width, 24);
      this._playerGauges.move(115, 2);
      battler = $gameParty.leader();
      gaugeWidth = width - 10;
      gaugeHeigth = 18;
      playerHpGauge = new KD_ATBS.LIBS.UI_GaugeABS_HP(gaugeWidth, gaugeHeigth);
      playerHpGauge.setBattler(battler);
      playerMpGauge = new KD_ATBS.LIBS.UI_GaugeABS_MP(gaugeWidth, gaugeHeigth);
      playerMpGauge.setBattler(battler);
      if ($dataSystem.optDisplayTp) {
        playerTpGauge = new KD_ATBS.LIBS.UI_GaugeABS_TP(gaugeWidth, gaugeHeigth);
        playerTpGauge.setBattler(battler);
      }
      readyGauge = new KD_ATBS.LIBS.UI_SkillReadyBar(gaugeWidth, 24, battler);
      playerWtGauge = new KD_ATBS.LIBS.UI_GaugeATBS_WT(gaugeWidth, gaugeHeigth - 2);
      playerWtGauge.setBattler(battler);
      this._playerGauges.addGauge(playerHpGauge);
      this._playerGauges.addGauge(playerMpGauge);
      if ($dataSystem.optDisplayTp) {
        this._playerGauges.addGauge(playerTpGauge);
      }
      this._playerGauges.addASyncGauge(readyGauge);
      return this._playerGauges.addGauge(playerWtGauge);
    }

    _createBars() {
      this._rechargeBar = new KD_ATBS.LIBS.UI_RechargeBar(4, $gameParty.leader());
      this._rechargeBar.move(KD_ATBS.SYSTEM.PLAYER_WINDOW_WIDTH - this._rechargeBar.width + 5, 4);
      this._statusBar = new KD_ATBS.LIBS.UI_StatusBar(Graphics.height / 2, $gameParty.leader());
      this._statusBar.move(-this._statusBar.width, -this._statusBar.height + KD_ATBS.SYSTEM.PARTY_WINDOW_HEIGHT);
      this.layer.addChild(this._rechargeBar);
      return this.layer.addChild(this._statusBar);
    }

    _startUpdateThread() {
      this._thread = setInterval((function() {
        this._updateManual();
      }).bind(this), 200);
    }

    _updateManual() {
      if (!this.isVisible()) {
        return;
      }
      this._rechargeBar.manualUpdate();
      return this._statusBar.manualUpdate();
    }

    show() {
      if (this.isVisible()) {
        return;
      }
      KD_ATBS.LIBS.UI_LayerObject.prototype.show.call(this);
      this._background.show();
      this._playerName.visible = true;
      this._rechargeBar.visible = true;
      this._statusBar.visible = true;
      return this._playerGauges.show();
    }

    hide() {
      if (!this.isVisible()) {
        return;
      }
      KD_ATBS.LIBS.UI_LayerObject.prototype.hide.call(this);
      this._background.hide();
      this._playerName.visible = false;
      this._rechargeBar.visible = false;
      this._statusBar.visible = false;
      return this._playerGauges.hide();
    }

    //?[OVER]
    update() {
      if (this._actor.visible === false) {
        return this.hide();
      } else {
        if (this._actor.inHomePosition()) {
          return this.show();
        }
      }
    }

    
    //?[OVER]
    terminate() {
      this._background.terminate();
      this._playerGauges.terminate();
      if (this._thread != null) {
        return this._stopThread();
      }
    }

    _stopThread() {
      return clearInterval(this._thread);
    }

    getActorSprite() {
      return this._actor;
    }

  };
  KD_ATBS.register(UI_LayerObjectPartyLeader);
})();

// ■ END UI_LayerObjectPartyLeader.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_MenuItemSelector.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[OVERLAY CLASS]
function UI_MenuItemSelector() {
    this.initialize.apply(this, arguments);
}

KD_ATBS.register(UI_MenuItemSelector);

UI_MenuItemSelector.prototype = Object.create(Object.prototype);
UI_MenuItemSelector.prototype.constructor = UI_MenuItemSelector;

UI_MenuItemSelector.prototype.initialize = function (parentItemListWindow) {
    this.parent = parentItemListWindow;
    this.init();
};

UI_MenuItemSelector.prototype.init = function () {
    this._createATBSItemsButton();
    this._createATBSCircle();
};

UI_MenuItemSelector.prototype._createATBSItemsButton = function () {
    //TODO: С параметров кнопку
    this._atbsSetupButton = new KDCore.LIBS.UI_ClickIcon(ATBS_ResourceManager.iconSetup.bitmap);
    //this._atbsSetupButton.visible = false;
    this._atbsSetupButton.move(this.parent.width - 40, this.parent.height - 40);
    this._atbsSetupButton.setKeyHandler(KD_ATBS.LIBS.IKey.E());
    this._atbsSetupButton.setClickHandler(function () {
        if (this._atbsSetupButton.isClicked()) {
            this._onATBSSetupOn();
        } else {
            this._onATBSSetupOff();
        }
    }.bind(this));
    this.parent.addChild(this._atbsSetupButton);
};

UI_MenuItemSelector.prototype.isOpened = function() {
    return this._circleBackground.visible == true;
};

UI_MenuItemSelector.prototype._onATBSSetupOn = function () {
    this._circleBackground.visible = true;
    SoundManager.playCursor();
};

UI_MenuItemSelector.prototype._onATBSSetupOff = function () {
    if (this._circleBackground && this._circleBackground.visible == true) {
        this._circleBackground.visible = false;
        SoundManager.playCancel();
    }
};

UI_MenuItemSelector.prototype._createATBSCircle = function () {
    this._createATBSCircleBackground();
    try {
        this._circleATBS = new KD_ATBS.LIBS.UI_InputCircleSmall();
        this._circleATBS.showHelpers();
        this._circleBackground.addChild(this._circleATBS);
        this._circleATBS.moveToParentCenter();

        this._circleATBS.addClickListener(0, function () {
            this._onIndexClick(0);
        }.bind(this));
        this._circleATBS.addClickListener(1, function () {
            this._onIndexClick(1);
        }.bind(this));
        this._circleATBS.addClickListener(2, function () {
            this._onIndexClick(2);
        }.bind(this));
        this._circleATBS.addClickListener(3, function () {
            this._onIndexClick(3);
        }.bind(this));

        this._refreshATBSCircle();
    } catch (e) {
        console.error(e);
    }
};

UI_MenuItemSelector.prototype._createATBSCircleBackground = function () {
    this._circleBackground = new Sprite(new Bitmap((this.parent.width / 2) - 4, this.parent.height - 8));
    this._circleBackground.bitmap.fillAll(KDCore.Color.BLACK.reAlpha(200));
    this.parent.addChild(this._circleBackground);
    this._circleBackground.visible = false;
};

UI_MenuItemSelector.prototype._refreshATBSCircle = function () {
    if (this._circleATBS) {
        var items = this._getATBSItems();
        var icons = items.map(function (item) {
            if (item != null)
                return item.iconIndex;
            else
                return null;
        });
        var names = items.map(function (item) {
            if (item != null)
                return item.name;
            else
                return '';
        });
        this._circleATBS.setIcons(icons);
        this._circleATBS.setHelpers(names);
    }
};

//?[NEED OVERLOAD]
UI_MenuItemSelector.prototype._getATBSItems = function () {
    return [null, null, null, null];
};

//?[NEED CALL FROM PARENT]
UI_MenuItemSelector.prototype.activate = function () {
    this._checkATBSButtonVisible();
};

UI_MenuItemSelector.prototype._checkATBSButtonVisible = function () {
    this._atbsSetupButton.visible = this.isSelectorButtionVisible();
};

UI_MenuItemSelector.prototype.isSelectorButtionVisible = function () {
    return true;
};

//?[NEED CALL FROM PARENT]
UI_MenuItemSelector.prototype.deactivate = function () {
    this._createATBSItemsButton.visible = false;
    if (this._atbsSetupButton)
        this._atbsSetupButton.reset();
    this._onATBSSetupOff();
};

//?[NEED CALL FROM PARENT]
UI_MenuItemSelector.prototype.refresh = function () {
    this._checkATBSButtonVisible();
    this._checkATBSCircleVisible();
    this._refreshATBSCircle();
};

UI_MenuItemSelector.prototype._checkATBSCircleVisible = function () {
    if (this._atbsSetupButton && this._atbsSetupButton.visible == false) {
        if (this._circleBackground)
            this._onATBSSetupOff();
    }
};

//?[NEED CALL FROM PARENT]
UI_MenuItemSelector.prototype.select = function (index) {
    if (!this.parent) return;
    var maxCols = this.parent.maxCols();
    var place = maxCols > 1 ? index % maxCols : 0;
    this._placeATBSCircle(place);
};

UI_MenuItemSelector.prototype._placeATBSCircle = function (place = 0) {
    if (!this._circleBackground) return;
    if (place <= 0) { //RIGHT
        this._circleBackground.move(this.parent.width - 4, this.parent.height - 4);
        this._circleBackground.setStaticAnchor(1, 1);
    } else { //LEFT
        this._circleBackground.move(4, this.parent.height - 4);
        this._circleBackground.setStaticAnchor(0, 1);
    }
};

//?[NEED CALL FROM PARENT]
UI_MenuItemSelector.prototype.update = function () {
    if (!this.parent) return;
    if (this.parent.active == true) {
        if (this._circleBackground.visible == true)
            this._updateATBSInput();
    }
};

UI_MenuItemSelector.prototype._updateATBSInput = function () {
    var IKey = KD_ATBS.LIBS.IKey;
    if (IKey.isTriggerW()) {
        this._onIndexClick(0);
    }
    if (IKey.isTriggerD()) {
        this._onIndexClick(1);
    }
    if (IKey.isTriggerS()) {
        this._onIndexClick(2);
    }
    if (IKey.isTriggerA()) {
        this._onIndexClick(3);
    }
};

UI_MenuItemSelector.prototype._onIndexClick = function (index) {
    var item = this.parent.item();
    if (this._isItemForATBSCircle(item)) {
        try {
            if (this._circleATBS)
                this._circleATBS.click(index);
            SoundManager.playOk();
            this._addATBSItemToCircle(item, index);
            return;
        } catch (e) {
            console.error(e);
        }
    }
    SoundManager.playBuzzer();
};

//?[NEED OVERLOAD]
UI_MenuItemSelector.prototype._addATBSItemToCircle = function (item, index) {};

UI_MenuItemSelector.prototype._isItemForATBSCircle = function (item) {
    try {
        if (item == null)
            return false;
        if (item.occasion == 2 || item.occasion == 3)
            return false;
        if (item.meta.noATBS == true)
            return false;
    } catch (e) {
        console.error(e);
        return false;
    }
    return true;
};

//?[OPTION CALL FROM PARENT]
UI_MenuItemSelector.prototype.drawATBSInputSymbol = function (item, x, y, width) {
    var items = this._getATBSItems();
    var index = items.indexOf(item);
    if (index >= 0) {
        var item = items[index];
        var symbol = '■'; //TODO: Определить символ клавиши (из параметров), если Keybord, если XBox , то символ GamePad, если Mobil то квадратик оставлять
        var spacer = '0000';
        this.parent.changeTextColor(KDCore.Color.ORANGE.CSS);
        if (Imported.YEP_ItemCore == true)
            spacer += '00';
        this.parent.drawText(symbol, x, y, width - this.parent.textWidth(spacer), 'right');
    }
};
// ■ END UI_MenuItemSelector.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_PopUpMachine.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
  "use strict";

  var SDK = KDCore.SDK;

  //ABSObject_PopUpMachine
  //------------------------------------------------------------------------------
  /* jshint -W104 */
  //?[FROM ALPHA ABS 1.2]
  class ABSObject_PopUpMachine {
    constructor(x, y, width, stack_size, parent) {
      this._x = x;
      this._y = y;
      this._width = width;
      this._stack_size = stack_size;
      this._parent = parent;
      this._effectType = null;
      this._upMode = false;
      this._noEffect = false;

      this._items = [];
      this._timers = [];

      this._init_items();
    }

    setUpMode() {
      this._upMode = true;
    }

    setEffectSettings(effect) {
      this._effectType = effect;
    }

    setNoEffectMode() {
      this._noEffect = true;
    }
 
    move(x, y) {
      this._x = x;
      this._y = y;
      this._step();
    }

    push(popUpItem) {
      if (this._effectType != null && !this._noEffect)
        popUpItem.setEffectSettings(this._effectType);

      popUpItem.setup(this._x, this._y, this._width, this._parent);

      var item = this._items.shift();
      if (item != null) item.dispose();

      this._items.push(popUpItem);
      this._step();
      this._timers.shift();
      this._timers.push(0);
    }

    clear() {
      this._items.forEach(function (item) {
        if (item != null) item.dispose();
      });
      this._items = [];
      this._timers = [];
      this._init_items();
    }

    update() {
      this._update_timers();
      this._items.forEach(function (item) {
        if (item != null) item.update();
      });
    }

    //PRIVATE
    _init_items() {
      SDK.times(this._stack_size, function () {
        this._items.push(null);
        this._timers.push(null);
      }.bind(this));
    }

    _update_timers() {
      SDK.times(this._stack_size, function (i) {
        var index = (this._timers.length - 1) - i; //Reverse
        var timer = this._timers[index];
        if (timer == null)
          return;
        else {
          if (timer < ABSObject_PopUpMachine.MAX_TIME)
            this._timers[index] = this._timers[index] + 1;
          if (timer == ABSObject_PopUpMachine.MAX_TIME) {
            if (this._items[index] != null) {
              this._items[index].dispose();
            }
            this._items[index] = null;
            this._timers[index] = null;
          }
        }
      }.bind(this));
    }

    _step() {
      SDK.times(this._items.length, function (i) {
        var index = (this._items.length - 1) - i; //Reverse
        var item = this._items[index];
        if (item == null)
          return;

        var y = 0;
        if (this._upMode)
          y = this._y - (ABSObject_PopUpMachine.Y_STEP * i);
        else
          y = this._y + (ABSObject_PopUpMachine.Y_STEP * i);

        this._items[index].setX(this._x);
        this._items[index].setY(y);
      }.bind(this));
    }
  }

  SDK.setConstantToObject(ABSObject_PopUpMachine, 'Y_STEP', 24);
  SDK.setConstantToObject(ABSObject_PopUpMachine, 'MAX_TIME', 60);
  SDK.setConstantToObject(ABSObject_PopUpMachine, 'SETTINGS', [1, false, 12]); //zoom, isUpdateZoom, +toTextSize
  //END ABSObject_PopUpMachine
  //------------------------------------------------------------------------------

  KD_ATBS.register(ABSObject_PopUpMachine);
})();
// ■ END UI_PopUpMachine.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_PopUpObject.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
  //FROM ALPHA ABS 1.2
  "use strict";

  var SDK = KDCore.SDK;
  var Color = KDCore.Color;

  //ABSObject_PopUp
  //------------------------------------------------------------------------------
  /* jshint -W104 */
  //?[FROM ALPHA ABS 1.2]
  class ABSObject_PopUp {
    constructor(text, color, iconIndex, fontSettings) {
      this._text = text || null;
      this._color = color;
      this._iconIndex = iconIndex || null;
      this._fontSettings = fontSettings || ABSObject_PopUp.FONT_DEFAULT();
      this._effectType = ABSObject_PopUp.EFFECT_DEFAULT;
      this._sprite = null;
    }

    clone() {
      var tempObj = new ABSObject_PopUp(this._text, this._color, this._iconIndex, this._fontSettings.clone());
      tempObj.setEffectSettings(this._effectType);
      return tempObj;
    }

    getText() {
      return this._text;
    }

    getFontSettings() {
      return this._fontSettings;
    }

    setX(x) {
      this.x = x;
      this._sprite.x = x;
    }

    setY(y) {
      this.y = y;
      this._sprite.y = y;
    }

    setNumered() //This is number value in this PopUp
    {
      this._numered = true;
    }

    isNumered() {
      return (this._numered === true);
    }

    hasIcon() {
      return (this._iconIndex != null);
    }

    setExtraText(text) {
      this._text = (text + " " + this._text);
    }

    setEffectSettings(settings) {
      this._effectType = settings;
    }

    setup(x, y, width, layer) {
      this._layer = layer;
      this._width = width;
      this.x = x;
      this.y = y;
      this._refresh();
    }

    dispose() {
      if (!this._sprite) return;
      this._sprite.bitmap.clear();
      this._layer.removeChild(this._sprite);
      this._sprite = null;
    }

    update() {
      if (this._sprite != null) {
        this._update_zoom();
        this._sprite.update();
      }
    }

    //TODO: Это тоже надо с параметров
    static FONT_DEFAULT() {
      return ['Skratch Punk', 22, false, 3, Color.BLACK]; //FontFace, size, itallic, outline width, outline color
    }

    //PRIVATE
    _refresh() {
      var h = 72;
      var bitmap = new Bitmap(this._width, h);
      bitmap.addLoadListener(function () {
        if (this._fontSettings[0] != null)
          bitmap.fontFace = this._fontSettings[0];
        bitmap.fontSize = this._fontSettings[1];
        bitmap.fontItalic = this._fontSettings[2];
        if (this._color) {
          bitmap.textColor = this._color.CSS;
        } else
          bitmap.textColor = Color.WHITE.CSS;


        var dx = 0;
        var dw = 0;
        var tw = (this._text != null) ? bitmap.measureTextWidth(this._text) : 0;

        while (tw > this._width) {
          bitmap.fontSize = bitmap.fontSize - 4;
          tw = bitmap.measureTextWidth(this._text);
        }

        if (this._iconIndex) {
          dx += 24;
          dw += 24;
          bitmap.drawIcon((dx + ((this._width - tw) / 2) - 36), (h - 24) / 2, this._iconIndex, 24);
        }

        if (this._text) {
          bitmap.outlineWidth = this._fontSettings[3] || 0;
          if (this._fontSettings[4])
            bitmap.outlineColor = this._fontSettings[4].CSS;
          bitmap.outlineColor = Color.BLACK.CSS;
          bitmap.fontSize = this._fontSettings[1]
          bitmap.drawText(this._text, dx + 2, 0, this._width - dw, h, 'center');
        }
      }.bind(this));

      this._sprite = new Sprite(bitmap);
      this._sprite.x = this.x;
      this._sprite.y = this.y;
      this._sprite.scale.x = this._effectType[0];
      this._sprite.scale.y = this._effectType[0];

      this._layer.addChild(this._sprite);
    }

    _update_zoom() {
      if (this._effectType[1]) {
        this._sprite.scale.x = Math.max(this._sprite.scale.x - 0.075, 1.0);
        this._sprite.scale.y = this._sprite.scale.x;
      }
      this._sprite.opacity = Math.max(this._sprite.opacity - 2, 0);
      if (this._sprite.opacity == 0) {
        this._layer.removeChild(this._sprite);
        this._sprite = null;
      }
    }
  }

  SDK.setConstantToObject(ABSObject_PopUp, 'EFFECT_DEFAULT', [1.5, true, 0]); //zoom, isUpdateZoom, +toTextSize
  //END ABSObject_PopUp
  //------------------------------------------------------------------------------

  KD_ATBS.register(ABSObject_PopUp);
})();
// ■ END UI_PopUpObject.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_RechargeBar.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Color, SDK, UI_RechargeBar;
  SDK = KDCore.SDK;
  Color = KDCore.Color;
  //?[HEAVY UPDATE]
  UI_RechargeBar = class UI_RechargeBar extends Sprite {
    constructor(itemsCount = 4, battler = null) {
      super(new Bitmap(30, itemsCount * 27));
      this.battler = battler;
      this._itemsCount = itemsCount;
      this._createForegroundsForItems();
      this.refresh();
    }

    _createForegroundsForItems() {
      this._foregroundsSprites = [];
      SDK.times(this._itemsCount, (function(index) {
        this._createNewForeItem(index);
      }).bind(this));
    }

    _createNewForeItem(index) {
      var sprite;
      sprite = new Sprite(new Bitmap(24, 24));
      sprite.move(0, this._getMyPosition(index));
      sprite.opacity = 100;
      this.addChild(sprite);
      this._foregroundsSprites.push(sprite);
    }

    _getMyPosition(index) {
      return index * 27;
    }

    refresh() {
      if (this.battler == null) {
        return;
      }
      this._clearForegroundItems();
      this.bitmap.clear();
      this._collectSkills();
      this._drawSkills();
      return this._drawTimers();
    }

    _clearForegroundItems() {
      return this._foregroundsSprites.forEach(function(item) {
        return item.bitmap.clear();
      });
    }

    _collectSkills() {
      var item, key, skills;
      skills = this.battler.getRechargeSkills();
      this._icons = [];
      this._speeds = [];
      this._times = [];
      for (key in skills) {
        if (skills.hasOwnProperty(key)) {
          item = $dataSkills[key];
          this._icons.push(item.iconIndex);
          this._speeds.push(item.speed);
          this._times.push(skills[key].getValue());
        }
      }
    }

    _drawSkills() {
      return this._icons.forEach((function(item, index) {
        return this.bitmap.drawIcon(0, this._getMyPosition(index), item, 24);
      }).bind(this));
    }

    _drawTimers() {
      return this._times.forEach((function(item, index) {
        return this._drawTimeBar(index, this._calculateHeightInPercents(item, this._speeds[index]));
      }).bind(this));
    }

    _drawTimeBar(index, height) {
      var color, item;
      color = height < 16 ? (height < 8 ? Color.RED : Color.YELLOW) : Color.GREEN;
      item = this._foregroundsSprites[index];
      if (item != null) {
        return item.bitmap.fillRect(0, height, 24, 24 - height, color.CSS);
      }
    }

    _calculateHeightInPercents(current, maximum) {
      var c_inp;
      c_inp = (100 * current) / (maximum * 60);
      return Math.floor((24 * c_inp) / 100);
    }

    manualUpdate() {
      return this.refresh();
    }

    //?TEST
    test() {
      var t1, t2, t3, t4;
      console.log('Test RechargeBar');
      t1 = new Game_TimerABS(54);
      t1._value = 4;
      t2 = new Game_TimerABS(54);
      t2._value = 22;
      t3 = new Game_TimerABS(54);
      t3._value = 44;
      t4 = new Game_TimerABS(154);
      t4._value = KDCore.SDK.rand(0, 60);
      this.battler = {
        getRechargeSkills: function() {
          return {
            20: t1,
            21: t2,
            22: t3,
            23: t4
          };
        }
      };
      return this.refresh();
    }

  };
  KD_ATBS.register(UI_RechargeBar);
})();

// ■ END UI_RechargeBar.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_SelectCircle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Color, SDK, UI_Circle, UI_SelectCircle;
  UI_Circle = KDCore.LIBS.UI_Circle;
  Color = KDCore.Color;
  SDK = KDCore.SDK;
  UI_SelectCircle = (function() {
    //TODO: Цвета из параметров
    class UI_SelectCircle extends UI_Circle {
      constructor(segmentBitmap, isOpen = true, iconSize = 36) {
        super(segmentBitmap, iconSize);
        this._isOpen = isOpen;
        if (!this._isOpen) {
          this.opacity = 0;
        }
      }

      _initParameters() {
        UI_Circle.prototype._initParameters.call(this);
        this._clickedSegmentIndex = null;
        this._selectedSegmentIndex = null;
        this._isHelperVisible = false;
        this._isAnimated = false;
        this._clickTimer = new Game_TimerABS();
        this._newRadius = this._maxRadius();
        return this._disabledIndexes = [];
      }

      isOpen() {
        return this._isOpen === true;
      }

      isClicked() {
        return this._clickedSegmentIndex !== null;
      }

      isSelected() {
        return this._selectedSegmentIndex !== null;
      }

      isAnimated() {
        return this._isAnimated === true;
      }

      isHelpersVisible() {
        return this._isHelperVisible === true;
      }

      showHelpers() {
        return this._isHelperVisible = true;
      }

      hideHelpers() {
        return this._isHelperVisible = false;
      }

      select(index) {
        this.deselectAll();
        this._segments[index].setBlendColor(UI_SelectCircle.COLOR_SELECT.ARR);
        return this._selectedSegmentIndex = index;
      }

      deselectAll() {
        this._selectedSegmentIndex = null;
        return this._resetSegmentsColors();
      }

      _resetSegmentsColors() {
        var index, j, len, ref, results, segment;
        ref = this._segments;
        results = [];
        for (index = j = 0, len = ref.length; j < len; index = ++j) {
          segment = ref[index];
          if (!this._disabledIndexes.includes(index)) {
            results.push(this._resetSegmentColor(segment));
          }
        }
        return results;
      }

      _resetSegmentColor(segment) {
        return segment.setBlendColor(Color.NONE.ARR);
      }

      click(index) {
        this.deselectAll();
        this._clickTimer.start(UI_SelectCircle.CLICK_TIME);
        this._clickedSegmentIndex = index;
        return this._segments[index].setBlendColor(UI_SelectCircle.COLOR_CLICK.ARR);
      }

      update() {
        UI_Circle.prototype.update.call(this);
        if (this.isClicked()) {
          this._updateClick();
        }
        this._updateHelpers();
        return this._updateAnimation();
      }

      _updateClick() {
        this._clickTimer.update();
        if (this._clickTimer.isReady()) {
          this._resetSegmentsColors();
          return this._clickedSegmentIndex = null;
        }
      }

      _updateHelpers() {
        if (!this.isAnimated() && this.isOpen() && this.isHelpersVisible()) {
          return this._showHelpers();
        } else {
          return this._hideHelpers();
        }
      }

      _hideHelpers() {
        return this._helpers.forEach(function(item) {
          return item.visible = false;
        });
      }

      _showHelpers() {
        return this._helpers.forEach(function(item) {
          return item.visible = true;
        });
      }

      _updateAnimation() {
        if (!this.isAnimated()) {
          return;
        }
        this._moveSegments(this._newRadius);
        if (this.isOpen()) {
          return this._closeCircle();
        } else {
          return this._openCircle();
        }
      }

      _closeCircle() {
        var minRadius;
        minRadius = this._minRadius();
        if (this.opacity > 30) {
          this.opacity -= 30;
        }
        if (this._newRadius > minRadius) {
          this._newRadius -= 2;
        }
        if (this._newRadius <= minRadius) {
          this._isOpen = false;
          this._isAnimated = false;
          return this.opacity = 0;
        }
      }

      _openCircle() {
        var maxRadius;
        maxRadius = this._maxRadius();
        if (this.opacity <= 225) {
          this.opacity += 30;
        }
        if (this._newRadius < maxRadius) {
          this._newRadius += 2;
        }
        if (this._newRadius >= maxRadius) {
          this._isOpen = true;
          this._isAnimated = false;
          return this.opacity = 255;
        }
      }

      hideAllSegments() {
        return SDK.times(4, (function(i) {
          this.hideSegment(i);
        }).bind(this));
      }

      hideSegment(index) {
        return this._segments[index].visible = false;
      }

      showAllSegments() {
        return SDK.times(4, (function(i) {
          this.showSegment(i);
        }).bind(this));
      }

      showSegment(index) {
        return this._segments[index].visible = true;
      }

      disableAllSegments() {
        return SDK.times(4, (function(i) {
          this.disableSegment(i);
        }).bind(this));
      }

      disableSegment(index) {
        this._segments[index].setBlendColor(UI_SelectCircle.COLOR_DISABLED.ARR);
        this._icons[index].setBlendColor(UI_SelectCircle.COLOR_DISABLED.ARR);
        return this._disabledIndexes.push(index);
      }

      enableAllSegments() {
        return SDK.times(4, (function(i) {
          this.enableSegment(i);
        }).bind(this));
      }

      enableSegment(index) {
        this._disabledIndexes.delete(index);
        this._resetSegmentColor(this._segments[index]);
        return this._resetIconColor(this._icons[index]);
      }

      _resetIconColor(icon) {
        return icon.setBlendColor(Color.NONE.ARR);
      }

      resetAllSegments() {
        this.showAllSegments();
        this.deselectAll();
        return this.enableAllSegments();
      }

      addClickListener(index, method) {
        return this._inputs[index].setClickHandler(method);
      }

      setIcons(iconsArray) {
        return iconsArray.forEach(this.setIcon.bind(this));
      }

      setIcon(icon, index) {
        return this._drawIcon(icon, index);
      }

      _drawIcon(icon, index) {
        if (icon === null) {
          this._icons[index].bitmap.clear();
        }
        if (icon instanceof Bitmap) {
          return this._icons[index].bitmap.drawOnMe(icon, 0, 0, this.iconSize, this.iconSize);
        } else {
          return this._icons[index].bitmap.drawIcon(0, 0, icon, this.iconSize);
        }
      }

      setHelpers(textArray) {
        return textArray.forEach(this.setHelper.bind(this));
      }

      setHelper(text, index) {
        return this._drawHelperText(text, index);
      }

      _drawHelperText(text, index) {
        var helper;
        helper = this._helpers[index].bitmap;
        helper.clear();
        return helper.drawText(text, 0, 0, helper.width, helper.height, 'center');
      }

      open() {
        if (this.isOpen()) {
          return;
        }
        return this._changeOpenClose(0, this._minRadius());
      }

      _changeOpenClose(beginOpacity, newRadius) {
        if (this.isAnimated()) {
          return;
        }
        this._newRadius = newRadius;
        return this._isAnimated = true;
      }

      close() {
        if (!this.isOpen()) {
          return;
        }
        return this._changeOpenClose(255, this._maxRadius());
      }

      _setOpacity(opacity) {
        var icon, j, len, ref, results;
        this.opacity = opacity;
        ref = this._icons;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          icon = ref[j];
          results.push(icon.opacity = opacity);
        }
        return results;
      }

    };

    UI_SelectCircle.COLOR_CLICK = new Color(98, 225, 236, 220);

    UI_SelectCircle.COLOR_SELECT = new Color(164, 255, 164, 220);

    UI_SelectCircle.COLOR_DISABLED = new Color(89, 89, 89, 120);

    UI_SelectCircle.CLICK_TIME = 5;

    return UI_SelectCircle;

  }).call(this);
  KD_ATBS.register(UI_SelectCircle);
})();

// ■ END UI_SelectCircle.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_SkillReadyBar.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var UI_SkillReadyBar;
  UI_SkillReadyBar = class UI_SkillReadyBar extends Sprite {
    constructor(width, height = 24, battler = null) {
      super(new Bitmap(width, height));
      this.battler = battler;
      this._inWaitActionState = false;
      this.refresh();
    }

    refresh() {
      if (this.battler == null) {
        return;
      }
      if (this.battler.isReadyForAction()) {
        return this._drawSkills();
      } else {
        return this._drawWaitState();
      }
    }

    _drawSkills() {
      var skills;
      this.bitmap.clear();
      this._inWaitActionState = false;
      skills = this.battler.getBattleSkills().filter((function(skill) {
        return this.battler.canUse(skill);
      }).bind(this));
      skills.forEach((function(skill, index) {
        return this.bitmap.drawIcon(24 * index, 0, skill.iconIndex, 24);
      }).bind(this));
    }

    _drawWaitState() {
      if (this._inWaitActionState === true) {
        return;
      }
      this.bitmap.clear();
      this.bitmap.fontFace = KD_ATBS.SYSTEM.FONT;
      this.bitmap.drawText(KD_ATBS.SYSTEM.STRING_WAIT_TURN, 4, 0, this.bitmap.width - 8, this.bitmap.height - 4, 'center');
      return this._inWaitActionState = true;
    }

    manualUpdate() {
      return this.refresh();
    }

    //?TEST
    testWaitState() {
      this.battler = {
        isReadyForAction: function() {
          return false;
        }
      };
      return this.refresh();
    }

    
    //?TEST
    testSkills(count) {
      var sk1, sk2, sk3, sk4;
      console.log('Test skills for ' + count);
      sk1 = KDCore.SDK.rand(4, 25);
      sk2 = KDCore.SDK.rand(4, 25);
      sk3 = KDCore.SDK.rand(4, 25);
      sk4 = KDCore.SDK.rand(4, 25);
      this.battler = {
        isReadyForAction: function() {
          return true;
        },
        getBattleSkills: function() {
          return [
            {
              iconIndex: sk1,
              index: 0,
              count: count
            },
            {
              iconIndex: sk2,
              index: 1,
              count: count
            },
            {
              iconIndex: sk3,
              index: 2,
              count: count
            },
            {
              iconIndex: sk4,
              index: 3,
              count: count
            }
          ];
        },
        canUse: function(skill) {
          return skill.index < skill.count;
        }
      };
      return this.refresh();
    }

  };
  KD_ATBS.register(UI_SkillReadyBar);
})();

// ■ END UI_SkillReadyBar.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UI_StatusBar.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var UI_StatusBar;
  //?[HEAVY UPDATE]
  UI_StatusBar = class UI_StatusBar extends Sprite {
    constructor(height = 100, battler = null) {
      super(new Bitmap(80, height));
      this.battler = battler;
      this._limit = 0; //unlimited
      this._isDrawTimers = true;
      this.refresh();
    }

    refresh() {
      if (this.battler == null) {
        return;
      }
      this.bitmap.clear();
      this._drawAllIcons();
      if (this._isDrawTimers) {
        return this._drawAllTimers();
      }
    }

    _drawAllIcons() {
      var count, icons;
      icons = this.battler.allIcons();
      count = this._limit === 0 ? icons.length : this._limit;
      return icons.forEach((function(icon, index) {
        if (index < count) {
          return this.bitmap.drawIcon(0, this._getMyPosition(index), icon, 24);
        }
      }).bind(this));
    }

    _getMyPosition(index) {
      return this.bitmap.height - ((index + 1) * 26);
    }

    _drawAllTimers() {
      this._collectStates();
      this._drawTimersArray(this._stateTimers);
      this._collectBuffs();
      return this._drawTimersArray(this._buffTimers);
    }

    _collectStates() {
      var i, j, ref, state, states, statesTimes, time;
      states = this.battler.states();
      statesTimes = this.battler._stateTurns;
      this._statesCount = states.length;
      this._stateTimers = [];
      for (i = j = 0, ref = this._statesCount; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        state = states[i];
        if (state.autoRemovalTiming === 1) {
          this._stateTimers.push([i, ' :A']);
        } else {
          time = statesTimes[state.id];
          if (time > 0) {
            this._stateTimers.push([i, this._framesToTime(time)]);
          }
        }
      }
    }

    _framesToTime(frameCount) {
      var min, minm, secs, secx, string;
      secs = Math.floor((frameCount + 60) / 60);
      string = '';
      if (secs > 59) {
        min = Math.floor(secs / 60);
        minm = min < 10 ? '0' + min : min;
        secx = secs - (min * 60);
        secx = secx < 10 ? '0' + secx : secx;
        return string = min + ':' + secx;
      } else {
        return string = '0:' + (secs < 10 ? '0' + secs : secs);
      }
    }

    _drawTimersArray(array) {
      var count;
      count = this._limit === 0 ? array.length : this._limit;
      return array.forEach((function(item, index) {
        if (index < count) {
          return this._drawTime(item[0], item[1]);
        }
      }).bind(this));
    }

    _drawTime(index, timeValue) {
      this.bitmap.fontFace = KD_ATBS.SYSTEM.FONT;
      return this.bitmap.drawText(timeValue, 28, this._getMyPosition(index), 44, 24, 'center');
    }

    _collectBuffs() {
      var buffs, buffsTimes, i, index, j, ref, time;
      buffs = this.battler._buffs;
      buffsTimes = this.battler._buffTurns;
      this._buffTimers = [];
      index = 0;
      for (i = j = 0, ref = buffs.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        time = buffsTimes[i];
        if (time) {
          this._buffTimers.push([index++ + this._statesCount, this._framesToTime(time)]);
        }
      }
    }

    setLimit(limit) {
      return this._limit = limit;
    }

    setNoDrawTimersMode() {
      return this._isDrawTimers = false;
    }

    manualUpdate() {
      return this.refresh();
    }

    //?TEST
    test() {
      console.log('Test status bar');
      this.battler = {
        allIcons: function() {
          return [KDCore.SDK.rand(4, 25), KDCore.SDK.rand(4, 25), KDCore.SDK.rand(4, 25), KDCore.SDK.rand(4, 25), KDCore.SDK.rand(4, 25)];
        },
        states: function() {
          return [
            {
              id: 3,
              autoRemovalTiming: 0
            },
            {
              id: 4,
              autoRemovalTiming: 1
            }
          ];
        },
        _stateTurns: {
          3: KDCore.SDK.rand(60, 600)
        },
        _buffs: [1, 2, 3],
        _buffTurns: [KDCore.SDK.rand(1, 60), KDCore.SDK.rand(1, 60), KDCore.SDK.rand(1, 60)]
      };
      return this.refresh();
    }

    test2() {
      console.log('Test status bar');
      this.battler = {
        allIcons: function() {
          return [KDCore.SDK.rand(4, 25)];
        },
        states: function() {
          return [
            {
              id: 3,
              autoRemovalTiming: 0
            }
          ];
        },
        _stateTurns: {
          3: KDCore.SDK.rand(60, 600)
        },
        _buffs: [],
        _buffTurns: []
      };
      return this.refresh();
    }

  };
  KD_ATBS.register(UI_StatusBar);
})();

// ■ END UI_StatusBar.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ItemList.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
var _alias_Window_ItemList_initialize = Window_ItemList.prototype.initialize;
Window_ItemList.prototype.initialize = function (x, y, width, height) {
    _alias_Window_ItemList_initialize.call(this, x, y, width, height);
    this._atbsSelector = new KD_ATBS.LIBS.UI_MenuItemSelector(this);
    this._atbsSelector._getATBSItems = this._getATBSItems.bind(this);
    this._atbsSelector._addATBSItemToCircle = this._addATBSItemToCircle.bind(this);
    this._atbsSelector.isSelectorButtionVisible = this.isSelectorButtionVisible.bind(this);
};


Window_ItemList.prototype._getATBSItems = function () {
    return $gameParty.getBattleItems();
};

Window_ItemList.prototype._addATBSItemToCircle = function (item, index) {
    $gameParty.addBattleItem(item, index);
    this.refresh();
};


Window_ItemList.prototype.processCancel = function () {
    if (Input.isGamepad() == false) {
        Window_Selectable.prototype.processCancel.call(this);
        return;
    }
    if (this.isSelectorVisible() == false) {
        Window_Selectable.prototype.processCancel.call(this);
    }
};

//?[NEW]
Window_ItemList.prototype.isSelectorVisible = function () {
   if (this._atbsSelector) {
       return this._atbsSelector.isOpened();
   }
   return false;
};

//@[ALIAS]
var _alias_Window_ItemList_isCurrentItemE = Window_ItemList.prototype.isCurrentItemEnabled;
Window_ItemList.prototype.isCurrentItemEnabled = function () {
    if (Input.isGamepad() == false) {
        return _alias_Window_ItemList_isCurrentItemE.call(this);
    }
    if (this.isSelectorVisible()) {
        return false;
    } else
        return _alias_Window_ItemList_isCurrentItemE.call(this);
};

//?[NEW]
Window_ItemList.prototype.isSelectorButtionVisible = function () {
    return this._category == 'item';
};

var _alias_Window_ItemList_activate = Window_ItemList.prototype.activate;
Window_ItemList.prototype.activate = function () {
    _alias_Window_ItemList_activate.call(this);
    if (this._atbsSelector) {
        this._atbsSelector.activate();
    }
};

var _alias_Window_ItemList_deactivate = Window_ItemList.prototype.deactivate;
Window_ItemList.prototype.deactivate = function () {
    _alias_Window_ItemList_deactivate.call(this, arguments);
    if (this._atbsSelector)
        this._atbsSelector.deactivate();
};

var _alias_Window_ItemList_refresh = Window_ItemList.prototype.refresh;
Window_ItemList.prototype.refresh = function () {
    _alias_Window_ItemList_refresh.call(this, arguments);
    if (this._atbsSelector)
        this._atbsSelector.refresh();
};

var _alias_Window_ItemList_select = Window_ItemList.prototype.select;
Window_ItemList.prototype.select = function (index) {
    _alias_Window_ItemList_select.call(this, index);
    if (this._atbsSelector)
        this._atbsSelector.select(index);
};


var _alias_Window_ItemList_update = Window_ItemList.prototype.update;
Window_ItemList.prototype.update = function () {
    _alias_Window_ItemList_update.call(this);
    if (this._atbsSelector)
        this._atbsSelector.update();
};

var _alias_Window_ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
Window_ItemList.prototype.drawItemNumber = function (item, x, y, width) {
    _alias_Window_ItemList_drawItemNumber.call(this, item, x, y, width);
    if (item != null && this._atbsSelector)
        this._atbsSelector.drawATBSInputSymbol(item, x, y, width);
};
// ■ END Window_ItemList.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_SkillList.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
var _alias_Window_SkillList_initialize = Window_SkillList.prototype.initialize;
Window_SkillList.prototype.initialize = function (x, y, width, height) {
    _alias_Window_SkillList_initialize.call(this, x, y, width, height);
    this._atbsSelector = new KD_ATBS.LIBS.UI_MenuItemSelector(this);
    this._atbsSelector._getATBSItems = this._getATBSItems.bind(this);
    this._atbsSelector._addATBSItemToCircle = this._addATBSItemToCircle.bind(this);
};

Window_SkillList.prototype._getATBSItems = function () {
    if (this._actor)
        return this._actor.getBattleSkills();
    else
        return [null, null, null, null];
};

Window_SkillList.prototype._addATBSItemToCircle = function (item, index) {
    if (this._actor) {
        try {
            this._actor.addBattleSkill(item, index);
            this.refresh();
        } catch (e) {
            console.error(e);
        }
    }
};

Window_SkillList.prototype.processCancel = function () {
    if (Input.isGamepad() == false) {
        Window_Selectable.prototype.processCancel.call(this);
        return;
    }
    if (this.isSelectorVisible() == false) {
        Window_Selectable.prototype.processCancel.call(this);
    }
};

//?[NEW]
Window_SkillList.prototype.isSelectorVisible = function () {
    if (this._atbsSelector) {
        return this._atbsSelector.isOpened();
    }
    return false;
};

//@[ALIAS]
var _alias_Window_SkillList_isCurrentItemEnabled = Window_SkillList.prototype.isCurrentItemEnabled;
Window_SkillList.prototype.isCurrentItemEnabled = function () {
    if (Input.isGamepad() == false) {
        return _alias_Window_SkillList_isCurrentItemEnabled.call(this);
    }
    if (this.isSelectorVisible()) {
        return false;
    } else
        return _alias_Window_SkillList_isCurrentItemEnabled.call(this);
};

var _alias_Window_SkillList_activate = Window_SkillList.prototype.activate;
Window_SkillList.prototype.activate = function () {
    _alias_Window_SkillList_activate.call(this);
    if (this._atbsSelector) {
        this._atbsSelector.activate();
    }
};

var _alias_Window_SkillList_deactivate = Window_SkillList.prototype.deactivate;
Window_SkillList.prototype.deactivate = function () {
    _alias_Window_SkillList_deactivate.call(this, arguments);
    if (this._atbsSelector)
        this._atbsSelector.deactivate();
};

var _alias_Window_SkillList_refresh = Window_SkillList.prototype.refresh;
Window_SkillList.prototype.refresh = function () {
    _alias_Window_SkillList_refresh.call(this, arguments);
    if (this._atbsSelector)
        this._atbsSelector.refresh();
};

var _alias_Window_SkillList_select = Window_SkillList.prototype.select;
Window_SkillList.prototype.select = function (index) {
    _alias_Window_SkillList_select.call(this, index);
    if (this._atbsSelector)
        this._atbsSelector.select(index);
};


var _alias_Window_SkillList_update = Window_SkillList.prototype.update;
Window_SkillList.prototype.update = function () {
    _alias_Window_SkillList_update.call(this);
    if (this._atbsSelector)
        this._atbsSelector.update();
};

var _alias_Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function (skill, x, y, width) {
    _alias_Window_SkillList_drawSkillCost.call(this, skill, x, y ,width);
    if (skill != null && this._atbsSelector)
        this._atbsSelector.drawATBSInputSymbol(skill, x, y, width);
};
// ■ END Window_SkillList.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PopInfoManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

  "use strict";

  var ABSObject_PopUp = KD_ATBS.LIBS.ABSObject_PopUp;
  var ABSObject_PopUpMachine = KD_ATBS.LIBS.ABSObject_PopUpMachine;
  var Color = KDCore.Color;

  //PopInfoManagerABS
  //------------------------------------------------------------------------------
  //?[FROM ALPHA ABS 1.2]
  function PopInfoManagerABS() {
    throw new Error('This is a static class');
  }

  PopInfoManagerABS.makeDamagePopUp = function (user) {
    var result = user.result();
    var value;

    if (result.hpDamage != 0) {
      value = PopInfoManagerABS.HP(result.hpDamage, result.critical);
      this._apply_pop_up(user, value);
    }

    if (result.mpDamage != 0) {
      value = PopInfoManagerABS.MP(result.mpDamage, result.critical);
      this._apply_pop_up(user, value);
    }

    if (result.tpDamage != 0) {
      value = PopInfoManagerABS.TP(result.tpDamage, result.critical);
      this._apply_pop_up(user, value);
    }
  };

  PopInfoManagerABS.makeZeroDamagePopUp = function (user) {
    var result = user.result();
    var value = PopInfoManagerABS.HP(0, result.critical);
    this._apply_pop_up(user, value);
  };

  PopInfoManagerABS.makeDrainPopUp = function (user) { //user - who get drained HP
    var result = user.result();
    var value;
    if (result.hpDamage != 0) {
      value = PopInfoManagerABS.HP(result.hpDamage, result.critical);
      value.getFontSettings()[2] = true;
      this._apply_pop_up(user, value);
    }

    if (result.mpDamage != 0) {
      value = PopInfoManagerABS.MP(result.mpDamage, result.critical);
      value.getFontSettings()[2] = true;
      this._apply_pop_up(user, value);
    }
  };

  PopInfoManagerABS.makeStatePopUp = function (user, stateId, isErase) {
    var state = $dataStates[stateId];
    if (state.iconIndex == 0)
      return;
    if (state.id == user.deathStateId())
      return;
    var value = PopInfoManagerABS.STATE((user.isEnemy() ? "" : state.name), state.iconIndex, isErase);
    this._apply_pop_up(user, value);
  };

  PopInfoManagerABS.makeItemPopUp = function (user) {
    var result = user.result();
    if (!user.isAlive()) return;
    if (result.missed) {
      this._apply_pop_up(user, PopInfoManagerABS.TEXT(KD_ATBS.SYSTEM.STRING_POPUP_MISS));
      return;
    }

    if (result.evaded) {
      this._apply_pop_up(user, PopInfoManagerABS.TEXT(KD_ATBS.SYSTEM.STRING_POPUP_EVADE));
      return;
    }

    if (result.isHit() && !result.success) {
      this._apply_pop_up(user, PopInfoManagerABS.TEXT(KD_ATBS.SYSTEM.STRING_POPUP_FAIL));
      return;
    }
  };

  PopInfoManagerABS.makeBuffPopUp = function (user, paramId, isPositive) {
    if (!BattleManagerATBS.isBattle()) return;
    if (!user.isAlive()) return;
    var paramName = user.isEnemy() ? "" : TextManager.param(paramId);
    var temp = isPositive ? 1 : -1;
    var iconIndex = user.buffIconIndex(temp, paramId);
    var value = PopInfoManagerABS.BUFF(paramName, iconIndex, isPositive);
    if (!user.getInfoPops().include(value)) {
      this._apply_pop_up(user, value);
    }
  };

  PopInfoManagerABS.makeSkillRechargePopUp = function (user, skillId) {
    if (!BattleManagerATBS.isBattle()) return;
    if (!user.isAlive()) return;
    if (user.isEnemy()) return;
    var skill = $dataSkills[skillId];
    var value = PopInfoManagerABS.SKILL(skill.name, skill.iconIndex);
    if (!user.getInfoPops().include(value)) {
      this._apply_pop_up(user, value);
    }
  };

  PopInfoManagerABS.calcRate = function (rate) {
    this.text = "";
  };

  //STATIC
  PopInfoManagerABS.HP = function (value, critical) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    var color = Color.YELLOW;
    if (value < 0) {
      color = Color.GREEN;
      value = Math.abs(value);
    } else if (critical) {
      color = Color.RED;
      fontSettings[1] = 34;
    }

    var x = new ABSObject_PopUp(value, color, null, fontSettings);
    x.setNumered();
    return x;
  };

  PopInfoManagerABS.TP = function (value, critical) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    var color = Color.ORANGE;
    if (value < 0) {
      color = Color.GREEN;
      value = Math.abs(value);
    } else if (critical) {
      color = Color.RED;
      fontSettings[1] = 34;
    }

    value = value + " " + TextManager.tpA;
    var x = new ABSObject_PopUp(value, color, null, fontSettings);
    x.setNumered();
    return x;
  };

  PopInfoManagerABS.MP = function (value, critical) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    var color = Color.MAGENTA;
    if (value < 0) {
      color = Color.BLUE;
      value = Math.abs(value);
    } else if (critical) {
      color = Color.MAGENTA;
      fontSettings[1] = fontSettings[1] + 4;
    }

    var x = new ABSObject_PopUp(value, color, null, fontSettings);
    x.setNumered();
    return x;
  };

  PopInfoManagerABS.STATE = function (name, iconIndex, isErase) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    fontSettings[2] = true;

    var temp = isErase ? "- " : "+ ";
    fontSettings[0] = KD_ATBS.SYSTEM.FONT;
    return new ABSObject_PopUp(temp + name, null, iconIndex, fontSettings);
  };

  PopInfoManagerABS.BUFF = function (name, iconIndex, isPositive) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    fontSettings[2] = true;

    var color = isPositive ? Color.GREEN : Color.RED;
    fontSettings[0] = KD_ATBS.SYSTEM.FONT;
    return new ABSObject_PopUp(name, color, iconIndex, fontSettings);
  };

  PopInfoManagerABS.TEXT = function (text) {
    return new ABSObject_PopUp(text);
  };

  PopInfoManagerABS.TEXT_WITH_COLOR = function (text, color) {
    return new ABSObject_PopUp(text, color);
  };

  PopInfoManagerABS.SKILL = function (name, iconIndex) {
    var fontSettings = ABSObject_PopUp.FONT_DEFAULT();
    fontSettings[2] = true;
    fontSettings[1] = fontSettings[1] - 8;
    return new ABSObject_PopUp(KD_ATBS.SYSTEM.STRING_POPUP_SKILL, Color.GREEN, iconIndex, fontSettings);
  };

  //PRIVATE
  PopInfoManagerABS._apply_pop_up = function (user, value) {
    user.addInfoPop(value);
  };

  //END PopInfoManagerABS
  //------------------------------------------------------------------------------

  KD_ATBS.register(PopInfoManagerABS);

})();
// ■ END PopInfoManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

//==========================================================================================================================================================
// KD ATBS MAIN
//==========================================================================================================================================================

var LOGW = new KDCore.DevLog('ATBS');
LOGW.applyWarningColors().on();

(function () {
    KD_ATBS.Versions['KD Core'] = KDCore.Version;

    var _alis_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _alis_DataManager_createGameObjects.call(this);
        LOGW.p("Inited v." + KD_ATBS.Version + " build " + KD_ATBS.Build + " on MV " + Utils.RPGMAKER_VERSION);
        KD_ATBS.Parameters = new ParametersManagerATBS();
        if (KD_ATBS.Parameters.isLoaded()) {
            KD_ATBS.LIBS.IKey.loadUserConfig();
            KD_ATBS.Parameters.loadAllStrings();
            KD_ATBS.Parameters.loadFont();
        } else {
            LOGW.p("Warning! Plugin settings not found, used default settings");
        }
        BattleManagerATBS.init();
    };
})();


//Plugin KD_ATBS automatic build by MVPluginBuilder 1.3 10.09.2018
