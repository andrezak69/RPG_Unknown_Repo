/*
 * Copyright (c) 2023 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kdworkshop.net/>
 *

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 */

 // Changelog:
 // 1.0.1 - Fixed bug: party members use same visual equipment from party leader equipments
 //       - Added compatibility patch for VisuMZ_1_BattleCore 

/*:
 * @plugindesc (v.1.0.1)[BASIC] Visual Equipment for characters (SV battle)
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/battle-equip-layers
 *
 * @help
 * ---------------------------------------------------------------------------

 * This is BASIC plugin version and have some restrictions:
 *    - No updates with new features and content
 *    - Obfuscated code
 *    - Plugin usage allowed only in Non-Commercial project
 * 
 *  PRO version of plugin don't have this restrictions!
 
 * ===========================================================================
 * 
 * Plugin allows change the appearance of the characters in battle by
 * equipping different items. This can be used to make the characters
 * look more unique, or to reflect the type of equipment they are using.
 * Additionally, the plugin can also be used for cosmetic purposes and for
 * adding more immersion to the gameplay. 
 *
 * HOW TO USE:
 * ---------------------------------------------------------------------------
 * Add next notetags to Equipment (Armor or Weapon) or Actor
 *
 * <bEqL:LAYER, IMAGENAME>
 *
 * Where: LAYER - layer index, any number from 0 to X
 * In your game you determine by your own what part of clothes on what layer will be
 * Images with higher layer will be on top of images with lower layer
 *         IMAGENAME - layer image name from img/sv_equipLayers folder
 *
 * Example: <bEqL:1, CoolArmor>
 *
 * ! You can add more then one Note
 *
 * You can clear layer, use keyword "None" instead IMAGENAME
 * (for example you want hide hair layer when equip cape)
 * Example: <bEqL:0, None>
 *
 * You can make layer rule is important (other equipment's not ovveride this rule)
 * Add ! after comma to end of Note
 * Example: <bEqL:0, None, !>
 *
 * ---------------------------------------------------------------------------
 * How create Animated layer:
 *
 * Add #FRAMES_DELAY after IMAGENAME
 * Example: <bEqL:1, CoolArmor#3_10>
 *
 * You should have next images in img/sv_equipLayers folder
 * CoolArmor_0.png, CoolArmor_1.png, CoolArmor_2.png
 * (for example with 3 frames)
 *
 * ---------------------------------------------------------------------------
 * If you need refresh character look during battle, you can call next
 * Script call: PKD_SvBattleEquip_Refresh();
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
 * You can use this plugin in your game thanks to all who supports me!
 * 

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 *
 * 
 * @param PKD_SvBattleEquipLayers
 * @text
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.1.0.1)[BASIC] Визаульная экипировка в бою
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url https://kdworkshop.net/plugins/battle-equip-layers
 *
 * @help
 * ---------------------------------------------------------------------------

 * Это [BASIC] (базовая) версия плагина и имеет некоторые ограничения:
 *    - Нет обновлений плагина с новым контентом и функциями
 *    - Обфусцированный код
 *    - ЗАПРЕЩЕНО использовать плагин в коммерческих проектах
 * 
 *  [PRO] версия плагина не имеет данных ограничений!
 
 * ===========================================================================
 * Плагин позволяет изменять внешний вид персонажей в зависимости
 * от экипировки, которая на них одета.
 *
 * Доп. графика задаётся при помощи Note (заметок)
 * Брони, Оружия или Персонажа
 *
 * <bEqL:LAYER, IMAGENAME>
 * 
 * Где: LAYER - номер слоя, от 0 до Х
 * Сами определите в своей игре на каком слое что у Вас будет
 * Изображения с большим значением слоя будут выше изображений с меньшим
 *         IMAGENAME - название картинки из папки img/sv_equipLayers
 *
 * Пример: <bEqL:1, CoolArmor>
 *
 * ! Можно задавать сразу несколько заметок
 *
 * Можно очистить слой, исп. ключ. слово None, заместо имени картинки
 * (например если хотите скрыть волосы надевая шлем)
 * Пример: <bEqL:0, None>
 *
 * Слой можно сделать важным (другие предметы экипировки не изменять его)
 * Добавьте ! после запетой в конце Note
 * Пример: <bEqL:0, None, !>
 *
 * ---------------------------------------------------------------------------
 * Как создать анимированный слой:
 *
 * Добавьте #FRAMES_DELAY после IMAGENAME
 * Пример: <bEqL:1, CoolArmor#3_10>
 *
 * В папке img/sv_equipLayers должны быть след. файлы
 * CoolArmor_0.png, CoolArmor_1.png, CoolArmor_2.png
 * (это для примера выше, с 3 кадрами)
 *
 * ---------------------------------------------------------------------------
 * Если нужно перерисовать экипировку персонажа в бою, можно вызвать
 * следующий вызов скрипта: PKD_SvBattleEquip_Refresh();
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
 * 
 * @param PKD_SvBattleEquipLayers
 * @text
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */



var Imported = Imported || {};
Imported.PKD_SvBattleEquipLayers = true;

var PKD_SvBattleEquipLayers = {};
PKD_SvBattleEquipLayers.Version = 101;

//?VERSION
PKD_SvBattleEquipLayers.isPro = function() { return false; };

PKD_SvBattleEquipLayers.PP = {};
PKD_SvBattleEquipLayers.Utils = {};

// * Загрзука параметров
PKD_SvBattleEquipLayers.LoadPluginSettings = () => {
    PKD_SvBattleEquipLayers.PP._loader = new KDCore.ParamLoader('PKD_SvBattleEquipLayers');
};

// Generated by CoffeeScript 2.6.1
window.PKD_SvBattleEquip_Refresh = function() {
  var e, i, layer, len, ref;
  try {
    if ($gameTemp && ($gameTemp._pBattleEqLayers != null)) {
      ref = $gameTemp._pBattleEqLayers;
      for (i = 0, len = ref.length; i < len; i++) {
        layer = ref[i];
        layer.forceRefresh();
      }
    }
  } catch (error) {
    e = error;
    return console.warn(e);
  }
};


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_SvBattleEquipLayers.PP;
})();


//_.getParamTemplate = () -> @_loader.getParam('', true)


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_SvBattleEquipLayers.Utils;
  _.hasMeta = function(symbol, obj) {
    return (obj != null) && (obj.meta != null) && (obj.meta[symbol] != null);
  };
  _.getArrayOfValuesOfSameMeta = function(symbol, obj) {
    var e, i, len, line, lines, result;
    try {
      if (!this.hasMeta(symbol, obj)) {
        return [];
      }
      lines = obj.note.split("\n").filter(function(l) {
        return l.contains(symbol);
      });
      result = [];
      for (i = 0, len = lines.length; i < len; i++) {
        line = lines[i];
        try {
          line = line.replace("<" + symbol + ":", "");
          line = line.replace(">", "");
          result.push(line);
        } catch (error) {
          e = error;
          console.warn(e);
        }
      }
      return result;
    } catch (error) {
      e = error;
      console.warn(e);
    }
    return [];
  };
})();


function _0x17b9() {
    var _0xe5c6bc = [
        '\x63\x6f\x6e\x63\x61\x74',
        '\x6d\x61\x70',
        '\x78\x55\x54\x63\x48',
        '\x4a\x4f\x6b\x78\x78',
        '\x64\x4b\x54\x78\x44',
        '\x55\x74\x69\x6c\x73',
        '\x61\x63\x74\x6f\x72',
        '\x67\x65\x74\x41\x72\x72\x61\x79\x4f\x66\x56\x61\x6c\x75\x65\x73\x4f\x66\x53\x61\x6d\x65\x4d\x65\x74\x61',
        '\x32\x30\x35\x39\x36\x35\x36\x65\x42\x62\x67\x68\x77',
        '\x70\x75\x73\x68',
        '\x31\x35\x31\x37\x35\x33\x32\x45\x4f\x73\x5a\x78\x54',
        '\x45\x56\x57\x52\x76',
        '\x31\x38\x32\x6f\x78\x6f\x43\x64\x72',
        '\x46\x4a\x56\x68\x4c',
        '\x69\x73\x50\x72\x69\x6f\x72\x69\x74\x79',
        '\x41\x6b\x56\x43\x72',
        '\x37\x38\x32\x34\x33\x34\x38\x61\x42\x71\x69\x61\x7a',
        '\x70\x47\x65\x74\x53\x76\x45\x4c\x61\x79\x65\x72\x73',
        '\x48\x73\x57\x43\x70',
        '\x62\x45\x71\x4c',
        '\x77\x61\x72\x6e',
        '\x6b\x78\x5a\x44\x57',
        '\x76\x70\x4a\x70\x6e',
        '\x70\x50\x61\x72\x73\x65\x45\x71\x4c\x61\x79\x65\x72\x73\x4d\x65\x74\x61\x64\x61\x74\x61',
        '\x37\x31\x34\x34\x33\x30\x6e\x64\x44\x58\x68\x46',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x70\x47\x65\x74\x53\x76\x45\x4c\x61\x79\x65\x72\x73\x4f\x66\x41\x63\x74\x6f\x72',
        '\x49\x4a\x42\x57\x47',
        '\x32\x30\x6b\x6f\x57\x76\x56\x6f',
        '\x67\x79\x49\x4e\x6b',
        '\x44\x54\x67\x49\x6f',
        '\x70\x79\x4c\x68\x73',
        '\x39\x37\x35\x35\x34\x72\x70\x66\x79\x72\x77',
        '\x66\x69\x6c\x74\x65\x72',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x74\x72\x69\x6d',
        '\x36\x37\x37\x31\x39\x7a\x76\x48\x48\x6f\x63',
        '\x50\x47\x65\x74\x53\x76\x45\x4c\x61\x79\x65\x72\x73\x4f\x66\x45\x71\x75\x69\x70\x73',
        '\x31\x30\x36\x31\x34\x30\x75\x70\x65\x5a\x74\x5a',
        '\x65\x71\x75\x69\x70\x73'
    ];
    _0x17b9 = function () {
        return _0xe5c6bc;
    };
    return _0x17b9();
}
function _0x2187(_0x19b24f, _0x218ba2) {
    var _0x17b9ae = _0x17b9();
    return _0x2187 = function (_0x2187ac, _0x13c941) {
        _0x2187ac = _0x2187ac - 0x15f;
        var _0x29f42d = _0x17b9ae[_0x2187ac];
        return _0x29f42d;
    }, _0x2187(_0x19b24f, _0x218ba2);
}
(function (_0x416c24, _0x3844df) {
    var _0x38afff = _0x2187, _0x407b5a = _0x416c24();
    while (!![]) {
        try {
            var _0x26b681 = -parseInt(_0x38afff(0x160)) / 0x1 + -parseInt(_0x38afff(0x180)) / 0x2 * (-parseInt(_0x38afff(0x162)) / 0x3) + -parseInt(_0x38afff(0x16e)) / 0x4 + parseInt(_0x38afff(0x17c)) / 0x5 + parseInt(_0x38afff(0x184)) / 0x6 * (-parseInt(_0x38afff(0x170)) / 0x7) + -parseInt(_0x38afff(0x16c)) / 0x8 + parseInt(_0x38afff(0x174)) / 0x9;
            if (_0x26b681 === _0x3844df)
                break;
            else
                _0x407b5a['push'](_0x407b5a['shift']());
        } catch (_0x37d90c) {
            _0x407b5a['push'](_0x407b5a['shift']());
        }
    }
}(_0x17b9, 0x3a4ad), (function () {
    var _0x3dcee3 = _0x2187, _0x4d0edc;
    _0x4d0edc = Game_Actor[_0x3dcee3(0x17d)], _0x4d0edc[_0x3dcee3(0x175)] = function () {
        var _0x1125e3 = _0x3dcee3, _0x4bf0ec, _0x4bfc37, _0x4bfbd4, _0x4bf51b, _0x3b029e;
        try {
            return _0x4bf0ec = this[_0x1125e3(0x17e)](), _0x4bf51b = this[_0x1125e3(0x161)](), _0x3b029e = _0x4bf51b[_0x1125e3(0x185)](function (_0x2dbe78) {
                var _0x1f4ee9 = _0x1125e3;
                return _0x2dbe78[_0x1f4ee9(0x172)] === !![];
            }), _0x4bfc37 = _0x4bf0ec[_0x1125e3(0x164)](_0x4bf51b)[_0x1125e3(0x164)](_0x3b029e), _0x4bfc37;
        } catch (_0x5364d3) {
            return _0x4bfbd4 = _0x5364d3, console['\x77\x61\x72\x6e'](_0x4bfbd4), [];
        }
    }, _0x4d0edc['\x70\x47\x65\x74\x53\x76\x45\x4c\x61\x79\x65\x72\x73\x4f\x66\x41\x63\x74\x6f\x72'] = function () {
        var _0x29c5f0 = _0x3dcee3, _0x58db31, _0x90a082, _0x38daca;
        try {
            return _0x29c5f0(0x168) !== '\x42\x52\x54\x66\x63' ? (_0x38daca = PKD_SvBattleEquipLayers[_0x29c5f0(0x169)]['\x67\x65\x74\x41\x72\x72\x61\x79\x4f\x66\x56\x61\x6c\x75\x65\x73\x4f\x66\x53\x61\x6d\x65\x4d\x65\x74\x61']('\x62\x45\x71\x4c', this['\x61\x63\x74\x6f\x72']()), _0x90a082 = this[_0x29c5f0(0x17b)](_0x38daca), _0x90a082) : (_0x10583b = _0x20605d[_0x29c5f0(0x169)][_0x29c5f0(0x16b)](_0x29c5f0(0x177), this[_0x29c5f0(0x16a)]()), _0x8af6fa = this[_0x29c5f0(0x17b)](_0x1fb767), _0x2f1478);
        } catch (_0x15a4a1) {
            if (_0x29c5f0(0x182) !== _0x29c5f0(0x179))
                return _0x58db31 = _0x15a4a1, console[_0x29c5f0(0x178)](_0x58db31), [];
            else
                _0x3e845c = _0x3e54ac, _0x54e0d3[_0x29c5f0(0x178)](_0x2a979a), _0x14a316 = null;
        }
    }, _0x4d0edc['\x70\x50\x61\x72\x73\x65\x45\x71\x4c\x61\x79\x65\x72\x73\x4d\x65\x74\x61\x64\x61\x74\x61'] = function (_0x24a441) {
        var _0x79de40 = _0x3dcee3, _0x4192de, _0x50308f, _0x1960ef, _0x281017, _0x3caf5e, _0x45ebd3, _0x587db4, _0x4b4819;
        try {
            _0x1960ef = function (_0x16a382) {
                var _0x47b15d = _0x2187;
                return '\x4a\x79\x6f\x48\x50' !== _0x47b15d(0x181) ? _0x16a382['\x73\x70\x6c\x69\x74']('\x2c')[_0x47b15d(0x165)](function (_0x907173) {
                    var _0x2984b2 = _0x47b15d;
                    return _0x907173[_0x2984b2(0x15f)]();
                }) : (_0x530e2d = _0x2cda71, _0xdb11a9[_0x47b15d(0x178)](_0x572fe7), []);
            }, _0x4b4819 = [];
            for (_0x281017 = 0x0, _0x587db4 = _0x24a441[_0x79de40(0x186)]; _0x281017 < _0x587db4; _0x281017++) {
                if ('\x70\x79\x4c\x68\x73' === _0x79de40(0x183)) {
                    _0x3caf5e = _0x24a441[_0x281017];
                    try {
                        if (_0x79de40(0x176) === '\x42\x78\x7a\x6d\x72') {
                            var _0x1e70ec, _0x3948c3, _0x26bc3d, _0x5e2e85, _0x5ecf6b;
                            try {
                                return _0x1e70ec = this[_0x79de40(0x17e)](), _0x5e2e85 = this[_0x79de40(0x161)](), _0x5ecf6b = _0x5e2e85['\x66\x69\x6c\x74\x65\x72'](function (_0x2e7759) {
                                    var _0x27e88f = _0x79de40;
                                    return _0x2e7759[_0x27e88f(0x172)] === !![];
                                }), _0x3948c3 = _0x1e70ec['\x63\x6f\x6e\x63\x61\x74'](_0x5e2e85)['\x63\x6f\x6e\x63\x61\x74'](_0x5ecf6b), _0x3948c3;
                            } catch (_0x5b80f5) {
                                return _0x26bc3d = _0x5b80f5, _0x21b82a[_0x79de40(0x178)](_0x26bc3d), [];
                            }
                        } else
                            _0x45ebd3 = _0x1960ef(_0x3caf5e), _0x4192de = {
                                '\x69\x6e\x64\x65\x78': parseInt(_0x45ebd3[0x0]),
                                '\x66\x69\x6c\x65\x6e\x61\x6d\x65': _0x45ebd3[0x1],
                                '\x69\x73\x50\x72\x69\x6f\x72\x69\x74\x79': _0x45ebd3[0x2] === '\x21'
                            };
                    } catch (_0xcedf5e) {
                        _0x50308f = _0xcedf5e, console['\x77\x61\x72\x6e'](_0x50308f), _0x4192de = null;
                    }
                    if (_0x4192de != null) {
                        if (_0x79de40(0x17a) === _0x79de40(0x17a))
                            _0x4b4819[_0x79de40(0x16d)](_0x4192de);
                        else {
                            _0x1f6ce0 = _0x5326da[_0x3b8d2e];
                            try {
                                _0x252b3b = _0x564139(_0x450b29), _0x5179c2 = {
                                    '\x69\x6e\x64\x65\x78': _0x314df2(_0x1461b9[0x0]),
                                    '\x66\x69\x6c\x65\x6e\x61\x6d\x65': _0x48db3[0x1],
                                    '\x69\x73\x50\x72\x69\x6f\x72\x69\x74\x79': _0x113ea4[0x2] === '\x21'
                                };
                            } catch (_0x350e6d) {
                                _0x22f34f = _0x350e6d, _0x245f1e[_0x79de40(0x178)](_0x2cd2b4), _0x18db19 = null;
                            }
                            _0x4d5e56 != null && _0x57a025['\x70\x75\x73\x68'](_0x4eb0d3);
                        }
                    }
                } else
                    return _0x57a9bf = _0x13e4db, _0x193460[_0x79de40(0x178)](_0x2a514b), [];
            }
            return _0x4b4819;
        } catch (_0x1a2777) {
            return '\x59\x77\x66\x73\x75' === '\x58\x44\x63\x72\x46' ? _0x2ad16f['\x69\x73\x50\x72\x69\x6f\x72\x69\x74\x79'] === !![] : (_0x50308f = _0x1a2777, console[_0x79de40(0x178)](_0x50308f), []);
        }
    }, _0x4d0edc[_0x3dcee3(0x161)] = function () {
        var _0x1210b7 = _0x3dcee3, _0x2d1ee3, _0x150fc3, _0x2602f7, _0x736941, _0x5c4df3, _0x24d033, _0x408b72, _0x28f32e;
        try {
            if ('\x49\x4a\x42\x57\x47' !== _0x1210b7(0x17f))
                _0x4968f3[_0x1210b7(0x16d)](_0x547f57);
            else {
                _0x150fc3 = this[_0x1210b7(0x163)](), _0x24d033 = [];
                for (_0x736941 = _0x2602f7 = 0x0, _0x5c4df3 = _0x150fc3[_0x1210b7(0x186)]; _0x2602f7 < _0x5c4df3; _0x736941 = ++_0x2602f7) {
                    if (_0x1210b7(0x16f) !== '\x45\x56\x57\x52\x76')
                        _0x4d8068 = _0x5e0f78(_0x3f5587), _0x56d352 = {
                            '\x69\x6e\x64\x65\x78': _0x5bfbe4(_0x46fb0e[0x0]),
                            '\x66\x69\x6c\x65\x6e\x61\x6d\x65': _0x44e016[0x1],
                            '\x69\x73\x50\x72\x69\x6f\x72\x69\x74\x79': _0x54ca31[0x2] === '\x21'
                        };
                    else {
                        _0x2d1ee3 = _0x150fc3[_0x736941];
                        if (_0x2d1ee3 == null) {
                            if (_0x1210b7(0x166) === _0x1210b7(0x167))
                                return _0x4c5951[_0x1210b7(0x15f)]();
                            else
                                continue;
                        }
                        try {
                            _0x28f32e = PKD_SvBattleEquipLayers['\x55\x74\x69\x6c\x73'][_0x1210b7(0x16b)]('\x62\x45\x71\x4c', _0x2d1ee3);
                        } catch (_0x338f84) {
                            _0x1210b7(0x171) === _0x1210b7(0x173) ? (_0x14b31a = _0x3e53b5, _0x12c532['\x77\x61\x72\x6e'](_0x330a3e), _0x42f033 = null) : (_0x2d1ee3 = _0x338f84, console[_0x1210b7(0x178)](_0x2d1ee3), _0x28f32e = null);
                        }
                        _0x28f32e != null && _0x24d033[_0x1210b7(0x16d)](..._0x28f32e);
                    }
                }
                return _0x408b72 = this['\x70\x50\x61\x72\x73\x65\x45\x71\x4c\x61\x79\x65\x72\x73\x4d\x65\x74\x61\x64\x61\x74\x61'](_0x24d033), _0x408b72;
            }
        } catch (_0x19aeaa) {
            return _0x2d1ee3 = _0x19aeaa, console[_0x1210b7(0x178)](_0x2d1ee3), [];
        }
    };
}()));

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Battler.prototype;
  _.pGetSvELayers = function() {
    return [];
  };
})();

// ■ END Game_Battler.coffee
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
  _.loadPKDSVELayer = function(filename) {
    return this.loadBitmap('img/sv_equipLayers/', filename);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Battle.prototype;
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    ALIAS__stop.call(this, ...arguments);
    return $gameTemp._pBattleEqLayers = null;
  };
})();

// ■ END Scene_Battle.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------
//@[DEFINES]
//_ = Scene_Boot::

//@[ALIAS]
/*ALIAS__start = _.start
_.start = ->
    ALIAS__start.call(@, ...arguments)
    PKD_SvBattleEquipLayers.LoadPluginSettings()
    return*/


(function (_0x5e1e35, _0xae0303) {
    var _0x45524e = _0x2904, _0x72927c = _0x5e1e35();
    while (!![]) {
        try {
            var _0x16e0b9 = parseInt(_0x45524e(0xaf)) / 0x1 + parseInt(_0x45524e(0xb8)) / 0x2 * (-parseInt(_0x45524e(0xb7)) / 0x3) + -parseInt(_0x45524e(0xb5)) / 0x4 * (parseInt(_0x45524e(0xbd)) / 0x5) + -parseInt(_0x45524e(0xb0)) / 0x6 + parseInt(_0x45524e(0xac)) / 0x7 + parseInt(_0x45524e(0xab)) / 0x8 + parseInt(_0x45524e(0xba)) / 0x9 * (parseInt(_0x45524e(0xb4)) / 0xa);
            if (_0x16e0b9 === _0xae0303)
                break;
            else
                _0x72927c['push'](_0x72927c['shift']());
        } catch (_0x5141ca) {
            _0x72927c['push'](_0x72927c['shift']());
        }
    }
}(_0x3427, 0xed519), (function () {
    var _0x10aa14 = _0x2904, _0x5b74ee, _0x2536f7, _0x4d84c7, _0x4545ff;
    _0x4545ff = Sprite_Actor[_0x10aa14(0xb3)], _0x5b74ee = _0x4545ff['\x63\x72\x65\x61\x74\x65\x4d\x61\x69\x6e\x53\x70\x72\x69\x74\x65'], _0x4545ff[_0x10aa14(0xb2)] = function () {
        var _0x480e25 = _0x10aa14;
        _0x5b74ee['\x63\x61\x6c\x6c'](this, ...arguments), this[_0x480e25(0xbb)]();
    }, _0x2536f7 = _0x4545ff[_0x10aa14(0xad)], _0x4545ff['\x73\x65\x74\x42\x61\x74\x74\x6c\x65\x72'] = function (_0x54277d) {
        var _0x44e493 = _0x10aa14;
        this['\x5f\x5f\x70\x50\x72\x65\x76'] = this[_0x44e493(0xb1)], _0x2536f7[_0x44e493(0xb9)](this, ...arguments), this[_0x44e493(0xbc)](_0x54277d);
    }, _0x4d84c7 = _0x4545ff[_0x10aa14(0xae)], _0x4545ff['\x75\x70\x64\x61\x74\x65\x46\x72\x61\x6d\x65'] = function () {
        var _0x186a91 = _0x10aa14;
        return _0x4d84c7[_0x186a91(0xb9)](this, ...arguments), this[_0x186a91(0xb6)]();
    };
}()));
function _0x2904(_0x6a912c, _0x5a03f9) {
    var _0x34270f = _0x3427();
    return _0x2904 = function (_0x2904de, _0x307924) {
        _0x2904de = _0x2904de - 0xab;
        var _0x3d50a2 = _0x34270f[_0x2904de];
        return _0x3d50a2;
    }, _0x2904(_0x6a912c, _0x5a03f9);
}
function _0x3427() {
    var _0x7433a1 = [
        '\x31\x32\x38\x30\x47\x78\x79\x45\x48\x65',
        '\x63\x61\x6c\x6c',
        '\x31\x33\x30\x32\x32\x35\x39\x35\x43\x52\x69\x51\x78\x64',
        '\x5f\x70\x43\x72\x65\x61\x74\x65\x4c\x61\x79\x65\x72\x73\x53\x70\x72\x69\x74\x65',
        '\x5f\x70\x4f\x6e\x4e\x65\x77\x42\x61\x74\x74\x6c\x65\x72\x53\x65\x74\x74\x65\x64',
        '\x34\x33\x34\x34\x35\x67\x7a\x55\x47\x45\x77',
        '\x34\x30\x33\x31\x38\x30\x30\x5a\x47\x63\x50\x43\x55',
        '\x31\x33\x32\x33\x33\x32\x39\x37\x55\x49\x48\x59\x4a\x69',
        '\x73\x65\x74\x42\x61\x74\x74\x6c\x65\x72',
        '\x75\x70\x64\x61\x74\x65\x46\x72\x61\x6d\x65',
        '\x31\x36\x30\x30\x39\x33\x31\x72\x45\x70\x62\x76\x43',
        '\x38\x35\x31\x36\x38\x36\x32\x45\x59\x50\x4a\x51\x41',
        '\x5f\x61\x63\x74\x6f\x72',
        '\x63\x72\x65\x61\x74\x65\x4d\x61\x69\x6e\x53\x70\x72\x69\x74\x65',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x31\x30\x55\x53\x4b\x48\x75\x59',
        '\x35\x36\x38\x58\x56\x61\x43\x70\x57',
        '\x5f\x70\x4f\x6e\x4d\x61\x69\x6e\x53\x70\x72\x55\x70\x64\x61\x74\x65\x46\x72\x61\x6d\x65',
        '\x38\x35\x31\x37\x72\x4e\x66\x52\x67\x4a'
    ];
    _0x3427 = function () {
        return _0x7433a1;
    };
    return _0x3427();
}

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Actor.prototype;
  _._pOnNewBattlerSetted = function(battler) {
    var ref;
    if (battler === this.__pPrev) {
      return;
    }
    if (battler != null) {
      return (ref = this._pEqLayers) != null ? ref.setBattler(battler) : void 0;
    } else {
      return this._pOnMainSprBitmapNull();
    }
  };
  _._pCreateLayersSprite = function() {
    if ($gameTemp._pBattleEqLayers == null) {
      $gameTemp._pBattleEqLayers = [];
    }
    this._pEqLayers = new Sprite_PKD_SvBELayers();
    this._mainSprite.addChild(this._pEqLayers);
    $gameTemp._pBattleEqLayers.push(this._pEqLayers);
  };
  _._pOnMainSprBitmapNull = function() {
    var ref;
    if ((ref = this._pEqLayers) != null) {
      ref._destroyLayers();
    }
  };
  _._pOnMainSprBitmapChanged = function() {}; // * NOT USED, commented, yet
  _._pOnMainSprUpdateFrame = function() {
    var ref;
    return (ref = this._pEqLayers) != null ? ref.refreshFrame(this._mainSprite._frame) : void 0;
  };
})();

// ■ END Sprite_Actor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var Sprite_PKD_SvBELayerAnimated;

Sprite_PKD_SvBELayerAnimated = class Sprite_PKD_SvBELayerAnimated extends Sprite {
  constructor(imageName) {
    var e;
    super();
    this._frameIndex = 0;
    this._timer = 0;
    this._timerMax = 0;
    try {
      this._createFromParameters(imageName);
    } catch (error) {
      e = error;
      console.warn(e);
      this.disableAnimation();
    }
    return;
  }

  disableAnimation() {
    this.bitmap = null;
    return this._timer = null;
  }

  update() {
    super.update();
    if (this._timer != null) {
      this._updateFrameTick();
    }
  }

  _updateFrameTick() {
    this._timer++;
    if (this._timer >= this._timerMax) {
      this._timer = 0;
      this._frameTick();
    }
  }

  _createFromParameters(imageName) {
    var bitmapNameMain, delayBtwFrames, framesCount, parts, values;
    values = imageName.split('#');
    parts = values[1].split("_").map(function(i) {
      return i.trim();
    });
    bitmapNameMain = values[0];
    framesCount = parseInt(parts[0]);
    delayBtwFrames = parseInt(parts[1]);
    if (framesCount > 0 && delayBtwFrames > 0) {
      this._loadBitmaps(bitmapNameMain, framesCount);
      this._refreshFrameIndex();
      this._timer = 0;
      this._timerMax = delayBtwFrames;
    }
  }

  _loadBitmaps(name, count = 1) {
    var i, j, ref;
    this._frames = [];
    for (i = j = 0, ref = count; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      this._frames.push(ImageManager.loadPKDSVELayer(name + "_" + i));
    }
  }

  _refreshFrameIndex() {
    var e;
    try {
      this.bitmap = this._frames[this._frameIndex];
    } catch (error) {
      e = error;
      console.warn(e);
      try {
        this.bitmap = this._frames[0];
      } catch (error) {
        e = error;
        console.warn(e);
        this.disableAnimation();
      }
    }
  }

  _frameTick() {
    this._frameIndex++;
    if (this._frameIndex >= this._frames.length) {
      this._frameIndex = 0;
    }
    this._refreshFrameIndex();
  }

};


var _0x6f6a87 = _0x1867;
(function (_0x58fe69, _0x25502a) {
    var _0x533d56 = _0x1867, _0x1beae1 = _0x58fe69();
    while (!![]) {
        try {
            var _0x25d4d3 = parseInt(_0x533d56(0xb6)) / 0x1 + parseInt(_0x533d56(0xbf)) / 0x2 * (parseInt(_0x533d56(0xb9)) / 0x3) + parseInt(_0x533d56(0xcd)) / 0x4 * (-parseInt(_0x533d56(0xbc)) / 0x5) + -parseInt(_0x533d56(0xca)) / 0x6 + parseInt(_0x533d56(0xd0)) / 0x7 * (-parseInt(_0x533d56(0xb4)) / 0x8) + -parseInt(_0x533d56(0xba)) / 0x9 * (-parseInt(_0x533d56(0xe1)) / 0xa) + -parseInt(_0x533d56(0xb8)) / 0xb * (-parseInt(_0x533d56(0xdf)) / 0xc);
            if (_0x25d4d3 === _0x25502a)
                break;
            else
                _0x1beae1['push'](_0x1beae1['shift']());
        } catch (_0x566491) {
            _0x1beae1['push'](_0x1beae1['shift']());
        }
    }
}(_0x4e55, 0x41dbd));
var Sprite_PKD_SvBELayers;
function _0x4e55() {
    var _0x2f985b = [
        '\x32\x33\x31\x33\x35\x30\x34\x79\x46\x6e\x7a\x43\x51',
        '\x46\x41\x58\x44\x67',
        '\x31\x38\x36\x35\x69\x46\x6e\x46\x79\x49',
        '\x5f\x63\x72\x65\x61\x74\x65\x4c\x61\x79\x65\x72\x73',
        '\x70\x47\x65\x74\x53\x76\x45\x4c\x61\x79\x65\x72\x73',
        '\x36\x38\x39\x38\x38\x41\x77\x6d\x79\x56\x58',
        '\x5f\x6c\x61\x79\x65\x72\x73',
        '\x61\x6e\x63\x68\x6f\x72',
        '\x4c\x61\x79\x65\x72\x73\x20\x72\x65\x66\x72\x65\x73\x68\x65\x64',
        '\x5f\x61\x64\x64\x4c\x61\x79\x65\x72\x73',
        '\x4a\x5a\x4e\x4e\x78',
        '\x72\x65\x6d\x6f\x76\x65\x43\x68\x69\x6c\x64',
        '\x4b\x66\x62\x48\x4d',
        '\x5f\x62\x61\x74\x74\x6c\x65\x72',
        '\x47\x7a\x52\x45\x71',
        '\x6d\x6f\x77\x77\x4d',
        '\x31\x37\x30\x34\x38\x34\x36\x6d\x66\x71\x6b\x57\x68',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x4e\x6f\x6e\x65',
        '\x32\x34\x30\x34\x5a\x66\x4f\x45\x41\x55',
        '\x73\x65\x74\x46\x72\x61\x6d\x65',
        '\x66\x69\x6c\x65\x6e\x61\x6d\x65',
        '\x31\x34\x43\x75\x6a\x78\x77\x72',
        '\x66\x6f\x72\x63\x65\x52\x65\x66\x72\x65\x73\x68',
        '\x76\x69\x73\x69\x62\x6c\x65',
        '\x62\x55\x58\x6b\x4a',
        '\x72\x65\x66\x72\x65\x73\x68\x46\x72\x61\x6d\x65',
        '\x75\x6f\x62\x43\x53',
        '\x70\x75\x73\x68',
        '\x6c\x6f\x67',
        '\x69\x6e\x64\x65\x78',
        '\x4c\x79\x4c\x72\x76',
        '\x6c\x6f\x61\x64\x50\x4b\x44\x53\x56\x45\x4c\x61\x79\x65\x72',
        '\x4c\x65\x49\x66\x45',
        '\x63\x6f\x6e\x74\x61\x69\x6e\x73',
        '\x73\x65\x74\x42\x61\x74\x74\x6c\x65\x72',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x32\x33\x31\x36\x64\x56\x41\x44\x6f\x52',
        '\x69\x76\x67\x53\x48',
        '\x32\x30\x6d\x77\x53\x6f\x79\x62',
        '\x61\x76\x6e\x42\x4f',
        '\x31\x39\x32\x32\x37\x33\x36\x50\x62\x48\x69\x7a\x56',
        '\x5f\x64\x65\x73\x74\x72\x6f\x79\x4c\x61\x79\x65\x72\x73',
        '\x34\x33\x32\x34\x32\x32\x6e\x6a\x55\x68\x48\x58',
        '\x42\x73\x77\x4d\x78',
        '\x31\x35\x38\x32\x39\x55\x49\x7a\x56\x63\x48',
        '\x33\x74\x6f\x74\x54\x53\x79'
    ];
    _0x4e55 = function () {
        return _0x2f985b;
    };
    return _0x4e55();
}
function _0x1867(_0x60bf9a, _0x527350) {
    var _0x4e5586 = _0x4e55();
    return _0x1867 = function (_0x18673f, _0x9e2074) {
        _0x18673f = _0x18673f - 0xb3;
        var _0x3e6a9c = _0x4e5586[_0x18673f];
        return _0x3e6a9c;
    }, _0x1867(_0x60bf9a, _0x527350);
}
Sprite_PKD_SvBELayers = class Sprite_PKD_SvBELayers extends Sprite {
    constructor() {
        var _0x499fba = _0x1867;
        super(), this[_0x499fba(0xc0)] = [], this[_0x499fba(0xc1)]['\x78'] = 0.5, this[_0x499fba(0xc1)]['\x79'] = 0x1;
        return;
    }
    [_0x6f6a87(0xdd)](_0xd1bd66) {
        var _0x990fc7 = _0x6f6a87;
        this['\x5f\x62\x61\x74\x74\x6c\x65\x72'] !== _0xd1bd66 && (_0x990fc7(0xd3) === _0x990fc7(0xc9) ? _0x2059d0 = new _0xca753d(_0x4fe11f) : (this[_0x990fc7(0xc7)] = _0xd1bd66, this[_0x990fc7(0xbd)]()));
    }
    [_0x6f6a87(0xd1)]() {
        var _0x3fdcfb = _0x6f6a87;
        return console[_0x3fdcfb(0xd7)](_0x3fdcfb(0xc2)), this[_0x3fdcfb(0xbd)]();
    }
    [_0x6f6a87(0xbd)]() {
        var _0x28fb57 = _0x6f6a87, _0x4452f4, _0x56c794, _0x4a0e60, _0x5cc78b, _0x57f05d, _0x65943a;
        this[_0x28fb57(0xb5)]();
        if (this[_0x28fb57(0xc7)] == null) {
            if (_0x28fb57(0xb7) === '\x42\x73\x77\x4d\x78')
                return;
            else {
                var _0x3b6c25, _0xc0d277, _0x3b1d7d, _0x4c37a9;
                for (_0xc0d277 = 0x0, _0x4c37a9 = _0x179f7d[_0x28fb57(0xcb)]; _0xc0d277 < _0x4c37a9; _0xc0d277++) {
                    _0x3b6c25 = _0x399361[_0xc0d277], _0x3b6c25[_0x28fb57(0xdc)]('\x23') ? _0x3b1d7d = new _0x2b5d91(_0x3b6c25) : _0x3b1d7d = new _0x5bdb5b(_0x55baf2[_0x28fb57(0xda)](_0x3b6c25)), _0x3b1d7d['\x61\x6e\x63\x68\x6f\x72']['\x78'] = 0.5, _0x3b1d7d[_0x28fb57(0xc1)]['\x79'] = 0x1, this[_0x28fb57(0xde)](_0x3b1d7d), this[_0x28fb57(0xc0)][_0x28fb57(0xd6)](_0x3b1d7d);
                }
            }
        }
        _0x5cc78b = this[_0x28fb57(0xc7)][_0x28fb57(0xbe)](), _0x65943a = [];
        for (_0x56c794 = 0x0, _0x57f05d = _0x5cc78b[_0x28fb57(0xcb)]; _0x56c794 < _0x57f05d; _0x56c794++) {
            if (_0x28fb57(0xe0) === _0x28fb57(0xb3))
                this['\x5f\x62\x61\x74\x74\x6c\x65\x72'] !== _0x125b31 && (this[_0x28fb57(0xc7)] = _0x10d233, this[_0x28fb57(0xbd)]());
            else {
                _0x4a0e60 = _0x5cc78b[_0x56c794];
                if (_0x4a0e60[_0x28fb57(0xcf)] === _0x28fb57(0xcc)) {
                    if (_0x28fb57(0xc6) !== _0x28fb57(0xbb))
                        _0x65943a[_0x4a0e60[_0x28fb57(0xd8)]] = null;
                    else
                        return _0x31f7b3 != null;
                } else
                    _0x28fb57(0xc4) === _0x28fb57(0xc4) ? _0x65943a[_0x4a0e60[_0x28fb57(0xd8)]] = _0x4a0e60[_0x28fb57(0xcf)] : (this['\x5f\x62\x61\x74\x74\x6c\x65\x72'] = _0x37539e, this[_0x28fb57(0xbd)]());
            }
        }
        _0x4452f4 = _0x65943a['\x66\x69\x6c\x74\x65\x72'](function (_0x343656) {
            return _0x343656 != null;
        }), this[_0x28fb57(0xc3)](_0x4452f4);
    }
    ['\x5f\x61\x64\x64\x4c\x61\x79\x65\x72\x73'](_0xaf8d2e) {
        var _0x15a1ee = _0x6f6a87, _0x45c2c2, _0x17742a, _0x226b40, _0x397ed5;
        for (_0x17742a = 0x0, _0x397ed5 = _0xaf8d2e[_0x15a1ee(0xcb)]; _0x17742a < _0x397ed5; _0x17742a++) {
            _0x45c2c2 = _0xaf8d2e[_0x17742a];
            if (_0x45c2c2[_0x15a1ee(0xdc)]('\x23')) {
                if (_0x15a1ee(0xd9) !== _0x15a1ee(0xd9)) {
                    var _0x13bf1b, _0x101bc0, _0x328829, _0x581c3d, _0x223b3e, _0x34e6bc, _0xf9028e, _0x4cce01, _0x1a5990;
                    if (_0x63899f == null)
                        return;
                    ({
                        x: _0x4cce01,
                        y: _0x1a5990,
                        width: _0xf9028e,
                        height: _0x13bf1b
                    } = _0x327453, _0x223b3e = this['\x5f\x6c\x61\x79\x65\x72\x73'], _0x34e6bc = []);
                    for (_0x101bc0 = 0x0, _0x581c3d = _0x223b3e[_0x15a1ee(0xcb)]; _0x101bc0 < _0x581c3d; _0x101bc0++) {
                        _0x328829 = _0x223b3e[_0x101bc0], _0x34e6bc[_0x15a1ee(0xd6)](_0x328829[_0x15a1ee(0xce)](_0x4cce01, _0x1a5990, _0xf9028e, _0x13bf1b));
                    }
                    return _0x34e6bc;
                } else
                    _0x226b40 = new Sprite_PKD_SvBELayerAnimated(_0x45c2c2);
            } else
                _0x226b40 = new Sprite(ImageManager[_0x15a1ee(0xda)](_0x45c2c2));
            _0x226b40[_0x15a1ee(0xc1)]['\x78'] = 0.5, _0x226b40[_0x15a1ee(0xc1)]['\x79'] = 0x1, this[_0x15a1ee(0xde)](_0x226b40), this['\x5f\x6c\x61\x79\x65\x72\x73'][_0x15a1ee(0xd6)](_0x226b40);
        }
    }
    [_0x6f6a87(0xd4)](_0x4e795e) {
        var _0x2589a3 = _0x6f6a87, _0x2edba1, _0x39acb1, _0x1b243f, _0x56af91, _0x4c6231, _0x1774c7, _0x5aa6cc, _0x20eca0, _0x12d03b;
        if (_0x4e795e == null)
            return;
        ({
            x: _0x20eca0,
            y: _0x12d03b,
            width: _0x5aa6cc,
            height: _0x2edba1
        } = _0x4e795e, _0x4c6231 = this[_0x2589a3(0xc0)], _0x1774c7 = []);
        for (_0x39acb1 = 0x0, _0x56af91 = _0x4c6231[_0x2589a3(0xcb)]; _0x39acb1 < _0x56af91; _0x39acb1++) {
            if (_0x2589a3(0xdb) === _0x2589a3(0xdb))
                _0x1b243f = _0x4c6231[_0x39acb1], _0x1774c7[_0x2589a3(0xd6)](_0x1b243f[_0x2589a3(0xce)](_0x20eca0, _0x12d03b, _0x5aa6cc, _0x2edba1));
            else {
                var _0x4db075, _0x32659b, _0x351cc5, _0x5a4c43;
                if (this['\x5f\x6c\x61\x79\x65\x72\x73'][_0x2589a3(0xcb)] === 0x0)
                    return;
                _0x5a4c43 = this[_0x2589a3(0xc0)];
                for (_0x4db075 = 0x0, _0x351cc5 = _0x5a4c43[_0x2589a3(0xcb)]; _0x4db075 < _0x351cc5; _0x4db075++) {
                    _0x32659b = _0x5a4c43[_0x4db075], this['\x72\x65\x6d\x6f\x76\x65\x43\x68\x69\x6c\x64'](_0x32659b), _0x32659b[_0x2589a3(0xd2)] = ![];
                }
                this['\x5f\x6c\x61\x79\x65\x72\x73'] = [];
            }
        }
        return _0x1774c7;
    }
    [_0x6f6a87(0xb5)]() {
        var _0x99571 = _0x6f6a87, _0x46a93e, _0x2fd80a, _0xa3043, _0x435a5a;
        if (this[_0x99571(0xc0)][_0x99571(0xcb)] === 0x0) {
            if (_0x99571(0xc8) !== _0x99571(0xc8))
                _0x5cc015 = _0x4b0a77[_0x3d57a5], this[_0x99571(0xc5)](_0x1a5915), _0x216a09[_0x99571(0xd2)] = ![];
            else
                return;
        }
        _0x435a5a = this[_0x99571(0xc0)];
        for (_0x46a93e = 0x0, _0xa3043 = _0x435a5a[_0x99571(0xcb)]; _0x46a93e < _0xa3043; _0x46a93e++) {
            _0x99571(0xd5) === _0x99571(0xd5) ? (_0x2fd80a = _0x435a5a[_0x46a93e], this[_0x99571(0xc5)](_0x2fd80a), _0x2fd80a[_0x99571(0xd2)] = ![]) : (_0x126a17 = _0x14a7f1[_0x4965ae], _0x45dd4d[_0x99571(0xd6)](_0x1dea7f[_0x99571(0xce)](_0x3a8272, _0x2ee232, _0x1ccc15, _0x9d703c)));
        }
        this['\x5f\x6c\x61\x79\x65\x72\x73'] = [];
    }
};
//Plugin PKD_SvBattleEquipLayers builded by PKD PluginBuilder 2.2 - 22.11.2023