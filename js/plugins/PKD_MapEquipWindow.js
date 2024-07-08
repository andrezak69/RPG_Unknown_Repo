/*
 * Copyright (c) 2023 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 */

/*:
 * @plugindesc (v.1.0)[BASIC] Equipment Window on Map
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/equipment-window
 *
 * @help
 * ---------------------------------------------------------------------------
 * Plugin PKD_AlterEquipMenu is required!
 *      Download for free from: https://kdworkshop.net/plugins/equipment-menu/
 *
 * ===========================================================================
 * This plugin added alternative equipment menu layout to map scene.
 *
 * Check Plugin Parameters for configurate plugin
 *
 * Plugin have resources: img\pMapEquipWindow, you can edit them for your purposes
 * Plugin have data files: data\PKD_MapEquipWindow, you can edit them for your purposes
 *
 * ! Plugin works with notetags from PKD_AlterEquipMenu plugin !
 *
 * ---------------------------------------------------------------------------
 
 * This is BASIC plugin version and have some restrictions:
 *
 *    - No updates after version 1.0
 *    - Obfuscated code
 *    - Plugin usage allowed only in Non-Commercial project
 * 
 *  PRO version of plugin don't have this restrictions!
 
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty or Patreon!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all my Patrons!
 * 

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 *
 * 
 * @param PKD_MapEquipWindow
 * 
 *  @param pauseGame:bool
 *  @text Is Pause Game?
 *  @type boolean
 *  @on Pause
 *  @off No
 *  @default false
 *  @desc Is Pause Game when Equipment window is opened?
 * 
 *  @param openKey
 *  @text Open Key
 *  @desc Keyboard key for Open Equipment Window
 *  @default o
 * 
 *  @param posForSlotsA:structA
 *  @text Equip Window Pos (Index)
 *  @type struct<XY>[]
 *  @desc Equipments list pos. relative to slot. Index = Database: Types -> Equipment Types
 *  @default ["{\"x:int\":\"-248\",\"y:int\":\"190\"}","{\"x:int\":\"314\",\"y:int\":\"190\"}","{\"x:int\":\"-248\",\"y:int\":\"60\"}","{\"x:int\":\"-248\",\"y:int\":\"130\"}","{\"x:int\":\"314\",\"y:int\":\"60\"}"]
 * 
 *  @param posForSlotsB:structA
 *  @text Values Window Pos (Index)
 *  @type struct<XY>[]
 *  @desc Values (compare) window pos. relative to slot. Index = Database: Types -> Equipment Types
 *  @default []
 * 
 *  @param statsData:structA
 *  @text Stats to show
 *  @type struct<ExtraParam>[]
 *  @desc Parameters to show in values (status) and compare window
 *  @default ["{\"id\":\"MHP\",\"position:struct\":\"{\\\"x:int\\\":\\\"16\\\",\\\"y:int\\\":\\\"10\\\"}\",\"statIcon\":\"statIconFor_mhp\",\"extraText\":\"\"}","{\"id\":\"MMP\",\"position:struct\":\"{\\\"x:int\\\":\\\"170\\\",\\\"y:int\\\":\\\"10\\\"}\",\"statIcon\":\"statIconFor_mmp\",\"extraText\":\"\"}","{\"id\":\"ATK\",\"position:struct\":\"{\\\"x:int\\\":\\\"16\\\",\\\"y:int\\\":\\\"50\\\"}\",\"statIcon\":\"statIconFor_atk\",\"extraText\":\"\"}","{\"id\":\"DEF\",\"position:struct\":\"{\\\"x:int\\\":\\\"170\\\",\\\"y:int\\\":\\\"50\\\"}\",\"statIcon\":\"statIconFor_def\",\"extraText\":\"\"}","{\"id\":\"MAT\",\"position:struct\":\"{\\\"x:int\\\":\\\"16\\\",\\\"y:int\\\":\\\"90\\\"}\",\"statIcon\":\"statIconFor_mat\",\"extraText\":\"\"}","{\"id\":\"MDF\",\"position:struct\":\"{\\\"x:int\\\":\\\"170\\\",\\\"y:int\\\":\\\"90\\\"}\",\"statIcon\":\"statIconFor_mdf\",\"extraText\":\"\"}","{\"id\":\"AGI\",\"position:struct\":\"{\\\"x:int\\\":\\\"16\\\",\\\"y:int\\\":\\\"130\\\"}\",\"statIcon\":\"statIconFor_agi\",\"extraText\":\"\"}","{\"id\":\"LUK\",\"position:struct\":\"{\\\"x:int\\\":\\\"170\\\",\\\"y:int\\\":\\\"130\\\"}\",\"statIcon\":\"statIconFor_luk\",\"extraText\":\"\"}"]
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 */
/*:ru
 * @plugindesc (v.1.0)[BASIC] Окно экипировки на карте
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/equipment-window
 *
 * @help
 * ---------------------------------------------------------------------------
 * ! Требуется плагин PKD_AlterEquipMenu !
 *      Скачать (бесплатно) тут: https://kdworkshop.net/plugins/equipment-menu/
 *
 * ===========================================================================
 * Альтернативный экран экипировки (и статистики) героя прямо на карте
 *
 * Плагин имеет ресурсы: img\pMapEquipWindow (можно редактировать по надобности)
 * Файлы визуальной настройки: data\PKD_MapEquipWindow (можно редактировать по надобности)
 *
 * ! Поддерживает заметки (для вещей и персонажей) из плагина PKD_AlterEquipMenu !
 *
 * ---------------------------------------------------------------------------
 
 * Это [BASIC] (базовая) версия плагина и имеет некоторые ограничения:
 *
 *    - Нет новых обновлений после версии 1.0
 *    - Обфусцированный код
 *    - ЗАПРЕЩЕНО использовать плагин в коммерческих проектах
 * 
 *  [PRO] версия плагина не имеет данных ограничений!
 
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty:
 *      https://boosty.to/kagedesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *

 * Лицензия: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 *
 * 
 * @param PKD_MapEquipWindow
 * 
 *  @param pauseGame:bool
 *  @text Is Pause Game?
 *  @type boolean
 *  @on Pause
 *  @off No
 *  @default false
 *  @desc Ставить игру на паузу когда открыто окно экипировки?
 * 
 *  @param openKey
 *  @text Open Key
 *  @desc Кнопка (клавиатура) для открытия (закрыти) окна
 *  @default o
 * 
 *  @param posForSlotsA:structA
 *  @text Equip Window Pos (Index)
 *  @type struct<XY>[]
 *  @desc Позиция списка пред-тов относительно слота. Индекс = БД: Типы -> тип экипировки
 *  @default ["{\"x:int\":\"-248\",\"y:int\":\"190\"}","{\"x:int\":\"314\",\"y:int\":\"190\"}","{\"x:int\":\"-248\",\"y:int\":\"60\"}","{\"x:int\":\"-248\",\"y:int\":\"130\"}","{\"x:int\":\"314\",\"y:int\":\"60\"}"]
 * 
 *  @param posForSlotsB:structA
 *  @text Values Window Pos (Index)
 *  @type struct<XY>[]
 *  @desc Позиция окна сравнения от-но слота. Индекс = БД: Типы -> тип экипировки
 *  @default []
 * 
 *  @param statsData:structA
 *  @text Stats to show
 *  @type struct<ExtraParam>[]
 *  @desc Параметры для окна сравнения
 *  @default ["{\"id\":\"MHP\",\"position:struct\":\"{\\\"x:int\\\":\\\"16\\\",\\\"y:int\\\":\\\"10\\\"}\",\"statIcon\":\"statIconFor_mhp\",\"extraText\":\"\"}","{\"id\":\"MMP\",\"position:struct\":\"{\\\"x:int\\\":\\\"170\\\",\\\"y:int\\\":\\\"10\\\"}\",\"statIcon\":\"statIconFor_mmp\",\"extraText\":\"\"}","{\"id\":\"ATK\",\"position:struct\":\"{\\\"x:int\\\":\\\"16\\\",\\\"y:int\\\":\\\"50\\\"}\",\"statIcon\":\"statIconFor_atk\",\"extraText\":\"\"}","{\"id\":\"DEF\",\"position:struct\":\"{\\\"x:int\\\":\\\"170\\\",\\\"y:int\\\":\\\"50\\\"}\",\"statIcon\":\"statIconFor_def\",\"extraText\":\"\"}","{\"id\":\"MAT\",\"position:struct\":\"{\\\"x:int\\\":\\\"16\\\",\\\"y:int\\\":\\\"90\\\"}\",\"statIcon\":\"statIconFor_mat\",\"extraText\":\"\"}","{\"id\":\"MDF\",\"position:struct\":\"{\\\"x:int\\\":\\\"170\\\",\\\"y:int\\\":\\\"90\\\"}\",\"statIcon\":\"statIconFor_mdf\",\"extraText\":\"\"}","{\"id\":\"AGI\",\"position:struct\":\"{\\\"x:int\\\":\\\"16\\\",\\\"y:int\\\":\\\"130\\\"}\",\"statIcon\":\"statIconFor_agi\",\"extraText\":\"\"}","{\"id\":\"LUK\",\"position:struct\":\"{\\\"x:int\\\":\\\"170\\\",\\\"y:int\\\":\\\"130\\\"}\",\"statIcon\":\"statIconFor_luk\",\"extraText\":\"\"}"]
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 */
/*~struct~XY:

 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000
*/

/*~struct~ExtraParam:

 @param id
 @text Parameter
 @type select
 @option ATK
 @option DEF
 @option MAT
 @option MDF
 @option AGI
 @option LUK
 @option MHP
 @option MMP
 @option HIT
 @option EVA
 @option CRI
 @option CEV
 @option MEV
 @option MRF
 @option CNT
 @option HRG
 @option MRG
 @option TRG
 @option TGR
 @option GRD
 @option REC
 @option PHA
 @option MCR
 @option TCR
 @option PDR
 @option MDR
 @option FDR
 @option EXR
 @default MHP
 @desc One of default RPG Maker parameters

 @param position:struct
 @text Position
 @type struct<XY>
 @desc
 @default {"x:int":"0","y:int":"0"}

 @param statIcon
 @text Image
 @type file
 @required 1
 @dir img/pMapEquipWindow/
 @default statIconFor_mhp
 
 @param extraText
 @text Post Text
 @desc [Optional] Extra text after parameter value, for example %
 @default

*/


var Imported = Imported || {};
Imported.PKD_MapEquipWindow = true;

var PKD_MapEquipWindow = {};
PKD_MapEquipWindow.Version = 100;

//?VERSION
PKD_MapEquipWindow.isPro = function() { return false; };

PKD_MapEquipWindow.PP = {};
PKD_MapEquipWindow.Utils = {};

// * Загрзука параметров
PKD_MapEquipWindow.LoadPluginSettings = () => {
    PKD_MapEquipWindow.PP._loader = new KDCore.ParamLoader('PKD_MapEquipWindow');
};

//%[For Updates]
// Добавить Note, чтобы скрывать некоторые STATS для персонажа (класса)
// Улучшенная совместимость с Map Inventory: описание предмета, картинка вместо иконки, Rarity Item Name Color, перетаскивание из инвентаря в слот


/*
# ==========================================================================
# ==========================================================================
#
#   EMBEDDED PHEONIX KAGEDESU PLUGINS CORE LIBRARY
#   (This plugin may not use the entire code of this library)
#
# ==========================================================================
# ==========================================================================
 * 
 * 
 */



// Generated by CoffeeScript 2.6.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 07.08.23
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '3.2.8';

// * Методы и библиотеки данной версии
KDCore._loader = 'loader_' + KDCore._fileVersion;

KDCore[KDCore._loader] = [];

// * Добавить библиотеку на загрузку
KDCore.registerLibraryToLoad = function(lib) {
  return KDCore[KDCore._loader].push(lib);
};

if ((KDCore.Version != null) && KDCore.Version >= KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new or exists version');
  KDCore._requireLoadLibrary = false;
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  // * ТРЕБУЕТСЯ ЗАГРУЗКА БИБЛИОТЕК
  KDCore._requireLoadLibrary = true;
}


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
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
    return this[KDCore.SDK.rand(0, this.length - 1)];
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
      k = KDCore.SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  // * Ищет элемент, у которого поле ID == id
  Array.prototype.getById = function(id) {
    return this.getByField('id', id);
  };
  // * Ищет элемент, у которого поле FIELD (имя поля) == value
  Array.prototype.getByField = function(field, value) {
    var e;
    try {
      return this.find(function(item) {
        return item[field] === value;
      });
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
  Object.defineProperty(Array.prototype, "delete", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "max", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "min", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "sample", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "first", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "last", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "shuffle", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "count", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "isEmpty", {
    enumerable: false
  });
  Object.defineProperty(Array.prototype, "getById", {
    enumerable: false
  });
  return Object.defineProperty(Array.prototype, "getByField", {
    enumerable: false
  });
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Number.prototype.do = function(method) {
    return KDCore.SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  return Number.prototype.any = function(number) {
    return (number != null) && number > 0;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  String.prototype.toCss = function() {
    return KDCore.Color.FromHex(this).CSS;
  };
  String.prototype.toCSS = function() {
    return this.toCss();
  };
  String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim();
  };
  String.isNullOrEmpty = function(str) {
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
  return String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.isMV = function() {
    return Utils.RPGMAKER_NAME.contains("MV");
  };
  KDCore.isMZ = function() {
    return !KDCore.isMV();
  };
  KDCore.warning = function(msg, error) {
    if (msg != null) {
      console.warn(msg);
    }
    if (error != null) {
      console.warn(error);
    }
  };
  KDCore.makeid = function(length) {
    var characters, charactersLength, i, result;
    result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength = characters.length;
    i = 0;
    while (i < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      i++;
    }
    return result;
  };
  return KDCore.makeId = function() {
    return KDCore.makeid(...arguments);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var SDK;
  //?[DEPRECATED]
  // * SDK
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
  SDK.canvasToLocalX = function(layer, x) {
    while (layer) {
      x -= layer.x;
      layer = layer.parent;
    }
    return x;
  };
  SDK.canvasToLocalY = function(layer, y) {
    while (layer) {
      y -= layer.y;
      layer = layer.parent;
    }
    return y;
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  SDK.isString = function(value) {
    return typeof value === "string";
  };
  SDK.isArray = function(value) {
    return Array.isArray(value);
  };
  //@[EXTEND]
  return KDCore.SDK = SDK;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll_kdCore;
  //@[ALIAS]
  __alias_Bitmap_fillAll_kdCore = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll_kdCore.call(this, color);
    }
  };
  //@[ALIAS]
  __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
  Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (this._needModBltDWH > 0) {
      dh = dw = this._needModBltDWH;
      __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
      this._needModBltDWH = null;
    } else {
      __alias_Bitmap_blt_kdCore.call(this, ...arguments);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32, noSmoth = false) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = KDCore.BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    this._context.imageSmoothingEnabled = !noSmoth;
    this.drawOnMe(bitmap, x, y, size, size);
    this._context.imageSmoothingEnabled = true;
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
  Bitmap.prototype.drawInMe = function(bitmap) {
    return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
  };
  return Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
});


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  // * Нахожусь ли Я в точке по диагонале (рядом), относительно char
  _.kdInDiagonalPointRelativeTo = function(char) {
    var e, x, y;
    try {
      if (char == null) {
        return false;
      }
      ({x, y} = char);
      if (x === this.x - 1 && ((y === this.y - 1) || (y === this.y + 1))) {
        return true; // * left up or down
      }
      if (x === this.x + 1 && (y === this.y - 1 || y === this.y + 1)) {
        return true; // * right up or down
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * В MZ нету данной функции, а она часто используется в моих плагинах
  if (!KDCore.isMZ()) {
    return;
  }
  //?[NEW] (from MV)
  return ImageManager.loadEmptyBitmap = function() {
    if (this._emptyBitmap != null) {
      return this._emptyBitmap;
    } else {
      return new Bitmap();
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var _input_onKeyDown, _input_onKeyUp, i, j, k, l;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = l = 97; l <= 122; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  
  //@[ALIAS]
  _input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    _input_onKeyDown.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode);
  };
  //@[ALIAS]
  _input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    _input_onKeyUp.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode, false);
  };
  //?NEW
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      return this._currentState[symbol] = state;
    }
  };
  //?NEW
  Input.isCancel = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  //?NEW
  return TouchInput.toPoint = function() {
    return new KDCore.Point(TouchInput.x, TouchInput.y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
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
  return PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] != null;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ___Sprite_alias_Move_KDCORE_2;
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
  Sprite.prototype.move = function(x, y) {
    if (x instanceof Array) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
    } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
    } else if ((x != null) && (x._x != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
    } else {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
    }
  };
  Sprite.prototype.isContainsPoint = function(point) {
    var rect, rx, ry;
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = this._getProperFullRect(rx, ry);
    return rect.contains(point.x, point.y);
  };
  // * Возвращает Rect с учётом Scale и Anchor спрайта
  Sprite.prototype._getProperFullRect = function(rx, ry) {
    var height, width, x, y;
    width = this.width * Math.abs(this.scale.x);
    height = this.height * Math.abs(this.scale.y);
    x = rx - this.anchor.x * width;
    y = ry - this.anchor.y * height;
    if (this.anchor.x === 0 && this.scale.x < 0) {
      x += this.width * this.scale.x;
    }
    if (this.anchor.y === 0 && this.scale.y < 0) {
      y += this.height * this.scale.y;
    }
    return new PIXI.Rectangle(x, y, width, height);
  };
  Sprite.prototype.fillAll = function(color) {
    if (color != null) {
      return this.bitmap.fillAll(color);
    } else {
      return this.fillAll(KDCore.Color.WHITE);
    }
  };
  return Sprite.prototype.removeFromParent = function() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return TouchInput.toMapPoint = function() {
    return this.toPoint().convertToMap();
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.Utils = KDCore.Utils || {};
  return (function() {
    var _;
    _ = KDCore.Utils;
    _.getJDataById = function(id, source) {
      var d, j, len;
      for (j = 0, len = source.length; j < len; j++) {
        d = source[j];
        if (d.id === id) {
          return d;
        }
      }
      return null;
    };
    _.hasMeta = function(symbol, obj) {
      return (obj != null) && (obj.meta != null) && (obj.meta[symbol] != null);
    };
    _.getValueFromMeta = function(symbol, obj) {
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      return obj.meta[symbol];
    };
    _.getNumberFromMeta = function(symbol, obj) {
      var value;
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      if (obj.meta[symbol] === true) {
        return 0;
      } else {
        value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
      }
      return value;
    };
    _.isSceneMap = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Map;
      } catch (error) {
        return false;
      }
    };
    _.isMapScene = function() {
      return this.isSceneMap();
    };
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
    };
    _.isBattleScene = function() {
      return this.isSceneBattle();
    };
    _.getEventCommentValue = function(commentCode, list) {
      var comment, e, i, item;
      try {
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                return comment;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _.getEventCommentValueArray = function(commentCode, list) {
      var comment, comments, e, i, item;
      try {
        comments = [];
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                comments.push(comment);
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return comments;
    };
    _.getPositionPointFromJSON = function(jsonSettings) {
      return _.convertPositionPointFromJSON(jsonSettings.position);
    };
    _.convertPositionPointFromJSON = function(position) {
      var e, x, y;
      try {
        x = position[0];
        y = position[1];
        if (!KDCore.SDK.isInt(x)) {
          x = eval(x);
        }
        if (!KDCore.SDK.isInt(y)) {
          y = eval(y);
        }
        return new KDCore.Point(x, y);
      } catch (error) {
        e = error;
        console.warn('Utils.getPositionPointFromJSON', e);
        return KDCore.Point.Empty;
      }
    };
    _.jsonPos = function(jsonPosition) {
      return _.convertPositionPointFromJSON(jsonPosition);
    };
    _.jsonPosXY = function(jsonPosition) {
      var e, x, y;
      try {
        ({x, y} = jsonPosition);
        return new KDCore.Point(eval(x), eval(y));
      } catch (error) {
        e = error;
        console.warn('Utils.jsonPosXY', e);
        return KDCore.Point.Empty;
      }
    };
    _.getVar = function(id) {
      return $gameVariables.value(id);
    };
    _.setVar = function(id, value) {
      return $gameVariables.setValue(id, value);
    };
    _.addToVar = function(id, value) {
      var prevVal;
      prevVal = _.getVar(id);
      return _.setVar(id, prevVal + value);
    };
    _.playSE = function(seFileName, pitch = 100, volume = 100) {
      var sound;
      if (seFileName == null) {
        return;
      }
      if (seFileName === "") {
        return;
      }
      sound = {
        name: seFileName,
        pan: 0,
        pitch: pitch,
        volume: volume
      };
      AudioManager.playStaticSe(sound);
    };
    _.getItemTypeId = function(item) {
      if (DataManager.isWeapon(item)) {
        return 1;
      } else if (DataManager.isArmor(item)) {
        return 2;
      }
      return 0;
    };
    _.getItemByType = function(itemId, typeId) {
      var data, e;
      try {
        if ((typeId != null) && !isFinite(typeId) && KDCore.SDK.isString(typeId) && String.any(typeId)) {
          if (typeId[0] === "w") {
            typeId = 1;
          } else if (typeId[0] === "a") {
            typeId = 2;
          } else {
            typeId = 0;
          }
        }
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    _.loadFont = function(name) {
      if (typeof FontManager === "undefined" || FontManager === null) {
        return;
      }
      if (String.isNullOrEmpty(name)) {
        return;
      }
      if (FontManager._states[name] != null) {
        return;
      }
      FontManager.load(name, name + ".ttf");
    };
    _.convertTimeShort = function(seconds) {
      var e;
      try {
        if (seconds > 59) {
          return Math.floor(seconds / 60) + 'm';
        } else {
          return seconds;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return seconds;
      }
    };
    _.isPointInScreen = function(point, margin = 10) {
      var maxH, maxW, screenMargin, x, y;
      ({x, y} = point);
      maxW = Graphics.width;
      maxH = Graphics.height;
      // * Граница от краёв экрана
      screenMargin = margin;
      if (x < screenMargin) {
        return false;
      }
      if (y < screenMargin) {
        return false;
      }
      if (x > (maxW - screenMargin)) {
        return false;
      }
      if (y > (maxH - screenMargin)) {
        return false;
      }
      return true;
    };
    // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
    // * Пример использования loadImageAsync(a, b).then(метод)
    // в метод будет передан bitmap первым аргументом
    _.loadImageAsync = async function(folder, filename) {
      var promise;
      promise = new Promise(function(resolve, reject) {
        var b;
        b = ImageManager.loadBitmap("img/" + folder + "/", filename);
        return b.addLoadListener(function() {
          return resolve(b);
        });
      });
      return (await promise);
    };
    // * Преобразовать расширенное значение
    // * Значение может быть X -> X
    // * "X" -> X (цифра)
    // * "X,Y,Z,..." -> [X, Y, Z]
    // * "[X, Y, Z,...]" -> [X, Y, Z]
    // * "X|V" -> из переменной X
    // * [Y] -> случайное число из массива (рекурсивно)
    //@[2.8.1] since
    _.getEValue = function(value) {
      var e, items, randomValue, variableId;
      try {
        if (value == null) {
          return null;
        }
        if (KDCore.SDK.isString(value)) {
          if (isFinite(value)) { // * Число представленно строкой
            return Number(value);
          }
          // * Массив представлен строкой (может быть без квадратных скобок)
          if (value.contains(',') || (value.contains("[") && value.contains("]"))) {
            value = value.replace("[", "");
            value = value.replace("]", "");
            // * Преобразуем в число или строку (например если extended |V)
            items = value.split(",").map(function(item) {
              var itemT;
              itemT = item.trim();
              if (isFinite(itemT)) {
                return Number(itemT);
              } else {
                return itemT;
              }
            });
            // * Вызываем снова эту функцию, но уже с массивом
            return KDCore.Utils.getEValue(items);
          }
          if (value.contains("|V")) {
            variableId = parseInt(value);
            return $gameVariables.value(variableId);
          }
          return value; // * Просто значение в итоге
        } else if (KDCore.SDK.isArray(value)) {
          randomValue = value.sample();
          return KDCore.Utils.getEValue(randomValue);
        } else {
          return value;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return value;
      }
    };
    //@[2.8.2] since
    _.isChanceIsGood = function(chance) {
      var e;
      try {
        if (chance > 1) {
          chance /= 100;
        }
        return chance > Math.random();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[2.8.2] since
    //KEY:w:3:1:50 , KEY:i:10:2:1|V
    //OUTPUT: [GameItem, COUNT]
    _.parseItemFromConditionStr = function(conditionLine) {
      var amount, e, itemChance, itemId, parts, typeId;
      try {
        if (!conditionLine.contains(":")) {
          return null;
        }
        parts = conditionLine.split(":");
        typeId = parts[1];
        itemId = KDCore.Utils.getEValue(parts[2]);
        amount = KDCore.Utils.getEValue(parts[3]);
        if (amount <= 0) {
          return null;
        }
        try {
          itemChance = String.any(parts[4]) ? parts[4] : 100;
          itemChance = KDCore.Utils.getEValue(itemChance) / 100;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          itemChance = 0;
        }
        if (itemChance <= 0) {
          return null;
        }
        if (KDCore.Utils.isChanceIsGood(itemChance)) {
          return [KDCore.Utils.getItemByType(itemId, typeId), amount];
        } else {
          return null;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    //@[3.2.1] since
    _.isValidCE = function(commonEventId) {
      var e;
      try {
        return commonEventId > 0 && ($dataCommonEvents[commonEventId] != null);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[3.2.1] since
    _.startCE = function(commonEventId) {
      var e;
      try {
        if (this.isValidCE(commonEventId)) {
          return $gameTemp.reserveCommonEvent(commonEventId);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    _.checkSwitch = function(value) {
      if (value == null) {
        return false;
      }
      if (isFinite(value)) {
        return false;
      }
      return KDCore.SDK.checkSwitch(value);
    };
    //@[3.2.1] since
    // * Вызвать с задержкой в time миллисекунд
    // * Не забываем про bind
    _.callDelayed = function(method, time = 1) {
      var e;
      try {
        if (method == null) {
          return;
        }
        setTimeout((function() {
          var e;
          try {
            return method();
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        }), time);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    //<meta:1,2,3,4> -> [1,2,3,4]
    _.getArrayOfNumbersFromMeta = function(symbol, obj) {
      var e, values;
      try {
        values = this.getArrayOfValuesFromMeta(symbol, obj);
        return values.map(function(v) {
          return Number(v);
        });
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    //<meta:a,b,c> -> ["a", "b", "c"]
    //<meta:a> -> ["a"]
    _.getArrayOfValuesFromMeta = function(symbol, obj) {
      var e, items, values;
      try {
        values = this.getValueFromMeta(symbol, obj);
        if (String.any(values)) {
          if (values.contains(',')) {
            items = values.split(',');
            return items || [];
          } else {
            return [values];
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    // * Когда содержит одинаковый набор ключей
    //<meta:value1>
    //<meta:value2>
    //...
    // -> [value1,value2,...]
    _.getArrayOfValuesOfSameMeta = function(symbol, obj) {
      var e, j, len, line, lines, result;
      try {
        if (!this.hasMeta(symbol, obj)) {
          return [];
        }
        lines = obj.note.split("\n").filter(function(l) {
          return l.contains(symbol);
        });
        result = [];
        for (j = 0, len = lines.length; j < len; j++) {
          line = lines[j];
          try {
            line = line.replace("<" + symbol + ":", "");
            line = line.replace(">", "");
            result.push(line);
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }
        return result;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return [];
    };
    //@[3.2.7] since
    _.getIndexIn2DArrayByIJ = function(row, col, cols) {
      return row * cols + col;
    };
    //@[3.2.7] since
    // * row - строка
    // * col - столбец
    _.getIJByIndexIn2DArray = function(index, cols) {
      var col, e, row;
      try {
        row = Math.floor(index / cols);
        col = index % cols;
        return [row, col];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [0, 0];
      }
    };
    //@[3.2.7] since
    _.isSwitchIsTRUE = function(switchId) {
      var e;
      if (switchId == null) {
        return true;
      }
      if (switchId <= 0) {
        return true;
      }
      try {
        return $gameSwitches.value(switchId) === true;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return false;
    };
    //@[2.9.7] since
    // * Shrink number 100000 to "100k" and ect, returns STRING
    _.formatNumberToK = function(num) {
      var e;
      try {
        if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return num;
      }
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
    this.contents._needModBltDWH = finalSize;
    this.drawFace(faceName, faceIndex, x, y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    // * Input Extension: KDGamepad
    //------------------------------------------------------------------------------
    // * Поддержка расширенного управления через геймпад (свой модуль)
    var ALIAS___updateGamepadState, _;
    //@[DEFINES]
    _ = Input;
    // * Активировать работу модуля KDGamepad
    _.activateExtendedKDGamepad = function() {
      return _._kdIsGamepadExtended = true;
    };
    //@[ALIAS]
    ALIAS___updateGamepadState = _._updateGamepadState;
    _._updateGamepadState = function(gamepad) {
      if (Input._kdIsGamepadExtended === true) {
        KDGamepad.update();
      }
      if ((typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__kdgpStopDefaultGamepad : void 0) === true) {
        return;
      }
      // * Режим перемещения без DPad
      // * В оригинале игрок также ходит по DPad клавишам, что может быть не удобно
      // * например при работе с инвентарём
      if (KDGamepad.isNoDPadMoving()) {
        if (KDGamepad.isDPadAny()) {
          Input.clear();
          return;
        }
      }
      ALIAS___updateGamepadState.call(this, gamepad);
    };
    window.KDGamepad = function() {
      return new Error("This is static class");
    };
    window.addEventListener("gamepadconnected", function(event) {
      var e;
      try {
        return KDGamepad.refresh();
      } catch (error) {
        // * Можно напрямую
        //unless KDGamepad.isExists()
        //    if event.gamepad? and event.gamepad.mapping == 'standard'
        //        KDGamepad.init(event.gamepad)
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    window.addEventListener("gamepaddisconnected", function(event) {
      var e;
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        if ((event.gamepad != null) && event.gamepad === KDGamepad.gamepad) {
          return KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    KDGamepad.stopDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = true;
    };
    KDGamepad.resumeDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = null;
    };
    // * Ссылка на геймпад
    KDGamepad.gamepad = null;
    // * Подключён ли Gamepad ?
    KDGamepad.isExists = function() {
      return KDGamepad.gamepad != null;
    };
    // * Инициализация состояния кнопок
    // * Этот метод вызывается автоматически из Refresh или при подключении Gamepad
    KDGamepad.init = function(gamepad) {
      KDGamepad.gamepad = gamepad;
      this._isActive = true;
      this.buttonNames = [
        'A', // 0
        'B', // 1
        'X', // 2
        'Y', // 3
        'LB', // 4
        'RB', // 5
        'LTrigger', // 6
        'RTrigger', // 7
        'Back', // 8
        'Start', // 9
        'LStick', // 10
        'RStick', // 11
        'dUp', // 12
        'dDown', // 13
        'dLeft', // 14
        'dRight' // 15
      ];
      this.reset();
    };
    // * Аналог Input.clear
    KDGamepad.clear = function() {
      return KDGamepad.reset();
    };
    // * Сбросить состояние кнопок
    KDGamepad.reset = function() {
      this.leftStick = {
        x: 0,
        y: 0
      };
      this.rightStick = {
        x: 0,
        y: 0
      };
      this.buttons = {};
      this.buttonsPressed = {};
      this.prevButtons = {};
    };
    
    // * Остановить учёт геймпада
    KDGamepad.stop = function() {
      KDGamepad.reset();
      KDGamepad.gamepad = null;
    };
    // * Функция проверки что нажата кнопка на геймпаде
    KDGamepad._buttonPressed = function(gamepad, index) {
      var b, e;
      try {
        if (!gamepad || !gamepad.buttons || index >= gamepad.buttons.length) {
          return false;
        }
        b = gamepad.buttons[index];
        if (b == null) {
          return false;
        }
        if (typeof b === 'object') {
          // * Можно упростить
          return b.pressed;
        }
        return b === 1.0;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    // * Каждый кадр (обновление состояний)
    KDGamepad.update = function() {
      var e, gp, i, isDown, j, len, name, ref;
      if (!KDGamepad.isActive()) {
        return;
      }
      KDGamepad.refresh();
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        gp = KDGamepad.gamepad;
        ref = this.buttonNames;
        // * Проверка состояний кнопок
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          name = ref[i];
          this.buttons[name] = false;
          isDown = KDGamepad._buttonPressed(gp, i);
          if (isDown === true) {
            this.prevButtons[name] = true;
          } else {
            // * Срабатываение только при нажал - отпустил
            if (this.prevButtons[name] === true) {
              this.buttons[name] = true;
              this.prevButtons[name] = false;
            }
          }
        }
        // * Проверка стиков
        this.leftStick.x = gp.axes[0];
        this.leftStick.y = gp.axes[1];
        this.rightStick.x = gp.axes[2];
        this.rightStick.y = gp.axes[3];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Обновить и проверить состояние Gamepad
    // * Надо каждый раз это вызывать
    KDGamepad.refresh = function() {
      var e, gamepads, gp, i, isGamepadRefreshed, j, ref;
      try {
        isGamepadRefreshed = false;
        if (navigator.getGamepads) {
          gamepads = navigator.getGamepads();
        } else if (navigator.webkitGetGamepads) {
          gamepads = navigator.webkitGetGamepads();
        }
        if (gamepads != null) {
          for (i = j = 0, ref = gamepads.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            gp = gamepads[i];
            if ((gp != null) && gp.mapping === 'standard') {
              isGamepadRefreshed = true;
              if (KDGamepad.buttonNames != null) {
                KDGamepad.gamepad = gp;
              } else {
                KDGamepad.init(gp);
              }
              break;
            }
          }
        }
        if (!isGamepadRefreshed) {
          // * Если не был найден не один gamepad - отключаем систему
          KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Любое нажатие кнопки
    KDGamepad.isKeyAny = function(name) {
      return KDGamepad.isKey(name) || KDGamepad.isKeyPressed(name);
    };
    // * Нажата ли кнопка (trigger нажал - отпустил)
    KDGamepad.isKey = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.buttons[name] === true;
    };
    // * Нажата ли кнопка (continues зажата)
    KDGamepad.isKeyPressed = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.prevButtons[name] === true;
    };
    KDGamepad.isDPadAny = function() {
      return KDGamepad.isKeyAny("dLeft") || KDGamepad.isKeyAny("dRight") || KDGamepad.isKeyAny("dUp") || KDGamepad.isKeyAny("dDown");
    };
    KDGamepad.isActive = function() {
      return this._isActive === true;
    };
    // * Временно отключить обработку KDGamepad
    KDGamepad.setActive = function(_isActive) {
      this._isActive = _isActive;
      if (KDGamepad.isActive()) {
        KDGamepad.refresh();
      } else {
        KDGamepad.stop();
      }
    };
    // * Отключить перемещение игрока на DPad
    KDGamepad.setNoDPadMovingMode = function(_noDpadMoving) {
      this._noDpadMoving = _noDpadMoving;
    };
    return KDGamepad.isNoDPadMoving = function() {
      return this._noDpadMoving === true;
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var BitmapSrc;
  BitmapSrc = (function() {
    //?[DEPRECATED]
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          if (KDCore.isMV()) {
            pw = Window_Base._iconWidth;
            ph = Window_Base._iconHeight;
          } else {
            pw = ImageManager.iconWidth;
            ph = ImageManager.iconHeight;
          }
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
  //@[EXTEND]
  return KDCore.BitmapSrc = BitmapSrc;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Changer;
  // * Класс который может плавно изменять какой-либо параметр
  // * Работает в стиле chain методов

    // * ------------------ ПРИМЕР ----------------------------------

    // * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

    //@changer = new AA.Changer(someSprite)
  //@changer.change('opacity').from(255)
  //            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
  //            .start().done(() -> console.log('done'))
  //@changer.update()

    // * -------------------------------------------------------------
  Changer = class Changer {
    constructor(obj) {
      this.obj = obj;
      // * Количество кадров, в которые будет обновление
      this._field = null; // * название поля
      this._speed = 1; // * frames
      this._step = 1; // * шаг изменения значения
      this._from = 0; // * Начальное значение
      this._to = 0; // * Конечное значение
      this._thread = null;
      this._orienation = true; // * Направление + или - step (true = +)
      this._delay = 0; // * Задержка старта
      this._changer = null; // * Ссылка на следующий changer
      this._isRepeat = false; // * Надо ли поторить себя снова
      this._onDoneMethod = null; // * Метод будет выполнен в конце (при завершении)
      this._isPrepared = false; // * Элемента был подготовлен (установлено значение from)
    }

    start() {
      if (this._field == null) {
        return;
      }
      if (this._from === this._to) {
        return;
      }
      if (this._delay > 0) {
        this._delayThread = new KDCore.TimedUpdate(this._delay, this._startThread.bind(this));
        this._delayThread.once();
      } else {
        this._startThread();
      }
      return this;
    }

    isStarted() {
      return (this._thread != null) || (this._delayThread != null);
    }

    from(_from) {
      this._from = _from;
      return this;
    }

    to(_to) {
      this._to = _to;
      return this;
    }

    step(_step) {
      this._step = _step;
      return this;
    }

    speed(_speed) {
      this._speed = _speed;
      return this;
    }

    change(_field) {
      this._field = _field;
      return this;
    }

    // * Снова повторить (не совместим с then)
    // * Если ничего не указать, или <= 0 -> то бескончно
    repeat(_repeatCount = 0) {
      this._repeatCount = _repeatCount;
      if (this._repeatCount <= 0) {
        this._repeatCount = null;
      }
      this._isRepeat = true;
      this._changer = null;
      return this;
    }

    // * Снова повторить, но поменять местами to и from (работает только с repeat >= 2)
    reverse() {
      this._isReverse = true;
      return this;
    }

    isDone() {
      if (!this._isPrepared) {
        // * Чтобы не было выхода пока ждёт Delay
        return false;
      }
      // * Если от 255 до 0 (например)
      if (this._orienation === false) {
        // * То может быть меньше нуля (т.к. @step динамический)
        return this.value() <= this._to;
      } else {
        return this.value() >= this._to;
      }
    }

    value() {
      return this.obj[this._field];
    }

    stop() {
      this._thread = null;
      this._delayThread = null;
      if (this._changer == null) {
        // * Если есть связанный Changer, то не выполняем метод завршения
        return this._callDoneMethod();
      }
    }

    // * При ожидании, значения устанавливаются не сразу
    delay(_delay) {
      this._delay = _delay;
      return this;
    }

    // * Выполнить другой Changer после этого
    // * Не совместим с Repeat
    // * НЕЛЬЗЯ зацикливать, не будет работать
    // * Соединённый не надо обновлять вне, он обновляется в этом
    then(_changer) {
      this._changer = _changer;
      this._isRepeat = false;
      return this;
    }

    // * Этот метод будт выполнене в конце
    done(_onDoneMethod) {
      this._onDoneMethod = _onDoneMethod;
      return this;
    }

    // * Шаг можно выполнить и в ручную
    makeStep() {
      if (!this.isStarted()) {
        this._prepare();
      }
      this._makeStep();
      return this;
    }

    update() {
      var ref;
      if (this.isStarted()) {
        if (this._delay > 0) {
          if ((ref = this._delayThread) != null) {
            ref.update();
          }
        }
        if (this._thread != null) {
          this._updateMainThread();
        }
      } else {
        // * Если хоть раз был запущен
        if (this._isBeenStarted === true) {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
        }
      }
    }

    static CreateForOpacityUp(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(0).to(255).step(step);
      changer.done(function() {
        sprite.opacity = 255;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

    static CreateForOpacityDown(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(sprite.opacity).to(0).step(step);
      changer.done(function() {
        sprite.opacity = 0;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Changer.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Changer.prototype;
    _._prepare = function() {
      if (this._field == null) {
        return;
      }
      this._orienation = this._from < this._to;
      if (!this._orienation) {
        this._step *= -1;
      }
      // * Устанавливаем начальное значение
      this.obj[this._field] = this._from;
      this._isPrepared = true;
    };
    _._makeStep = function() {
      var value;
      if (this.isDone()) {
        return;
      }
      value = this.value();
      value += this._step;
      this.obj[this._field] = value;
    };
    _._startThread = function() {
      this._prepare();
      if (this.isDone()) {
        return;
      }
      this._thread = new KDCore.TimedUpdate(this._speed, this._makeStep.bind(this));
      return this._isBeenStarted = true;
    };
    _._updateChainedChanger = function() {
      if (this._changer.isStarted()) {
        this._changer.update();
        if (this._changer.isDone()) {
          this._callDoneMethod();
          this._changer.stop();
          return this._changer = null;
        }
      } else {
        return this._changer.start();
      }
    };
    _._restart = function() {
      if (!this._isCanRepeatMore()) {
        return;
      }
      if (this._repeatCount == null) {
        // * Если указано! число повторений, то onDone метод не вызываем
        this._callDoneMethod();
      }
      if (this._isReverse === true) {
        this._swapFromTo();
      }
      this._prepare();
      return this.start();
    };
    _._swapFromTo = function() {
      var t;
      t = this._from;
      this._from = this._to;
      this._to = t;
      // * Инвентируем число step
      this._step *= -1;
    };
    _._callDoneMethod = function() {
      if (this._onDoneMethod != null) {
        return this._onDoneMethod();
      }
    };
    _._isCanRepeatMore = function() {
      if (this._repeatCount == null) {
        return true;
      }
      this._repeatCount--;
      if (this._repeatCount <= 0) {
        this.stop();
        return false;
      }
      return true;
    };
    _._updateMainThread = function() {
      this._thread.update();
      if (this.isDone()) {
        if (this._isRepeat === true) {
          this._restart();
        } else {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
          this.stop();
        }
      }
    };
  })();
  // ■ END Changer.coffee
  //---------------------------------------------------------------------------

  //@[EXTEND]
  return KDCore.Changer = Changer;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color;
  Color = (function() {
    class Color {
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
        KDCore.SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
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

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = KDCore.SDK.rand(1, 254);
        b = KDCore.SDK.rand(1, 254);
        c = KDCore.SDK.rand(1, 254);
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
      },
      OX: {
        get: function() {
          return this.toNumber();
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

    return Color;

  }).call(this);
  //@[EXTEND]
  return KDCore.Color = Color;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color, DevLog, __TMP_LOGS__;
  Color = KDCore.Color;
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
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
      this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
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

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  //@[EXTEND]
  return KDCore.DevLog = DevLog;
});


// Generated by CoffeeScript 2.6.1
// * Класс для глобального события игры (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.GEvent = class GEvent {
    constructor(name) {
      this.name = name;
      this.clear();
    }

    addListener(listener, isSingle = false) {
      if (listener == null) {
        return;
      }
      if (isSingle === true) {
        this.listeners = [listener];
      } else {
        this.listeners.push(listener);
      }
    }

    removeListener(listener) {
      if (listener == null) {
        return;
      }
      return this.listener.delete(listener);
    }

    call() {
      var i, l, len, ref;
      ref = this.listeners;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        l();
      }
    }

    clear() {
      return this.listeners = [];
    }

  };
});


// Generated by CoffeeScript 2.6.1
// * Менеджер для управления глобальными событиями игры (GEvent) (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  var GEventsManager;
  // * Данный менеджер глобальный, т.е. с ним работают ВСЕ плагины, которые его используют!
  GEventsManager = function() {};
  (function() {
    var _;
    _ = GEventsManager;
    // * Существует ли событие с данным именем
    _.isEventExists = function(gEventName) {
      return this._getEventByName(gEventName) != null;
    };
    // * Получить список всех зарегестрированных событий (имён)
    _.getAllEvents = function() {
      if (this.events == null) {
        return [];
      }
      return this.events.map(function(ev) {
        return ev.name;
      });
    };
    // * Зарегестрировать событие (используется только имя события)
    _.register = function(gEventName) {
      if (this.events == null) {
        this.events = [];
      }
      this.events.push(new KDCore.GEvent(gEventName));
    };
    // * Подписаться на событие (имя события) и слушатель
    // * если isSingle == true - то у события может быть только один исполнитель
    _.subscribeFor = function(evName, listener, isSingle = false) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.addListener(listener, isSingle) : void 0;
    };
    // * Подписаться на событие (уникально) для объекта
    // * Т.е. при вызове этого метода ещё раз, если объект
    // * уже подписан на событие, ничего не будет (без дубликатов)
    //? ВНИМАНИЕ ! Если объект подписался через subscribeForX, то
    // выполнив clear по данному evName, он уже не подпишится!
    _.subscribeForX = function(context, evName, listener) {
      var e, key;
      try {
        key = "__kdCoreGEvent_" + evName;
        if (context[key] == null) {
          this.subscribeFor(evName, listener);
          return context[key] = true;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Вызвать событие (по имени)
    _.call = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.call() : void 0;
    };
    _.clear = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.clear() : void 0;
    };
    _._getEventByName = function(name) {
      if (!this.events) {
        return null;
      }
      return this.events.find(function(ev) {
        return ev.name === name;
      });
    };
  })();
  //@[EXTEND]
  return KDCore.GEventsManager = GEventsManager;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  //?[DEPRECATED]
  return KDCore.ParametersManager = class ParametersManager {
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
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
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
      if (KDCore.SDK.isInt(number)) {
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

    getBooleanFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getBooleanFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getNumberFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getNumberFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getStringFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getStringFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getBooleanFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getBoolean(name);
      });
    }

    getNumberFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getNumber(name);
      });
    }

    getStringFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getString(name);
      });
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.ParamLoader = class ParamLoader {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
      this.params = this.parseParameters(this.paramsRaw);
    }

    parseParameters(paramSet) {
      var clearKey, key, params, typeKey, value;
      params = {};
      for (key in paramSet) {
        value = paramSet[key];
        clearKey = this.parseKey(key);
        typeKey = this.parseKeyType(key);
        params[clearKey] = this.parseParamItem(typeKey, value);
      }
      return params;
    }

    parseKey(keyRaw) {
      return keyRaw.split(":")[0];
    }

    parseKeyType(keyRaw) {
      return keyRaw.split(":")[1];
    }

    // * Проверка, загружены ли параметры плагина
    isLoaded() {
      return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
    }

    // * Имя параметра без ключа
    isHasParameter(paramName) {
      return this.params[paramName] != null;
    }

    
      // * Возвращает значение параметра (def - по умолчанию, если не найден)
    getParam(paramName, def) {
      var value;
      if (this.isHasParameter(paramName)) {
        value = this.params[paramName];
        if (value != null) {
          return value;
        }
      }
      return def;
    }

    // * Данные ключи должны идти после названия параметра через :
    // * Пример: @param ShowDelay:int, @param TestBool:bool
    // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
    parseParamItem(type, item) {
      var e;
      if (type == null) {
        return item;
      }
      try {
        switch (type) {
          case "int":
          case "i":
            return Number(item);
          case "intA":
            return this.parseArray(item, "int");
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            return this.parseStruct(item);
          case "structA":
            return this.parseStructArray(item);
          case "str":
            return item;
          case "strA":
            return this.parseArray(item, "str");
          case "note":
            return this.parseNote(item);
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          case "json":
          case "j":
            return this.parseJson(item);
          case "jA":
            return this.parseArray(item, 'json');
          default:
            return item;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return item;
      }
    }

    parseArray(items, type) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseParamItem(type, p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return elements;
    }

    parseStruct(item) {
      var e, parsed;
      try {
        if (item == null) {
          return null;
        }
        if (!String.any(item)) {
          return null;
        }
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return this.parseParameters(parsed);
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    }

    parseStructArray(items) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseStruct(p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return elements;
    }

    parseNote(item) {
      var e, parsed;
      try {
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return parsed;
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return item;
    }

    parseJson(item) {
      var cx, e, element, elements, i, json, key, len, parsed, value;
      try {
        json = {};
        parsed = JsonEx.parse(item);
        elements = parsed.split('\n');
        for (i = 0, len = elements.length; i < len; i++) {
          element = elements[i];
          cx = "{" + element + "}";
          try {
            item = JsonEx.parse(cx);
            for (key in item) {
              value = item[key];
              json[key] = value;
            }
          } catch (error) {
            e = error;
            KDCore.warning("Parameter " + element + " have syntax errors, ignored");
          }
        }
        return json;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null; // * Чтобы default value был возвращён
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Point;
  Point = (function() {
    class Point {
      constructor(_x = 0, _y = 0) {
        this._x = _x;
        this._y = _y;
      }

      clone() {
        return new Point(this._x, this._y);
      }

      toString() {
        return "[" + this._x + " ; " + this._y + "]";
      }

      isSame(anotherPoint) {
        return this.x === anotherPoint.x && this.y === anotherPoint.y;
      }

      convertToCanvas() {
        return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
      }

      convertToMap() {
        return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
      }

      convertToScreen() {
        return new Point(this.screenX(), this.screenY());
      }

      screenX() {
        var t, tw;
        t = $gameMap.adjustX(this._x);
        tw = $gameMap.tileWidth();
        return Math.round(t * tw + tw / 2);
      }

      screenY() {
        var t, th;
        t = $gameMap.adjustY(this._y);
        th = $gameMap.tileHeight();
        return Math.round(t * th + th);
      }

      round() {
        return new Point(Math.round(this._x), Math.round(this._y));
      }

      floor() {
        return new Point(Math.floor(this._x), Math.floor(this._y));
      }

      mapPointOnScreen() {
        var nx, ny;
        nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
        ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
        return new Point(nx, ny);
      }

      multiplyBy(val) {
        return new Point(this._x * val, this._y * val);
      }

      simple() {
        return new PIXI.Point(this.x, this.y);
      }

      delta(point) {
        var dx, dy;
        dx = point.x - this._x;
        dy = point.y - this._y;
        return new KDCore.Point(dx, dy);
      }

      static _getEmpty() {
        if (Point._emptyPoint == null) {
          Point._emptyPoint = new Point(0, 0);
        }
        return Point._emptyPoint;
      }

    };

    Object.defineProperties(Point.prototype, {
      x: {
        get: function() {
          return this._x;
        },
        configurable: true
      },
      y: {
        get: function() {
          return this._y;
        },
        configurable: true
      }
    });

    Object.defineProperties(Point, {
      Empty: {
        get: function() {
          return Point._getEmpty();
        },
        configurable: false
      }
    });

    Array.prototype.toPoint = function() {
      return new Point(this[0], this[1]);
    };

    Object.defineProperty(Array.prototype, "toPoint", {
      enumerable: false
    });

    Sprite.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    Game_CharacterBase.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    return Point;

  }).call(this);
  //@[EXTEND]
  return KDCore.Point = Point;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return KDCore.Sprite = (function(superClass) {
    //@[AUTO EXTEND]
    class Sprite extends superClass {
      constructor() {
        super(...arguments);
      }

      appear(step, delay = 0) {
        this.opacity = 0;
        this._opChanger = KDCore.Changer.CreateForOpacityUp(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      disapper(step, delay = 0) {
        this._opChanger = KDCore.Changer.CreateForOpacityDown(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      moveWithAnimation(dx, dy, duration = 30, easingType = 2) {
        var e;
        try {
          this._moveAnimationItem = new Game_Picture();
          this._moveAnimationItem._x = this.x;
          this._moveAnimationItem._y = this.y;
          this._moveAnimationItem.move(0, this.x + dx, this.y + dy, 1, 1, 255, 0, duration, easingType);
          this.updateMovingAnimation = this.updateMovingAnimationBody;
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }

      assignTooltip(content, params) {
        if (this._tooltip != null) {
          this.removeChild(this._tooltip);
        }
        this._tooltip = new KDCore.UI.Sprite_UITooltip(params);
        this._tooltip.addContent(content);
        this.updateTooltip = this.updateTooltipBody;
      }

      destroyTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this.hideTooltip();
        this.removeChild(this._tooltip);
        this._tooltip = null;
        return this.updateTooltip = function() {}; // * EMPTY
      }

      showTooltip() {
        if (this._tooltip == null) {
          return;
        }
        // * Position 0, 0, becouse cursorRelative by default
        this._tooltip.activateTooltip(0, 0, this);
      }

      hideTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this._tooltip.deactivateTooltip();
      }

      //@[DYNAMIC]
      updateTooltip() {} // * EMPTY

      updateTooltipBody() {
        if (this.isUnderMouse()) {
          if (this._tooltip.isTooltipActive()) {

          } else {
            if (this.isReady() && this.visible === true && this.opacity >= 255) {
              return this.showTooltip();
            }
          }
        } else {
          if (this._tooltip.isTooltipActive()) {
            return this.hideTooltip();
          }
        }
      }

      //@[DYNAMIC]
      updateMovingAnimation() {} // * EMPTY

      updateMovingAnimationBody() {
        var e;
        try {
          if (this._moveAnimationItem == null) {
            return;
          }
          this._moveAnimationItem.update();
          this.x = this._moveAnimationItem._x;
          this.y = this._moveAnimationItem._y;
          if (this._moveAnimationItem._duration <= 0) {
            this._moveAnimationItem = null;
            this.updateMovingAnimation = function() {};
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
          this.updateMovingAnimation = function() {};
        }
      }

      update() {
        super.update();
        this._updateOpChanger();
        this.updateTooltip();
        this.updateMovingAnimation();
      }

      //@[DYNAMIC]
      _updateOpChanger() {} // * EMPTY

      b() {
        return this.bitmap;
      }

      clear() {
        return this.bitmap.clear();
      }

      add(child) {
        return this.addChild(child);
      }

      bNew(w, h) {
        if (h == null) {
          h = w;
        }
        return this.bitmap = new Bitmap(w, h);
      }

      bImg(filename, sourceFolder) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        return this.bitmap = getterFunc(filename);
      }

      onReady(method) {
        if (method != null) {
          return this.bitmap.addLoadListener(method);
        }
      }

      drawText() {
        return this.bitmap.drawText(...arguments);
      }

      drawTextFull(text, position = "center") {
        if (this.textSettingsPosition != null) {
          position = this.textSettingsPosition;
        }
        return this.bitmap.drawTextFull(text, position);
      }

      //?DEPRECATED
      drawTextWithSettings(text) {
        this.clear();
        this.drawTextFull(text, this.textSettingsPosition);
      }

      //? x, y, icon, size
      drawIcon() {
        return this.bitmap.drawIcon(...arguments);
      }

      moveByJson(settings) {
        var pos;
        pos = KDCore.Utils.getPositionPointFromJSON(settings);
        return this.move(pos.x, pos.y);
      }

      applyTextSettingsByJson(sprite, settings) {
        this.applyTextSettingsByExtraSettings(sprite, settings.text);
      }

      applyTextSettingsByExtraSettings(sprite, s) {
        sprite.move(s.marginX, s.marginY);
        sprite.b().fontSize = s.fontSize;
        sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
        sprite.b().outlineWidth = s.outlineWidth;
        if (s.outlineColor != null) {
          sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
        }
        if (s.fontFace != null) {
          sprite.b().fontFace = s.fontFace;
        }
        sprite.b().fontItalic = s.fontItalic;
        sprite.visible = s.visible;
      }

      isReady() {
        var i, j, ref;
        if (this.bitmap != null) {
          if (!this.bitmap.isReady()) {
            return false;
          }
        }
        for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (!this.children[i].bitmap.isReady()) {
            return false;
          }
        }
        return true;
      }

      isCheckAlpha() {
        return false;
      }

      inPosition(point) {
        var e, gx, gy, pixel, result, x, y;
        result = this.isContainsPoint(point);
        if (result && this.isCheckAlpha()) {
          try {
            ({x, y} = point);
            gx = KDCore.SDK.toGlobalCoord(this, 'x');
            gy = KDCore.SDK.toGlobalCoord(this, 'y');
            pixel = this.bitmap.getAlphaPixel(x - gx, y - gy);
            result = pixel > 100;
          } catch (error) {
            e = error;
            KDCore.warning(e);
            result = true; // * ignor Alpha if error
          }
        }
        return result;
      }

      isUnderMouse() {
        return this.inPosition(TouchInput);
      }

      // * Из параметров плагина
      applyFontParam(font) {
        var b;
        if (font == null) {
          return;
        }
        b = this.b();
        if (font.size != null) {
          b.fontSize = font.size;
        }
        if (!String.isNullOrEmpty(font.face)) {
          b.fontFace = font.face;
        }
        if (font.italic != null) {
          b.fontItalic = font.italic;
        }
      }

      applyOutlineParam(outline) {
        var b;
        if (outline == null) {
          return;
        }
        b = this.b();
        if (outline.width != null) {
          b.outlineWidth = outline.width;
        }
        if (!String.isNullOrEmpty(outline.color)) {
          b.outlineColor = outline.color;
        }
      }

      static FromImg(filename, sourceFolder) {
        var s;
        s = new KDCore.Sprite();
        s.bImg(filename, sourceFolder);
        return s;
      }

      static FromBitmap(w, h) {
        var s;
        s = new KDCore.Sprite();
        s.bNew(w, h);
        return s;
      }

      static FromTextSettings(settings) {
        var s;
        s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
        s.applyTextSettingsByExtraSettings(s, settings);
        s.textSettingsPosition = settings.position;
        return s;
      }

      // * Загрузчик из параметров плагина (безопасный)
      static FromParams(pluginParams) {
        var e, h, margins, s, size, w;
        try {
          size = pluginParams.size;
          ({w, h} = size);
          try {
            if (String.any(w)) {
              if (isFinite(w)) {
                w = Number(w);
              } else {
                w = eval(w);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            w = 100;
          }
          try {
            if (String.any(h)) {
              if (isFinite(h)) {
                h = Number(h);
              } else {
                h = eval(h);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            h = 100;
          }
          s = KDCore.Sprite.FromBitmap(w, h);
          s.textSettingsPosition = pluginParams.alignment;
          margins = pluginParams.margins;
          if (margins != null) {
            s.move(margins.x, margins.y);
          }
          s.applyFontParam(pluginParams.font);
          s.applyOutlineParam(pluginParams.outline);
          if (!String.isNullOrEmpty(pluginParams.textColor)) {
            s.b().textColor = pluginParams.textColor;
          }
          if (pluginParams.visible != null) {
            s.visible = pluginParams.visible;
          }
          return s;
        } catch (error) {
          e = error;
          console.warn('Something wrong with Text Settings!', e);
          return KDCore.Sprite.FromBitmap(60, 30);
        }
      }

    };

    return Sprite;

  }).call(this, Sprite);
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.TimedUpdate = class TimedUpdate {
    constructor(interval, method) {
      this.interval = interval;
      this.method = method;
      this._timer = 0;
      this._once = false;
    }

    update() {
      if (this.interval == null) {
        return;
      }
      if (this._timer++ >= this.interval) {
        this.call();
        this._timer = 0;
        if (this._once === true) {
          return this.stop();
        }
      }
    }

    once() {
      return this._once = true;
    }

    onUpdate(method) {
      this.method = method;
    }

    stop() {
      return this.interval = null;
    }

    isAlive() {
      return this.interval != null;
    }

    // * Рандомизировать интервал @interval (-min, +max)
    applyTimeRange(min, max) {
      var value;
      if (!this.isAlive()) {
        return;
      }
      value = KDCore.SDK.rand(min, max);
      return this.interval += value;
    }

    call() {
      if (this.method != null) {
        return this.method();
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  
    // * Button (Sprite_XButton)

    //@[AUTO EXTEND]
  //?DEPRECATED
  return KDCore.Button = class Button extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
      return;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return this.visible === true;
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isEnabled() {
      return !this.isDisabled();
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    clearClickHandlers() {
      return this._clickHandlers = [];
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    simulateClick() { //?NEW
      return this.applyClickedState();
    }

    simulateClickManual() { //?NEW
      this.simulateClick();
      return setTimeout((() => {
        try {
          return this.applyNormalState();
        } catch (error) {

        }
      }), 50);
    }

    prepare() { //?NEW
      return this.slowUpdate();
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      this.refreshEnDisState();
      return this._mouseIn = false;
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    // * In MZ TouchInput always have X,Y
    cursorInButton() {
      return this.touchInButton();
    }

    xyInButton(x, y) {
      var inRect, rect, rx, ry;
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
      inRect = rect.contains(x, y);
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(x - rx, y - ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel >= 200;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new KDCore.Point(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warn('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warn('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      if (this._images != null) {
        this._images.forEach(function(img) {
          if (img != null) {
            return img.parent.removeChild(img);
          }
        });
      }
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        this.applyDisableState();
        return this._hideText();
      } else {
        if (this._mouseIn === false) {
          return this.applyNormalState();
        }
      }
    }

    //else
    //    do @applyCoverState
    updateComplexTextVisible() {}

    applyScale(mod) {
      var i, img, len, ref;
      ref = this._images;
      for (i = 0, len = ref.length; i < len; i++) {
        img = ref[i];
        if (img != null) {
          img.scale.x = mod;
          img.scale.y = mod;
        }
      }
    }

    static FromSet(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img0, img0);
      return button;
    }

    static FromSetFull(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1, img2, img3;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      img2 = getterFunc(imgName + "_02");
      img3 = getterFunc(imgName + "_03");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img2, img3);
      return button;
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroup;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)

    //rev 07.10.21
  Sprite_ButtonsGroup = class Sprite_ButtonsGroup extends KDCore.Sprite {
    // buttonsArray = [
    //       {image: NAME, position: [X,Y]}, ...
    //    ]
    constructor(buttonsArray, activeIndex, clickCallback) {
      var button, i, len;
      super();
      this.clickCallback = clickCallback;
      this._buttons = [];
      for (i = 0, len = buttonsArray.length; i < len; i++) {
        button = buttonsArray[i];
        this._createButton(button);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroup.prototype;
    _._createButton = function({image, position}) {
      var btn, index, method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      index = this._buttons.length;
      btn = new KDCore.ButtonM(image, true, "Alpha");
      btn.move(position);
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this._buttons.push(btn);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroup = Sprite_ButtonsGroup;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroupHandler;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)
  // * В отличии от Sprite_ButtonsGroup, принимает массив
  // * уже созданных кнопок

    //rev 10.07.22
  Sprite_ButtonsGroupHandler = class Sprite_ButtonsGroupHandler extends KDCore.Sprite {
    // _buttons = [Button object with enable, disable, isEnable, addClickHandler methods]
    constructor(_buttons, clickCallback, activeIndex = 0) {
      var button, i, index, len, ref;
      super();
      this._buttons = _buttons;
      this.clickCallback = clickCallback;
      ref = this._buttons;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        button = ref[index];
        this._processButton(button, index);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroupHandler.prototype;
    _._processButton = function(btn, index) {
      var method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroupHandler = Sprite_ButtonsGroupHandler;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad((function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(width, height, skinBitmap) {
      super();
      this.width = width;
      this.height = height;
      this.skinBitmap = skinBitmap;
      this._createParts();
      this._refreshAll();
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this._outFrame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this._outFrame.addChild(new Sprite());
      }
      return this.addChild(this._outFrame);
    }

    // * Отступ, чтобы за рамку не выходить
    _fillPadding() {
      return 2;
    }

    // * Размер частей на картинке
    _fillImagePartWidth() {
      return 96;
    }

    _fillImagePartHeight() {
      return 96;
    }

    // * Толщина рамки
    _frameThickness() {
      return 12;
    }

    _refreshAll() {
      this._refreshBack();
      return this._refreshTFrame();
    }

    _refreshBack() {
      var fh, fw, h, m, sprite, w;
      m = this._fillPadding();
      w = Math.max(0, this.width - m * 2);
      h = Math.max(0, this.height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      sprite.setFrame(0, 0, fw, fh);
      sprite.move(m, m);
      sprite.scale.x = w / fw;
      return sprite.scale.y = h / fh;
    }

    _refreshTFrame() {
      var drect, fh, fw, j, len, m, ref, spr, srect;
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
      // * Координаты рамки на картинке
      srect = {
        x: fw,
        y: 0,
        width: fw,
        height: fh
      };
      m = this._frameThickness(); // * Толщина
      ref = this._outFrame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      if (KDCore.isMZ()) {
        Window.prototype._setRectPartsGeometry.call(this, this._outFrame, srect, drect, m);
      } else {
        this._setRectPartsGeometry(this._outFrame, srect, drect, m);
      }
    }

    // * Этот метод существует в MZ, но нет в MV
    //? From MZ
    _setRectPartsGeometry(sprite, srect, drect, m) {
      var child, children, dh, dmh, dmw, dw, dx, dy, j, len, sh, smh, smw, sw, sx, sy;
      sx = srect.x;
      sy = srect.y;
      sw = srect.width;
      sh = srect.height;
      dx = drect.x;
      dy = drect.y;
      dw = drect.width;
      dh = drect.height;
      smw = sw - m * 2;
      smh = sh - m * 2;
      dmw = dw - m * 2;
      dmh = dh - m * 2;
      children = sprite.children;
      sprite.setFrame(0, 0, dw, dh);
      sprite.move(dx, dy);
      // corner
      children[0].setFrame(sx, sy, m, m);
      children[1].setFrame(sx + sw - m, sy, m, m);
      children[2].setFrame(sx, sy + sw - m, m, m);
      children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
      children[0].move(0, 0);
      children[1].move(dw - m, 0);
      children[2].move(0, dh - m);
      children[3].move(dw - m, dh - m);
      // edge
      children[4].move(m, 0);
      children[5].move(m, dh - m);
      children[6].move(0, m);
      children[7].move(dw - m, m);
      children[4].setFrame(sx + m, sy, smw, m);
      children[5].setFrame(sx + m, sy + sw - m, smw, m);
      children[6].setFrame(sx, sy + m, m, smh);
      children[7].setFrame(sx + sw - m, sy + m, m, smh);
      children[4].scale.x = dmw / smw;
      children[5].scale.x = dmw / smw;
      children[6].scale.y = dmh / smh;
      children[7].scale.y = dmh / smh;
      // center
      if (children[8] != null) {
        children[8].setFrame(sx + m, sy + m, smw, smh);
        children[8].move(m, m);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
      }
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.visible = dw > 0 && dh > 0;
      }
    }

  };
  return KDCore.Sprite_TilingFrame = Sprite_TilingFrame;
}));


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Window_ExtTextLineBase;
  // * Данное окно используется как основа для Sprite_UITextExt
  //rev 07.10.21
  Window_ExtTextLineBase = class Window_ExtTextLineBase extends Window_Base {
    constructor(rect, fontSettings) {
      super(rect);
      this.fontSettings = fontSettings;
      this.createContents();
      // * Всегда прозрачное окно
      this.setBackgroundType(2);
    }

    // * Нет отступов
    updatePadding() {
      return this.padding = 0;
    }

    // * Нет отступов
    itemPadding() {
      return 0;
    }

    textPadding() {
      return 0;
    }

    standardPadding() {
      return 0;
    }

    contentsWidth() {
      return this.width;
    }

    contentsHeight() {
      return this.height;
    }

    // * Более гибкая настройка размера текста при { }
    makeFontBigger() {
      return this.contents.fontSize += 1;
    }

    makeFontSmaller() {
      if (this.contents.fontSize > 1) {
        return this.contents.fontSize -= 1;
      }
    }

    // * Применение своих шрифта и размера текста
    resetFontSettings() {
      super.resetFontSettings();
      if (this.fontSettings == null) {
        return;
      }
      if (String.any(this.fontSettings.face)) {
        this.contents.fontFace = this.fontSettings.face;
      }
      if (this.fontSettings.size > 0) {
        this.contents.fontSize = this.fontSettings.size;
      }
      if (this.fontSettings.italic != null) {
        this.contents.fontItalic = this.fontSettings.italic;
      }
    }

  };
  return KDCore.Window_ExtTextLineBase = Window_ExtTextLineBase;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button M
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

    // * Принимает название файла изображения кнопки без _00
  // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
  // * _02 - не используются в этом классе

    // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

    //TODO: ADD ALPHA CHECK!

    // * Если isFull - true, значит нужен _03
  KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
    constructor(filename, isFull = false, sourceFolder = null) {
      super();
      this._bitmaps = [];
      this._disabled = false;
      this._isTriggered = false;
      // * Когда произошло нажатие на кнопку
      this._handler = null;
      this._isCanBeClicked = true;
      this._isManualHoverMode = false;
      this._isManualSelected = false;
      this._loadBitmaps(filename, isFull, sourceFolder);
      this._setImageState(0);
      this._createThread();
    }

    setManualHover() {
      return this._isManualHoverMode = true;
    }

    disableManualHover() {
      return this._isManualHoverMode = false;
    }

    setManualSelected(_isManualSelected) {
      this._isManualSelected = _isManualSelected;
    }

    enableClick() {
      return this._isCanBeClicked = true;
    }

    disableClick() {
      return this._isCanBeClicked = false;
    }

    desaturate() {
      this.filters = [new PIXI.filters.ColorMatrixFilter()];
      this.filters[0].desaturate();
    }

    isMouseIn() {
      if (this._isManualHoverMode === true) {
        return this._isManualSelected;
      } else {
        return this.isUnderMouse() && this.visible === true;
      }
    }

    isActive() {
      if (this._isCanBeClicked === false) {
        return false;
      }
      if (this.parent != null) {
        return this.parent.visible === true && this.visible === true;
      } else {
        return this.visible === true;
      }
    }

    isDisabled() {
      return this._disabled === true;
    }

    addClickHandler(_handler) {
      this._handler = _handler;
    }

    clearClickHandler() {
      return this._handler = null;
    }

    // * Воспроизводит визуальный эффект нажатия
    simulateClick() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.isMouseIn()) {
        return;
      }
      this._startSimulation();
    }

    isEnabled() {
      return !this.isDisabled();
    }

    refreshState(isEnable = true) {
      if (isEnable === true) {
        if (this.isDisabled()) {
          this.enable();
        }
      } else {
        if (this.isEnabled()) {
          this.disable();
        }
      }
    }

    disable() {
      this._disabled = true;
      return this._setImageState(2);
    }

    enable() {
      this._disabled = false;
      return this._setImageState(0);
    }

    click() {
      if (this._handler != null) {
        return this._handler();
      }
    }

    update() {
      super.update();
      return this._updateMain();
    }

  };
  return (function() {    
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ButtonM Implementation
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
    //@[DEFINES]
    _ = KDCore.ButtonM.prototype;
    _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(filename + '_00'));
      this._bitmaps.push(getterFunc(filename + '_01'));
      if (isFull) {
        this._bitmaps.push(getterFunc(filename + '_03'));
      }
    };
    _._getGetter = function(sourceFolder = null) {
      var getterFunc;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder !== null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
        };
      }
      return getterFunc;
    };
    _._setImageState = function(index = 0) {
      if (this._bitmaps[index] == null) {
        index = 0;
      }
      this.bitmap = this._bitmaps[index];
      this._lastState = index;
    };
    _._createThread = function() {
      this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
      this.hoverThread.applyTimeRange(-1, 1);
      this.hoverThread.call();
    };
    //?[DYNAMIC]
    _._updateMain = function() {
      this._updateMouseLogic();
      if (!this.isActive()) {
        if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
          return $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseLogic = function() {
      this.hoverThread.update();
      return this._updateMouseClick();
    };
    _._updateHover = function() {
      if (!this.isActive()) {
        return;
      }
      // * чтобы эффект нажатия не прекратить
      if (this._isTriggered === true) {
        return;
      }
      if (this.isMouseIn()) {
        if (this._lastState !== 1) {
          if (!this.isDisabled()) {
            this._setImageState(1);
          }
          $gameTemp.kdButtonUnderMouse = this;
        }
      } else {
        if (this._lastState !== 0) {
          if (!this.isDisabled()) {
            this._setImageState(0);
          }
          if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        } else if ($gameTemp.kdButtonUnderMouse === this) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseClick = function() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.isUnderMouse()) {
        this._isTriggered = true;
        this._setImageState(0);
      }
      if (this._isTriggered === true) {
        if (TouchInput.isReleased()) {
          this._isTriggered = false;
          if (this.isMouseIn()) {
            this.click();
          }
        }
      }
    };
    _._startSimulation = function() {
      this._setImageState(1);
      this._simulateThread = new KDCore.TimedUpdate(10, () => {
        return this._setImageState(0);
      });
      this._simulateThread.once();
      return this._updateMain = this._updateMouseClickSimulated;
    };
    _._updateMouseClickSimulated = function() {
      this._simulateThread.update();
      if (!this._simulateThread.isAlive()) {
        this._simulateThread = null;
        this._updateMain = this._updateMouseLogic;
      }
    };
    // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

    //@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
      if ($gameTemp.kdButtonUnderMouse != null) {
        return true;
      } else {
        return alias_SM_isAnyButtonPressed.call(this);
      }
    };
    //TODO: Добавить доп. проверку?
    //@[ALIAS]
    alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
      $gameTemp.kdButtonUnderMouse = null;
      setTimeout((function() {
        return $gameTemp.kdButtonUnderMouse = null;
      }), 50);
      return alias_SM_onMapLoaded.call(this);
    };
  })();
});

// ■ END ButtonM Implementation
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button Mini User - класс с определением файла каждого состояния отдельно
  // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
  // ? states = { main, hover, disabled }
  return KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
    constructor() {
      super(...arguments);
    }

    //$[OVER]
    _loadBitmaps(states, isFull = true, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(states.main));
      this._bitmaps.push(getterFunc(states.hover));
      // * Optional 03
      if (String.any(states.disabled)) {
        this._bitmaps.push(getterFunc(states.disabled));
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_TilingLine;
  Sprite_TilingLine = class Sprite_TilingLine extends KDCore.Sprite_TilingFrame {
    constructor() {
      super(...arguments);
    }

    //$[OVER BASE ALL BELOW]
    _fillPadding() {
      return 0;
    }

    _refreshTFrame() {} // * EMPTY

    _fillImagePartWidth() {
      return 4;
    }

    _fillImagePartHeight() {
      return 26;
    }

  };
  return KDCore.Sprite_TilingLine = Sprite_TilingLine;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Пространство имён для всех UIElements
  KDCore.UI = KDCore.UI || {};
  (function() {    // * Общий класс для всех UI элементов
    //?rev 13.10.20
    var Sprite_UIElement;
    Sprite_UIElement = (function() {
      // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
      //@[ABSTRACT]
      class Sprite_UIElement extends KDCore.Sprite {
        constructor(params) {
          super();
          this.params = params;
          this._init();
        }

        // * Стандартный набор настроек
        defaultParams() {
          return {
            visible: true
          };
        }

        // * Общий метод (есть у всех элементов)
        // * По умолчанию вызывает drawText, но потомки могут переопределить
        draw() {
          return this.drawText(...arguments);
        }

        // * Общий метод
        drawText() {} // * EMPTY

        
          // * Если изначально невидимый (из параметров), то не активный вообще
        isActive() {
          return this.params.visible === true;
        }

        rootImageFolder() {
          if (String.any(this.params.rootImageFolder)) {
            return this.params.rootImageFolder;
          } else {
            return Sprite_UIElement.RootImageFolder;
          }
        }

        // * Сделать чёрно белым
        desaturate() {
          this.filters = [new PIXI.filters.ColorMatrixFilter()];
          this.filters[0].desaturate();
        }

        clearFilters() {
          return this.filters = [];
        }

        // * Общий метод (можно ли редактировать визуально)
        isCanBeEdited() {
          return false;
        }

        // * Общий метод (надо ли скрывать при игровом сообщнии)
        isHaveHideWithMessageFlag() {
          return false;
        }

        // * Общий метод (находится ли объект под мышкой)
        isUnderMouse() {
          var ref;
          return ((ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0) && this.isFullVisible();
        }

        // * Полностью ли виден объект? (включае всех его родителей)
        isFullVisible() {
          return this.visible === true && this.allParentsIsVisible();
        }

        // * Все ли родители объекта видимы
        allParentsIsVisible() {
          var e, p;
          if (!this.visible) {
            return false;
          }
          try {
            if (this.parent != null) {
              p = this.parent;
              while (p != null) {
                if (p.visible === true) {
                  p = p.parent;
                } else {
                  return false;
                }
              }
              return true;
            } else {
              return this.visible === true;
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            return true;
          }
        }

        // * Параметры первого элемента (если он есть)
        realWidth() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realWidth();
            } else {
              return child.width;
            }
          }
          return 0;
        }

        realHeight() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realHeight();
            } else {
              return child.height;
            }
          }
          return 0;
        }

        // * Первый "физический" элемент (спрайт)
        zeroChild() {
          return this.children[0];
        }

        // * Метод восстановления значения на стандартные настройки
        reset(property) {
          var e;
          try {
            switch (property) {
              case "position":
                this._resetPosition();
                break;
              default:
                this[property] = this.params[property];
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }

      };

      // * Корневая директория для изображений
      Sprite_UIElement.RootImageFolder = "Alpha";

      return Sprite_UIElement;

    }).call(this);
    KDCore.UI.Sprite_UIElement = Sprite_UIElement;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIElement.prototype;
    _._init = function() {
      var e;
      this._prepare();
      try {
        return this._createContent();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Если при создании произошла ошибка, отключаем элемент
        return this.isActive = function() {
          return false;
        };
      }
    };
    
    // * Подготовка элемента (проверка параметров)
    _._prepare = function() {
      if (this.params == null) {
        this.params = this.defaultParams();
      }
      if (this.params.visible != null) {
        this.visible = this.params.visible;
      }
    };
    // * Наследники создают свои элементы в этом методе
    _._createContent = function() {}; // * EMPTY
    
    // * Сброс позиции
    _._resetPosition = function() {
      var e, x, y;
      if (this.params.position == null) {
        return;
      }
      try {
        ({x, y} = this.params.position);
        if (isFinite(x) && isFinite(y)) {
          x = Number(x);
          y = Number(y);
        } else {
          x = Number(eval(x));
          y = Number(eval(y));
        }
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this.move(0, 0);
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIButton;
    // * Кнопка на экране, можно нажимать
    Sprite_UIButton = class Sprite_UIButton extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "Button_Inventory",
          isHaveDisabled: true,
          rootImageFolder: null, //?optional
          click: "console.log('click')" // * число или код
        };
      }

      // * Кнопка не поддерживает перерисовку
      draw() {} // * EMPTY

      disable() {
        var ref;
        return (ref = this.button) != null ? ref.disable() : void 0;
      }

      enable() {
        var ref;
        return (ref = this.button) != null ? ref.enable() : void 0;
      }

      setState(isEnabled) {
        if (isEnabled) {
          return this.enable();
        } else {
          return this.disable();
        }
      }

      
        // * Просто вызов метода
      call() {
        var ref;
        return (ref = this.button) != null ? ref.click() : void 0;
      }

      // * Вызов метода с симуляцией нажатия
      click() {
        var ref, ref1;
        if ((ref = this.button) != null) {
          ref.click();
        }
        return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
      }

    };
    KDCore.UI.Sprite_UIButton = Sprite_UIButton;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIButton.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.image.isEmpty()) {
        KDCore.warning('You try create Button without image');
        return;
      }
      this.button = new KDCore.ButtonM(this.params.image, this.params.isHaveDisabled, this.rootImageFolder());
      this.add(this.button);
      return this._registerClickMethod();
    };
    _._registerClickMethod = function() {
      var commonEventId, e, method, ref, script;
      if (!String.any(this.params.click)) {
        return;
      }
      method = null;
      try {
        // * Если число, то значит общее событие
        if (isFinite(this.params.click)) {
          commonEventId = parseInt(this.params.click);
          if (commonEventId > 0) {
            method = function() {
              return $gameTemp.reserveCommonEvent(commonEventId);
            };
          }
        } else {
          // * Иначе скрипт
          script = this.params.click;
          method = function() {
            return eval(script);
          };
        }
        return this.button.addClickHandler(method);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Рисует лицо персонажа (из папки Faces)
    var Sprite_UIFace;
    Sprite_UIFace = class Sprite_UIFace extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          faceName: "Actor1",
          faceIndex: 0,
          mirror: false,
          size: 144
        };
      }

      draw() {
        return this.drawFace(...arguments);
      }

      drawFace(faceName, faceIndex) {
        return this._drawFaceWhenReady(faceName, faceIndex);
      }

    };
    KDCore.UI.Sprite_UIFace = Sprite_UIFace;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIFace.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createFaceSprite();
    };
    _._createFaceSprite = function() {
      this._faceSpr = KDCore.Sprite.FromBitmap(this.params.size);
      if (this.params.mirror === true) {
        this._flipFaceSpr();
      }
      this.add(this._faceSpr);
      this._drawFaceWhenReady(this.params.faceName, this.params.faceIndex);
    };
    _._flipFaceSpr = function() {
      this._faceSpr.scale.x = -1;
      this._faceSpr.x = this.params.size;
    };
    _._drawFaceWhenReady = function(name, index = 0) {
      var ref;
      if ((ref = this._faceSpr) != null) {
        ref.clear();
      }
      if (!String.any(name)) {
        return;
      }
      if (index < 0) {
        return;
      }
      this._drawOnReady = {name, index};
      this._faceSourceBitmap = ImageManager.loadFace(name);
      this._faceSourceBitmap.addLoadListener(this._drawFace.bind(this));
      this._drawFace();
    };
    _._drawFace = function() {
      var fh, fw, size, sx, sy;
      if (this._faceSpr == null) {
        return;
      }
      this._faceSpr.clear();
      if (!String.any(this._drawOnReady.name)) {
        return;
      }
      if (KDCore.isMZ()) {
        fw = ImageManager.faceWidth;
        fh = ImageManager.faceHeight;
      } else {
        fw = Window_Base._faceWidth;
        fh = Window_Base._faceHeight;
      }
      size = this.params.size;
      sx = (this._drawOnReady.index % 4) * fw;
      sy = Math.floor(this._drawOnReady.index / 4) * fh;
      this._faceSpr.bitmap.blt(this._faceSourceBitmap, sx, sy, fw, fh, 0, 0, size, size);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //TODO: ROOT IMAGE FOLDER AS PARAMETER!!!
    var Sprite_UIGauge;
    Sprite_UIGauge = class Sprite_UIGauge extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          fill: "",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawGauge(...arguments);
      }

      drawGauge(percent = 1) {
        this._lastValue = percent;
        return this._drawGauge(percent);
      }

      isVertical() {
        return this.params.vertical === true;
      }

    };
    KDCore.UI.Sprite_UIGauge = Sprite_UIGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIGauge.prototype;
    //$[OVER]
    _._createContent = function() {
      // * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
      return this._loadFillImage();
    };
    _._loadFillImage = function() {
      // * Главное изображение, поэтому если не указано, то ничего
      if (this.params.fill.isEmpty()) {
        KDCore.warning('You try create Gauge without fill image');
        return;
      }
      KDCore.Utils.loadImageAsync(this.rootImageFolder(), this.params.fill).then(this._createParts.bind(this));
    };
    // * Получаем изображение заполнения и создаём части (т.к. есть размеры)
    _._createParts = function(fillBitmap) {
      this.fillBitmap = fillBitmap;
      this._createBackground();
      this._createFillLayer();
      this._loadForeground();
      this._loadMask();
      return this._onReady();
    };
    _._createBackground = function() {
      this.background = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      this.background.b().fillAll(this.params.backColor);
      this.background.opacity = this.params.backOpacity;
      return this.add(this.background);
    };
    _._createFillLayer = function() {
      this.fillLayer = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      return this.add(this.fillLayer);
    };
    _._loadForeground = function() {
      var fore;
      if (String.isNullOrEmpty(this.params.foreground)) {
        return;
      }
      fore = KDCore.Sprite.FromImg(this.params.foreground, this.rootImageFolder());
      return this.add(fore);
    };
    _._loadMask = function() {
      var mask;
      if (String.isNullOrEmpty(this.params.mask)) {
        return;
      }
      mask = KDCore.Sprite.FromImg(this.params.mask, this.rootImageFolder());
      this.mask = mask;
      return this.add(mask);
    };
    // * Если что-то было до готовности, нарисовать
    _._onReady = function() {
      this.drawGauge(this._lastValue);
    };
    _._drawGauge = function(percent) {
      if (this.fillLayer == null) {
        return;
      }
      this.fillLayer.clear();
      if (this.isVertical()) {
        return this._drawVerGauge(percent);
      } else {
        return this._drawHorGauge(percent);
      }
    };
    _._drawHorGauge = function(percent) {
      var w;
      w = this.fillBitmap.width * percent;
      return this.fillLayer.b().blt(this.fillBitmap, 0, 0, w, this.fillLayer.height, 0, 0);
    };
    _._drawVerGauge = function(percent) {
      var h, hy;
      h = this.fillBitmap.height * percent;
      hy = this.fillBitmap.height - h;
      this.fillLayer.b().blt(this.fillBitmap, 0, 0, this.fillLayer.width, h, 0, hy);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIIcon;
    Sprite_UIIcon = class Sprite_UIIcon extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          index: 0,
          size: 32,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawIcon(...arguments);
      }

      drawIcon(index = 0, noSmoth = false) {
        this._lastValue = index;
        return this._drawIcon(index, noSmoth);
      }

    };
    KDCore.UI.Sprite_UIIcon = Sprite_UIIcon;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIIcon.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createIcon();
      return this._drawIcon(this.params.index);
    };
    _._createIcon = function() {
      this._icon = KDCore.Sprite.FromBitmap(this.params.size, this.params.size);
      this.add(this._icon);
      return this._onReady();
    };
    _._onReady = function() {
      return this.drawIcon(this._lastValue);
    };
    _._drawIcon = function(index, noSmoth = false) {
      this._icon.clear();
      if (KDCore.SDK.isString(index)) {
        this._drawImageIcon(index, noSmoth);
      } else {
        if (index <= 0) {
          return;
        }
        this._icon.drawIcon(0, 0, index, this.params.size, noSmoth);
      }
    };
    _._drawImageIcon = function(imageName, noSmoth = false) {
      return KDCore.Utils.loadImageAsync(this.rootImageFolder(), imageName).then((bitmap) => {
        return this._icon.drawIcon(0, 0, bitmap, this.params.size, noSmoth);
      });
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIImage;
    Sprite_UIImage = class Sprite_UIImage extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "",
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawImage(...arguments);
      }

      drawImage(image) {
        return this._drawImage(image);
      }

    };
    KDCore.UI.Sprite_UIImage = Sprite_UIImage;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIImage.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._drawImage(this.params.image);
    };
    _._drawImage = function(image) {
      this._clearImage();
      if (!String.isNullOrEmpty(image)) {
        this._image = KDCore.Sprite.FromImg(image, this.rootImageFolder());
        this.add(this._image);
      }
    };
    _._clearImage = function() {
      if (this._image == null) {
        return;
      }
      this._image.visible = false;
      this.removeChild(this._image);
      return this._image = null;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIRect;
    Sprite_UIRect = class Sprite_UIRect extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          fillColor: "#FFFFFF".toCss(),
          fillOpacity: 255,
          borderColor: "#000000".toCss(),
          borderThickness: 1,
          borderOpacity: 255
        };
      }

      draw() {
        return this.fill(...arguments);
      }

      fill(color, opacity = 255) {
        return this._fill(color, opacity);
      }

      drawBorder(color, thickness = 1, opacity = 255) {
        return this._drawBorder(color, thickness, opacity);
      }

    };
    KDCore.UI.Sprite_UIRect = Sprite_UIRect;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIRect.prototype;
    //$[OVER]
    _._createContent = function() {
      if (String.any(this.params.fillColor)) {
        this._createFill();
        this.fill(this.params.fillColor, this.params.fillOpacity);
      }
      if (String.any(this.params.borderColor) && this.params.borderThickness > 0) {
        this._createBorder();
        return this.drawBorder(this.params.borderColor, this.params.borderThickness, this.params.borderOpacity);
      }
    };
    _._createFill = function() {
      this._fillSpr = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._fillSpr);
    };
    _._createBorder = function() {
      this._borderSprite = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._borderSprite);
    };
    _._fill = function(color, opacity) {
      if (this._fillSpr == null) {
        return;
      }
      this._fillSpr.fillAll(color);
      this._fillSpr.opacity = opacity;
    };
    _._drawBorder = function(color, thickness, opacity) {
      var b;
      if (this._borderSprite == null) {
        return;
      }
      this._borderSprite.clear();
      b = this._borderSprite.b();
      // * Top line
      b.fillRect(0, 0, b.width, thickness, color);
      // * Bottom line
      b.fillRect(0, b.height - thickness, b.width, thickness, color);
      // * Left line
      b.fillRect(0, 0, thickness, b.height, color);
      // * Right line
      b.fillRect(b.width - thickness, 0, thickness, b.height, color);
      return this._borderSprite.opacity = opacity;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 17.11.22
    var Sprite_UIText;
    Sprite_UIText = class Sprite_UIText extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#FFFFFF".toCss(),
          // ? can be Null or not exists
          shadow: {
            color: "#000",
            opacity: 200,
            margins: {
              x: 1,
              y: 1
            }
          }
        };
      }

      //?DYNAMIC
      // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
      drawText(text) {
        return this._drawTextWhenReady(text);
      }

      // * Сборка текста с учётом формата
      // * Заменить вхождения %1, %2 на значения параметров
      drawTextWithFormat(/*format string, arguments parameters... */) {
        var text;
        text = this._convertFormatedString(...arguments);
        this.drawText(text);
      }

      // * Пишет текст с определённым цветом (один раз)
      drawTextColor(text, colorCss) {
        if (this._textSpr == null) {
          return;
        }
        this._textSpr.b().textColor = colorCss;
        this.drawText(text);
        this._textSpr.b().textColor = this.params.textColor;
      }

    };
    KDCore.UI.Sprite_UIText = Sprite_UIText;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIText.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.shadow != null) {
        this._createShadow();
      }
      return this._createTextSprite();
    };
    _._createTextSprite = function() {
      this._textSpr = KDCore.Sprite.FromParams(this.params);
      this._textSpr.onReady(this._onReady.bind(this));
      return this.add(this._textSpr);
    };
    // * Выполнить по готовности
    _._onReady = function() {
      // * Переключить метод, так как уже готов
      this.drawText = this._drawText;
      // * Написать то что нужно было до готовности (если есть)
      if (this._drawOnReady == null) {
        return;
      }
      this.drawText(this._drawOnReady);
      this._drawOnReady = null;
    };
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      if (text != null) {
        this._textSpr.drawTextFull(text);
      }
      if (this._shadowSpr != null) {
        this._shadowSpr.clear();
        if (text != null) {
          this._shadowSpr.drawTextFull(text);
        }
      }
    };
    // * Написать текст когда будет готов
    _._drawTextWhenReady = function(text) {
      this._drawOnReady = text;
      return this._drawText(text);
    };
    
    // * Заменить вхождения %1, %2 на значения параметров
    _._convertFormatedString = function(/*text, args...*/) {
      var e, i, j, ref, text;
      try {
        text = arguments[0];
        for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
          try {
            if (arguments[i] == null) {
              continue;
            }
            text = text.replace("%" + i, arguments[i]);
          } catch (error) {
            e = error;
            KDCore.warning(e);
            text = "[wrong format text input]";
          }
        }
        return text;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return "[wrong format text input]";
      }
    };
    _._createShadow = function() {
      this._shadowSpr = KDCore.Sprite.FromParams(this.params);
      this._shadowSpr.bitmap.textColor = this.params.shadow.color;
      this._shadowSpr.opacity = this.params.shadow.opacity;
      this._shadowSpr.x += this.params.shadow.margins.x;
      this._shadowSpr.y += this.params.shadow.margins.y;
      return this.add(this._shadowSpr);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 30.12.21
    var Sprite_UITextExt;
    Sprite_UITextExt = class Sprite_UITextExt extends KDCore.UI.Sprite_UIText {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 200,
            h: 60
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          // * новые параметры (KDCore 2.7)
          //?null могут быть
          singleLine: false,
          forceCentered: false
        };
      }

      //$[OVER]
      // * Данный метод не поддерживается, так как тут основа не Sprite, а Window
      drawTextColor() {
        return this.drawText(...arguments);
      }

    };
    KDCore.UI.Sprite_UITextExt = Sprite_UITextExt;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextExt.prototype;
    //$[OVER]
    _._createTextSprite = function() {
      var rect;
      rect = new Rectangle(0, 0, this.params.size.w, this.params.size.h);
      this._textSpr = new KDCore.Window_ExtTextLineBase(rect, this.params.font);
      this._textSpr.x = this.params.margins.x || 0;
      this._textSpr.y = this.params.margins.y || 0;
      this.add(this._textSpr);
      // * На следующий кадр, чтобы не было потери текста (опасно)
      //setTimeout (=> @_onReady() ), 10
      this._onReady(); // * Сразу
    };
    
    //$[OVER]
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.contents.clear();
      if (this.params.forceCentered === true) {
        this._textSpr.drawTextExInCenter(text, 0, 0, this._textSpr.width, this._textSpr.height);
      } else {
        if (this.params.singleLine === true) {
          this._textSpr.drawTextEx(text, 0, 0, this._textSpr.width);
        } else {
          // * По умолчанию
          this._textSpr.drawTextExWithWordWrap(text, 0, 0, this._textSpr.width);
        }
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UITextWithBack;
    Sprite_UITextWithBack = class Sprite_UITextWithBack extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          text: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            alignment: "center",
            font: {
              face: null,
              size: 18,
              italic: false
            },
            margins: {
              x: 0,
              y: 0
            },
            outline: {
              color: null,
              width: 2
            },
            textColor: "#000000".toCss()
          },
          rect: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            fillColor: "#FFFFFF".toCss(),
            fillOpacity: 255,
            borderColor: "#000000".toCss(),
            borderThickness: 1,
            borderOpacity: 255
          },
          textMargins: {
            x: 0,
            y: 0
          }
        };
      }

      draw() {
        return this.drawText(...arguments);
      }

      // * Aргументы смотри в Sprite_UIText
      drawText() {
        return this.text.draw(...arguments);
      }

      drawTextColor() {
        return this.text.drawTextColor(...arguments);
      }

      // * Аргументы смотри в Sprite_UIRect
      fill() {
        return this.rect.fill(...arguments);
      }

      drawBorder() {
        return this.rect.drawBorder(...arguments);
      }

      //$[OVER]
      isUnderMouse() {
        return this.rect.isUnderMouse();
      }

    };
    KDCore.UI.Sprite_UITextWithBack = Sprite_UITextWithBack;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextWithBack.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createRect();
      return this._createText();
    };
    _._createRect = function() {
      this.rect = new KDCore.UI.Sprite_UIRect(this.params.rect);
      return this.addChild(this.rect);
    };
    _._createText = function() {
      var x, y;
      this.text = new KDCore.UI.Sprite_UIText(this.params.text);
      ({x, y} = this.params.textMargins);
      this.text.move(x, y);
      return this.addChild(this.text);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIColorGauge;
    Sprite_UIColorGauge = class Sprite_UIColorGauge extends KDCore.UI.Sprite_UIGauge {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 100,
            h: 40
          },
          fill: "#FFFFFF", // * В отличии от Gauge, тут цвет, а не картинка
          foreground: "", // картинка
          mask: "", // картинка
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

    };
    KDCore.UI.Sprite_UIColorGauge = Sprite_UIColorGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIColorGauge.prototype;
    //$[OVER]
    // * Заместо изображения используем простой Bitmap с заливкой цвета
    _._loadFillImage = function() {
      var fillBitmap;
      fillBitmap = new Bitmap(this.params.size.w, this.params.size.h);
      fillBitmap.fillAll(this.params.fill);
      this._createParts(fillBitmap);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Данный UI Элемент является только контейнером
    // * Он ничего не рисует, нужно добавлять в него
    // * контент методом addContent

    //rev 17.11.22
    var Sprite_UITooltip;
    Sprite_UITooltip = class Sprite_UITooltip extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
        this.opacity = 0;
      }

      isTooltipActive() {
        return (this._opThread != null) || (this._opChanger != null) || this.opacity > 0;
      }

      activateTooltip(x, y, parent) {
        if (this.isTooltipActive()) {
          return;
        }
        this.deactivateTooltip();
        this.move(x, y);
        this._opThread = new KDCore.TimedUpdate(this.params.delay, this.showTooltip.bind(this));
        if (!this.params.isGlobal && (parent != null)) {
          parent.addChild(this);
        } else {
          // * Always on Top on Scene  (if Global)
          SceneManager._scene.addChild(this);
        }
      }

      deactivateTooltip() {
        this._opThread = null;
        this._opChanger = null;
        return this.opacity = 0;
      }

      showTooltip() {
        this._opThread = null;
        this.appear(this.params.opacityChangeStep);
        if (this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      update() {
        var ref;
        super.update();
        if ((ref = this._opThread) != null) {
          ref.update();
        }
        if (this.isTooltipActive() && this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          delay: 30,
          opacityChangeStep: 35,
          margins: {
            x: 8,
            y: 8
          },
          isGlobal: true,
          cursorRelative: true
        };
      }

      toCursor() {
        var x, y;
        ({x, y} = this.params.margins);
        return this.move(TouchInput.x + x, TouchInput.y + y);
      }

      // * Основной метод, нужно добавить контент
      addContent(content) {
        return this.add(content);
      }

    };
    KDCore.UI.Sprite_UITooltip = Sprite_UITooltip;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITooltip.prototype;
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__processEscapeCharacter, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case 'CHEX':
        this.pProcessColorChangeHex(this.pObtainEscapeParamHexColor(textState));
        break;
      case 'ISZ':
        this.pProcessDrawIconSized(this.pObtainEscapeParamIconArr(textState), textState);
        break;
      case 'PSZ':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, false);
        break;
      case 'PSB':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, true);
        break;
      default:
        ALIAS__processEscapeCharacter.call(this, code, textState);
    }
  };
  //?NEW
  _.pObtainEscapeParamHexColor = function(textState) {
    var arr, regExp, textPart;
    regExp = /^\[(#?([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
  //?NEW
  _.pObtainEscapeParamIconArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          return parseInt(i.trim());
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pObtainEscapeParamImgArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\w+,\s*\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          if (isFinite(i)) {
            return parseInt(i.trim());
          } else {
            return i;
          }
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pProcessColorChangeHex = function(colorHex) {
    var e;
    try {
      this.changeTextColor(colorHex);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.resetTextColor();
    }
  };
  //?NEW
  //?params: [INDEX, SIZE, DX, DY]
  _.pProcessDrawIconSized = function(params, textState) {
    var dx, dy, e, iconIndex, size, staticMargin, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      size = params[1];
      if (params[1] == null) {
        if (KDCore.isMZ()) {
          size = ImageManager.iconWidth;
        } else {
          size = Window_Base._iconWidth;
        }
      }
      if (params[2] == null) {
        params[2] = 0;
      }
      if (params[3] == null) {
        params[3] = 0;
      }
      iconIndex = params[0];
      dx = params[2];
      dy = params[3];
      staticMargin = 2;
      x = textState.x + staticMargin + dx;
      y = textState.y + staticMargin + dy;
      if (KDCore.isMZ()) {
        if (textState.drawing === true) {
          // * Только в режиме рисования
          this.contents.drawIcon(x, y, iconIndex, size);
        }
      } else {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //?NEW
  //?params: [NAME, W, H, DX, DY]
  _.pProcessDrawPictureSized = function(params, textState, isUnderText = false) {
    var drawBitmap, drawProcess, e, height, name, source, width, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      name = params[0];
      if (!String.any(name)) {
        return;
      }
      width = params[1];
      height = params[2];
      if (params[3] == null) {
        params[3] = 0;
      }
      if (params[4] == null) {
        params[4] = 0;
      }
      x = textState.x + 2 + params[3];
      y = textState.y + 2 + params[4];
      drawBitmap = this.contents;
      source = this.pGetSourceImageForDrawPictureSized(name);
      if ((KDCore.isMZ() && textState.drawing === true) || KDCore.isMV()) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        source.addLoadListener(drawProcess);
      }
      if (isUnderText !== true) {
        // * Вариант, что текст не будет "перескакивать" за ширину картинки а пойдёт поверх (т.е. фоновая картинка)
        // * Если картине не preload, то может "вылезти" на текст потом, так как рисоваться будет позже
        textState.x += width + 4 + params[3];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  return _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
});


// Generated by CoffeeScript 2.6.1



// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var FloatingWindow;
  
    // * Общий класс для всех окон на карте
  /*parameters
      {
          draggable: true,
          closeButton: true,
          moveToCenter: true,
          alwaysOnTop: true,
          header: true
      }
  */
  FloatingWindow = class FloatingWindow extends KDCore.Sprite {
    constructor(mainParent, windowW, windowH, parameters) {
      super();
      this.mainParent = mainParent;
      this.windowW = windowW;
      this.windowH = windowH;
      this.parameters = parameters;
      this._init();
      return;
    }

    static StaticSettings() {
      return {
        draggable: false,
        closeButton: false,
        moveToCenter: false,
        alwaysOnTop: false,
        header: false
      };
    }

    // * Статическое окно с дочерним
    static StaticWindow(parent, sub) {
      var p, w;
      p = KDCore.FloatingWindow.StaticSettings();
      w = new KDCore.FloatingWindow(parent, sub.width, sub.height, p);
      w.setSubWindow(sub);
      w.open();
      return w;
    }

    isActive() {
      return this.visible === true;
    }

    isReady() {
      return this._isReady === true;
    }

    isMouseIn() {
      return this.inPosition(TouchInput);
    }

    isOpen() {
      return this.isActive();
    }

    // * Дочернее окно (если есть)
    sub() {
      return this._subw;
    }

    setOnReadyHandler(_readyHandler) {
      this._readyHandler = _readyHandler;
      if ((this._readyHandler != null) && this._isReady === true) {
        return this._readyHandler();
      }
    }

    isDraggable() {
      return this._isDraggable === true && (this._headerSpr != null) && this._headerSpr.visible === true && this.isOpen();
    }

    setCloseHandler(_closeHandler) {
      this._closeHandler = _closeHandler;
    }

    callCloseHandler() {
      if (this._closeHandler != null) {
        return this._closeHandler();
      }
    }

    setDraggingHandler(_dragHandler) {
      this._dragHandler = _dragHandler;
    }

    setDragEndHandler(_dragEndHandler) {
      this._dragEndHandler = _dragEndHandler;
    }

    hideHeader() {} //TODO:

    hideCloseButton() {} //TODO:

    
      // * Сдвиг заголовка по X, чтобы рамку не задевал
    headerMarginX() {
      return 2;
    }

    // * Сдвиг заголовка по Y, чтобы рамку не задевал
    headerMarginY() {
      return 0;
    }

    // * Стандартная позиция кнопки "закрыть"
    closeButtonPosition() {
      return {
        x: this.width - 24,
        y: 4
      };
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      this._open();
      this._afterOpen();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      this._close();
      this._afterClose();
    }

    rootImageFolder() {
      return "Alpha/Windows";
    }

    update() {
      super.update();
      this._updateMouseCheckThread();
      this._updateDragging();
    }

    // * Добавить спрайт на специальный слой контента
    addContent(sprite) {
      return this._contentLayer.addChild(sprite);
    }

    // * Добавить дочернее окно
    setSubWindow(w) {
      this._subw = w;
      this.addContent(w);
    }

    destroy() {
      this._close();
      return Sprite.prototype.destroy.call(this);
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = FloatingWindow.prototype;
    _._init = function() {
      var ref;
      // * Окно всегда закрыто
      this.visible = false;
      // * Контент прогрузился?
      this._isReady = false;
      this._applyParameters();
      if (this._isAlwaysOnTop === false) {
        // * Если не всегда поверх окон, то добавляем сразу к родителю (один раз)
        if ((ref = this.mainParent) != null) {
          ref.addChild(this);
        }
      }
      this._initFloatingSystem();
      this._createLayers();
      this._loadWindowFrame();
    };
    // * Тут ничего не создавать, не двигать, так как
    // * конент создаётся Async, см. метод _createCustomElements
    _._applyParameters = function() {
      var p;
      this._applyDefaults();
      if (this.parameters == null) {
        return;
      }
      p = this.parameters;
      if (p.draggable != null) {
        this._isDraggable = p.draggable;
      }
      if (p.moveToCenter != null) {
        this._isMoveToCenter = p.moveToCenter;
      }
      if (p.header != null) {
        this._isHeaderVisible = p.header;
      }
      if (p.closeButton != null) {
        this._isHaveCloseButton = p.closeButton;
      }
      if (p.alwaysOnTop != null) {
        this._isAlwaysOnTop = p.alwaysOnTop;
      }
    };
    _._applyDefaults = function() {
      // * Окно можно перетаскивать мышкой (по умолчанию - да)
      this._isDraggable = true;
      this._isMoveToCenter = true;
      this._isHeaderVisible = true;
      this._isHaveCloseButton = true;
      this._isAlwaysOnTop = true;
    };
    _._initFloatingSystem = function() {
      if ($gameTemp._floatingWindows == null) {
        // * Создаём массив окон, он нужен для правильного
        // закрытия окон (по очереди) и перемещения drag and drop
        // с учётом верхнего окна
        $gameTemp._floatingWindows = [];
      }
      // * Вспомогательная переменная, чтобы не вызывать методы каждый кадр
      this._mouseIn = false;
      // * Тоже вспомогательная переменная
      this._dragging = false;
    };
    _._moveToStartPosition = function() {
      if (this._isMoveToCenter === true) {
        return this.moveToCenter(Graphics.width / 2, Graphics.height / 2);
      }
    };
    _._closeButtonClick = function() {
      // * При исчезании, кнопка не успевает себя "удалить"
      $gameTemp.kdButtonUnderMouse = null;
      this.callCloseHandler();
      return this.close();
    };
    (function() {      // * DRAGGING
      // -----------------------------------------------------------------------
      _._updateDragging = function() {
        if (!this.isDraggable()) {
          return;
        }
        // * Если мы уже двигаем окно, но мышка вышла за границы, то можно дальше двигать
        // * Только если мышка не в окне и не двигали ранее, то не проверяем
        if (this._mouseIn === false && this._dragging === false) {
          return;
        }
        // * Если существует объект который сейчас dragging
        if ($gameTemp.pkdDraggableInstance != null) {
          // * Если этот объект не этот объект, то выходим из метода
          if ($gameTemp.pkdDraggableInstance !== this) {
            return;
          }
        }
        if (TouchInput.isLongPressed()) {
          if (this._dragging === false) {
            this._onDragStart();
          } else {
            this._onDragging();
          }
        } else {
          this._stopDragging();
        }
      };
      _._onDragStart = function() {
        // * Проверка, в области Header или нет
        if (!this._isMouseInHeader()) {
          return;
        }
        // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
        this.opacity = 200;
        this._deltaXY = this.getDeltaXY();
        this._dragging = true;
        // * Устанавливаем глобальную ссылку на объект перемещения
        $gameTemp.pkdDraggableInstance = this;
      };
      _.getDeltaXY = function() {
        var p;
        p = new KDCore.Point(this.x, this.y);
        return p.delta(TouchInput);
      };
      _._onDragging = function() {
        // * Защита от перетаскивания за края экрана
        if (!this._isNewMousePositionOnScreen()) {
          return;
        }
        this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
        if (this._dragHandler != null) {
          return this._dragHandler();
        }
      };
      _._stopDragging = function() {
        if (this._dragging === true) {
          this._dragging = false;
          this.opacity = 255;
          this._clearDraggableGlocalInstance();
          if (this._dragEndHandler != null) {
            this._dragEndHandler();
          }
        }
      };
      // * Освобождаем глобальную ссылку
      _._clearDraggableGlocalInstance = function() {
        if ($gameTemp.pkdDraggableInstance === this) {
          return $gameTemp.pkdDraggableInstance = null;
        }
      };
      _._isMouseInHeader = function() {
        if (this._headerSpr == null) {
          return false;
        }
        return this._headerSpr.isContainsPoint(TouchInput);
      };
      _._isNewMousePositionOnScreen = function() {
        return KDCore.Utils.isPointInScreen(TouchInput, 10);
      };
    })();
    (function() {      // -----------------------------------------------------------------------

      // * CREATE ELEMENTS
      // -----------------------------------------------------------------------
      
      // * Слои нужны, так как изображения загружаються асинхронно
      _._createLayers = function() {
        this._mainLayer = new Sprite();
        this._contentLayer = new Sprite();
        this._headerLayer = new Sprite();
        this._closeButtonLayer = new Sprite();
        this.addChild(this._mainLayer);
        this.addChild(this._contentLayer);
        this.addChild(this._headerLayer);
        this.addChild(this._closeButtonLayer);
      };
      _._loadWindowFrame = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "windowFrame").then(this._createWindow.bind(this));
      };
      _._createWindow = function(frameImage) {
        this.bitmap = new Bitmap(this.windowW, this.windowH);
        this.wFrame = new KDCore.Sprite_TilingFrame(this.windowW, this.windowH, frameImage);
        this._mainLayer.addChild(this.wFrame);
        this._createParts();
      };
      _._createParts = function() {
        this._loadHeader();
        if (this._isHaveCloseButton === true) {
          this._createCloseButton();
        }
        this._moveToStartPosition();
        this._createCustomElements();
        // * Окно готово
        this._isReady = true;
        if (this._readyHandler != null) {
          this._readyHandler();
        }
      };
      _._loadHeader = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "headerLine").then(this._createHeader.bind(this));
      };
      _._createHeader = function(headerLineImage) {
        var w;
        w = this.windowW - (this.headerMarginX() * 2);
        this._headerSpr = new KDCore.Sprite_TilingLine(w, headerLineImage.height, headerLineImage);
        this._headerSpr.x = this.headerMarginX();
        this._headerSpr.y = this.headerMarginY();
        this._headerLayer.addChild(this._headerSpr);
        if (this._isHeaderVisible === true) {
          // * Сдвигаем контент, чтобы было начало под заголовком
          this._contentLayer.y += headerLineImage.height + this.headerMarginY();
        } else {
          this._headerSpr.visible = false;
        }
      };
      _._createCloseButton = function() {
        this._closeButton = new KDCore.ButtonM("windowCloseButton", false, this.rootImageFolder());
        this._closeButtonLayer.addChild(this._closeButton);
        this._closeButton.move(this.closeButtonPosition());
        this._closeButton.addClickHandler(this._closeButtonClick.bind(this));
      };
      //%[FOR CHILDRENS]
      // * Наследники создают свои элементы в этом методе
      // * Есть специальный метод addContent()
      _._createCustomElements = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * MOUSE
      // -----------------------------------------------------------------------
      
      // * Определение если мышка в области окна
      //TODO: Есть проблема при открытии окна сразу под курсором
      _._registerMouseInOut = function() {
        if (!this.isOpen()) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._mouseIn === false) {
            this._mouseIn = true;
            this._onMouseIn();
          }
        } else {
          if (this._mouseIn === true) {
            this._mouseIn = false;
            this._onMouseOut();
          }
        }
      };
      // * Используется похожая система что и в KDCore.ButtonM
      _._onMouseIn = function() {
        return $gameTemp.floatingWindowUnderMouse = this;
      };
      _._onMouseOut = function() {
        if ($gameTemp.floatingWindowUnderMouse === this) {
          return $gameTemp.floatingWindowUnderMouse = null;
        }
      };
      // * Будем проверять мышка ли в окне только при открытом окне
      _._createMouseCheckThread = function() {
        this._mouseCheckThread = new KDCore.TimedUpdate(1, this._registerMouseInOut.bind(this));
        this._updateMouseCheckThread = () => {
          return this._mouseCheckThread.update();
        };
        return this._mouseCheckThread.call();
      };
      // * Когда окно закрывается, никаких проверок, обнуляем метод
      _._destroyMouseCheckThread = function() {
        this._mouseCheckThread = null;
        return this._updateMouseCheckThread = function() {};
      };
      //?DYNAMIC
      _._updateMouseCheckThread = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * OPEN OR CLOSE
      // -----------------------------------------------------------------------
      _._open = function() {
        var ref, ref1;
        this.visible = true;
        if ((ref = $gameTemp._floatingWindows) != null) {
          ref.push(this);
        }
        if (this._isAlwaysOnTop === true) {
          // * Окно, которое открывается, всегда снова выше остальных (опция)
          if ((ref1 = this.mainParent) != null) {
            ref1.addChild(this);
          }
        }
        return this._createMouseCheckThread();
      };
      _._afterOpen = function() {}; // * EMPTY
      _._close = function() {
        this.visible = false;
        if (this._isAlwaysOnTop === true) {
          this.removeFromParent();
        }
        this._clearDraggableGlocalInstance();
        $gameTemp._floatingWindows.delete(this);
        this._onMouseOut();
        return this._destroyMouseCheckThread();
      };
      _._afterClose = function() {}; // * EMPTY
    })();
  })();
  (function() {    // ■ END PRIVATE.coffee
    //---------------------------------------------------------------------------

    // * Если окно под курсором, нельзя нажимать на карте для движения игрока
    // -----------------------------------------------------------------------
    (function() {      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ Scene_Map.coffee
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var ALIAS__isAnyButtonPressed, ALIAS__processMapTouch, _;
      
      //@[DEFINES]
      _ = Scene_Map.prototype;
      if (KDCore.isMZ()) {
        //@[ALIAS]
        ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
        _.isAnyButtonPressed = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return true;
          } else {
            return ALIAS__isAnyButtonPressed.call(this);
          }
        };
      } else {
        //@[ALIAS]
        ALIAS__processMapTouch = _.processMapTouch;
        _.processMapTouch = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return;
          }
          return ALIAS__processMapTouch.call(this);
        };
      }
    })();
  })();
  //@[EXTEND]
  // ■ END Scene_Map.coffee
  //---------------------------------------------------------------------------
  return KDCore.FloatingWindow = FloatingWindow;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var HUI;
  // * Html UI Manager
  // * Набор инструментов для работы с HTML элементами интерфейса
  HUI = function() {};
  (function() {
    var _;
    //@[DEFINES]
    _ = HUI;
    _.init = function() {
      // * Данный набор инструментов могут использовать многие плагины, поэтому проверка
      if (this.isInited()) {
        return;
      }
      this._createMainParentInHtml();
      this._extendGraphicsClass();
      this.refresh();
    };
    // * Был ли создан (инициализирован) основной элемент
    _.isInited = function() {
      return this.parent() != null;
    };
    // * Основной элемент родитель для всех элементов UI
    _.parent = function() {
      return this._parent;
    };
    _.refresh = function() {
      if (!this.isInited()) {
        return;
      }
      Graphics._centerElement(this._parent);
      this._parent.style.zIndex = 2;
      this._parent.style.width = Graphics._canvas.style.width;
      this._parent.style.height = Graphics._canvas.style.height;
    };
    _.addCSS = function(name, folder = "css") {
      var head;
      if (!this.isInited()) {
        this.init();
      }
      head = document.getElementsByTagName("head")[0];
      if (head != null) {
        head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"$0/$1.css\" />".replace("$0", folder).replace("$1", name));
      }
    };
    _.addElement = function(id, html, classes = null) {
      var cls, element, i, len;
      if (!this.isInited()) {
        this.init();
      }
      element = document.createElement("div");
      element.id = id;
      element.innerHTML = html;
      if (classes != null) {
        for (i = 0, len = classes.length; i < len; i++) {
          cls = classes[i];
          element.classList.add(cls);
        }
      }
      this._parent.appendChild(element);
      return element;
    };
    // * Может быть NULL
    _.getElement = function(id) {
      return document.getElementById(id);
    };
    _.removeElement = function(element) {
      if (element == null) {
        return;
      }
      if (KDCore.SDK.isString(element)) {
        this.removeElementById(element);
      } else {
        this.removeElementById(element.id);
      }
    };
    _.removeElementById = function(elementId) {
      var element;
      if (!this.isInited()) {
        return;
      }
      element = this.getElement(elementId);
      if (element != null) {
        this._parent.removeChild(element);
      }
    };
    // * PRIVATE ------------------------------------------------------------------
    _._createMainParentInHtml = function() {
      this._parent = document.createElement("div");
      this._parent.id = "KDCoreMain";
      document.body.appendChild(this._parent);
    };
    _._extendGraphicsClass = function() {
      var ALIAS___updateCanvas;
      //@[ALIAS]
      ALIAS___updateCanvas = Graphics._updateCanvas;
      Graphics._updateCanvas = function() {
        ALIAS___updateCanvas.call(this);
        return KDCore.HUI.refresh();
      };
    };
  })();
  //@[EXTEND]
  return KDCore.HUI = HUI;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
  // * Right mouse pressed
  // * Определение когда правая (вторая) кнопка мыши зажата и удерживается

  //@[DEFINES]
  _ = TouchInput;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    this._kdMousePressed2 = false;
    this._kdPressedTime2 = 0;
  };
  //@[ALIAS]
  ALIAS___onRightButtonDown = _._onRightButtonDown;
  _._onRightButtonDown = function(event) {
    var check;
    ALIAS___onRightButtonDown.call(this, event);
    // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
    if (KDCore.isMZ()) {
      check = this._newState.cancelled === true;
    } else {
      check = this._events.cancelled === true;
    }
    if (check === true) {
      this._kdMousePressed2 = true;
      this._kdPressedTime2 = 0;
    }
  };
  //@[ALIAS]
  ALIAS___onMouseUp = _._onMouseUp;
  _._onMouseUp = function(event) {
    ALIAS___onMouseUp.call(this, event);
    if (event.button === 2) {
      this._kdMousePressed2 = false;
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.kdIsPressed2()) {
      return this._kdPressedTime2++;
    }
  };
  //?[NEW]
  return _.kdIsPressed2 = function() {
    return this._kdMousePressed2 === true;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Методы из RPG Maker MZ которых нет в RPG Maker MV
  if (KDCore.isMZ()) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Scene_Base.prototype;
    _.calcWindowHeight = function(numLines, selectable) {
      if (selectable === true) {
        return Window_Selectable.prototype.fittingHeight(numLines);
      } else {
        return Window_Base.prototype.fittingHeight(numLines);
      }
    };
  })();
  (function() {    // ■ END Scene_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    _.itemLineRect = function(index) {
      return this.itemRect(index);
    };
  })();
  (function() {    // ■ END Window_Selectable.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, ALIAS__processEscapeCharacter, _;
    //@[DEFINES]
    _ = Window_Base.prototype;
    // * Чтоб можно было Rectangle принимать в конструктор
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(x, y, w, h) {
      if (x instanceof PIXI.Rectangle || x instanceof Rectangle) {
        return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
      } else {
        return ALIAS__initialize.call(this, ...arguments);
      }
    };
    
    // * В MZ используется FS для изменения размера шрифта в тексте
    //@[ALIAS]
    ALIAS__processEscapeCharacter = _.processEscapeCharacter;
    _.processEscapeCharacter = function(code, textState) {
      if (code === "FS") {
        this.contents.fontSize = this.obtainEscapeParam(textState);
      } else {
        ALIAS__processEscapeCharacter.call(this, code, textState);
      }
    };
  })();
  (function() {    // ■ END Window_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Spriteset_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Spriteset_Map.prototype;
    _.findTargetSprite = function(target) {
      return this._characterSprites.find(function(sprite) {
        return sprite.checkCharacter(target);
      });
    };
  })();
  return (function() {    // ■ END Spriteset_Map.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Sprite_Character.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Sprite_Character.prototype;
    _.checkCharacter = function(character) {
      return this._character === character;
    };
  })();
});

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_SM_processMapTouch, alias_TIOMM;
  //?SMouse better alternative
  if (KDCore.isMZ()) {
    return;
  }
  // * Для ButtonM
  //@[ALIAS]
  alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if ($gameTemp.kdButtonUnderMouse != null) {
      if ($gameTemp.kdButtonUnderMouse.parent == null) {
        return $gameTemp.kdButtonUnderMouse = null;
      } else {

      }
    } else {
      return alias_SM_processMapTouch.call(this);
    }
  };
  //@[ALIAS]
  alias_TIOMM = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    var x, y;
    alias_TIOMM.call(this, event);
    x = Graphics.pageToCanvasX(event.pageX);
    y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      return this._onHover(x, y);
    }
  };
  
  //?NEW, from MZ
  return TouchInput._onHover = function(_x, _y) {
    this._x = _x;
    this._y = _y;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__clear, ALIAS__update, _;
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Input;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    return this._virtualButton = null;
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._virtualButton == null) {
      return;
    }
    this._latestButton = this._virtualButton;
    this._pressedTime = 0;
    return this._virtualButton = null;
  };
  return _.virtualClick = function(buttonName) {
    return this._virtualButton = buttonName;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___startLoading, _;
  // * В версии RPG Maker MZ 1.5.0 появился баг что картинки не успевают прогрузится
  // * Данный фикс, возвращает старое поведение
  if (!KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Bitmap.prototype;
  //@[ALIAS]
  ALIAS___startLoading = _._startLoading;
  return _._startLoading = function() {
    if (Utils.hasEncryptedImages()) {
      ALIAS___startLoading.call(this, ...arguments);
    } else {
      // * Это из RPG Maker MZ до версии 1.5
      this._image = new Image();
      this._image.onload = this._onLoad.bind(this);
      this._image.onerror = this._onError.bind(this);
      this._destroyCanvas();
      this._loadingState = "loading";
      this._image.src = this._url;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_WBDTEX_KDCore29122021;
  // * <center>, для RPG Maker MZ и если нету Visu Message Core
  if (KDCore.isMZ()) {
    alias_WBDTEX_KDCore29122021 = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function(text, x, y, width) {
      var e, newText;
      try {
        if (Imported.VisuMZ_1_MessageCore !== true) { // * В Visu уже есть <center>
          if (String.any(text) && text.contains("<center>")) {
            if (text[0] === "<" && text[1] === "c") { // * Должен быть в начале строки
              newText = text.replace("<center>", "");
              return this.drawTextExInCenter(newText, x, y, width);
            }
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return alias_WBDTEX_KDCore29122021.call(this, ...arguments);
    };
  }
  //?NEW
  Window_Base.prototype.drawTextExInCenter = function(text, x, y, width, height) {
    var e, newX, newY, textSize;
    try {
      if (KDCore.isMV()) { // * В MV нет поддержки данного метода
        this.drawTextEx(...arguments);
        return;
      }
      textSize = this.textSizeEx(text);
      newX = x + width / 2 - textSize.width / 2;
      if ((height != null) && height > 0) {
        newY = y + height / 2 - textSize.height / 2;
      } else {
        newY = y;
      }
      return this.drawTextEx(text, newX, newY, width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this.drawTextEx(text, x, y, width);
    }
  };
  //?NEW
  Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
    var maxWidth, wrappedText;
    this.drawTextEx("", 0, 0, 100);
    maxWidth = this.contentsWidth();
    wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
    return this.drawTextEx(wrappedText, x, y, width);
  };
  //?NEW
  return Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
    var i, j, k, l, line, lines, newLines, ref, ref1, result, spaceLeft, spaceWidth, wordWidth, wordWidthWithSpace, words;
    lines = text.split('\n');
    maxWidth = maxWidth;
    spaceWidth = this.contents.measureTextWidth(' ');
    result = '';
    newLines = 1;
    for (i = k = 0, ref = lines.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      spaceLeft = maxWidth;
      line = lines[i];
      words = line.split(' ');
      for (j = l = 0, ref1 = words.length; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        wordWidth = this.contents.measureTextWidth(words[j].replaceAll(/\\C\[\d+\]/g, ""));
        wordWidthWithSpace = wordWidth + spaceWidth;
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          if (j > 0) {
            if (maxLines === newLines) {
              return result;
            }
            result += '\n';
            newLines++;
          }
          result += words[j];
          spaceLeft = maxWidth - wordWidth;
          if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
            spaceLeft += 200;
          }
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += ' ' + words[j];
        }
      }
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
    return result;
  };
});


// Generated by CoffeeScript 2.6.1
// * Последний файл (после всех классов)
// * Загружает библиотеки
var i, len, lib, ref, text;

if (KDCore._requireLoadLibrary === true) {
  ref = KDCore[KDCore._loader];
  for (i = 0, len = ref.length; i < len; i++) {
    lib = ref[i];
    lib();
  }
  KDCore[KDCore._loader] = [];
  text = "%c  KDCore is loaded " + KDCore.Version;
  console.log(text, 'background: #222; color: #82b2ff');
}

// ==========================================================================
// ==========================================================================

//   END OF PLUGINS CORE LIBRARY
//   (Next code is this plugin code)

// ==========================================================================
// ==========================================================================

//Plugin KDCore builded by PKD PluginBuilder 2.2 - 07.08.2023

// Generated by CoffeeScript 2.6.1
window.PKD_MEW = {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PKD_MEW.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = window.PKD_MEW;
  _.Open = function() {
    var e;
    try {
      if (_.IsOpen()) {
        return;
      }
      if (KDCore.Utils.isSceneMap()) {
        return SceneManager._scene.pkdCreateMapEquipWindow();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Close = function() {
    var e;
    try {
      if (!_.IsOpen()) {
        return;
      }
      if (KDCore.Utils.isSceneMap()) {
        return SceneManager._scene.pkdDestroyMapEquipWindow();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Switch = function() {
    var e;
    try {
      if (_.IsOpen()) {
        return _.Close();
      } else {
        return _.Open();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.IsOpen = function() {
    var e;
    try {
      if (KDCore.Utils.isSceneMap()) {
        return SceneManager._scene.pkdIsMapEquipWindowOpen();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.IsPaused = function() {
    var e;
    try {
      if (!_.IsOpen()) {
        return false;
      }
      return PKD_MapEquipWindow.PP.getIsPauseGameWhenEquipWindowIsOpen();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.BackHandler = function() {
    var e, ref;
    try {
      if (!_.IsOpen()) {
        return;
      }
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      return (ref = SceneManager._scene.pMapEquipWindow) != null ? ref.backProcess() : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_MEW.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
PKD_MapEquipWindow.ExtendsForAABSZ = function() {
  var e;
  try {
    return (function() {      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ Scene_Map.coffee
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var ALIAS__onMapCancelTouchAA, _;
      
      //@[DEFINES]
      _ = Scene_Map.prototype;
      
      //@[ALIAS]
      ALIAS__onMapCancelTouchAA = _.onMapCancelTouchAA;
      _.onMapCancelTouchAA = function() {
        if (PKD_MEW.IsOpen() && $ppJson_MEW_EquipmentWindowSettings.isCloseByRightMouseClick) {
          PKD_MEW.BackHandler();
          TouchInput.clear();
          return false;
        }
        return ALIAS__onMapCancelTouchAA.call(this, ...arguments);
      };
    })();
  } catch (error) {
    // ■ END Scene_Map.coffee
    //---------------------------------------------------------------------------
    e = error;
    return KDCore.warning(e);
  }
};


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MapEquipWindow.PP;
  
  // * paramName, defaultValue
  _.getLoaderParam = function() {
    var e;
    try {
      if (this._loader == null) {
        PKD_MapEquipWindow.LoadPluginSettings();
      }
      return this._loader.getParam(...arguments);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
  //@[FUNC]
  _.getStatsList = function() {
    var allStats, e, i, len, s;
    try {
      if (this._cachedStats != null) {
        return this._cachedStats;
      } else {
        this._cachedStats = [];
        allStats = this.getDisplayedStats();
        for (i = 0, len = allStats.length; i < len; i++) {
          s = allStats[i];
          if (s == null) {
            continue;
          }
          this._cachedStats.push(s.id);
        }
        return this._cachedStats;
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //@[FUNC]
  _.getStatData = function(statId) {
    return this.getDisplayedStats().getById(statId);
  };
  _.getOpenKey = function() {
    return this.getLoaderParam('openKey', 'o');
  };
  _.getDisplayedStats = function() {
    return this.getLoaderParam('statsData', []);
  };
  _.getIsPauseGameWhenEquipWindowIsOpen = function() {
    return this.getLoaderParam('pauseGame', false);
  };
  //@[FUNC]
  _.getEquipListWindowPositionForSlotIndex = function(slotIndex) {
    return this.getEquipListWindowPositionsForSlots()[slotIndex];
  };
  _.getEquipListWindowPositionsForSlots = function() {
    return this.getLoaderParam('posForSlotsA', []);
  };
  //@[FUNC]
  _.getStatusWindowPositionForSlotIndex = function(slotIndex) {
    return this.getStatusListWindowPositionsForSlots()[slotIndex];
  };
  _.getStatusListWindowPositionsForSlots = function() {
    return this.getLoaderParam('posForSlotsB', []);
  };
})();


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_MapEquipWindow.Utils;
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDataFile, _, addToDataLoad;
  //@[DEFINES]
  _ = DataManager;
  addToDataLoad = function(filename) {
    var e, name, src;
    try {
      name = "$ppJson_MEW_" + filename;
      src = "PKD_MapEquipWindow/" + filename + ".json";
      return DataManager._databaseFiles.push({name, src});
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  addToDataLoad('StatTextElementSettings');
  addToDataLoad('EquipmentSlotsWindowSettings');
  addToDataLoad('EquipmentListWindowSettings');
  addToDataLoad('StatusWindowSettings');
  addToDataLoad('EquipmentWindowSettings');
  addToDataLoad('StatGaugeElementSettings');
  addToDataLoad('ButtonForOpenEquipmentWindow');
  addToDataLoad('ActorChangeButtons');
  addToDataLoad('ActorInfoWindowSettings');
  addToDataLoad('ActorClassTextElementSettings');
  addToDataLoad('ActorLevelExpElementSettings');
  _.pGetMEWJson = function(filename) {
    return window["$ppJson_MEW_" + filename];
  };
  //@[ALIAS]
  ALIAS__loadDataFile = _.loadDataFile;
  _.loadDataFile = function(name, src) {
    if (src.contains("MapEquipWindow")) {
      src = src.replace("Test_", "");
    }
    return ALIAS__loadDataFile.call(this, name, src);
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var FWindow_MapEquipment;

FWindow_MapEquipment = class FWindow_MapEquipment extends KDCore.FloatingWindow {
  constructor() {
    super(...arguments);
    if ($gameTemp.__pMEWAutoRefreshInterval > 0) {
      this._refreshThread = new KDCore.TimedUpdate($gameTemp.__pMEWAutoRefreshInterval, this.refreshThreadTick.bind(this));
    }
    return;
  }

  //%[MAIN, after window is loaded]
  onLoadDone() {
    var e;
    try {
      this.setActor($gameParty.leader());
      return this.open();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  setActor(_currentActor) {
    var e;
    this._currentActor = _currentActor;
    try {
      this._windowEquipSlot.setActor(this._currentActor);
      this._windowEquipSlot.refresh();
      this._windowEquipSlot.activate();
      this._windowEquipSlot.select(0);
      this._refreshListWindowForCurrentSlot();
      if (this._windowEquipsList.active) {
        this._onItemCancel();
      }
      this._windowStatus.setActor(this._currentActor);
      return this._actorInfoWindow.setActor(this._currentActor);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  rootImageFolder() {
    return "pMapEquipWindow";
  }

  closeButtonPosition() {
    return {
      x: this.width + 2,
      y: 2
    };
  }

  _moveToStartPosition() {
    var e, s;
    try {
      s = this._settings();
      this.x = eval(s.position.x);
      this.y = eval(s.position.y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.x = this.y = 0;
    }
  }

  open() {
    if (this.isOpen()) {
      return;
    }
    this._moveToStartPosition();
    return super.open();
  }

  update() {
    var ref;
    super.update();
    this._updateListWindow();
    this._updateStatusWindow();
    if ((ref = this._refreshThread) != null) {
      ref.update();
    }
  }

  _updateListWindow() {
    var e;
    try {
      if ($ppJson_MEW_EquipmentListWindowSettings.isAlwaysVisible) {
        if (this.__prevSlot !== this._windowEquipSlot.index()) {
          this.__prevSlot = this._windowEquipSlot.index();
          return this._refreshListWindowForCurrentSlot();
        }
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _updateStatusWindow() {
    var e;
    try {
      if (this._windowEquipsList.active) {
        this._windowStatus.setItemToCompare(this._windowEquipSlot.index(), this._windowEquipsList.item());
      } else {
        this._windowStatus.resetCompareMode();
      }
      return this._windowStatus.refresh();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  isItemSelectMode() {
    return this._isInItemSelectMode === true;
  }

  backProcess() {
    if (this.isItemSelectMode()) {
      return this._onItemCancel();
    } else {
      return setTimeout((function() {
        return PKD_MEW.Close();
      }), 10);
    }
  }

  _settings() {
    return $ppJson_MEW_EquipmentWindowSettings;
  }

  _init() {
    var s;
    s = this._settings();
    this.parameters = {
      draggable: false,
      closeButton: s.isHaveCloseButton,
      moveToCenter: false,
      alwaysOnTop: true,
      header: false
    };
    this._isInItemSelectMode = false;
    KDCore.FloatingWindow.prototype._init.call(this);
  }

  _createCustomElements() {
    var e;
    try {
      this._createBackgroundImage(this._settings().backgroundImage);
      this._createSlotsWindow();
      this._createItemsWindow();
      this._createStatusWindow();
      this._createActorInfoWindow();
      return this._createActorsChangeControls();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createBackgroundImage(imageName) {
    var back, e;
    try {
      if (String.any(imageName)) {
        back = new Sprite();
        back.bitmap = ImageManager.loadPictureFor_PKD_MapEquipWindow(imageName);
        this.addContent(back);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return back;
  }

  _createSlotsWindow() {
    var backImage, e, h, s, w, x, y;
    s = $ppJson_MEW_EquipmentSlotsWindowSettings;
    ({w, h} = s.size);
    ({x, y} = s.position);
    try {
      x = eval(x);
      y = eval(y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      x = 0;
      y = 0;
    }
    if (KDCore.isMZ()) {
      this._windowEquipSlot = new Window_EquipSlot(new Rectangle(x, y, w, h));
    } else {
      this._windowEquipSlot = new Window_EquipSlot(x, y, w, h);
    }
    if (s.isTransparent) {
      this._windowEquipSlot.setBackgroundType(2);
    }
    if (String.any(s.backgroundImage)) {
      backImage = this._createBackgroundImage(s.backgroundImage);
      backImage.move(x, y);
      this.addContent(backImage);
    }
    this._windowEquipSlot.setHandler('ok', this._showItemsWindow.bind(this));
    this.addContent(this._windowEquipSlot);
  }

  _showItemsWindow() {
    var e;
    try {
      this._isInItemSelectMode = true;
      this._refreshListWindowForCurrentSlot();
      this._refreshStatusWindowForCurrentItem();
      //console.log("SLOT INDEX " + @_windowEquipSlot.index())
      this._equipListWindowBack.visible = true;
      this._windowEquipsList.open();
      this._windowEquipsList.activate();
      this._windowEquipsList.select(0);
      this._windowStatus.show();
      this._actorInfoWindow.hide();
      return this._actorChangeControls.hide();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _refreshListWindowForCurrentSlot() {
    var e, slotIndex;
    try {
      slotIndex = this._windowEquipSlot.index();
      this._windowEquipsList.setSlotId(this._windowEquipSlot.index());
      this._windowEquipsList.setActor(this._currentActor);
      this._windowEquipsList.refresh();
      return this._moveItemWindowToSlotPosition();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _refreshStatusWindowForCurrentItem() {
    var e, item, slotIndex;
    try {
      item = this._windowEquipsList.item();
      slotIndex = this._windowEquipSlot.index();
      this._windowStatus.setActor(this._currentActor);
      this._windowStatus.setItemToCompare(slotIndex, item);
      this._windowStatus.refresh();
      return this._windowStatus.placeRelativeTo(slotIndex);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _moveItemWindowToSlotPosition() {
    var e, slotIndex, specialPosition;
    try {
      slotIndex = this._windowEquipSlot.index();
      specialPosition = PKD_MapEquipWindow.PP.getEquipListWindowPositionForSlotIndex(slotIndex);
      if (specialPosition != null) {
        this._equipListWindowBack.x = specialPosition.x;
        return this._equipListWindowBack.y = specialPosition.y;
      } else {
        return this._moveItemWindowToDefaultPosition();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _moveItemWindowToDefaultPosition() {
    var e, s, x, y;
    try {
      s = $ppJson_MEW_EquipmentListWindowSettings;
      ({x, y} = s.position);
      try {
        x = eval(x);
        y = eval(y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        x = 0;
        y = 0;
      }
      this._equipListWindowBack.move(x, y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      if (this._windowEquipsList != null) {
        this._equipListWindowBack.move(0, 0);
      }
    }
  }

  _createItemsWindow() {
    var e, h, imageName, s, w;
    try {
      this._equipListWindowBack = new Sprite();
      s = $ppJson_MEW_EquipmentListWindowSettings;
      ({w, h} = s.size);
      imageName = s.backgroundImage;
      if (String.any(imageName)) {
        this._equipListWindowBack.bitmap = ImageManager.loadPictureFor_PKD_MapEquipWindow(imageName);
      }
      if (KDCore.isMZ()) {
        this._windowEquipsList = new Window_EquipItem(new Rectangle(0, 0, w, h));
      } else {
        this._windowEquipsList = new Window_EquipItem(0, 0, w, h);
      }
      if (s.isTransparent) {
        this._windowEquipsList.setBackgroundType(2);
      }
      this._hideEquipmentListWindow();
      this._windowEquipsList.setHandler('ok', this._onItemSelected.bind(this));
      this._moveItemWindowToDefaultPosition();
      this._equipListWindowBack.addChild(this._windowEquipsList);
      return this.addChild(this._equipListWindowBack);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _onItemSelected() {
    var e;
    try {
      SoundManager.playEquip();
      this._executreEquipChange();
      this._windowEquipSlot.refresh();
      return this._onItemCancel();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _executreEquipChange() {
    var e, item, ref, ref1, slotIndex;
    try {
      slotIndex = this._windowEquipSlot.index();
      item = this._windowEquipsList.item();
      if ((ref = this._currentActor) != null) {
        ref.changeEquip(slotIndex, item);
      }
      return (ref1 = this._windowStatus) != null ? ref1.forceRefresh() : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _onItemCancel() {
    var e, ref;
    try {
      this._isInItemSelectMode = false;
      this._windowEquipsList.deactivate();
      this._hideEquipmentListWindow();
      this._windowStatus.hide();
      this._actorInfoWindow.show();
      this._windowEquipsList.refresh();
      this._windowEquipSlot.activate();
      if ((ref = this._windowStatus) != null) {
        ref.forceRefresh();
      }
      return this._actorChangeControls.show();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _hideEquipmentListWindow() {
    var e;
    try {
      this._windowEquipsList.select(-1);
      if (!$ppJson_MEW_EquipmentListWindowSettings.isAlwaysVisible) {
        return this._equipListWindowBack.visible = false;
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createStatusWindow() {
    var e;
    try {
      this._windowStatus = new PKD_Sprite_MEW_EquipStatus();
      this._windowStatus.setActor(this._currentActor);
      return this.addChild(this._windowStatus);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createActorsChangeControls() {
    var e;
    try {
      this._actorChangeControls = new PKD_Sprite_MEW_ActorChangeButtons(this.setActor.bind(this));
      return this.addChild(this._actorChangeControls);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _createActorInfoWindow() {
    var e;
    try {
      this._actorInfoWindow = new PKD_Sprite_MEW_ActorInfowWindow();
      this._actorInfoWindow.setActor(this._currentActor);
      return this.addChild(this._actorInfoWindow);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  refreshThreadTick() {
    var e, ref, ref1;
    try {
      if ((ref = this._actorInfoWindow) != null) {
        ref.setActor(this._currentActor);
      }
      if (!this.isItemSelectMode()) {
        return (ref1 = this._windowEquipSlot) != null ? ref1.refresh() : void 0;
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _afterClose() {
    return this.move(-1000, -1000);
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  if (this.cexp == null) {
    Object.defineProperties(_, {
      cexp: {
        get: function() {
          return this.currentExp() - this.currentLevelExp();
        },
        configurable: true
      }
    });
  }
  if (this.nexp == null) {
    Object.defineProperties(_, {
      nexp: {
        get: function() {
          return this.nextLevelExp() - this.currentLevelExp();
        },
        configurable: true
      }
    });
  }
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    if (PKD_MEW.IsPaused()) {
      return;
    }
    return ALIAS__update.call(this, ...arguments);
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canMove, ALIAS__moveByInput, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__canMove = _.canMove;
  _.canMove = function() {
    if (PKD_MEW.IsPaused()) {
      return false;
    }
    return ALIAS__canMove.call(this, ...arguments);
  };
  
  //@[ALIAS]
  ALIAS__moveByInput = _.moveByInput;
  _.moveByInput = function() {
    if (PKD_MEW.IsOpen()) {
      return;
    }
    return ALIAS__moveByInput.call(this, ...arguments);
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadPictureFor_PKD_MapEquipWindow = function(filename) {
    return this.loadBitmap('img/pMapEquipWindow/', filename);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------


var _0x27eb56 = _0x5e59;
function _0x1355() {
    var _0x412d57 = [
        '\x78\x62\x59\x4e\x75',
        '\x70\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x5f\x61\x63\x74\x6f\x72\x49\x6e\x64\x65\x78',
        '\x32\x33\x36\x35\x71\x47\x6b\x4b\x5a\x69',
        '\x69\x6d\x61\x67\x65\x73',
        '\x73\x65\x74\x74\x69\x6e\x67\x73',
        '\x51\x53\x75\x56\x43',
        '\x73\x68\x6f\x77',
        '\x6e\x65\x78\x74\x42\x75\x74\x74\x6f\x6e',
        '\x39\x36\x32\x31\x39\x32\x59\x77\x48\x5a\x49\x70',
        '\x31\x38\x31\x37\x37\x32\x35\x4a\x76\x45\x6c\x6e\x4e',
        '\x5f\x6f\x6e\x50\x72\x65\x76\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b',
        '\x68\x69\x64\x65',
        '\x62\x69\x6e\x64',
        '\x70\x4d\x61\x70\x45\x71\x75\x69\x70\x57\x69\x6e\x64\x6f\x77',
        '\x5f\x75\x70\x64\x61\x74\x65\x41\x63\x74\x69\x76\x61\x74\x69\x6f\x6e\x42\x79\x4b\x65\x79\x62\x6f\x61\x72\x64',
        '\x35\x62\x64\x41\x45\x59\x4d',
        '\x43\x4b\x62\x66\x79',
        '\x5f\x65\x4b\x65\x79',
        '\x5f\x63\x72\x65\x61\x74\x65\x4e\x65\x78\x74\x42\x75\x74\x74\x6f\x6e',
        '\x6f\x66\x4d\x73\x55',
        '\x32\x35\x33\x32\x30\x47\x75\x75\x4d\x65\x42',
        '\x5f\x63\x61\x6c\x6c\x62\x61\x63\x6b',
        '\x48\x47\x69\x43\x6a',
        '\x63\x4d\x54\x64\x4a',
        '\x5f\x63\x72\x65\x61\x74\x65\x42\x75\x74\x74\x6f\x6e',
        '\x53\x70\x72\x69\x74\x65',
        '\x35\x32\x30\x36\x38\x34\x47\x7a\x72\x43\x65\x61',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x76\x69\x73\x69\x62\x6c\x65',
        '\x32\x39\x31\x32\x30\x35\x35\x36\x50\x76\x66\x41\x63\x6c',
        '\x5f\x6f\x6e\x4e\x65\x78\x74\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b',
        '\x41\x63\x74\x6f\x72\x43\x68\x61\x6e\x67\x65\x42\x75\x74\x74\x6f\x6e\x73',
        '\x31\x30\x48\x67\x79\x46\x43\x57',
        '\x67\x65\x74\x41\x63\x74\x6f\x72\x42\x79\x43\x75\x72\x72\x65\x6e\x74\x49\x6e\x64\x65\x78',
        '\x47\x75\x71\x51\x56',
        '\x63\x6c\x65\x61\x72',
        '\x42\x75\x74\x74\x6f\x6e\x4d\x55',
        '\x47\x6a\x4e\x6d\x53',
        '\x61\x6e\x79',
        '\x4b\x4b\x6b\x6a\x63',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x70\x47\x65\x74\x4d\x45\x57\x4a\x73\x6f\x6e',
        '\x72\x70\x41\x52\x71',
        '\x5f\x63\x72\x65\x61\x74\x65\x50\x72\x65\x76\x42\x75\x74\x74\x6f\x6e',
        '\x6d\x65\x6d\x62\x65\x72\x73',
        '\x57\x54\x54\x64\x73',
        '\x4f\x78\x41\x56\x51',
        '\x69\x73\x54\x72\x69\x67\x67\x65\x72\x65\x64',
        '\x35\x38\x30\x31\x35\x35\x64\x56\x41\x72\x45\x6f',
        '\x61\x64\x64\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72',
        '\x6d\x61\x78\x41\x63\x74\x6f\x72\x73',
        '\x31\x32\x52\x6f\x66\x64\x47\x6a',
        '\x5f\x63\x72\x65\x61\x74\x65',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x70\x72\x65\x76\x42\x75\x74\x74\x6f\x6e',
        '\x75\x70\x64\x61\x74\x65',
        '\x75\x45\x6f\x70\x74',
        '\x56\x68\x59\x63\x43',
        '\x33\x37\x34\x33\x30\x63\x42\x72\x49\x52\x79',
        '\x64\x73\x73\x64\x77',
        '\x32\x37\x30\x66\x70\x76\x7a\x65\x42',
        '\x52\x68\x51\x64\x47',
        '\x6d\x6f\x76\x65'
    ];
    _0x1355 = function () {
        return _0x412d57;
    };
    return _0x1355();
}
(function (_0x4aad49, _0x90ff99) {
    var _0x56c368 = _0x5e59, _0x2d1fcd = _0x4aad49();
    while (!![]) {
        try {
            var _0x1a2984 = -parseInt(_0x56c368(0x132)) / 0x1 + -parseInt(_0x56c368(0x138)) / 0x2 * (parseInt(_0x56c368(0x148)) / 0x3) + parseInt(_0x56c368(0x160)) / 0x4 * (-parseInt(_0x56c368(0x167)) / 0x5) + parseInt(_0x56c368(0x14b)) / 0x6 * (parseInt(_0x56c368(0x161)) / 0x7) + -parseInt(_0x56c368(0x12c)) / 0x8 * (-parseInt(_0x56c368(0x154)) / 0x9) + parseInt(_0x56c368(0x152)) / 0xa * (-parseInt(_0x56c368(0x15a)) / 0xb) + parseInt(_0x56c368(0x135)) / 0xc;
            if (_0x1a2984 === _0x90ff99)
                break;
            else
                _0x2d1fcd['push'](_0x2d1fcd['shift']());
        } catch (_0x2e918b) {
            _0x2d1fcd['push'](_0x2d1fcd['shift']());
        }
    }
}(_0x1355, 0x7c0cf));
var PKD_Sprite_MEW_ActorChangeButtons;
function _0x5e59(_0x2dbce9, _0x8abe41) {
    var _0x1355a2 = _0x1355();
    return _0x5e59 = function (_0x5e5952, _0x11b538) {
        _0x5e5952 = _0x5e5952 - 0x128;
        var _0x333f07 = _0x1355a2[_0x5e5952];
        return _0x333f07;
    }, _0x5e59(_0x2dbce9, _0x8abe41);
}
PKD_Sprite_MEW_ActorChangeButtons = class PKD_Sprite_MEW_ActorChangeButtons extends KDCore[_0x27eb56(0x131)] {
    constructor(_0x1f253e) {
        var _0x2623cd = _0x27eb56;
        super(), this[_0x2623cd(0x12d)] = _0x1f253e, this[_0x2623cd(0x159)] = 0x0, this[_0x2623cd(0x14c)]();
    }
    [_0x27eb56(0x14a)]() {
        var _0x2e7e1d = _0x27eb56;
        return $gameParty['\x6d\x65\x6d\x62\x65\x72\x73']()[_0x2e7e1d(0x133)];
    }
    ['\x67\x65\x74\x41\x63\x74\x6f\x72\x42\x79\x43\x75\x72\x72\x65\x6e\x74\x49\x6e\x64\x65\x78']() {
        var _0x1fb01f = _0x27eb56;
        return $gameParty[_0x1fb01f(0x144)]()[this[_0x1fb01f(0x159)]];
    }
    [_0x27eb56(0x15c)]() {
        var _0x5cd32a = _0x27eb56;
        return DataManager[_0x5cd32a(0x141)](_0x5cd32a(0x137));
    }
    [_0x27eb56(0x15e)]() {
        var _0x362617 = _0x27eb56;
        return this[_0x362617(0x134)] = !![];
    }
    [_0x27eb56(0x163)]() {
        var _0x50d59a = _0x27eb56;
        return this[_0x50d59a(0x134)] = ![];
    }
    [_0x27eb56(0x14f)]() {
        var _0x35537d = _0x27eb56;
        return super['\x75\x70\x64\x61\x74\x65'](), this[_0x35537d(0x166)]();
    }
    ['\x5f\x63\x72\x65\x61\x74\x65']() {
        var _0x26095c = _0x27eb56, _0x296948;
        try {
            if (this['\x6d\x61\x78\x41\x63\x74\x6f\x72\x73']() === 0x1)
                return;
            return this[_0x26095c(0x143)](), this[_0x26095c(0x12a)]();
        } catch (_0x183fb3) {
            if ('\x74\x6f\x52\x76\x48' === '\x64\x46\x51\x62\x56') {
                var _0x1ec8c2;
                try {
                    return this[_0x26095c(0x130)](_0x26095c(0x14e), this[_0x26095c(0x15c)]()[_0x26095c(0x14e)], this['\x5f\x6f\x6e\x50\x72\x65\x76\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b'][_0x26095c(0x164)](this));
                } catch (_0xadfa9b) {
                    return _0x1ec8c2 = _0xadfa9b, _0x55d91f[_0x26095c(0x140)](_0x1ec8c2);
                }
            } else
                return _0x296948 = _0x183fb3, KDCore[_0x26095c(0x140)](_0x296948);
        }
    }
    [_0x27eb56(0x143)]() {
        var _0x131ee3 = _0x27eb56, _0x47aa37;
        try {
            return '\x47\x75\x71\x51\x56' === _0x131ee3(0x13a) ? this[_0x131ee3(0x130)]('\x70\x72\x65\x76\x42\x75\x74\x74\x6f\x6e', this[_0x131ee3(0x15c)]()[_0x131ee3(0x14e)], this[_0x131ee3(0x162)][_0x131ee3(0x164)](this)) : this[_0x131ee3(0x130)]('\x6e\x65\x78\x74\x42\x75\x74\x74\x6f\x6e', this[_0x131ee3(0x15c)]()['\x6e\x65\x78\x74\x42\x75\x74\x74\x6f\x6e'], this[_0x131ee3(0x136)][_0x131ee3(0x164)](this));
        } catch (_0x28c284) {
            return _0x131ee3(0x12b) !== '\x52\x72\x43\x69\x61' ? (_0x47aa37 = _0x28c284, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x47aa37)) : (this['\x5f\x6f\x6e\x4e\x65\x78\x74\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b'](), _0xb2ad95[_0x131ee3(0x13b)]());
        }
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x42\x75\x74\x74\x6f\x6e'](_0x45e7bf, _0x2abafe, _0x41dedc) {
        var _0x207870 = _0x27eb56, _0xa3efb5, _0x2a1641, _0x1dff2b, _0x59a7ee;
        if (!_0x2abafe[_0x207870(0x134)]) {
            if (_0x207870(0x142) === '\x72\x70\x41\x52\x71')
                return;
            else
                this[_0x207870(0x159)] = 0x0;
        }
        _0xa3efb5 = new KDCore[(_0x207870(0x13c))](_0x2abafe[_0x207870(0x15b)], ![], _0x207870(0x165));
        try {
            if ('\x63\x4c\x45\x67\x64' !== '\x63\x4c\x45\x67\x64') {
                if (this[_0x207870(0x14a)]() === 0x1)
                    return;
                return this[_0x207870(0x143)](), this[_0x207870(0x12a)]();
            } else
                _0x1dff2b = eval(_0x2abafe[_0x207870(0x158)]['\x78']);
        } catch (_0x19682f) {
            if (_0x207870(0x12e) !== _0x207870(0x150))
                _0x2a1641 = _0x19682f, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x2a1641), _0x1dff2b = 0x0;
            else
                return;
        }
        try {
            _0x59a7ee = eval(_0x2abafe[_0x207870(0x158)]['\x79']);
        } catch (_0x383f77) {
            _0x2a1641 = _0x383f77, KDCore[_0x207870(0x140)](_0x2a1641), _0x59a7ee = 0x0;
        }
        _0xa3efb5[_0x207870(0x156)](_0x1dff2b, _0x59a7ee), _0xa3efb5[_0x207870(0x149)](_0x41dedc), _0xa3efb5[_0x207870(0x129)] = _0x2abafe['\x6b\x65\x79\x62\x6f\x61\x72\x64\x53\x79\x6d\x62\x6f\x6c'], this[_0x45e7bf] = _0xa3efb5, this[_0x207870(0x14d)](_0xa3efb5);
    }
    [_0x27eb56(0x162)]() {
        var _0x31dcb7 = _0x27eb56, _0x403429;
        try {
            if (!this[_0x31dcb7(0x134)])
                return;
            return this[_0x31dcb7(0x159)]--, this[_0x31dcb7(0x159)] < 0x0 && (this[_0x31dcb7(0x159)] = this[_0x31dcb7(0x14a)]() - 0x1), this[_0x31dcb7(0x12d)](this['\x67\x65\x74\x41\x63\x74\x6f\x72\x42\x79\x43\x75\x72\x72\x65\x6e\x74\x49\x6e\x64\x65\x78']());
        } catch (_0x51cfdb) {
            if (_0x31dcb7(0x157) !== _0x31dcb7(0x155))
                return _0x403429 = _0x51cfdb, KDCore[_0x31dcb7(0x140)](_0x403429);
            else
                this['\x5f\x61\x63\x74\x6f\x72\x49\x6e\x64\x65\x78'] = this[_0x31dcb7(0x14a)]() - 0x1;
        }
    }
    [_0x27eb56(0x12a)]() {
        var _0xf79faa = _0x27eb56, _0x4ce84a;
        try {
            if (_0xf79faa(0x128) !== _0xf79faa(0x145))
                return this[_0xf79faa(0x130)](_0xf79faa(0x15f), this['\x73\x65\x74\x74\x69\x6e\x67\x73']()[_0xf79faa(0x15f)], this[_0xf79faa(0x136)][_0xf79faa(0x164)](this));
            else
                this[_0xf79faa(0x162)](), _0x35ee41['\x63\x6c\x65\x61\x72']();
        } catch (_0x42620e) {
            return '\x46\x69\x59\x69\x79' === _0xf79faa(0x15d) ? (_0x4d0d35 = _0xc02ec7, _0x488064[_0xf79faa(0x140)](_0x449ce1)) : (_0x4ce84a = _0x42620e, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x4ce84a));
        }
    }
    [_0x27eb56(0x136)]() {
        var _0x1593dc = _0x27eb56, _0x4f2fd2;
        try {
            if (_0x1593dc(0x146) !== _0x1593dc(0x146))
                return _0x468ad0[_0x1593dc(0x144)]()[_0x1593dc(0x133)];
            else {
                if (!this[_0x1593dc(0x134)]) {
                    if (_0x1593dc(0x12f) === _0x1593dc(0x12f))
                        return;
                    else
                        return _0x573561 = _0x4a2d4e, _0x5643f5[_0x1593dc(0x140)](_0x33c1e7);
                }
                return this[_0x1593dc(0x159)]++, this[_0x1593dc(0x159)] >= this[_0x1593dc(0x14a)]() && (this[_0x1593dc(0x159)] = 0x0), this[_0x1593dc(0x12d)](this[_0x1593dc(0x139)]());
            }
        } catch (_0x5be69c) {
            return _0x4f2fd2 = _0x5be69c, KDCore[_0x1593dc(0x140)](_0x4f2fd2);
        }
    }
    [_0x27eb56(0x166)]() {
        var _0x11eac7 = _0x27eb56, _0x23a0ab;
        try {
            if ('\x49\x75\x4d\x73\x77' === _0x11eac7(0x13f))
                return this[_0x11eac7(0x134)] = ![];
            else {
                this[_0x11eac7(0x14e)] != null && String[_0x11eac7(0x13e)](this['\x70\x72\x65\x76\x42\x75\x74\x74\x6f\x6e']['\x5f\x65\x4b\x65\x79']) && (_0x11eac7(0x13d) === _0x11eac7(0x13d) ? Input[_0x11eac7(0x147)](this[_0x11eac7(0x14e)]['\x5f\x65\x4b\x65\x79']) && (this[_0x11eac7(0x162)](), Input[_0x11eac7(0x13b)]()) : (_0xe29905 = _0x405366, _0x1227a5[_0x11eac7(0x140)](_0x384952), _0x195758 = 0x0));
                if (this[_0x11eac7(0x15f)] != null && String[_0x11eac7(0x13e)](this[_0x11eac7(0x15f)]['\x5f\x65\x4b\x65\x79'])) {
                    if (Input['\x69\x73\x54\x72\x69\x67\x67\x65\x72\x65\x64'](this[_0x11eac7(0x15f)][_0x11eac7(0x129)]))
                        return this[_0x11eac7(0x136)](), Input[_0x11eac7(0x13b)]();
                }
            }
        } catch (_0x31733c) {
            if (_0x11eac7(0x153) === _0x11eac7(0x151)) {
                var _0x1bdcdd;
                try {
                    if (this[_0x11eac7(0x14a)]() === 0x1)
                        return;
                    return this[_0x11eac7(0x143)](), this[_0x11eac7(0x12a)]();
                } catch (_0x18d8df) {
                    return _0x1bdcdd = _0x18d8df, _0x4bb4b0[_0x11eac7(0x140)](_0x1bdcdd);
                }
            } else
                return _0x23a0ab = _0x31733c, KDCore[_0x11eac7(0x140)](_0x23a0ab);
        }
    }
};

var _0x428058 = _0x50e5;
function _0x456a() {
    var _0xc91112 = [
        '\x50\x50\x54\x4f\x5a',
        '\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x47\x61\x75\x67\x65',
        '\x4f\x6b\x4c\x43\x6e',
        '\x62\x79\x78\x7a\x57',
        '\x6d\x6f\x76\x65',
        '\x5f\x64\x72\x61\x77\x41\x63\x74\x6f\x72\x53\x74\x61\x74\x75\x73\x65\x73\x49\x63\x6f\x6e\x73',
        '\x5f\x73\x74\x61\x74\x75\x73\x4c\x61\x79\x65\x72',
        '\x5f\x67\x61\x75\x67\x65',
        '\x73\x74\x61\x74\x75\x73\x65\x73\x4d\x61\x72\x67\x69\x6e\x73',
        '\x44\x76\x45\x46\x42',
        '\x68\x69\x64\x65',
        '\x5f\x63\x72\x65\x61\x74\x65',
        '\x74\x65\x78\x74\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x5f\x63\x72\x65\x61\x74\x65\x41\x63\x74\x6f\x72\x4c\x65\x76\x65\x6c\x54\x65\x78\x74',
        '\x68\x68\x56\x4e\x6a',
        '\x70\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x74\x65\x78\x74\x50\x61\x74\x74\x65\x72\x6e',
        '\x31\x36\x30\x36\x38\x33\x31\x32\x51\x58\x4b\x50\x6c\x6a',
        '\x76\x68\x45\x66\x50',
        '\x76\x69\x73\x69\x62\x6c\x65',
        '\x6c\x65\x76\x65\x6c',
        '\x62\x69\x74\x6d\x61\x70',
        '\x73\x74\x61\x74\x75\x73\x65\x73\x4d\x61\x78\x49\x63\x6f\x6e\x73',
        '\x67\x61\x75\x67\x65\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x5f\x72\x65\x66\x72\x65\x73\x68\x50\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x41\x63\x74\x6f\x72\x4c\x65\x76\x65\x6c\x45\x78\x70\x45\x6c\x65\x6d\x65\x6e\x74\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x62\x59\x64\x49\x43',
        '\x65\x78\x70\x54\x65\x78\x74\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x53\x58\x46\x7a\x5a',
        '\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65',
        '\x5f\x61\x63\x74\x6f\x72\x43\x6c\x61\x73\x73\x54\x65\x78\x74\x46\x69\x65\x6c\x64',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x5f\x63\x72\x65\x61\x74\x65\x41\x63\x74\x6f\x72\x45\x78\x70\x47\x61\x75\x67\x65',
        '\x64\x72\x61\x77\x54\x65\x78\x74\x57\x69\x74\x68\x46\x6f\x72\x6d\x61\x74',
        '\x6c\x65\x76\x65\x6c\x54\x65\x78\x74\x50\x61\x74\x74\x65\x72\x6e',
        '\x6e\x61\x6d\x65',
        '\x31\x72\x65\x69\x58\x46\x4a',
        '\x5f\x63\x72\x65\x61\x74\x65\x41\x63\x74\x6f\x72\x43\x6c\x61\x73\x73\x54\x65\x78\x74',
        '\x34\x39\x30\x34\x36\x34\x30\x6a\x73\x53\x65\x76\x7a',
        '\x66\x69\x6c\x74\x65\x72',
        '\x35\x39\x35\x31\x6f\x4d\x74\x4d\x50\x4f',
        '\x31\x33\x32\x69\x7a\x54\x61\x43\x63',
        '\x5f\x63\x72\x65\x61\x74\x65\x41\x63\x74\x6f\x72\x45\x78\x70\x54\x65\x78\x74',
        '\x39\x36\x32\x36\x33\x30\x77\x63\x51\x58\x51\x4d',
        '\x65\x78\x70\x54\x65\x78\x74\x50\x61\x74\x74\x65\x72\x6e',
        '\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x54\x65\x78\x74',
        '\x66\x6c\x6f\x6f\x72',
        '\x63\x6c\x61\x73\x73\x54\x65\x78\x74\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x73\x74\x61\x74\x75\x73\x65\x73\x49\x63\x6f\x6e\x73\x53\x69\x7a\x65',
        '\x37\x38\x37\x39\x30\x46\x53\x50\x74\x51\x77',
        '\x79\x4b\x46\x4f\x56',
        '\x5f\x63\x75\x72\x72\x65\x6e\x74\x41\x63\x74\x6f\x72',
        '\x69\x73\x41\x6c\x77\x61\x79\x73\x56\x69\x73\x69\x62\x6c\x65',
        '\x66\x50\x44\x6b\x58',
        '\x64\x72\x61\x77',
        '\x5f\x61\x63\x74\x6f\x72\x45\x78\x70\x54\x65\x78\x74\x46\x69\x65\x6c\x64',
        '\x63\x49\x50\x44\x51',
        '\x4a\x70\x6c\x51\x4b',
        '\x73\x65\x74\x74\x69\x6e\x67\x73',
        '\x59\x68\x74\x47\x58',
        '\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x49\x63\x6f\x6e',
        '\x45\x48\x4e\x73\x6c',
        '\x70\x75\x73\x68',
        '\x31\x30\x30\x38\x34\x32\x78\x56\x56\x76\x66\x69',
        '\x70\x4d\x61\x70\x45\x71\x75\x69\x70\x57\x69\x6e\x64\x6f\x77',
        '\x5f\x73\x74\x61\x74\x75\x73\x65\x73\x49\x63\x6f\x6e\x73',
        '\x5f\x63\x72\x65\x61\x74\x65\x41\x63\x74\x6f\x72\x53\x74\x61\x74\x73\x49\x63\x6f\x6e\x73',
        '\x6c\x65\x76\x65\x6c\x54\x65\x78\x74\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x41\x63\x74\x6f\x72\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x53\x70\x72\x69\x74\x65',
        '\x73\x6c\x69\x63\x65',
        '\x41\x63\x74\x6f\x72\x43\x6c\x61\x73\x73\x54\x65\x78\x74\x45\x6c\x65\x6d\x65\x6e\x74\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x5f\x61\x63\x74\x6f\x72\x4c\x65\x76\x65\x6c\x54\x65\x78\x74\x46\x69\x65\x6c\x64',
        '\x65\x48\x46\x6a\x56',
        '\x70\x47\x65\x74\x4d\x45\x57\x4a\x73\x6f\x6e',
        '\x62\x55\x6a\x68\x55',
        '\x5f\x63\x72\x65\x61\x74\x65\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64',
        '\x33\x32\x4a\x4b\x70\x51\x44\x42',
        '\x73\x74\x61\x74\x75\x73\x65\x73\x49\x63\x6f\x6e\x73\x50\x65\x72\x4c\x69\x6e\x65',
        '\x58\x64\x6d\x71\x52',
        '\x39\x33\x38\x30\x4d\x64\x74\x69\x47\x4c',
        '\x67\x61\x75\x67\x65\x4d\x61\x72\x67\x69\x6e\x73',
        '\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74',
        '\x5f\x64\x65\x73\x74\x6f\x72\x79\x41\x63\x74\x6f\x72\x53\x74\x61\x74\x75\x73\x65\x73\x49\x63\x6f\x6e\x73',
        '\x61\x69\x63\x68\x77',
        '\x66\x78\x70\x45\x4e',
        '\x73\x65\x74\x41\x63\x74\x6f\x72',
        '\x77\x62\x6d\x43\x76',
        '\x44\x51\x67\x66\x57',
        '\x37\x57\x53\x46\x68\x53\x77',
        '\x31\x34\x37\x30\x36\x38\x38\x56\x77\x78\x44\x59\x41',
        '\x6c\x6f\x61\x64\x50\x69\x63\x74\x75\x72\x65\x46\x6f\x72\x5f\x50\x4b\x44\x5f\x4d\x61\x70\x45\x71\x75\x69\x70\x57\x69\x6e\x64\x6f\x77',
        '\x73\x74\x61\x74\x75\x73\x65\x73\x53\x74\x61\x72\x74\x50\x6f\x69\x6e\x74',
        '\x44\x76\x44\x66\x6b',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x41\x4f\x67\x4e\x6d',
        '\x5f\x64\x72\x61\x77\x53\x74\x61\x74\x75\x73\x49\x63\x6f\x6e',
        '\x73\x68\x6f\x77',
        '\x63\x75\x72\x72\x65\x6e\x74\x43\x6c\x61\x73\x73'
    ];
    _0x456a = function () {
        return _0xc91112;
    };
    return _0x456a();
}
(function (_0x105448, _0x1ec8d) {
    var _0x330d65 = _0x50e5, _0x4d5503 = _0x105448();
    while (!![]) {
        try {
            var _0x5a00ec = parseInt(_0x330d65(0xe1)) / 0x1 * (parseInt(_0x330d65(0xe8)) / 0x2) + parseInt(_0x330d65(0xfc)) / 0x3 * (parseInt(_0x330d65(0x10b)) / 0x4) + parseInt(_0x330d65(0xee)) / 0x5 * (-parseInt(_0x330d65(0xe6)) / 0x6) + -parseInt(_0x330d65(0x117)) / 0x7 * (-parseInt(_0x330d65(0x118)) / 0x8) + parseInt(_0x330d65(0xe3)) / 0x9 + parseInt(_0x330d65(0x10e)) / 0xa * (parseInt(_0x330d65(0xe5)) / 0xb) + -parseInt(_0x330d65(0xce)) / 0xc;
            if (_0x5a00ec === _0x1ec8d)
                break;
            else
                _0x4d5503['push'](_0x4d5503['shift']());
        } catch (_0x373297) {
            _0x4d5503['push'](_0x4d5503['shift']());
        }
    }
}(_0x456a, 0x496eb));
function _0x50e5(_0x9c69dd, _0xcba3c6) {
    var _0x456a02 = _0x456a();
    return _0x50e5 = function (_0x50e558, _0x15a97a) {
        _0x50e558 = _0x50e558 - 0xc8;
        var _0x356806 = _0x456a02[_0x50e558];
        return _0x356806;
    }, _0x50e5(_0x9c69dd, _0xcba3c6);
}
var PKD_Sprite_MEW_ActorInfowWindow;
PKD_Sprite_MEW_ActorInfowWindow = class PKD_Sprite_MEW_ActorInfowWindow extends KDCore[_0x428058(0x103)] {
    constructor() {
        var _0x211778 = _0x428058;
        super(), this[_0x211778(0xc8)](), this[_0x211778(0xd5)]();
    }
    [_0x428058(0x114)](_0xa0ddb6) {
        var _0x2463ae = _0x428058, _0x5b579a, _0x3c20de, _0x1ba77b, _0xf4323d, _0x35d24d, _0x20ed52, _0x40731b;
        this['\x5f\x63\x75\x72\x72\x65\x6e\x74\x41\x63\x74\x6f\x72'] = _0xa0ddb6;
        try {
            if (this[_0x2463ae(0xf0)] == null) {
                if ('\x4d\x72\x4b\x79\x49' !== _0x2463ae(0x11d))
                    return;
                else
                    return _0x1c069b['\x70\x47\x65\x74\x4d\x45\x57\x4a\x73\x6f\x6e'](_0x2463ae(0x105));
            }
            try {
                if (_0x2463ae(0x112) !== _0x2463ae(0xd7))
                    _0xf4323d = this[_0x2463ae(0xec)]()[_0x2463ae(0xcd)], (_0x35d24d = this[_0x2463ae(0xdb)]) != null && _0x35d24d[_0x2463ae(0xde)](_0xf4323d, this[_0x2463ae(0xf0)][_0x2463ae(0x120)]()[_0x2463ae(0xe0)]);
                else
                    return this[_0x2463ae(0xd0)] = !![];
            } catch (_0x2ad97a) {
                _0x3c20de = _0x2ad97a, KDCore[_0x2463ae(0x102)](_0x3c20de);
            }
            try {
                _0xf4323d = this[_0x2463ae(0x100)]()[_0x2463ae(0xdf)], (_0x20ed52 = this[_0x2463ae(0x106)]) != null && _0x20ed52[_0x2463ae(0xde)](_0xf4323d, this['\x5f\x63\x75\x72\x72\x65\x6e\x74\x41\x63\x74\x6f\x72'][_0x2463ae(0xd1)]);
            } catch (_0x123124) {
                _0x3c20de = _0x123124, KDCore[_0x2463ae(0x102)](_0x3c20de);
            }
            try {
                if ('\x44\x51\x67\x66\x57' === _0x2463ae(0x116))
                    _0xf4323d = this[_0x2463ae(0x100)]()[_0x2463ae(0xe9)], {
                        cexp: _0x5b579a,
                        nexp: _0x1ba77b
                    } = this[_0x2463ae(0xf0)], (_0x40731b = this[_0x2463ae(0xf4)]) != null && _0x40731b[_0x2463ae(0xde)](_0xf4323d, _0x5b579a, _0x1ba77b), this[_0x2463ae(0x128)][_0x2463ae(0xf3)](_0x5b579a / _0x1ba77b);
                else
                    return _0x41eaa7 != null && _0x3facbf > 0x0;
            } catch (_0x27865f) {
                _0x3c20de = _0x27865f, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x3c20de);
            }
            return this[_0x2463ae(0x126)]();
        } catch (_0x3ef7a4) {
            return _0x3c20de = _0x3ef7a4, KDCore[_0x2463ae(0x102)](_0x3c20de);
        }
    }
    [_0x428058(0x12b)]() {
        var _0x422ec6 = _0x428058;
        if (this[_0x422ec6(0xf7)]()[_0x422ec6(0xf1)]) {
            if ('\x55\x75\x55\x66\x44' !== '\x55\x75\x55\x66\x44') {
                var _0x4823d2, _0x102cc1, _0x49d4f3, _0x515f4b, _0x17128a;
                try {
                    _0x515f4b = this[_0x422ec6(0xfe)];
                    for (_0x102cc1 = 0x0, _0x49d4f3 = _0x515f4b['\x6c\x65\x6e\x67\x74\x68']; _0x102cc1 < _0x49d4f3; _0x102cc1++) {
                        _0x17128a = _0x515f4b[_0x102cc1], _0x17128a[_0x422ec6(0xd0)] = ![], _0x17128a[_0x422ec6(0x110)]();
                    }
                    return this[_0x422ec6(0xfe)] = [];
                } catch (_0x1b4aaa) {
                    return _0x4823d2 = _0x1b4aaa, _0x3b9630[_0x422ec6(0x102)](_0x4823d2);
                }
            } else
                return;
        }
        return this['\x76\x69\x73\x69\x62\x6c\x65'] = ![];
    }
    [_0x428058(0x11f)]() {
        var _0x1a86a2 = _0x428058;
        return this[_0x1a86a2(0xd0)] = !![];
    }
    [_0x428058(0xf7)]() {
        var _0x93a309 = _0x428058;
        return DataManager[_0x93a309(0x108)](_0x93a309(0x101));
    }
    ['\x63\x6c\x61\x73\x73\x54\x65\x78\x74\x53\x65\x74\x74\x69\x6e\x67\x73']() {
        var _0x497da4 = _0x428058;
        return DataManager[_0x497da4(0x108)]('\x41\x63\x74\x6f\x72\x43\x6c\x61\x73\x73\x54\x65\x78\x74\x45\x6c\x65\x6d\x65\x6e\x74\x53\x65\x74\x74\x69\x6e\x67\x73');
    }
    [_0x428058(0x100)]() {
        var _0x575a6e = _0x428058;
        return DataManager[_0x575a6e(0x108)](_0x575a6e(0xd6));
    }
    ['\x5f\x63\x72\x65\x61\x74\x65']() {
        var _0x2d0cd8 = _0x428058, _0x4aca89;
        try {
            return this['\x5f\x63\x72\x65\x61\x74\x65\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64'](), this[_0x2d0cd8(0xe2)](), this[_0x2d0cd8(0xca)](), this[_0x2d0cd8(0xe7)](), this[_0x2d0cd8(0xdd)](), this[_0x2d0cd8(0xff)]();
        } catch (_0x101721) {
            if (_0x2d0cd8(0x109) === '\x62\x55\x6a\x68\x55')
                return _0x4aca89 = _0x101721, KDCore[_0x2d0cd8(0x102)](_0x4aca89);
            else
                return;
        }
    }
    [_0x428058(0x10a)]() {
        var _0x4f64eb = _0x428058, _0x387943, _0x383342, _0x23f88a;
        try {
            if (_0x4f64eb(0x121) !== _0x4f64eb(0x10d)) {
                _0x23f88a = this[_0x4f64eb(0xf7)]()[_0x4f64eb(0xda)];
                if (!String['\x61\x6e\x79'](_0x23f88a))
                    return;
                return _0x387943 = new Sprite(), _0x387943[_0x4f64eb(0xd2)] = ImageManager[_0x4f64eb(0x119)](_0x23f88a), this[_0x4f64eb(0x11c)](_0x387943);
            } else
                return _0x2d2824 = _0x2ad6b3, _0x5c8c91[_0x4f64eb(0x102)](_0x2c359d);
        } catch (_0x29202b) {
            if (_0x4f64eb(0xf6) === _0x4f64eb(0x12a)) {
                _0x4b10c5 = this[_0x4f64eb(0xf7)]()[_0x4f64eb(0xda)];
                if (!_0x1aa05d['\x61\x6e\x79'](_0xcebb49))
                    return;
                return _0x61e98c = new _0xc58c59(), _0x356746['\x62\x69\x74\x6d\x61\x70'] = _0x4aa9d6['\x6c\x6f\x61\x64\x50\x69\x63\x74\x75\x72\x65\x46\x6f\x72\x5f\x50\x4b\x44\x5f\x4d\x61\x70\x45\x71\x75\x69\x70\x57\x69\x6e\x64\x6f\x77'](_0xd1b3e5), this[_0x4f64eb(0x11c)](_0x5020cd);
            } else
                return _0x383342 = _0x29202b, KDCore[_0x4f64eb(0x102)](_0x383342);
        }
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x41\x63\x74\x6f\x72\x43\x6c\x61\x73\x73\x54\x65\x78\x74']() {
        var _0x59370c = _0x428058, _0x8a6c65;
        try {
            return this['\x5f\x61\x63\x74\x6f\x72\x43\x6c\x61\x73\x73\x54\x65\x78\x74\x46\x69\x65\x6c\x64'] = new KDCore['\x55\x49'][(_0x59370c(0xea))](this[_0x59370c(0xec)]()[_0x59370c(0xc9)]), this[_0x59370c(0x11c)](this[_0x59370c(0xdb)]);
        } catch (_0x4e2930) {
            if (_0x59370c(0xcb) === _0x59370c(0x124))
                _0xf15f36 = _0x5e6036, _0x36adc9[_0x59370c(0x102)](_0x2d65e3), _0x173ea0 = 0x0;
            else
                return _0x8a6c65 = _0x4e2930, KDCore[_0x59370c(0x102)](_0x8a6c65);
        }
    }
    [_0x428058(0xca)]() {
        var _0x423162 = _0x428058, _0x4ff922;
        try {
            return this['\x5f\x61\x63\x74\x6f\x72\x4c\x65\x76\x65\x6c\x54\x65\x78\x74\x46\x69\x65\x6c\x64'] = new KDCore['\x55\x49'][(_0x423162(0xea))](this[_0x423162(0x100)]()[_0x423162(0x100)]), this[_0x423162(0x11c)](this[_0x423162(0x106)]);
        } catch (_0x5725fc) {
            if (_0x423162(0x123) !== _0x423162(0x123))
                _0x435684 = _0x239709, _0x5ccc59[_0x423162(0x102)](_0x4f50ae);
            else
                return _0x4ff922 = _0x5725fc, KDCore[_0x423162(0x102)](_0x4ff922);
        }
    }
    [_0x428058(0xe7)]() {
        var _0x2f36f4 = _0x428058, _0x5e39e5;
        try {
            return this['\x5f\x61\x63\x74\x6f\x72\x45\x78\x70\x54\x65\x78\x74\x46\x69\x65\x6c\x64'] = new KDCore['\x55\x49'][(_0x2f36f4(0xea))](this[_0x2f36f4(0x100)]()[_0x2f36f4(0xd8)]), this['\x61\x64\x64\x43\x68\x69\x6c\x64'](this[_0x2f36f4(0xf4)]);
        } catch (_0x5d237b) {
            return _0x5e39e5 = _0x5d237b, KDCore[_0x2f36f4(0x102)](_0x5e39e5);
        }
    }
    [_0x428058(0xdd)]() {
        var _0x34c6ef = _0x428058, _0x266d35;
        try {
            return this[_0x34c6ef(0x128)] = new KDCore['\x55\x49']['\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x47\x61\x75\x67\x65'](this[_0x34c6ef(0x100)]()[_0x34c6ef(0xd4)]), this[_0x34c6ef(0x128)]['\x64\x72\x61\x77'](0x1), this[_0x34c6ef(0x128)]['\x6d\x6f\x76\x65'](this[_0x34c6ef(0x100)]()[_0x34c6ef(0x10f)]), this[_0x34c6ef(0x11c)](this[_0x34c6ef(0x128)]);
        } catch (_0x418786) {
            if (_0x34c6ef(0xcf) !== _0x34c6ef(0xcf)) {
                var _0x2bd2f2, _0xa8f063, _0x4cfa7d, _0x2e28d5, _0x494557, _0x2a316b, _0x4e70f2, _0x43c149;
                try {
                    return _0x494557 = this['\x73\x65\x74\x74\x69\x6e\x67\x73']()[_0x34c6ef(0x129)], _0x2a316b = this[_0x34c6ef(0xf7)]()[_0x34c6ef(0xed)], _0x4cfa7d = this[_0x34c6ef(0xf7)]()['\x73\x74\x61\x74\x75\x73\x65\x73\x49\x63\x6f\x6e\x73\x50\x65\x72\x4c\x69\x6e\x65'], _0xa8f063 = _0x2c294f[_0x34c6ef(0xeb)](_0x5aa080 / _0x4cfa7d), _0x2e28d5 = _0x18834c % _0x4cfa7d, _0x43c149 = _0xa8f063 * (_0x2a316b + _0x494557), _0x4e70f2 = _0x2e28d5 * (_0x2a316b + _0x494557), _0x44352b = new _0x27586e['\x55\x49'][(_0x34c6ef(0xf9))]({
                        '\x76\x69\x73\x69\x62\x6c\x65': !![],
                        '\x69\x6e\x64\x65\x78': _0x24df4d,
                        '\x73\x69\x7a\x65': _0x2a316b,
                        '\x72\x6f\x6f\x74\x49\x6d\x61\x67\x65\x46\x6f\x6c\x64\x65\x72': _0x34c6ef(0xfd)
                    }), _0x33d3de[_0x34c6ef(0x125)](_0x4e70f2, _0x43c149), this[_0x34c6ef(0xfe)][_0x34c6ef(0xfb)](_0x182381), this[_0x34c6ef(0x127)][_0x34c6ef(0x11c)](_0x54135b);
                } catch (_0x177aa1) {
                    return _0x2bd2f2 = _0x177aa1, _0x3c09ed[_0x34c6ef(0x102)](_0x2bd2f2);
                }
            } else
                return _0x266d35 = _0x418786, KDCore[_0x34c6ef(0x102)](_0x266d35);
        }
    }
    [_0x428058(0xff)]() {
        var _0x33c673 = _0x428058, _0x290755;
        try {
            return _0x33c673(0x115) === _0x33c673(0xef) ? (_0x4b1492 = _0x350cec, _0x5db1dc[_0x33c673(0x102)](_0x3fe1b1)) : (this['\x5f\x73\x74\x61\x74\x75\x73\x65\x73\x49\x63\x6f\x6e\x73'] = [], this[_0x33c673(0x127)] = new Sprite(), this[_0x33c673(0x127)][_0x33c673(0x125)](this['\x73\x65\x74\x74\x69\x6e\x67\x73']()[_0x33c673(0x11a)]), this[_0x33c673(0x11c)](this[_0x33c673(0x127)]));
        } catch (_0x2a1a2f) {
            return _0x290755 = _0x2a1a2f, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x290755);
        }
    }
    [_0x428058(0x126)]() {
        var _0x32c6f7 = _0x428058, _0x4abc3f, _0x5baa93, _0x5cb29f, _0x478fac, _0x3dd615, _0x2f3783, _0x48d760, _0xc1d952;
        try {
            this['\x5f\x64\x65\x73\x74\x6f\x72\x79\x41\x63\x74\x6f\x72\x53\x74\x61\x74\x75\x73\x65\x73\x49\x63\x6f\x6e\x73'](), _0x4abc3f = this['\x5f\x63\x75\x72\x72\x65\x6e\x74\x41\x63\x74\x6f\x72']['\x61\x6c\x6c\x49\x63\x6f\x6e\x73'](), _0x4abc3f = _0x4abc3f[_0x32c6f7(0xe4)](function (_0x57e1df) {
                return _0x57e1df != null && _0x57e1df > 0x0;
            }), _0x48d760 = this[_0x32c6f7(0xf7)]()[_0x32c6f7(0xd3)], _0x4abc3f = _0x4abc3f[_0x32c6f7(0x104)](0x0, _0x48d760), _0xc1d952 = [];
            for (_0x478fac = _0x3dd615 = 0x0, _0x2f3783 = _0x4abc3f[_0x32c6f7(0xdc)]; _0x3dd615 < _0x2f3783; _0x478fac = ++_0x3dd615) {
                _0x5cb29f = _0x4abc3f[_0x478fac], _0xc1d952[_0x32c6f7(0xfb)](this[_0x32c6f7(0x11e)](_0x5cb29f, _0x478fac));
            }
            return _0xc1d952;
        } catch (_0x14223d) {
            if (_0x32c6f7(0xd9) === '\x53\x58\x46\x7a\x5a')
                return _0x5baa93 = _0x14223d, KDCore[_0x32c6f7(0x102)](_0x5baa93);
            else
                _0x2bbc61 = _0x1fb507(_0x4eea73[_0x32c6f7(0xcc)]['\x79']);
        }
    }
    [_0x428058(0x111)]() {
        var _0x242e7f = _0x428058, _0x5ae5c5, _0x492e83, _0x30819e, _0x54c9a8, _0x88db8d;
        try {
            if (_0x242e7f(0x11b) !== _0x242e7f(0x107)) {
                _0x54c9a8 = this[_0x242e7f(0xfe)];
                for (_0x492e83 = 0x0, _0x30819e = _0x54c9a8['\x6c\x65\x6e\x67\x74\x68']; _0x492e83 < _0x30819e; _0x492e83++) {
                    _0x242e7f(0xf5) === _0x242e7f(0xf5) ? (_0x88db8d = _0x54c9a8[_0x492e83], _0x88db8d[_0x242e7f(0xd0)] = ![], _0x88db8d['\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74']()) : (_0x4a631f = _0x38bef3, _0x3f4df7[_0x242e7f(0x102)](_0x24ec80), _0x21b3b9 = 0x0);
                }
                return this[_0x242e7f(0xfe)] = [];
            } else
                _0x23bef3 = _0x2e841f[_0xf9bf59], _0x46f12d[_0x242e7f(0xd0)] = ![], _0x16804a['\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74']();
        } catch (_0x55b13c) {
            return _0x5ae5c5 = _0x55b13c, KDCore[_0x242e7f(0x102)](_0x5ae5c5);
        }
    }
    [_0x428058(0x11e)](_0xcf266e, _0x25407f) {
        var _0x969afc = _0x428058, _0x5afedf, _0x20d3ec, _0x2a7776, _0x37e35a, _0x53a265, _0x94eb59, _0x16d3d7, _0xb9768e;
        try {
            return _0x53a265 = this[_0x969afc(0xf7)]()[_0x969afc(0x129)], _0x94eb59 = this[_0x969afc(0xf7)]()['\x73\x74\x61\x74\x75\x73\x65\x73\x49\x63\x6f\x6e\x73\x53\x69\x7a\x65'], _0x2a7776 = this[_0x969afc(0xf7)]()[_0x969afc(0x10c)], _0x20d3ec = Math['\x66\x6c\x6f\x6f\x72'](_0x25407f / _0x2a7776), _0x37e35a = _0x25407f % _0x2a7776, _0xb9768e = _0x20d3ec * (_0x94eb59 + _0x53a265), _0x16d3d7 = _0x37e35a * (_0x94eb59 + _0x53a265), _0xcf266e = new KDCore['\x55\x49'][(_0x969afc(0xf9))]({
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x69\x6e\x64\x65\x78': _0xcf266e,
                '\x73\x69\x7a\x65': _0x94eb59,
                '\x72\x6f\x6f\x74\x49\x6d\x61\x67\x65\x46\x6f\x6c\x64\x65\x72': '\x70\x4d\x61\x70\x45\x71\x75\x69\x70\x57\x69\x6e\x64\x6f\x77'
            }), _0xcf266e[_0x969afc(0x125)](_0x16d3d7, _0xb9768e), this[_0x969afc(0xfe)][_0x969afc(0xfb)](_0xcf266e), this[_0x969afc(0x127)][_0x969afc(0x11c)](_0xcf266e);
        } catch (_0x59f8cd) {
            if (_0x969afc(0xfa) === _0x969afc(0xfa))
                return _0x5afedf = _0x59f8cd, KDCore[_0x969afc(0x102)](_0x5afedf);
            else
                return;
        }
    }
    ['\x5f\x72\x65\x66\x72\x65\x73\x68\x50\x6f\x73\x69\x74\x69\x6f\x6e']() {
        var _0x51c2d8 = _0x428058, _0x25b25e, _0x61ae2c, _0xec3ac8, _0x256cbd;
        try {
            _0x25b25e = this[_0x51c2d8(0xf7)]();
            try {
                _0x51c2d8(0x113) === _0x51c2d8(0x113) ? _0xec3ac8 = eval(_0x25b25e[_0x51c2d8(0xcc)]['\x78']) : _0x3b9c1c['\x64\x72\x61\x77\x54\x65\x78\x74\x57\x69\x74\x68\x46\x6f\x72\x6d\x61\x74'](_0x416fa2, _0x265e5a, _0x381dbb);
            } catch (_0x376aa2) {
                if (_0x51c2d8(0xf8) !== '\x44\x50\x6c\x4f\x41')
                    _0x61ae2c = _0x376aa2, KDCore[_0x51c2d8(0x102)](_0x61ae2c), _0xec3ac8 = 0x0;
                else
                    return _0x8a3ed4[_0x51c2d8(0x108)](_0x51c2d8(0x101));
            }
            try {
                if (_0x51c2d8(0xf2) === '\x66\x50\x44\x6b\x58')
                    _0x256cbd = eval(_0x25b25e['\x70\x6f\x73\x69\x74\x69\x6f\x6e']['\x79']);
                else {
                    var _0x240db4;
                    try {
                        return this[_0x51c2d8(0x128)] = new _0x170f57['\x55\x49'][(_0x51c2d8(0x122))](this['\x6c\x65\x76\x65\x6c\x54\x65\x78\x74\x53\x65\x74\x74\x69\x6e\x67\x73']()[_0x51c2d8(0xd4)]), this['\x5f\x67\x61\x75\x67\x65']['\x64\x72\x61\x77'](0x1), this[_0x51c2d8(0x128)]['\x6d\x6f\x76\x65'](this['\x6c\x65\x76\x65\x6c\x54\x65\x78\x74\x53\x65\x74\x74\x69\x6e\x67\x73']()[_0x51c2d8(0x10f)]), this[_0x51c2d8(0x11c)](this['\x5f\x67\x61\x75\x67\x65']);
                    } catch (_0x5a7938) {
                        return _0x240db4 = _0x5a7938, _0xa249c[_0x51c2d8(0x102)](_0x240db4);
                    }
                }
            } catch (_0x2c9d47) {
                '\x45\x74\x54\x70\x66' === '\x65\x6a\x62\x72\x50' ? (_0x310ee0 = _0xa4b434, _0x48fbd5['\x77\x61\x72\x6e\x69\x6e\x67'](_0x35399e)) : (_0x61ae2c = _0x2c9d47, KDCore[_0x51c2d8(0x102)](_0x61ae2c), _0x256cbd = 0x0);
            }
            return this[_0x51c2d8(0x125)](_0xec3ac8, _0x256cbd);
        } catch (_0x255cfd) {
            return _0x61ae2c = _0x255cfd, KDCore[_0x51c2d8(0x102)](_0x61ae2c);
        }
    }
};

function _0x3552(_0x5679ef, _0x386ba6) {
    var _0x17696c = _0x1769();
    return _0x3552 = function (_0x355258, _0x32530e) {
        _0x355258 = _0x355258 - 0x156;
        var _0x2c9bbb = _0x17696c[_0x355258];
        return _0x2c9bbb;
    }, _0x3552(_0x5679ef, _0x386ba6);
}
var _0x1df209 = _0x3552;
(function (_0x1ba7e4, _0x3c1cc8) {
    var _0x27fe82 = _0x3552, _0x4adeaf = _0x1ba7e4();
    while (!![]) {
        try {
            var _0x286f30 = parseInt(_0x27fe82(0x165)) / 0x1 + -parseInt(_0x27fe82(0x176)) / 0x2 + -parseInt(_0x27fe82(0x19e)) / 0x3 * (parseInt(_0x27fe82(0x190)) / 0x4) + parseInt(_0x27fe82(0x16e)) / 0x5 + parseInt(_0x27fe82(0x156)) / 0x6 + -parseInt(_0x27fe82(0x198)) / 0x7 * (parseInt(_0x27fe82(0x167)) / 0x8) + -parseInt(_0x27fe82(0x174)) / 0x9 * (-parseInt(_0x27fe82(0x168)) / 0xa);
            if (_0x286f30 === _0x3c1cc8)
                break;
            else
                _0x4adeaf['push'](_0x4adeaf['shift']());
        } catch (_0x45f885) {
            _0x4adeaf['push'](_0x4adeaf['shift']());
        }
    }
}(_0x1769, 0x48773));
var PKD_Sprite_MEW_EquipStatus;
function _0x1769() {
    var _0x3b9a73 = [
        '\x5f\x63\x75\x72\x72\x65\x6e\x74\x41\x63\x74\x6f\x72',
        '\x6a\x77\x46\x43\x79',
        '\x5f\x64\x65\x73\x74\x72\x6f\x79\x53\x74\x61\x74\x73',
        '\x72\x65\x73\x65\x74\x43\x6f\x6d\x70\x61\x72\x65\x4d\x6f\x64\x65',
        '\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65',
        '\x68\x69\x64\x65',
        '\x5f\x67\x65\x74\x43\x6f\x6d\x70\x61\x72\x65\x56\x61\x6c\x75\x65',
        '\x78\x69\x48\x48\x4e',
        '\x70\x6c\x61\x63\x65\x52\x65\x6c\x61\x74\x69\x76\x65\x54\x6f',
        '\x5f\x67\x65\x74\x53\x74\x61\x74\x73\x54\x6f\x44\x72\x61\x77',
        '\x5f\x69\x74\x65\x6d\x54\x6f\x43\x6f\x6d\x70\x61\x72\x65',
        '\x6d\x61\x6b\x65\x44\x65\x65\x70\x43\x6f\x70\x79',
        '\x69\x73\x41\x6c\x77\x61\x79\x73\x56\x69\x73\x69\x62\x6c\x65',
        '\x5f\x63\x72\x65\x61\x74\x65\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64',
        '\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74',
        '\x5f\x69\x73\x4e\x65\x65\x64\x52\x65\x64\x72\x61\x77',
        '\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65',
        '\x70\x75\x73\x68',
        '\x34\x4c\x70\x77\x6f\x54\x42',
        '\x73\x65\x74\x49\x74\x65\x6d\x54\x6f\x43\x6f\x6d\x70\x61\x72\x65',
        '\x5f\x69\x73\x43\x6f\x6d\x70\x61\x72\x65\x4d\x6f\x64\x65',
        '\x73\x65\x74\x74\x69\x6e\x67\x73',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x5f\x73\x74\x61\x74\x73\x45\x6c\x65\x6d\x65\x6e\x74\x73',
        '\x53\x70\x72\x69\x74\x65',
        '\x66\x41\x42\x48\x75',
        '\x34\x32\x35\x38\x31\x37\x6e\x75\x74\x47\x67\x5a',
        '\x68\x78\x67\x77\x5a',
        '\x69\x4d\x53\x67\x58',
        '\x61\x4f\x4c\x62\x67',
        '\x72\x65\x73\x65\x74\x43\x6f\x6d\x70\x61\x72\x65\x49\x74\x65\x6d',
        '\x73\x65\x74\x41\x63\x74\x6f\x72',
        '\x35\x31\x30\x39\x35\x34\x49\x7a\x55\x64\x6a\x6f',
        '\x5f\x61\x63\x74\x69\x76\x65\x45\x71\x75\x69\x70\x53\x6c\x6f\x74',
        '\x57\x62\x61\x51\x67',
        '\x32\x33\x39\x31\x33\x31\x32\x69\x49\x46\x68\x47\x73',
        '\x70\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x5f\x63\x72\x65\x61\x74\x65',
        '\x75\x56\x50\x58\x61',
        '\x59\x70\x66\x4d\x65',
        '\x76\x69\x73\x69\x62\x6c\x65',
        '\x72\x65\x66\x72\x65\x73\x68',
        '\x67\x65\x74\x53\x74\x61\x74\x75\x73\x57\x69\x6e\x64\x6f\x77\x50\x6f\x73\x69\x74\x69\x6f\x6e\x46\x6f\x72\x53\x6c\x6f\x74\x49\x6e\x64\x65\x78',
        '\x67\x65\x74\x53\x74\x61\x74\x73\x4c\x69\x73\x74',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x44\x6a\x57\x75\x59',
        '\x66\x6f\x72\x63\x65\x52\x65\x66\x72\x65\x73\x68',
        '\x49\x53\x5a\x58\x41',
        '\x56\x46\x6c\x54\x68',
        '\x69\x73\x43\x6f\x6d\x70\x61\x72\x65\x4d\x6f\x64\x65',
        '\x31\x30\x37\x36\x38\x31\x51\x4b\x62\x7a\x65\x4c',
        '\x73\x77\x64\x46\x67',
        '\x34\x38\x4f\x6c\x47\x78\x67\x52',
        '\x32\x37\x30\x34\x38\x39\x30\x6a\x4a\x75\x4d\x6e\x72',
        '\x73\x61\x76\x57\x41',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x79\x46\x72\x46\x48',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x74\x61\x74\x73',
        '\x70\x64\x54\x69\x70',
        '\x33\x34\x36\x39\x36\x30\x5a\x6a\x4d\x56\x46\x46',
        '\x5f\x73\x74\x61\x74\x73\x4c\x61\x79\x65\x72',
        '\x61\x6e\x79',
        '\x4a\x46\x74\x78\x68',
        '\x5f\x72\x65\x66\x72\x65\x73\x68\x43\x6f\x6d\x70\x61\x72\x65\x41\x63\x74\x6f\x72',
        '\x5f\x72\x65\x64\x72\x61\x77\x41\x6c\x6c',
        '\x39\x58\x68\x57\x5a\x47\x66',
        '\x6c\x6f\x61\x64\x50\x69\x63\x74\x75\x72\x65\x46\x6f\x72\x5f\x50\x4b\x44\x5f\x4d\x61\x70\x45\x71\x75\x69\x70\x57\x69\x6e\x64\x6f\x77',
        '\x32\x37\x39\x38\x32\x54\x64\x6a\x4d\x42\x51',
        '\x66\x6f\x72\x63\x65\x43\x68\x61\x6e\x67\x65\x45\x71\x75\x69\x70',
        '\x4d\x65\x69\x6a\x44',
        '\x6d\x6f\x76\x65',
        '\x65\x5a\x71\x66\x71',
        '\x78\x6b\x57\x65\x65',
        '\x5f\x63\x6f\x6d\x70\x61\x72\x65\x41\x63\x74\x6f\x72',
        '\x63\x4e\x65\x44\x51'
    ];
    _0x1769 = function () {
        return _0x3b9a73;
    };
    return _0x1769();
}
PKD_Sprite_MEW_EquipStatus = class PKD_Sprite_MEW_EquipStatus extends KDCore[_0x1df209(0x196)] {
    constructor() {
        var _0x4783b7 = _0x1df209;
        super(), this['\x72\x65\x73\x65\x74\x43\x6f\x6d\x70\x61\x72\x65\x49\x74\x65\x6d'](), this['\x5f\x63\x72\x65\x61\x74\x65'](), this[_0x4783b7(0x186)](null);
        !this[_0x4783b7(0x193)]()[_0x4783b7(0x18a)] && this[_0x4783b7(0x183)]();
        return;
    }
    [_0x1df209(0x164)]() {
        var _0x3dd04a = _0x1df209;
        return this[_0x3dd04a(0x192)] === !![];
    }
    [_0x1df209(0x19c)]() {
        var _0x2e24f4 = _0x1df209;
        if (this[_0x2e24f4(0x164)]()) {
            if ('\x63\x4b\x4f\x4e\x4a' === _0x2e24f4(0x19b))
                return this[_0x2e24f4(0x195)] = [], this[_0x2e24f4(0x16f)] = new _0x36320f(), this[_0x2e24f4(0x194)](this['\x5f\x73\x74\x61\x74\x73\x4c\x61\x79\x65\x72']);
            else
                this['\x5f\x69\x73\x4e\x65\x65\x64\x52\x65\x64\x72\x61\x77'] = !![];
        }
        this[_0x2e24f4(0x192)] = ![], this[_0x2e24f4(0x19f)] = null, this[_0x2e24f4(0x188)] = null;
    }
    ['\x73\x68\x6f\x77']() {
        return this['\x76\x69\x73\x69\x62\x6c\x65'] = !![];
    }
    ['\x68\x69\x64\x65']() {
        var _0x3dec25 = _0x1df209;
        this['\x72\x65\x73\x65\x74\x43\x6f\x6d\x70\x61\x72\x65\x49\x74\x65\x6d'](), this[_0x3dec25(0x15c)](), !this[_0x3dec25(0x193)]()[_0x3dec25(0x18a)] && (this['\x76\x69\x73\x69\x62\x6c\x65'] = ![]);
    }
    [_0x1df209(0x191)](_0x1a1977, _0x27c13f) {
        var _0x567019 = _0x1df209, _0x1f0f5e;
        try {
            return this[_0x567019(0x192)] === ![] && (this[_0x567019(0x18d)] = !![]), this[_0x567019(0x19f)] !== _0x1a1977 && (this[_0x567019(0x18d)] = !![]), this['\x5f\x69\x74\x65\x6d\x54\x6f\x43\x6f\x6d\x70\x61\x72\x65'] !== _0x27c13f && (this[_0x567019(0x18d)] = !![]), this[_0x567019(0x19f)] = _0x1a1977, this[_0x567019(0x188)] = _0x27c13f, this[_0x567019(0x192)] = !![];
        } catch (_0x4531cc) {
            return _0x567019(0x163) !== _0x567019(0x17f) ? (_0x1f0f5e = _0x4531cc, KDCore[_0x567019(0x15f)](_0x1f0f5e)) : null;
        }
    }
    ['\x72\x65\x73\x65\x74\x43\x6f\x6d\x70\x61\x72\x65\x4d\x6f\x64\x65']() {
        var _0x29b649 = _0x1df209, _0x2e501e;
        try {
            if (_0x29b649(0x1a0) === _0x29b649(0x171))
                _0x5560b5 = _0x207312, _0x19bd08[_0x29b649(0x15f)](_0x49cc2d), _0x377fce = 0x0, _0x5a2309 = 0x0;
            else
                return this[_0x29b649(0x19c)]();
        } catch (_0x4874ea) {
            return _0x2e501e = _0x4874ea, KDCore[_0x29b649(0x15f)](_0x2e501e);
        }
    }
    [_0x1df209(0x19d)](_0x2244ed) {
        var _0x3a2afc = _0x1df209, _0x4b026e;
        this[_0x3a2afc(0x17e)] = _0x2244ed;
        try {
            if (_0x3a2afc(0x159) === '\x75\x56\x50\x58\x61') {
                if (this[_0x3a2afc(0x17e)] == null)
                    return;
                return this[_0x3a2afc(0x181)](), this[_0x3a2afc(0x173)]();
            } else
                return this[_0x3a2afc(0x192)] === ![] && (this[_0x3a2afc(0x18d)] = !![]), this[_0x3a2afc(0x19f)] !== _0x152a5c && (this[_0x3a2afc(0x18d)] = !![]), this[_0x3a2afc(0x188)] !== _0x5f105a && (this[_0x3a2afc(0x18d)] = !![]), this[_0x3a2afc(0x19f)] = _0x1f2f08, this[_0x3a2afc(0x188)] = _0x37f8b2, this['\x5f\x69\x73\x43\x6f\x6d\x70\x61\x72\x65\x4d\x6f\x64\x65'] = !![];
        } catch (_0x35421e) {
            return '\x44\x49\x46\x78\x68' !== '\x70\x4a\x64\x55\x51' ? (_0x4b026e = _0x35421e, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x4b026e)) : this[_0x3a2afc(0x17c)][_0xee1da9[_0x3a2afc(0x182)]()];
        }
    }
    [_0x1df209(0x15c)]() {
        var _0x5ef3ce = _0x1df209, _0x3200ec;
        try {
            if ('\x79\x46\x72\x46\x48' !== _0x5ef3ce(0x16b)) {
                var _0x19c7c9;
                try {
                    return this[_0x5ef3ce(0x195)] = [], this[_0x5ef3ce(0x16f)] = new _0x15b751(), this[_0x5ef3ce(0x194)](this[_0x5ef3ce(0x16f)]);
                } catch (_0x364326) {
                    return _0x19c7c9 = _0x364326, _0x2f3ccb['\x77\x61\x72\x6e\x69\x6e\x67'](_0x19c7c9);
                }
            } else {
                if (this['\x5f\x69\x73\x4e\x65\x65\x64\x52\x65\x64\x72\x61\x77'] === !![])
                    return _0x5ef3ce(0x185) === _0x5ef3ce(0x185) ? (this[_0x5ef3ce(0x173)](), this[_0x5ef3ce(0x18d)] = ![]) : (this[_0x5ef3ce(0x173)](), this[_0x5ef3ce(0x18d)] = ![]);
            }
        } catch (_0x59653e) {
            return '\x76\x55\x6e\x47\x44' === '\x76\x55\x6e\x47\x44' ? (_0x3200ec = _0x59653e, KDCore[_0x5ef3ce(0x15f)](_0x3200ec)) : (_0x41cd03 = _0x3d4109, _0x5e1ece[_0x5ef3ce(0x15f)](_0x3d2adb));
        }
    }
    [_0x1df209(0x161)]() {
        var _0x1022b9 = _0x1df209;
        return this[_0x1022b9(0x173)]();
    }
    [_0x1df209(0x180)]() {
        var _0x3865de = _0x1df209, _0x1b842e, _0x336524, _0x1b707a, _0x1486c6, _0x299ecb;
        try {
            if (_0x3865de(0x197) === '\x66\x41\x42\x48\x75') {
                if (this[_0x3865de(0x195)] == null)
                    return;
                _0x1486c6 = this[_0x3865de(0x195)];
                for (_0x336524 = 0x0, _0x1b707a = _0x1486c6['\x6c\x65\x6e\x67\x74\x68']; _0x336524 < _0x1b707a; _0x336524++) {
                    '\x76\x6e\x68\x4f\x66' !== _0x3865de(0x178) ? (_0x299ecb = _0x1486c6[_0x336524], _0x299ecb[_0x3865de(0x15b)] = ![], _0x299ecb[_0x3865de(0x18c)]()) : this['\x5f\x69\x73\x4e\x65\x65\x64\x52\x65\x64\x72\x61\x77'] = !![];
                }
                return this[_0x3865de(0x195)] = [];
            } else {
                var _0x1302d4, _0x3afd0e;
                _0x3afd0e = this[_0x3865de(0x193)]()[_0x3865de(0x18e)], _0x433353[_0x3865de(0x170)](_0x3afd0e) && (_0x1302d4 = new _0x166530['\x53\x70\x72\x69\x74\x65'](_0x4c3b9c[_0x3865de(0x175)](_0x3afd0e)), this[_0x3865de(0x194)](_0x1302d4));
            }
        } catch (_0x6ae813) {
            return _0x3865de(0x169) === '\x73\x61\x76\x57\x41' ? (_0x1b842e = _0x6ae813, KDCore[_0x3865de(0x15f)](_0x1b842e)) : (_0x3e138b = _0x4aa531, _0x29765a['\x77\x61\x72\x6e\x69\x6e\x67'](_0x28403b));
        }
    }
    [_0x1df209(0x173)]() {
        var _0x263a74 = _0x1df209, _0x1d5445, _0x1632fb, _0x453359, _0xe00640, _0x4c6284, _0x2559e9, _0x38e12a;
        try {
            this['\x5f\x64\x65\x73\x74\x72\x6f\x79\x53\x74\x61\x74\x73'](), this[_0x263a74(0x172)](), _0xe00640 = this[_0x263a74(0x187)](), _0x4c6284 = [];
            for (_0x1632fb = 0x0, _0x453359 = _0xe00640[_0x263a74(0x16a)]; _0x1632fb < _0x453359; _0x1632fb++) {
                if (_0x263a74(0x19a) === _0x263a74(0x160)) {
                    if (!this[_0x263a74(0x164)]()) {
                        this[_0x263a74(0x17c)] = null;
                        return;
                    }
                    _0x4492d6 = _0x4b5063[_0x263a74(0x189)](this[_0x263a74(0x17e)]), _0x2d0b5e[_0x263a74(0x177)](this['\x5f\x61\x63\x74\x69\x76\x65\x45\x71\x75\x69\x70\x53\x6c\x6f\x74'], this[_0x263a74(0x188)]), this[_0x263a74(0x17c)] = _0x3a5c3b;
                } else
                    _0x2559e9 = _0xe00640[_0x1632fb], _0x38e12a = new PKD_Sprite_MEW_StatElement(_0x2559e9, this[_0x263a74(0x17e)][_0x2559e9['\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65']()], this[_0x263a74(0x184)](_0x2559e9)), _0x38e12a['\x72\x65\x66\x72\x65\x73\x68'](), this[_0x263a74(0x16f)]['\x61\x64\x64\x43\x68\x69\x6c\x64'](_0x38e12a), _0x4c6284[_0x263a74(0x18f)](this[_0x263a74(0x195)][_0x263a74(0x18f)](_0x38e12a));
            }
            return _0x4c6284;
        } catch (_0xb23529) {
            return _0x1d5445 = _0xb23529, KDCore[_0x263a74(0x15f)](_0x1d5445);
        }
    }
    [_0x1df209(0x187)]() {
        var _0x5078f7 = _0x1df209;
        return PKD_MapEquipWindow['\x50\x50'][_0x5078f7(0x15e)]();
    }
    [_0x1df209(0x172)]() {
        var _0x444f23 = _0x1df209, _0x4e961c, _0x79b8ec;
        try {
            if (!this['\x69\x73\x43\x6f\x6d\x70\x61\x72\x65\x4d\x6f\x64\x65']()) {
                this[_0x444f23(0x17c)] = null;
                return;
            }
            _0x4e961c = JsonEx[_0x444f23(0x189)](this[_0x444f23(0x17e)]), _0x4e961c[_0x444f23(0x177)](this[_0x444f23(0x19f)], this[_0x444f23(0x188)]), this[_0x444f23(0x17c)] = _0x4e961c;
        } catch (_0x118e98) {
            _0x79b8ec = _0x118e98, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x79b8ec), this[_0x444f23(0x17c)] = null;
        }
    }
    [_0x1df209(0x184)](_0x1fa72d) {
        var _0x5d8d53 = _0x1df209;
        if (this[_0x5d8d53(0x17c)] != null) {
            if (_0x5d8d53(0x162) === _0x5d8d53(0x199))
                this['\x5f\x69\x73\x4e\x65\x65\x64\x52\x65\x64\x72\x61\x77'] = !![];
            else
                return this[_0x5d8d53(0x17c)][_0x1fa72d[_0x5d8d53(0x182)]()];
        } else
            return null;
    }
    [_0x1df209(0x186)](_0x5d6667) {
        var _0x4cc6a8 = _0x1df209, _0x32b296, _0x5bfeaa, _0x4f03ae, _0x1df29c, _0x275136;
        try {
            _0x4f03ae = null;
            _0x5d6667 != null && (_0x4f03ae = PKD_MapEquipWindow['\x50\x50'][_0x4cc6a8(0x15d)](_0x5d6667));
            if (_0x4f03ae != null) {
                if (_0x4cc6a8(0x17d) !== _0x4cc6a8(0x17d))
                    return _0x41a35d = _0xb77339, _0x47761f[_0x4cc6a8(0x15f)](_0x5e35a3);
                else
                    ({
                        x: _0x1df29c,
                        y: _0x275136
                    } = _0x4f03ae);
            } else {
                _0x5bfeaa = this[_0x4cc6a8(0x193)](), {
                    x: _0x1df29c,
                    y: _0x275136
                } = _0x5bfeaa[_0x4cc6a8(0x157)];
                try {
                    _0x1df29c = eval(_0x1df29c), _0x275136 = eval(_0x275136);
                } catch (_0x366ab2) {
                    _0x32b296 = _0x366ab2, KDCore[_0x4cc6a8(0x15f)](_0x32b296), _0x1df29c = 0x0, _0x275136 = 0x0;
                }
            }
            return this[_0x4cc6a8(0x179)](_0x1df29c, _0x275136);
        } catch (_0x4788f3) {
            if (_0x4cc6a8(0x17a) === '\x64\x54\x62\x4c\x73') {
                var _0x2ba17e;
                try {
                    return this[_0x4cc6a8(0x19c)]();
                } catch (_0x4750ce) {
                    return _0x2ba17e = _0x4750ce, _0x3b108d['\x77\x61\x72\x6e\x69\x6e\x67'](_0x2ba17e);
                }
            } else
                return _0x32b296 = _0x4788f3, KDCore[_0x4cc6a8(0x15f)](_0x32b296);
        }
    }
    [_0x1df209(0x193)]() {
        return $ppJson_MEW_StatusWindowSettings;
    }
    [_0x1df209(0x158)]() {
        var _0x1cc360 = _0x1df209, _0x1fcb27;
        try {
            return _0x1cc360(0x15a) !== _0x1cc360(0x15a) ? this['\x5f\x69\x73\x43\x6f\x6d\x70\x61\x72\x65\x4d\x6f\x64\x65'] === !![] : (this[_0x1cc360(0x18b)](), this[_0x1cc360(0x16c)]());
        } catch (_0x33f97c) {
            return _0x1fcb27 = _0x33f97c, KDCore[_0x1cc360(0x15f)](_0x1fcb27);
        }
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64']() {
        var _0x132b90 = _0x1df209, _0x1dda59, _0x40548a;
        _0x40548a = this['\x73\x65\x74\x74\x69\x6e\x67\x73']()[_0x132b90(0x18e)], String[_0x132b90(0x170)](_0x40548a) && ('\x73\x77\x64\x46\x67' !== _0x132b90(0x166) ? {
            x: _0x57a149,
            y: _0x5c434b
        } = _0xaac4bc : (_0x1dda59 = new KDCore[(_0x132b90(0x196))](ImageManager[_0x132b90(0x175)](_0x40548a)), this[_0x132b90(0x194)](_0x1dda59)));
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x53\x74\x61\x74\x73']() {
        var _0x275eca = _0x1df209, _0x354b63;
        try {
            return this[_0x275eca(0x195)] = [], this[_0x275eca(0x16f)] = new Sprite(), this[_0x275eca(0x194)](this[_0x275eca(0x16f)]);
        } catch (_0x54e39b) {
            if (_0x275eca(0x17b) === _0x275eca(0x16d))
                this['\x69\x73\x43\x6f\x6d\x70\x61\x72\x65\x4d\x6f\x64\x65']() && (this[_0x275eca(0x18d)] = !![]), this[_0x275eca(0x192)] = ![], this['\x5f\x61\x63\x74\x69\x76\x65\x45\x71\x75\x69\x70\x53\x6c\x6f\x74'] = null, this[_0x275eca(0x188)] = null;
            else
                return _0x354b63 = _0x54e39b, KDCore[_0x275eca(0x15f)](_0x354b63);
        }
    }
};

var _0x60c1a2 = _0x3f98;
function _0x3f98(_0x27e47f, _0x559b44) {
    var _0x54712e = _0x5471();
    return _0x3f98 = function (_0x3f9821, _0x17a1ab) {
        _0x3f9821 = _0x3f9821 - 0x9d;
        var _0x76eaac = _0x54712e[_0x3f9821];
        return _0x76eaac;
    }, _0x3f98(_0x27e47f, _0x559b44);
}
(function (_0xc41e5d, _0x4aeb10) {
    var _0x45ae1d = _0x3f98, _0x4c15af = _0xc41e5d();
    while (!![]) {
        try {
            var _0x2df070 = parseInt(_0x45ae1d(0xac)) / 0x1 * (-parseInt(_0x45ae1d(0xc6)) / 0x2) + parseInt(_0x45ae1d(0xd1)) / 0x3 + -parseInt(_0x45ae1d(0xba)) / 0x4 * (-parseInt(_0x45ae1d(0xc0)) / 0x5) + -parseInt(_0x45ae1d(0xa2)) / 0x6 * (parseInt(_0x45ae1d(0xd0)) / 0x7) + parseInt(_0x45ae1d(0xca)) / 0x8 + parseInt(_0x45ae1d(0xcf)) / 0x9 * (-parseInt(_0x45ae1d(0xad)) / 0xa) + parseInt(_0x45ae1d(0xc4)) / 0xb * (parseInt(_0x45ae1d(0xb5)) / 0xc);
            if (_0x2df070 === _0x4aeb10)
                break;
            else
                _0x4c15af['push'](_0x4c15af['shift']());
        } catch (_0x4e84a8) {
            _0x4c15af['push'](_0x4c15af['shift']());
        }
    }
}(_0x5471, 0xcd9e7));
var PKD_Sprite_MEW_StatElement;
PKD_Sprite_MEW_StatElement = class PKD_Sprite_MEW_StatElement extends KDCore[_0x60c1a2(0xa1)] {
    constructor(_0x12d882, _0x4f48bb, _0x23d07d) {
        var _0x442902 = _0x60c1a2;
        super(), this[_0x442902(0xaf)] = _0x12d882, this['\x76\x61\x6c\x75\x65\x41'] = _0x4f48bb, this[_0x442902(0xaa)] = _0x23d07d, this['\x5f\x63\x72\x65\x61\x74\x65'](), this[_0x442902(0xa9)](), this['\x72\x65\x66\x72\x65\x73\x68']();
        return;
    }
    [_0x60c1a2(0xcb)]() {
        return $ppJson_MEW_StatusWindowSettings;
    }
    ['\x69\x73\x43\x6f\x6d\x70\x61\x72\x65\x4d\x6f\x64\x65']() {
        var _0x2578d4 = _0x60c1a2;
        return this[_0x2578d4(0xaa)] != null;
    }
    [_0x60c1a2(0xc9)]() {
        var _0xc71ba4 = _0x60c1a2;
        return PKD_MapEquipWindow['\x50\x50']['\x67\x65\x74\x53\x74\x61\x74\x44\x61\x74\x61'](this[_0xc71ba4(0xaf)]);
    }
    [_0x60c1a2(0xc2)]() {
        var _0x51c69d = _0x60c1a2;
        return this[_0x51c69d(0xc9)]()[_0x51c69d(0xa8)];
    }
    ['\x67\x65\x74\x53\x74\x61\x74\x65\x50\x6c\x61\x63\x65\x6d\x65\x6e\x74']() {
        var _0x13a1c7 = _0x60c1a2, _0x37623e;
        try {
            return _0x13a1c7(0xc1) === _0x13a1c7(0xc1) ? this['\x67\x65\x74\x53\x74\x61\x74\x44\x61\x74\x61']()['\x70\x6f\x73\x69\x74\x69\x6f\x6e'] : (_0x18b45e = _0x2725c4, _0x498d6d['\x77\x61\x72\x6e\x69\x6e\x67'](_0x4075d4));
        } catch (_0xd092bb) {
            return _0x37623e = _0xd092bb, KDCore[_0x13a1c7(0xa7)](_0x37623e), {
                '\x78': 0x0,
                '\x79': 0x0
            };
        }
    }
    [_0x60c1a2(0xc3)]() {
        var _0x20bcde = _0x60c1a2, _0x3795dc;
        try {
            return this[_0x20bcde(0xb0)]() ? (this[_0x20bcde(0x9f)][_0x20bcde(0xa0)](this[_0x20bcde(0xaa)] - this['\x76\x61\x6c\x75\x65\x41']), this['\x5f\x73\x74\x61\x74\x47\x61\x75\x67\x65'][_0x20bcde(0xc7)](this['\x5f\x67\x65\x74\x43\x6f\x6d\x70\x61\x72\x65\x52\x61\x74\x65\x46\x6f\x72\x47\x61\x75\x67\x65']()), this[_0x20bcde(0x9f)][_0x20bcde(0x9e)] = !![], this['\x5f\x73\x74\x61\x74\x56\x61\x6c\x54\x65\x78\x74'][_0x20bcde(0xa0)](this['\x76\x61\x6c\x75\x65\x42'] - this[_0x20bcde(0x9d)]), this[_0x20bcde(0xce)][_0x20bcde(0xcc)](this[_0x20bcde(0xbd)](this[_0x20bcde(0xaa)]))) : _0x20bcde(0xa6) !== _0x20bcde(0xc8) ? (this[_0x20bcde(0x9f)][_0x20bcde(0xa0)](0x0), this[_0x20bcde(0x9f)][_0x20bcde(0xc7)](0x1), this[_0x20bcde(0x9f)][_0x20bcde(0x9e)] = ![], this[_0x20bcde(0xce)]['\x73\x65\x74\x4d\x6f\x64\x65'](null), this[_0x20bcde(0xce)][_0x20bcde(0xcc)](this[_0x20bcde(0xbd)](this[_0x20bcde(0x9d)]))) : this[_0x20bcde(0xc9)]()[_0x20bcde(0xbc)];
        } catch (_0x16e3d4) {
            return _0x3795dc = _0x16e3d4, KDCore[_0x20bcde(0xa7)](_0x3795dc);
        }
    }
    [_0x60c1a2(0xbd)](_0x3e71a5) {
        var _0x1b63a8 = _0x60c1a2, _0x2d357a, _0x2890a5, _0x5a4bca;
        try {
            _0x2890a5 = this[_0x1b63a8(0xc9)]()[_0x1b63a8(0xbb)], String[_0x1b63a8(0xb4)](_0x2890a5) ? _0x5a4bca = _0x3e71a5 + '' + _0x2890a5 : _0x5a4bca = _0x3e71a5;
        } catch (_0x36b948) {
            return _0x2d357a = _0x36b948, KDCore[_0x1b63a8(0xa7)](_0x2d357a), '\x3f';
        }
        return _0x5a4bca;
    }
    [_0x60c1a2(0xa5)]() {
        var _0x40130e = _0x60c1a2, _0x236115, _0x41d8d4, _0x203c49;
        try {
            if (this[_0x40130e(0x9d)] === this['\x76\x61\x6c\x75\x65\x42']) {
                if (_0x40130e(0xa3) === _0x40130e(0xbe)) {
                    var _0x2f944d;
                    try {
                        return this[_0x40130e(0xd3)](this[_0x40130e(0xb8)]());
                    } catch (_0xc9dec6) {
                        return _0x2f944d = _0xc9dec6, _0x38aa41[_0x40130e(0xa7)](_0x2f944d);
                    }
                } else
                    return 0x0;
            }
            return _0x41d8d4 = Math[_0x40130e(0xb9)](this[_0x40130e(0x9d)], this[_0x40130e(0xaa)]), _0x203c49 = Math['\x6d\x69\x6e'](this[_0x40130e(0x9d)], this[_0x40130e(0xaa)]), _0x203c49 / _0x41d8d4;
        } catch (_0x2aca40) {
            _0x236115 = _0x2aca40, KDCore[_0x40130e(0xa7)](_0x236115);
        }
        return 0x0;
    }
    ['\x5f\x63\x72\x65\x61\x74\x65']() {
        var _0x502ae6 = _0x60c1a2, _0x31a072;
        try {
            return this[_0x502ae6(0xa4)](), this[_0x502ae6(0xbf)](), this[_0x502ae6(0xd2)]();
        } catch (_0x35908a) {
            return _0x502ae6(0xb3) === '\x46\x43\x4f\x68\x53' ? (_0x31a072 = _0x35908a, KDCore[_0x502ae6(0xa7)](_0x31a072)) : (_0x5d50e = this['\x67\x65\x74\x53\x74\x61\x74\x65\x49\x63\x6f\x6e\x49\x6d\x61\x67\x65\x4e\x61\x6d\x65'](), this[_0x502ae6(0xb2)] = new _0x27a5b0[(_0x502ae6(0xa1))](_0x35e812[_0x502ae6(0xb6)](_0x1b1795)), this['\x61\x64\x64\x43\x68\x69\x6c\x64'](this[_0x502ae6(0xb2)]));
        }
    }
    [_0x60c1a2(0xa4)]() {
        var _0x33fa14 = _0x60c1a2, _0x591155, _0x306a79;
        try {
            return _0x306a79 = this[_0x33fa14(0xc2)](), this['\x5f\x73\x74\x61\x74\x49\x6d\x61\x67\x65'] = new KDCore[(_0x33fa14(0xa1))](ImageManager[_0x33fa14(0xb6)](_0x306a79)), this[_0x33fa14(0xc5)](this[_0x33fa14(0xb2)]);
        } catch (_0x344985) {
            return '\x52\x42\x4b\x58\x6f' === '\x52\x42\x4b\x58\x6f' ? (_0x591155 = _0x344985, KDCore[_0x33fa14(0xa7)](_0x591155)) : (this[_0x33fa14(0xce)] = new _0x3d7c6c(), this['\x5f\x73\x74\x61\x74\x56\x61\x6c\x54\x65\x78\x74'][_0x33fa14(0xd3)](this[_0x33fa14(0xcb)]()['\x73\x74\x61\x74\x56\x61\x6c\x75\x65\x54\x65\x78\x74\x50\x6f\x73\x69\x74\x69\x6f\x6e\x52\x65\x6c\x61\x74\x69\x76\x65\x49\x63\x6f\x6e']), this[_0x33fa14(0xc5)](this['\x5f\x73\x74\x61\x74\x56\x61\x6c\x54\x65\x78\x74']));
        }
    }
    [_0x60c1a2(0xbf)]() {
        var _0x57b5a4 = _0x60c1a2, _0x19f629;
        try {
            return this['\x5f\x73\x74\x61\x74\x56\x61\x6c\x54\x65\x78\x74'] = new PKD_Sprite_MEW_StatValText(), this[_0x57b5a4(0xce)]['\x6d\x6f\x76\x65'](this[_0x57b5a4(0xcb)]()[_0x57b5a4(0xb7)]), this[_0x57b5a4(0xc5)](this[_0x57b5a4(0xce)]);
        } catch (_0x3bd69d) {
            return _0x19f629 = _0x3bd69d, KDCore[_0x57b5a4(0xa7)](_0x19f629);
        }
    }
    ['\x5f\x63\x72\x65\x61\x74\x65\x53\x74\x61\x74\x47\x61\x75\x67\x65']() {
        var _0x19d433 = _0x60c1a2, _0x327e41;
        try {
            return this[_0x19d433(0x9f)] = new PKD_Sprite_MEW_StatGauge(), this[_0x19d433(0x9f)][_0x19d433(0xd3)](this[_0x19d433(0xcb)]()[_0x19d433(0xb1)]), this[_0x19d433(0xc5)](this[_0x19d433(0x9f)]);
        } catch (_0x4b1e67) {
            return _0x327e41 = _0x4b1e67, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x327e41);
        }
    }
    [_0x60c1a2(0xa9)]() {
        var _0x2166d4 = _0x60c1a2, _0x5aff6b;
        try {
            if (_0x2166d4(0xae) !== _0x2166d4(0xab))
                return this[_0x2166d4(0xd3)](this[_0x2166d4(0xb8)]());
            else {
                if (this[_0x2166d4(0x9d)] === this[_0x2166d4(0xaa)])
                    return 0x0;
                return _0x2d4427 = _0xc5889e[_0x2166d4(0xb9)](this[_0x2166d4(0x9d)], this[_0x2166d4(0xaa)]), _0x21c356 = _0x4e3fd0[_0x2166d4(0xcd)](this[_0x2166d4(0x9d)], this['\x76\x61\x6c\x75\x65\x42']), _0x40b21c / _0x2ae528;
            }
        } catch (_0x199be7) {
            return _0x5aff6b = _0x199be7, KDCore[_0x2166d4(0xa7)](_0x5aff6b);
        }
    }
};
function _0x5471() {
    var _0x452b2e = [
        '\x5f\x73\x74\x61\x74\x49\x6d\x61\x67\x65',
        '\x46\x43\x4f\x68\x53',
        '\x61\x6e\x79',
        '\x35\x30\x30\x34\x78\x71\x79\x48\x51\x70',
        '\x6c\x6f\x61\x64\x50\x69\x63\x74\x75\x72\x65\x46\x6f\x72\x5f\x50\x4b\x44\x5f\x4d\x61\x70\x45\x71\x75\x69\x70\x57\x69\x6e\x64\x6f\x77',
        '\x73\x74\x61\x74\x56\x61\x6c\x75\x65\x54\x65\x78\x74\x50\x6f\x73\x69\x74\x69\x6f\x6e\x52\x65\x6c\x61\x74\x69\x76\x65\x49\x63\x6f\x6e',
        '\x67\x65\x74\x53\x74\x61\x74\x65\x50\x6c\x61\x63\x65\x6d\x65\x6e\x74',
        '\x6d\x61\x78',
        '\x33\x32\x30\x38\x4a\x6f\x6f\x4f\x54\x62',
        '\x65\x78\x74\x72\x61\x54\x65\x78\x74',
        '\x70\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x5f\x67\x65\x74\x44\x69\x73\x70\x6c\x61\x79\x65\x64\x54\x65\x78\x74',
        '\x5a\x6a\x63\x58\x61',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x74\x61\x74\x56\x61\x6c\x54\x65\x78\x74',
        '\x33\x32\x38\x35\x4a\x74\x75\x58\x57\x42',
        '\x5a\x6d\x57\x44\x42',
        '\x67\x65\x74\x53\x74\x61\x74\x65\x49\x63\x6f\x6e\x49\x6d\x61\x67\x65\x4e\x61\x6d\x65',
        '\x72\x65\x66\x72\x65\x73\x68',
        '\x37\x30\x35\x31\x6f\x4f\x52\x42\x51\x6c',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x32\x4b\x70\x44\x48\x64\x51',
        '\x73\x65\x74\x52\x61\x74\x65',
        '\x44\x67\x61\x49\x47',
        '\x67\x65\x74\x53\x74\x61\x74\x44\x61\x74\x61',
        '\x31\x30\x35\x38\x36\x37\x32\x38\x75\x5a\x4d\x76\x70\x47',
        '\x73\x65\x74\x74\x69\x6e\x67\x73',
        '\x73\x65\x74\x54\x65\x78\x74',
        '\x6d\x69\x6e',
        '\x5f\x73\x74\x61\x74\x56\x61\x6c\x54\x65\x78\x74',
        '\x33\x34\x32\x39\x31\x38\x62\x78\x66\x63\x51\x44',
        '\x31\x36\x32\x38\x31\x36\x35\x54\x54\x75\x4f\x69\x67',
        '\x34\x32\x38\x32\x30\x31\x34\x66\x44\x58\x6e\x66\x66',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x74\x61\x74\x47\x61\x75\x67\x65',
        '\x6d\x6f\x76\x65',
        '\x76\x61\x6c\x75\x65\x41',
        '\x76\x69\x73\x69\x62\x6c\x65',
        '\x5f\x73\x74\x61\x74\x47\x61\x75\x67\x65',
        '\x73\x65\x74\x4d\x6f\x64\x65',
        '\x53\x70\x72\x69\x74\x65',
        '\x36\x74\x41\x65\x6c\x46\x51',
        '\x66\x54\x6f\x68\x4f',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x74\x61\x74\x49\x63\x6f\x6e',
        '\x5f\x67\x65\x74\x43\x6f\x6d\x70\x61\x72\x65\x52\x61\x74\x65\x46\x6f\x72\x47\x61\x75\x67\x65',
        '\x49\x5a\x45\x70\x67',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x73\x74\x61\x74\x49\x63\x6f\x6e',
        '\x5f\x72\x65\x66\x72\x65\x73\x68\x50\x6c\x61\x63\x65\x6d\x65\x6e\x74',
        '\x76\x61\x6c\x75\x65\x42',
        '\x53\x6e\x41\x52\x6f',
        '\x31\x31\x33\x36\x35\x31\x30\x46\x70\x6f\x59\x71\x74',
        '\x33\x35\x30\x6e\x4a\x6d\x58\x7a\x65',
        '\x78\x5a\x57\x61\x54',
        '\x73\x74\x61\x74\x49\x64',
        '\x69\x73\x43\x6f\x6d\x70\x61\x72\x65\x4d\x6f\x64\x65',
        '\x73\x74\x61\x74\x47\x61\x75\x67\x65\x50\x6f\x73\x69\x74\x69\x6f\x6e\x52\x65\x6c\x61\x74\x69\x76\x65\x49\x63\x6f\x6e'
    ];
    _0x5471 = function () {
        return _0x452b2e;
    };
    return _0x5471();
}

// Generated by CoffeeScript 2.6.1
var PKD_Sprite_MEW_StatGauge;

PKD_Sprite_MEW_StatGauge = class PKD_Sprite_MEW_StatGauge extends KDCore.Sprite {
  constructor() {
    super();
    this._rate = 1;
    this._mode = 0;
    this._create();
    return;
  }

  settings() {
    return DataManager.pGetMEWJson('StatGaugeElementSettings');
  }

  getColorForCurrentMode() {
    if (this._mode === 0) {
      return this.settings().colorsInComparision.equalValue;
    }
    if (this._mode > 0) {
      return this.settings().colorsInComparision.biggerValue;
    }
    if (this._mode < 0) {
      return this.settings().colorsInComparision.lowerValue;
    }
    return "#FFFFFF";
  }

  show() {
    this.visible = true;
    return this.appear(65);
  }

  hide() {
    return this.visible = false;
  }

  setRate(_rate) {
    this._rate = _rate;
    return this._redraw();
  }

  setMode(_mode) {
    this._mode = _mode;
    return this._redraw();
  }

  _redraw() {
    var e, settingsCopy;
    try {
      this._destroyGauge();
      settingsCopy = JsonEx.parse(JsonEx.stringify(this.settings().gaugeSettings));
      settingsCopy.backColor = this.getColorForCurrentMode();
      this._gauge = new KDCore.UI.Sprite_UIGauge(settingsCopy);
      this._gauge.draw(this._rate);
      return this.addChild(this._gauge);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _destroyGauge() {
    var e;
    try {
      if (this._gauge == null) {
        return;
      }
      this._gauge.visible = false;
      this._gauge.removeFromParent();
      return this._gauge = null;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _create() {
    var e;
    try {
      return this._redraw();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_Sprite_MEW_StatValText;

PKD_Sprite_MEW_StatValText = class PKD_Sprite_MEW_StatValText extends KDCore.Sprite {
  constructor() {
    super();
    this._text = "0";
    this._mode = null;
    this._create();
  }

  settings() {
    return DataManager.pGetMEWJson('StatTextElementSettings');
  }

  getColorForCurrentMode() {
    if (this._mode == null) {
      return this.settings().textSettings.textColor;
    }
    if (this._mode === 0) {
      return this.settings().colorsInComparision.equalValue;
    }
    if (this._mode > 0) {
      return this.settings().colorsInComparision.biggerValue;
    }
    if (this._mode < 0) {
      return this.settings().colorsInComparision.lowerValue;
    }
    return "#FFFFFF";
  }

  setText(_text) {
    this._text = _text;
    return this._redraw();
  }

  setMode(_mode) {
    this._mode = _mode;
    return this._redraw();
  }

  _redraw() {
    var e;
    try {
      return this._textSpr.drawTextColor(this._text, this.getColorForCurrentMode());
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _create() {
    var e;
    try {
      this._textSpr = new KDCore.UI.Sprite_UIText(this.settings().textSettings);
      this.addChild(this._textSpr);
      return this._redraw();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this, ...arguments);
    PKD_MapEquipWindow.LoadPluginSettings();
    if (Imported.PKD_AlterEquipMenu == null) {
      console.warn("PKD_AlterEquipMenu plugin required!");
      window.alert("Plugin PKD_MapEquipWindow REQUIRE PKD_AlterEquipMenu plugin for proper work!");
    }
    if (Imported.Alpha_ABSZ) {
      PKD_MapEquipWindow.ExtendsForAABSZ();
    }
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createAllWindows, ALIAS__isMenuCalled, ALIAS__stop, ALIAS__updateMain, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__createAllWindows = _.createAllWindows;
  _.createAllWindows = function() {
    ALIAS__createAllWindows.call(this, ...arguments);
    this._pkdMEWLayer = new Sprite();
    this.addChild(this._pkdMEWLayer);
    this.pkdMEWCreateButton();
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    this.pkdDestroyMapEquipWindow();
    ALIAS__stop.call(this, ...arguments);
  };
  //@[ALIAS]
  ALIAS__updateMain = _.updateMain;
  _.updateMain = function() {
    ALIAS__updateMain.call(this, ...arguments);
    this.pkdUpdateMEWOpenCloseByKey();
    this.pkdUpdateMEWButton();
  };
  
  //@[ALIAS]
  ALIAS__isMenuCalled = _.isMenuCalled;
  _.isMenuCalled = function() {
    var s;
    if (PKD_MEW.IsOpen()) {
      s = $ppJson_MEW_EquipmentWindowSettings;
      if (Input.isTriggered("menu") && s.isCloseByMenuKey) {
        PKD_MEW.BackHandler();
        Input.clear();
        return false;
      }
      if (TouchInput.isCancelled() && s.isCloseByRightMouseClick) {
        PKD_MEW.BackHandler();
        TouchInput.clear();
        return false;
      }
    }
    return ALIAS__isMenuCalled.call(this, ...arguments);
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.pkdMapEquipWinLayer = function() {
    return this._pkdMEWLayer;
  };
  _.pkdCreateMapEquipWindow = function() {
    var e, h, settings, w;
    try {
      if (this.pkdIsMapEquipWindowExists()) {
        this.pkdDestroyMapEquipWindow();
      }
      settings = $ppJson_MEW_EquipmentWindowSettings;
      ({w, h} = settings.size);
      $gameTemp.__pMEWAutoRefreshInterval = settings.autoRefreshEveryFrames;
      this.pMapEquipWindow = new FWindow_MapEquipment(this.pkdMapEquipWinLayer(), w, h);
      return this.pMapEquipWindow.setOnReadyHandler(() => {
        return this.pMapEquipWindow.onLoadDone();
      });
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.pkdDestroyMapEquipWindow = function() {
    var e;
    try {
      if (!this.pkdIsMapEquipWindowExists()) {
        return;
      }
      this.pMapEquipWindow.close();
      this.pkdMapEquipWinLayer().removeChild(this.pMapEquipWindow);
      return this.pMapEquipWindow = null;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.pkdIsMapEquipWindowOpen = function() {
    return this.pkdIsMapEquipWindowExists() && this.pMapEquipWindow.isOpen();
  };
  _.pkdIsMapEquipWindowExists = function() {
    return this.pMapEquipWindow != null;
  };
  _.pkdIsCanInteractWithMEW = function() {
    if (KDCore.isMV()) {
      return !$gameMessage.isBusy();
    } else {
      return this.isPlayerActive() && !$gameMessage.isBusy();
    }
  };
  _.pkdUpdateMEWOpenCloseByKey = function() {
    var e;
    try {
      if (!this.pkdIsCanInteractWithMEW()) {
        return;
      }
      if (Input.isTriggered(PKD_MapEquipWindow.PP.getOpenKey())) {
        return PKD_MEW.Switch();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this.pkdUpdateMEWOpenCloseByKey = function() {};
    }
  };
  _.pkdUpdateMEWButton = function() {
    var e;
    try {
      if (this._pkdMewButton == null) {
        return;
      }
      if (!String.any(this._pkdMewButton.eCondition)) {
        return;
      }
      if (eval(this._pkdMewButton.eCondition)) {
        if (this._pkdMewButton.isDisabled()) {
          this._pkdMewButton.enable();
          if (this._pkdMewButton.eHide) {
            return this._pkdMewButton.visible = true;
          }
        }
      } else {
        if (!this._pkdMewButton.isDisabled()) {
          this._pkdMewButton.disable();
          if (this._pkdMewButton.eHide) {
            return this._pkdMewButton.visible = false;
          }
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this.pkdUpdateMEWButton = function() {};
    }
  };
  _.pkdMEWCreateButton = function() {
    var data, e, x, y;
    try {
      data = DataManager.pGetMEWJson('ButtonForOpenEquipmentWindow');
      if (data == null) {
        return;
      }
      if (!data.visible) {
        return;
      }
      this._pkdMewButton = new KDCore.ButtonMU(data.images, true, 'pMapEquipWindow');
      try {
        x = eval(data.position.x);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        x = 0;
      }
      try {
        y = eval(data.position.y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        y = 0;
      }
      this._pkdMewButton.move(x, y);
      this._pkdMewButton.addClickHandler(function() {
        try {
          return eval(data.action);
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      });
      this._pkdMewButton.eCondition = data.enabledIf;
      this._pkdMewButton.eHide = data.hideWhenDisabled;
      return this._pkdMEWLayer.addChild(this._pkdMewButton);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_EquipSlot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__select, _;
  //@[DEFINES]
  _ = Window_EquipSlot.prototype;
  //@[ALIAS]
  ALIAS__select = _.select;
  _.select = function(index) {
    if (Imported.PKD_AlterEquipMenu && (this.pIsHiddenSlot != null)) {
      if (this.pIsHiddenSlot(index)) {
        return;
      }
    }
    return ALIAS__select.call(this, ...arguments);
  };
})();

// ■ END Window_EquipSlot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__startMessage, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startMessage = _.startMessage;
  _.startMessage = function() {
    var e;
    ALIAS__startMessage.call(this, ...arguments);
    try {
      if (DataManager.pGetMEWJson('EquipmentWindowSettings').isCloseWhenMessage) {
        return PKD_MEW.Close();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------

//Plugin PKD_MapEquipWindow builded by PKD PluginBuilder 2.2 - 06.09.2023