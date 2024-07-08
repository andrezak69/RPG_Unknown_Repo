/*
 * Copyright (c) 2023 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 */

/*:
 * @plugindesc (v.1.0)[BASIC] Characters (actors) Portraits
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/actor-portrait
 *
 * @help
 * ---------------------------------------------------------------------------
 * Allows you to create a portraits of a characters on the map.
 * The portrait can react to game events.
 * You can customize the change of graphics and effects. 
 * For example changing face emotions or shake when damage.
 * You can also manage the portrait manually via Script Calls.
 * ---------------------------------------------------------------------------

 * This is BASIC plugin version and have some restrictions:
 *    - No updates with new features and content
 *    - Max portraits configurations - 3
 *    - Max events per portrait - 5
 *    - Max extra pictures added to portrait - 2
 *    - Obfuscated code
 *    - Plugin usage allowed only in Non-Commercial project
 * 
 *  PRO version of plugin don't have this restrictions!
 
 * ===========================================================================
 * How bind portrait to Actor
 *
 * Add <pActorPortrait:ID> to Actor's Note
 * Where ID is your portrait ID from Plugin Parameters
 *
 * If you added event's handlers in portrait configuration
 * the portrait will automatically process and respond to events.
 * Standard events are triggered by the game automatically.
 *
 * If you want call event manually or just performs some actions
 * to portrait use Script calls
 * 
 * ---------------------------------------------------------------------------
 * Script calls: (how to control portraits manually)
 *
 * - PKD_APA.ShowAll();
 * - PKD_APA.HideAll();
 *
 * - PKD_APA.Show(FOR_WHO);
 *
 * Where FOR_WHO can be:
 *      -1 - All portraits
 *      0 (or empty) - Party leader portrait
 *      X (any number) - Actor ID portrait
 *      "pX" (any number X) - Portrait by Index in Party
 *
 * Examples:
 * PKD_APA.Show(); - Show Party Leader portrait
 * PKD_APA.Show(-1); - Show All portraits
 * PKD_APA.Show("p2"); - Show portrait of party member with index 2
 *
 * - PKD_APA.Hide(FOR_WHO);
 *
 * - PKD_APA.CallEvent(FOR_WHO, NAME, PAYLOAD);
 *
 * Example:
 *  You add handler for you custom event with name myEvent to some portrait in
 *      plugin parameters and set variable 2 to parameter Payload Var
 *
 * If you call PKD_APA.CallEvent(-1, "myEvent", 100);
 *  Variable 2 will be set to 100 and Portrait will execute handler action
 *
 * - PKD_APA.ChangeFaceConfig(FOR_WHO, ID);
 *      (Change portrait configuration)
 * 
 * - PKD_APA.SetScale(FOR_WHO, scale);
 *      (Modify portrait scale instantly)
 *
 * - PKD_APA.SetPosition(FOR_WHO, X, Y);
 *      (Locate potrait to another position instantly)
 *
 * - PKD_APA.Move(FOR_WHO, X, Y, TIME_IN_FRAMES);
 *
 * - PKD_APA.Scale(FOR_WHO, scale, TIME_IN_FRAMES);
 *
 * - PKD_APA.AddPicture(FOR_WHO, NAME, LAYER, X, Y);
 *  (Add extra picture above portrait)
 *      Where: LAYER - from 0 to X
                NAME - picture name form img/pActorPortrait folder
 *
 * - PKD_APA.RemovePicture(FOR_WHO, NAME);
 *
 * - PKD_APA.ReplaceBackground(FOR_WHO, NAME, TIME_IN_FRAMES);
 *
 * - PKD_APA.ReplaceFace(FOR_WHO, NAME, TIME_IN_FRAMES);
 *
 * - PKD_APA.ShakeScale(FOR_WHO, POWER, TIME_IN_FRAMES);
 *
 * Example: PKD_APA.ShakeScale(-1, 0.1, 30);
 *
 * - PKD_APA.Shake(FOR_WHO, POWER_BY_X, POWER_BY_Y, TIME_IN_FRAMES);
 *
 * - PKD_APA.Blink(FOR_WHO, VALUE, STEP, TIME_IN_FRAMES);
 *     Change portrait opacity to VALUE with STEP per frame
 *
 * Example: PKD_APA.Blink(-1, 210, 5, 60);
 *
 * - PKD_APA.ShowPictureAbove(FOR_WHO, NAME, TIME_IN_FRAMES, X, Y);
 *
 * Temporarty show picture above portrait (not saves when you change scene)
 *
 * ===========================================================================
 * Events List: (for control portraits automatically)
 * 
 * Events are linked to the portrait in the plugin parameters (in the portrait settings)
 *
 * - Messages -
 *  + onMessageStart
 *  + onMessageEnd
 *
 * - Party -
 *  + onReceivedGold (amount as payload)
 *  + onReceivedItem (item id as payload)
 * 
 * - Game -
 * + onVarChanged (changed var id as payload)
 * + onSwitchChanged (changed switch Id as payload)
 *
 * (these game events will works only if Event on Switch and Event on Variable
        plugin paramters is ON )
 *
 *  - Actor -
 *  + changeEquip
 *  + gainExp
 *  + levelUp
 *  + levelDown
 *  + floorDamage
 *  + removeState
 *  + addState
 *  + removeBuff
 *  + addBuff
 *  + addDebuff
 *  + useItem
 *  + gainHp
 *  + gainMp
 *  + onDamage
 *  + die
 *  + revive
 *
 * ---------------------------------------------------------------------------
 * Plugin have Demo project with examples
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
 * @param PKD_ActorPortrait
 * 
 * @param isAutoHandlePortraitsOnPartyChange:b
 * @parent PKD_ActorPortrait
 * @type boolean
 * @text Auto Refresh
 * @desc If true - portraits will be refreshed automatically when you change party (add or remove actors)
 * @default true
 * 
 * @param isShowPortraitsBelowPictures:b
 * @parent PKD_ActorPortrait
 * @type boolean
 * @text Below Pictures
 * @desc If true - portraits will be BELOW pictures that added via event command Show Picture
 * @default true
 * 
 * @param isSwitchesEventAreEnabled:b
 * @parent PKD_ActorPortrait
 * @type boolean
 * @text Event on Switch
 * @desc If true - event onSwitchChanged will be available. May cause game performance
 * @default false
 * 
 * @param isVariableEventAreEnabled:b
 * @parent PKD_ActorPortrait
 * @type boolean
 * @text Event on Variable
 * @desc If true - event onVarChanged will be available. May cause game performance
 * @default false
 * 
 * @param eventCallTimeLimit:i
 * @parent PKD_ActorPortrait
 * @text Events callback delay
 * @type number 
 * @desc Delay in milliseconds between callback execution between events with same name (for stop spamming)
 * @default 300
 * 
 * @param scalesForFaces:intA
 * @parent PKD_ActorPortrait
 * @type number[]
 * @decimals 2
 * @text Default Scales
 * @desc Scale factor for portraits depends on their party index
 * @default ["1.00","0.80","0.80","0.80"]
 * 
 * @param positionsForFaces:structA
 * @parent PKD_ActorPortrait
 * @type struct<XY2>[]
 * @text Positions
 * @desc Default positions for portraits depends on their party index
 * @default ["{\"x:e\":\"100\",\"y:e\":\"160\"}","{\"x:e\":\"100\",\"y:e\":\"280\"}","{\"x:e\":\"100\",\"y:e\":\"400\"}","{\"x:e\":\"100\",\"y:e\":\"520\"}"]
 * 
 * @param facesConfigs:structA
 * @parent PKD_ActorPortrait
 * @type struct<FaceConfig>[]
 * @text Portraits
 * @desc Portraits settings for characters
 * @default ["{\"id\":\"reid\",\"backgroundImage\":\"Background1\",\"faceImage\":\"Reid_0\",\"faceImageMargins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"isMirror:b\":\"true\",\"defaultScale:int\":\"0.80\",\"handlers:structA\":\"[\\\"{\\\\\\\"eventName\\\\\\\":\\\\\\\"onReceivedGold\\\\\\\",\\\\\\\"payloadVarId:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"startDelay:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"_actionsGroup\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"commonEvent:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"playSE\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"scriptCall\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"command\\\\\\\":\\\\\\\"ShakeScale 0.1 10\\\\\\\"}\\\"]\"}"]
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */

/*:ru
 * @plugindesc (v.1.0)[BASIC] Портреты персонажей
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/actor-portrait
 *
 * @help
 * ---------------------------------------------------------------------------
 * Позволяет создать портрет персонажа на карте.
 * Портрет может реагировать на игровые события.
 * Можно настроить смену графики и эффекты.
 * Также можно управлять портретом вручную.
 * ---------------------------------------------------------------------------

 * Это [BASIC] (базовая) версия плагина и имеет некоторые ограничения:
 *    - Нет обновлений плагина с новым контентом и функциями
 *    - Макс. кофигураций портретов - 3
 *    - Макс. событий на один портрет - 5
 *    - Макс. дополнительных изображений на портрете - 2
 *    - Обфусцированный код
 *    - ЗАПРЕЩЕНО использовать плагин в коммерческих проектах
 * 
 *  [PRO] версия плагина не имеет данных ограничений!
 
 * ===========================================================================
 * Как привязать потрет к персонажу
 *
 * Добавить заметку <pActorPortrait:ID> к персонажу
 * Где ID - уникальный ID портрета из Параметров плагина
 *
 * Если вы добавили обработчики событий в конфигурации портрета, то
 * портрет будет автоматически обрабатывать события и реагировать на них.
 * Стандартные события запускаются игрой автоматически.
 *
 * Если вы хотите вызвать событие вручную или просто выполнить
 * некоторые действия, то используйте вызовы скриптов
 * ---------------------------------------------------------------------------
 * Вызовы скриптов: (ручное управление портретами)
 *
 * - PKD_APA.ShowAll();
 * - PKD_APA.HideAll();
 *
 * - PKD_APA.Show(FOR_WHO);
 *
 * Где FOR_WHO может быть следующим значением:
 *      -1 - ВСЕ портреты
 *      0 (или ничего) - Портрет лидера группы
 *      X (любое число) - ID (номер) персонажа
 *      "pX" (X - любое число) - Портрет по индексу в партии
 *
 * Примеры:
 * PKD_APA.Show(); - Показать портрет лидера
 * PKD_APA.Show(-1); - Показать все портреты
 * PKD_APA.Show("p2"); - Показать портрет персонажа с индексом 2 (в партии)
 *
 * - PKD_APA.Hide(FOR_WHO);
 *
 * - PKD_APA.CallEvent(FOR_WHO, NAME, PAYLOAD);
 *
 * Пример:
 *  Вы добавили обработчик своего события myEvent для портрета и
 *      в параметрах указали переменную 2 в настройке Payload Var
 *
 * Если вы вызовите PKD_APA.CallEvent(-1, "myEvent", 100);
 *  то переменная 2 будет равна 100 и портрет выполнит свой обработчик события
 *
 * - PKD_APA.ChangeFaceConfig(FOR_WHO, ID);
 *      (изменить конфигурацию портрета на другой ID)
 * 
 * - PKD_APA.SetScale(FOR_WHO, scale);
 *      (изменить размер)
 *
 * - PKD_APA.SetPosition(FOR_WHO, X, Y);
 *      (измненить позицию)
 *
 * - PKD_APA.Move(FOR_WHO, X, Y, TIME_IN_FRAMES);
 *
 * - PKD_APA.Scale(FOR_WHO, scale, TIME_IN_FRAMES);
 *
 * - PKD_APA.AddPicture(FOR_WHO, NAME, LAYER, X, Y);
 *  (Добавить картинку поверх портрета)
 *      Где: LAYER - слой от 0 до Х
                NAME - имя картинки из папки img/pActorPortrait
 *
 * - PKD_APA.RemovePicture(FOR_WHO, NAME);
 *
 * - PKD_APA.ReplaceBackground(FOR_WHO, NAME, TIME_IN_FRAMES);
 *
 * - PKD_APA.ReplaceFace(FOR_WHO, NAME, TIME_IN_FRAMES);
 *
 * - PKD_APA.ShakeScale(FOR_WHO, POWER, TIME_IN_FRAMES);
 *
 * Example: PKD_APA.ShakeScale(-1, 0.1, 30);
 *
 * - PKD_APA.Shake(FOR_WHO, POWER_BY_X, POWER_BY_Y, TIME_IN_FRAMES);
 *
 * - PKD_APA.Blink(FOR_WHO, VALUE, STEP, TIME_IN_FRAMES);
 *     Изменить прозрачность портрета до VALUE с шагом STEP (за 1 кадр)
 *
 * Пример: PKD_APA.Blink(-1, 210, 5, 60);
 *
 * - PKD_APA.ShowPictureAbove(FOR_WHO, NAME, TIME_IN_FRAMES, X, Y);
 *
 * Временно показать картинку над портретом (не сохраняется)
 *
 * ===========================================================================
 * События: (автоматическое управление портретом)
 * 
 * События привязываются к портрету в параметрах плагина (в настройках портрета)
 *
 * - Сообщения -
 *  + onMessageStart
 *  + onMessageEnd
 *
 * - Группа -
 *  + onReceivedGold
 *  + onReceivedItem
 * 
 * - Игра -
 * + onVarChanged
 * + onSwitchChanged
 *
 * (Это события (выше которые) работают только если включены
 *   Event on Switch  и Event on Variable параметры плагины )
 *
 *  - Персонаж -
 *  + changeEquip
 *  + gainExp
 *  + levelUp
 *  + levelDown
 *  + floorDamage
 *  + removeState
 *  + addState
 *  + removeBuff
 *  + addBuff
 *  + addDebuff
 *  + useItem
 *  + gainHp
 *  + gainMp
 *  + onDamage
 *  + die
 *  + revive
 *
 * ---------------------------------------------------------------------------
 * ! Примеры использования заметок и вызовов скриптов есть в демке !
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
 * @param PKD_ActorPortrait
 * 
 * @param isAutoHandlePortraitsOnPartyChange:b
 * @parent PKD_ActorPortrait
 * @type boolean
 * @text Auto Refresh
 * @desc Автоматически обновлять портреты когда произшла смена состава группы (партии)?
 * @default true
 * 
 * @param isShowPortraitsBelowPictures:b
 * @parent PKD_ActorPortrait
 * @type boolean
 * @text Below Pictures
 * @desc Если ВКЛ - портреты будут НИЖЕ слоя с обычными изображениями
 * @default true
 * 
 * @param isSwitchesEventAreEnabled:b
 * @parent PKD_ActorPortrait
 * @type boolean
 * @text Event on Switch
 * @desc Если ВКЛ, то событие onSwitchChanged будет работать (может сказаться на производительности игры)
 * @default false
 * 
 * @param isVariableEventAreEnabled:b
 * @parent PKD_ActorPortrait
 * @type boolean
 * @text Event on Variable
 * @desc Если ВКЛ, то событие onVarChanged будет работать (может сказаться на производительности игры)
 * @default false
 * 
 * @param eventCallTimeLimit:i
 * @parent PKD_ActorPortrait
 * @text Events callback delay
 * @type number 
 * @desc Пауза в миллисекундах между вызовами одинаковых событий (чтобы не было спама)
 * @default 300
 * 
 * @param scalesForFaces:intA
 * @parent PKD_ActorPortrait
 * @type number[]
 * @decimals 2
 * @text Default Scales
 * @desc Стандартные значения масштаба портретов относительно позиции персонажа в групее
 * @default ["1.00","0.80","0.80","0.80"]
 * 
 * @param positionsForFaces:structA
 * @parent PKD_ActorPortrait
 * @type struct<XY2>[]
 * @text Positions
 * @desc Стандартные позиции портретов относительно позиции персонажа в групее
 * @default ["{\"x:e\":\"100\",\"y:e\":\"160\"}","{\"x:e\":\"100\",\"y:e\":\"280\"}","{\"x:e\":\"100\",\"y:e\":\"400\"}","{\"x:e\":\"100\",\"y:e\":\"520\"}"]
 * 
 * @param facesConfigs:structA
 * @parent PKD_ActorPortrait
 * @type struct<FaceConfig>[]
 * @text Portraits
 * @desc Конфигурации портретов для персонажей
 * @default ["{\"id\":\"reid\",\"backgroundImage\":\"Background1\",\"faceImage\":\"Reid_0\",\"faceImageMargins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"isMirror:b\":\"true\",\"defaultScale:int\":\"0.80\",\"handlers:structA\":\"[\\\"{\\\\\\\"eventName\\\\\\\":\\\\\\\"onReceivedGold\\\\\\\",\\\\\\\"payloadVarId:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"startDelay:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"_actionsGroup\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"commonEvent:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"playSE\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"scriptCall\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"command\\\\\\\":\\\\\\\"ShakeScale 0.1 10\\\\\\\"}\\\"]\"}"]
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
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

/*~struct~XY2:
 * @param x:e
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y:e
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */

/*~struct~FaceConfig:

@param id
@text ID
@desc Unique Name for this portrait, used in Actor's Note <pActorPortrait:ID>
@default reid

@param backgroundImage
@text Background Image
@type file
@required 1
@dir img/pActorPortrait/
@default Background1

@param faceImage
@text Face Image
@type file
@required 1
@dir img/pActorPortrait/
@default Reid_0

@param faceImageMargins:struct
@parent faceImage
@type struct<XY>
@text Margins
@desc Face image margins relative to background image
@default {\"x:int\":\"0\",\"y:int\":\"0\"}

@param isMirror:b
@parent faceImage
@type boolean
@text Is Flipped?
@desc Flip  face iamge horizontally?
@default true

@param defaultScale:int
@type number
@min 0.1
@decimals 2
@text Scale
@desc Default scale for portrait
@default 0.8

@param handlers:structA
@type struct<EventHandler>[]
@text Events handlers
@desc This portrait handlers for events
@default []

 */

/*~struct~EventHandler:

@param eventName
@text Event Name
@type combo
@option onMessageStart
@option onMessageEnd
@option onReceivedGold
@option onReceivedItem
@option onVarChanged
@option onSwitchChanged
@option changeEquip
@option gainExp
@option levelUp
@option levelDown
@option floorDamage
@option removeState
@option addState
@option removeBuff
@option addBuff
@option addDebuff
@option useItem
@option gainHp
@option gainMp
@option onDamage
@option die
@option revive
@desc One of registred event names or your custom event name
@default onReceivedGold

@param payloadVarId:int
@type variable
@text Payload Var
@desc [Optional] A variable in which additional event data (if supported by event) will be stored
@default 0

@param startDelay:int
@type number
@min 0
@text Delay
@desc Delay in milliseconds before execute this handler. 0 - no delay
@default 0

@param _actionsGroup
@text Actions
@desc Actons that will be called when will event (Event Name) is happen

@param commonEvent:int
@parent _actionsGroup
@type common_event
@text Start CE
@desc Start common Event
@default 0

@param playSE
@parent _actionsGroup
@type file
@required 1
@dir audio/se
@text Play SE
@default

@param scriptCall
@parent _actionsGroup
@text Script Call
@default

@param sAction
@parent _actionsGroup
@text SAction (for AABSZ)
@default

@param command
@parent _actionsGroup
@text API Command
@type combo
@option Show
@option Hide
@option HideAll
@option ShowAll
@option ChangeFaceConfig NEW_ID
@option SetScale VALUE
@option SetPosition X Y
@option Move X Y TIME
@option Scale VALUE TIME
@option AddPicture NAME LAYER_INDEX X Y
@option RemovePicture NAME
@option ReplaceBackground NAME LIFE_TIME
@option ReplaceFace NAME LIFE_TIME
@option ShakeScale VALUE TIME
@option Shake X Y TIME
@option Blink VALUE STEP TIME
@option ShowPictureAbove NAME LIFE_TIME X Y
@option CallEvent NAME PAYLOAD
@desc Select command and edit arguments as you want. For more info see Help section (Script calls)
@default ShakeScale 0.1 10


 */


var Imported = Imported || {};
Imported.PKD_ActorPortrait = true;

var PKD_ActorPortrait = {};
PKD_ActorPortrait.Version = 100;

//?VERSION
PKD_ActorPortrait.isPro = function() { return false; };

PKD_ActorPortrait.PP = {};
PKD_ActorPortrait.Utils = {};

// * Загрзука параметров
PKD_ActorPortrait.LoadPluginSettings = () => {
    PKD_ActorPortrait.PP._loader = new KDCore.ParamLoader('PKD_ActorPortrait');
};

window.PKD_APA = PKD_ActorPortrait;


//%[Для обновлений]
//%[I] Добавить OnClickCallback - Действи при нажатии мышкой по портрету 

// * Портреты в бою

// * Портреты для врагов (в бою)

// * Портреты для событий (кастомные портреты) на карте

// * Визуальная экипировка (спец. коммент у брони и оружия и проверка по событию какие слои есть, каких нет)




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

//?rev 15.03.23
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '3.2.4';

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
  return Array.prototype.getByField = function(field, value) {
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

      update() {
        super.update();
        this._updateOpChanger();
        return this.updateTooltip();
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
      if (TouchInput.isTriggered() && this.isMouseIn()) {
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
          return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
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
      return this.visible = this.params.visible;
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
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
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

//Plugin KDCore builded by PKD PluginBuilder 2.2 - 15.03.2023

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ API
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _, __;
  //@[DEFINES]
  _ = window.PKD_ActorPortrait;
  __ = PKD_ActorPortrait.Utils;
  // * forWho: -1 - all, 0 (null) - leader, X - actor ID, "p1" - party member 1
  _.Show = function(forWho) {
    var e, i, len, p, ps;
    try {
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.setStaticVisibility(true);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.Hide = function(forWho) {
    var e, i, len, p, ps;
    try {
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.setStaticVisibility(false);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.HideAll = function() {
    var e, i, len, m, ref;
    try {
      ref = $gameParty.members();
      for (i = 0, len = ref.length; i < len; i++) {
        m = ref[i];
        this.Hide(m.actorId());
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Показыват портреты всей партии
  _.ShowAll = function() {
    var e, i, len, m, ref;
    try {
      ref = $gameParty.members();
      for (i = 0, len = ref.length; i < len; i++) {
        m = ref[i];
        this.Show(m.actorId());
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Вызвать событие
  _.CallEvent = function(forWho, eventName, payload) {
    var e, i, len, p, ps;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (!__.isCanCallEventNow(eventName)) {
        return;
      }
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.onEvent(eventName, payload);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Это нужно если лицо героя надо поменять во время игры (надел шлем например)
  _.ChangeFaceConfig = function(forWho, newConfigId) {
    var e, i, len, p, ps, results;
    try {
      ps = __.getPortraitsByForWho(forWho);
      results = [];
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        results.push(__.changeFaceConfig(p, newConfigId));
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * STATIC ACTIONS
  _.SetScale = function(forWho, scaleFactor) {
    return this.Scale(forWho, scaleFactor, 0);
  };
  _.SetPosition = function(forWho, x, y) {
    return this.Move(forWho, x, y, 0);
  };
  _.Move = function(forWho, x, y, moveTime) {
    var e, i, len, p, ps;
    try {
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.moveX(x, y, moveTime);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.Scale = function(forWho, scaleFactor, moveTime) {
    var e, i, len, p, ps;
    try {
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.dynamicScale(scaleFactor, moveTime);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Это для экипировки визуальной
  //TODO: Добавить специальный Note для брони и оружия (и по событию экипировки проверять все Note, если нету, удалять, если есть, добавлять)
  _.AddPicture = function(forWho, picName, layerLevel = 0, x = 0, y = 0) {
    var e, i, len, p, ps;
    try {
      if (layerLevel < 0) {
        return;
      }
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.addPicture(picName, layerLevel, x, y);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.RemovePicture = function(forWho, picName) {
    var e, i, len, p, ps;
    try {
      if (!String.any(picName)) {
        return;
      }
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.removePicture(picName);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * DYNAMIC EFFECTS
  _.ReplaceBackground = function(forWho, picName, lifeTime) {
    var e, i, len, p, ps;
    try {
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.replaceBackImage(picName, lifeTime);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.ReplaceFace = function(forWho, picName, lifeTime) {
    var e, i, len, p, ps;
    try {
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.replaceFaceImage(picName, lifeTime);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.ShakeScale = function(forWho, scalePower, lifeTime) {
    var e, i, len, p, ps;
    try {
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.shakeScale(scalePower, lifeTime);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.Shake = function(forWho, powerX, powerY, lifeTime) {
    var e, i, len, p, ps;
    try {
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.shake(powerX, powerY, lifeTime);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Мерцание (прозрачности)
  _.Blink = function(forWho, value, speed, lifeTime) {
    var e, i, len, p, ps;
    try {
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.blinkX(value, speed, lifeTime);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Если lifeTime == 0, то проиграется до конца и исчезнет (если анимация)
  // * иначе просто висит пока не заменится или не перересуется портрет
  // * Если lifeTime > 0, то как обычно (даже если анимация не закончилась)
  // * Всегда сверху, не сохраняется
  _.ShowPictureAbove = function(forWho, picName, lifeTime, x, y) {
    var e, i, len, p, ps;
    try {
      ps = __.getPortraitsByForWho(forWho);
      for (i = 0, len = ps.length; i < len; i++) {
        p = ps[i];
        p.showPictureAbove(picName, lifeTime, x, y);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
})();

// ■ END API
//---------------------------------------------------------------------------


function _0x3d0e(_0x3ccef2, _0x4ef0ce) {
    var _0x8d7151 = _0x8d71();
    return _0x3d0e = function (_0x3d0e37, _0x237ffa) {
        _0x3d0e37 = _0x3d0e37 - 0xf6;
        var _0x53a50b = _0x8d7151[_0x3d0e37];
        return _0x53a50b;
    }, _0x3d0e(_0x3ccef2, _0x4ef0ce);
}
function _0x8d71() {
    var _0x1f6820 = [
        '\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x31',
        '\x35\x34\x38\x33\x34\x35\x34\x66\x67\x67\x4c\x44\x43',
        '\x52\x65\x69\x64\x5f\x30',
        '\x53\x68\x61\x6b\x65\x53\x63\x61\x6c\x65\x20\x30\x2e\x31\x20\x31\x30',
        '\x37\x32\x34\x39\x36\x32\x34\x4b\x65\x6e\x42\x62\x56',
        '\x31\x35\x39\x34\x33\x36\x36\x57\x43\x43\x4a\x4e\x57',
        '\x31\x30\x35\x31\x30\x34\x34\x35\x43\x4a\x57\x62\x46\x78',
        '\x31\x79\x52\x66\x65\x6d\x4b',
        '\x41\x65\x61\x74\x6c',
        '\x35\x32\x30\x63\x66\x57\x55\x61\x65',
        '\x67\x65\x74\x43\x6f\x66\x69\x67\x46\x6f\x72\x46\x61\x63\x65\x42\x79\x49\x64',
        '\x4a\x4c\x49\x53\x71',
        '\x69\x73\x53\x68\x6f\x77\x50\x6f\x72\x74\x72\x61\x69\x74\x73\x42\x65\x6c\x6f\x77\x50\x69\x63\x74\x75\x72\x65\x73',
        '\x4c\x6f\x61\x64\x50\x6c\x75\x67\x69\x6e\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x70\x6f\x73\x69\x74\x69\x6f\x6e\x73\x46\x6f\x72\x46\x61\x63\x65\x73',
        '\x37\x58\x72\x5a\x61\x7a\x71',
        '\x67\x65\x74\x50\x61\x72\x61\x6d',
        '\x73\x63\x61\x6c\x65\x73\x46\x6f\x72\x46\x61\x63\x65\x73',
        '\x72\x65\x69\x64',
        '\x67\x65\x74\x53\x63\x61\x6c\x65\x73',
        '\x65\x76\x65\x6e\x74\x43\x61\x6c\x6c\x54\x69\x6d\x65\x4c\x69\x6d\x69\x74',
        '\x31\x35\x58\x42\x4a\x44\x53\x69',
        '\x36\x37\x31\x37\x31\x36\x7a\x73\x76\x6b\x4e\x47',
        '\x35\x33\x32\x38\x4b\x4f\x47\x41\x6f\x48',
        '\x6f\x6e\x52\x65\x63\x65\x69\x76\x65\x64\x47\x6f\x6c\x64',
        '\x7a\x67\x67\x69\x6d',
        '\x37\x35\x38\x31\x33\x30\x6d\x43\x68\x76\x66\x78',
        '\x67\x65\x74\x50\x6f\x73\x69\x74\x69\x6f\x6e\x73',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x67\x65\x74\x4c\x6f\x61\x64\x65\x72\x50\x61\x72\x61\x6d',
        '\x78\x43\x4f\x50\x45',
        '\x69\x73\x41\x75\x74\x6f\x48\x61\x6e\x64\x6c\x65\x50\x6f\x72\x74\x72\x61\x69\x74\x73\x4f\x6e\x50\x61\x72\x74\x79\x43\x68\x61\x6e\x67\x65',
        '\x63\x6f\x6e\x73\x6f\x6c\x65\x2e\x6c\x6f\x67\x28\x31\x32\x33\x29',
        '\x67\x65\x74\x46\x61\x63\x65\x73\x43\x6f\x6e\x66\x69\x67\x73',
        '\x66\x61\x63\x65\x73\x43\x6f\x6e\x66\x69\x67\x73',
        '\x46\x73\x67\x48\x58',
        '\x73\x46\x64\x67\x71',
        '\x67\x65\x74\x42\x79\x49\x64',
        '\x5f\x6c\x6f\x61\x64\x65\x72',
        '\x69\x73\x53\x77\x69\x74\x63\x68\x65\x73\x45\x76\x65\x6e\x74\x41\x72\x65\x45\x6e\x61\x62\x6c\x65\x64',
        '\x69\x73\x56\x61\x72\x69\x61\x62\x6c\x65\x45\x76\x65\x6e\x74\x41\x72\x65\x45\x6e\x61\x62\x6c\x65\x64'
    ];
    _0x8d71 = function () {
        return _0x1f6820;
    };
    return _0x8d71();
}
(function (_0x14179c, _0x2d2205) {
    var _0x334d4c = _0x3d0e, _0x5559ea = _0x14179c();
    while (!![]) {
        try {
            var _0x290bfe = parseInt(_0x334d4c(0xfd)) / 0x1 * (parseInt(_0x334d4c(0xfb)) / 0x2) + -parseInt(_0x334d4c(0x10b)) / 0x3 * (-parseInt(_0x334d4c(0x10c)) / 0x4) + -parseInt(_0x334d4c(0x110)) / 0x5 + -parseInt(_0x334d4c(0xf7)) / 0x6 * (-parseInt(_0x334d4c(0x105)) / 0x7) + -parseInt(_0x334d4c(0xfa)) / 0x8 + -parseInt(_0x334d4c(0x10d)) / 0x9 * (-parseInt(_0x334d4c(0xff)) / 0xa) + -parseInt(_0x334d4c(0xfc)) / 0xb;
            if (_0x290bfe === _0x2d2205)
                break;
            else
                _0x5559ea['push'](_0x5559ea['shift']());
        } catch (_0x16b8c9) {
            _0x5559ea['push'](_0x5559ea['shift']());
        }
    }
}(_0x8d71, 0x8ab85), (function () {
    var _0xd96853 = _0x3d0e, _0x2202e3;
    _0x2202e3 = PKD_ActorPortrait['\x50\x50'], _0x2202e3[_0xd96853(0x113)] = function () {
        var _0x4a19c0 = _0xd96853;
        if (_0x4a19c0(0x114) === _0x4a19c0(0x10f))
            return this['\x67\x65\x74\x4c\x6f\x61\x64\x65\x72\x50\x61\x72\x61\x6d'](_0x4a19c0(0x10a), 0x12c);
        else {
            var _0x3b856d;
            try {
                if (_0x4a19c0(0x101) === '\x4a\x4c\x49\x53\x71') {
                    if (this[_0x4a19c0(0x11c)] == null) {
                        if ('\x56\x66\x58\x72\x6b' === '\x56\x66\x58\x72\x6b')
                            PKD_ActorPortrait[_0x4a19c0(0x103)]();
                        else
                            return this[_0x4a19c0(0x113)](_0x4a19c0(0x118), [{
                                    '\x69\x64': _0x4a19c0(0x108),
                                    '\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65': _0x4a19c0(0xf6),
                                    '\x66\x61\x63\x65\x49\x6d\x61\x67\x65': _0x4a19c0(0xf8),
                                    '\x66\x61\x63\x65\x49\x6d\x61\x67\x65\x4d\x61\x72\x67\x69\x6e\x73': {
                                        '\x78': 0x0,
                                        '\x79': 0x0
                                    },
                                    '\x69\x73\x4d\x69\x72\x72\x6f\x72': !![],
                                    '\x64\x65\x66\x61\x75\x6c\x74\x53\x63\x61\x6c\x65': 0.8,
                                    '\x68\x61\x6e\x64\x6c\x65\x72\x73': [{
                                            '\x65\x76\x65\x6e\x74\x4e\x61\x6d\x65': '\x6f\x6e\x52\x65\x63\x65\x69\x76\x65\x64\x47\x6f\x6c\x64',
                                            '\x70\x61\x79\x6c\x6f\x61\x64\x56\x61\x72\x49\x64': 0x1,
                                            '\x73\x74\x61\x72\x74\x44\x65\x6c\x61\x79': 0x0,
                                            '\x63\x6f\x6d\x6d\x61\x6e\x64': _0x4a19c0(0xf9),
                                            '\x73\x63\x72\x69\x70\x74\x43\x61\x6c\x6c': '\x63\x6f\x6e\x73\x6f\x6c\x65\x2e\x6c\x6f\x67\x28\x31\x32\x33\x29',
                                            '\x73\x41\x63\x74\x69\x6f\x6e': '',
                                            '\x63\x6f\x6d\x6d\x6f\x6e\x45\x76\x65\x6e\x74': 0x1,
                                            '\x70\x6c\x61\x79\x53\x45': ''
                                        }]
                                }]);
                    }
                    return this[_0x4a19c0(0x11c)][_0x4a19c0(0x106)](...arguments);
                } else {
                    var _0x1f9f07;
                    try {
                        return this[_0x4a19c0(0x11c)] == null && _0x1a544a[_0x4a19c0(0x103)](), this[_0x4a19c0(0x11c)]['\x67\x65\x74\x50\x61\x72\x61\x6d'](...arguments);
                    } catch (_0x3f1ee3) {
                        _0x1f9f07 = _0x3f1ee3, _0x27815c[_0x4a19c0(0x112)](_0x1f9f07);
                    }
                    return null;
                }
            } catch (_0x5097db) {
                if (_0x4a19c0(0x119) === '\x46\x73\x67\x48\x58')
                    _0x3b856d = _0x5097db, KDCore[_0x4a19c0(0x112)](_0x3b856d);
                else
                    return this[_0x4a19c0(0x117)]()[_0x4a19c0(0x11b)](_0x8e4f4);
            }
            return null;
        }
    }, _0x2202e3[_0xd96853(0x111)] = function () {
        var _0x54b8d1 = _0xd96853;
        return this[_0x54b8d1(0x113)](_0x54b8d1(0x104), [
            {
                '\x78': 0x64,
                '\x79': 0xa0
            },
            {
                '\x78': 0x64,
                '\x79': 0x118
            },
            {
                '\x78': 0x64,
                '\x79': 0x17c
            },
            {
                '\x78': 0x64,
                '\x79': 0x1f4
            }
        ]);
    }, _0x2202e3[_0xd96853(0x109)] = function () {
        var _0x958ecc = _0xd96853;
        return _0x958ecc(0xfe) !== _0x958ecc(0xfe) ? this[_0x958ecc(0x113)]('\x69\x73\x41\x75\x74\x6f\x48\x61\x6e\x64\x6c\x65\x50\x6f\x72\x74\x72\x61\x69\x74\x73\x4f\x6e\x50\x61\x72\x74\x79\x43\x68\x61\x6e\x67\x65', !![]) : this[_0x958ecc(0x113)](_0x958ecc(0x107), [
            0x1,
            0.8,
            0.8,
            0.8
        ]);
    }, _0x2202e3['\x67\x65\x74\x4d\x69\x6e\x69\x6d\x75\x6d\x54\x69\x6d\x65\x4c\x69\x6d\x69\x74'] = function () {
        var _0x1e6f62 = _0xd96853;
        return this[_0x1e6f62(0x113)](_0x1e6f62(0x10a), 0x12c);
    }, _0x2202e3[_0xd96853(0x102)] = function () {
        var _0x4e55a2 = _0xd96853;
        return this[_0x4e55a2(0x113)](_0x4e55a2(0x102), !![]);
    }, _0x2202e3[_0xd96853(0x115)] = function () {
        var _0x384f3c = _0xd96853;
        return '\x73\x46\x64\x67\x71' !== _0x384f3c(0x11a) ? this[_0x384f3c(0x113)](_0x384f3c(0x104), [
            {
                '\x78': 0x64,
                '\x79': 0xa0
            },
            {
                '\x78': 0x64,
                '\x79': 0x118
            },
            {
                '\x78': 0x64,
                '\x79': 0x17c
            },
            {
                '\x78': 0x64,
                '\x79': 0x1f4
            }
        ]) : this[_0x384f3c(0x113)]('\x69\x73\x41\x75\x74\x6f\x48\x61\x6e\x64\x6c\x65\x50\x6f\x72\x74\x72\x61\x69\x74\x73\x4f\x6e\x50\x61\x72\x74\x79\x43\x68\x61\x6e\x67\x65', !![]);
    }, _0x2202e3[_0xd96853(0x11d)] = function () {
        var _0x385fcb = _0xd96853;
        return this[_0x385fcb(0x113)](_0x385fcb(0x11d), ![]);
    }, _0x2202e3[_0xd96853(0x11e)] = function () {
        var _0x476b1b = _0xd96853;
        return this['\x67\x65\x74\x4c\x6f\x61\x64\x65\x72\x50\x61\x72\x61\x6d'](_0x476b1b(0x11e), ![]);
    }, _0x2202e3[_0xd96853(0x100)] = function (_0x571931) {
        var _0x1ec968 = _0xd96853;
        return this[_0x1ec968(0x117)]()['\x67\x65\x74\x42\x79\x49\x64'](_0x571931);
    }, _0x2202e3['\x67\x65\x74\x46\x61\x63\x65\x73\x43\x6f\x6e\x66\x69\x67\x73'] = function () {
        var _0xf956c8 = _0xd96853;
        return this[_0xf956c8(0x113)](_0xf956c8(0x118), [{
                '\x69\x64': _0xf956c8(0x108),
                '\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65': _0xf956c8(0xf6),
                '\x66\x61\x63\x65\x49\x6d\x61\x67\x65': _0xf956c8(0xf8),
                '\x66\x61\x63\x65\x49\x6d\x61\x67\x65\x4d\x61\x72\x67\x69\x6e\x73': {
                    '\x78': 0x0,
                    '\x79': 0x0
                },
                '\x69\x73\x4d\x69\x72\x72\x6f\x72': !![],
                '\x64\x65\x66\x61\x75\x6c\x74\x53\x63\x61\x6c\x65': 0.8,
                '\x68\x61\x6e\x64\x6c\x65\x72\x73': [{
                        '\x65\x76\x65\x6e\x74\x4e\x61\x6d\x65': _0xf956c8(0x10e),
                        '\x70\x61\x79\x6c\x6f\x61\x64\x56\x61\x72\x49\x64': 0x1,
                        '\x73\x74\x61\x72\x74\x44\x65\x6c\x61\x79': 0x0,
                        '\x63\x6f\x6d\x6d\x61\x6e\x64': _0xf956c8(0xf9),
                        '\x73\x63\x72\x69\x70\x74\x43\x61\x6c\x6c': _0xf956c8(0x116),
                        '\x73\x41\x63\x74\x69\x6f\x6e': '',
                        '\x63\x6f\x6d\x6d\x6f\x6e\x45\x76\x65\x6e\x74': 0x1,
                        '\x70\x6c\x61\x79\x53\x45': ''
                    }]
            }]);
    };
}()));

// Generated by CoffeeScript 2.6.1
var Sprite_PKD_AP_ActorFace;

Sprite_PKD_AP_ActorFace = class Sprite_PKD_AP_ActorFace extends KDCore.Sprite {
  constructor(faceConfigId, bindedActorId) {
    super();
    this.faceConfigId = faceConfigId;
    this.bindedActorId = bindedActorId;
    this._create();
    this._applyParameters();
    this.refreshPlacement();
    this._attach();
    this._applyUserData();
    return;
  }

  onEvent(evName, payload) {
    var e, eventData;
    try {
      eventData = this.config().handlers.getByField('eventName', evName);
      if (eventData != null) {
        this._tryExecuteEvent(eventData, payload);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  config() {
    if (this._config == null) {
      this._config = PKD_ActorPortrait.PP.getCofigForFaceById(this.faceConfigId);
    }
    return this._config;
  }

  isActive() {
    return this.visible === true;
  }

  _setStaticPosition(x, y) {
    return this._storeUserData({
      position: {x, y}
    });
  }

  _storeUserData(value) {
    return $gameSystem.pAP_setUserDataForPortrait(this.bindedActorId, value);
  }

  setStaticVisibility(isVisible) {
    this._storeUserData({
      visible: isVisible
    });
    this.visible = isVisible;
  }

  update() {
    super.update();
    if (!this.isActive()) {
      return;
    }
    this._updateAnimations();
    this._updateImages();
    this._updatePictures();
  }

  _create() {
    this._allPictures = [];
    this._layersForPictures = [];
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._createBackground();
    this._crateFaceImage();
  }

  _createBackground() {
    this.background = PKD_ActorPortrait.Utils.sprite(this.config().backgroundImage);
    this.background.anchor.set(0.5);
    this.addChild(this.background);
  }

  _crateFaceImage() {
    this.face = PKD_ActorPortrait.Utils.sprite(this.config().faceImage);
    this.face.anchor.set(0.5);
    this.addChild(this.face);
    this.picturesLayer = new Sprite();
    this.picturesLayer.anchor.set(0.5);
    return this.addChild(this.picturesLayer);
  }

  refreshPlacement() {
    var c, e, extraScale, x, y;
    try {
      ({x, y} = PKD_ActorPortrait.Utils.getDefaultPositionFor(this.bindedActorId));
      this.move(x, y);
      extraScale = PKD_ActorPortrait.Utils.getDefaultScaleFor(this.bindedActorId);
      c = this.config();
      if (c.defaultScale != null) {
        this.scale.set(c.defaultScale);
      }
      if (extraScale !== 0) {
        this.scale.set(this.scale.x * extraScale);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.move(0, 0);
    }
  }

  _applyParameters() {
    var c, e, x, y;
    try {
      c = this.config();
      if (c.isMirror === true) {
        this.face.scale.x = -1;
      }
      if (c.faceImageMargins != null) {
        try {
          ({x, y} = c.faceImageMargins);
          this.face.x = eval(x);
          return this.face.y = eval(y);
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  _attach() {
    var e;
    try {
      PKD_ActorPortrait.Utils.addPortraitToScene(this);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _applyUserData() {
    var e, userData;
    userData = $gameSystem.pAP_getPortraitUserDataFor(this.bindedActorId);
    if (userData == null) {
      return;
    }
    try {
      if (userData.scale != null) {
        this.scale.set(userData.scale);
      }
      if (userData.position != null) {
        this.move(userData.position);
      }
      if (userData.visible != null) {
        this.visible = userData.visible;
      }
      if (String.any(userData.faceName)) {
        this._replaceFaceImage(userData.faceName);
      }
      if (String.any(userData.backgroundImage)) {
        this._replaceBackImage(userData.backgroundImage);
      }
      if (userData.pictures != null) {
        this._restoreExtraPictrues(userData.pictures);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ActorPortrait.Utils;
  // * forWho: -1 - all, 0 (null) - leader, X - actor ID, "p1" - party member 1
  //  * Returns array! (always)
  _.getPortraitsByForWho = function(forWho) {
    var e, result;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return [];
      }
      result = this._getPortraitsByForWho(forWho);
      if (result == null) {
        return [];
      }
      return result.filter(function(item) {
        return item != null;
      });
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [];
    }
  };
  _._getPortraitsByForWho = function(forWho) {
    var e, index;
    try {
      if (forWho == null) {
        return [this.leader()];
      }
      if (forWho === 0) {
        return [this.leader()];
      }
      if (forWho < 0) {
        return this.getAllPortraits();
      }
      if (isFinite(forWho)) {
        return [this.actorId(parseInt(forWho))];
      }
      if (String.any(forWho)) {
        index = forWho.replace("p", "");
        if (isFinite(index)) {
          return [this.memberIndex(parseInt(index))];
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [];
    }
  };
  _.getAllPortraits = function() {
    var e;
    try {
      return this.getProperLayerForPortrait().children.filter(function(s) {
        return s instanceof Sprite_PKD_AP_ActorFace;
      });
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [];
    }
  };
  _.leader = function() {
    var e;
    try {
      return this.getAllPortraits().find(function(p) {
        return p.bindedActorId === $gameParty.leader().actorId();
      });
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
  _.actorId = function(actorId) {
    var e;
    try {
      return this.getAllPortraits().find(function(p) {
        return p.bindedActorId === actorId;
      });
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return null;
    }
  };
  _.memberIndex = function(index) {
    var actor;
    actor = $gameParty.allMembers()[index];
    if (actor != null) {
      return this.getAllPortraits().find(function(p) {
        return p.bindedActorId === actor.actorId();
      });
    }
    return null;
  };
  _.createPortrait = function(configId, actorId) {
    var e;
    try {
      if (this.isValidConfigId(configId)) {
        console.log("Create Portrait for  " + actorId);
        return new Sprite_PKD_AP_ActorFace(configId, actorId);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.isValidConfigId = function() {
    return PKD_ActorPortrait.PP.getCofigForFaceById(...arguments) != null;
  };
  _.getDefaultPositionFor = function(actorId) {
    var e, index, pos;
    try {
      index = $gameActors.actor(actorId).index();
      if (index >= 0) {
        pos = PKD_ActorPortrait.PP.getPositions()[index];
        return {
          x: eval(pos.x),
          y: eval(pos.y)
        };
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return {
      x: 0,
      y: 0
    };
  };
  _.getDefaultScaleFor = function(actorId) {
    var e, index;
    try {
      index = $gameActors.actor(actorId).index();
      if (index >= 0) {
        return PKD_ActorPortrait.PP.getScales()[index];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return 0;
  };
  _.addPortraitToScene = function() {
    return this.getProperLayerForPortrait().addChild(...arguments);
  };
  _.getProperLayerForPortrait = function() {
    if (PKD_ActorPortrait.PP.isShowPortraitsBelowPictures()) {
      return SceneManager._scene._spriteset._pkdAPLayer;
    } else {
      return SceneManager._scene;
    }
  };
  _.image = function() {
    return ImageManager.loadPictureForPKDActPort(...arguments);
  };
  _.sprite = function() {
    return new KDCore.Sprite(this.image(...arguments));
  };
  _.executeEventCommand = function(command, actorId) {
    var cmdArgs, cmdName, commandParts, e, i, index, len, p;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        console.warn("Portrait Event Commands can be executed only on MAP SCENE");
        return;
      }
      console.log("CMD: " + command + " for " + actorId);
      commandParts = command.split(" ");
      cmdName = "";
      cmdArgs = [];
// * Build command arguments
      for (index = i = 0, len = commandParts.length; i < len; index = ++i) {
        p = commandParts[index];
        if (index === 0) {
          cmdName = p;
        } else {
          if (isFinite(p)) {
            cmdArgs.push(Number(p));
          } else {
            cmdArgs.push(p);
          }
        }
      }
      if (!String.any(cmdName)) {
        return;
      }
      if (PKD_ActorPortrait[cmdName] != null) {
        PKD_ActorPortrait[cmdName](actorId, ...cmdArgs);
      } else {
        console.warn("Command " + cmdName + " is not found");
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.isCanCallEventNow = function(eventName) {
    var e, ms;
    try {
      ms = PKD_ActorPortrait.PP.getMinimumTimeLimit();
      if (ms <= 0) {
        return true;
      }
      if ($gameTemp._pkdAPSpamProtectors == null) {
        $gameTemp._pkdAPSpamProtectors = {};
      }
      if ($gameTemp._pkdAPSpamProtectors[eventName] != null) {
        return false;
      } else {
        $gameTemp._pkdAPSpamProtectors[eventName] = setTimeout((function() {
          return $gameTemp._pkdAPSpamProtectors[eventName] = null;
        }), ms);
        return true;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return true;
  };
  _.changeFaceConfig = function(portrait, newConfigId) {
    var actorId, e;
    try {
      if (portrait == null) {
        return;
      }
      actorId = portrait.bindedActorId;
      $gameSystem.pAP_setExternalFaceConfigFor(actorId, newConfigId);
      portrait.removeFromParent();
      if (newConfigId == null) {
        newConfigId = $gameActors.actor(actorId).pAP_getPortraitId();
      }
      return this.createPortrait(newConfigId, actorId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.refreshPortraits = function() {
    var actorId, configId, e, i, j, k, len, len1, len2, m, p, portrait, portraits, ref, results;
    try {
      portraits = this.getAllPortraits();
      try {
        for (i = 0, len = portraits.length; i < len; i++) {
          p = portraits[i];
          if (!$gameParty._actors.contains(p.bindedActorId)) {
            p.removeFromParent();
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      ref = $gameParty.allMembers();
      for (j = 0, len1 = ref.length; j < len1; j++) {
        m = ref[j];
        try {
          actorId = m.actorId();
          portrait = this.actorId(actorId);
          if (portrait == null) {
            configId = $gameActors.actor(actorId).pAP_getPortraitId();
            if (configId != null) {
              this.createPortrait(configId, actorId);
            }
          }
        } catch (error) {
          e = error;
          KDCore.warning(e);
        }
      }
      results = [];
      for (k = 0, len2 = portraits.length; k < len2; k++) {
        p = portraits[k];
        results.push(p.refreshPlacement());
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.executeSAction = function(sAction, actorId) {}; // * IMPLEMENTATION FOR AABZ
})();


function _0x2b7a(_0xfcc6b3, _0x141225) {
    var _0x16fb46 = _0x16fb();
    return _0x2b7a = function (_0x2b7a82, _0x3e778e) {
        _0x2b7a82 = _0x2b7a82 - 0x174;
        var _0x2e5556 = _0x16fb46[_0x2b7a82];
        return _0x2e5556;
    }, _0x2b7a(_0xfcc6b3, _0x141225);
}
function _0x16fb() {
    var _0x138397 = [
        '\x34\x32\x37\x38\x36\x33\x66\x4a\x62\x52\x65\x74',
        '\x66\x61\x63\x65\x73\x43\x6f\x6e\x66\x69\x67\x73',
        '\x53\x68\x61\x6b\x65\x53\x63\x61\x6c\x65\x20\x30\x2e\x31\x20\x31\x30',
        '\x31\x36\x38\x50\x4d\x6c\x6a\x6a\x65',
        '\x32\x37\x32\x39\x34\x30\x34\x78\x62\x68\x56\x68\x6c',
        '\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x31',
        '\x32\x78\x62\x74\x59\x76\x44',
        '\x72\x65\x69\x64',
        '\x32\x30\x72\x4d\x46\x4b\x6f\x4d',
        '\x6f\x6e\x52\x65\x63\x65\x69\x76\x65\x64\x47\x6f\x6c\x64',
        '\x37\x35\x33\x37\x31\x37\x38\x73\x4e\x6d\x68\x4a\x6d',
        '\x67\x65\x74\x46\x61\x63\x65\x73\x43\x6f\x6e\x66\x69\x67\x73',
        '\x67\x65\x74\x4c\x6f\x61\x64\x65\x72\x50\x61\x72\x61\x6d',
        '\x31\x34\x34\x36\x33\x35\x67\x72\x53\x67\x76\x49',
        '\x52\x65\x69\x64\x5f\x30',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x33\x39\x34\x30\x38\x39\x39\x6d\x5a\x41\x66\x79\x7a',
        '\x63\x6f\x6e\x73\x6f\x6c\x65\x2e\x6c\x6f\x67\x28\x31\x32\x33\x29',
        '\x68\x61\x6e\x64\x6c\x65\x72\x73',
        '\x31\x31\x36\x37\x32\x71\x43\x72\x45\x67\x73',
        '\x73\x6c\x69\x63\x65',
        '\x35\x35\x30\x38\x43\x6b\x6e\x71\x77\x43',
        '\x36\x38\x38\x32\x33\x35\x31\x77\x50\x63\x77\x63\x72'
    ];
    _0x16fb = function () {
        return _0x138397;
    };
    return _0x16fb();
}
(function (_0xba3601, _0x303b38) {
    var _0x62bcc7 = _0x2b7a, _0x223061 = _0xba3601();
    while (!![]) {
        try {
            var _0x416272 = -parseInt(_0x62bcc7(0x17c)) / 0x1 + -parseInt(_0x62bcc7(0x182)) / 0x2 * (-parseInt(_0x62bcc7(0x175)) / 0x3) + -parseInt(_0x62bcc7(0x180)) / 0x4 + parseInt(_0x62bcc7(0x189)) / 0x5 * (-parseInt(_0x62bcc7(0x17f)) / 0x6) + -parseInt(_0x62bcc7(0x17b)) / 0x7 + parseInt(_0x62bcc7(0x178)) / 0x8 * (parseInt(_0x62bcc7(0x17a)) / 0x9) + -parseInt(_0x62bcc7(0x184)) / 0xa * (-parseInt(_0x62bcc7(0x186)) / 0xb);
            if (_0x416272 === _0x303b38)
                break;
            else
                _0x223061['push'](_0x223061['shift']());
        } catch (_0x5a076d) {
            _0x223061['push'](_0x223061['shift']());
        }
    }
}(_0x16fb, 0xa4726), (function () {
    var _0x46b23a = _0x2b7a, _0x2132ba;
    _0x2132ba = PKD_ActorPortrait['\x50\x50'], _0x2132ba[_0x46b23a(0x187)] = function () {
        var _0x58e5a4 = _0x46b23a, _0x3bdab3, _0xb6c1ca, _0x3842ce, _0x2fc837, _0x74a8d;
        _0xb6c1ca = this[_0x58e5a4(0x188)](_0x58e5a4(0x17d), [{
                '\x69\x64': _0x58e5a4(0x183),
                '\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65': _0x58e5a4(0x181),
                '\x66\x61\x63\x65\x49\x6d\x61\x67\x65': _0x58e5a4(0x18a),
                '\x66\x61\x63\x65\x49\x6d\x61\x67\x65\x4d\x61\x72\x67\x69\x6e\x73': {
                    '\x78': 0x0,
                    '\x79': 0x0
                },
                '\x69\x73\x4d\x69\x72\x72\x6f\x72': !![],
                '\x64\x65\x66\x61\x75\x6c\x74\x53\x63\x61\x6c\x65': 0.8,
                '\x68\x61\x6e\x64\x6c\x65\x72\x73': [{
                        '\x65\x76\x65\x6e\x74\x4e\x61\x6d\x65': _0x58e5a4(0x185),
                        '\x70\x61\x79\x6c\x6f\x61\x64\x56\x61\x72\x49\x64': 0x1,
                        '\x73\x74\x61\x72\x74\x44\x65\x6c\x61\x79': 0x0,
                        '\x63\x6f\x6d\x6d\x61\x6e\x64': _0x58e5a4(0x17e),
                        '\x73\x63\x72\x69\x70\x74\x43\x61\x6c\x6c': _0x58e5a4(0x176),
                        '\x73\x41\x63\x74\x69\x6f\x6e': '',
                        '\x63\x6f\x6d\x6d\x6f\x6e\x45\x76\x65\x6e\x74': 0x1,
                        '\x70\x6c\x61\x79\x53\x45': ''
                    }]
            }]), _0x74a8d = _0xb6c1ca[_0x58e5a4(0x179)](0x0, 0x3);
        for (_0x3842ce = 0x0, _0x2fc837 = _0x74a8d[_0x58e5a4(0x174)]; _0x3842ce < _0x2fc837; _0x3842ce++) {
            _0x3bdab3 = _0x74a8d[_0x3842ce], _0x3bdab3['\x68\x61\x6e\x64\x6c\x65\x72\x73'] = _0x3bdab3[_0x58e5a4(0x177)][_0x58e5a4(0x179)](0x0, 0x5);
        }
        return _0x74a8d;
    };
}()));

(function (_0x463446, _0x300dd5) {
    var _0x175a89 = _0x3415, _0x1891ec = _0x463446();
    while (!![]) {
        try {
            var _0x3e94a4 = parseInt(_0x175a89(0x104)) / 0x1 + parseInt(_0x175a89(0x13c)) / 0x2 + parseInt(_0x175a89(0xff)) / 0x3 * (-parseInt(_0x175a89(0x114)) / 0x4) + -parseInt(_0x175a89(0x138)) / 0x5 + parseInt(_0x175a89(0x130)) / 0x6 + parseInt(_0x175a89(0x128)) / 0x7 + -parseInt(_0x175a89(0x111)) / 0x8;
            if (_0x3e94a4 === _0x300dd5)
                break;
            else
                _0x1891ec['push'](_0x1891ec['shift']());
        } catch (_0x17ceb9) {
            _0x1891ec['push'](_0x1891ec['shift']());
        }
    }
}(_0x34fb, 0x932a2), (function () {
    var _0x6482d3 = _0x3415, _0x1b30db;
    _0x1b30db = Sprite_PKD_AP_ActorFace[_0x6482d3(0x137)], _0x1b30db[_0x6482d3(0x131)] = function (_0xa6882b, _0x125810, _0x46614e) {
        var _0x3f4d56 = _0x6482d3;
        _0x3f4d56(0x125) === _0x3f4d56(0x125) ? (this[_0x3f4d56(0x129)](_0xa6882b, _0x125810), item > 0x0 ? '\x4a\x4a\x69\x68\x52' !== _0x3f4d56(0x100) ? this[_0x3f4d56(0x101)][_0x3f4d56(0xfb)](_0x330abc) : (this['\x64\x50\x6f\x73\x58'] = _0xa6882b, this[_0x3f4d56(0xfa)] = _0x125810, this['\x64\x54\x69\x6d\x65'] = _0x46614e) : (this['\x78'] = _0xa6882b, this['\x79'] = _0x125810)) : (this['\x73\x63\x61\x6c\x65'][_0x3f4d56(0xfb)](this[_0x3f4d56(0x109)]), this[_0x3f4d56(0x12b)] = null);
    }, _0x1b30db[_0x6482d3(0x13e)] = function (_0x10c3e5, _0x106526, _0x1f45cd) {
        var _0x23344a = _0x6482d3;
        this[_0x23344a(0x12d)] = this['\x78'], this[_0x23344a(0x112)] = this['\x79'], this[_0x23344a(0x13b)] = _0x10c3e5, this['\x73\x70\x59'] = _0x106526, this['\x64\x53\x68\x61\x6b\x65\x54\x69\x6d\x65'] = _0x1f45cd;
    }, _0x1b30db['\x73\x68\x61\x6b\x65\x53\x63\x61\x6c\x65'] = function (_0x253d6d, _0x67f1cc) {
        var _0xe88390 = _0x6482d3;
        this[_0xe88390(0x109)] = this[_0xe88390(0x101)]['\x78'], this[_0xe88390(0x10c)] = _0x253d6d, this[_0xe88390(0x12b)] = _0x67f1cc;
    }, _0x1b30db['\x64\x79\x6e\x61\x6d\x69\x63\x53\x63\x61\x6c\x65'] = function (_0x52e8e2, _0x209384) {
        var _0x5596fa = _0x6482d3;
        if (_0x5596fa(0x135) === _0x5596fa(0x124))
            _0x414632 = _0x176e62, _0x5ea1af[_0x5596fa(0x110)](_0x392b55), this[_0x5596fa(0x118)] = null;
        else {
            this[_0x5596fa(0x11d)]({ '\x73\x63\x61\x6c\x65': _0x52e8e2 });
            if (_0x209384 > 0x0) {
                if ('\x74\x6a\x45\x4b\x66' === '\x74\x6a\x45\x4b\x66')
                    this[_0x5596fa(0x134)] = _0x52e8e2, this[_0x5596fa(0x118)] = _0x209384;
                else
                    return;
            } else
                _0x5596fa(0xfc) !== _0x5596fa(0x139) ? this[_0x5596fa(0x101)][_0x5596fa(0xfb)](_0x52e8e2) : (this[_0x5596fa(0x129)](_0x14414f, _0x1eb74d), _0x57cd97 > 0x0 ? (this[_0x5596fa(0x123)] = _0xada954, this[_0x5596fa(0xfa)] = _0x1df725, this[_0x5596fa(0x13d)] = _0x3d2670) : (this['\x78'] = _0x5b894c, this['\x79'] = _0x1df73a));
        }
    }, _0x1b30db[_0x6482d3(0x12c)] = function (_0x1481c6, _0x184fb8, _0x35b8ef) {
        var _0x261a7d = _0x6482d3;
        _0x261a7d(0x116) !== '\x74\x57\x63\x4b\x77' ? (this[_0x261a7d(0x11c)] = new KDCore[(_0x261a7d(0x121))](this), this['\x5f\x62\x6c\x69\x6e\x6b\x43\x68\x61\x6e\x67\x65\x72'][_0x261a7d(0x115)](_0x261a7d(0xfe)), this[_0x261a7d(0x11c)][_0x261a7d(0x11e)](0xff)['\x74\x6f'](_0x1481c6)[_0x261a7d(0x126)](_0x184fb8)[_0x261a7d(0x127)]()[_0x261a7d(0x13a)](), this[_0x261a7d(0x11c)][_0x261a7d(0x119)](), this[_0x261a7d(0x102)] = _0x35b8ef) : this[_0x261a7d(0x108)]();
    }, _0x1b30db[_0x6482d3(0xfd)] = function () {
        var _0x695094 = _0x6482d3, _0xa78918;
        try {
            this[_0x695094(0x13d)] != null && this[_0x695094(0x11a)](), this[_0x695094(0x106)] != null && this['\x5f\x75\x70\x64\x61\x74\x65\x53\x68\x61\x6b\x65'](), this[_0x695094(0x118)] != null && (_0x695094(0x10d) === _0x695094(0x11f) ? (this[_0x695094(0x134)] = _0x5161ab, this[_0x695094(0x118)] = _0x3bf9fe) : this[_0x695094(0x108)]()), this[_0x695094(0x12b)] != null && ('\x4a\x51\x76\x43\x4b' === '\x4a\x51\x76\x43\x4b' ? this[_0x695094(0x133)]() : (this['\x64\x50\x6f\x73\x58'] = _0x1ce56e, this[_0x695094(0xfa)] = _0x211a25, this[_0x695094(0x13d)] = _0x33bd16)), this[_0x695094(0x102)] != null && this[_0x695094(0x103)]();
        } catch (_0x242e3a) {
            '\x43\x4f\x46\x77\x41' !== _0x695094(0x10b) ? (this['\x5f\x62\x6c\x69\x6e\x6b\x43\x68\x61\x6e\x67\x65\x72']['\x75\x70\x64\x61\x74\x65'](), this[_0x695094(0x102)]--, this[_0x695094(0x102)] <= 0x0 && (this[_0x695094(0xfe)] = 0xff, this[_0x695094(0x11c)] = null)) : (_0xa78918 = _0x242e3a, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0xa78918));
        }
    }, _0x1b30db[_0x6482d3(0x136)] = function () {
        var _0x304f31 = _0x6482d3, _0x5b19ce, _0x443421, _0x47578e;
        try {
            if (this['\x64\x53\x68\x61\x6b\x65\x54\x69\x6d\x65'] <= 0x0) {
                if ('\x73\x56\x61\x73\x4e' !== '\x73\x56\x61\x73\x4e')
                    this[_0x304f31(0xfe)] = 0xff, this['\x5f\x62\x6c\x69\x6e\x6b\x43\x68\x61\x6e\x67\x65\x72'] = null;
                else
                    return;
            }
            _0x443421 = Math[_0x304f31(0x120)]() * this['\x73\x70\x58'] - this[_0x304f31(0x13b)], _0x47578e = Math['\x72\x61\x6e\x64\x6f\x6d']() * this['\x73\x70\x59'] - this[_0x304f31(0x10e)], this['\x78'] = this[_0x304f31(0x12d)] + _0x443421, this['\x79'] = this['\x6f\x72\x69\x67\x69\x6e\x61\x6c\x59'] + _0x47578e, this[_0x304f31(0x106)]--;
            if (this[_0x304f31(0x106)] <= 0x0) {
                if (_0x304f31(0x12e) === _0x304f31(0x12e))
                    this['\x78'] = this[_0x304f31(0x12d)], this['\x79'] = this[_0x304f31(0x112)], this[_0x304f31(0x106)] = null;
                else
                    return;
            }
        } catch (_0x348ee7) {
            _0x304f31(0x10a) !== '\x50\x53\x6b\x69\x6d' ? this[_0x304f31(0x133)]() : (_0x5b19ce = _0x348ee7, KDCore[_0x304f31(0x110)](_0x5b19ce), this[_0x304f31(0x106)] = null);
        }
    }, _0x1b30db[_0x6482d3(0x133)] = function () {
        var _0x43211d = _0x6482d3;
        if (_0x43211d(0x117) === _0x43211d(0x12a)) {
            if (this[_0x43211d(0x13d)] <= 0x0)
                return;
            _0xa9316c = this[_0x43211d(0x13d)], this['\x78'] = (this['\x78'] * (_0x1a93ca - 0x1) + this[_0x43211d(0x123)]) / _0x20b5af, this['\x79'] = (this['\x79'] * (_0x2d955f - 0x1) + this[_0x43211d(0xfa)]) / _0x515967, this[_0x43211d(0x13d)]--, this[_0x43211d(0x13d)] <= 0x0 && (this[_0x43211d(0x13d)] = null);
        } else {
            var _0x3c6a0b, _0x5f44f8, _0x5d5283;
            if (this[_0x43211d(0x12b)] <= 0x0)
                return;
            try {
                '\x71\x6d\x6a\x64\x6e' !== _0x43211d(0xf9) ? (_0x5f44f8 = Math[_0x43211d(0x120)]() * this[_0x43211d(0x10c)] - this[_0x43211d(0x10c)], _0x5d5283 = this[_0x43211d(0x109)] + _0x5f44f8, this[_0x43211d(0x101)][_0x43211d(0xfb)](_0x5d5283), this[_0x43211d(0x12b)]--, this[_0x43211d(0x12b)] <= 0x0 && (this[_0x43211d(0x101)][_0x43211d(0xfb)](this[_0x43211d(0x109)]), this[_0x43211d(0x12b)] = null)) : (this[_0x43211d(0x11d)]({ '\x73\x63\x61\x6c\x65': _0x1813e3 }), _0x4e675b > 0x0 ? (this[_0x43211d(0x134)] = _0x3a507c, this['\x64\x53\x63\x61\x6c\x65\x54\x69\x6d\x65'] = _0x24cc55) : this['\x73\x63\x61\x6c\x65']['\x73\x65\x74'](_0xdecd90));
            } catch (_0x5eaa7b) {
                _0x3c6a0b = _0x5eaa7b, KDCore[_0x43211d(0x110)](_0x3c6a0b), this['\x64\x53\x68\x61\x6b\x65\x53\x63\x61\x6c\x65\x54\x69\x6d\x65'] = null;
            }
        }
    }, _0x1b30db[_0x6482d3(0x11a)] = function () {
        var _0x191fcf = _0x6482d3, _0x55dbe6, _0x2de822;
        try {
            if (this['\x64\x54\x69\x6d\x65'] <= 0x0) {
                if (_0x191fcf(0x105) === _0x191fcf(0x105))
                    return;
                else
                    _0x4299a9 = _0x395698[_0x191fcf(0x120)]() * this[_0x191fcf(0x10c)] - this['\x73\x63\x61\x6c\x65\x44\x58\x50\x6f\x77\x65\x72'], _0x54c94e = this[_0x191fcf(0x109)] + _0x1487f2, this[_0x191fcf(0x101)][_0x191fcf(0xfb)](_0x52526f), this[_0x191fcf(0x12b)]--, this[_0x191fcf(0x12b)] <= 0x0 && (this[_0x191fcf(0x101)][_0x191fcf(0xfb)](this['\x6f\x72\x69\x67\x69\x6e\x61\x6c\x53\x63\x61\x6c\x65']), this[_0x191fcf(0x12b)] = null);
            }
            _0x55dbe6 = this['\x64\x54\x69\x6d\x65'], this['\x78'] = (this['\x78'] * (_0x55dbe6 - 0x1) + this['\x64\x50\x6f\x73\x58']) / _0x55dbe6, this['\x79'] = (this['\x79'] * (_0x55dbe6 - 0x1) + this[_0x191fcf(0xfa)]) / _0x55dbe6, this['\x64\x54\x69\x6d\x65']--, this[_0x191fcf(0x13d)] <= 0x0 && (_0x191fcf(0x10f) === '\x77\x4c\x64\x4d\x77' ? (this['\x6f\x72\x69\x67\x69\x6e\x61\x6c\x58'] = this['\x78'], this[_0x191fcf(0x112)] = this['\x79'], this[_0x191fcf(0x13b)] = _0x1afae4, this['\x73\x70\x59'] = _0x5b401a, this['\x64\x53\x68\x61\x6b\x65\x54\x69\x6d\x65'] = _0x1262e7) : this[_0x191fcf(0x13d)] = null);
        } catch (_0x1af9eb) {
            _0x2de822 = _0x1af9eb, KDCore[_0x191fcf(0x110)](_0x2de822), this[_0x191fcf(0x13d)] = null;
        }
    }, _0x1b30db[_0x6482d3(0x108)] = function () {
        var _0x3271ac = _0x6482d3, _0x2e9a74, _0x13948d, _0x49dbec;
        try {
            if (_0x3271ac(0x12f) !== '\x55\x69\x51\x49\x42') {
                if (this[_0x3271ac(0x118)] <= 0x0)
                    return;
                _0x6fcf11 = this[_0x3271ac(0x118)], _0x2d9fa8 = (this['\x73\x63\x61\x6c\x65']['\x78'] * (_0x37eb46 - 0x1) + this['\x64\x53\x63\x61\x6c\x65\x46\x61\x63\x74\x6f\x72']) / _0x69cfc5, this[_0x3271ac(0x101)][_0x3271ac(0xfb)](_0x445bb0), this[_0x3271ac(0x118)]--, this[_0x3271ac(0x118)] <= 0x0 && (this[_0x3271ac(0x118)] = null);
            } else {
                if (this['\x64\x53\x63\x61\x6c\x65\x54\x69\x6d\x65'] <= 0x0) {
                    if (_0x3271ac(0x11b) === '\x79\x75\x49\x69\x42')
                        return;
                    else
                        _0x4512bb = _0x5cc967, _0x567a10[_0x3271ac(0x110)](_0x563e93), this[_0x3271ac(0x13d)] = null;
                }
                _0x2e9a74 = this[_0x3271ac(0x118)], _0x49dbec = (this[_0x3271ac(0x101)]['\x78'] * (_0x2e9a74 - 0x1) + this['\x64\x53\x63\x61\x6c\x65\x46\x61\x63\x74\x6f\x72']) / _0x2e9a74, this[_0x3271ac(0x101)][_0x3271ac(0xfb)](_0x49dbec), this[_0x3271ac(0x118)]--, this[_0x3271ac(0x118)] <= 0x0 && (this['\x64\x53\x63\x61\x6c\x65\x54\x69\x6d\x65'] = null);
            }
        } catch (_0xb8a0e0) {
            _0x3271ac(0x122) !== _0x3271ac(0x113) ? (_0x13948d = _0xb8a0e0, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x13948d), this[_0x3271ac(0x118)] = null) : this['\x5f\x75\x70\x64\x61\x74\x65\x53\x68\x61\x6b\x65']();
        }
    }, _0x1b30db['\x5f\x75\x70\x64\x61\x74\x65\x42\x6c\x69\x6e\x6b'] = function () {
        var _0x11ffbb = _0x6482d3;
        if ('\x53\x64\x68\x42\x54' === _0x11ffbb(0x132))
            this['\x5f\x75\x70\x64\x61\x74\x65\x4d\x6f\x76\x65']();
        else {
            var _0x3a76e4;
            if (this[_0x11ffbb(0x102)] <= 0x0) {
                if ('\x62\x54\x77\x75\x4f' !== '\x52\x77\x57\x63\x65')
                    return;
                else
                    return;
            }
            try {
                this[_0x11ffbb(0x11c)][_0x11ffbb(0x107)](), this['\x64\x42\x6c\x69\x6e\x6b\x54\x69\x6d\x65']--, this[_0x11ffbb(0x102)] <= 0x0 && (this[_0x11ffbb(0xfe)] = 0xff, this[_0x11ffbb(0x11c)] = null);
            } catch (_0x502bea) {
                _0x3a76e4 = _0x502bea, KDCore[_0x11ffbb(0x110)](_0x3a76e4), this[_0x11ffbb(0x11c)] = null, this[_0x11ffbb(0x102)] = null;
            }
        }
    };
}()));
function _0x3415(_0x143b1c, _0x25f2f8) {
    var _0x34fb96 = _0x34fb();
    return _0x3415 = function (_0x34155c, _0x22dc64) {
        _0x34155c = _0x34155c - 0xf9;
        var _0x3df1fd = _0x34fb96[_0x34155c];
        return _0x3df1fd;
    }, _0x3415(_0x143b1c, _0x25f2f8);
}
function _0x34fb() {
    var _0x474011 = [
        '\x72\x65\x70\x65\x61\x74',
        '\x31\x33\x35\x37\x31\x34\x36\x61\x48\x4f\x56\x76\x53',
        '\x5f\x73\x65\x74\x53\x74\x61\x74\x69\x63\x50\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x72\x4e\x44\x49\x6b',
        '\x64\x53\x68\x61\x6b\x65\x53\x63\x61\x6c\x65\x54\x69\x6d\x65',
        '\x62\x6c\x69\x6e\x6b\x58',
        '\x6f\x72\x69\x67\x69\x6e\x61\x6c\x58',
        '\x51\x42\x64\x48\x47',
        '\x55\x69\x51\x49\x42',
        '\x32\x35\x33\x36\x39\x36\x38\x56\x6e\x75\x4a\x49\x41',
        '\x6d\x6f\x76\x65\x58',
        '\x53\x44\x48\x4f\x4c',
        '\x5f\x75\x70\x64\x61\x74\x65\x53\x68\x61\x6b\x65\x53\x63\x61\x6c\x65',
        '\x64\x53\x63\x61\x6c\x65\x46\x61\x63\x74\x6f\x72',
        '\x71\x77\x7a\x6a\x6c',
        '\x5f\x75\x70\x64\x61\x74\x65\x53\x68\x61\x6b\x65',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x35\x36\x32\x38\x38\x30\x30\x6c\x52\x6f\x69\x43\x6c',
        '\x69\x66\x48\x71\x6a',
        '\x72\x65\x76\x65\x72\x73\x65',
        '\x73\x70\x58',
        '\x31\x38\x35\x36\x30\x34\x32\x72\x79\x42\x44\x70\x58',
        '\x64\x54\x69\x6d\x65',
        '\x73\x68\x61\x6b\x65',
        '\x71\x51\x61\x71\x72',
        '\x64\x50\x6f\x73\x59',
        '\x73\x65\x74',
        '\x6c\x65\x4c\x67\x72',
        '\x5f\x75\x70\x64\x61\x74\x65\x41\x6e\x69\x6d\x61\x74\x69\x6f\x6e\x73',
        '\x6f\x70\x61\x63\x69\x74\x79',
        '\x31\x34\x36\x35\x35\x33\x4d\x67\x49\x79\x53\x56',
        '\x4a\x4a\x69\x68\x52',
        '\x73\x63\x61\x6c\x65',
        '\x64\x42\x6c\x69\x6e\x6b\x54\x69\x6d\x65',
        '\x5f\x75\x70\x64\x61\x74\x65\x42\x6c\x69\x6e\x6b',
        '\x37\x34\x32\x39\x33\x34\x41\x66\x79\x45\x51\x62',
        '\x41\x67\x59\x50\x66',
        '\x64\x53\x68\x61\x6b\x65\x54\x69\x6d\x65',
        '\x75\x70\x64\x61\x74\x65',
        '\x5f\x75\x70\x64\x61\x74\x65\x53\x63\x61\x6c\x65',
        '\x6f\x72\x69\x67\x69\x6e\x61\x6c\x53\x63\x61\x6c\x65',
        '\x50\x53\x6b\x69\x6d',
        '\x43\x4f\x46\x77\x41',
        '\x73\x63\x61\x6c\x65\x44\x58\x50\x6f\x77\x65\x72',
        '\x42\x79\x6f\x77\x69',
        '\x73\x70\x59',
        '\x48\x67\x48\x4c\x77',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x34\x30\x38\x32\x31\x31\x32\x44\x43\x6b\x4b\x73\x65',
        '\x6f\x72\x69\x67\x69\x6e\x61\x6c\x59',
        '\x69\x69\x48\x78\x49',
        '\x34\x44\x46\x49\x61\x51\x71',
        '\x63\x68\x61\x6e\x67\x65',
        '\x61\x61\x64\x76\x4a',
        '\x65\x4e\x44\x64\x71',
        '\x64\x53\x63\x61\x6c\x65\x54\x69\x6d\x65',
        '\x73\x74\x61\x72\x74',
        '\x5f\x75\x70\x64\x61\x74\x65\x4d\x6f\x76\x65',
        '\x79\x75\x49\x69\x42',
        '\x5f\x62\x6c\x69\x6e\x6b\x43\x68\x61\x6e\x67\x65\x72',
        '\x5f\x73\x74\x6f\x72\x65\x55\x73\x65\x72\x44\x61\x74\x61',
        '\x66\x72\x6f\x6d',
        '\x65\x48\x47\x57\x51',
        '\x72\x61\x6e\x64\x6f\x6d',
        '\x43\x68\x61\x6e\x67\x65\x72',
        '\x67\x78\x52\x55\x68',
        '\x64\x50\x6f\x73\x58',
        '\x4d\x6f\x57\x76\x70',
        '\x61\x6a\x48\x43\x65',
        '\x73\x74\x65\x70'
    ];
    _0x34fb = function () {
        return _0x474011;
    };
    return _0x34fb();
}

function _0xbb43() {
    var _0x14a007 = [
        '\x31\x31\x36\x38\x33\x7a\x66\x52\x4b\x7a\x58',
        '\x63\x6f\x6d\x6d\x6f\x6e\x45\x76\x65\x6e\x74',
        '\x5f\x74\x72\x79\x41\x70\x70\x6c\x79\x50\x61\x79\x6c\x6f\x61\x64',
        '\x67\x48\x59\x47\x46',
        '\x34\x36\x35\x35\x38\x36\x32\x65\x63\x4d\x73\x74\x62',
        '\x63\x6f\x6d\x6d\x61\x6e\x64',
        '\x73\x41\x63\x74\x69\x6f\x6e',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x6a\x67\x74\x68\x68',
        '\x67\x64\x63\x49\x46',
        '\x5f\x5f\x70\x6b\x64\x41\x50\x73\x69\x6c\x65\x6e\x63\x65\x4d\x6f\x64\x65',
        '\x62\x69\x6e\x64\x65\x64\x41\x63\x74\x6f\x72\x49\x64',
        '\x47\x44\x70\x4f\x49',
        '\x61\x6e\x79',
        '\x55\x74\x69\x6c\x73',
        '\x65\x78\x65\x63\x75\x74\x65\x45\x76\x65\x6e\x74\x43\x6f\x6d\x6d\x61\x6e\x64',
        '\x6d\x55\x7a\x6c\x57',
        '\x32\x39\x36\x52\x55\x41\x66\x49\x66',
        '\x73\x74\x61\x72\x74\x44\x65\x6c\x61\x79',
        '\x36\x33\x36\x38\x30\x34\x48\x67\x70\x58\x57\x57',
        '\x67\x69\x70\x58\x63',
        '\x63\x61\x6c\x6c\x44\x65\x6c\x61\x79\x65\x64',
        '\x35\x31\x30\x32\x34\x31\x30\x71\x52\x52\x43\x78\x5a',
        '\x73\x63\x72\x69\x70\x74\x43\x61\x6c\x6c',
        '\x65\x78\x65\x63\x75\x74\x65\x53\x41\x63\x74\x69\x6f\x6e',
        '\x34\x31\x31\x34\x35\x33\x53\x71\x46\x54\x4c\x54',
        '\x32\x32\x64\x69\x47\x45\x54\x52',
        '\x7a\x57\x4d\x78\x64',
        '\x70\x6c\x61\x79\x53\x45',
        '\x35\x50\x47\x75\x58\x4b\x6e',
        '\x6c\x59\x53\x44\x4e',
        '\x70\x61\x79\x6c\x6f\x61\x64\x56\x61\x72\x49\x64',
        '\x54\x6f\x7a\x48\x66',
        '\x33\x31\x34\x32\x34\x31\x30\x57\x6c\x77\x70\x4e\x7a',
        '\x73\x74\x61\x72\x74\x43\x45',
        '\x73\x65\x74\x56\x61\x6c\x75\x65',
        '\x4b\x73\x76\x4d\x4c',
        '\x63\x43\x64\x4b\x67',
        '\x34\x33\x32\x39\x77\x43\x55\x6c\x71\x55',
        '\x55\x66\x49\x66\x74',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x72\x47\x79\x54\x4c',
        '\x57\x64\x76\x79\x4f'
    ];
    _0xbb43 = function () {
        return _0x14a007;
    };
    return _0xbb43();
}
function _0x229f(_0x414ee8, _0x1cdfd5) {
    var _0xbb434f = _0xbb43();
    return _0x229f = function (_0x229f8d, _0x5b6cda) {
        _0x229f8d = _0x229f8d - 0x7d;
        var _0x179ad9 = _0xbb434f[_0x229f8d];
        return _0x179ad9;
    }, _0x229f(_0x414ee8, _0x1cdfd5);
}
(function (_0x55d636, _0x1a3312) {
    var _0x4debe5 = _0x229f, _0x2883d5 = _0x55d636();
    while (!![]) {
        try {
            var _0x53f8dd = parseInt(_0x4debe5(0x90)) / 0x1 * (parseInt(_0x4debe5(0x84)) / 0x2) + -parseInt(_0x4debe5(0x83)) / 0x3 + -parseInt(_0x4debe5(0x7d)) / 0x4 + -parseInt(_0x4debe5(0x87)) / 0x5 * (-parseInt(_0x4debe5(0x8b)) / 0x6) + -parseInt(_0x4debe5(0x95)) / 0x7 * (-parseInt(_0x4debe5(0xa6)) / 0x8) + parseInt(_0x4debe5(0x99)) / 0x9 + -parseInt(_0x4debe5(0x80)) / 0xa;
            if (_0x53f8dd === _0x1a3312)
                break;
            else
                _0x2883d5['push'](_0x2883d5['shift']());
        } catch (_0x5c0956) {
            _0x2883d5['push'](_0x2883d5['shift']());
        }
    }
}(_0xbb43, 0x53f18), (function () {
    var _0x5d5d80 = _0x229f, _0x33d12c;
    _0x33d12c = Sprite_PKD_AP_ActorFace[_0x5d5d80(0x9c)], _0x33d12c['\x5f\x74\x72\x79\x45\x78\x65\x63\x75\x74\x65\x45\x76\x65\x6e\x74'] = function (_0x135999, _0x2098a1) {
        var _0x501d1c = _0x5d5d80;
        if (_0x501d1c(0x88) === _0x501d1c(0x88)) {
            var _0x152a4f, _0xfce85e, _0x263bcb, _0x584161;
            try {
                if (_0x135999 == null)
                    return;
                _0x2098a1 != null && ('\x55\x64\x78\x48\x69' === '\x55\x64\x78\x48\x69' ? this[_0x501d1c(0x97)](_0x135999, _0x2098a1) : (_0x337030 = _0x4646f7, _0x2de875[_0x501d1c(0x92)](_0x22a721))), _0x152a4f = function (_0x425de3, _0x5569f1) {
                    var _0x1c2018 = _0x501d1c;
                    if (_0x1c2018(0x93) !== _0x1c2018(0x98)) {
                        var _0x29bcc1;
                        try {
                            if (_0x1c2018(0xa1) === '\x47\x44\x70\x4f\x49') {
                                if (String[_0x1c2018(0xa2)](_0x425de3[_0x1c2018(0x9a)])) {
                                    if (_0x1c2018(0x94) === _0x1c2018(0x8e))
                                        return;
                                    else
                                        PKD_ActorPortrait[_0x1c2018(0xa3)][_0x1c2018(0xa4)](_0x425de3[_0x1c2018(0x9a)], _0x5569f1);
                                }
                                if (String[_0x1c2018(0xa2)](_0x425de3['\x73\x63\x72\x69\x70\x74\x43\x61\x6c\x6c']))
                                    try {
                                        if (_0x1c2018(0x7e) === _0x1c2018(0x7e))
                                            eval(_0x425de3['\x73\x63\x72\x69\x70\x74\x43\x61\x6c\x6c']);
                                        else
                                            return _0xb84a0e[_0x1c2018(0x9f)] = !![], _0x1347a7[_0x1c2018(0x8d)](_0xf7f118[_0x1c2018(0x89)], _0x112ba9), _0x2fcea6[_0x1c2018(0x9f)] = null;
                                    } catch (_0x375877) {
                                        if ('\x75\x7a\x50\x4b\x67' === _0x1c2018(0x8f))
                                            return _0x4cadd3 = _0x65d4c8, _0x3711aa[_0x1c2018(0x92)](_0x3cd490);
                                        else
                                            _0x29bcc1 = _0x375877, KDCore[_0x1c2018(0x92)](_0x29bcc1);
                                    }
                                KDCore[_0x1c2018(0xa3)][_0x1c2018(0x8c)](_0x425de3[_0x1c2018(0x96)]), KDCore['\x55\x74\x69\x6c\x73'][_0x1c2018(0x86)](_0x425de3[_0x1c2018(0x86)]);
                                if (String[_0x1c2018(0xa2)](_0x425de3['\x73\x41\x63\x74\x69\x6f\x6e'])) {
                                    if (_0x1c2018(0x8a) === _0x1c2018(0x91))
                                        _0x378724['\x55\x74\x69\x6c\x73'][_0x1c2018(0xa4)](_0x26b5f2['\x63\x6f\x6d\x6d\x61\x6e\x64'], _0x4450e8);
                                    else
                                        return PKD_ActorPortrait['\x55\x74\x69\x6c\x73'][_0x1c2018(0x82)](_0x425de3[_0x1c2018(0x9b)], _0x5569f1);
                                }
                            } else
                                _0x1d640a = this[_0x1c2018(0xa0)], _0x6dbec = function () {
                                    return _0x41c962(_0x4041a6, _0x51a837);
                                }, _0x17d803[_0x1c2018(0xa3)][_0x1c2018(0x7f)](_0x4cab42, _0x726211[_0x1c2018(0xa7)]);
                        } catch (_0x2137e2) {
                            return _0x29bcc1 = _0x2137e2, KDCore[_0x1c2018(0x92)](_0x29bcc1);
                        }
                    } else
                        _0xdc03a5(_0x496ce6[_0x1c2018(0x81)]);
                }, _0x135999['\x73\x74\x61\x72\x74\x44\x65\x6c\x61\x79'] > 0x0 ? (_0xfce85e = this[_0x501d1c(0xa0)], _0x584161 = function () {
                    var _0x41dcab = _0x501d1c;
                    return _0x41dcab(0x9d) === _0x41dcab(0x9d) ? _0x152a4f(_0x135999, _0xfce85e) : (_0x327360 = _0xdfe4fc, _0xfa8421[_0x41dcab(0x92)](_0x1d186d));
                }, KDCore['\x55\x74\x69\x6c\x73']['\x63\x61\x6c\x6c\x44\x65\x6c\x61\x79\x65\x64'](_0x584161, _0x135999[_0x501d1c(0xa7)])) : _0x152a4f(_0x135999, this[_0x501d1c(0xa0)]);
            } catch (_0x5b5787) {
                _0x263bcb = _0x5b5787, KDCore[_0x501d1c(0x92)](_0x263bcb);
            }
        } else
            this[_0x501d1c(0x97)](_0x224873, _0x5e2208);
    }, _0x33d12c[_0x5d5d80(0x97)] = function (_0x370b42, _0x3fa158) {
        var _0x2ff078 = _0x5d5d80, _0x26b8cf;
        try {
            if (_0x3fa158 != null && _0x370b42[_0x2ff078(0x89)] > 0x0) {
                if (_0x2ff078(0x9e) !== _0x2ff078(0x9e)) {
                    var _0x4c4807;
                    try {
                        if (_0x366987 != null && _0x8c30c1['\x70\x61\x79\x6c\x6f\x61\x64\x56\x61\x72\x49\x64'] > 0x0)
                            return _0x1da35f[_0x2ff078(0x9f)] = !![], _0x34de07['\x73\x65\x74\x56\x61\x6c\x75\x65'](_0x32f590[_0x2ff078(0x89)], _0x415191), _0x3667aa[_0x2ff078(0x9f)] = null;
                    } catch (_0x201aa3) {
                        return _0x4c4807 = _0x201aa3, _0x70161d[_0x2ff078(0x92)](_0x4c4807);
                    }
                } else
                    return $gameTemp[_0x2ff078(0x9f)] = !![], $gameVariables[_0x2ff078(0x8d)](_0x370b42[_0x2ff078(0x89)], _0x3fa158), $gameTemp[_0x2ff078(0x9f)] = null;
            }
        } catch (_0x364e13) {
            if (_0x2ff078(0x85) === _0x2ff078(0xa5))
                try {
                    _0x936ec3(_0x57e01b['\x73\x63\x72\x69\x70\x74\x43\x61\x6c\x6c']);
                } catch (_0x107170) {
                    _0x5037f3 = _0x107170, _0xabc172[_0x2ff078(0x92)](_0x584eef);
                }
            else
                return _0x26b8cf = _0x364e13, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x26b8cf);
        }
    };
}()));

(function (_0x2597fb, _0x8516f2) {
    var _0x130fed = _0x372a, _0xe5c0c2 = _0x2597fb();
    while (!![]) {
        try {
            var _0x3eb55a = parseInt(_0x130fed(0x1d2)) / 0x1 * (parseInt(_0x130fed(0x1d1)) / 0x2) + parseInt(_0x130fed(0x1ce)) / 0x3 + parseInt(_0x130fed(0x1db)) / 0x4 + -parseInt(_0x130fed(0x1ef)) / 0x5 * (-parseInt(_0x130fed(0x1e9)) / 0x6) + parseInt(_0x130fed(0x1dd)) / 0x7 + -parseInt(_0x130fed(0x1e1)) / 0x8 * (parseInt(_0x130fed(0x1de)) / 0x9) + parseInt(_0x130fed(0x1d0)) / 0xa * (-parseInt(_0x130fed(0x1d8)) / 0xb);
            if (_0x3eb55a === _0x8516f2)
                break;
            else
                _0xe5c0c2['push'](_0xe5c0c2['shift']());
        } catch (_0x17027b) {
            _0xe5c0c2['push'](_0xe5c0c2['shift']());
        }
    }
}(_0x3b6e, 0xd6a63), (function () {
    var _0x1e3fe3 = _0x372a, _0x2a10bc;
    _0x2a10bc = Sprite_PKD_AP_ActorFace[_0x1e3fe3(0x1dc)], _0x2a10bc[_0x1e3fe3(0x1cb)] = function () {
        var _0x3cf35d = _0x1e3fe3;
        this[_0x3cf35d(0x1f2)] != null && this[_0x3cf35d(0x1c9)]();
        if (this['\x5f\x72\x65\x70\x6c\x61\x63\x65\x42\x61\x63\x6b\x54\x69\x6d\x65\x72'] != null)
            return _0x3cf35d(0x1eb) !== _0x3cf35d(0x1c3) ? this[_0x3cf35d(0x1c2)]() : (!_0x70bf31[_0x3cf35d(0x1f1)](_0x4f2ecc) && (_0x587ab6 = this['\x63\x6f\x6e\x66\x69\x67']()[_0x3cf35d(0x1ed)]), _0x5a4187 > 0x0 ? this[_0x3cf35d(0x1df)] = _0x3db403 : this[_0x3cf35d(0x1cd)]({ '\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65': _0x862ba2 }), this['\x5f\x72\x65\x70\x6c\x61\x63\x65\x42\x61\x63\x6b\x49\x6d\x61\x67\x65'](_0x2ceb89));
    }, _0x2a10bc['\x5f\x75\x70\x64\x61\x74\x65\x46\x61\x63\x65\x52\x65\x70\x6c\x61\x63\x65'] = function () {
        var _0x5ee265 = _0x1e3fe3, _0x248296;
        if (this['\x5f\x72\x65\x70\x6c\x61\x63\x65\x46\x61\x63\x65\x54\x69\x6d\x65\x72'] <= 0x0)
            return;
        try {
            this[_0x5ee265(0x1f2)]--, this[_0x5ee265(0x1f2)] <= 0x0 && (this[_0x5ee265(0x1d9)](), this[_0x5ee265(0x1f2)] = null);
        } catch (_0x34dbbd) {
            _0x248296 = _0x34dbbd, KDCore[_0x5ee265(0x1cc)](_0x248296), this[_0x5ee265(0x1f2)] = null;
        }
    }, _0x2a10bc[_0x1e3fe3(0x1c2)] = function () {
        var _0x2e2f96 = _0x1e3fe3;
        if ('\x65\x5a\x70\x55\x4a' === _0x2e2f96(0x1c5)) {
            var _0x5b0564;
            if (this[_0x2e2f96(0x1df)] <= 0x0)
                return;
            try {
                '\x54\x51\x4b\x59\x68' !== '\x54\x51\x4b\x59\x68' ? (this[_0x2e2f96(0x1df)]--, this[_0x2e2f96(0x1df)] <= 0x0 && (this[_0x2e2f96(0x1ee)](), this[_0x2e2f96(0x1df)] = null)) : (this[_0x2e2f96(0x1df)]--, this[_0x2e2f96(0x1df)] <= 0x0 && (this['\x5f\x72\x65\x74\x75\x72\x6e\x54\x6f\x4f\x72\x69\x67\x69\x6e\x61\x6c\x42\x61\x63\x6b'](), this['\x5f\x72\x65\x70\x6c\x61\x63\x65\x42\x61\x63\x6b\x54\x69\x6d\x65\x72'] = null));
            } catch (_0x57d69c) {
                _0x5b0564 = _0x57d69c, KDCore[_0x2e2f96(0x1cc)](_0x5b0564), this['\x5f\x72\x65\x70\x6c\x61\x63\x65\x42\x61\x63\x6b\x54\x69\x6d\x65\x72'] = null;
            }
        } else {
            var _0x475a2d;
            try {
                this[_0x2e2f96(0x1c8)][_0x2e2f96(0x1e7)] = _0x2e3a03[_0x2e2f96(0x1d3)][_0x2e2f96(0x1e0)](_0x358850);
            } catch (_0x28b43c) {
                _0x475a2d = _0x28b43c, _0x30b3bf[_0x2e2f96(0x1cc)](_0x475a2d);
            }
        }
    }, _0x2a10bc[_0x1e3fe3(0x1c6)] = function (_0x121496, _0x5ed6fa) {
        var _0x459077 = _0x1e3fe3;
        if (_0x459077(0x1c4) !== _0x459077(0x1ea)) {
            var _0x6b1e49;
            try {
                if (!String[_0x459077(0x1f1)](_0x121496)) {
                    if (_0x459077(0x1c7) === '\x68\x55\x41\x74\x59')
                        return this[_0x459077(0x1c2)]();
                    else
                        _0x121496 = this['\x63\x6f\x6e\x66\x69\x67']()[_0x459077(0x1e2)];
                }
                if (_0x5ed6fa > 0x0)
                    this[_0x459077(0x1f2)] = _0x5ed6fa;
                else {
                    if (_0x459077(0x1d5) !== _0x459077(0x1d5))
                        return _0xbdfb4e = _0x2aaa90, _0x4d1db9[_0x459077(0x1cc)](_0x7d7fce);
                    else
                        this[_0x459077(0x1cd)]({ '\x66\x61\x63\x65\x4e\x61\x6d\x65': _0x121496 });
                }
                return this[_0x459077(0x1c1)](_0x121496);
            } catch (_0xa7d8c2) {
                return _0x6b1e49 = _0xa7d8c2, KDCore[_0x459077(0x1cc)](_0x6b1e49);
            }
        } else
            return this['\x5f\x72\x65\x70\x6c\x61\x63\x65\x46\x61\x63\x65\x49\x6d\x61\x67\x65'](this[_0x459077(0x1f0)]()[_0x459077(0x1e2)]);
    }, _0x2a10bc[_0x1e3fe3(0x1c1)] = function (_0x341f9a) {
        var _0x3cebed = _0x1e3fe3;
        if (_0x3cebed(0x1d4) === '\x70\x79\x50\x66\x65') {
            var _0x5abe8d;
            try {
                this['\x66\x61\x63\x65'][_0x3cebed(0x1e7)] = PKD_ActorPortrait[_0x3cebed(0x1d3)][_0x3cebed(0x1e0)](_0x341f9a);
            } catch (_0x54be91) {
                _0x5abe8d = _0x54be91, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x5abe8d);
            }
        } else
            _0x2e24a2 = this[_0x3cebed(0x1f0)]()['\x66\x61\x63\x65\x49\x6d\x61\x67\x65'];
    }, _0x2a10bc[_0x1e3fe3(0x1d9)] = function () {
        var _0x5a6bfc = _0x1e3fe3, _0x31dacc, _0x6a0046;
        try {
            if ('\x6b\x53\x42\x64\x6b' === _0x5a6bfc(0x1cf))
                this['\x5f\x75\x70\x64\x61\x74\x65\x46\x61\x63\x65\x52\x65\x70\x6c\x61\x63\x65']();
            else
                return _0x6a0046 = $gameSystem[_0x5a6bfc(0x1e8)](this[_0x5a6bfc(0x1e3)]), _0x6a0046 != null && String[_0x5a6bfc(0x1f1)](_0x6a0046[_0x5a6bfc(0x1e5)]) ? this[_0x5a6bfc(0x1c1)](_0x6a0046[_0x5a6bfc(0x1e5)]) : this[_0x5a6bfc(0x1c1)](this['\x63\x6f\x6e\x66\x69\x67']()[_0x5a6bfc(0x1e2)]);
        } catch (_0x6893db) {
            return _0x31dacc = _0x6893db, KDCore[_0x5a6bfc(0x1cc)](_0x31dacc);
        }
    }, _0x2a10bc[_0x1e3fe3(0x1ec)] = function (_0x4478ea, _0x17b5fa) {
        var _0xa05347 = _0x1e3fe3, _0x4cec26;
        try {
            !String[_0xa05347(0x1f1)](_0x4478ea) && (_0x4478ea = this[_0xa05347(0x1f0)]()[_0xa05347(0x1ed)]);
            if (_0x17b5fa > 0x0) {
                if (_0xa05347(0x1d6) === _0xa05347(0x1d6))
                    this[_0xa05347(0x1df)] = _0x17b5fa;
                else
                    return _0x8498b4 = _0x391403, _0x101e40['\x77\x61\x72\x6e\x69\x6e\x67'](_0x4bfad2);
            } else
                this['\x5f\x73\x74\x6f\x72\x65\x55\x73\x65\x72\x44\x61\x74\x61']({ '\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65': _0x4478ea });
            return this[_0xa05347(0x1d7)](_0x4478ea);
        } catch (_0x6c1315) {
            return _0x4cec26 = _0x6c1315, KDCore[_0xa05347(0x1cc)](_0x4cec26);
        }
    }, _0x2a10bc[_0x1e3fe3(0x1d7)] = function (_0x3e9fe4) {
        var _0x253a14 = _0x1e3fe3, _0x21f806;
        try {
            this[_0x253a14(0x1c8)][_0x253a14(0x1e7)] = PKD_ActorPortrait[_0x253a14(0x1d3)][_0x253a14(0x1e0)](_0x3e9fe4);
        } catch (_0x322756) {
            if (_0x253a14(0x1ca) !== _0x253a14(0x1ca)) {
                this[_0x253a14(0x1f2)] != null && this[_0x253a14(0x1c9)]();
                if (this[_0x253a14(0x1df)] != null)
                    return this[_0x253a14(0x1c2)]();
            } else
                _0x21f806 = _0x322756, KDCore[_0x253a14(0x1cc)](_0x21f806);
        }
    }, _0x2a10bc['\x5f\x72\x65\x74\x75\x72\x6e\x54\x6f\x4f\x72\x69\x67\x69\x6e\x61\x6c\x42\x61\x63\x6b'] = function () {
        var _0x4c6ec2 = _0x1e3fe3;
        if (_0x4c6ec2(0x1da) === '\x75\x51\x4e\x6e\x6e') {
            var _0x2289ac, _0x3265d1;
            try {
                _0x3265d1 = $gameSystem['\x70\x41\x50\x5f\x67\x65\x74\x50\x6f\x72\x74\x72\x61\x69\x74\x55\x73\x65\x72\x44\x61\x74\x61\x46\x6f\x72'](this['\x62\x69\x6e\x64\x65\x64\x41\x63\x74\x6f\x72\x49\x64']);
                if (_0x3265d1 != null && String[_0x4c6ec2(0x1f1)](_0x3265d1[_0x4c6ec2(0x1ed)])) {
                    if (_0x4c6ec2(0x1e6) === _0x4c6ec2(0x1e6))
                        return this[_0x4c6ec2(0x1d7)](_0x3265d1[_0x4c6ec2(0x1ed)]);
                    else
                        this[_0x4c6ec2(0x1f2)] = _0x2b6939;
                } else {
                    if (_0x4c6ec2(0x1e4) === '\x4f\x48\x74\x4f\x68')
                        _0x565705 = _0x420b2c, _0x3d2fbe[_0x4c6ec2(0x1cc)](_0x114b1d);
                    else
                        return this[_0x4c6ec2(0x1d7)](this[_0x4c6ec2(0x1f0)]()[_0x4c6ec2(0x1ed)]);
                }
            } catch (_0x1a2ec4) {
                return _0x2289ac = _0x1a2ec4, KDCore[_0x4c6ec2(0x1cc)](_0x2289ac);
            }
        } else
            return _0x19b446 = _0x201c52['\x70\x41\x50\x5f\x67\x65\x74\x50\x6f\x72\x74\x72\x61\x69\x74\x55\x73\x65\x72\x44\x61\x74\x61\x46\x6f\x72'](this[_0x4c6ec2(0x1e3)]), _0x30fd25 != null && _0x2be242[_0x4c6ec2(0x1f1)](_0x42b43e[_0x4c6ec2(0x1ed)]) ? this[_0x4c6ec2(0x1d7)](_0x2fc9dc[_0x4c6ec2(0x1ed)]) : this[_0x4c6ec2(0x1d7)](this[_0x4c6ec2(0x1f0)]()[_0x4c6ec2(0x1ed)]);
    };
}()));
function _0x372a(_0x4b1994, _0x131fe8) {
    var _0x3b6eb2 = _0x3b6e();
    return _0x372a = function (_0x372a0b, _0x3913db) {
        _0x372a0b = _0x372a0b - 0x1c1;
        var _0x1a388c = _0x3b6eb2[_0x372a0b];
        return _0x1a388c;
    }, _0x372a(_0x4b1994, _0x131fe8);
}
function _0x3b6e() {
    var _0x360b50 = [
        '\x62\x69\x6e\x64\x65\x64\x41\x63\x74\x6f\x72\x49\x64',
        '\x57\x45\x6b\x70\x71',
        '\x66\x61\x63\x65\x4e\x61\x6d\x65',
        '\x78\x4f\x4a\x52\x4b',
        '\x62\x69\x74\x6d\x61\x70',
        '\x70\x41\x50\x5f\x67\x65\x74\x50\x6f\x72\x74\x72\x61\x69\x74\x55\x73\x65\x72\x44\x61\x74\x61\x46\x6f\x72',
        '\x31\x38\x36\x39\x36\x52\x79\x79\x51\x77\x62',
        '\x56\x46\x49\x48\x68',
        '\x59\x43\x71\x4a\x4c',
        '\x72\x65\x70\x6c\x61\x63\x65\x42\x61\x63\x6b\x49\x6d\x61\x67\x65',
        '\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x49\x6d\x61\x67\x65',
        '\x5f\x72\x65\x74\x75\x72\x6e\x54\x6f\x4f\x72\x69\x67\x69\x6e\x61\x6c\x42\x61\x63\x6b',
        '\x31\x34\x39\x30\x52\x65\x43\x50\x76\x55',
        '\x63\x6f\x6e\x66\x69\x67',
        '\x61\x6e\x79',
        '\x5f\x72\x65\x70\x6c\x61\x63\x65\x46\x61\x63\x65\x54\x69\x6d\x65\x72',
        '\x5f\x72\x65\x70\x6c\x61\x63\x65\x46\x61\x63\x65\x49\x6d\x61\x67\x65',
        '\x5f\x75\x70\x64\x61\x74\x65\x42\x61\x63\x6b\x52\x65\x70\x6c\x61\x63\x65',
        '\x75\x74\x4f\x61\x6d',
        '\x50\x5a\x79\x68\x75',
        '\x65\x5a\x70\x55\x4a',
        '\x72\x65\x70\x6c\x61\x63\x65\x46\x61\x63\x65\x49\x6d\x61\x67\x65',
        '\x6c\x6e\x43\x7a\x66',
        '\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64',
        '\x5f\x75\x70\x64\x61\x74\x65\x46\x61\x63\x65\x52\x65\x70\x6c\x61\x63\x65',
        '\x6b\x71\x62\x6f\x63',
        '\x5f\x75\x70\x64\x61\x74\x65\x49\x6d\x61\x67\x65\x73',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x5f\x73\x74\x6f\x72\x65\x55\x73\x65\x72\x44\x61\x74\x61',
        '\x32\x38\x35\x30\x38\x31\x39\x45\x43\x66\x6f\x46\x67',
        '\x73\x43\x6a\x63\x71',
        '\x32\x37\x32\x34\x30\x73\x7a\x75\x57\x4c\x41',
        '\x32\x35\x39\x31\x34\x74\x65\x6d\x76\x55\x64',
        '\x37\x6a\x56\x76\x6b\x77\x45',
        '\x55\x74\x69\x6c\x73',
        '\x70\x79\x50\x66\x65',
        '\x5a\x57\x4f\x65\x54',
        '\x63\x6d\x65\x64\x6f',
        '\x5f\x72\x65\x70\x6c\x61\x63\x65\x42\x61\x63\x6b\x49\x6d\x61\x67\x65',
        '\x31\x32\x33\x35\x33\x52\x6d\x71\x76\x4d\x50',
        '\x5f\x72\x65\x74\x75\x72\x6e\x54\x6f\x4f\x72\x69\x67\x69\x6e\x61\x6c\x46\x61\x63\x65',
        '\x75\x51\x4e\x6e\x6e',
        '\x33\x30\x38\x35\x31\x36\x34\x4f\x51\x53\x64\x53\x67',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x31\x30\x32\x33\x39\x36\x30\x30\x4d\x50\x72\x43\x69\x64',
        '\x31\x31\x39\x34\x31\x39\x32\x45\x5a\x7a\x42\x76\x6c',
        '\x5f\x72\x65\x70\x6c\x61\x63\x65\x42\x61\x63\x6b\x54\x69\x6d\x65\x72',
        '\x69\x6d\x61\x67\x65',
        '\x31\x36\x49\x50\x4f\x45\x4f\x70',
        '\x66\x61\x63\x65\x49\x6d\x61\x67\x65'
    ];
    _0x3b6e = function () {
        return _0x360b50;
    };
    return _0x3b6e();
}

(function (_0x2ac20c, _0xa38f16) {
    var _0x1c9105 = _0x22b2, _0x18cf78 = _0x2ac20c();
    while (!![]) {
        try {
            var _0x6e3e6d = -parseInt(_0x1c9105(0xf1)) / 0x1 + parseInt(_0x1c9105(0xe6)) / 0x2 * (-parseInt(_0x1c9105(0xcd)) / 0x3) + parseInt(_0x1c9105(0xbd)) / 0x4 * (parseInt(_0x1c9105(0xbe)) / 0x5) + parseInt(_0x1c9105(0xb6)) / 0x6 * (parseInt(_0x1c9105(0xe4)) / 0x7) + -parseInt(_0x1c9105(0xd7)) / 0x8 + parseInt(_0x1c9105(0xef)) / 0x9 + -parseInt(_0x1c9105(0xee)) / 0xa * (-parseInt(_0x1c9105(0xc9)) / 0xb);
            if (_0x6e3e6d === _0xa38f16)
                break;
            else
                _0x18cf78['push'](_0x18cf78['shift']());
        } catch (_0x3b5235) {
            _0x18cf78['push'](_0x18cf78['shift']());
        }
    }
}(_0x2f6c, 0x6296f), (function () {
    var _0x3c7bb5 = _0x22b2, _0x36cbf8;
    _0x36cbf8 = Sprite_PKD_AP_ActorFace[_0x3c7bb5(0xdc)], _0x36cbf8[_0x3c7bb5(0xf6)] = function (_0x52b783, _0x40717c = 0x0, _0x1c12d8 = 0x0, _0x49e0cf = 0x0) {
        var _0x2089c3 = _0x3c7bb5;
        if (_0x2089c3(0xd8) !== _0x2089c3(0xd8))
            _0x159870 = new _0x5944fc(), _0x53c600[_0x2089c3(0xd3)][_0x2089c3(0xc7)](0.5), this['\x5f\x6c\x61\x79\x65\x72\x73\x46\x6f\x72\x50\x69\x63\x74\x75\x72\x65\x73'][_0x5392b8] = _0x4dd406, this['\x70\x69\x63\x74\x75\x72\x65\x73\x4c\x61\x79\x65\x72'][_0x2089c3(0xea)](_0xf08066, _0x47d5b4);
        else {
            var _0x1a60b1, _0x19893b, _0x1f5982;
            try {
                if (_0x2089c3(0xd6) !== _0x2089c3(0xd6))
                    _0x347601 = _0x43212e[_0x2089c3(0xb5)];
                else {
                    if (!String[_0x2089c3(0xe3)](_0x52b783))
                        return;
                    if (!PKD_ActorPortrait[_0x2089c3(0xf7)]()) {
                        if (this[_0x2089c3(0xc6)][_0x2089c3(0xb4)] >= 0x2) {
                            if (_0x2089c3(0xba) !== _0x2089c3(0xc1))
                                return;
                            else
                                return;
                        }
                    }
                    if (this['\x5f\x69\x73\x50\x69\x63\x74\x75\x72\x65\x41\x6c\x72\x65\x61\x64\x79\x41\x64\x64\x65\x64'](_0x52b783))
                        return;
                    return _0x19893b = this[_0x2089c3(0xc5)](_0x40717c), _0x1f5982 = new Sprite_PKD_AP_PortraitPicture(_0x52b783, !![]), _0x1f5982[_0x2089c3(0xd1)] = _0x52b783, _0x1f5982['\x61\x6e\x63\x68\x6f\x72'][_0x2089c3(0xc7)](0.5), this[_0x2089c3(0xc6)]['\x70\x75\x73\x68'](_0x1f5982), _0x19893b[_0x2089c3(0xf0)](_0x1f5982), _0x1f5982[_0x2089c3(0xcf)](_0x1c12d8, _0x49e0cf), this[_0x2089c3(0xc0)](_0x52b783, _0x40717c, _0x1c12d8, _0x49e0cf);
                }
            } catch (_0x5d6532) {
                return _0x1a60b1 = _0x5d6532, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x1a60b1);
            }
        }
    }, _0x36cbf8['\x5f\x69\x73\x50\x69\x63\x74\x75\x72\x65\x41\x6c\x72\x65\x61\x64\x79\x41\x64\x64\x65\x64'] = function (_0x49ff2) {
        var _0x391621 = _0x3c7bb5, _0x5347bd, _0x4cf5f5;
        try {
            return _0x4cf5f5 = this[_0x391621(0xc6)]['\x67\x65\x74\x42\x79\x46\x69\x65\x6c\x64'](_0x391621(0xd1), _0x49ff2), _0x4cf5f5 != null;
        } catch (_0x2c8ea9) {
            _0x391621(0xb8) !== _0x391621(0xe8) ? (_0x5347bd = _0x2c8ea9, KDCore[_0x391621(0xbf)](_0x5347bd)) : (_0x519566 = _0x430aac, _0x232322['\x77\x61\x72\x6e\x69\x6e\x67'](_0x20de44));
        }
        return !![];
    }, _0x36cbf8['\x5f\x67\x65\x74\x4c\x61\x79\x65\x72\x46\x6f\x72\x50\x69\x63\x74\x75\x72\x65'] = function (_0x1af0d5) {
        var _0x8bffe = _0x3c7bb5, _0xbccb45;
        return this[_0x8bffe(0xf5)][_0x1af0d5] == null && (_0xbccb45 = new Sprite(), _0xbccb45['\x61\x6e\x63\x68\x6f\x72'][_0x8bffe(0xc7)](0.5), this[_0x8bffe(0xf5)][_0x1af0d5] = _0xbccb45, this['\x70\x69\x63\x74\x75\x72\x65\x73\x4c\x61\x79\x65\x72'][_0x8bffe(0xea)](_0xbccb45, _0x1af0d5)), this[_0x8bffe(0xf5)][_0x1af0d5];
    }, _0x36cbf8['\x5f\x73\x61\x76\x65\x4e\x65\x77\x50\x69\x63\x74\x75\x72\x65\x54\x6f\x55\x73\x65\x72\x44\x61\x74\x61'] = function (_0x176183, _0x23a28c, _0x40a30e, _0x2be668) {
        var _0x3fbc40 = _0x3c7bb5;
        if (_0x3fbc40(0xbb) === _0x3fbc40(0xbb)) {
            var _0x46a9d4, _0x36e6a5, _0x11afc2;
            try {
                if ('\x45\x78\x55\x63\x58' !== _0x3fbc40(0xc4))
                    return;
                else {
                    _0x11afc2 = $gameSystem[_0x3fbc40(0xf3)](this['\x62\x69\x6e\x64\x65\x64\x41\x63\x74\x6f\x72\x49\x64']);
                    if (_0x11afc2 == null) {
                        if (_0x3fbc40(0xce) !== _0x3fbc40(0xc8))
                            _0x36e6a5 = [];
                        else {
                            var _0x29422e, _0x41c9fe;
                            try {
                                return _0x41c9fe = this[_0x3fbc40(0xc6)][_0x3fbc40(0xd9)](_0x3fbc40(0xd1), _0x4ae59a), _0x41c9fe != null;
                            } catch (_0x3ad847) {
                                _0x29422e = _0x3ad847, _0x505c9d['\x77\x61\x72\x6e\x69\x6e\x67'](_0x29422e);
                            }
                            return !![];
                        }
                    } else {
                        if (_0x3fbc40(0xbc) === _0x3fbc40(0xdf)) {
                            var _0x234ea6;
                            try {
                                this[_0x3fbc40(0xdb)] = null;
                                if (this[_0x3fbc40(0xca)] != null)
                                    return this[_0x3fbc40(0xca)][_0x3fbc40(0xe0)]();
                            } catch (_0x493592) {
                                return _0x234ea6 = _0x493592, _0x5dbfa3['\x77\x61\x72\x6e\x69\x6e\x67'](_0x234ea6);
                            }
                        } else
                            _0x36e6a5 = _0x11afc2[_0x3fbc40(0xb5)];
                    }
                    return _0x36e6a5[_0x3fbc40(0xde)]({
                        '\x70\x69\x63\x4e\x61\x6d\x65': _0x176183,
                        '\x6c\x61\x79\x65\x72\x4c\x65\x76\x65\x6c': _0x23a28c,
                        '\x78': _0x40a30e,
                        '\x79': _0x2be668
                    }), this[_0x3fbc40(0xec)]({ '\x70\x69\x63\x74\x75\x72\x65\x73': _0x36e6a5 });
                }
            } catch (_0x59dfa1) {
                return _0x46a9d4 = _0x59dfa1, KDCore[_0x3fbc40(0xbf)](_0x46a9d4);
            }
        } else
            return _0x4d3e8d = this[_0x3fbc40(0xc6)][_0x3fbc40(0xd9)]('\x5f\x70\x6b\x64\x41\x70\x4e\x61\x6d\x65', _0x53004f), _0x3a730d != null;
    }, _0x36cbf8[_0x3c7bb5(0xeb)] = function (_0x2f3ae8) {
        var _0x5508e7 = _0x3c7bb5, _0x455e03, _0x2dc0b6, _0x5092b1, _0x3acaf5, _0x1593f3, _0x52ec1d, _0x174f93, _0x12086b, _0x4a30d9;
        try {
            if (_0x5508e7(0xb7) !== _0x5508e7(0xf8)) {
                _0x174f93 = [];
                for (_0x2dc0b6 = 0x0, _0x3acaf5 = _0x2f3ae8[_0x5508e7(0xb4)]; _0x2dc0b6 < _0x3acaf5; _0x2dc0b6++) {
                    _0x1593f3 = _0x2f3ae8[_0x2dc0b6];
                    if (_0x1593f3 == null)
                        continue;
                    try {
                        ({
                            picName: _0x52ec1d,
                            layerLevel: _0x5092b1,
                            x: _0x12086b,
                            y: _0x4a30d9
                        } = _0x1593f3, _0x174f93[_0x5508e7(0xde)](this['\x61\x64\x64\x50\x69\x63\x74\x75\x72\x65'](_0x52ec1d, _0x5092b1, _0x12086b, _0x4a30d9)));
                    } catch (_0x51fab3) {
                        if ('\x4c\x48\x69\x4d\x63' === _0x5508e7(0xe1))
                            _0x455e03 = _0x51fab3, _0x174f93['\x70\x75\x73\x68'](KDCore[_0x5508e7(0xbf)](_0x455e03));
                        else {
                            this[_0x5508e7(0xdb)] = null;
                            if (this[_0x5508e7(0xca)] != null)
                                return this['\x5f\x74\x6f\x70\x50\x69\x63\x74\x75\x72\x65'][_0x5508e7(0xe0)]();
                        }
                    }
                }
                return _0x174f93;
            } else
                return;
        } catch (_0x2d7fce) {
            return _0x455e03 = _0x2d7fce, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x455e03);
        }
    }, _0x36cbf8[_0x3c7bb5(0xb9)] = function (_0x25175c) {
        var _0x202070 = _0x3c7bb5, _0x127887, _0x61d7d0, _0x2489cb, _0x536c4f;
        try {
            _0x2489cb = this[_0x202070(0xc6)]['\x67\x65\x74\x42\x79\x46\x69\x65\x6c\x64'](_0x202070(0xd1), _0x25175c);
            if (_0x2489cb == null)
                return;
            _0x536c4f = $gameSystem[_0x202070(0xf3)](this[_0x202070(0xd5)]);
            if (_0x536c4f == null) {
                if (_0x202070(0xd0) === _0x202070(0xd0))
                    return;
                else
                    this[_0x202070(0xdd)]();
            }
            if (_0x536c4f['\x70\x69\x63\x74\x75\x72\x65\x73'] == null)
                return;
            return _0x61d7d0 = _0x536c4f['\x70\x69\x63\x74\x75\x72\x65\x73']['\x66\x69\x6c\x74\x65\x72'](function (_0x5dcc8f) {
                var _0x475ebe = _0x202070;
                return _0x5dcc8f[_0x475ebe(0xf4)] !== _0x25175c;
            }), this[_0x202070(0xec)]({ '\x70\x69\x63\x74\x75\x72\x65\x73': _0x61d7d0 }), _0x2489cb['\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74'](), this[_0x202070(0xc6)][_0x202070(0xda)](_0x2489cb);
        } catch (_0x3c084c) {
            return _0x127887 = _0x3c084c, KDCore[_0x202070(0xbf)](_0x127887);
        }
    }, _0x36cbf8[_0x3c7bb5(0xe7)] = function (_0x3b220b, _0x31fa3d = 0x0, _0x3dd51d = 0x0, _0x24c101 = 0x0) {
        var _0x5ca1ae = _0x3c7bb5, _0x4b41d2;
        try {
            this[_0x5ca1ae(0xdd)]();
            if (!String[_0x5ca1ae(0xe3)](_0x3b220b)) {
                if (_0x5ca1ae(0xed) === _0x5ca1ae(0xcc)) {
                    if (this[_0x5ca1ae(0xdb)] <= 0x0)
                        return;
                    this[_0x5ca1ae(0xdb)]--, this[_0x5ca1ae(0xdb)] <= 0x0 && this['\x63\x6c\x65\x61\x72\x54\x6f\x70\x50\x69\x63\x74\x75\x72\x65']();
                } else
                    return;
            }
            this['\x5f\x74\x6f\x70\x50\x69\x63\x74\x75\x72\x65'] = new Sprite_PKD_AP_PortraitPicture(_0x3b220b, _0x31fa3d !== 0x0), this[_0x5ca1ae(0xca)][_0x5ca1ae(0xd3)]['\x73\x65\x74'](0.5), this[_0x5ca1ae(0xca)][_0x5ca1ae(0xcf)](_0x3dd51d, _0x24c101), this[_0x5ca1ae(0xf0)](this[_0x5ca1ae(0xca)]);
            if (_0x31fa3d > 0x0)
                return this['\x64\x50\x69\x63\x54\x69\x6d\x65'] = _0x31fa3d;
        } catch (_0x299183) {
            return _0x4b41d2 = _0x299183, KDCore[_0x5ca1ae(0xbf)](_0x4b41d2);
        }
    }, _0x36cbf8['\x63\x6c\x65\x61\x72\x54\x6f\x70\x50\x69\x63\x74\x75\x72\x65'] = function () {
        var _0x1cf949 = _0x3c7bb5;
        if (_0x1cf949(0xe2) === '\x77\x70\x6e\x74\x74') {
            var _0x487446;
            try {
                if (_0x1cf949(0xcb) === _0x1cf949(0xf2)) {
                    if (this['\x5f\x61\x6c\x6c\x50\x69\x63\x74\x75\x72\x65\x73'][_0x1cf949(0xb4)] >= 0x2)
                        return;
                } else {
                    this['\x64\x50\x69\x63\x54\x69\x6d\x65'] = null;
                    if (this['\x5f\x74\x6f\x70\x50\x69\x63\x74\x75\x72\x65'] != null)
                        return this[_0x1cf949(0xca)]['\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74']();
                }
            } catch (_0x347ca2) {
                if (_0x1cf949(0xc2) === '\x7a\x47\x6a\x64\x6d')
                    _0x22d2c3 = [];
                else
                    return _0x487446 = _0x347ca2, KDCore[_0x1cf949(0xbf)](_0x487446);
            }
        } else
            return this[_0x1cf949(0xdb)] = _0x511452;
    }, _0x36cbf8[_0x3c7bb5(0xe9)] = function () {
        var _0x4cbad8 = _0x3c7bb5, _0x5af4b9;
        try {
            if ('\x67\x63\x7a\x52\x53' === _0x4cbad8(0xe5))
                this['\x64\x50\x69\x63\x54\x69\x6d\x65'] != null && (_0x4cbad8(0xc3) !== '\x62\x57\x67\x44\x75' ? this['\x5f\x75\x70\x64\x61\x74\x65\x54\x6f\x70\x50\x69\x63\x74\x75\x72\x65']() : (_0x3759c3 = _0x196054, _0x111764[_0x4cbad8(0xbf)](_0x5b5d7f)));
            else
                return _0x5c1c41 = _0x1490e1, _0x521a4f['\x77\x61\x72\x6e\x69\x6e\x67'](_0x538e69);
        } catch (_0x3fb5ec) {
            _0x5af4b9 = _0x3fb5ec, KDCore[_0x4cbad8(0xbf)](_0x5af4b9);
        }
    }, _0x36cbf8[_0x3c7bb5(0xd2)] = function () {
        var _0x44ba05 = _0x3c7bb5, _0x1846b9;
        try {
            if (this[_0x44ba05(0xdb)] <= 0x0)
                return;
            this['\x64\x50\x69\x63\x54\x69\x6d\x65']--;
            if (this[_0x44ba05(0xdb)] <= 0x0) {
                if (_0x44ba05(0xd4) === _0x44ba05(0xd4))
                    this[_0x44ba05(0xdd)]();
                else
                    return _0x47dd3f = _0x3bed35, _0x584586[_0x44ba05(0xbf)](_0xda8d5d);
            }
        } catch (_0x35db62) {
            _0x1846b9 = _0x35db62, KDCore[_0x44ba05(0xbf)](_0x1846b9), this[_0x44ba05(0xdb)] = null;
        }
    };
}()));
function _0x22b2(_0x614092, _0x3eb7c0) {
    var _0x2f6c4e = _0x2f6c();
    return _0x22b2 = function (_0x22b281, _0x1a0162) {
        _0x22b281 = _0x22b281 - 0xb4;
        var _0x58f556 = _0x2f6c4e[_0x22b281];
        return _0x58f556;
    }, _0x22b2(_0x614092, _0x3eb7c0);
}
function _0x2f6c() {
    var _0x3759e7 = [
        '\x72\x65\x6d\x6f\x76\x65\x50\x69\x63\x74\x75\x72\x65',
        '\x77\x64\x49\x4b\x63',
        '\x59\x4c\x4d\x49\x59',
        '\x76\x50\x6d\x59\x4b',
        '\x38\x37\x32\x4b\x6c\x77\x53\x44\x55',
        '\x31\x34\x34\x33\x35\x77\x74\x6f\x75\x68\x53',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x5f\x73\x61\x76\x65\x4e\x65\x77\x50\x69\x63\x74\x75\x72\x65\x54\x6f\x55\x73\x65\x72\x44\x61\x74\x61',
        '\x64\x43\x65\x55\x48',
        '\x56\x50\x76\x72\x53',
        '\x71\x43\x53\x49\x57',
        '\x45\x78\x55\x63\x58',
        '\x5f\x67\x65\x74\x4c\x61\x79\x65\x72\x46\x6f\x72\x50\x69\x63\x74\x75\x72\x65',
        '\x5f\x61\x6c\x6c\x50\x69\x63\x74\x75\x72\x65\x73',
        '\x73\x65\x74',
        '\x63\x4d\x50\x4a\x59',
        '\x32\x32\x4d\x59\x66\x62\x45\x53',
        '\x5f\x74\x6f\x70\x50\x69\x63\x74\x75\x72\x65',
        '\x45\x62\x53\x56\x58',
        '\x46\x53\x53\x77\x6f',
        '\x34\x32\x33\x31\x32\x79\x66\x4a\x61\x70\x6a',
        '\x63\x73\x75\x74\x45',
        '\x6d\x6f\x76\x65',
        '\x75\x5a\x65\x51\x4f',
        '\x5f\x70\x6b\x64\x41\x70\x4e\x61\x6d\x65',
        '\x5f\x75\x70\x64\x61\x74\x65\x54\x6f\x70\x50\x69\x63\x74\x75\x72\x65',
        '\x61\x6e\x63\x68\x6f\x72',
        '\x49\x55\x4f\x65\x41',
        '\x62\x69\x6e\x64\x65\x64\x41\x63\x74\x6f\x72\x49\x64',
        '\x62\x51\x4b\x4b\x59',
        '\x33\x38\x33\x39\x36\x37\x32\x4a\x54\x5a\x6b\x45\x76',
        '\x61\x51\x46\x45\x63',
        '\x67\x65\x74\x42\x79\x46\x69\x65\x6c\x64',
        '\x64\x65\x6c\x65\x74\x65',
        '\x64\x50\x69\x63\x54\x69\x6d\x65',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x63\x6c\x65\x61\x72\x54\x6f\x70\x50\x69\x63\x74\x75\x72\x65',
        '\x70\x75\x73\x68',
        '\x46\x48\x65\x6f\x49',
        '\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74',
        '\x4c\x48\x69\x4d\x63',
        '\x77\x70\x6e\x74\x74',
        '\x61\x6e\x79',
        '\x33\x35\x61\x52\x78\x5a\x55\x54',
        '\x67\x63\x7a\x52\x53',
        '\x35\x38\x4e\x72\x62\x42\x76\x6f',
        '\x73\x68\x6f\x77\x50\x69\x63\x74\x75\x72\x65\x41\x62\x6f\x76\x65',
        '\x4e\x43\x55\x65\x77',
        '\x5f\x75\x70\x64\x61\x74\x65\x50\x69\x63\x74\x75\x72\x65\x73',
        '\x61\x64\x64\x43\x68\x69\x6c\x64\x41\x74',
        '\x5f\x72\x65\x73\x74\x6f\x72\x65\x45\x78\x74\x72\x61\x50\x69\x63\x74\x72\x75\x65\x73',
        '\x5f\x73\x74\x6f\x72\x65\x55\x73\x65\x72\x44\x61\x74\x61',
        '\x67\x44\x6d\x77\x6f',
        '\x31\x33\x31\x37\x33\x37\x30\x4e\x79\x44\x4d\x66\x77',
        '\x32\x36\x32\x36\x36\x34\x31\x43\x43\x54\x46\x47\x5a',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x32\x30\x33\x35\x33\x36\x6f\x64\x49\x56\x47\x73',
        '\x56\x64\x42\x7a\x53',
        '\x70\x41\x50\x5f\x67\x65\x74\x50\x6f\x72\x74\x72\x61\x69\x74\x55\x73\x65\x72\x44\x61\x74\x61\x46\x6f\x72',
        '\x70\x69\x63\x4e\x61\x6d\x65',
        '\x5f\x6c\x61\x79\x65\x72\x73\x46\x6f\x72\x50\x69\x63\x74\x75\x72\x65\x73',
        '\x61\x64\x64\x50\x69\x63\x74\x75\x72\x65',
        '\x69\x73\x50\x72\x6f',
        '\x74\x52\x78\x6e\x71',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x70\x69\x63\x74\x75\x72\x65\x73',
        '\x33\x37\x33\x39\x37\x34\x42\x67\x75\x7a\x70\x7a',
        '\x47\x6a\x69\x79\x42',
        '\x4d\x6b\x4a\x62\x76'
    ];
    _0x2f6c = function () {
        return _0x3759e7;
    };
    return _0x2f6c();
}

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addNewState, ALIAS__changeEquip, ALIAS__decreaseBuff, ALIAS__die, ALIAS__eraseBuff, ALIAS__eraseState, ALIAS__executeFloorDamage, ALIAS__forceChangeEquip, ALIAS__gainExp, ALIAS__gainHp, ALIAS__gainMp, ALIAS__increaseBuff, ALIAS__levelDown, ALIAS__levelUp, ALIAS__onDamage, ALIAS__revive, _;
  //@[DEFINES]
  _ = Game_Actor.prototype;
  //@[ALIAS]
  ALIAS__levelUp = _.levelUp;
  _.levelUp = function() {
    ALIAS__levelUp.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'levelUp', level);
  };
  
  //@[ALIAS]
  ALIAS__levelDown = _.levelDown;
  _.levelDown = function() {
    ALIAS__levelDown.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'levelDown', level);
  };
  
  //@[ALIAS]
  ALIAS__gainExp = _.gainExp;
  _.gainExp = function(exp) {
    ALIAS__gainExp.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'gainExp', exp);
  };
  
  //@[ALIAS]
  ALIAS__changeEquip = _.changeEquip;
  _.changeEquip = function() {
    ALIAS__changeEquip.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'changeEquip');
  };
  
  //@[ALIAS]
  ALIAS__forceChangeEquip = _.forceChangeEquip;
  _.forceChangeEquip = function() {
    ALIAS__forceChangeEquip.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'changeEquip');
  };
  
  //@[ALIAS]
  ALIAS__executeFloorDamage = _.executeFloorDamage;
  _.executeFloorDamage = function() {
    ALIAS__executeFloorDamage.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'floorDamage');
  };
  
  //@[ALIAS]
  ALIAS__addNewState = _.addNewState;
  _.addNewState = function(stateId) {
    ALIAS__addNewState.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'addState', stateId);
  };
  //@[ALIAS]
  ALIAS__eraseState = _.eraseState;
  _.eraseState = function(stateId) {
    ALIAS__eraseState.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'removeState', stateId);
  };
  //@[ALIAS]
  ALIAS__eraseBuff = _.eraseBuff;
  _.eraseBuff = function(paramId) {
    ALIAS__eraseBuff.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'removeBuff', paramId);
  };
  
  //@[ALIAS]
  ALIAS__increaseBuff = _.increaseBuff;
  _.increaseBuff = function(paramId) {
    ALIAS__increaseBuff.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'addBuff', paramId);
  };
  //@[ALIAS]
  ALIAS__decreaseBuff = _.decreaseBuff;
  _.decreaseBuff = function(paramId) {
    ALIAS__decreaseBuff.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'addDebuff', paramId);
  };
  //@[ALIAS]
  ALIAS__gainHp = _.gainHp;
  _.gainHp = function(value) {
    ALIAS__gainHp.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'gainHp', value);
  };
  //@[ALIAS]
  ALIAS__gainMp = _.gainMp;
  _.gainMp = function(value) {
    ALIAS__gainMp.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'gainMp', value);
  };
  //@[ALIAS]
  ALIAS__onDamage = _.onDamage;
  _.onDamage = function(value) {
    ALIAS__onDamage.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'onDamage', value);
  };
  //@[ALIAS]
  ALIAS__die = _.die;
  _.die = function() {
    ALIAS__die.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'die');
  };
  //@[ALIAS]
  ALIAS__revive = _.revive;
  _.revive = function() {
    ALIAS__revive.call(this, ...arguments);
    return PKD_ActorPortrait.CallEvent(this.actorId(), 'revive');
  };
})();

// ■ END Game_Actor.coffee
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
  _.pAP_getPortraitId = function() {
    var e, externalConfig, meta;
    try {
      externalConfig = $gameSystem.pAP_getExternalFaceConfigFor(this.actorId());
      if (externalConfig != null) {
        return externalConfig;
      }
      meta = this.actor().meta;
      if ((meta != null) && (meta.pActorPortrait != null)) {
        return meta.pActorPortrait;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
})();

// ■ END Game_Actor.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__addActor, ALIAS__removeActor, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__addActor = _.addActor;
  _.addActor = function() {
    ALIAS__addActor.call(this, ...arguments);
    if (PKD_ActorPortrait.PP.isAutoHandlePortraitsOnPartyChange()) {
      return PKD_ActorPortrait.Utils.refreshPortraits();
    }
  };
  
  //@[ALIAS]
  ALIAS__removeActor = _.removeActor;
  _.removeActor = function() {
    ALIAS__removeActor.call(this, ...arguments);
    if (PKD_ActorPortrait.PP.isAutoHandlePortraitsOnPartyChange()) {
      return PKD_ActorPortrait.Utils.refreshPortraits();
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__consumeItem, ALIAS__gainGold, ALIAS__gainItem, _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__gainGold = _.gainGold;
  _.gainGold = function(amount) {
    ALIAS__gainGold.call(this, ...arguments);
    if (amount > 0) {
      return PKD_APA.CallEvent(-1, "onReceivedGold", amount);
    }
  };
  
  //@[ALIAS]
  ALIAS__gainItem = _.gainItem;
  _.gainItem = function(item, amount, includeEquip) {
    var e, payload;
    ALIAS__gainItem.call(this, ...arguments);
    try {
      // * only if item is gained (not lose)
      if (amount <= 0) {
        return;
      }
      if (item != null) {
        payload = item.id;
      } else {
        payload = 0;
      }
      return PKD_APA.CallEvent(-1, "onReceivedItem", payload);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  
  //@[ALIAS]
  /*ALIAS__loseItem = _.loseItem
  _.loseItem = (item, amount, includeEquip) ->
      ALIAS__loseItem.call(@, ...arguments)
      try
          if item?
              payload = item.id
          else
              payload = 0
          PKD_APA.CallEvent(-1, "loseItem", payload)
      catch e
          KDCore.warning e*/
  //@[ALIAS]
  ALIAS__consumeItem = _.consumeItem;
  _.consumeItem = function(item) {
    var e, payload;
    ALIAS__consumeItem.call(this, ...arguments);
    try {
      if (item != null) {
        payload = item.id;
      } else {
        payload = 0;
      }
      return PKD_APA.CallEvent(-1, "onConsumedItem", payload);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  _.pAP_getPortraitsPairs = function() {
    var data, i, len, m, portraitId, ref;
    data = [];
    ref = this.members();
    for (i = 0, len = ref.length; i < len; i++) {
      m = ref[i];
      portraitId = m.pAP_getPortraitId();
      if (String.any(portraitId)) {
        data.push([portraitId, m.actorId()]);
      }
    }
    return data;
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Switches.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setValue, _;
  //@[DEFINES]
  _ = Game_Switches.prototype;
  //@[ALIAS]
  ALIAS__setValue = _.setValue;
  _.setValue = function(switchId, value) {
    var e;
    ALIAS__setValue.call(this, ...arguments);
    try {
      if (!PKD_ActorPortrait.PP.isSwitchesEventAreEnabled()) {
        return;
      }
      if (switchId > 0 && switchId < $dataSystem.switches.length) {
        return PKD_APA.CallEvent(-1, "onSwitchChanged", switchId);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Game_Switches.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_System.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_System.prototype;
  _.pAP_initPortraitsConfigsPairs = function() {
    if (this._pAP_portraitsConfigParis == null) {
      return this._pAP_portraitsConfigParis = {};
    }
  };
  _.pAP_getExternalFaceConfigFor = function(actorId) {
    this.pAP_initPortraitsConfigsPairs();
    return this._pAP_portraitsConfigParis[actorId];
  };
  _.pAP_setExternalFaceConfigFor = function(actorId, faceConfigId) {
    this.pAP_initPortraitsConfigsPairs();
    if (faceConfigId == null) {
      delete this._pAP_portraitsConfigParis[actorId];
    } else {
      this._pAP_portraitsConfigParis[actorId] = faceConfigId;
    }
  };
  _.pAP_initPortraitsUserData = function() {
    if (this._pAP_portraitsUserData == null) {
      return this._pAP_portraitsUserData = {};
    }
  };
  _.pAP_getPortraitUserDataFor = function(actorId) {
    this.pAP_initPortraitsUserData();
    return this._pAP_portraitsUserData[actorId];
  };
  _.pAP_setUserDataForPortrait = function(actorId, userData) {
    this.pAP_initPortraitsUserData();
    if (this._pAP_portraitsUserData[actorId] == null) {
      this._pAP_portraitsUserData[actorId] = {};
    }
    this._pAP_portraitsUserData[actorId] = {...this._pAP_portraitsUserData[actorId], ...userData};
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Variables.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setValue, _;
  //@[DEFINES]
  _ = Game_Variables.prototype;
  //@[ALIAS]
  ALIAS__setValue = _.setValue;
  _.setValue = function(variableId, value) {
    var e;
    ALIAS__setValue.call(this, ...arguments);
    try {
      if (!PKD_ActorPortrait.PP.isVariableEventAreEnabled()) {
        return;
      }
      if ($gameTemp.__pkdAPsilenceMode === true) {
        return;
      }
      if (variableId > 0 && variableId < $dataSystem.variables.length) {
        return PKD_APA.CallEvent(-1, "onVarChanged", variableId);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Game_Variables.coffee
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
  _.loadPictureForPKDActPort = function(filename) {
    return this.loadBitmap('img/pActorPortrait/', filename);
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
    PKD_ActorPortrait.LoadPluginSettings();
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
  var ALIAS__onMapLoaded, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this, ...arguments);
    this.pAP_createPortraits();
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
  _.pAP_createPortraits = function() {
    var data, i, len, pair;
    data = $gameParty.pAP_getPortraitsPairs();
    if ((data != null) && data.length > 0) {
      for (i = 0, len = data.length; i < len; i++) {
        pair = data[i];
        PKD_ActorPortrait.Utils.createPortrait(...pair);
      }
    }
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var Sprite_PKD_ActorFace;

Sprite_PKD_ActorFace = class Sprite_PKD_ActorFace extends KDCore.Sprite {
  constructor(faceConfigId, bindedActorId) {
    super();
    this.faceConfigId = faceConfigId;
    this.bindedActorId = bindedActorId;
    this._create();
  }

  config() {}

  isActive() {
    return this.visible === true;
  }

  update() {
    super.update();
    if (this.isActive()) {
      return this._updateMain();
    }
  }

  _updateMain() {}

};


// Generated by CoffeeScript 2.6.1
var Sprite_PKD_AP_AnimatedSprite;

Sprite_PKD_AP_AnimatedSprite = class Sprite_PKD_AP_AnimatedSprite extends Sprite {
  constructor(filename, isLoop = false) {
    super();
    this.filename = filename;
    this.isLoop = isLoop;
    this._prepare();
    if (KDCore.isMV()) {
      this.z = 1;
    }
    return;
  }

  kill() {
    return this._onEnd();
  }

  _prepare() {
    var data;
    this._loaded = false;
    this._curFrame = 0;
    this._frameTimer = 0;
    data = this._getFramesAndSpeed();
    this._frames = data.f;
    this._frameSpeed = data.s;
    KDCore.Utils.loadImageAsync('pActorPortrait', this.filename).then(this._startAnimation.bind(this));
  }

  _getFramesAndSpeed() {
    var e, items, result;
    result = {
      f: 1,
      s: 1
    };
    if (!String.any(this.filename)) {
      return result;
    }
    try {
      items = this.filename.match(/\((.*)\)/i);
      if (items != null) {
        items = items[1].split(',');
        result.f = Number(items[0]);
        result.s = Number(items[1]);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return result;
  }

  _startAnimation(bitmap) {
    this.bitmap = bitmap;
    this._updateFrame();
    this._loaded = true;
  }

  _updateFrame() {
    var ph, pw, sx, sy;
    pw = this.bitmap.width / this._frames;
    ph = this.bitmap.height;
    sx = this._curFrame * pw;
    sy = 0;
    if (this._frameTimer >= this._frameSpeed) {
      this._frameTimer = 0;
      if (this._curFrame >= this._frames - 1) {
        if (this.isLoop === true) {
          this._curFrame = 0;
        } else {
          this.kill();
        }
      } else {
        this._curFrame += 1;
      }
    }
    this.setFrame(sx, sy, pw, ph);
    this._frameTimer += 1;
  }

  _onEnd() {
    var e;
    this.visible = false;
    this.removeFromParent();
    try {
      return this.destroy();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  update() {
    super.update();
    if (!this.visible) {
      return;
    }
    if (!this._loaded) {
      return;
    }
    this._updateFrame();
  }

};


// Generated by CoffeeScript 2.6.1
var Sprite_PKD_AP_PortraitPicture;

Sprite_PKD_AP_PortraitPicture = class Sprite_PKD_AP_PortraitPicture extends KDCore.Sprite {
  constructor(picName, isLoop) {
    super();
    this.picName = picName;
    this.isLoop = isLoop;
    this._create();
    this.anchor.set(.5);
    return;
  }

  _create() {
    var e;
    try {
      if (this.picName.match(/\((.*)\)/i) != null) {
        this._createAnimatedImage();
      } else {
        this._createBasicImage();
      }
      this.mainSpr.anchor.set(0.5);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  _createAnimatedImage() {
    this.mainSpr = new Sprite_PKD_AP_AnimatedSprite(this.picName, this.isLoop);
    return this.addChild(this.mainSpr);
  }

  _createBasicImage() {
    this.mainSpr = PKD_ActorPortrait.Utils.sprite(this.picName);
    return this.addChild(this.mainSpr);
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createPictures, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createPictures = _.createPictures;
  _.createPictures = function() {
    if (PKD_ActorPortrait.PP.isShowPortraitsBelowPictures()) {
      this._pkdCreateLayerForActorsPortraits();
    }
    return ALIAS__createPictures.call(this, ...arguments);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  _._pkdCreateLayerForActorsPortraits = function() {
    this._pkdAPLayer = new Sprite();
    return this.addChild(this._pkdAPLayer);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__startMessage, ALIAS__terminateMessage, _;
  //@[DEFINES]
  _ = Window_Message.prototype;
  //@[ALIAS]
  ALIAS__startMessage = _.startMessage;
  _.startMessage = function() {
    ALIAS__startMessage.call(this);
    return PKD_APA.CallEvent(-1, "onMessageStart");
  };
  
  //@[ALIAS]
  ALIAS__terminateMessage = _.terminateMessage;
  _.terminateMessage = function() {
    ALIAS__terminateMessage.call(this);
    return PKD_APA.CallEvent(-1, "onMessageEnd");
  };
})();

// ■ END Window_Message.coffee
//---------------------------------------------------------------------------

//Plugin PKD_ActorPortrait builded by PKD PluginBuilder 2.2 - 04.04.2023