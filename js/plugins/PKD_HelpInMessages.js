/*
 * Copyright (c) 2022 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 */

/*:
 * @plugindesc (v.1.1)[BASIC] Allows you create mini hint messages for any word or sentence in messages
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/help-in-messages
 *
 * @help
 * ---------------------------------------------------------------------------

 * This is BASIC plugin version and have some restrictions:
 *    - Hints for Skills are not implemented
 *    - Obfuscated code
 *    - Plugin usage allowed only in Non-Commercial project
 * 
 *  PRO version of plugin don't have this restrictions!
 
 * ===========================================================================
 * Use pair escape-code \TM
 *   \TM[ID]WORD\TM
 * ID - it's information ID from Help Messages Plugin Parameter
 * WORD - it's word you want show help window when hovered
 * 
 * Example Message
 * Can you bring me \TM[test]Magic Shard\TM?
 *
 * You can find examples in Demo Project
 * ---------------------------------------------------------------------------
 * Add hints for Items and Skills [PRO only]
 *
 * Add to Item\Weapon\Armor\Skill Note's
 * <pHint:ID>
 *      ID - it's information ID from Help Messages Plugin Parameter
 *  ! Plugin Parameter: Is Show Item Hints? should be ON
 *
 * You can find examples in Demo Project
 * ---------------------------------------------------------------------------
 *
 * Plugin commands:
 *
 *  For RPG Maker MZ:
 *      SetWrap - Activate or Deactivate Auto Wraping
 *      SetHints - Activate or Deactivate Hint windows 
 *
 *  For RPG Maker MV:
 *      HIM SetWrap true
 *      HIM SetWrap false
 *      HIM SetHints true
 *      HIM SetHints false
 * ---------------------------------------------------------------------------
 * Extra control characters [ONLY FOR RPG MAKER MZ]
 * 
 * \Chex[HEX] - hex color
 *
 *      Example: \Chex[#9842f5] hex color example \C[0]
 *
 * \Isz[INDEX, SIZE, X, Y] - icon with size and extra margins
 *
 *      Example: \Isz[44, 20, 0, 6] - show icon 44 (20 x 20 px) and move extra 6 by Y
 *
 * \Psz[FILENAME, W, H, X, Y] - picture with size and extra margins
 *
 *      Example: \Psz[Actor1_1, 30, 30, -4, 0] - show image pictures\Actor1_1.png
 *                                              with size 30px x 30px and move -4 by X
 * 
 * You can find examples in Demo Project
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
 * @param Show Delay
 * @text Show Delay
 * @type number
 * @min 1
 * @max 1000
 * @default 20
 * @desc Delay before Help window will appear
 * 
 * @param Help Messages
 * @text Help Messages
 * @type struct<LinkInfo>[]
 * @default ["{\"Id\":\"test\",\"Width\":\"220\",\"Height\":\"120\",\"Background Type\":\"Window\",\"Windowskin\":\"HelpWindowSkin\",\"Text\":\"\\\"\\\\\\\\C[1]Magic Shard \\\\\\\\I[312]\\\\\\\\C[0]\\\\n\\\\\\\\}Some cool and rare item...\\\\nMagic shard used for....\\\\n\\\"\"}", "{\"Id\":\"test2\",\"Width\":\"280\",\"Height\":\"120\",\"Background Type\":\"Window\",\"Windowskin\":\"HelpWindowSkin\",\"Text\":\"\\\"\\\\\\\\C[2]Slime \\\\\\\\I[320]\\\\\\\\C[0]\\\\n\\\\\\\\}Some monster description...\\\\nBe aware of slimes water attacks\\\\n\\\\n\\\"\"}"]
 * 
 * @param Auto Wrap Sentences
 * @text Auto Wrap Sentences
 * @type struct<ExtraWrap>[]
 * @desc You can add auto wrapping for some sentance in messages
 * @default []
 * 
 * @param spacer|ItemsAndSkills @text‏‏‎ ‎@desc ===============================================
 * 
 * @param IsShowItemHints
 * @type boolean
 * @text Is Show Item Hints?
 * @on Show
 * @off No
 * @default true
 * @desc Shows hints for items and skills [PRO only] if item (or skill) have a special Notetag
 * 
 * @param ShowItemHintTimeDelay
 * @text Delay
 * @parent IsShowItemHints
 * @default 10
 * @min 0
 * @desc Delay (in frames) before hint appears after item (skill) is selected
 * 
 * @param ItemHelpWindowPosToCursor
 * @text At mouse pos?
 * @parent IsShowItemHints
 * @type boolean
 * @default false
 * @on Mouse cursor
 * @off Item itself
 * @desc Bind hint window position to mouse cursor or item itself?
 * 
 * @param ItemHelpWindowPosMargins
 * @text Margins
 * @parent ItemHelpWindowPosToCursor
 * @type struct<XY>
 * @desc Extra margins for hint window position (this values will be added to position X, Y)
 * @default {"x":"0","y":"0"}
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * @command SetWrap
 * @text Set Wrap State
 * @desc Activate or Deactivate Auto Wraping
 * 
 * @arg active
 * @text Active
 * @desc Active Or Not
 * @type boolean
 * @default true
 * 
 * @command SetHints
 * @text Set Hints State
 * @desc Activate or Deactivate Hint windows
 * 
 * @arg active
 * @text Active
 * @desc Active Or Not
 * @type boolean
 * @default true
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*
 * Copyright (c) 2022 Владимир Скрыпников (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

 * Лицензия: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 */

/*:ru
 * @plugindesc (v.1.1)[BASIC] Создавайте подсказки в сообщениях или для предметов
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/help-in-messages
 *
 * @help
 * ---------------------------------------------------------------------------

 * Это [BASIC] (базовая) версия плагина и имеет некоторые ограничения:
 *    - Не поддерживаются подсказки для навыков
 *    - Обфусцированный код
 *    - ЗАПРЕЩЕНО использовать плагин в коммерческих проектах
 * 
 *  [PRO] версия плагина не имеет данных ограничений!
 
 * ===========================================================================
 * Используйте парный код \TM
 *   \TM[ID]СЛОВО\TM
 * ID - Уникальный идентификатор подсказки (из параметра Подсказки, поле ID)
 * СЛОВО - Это собственно слово (или предложение) при наведении курсора на которое
 *      будет показана подсказка
 * 
 * Пример:
 * Можешь принести мне \TM[шар]магический шар\TM?
 *
 * Примеры можно найти в демке
 * ---------------------------------------------------------------------------
 * Добавляем подсказки для предметов и навыков [только для ПРО версии]
 *
 * Добавить для Предмета\Оружия\Экипировки\Навыка след. заметку:
 * <pHint:ID>
 *      ID - Уникальный идентификатор подсказки
 *  ! Параметр плагина: "Для предметов?" должен быть ВКЛ.
 *
 * Примеры можно найти в демке
 * ---------------------------------------------------------------------------
 *
 * Команды плагина:
 *
 *  Для RPG Maker MZ:
 *      SetWrap - Вкл. или Выкл. авто-подстановку в игре
 *      SetHints - Вкл. или Выкл. подсказки в игре 
 *
 *  Для RPG Maker MV:
 *      HIM SetWrap true
 *      HIM SetWrap false
 *      HIM SetHints true
 *      HIM SetHints false
 * ---------------------------------------------------------------------------
 * Доп. управляющие символы [Только для RPG MAKER MZ]
 * 
 * \Chex[HEX] - цвет в hex формате
 *
 *      Пример: \Chex[#9842f5] пример цвета в 16 формате \C[0]
 *
 * \Isz[INDEX, SIZE, X, Y] - иконка с указанным размером SIZE и отступами по X и Y
 *
 *      Пример: \Isz[44, 20, 0, 6]
 *          - показать иконку 44 (20 x 20 размер) и сдвинуть по Y на 6 пикселей
 *
 * \Psz[FILENAME, W, H, X, Y] - картинка (W, H - размер)
 *
 *      Пример: \Psz[Actor1_1, 30, 30, -4, 0] - показать картинку pictures\Actor1_1.png
 *                                              размером 30px x 30px и сдвиг -4 по X
 * 
 * Примеры можно найти в демке
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * 

 * Лицензия: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 *

 * @param Show Delay
 * @text Задержка
 * @type number
 * @min 1
 * @max 1000
 * @default 20
 * @desc Задержка (в кадрах) перед появлением окна подсказки
 * 
 * @param Help Messages
 * @text Подсказки
 * @type struct<LinkInfo>[]
 * @default ["{\"Id\":\"test\",\"Width\":\"220\",\"Height\":\"120\",\"Background Type\":\"Window\",\"Windowskin\":\"HelpWindowSkin\",\"Text\":\"\\\"\\\\\\\\C[1]Magic Shard \\\\\\\\I[312]\\\\\\\\C[0]\\\\n\\\\\\\\}Some cool and rare item...\\\\nMagic shard used for....\\\\n\\\"\"}", "{\"Id\":\"test2\",\"Width\":\"280\",\"Height\":\"120\",\"Background Type\":\"Window\",\"Windowskin\":\"HelpWindowSkin\",\"Text\":\"\\\"\\\\\\\\C[2]Slime \\\\\\\\I[320]\\\\\\\\C[0]\\\\n\\\\\\\\}Some monster description...\\\\nBe aware of slimes water attacks\\\\n\\\\n\\\"\"}"]
 * 
 * @param Auto Wrap Sentences
 * @text Авто-подстановка
 * @type struct<ExtraWrap>[]
 * @desc Вы можете задать авто-подстановку контрольных символов для определённых предложений или слов
 * @default []
 * 
 * @param spacer|ItemsAndSkills @text‏‏‎ ‎@desc ===============================================
 * 
 * @param IsShowItemHints
 * @type boolean
 * @text Для предметов?
 * @on Показывать
 * @off Нет
 * @default true
 * @desc Показывать подсказки для предметов или навыков [PRO] если у них есть специальная заметка
 * 
 * @param ShowItemHintTimeDelay
 * @text Задержка
 * @parent IsShowItemHints
 * @default 10
 * @min 0
 * @desc Задержка (в кадрах) перед появлением окна подсказки (когда предмет выбран)
 * 
 * @param ItemHelpWindowPosToCursor
 * @text Позиция - курсор?
 * @parent IsShowItemHints
 * @type boolean
 * @default false
 * @on Курсор мышки
 * @off Название предмета
 * @desc Подсказка будет появляться относительно позиции курсора мышки или текста предмета?
 * 
 * @param ItemHelpWindowPosMargins
 * @text Отступы
 * @parent ItemHelpWindowPosToCursor
 * @type struct<XY>
 * @desc Доп. отступы для позиции окна подсказки (будут прибавлены к позиции окна подсказки)
 * @default {"x":"0","y":"0"}
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * @command SetWrap
 * @text Авто-подстановка
 * @desc Вкл. или Выкл. автоподстановку в тексте
 * 
 * @arg active
 * @text Включена?
 * @desc
 * @type boolean
 * @default true
 * 
 * @command SetHints
 * @text Подсказки
 * @desc Включить или выключить показ подсказок в тексте
 * 
 * @arg active
 * @text Включена?
 * @desc
 * @type boolean
 * @default true
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*~struct~LinkInfo:
 * @param Id
 * @type text
 * @default new
 * @desc Any word, but should be unique for each Help message!
 *
 * @param Width
 * @type number
 * @min 1
 * @max 1000
 * @default 320
 * @desc Text window width
 * 
 * @param Height
 * @type number
 * @min 1
 * @max 1000
 * @default 140
 * @desc Text window height
 * 
 * @param Background Type
 * @type combo
 * @option Window
 * @option Dim
 * @option Transparent
 * @default Window
 * 
 * @param Windowskin
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default HelpWindowSkin
 * 
 * @param Text
 * @type note
 * @desc Message text, support escape symbols
 * @default Some text...
 *
 * @param Txt
 * @desc Message text from .txt file. Have priority. Filename without extension. File should be in data\Hints\NAME.txt
 * @default
 */

/*~struct~LinkInfo:ru
 * @param Id
 * @type text
 * @default new
 * @desc Идентификатор, любое слово, но уникальное!
 *
 * @param Width
 * @text Ширина
 * @type number
 * @min 1
 * @max 1000
 * @default 320
 * @desc Ширина окна подсказки
 * 
 * @param Height
 * @text Высота
 * @type number
 * @min 1
 * @max 1000
 * @default 140
 * @desc Высота окна подсказки
 * 
 * @param Background Type
 * @text Задник
 * @type combo
 * @option Window
 * @option Dim
 * @option Transparent
 * @default Window
 * @desc Задник окна (window - обычный, dim - затемнённый, transparent - прозрачный (нету))
 * 
 * @param Windowskin
 * @text Графика
 * @type file
 * @dir img/pictures/
 * @require 1
 * @default HelpWindowSkin
 * @desc Графика для задника окна (если используеются опция Window)
 * 
 * @param Text
 * @text Текст
 * @type note
 * @desc Текст подсказки, поддержкивает контрольные символы \V, \С и т.д.
 * @default Some text...
 *
 * @param Txt
 * @text TXT файл (имя)
 * @desc Имя .txt файла для подсказки. Приоритет. Имя файла без расширения. Файл должен быть в data\Hints\ИМЯ.txt
 * @default
 */


/*~struct~ExtraWrap:
 * @param Sentence
 * @type text
 * @default Hello World
 * @desc Sentence that be wrapped
 *
 * @param Start
 * @type text
 * @default \C[1]
 * @desc Symbol before sentence
 * 
 * @param End
 * @type text
 * @default \C[0]
 * @desc Symbol after sentence
 */

 /*~struct~ExtraWrap:ru
 * @param Sentence
 * @text Предложение
 * @type text
 * @default Hello World
 * @desc Предложение, которое будет обёрнуто
 *
 * @param Start
 * @text В начало
 * @type text
 * @default \C[1]
 * @desc Символы, которые будут добавлены в начало предложения
 * 
 * @param End
 * @text В конец
 * @type text
 * @default \C[0]
 * @desc Символы, которые будут добавлены в конец предложения
 */

/*~struct~XY:

 * @param x
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y
 * @text Y
 * @type number
 * @default 0
 * @min -1000

*/
/*~struct~XY:ru

 * @param x
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y
 * @text Y
 * @type number
 * @default 0
 * @min -1000

*/


window.Imported = window.Imported || {};
Imported.PKD_HelpInMsg = true;

window.PKD_HelpInMsg = {};
PKD_HelpInMsg.version = 100;

PKD_HelpInMsg.isPro = () => true;



(function(){
    
    PKD_HelpInMsg.isMV = function() {
        return Utils.RPGMAKER_NAME.contains("MV");
    };

    PKD_HelpInMsg.getHelpMessage = function (id) {
        return PKD_HelpInMsg.getJDataById(id, PKD_HelpInMsg.HelpMessagesData);
    };

    PKD_HelpInMsg.getWrapSymbols = function(sentence) {
        return PKD_HelpInMsg.AutoWrapWords.find((element) => element.Sentence == sentence);
    };

    PKD_HelpInMsg.prepareHelpMessageSkin = function (id) {
        var data = PKD_HelpInMsg.getHelpMessage(id);
        if(data) {
            ImageManager.loadPicture(data.Windowskin);
        }
    };


})();

PKD_HelpInMsg.loadParams = function(){
        PKD_HelpInMsg.initTxtDB();
        const pluginName = "PKD_HelpInMessages";
        const params = PluginManager.parameters(pluginName);

        let ParsePluginHelpData = () => {
            let lines = JsonEx.parse(params["Help Messages"]);
            let parsed = lines.map((l) => JsonEx.parse(l));
            parsed.forEach(element => {
                if(element.Text)
                    element.Text = JsonEx.parse(element.Text);
                else
                    element.Text = "";
                PKD_HelpInMsg.loadTxt(element.Txt);
                element.Width = parseInt(element.Width);
                element.Height = parseInt(element.Height);
            });
            return parsed;
        };

        let ParsePluginAutoWrapData = () => {
            let lines = JsonEx.parse(params["Auto Wrap Sentences"]);
            let parsed = lines.map((l) => JsonEx.parse(l));
            return parsed;
        };

        PKD_HelpInMsg.HelpMessagesData = ParsePluginHelpData();
        PKD_HelpInMsg.AutoWrapWords = ParsePluginAutoWrapData();
        PKD_HelpInMsg.WordsCollection = PKD_HelpInMsg.AutoWrapWords.map((element) => element.Sentence);
        PKD_HelpInMsg.TIME_TO_SHOW = parseInt(params["Show Delay"]) || 20;
        PKD_HelpInMsg.LINK_SYMBOL = 'TM';

        // * ITEMS HINTS
        PKD_HelpInMsg.IsShowItemHints = eval(params.IsShowItemHints || 'true');
        PKD_HelpInMsg.ShowItemHintTimeDelay = parseInt(params.ShowItemHintTimeDelay || 10);
        PKD_HelpInMsg.ItemHelpWindowPosToCursor = eval(params.ItemHelpWindowPosToCursor || 'false');
        PKD_HelpInMsg.ItemHelpWindowPosMargins = JsonEx.parse(params.ItemHelpWindowPosMargins || '{"x":"0","y":"0"}');
        PKD_HelpInMsg.ItemHelpWindowPosMargins.x = parseInt(PKD_HelpInMsg.ItemHelpWindowPosMargins.x);
        PKD_HelpInMsg.ItemHelpWindowPosMargins.y = parseInt(PKD_HelpInMsg.ItemHelpWindowPosMargins.y);

        if(!PKD_HelpInMsg.isMV()) {
            PluginManager.registerCommand(pluginName, 'SetWrap', args => {
                try {
                    let value = eval(args.active);
                    $gameSystem.him_autoWW = value;
                } catch (e) {
                    console.warn(e);
                }
            });

            PluginManager.registerCommand(pluginName, 'SetHints', args => {
                try {
                    let value = eval(args.active);
                    $gameSystem.him_hints = value;
                } catch (e) {
                    console.warn(e);
                }
            });
        }
};


(function(){
    
    // * Только для RPG Maker MV
    if(!PKD_HelpInMsg.isMV()) {
        return;
    }

    //@[ALIAS]
    var _Game_Interpreter_pluginCommand_3434 = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand_3434.call(this, command, args);
        if (command === 'HIM') {
            try {
                var state = false;
                switch (args[0]) {
                    case "SetWrap":
                        state = eval(args[1]);
                        $gameSystem.him_autoWW = state;
                        break;
                    case "SetHints":
                        state = eval(args[1]);
                        $gameSystem.him_hints = state;
                        break;
                    default:
                        break;
                }
            } catch (e) {
                console.warn(e);
            }
        }
    };

})();

// Generated by CoffeeScript 2.6.1
String.prototype.replaceAll = function(search, replacement) {
  var target;
  target = this;
  return target.split(search).join(replacement);
};


// Generated by CoffeeScript 2.6.1
(function() {
  if (!PKD_HelpInMsg.isMV()) {
    return;
  }
  if ((window.KDCore != null) && window.KDCore.Version >= '2.8') {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, _;
    
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
  })();
})();

// ■ END Window_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var alias_TIOMM;
  if (!PKD_HelpInMsg.isMV()) {
    return;
  }
  if ((window.KDCore != null) && window.KDCore.Version >= '2.8') {
    return;
  }
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
  TouchInput._onHover = function(_x, _y) {
    this._x = _x;
    this._y = _y;
  };
})();


// Generated by CoffeeScript 2.6.1
(function() {
  PKD_HelpInMsg.initTxtDB = function() {
    if (this.txtDb == null) {
      return this.txtDb = {};
    }
  };
  PKD_HelpInMsg.loadTxt = function(filename) {
    var e;
    if (filename == null) {
      return;
    }
    if (filename === "") {
      return;
    }
    try {
      PKD_HelpInMsg.loadTxtFile(filename, filename + ".txt");
    } catch (error) {
      e = error;
      console.warn(e);
    }
  };
  PKD_HelpInMsg.loadTxtFile = function(name, src) {
    var url, xhr;
    xhr = new XMLHttpRequest();
    url = "data/Hints/" + src;
    xhr.open("GET", url);
    xhr.overrideMimeType('text/plain');
    xhr.onload = function() {
      if (xhr.status < 400) {
        return PKD_HelpInMsg.txtDb[name] = xhr.responseText;
      } else {
        return console.warn("Can't load hint .txt file " + src);
      }
    };
    xhr.send();
  };
})();


// Generated by CoffeeScript 2.6.1
(function() {
  PKD_HelpInMsg.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  PKD_HelpInMsg.getJDataById = function(id, source) {
    var d, i, len;
    for (i = 0, len = source.length; i < len; i++) {
      d = source[i];
      if (d.Id === id) {
        return d;
      }
    }
    return null;
  };
  PKD_HelpInMsg.processExtraWrapText = function(text) {
    var End, Start, i, len, ref, result, w;
    if (PKD_HelpInMsg.WordsCollection.length === 0) {
      return text;
    }
    if (!$gameSystem.pkdIsAutoWWEnabled()) {
      return text;
    }
    ref = PKD_HelpInMsg.WordsCollection;
    for (i = 0, len = ref.length; i < len; i++) {
      w = ref[i];
      if (text.contains(w)) {
        ({Start, End} = PKD_HelpInMsg.getWrapSymbols(w));
        if (!((Start != null) || (End != null))) {
          continue;
        }
        result = Start + w + End;
        text = text.replaceAll(w, result);
      }
    }
    return text;
  };
  PKD_HelpInMsg.getItemHint = function(item) {
    var hintId;
    if ((item != null) && (item.meta != null) && (item.meta.pHint != null) && item.meta.pHint !== "") {
      hintId = item.meta.pHint;
      return PKD_HelpInMsg.getHelpMessage(hintId);
    }
    return null;
  };
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__loadDatabase, _;
  //@[DEFINES]
  _ = DataManager;
  //@[ALIAS]
  ALIAS__loadDatabase = _.loadDatabase;
  _.loadDatabase = function() {
    ALIAS__loadDatabase.call(this);
    PKD_HelpInMsg.loadParams();
  };
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__initialize, _;
  //@[DEFINES]
  _ = Game_System.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this);
    this.him_autoWW = true;
    return this.him_hints = true;
  };
  _.pkdIsHintsEnabled = function() {
    return this.him_hints === true;
  };
  _.pkdIsAutoWWEnabled = function() {
    return this.him_autoWW === true;
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var Sprite_HoverLinkZone;
  Sprite_HoverLinkZone = class Sprite_HoverLinkZone extends Sprite {
    constructor(w, h, info) {
      super(new Bitmap(w, h));
      this.info = info;
    }

    isContainsPoint(point) {
      var rect, rx, ry;
      rx = PKD_HelpInMsg.toGlobalCoord(this, 'x');
      ry = PKD_HelpInMsg.toGlobalCoord(this, 'y');
      rect = new Rectangle(rx, ry, this.width, this.height);
      return rect.contains(point.x, point.y);
    }

    isMouseIn() {
      if (this.visible === true) {
        return this.isContainsPoint(TouchInput);
      } else {
        return false;
      }
    }

    removeFromParent() {
      if (this.parent != null) {
        return this.parent.removeChild(this);
      }
    }

  };
  PKD_HelpInMsg.Sprite_HoverLinkZone = Sprite_HoverLinkZone;
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__processEscapeCharacter, CACHE, LoadFromIconIndex, _;
  // * ИЗ KDCORE, вынес отдельно, так как плагин не требует KDCORE и не хотелось код раздувать

  // * ONLY FOR MZ
  if (PKD_HelpInMsg.isMV()) {
    return;
  }
  // * NOT NEED IF KDCORE INSTALLED
  if ((window.KDCore != null) && window.KDCore.Version >= '2.8') {
    return;
  }
  Array.prototype.isEmpty = function() {
    return this.length === 0;
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
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  CACHE = {};
  LoadFromIconIndex = function(iconIndex) {
    var icon_bitmap, iconset, ph, pw, sx, sy;
    if (CACHE[iconIndex] == null) {
      iconset = ImageManager.loadSystem('IconSet');
      if (Utils.RPGMAKER_NAME.contains("MV")) {
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
      CACHE[iconIndex] = icon_bitmap;
    }
    return CACHE[iconIndex];
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = LoadFromIconIndex(icon);
    }
    return this.drawOnMe(bitmap, x, y, size, size);
  };
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
      console.warn(e);
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
        size = ImageManager.iconWidth;
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
      // * Только в режиме рисования
      if (textState.drawing === true) {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      console.warn(e);
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
      if (textState.drawing === true) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return console.warn(e);
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
      console.warn(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
})();

// ■ END Window_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__convertEscapeCharacters, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__convertEscapeCharacters = _.convertEscapeCharacters;
  _.convertEscapeCharacters = function(text) {
    text = ALIAS__convertEscapeCharacters.call(this, text);
    return this.pkdProcessExtraWrapText(text);
  };
  _.pkdProcessExtraWrapText = function(text) {
    text = PKD_HelpInMsg.processExtraWrapText(text);
    text = text.replace(/\\/g, "\x1b");
    text = text.replace(/\x1b\x1b/g, "\\");
    return text;
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------


function _0x1445() {
    var _0x10a663 = [
        '\x31\x32\x30\x31\x30\x66\x6f\x4c\x4e\x4a\x59',
        '\x57\x69\x6e\x64\x6f\x77\x73\x6b\x69\x6e',
        '\x57\x69\x6e\x64\x6f\x77',
        '\x32\x30\x38\x33\x38\x38\x32\x6d\x46\x53\x6a\x70\x6c',
        '\x69\x6e\x66\x6f\x44\x61\x74\x61',
        '\x32\x32\x44\x56\x52\x70\x59\x4e',
        '\x75\x70\x64\x61\x74\x65\x50\x6c\x61\x63\x65\x6d\x65\x6e\x74\x52\x65\x6c\x61\x74\x69\x76\x65',
        '\x57\x69\x64\x74\x68',
        '\x70\x61\x72\x65\x6e\x74',
        '\x31\x31\x37\x33\x36\x34\x6d\x73\x45\x59\x66\x6f',
        '\x77\x61\x72\x6e',
        '\x56\x45\x72\x70\x62',
        '\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74',
        '\x64\x72\x61\x77\x54\x65\x78\x74\x45\x78',
        '\x39\x36\x50\x6b\x4f\x6a\x48\x67',
        '\x35\x36\x38\x42\x62\x42\x51\x64\x6b',
        '\x77\x69\x64\x74\x68',
        '\x72\x41\x4a\x65\x67',
        '\x2e\x74\x78\x74\x20\x66\x69\x6c\x65\x20\x64\x61\x74\x61\x20\x66\x6f\x72',
        '\x48\x65\x69\x67\x68\x74',
        '\x6c\x6f\x61\x64\x50\x69\x63\x74\x75\x72\x65',
        '\x54\x65\x78\x74',
        '\x76\x69\x78\x6a\x4e',
        '\x73\x65\x74\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x54\x79\x70\x65',
        '\x6d\x6f\x76\x65\x54\x6f\x43\x75\x72\x73\x6f\x72',
        '\x45\x72\x72\x6f\x72\x20\x72\x65\x61\x64\x20\x2e\x74\x78\x74\x20\x66\x69\x6c\x65\x20',
        '\x35\x37\x34\x36\x33\x78\x62\x46\x67\x51\x72',
        '\x73\x65\x74\x53\x74\x61\x74\x69\x63\x41\x6e\x63\x68\x6f\x72',
        '\x31\x30\x33\x39\x30\x76\x57\x42\x59\x57\x5a',
        '\x6f\x70\x65\x6e\x6e\x65\x73\x73',
        '\x44\x69\x6d',
        '\x5f\x63\x6f\x6e\x76\x65\x72\x74\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x54\x79\x70\x65',
        '\x63\x56\x75\x5a\x41',
        '\x31\x32\x37\x36\x31\x38\x36\x6e\x58\x6c\x55\x41\x72',
        '\x20\x6e\x6f\x74\x20\x66\x6f\x75\x6e\x64',
        '\x72\x65\x6d\x6f\x76\x65\x43\x68\x69\x6c\x64',
        '\x41\x72\x78\x6b\x6e',
        '\x5f\x77\x69\x6e\x64\x6f\x77\x73\x6b\x69\x6e',
        '\x57\x69\x6e\x64\x6f\x77\x5f\x45\x76\x65\x6e\x74\x48\x65\x6c\x70\x49\x6e\x66\x6f',
        '\x32\x30\x34\x33\x42\x4c\x6c\x6c\x5a\x6c',
        '\x45\x69\x56\x73\x67',
        '\x54\x78\x74',
        '\x51\x6c\x70\x68\x76',
        '\x64\x72\x61\x77\x49\x6e\x66\x6f\x54\x65\x78\x74\x46\x72\x6f\x6d\x54\x78\x74',
        '\x31\x31\x39\x34\x43\x54\x6f\x72\x57\x68',
        '\x31\x36\x38\x39\x35\x39\x31\x36\x6f\x57\x74\x47\x6d\x61',
        '\x68\x65\x69\x67\x68\x74',
        '\x64\x42\x57\x6d\x51',
        '\x74\x78\x74\x44\x62',
        '\x6d\x46\x41\x6e\x62',
        '\x63\x64\x64\x4b\x73'
    ];
    _0x1445 = function () {
        return _0x10a663;
    };
    return _0x1445();
}
function _0x2783(_0xa9d409, _0xf843) {
    var _0x14453e = _0x1445();
    return _0x2783 = function (_0x27831d, _0x3fb9a3) {
        _0x27831d = _0x27831d - 0x6d;
        var _0x31bc9f = _0x14453e[_0x27831d];
        return _0x31bc9f;
    }, _0x2783(_0xa9d409, _0xf843);
}
(function (_0x41f003, _0xf6bd6e) {
    var _0x4c97a1 = _0x2783, _0x1f5771 = _0x41f003();
    while (!![]) {
        try {
            var _0x18e242 = parseInt(_0x4c97a1(0x78)) / 0x1 + parseInt(_0x4c97a1(0x8d)) / 0x2 + -parseInt(_0x4c97a1(0x98)) / 0x3 * (-parseInt(_0x4c97a1(0x93)) / 0x4) + parseInt(_0x4c97a1(0x8a)) / 0x5 * (-parseInt(_0x4c97a1(0x83)) / 0x6) + parseInt(_0x4c97a1(0x71)) / 0x7 * (parseInt(_0x4c97a1(0x99)) / 0x8) + parseInt(_0x4c97a1(0x7e)) / 0x9 * (parseInt(_0x4c97a1(0x73)) / 0xa) + -parseInt(_0x4c97a1(0x8f)) / 0xb * (parseInt(_0x4c97a1(0x84)) / 0xc);
            if (_0x18e242 === _0xf6bd6e)
                break;
            else
                _0x1f5771['push'](_0x1f5771['shift']());
        } catch (_0x4a8a48) {
            _0x1f5771['push'](_0x1f5771['shift']());
        }
    }
}(_0x1445, 0xbedb3), (function () {
    var _0x3c5478 = _0x2783, _0x43d403;
    _0x43d403 = class _0x49528e extends Window_Base {
        constructor(_0x50f82e) {
            var _0x565cd4 = _0x2783, _0x559dc7;
            super(new Rectangle(0x0, 0x0, _0x50f82e[_0x565cd4(0x91)], _0x50f82e[_0x565cd4(0x9d)])), this['\x69\x6e\x66\x6f\x44\x61\x74\x61'] = _0x50f82e, this[_0x565cd4(0x7c)], this[_0x565cd4(0x74)] = 0x0;
            this[_0x565cd4(0x8e)][_0x565cd4(0x8b)] != null && this[_0x565cd4(0x8e)][_0x565cd4(0x8b)] !== '' && (this['\x77\x69\x6e\x64\x6f\x77\x73\x6b\x69\x6e'] = ImageManager['\x6c\x6f\x61\x64\x50\x69\x63\x74\x75\x72\x65'](this['\x69\x6e\x66\x6f\x44\x61\x74\x61'][_0x565cd4(0x8b)]));
            if (this[_0x565cd4(0x8e)][_0x565cd4(0x80)] != null && this[_0x565cd4(0x8e)][_0x565cd4(0x80)] !== '')
                this[_0x565cd4(0x82)]();
            else
                this[_0x565cd4(0x8e)]['\x54\x65\x78\x74'] != null && (_0x565cd4(0x6d) === _0x565cd4(0x9b) ? this[_0x565cd4(0x6e)](_0x1b9f1c) : this['\x64\x72\x61\x77\x49\x6e\x66\x6f\x54\x65\x78\x74']());
            _0x559dc7 = this[_0x565cd4(0x76)](this[_0x565cd4(0x8e)]['\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x20\x54\x79\x70\x65']);
            _0x559dc7 >= 0x0 && (_0x565cd4(0x86) !== _0x565cd4(0x86) ? this[_0x565cd4(0x82)]() : this[_0x565cd4(0x6e)](_0x559dc7));
            return;
        }
        [_0x3c5478(0x76)](_0x16c5f5) {
            var _0x5e06a2 = _0x3c5478;
            if (_0x5e06a2(0x7b) !== '\x41\x72\x78\x6b\x6e')
                switch (_0x4c0fbe) {
                case _0x5e06a2(0x8c):
                    return 0x0;
                case _0x5e06a2(0x75):
                    return 0x1;
                default:
                    return 0x2;
                }
            else
                switch (_0x16c5f5) {
                case '\x57\x69\x6e\x64\x6f\x77':
                    return 0x0;
                case _0x5e06a2(0x75):
                    return 0x1;
                default:
                    return 0x2;
                }
        }
        [_0x3c5478(0x6f)]() {
            var _0x4a70a1 = _0x3c5478;
            return this[_0x4a70a1(0x90)](TouchInput['\x78'], TouchInput['\x79']);
        }
        [_0x3c5478(0x90)](_0x465226, _0x2745e7) {
            var _0x5de26d = _0x3c5478, _0x5bfc98, _0x4c5a75;
            _0x5bfc98 = _0x4c5a75 = 0x0;
            this[_0x5de26d(0x9a)] + _0x465226 + 0x5 > Graphics[_0x5de26d(0x9a)] && (_0x5bfc98 = 0x1);
            if (this['\x68\x65\x69\x67\x68\x74'] + _0x2745e7 + 0x5 > Graphics[_0x5de26d(0x85)]) {
                if ('\x6b\x71\x7a\x4e\x75' === '\x6b\x71\x7a\x4e\x75')
                    _0x4c5a75 = 0x1;
                else {
                    if (this[_0x5de26d(0x92)] != null)
                        return this[_0x5de26d(0x92)][_0x5de26d(0x7a)](this);
                }
            }
            this['\x78'] = _0x465226, this['\x79'] = _0x2745e7, this[_0x5de26d(0x72)](_0x5bfc98, _0x4c5a75);
        }
        ['\x73\x65\x74\x53\x74\x61\x74\x69\x63\x41\x6e\x63\x68\x6f\x72'](_0x5cf2c1, _0x5a652b) {
            var _0x163351 = _0x3c5478;
            if (_0x163351(0x95) !== '\x56\x45\x72\x70\x62') {
                var _0x598d9d;
                return _0x598d9d = this[_0x163351(0x8e)][_0x163351(0x9f)], this[_0x163351(0x97)](_0x598d9d, 0x0, 0x0);
            } else
                return this['\x78'] -= Math['\x72\x6f\x75\x6e\x64'](this['\x77\x69\x64\x74\x68'] * _0x5cf2c1), this['\x79'] -= Math['\x72\x6f\x75\x6e\x64'](this['\x68\x65\x69\x67\x68\x74'] * _0x5a652b);
        }
        ['\x64\x72\x61\x77\x49\x6e\x66\x6f\x54\x65\x78\x74']() {
            var _0x53201d = _0x3c5478, _0x33e69c;
            return _0x33e69c = this[_0x53201d(0x8e)]['\x54\x65\x78\x74'], this[_0x53201d(0x97)](_0x33e69c, 0x0, 0x0);
        }
        [_0x3c5478(0x82)]() {
            var _0x2b1f20 = _0x3c5478, _0xe75e42, _0x524a29, _0x12ac27;
            _0x524a29 = this['\x69\x6e\x66\x6f\x44\x61\x74\x61'][_0x2b1f20(0x9f)];
            try {
                if (_0x2b1f20(0x77) !== _0x2b1f20(0x77))
                    return _0x2fef35;
                else {
                    _0x12ac27 = this['\x69\x6e\x66\x6f\x44\x61\x74\x61'][_0x2b1f20(0x80)];
                    if (PKD_HelpInMsg['\x74\x78\x74\x44\x62'][_0x12ac27] != null)
                        _0x524a29 = PKD_HelpInMsg[_0x2b1f20(0x87)][_0x12ac27];
                    else {
                        if (_0x2b1f20(0x88) !== _0x2b1f20(0x7f))
                            _0x524a29 = _0x2b1f20(0x9c) + _0x12ac27 + '\x20\x6e\x6f\x74\x20\x66\x6f\x75\x6e\x64';
                        else
                            return this['\x75\x70\x64\x61\x74\x65\x50\x6c\x61\x63\x65\x6d\x65\x6e\x74\x52\x65\x6c\x61\x74\x69\x76\x65'](_0x4b330d['\x78'], _0x5a2173['\x79']);
                    }
                }
            } catch (_0x48bf9f) {
                _0xe75e42 = _0x48bf9f, console[_0x2b1f20(0x94)](_0xe75e42), _0x524a29 = _0x2b1f20(0x70) + this[_0x2b1f20(0x8e)][_0x2b1f20(0x80)];
            }
            return this[_0x2b1f20(0x97)](_0x524a29, 0x0, 0x0);
        }
        [_0x3c5478(0x96)]() {
            var _0x2ecf73 = _0x3c5478;
            if (this[_0x2ecf73(0x92)] != null) {
                if (_0x2ecf73(0x81) !== _0x2ecf73(0x81))
                    _0x4b5228 = this[_0x2ecf73(0x8e)][_0x2ecf73(0x80)], _0x1dfe03['\x74\x78\x74\x44\x62'][_0x3b2b41] != null ? _0x39b9e7 = _0x3d2b06['\x74\x78\x74\x44\x62'][_0x1ed243] : _0x25ea5c = _0x2ecf73(0x9c) + _0x16074e + _0x2ecf73(0x79);
                else
                    return this['\x70\x61\x72\x65\x6e\x74'][_0x2ecf73(0x7a)](this);
            }
        }
        ['\x70\x6b\x64\x50\x72\x6f\x63\x65\x73\x73\x45\x78\x74\x72\x61\x57\x72\x61\x70\x54\x65\x78\x74'](_0x1c326b) {
            var _0x13d7cc = _0x3c5478;
            if ('\x4a\x4a\x79\x5a\x62' === _0x13d7cc(0x89))
                this['\x77\x69\x6e\x64\x6f\x77\x73\x6b\x69\x6e'] = _0x1807a5[_0x13d7cc(0x9e)](this['\x69\x6e\x66\x6f\x44\x61\x74\x61'][_0x13d7cc(0x8b)]);
            else
                return _0x1c326b;
        }
    }, PKD_HelpInMsg[_0x3c5478(0x7d)] = _0x43d403;
}()));

(function (_0x160a91, _0x31d1ff) {
    var _0x4a5703 = _0x276c, _0x5738aa = _0x160a91();
    while (!![]) {
        try {
            var _0x55934a = parseInt(_0x4a5703(0x123)) / 0x1 * (parseInt(_0x4a5703(0x129)) / 0x2) + -parseInt(_0x4a5703(0x122)) / 0x3 + parseInt(_0x4a5703(0x11f)) / 0x4 + -parseInt(_0x4a5703(0x127)) / 0x5 + parseInt(_0x4a5703(0x120)) / 0x6 * (-parseInt(_0x4a5703(0x12a)) / 0x7) + parseInt(_0x4a5703(0x12b)) / 0x8 + parseInt(_0x4a5703(0x125)) / 0x9;
            if (_0x55934a === _0x31d1ff)
                break;
            else
                _0x5738aa['push'](_0x5738aa['shift']());
        } catch (_0x40bfcc) {
            _0x5738aa['push'](_0x5738aa['shift']());
        }
    }
}(_0x5ad5, 0xc27a2), (function () {
    var _0x59b97c = _0x276c, _0x13dd19;
    _0x13dd19 = Window_ItemList[_0x59b97c(0x124)], _0x13dd19[_0x59b97c(0x126)] = function () {
        var _0x59c405 = _0x59b97c;
        return PKD_HelpInMsg[_0x59c405(0x121)] === !![];
    }, _0x13dd19[_0x59b97c(0x128)] = function () {
        return this['\x69\x74\x65\x6d']();
    };
}()));
function _0x276c(_0x3a0e83, _0x20a447) {
    var _0x5ad53e = _0x5ad5();
    return _0x276c = function (_0x276c93, _0x392d6c) {
        _0x276c93 = _0x276c93 - 0x11f;
        var _0x5460e1 = _0x5ad53e[_0x276c93];
        return _0x5460e1;
    }, _0x276c(_0x3a0e83, _0x20a447);
}
function _0x5ad5() {
    var _0x322ede = [
        '\x36\x34\x34\x30\x32\x33\x35\x73\x61\x46\x46\x70\x79',
        '\x70\x49\x74\x65\x6d\x46\x6f\x72\x48\x69\x6e\x74',
        '\x31\x32\x32\x38\x30\x38\x32\x64\x4a\x76\x74\x69\x79',
        '\x37\x69\x65\x77\x78\x66\x76',
        '\x31\x38\x39\x35\x36\x34\x30\x67\x57\x56\x63\x61\x44',
        '\x34\x30\x32\x30\x39\x36\x38\x59\x68\x76\x6d\x70\x70',
        '\x35\x35\x30\x33\x37\x37\x30\x76\x73\x65\x6f\x52\x47',
        '\x49\x73\x53\x68\x6f\x77\x49\x74\x65\x6d\x48\x69\x6e\x74\x73',
        '\x31\x38\x38\x33\x30\x38\x38\x47\x6e\x6c\x62\x4a\x47',
        '\x31\x6b\x4c\x54\x4d\x61\x6d',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x31\x35\x39\x36\x30\x34\x30\x32\x74\x7a\x70\x6a\x77\x70',
        '\x70\x49\x73\x48\x69\x6e\x74\x73\x41\x6c\x6c\x6f\x77\x65\x64'
    ];
    _0x5ad5 = function () {
        return _0x322ede;
    };
    return _0x5ad5();
}

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__processEscapeCharacter, ALIAS__startMessage, ALIAS__terminateMessage, ALIAS__update, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startMessage = _.startMessage;
  _.startMessage = function() {
    this._tLinks = [];
    this._showLInfoTimer = 0;
    return ALIAS__startMessage.call(this);
  };
  
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    ALIAS__processEscapeCharacter.call(this, ...arguments);
    if (code === PKD_HelpInMsg.LINK_SYMBOL) {
      this._workWithLink(textState);
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._tLinks == null) {
      return;
    }
    if (!$gameSystem.pkdIsHintsEnabled()) {
      return;
    }
    if (this._isAnyHelpLinkUnderCursor()) {
      this._showLInfoTimer += 1;
      if (this._showLInfoTimer >= PKD_HelpInMsg.TIME_TO_SHOW) {
        return this._showHelpLinkInfo();
      }
    } else {
      this._showLInfoTimer = 0;
      return this._hideHelpLinksInfo();
    }
  };
  //@[ALIAS]
  ALIAS__terminateMessage = _.terminateMessage;
  _.terminateMessage = function() {
    ALIAS__terminateMessage.call(this);
    this._hideHelpLinksInfo();
    this.terminateHelpLinks();
    return this._tLinks = null;
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------


function _0x1d41() {
    var _0x58debc = [
        '\x77\x61\x72\x6e',
        '\x74\x65\x72\x6d\x69\x6e\x61\x74\x65\x48\x65\x6c\x70\x4c\x69\x6e\x6b\x73',
        '\x7a\x58\x59\x4b\x4e',
        '\x67\x44\x5a\x6b\x57',
        '\x32\x30\x6f\x59\x72\x4c\x54\x77',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x76\x61\x6c\x75\x65',
        '\x5f\x74\x4c\x69\x6e\x6b\x73',
        '\x69\x73\x4d\x6f\x75\x73\x65\x49\x6e',
        '\x66\x69\x6e\x64',
        '\x5f\x73\x74\x61\x72\x74\x48\x65\x6c\x70\x4c\x69\x6e\x6b',
        '\x67\x65\x74\x48\x65\x6c\x70\x4d\x65\x73\x73\x61\x67\x65',
        '\x5f\x69\x73\x41\x6e\x79\x48\x65\x6c\x70\x4c\x69\x6e\x6b\x55\x6e\x64\x65\x72\x43\x75\x72\x73\x6f\x72',
        '\x6b\x67\x59\x4e\x69',
        '\x42\x49\x48\x4e\x6d',
        '\x64\x4b\x51\x4b\x6c',
        '\x5f\x68\x69\x64\x65\x48\x65\x6c\x70\x4c\x69\x6e\x6b\x73\x49\x6e\x66\x6f',
        '\x61\x79\x54\x55\x63',
        '\x5f\x73\x74\x6f\x70\x48\x65\x6c\x70\x4c\x69\x6e\x6b',
        '\x73\x74\x61\x72\x74\x58',
        '\x70\x75\x73\x68',
        '\x39\x34\x35\x30\x32\x33\x34\x4f\x57\x55\x44\x63\x4e',
        '\x5f\x5f\x74\x4c\x69\x6e\x6b',
        '\x6d\x6f\x76\x65\x54\x6f\x43\x75\x72\x73\x6f\x72',
        '\x69\x6e\x64\x65\x78',
        '\x5f\x73\x63\x65\x6e\x65',
        '\x65\x78\x65\x63',
        '\x5f\x6f\x62\x74\x61\x69\x6e\x45\x73\x63\x61\x70\x65\x54\x65\x78\x74\x43\x6f\x64\x65\x58',
        '\x46\x72\x76\x69\x55',
        '\x63\x6c\x6f\x73\x65',
        '\x70\x6a\x4d\x4a\x77',
        '\x61\x4a\x55\x4c\x76',
        '\x31\x36\x34\x34\x32\x38\x33\x33\x7a\x48\x52\x4f\x44\x44',
        '\x63\x78\x69\x65\x4f',
        '\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74',
        '\x32\x34\x49\x72\x63\x62\x72\x46',
        '\x35\x38\x35\x37\x66\x6a\x47\x62\x79\x54',
        '\x31\x30\x38\x30\x33\x34\x35\x59\x50\x58\x72\x51\x54',
        '\x35\x30\x35\x38\x36\x30\x66\x45\x61\x44\x77\x54',
        '\x73\x6c\x69\x63\x65',
        '\x6c\x69\x6e\x65\x48\x65\x69\x67\x68\x74',
        '\x37\x34\x37\x31\x31\x30\x4f\x65\x47\x64\x65\x4a',
        '\x45\x6e\x64\x49\x6e\x64\x65\x78',
        '\x57\x69\x6e\x64\x6f\x77\x5f\x45\x76\x65\x6e\x74\x48\x65\x6c\x70\x49\x6e\x66\x6f',
        '\x5f\x5f\x6c\x61\x73\x74\x4c\x69\x6e\x6b\x48\x65\x6c\x70\x49\x6e\x66\x6f',
        '\x38\x38\x37\x34\x37\x38\x34\x76\x6b\x66\x59\x7a\x46',
        '\x41\x4e\x65\x53\x79',
        '\x74\x5a\x51\x55\x76',
        '\x5f\x5f\x68\x65\x6c\x70\x4c\x69\x6e\x6b\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77',
        '\x70\x43\x74\x77\x75',
        '\x69\x6e\x66\x6f',
        '\x52\x66\x69\x63\x4e',
        '\x65\x6e\x64\x58',
        '\x73\x6f\x6d\x65',
        '\x5f\x63\x72\x65\x61\x74\x65\x54\x4c\x69\x6e\x6b\x48\x6f\x76\x65\x72\x5a\x6f\x6e\x65',
        '\x74\x65\x78\x74',
        '\x6f\x70\x65\x6e',
        '\x33\x6c\x51\x4e\x6d\x4f\x51',
        '\x39\x30\x55\x76\x4c\x5a\x63\x6a',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x59\x43\x78\x4a\x6b',
        '\x53\x74\x61\x72\x74\x49\x6e\x64\x65\x78',
        '\x61\x64\x64\x43\x68\x69\x6c\x64'
    ];
    _0x1d41 = function () {
        return _0x58debc;
    };
    return _0x1d41();
}
function _0x858f(_0x2de8e4, _0xe16620) {
    var _0x1d41e1 = _0x1d41();
    return _0x858f = function (_0x858fd2, _0x7c27d4) {
        _0x858fd2 = _0x858fd2 - 0x1e1;
        var _0x3f71cb = _0x1d41e1[_0x858fd2];
        return _0x3f71cb;
    }, _0x858f(_0x2de8e4, _0xe16620);
}
(function (_0x141b96, _0x427daf) {
    var _0x2fe67b = _0x858f, _0x23c606 = _0x141b96();
    while (!![]) {
        try {
            var _0x2ead4f = parseInt(_0x2fe67b(0x1e3)) / 0x1 * (-parseInt(_0x2fe67b(0x1e2)) / 0x2) + parseInt(_0x2fe67b(0x1f8)) / 0x3 * (-parseInt(_0x2fe67b(0x1e5)) / 0x4) + -parseInt(_0x2fe67b(0x1e4)) / 0x5 + -parseInt(_0x2fe67b(0x1f9)) / 0x6 * (parseInt(_0x2fe67b(0x1e8)) / 0x7) + -parseInt(_0x2fe67b(0x1ec)) / 0x8 + parseInt(_0x2fe67b(0x213)) / 0x9 + parseInt(_0x2fe67b(0x202)) / 0xa * (parseInt(_0x2fe67b(0x21e)) / 0xb);
            if (_0x2ead4f === _0x427daf)
                break;
            else
                _0x23c606['push'](_0x23c606['shift']());
        } catch (_0x41fc8f) {
            _0x23c606['push'](_0x23c606['shift']());
        }
    }
}(_0x1d41, 0xdfc24), (function () {
    var _0x50507f = _0x858f, _0x5d0042;
    _0x5d0042 = Window_Message[_0x50507f(0x203)], _0x5d0042[_0x50507f(0x1ff)] = function () {
        var _0x3f9906 = _0x50507f;
        if ('\x77\x48\x61\x4d\x58' !== '\x79\x44\x5a\x69\x54') {
            var _0x23c1f2, _0x546f3d, _0x391f6e, _0x10c56b;
            if (this[_0x3f9906(0x205)] == null) {
                if (_0x3f9906(0x20f) === '\x61\x79\x54\x55\x63')
                    return;
                else
                    return _0x1bbbc6[_0x3f9906(0x216)] += _0x44bbfc[0x0][_0x3f9906(0x1fa)], _0x548877[0x1];
            }
            _0x10c56b = this['\x5f\x74\x4c\x69\x6e\x6b\x73'];
            for (_0x23c1f2 = 0x0, _0x391f6e = _0x10c56b[_0x3f9906(0x1fa)]; _0x23c1f2 < _0x391f6e; _0x23c1f2++) {
                _0x546f3d = _0x10c56b[_0x23c1f2], _0x546f3d[_0x3f9906(0x1e1)]();
            }
        } else
            _0x275922 = _0x4be57f[_0x3622b7], _0x30a914[_0x3f9906(0x1e1)]();
    }, _0x5d0042[_0x50507f(0x20a)] = function () {
        var _0x555bc1 = _0x50507f;
        if (_0x555bc1(0x1ed) !== _0x555bc1(0x1ed))
            return;
        else {
            if (this[_0x555bc1(0x205)] == null) {
                if (_0x555bc1(0x21d) === _0x555bc1(0x21d))
                    return ![];
                else
                    return;
            }
            return this[_0x555bc1(0x205)][_0x555bc1(0x1f4)](function (_0x4ace35) {
                var _0x525c7c = _0x555bc1;
                return '\x73\x6b\x43\x4d\x4a' !== _0x525c7c(0x201) ? _0x4ace35['\x69\x73\x4d\x6f\x75\x73\x65\x49\x6e']() : _0x1dce23['\x69\x73\x4d\x6f\x75\x73\x65\x49\x6e']();
            });
        }
    }, _0x5d0042['\x5f\x73\x68\x6f\x77\x48\x65\x6c\x70\x4c\x69\x6e\x6b\x49\x6e\x66\x6f'] = function () {
        var _0x4008ad = _0x50507f, _0x58d5fb, _0x1ea1bd, _0x5cdcdd, _0xdc5f77;
        _0xdc5f77 = this[_0x4008ad(0x205)][_0x4008ad(0x207)](function (_0x40b881) {
            var _0x56d38a = _0x4008ad;
            return _0x56d38a(0x21f) !== '\x6b\x72\x42\x70\x43' ? _0x40b881[_0x56d38a(0x206)]() : this['\x5f\x73\x74\x6f\x70\x48\x65\x6c\x70\x4c\x69\x6e\x6b'](_0x51cd5b);
        });
        if (_0xdc5f77 == null) {
            if (_0x4008ad(0x1ee) === '\x45\x65\x51\x47\x6e')
                return _0x228d71['\x69\x73\x4d\x6f\x75\x73\x65\x49\x6e']();
            else
                return;
        }
        _0x1ea1bd = _0xdc5f77 != null ? _0xdc5f77[_0x4008ad(0x1f1)] : void 0x0;
        if (_0x1ea1bd == null)
            return;
        if (this[_0x4008ad(0x1eb)] === _0x1ea1bd)
            return;
        try {
            if (_0x4008ad(0x1fb) !== '\x52\x43\x64\x6a\x46') {
                this[_0x4008ad(0x1eb)] = _0x1ea1bd, this['\x5f\x68\x69\x64\x65\x48\x65\x6c\x70\x4c\x69\x6e\x6b\x73\x49\x6e\x66\x6f'](), _0x5cdcdd = PKD_HelpInMsg[_0x4008ad(0x209)](_0x1ea1bd);
                if (_0x5cdcdd == null)
                    return;
                return this[_0x4008ad(0x1ef)] = new PKD_HelpInMsg[(_0x4008ad(0x1ea))](_0x5cdcdd), SceneManager['\x5f\x73\x63\x65\x6e\x65'][_0x4008ad(0x1fd)](this['\x5f\x5f\x68\x65\x6c\x70\x4c\x69\x6e\x6b\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77']), this[_0x4008ad(0x1ef)][_0x4008ad(0x215)](), this[_0x4008ad(0x1ef)]['\x6f\x70\x65\x6e']();
            } else {
                this[_0x4008ad(0x1eb)] = _0x3f777d, this[_0x4008ad(0x20e)](), _0x521833 = _0x26fdbe[_0x4008ad(0x209)](_0x166884);
                if (_0x5c37cd == null)
                    return;
                return this[_0x4008ad(0x1ef)] = new _0x3c2c68['\x57\x69\x6e\x64\x6f\x77\x5f\x45\x76\x65\x6e\x74\x48\x65\x6c\x70\x49\x6e\x66\x6f'](_0x2c7af6), _0x70aee[_0x4008ad(0x217)]['\x61\x64\x64\x43\x68\x69\x6c\x64'](this[_0x4008ad(0x1ef)]), this[_0x4008ad(0x1ef)][_0x4008ad(0x215)](), this[_0x4008ad(0x1ef)][_0x4008ad(0x1f7)]();
            }
        } catch (_0x4b6429) {
            if (_0x4008ad(0x21a) !== _0x4008ad(0x1f0))
                return _0x58d5fb = _0x4b6429, console[_0x4008ad(0x1fe)](_0x58d5fb), this[_0x4008ad(0x20e)]();
            else {
                if (this[_0x4008ad(0x205)] == null)
                    return ![];
                return this[_0x4008ad(0x205)][_0x4008ad(0x1f4)](function (_0x266c39) {
                    var _0x470482 = _0x4008ad;
                    return _0x266c39[_0x470482(0x206)]();
                });
            }
        }
    }, _0x5d0042[_0x50507f(0x20e)] = function () {
        var _0x4167c8 = _0x50507f;
        if (this[_0x4167c8(0x1ef)] == null) {
            if ('\x6b\x67\x59\x4e\x69' === _0x4167c8(0x20b))
                return;
            else {
                var _0x6be95d;
                return _0x6be95d = /^\[(\w+)\]/[_0x4167c8(0x218)](_0x62e330[_0x4167c8(0x1f6)]['\x73\x6c\x69\x63\x65'](_0x181e91[_0x4167c8(0x216)])), _0x6be95d != null ? (_0x4b1d58['\x69\x6e\x64\x65\x78'] += _0x6be95d[0x0]['\x6c\x65\x6e\x67\x74\x68'], _0x6be95d[0x1]) : '';
            }
        }
        return this[_0x4167c8(0x1ef)][_0x4167c8(0x21b)](), this['\x5f\x5f\x68\x65\x6c\x70\x4c\x69\x6e\x6b\x49\x6e\x66\x6f\x57\x69\x6e\x64\x6f\x77']['\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74'](), this[_0x4167c8(0x1ef)] = null, this['\x5f\x5f\x6c\x61\x73\x74\x4c\x69\x6e\x6b\x48\x65\x6c\x70\x49\x6e\x66\x6f'] = null;
    }, _0x5d0042['\x5f\x77\x6f\x72\x6b\x57\x69\x74\x68\x4c\x69\x6e\x6b'] = function (_0x2c8325) {
        var _0x2b5b07 = _0x50507f, _0x4b46e3;
        return _0x4b46e3 = this[_0x2b5b07(0x219)](_0x2c8325), _0x4b46e3 !== '' ? this['\x5f\x73\x74\x61\x72\x74\x48\x65\x6c\x70\x4c\x69\x6e\x6b'](_0x4b46e3, _0x2c8325) : this[_0x2b5b07(0x210)](_0x2c8325);
    }, _0x5d0042[_0x50507f(0x208)] = function (_0x4e6334, _0x42a61c) {
        var _0x581095 = _0x50507f;
        if (this[_0x581095(0x214)] != null) {
            if ('\x59\x42\x6e\x68\x77' !== _0x581095(0x20c))
                return;
            else
                return;
        }
        this[_0x581095(0x214)] = {}, this[_0x581095(0x214)][_0x581095(0x211)] = _0x42a61c['\x78'], this[_0x581095(0x214)]['\x79'] = _0x42a61c['\x79'], this['\x5f\x5f\x74\x4c\x69\x6e\x6b'][_0x581095(0x1f3)] = 0x0, this[_0x581095(0x214)][_0x581095(0x1fc)] = _0x42a61c[_0x581095(0x216)], this[_0x581095(0x214)][_0x581095(0x204)] = _0x4e6334, PKD_HelpInMsg['\x70\x72\x65\x70\x61\x72\x65\x48\x65\x6c\x70\x4d\x65\x73\x73\x61\x67\x65\x53\x6b\x69\x6e'](_0x4e6334);
    }, _0x5d0042[_0x50507f(0x210)] = function (_0x3fd8cc) {
        var _0x23f890 = _0x50507f;
        if (this['\x5f\x5f\x74\x4c\x69\x6e\x6b'] == null) {
            if ('\x77\x76\x4e\x57\x7a' === '\x4d\x64\x6f\x43\x4b')
                return;
            else
                return;
        }
        return this[_0x23f890(0x214)][_0x23f890(0x1f3)] = _0x3fd8cc['\x78'], this[_0x23f890(0x214)][_0x23f890(0x1e9)] = _0x3fd8cc['\x69\x6e\x64\x65\x78'], this[_0x23f890(0x1f5)](), this[_0x23f890(0x214)] = null;
    }, _0x5d0042[_0x50507f(0x1f5)] = function () {
        var _0x1171c3 = _0x50507f;
        if (_0x1171c3(0x21c) !== _0x1171c3(0x1f2)) {
            var _0x5ba9e7, _0x1039e3, _0x21dcd9;
            return _0x21dcd9 = this[_0x1171c3(0x214)]['\x65\x6e\x64\x58'] - this[_0x1171c3(0x214)][_0x1171c3(0x211)], _0x5ba9e7 = this[_0x1171c3(0x1e7)](), _0x1039e3 = new PKD_HelpInMsg['\x53\x70\x72\x69\x74\x65\x5f\x48\x6f\x76\x65\x72\x4c\x69\x6e\x6b\x5a\x6f\x6e\x65'](_0x21dcd9, _0x5ba9e7, this['\x5f\x5f\x74\x4c\x69\x6e\x6b']['\x76\x61\x6c\x75\x65']), _0x1039e3['\x6d\x6f\x76\x65'](this[_0x1171c3(0x214)][_0x1171c3(0x211)] + 0xe, this[_0x1171c3(0x214)]['\x79'] + 0x10), this[_0x1171c3(0x1fd)](_0x1039e3), this[_0x1171c3(0x205)][_0x1171c3(0x212)](_0x1039e3);
        } else
            return;
    }, _0x5d0042[_0x50507f(0x219)] = function (_0x200ad0) {
        var _0xab2d4b = _0x50507f;
        if (_0xab2d4b(0x20d) !== '\x6a\x77\x78\x4e\x59') {
            var _0xdde9c8;
            return _0xdde9c8 = /^\[(\w+)\]/[_0xab2d4b(0x218)](_0x200ad0[_0xab2d4b(0x1f6)][_0xab2d4b(0x1e6)](_0x200ad0['\x69\x6e\x64\x65\x78'])), _0xdde9c8 != null ? (_0x200ad0[_0xab2d4b(0x216)] += _0xdde9c8[0x0][_0xab2d4b(0x1fa)], _0xdde9c8[0x1]) : _0xab2d4b(0x200) === _0xab2d4b(0x200) ? '' : '';
        } else
            return _0x487614 = _0x5af152, _0x13fe07[_0xab2d4b(0x1fe)](_0x15758a), this[_0xab2d4b(0x20e)]();
    };
}()));

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__close, ALIAS__initialize, ALIAS__select, ALIAS__update, _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this, ...arguments);
    if (this.pIsHintsAllowed()) {
      return this._himInitHints();
    }
  };
  
  //@[ALIAS]
  ALIAS__select = _.select;
  _.select = function() {
    ALIAS__select.call(this, ...arguments);
    if (this.pIsHintsAllowed()) {
      this._himShowHintDelayed();
    }
  };
  
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this, ...arguments);
    this._himUpdateHintShow();
  };
  //@[ALIAS]
  ALIAS__close = _.close;
  _.close = function() {
    this._himHideHintNow();
    return ALIAS__close.call(this, ...arguments);
  };
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
  _.pIsHintsAllowed = function() {
    return false;
  };
  _.pItemForHint = function() {
    return null;
  };
  _._himInitHints = function() {
    this._himHintTimerMax = PKD_HelpInMsg.ShowItemHintTimeDelay;
    this._himHintTimer = -1;
    this._himUpdateHintShow = this._himUpdateHintShowBody;
    this._himLastHintItem = -1;
    this._himHintWindow = null;
  };
  _._himShowHintDelayed = function() {
    if (this._himLastHintItem === this.pItemForHint()) {
      return;
    }
    this._himHideHintNow();
    this._himHintTimer = 0;
  };
  //@[DYNAMIC]
  _._himUpdateHintShow = function() {};
  _._himUpdateHintShowBody = function() {
    if (!this.isOpenAndActive()) {
      this._himHideHintNow();
      return;
    }
    if (this._himHintTimer < 0) {
      return;
    }
    this._himHintTimer++;
    if (this._himHintTimer >= this._himHintTimerMax) {
      this._himHintTimer = -1;
      this._himShowHintNow();
    }
  };
  _._himHideHintNow = function() {
    if (this._himHintWindow == null) {
      return;
    }
    this._himHintWindow.close();
    this._himHintWindow.removeFromParent();
    this._himHintWindow = null;
    this._himLastHintItem = null;
  };
  _._himShowHintNow = function() {
    var hintData;
    this._himLastHintItem = this.pItemForHint();
    //console.log(@_himLastHintItem)
    if (this._himLastHintItem != null) {
      hintData = PKD_HelpInMsg.getItemHint(this._himLastHintItem);
      if (hintData != null) {
        //console.log("SHOW HINT " + @_himLastHintItem.name)
        //console.log(hintData)
        this._himCreateHintWindow(hintData);
      }
    }
  };
  _._himCreateHintWindow = function(hintData) {
    var mx, my, rect, x, y;
    if (hintData == null) {
      return;
    }
    this._himHintWindow = new PKD_HelpInMsg.Window_EventHelpInfo(hintData);
    SceneManager._scene.addChild(this._himHintWindow);
    if (PKD_HelpInMsg.ItemHelpWindowPosToCursor === true) {
      x = TouchInput.x + PKD_HelpInMsg.ItemHelpWindowPosMargins.x;
      y = TouchInput.y + PKD_HelpInMsg.ItemHelpWindowPosMargins.y;
    } else {
      if (PKD_HelpInMsg.isMV()) {
        rect = this.itemRectForText(this.index());
      } else {
        rect = this.itemRectWithPadding(this.index());
      }
      mx = (rect.width / 3) + PKD_HelpInMsg.ItemHelpWindowPosMargins.x;
      my = (rect.height + 2) + PKD_HelpInMsg.ItemHelpWindowPosMargins.y;
      x = (PKD_HelpInMsg.toGlobalCoord(this, 'x')) + rect.x + mx;
      y = (PKD_HelpInMsg.toGlobalCoord(this, 'y')) + rect.y + my;
    }
    this._himHintWindow.updatePlacementRelative(x, y);
    this._himHintWindow.open();
  };
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Selectable.prototype;
})();

// ■ END Window_Selectable.coffee
//---------------------------------------------------------------------------

//Plugin PKD_HelpInMessages builded by PKD PluginBuilder 2.1 - 15.05.2022