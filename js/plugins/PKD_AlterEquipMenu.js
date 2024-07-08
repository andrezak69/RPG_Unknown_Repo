/*
 * Copyright (c) 2022 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 */

/*:
 * @plugindesc (v.1.0)[BASIC] Alternative Equipment Menu
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/equipment-menu
 *
 * @help
 * ---------------------------------------------------------------------------

 * This is BASIC plugin version and have some restrictions:
 *    - Max. count of equipment slots - 10
 *    - Only default windows layout (positions of windows)
 *    - Only default windowskin for all windows
 *    - Obfuscated code
 *    - Plugin usage allowed only in Non-Commercial project
 * 
 *  PRO version of plugin don't have this restrictions!
 
 * ===========================================================================
 * This plugin change default equipment menu layout to alternative one.
 * You can configurate windows positions and equipment slots
 * in Plugin Parameters.
 *
 * Plugin have resources: img\pAlterEquipMenu, you can edit them for your purposes
 * 
 * Extra Notetags for Actors:
 * <pEquipImg:NAME> - actor picture for equipment scene (stats window background)
 * Recommended size: 248x400px (for default resolution)
 *
 * <pEquipBodyImg:NAME> - actor silhouette for equipment slots background
 * Recommended size: 280x440px (for default resolution)
 *
 * Both are optional and should be in pictures folder
 * Example: <pEquipImg:Actor1_2>
 *
 * If you want use plugin with VisuMZ_1_ItemsEquipsCore plugin,
 * you should configurate VisuMZ_1_ItemsEquipsCore plugin parameters
 * for adjust windows positions for not overlapping or disable
 * VisuMZ_1_ItemsEquipsCore extra windows and status menu
 *
 * ---------------------------------------------------------------------------
 * Contains resources designed and drawn
 * by Ekaterina N. Stadnikova (MOSCOW RUSSIA)
 * https://stadnikova-ekaterina.itch.io/
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
 *  @param slotsPositions:structA
 *  @text Slots
 *  @type struct<XY>[]
 *  @desc Equip slots positions. Index = Database: Types -> Equipment Types index
 *  @default ["{\"x:int\":\"20\",\"y:int\":\"200\"}","{\"x:int\":\"210\",\"y:int\":\"200\"}","{\"x:int\":\"110\",\"y:int\":\"52\"}","{\"x:int\":\"110\",\"y:int\":\"120\"}","{\"x:int\":\"210\",\"y:int\":\"52\"}","{\"x:int\":\"130\",\"y:int\":\"350\"}","{\"x:int\":\"110\",\"y:int\":\"210\"}","{\"x:int\":\"210\",\"y:int\":\"140\"}","{\"x:int\":\"20\",\"y:int\":\"80\"}","{\"x:int\":\"20\",\"y:int\":\"300\"}"]
 * 
 *  @param slotSize:i
 *  @parent slotsPositions:structA
 *  @text Slot Size
 *  @type number
 *  @desc Equip slot size
 *  @min 12
 *  @default 48
 *  
 *  @param disabledSlotIconIndex:i
 *  @parent slotsPositions:structA
 *  @text Disabled Icon
 *  @type number
 *  @desc Disabled slot icon index (when Actor have sealed slot, this icons will be drawn in it)
 *  @min 0
 *  @default 21
 * 
 *  @param windowSkins:struct
 *  @text Window Skins
 *  @type struct<windowSkins>
 *  @desc [PRO] Windowskin images configuration for windows
 *  @default {"slotWindow:str":"Window","statusWindow:str":"Window","itemsWindow:str":"Window","commandsWindow:str":"Window"}
 * 
 *  @param isUseCustomPos:bool
 *  @text Is Use Custom Positions?
 *  @type boolean
 *  @on Yes
 *  @off No
 *  @desc [PRO] Use custom windows positions? From parameters below
 *  @default false
 * 
 *  @param slotsWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Slots Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"0\",\"y:int\":\"52\"}","size:struct":"{\"w:int\":\"310\",\"h:int\":\"468\"}"}
 * 
 *  @param statusWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Status Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"310\",\"y:int\":\"120\"}","size:struct":"{\"w:int\":\"249\",\"h:int\":\"400\"}"}
 * 
 *  @param itemsWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Items Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"559\",\"y:int\":\"120\"}","size:struct":"{\"w:int\":\"249\",\"h:int\":\"400\"}"}
 * 
 *  @param helpWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Help Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"0\",\"y:int\":\"520\"}","size:struct":"{\"w:int\":\"808\",\"h:int\":\"96\"}"}
 * 
 *  @param commandsWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Commands Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"310\",\"y:int\":\"52\"}","size:struct":"{\"w:int\":\"498\",\"h:int\":\"68\"}"}
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.1.0)[BASIC] Альтернативное меню экипировки
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/equipment-menu
 *
 * @help
 * ---------------------------------------------------------------------------

 * Это [BASIC] (базовая) версия плагина и имеет некоторые ограничения:
 *    - Стандартное расположение окон  (нельзя изменить)
 *    - Стандартный скин для всех окон (нельзя изменить)
 *    - Макс. количество слотов под экипировку: 10
 *    - Обфусцированный код
 *    - ЗАПРЕЩЕНО использовать плагин в коммерческих проектах
 * 
 *  [PRO] версия плагина не имеет данных ограничений!
 
 * ===========================================================================
 * Плагин изменяет стандартное меню экипировки на алтернативное. Позиции окон и 
 * слотов экипировки можно изменить через параметры плагина.
 *
 *
 * Плагин имеет ресурсы: img\pAlterEquipMenu (можно редактировать по надобности)
 *
 * Доп. заметки для персонажей: 
 *
 * <pEquipImg:NAME> - изображение персонажа (задник для статистики)
 * Рекомендованный размер картинки: 248x400px (для стандартного разрешения)

 * <pEquipBodyImg:NAME> - силуэт тела персонажа (задник для слотов)
 * Рекомендованный размер картинки: 280x440px (для стандартного разрешения)
 *
 * Изображения должны быть в папке pictures
 * Пример: <pEquipImg:Actor1_2>
 *
 * Если Вы хотите использовать данный плагин вместе с VisuMZ_1_ItemsEquipsCore, то
 * Вам необходимо настроить плагин VisuMZ_1_ItemsEquipsCore через его параметры. Изменить
 * позиции окон или отключить доп. окна (новое статус меню)
 *
 * ---------------------------------------------------------------------------
 * Плагин содержит графику от Екатерины Стадниковой
 * https://stadnikova-ekaterina.itch.io/
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty:
 *      https://boosty.to/kagedesu
 * Patreon:
 *      https://www.patreon.com/KageDesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *

 * Лицензия: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 *
 *  @param slotsPositions:structA
 *  @text Slots
 *  @type struct<XY>[]
 *  @desc Позиция слота экипировки. Индекс = БД: Типы -> индекс типа экипировки
 *  @default ["{\"x:int\":\"20\",\"y:int\":\"200\"}","{\"x:int\":\"210\",\"y:int\":\"200\"}","{\"x:int\":\"110\",\"y:int\":\"52\"}","{\"x:int\":\"110\",\"y:int\":\"120\"}","{\"x:int\":\"210\",\"y:int\":\"52\"}","{\"x:int\":\"130\",\"y:int\":\"350\"}","{\"x:int\":\"110\",\"y:int\":\"210\"}","{\"x:int\":\"210\",\"y:int\":\"140\"}","{\"x:int\":\"20\",\"y:int\":\"80\"}","{\"x:int\":\"20\",\"y:int\":\"300\"}"]
 * 
 *  @param slotSize:i
 *  @parent slotsPositions:structA
 *  @text Slot Size
 *  @type number
 *  @desc Размер слота экипировки
 *  @min 12
 *  @default 48
 * 
 *  @param disabledSlotIconIndex:i
 *  @parent slotsPositions:structA
 *  @text Disabled Icon
 *  @type number
 *  @desc Номер иконки для недоступного слота (когда у персонажа слот закрыт)
 *  @min 0
 *  @default 21
 * 
 *  @param windowSkins:struct
 *  @text Window Skins
 *  @type struct<windowSkins>
 *  @desc [PRO] Скины для окон
 *  @default {"slotWindow:str":"Window","statusWindow:str":"Window","itemsWindow:str":"Window","commandsWindow:str":"Window"}
 * 
 *  @param isUseCustomPos:bool
 *  @text Is Use Custom Positions?
 *  @type boolean
 *  @on Yes
 *  @off No
 *  @desc [PRO] Использовать свои настройки позиций для окон?
 *  @default false
 * 
 *  @param slotsWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Slots Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"0\",\"y:int\":\"52\"}","size:struct":"{\"w:int\":\"310\",\"h:int\":\"468\"}"}
 * 
 *  @param statusWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Status Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"310\",\"y:int\":\"120\"}","size:struct":"{\"w:int\":\"249\",\"h:int\":\"400\"}"}
 * 
 *  @param itemsWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Items Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"559\",\"y:int\":\"120\"}","size:struct":"{\"w:int\":\"249\",\"h:int\":\"400\"}"}
 * 
 *  @param helpWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Help Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"0\",\"y:int\":\"520\"}","size:struct":"{\"w:int\":\"808\",\"h:int\":\"96\"}"}
 * 
 *  @param commandsWindowPos:struct
 *  @parent isUseCustomPos:bool
 *  @text Commands Window
 *  @type struct<windowPos>
 *  @default {"position:struct":"{\"x:int\":\"310\",\"y:int\":\"52\"}","size:struct":"{\"w:int\":\"498\",\"h:int\":\"68\"}"}
 * 
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*~struct~WH:
 * @param w:int
 * @text Width
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Height
 * @type number
 * @default 100
 * @min 0
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

/*~struct~windowSkins:
  @param slotWindow:str
  @text Slots Window
  @type file
  @dir img/system/
  @require 1
  @desc 
  @default Window

  @param statusWindow:str
  @text Status Window
  @type file
  @dir img/system/
  @require 1
  @desc 
  @default Window

  @param itemsWindow:str
  @text Items Window
  @type file
  @dir img/system/
  @require 1
  @desc 
  @default Window

  @param commandsWindow:str
  @text Commands Window
  @type file
  @dir img/system/
  @require 1
  @desc 
  @default Window
*/

/*~struct~windowPos:

 @param position:struct
 @text Position
 @type struct<XY>
 @desc
 @default {}

 @param size:struct
 @text Size
 @type struct<WH>
 @desc
 @default {}

*/



var Imported = Imported || {};
Imported.PKD_AlterEquipMenu = true;

var PKD_AlterEquipMenu = {};
PKD_AlterEquipMenu.Version = 100;

//?VERSION
PKD_AlterEquipMenu.isPro = function() { return false; };

// * For parameters
PKD_AlterEquipMenu.PP = {};
PKD_AlterEquipMenu.Utils = {};

// * Загрзука параметров
PKD_AlterEquipMenu.LoadPluginSettings = () => {
    PKD_AlterEquipMenu.PP._loader = new PKD_AlterEquipMenu.KDParamLoaderLite("PKD_AlterEquipMenu");
};


//TODO:
// Проверка на MV
// Проверка с VisuStella плагинами и YEP плагинами
// ВЫПУСК!




// Generated by CoffeeScript 2.6.1
(function() {
  if (window.KDCore != null) {
    return;
  }
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
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
  return String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
})();


// Generated by CoffeeScript 2.6.1
// * Класс аналог KDCore.ParamLoader, но упрощённый, чтобы всю библиотеку не тащить
(function() {
  var KDParamLoaderLite;
  KDParamLoaderLite = (function() {
    class KDParamLoaderLite {
      constructor(pluginName) {
        this.pluginName = pluginName;
        this.paramsRaw = PluginManager.pParametersUnsafe(this.pluginName);
        if (!this.isLoaded()) {
          return;
        }
        this.params = this.parseParameters(this.paramsRaw);
        return;
      }

      isLoaded() {
        return this.paramsRaw != null;
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

      // * Имя параметра без ключа
      isHasParameter(paramName) {
        if (!this.isLoaded()) {
          return false;
        } else {
          return this.params[paramName] != null;
        }
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

      parseParamItem(type, item) {
        var e;
        try {
          if (type == null) {
            return item;
          }
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
              if (window.KDCore != null) {
                return item.toCss();
              } else {
                return item;
              }
              break;
            case "color":
              if (window.KDCore != null) {
                return KDCore.Color.FromHex(item);
              } else {
                return item;
              }
              break;
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

    };

    KDParamLoaderLite.Version = 100;

    return KDParamLoaderLite;

  }).call(this);
  PKD_AlterEquipMenu.KDParamLoaderLite = KDParamLoaderLite;
})();

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PluginManager.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PluginManager;
  // * Не возвращает {}, а возвращает null, чтобы можно было проверить isLoaded
  _.pParametersUnsafe = function(name) {
    return this._parameters[name.toLowerCase()];
  };
})();

// ■ END PluginManager.coffee
//---------------------------------------------------------------------------


function _0x8793(_0x91a06b, _0x3df0a3) {
    var _0x5ac156 = _0x5ac1();
    return _0x8793 = function (_0x8793bf, _0x51a741) {
        _0x8793bf = _0x8793bf - 0x15d;
        var _0x2ea1f3 = _0x5ac156[_0x8793bf];
        return _0x2ea1f3;
    }, _0x8793(_0x91a06b, _0x3df0a3);
}
(function (_0x5e8ffa, _0x3987d4) {
    var _0x345668 = _0x8793, _0x3dc0f6 = _0x5e8ffa();
    while (!![]) {
        try {
            var _0x3975f9 = parseInt(_0x345668(0x16d)) / 0x1 * (parseInt(_0x345668(0x15f)) / 0x2) + -parseInt(_0x345668(0x16f)) / 0x3 + parseInt(_0x345668(0x16b)) / 0x4 + -parseInt(_0x345668(0x168)) / 0x5 + -parseInt(_0x345668(0x166)) / 0x6 * (-parseInt(_0x345668(0x164)) / 0x7) + parseInt(_0x345668(0x160)) / 0x8 * (parseInt(_0x345668(0x15d)) / 0x9) + -parseInt(_0x345668(0x161)) / 0xa;
            if (_0x3975f9 === _0x3987d4)
                break;
            else
                _0x3dc0f6['push'](_0x3dc0f6['shift']());
        } catch (_0xe37fcb) {
            _0x3dc0f6['push'](_0x3dc0f6['shift']());
        }
    }
}(_0x5ac1, 0x81d2b), (function () {
    var _0xbfcda8 = _0x8793, _0x40b145;
    _0x40b145 = PKD_AlterEquipMenu['\x50\x50'], _0x40b145['\x67\x65\x74\x53\x6c\x6f\x74\x53\x69\x7a\x65'] = function () {
        var _0x19f9b6 = _0x8793;
        return this[_0x19f9b6(0x171)][_0x19f9b6(0x163)](_0x19f9b6(0x170), 0x30);
    }, _0x40b145['\x67\x65\x74\x53\x6c\x6f\x74\x73\x50\x6f\x73\x69\x74\x69\x6f\x6e\x73'] = function () {
        var _0x5e74e6 = _0x8793;
        return _0x5e74e6(0x169) !== _0x5e74e6(0x165) ? this['\x5f\x6c\x6f\x61\x64\x65\x72'][_0x5e74e6(0x163)](_0x5e74e6(0x167), [
            {
                '\x78': 0x14,
                '\x79': 0xc8
            },
            {
                '\x78': 0xd2,
                '\x79': 0xc8
            },
            {
                '\x78': 0x6e,
                '\x79': 0x34
            },
            {
                '\x78': 0x6e,
                '\x79': 0x78
            },
            {
                '\x78': 0xd2,
                '\x79': 0x34
            },
            {
                '\x78': 0x82,
                '\x79': 0x15e
            },
            {
                '\x78': 0x6e,
                '\x79': 0xd2
            },
            {
                '\x78': 0xd2,
                '\x79': 0x8c
            },
            {
                '\x78': 0x14,
                '\x79': 0x50
            },
            {
                '\x78': 0x14,
                '\x79': 0x12c
            }
        ]) : this[_0x5e74e6(0x171)][_0x5e74e6(0x163)](_0x5e74e6(0x170), 0x30);
    }, _0x40b145[_0xbfcda8(0x16e)] = function () {
        var _0x42c5e5 = _0xbfcda8;
        return _0x42c5e5(0x162) === _0x42c5e5(0x162) ? this[_0x42c5e5(0x171)][_0x42c5e5(0x163)](_0x42c5e5(0x16c), 0x15) : this[_0x42c5e5(0x171)][_0x42c5e5(0x163)](_0x42c5e5(0x167), [
            {
                '\x78': 0x14,
                '\x79': 0xc8
            },
            {
                '\x78': 0xd2,
                '\x79': 0xc8
            },
            {
                '\x78': 0x6e,
                '\x79': 0x34
            },
            {
                '\x78': 0x6e,
                '\x79': 0x78
            },
            {
                '\x78': 0xd2,
                '\x79': 0x34
            },
            {
                '\x78': 0x82,
                '\x79': 0x15e
            },
            {
                '\x78': 0x6e,
                '\x79': 0xd2
            },
            {
                '\x78': 0xd2,
                '\x79': 0x8c
            },
            {
                '\x78': 0x14,
                '\x79': 0x50
            },
            {
                '\x78': 0x14,
                '\x79': 0x12c
            }
        ]);
    }, _0x40b145[_0xbfcda8(0x16a)] = function () {
        return '\x54\x57\x4d\x51\x6e' !== '\x54\x57\x4d\x51\x6e' ? ![] : null;
    }, _0x40b145[_0xbfcda8(0x15e)] = function () {
        return ![];
    };
}()));
function _0x5ac1() {
    var _0x170d1a = [
        '\x67\x65\x74\x50\x61\x72\x61\x6d',
        '\x37\x71\x58\x6d\x71\x6f\x63',
        '\x77\x46\x45\x62\x73',
        '\x32\x36\x36\x37\x38\x39\x34\x7a\x57\x7a\x71\x5a\x52',
        '\x73\x6c\x6f\x74\x73\x50\x6f\x73\x69\x74\x69\x6f\x6e\x73',
        '\x35\x32\x37\x34\x35\x48\x59\x7a\x42\x61\x45',
        '\x43\x59\x72\x57\x73',
        '\x67\x65\x74\x57\x69\x6e\x64\x6f\x77\x53\x6b\x69\x6e\x73',
        '\x33\x39\x37\x36\x30\x36\x38\x56\x6a\x45\x67\x71\x73',
        '\x64\x69\x73\x61\x62\x6c\x65\x64\x53\x6c\x6f\x74\x49\x63\x6f\x6e\x49\x6e\x64\x65\x78',
        '\x31\x76\x48\x61\x4c\x47\x70',
        '\x67\x65\x74\x44\x69\x73\x61\x62\x6c\x65\x64\x53\x6c\x6f\x74\x49\x63\x6f\x6e\x49\x6e\x64\x65\x78',
        '\x35\x31\x30\x35\x32\x35\x4b\x6a\x75\x76\x42\x48',
        '\x73\x6c\x6f\x74\x53\x69\x7a\x65',
        '\x5f\x6c\x6f\x61\x64\x65\x72',
        '\x31\x33\x35\x6d\x4b\x72\x44\x4c\x4c',
        '\x69\x73\x55\x73\x65\x43\x75\x73\x74\x6f\x6d\x57\x69\x6e\x64\x6f\x77\x50\x6f\x73\x69\x74\x69\x6f\x6e\x73',
        '\x35\x35\x31\x39\x34\x71\x4d\x77\x55\x75\x73',
        '\x34\x30\x35\x33\x32\x30\x72\x41\x6d\x52\x76\x6b',
        '\x31\x35\x31\x33\x37\x35\x39\x30\x6f\x55\x70\x70\x6e\x59',
        '\x63\x6d\x7a\x4d\x7a'
    ];
    _0x5ac1 = function () {
        return _0x170d1a;
    };
    return _0x5ac1();
}

// Generated by CoffeeScript 2.6.1
(function() {})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Parameters.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //$[FROM KDCore]

  //@[DEFINES]
  _ = PKD_AlterEquipMenu.Utils;
  _.hasMeta = function(symbol, obj) {
    return (obj.meta != null) && (obj.meta[symbol] != null);
  };
  _.getValueFromMeta = function(symbol, obj) {
    if (!_.hasMeta(symbol, obj)) {
      return null;
    }
    return obj.meta[symbol];
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
  _.isMV = function() {
    return Utils.RPGMAKER_NAME === 'MV';
  };
})();

// ■ END Parameters.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_EquipStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, ALIAS__loadWindowskin, ALIAS__setActor, _;
  //@[DEFINES]
  _ = Window_EquipStatus.prototype;
  //@[ALIAS]
  ALIAS__loadWindowskin = _.loadWindowskin;
  _.loadWindowskin = function() {
    var skins;
    skins = PKD_AlterEquipMenu.PP.getWindowSkins();
    if (skins != null) {
      this.windowskin = ImageManager.loadSystem(skins.statusWindow);
    } else {
      ALIAS__loadWindowskin.call(this, ...arguments);
    }
  };
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this, ...arguments);
    this._createStatsIconsLayer();
  };
  //@[ALIAS]
  ALIAS__setActor = _.setActor;
  _.setActor = function() {
    ALIAS__setActor.call(this, ...arguments);
    this.pDrawActorImage();
  };
  //$[OVER]
  _.itemPadding = function() {
    return 20;
  };
  //$[OVER]
  _.paramY = function(index) {
    var btw, startY, step;
    startY = 10;
    step = 32;
    btw = 6;
    if (index === 0) {
      return startY;
    } else {
      return startY + ((step + btw) * index);
    }
  };
  //$[OVER]
  _.paramX = function() {
    return 70;
  };
  //$[OVER]
  _.drawActorName = function() {}; // * EMPTY
  
  //$[OVER]
  _.drawActorFace = function() {
    return this.pDrawActorImageForeground();
  };
  //$[OVER]
  _.drawParamName = function() {}; // * EMPTY
})();

// ■ END Window_EquipStatus.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_EquipStatus.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__drawItem, _;
  if (!PKD_AlterEquipMenu.Utils.isMV()) {
    return;
  }
  //@[DEFINES]
  _ = Window_EquipStatus.prototype;
  //$[OVER]
  _.windowWidth = function() {
    return 252;
  };
  
  //@[ALIAS]
  ALIAS__drawItem = _.drawItem;
  _.drawItem = function(x, y, paramId) {
    x = -this.paramX() - this.standardPadding();
    y = this.paramY(paramId - 2);
    return ALIAS__drawItem.call(this, x, y, paramId);
  };
})();

// ■ END Window_EquipStatus.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  _.pGetEquipImg = function() {
    var e, img;
    try {
      return img = PKD_AlterEquipMenu.Utils.getValueFromMeta('pEquipImg', this.actor());
    } catch (error) {
      e = error;
      console.warn(e);
      return "";
    }
  };
  _.pGetEquipBodyImg = function() {
    var e, img;
    try {
      return img = PKD_AlterEquipMenu.Utils.getValueFromMeta('pEquipBodyImg', this.actor());
    } catch (error) {
      e = error;
      console.warn(e);
      return "";
    }
  };
})();

// ■ END Game_Actor.coffee
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
  _.loadPictureForAEMPlugin = function(filename) {
    return this.loadBitmap('img/pAlterEquipMenu/', filename);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------


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
    PKD_AlterEquipMenu.LoadPluginSettings();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createCommandWindow, ALIAS__createItemWindow, ALIAS__createSlotWindow, ALIAS__createStatusWindow, _;
  if (!PKD_AlterEquipMenu.Utils.isMV()) {
    return;
  }
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  //@[ALIAS]
  ALIAS__createItemWindow = _.createItemWindow;
  _.createItemWindow = function() {
    var height, r, width, x, y;
    ALIAS__createItemWindow.call(this, ...arguments);
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      r = PKD_AlterEquipMenu.PP.getWindowRect('itemsWindowPos');
      ({x, y, width, height} = r);
    } else {
      ({x, y, width, height} = this._itemWindow);
      x = this._statusWindow.x + this._statusWindow.width;
      y = this._statusWindow.y;
      width = this.statusWidth();
      height = this._statusWindow.height;
    }
    this._pApplyNewWindowSize(this._itemWindow, x, y, width, height);
  };
  //@[ALIAS]
  ALIAS__createStatusWindow = _.createStatusWindow;
  _.createStatusWindow = function() {
    var height, r, width, x, y;
    ALIAS__createStatusWindow.call(this, ...arguments);
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      r = PKD_AlterEquipMenu.PP.getWindowRect('statusWindowPos');
      ({x, y, width, height} = r);
    } else {
      ({x, y, width, height} = this._statusWindow);
      x = this.equipSlotsWidth();
      y += 72;
      width = this.statusWidth();
      height = Graphics.boxHeight - this._helpWindow.height - this._helpWindow.y - 72;
    }
    this._pApplyNewWindowSize(this._statusWindow, x, y, width, height);
  };
  //@[ALIAS]
  ALIAS__createSlotWindow = _.createSlotWindow;
  _.createSlotWindow = function() {
    var height, r, width, x, y;
    ALIAS__createSlotWindow.call(this, ...arguments);
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      r = PKD_AlterEquipMenu.PP.getWindowRect('slotsWindowPos');
      ({x, y, width, height} = r);
    } else {
      ({x, y, width, height} = this._slotWindow);
      x = 0;
      y = this._commandWindow.y;
      width = this.equipSlotsWidth();
      height = Graphics.boxHeight - this._helpWindow.height;
    }
    this._pApplyNewWindowSize(this._slotWindow, x, y, width, height);
  };
  
  //@[ALIAS]
  ALIAS__createCommandWindow = _.createCommandWindow;
  _.createCommandWindow = function() {
    var height, r, width, x, y;
    ALIAS__createCommandWindow.call(this, ...arguments);
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      r = PKD_AlterEquipMenu.PP.getWindowRect('commandsWindowPos');
      ({x, y, width, height} = r);
    } else {
      ({x, y, width, height} = this._commandWindow);
      x = this.equipSlotsWidth();
      width = this.statusWidth() * 2;
    }
    this._pApplyNewWindowSize(this._commandWindow, x, y, width, height);
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__commandWindowRect, ALIAS__createItemWindow, ALIAS__helpWindowRect, ALIAS__itemWindowRect, ALIAS__slotWindowRect, ALIAS__statusWindowRect, _;
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  //$[OVER]
  _.onSlotOk = function() {
    this._itemWindow.activate();
    return this._itemWindow.select(0);
  };
  //$[OVER]
  _.hideItemWindow = function() {
    this._slotWindow.activate();
    return this._itemWindow.deselect();
  };
  //$[OVER]
  _.statusWidth = function() {
    if (PKD_AlterEquipMenu.Utils.isMV()) {
      return 252;
    } else {
      return 249;
    }
  };
  //@[ALIAS]
  ALIAS__createItemWindow = _.createItemWindow;
  _.createItemWindow = function() {
    ALIAS__createItemWindow.call(this, ...arguments);
    this._itemWindow.show();
  };
  //@[ALIAS]
  ALIAS__helpWindowRect = _.helpWindowRect;
  _.helpWindowRect = function() {
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      return PKD_AlterEquipMenu.PP.getWindowRect('helpWindowPos');
    } else {
      return ALIAS__helpWindowRect.call(this, ...arguments);
    }
  };
  
  //@[ALIAS]
  ALIAS__statusWindowRect = _.statusWindowRect;
  _.statusWindowRect = function() {
    var rect;
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      return PKD_AlterEquipMenu.PP.getWindowRect('statusWindowPos');
    } else {
      rect = ALIAS__statusWindowRect.call(this, ...arguments);
      rect.x = this.equipSlotsWidth();
      rect.y += this.calcWindowHeight(1, true);
      rect.height -= this.calcWindowHeight(1, true);
      return rect;
    }
  };
  //@[ALIAS]
  ALIAS__commandWindowRect = _.commandWindowRect;
  _.commandWindowRect = function() {
    var rect;
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      return PKD_AlterEquipMenu.PP.getWindowRect('commandsWindowPos');
    } else {
      rect = ALIAS__commandWindowRect.call(this, ...arguments);
      rect.x = this.equipSlotsWidth();
      rect.width = Graphics.boxWidth - this.equipSlotsWidth();
      return rect;
    }
  };
  //@[ALIAS]
  ALIAS__slotWindowRect = _.slotWindowRect;
  _.slotWindowRect = function() {
    var rect;
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      return PKD_AlterEquipMenu.PP.getWindowRect('slotsWindowPos');
    } else {
      rect = ALIAS__slotWindowRect.call(this, ...arguments);
      rect.x = 0;
      rect.y = this._commandWindow.y;
      rect.width = this.equipSlotsWidth();
      rect.height += this._commandWindow.height;
      return rect;
    }
  };
  //@[ALIAS]
  ALIAS__itemWindowRect = _.itemWindowRect;
  _.itemWindowRect = function() {
    var rect;
    if (PKD_AlterEquipMenu.PP.isUseCustomWindowPositions()) {
      return PKD_AlterEquipMenu.PP.getWindowRect('itemsWindowPos');
    } else {
      rect = ALIAS__itemWindowRect.call(this, ...arguments);
      rect.x = this._statusWindow.x + this._statusWindow.width;
      rect.y = this._statusWindow.y;
      rect.width = this.statusWidth();
      rect.height = this._statusWindow.height;
      return rect;
    }
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  if (!PKD_AlterEquipMenu.Utils.isMV()) {
    return;
  }
  _._pApplyNewWindowSize = function(wnd, x, y, width, height) {
    var e;
    try {
      wnd.move(x, y, width, height);
      wnd.updatePadding();
      wnd.createContents();
      if (wnd.refresh != null) {
        return wnd.refresh();
      }
    } catch (error) {
      e = error;
      return console.warn(e);
    }
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Equip.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Equip.prototype;
  _.equipSlotsWidth = function() {
    return Graphics.width - 506;
  };
})();

// ■ END Scene_Equip.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_EquipItem.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadWindowskin, _;
  //@[DEFINES]
  _ = Window_EquipItem.prototype;
  //$[OVER]
  _.maxCols = function() {
    return 1;
  };
  //@[ALIAS]
  ALIAS__loadWindowskin = _.loadWindowskin;
  _.loadWindowskin = function() {
    var skins;
    skins = PKD_AlterEquipMenu.PP.getWindowSkins();
    if (skins != null) {
      this.windowskin = ImageManager.loadSystem(skins.itemsWindow);
    } else {
      ALIAS__loadWindowskin.call(this, ...arguments);
    }
  };
})();

// ■ END Window_EquipItem.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_EquipSlot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS___createAllParts, ALIAS___createContentsBackSprite, ALIAS___createCursorSprite, ALIAS___updateCursor, ALIAS__initialize, ALIAS__loadWindowskin, ALIAS__refresh, _;
  //@[DEFINES]
  _ = Window_EquipSlot.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this, ...arguments);
    return this.pDrawActorNameBackground();
  };
  //@[ALIAS]
  ALIAS__loadWindowskin = _.loadWindowskin;
  _.loadWindowskin = function() {
    var skins;
    skins = PKD_AlterEquipMenu.PP.getWindowSkins();
    if (skins != null) {
      this.windowskin = ImageManager.loadSystem(skins.slotWindow);
    } else {
      ALIAS__loadWindowskin.call(this, ...arguments);
    }
  };
  //@[ALIAS]
  ALIAS__refresh = _.refresh;
  _.refresh = function() {
    ALIAS__refresh.call(this, ...arguments);
    this.pDrawActorName();
    this.pDrawActorBody();
  };
  if (PKD_AlterEquipMenu.Utils.isMV()) {
    //@[ALIAS]
    ALIAS___createAllParts = _._createAllParts;
    _._createAllParts = function() {
      ALIAS___createAllParts.call(this, ...arguments);
      this._createActorBodySprLayer();
      this._actorBodySprLayer.move(this.standardPadding(), this.standardPadding());
      this.addChildAt(this._actorBodySprLayer, 1);
      this._createExtraCursor();
      return this.addChildAt(this._extraCursor, 3);
    };
  } else {
    //@[ALIAS]
    ALIAS___createContentsBackSprite = _._createContentsBackSprite;
    _._createContentsBackSprite = function() {
      this._createActorBodySprLayer();
      this._clientArea.addChild(this._actorBodySprLayer);
      return ALIAS___createContentsBackSprite.call(this, ...arguments);
    };
    
    //@[ALIAS]
    ALIAS___createCursorSprite = _._createCursorSprite;
    _._createCursorSprite = function() {
      ALIAS___createCursorSprite.call(this, ...arguments);
      this._createExtraCursor();
      this._clientArea.addChild(this._extraCursor);
    };
  }
  //@[ALIAS]
  ALIAS___updateCursor = _._updateCursor;
  _._updateCursor = function() {
    var cursorSprite, x, y;
    ALIAS___updateCursor.call(this, ...arguments);
    if (PKD_AlterEquipMenu.Utils.isMV()) {
      cursorSprite = this._windowCursorSprite;
    } else {
      cursorSprite = this._cursorSprite;
    }
    this._extraCursor.visible = cursorSprite.visible && this.active;
    if (PKD_AlterEquipMenu.Utils.isMV()) {
      x = this._cursorRect.x + this._extraCursor.width / 2 + this.pSlotSize() / 2;
    } else {
      x = this._cursorRect.x + this.pSlotSize() / 2 - this._extraCursor.width / 2;
    }
    y = this._cursorRect.y - 5;
    return this._extraCursor.move(x, y);
  };
  //$[OVER]
  _.cursorRight = function() {
    return this.cursorDown(...arguments);
  };
  
  //$[OVER]
  _.cursorLeft = function() {
    return this.cursorUp(...arguments);
  };
  //$[OVER]
  _.drawItem = function(index) {
    if (PKD_AlterEquipMenu.Utils.isMV()) {
      this.pDrawItemSlotBack(index);
    }
    return this.pDrawSlotItem(index);
  };
  //$[OVER]
  _.drawItemBackground = function(index) {
    var bitmap, width, x, y;
    ({x, y, width} = this.itemRect(index));
    bitmap = ImageManager.loadPictureForAEMPlugin("SlotBackground");
    if (bitmap.isReady()) {
      this.contentsBack.drawOnMe(bitmap, x, y, width, width);
    } else {
      PKD_AlterEquipMenu.Utils.loadImageAsync("pAlterEquipMenu", "SlotBackground").then((bitmap) => {
        return this.contentsBack.drawOnMe(bitmap, x, y, width, width);
      });
    }
  };
  
  //$[OVER]
  _.itemRect = function(index) {
    var p, positions, size;
    size = this.pSlotSize();
    positions = this.pSlotsPositions();
    p = positions[index];
    if (p == null) {
      p = {
        x: 0,
        y: 0
      };
    }
    return new Rectangle(p.x, p.y, size, size);
  };
})();

// ■ END Window_EquipSlot.coffee
//---------------------------------------------------------------------------


function _0x5ee8() {
    var _0x1f34e0 = [
        '\x34\x36\x34\x36\x35\x31\x32\x6d\x6c\x4c\x76\x6d\x46',
        '\x70\x44\x72\x61\x77\x41\x63\x74\x6f\x72\x4e\x61\x6d\x65\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64',
        '\x5f\x61\x63\x74\x6f\x72\x42\x6f\x64\x79\x53\x70\x72\x4c\x61\x79\x65\x72',
        '\x42\x6a\x57\x55\x73',
        '\x63\x68\x61\x6e\x67\x65\x50\x61\x69\x6e\x74\x4f\x70\x61\x63\x69\x74\x79',
        '\x4e\x61\x6d\x65\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64',
        '\x70\x41\x6c\x74\x65\x72\x45\x71\x75\x69\x70\x4d\x65\x6e\x75',
        '\x70\x44\x72\x61\x77\x49\x74\x65\x6d\x53\x6c\x6f\x74\x49\x63\x6f\x6e',
        '\x77\x78\x45\x57\x74',
        '\x59\x47\x63\x77\x76',
        '\x64\x72\x61\x77\x49\x63\x6f\x6e',
        '\x5f\x70\x44\x72\x61\x77\x41\x63\x74\x6f\x72\x42\x6f\x64\x79\x50\x72\x6f\x63\x65\x73\x73',
        '\x55\x6e\x58\x78\x59',
        '\x75\x54\x43\x69\x6d',
        '\x69\x63\x6f\x6e\x49\x6e\x64\x65\x78',
        '\x44\x65\x66\x61\x75\x6c\x74\x42\x6f\x64\x79',
        '\x32\x36\x37\x33\x33\x33\x35\x4c\x6b\x77\x71\x4f\x63',
        '\x64\x72\x61\x77\x54\x65\x78\x74',
        '\x69\x73\x45\x6e\x61\x62\x6c\x65\x64',
        '\x56\x45\x65\x50\x50',
        '\x70\x47\x65\x74\x45\x71\x75\x69\x70\x42\x6f\x64\x79\x49\x6d\x67',
        '\x5f\x77\x69\x6e\x64\x6f\x77\x42\x61\x63\x6b\x53\x70\x72\x69\x74\x65',
        '\x4d\x52\x75\x47\x76',
        '\x67\x65\x74\x53\x6c\x6f\x74\x53\x69\x7a\x65',
        '\x72\x67\x62\x61\x28\x33\x32\x2c\x20\x33\x32\x2c\x20\x33\x32\x2c\x20\x30\x2e\x33\x35\x29',
        '\x61\x6e\x79',
        '\x31\x30\x35\x36\x30\x32\x32\x32\x44\x4a\x7a\x48\x56\x70',
        '\x63\x6f\x6e\x74\x65\x6e\x74\x73',
        '\x31\x30\x34\x31\x32\x48\x70\x71\x52\x48\x79',
        '\x44\x47\x67\x4e\x69',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x5f\x63\x6f\x6e\x74\x65\x6e\x74\x73\x42\x61\x63\x6b\x53\x70\x72\x69\x74\x65',
        '\x31\x36\x37\x33\x36\x37\x34\x30\x4d\x6f\x65\x4c\x6b\x65',
        '\x36\x77\x78\x71\x6b\x78\x74',
        '\x61\x66\x4e\x57\x6e',
        '\x67\x72\x61\x64\x69\x65\x6e\x74\x46\x69\x6c\x6c\x52\x65\x63\x74',
        '\x5f\x61\x63\x74\x6f\x72',
        '\x5f\x61\x63\x74\x6f\x72\x42\x6f\x64\x79\x53\x70\x72',
        '\x36\x30\x33\x31\x36\x31\x33\x4b\x53\x6f\x45\x48\x6b',
        '\x70\x44\x72\x61\x77\x41\x63\x74\x6f\x72\x42\x6f\x64\x79',
        '\x58\x53\x65\x4d\x4c',
        '\x64\x69\x73\x61\x62\x6c\x65\x49\x63\x6f\x6e\x49\x6e\x64\x65\x78',
        '\x74\x68\x65\x6e',
        '\x69\x74\x65\x6d\x52\x65\x63\x74',
        '\x69\x69\x63\x4d\x46',
        '\x74\x65\x78\x74\x50\x61\x64\x64\x69\x6e\x67',
        '\x6c\x6f\x61\x64\x50\x69\x63\x74\x75\x72\x65\x46\x6f\x72\x41\x45\x4d\x50\x6c\x75\x67\x69\x6e',
        '\x33\x32\x32\x35\x35\x36\x54\x77\x63\x6d\x49\x4f',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x72\x67\x62\x61\x28\x33\x32\x2c\x20\x33\x32\x2c\x20\x33\x32\x2c\x20\x30\x2e\x35\x29',
        '\x68\x65\x69\x67\x68\x74',
        '\x48\x47\x41\x44\x75',
        '\x69\x73\x4d\x56',
        '\x77\x42\x75\x78\x57',
        '\x72\x4c\x4d\x48\x7a',
        '\x67\x72\x41\x4f\x48',
        '\x55\x74\x69\x6c\x73',
        '\x5f\x63\x72\x65\x61\x74\x65\x41\x63\x74\x6f\x72\x42\x6f\x64\x79\x53\x70\x72\x4c\x61\x79\x65\x72',
        '\x65\x71\x75\x69\x70\x73',
        '\x62\x69\x74\x6d\x61\x70',
        '\x70\x53\x6c\x6f\x74\x73\x50\x6f\x73\x69\x74\x69\x6f\x6e\x73',
        '\x70\x53\x6c\x6f\x74\x53\x69\x7a\x65',
        '\x61\x69\x6d\x74\x71',
        '\x53\x65\x49\x4b\x46',
        '\x70\x69\x63\x74\x75\x72\x65\x73',
        '\x79\x55\x73\x66\x75',
        '\x6e\x61\x6d\x65',
        '\x6f\x71\x59\x78\x54',
        '\x77\x69\x64\x74\x68',
        '\x67\x65\x74\x44\x69\x73\x61\x62\x6c\x65\x64\x53\x6c\x6f\x74\x49\x63\x6f\x6e\x49\x6e\x64\x65\x78',
        '\x33\x41\x54\x54\x58\x4b\x58',
        '\x72\x65\x73\x65\x74\x46\x6f\x6e\x74\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x77\x61\x72\x6e',
        '\x63\x65\x6e\x74\x65\x72',
        '\x6c\x6f\x61\x64\x49\x6d\x61\x67\x65\x41\x73\x79\x6e\x63',
        '\x31\x30\x33\x77\x74\x70\x6f\x42\x4f',
        '\x69\x74\x65\x6d\x41\x74'
    ];
    _0x5ee8 = function () {
        return _0x1f34e0;
    };
    return _0x5ee8();
}
function _0x1f92(_0x3130c2, _0x463975) {
    var _0x5ee8a3 = _0x5ee8();
    return _0x1f92 = function (_0x1f925e, _0x22368d) {
        _0x1f925e = _0x1f925e - 0xd3;
        var _0xf2d4e1 = _0x5ee8a3[_0x1f925e];
        return _0xf2d4e1;
    }, _0x1f92(_0x3130c2, _0x463975);
}
(function (_0x4fddd8, _0x55283c) {
    var _0x377db6 = _0x1f92, _0x5f3eb4 = _0x4fddd8();
    while (!![]) {
        try {
            var _0x2d8e03 = -parseInt(_0x377db6(0xdc)) / 0x1 * (-parseInt(_0x377db6(0xfa)) / 0x2) + parseInt(_0x377db6(0xd7)) / 0x3 * (-parseInt(_0x377db6(0x10d)) / 0x4) + parseInt(_0x377db6(0xee)) / 0x5 + -parseInt(_0x377db6(0xff)) / 0x6 * (-parseInt(_0x377db6(0x104)) / 0x7) + -parseInt(_0x377db6(0xde)) / 0x8 + parseInt(_0x377db6(0xf8)) / 0x9 + -parseInt(_0x377db6(0xfe)) / 0xa;
            if (_0x2d8e03 === _0x55283c)
                break;
            else
                _0x5f3eb4['push'](_0x5f3eb4['shift']());
        } catch (_0x3affd6) {
            _0x5f3eb4['push'](_0x5f3eb4['shift']());
        }
    }
}(_0x5ee8, 0xbc2d7), (function () {
    var _0x15474d = _0x1f92, _0x5599eb;
    _0x5599eb = Window_EquipSlot[_0x15474d(0x10e)], _0x5599eb['\x70\x53\x6c\x6f\x74\x53\x69\x7a\x65'] = function () {
        var _0x384bc4 = _0x15474d;
        return _0x384bc4(0x11d) === _0x384bc4(0x11d) ? PKD_AlterEquipMenu['\x50\x50'][_0x384bc4(0xf5)]() : (_0x1da7fe = this[_0x384bc4(0xdd)](_0x40953b), _0x436ba5 = this[_0x384bc4(0x109)](_0x30a263), _0x5b8a44 = this[_0x384bc4(0xf0)](_0x296944), this[_0x384bc4(0xe2)](_0x1fb9d2), this[_0x384bc4(0xe5)](_0x160dd1, _0x3c230b, _0x45491e), this[_0x384bc4(0xe2)](!![]), this[_0x384bc4(0xd8)]());
    }, _0x5599eb[_0x15474d(0x11a)] = function () {
        var _0x25723d = _0x15474d;
        return '\x49\x58\x41\x62\x4f' !== _0x25723d(0xe6) ? [] : this[_0x25723d(0x103)][_0x25723d(0x119)] = _0x160fc7;
    }, _0x5599eb[_0x15474d(0x105)] = function () {
        var _0x4bfffd = _0x15474d, _0xd6b70a;
        if (this[_0x4bfffd(0x102)] == null)
            return;
        return _0xd6b70a = this['\x5f\x61\x63\x74\x6f\x72'][_0x4bfffd(0xf2)](), String[_0x4bfffd(0xf7)](_0xd6b70a) ? this[_0x4bfffd(0xe9)]('\x70\x69\x63\x74\x75\x72\x65\x73', _0xd6b70a) : this['\x5f\x70\x44\x72\x61\x77\x41\x63\x74\x6f\x72\x42\x6f\x64\x79\x50\x72\x6f\x63\x65\x73\x73'](_0x4bfffd(0xe4), _0x4bfffd(0xed));
    }, _0x5599eb['\x5f\x70\x44\x72\x61\x77\x41\x63\x74\x6f\x72\x42\x6f\x64\x79\x50\x72\x6f\x63\x65\x73\x73'] = function (_0x4e2a09, _0x58afac) {
        var _0x35b181 = _0x15474d;
        if (this[_0x35b181(0x103)] == null) {
            if (_0x35b181(0x114) === _0x35b181(0x114))
                this['\x5f\x61\x63\x74\x6f\x72\x42\x6f\x64\x79\x53\x70\x72'] = new Sprite(), this[_0x35b181(0xe0)][_0x35b181(0xfc)](this[_0x35b181(0x103)]);
            else
                return;
        }
        PKD_AlterEquipMenu['\x55\x74\x69\x6c\x73'][_0x35b181(0xdb)](_0x4e2a09, _0x58afac)[_0x35b181(0x108)](_0xb0d70b => {
            var _0x4757dc = _0x35b181;
            return _0x4757dc(0x11c) === _0x4757dc(0x11c) ? this[_0x4757dc(0x103)]['\x62\x69\x74\x6d\x61\x70'] = _0xb0d70b : (_0x1315b3 = _0x1149e2, _0x3335ca['\x77\x61\x72\x6e'](_0x333e38));
        });
    }, _0x5599eb['\x70\x44\x72\x61\x77\x41\x63\x74\x6f\x72\x4e\x61\x6d\x65'] = function () {
        var _0x5b721e = _0x15474d;
        if (_0x5b721e(0xeb) === '\x44\x51\x4b\x6c\x7a') {
            var _0x29c082;
            if (this[_0x5b721e(0x102)] == null)
                return;
            return _0x29c082 = this[_0x5b721e(0x102)]['\x70\x47\x65\x74\x45\x71\x75\x69\x70\x42\x6f\x64\x79\x49\x6d\x67'](), _0x4affdf['\x61\x6e\x79'](_0x29c082) ? this[_0x5b721e(0xe9)](_0x5b721e(0x11e), _0x29c082) : this['\x5f\x70\x44\x72\x61\x77\x41\x63\x74\x6f\x72\x42\x6f\x64\x79\x50\x72\x6f\x63\x65\x73\x73'](_0x5b721e(0xe4), '\x44\x65\x66\x61\x75\x6c\x74\x42\x6f\x64\x79');
        } else {
            if (this[_0x5b721e(0x102)] == null) {
                if (_0x5b721e(0x10a) === _0x5b721e(0x10a))
                    return;
                else
                    return null;
            }
            return PKD_AlterEquipMenu[_0x5b721e(0x116)]['\x69\x73\x4d\x56']() ? this[_0x5b721e(0xef)](this[_0x5b721e(0x102)][_0x5b721e(0xd3)](), 0x0, -this[_0x5b721e(0x10b)](), this[_0x5b721e(0xf9)][_0x5b721e(0xd5)], _0x5b721e(0xda)) : _0x5b721e(0xfb) !== _0x5b721e(0xfb) ? this['\x64\x72\x61\x77\x49\x63\x6f\x6e'](this[_0x5b721e(0x107)](), _0x5e623a['\x78'] + _0x580582, _0x181038['\x79'] + _0x339d1a) : this[_0x5b721e(0xef)](this[_0x5b721e(0x102)][_0x5b721e(0xd3)](), 0x0, 0x4, this[_0x5b721e(0xf9)][_0x5b721e(0xd5)], _0x5b721e(0xda));
        }
    }, _0x5599eb[_0x15474d(0xdf)] = function () {
        var _0x191fea = _0x15474d, _0x22d674;
        _0x22d674 = new Sprite(), _0x22d674[_0x191fea(0x119)] = ImageManager['\x6c\x6f\x61\x64\x50\x69\x63\x74\x75\x72\x65\x46\x6f\x72\x41\x45\x4d\x50\x6c\x75\x67\x69\x6e'](_0x191fea(0xe3)), PKD_AlterEquipMenu[_0x191fea(0x116)][_0x191fea(0x112)]() ? (this[_0x191fea(0xf3)]['\x61\x64\x64\x43\x68\x69\x6c\x64'](_0x22d674), _0x22d674['\x78'] += this['\x74\x65\x78\x74\x50\x61\x64\x64\x69\x6e\x67'](), _0x22d674['\x79'] += this[_0x191fea(0x10b)]()) : this[_0x191fea(0xfd)][_0x191fea(0xfc)](_0x22d674);
    }, PKD_AlterEquipMenu[_0x15474d(0x116)]['\x69\x73\x4d\x56']() && (_0x5599eb[_0x15474d(0xdd)] = function (_0x13f9e7) {
        var _0x5835d8 = _0x15474d;
        return _0x5835d8(0xf4) !== _0x5835d8(0xea) ? this[_0x5835d8(0x102)] != null ? this[_0x5835d8(0x102)][_0x5835d8(0x118)]()[_0x13f9e7] : _0x5835d8(0x11f) !== _0x5835d8(0xe7) ? null : _0x1e7373['\x50\x50'][_0x5835d8(0xd6)]() || 0x0 : this[_0x5835d8(0xe9)]('\x70\x41\x6c\x74\x65\x72\x45\x71\x75\x69\x70\x4d\x65\x6e\x75', _0x5835d8(0xed));
    }), _0x5599eb['\x70\x44\x72\x61\x77\x53\x6c\x6f\x74\x49\x74\x65\x6d'] = function (_0x326549) {
        var _0x5bec0e = _0x15474d;
        if (_0x5bec0e(0x115) !== _0x5bec0e(0xe1)) {
            var _0xa054f8, _0x50e60a, _0xe6f5, _0x116343;
            if (!this['\x5f\x61\x63\x74\x6f\x72'])
                return;
            try {
                if (_0x5bec0e(0x113) === _0x5bec0e(0x113))
                    return _0xe6f5 = this[_0x5bec0e(0xdd)](_0x326549), _0x116343 = this['\x69\x74\x65\x6d\x52\x65\x63\x74'](_0x326549), _0x50e60a = this[_0x5bec0e(0xf0)](_0x326549), this[_0x5bec0e(0xe2)](_0x50e60a), this[_0x5bec0e(0xe5)](_0xe6f5, _0x116343, _0x50e60a), this[_0x5bec0e(0xe2)](!![]), this[_0x5bec0e(0xd8)]();
                else
                    this['\x5f\x77\x69\x6e\x64\x6f\x77\x42\x61\x63\x6b\x53\x70\x72\x69\x74\x65'][_0x5bec0e(0xfc)](_0x123c55), _0x1a5ec0['\x78'] += this[_0x5bec0e(0x10b)](), _0x3ef347['\x79'] += this['\x74\x65\x78\x74\x50\x61\x64\x64\x69\x6e\x67']();
            } catch (_0x22528b) {
                return _0xa054f8 = _0x22528b, console[_0x5bec0e(0xd9)](_0xa054f8);
            }
        } else
            return;
    }, _0x5599eb[_0x15474d(0xe5)] = function (_0x32fbb8, _0x243d49, _0x1f4692) {
        var _0x2d98f8 = _0x15474d;
        if ('\x56\x45\x65\x50\x50' !== _0x2d98f8(0xf1))
            return this[_0x2d98f8(0xe8)](_0x5b9ac4[_0x2d98f8(0xec)], _0x1b876b['\x78'] + _0x479a1a, _0x5e00ee['\x79'] + _0x1ead43);
        else {
            var _0x44bb72, _0x4ca662;
            _0x4ca662 = this[_0x2d98f8(0x11b)](), _0x44bb72 = (_0x4ca662 - 0x20) / 0x2;
            if (_0x32fbb8 != null) {
                if (_0x2d98f8(0xd4) !== '\x51\x70\x7a\x4b\x6d')
                    return this['\x64\x72\x61\x77\x49\x63\x6f\x6e'](_0x32fbb8[_0x2d98f8(0xec)], _0x243d49['\x78'] + _0x44bb72, _0x243d49['\x79'] + _0x44bb72);
                else {
                    var _0x14aaf8, _0x4c8614, _0x52e4b1, _0x442cdb;
                    if (!this[_0x2d98f8(0x102)])
                        return;
                    try {
                        return _0x52e4b1 = this['\x69\x74\x65\x6d\x41\x74'](_0x2b3c75), _0x442cdb = this['\x69\x74\x65\x6d\x52\x65\x63\x74'](_0x2d63e3), _0x4c8614 = this['\x69\x73\x45\x6e\x61\x62\x6c\x65\x64'](_0x5bfdd4), this[_0x2d98f8(0xe2)](_0x4c8614), this[_0x2d98f8(0xe5)](_0x52e4b1, _0x442cdb, _0x4c8614), this['\x63\x68\x61\x6e\x67\x65\x50\x61\x69\x6e\x74\x4f\x70\x61\x63\x69\x74\x79'](!![]), this[_0x2d98f8(0xd8)]();
                    } catch (_0x1013de) {
                        return _0x14aaf8 = _0x1013de, _0x8b1a5[_0x2d98f8(0xd9)](_0x14aaf8);
                    }
                }
            } else {
                if (!_0x1f4692)
                    return _0x2d98f8(0x106) === _0x2d98f8(0x106) ? this[_0x2d98f8(0xe8)](this[_0x2d98f8(0x107)](), _0x243d49['\x78'] + _0x44bb72, _0x243d49['\x79'] + _0x44bb72) : _0x2228cd['\x50\x50']['\x67\x65\x74\x53\x6c\x6f\x74\x53\x69\x7a\x65']();
            }
        }
    }, _0x5599eb['\x64\x69\x73\x61\x62\x6c\x65\x49\x63\x6f\x6e\x49\x6e\x64\x65\x78'] = function () {
        var _0x46d5c0 = _0x15474d;
        if (_0x46d5c0(0x100) !== _0x46d5c0(0x100)) {
            var _0x13630d, _0x3f085d;
            _0x3f085d = this[_0x46d5c0(0x11b)](), _0x13630d = (_0x3f085d - 0x20) / 0x2;
            if (_0x149a81 != null)
                return this[_0x46d5c0(0xe8)](_0x50319a['\x69\x63\x6f\x6e\x49\x6e\x64\x65\x78'], _0x2ccaa4['\x78'] + _0x13630d, _0x41f754['\x79'] + _0x13630d);
            else {
                if (!_0x468c74)
                    return this[_0x46d5c0(0xe8)](this[_0x46d5c0(0x107)](), _0x24d192['\x78'] + _0x13630d, _0x167141['\x79'] + _0x13630d);
            }
        } else
            return PKD_AlterEquipMenu['\x50\x50'][_0x46d5c0(0xd6)]() || 0x0;
    }, _0x5599eb[_0x15474d(0x117)] = function () {
        var _0x3b0b6b = _0x15474d;
        return this[_0x3b0b6b(0xe0)] = new Sprite();
    }, _0x5599eb['\x5f\x63\x72\x65\x61\x74\x65\x45\x78\x74\x72\x61\x43\x75\x72\x73\x6f\x72'] = function () {
        var _0x572847 = _0x15474d;
        if ('\x48\x47\x41\x44\x75' === _0x572847(0x111))
            return this['\x5f\x65\x78\x74\x72\x61\x43\x75\x72\x73\x6f\x72'] = new Sprite(ImageManager[_0x572847(0x10c)]('\x53\x65\x6c\x65\x63\x74\x65\x64\x53\x6c\x6f\x74')), this['\x5f\x65\x78\x74\x72\x61\x43\x75\x72\x73\x6f\x72']['\x76\x69\x73\x69\x62\x6c\x65'] = ![];
        else {
            if (this[_0x572847(0x102)] == null)
                return;
            return _0xe9ec99['\x55\x74\x69\x6c\x73']['\x69\x73\x4d\x56']() ? this[_0x572847(0xef)](this[_0x572847(0x102)]['\x6e\x61\x6d\x65'](), 0x0, -this['\x74\x65\x78\x74\x50\x61\x64\x64\x69\x6e\x67'](), this['\x63\x6f\x6e\x74\x65\x6e\x74\x73'][_0x572847(0xd5)], _0x572847(0xda)) : this[_0x572847(0xef)](this[_0x572847(0x102)][_0x572847(0xd3)](), 0x0, 0x4, this[_0x572847(0xf9)]['\x77\x69\x64\x74\x68'], '\x63\x65\x6e\x74\x65\x72');
        }
    }, _0x5599eb['\x70\x44\x72\x61\x77\x49\x74\x65\x6d\x53\x6c\x6f\x74\x42\x61\x63\x6b'] = function (_0x3c7fd2) {
        var _0x3e5def = _0x15474d, _0xb07603, _0x580986, _0x490fa3, _0x58673c, _0x2d57f6, _0xa0bde5, _0x233437;
        _0x58673c = this[_0x3e5def(0x109)](_0x3c7fd2), _0xb07603 = _0x3e5def(0x10f), _0x580986 = _0x3e5def(0xf6), _0xa0bde5 = _0x58673c['\x78'], _0x233437 = _0x58673c['\x79'], _0x2d57f6 = _0x58673c[_0x3e5def(0xd5)], _0x490fa3 = _0x58673c[_0x3e5def(0x110)], this['\x63\x6f\x6e\x74\x65\x6e\x74\x73'][_0x3e5def(0x101)](_0xa0bde5, _0x233437, _0x2d57f6, _0x490fa3, _0xb07603, _0x580986, !![]);
    };
}()));

function _0x176f(_0x4b2f59, _0x121212) {
    var _0xd71a30 = _0xd71a();
    return _0x176f = function (_0x176fc8, _0x52b166) {
        _0x176fc8 = _0x176fc8 - 0x1bf;
        var _0x343f5c = _0xd71a30[_0x176fc8];
        return _0x343f5c;
    }, _0x176f(_0x4b2f59, _0x121212);
}
(function (_0x18b787, _0x319dae) {
    var _0x5dfa63 = _0x176f, _0x210a18 = _0x18b787();
    while (!![]) {
        try {
            var _0x4a516e = parseInt(_0x5dfa63(0x1ca)) / 0x1 + -parseInt(_0x5dfa63(0x1c8)) / 0x2 * (parseInt(_0x5dfa63(0x1bf)) / 0x3) + parseInt(_0x5dfa63(0x1d0)) / 0x4 + -parseInt(_0x5dfa63(0x1c0)) / 0x5 * (parseInt(_0x5dfa63(0x1c2)) / 0x6) + parseInt(_0x5dfa63(0x1c6)) / 0x7 * (parseInt(_0x5dfa63(0x1c7)) / 0x8) + -parseInt(_0x5dfa63(0x1c3)) / 0x9 + -parseInt(_0x5dfa63(0x1c1)) / 0xa * (-parseInt(_0x5dfa63(0x1cf)) / 0xb);
            if (_0x4a516e === _0x319dae)
                break;
            else
                _0x210a18['push'](_0x210a18['shift']());
        } catch (_0x13c74a) {
            _0x210a18['push'](_0x210a18['shift']());
        }
    }
}(_0xd71a, 0xab9f4), (function () {
    var _0x238e92 = _0x176f, _0x3d7844;
    _0x3d7844 = Window_EquipSlot[_0x238e92(0x1c9)], _0x3d7844['\x6d\x61\x78\x49\x74\x65\x6d\x73'] = function () {
        var _0x4b43ec = _0x238e92, _0x2b9404;
        return this[_0x4b43ec(0x1cd)] != null ? (_0x2b9404 = this[_0x4b43ec(0x1cd)][_0x4b43ec(0x1ce)]()[_0x4b43ec(0x1cc)](0x0, 0xa), _0x2b9404[_0x4b43ec(0x1cb)]) : 0x0;
    }, _0x3d7844[_0x238e92(0x1d1)] = function () {
        var _0x2c0371 = _0x238e92;
        if (_0x2c0371(0x1d3) !== _0x2c0371(0x1c4)) {
            var _0x27fa67, _0x8c1e18;
            try {
                return _0x8c1e18 = PKD_AlterEquipMenu['\x50\x50'][_0x2c0371(0x1c5)](), _0x8c1e18[_0x2c0371(0x1cc)](0x0, 0xa);
            } catch (_0x39798b) {
                return _0x27fa67 = _0x39798b, console[_0x2c0371(0x1d2)](_0x27fa67), [];
            }
        } else
            return _0xe9109 = _0x3ad405, _0x2041cf['\x77\x61\x72\x6e'](_0x725906), [];
    };
}()));
function _0xd71a() {
    var _0x967511 = [
        '\x77\x61\x72\x6e',
        '\x79\x51\x61\x47\x61',
        '\x39\x6c\x50\x48\x53\x64\x43',
        '\x35\x7a\x6d\x74\x4a\x56\x4b',
        '\x31\x30\x41\x4e\x47\x59\x47\x50',
        '\x35\x31\x32\x33\x31\x37\x32\x76\x67\x75\x59\x48\x48',
        '\x39\x31\x31\x31\x36\x33\x36\x57\x56\x6e\x65\x74\x57',
        '\x6a\x74\x49\x49\x57',
        '\x67\x65\x74\x53\x6c\x6f\x74\x73\x50\x6f\x73\x69\x74\x69\x6f\x6e\x73',
        '\x35\x37\x32\x39\x35\x7a\x62\x52\x65\x6a\x76',
        '\x38\x36\x34\x7a\x6d\x56\x4f\x6f\x68',
        '\x38\x31\x35\x30\x39\x32\x78\x76\x57\x47\x49\x51',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x33\x35\x30\x35\x35\x32\x55\x4d\x78\x65\x72\x79',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x73\x6c\x69\x63\x65',
        '\x5f\x61\x63\x74\x6f\x72',
        '\x65\x71\x75\x69\x70\x53\x6c\x6f\x74\x73',
        '\x31\x38\x37\x33\x31\x35\x33\x37\x72\x55\x75\x61\x41\x4d',
        '\x33\x34\x31\x37\x38\x37\x36\x57\x73\x62\x71\x48\x61',
        '\x70\x53\x6c\x6f\x74\x73\x50\x6f\x73\x69\x74\x69\x6f\x6e\x73'
    ];
    _0xd71a = function () {
        return _0x967511;
    };
    return _0xd71a();
}

function _0x5649(_0xd106c4, _0x12b044) {
    var _0x42d6d1 = _0x42d6();
    return _0x5649 = function (_0x56492c, _0x26a3e3) {
        _0x56492c = _0x56492c - 0xfb;
        var _0x5ad04e = _0x42d6d1[_0x56492c];
        return _0x5ad04e;
    }, _0x5649(_0xd106c4, _0x12b044);
}
(function (_0x189754, _0x3f5946) {
    var _0x457051 = _0x5649, _0xc744f1 = _0x189754();
    while (!![]) {
        try {
            var _0x3c29a5 = parseInt(_0x457051(0x117)) / 0x1 * (-parseInt(_0x457051(0x12b)) / 0x2) + parseInt(_0x457051(0x107)) / 0x3 + -parseInt(_0x457051(0xff)) / 0x4 + -parseInt(_0x457051(0x122)) / 0x5 + -parseInt(_0x457051(0x111)) / 0x6 + -parseInt(_0x457051(0x104)) / 0x7 * (parseInt(_0x457051(0x12a)) / 0x8) + parseInt(_0x457051(0x100)) / 0x9;
            if (_0x3c29a5 === _0x3f5946)
                break;
            else
                _0xc744f1['push'](_0xc744f1['shift']());
        } catch (_0x4b8eff) {
            _0xc744f1['push'](_0xc744f1['shift']());
        }
    }
}(_0x42d6, 0x5b7f8), (function () {
    var _0x3ec38b = _0x5649, _0x53c3d0;
    _0x53c3d0 = Window_EquipStatus[_0x3ec38b(0xfd)], _0x53c3d0[_0x3ec38b(0x114)] = function () {
        var _0x3103dc = _0x3ec38b;
        if (_0x3103dc(0x110) !== '\x58\x77\x79\x78\x42') {
            var _0x1549ce, _0xd90e2c, _0x434e17, _0x3f9940;
            this[_0x3103dc(0x10b)] = new Sprite(), this[_0x3103dc(0x10b)][_0x3103dc(0x11c)] = new Bitmap(this[_0x3103dc(0x118)]['\x77\x69\x64\x74\x68'], this[_0x3103dc(0x118)]['\x68\x65\x69\x67\x68\x74']);
            for (_0x1549ce = _0xd90e2c = 0x0; _0xd90e2c < 0x6; _0x1549ce = ++_0xd90e2c) {
                if (_0x3103dc(0x127) !== '\x73\x4e\x57\x6d\x50')
                    return this[_0x3103dc(0x10b)]['\x62\x69\x74\x6d\x61\x70']['\x64\x72\x61\x77\x4f\x6e\x4d\x65'](_0x55846f, _0x547b9c, _0x52bc15);
                else
                    _0x434e17 = this[_0x3103dc(0x124)](), _0x3f9940 = this[_0x3103dc(0x121)](_0x1549ce), this[_0x3103dc(0x109)](_0x434e17, _0x3f9940, 0x2 + _0x1549ce);
            }
            if (PKD_AlterEquipMenu[_0x3103dc(0x103)][_0x3103dc(0x11e)]()) {
                if ('\x73\x6d\x43\x73\x50' === _0x3103dc(0x120))
                    return this[_0x3103dc(0x118)][_0x3103dc(0x12d)] = 0x82, this[_0x3103dc(0x118)][_0x3103dc(0x106)](0x0, 0x0, this[_0x3103dc(0x10c)], this[_0x3103dc(0x11f)], _0x3103dc(0x119)), this['\x63\x6f\x6e\x74\x65\x6e\x74\x73'][_0x3103dc(0x12d)] = 0xff;
                else
                    this[_0x3103dc(0x11b)]['\x61\x64\x64\x43\x68\x69\x6c\x64'](this[_0x3103dc(0x10b)]);
            } else {
                if (_0x3103dc(0x10e) !== _0x3103dc(0x10e)) {
                    _0x56d703 = this[_0x3103dc(0x101)]['\x70\x47\x65\x74\x45\x71\x75\x69\x70\x49\x6d\x67']();
                    if (_0x340ab2[_0x3103dc(0x108)](_0x1db1df))
                        return _0x2ddedc[_0x3103dc(0x103)][_0x3103dc(0x112)](_0x3103dc(0x12c), _0x402e4c)['\x74\x68\x65\x6e'](this['\x5f\x70\x44\x72\x61\x77\x41\x63\x74\x6f\x72\x49\x6d\x61\x67\x65\x42\x6f\x64\x79'][_0x3103dc(0x11a)](this));
                } else
                    this[_0x3103dc(0x102)][_0x3103dc(0xfb)](this[_0x3103dc(0x10b)]);
            }
        } else
            return;
    }, _0x53c3d0[_0x3ec38b(0x128)] = function () {
        var _0xee6fa4 = _0x3ec38b;
        if ('\x64\x4d\x55\x79\x52' !== _0xee6fa4(0x115))
            this['\x5f\x63\x6f\x6e\x74\x65\x6e\x74\x73\x53\x70\x72\x69\x74\x65']['\x61\x64\x64\x43\x68\x69\x6c\x64'](this[_0xee6fa4(0x10b)]);
        else {
            var _0x487f64, _0x3c8bad;
            if (this[_0xee6fa4(0x101)] == null)
                return;
            try {
                _0x3c8bad = this[_0xee6fa4(0x101)][_0xee6fa4(0x123)]();
                if (String[_0xee6fa4(0x108)](_0x3c8bad))
                    return PKD_AlterEquipMenu[_0xee6fa4(0x103)][_0xee6fa4(0x112)](_0xee6fa4(0x12c), _0x3c8bad)[_0xee6fa4(0xfe)](this[_0xee6fa4(0x126)][_0xee6fa4(0x11a)](this));
            } catch (_0x3f8b4c) {
                if (_0xee6fa4(0x10f) !== _0xee6fa4(0x10f)) {
                    var _0x3594fe;
                    _0x3594fe = _0xee6fa4(0xfc) + _0xae1916, _0x491283[_0xee6fa4(0x103)][_0xee6fa4(0x112)](_0xee6fa4(0x129), _0x3594fe)[_0xee6fa4(0xfe)](this[_0xee6fa4(0x105)][_0xee6fa4(0x11a)](this, _0x2c4751, _0x4039ef));
                } else
                    return _0x487f64 = _0x3f8b4c, console[_0xee6fa4(0x125)](_0x487f64);
            }
        }
    }, _0x53c3d0[_0x3ec38b(0x126)] = function (_0x3b917e) {
        var _0x4f16e8 = _0x3ec38b;
        return this[_0x4f16e8(0x113)]['\x63\x6c\x65\x61\x72'](), this[_0x4f16e8(0x113)][_0x4f16e8(0x116)](_0x3b917e, 0x0, 0x0);
    }, _0x53c3d0[_0x3ec38b(0x10a)] = function () {
        var _0x400452 = _0x3ec38b;
        if (_0x400452(0x10d) === _0x400452(0x11d))
            this[_0x400452(0x11b)][_0x400452(0xfb)](this[_0x400452(0x10b)]);
        else
            return this[_0x400452(0x118)]['\x70\x61\x69\x6e\x74\x4f\x70\x61\x63\x69\x74\x79'] = 0x82, this['\x63\x6f\x6e\x74\x65\x6e\x74\x73']['\x66\x69\x6c\x6c\x52\x65\x63\x74'](0x0, 0x0, this[_0x400452(0x10c)], this[_0x400452(0x11f)], _0x400452(0x119)), this[_0x400452(0x118)][_0x400452(0x12d)] = 0xff;
    }, _0x53c3d0['\x70\x44\x72\x61\x77\x50\x61\x72\x61\x6d\x49\x63\x6f\x6e'] = function (_0x1a0121, _0x1dc43b, _0x56cc62) {
        var _0x1fe3e5 = _0x3ec38b, _0x218a90;
        _0x218a90 = _0x1fe3e5(0xfc) + _0x56cc62, PKD_AlterEquipMenu[_0x1fe3e5(0x103)][_0x1fe3e5(0x112)]('\x70\x41\x6c\x74\x65\x72\x45\x71\x75\x69\x70\x4d\x65\x6e\x75', _0x218a90)[_0x1fe3e5(0xfe)](this['\x70\x44\x72\x61\x77\x50\x61\x72\x61\x6d\x49\x63\x6f\x6e\x42\x6f\x64\x79'][_0x1fe3e5(0x11a)](this, _0x1a0121, _0x1dc43b));
    }, _0x53c3d0[_0x3ec38b(0x105)] = function (_0x273f6e, _0x59e5e9, _0x1429a6) {
        var _0x175eb8 = _0x3ec38b;
        return this[_0x175eb8(0x10b)]['\x62\x69\x74\x6d\x61\x70']['\x64\x72\x61\x77\x4f\x6e\x4d\x65'](_0x1429a6, _0x273f6e, _0x59e5e9);
    };
}()));
function _0x42d6() {
    var _0x520307 = [
        '\x5f\x63\x6f\x6e\x74\x65\x6e\x74\x73\x53\x70\x72\x69\x74\x65',
        '\x55\x74\x69\x6c\x73',
        '\x37\x47\x56\x4f\x62\x70\x67',
        '\x70\x44\x72\x61\x77\x50\x61\x72\x61\x6d\x49\x63\x6f\x6e\x42\x6f\x64\x79',
        '\x66\x69\x6c\x6c\x52\x65\x63\x74',
        '\x31\x30\x32\x34\x30\x31\x34\x58\x54\x66\x56\x41\x41',
        '\x61\x6e\x79',
        '\x70\x44\x72\x61\x77\x50\x61\x72\x61\x6d\x49\x63\x6f\x6e',
        '\x70\x44\x72\x61\x77\x41\x63\x74\x6f\x72\x49\x6d\x61\x67\x65\x46\x6f\x72\x65\x67\x72\x6f\x75\x6e\x64',
        '\x5f\x73\x74\x61\x74\x73\x49\x63\x6f\x6e\x73',
        '\x77\x69\x64\x74\x68',
        '\x74\x4f\x79\x6c\x51',
        '\x59\x49\x4e\x4e\x64',
        '\x58\x64\x55\x48\x6d',
        '\x74\x58\x77\x59\x6d',
        '\x33\x34\x33\x38\x31\x38\x36\x74\x6a\x62\x64\x68\x45',
        '\x6c\x6f\x61\x64\x49\x6d\x61\x67\x65\x41\x73\x79\x6e\x63',
        '\x63\x6f\x6e\x74\x65\x6e\x74\x73\x42\x61\x63\x6b',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x74\x61\x74\x73\x49\x63\x6f\x6e\x73\x4c\x61\x79\x65\x72',
        '\x64\x4d\x55\x79\x52',
        '\x64\x72\x61\x77\x4f\x6e\x4d\x65',
        '\x31\x47\x51\x68\x59\x57\x47',
        '\x63\x6f\x6e\x74\x65\x6e\x74\x73',
        '\x23\x30\x30\x30\x30\x30\x30',
        '\x62\x69\x6e\x64',
        '\x5f\x77\x69\x6e\x64\x6f\x77\x43\x6f\x6e\x74\x65\x6e\x74\x73\x53\x70\x72\x69\x74\x65',
        '\x62\x69\x74\x6d\x61\x70',
        '\x72\x64\x41\x56\x76',
        '\x69\x73\x4d\x56',
        '\x68\x65\x69\x67\x68\x74',
        '\x53\x7a\x58\x6c\x47',
        '\x70\x61\x72\x61\x6d\x59',
        '\x31\x34\x34\x35\x31\x35\x4a\x65\x71\x75\x4e\x56',
        '\x70\x47\x65\x74\x45\x71\x75\x69\x70\x49\x6d\x67',
        '\x69\x74\x65\x6d\x50\x61\x64\x64\x69\x6e\x67',
        '\x77\x61\x72\x6e',
        '\x5f\x70\x44\x72\x61\x77\x41\x63\x74\x6f\x72\x49\x6d\x61\x67\x65\x42\x6f\x64\x79',
        '\x73\x4e\x57\x6d\x50',
        '\x70\x44\x72\x61\x77\x41\x63\x74\x6f\x72\x49\x6d\x61\x67\x65',
        '\x70\x41\x6c\x74\x65\x72\x45\x71\x75\x69\x70\x4d\x65\x6e\x75',
        '\x33\x37\x32\x34\x38\x35\x36\x41\x4d\x58\x64\x56\x7a',
        '\x38\x32\x36\x33\x36\x36\x74\x64\x6e\x56\x50\x68',
        '\x70\x69\x63\x74\x75\x72\x65\x73',
        '\x70\x61\x69\x6e\x74\x4f\x70\x61\x63\x69\x74\x79',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x50\x61\x72\x61\x6d\x5f',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x74\x68\x65\x6e',
        '\x31\x33\x36\x31\x39\x39\x32\x63\x76\x67\x74\x62\x78',
        '\x31\x36\x36\x39\x31\x39\x34\x30\x71\x52\x51\x63\x47\x64',
        '\x5f\x61\x63\x74\x6f\x72'
    ];
    _0x42d6 = function () {
        return _0x520307;
    };
    return _0x42d6();
}
//Plugin PKD_AlterEquipMenu builded by PKD PluginBuilder 2.1 - 25.10.2022