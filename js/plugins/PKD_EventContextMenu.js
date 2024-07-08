/*
 * Copyright (c) 2022 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

* License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

* You can use plugin in commercial projects on the sole
* condition that this plugin has been legally acquired
* (through purchase from
*    https://ko-fi.com/pheonixkagedesu/shop or
*    https://boosty.to/kagedesu).

 */

/*:
 * @plugindesc (v.1.0)[BASIC] Context Menu for Event
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/event-context-menu
 *
 * @help
 * ---------------------------------------------------------------------------
 * How create and assing context menu to Event
 *
 * 1. Create Context Menu in Plugin Parameter Context Menus
 * 2. Add comment to Event page contextMenu:ID, where ID - is
 *  unique ID of one of context menu you created in step 1.
 * Context menu binded only for Event page with comment contextMenu:ID
 *
 * 3. Optional. Configurate Plugin Parameters group -> Context Menu Settings
 *
 * In game, click right mouse on Event and assigned context menu will pop up
 * 
 * ---------------------------------------------------------------------------
 * Script calls
 *
 * - ECM_OpenMenuFromEventId(EVENT_ID); - open context menu of Event with ID = EVENT_ID
 *      (if event not have assign context menu -> nothing)
 * 
 * - ECM_OpenMenuForEventId(MENU_ID, CHAR_ID); - open specified context menu
 *      MENU_ID - context menu ID from Plugin Parameters Context Menus (in quotes)
 *      CHAR_ID - 0 - above player, any number = event ID on current map
 *      context menu will be opened event is NOT assigned
 *
 *  Example: ECM_OpenMenuForEventId("Options", 0); - open context menu with ID "Options"
 *      above Player character (0)
 *
 * - ECM_AddMenu(EVENT_ID, MENU_ID, MAP_ID); - dinamically assign context menu to event
 *      Same as using comment contextMenu:ID
 *
 * - ECM_RemoveMenu(EVENT_ID, MAP_ID); - remove dinamically assigned context menu
 *
 * - ECM_SetMenuState(EVENT_ID, STATE, MAP_ID); - disable or enable context menu
 *      for event EVENT_ID (MAP_ID), STATE can be true or false
 *
 *    Example: ECM_SetMenuState(10, false, 1); - temporary turn OFF context menu
 *       for event 10 on map 1
 *
 * - ECM_SetGlobalState(STATE); - disable or enable all context menus for all events
 * 
 * - ECM_CurrentMenuEventId(); - return event id, parent of current opened context menu
 *
 * - ECM_CurrentMenuChar(); return charcter object, parent of current opened context menu
 *      (Game_Player or Game_Event object)
 *
 * ---------------------------------------------------------------------------
 * Script calls (special)
 *  This script call can be called only in map Event or common event body
 *
 * - this.openContextMenu(); - open context menu of current event (if assigned)
 *
 * - this.openContextMenu(MENU_ID); - open specified context menu for this event
 *      (open for player if called in Common Event)
 *
 * ---------------------------------------------------------------------------

 * This is BASIC plugin version and have some restrictions:
 *    - Not support of chaining context menus
 *    - Max options per Context Menu - 4
 *    - Obfuscated code
 *    - Plugin usage allowed only in Non-Commercial project
 * 
 *  PRO version of plugin don't have this restrictions!
 
 * ===========================================================================
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all
 * who subscribed (support) on me!
 * 

* License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

* You can use plugin in commercial projects on the sole
* condition that this plugin has been legally acquired
* (through purchase from
*    https://ko-fi.com/pheonixkagedesu/shop or
*    https://boosty.to/kagedesu).

 *
 *
 *
 * @param mainSettingsGroup
 * @text Context Menu Settings
 * 
 * @param isNotOpenGameMenuOnRClickOnEvent:b
 * @text No Main Menu?
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Prohibit opening the game menu by clicking the left mouse button on any event (even without the context menu)
 * @default true
 * 
 * @param isAutoCloseWhenCharMove:b
 * @text Event auto close?
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Is Auto close context menu if event parent is make some movement?
 * @default true
 * 
 * @param isAutoCloseWhenPlayerMove:b
 * @text Player auto close?
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Is Auto close context menu if player is make some movement?
 * @default true
 * 
 * @param isAutoCloseWhenMessage:b
 * @text  Message auto close?
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Is Auto close context menu if some message is appear?
 * @default true
 * 
 * @param isContextMenuDragable:b
 * @text Draggable?
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Is context menu window draggable by mouse?
 * @default false
 * 
 * @param isContextMenuHaveCloseButton:b
 * @text Close Button
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Is context menu have close button?
 * @default true
 * 
 * @param isStopPlayerMoveWhenContextMenuActive:b
 * @text No Move
 * @parent mainSettingsGroup
 * @type boolean
 * @desc If true, player can't move when any context menu is opened
 * @default true
 * 
 * @param isContextAllowedWhenPlayerOnlyCanMove:b
 * @text Only when can move
 * @parent mainSettingsGroup
 * @type boolean
 * @desc If true, player can call context menu only if palyer can move (no any message or event is running)
 * @default true
 * 
 * @param spacer|visualSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param visualSettingsGroup
 * @text Visual Settings
 * 
 * @param isPlayClickEffect:b
 * @parent visualSettingsGroup
 * @text Click Effect
 * @type boolean
 * @on Show
 * @off No
 * @desc Is show click effect when open context menu?
 * @default true
 * 
 * @param clickEffectSettings:struct
 * @parent isPlayClickEffect:b
 * @text Effect Settings
 * @type struct<ClickEffectSettings>
 * @desc Click effect animation and sound settings
 * @default {"initialSize:i":"0.08","endSize:i":"0.4","sizeChangeStep:i":"0.03","frameDelay:i":"1","seName:str":"Cursor3"}
 * 
 * @param contextMenuWindowSettings:struct
 * @text Context Window
 * @parent visualSettingsGroup
 * @type struct<str46>
 * @desc Context Menu Window visual settings
 * @default {"size:s":"{\"w:int\":\"160\",\"h:int\":\"160\"}","listWindowSettings:s":"{\"size:s\":\"{\\\"w:int\\\":\\\"160\\\",\\\"h:int\\\":\\\"136\\\"}\",\"fontSize:i\":\"16\",\"lineHeight:i\":\"16\",\"itemPadding:i\":\"6\"}","isStaticPosition:b":"false","position:s":"{\"x:e\":\"0\",\"y:e\":\"0\"}","placementMargins:s":"{\"dxL:i\":\"24\",\"dxR:i\":\"24\",\"dyU:i\":\"24\",\"dyD:i\":\"0\"}","headerTextSettings:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"158\\\",\\\"h:int\\\":\\\"28\\\"}\",\"alignment:str\":\"center\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"18\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"outline:struct\":\"{\\\"color\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"textColor:str\":\"#e0da1b\"}"}
 * 
 * @param spacer|contextMenus @text‏‏‎ ‎@desc ===============================================
 * 
 * @param contextMenus:structA
 * @text Context Menus
 * @type struct<Menu>[]
 * @desc All your context menus for events
 * @default []
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 */
/*:ru
 * @plugindesc (v.1.0)[BASIC] Контекстное меню для события
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/event-context-menu
 *
 * @help
 * ---------------------------------------------------------------------------
 * Как создать и присвоить доп. (контекстное) меню для события
 *
 * 1. Создайте и настройке доп. меню в параметре Context Menus
 * 2. Добавьте комментарий на страницу события contextMenu:ID, где ID - это
 *  уникальный ID одного из созданных вами меню (пункт 1).
 *
 * Доп. меню привязано только к странице события где вы его явно указали
 *  с помощью комментария contextMenu:ID, т.е. если переключить страницу
 * события на ту, где нет комментария, меню также больше не будет. Или можно
 * указать другое меню для другой страницы.
 *
 * 3. Опционально. Настройте параметры поведения -> Context Menu Settings
 *
 * В игре, нажмите правой кнопкой мыши по событию и
 * появися привязанное (пункт 2) меню
 * 
 * ---------------------------------------------------------------------------
 * Вызовы скриптов
 *
 * - ECM_OpenMenuFromEventId(EVENT_ID); - открыть доп. меню, событие номер = EVENT_ID
 *      (! Только для событий к которым было привязанно контектсное меню)
 * 
 * - ECM_OpenMenuForEventId(MENU_ID, CHAR_ID); - открыть доп. меню
 *      MENU_ID - уникальный ID доп. меню
 *      CHAR_ID - 0 - над игроком, любое число = номер события на карте
 *      Откроется доп. меню MENU_ID, даже если оно НЕ БЫЛО привязанно через комментарий
 *
 *  Пример: ECM_OpenMenuForEventId("Options", 0); - открыть доп. меню с ID "Options"
 *      над персонажем игрока (0)
 *
 * - ECM_AddMenu(EVENT_ID, MENU_ID, MAP_ID); - динамически привязать меню к событию
 *      (Тоже самое что использовать комменатрий contextMenu:ID)
 *
 * - ECM_RemoveMenu(EVENT_ID, MAP_ID); - удалить динамичеки привязанное меню
 *      (Работает только с динамически привязанными меню)
 *
 * - ECM_SetMenuState(EVENT_ID, STATE, MAP_ID); - ВКЛ или ВЫКЛ доп. меню для события
 *      EVENT_ID (MAP_ID), STATE может быть true или false
 *
 *    Пример: ECM_SetMenuState(10, false, 1); - временно отключить доп. меню
 *       для события номер 10 на карте 1
 *
 * - ECM_SetGlobalState(STATE); - ВКЛ или ВЫКЛ все доп. меню в игре
 * 
 * - ECM_CurrentMenuEventId(); - возвращает номер события, для которого в данный момент
 *      открыто доп. меню
 *
 * - ECM_CurrentMenuChar(); - аналогично предыдущему, только возвращает
 *      игровой объект Game_Event или Game_Player
 *
 * ---------------------------------------------------------------------------
 * Вызовы скриптов (дополнительно)
 *  Данные вызовы скриптов можно вызывать только внутри тела события или общего события
 *
 * - this.openContextMenu(); - открыть доп. меню данного события (если привязанно!)
 *
 * - this.openContextMenu(MENU_ID); - открыть доп. меню MENU_ID для события
 *      (Если вызвать в общем событии, то доп. меню будет открыто над игроком)
 *
 * ---------------------------------------------------------------------------

 * Это [BASIC] (базовая) версия плагина и имеет некоторые ограничения:
 *    - Нельзя создавать цепочки меню (вызов одного меню из другого)
 *    - Максимальное количество пунктов в одном меню - 4
 *    - Обфусцированный код
 *    - ЗАПРЕЩЕНО использовать плагин в коммерческих проектах
 * 
 *  [PRO] версия плагина не имеет данных ограничений!
 
 * ===========================================================================
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty:
 *      https://boosty.to/kagedesu
 * YouTube:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *

* Лицензия: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

* Вы можете использовать плагин в коммерческих проектах на единственном
* условие, что этот плагин был приобретен на законных основаниях
* (через покупку на сайте https://boosty.to/kagedesu).

 *
 * @param mainSettingsGroup
 * @text Context Menu Settings
 * 
 * @param isNotOpenGameMenuOnRClickOnEvent:b
 * @text No Main Menu?
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Запретить открывать игровое мени при нажатии правой кнопкой мыши по событию (даже без контекстного меню)
 * @default true
 * 
 * @param isAutoCloseWhenCharMove:b
 * @text Event auto close?
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Закрывать доп. меню если событие-родитель двигается?
 * @default true
 * 
 * @param isAutoCloseWhenPlayerMove:b
 * @text Player auto close?
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Закрывать доп. меню если игрок двигается?
 * @default true
 * 
 * @param isAutoCloseWhenMessage:b
 * @text  Message auto close?
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Закрывать доп. меню если появилось сообщение?
 * @default true
 * 
 * @param isContextMenuDragable:b
 * @text Draggable?
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Можно ли двигать мышкой окошко доп. меню?
 * @default false
 * 
 * @param isContextMenuHaveCloseButton:b
 * @text Close Button
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Показывать кнопку закрыть у окошка доп. меню
 * @default true
 * 
 * @param isStopPlayerMoveWhenContextMenuActive:b
 * @text No Move
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Если ВКЛ, игрок не может двигаться пока есть хоть одно отображаемое доп. меню
 * @default true
 * 
 * @param isContextAllowedWhenPlayerOnlyCanMove:b
 * @text Only when can move
 * @parent mainSettingsGroup
 * @type boolean
 * @desc Если ВКЛ. игрок может вызывать доп. меню только когда свободен (может двигаться, не в событии, нет сообщения)
 * @default true
 * 
 * @param spacer|visualSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param visualSettingsGroup
 * @text Visual Settings
 * 
 * @param isPlayClickEffect:b
 * @parent visualSettingsGroup
 * @text Click Effect
 * @type boolean
 * @on Show
 * @off No
 * @desc Показывать эффект клика мышкой?
 * @default true
 * 
 * @param clickEffectSettings:struct
 * @parent isPlayClickEffect:b
 * @text Effect Settings
 * @type struct<ClickEffectSettings>
 * @desc Настройки эффекта клика мышкой
 * @default {"initialSize:i":"0.08","endSize:i":"0.4","sizeChangeStep:i":"0.03","frameDelay:i":"1","seName:str":"Cursor3"}
 * 
 * @param contextMenuWindowSettings:struct
 * @text Context Window
 * @parent visualSettingsGroup
 * @type struct<str46>
 * @desc Настройки окна доп. меню (контекстного меню)
 * @default {"size:s":"{\"w:int\":\"160\",\"h:int\":\"160\"}","listWindowSettings:s":"{\"size:s\":\"{\\\"w:int\\\":\\\"160\\\",\\\"h:int\\\":\\\"136\\\"}\",\"fontSize:i\":\"16\",\"lineHeight:i\":\"16\",\"itemPadding:i\":\"6\"}","isStaticPosition:b":"false","position:s":"{\"x:e\":\"0\",\"y:e\":\"0\"}","placementMargins:s":"{\"dxL:i\":\"24\",\"dxR:i\":\"24\",\"dyU:i\":\"24\",\"dyD:i\":\"0\"}","headerTextSettings:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"158\\\",\\\"h:int\\\":\\\"28\\\"}\",\"alignment:str\":\"center\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"18\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"outline:struct\":\"{\\\"color\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"textColor:str\":\"#e0da1b\"}"}
 * 
 * @param spacer|contextMenus @text‏‏‎ ‎@desc ===============================================
 * 
 * @param contextMenus:structA
 * @text Context Menus
 * @type struct<Menu>[]
 * @desc Определение доп. меню (контекстных меню для событий)
 * @default []
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 */
/*~struct~ClickEffectSettings:

 @param initialSize:i
 @text Start Size
 @type number 
 @min 0
 @decimals 3
 @desc Initial size of image (img/pEventContextMenu/nzClickEffect.png)
 @default 0.08 

 @param endSize:i
 @text End Size
 @type number 
 @min 0
 @decimals 3
 @desc End size (when animation is ends and image will dissapear)
 @default 0.4 

 @param sizeChangeStep:i
 @text Size Change
 @type number 
 @min 0
 @decimals 3
 @desc How change image size per step
 @default 0.03 

 @param frameDelay:i
 @text Delay
 @type number 
 @min 1
 @desc Delay in frames between each size change step
 @default 1 

 @param seName:str
 @text Sound
 @type file
 @dir audio/se
 @require 1 
 @desc Click sound effect (SE)
 @default Cursor3

*/

/*~struct~ClickEffectSettings:ru

 @param initialSize:i
 @text Start Size
 @type number 
 @min 0
 @decimals 3
 @desc Начальный размер изображения (img/pEventContextMenu/nzClickEffect.png)
 @default 0.08 

 @param endSize:i
 @text End Size
 @type number 
 @min 0
 @decimals 3
 @desc Конечный размер (когда картинка должна пропасть с экрана)
 @default 0.4 

 @param sizeChangeStep:i
 @text Size Change
 @type number 
 @min 0
 @decimals 3
 @desc Изменине размера за одни шаг (один кадр по умолчанию)
 @default 0.03 

 @param frameDelay:i
 @text Delay
 @type number 
 @min 1
 @desc Задержка (в кадрах) между каждым шагом. 1 шаг в 1 кадр.
 @default 1 

 @param seName:str
 @text Sound
 @type file
 @dir audio/se
 @require 1 
 @desc Звуковой эффект при открытии меню
 @default Cursor3

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

/*~struct~str0:
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

/*~struct~str0:ru
 * @param w:int
 * @text Высота
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Ширина
 * @type number
 * @default 100
 * @min 0
*/

/*~struct~str1:

 * @param face:str
 * @text Face
 * @type string
 * @default
 *
 * @param size:int
 * @text Size
 * @type number
 * @default 24
 * @min 1
 * 
 * @param italic:bool
 * @text IsItalic
 * @type boolean
 * @default false

*/

/*~struct~str1:ru

 * @param face:str
 * @text Название
 * @type string
 * @default
 *
 * @param size:int
 * @text Размер
 * @type number
 * @default 24
 * @min 1
 * 
 * @param italic:bool
 * @text Курсив?
 * @type boolean
 * @default false

*/

/*~struct~str2:

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
/*~struct~str2:ru

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
/*~struct~str3:

 * @param color
 * @text Color
 * @type text
 * @default #000000
 * @desc Outline color in HEX (#000000) or empty "" (black)
 *
 * @param width:int
 * @text Width
 * @type number
 * @default 3
 * @min 0
 * @desc Outline stroke width in px

*/
/*~struct~str3:ru

 * @param color
 * @text Цвет
 * @type text
 * @default #000000
 * @desc Цвет обводки в HEX формате (#000000) или пусто "" (чёрный)
 *
 * @param width:int
 * @text Ширина
 * @type number
 * @default 3
 * @min 0
 * @desc Ширина обводки в пикселях

*/
/*~struct~str4:

 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this element visible? 


 * @param size:struct
 * @text Size
 * @type struct<str0>
 * @default
 * @desc Size of element


 * @param alignment:str
 * @text Alignment
 * @type combo
 * @option center
 * @option right
 * @option left
 * @default center
 * @desc Text alignment


 * @param font:struct
 * @type struct<str1>
 * @text Font Settings
 * @default
 * @desc Text font settings


 * @param margins:struct
 * @text Margins
 * @type struct<str2>
 * @default
 * @desc Position of element, relative parent


 * @param outline:struct
 * @text Text Outline
 * @type struct<str3>
 * @default
 * @desc Text outline settings


 * @param textColor:str
 * @type string
 * @text Text Color
 * @default #FFFFFF
 * @desc Text color in HEX format (#000000)

*/

/*~struct~str4:ru

 * @param visible:bool
 * @text Активен?
 * @type boolean
 * @default true
 * @desc Будет ли этот элемент видно в игре?


 * @param size:struct
 * @text Размер
 * @type struct<str0>
 * @default
 * @desc


 * @param alignment:str
 * @text Положение
 * @type combo
 * @option center
 * @option right
 * @option left
 * @default center
 * @desc Положение текста


 * @param font:struct
 * @type struct<str1>
 * @text Шрифт
 * @default
 * @desc Настройки шрифта


 * @param margins:struct
 * @text Отступы
 * @type struct<str2>
 * @default
 * @desc Позиция элемента, относительно элемента родителя


 * @param outline:struct
 * @text Обводка
 * @type struct<str3>
 * @default
 * @desc Настройки обводки текста


 * @param textColor:str
 * @type string
 * @text Цвет
 * @default #FFFFFF
 * @desc Цвет текста в HEX формате (#000000)

*/

/*~struct~str44:

 @param size:s
 @text Size
 @type struct<str0> 
 @desc Options list window size
 @default {} 

 @param fontSize:i
 @text Font Size
 @type number 
 @min 1
 @desc Options default font size
 @default 16 

 @param lineHeight:i
 @text Line Height
 @type number 
 @min 6
 @desc Options list item default height
 @default 16 

 @param itemPadding:i
 @text Padding
 @type number 
 @min 0
 @desc Options list window content padding
 @default 6 

*/

/*~struct~str44:ru

 @param size:s
 @text Size
 @type struct<str0> 
 @desc Размер списка опций меню
 @default {} 

 @param fontSize:i
 @text Font Size
 @type number 
 @min 1
 @desc Стандартный размер шрифта
 @default 16 

 @param lineHeight:i
 @text Line Height
 @type number 
 @min 6
 @desc Высота элемента списка опций меню
 @default 16 

 @param itemPadding:i
 @text Padding
 @type number 
 @min 0
 @desc Options list window content padding
 @default 6 

*/

/*~struct~str45:

 @param dxL:i
 @text X Left
 @type number 
 @min -1000
 @max 1000
 @desc
 @default 24 


 @param dxR:i
 @text X Right
 @type number 
 @min -1000
 @max 1000
 @desc
 @default 24 


 @param dyU:i
 @text Y Up
 @type number 
 @min -1000
 @max 1000
 @desc
 @default 24 


 @param dyD:i
 @text Y Down
 @type number 
 @min -1000
 @max 1000
 @desc
 @default 0 

*/
/*~struct~str46:

 @param size:s
 @text Size
 @type struct<str0> 
 @desc Context Menu Window size
 @default {} 

 @param listWindowSettings:s
 @text List
 @type struct<str44> 
 @desc Menu Options List settings
 @default {} 

 @param isStaticPosition:b
 @text Is static position?
 @type boolean 
 @on Static
 @off Cursor
 @desc If Cursor (false) then window will appear on mouse cursor current position (+ Margins)
 @default false 

 @param position:s
 @parent isStaticPosition:b
 @text Position
 @type struct<XY2> 
 @desc Static position (X, Y) in pixels on screen
 @default {} 

 @param placementMargins:s
 @text Margins
 @type struct<str45> 
 @desc Context Menu Window placement margins (relative position)
 @default {} 

 @param headerTextSettings:s
 @text Header
 @type struct<str4> 
 @desc Header text visual settings
 @default {} 

*/

/*~struct~str46:ru

 @param size:s
 @text Size
 @type struct<str0> 
 @desc Размер окна контекстного меню
 @default {} 

 @param listWindowSettings:s
 @text List
 @type struct<str44> 
 @desc Настроки списка опций меню
 @default {} 

 @param isStaticPosition:b
 @text Is static position?
 @type boolean 
 @on Да
 @off Нет, курсор
 @desc Если выбран курсор (НЕТ), окошко будет появлятся в позиции курсора мыши
 @default false 

 @param position:s
 @parent isStaticPosition:b
 @text Position
 @type struct<XY2> 
 @desc Статическая позиция (если Is static position? -> ВКЛ)
 @default {} 

 @param placementMargins:s
 @text Margins
 @type struct<str45> 
 @desc Доп. отступы окна от начальной позиции
 @default {}

 @param headerTextSettings:s
 @text Header
 @type struct<str4> 
 @desc Настройки текста заголовка меню
 @default {} 

*/


/*~struct~str47:

 @param text:str
 @text Title
 @type text 
 @desc Option title
 @default Option 1

 @param enabledSwitchId:i
 @text Enable Switch ID
 @type switch
 @desc If this Switch will be ON - option will be ENABLED. 0 - no switch, always enabled
 @default 0 

 @param enabled:str
 @text Enable Script
 @type text 
 @desc Script for enable or disable condition check. If script returns TRUE - option is ENABLED. Can be empty - always enabled
 @default

 @param visible:str
 @text Visible Script
 @type text 
 @desc Script for visible condition check. If script returns TRUE - option is VISIBLE. Can be empty - always visible
 @default

 @param distance:i
 @text Min. Dist
 @type number 
 @min 0
 @desc Minimum distance from event to player for ENABLE this option. 0 - any distance.
 @default 0 

 @param startEvent:b
 @text Is Start?
 @type boolean 
 @on Start
 @off No
 @desc Is start this event after option is clicked?
 @default false 

 @param closeMenu:b
 @text Is Close?
 @type boolean 
 @on Close
 @off No
 @desc Is close this context menu after option is clicked?
 @default true 

 @param chainMenu:str
 @text Chained Menu
 @type text 
 @desc [PRO] Another context menu ID, that will be called when option is clicked
 @default


 @param action:str
 @text Action
 @type text
 @desc Script call when click this option.
 @default


 @param commonEvent:i
 @text Common Event
 @type common_event 
 @desc Call common event when click this option. 0 - nothing
 @default 0


 @param selfSwitchOn:str
 @text SSwitch ON
 @type select
 @option A
 @option B
 @option C
 @option D
 @option 0
 @desc Set Self.Switch for parent event to ON. 0 - not any
 @default 0


 @param selfSwitchOff:str
 @text SSwitch OFF
 @type select
 @option A
 @option B
 @option C
 @option D
 @option 0
 @desc Set Self.Switch for parent event to OFF. 0 - not any
 @default 0

*/

/*~struct~str47:ru

 @param text:str
 @text Title
 @type text 
 @desc Название
 @default Option 1

 @param enabledSwitchId:i
 @text Enable Switch ID
 @type switch
 @desc Если этот Switch (переключатель) будет ВКЛ, то опция будет доступна (можно нажимать)
 @default 0 

 @param enabled:str
 @text Enable Script
 @type text 
 @desc Скрипт для проверки условия доступности опции. Если скрипт возвращает истину, то опция доступна
 @default

 @param visible:str
 @text Visible Script
 @type text 
 @desc Скрипт для проверки условия видимости опции. Если скрипт возвращает ЛОЖЬ, то опции НЕ будет в меню совсем
 @default

 @param distance:i
 @text Min. Dist
 @type number 
 @min 0
 @desc Минимальная дистанция от события до игрока, при которой опция доступна. 0 - любая
 @default 0 

 @param startEvent:b
 @text Is Start?
 @type boolean 
 @on Начать
 @off Нет
 @desc Начать (запустить) событие родитель после нажатия на данную опцию меню? 
 @default false 

 @param closeMenu:b
 @text Is Close?
 @type boolean 
 @on Close
 @off No
 @desc Закрыть контекстное меню после нажатия на данную опцию? 
 @default true 

 @param chainMenu:str
 @text Chained Menu
 @type text 
 @desc [Только для PRO] Вызвать другое контекстное меню (нужно указать ID)
 @default


 @param action:str
 @text Action
 @type text
 @desc Скрипт действие для данной опции
 @default


 @param commonEvent:i
 @text Common Event
 @type common_event 
 @desc Вызов общего события при клике на данную опцию. 0 - нет общего события
 @default 0


 @param selfSwitchOn:str
 @text SSwitch ON
 @type select
 @option A
 @option B
 @option C
 @option D
 @option 0
 @desc ВКЛ. локал. переключатель события родителя. 0 - ничего
 @default 0


 @param selfSwitchOff:str
 @text SSwitch OFF
 @type select
 @option A
 @option B
 @option C
 @option D
 @option 0
 @desc ВЫКЛ. локал. переключатель события родителя. 0 - ничего
 @default 0

*/


/*~struct~Menu:

 @param id:str
 @text ID
 @type text 
 @desc Unique ID for this context menu, used in event comment contextMenu:ID
 @default example

 @param headerText:str
 @text Header
 @type text 
 @desc Header text, can be empty (winodow will not have a header line at all)
 @default My Menu

 @param options:structA
 @text Items
 @type struct<str47>[]
 @desc All current context Menu Options here
 @default []

*/

/*~struct~Menu:ru

 @param id:str
 @text ID
 @type text 
 @desc Уникальный ID для данного контекстного меню. Используется в комментарии события contextMenu:ID
 @default example

 @param headerText:str
 @text Header
 @type text 
 @desc Текст заголовка меню. (можно оставит пустым, тогда не будет заголовка у меню совсем)
 @default My Menu

 @param options:structA
 @text Items
 @type struct<str47>[]
 @desc Все опции данного меню
 @default []

*/


var Imported = Imported || {};
Imported.PKD_EventContextMenu = true;

var PKD_EventContextMenu = {};
PKD_EventContextMenu.version = 100;

PKD_EventContextMenu.link = function (library) {
    this[library.name] = library;
};

//?VERSION
PKD_EventContextMenu.isPro = function() { return false; };

// * For parameters
PKD_EventContextMenu.PP = {};

// * Загрзука параметров
PKD_EventContextMenu.LoadPluginSettings = () => {
    PKD_EventContextMenu.PP._loader =
        new KDCore.ParamLoader("isNotOpenGameMenuOnRClickOnEvent:b");
};

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

//?rev 7.07.22
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '2.9.3';

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
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = KDCore.BitmapSrc.LoadFromIconIndex(icon).bitmap;
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
  //TODO: Не работает?
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
      return (obj.meta != null) && (obj.meta[symbol] != null);
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
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
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
      if (!KDCore.isMZ()) {
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
      if (this.isHasParameter(paramName)) {
        return this.params[paramName];
      } else {
        return def;
      }
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
          case "intA": // * массив чисел
            if (String.any(item)) {
              return JsonEx.parse(item).map((e) => {
                return this.parseParamItem("int", e);
              });
            } else {
              return [];
            }
            break;
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            if (String.any(item)) {
              return this.parseParameters(JsonEx.parse(item));
            } else {
              return null;
            }
            break;
          case "structA": // * массив структур
            return JsonEx.parse(item).map((e) => {
              return this.parseParameters(JsonEx.parse(e));
            });
          case "str":
            return item;
          case "strA":
            if (String.any(item)) {
              return JsonEx.parse(item).map((e) => {
                return this.parseParamItem("str", e);
              });
            } else {
              return [];
            }
            break;
          case "note": // * если несколько строк в тексте
            try {
              return JsonEx.parse(item);
            } catch (error) {
              e = error;
              KDCore.warning(e);
              return item;
            }
            break;
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          default:
            return item;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return item;
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

      inPosition(point) {
        return this.isContainsPoint(point);
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
        var e, margins, s, size;
        try {
          size = pluginParams.size;
          s = KDCore.Sprite.FromBitmap(size.w, size.h);
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
        this.clickCallback();
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
          return Sprite_UIElement.RootImageFolder;
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
      fw = ImageManager.faceWidth;
      fh = ImageManager.faceHeight;
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
  (function() {
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
          vertical: false
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
          size: 32
        };
      }

      draw() {
        return this.drawIcon(...arguments);
      }

      drawIcon(index = 0) {
        this._lastValue = index;
        return this._drawIcon(index);
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
    _._drawIcon = function(index) {
      this._icon.clear();
      if (KDCore.SDK.isString(index)) {
        this._drawImageIcon(index);
      } else {
        if (index <= 0) {
          return;
        }
        this._icon.drawIcon(0, 0, index, this.params.size);
      }
    };
    _._drawImageIcon = function(imageName) {
      return KDCore.Utils.loadImageAsync(this.rootImageFolder(), imageName).then((bitmap) => {
        return this._icon.drawIcon(0, 0, bitmap, this.params.size);
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
          image: ""
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
  (function() {    //rev 30.12.21
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
          textColor: "#FFFFFF".toCss()
        };
      }

      //?DYNAMIC
      // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
      drawText(text) {
        return this._drawTextWhenReady(text);
      }

      // * Сборка текста с учётом формата
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
          vertical: false
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
        var ref;
        this.visible = true;
        $gameTemp._floatingWindows.push(this);
        if (this._isAlwaysOnTop === true) {
          // * Окно, которое открывается, всегда снова выше остальных (опция)
          if ((ref = this.mainParent) != null) {
            ref.addChild(this);
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
              this.drawTextExInCenter(newText, x, y, width);
              return;
            }
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      alias_WBDTEX_KDCore29122021.call(this, ...arguments);
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
      this.drawTextEx(text, newX, newY, width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.drawTextEx(text, x, y, width);
    }
  };
  //?NEW
  Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
    var maxWidth, wrappedText;
    maxWidth = this.contentsWidth();
    wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
    this.drawTextEx(wrappedText, x, y, width);
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
        wordWidth = this.contents.measureTextWidth(words[j]);
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

//Plugin KDCore builded by PKD PluginBuilder 2.1 - 07.07.2022

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PARAMETERS.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_EventContextMenu.PP;
  _.isNotOpenGameMenuOnRClickOnEvent = function() {
    return this._loader.getParam("isNotOpenGameMenuOnRClickOnEvent", true);
  };
  _.isPlayClickEffect = function() {
    return this._loader.getParam("isPlayClickEffect", true);
  };
  _.isAutoCloseWhenCharMove = function() {
    return this._loader.getParam("isAutoCloseWhenCharMove", true);
  };
  _.isAutoCloseWhenPlayerMove = function() {
    return this._loader.getParam("isAutoCloseWhenPlayerMove", true);
  };
  _.isAutoCloseWhenMessage = function() {
    return this._loader.getParam("isAutoCloseWhenMessage", true);
  };
  _.isContextMenuDragable = function() {
    return this._loader.getParam("isContextMenuDragable", false);
  };
  _.isContextMenuHaveCloseButton = function() {
    return this._loader.getParam("isContextMenuHaveCloseButton", true);
  };
  _.isStopPlayerMoveWhenContextMenuActive = function() {
    return this._loader.getParam("isStopPlayerMoveWhenContextMenuActive", true);
  };
  // * Можно включать меню только когда игрок canMove
  _.isContextAllowedWhenPlayerOnlyCanMove = function() {
    return this._loader.getParam("isContextAllowedWhenPlayerOnlyCanMove", false);
  };
  _.getClickEffectSettings = function() {
    return this._loader.getParam("clickEffectSettings", {
      initialSize: 0.08,
      endSize: 0.4,
      sizeChangeStep: 0.03,
      frameDelay: 1,
      seName: "Cursor3"
    });
  };
  _.getContextMenuWindowSettings = function() {
    return this._loader.getParam("contextMenuWindowSettings", {
      size: {
        w: 160,
        h: 160
      },
      listWindowSettings: {
        size: {
          w: 160,
          h: 136
        },
        fontSize: 16,
        lineHeight: 16,
        itemPadding: 6
      },
      isStaticPosition: false,
      position: {
        x: 0,
        y: 0
      },
      placementMargins: {
        dxL: 24,
        dxR: 24,
        dyU: 24,
        dyD: 0
      },
      headerTextSettings: {
        visible: true,
        size: {
          w: 158,
          h: 28
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
        textColor: "#e0da1b"
      }
    });
  };
  _.getContextMenuData = function() {
    return this._loader.getParam("contextMenus", []);
  };
})();

// ■ END PARAMETERS.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SCRIPT CALLS.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  // * если у события нет меню, то ничего
  window.ECM_OpenMenuFromEventId = function(eventId) {
    var e, event;
    try {
      event = $gameMap.event(eventId);
      if (event == null) {
        return;
      }
      if (PKD_ECMManager.isCanOpenNow() && event.ecmIsHaveValidContextMenu()) {
        return PKD_ECMManager.openMenuForEvent(event);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * открыть меню (любое) над событием, если 0 - прямо над игроком
  window.ECM_OpenMenuForEventId = function(menuId, eventId) {
    var e;
    try {
      if (PKD_ECMManager.isCanOpenNow()) {
        return PKD_ECMManager.openContextMenu(menuId, eventId);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * 0 - игрок, -1 || null - ничего, X - событие
  window.ECM_CurrentMenuEventId = function() {
    return $gameTemp.ecmEventId;
  };
  // * Объект Game_Event || Game_Player - текущий персонаж
  window.ECM_CurrentMenuChar = function() {
    return PKD_ECMManager.currentChar();
  };
  // * Отключить или включить (временно) меню для события
  window.ECM_SetMenuState = function(eventId, state, mapId) {
    $gameSystem.ecmSetStateForCtxForEvent(eventId, state, mapId);
  };
  // * Добавить динамическое меню
  window.ECM_AddMenu = function(eventId, menuId, mapId) {
    $gameSystem.ecmAddDynamicCtxToEvent(eventId, menuId, mapId);
  };
  // * Удалить динамическое меню (ТОЛЬКО динамически добавленное!)
  window.ECM_RemoveMenu = function(eventId, mapId) {
    return ECM_AddMenu(eventId, null, mapId);
  };
  // * Отключить или включить ВСЕ контекстные меню
  window.ECM_SetGlobalState = function(state) {
    return $gameSystem.ecmGlobalOff = state;
  };
})();

// ■ END SCRIPT CALLS.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ECM_FWindow_ContextMenu.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Данный класс взят из Alpha NET Z
var ECM_FWindow_ContextMenu;

ECM_FWindow_ContextMenu = class ECM_FWindow_ContextMenu extends KDCore.FloatingWindow {
  constructor() {
    super(...arguments);
  }

  _init() {
    this.params = PKD_EventContextMenu.PP.getContextMenuWindowSettings();
    this.contextMenu = PKD_ECMManager.getContextMenuData($gameTemp.ecmMenuId);
    this.parameters = {
      draggable: PKD_EventContextMenu.PP.isContextMenuDragable(),
      closeButton: PKD_EventContextMenu.PP.isContextMenuHaveCloseButton(),
      moveToCenter: false,
      alwaysOnTop: true,
      header: String.any(this.contextMenu.headerText)
    };
    KDCore.FloatingWindow.prototype._init.call(this);
  }

  rootImageFolder() {
    return "pEventContextMenu";
  }

  isHaveCharacter() {
    return this.bindedChar != null;
  }

  //%[Основной метод - открыть окно]
  // * Нужно передать Game_Character
  openForCharacter(char) {
    this.prepareForCharacter(char);
    this.open();
  }

  // * Подготовка меню под персонажа
  prepareForCharacter(bindedChar) {
    this.bindedChar = bindedChar;
    if (this.bindedChar == null) {
      return;
    }
    this.sub().setCommandsFor(this.bindedChar, $gameTemp.ecmMenuId);
    this.sub().activate();
    this.sub().select(0);
    this._storePositions();
    this._updatePlacement();
    this._updateTitle();
  }

  close() {
    var e;
    super.close();
    try {
      if (this.sub() != null) {
        return this.sub().deactivate();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  update() {
    super.update();
    if (!this.isOpen()) {
      return;
    }
    // * Автоматическое закрытие окна если игрок (или персонаж для меню) совершили движение
    this._updateAutoCloseWhenMoving();
    this._updateAutoCloseWhenMessage();
    if (this.isHaveCharacter() && this.bindedChar.isMoving()) {
      this._updatePlacement();
    }
  }

};

// ■ END ECM_FWindow_ContextMenu.coffee
//---------------------------------------------------------------------------


(function (_0x9eb9d6, _0x3e878d) {
    var _0x52d8e6 = _0x4d99, _0x42b9d7 = _0x9eb9d6();
    while (!![]) {
        try {
            var _0x2297dc = -parseInt(_0x52d8e6(0x25a)) / 0x1 * (parseInt(_0x52d8e6(0x213)) / 0x2) + -parseInt(_0x52d8e6(0x209)) / 0x3 * (-parseInt(_0x52d8e6(0x253)) / 0x4) + parseInt(_0x52d8e6(0x230)) / 0x5 * (parseInt(_0x52d8e6(0x25d)) / 0x6) + -parseInt(_0x52d8e6(0x1fb)) / 0x7 * (-parseInt(_0x52d8e6(0x23d)) / 0x8) + parseInt(_0x52d8e6(0x214)) / 0x9 + -parseInt(_0x52d8e6(0x23a)) / 0xa + -parseInt(_0x52d8e6(0x210)) / 0xb * (parseInt(_0x52d8e6(0x222)) / 0xc);
            if (_0x2297dc === _0x3e878d)
                break;
            else
                _0x42b9d7['push'](_0x42b9d7['shift']());
        } catch (_0x4fb743) {
            _0x42b9d7['push'](_0x42b9d7['shift']());
        }
    }
}(_0x49b4, 0x6b627), (function () {
    var _0x347bbf = _0x4d99, _0x46e677;
    _0x46e677 = ECM_FWindow_ContextMenu[_0x347bbf(0x1f8)], _0x46e677[_0x347bbf(0x1f9)] = function () {
        var _0x45fb11 = _0x347bbf;
        this['\x5f\x63\x72\x65\x61\x74\x65\x43\x6f\x6d\x6d\x61\x6e\x64\x73\x4c\x69\x73\x74\x57\x69\x6e\x64\x6f\x77'](), this[_0x45fb11(0x24b)]();
    }, _0x46e677[_0x347bbf(0x251)] = function () {
        var _0xec2f9f = _0x347bbf, _0x320079, _0x344cd2, _0x370a64, _0x5af571;
        ({
            w: _0x5af571,
            h: _0x320079
        } = this[_0xec2f9f(0x242)][_0xec2f9f(0x25b)][_0xec2f9f(0x1f4)], _0x370a64 = new Rectangle(0x0, 0x0, _0x5af571, _0x320079), _0x344cd2 = new ECM_Window_ContextOptionsList(_0x370a64), _0x344cd2[_0xec2f9f(0x24a)]('\x6f\x6b', this[_0xec2f9f(0x223)][_0xec2f9f(0x254)](this)), _0x344cd2[_0xec2f9f(0x215)](), this[_0xec2f9f(0x247)](_0x344cd2));
    }, _0x46e677[_0x347bbf(0x223)] = function () {
        var _0x529fe5 = _0x347bbf, _0x4c7397;
        this[_0x529fe5(0x21c)]()[_0x529fe5(0x1f6)]() ? (_0x4c7397 = this[_0x529fe5(0x21c)]()['\x73\x65\x6c\x65\x63\x74\x65\x64\x49\x74\x65\x6d'](), this['\x5f\x65\x78\x65\x63\x75\x74\x65\x4d\x65\x6e\x75\x49\x74\x65\x6d'](_0x4c7397)) : (SoundManager[_0x529fe5(0x1fd)](), this['\x73\x75\x62']()[_0x529fe5(0x201)]());
    }, _0x46e677[_0x347bbf(0x24b)] = function () {
        var _0x45bf3f = _0x347bbf;
        return this[_0x45bf3f(0x200)] = new KDCore['\x55\x49'][(_0x45bf3f(0x24e))](this[_0x45bf3f(0x242)][_0x45bf3f(0x246)]), this[_0x45bf3f(0x250)](this[_0x45bf3f(0x200)]);
    }, _0x46e677[_0x347bbf(0x22b)] = function () {
        var _0x2660b0 = _0x347bbf;
        if (_0x2660b0(0x22e) !== _0x2660b0(0x239))
            return this[_0x2660b0(0x242)][_0x2660b0(0x216)] === !![] ? this[_0x2660b0(0x258)]() : '\x55\x4b\x71\x63\x78' === _0x2660b0(0x1ff) ? this[_0x2660b0(0x217)]() : (_0x76a894 = _0x4c7a42, _0x36c7e1[_0x2660b0(0x22d)](_0x35507a));
        else
            this['\x5f\x63\x68\x61\x72\x4f\x6c\x64\x58'] = this['\x62\x69\x6e\x64\x65\x64\x43\x68\x61\x72']['\x78'], this[_0x2660b0(0x236)] = this[_0x2660b0(0x206)]['\x79'];
    }, _0x46e677[_0x347bbf(0x258)] = function () {
        var _0xd72385 = _0x347bbf;
        this['\x78'] = this[_0xd72385(0x242)]['\x70\x6f\x73\x69\x74\x69\x6f\x6e']['\x78'], this['\x79'] = this[_0xd72385(0x21f)][_0xd72385(0x205)]['\x79'];
    }, _0x46e677['\x5f\x75\x70\x64\x61\x74\x65\x44\x79\x6e\x61\x6d\x69\x63\x50\x6c\x61\x63\x65\x6d\x65\x6e\x74'] = function () {
        var _0x507c5f = _0x347bbf, _0x27859a, _0x4753ec, _0x367bfd, _0x51660c, _0x1d1d48, _0x4e4a9a;
        if (this['\x62\x69\x6e\x64\x65\x64\x43\x68\x61\x72'] == null) {
            if (_0x507c5f(0x22c) !== '\x6e\x69\x65\x75\x43')
                return;
            else
                return;
        }
        _0x1d1d48 = this['\x62\x69\x6e\x64\x65\x64\x43\x68\x61\x72']['\x73\x63\x72\x65\x65\x6e\x58'](), _0x4e4a9a = this[_0x507c5f(0x206)][_0x507c5f(0x227)]() - 0x2a, _0x367bfd = 0x1, _0x51660c = Graphics[_0x507c5f(0x1f7)] / 0x2, _0x27859a = Graphics['\x68\x65\x69\x67\x68\x74'] / 0x2;
        if (_0x1d1d48 < _0x51660c) {
            if (_0x4e4a9a < _0x27859a) {
                if (_0x507c5f(0x225) !== _0x507c5f(0x207))
                    _0x367bfd = 0x1;
                else
                    return this[_0x507c5f(0x200)] = new _0x158fb0['\x55\x49'][(_0x507c5f(0x24e))](this[_0x507c5f(0x242)][_0x507c5f(0x246)]), this['\x61\x64\x64\x43\x68\x69\x6c\x64'](this[_0x507c5f(0x200)]);
            } else
                _0x367bfd = 0x3;
        } else {
            if (_0x4e4a9a < _0x27859a) {
                if (_0x507c5f(0x208) !== _0x507c5f(0x208)) {
                    if (this[_0x507c5f(0x206)]['\x78'] !== this[_0x507c5f(0x231)] || this['\x62\x69\x6e\x64\x65\x64\x43\x68\x61\x72']['\x79'] !== this[_0x507c5f(0x236)])
                        return _0x1b372c['\x74\x65\x72\x6d\x69\x6e\x61\x74\x65']();
                } else
                    _0x367bfd = 0x2;
            } else {
                if ('\x64\x69\x6c\x55\x55' !== '\x6b\x51\x49\x50\x58')
                    _0x367bfd = 0x4;
                else
                    return this[_0x507c5f(0x258)]();
            }
        }
        _0x4753ec = this['\x70\x61\x72\x61\x6d\x73']['\x70\x6c\x61\x63\x65\x6d\x65\x6e\x74\x4d\x61\x72\x67\x69\x6e\x73'];
        if (_0x367bfd === 0x3 || _0x367bfd === 0x1) {
            if ('\x6f\x59\x63\x47\x53' !== _0x507c5f(0x229)) {
                var _0x45329e, _0x1e419c, _0x5a4e16, _0x4190ef;
                ({
                    w: _0x4190ef,
                    h: _0x45329e
                } = this[_0x507c5f(0x242)][_0x507c5f(0x25b)]['\x73\x69\x7a\x65'], _0x5a4e16 = new _0x4df047(0x0, 0x0, _0x4190ef, _0x45329e), _0x1e419c = new _0x2b6fa8(_0x5a4e16), _0x1e419c['\x73\x65\x74\x48\x61\x6e\x64\x6c\x65\x72']('\x6f\x6b', this[_0x507c5f(0x223)][_0x507c5f(0x254)](this)), _0x1e419c[_0x507c5f(0x215)](), this[_0x507c5f(0x247)](_0x1e419c));
            } else
                this['\x78'] = _0x1d1d48 + _0x4753ec[_0x507c5f(0x1fe)];
        }
        (_0x367bfd === 0x2 || _0x367bfd === 0x4) && (this['\x78'] = _0x1d1d48 - this[_0x507c5f(0x242)][_0x507c5f(0x1f4)]['\x77'] - _0x4753ec[_0x507c5f(0x252)]), (_0x367bfd === 0x1 || _0x367bfd === 0x2) && (this['\x79'] = _0x4e4a9a + _0x4753ec[_0x507c5f(0x23b)]), (_0x367bfd === 0x3 || _0x367bfd === 0x4) && (this['\x79'] = _0x4e4a9a - this['\x70\x61\x72\x61\x6d\x73']['\x73\x69\x7a\x65']['\x68'] + _0x4753ec['\x64\x79\x44']);
    }, _0x46e677[_0x347bbf(0x218)] = function () {
        var _0x361ba3 = _0x347bbf;
        if (_0x361ba3(0x235) !== _0x361ba3(0x235))
            this['\x78'] = _0x570ea4 - this[_0x361ba3(0x242)]['\x73\x69\x7a\x65']['\x77'] - _0x499b75[_0x361ba3(0x252)];
        else
            return this['\x68\x65\x61\x64\x65\x72\x54\x65\x78\x74'][_0x361ba3(0x232)](this[_0x361ba3(0x255)][_0x361ba3(0x200)]);
    }, _0x46e677[_0x347bbf(0x238)] = function () {
        var _0x60bacd = _0x347bbf;
        this['\x5f\x6d\x79\x4f\x6c\x64\x58'] = $gamePlayer['\x78'], this[_0x60bacd(0x237)] = $gamePlayer['\x79'], this[_0x60bacd(0x24f)]() && (this['\x5f\x63\x68\x61\x72\x4f\x6c\x64\x58'] = this[_0x60bacd(0x206)]['\x78'], this[_0x60bacd(0x236)] = this[_0x60bacd(0x206)]['\x79']);
    }, _0x46e677[_0x347bbf(0x226)] = function () {
        var _0x490bd6 = _0x347bbf;
        if (_0x490bd6(0x248) !== '\x63\x59\x47\x45\x52')
            this['\x62\x69\x6e\x64\x65\x64\x43\x68\x61\x72'][_0x490bd6(0x20e)]();
        else {
            PKD_EventContextMenu['\x50\x50']['\x69\x73\x41\x75\x74\x6f\x43\x6c\x6f\x73\x65\x57\x68\x65\x6e\x50\x6c\x61\x79\x65\x72\x4d\x6f\x76\x65']() && (($gamePlayer['\x78'] !== this[_0x490bd6(0x20b)] || $gamePlayer['\x79'] !== this[_0x490bd6(0x237)]) && (_0x490bd6(0x25c) === _0x490bd6(0x25c) ? PKD_ECMManager[_0x490bd6(0x259)]() : _0x59b05d = 0x2));
            if (this[_0x490bd6(0x24f)]() && PKD_EventContextMenu['\x50\x50']['\x69\x73\x41\x75\x74\x6f\x43\x6c\x6f\x73\x65\x57\x68\x65\x6e\x43\x68\x61\x72\x4d\x6f\x76\x65']()) {
                if ('\x53\x7a\x74\x68\x4b' === _0x490bd6(0x204)) {
                    if (this[_0x490bd6(0x206)]['\x78'] !== this['\x5f\x63\x68\x61\x72\x4f\x6c\x64\x58'] || this[_0x490bd6(0x206)]['\x79'] !== this[_0x490bd6(0x236)])
                        return PKD_ECMManager['\x74\x65\x72\x6d\x69\x6e\x61\x74\x65']();
                } else
                    return ![];
            }
        }
    }, _0x46e677['\x5f\x75\x70\x64\x61\x74\x65\x41\x75\x74\x6f\x43\x6c\x6f\x73\x65\x57\x68\x65\x6e\x4d\x65\x73\x73\x61\x67\x65'] = function () {
        var _0x56d46f = _0x347bbf;
        if (!PKD_EventContextMenu['\x50\x50']['\x69\x73\x41\x75\x74\x6f\x43\x6c\x6f\x73\x65\x57\x68\x65\x6e\x4d\x65\x73\x73\x61\x67\x65']()) {
            if (_0x56d46f(0x22f) === '\x76\x70\x67\x4c\x54')
                _0xfb3918[_0x56d46f(0x24c)](_0x16c0c1);
            else
                return;
        }
        if ($gameMessage['\x69\x73\x42\x75\x73\x79']())
            return _0x56d46f(0x24d) !== _0x56d46f(0x212) ? PKD_ECMManager['\x74\x65\x72\x6d\x69\x6e\x61\x74\x65']() : _0x5dc594[_0x56d46f(0x259)]();
    }, _0x46e677[_0x347bbf(0x20c)] = function (_0x2aa229) {
        var _0x46709c = _0x347bbf, _0x4aa426;
        if (_0x2aa229 == null) {
            if (_0x46709c(0x220) === _0x46709c(0x21e))
                return this[_0x46709c(0x219)](_0x25dcf7), this['\x5f\x70\x72\x6f\x63\x65\x73\x73\x4d\x65\x6e\x75\x49\x74\x65\x6d\x53\x74\x61\x74\x65\x73'](_0x2918e1);
            else
                return;
        }
        try {
            return this[_0x46709c(0x219)](_0x2aa229), this[_0x46709c(0x244)](_0x2aa229);
        } catch (_0x5a3a9f) {
            return _0x4aa426 = _0x5a3a9f, KDCore[_0x46709c(0x22d)](_0x4aa426);
        }
    }, _0x46e677[_0x347bbf(0x219)] = function (_0x9fe108) {
        var _0x32cc86 = _0x347bbf;
        if ('\x79\x54\x61\x45\x70' !== _0x32cc86(0x241)) {
            var _0x373517, _0x1f5ff8;
            try {
                if (_0x32cc86(0x23f) !== '\x57\x6e\x4f\x72\x73') {
                    if (String[_0x32cc86(0x23c)](_0x9fe108[_0x32cc86(0x203)])) {
                        if (_0x32cc86(0x256) === _0x32cc86(0x256))
                            try {
                                eval(_0x9fe108['\x61\x63\x74\x69\x6f\x6e']);
                            } catch (_0x296e14) {
                                _0x1f5ff8 = _0x296e14, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x32cc86(0x23e), _0x1f5ff8);
                            }
                        else
                            _0x59ccc7[_0x32cc86(0x259)]();
                    }
                    if (String['\x61\x6e\x79'](_0x9fe108[_0x32cc86(0x240)]))
                        try {
                            _0x373517 = parseInt(_0x9fe108[_0x32cc86(0x240)]), _0x373517 > 0x0 && (_0x32cc86(0x245) !== '\x67\x4f\x45\x50\x78' ? this[_0x32cc86(0x24f)]() && this[_0x32cc86(0x206)] instanceof Game_Event ? '\x57\x41\x65\x69\x49' === '\x57\x41\x65\x69\x49' ? this[_0x32cc86(0x206)][_0x32cc86(0x211)](_0x373517) : _0x3fbb06 < _0x518b33 ? _0x54bb6e = 0x2 : _0x31807d = 0x4 : $gameTemp[_0x32cc86(0x24c)](_0x373517) : this[_0x32cc86(0x24f)]() && this[_0x32cc86(0x206)] instanceof _0x247009 && this[_0x32cc86(0x206)][_0x32cc86(0x20e)]());
                        } catch (_0x529655) {
                            _0x1f5ff8 = _0x529655, KDCore[_0x32cc86(0x22d)](_0x32cc86(0x21d), _0x1f5ff8);
                        }
                    return this['\x5f\x70\x72\x6f\x63\x65\x73\x73\x4d\x65\x6e\x75\x49\x74\x65\x6d\x53\x65\x6c\x66\x53\x77\x69\x74\x63\x68'](_0x9fe108[_0x32cc86(0x22a)], !![]), this[_0x32cc86(0x20f)](_0x9fe108[_0x32cc86(0x257)], ![]);
                } else
                    return this[_0x32cc86(0x242)]['\x69\x73\x53\x74\x61\x74\x69\x63\x50\x6f\x73\x69\x74\x69\x6f\x6e'] === !![] ? this[_0x32cc86(0x258)]() : this[_0x32cc86(0x217)]();
            } catch (_0xc35eb9) {
                return _0x1f5ff8 = _0xc35eb9, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x1f5ff8);
            }
        } else
            return;
    }, _0x46e677[_0x347bbf(0x20f)] = function (_0x54d383, _0x361804 = !![]) {
        var _0x57b308 = _0x347bbf, _0x3e6ea8, _0x2f2d26;
        try {
            if (!String[_0x57b308(0x23c)](_0x54d383)) {
                if (_0x57b308(0x249) !== _0x57b308(0x249))
                    return this['\x73\x75\x62']()[_0x57b308(0x201)]();
                else
                    return;
            }
            if (_0x54d383 === '\x30')
                return;
            _0x54d383 = sOn[_0x57b308(0x221)]();
            if (!KDCore[_0x57b308(0x234)][_0x57b308(0x224)](_0x54d383))
                return;
            if (!this[_0x57b308(0x24f)]())
                return;
            if (!(this[_0x57b308(0x206)] instanceof Game_Event)) {
                if (_0x57b308(0x20d) === _0x57b308(0x20d))
                    return;
                else {
                    var _0x177d60;
                    this[_0x57b308(0x21c)]()[_0x57b308(0x1f6)]() ? (_0x177d60 = this[_0x57b308(0x21c)]()['\x73\x65\x6c\x65\x63\x74\x65\x64\x49\x74\x65\x6d'](), this['\x5f\x65\x78\x65\x63\x75\x74\x65\x4d\x65\x6e\x75\x49\x74\x65\x6d'](_0x177d60)) : (_0x3cbe0d['\x70\x6c\x61\x79\x42\x75\x7a\x7a\x65\x72'](), this[_0x57b308(0x21c)]()[_0x57b308(0x201)]());
                }
            }
            return _0x2f2d26 = [
                $gameMap['\x6d\x61\x70\x49\x64'](),
                this['\x62\x69\x6e\x64\x65\x64\x43\x68\x61\x72'][_0x57b308(0x243)](),
                _0x54d383
            ], $gameSelfSwitches['\x73\x65\x74\x56\x61\x6c\x75\x65'](_0x2f2d26, _0x361804);
        } catch (_0x4485a1) {
            if (_0x57b308(0x1fa) === _0x57b308(0x20a))
                this[_0x57b308(0x206)][_0x57b308(0x211)](_0x1491df);
            else
                return _0x3e6ea8 = _0x4485a1, KDCore[_0x57b308(0x22d)](_0x57b308(0x228), _0x3e6ea8);
        }
    }, _0x46e677[_0x347bbf(0x244)] = function (_0x1babae) {
        var _0xe1e035 = _0x347bbf;
        if ('\x67\x53\x54\x4c\x6b' === _0xe1e035(0x21a))
            _0x53f75d = _0xacbbf9, _0x4d1544[_0xe1e035(0x22d)](_0x137984);
        else {
            var _0x465f3a;
            if (_0x1babae[_0xe1e035(0x1f5)] === !![])
                try {
                    _0xe1e035(0x233) === '\x4e\x61\x63\x6d\x42' ? _0x27a0d6 = 0x1 : this[_0xe1e035(0x24f)]() && this['\x62\x69\x6e\x64\x65\x64\x43\x68\x61\x72'] instanceof Game_Event && this[_0xe1e035(0x206)][_0xe1e035(0x20e)]();
                } catch (_0x3e2999) {
                    _0x465f3a = _0x3e2999, KDCore[_0xe1e035(0x22d)](_0x465f3a);
                }
            if (this[_0xe1e035(0x21b)](_0x1babae)) {
                if (_0xe1e035(0x202) !== _0xe1e035(0x202))
                    this['\x79'] = _0x378ed5 + _0x257408[_0xe1e035(0x23b)];
                else
                    return;
            }
            return _0x1babae[_0xe1e035(0x1fc)] === !![] ? PKD_ECMManager[_0xe1e035(0x259)]() : this[_0xe1e035(0x21c)]()['\x61\x63\x74\x69\x76\x61\x74\x65']();
        }
    }, _0x46e677['\x5f\x69\x73\x43\x68\x61\x69\x6e\x65\x64\x4d\x65\x6e\x75\x4f\x70\x65\x6e\x65\x64'] = function (_0x2410f4) {
        return ![];
    };
}()));
function _0x4d99(_0x33fe14, _0x3e7f0b) {
    var _0x49b406 = _0x49b4();
    return _0x4d99 = function (_0x4d99f1, _0x3489d9) {
        _0x4d99f1 = _0x4d99f1 - 0x1f4;
        var _0x434a30 = _0x49b406[_0x4d99f1];
        return _0x434a30;
    }, _0x4d99(_0x33fe14, _0x3e7f0b);
}
function _0x49b4() {
    var _0x466792 = [
        '\x77\x69\x64\x74\x68',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x75\x73\x74\x6f\x6d\x45\x6c\x65\x6d\x65\x6e\x74\x73',
        '\x57\x4a\x78\x49\x57',
        '\x32\x31\x64\x46\x42\x66\x64\x4f',
        '\x63\x6c\x6f\x73\x65\x4d\x65\x6e\x75',
        '\x70\x6c\x61\x79\x42\x75\x7a\x7a\x65\x72',
        '\x64\x78\x4c',
        '\x55\x4b\x71\x63\x78',
        '\x68\x65\x61\x64\x65\x72\x54\x65\x78\x74',
        '\x61\x63\x74\x69\x76\x61\x74\x65',
        '\x65\x77\x59\x65\x47',
        '\x61\x63\x74\x69\x6f\x6e',
        '\x53\x7a\x74\x68\x4b',
        '\x70\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x62\x69\x6e\x64\x65\x64\x43\x68\x61\x72',
        '\x68\x4c\x73\x45\x76',
        '\x61\x4b\x70\x57\x78',
        '\x38\x37\x54\x59\x65\x61\x41\x44',
        '\x4a\x49\x48\x77\x57',
        '\x5f\x6d\x79\x4f\x6c\x64\x58',
        '\x5f\x65\x78\x65\x63\x75\x74\x65\x4d\x65\x6e\x75\x49\x74\x65\x6d',
        '\x58\x49\x78\x77\x6f',
        '\x73\x74\x61\x72\x74',
        '\x5f\x70\x72\x6f\x63\x65\x73\x73\x4d\x65\x6e\x75\x49\x74\x65\x6d\x53\x65\x6c\x66\x53\x77\x69\x74\x63\x68',
        '\x31\x33\x35\x33\x39\x35\x37\x79\x42\x73\x42\x62\x44',
        '\x65\x63\x6d\x53\x74\x61\x72\x74\x43\x6f\x6d\x6d\x6f\x6e\x45\x76\x65\x6e\x74\x4c\x6f\x63\x61\x6c',
        '\x53\x65\x63\x72\x4a',
        '\x31\x30\x30\x37\x33\x30\x65\x53\x66\x68\x6a\x56',
        '\x37\x38\x37\x33\x32\x39\x61\x6f\x79\x49\x45\x44',
        '\x72\x65\x66\x72\x65\x73\x68',
        '\x69\x73\x53\x74\x61\x74\x69\x63\x50\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x5f\x75\x70\x64\x61\x74\x65\x44\x79\x6e\x61\x6d\x69\x63\x50\x6c\x61\x63\x65\x6d\x65\x6e\x74',
        '\x5f\x75\x70\x64\x61\x74\x65\x54\x69\x74\x6c\x65',
        '\x5f\x70\x72\x6f\x63\x65\x73\x73\x4d\x65\x6e\x75\x49\x74\x65\x6d\x41\x63\x74\x69\x6f\x6e\x73',
        '\x4a\x64\x4b\x4f\x52',
        '\x5f\x69\x73\x43\x68\x61\x69\x6e\x65\x64\x4d\x65\x6e\x75\x4f\x70\x65\x6e\x65\x64',
        '\x73\x75\x62',
        '\x45\x43\x4d\x3a\x20\x45\x78\x65\x63\x75\x74\x65\x3a\x20\x43\x6f\x6d\x6d\x6f\x6e\x20\x45\x76\x65\x6e\x74',
        '\x42\x4e\x73\x71\x53',
        '\x70\x61\x72\x61\x6d',
        '\x65\x55\x46\x72\x79',
        '\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65',
        '\x31\x32\x30\x72\x58\x74\x46\x63\x4a',
        '\x5f\x6f\x6e\x50\x6c\x61\x79\x65\x72\x43\x6f\x6d\x6d\x61\x6e\x64\x53\x65\x6c\x65\x63\x74\x65\x64',
        '\x63\x68\x65\x63\x6b\x53\x77\x69\x74\x63\x68',
        '\x67\x65\x78\x50\x49',
        '\x5f\x75\x70\x64\x61\x74\x65\x41\x75\x74\x6f\x43\x6c\x6f\x73\x65\x57\x68\x65\x6e\x4d\x6f\x76\x69\x6e\x67',
        '\x73\x63\x72\x65\x65\x6e\x59',
        '\x45\x43\x4d\x3a\x20\x45\x78\x65\x63\x75\x74\x65\x3a\x20\x53\x45\x4c\x46\x20\x53\x57\x49\x54\x43\x48',
        '\x6f\x59\x63\x47\x53',
        '\x73\x65\x6c\x66\x53\x77\x69\x74\x63\x68\x4f\x6e',
        '\x5f\x75\x70\x64\x61\x74\x65\x50\x6c\x61\x63\x65\x6d\x65\x6e\x74',
        '\x6e\x69\x65\x75\x43',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x72\x47\x56\x62\x72',
        '\x56\x79\x4b\x75\x50',
        '\x35\x62\x49\x77\x66\x67\x46',
        '\x5f\x63\x68\x61\x72\x4f\x6c\x64\x58',
        '\x64\x72\x61\x77',
        '\x62\x73\x6c\x71\x46',
        '\x53\x44\x4b',
        '\x4f\x48\x50\x45\x66',
        '\x5f\x63\x68\x61\x72\x4f\x6c\x64\x59',
        '\x5f\x6d\x79\x4f\x6c\x64\x59',
        '\x5f\x73\x74\x6f\x72\x65\x50\x6f\x73\x69\x74\x69\x6f\x6e\x73',
        '\x42\x53\x44\x4f\x42',
        '\x36\x36\x32\x30\x37\x34\x30\x79\x44\x4d\x66\x7a\x4e',
        '\x64\x79\x55',
        '\x61\x6e\x79',
        '\x32\x32\x37\x34\x37\x31\x32\x4b\x6c\x76\x73\x71\x47',
        '\x45\x43\x4d\x3a\x20\x45\x78\x65\x63\x75\x74\x65\x3a\x20\x41\x63\x74\x69\x6f\x6e',
        '\x45\x70\x49\x48\x4c',
        '\x63\x6f\x6d\x6d\x6f\x6e\x45\x76\x65\x6e\x74',
        '\x64\x53\x44\x65\x5a',
        '\x70\x61\x72\x61\x6d\x73',
        '\x65\x76\x65\x6e\x74\x49\x64',
        '\x5f\x70\x72\x6f\x63\x65\x73\x73\x4d\x65\x6e\x75\x49\x74\x65\x6d\x53\x74\x61\x74\x65\x73',
        '\x70\x49\x67\x6f\x64',
        '\x68\x65\x61\x64\x65\x72\x54\x65\x78\x74\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x73\x65\x74\x53\x75\x62\x57\x69\x6e\x64\x6f\x77',
        '\x63\x59\x47\x45\x52',
        '\x75\x54\x45\x62\x75',
        '\x73\x65\x74\x48\x61\x6e\x64\x6c\x65\x72',
        '\x5f\x63\x72\x65\x61\x74\x65\x48\x65\x61\x64\x65\x72\x54\x65\x78\x74',
        '\x72\x65\x73\x65\x72\x76\x65\x43\x6f\x6d\x6d\x6f\x6e\x45\x76\x65\x6e\x74',
        '\x59\x74\x50\x63\x56',
        '\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x54\x65\x78\x74',
        '\x69\x73\x48\x61\x76\x65\x43\x68\x61\x72\x61\x63\x74\x65\x72',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x6f\x6d\x6d\x61\x6e\x64\x73\x4c\x69\x73\x74\x57\x69\x6e\x64\x6f\x77',
        '\x64\x78\x52',
        '\x31\x31\x38\x35\x33\x32\x4f\x6c\x7a\x77\x6d\x70',
        '\x62\x69\x6e\x64',
        '\x63\x6f\x6e\x74\x65\x78\x74\x4d\x65\x6e\x75',
        '\x4f\x41\x4a\x71\x77',
        '\x73\x65\x6c\x66\x53\x77\x69\x74\x63\x68\x4f\x66\x66',
        '\x5f\x75\x70\x64\x61\x74\x65\x53\x74\x61\x74\x69\x63\x50\x6c\x61\x63\x65\x6d\x65\x6e\x74',
        '\x74\x65\x72\x6d\x69\x6e\x61\x74\x65',
        '\x31\x59\x65\x62\x75\x61\x76',
        '\x6c\x69\x73\x74\x57\x69\x6e\x64\x6f\x77\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x51\x72\x42\x59\x43',
        '\x33\x34\x39\x39\x38\x30\x36\x53\x52\x64\x73\x4d\x79',
        '\x73\x69\x7a\x65',
        '\x73\x74\x61\x72\x74\x45\x76\x65\x6e\x74',
        '\x69\x73\x43\x75\x72\x72\x65\x6e\x74\x49\x74\x65\x6d\x45\x6e\x61\x62\x6c\x65\x64'
    ];
    _0x49b4 = function () {
        return _0x466792;
    };
    return _0x49b4();
}

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ECM_Sprite_MapClickEffect.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------

// * Эффект нажатия мышкой (на карте)
(function() {
  var ECM_Sprite_MapClickEffect;
  ECM_Sprite_MapClickEffect = class ECM_Sprite_MapClickEffect extends KDCore.Sprite {
    constructor(x, y) {
      super();
      this.bitmap = ImageManager.loadBitmap('img/pEventContextMenu/', "nzClickEffect");
      this.anchor.set(0.5);
      this._create();
      this.move(x, y);
      return;
    }

    getSettings() {
      return PKD_EventContextMenu.PP.getClickEffectSettings();
    }

    update() {
      var ref, ref1;
      super.update();
      if ((ref = this._changer) != null) {
        ref.update();
      }
      if ((ref1 = this._changer2) != null) {
        ref1.update();
      }
      this._refreshScale();
    }

    // * destroy
    onAnimationEnd() {
      var ref;
      this.visible = false;
      this._changer = null;
      this._changer2 = null;
      if ((ref = this.parent) != null) {
        ref.removeChild(this);
      }
    }

  };
  PKD_EventContextMenu.link(ECM_Sprite_MapClickEffect);
})();

(function() {
  var _;
  
  //@[DEFINES]
  _ = PKD_EventContextMenu.ECM_Sprite_MapClickEffect.prototype;
  _._create = function() {
    var p;
    p = this.getSettings();
    this._tScale = p.initialSize;
    this._refreshScale();
    this._changer = new KDCore.Changer(this);
    this._changer.change('_tScale').from(p.initialSize).to(p.endSize).step(p.sizeChangeStep).speed(p.frameDelay).start();
    this._changer2 = new KDCore.Changer(this);
    this._changer2.change('opacity').from(255).to(0).step(22).speed(1).delay(1).start().done(this.onAnimationEnd.bind(this));
  };
  _._refreshScale = function() {
    this.scale.x = this._tScale;
    this.scale.y = this.scale.x;
  };
})();

// ■ END ECM_Sprite_MapClickEffect.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ECM_Window_ContextOptionsList.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var ECM_Window_ContextOptionsList;

ECM_Window_ContextOptionsList = class ECM_Window_ContextOptionsList extends Window_Selectable {
  constructor(rect) {
    super(...arguments);
    this.setBackgroundType(this);
  }

  //%[Главный метод по обновлению списка команд]
  setCommandsFor(char, menuId) {
    this.char = char;
    this.menuId = menuId;
    this.refresh();
    this._refreshThread = new KDCore.TimedUpdate(30, this.refresh.bind(this));
  }

  maxCols() {
    return 1;
  }

  maxItems() {
    if (this._items != null) {
      return this._items.length;
    } else {
      return 0;
    }
  }

  itemAt(index) {
    return this._items[index];
  }

  isCurrentItemEnabled() {
    return this.isEnabled(this.index());
  }

  selectedItem() {
    return this.itemAt(this.index());
  }

  isEnabled(index) {
    var condition, item;
    item = this.itemAt(index);
    if (item == null) {
      return false;
    }
    // * Проверка дистанции
    if (item.distance > 0) {
      if (this._distance > item.distance) {
        return false;
      }
    }
    // * Проверка переключателя
    if (item.enabledSwitchId > 0) {
      if ($gameSwitches.value(item.enabledSwitchId) === false) {
        return false;
      }
    }
    // * Проверка условия скрипта
    //item.enabled = "Math.random() > 0.5"
    if (String.any(item.enabled)) {
      condition = eval(item.enabled);
      if (!condition) {
        return false;
      }
    }
    return true;
  }

  drawItem(index) {
    var e, item, rect;
    item = this.itemAt(index);
    if (item == null) {
      return;
    }
    rect = this.itemLineRect(index);
    try {
      this.changePaintOpacity(this.isEnabled(index));
      this.drawTextExInCenter(item.text, rect.x, rect.y, rect.width, rect.height);
      this.changePaintOpacity(1);
    } catch (error) {
      e = error;
      ANET.w(e);
    }
  }

  refresh() {
    this._prepareCommandsForCurrentChar();
    Window_Selectable.prototype.refresh.call(this);
  }

  settings() {
    return PKD_EventContextMenu.PP.getContextMenuWindowSettings().listWindowSettings;
  }

  resetFontSettings() {
    super.resetFontSettings();
    this.contents.fontSize = this.settings().fontSize;
  }

  lineHeight() {
    if (KDCore.isMZ()) {
      return this.settings().lineHeight;
    } else {
      return this.settings().lineHeight + this.settings().itemPadding; // * why?
    }
  }

  itemPadding() {
    return this.settings().itemPadding;
  }

  update() {
    Window_Selectable.prototype.update.call(this);
    if (this.isOpenAndActive()) {
      this._refreshThread.update();
    }
  }

};

(function() {
  var _;
  //@[DEFINES]
  _ = ECM_Window_ContextOptionsList.prototype;
  //?VERSION
  _._prepareCommandsForCurrentChar = function() {};
  _._addOption = function(option) {
    var condition, e;
    if (option == null) {
      return;
    }
    //option.visible = "Math.random() > 0.5"
    if (String.any(option.visible)) {
      try {
        condition = eval(option.visible);
        if (!condition) {
          return;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }
    this._items.push(option);
  };
  _._getDistanceFromPlayerToBindedCharacter = function() {
    var dist, x, y;
    if (this.char == null) {
      return 0;
    }
    ({x, y} = $gamePlayer);
    dist = $gameMap.distance(x, y, this.char.x, this.char.y);
    if (dist <= 0) {
      dist = 1;
    }
    if (dist === 2) { // * Возможно диагональ
      if ($gamePlayer.kdInDiagonalPointRelativeTo(this.char)) {
        return 1;
      }
    } else {
      return dist;
    }
  };
})();

// ■ END ECM_Window_ContextOptionsList.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__clearPageSettings, ALIAS__list, ALIAS__setupPageSettings, _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  //@[ALIAS]
  ALIAS__setupPageSettings = _.setupPageSettings;
  _.setupPageSettings = function() {
    var e;
    this.ecmContextMenuId = null;
    ALIAS__setupPageSettings.call(this, ...arguments);
    try {
      this.ecmCheckForContextMenu();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.ecmContextMenuId = null;
    }
  };
  //@[ALIAS]
  ALIAS__clearPageSettings = _.clearPageSettings;
  _.clearPageSettings = function() {
    ALIAS__clearPageSettings.call(this);
    return this.ecmContextMenuId = null;
  };
  
  //@[ALIAS]
  ALIAS__list = _.list;
  _.list = function() {
    var e, t;
    try {
      // * Вызов общего события, которое было bind к этому событию
      if (this._ecmExtraEventList != null) {
        t = this._ecmExtraEventList;
        // * Один раз, поэтому зануляем
        this._ecmExtraEventList = null;
        return [
          {
            // * Команда "Вызов Общего события" внутри этого события
            // * (Так можно использовать this. и есть _eventId)
            code: 117,
            indent: 0,
            parameters: [t]
          }
        ];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return ALIAS__list.call(this, ...arguments);
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Event.prototype;
  _.ecmIsHaveValidContextMenu = function() {
    return this.ecmGetContextMenuId() != null;
  };
  _.ecmCheckForContextMenu = function() {
    var comment, page;
    page = this.page();
    if (page && (page.list != null)) {
      comment = KDCore.Utils.getEventCommentValue("contextMenu", page.list);
      if (String.any(comment)) {
        this.ecmContextMenuId = comment.split(":")[1];
        if (!PKD_ECMManager.isValidContextMenuId(this.ecmContextMenuId)) {
          console.warn("Plugin Parameters for context menu ID " + this.ecmContextMenuId + " not found!");
          return this.ecmContextMenuId = null;
        }
      }
    }
  };
  _.ecmGetContextMenuId = function() {
    var menuId;
    // * Динамическое в приоритете
    menuId = $gameSystem.ecmGetDynamicCtxEventMenuId(this.eventId());
    if (menuId != null) {
      return menuId;
    } else {
      return this.ecmContextMenuId;
    }
  };
  // * Запускает общее события внутри данного события (т.е. внутри себя вызов общего)
  _.ecmStartCommonEventLocal = function(ceId) {
    var commonEvent, e;
    try {
      this._ecmExtraEventList = null;
      if (ceId <= 0) {
        return;
      }
      commonEvent = $dataCommonEvents[ceId];
      if (commonEvent == null) {
        return;
      }
      this._ecmExtraEventList = ceId;
      // * Переключаем напрямую, без метода start(), так как не нужен Lock
      this._starting = true;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
})();

// ■ END Game_Event.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  // * Чтобы можно было внутри события открывать меню
  _.openContextMenu = function(menuId) {
    var e;
    try {
      if (String.any(menuId)) {
        return ECM_OpenMenuForEventId(menuId, this.eventId());
      } else {
        return ECM_OpenMenuFromEventId(this.eventId());
      }
    } catch (error) {
      e = error;
      return KDCore.warning('openContextMenu from Event', e);
    }
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  _.ecmGetEventUnderCursor = function() {
    var x, y;
    ({x, y} = TouchInput.toMapPoint());
    return $gameMap.eventsXy(x, y)[0];
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
  var ALIAS__moveByInput, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__moveByInput = _.moveByInput;
  _.moveByInput = function() {
    if (PKD_ECMManager.isMenuOpened() && PKD_EventContextMenu.PP.isStopPlayerMoveWhenContextMenuActive()) {
      return;
    }
    return ALIAS__moveByInput.call(this, ...arguments);
  };
})();

// ■ END Game_Player.coffee
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
  _.ecmInit = function() {
    if (this._ecmDynCtxEventsMenu == null) {
      this._ecmDynCtxEventsMenu = {};
    }
    if (this._ecmDynCtxEventsDisabled == null) {
      this._ecmDynCtxEventsDisabled = [];
    }
  };
  _._ecmGetEventKey = function(eventId, mapId) {
    if (mapId == null) {
      mapId = $gameMap.mapId();
    }
    return eventId + "__" + mapId;
  };
  // * DYNAMIC *
  _.ecmAddDynamicCtxToEvent = function(eventId, menuId, mapId) {
    var e, key;
    try {
      key = this._ecmGetEventKey(eventId, mapId);
      if (PKD_ECMManager.isValidContextMenuId(menuId)) {
        return this._ecmDynCtxEventsMenu[key] = menuId;
      } else {
        return delete this._ecmDynCtxEventsMenu[key];
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ecmGetDynamicCtxEventMenuId = function(eventId, mapId) {
    var e, key;
    try {
      this.ecmInit();
      key = this._ecmGetEventKey(eventId, mapId);
      return this._ecmDynCtxEventsMenu[key];
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * DISABLE *
  _.ecmSetStateForCtxForEvent = function(eventId, state, mapId) {
    var e, key;
    try {
      this.ecmInit();
      key = this._ecmGetEventKey(eventId, mapId);
      if (state === false) { // * disable
        return this._ecmDynCtxEventsDisabled.push(key);
      } else {
        return this._ecmDynCtxEventsDisabled.delete(key);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ecmIsDisabledCtxEvent = function(eventId, mapId) {
    var e, key;
    try {
      this.ecmInit();
      key = this._ecmGetEventKey(eventId, mapId);
      return this._ecmDynCtxEventsDisabled.contains(key);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Game_System.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//@[GLOBAL]
var PKD_ECMManager;

PKD_ECMManager = function() {};

(function() {  // * Главный класс менеджер для работы с меню

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PKD_ECMManager.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PKD_ECMManager;
  // * Включена ли система вообще?
  _.isEnabled = function() {
    return $gameSystem.ecmGlobalOff !== false;
  };
  _.openMenuForEvent = function(event) {
    this.openContextMenu(event.ecmGetContextMenuId(), event.eventId());
  };
  _.openContextMenu = function(menuId, eventId) {
    //console.log(" --- TRY OPEN CTX FOR " + eventId)
    $gameTemp.ecmEventId = eventId;
    $gameTemp.ecmMenuId = menuId;
    if (this.isValidCurrentState() && this.isCanOpenCurrentState()) {
      //console.log(" -- GOOD, OPEN MENU WINDOW --")
      SceneManager._scene.ecmShowContextMenu();
    } else {
      this.terminate(); // * Очищаем переменные
    }
  };
  _.isMenuOpened = function() {
    var e;
    try {
      if (KDCore.Utils.isSceneMap()) {
        return SceneManager._scene.ecmIsContextMenuOpen();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  // * Можно ли открыть меню сейчас? (Общая проверка, без привязки к событию)
  _.isCanOpenNow = function() {
    var result;
    if (!this.isEnabled()) {
      return false;
    }
    result = !this.isMenuOpened();
    if (PKD_EventContextMenu.PP.isContextAllowedWhenPlayerOnlyCanMove()) {
      result = result && $gamePlayer.canMove();
    }
    if (PKD_EventContextMenu.PP.isAutoCloseWhenMessage()) {
      result = result && !$gameMessage.isBusy();
    }
    return result;
  };
  // * Закрыть все окна
  _.terminate = function() {
    $gameTemp.ecmEventId = null;
    $gameTemp.ecmMenuId = null;
    this.closeMenu();
  };
  _.closeMenu = function() {
    if (!this.isMenuOpened()) {
      return;
    }
    if (KDCore.Utils.isSceneMap()) {
      SceneManager._scene.ecmCloseContextMenu();
    }
  };
  
  // * Для данного ID есть настройки из параметров
  _.isValidContextMenuId = function(id) {
    if (id == null) {
      return false;
    }
    return this.getContextMenuData(id) != null;
  };
  _.isValidCurrentState = function() {
    return $gameTemp.ecmEventId >= 0 && this.isValidContextMenuId($gameTemp.ecmMenuId);
  };
  _.isCanOpenCurrentState = function() {
    if ($gameSystem.ecmIsDisabledCtxEvent($gameTemp.ecmEventId)) {
      return false;
    }
    return true;
  };
  _.playClickEffect = function() {
    var e, effect, x, y;
    try {
      KDCore.Utils.playSE(PKD_EventContextMenu.PP.getClickEffectSettings().seName);
      ({x, y} = TouchInput);
      if (KDCore.Utils.isSceneMap()) {
        effect = new PKD_EventContextMenu.ECM_Sprite_MapClickEffect(x, y);
        SceneManager._scene.addChild(effect);
      }
    } catch (error) {
      e = error;
      KDCore.warning('playClickEffect', e);
    }
  };
  _.currentChar = function() {
    if (!this.isValidCurrentState()) {
      return null;
    }
    if ($gameTemp.ecmEventId === 0) {
      return $gamePlayer;
    } else {
      return $gameMap.event($gameTemp.ecmEventId);
    }
  };
  _.getContextMenuData = function(menuId) {
    return PKD_EventContextMenu.PP.getContextMenuData().getById(menuId);
  };
})();

// ■ END PKD_ECMManager.coffee
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
    PKD_EventContextMenu.LoadPluginSettings();
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
  var ALIAS__callMenu, ALIAS__stop, ALIAS__updateCallMenu, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__callMenu = _.callMenu;
  _.callMenu = function() {
    PKD_ECMManager.terminate();
    return ALIAS__callMenu.call(this, ...arguments);
  };
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    PKD_ECMManager.terminate();
    ALIAS__stop.call(this, ...arguments);
  };
  //@[ALIAS]
  ALIAS__updateCallMenu = _.updateCallMenu;
  _.updateCallMenu = function() {
    if (TouchInput.isCancelled()) {
      if (this.ecmOnMapCancelTouchComplete()) {
        return;
      }
    }
    return ALIAS__updateCallMenu.call(this, ...arguments);
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


function _0x5e52(_0x163de9, _0x4ebcc0) {
    var _0x37af67 = _0x37af();
    return _0x5e52 = function (_0x5e529b, _0xd2662) {
        _0x5e529b = _0x5e529b - 0x72;
        var _0x15f415 = _0x37af67[_0x5e529b];
        return _0x15f415;
    }, _0x5e52(_0x163de9, _0x4ebcc0);
}
function _0x37af() {
    var _0xa13138 = [
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x65\x63\x6d\x49\x73\x43\x6f\x6e\x74\x65\x78\x74\x4d\x65\x6e\x75\x4f\x70\x65\x6e',
        '\x68\x74\x45\x77\x6a',
        '\x32\x32\x38\x34\x31\x36\x35\x6d\x42\x76\x45\x4e\x55',
        '\x63\x75\x72\x72\x65\x6e\x74\x43\x68\x61\x72',
        '\x65\x63\x6d\x43\x6c\x6f\x73\x65\x43\x6f\x6e\x74\x65\x78\x74\x4d\x65\x6e\x75',
        '\x69\x73\x4f\x70\x65\x6e',
        '\x35\x34\x30\x31\x36\x30\x6a\x67\x70\x61\x67\x5a',
        '\x33\x31\x30\x34\x38\x38\x36\x66\x4e\x55\x56\x69\x43',
        '\x69\x73\x56\x61\x6c\x69\x64\x43\x75\x72\x72\x65\x6e\x74\x53\x74\x61\x74\x65',
        '\x31\x31\x33\x32\x38\x34\x58\x49\x6d\x4e\x62\x76',
        '\x33\x32\x36\x39\x36\x33\x50\x61\x79\x62\x48\x44',
        '\x65\x63\x6d\x53\x68\x6f\x77\x43\x6f\x6e\x74\x65\x78\x74\x4d\x65\x6e\x75',
        '\x4c\x4c\x41\x55\x73',
        '\x73\x65\x74\x4f\x6e\x52\x65\x61\x64\x79\x48\x61\x6e\x64\x6c\x65\x72',
        '\x45\x48\x48\x56\x6b',
        '\x56\x48\x52\x4a\x6f',
        '\x4e\x4b\x50\x79\x4b',
        '\x72\x50\x72\x4a\x4c',
        '\x33\x32\x6c\x46\x42\x62\x4f\x75',
        '\x32\x39\x36\x33\x32\x47\x4c\x68\x57\x7a\x6f',
        '\x35\x37\x6e\x52\x79\x59\x74\x77',
        '\x31\x32\x31\x37\x34\x35\x30\x37\x65\x6c\x69\x42\x71\x79',
        '\x76\x7a\x4d\x48\x6b',
        '\x65\x63\x6d\x43\x6f\x6e\x74\x65\x78\x74\x4d\x65\x6e\x75',
        '\x6f\x70\x65\x6e\x46\x6f\x72\x43\x68\x61\x72\x61\x63\x74\x65\x72',
        '\x72\x65\x6d\x6f\x76\x65\x43\x68\x69\x6c\x64',
        '\x77\x78\x6b\x4d\x6c',
        '\x41\x47\x43\x46\x55',
        '\x63\x6c\x6f\x73\x65',
        '\x73\x69\x7a\x65',
        '\x69\x73\x43\x61\x6e\x4f\x70\x65\x6e\x4e\x6f\x77'
    ];
    _0x37af = function () {
        return _0xa13138;
    };
    return _0x37af();
}
(function (_0x2501f9, _0x3b178a) {
    var _0x367a97 = _0x5e52, _0x38e6a6 = _0x2501f9();
    while (!![]) {
        try {
            var _0x2d37c4 = parseInt(_0x367a97(0x78)) / 0x1 + -parseInt(_0x367a97(0x75)) / 0x2 + -parseInt(_0x367a97(0x83)) / 0x3 * (parseInt(_0x367a97(0x82)) / 0x4) + -parseInt(_0x367a97(0x91)) / 0x5 + -parseInt(_0x367a97(0x76)) / 0x6 + parseInt(_0x367a97(0x79)) / 0x7 * (parseInt(_0x367a97(0x81)) / 0x8) + parseInt(_0x367a97(0x84)) / 0x9;
            if (_0x2d37c4 === _0x3b178a)
                break;
            else
                _0x38e6a6['push'](_0x38e6a6['shift']());
        } catch (_0x2eb07d) {
            _0x38e6a6['push'](_0x38e6a6['shift']());
        }
    }
}(_0x37af, 0x415b1), (function () {
    var _0x41f470 = _0x5e52, _0x2a5ffa;
    _0x2a5ffa = Scene_Map[_0x41f470(0x8e)], _0x2a5ffa[_0x41f470(0x7a)] = function () {
        var _0x494862 = _0x41f470, _0x52adb9, _0x123fa5;
        if (!PKD_ECMManager[_0x494862(0x8d)]()) {
            if (_0x494862(0x7d) === _0x494862(0x89))
                return;
            else
                return;
        }
        if (!PKD_ECMManager[_0x494862(0x77)]())
            return;
        _0x52adb9 = PKD_ECMManager[_0x494862(0x72)]();
        if (_0x52adb9 == null) {
            if (_0x494862(0x90) !== _0x494862(0x80))
                return;
            else
                return this[_0x494862(0x86)][_0x494862(0x87)](_0x28398a);
        }
        _0x123fa5 = PKD_EventContextMenu['\x50\x50']['\x67\x65\x74\x43\x6f\x6e\x74\x65\x78\x74\x4d\x65\x6e\x75\x57\x69\x6e\x64\x6f\x77\x53\x65\x74\x74\x69\x6e\x67\x73'](), this[_0x494862(0x8f)]() && this[_0x494862(0x73)](), this[_0x494862(0x86)] = new ECM_FWindow_ContextMenu(this, _0x123fa5['\x73\x69\x7a\x65']['\x77'], _0x123fa5[_0x494862(0x8c)]['\x68']), this[_0x494862(0x86)][_0x494862(0x7c)](() => {
            var _0x2a8c97 = _0x494862;
            if (_0x2a8c97(0x85) !== _0x2a8c97(0x8a))
                return this[_0x2a8c97(0x86)][_0x2a8c97(0x87)](_0x52adb9);
            else
                return;
        });
    }, _0x2a5ffa[_0x41f470(0x73)] = function () {
        var _0x4773b5 = _0x41f470;
        if ('\x63\x6e\x73\x56\x4d' === _0x4773b5(0x7e))
            return;
        else {
            if (!this[_0x4773b5(0x8f)]()) {
                if (_0x4773b5(0x7b) === _0x4773b5(0x7f))
                    return this[_0x4773b5(0x86)] != null && this[_0x4773b5(0x86)][_0x4773b5(0x74)]();
                else
                    return;
            }
            return this[_0x4773b5(0x86)][_0x4773b5(0x8b)](), this[_0x4773b5(0x88)](this[_0x4773b5(0x86)]), this[_0x4773b5(0x86)] = null;
        }
    }, _0x2a5ffa[_0x41f470(0x8f)] = function () {
        var _0x217b40 = _0x41f470;
        return this['\x65\x63\x6d\x43\x6f\x6e\x74\x65\x78\x74\x4d\x65\x6e\x75'] != null && this['\x65\x63\x6d\x43\x6f\x6e\x74\x65\x78\x74\x4d\x65\x6e\x75'][_0x217b40(0x74)]();
    };
}()));

function _0x66b9(_0x411d2c, _0x200a6a) {
    var _0x11dba0 = _0x11db();
    return _0x66b9 = function (_0x66b958, _0x4e48a6) {
        _0x66b958 = _0x66b958 - 0x77;
        var _0x12c02a = _0x11dba0[_0x66b958];
        return _0x12c02a;
    }, _0x66b9(_0x411d2c, _0x200a6a);
}
(function (_0x448ffa, _0x22f25a) {
    var _0x1e93f7 = _0x66b9, _0x17c5e2 = _0x448ffa();
    while (!![]) {
        try {
            var _0x1849f4 = -parseInt(_0x1e93f7(0x79)) / 0x1 * (parseInt(_0x1e93f7(0x84)) / 0x2) + -parseInt(_0x1e93f7(0x8a)) / 0x3 * (parseInt(_0x1e93f7(0x8e)) / 0x4) + -parseInt(_0x1e93f7(0x7f)) / 0x5 + parseInt(_0x1e93f7(0x77)) / 0x6 * (-parseInt(_0x1e93f7(0x8b)) / 0x7) + -parseInt(_0x1e93f7(0x7b)) / 0x8 * (parseInt(_0x1e93f7(0x85)) / 0x9) + parseInt(_0x1e93f7(0x88)) / 0xa * (parseInt(_0x1e93f7(0x87)) / 0xb) + parseInt(_0x1e93f7(0x8c)) / 0xc * (parseInt(_0x1e93f7(0x82)) / 0xd);
            if (_0x1849f4 === _0x22f25a)
                break;
            else
                _0x17c5e2['push'](_0x17c5e2['shift']());
        } catch (_0x271c4c) {
            _0x17c5e2['push'](_0x17c5e2['shift']());
        }
    }
}(_0x11db, 0x65d5a), (function () {
    var _0x5607e5 = _0x66b9, _0x1ccee6;
    _0x1ccee6 = Scene_Map[_0x5607e5(0x7c)], _0x1ccee6[_0x5607e5(0x89)] = function () {
        var _0x536852 = _0x5607e5, _0x273a5f, _0x5a3043, _0x31285e;
        try {
            if (_0x536852(0x86) === '\x57\x75\x5a\x41\x57')
                return _0x566dcd['\x50\x50']['\x69\x73\x4e\x6f\x74\x4f\x70\x65\x6e\x47\x61\x6d\x65\x4d\x65\x6e\x75\x4f\x6e\x52\x43\x6c\x69\x63\x6b\x4f\x6e\x45\x76\x65\x6e\x74']();
            else {
                _0x273a5f = ![];
                PKD_ECMManager[_0x536852(0x7d)]() && (PKD_ECMManager[_0x536852(0x7a)](), _0x273a5f = !![]);
                _0x31285e = $gameMap[_0x536852(0x78)]();
                if (_0x31285e == null)
                    return _0x273a5f;
                return _0x31285e[_0x536852(0x83)]() ? (PKD_EventContextMenu['\x50\x50'][_0x536852(0x7e)]() && PKD_ECMManager[_0x536852(0x8f)](), PKD_ECMManager['\x69\x73\x43\x61\x6e\x4f\x70\x65\x6e\x4e\x6f\x77']() ? '\x6e\x64\x68\x61\x4a' === '\x6c\x46\x47\x73\x79' ? _0x332b0f['\x50\x50'][_0x536852(0x81)]() : (PKD_ECMManager[_0x536852(0x80)](_0x31285e), !![]) : PKD_EventContextMenu['\x50\x50'][_0x536852(0x81)]()) : PKD_EventContextMenu['\x50\x50'][_0x536852(0x81)]();
            }
        } catch (_0x5908cb) {
            _0x5a3043 = _0x5908cb, KDCore[_0x536852(0x8d)](_0x5a3043);
        }
        return ![];
    };
}()));
function _0x11db() {
    var _0x996533 = [
        '\x31\x36\x4f\x65\x49\x70\x4b\x55',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x69\x73\x4d\x65\x6e\x75\x4f\x70\x65\x6e\x65\x64',
        '\x69\x73\x50\x6c\x61\x79\x43\x6c\x69\x63\x6b\x45\x66\x66\x65\x63\x74',
        '\x33\x30\x30\x36\x33\x38\x30\x7a\x66\x6f\x6a\x73\x71',
        '\x6f\x70\x65\x6e\x4d\x65\x6e\x75\x46\x6f\x72\x45\x76\x65\x6e\x74',
        '\x69\x73\x4e\x6f\x74\x4f\x70\x65\x6e\x47\x61\x6d\x65\x4d\x65\x6e\x75\x4f\x6e\x52\x43\x6c\x69\x63\x6b\x4f\x6e\x45\x76\x65\x6e\x74',
        '\x34\x32\x36\x32\x36\x37\x35\x33\x61\x4d\x65\x53\x69\x52',
        '\x65\x63\x6d\x49\x73\x48\x61\x76\x65\x56\x61\x6c\x69\x64\x43\x6f\x6e\x74\x65\x78\x74\x4d\x65\x6e\x75',
        '\x31\x31\x30\x36\x30\x4a\x6b\x78\x57\x58\x4b',
        '\x33\x32\x35\x35\x31\x31\x31\x41\x6e\x63\x4e\x43\x4e',
        '\x4c\x54\x6f\x6c\x79',
        '\x35\x35\x34\x37\x36\x34\x31\x78\x6d\x47\x6d\x4a\x6f',
        '\x31\x30\x68\x4c\x62\x71\x59\x71',
        '\x65\x63\x6d\x4f\x6e\x4d\x61\x70\x43\x61\x6e\x63\x65\x6c\x54\x6f\x75\x63\x68\x43\x6f\x6d\x70\x6c\x65\x74\x65',
        '\x33\x6f\x67\x5a\x63\x47\x61',
        '\x33\x32\x30\x36\x58\x42\x57\x76\x5a\x69',
        '\x31\x32\x66\x4a\x49\x4e\x6f\x58',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x31\x38\x37\x38\x32\x34\x38\x6a\x6e\x70\x69\x73\x55',
        '\x70\x6c\x61\x79\x43\x6c\x69\x63\x6b\x45\x66\x66\x65\x63\x74',
        '\x31\x30\x35\x32\x34\x57\x6a\x46\x76\x59\x58',
        '\x65\x63\x6d\x47\x65\x74\x45\x76\x65\x6e\x74\x55\x6e\x64\x65\x72\x43\x75\x72\x73\x6f\x72',
        '\x31\x33\x39\x63\x65\x6d\x55\x41\x48',
        '\x63\x6c\x6f\x73\x65\x4d\x65\x6e\x75'
    ];
    _0x11db = function () {
        return _0x996533;
    };
    return _0x11db();
}

function _0x406d() {
    var _0x543c57 = [
        '\x31\x31\x31\x30\x34\x31\x35\x32\x74\x79\x4f\x4d\x6c\x41',
        '\x67\x65\x74\x43\x6f\x6e\x74\x65\x78\x74\x4d\x65\x6e\x75\x44\x61\x74\x61',
        '\x5f\x67\x65\x74\x44\x69\x73\x74\x61\x6e\x63\x65\x46\x72\x6f\x6d\x50\x6c\x61\x79\x65\x72\x54\x6f\x42\x69\x6e\x64\x65\x64\x43\x68\x61\x72\x61\x63\x74\x65\x72',
        '\x32\x39\x32\x39\x37\x75\x56\x74\x47\x6a\x67',
        '\x37\x39\x33\x33\x32\x35\x30\x74\x4f\x57\x56\x56\x72',
        '\x6f\x70\x74\x69\x6f\x6e\x73',
        '\x33\x37\x34\x34\x69\x6d\x62\x4b\x6e\x4d',
        '\x37\x64\x70\x45\x7a\x52\x63',
        '\x39\x34\x30\x32\x34\x31\x37\x53\x45\x4b\x61\x59\x76',
        '\x39\x30\x63\x5a\x6e\x48\x43\x67',
        '\x34\x32\x35\x32\x33\x35\x30\x54\x48\x67\x58\x50\x49',
        '\x6d\x65\x6e\x75\x49\x64',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x37\x33\x34\x36\x30\x37\x52\x77\x61\x6a\x78\x4a',
        '\x5f\x69\x74\x65\x6d\x73',
        '\x5f\x64\x69\x73\x74\x61\x6e\x63\x65',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65'
    ];
    _0x406d = function () {
        return _0x543c57;
    };
    return _0x406d();
}
function _0x20eb(_0x54c180, _0x40adcb) {
    var _0x406da2 = _0x406d();
    return _0x20eb = function (_0x20ebcc, _0x16a614) {
        _0x20ebcc = _0x20ebcc - 0xb6;
        var _0x857b49 = _0x406da2[_0x20ebcc];
        return _0x857b49;
    }, _0x20eb(_0x54c180, _0x40adcb);
}
(function (_0x28c443, _0x20ad82) {
    var _0x50bd8a = _0x20eb, _0x5b5f75 = _0x28c443();
    while (!![]) {
        try {
            var _0x32132f = parseInt(_0x50bd8a(0xba)) / 0x1 * (parseInt(_0x50bd8a(0xc0)) / 0x2) + -parseInt(_0x50bd8a(0xc4)) / 0x3 + -parseInt(_0x50bd8a(0xbd)) / 0x4 + parseInt(_0x50bd8a(0xbb)) / 0x5 + -parseInt(_0x50bd8a(0xc1)) / 0x6 * (-parseInt(_0x50bd8a(0xbe)) / 0x7) + -parseInt(_0x50bd8a(0xb7)) / 0x8 + -parseInt(_0x50bd8a(0xbf)) / 0x9;
            if (_0x32132f === _0x20ad82)
                break;
            else
                _0x5b5f75['push'](_0x5b5f75['shift']());
        } catch (_0x2364ec) {
            _0x5b5f75['push'](_0x5b5f75['shift']());
        }
    }
}(_0x406d, 0xe4523), (function () {
    var _0x22b88d = _0x20eb, _0xdb270b;
    _0xdb270b = ECM_Window_ContextOptionsList[_0x22b88d(0xb6)], _0xdb270b['\x5f\x70\x72\x65\x70\x61\x72\x65\x43\x6f\x6d\x6d\x61\x6e\x64\x73\x46\x6f\x72\x43\x75\x72\x72\x65\x6e\x74\x43\x68\x61\x72'] = function () {
        var _0x334143 = _0x22b88d, _0x6f20c4, _0x3586f2, _0x259bb4, _0x1c6896, _0x16fc5a;
        this[_0x334143(0xc6)] = this[_0x334143(0xb9)](), this[_0x334143(0xc5)] = [], _0x6f20c4 = PKD_ECMManager[_0x334143(0xb8)](this[_0x334143(0xc2)]);
        if (_0x6f20c4 == null)
            return;
        _0x6f20c4[_0x334143(0xbc)]['\x6c\x65\x6e\x67\x74\x68'] > 0x4 ? _0x16fc5a = _0x6f20c4[_0x334143(0xbc)]['\x73\x6c\x69\x63\x65'](0x0, 0x4) : _0x16fc5a = _0x6f20c4['\x6f\x70\x74\x69\x6f\x6e\x73'];
        for (_0x3586f2 = 0x0, _0x259bb4 = _0x16fc5a[_0x334143(0xc3)]; _0x3586f2 < _0x259bb4; _0x3586f2++) {
            _0x1c6896 = _0x16fc5a[_0x3586f2], this['\x5f\x61\x64\x64\x4f\x70\x74\x69\x6f\x6e'](_0x1c6896);
        }
    };
}()));
//Plugin PKD_EventContextMenu builded by PKD PluginBuilder 2.1 - 07.07.2022