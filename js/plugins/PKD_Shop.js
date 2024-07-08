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
 * @plugindesc (v.1.0)[BASIC] Alternative Shop
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/shop
 *
 * @help
 *
 * SPECIAL THANKS TO RAFFLE ! 
 * (Raffle is one who gave the idea and commission this plugin)
 * ===========================================================================
 * ! Warning. Map Inventory >=2.0* BASIC or PRO REQUIRED!
 * Download for free here: https://kdworkshop.net/plugins/map-inventory/
 *      * items description (on hover) will works only if you have MI 2.3+ version
 * ===========================================================================
 * Help content: (below)
 * 1. How create custom Shop
 * 2. How add stuff to created Shop
 * 3. Item's special Note's
 * 4. Script calls
 * 5. Plugin Commands
 * ===========================================================================
 * 1. How create custom Shop
 *
 * Copy (or Add) new Shop in Plugin Parameters -> All Shops
 * Set unique ID to your Shop for use them in Script call for open exact shop.
 * Setup all other parameters or leave default ones (if you copied)
 * All parameters have descriptions.
 *
 * I recommended copy first configurated Shop and then change properties
 * and parameters what you need
 *
 * Add Items\Weapons\Armors to Shop in Default Goods Parameter [Optional]
 *
 * ---------------------------------------------------------------------------
 * 2. How add stuff to created Shop
 *
 * You can add Item\Weapon|Armor to Shop via Note's
 *
 * If you added Item to shop this way (not via Default Goods parameter), you
 * can made hidden items, unhide or remove item during game
 *
 * Add line <pShopConfig:SHOP_ID, CAT_ID, SELL, BUY [,hidden] [,noSale]> to any Item for add this Item to certain Shop
 * (it's notetag, so no any quotes)
 * 
 * Flag hidden - optional, item will be hidden in Shop at start,
 * you should use script call to unhide it (see Section 4 -> PSHOP_Unlock)
 *
 * Flag noSale - optional, player CANNOT sell this item to this Shop, shop only sell
 * this item to Player
 *
 * !Warning. One item CAN have multiple <pShopConfig...> notes for different Shops.
 *
 *  Example: <pShopConfig:testShop, cat1, 300, 150, hidden, noSale>
 *
 * Check Demo Project for better understanding, it's easy than it looks
 *
 * ---------------------------------------------------------------------------
 * 3. Item's special Note's
 *
 * <pNotForSale> - Item\Armor\Weapon with this Notetag cannot be sold to ANY shop.
 *
 * ---------------------------------------------------------------------------
 * 4. Script calls
 * 
 *  - PSHOP_Open(SHOP_ID) - open shop with SHOP_ID from Plugin Parameter (All Shops).
 *      Example: PSHOP_Open("testShop")
 *
 *  - PSHOP_IsOpen() - return TRUE if any Shop is opened right now
 *
 * ==== Next Script Calls (below) only for PRO version of plugin ====
 *
 *  - PSHOP_Unlock(TYPE, ITEM_ID, SHOP_ID) - unlock item for selling
 *      Where: TYPE can be: "weapon", "armor", "item"
 *       Example: PSHOP_Unlock("armor", 2, "testShop")
 *
 *  - PSHOP_Remove(TYPE, ITEM_ID, SHOP_ID) - remove item from selling
 *      (!!!not works with items from Default Goods parameter!!!)
 *
 *
 *  Items sold or bought statistic:
 *  - PSHOP_HowManyBought(TYPE, ITEM_ID)
 *  - PSHOP_HowManySell(TYPE, ITEM_ID)
 *
 *      Example: PSHOP_HowManySell("item", 22); // returns some number or 0
 *
 *  You can change sell or buy price for any item in Shop via next script calls:
 *  - PSHOP_SetSellPrice(TYPE, ITEM_ID, NEW_PRICE, SHOP_ID)
 *  - PSHOP_SetBuyPrice(TYPE, ITEM_ID, NEW_PRICE, SHOP_ID)
 *
 *      Example: PSHOP_SetBuyPrice("item", 7, 300, "testShop")
 *
 * ---------------------------------------------------------------------------
 * 5. Plugin Commands
 *
 *      Plugin NOT have plugin commands.
 *
 * ===========================================================================
 
 * This is BASIC plugin version and have some restrictions:
 *    - NOT included script calls for hide and remove items, change price
 *    - Max different shops - 4
 *    - Obfuscated code
 *    - Plugin usage allowed only in Non-Commercial project
 * 
 *  PRO version of plugin don't have this restrictions!

 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all who support me!
 *
 * ---------------------------------------------------------------------------
 *

* License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

* You can use plugin in commercial projects on the sole
* condition that this plugin has been legally acquired
* (through purchase from
*    https://ko-fi.com/pheonixkagedesu/shop or
*    https://boosty.to/kagedesu).

 *
 * @param PKD_SHOP
 * @text Main Settings
 * 
 * @param ms_isDraggable:bool
 * @parent PKD_SHOP
 * @type boolean
 * @text Is Draggable?
 * @default true
 * @desc Is Shop window can be dragged by mouse?
 * 
 * @param ms_isCloseButton:bool
 * @parent PKD_SHOP
 * @type boolean
 * @text Is Close Button?
 * @default true
 * @desc Is Shop window have close button? [X]
 * 
 * @param ms_helpWindowActionText
 * @parent PKD_SHOP
 * @text Hint action text
 * @default Buy
 * @desc Action text in description window when hover any item in shop
 * 
 * @param ms_isRealPrice:bool
 * @parent PKD_SHOP
 * @type boolean
 * @text Is Real price?
 * @on Real price
 * @off Shop price
 * @default false
 * @desc Show real item price in description window? False - show same sell price that in Shop
 * 
 * @param ms_isPlayerMove:bool
 * @parent PKD_SHOP
 * @type boolean
 * @text Is can Move?
 * @on Can move
 * @off No
 * @default false
 * @desc Is Player can move when Shop Window is open?
 * 
 * @param ms_defaultPriceMod:int
 * @parent PKD_SHOP
 * @text Sell Price Mod
 * @type number
 * @decimals 2
 * @default 0.5
 * @desc Default rate of selling price for items. 0.5 - 50% of item cost.
 * 
 * @param shops:structA
 * @text All Shops
 * @type struct<Shop>[]
 * @default ["{\"id\":\"testShop\",\"mainGroup\":\"\",\"size:s\":\"{\\\"w:int\\\":\\\"380\\\",\\\"h:int\\\":\\\"400\\\"}\",\"image:s\":\"{\\\"image:str\\\":\\\"shopIcon2\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"-20\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"-30\\\\\\\"}\\\"}\",\"sounds:s\":\"{\\\"onSellSE:str\\\":\\\"Shop1\\\",\\\"onBuySE:str\\\":\\\"Shop1\\\"}\",\"titleText:str\":\"    JOHN DOE SHOP\",\"titleSettings:s\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"360\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"52\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"Arial\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"28\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"textColor:str\\\":\\\"#FFFFFF\\\"}\",\"titlePosition:s\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"extraGraphic:structA\":\"[\\\"{\\\\\\\"image:str\\\\\\\":\\\\\\\"categoriesBackground\\\\\\\",\\\\\\\"margins:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"{\\\\\\\"image:str\\\\\\\":\\\\\\\"itemsBackground\\\\\\\",\\\\\\\"margins:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"76\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"42\\\\\\\\\\\\\\\"}\\\\\\\"}\\\"]\",\"cells:structA\":\"[\\\"{\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"62\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"spaceBetween:i\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"direction:str\\\\\\\":\\\\\\\"horizontal\\\\\\\",\\\\\\\"count:i\\\\\\\":\\\\\\\"5\\\\\\\"}\\\",\\\"{\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"122\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"spaceBetween:i\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"direction:str\\\\\\\":\\\\\\\"horizontal\\\\\\\",\\\\\\\"count:i\\\\\\\":\\\\\\\"5\\\\\\\"}\\\",\\\"{\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"182\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"spaceBetween:i\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"direction:str\\\\\\\":\\\\\\\"horizontal\\\\\\\",\\\\\\\"count:i\\\\\\\":\\\\\\\"5\\\\\\\"}\\\",\\\"{\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"242\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"spaceBetween:i\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"direction:str\\\\\\\":\\\\\\\"horizontal\\\\\\\",\\\\\\\"count:i\\\\\\\":\\\\\\\"5\\\\\\\"}\\\"]\",\"cellSize:i\":\"44\",\"cellSellPriceTextPosition:s\":\"{\\\"x:int\\\":\\\"-1\\\",\\\"y:int\\\":\\\"36\\\"}\",\"cellSellPriceText:s\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"38\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"18\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"14\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"textColor:str\\\":\\\"#baab25\\\"}\",\"buttons\":\"\",\"sell:s\":\"{\\\"images:s\\\":\\\"{\\\\\\\"main:str\\\\\\\":\\\\\\\"sell_00\\\\\\\",\\\\\\\"hover:str\\\\\\\":\\\\\\\"sell_01\\\\\\\",\\\\\\\"disabled:str\\\\\\\":\\\\\\\"sell_03\\\\\\\"}\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"8\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"294\\\\\\\"}\\\",\\\"sellInfoPosition:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"76\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"42\\\\\\\"}\\\"}\",\"buttonBack:s\":\"{\\\"images:s\\\":\\\"{\\\\\\\"main:str\\\\\\\":\\\\\\\"back_00\\\\\\\",\\\\\\\"hover:str\\\\\\\":\\\\\\\"back_01\\\\\\\",\\\\\\\"disabled:str\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"120\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"260\\\\\\\"}\\\"}\",\"buttonBuy:s\":\"{\\\"images:s\\\":\\\"{\\\\\\\"main:str\\\\\\\":\\\\\\\"buy_00\\\\\\\",\\\\\\\"hover:str\\\\\\\":\\\\\\\"buy_01\\\\\\\",\\\\\\\"disabled:str\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"180\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"260\\\\\\\"}\\\"}\",\"buttonSell:s\":\"{\\\"images:s\\\":\\\"{\\\\\\\"main:str\\\\\\\":\\\\\\\"buttonSell_00\\\\\\\",\\\\\\\"hover:str\\\\\\\":\\\\\\\"buttonSell_01\\\\\\\",\\\\\\\"disabled:str\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"180\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"260\\\\\\\"}\\\"}\",\"buttonAdd:s\":\"{\\\"images:s\\\":\\\"{\\\\\\\"main:str\\\\\\\":\\\\\\\"Add_00\\\\\\\",\\\\\\\"hover:str\\\\\\\":\\\\\\\"Add_01\\\\\\\",\\\\\\\"disabled:str\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"238\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"92\\\\\\\"}\\\"}\",\"buttonRemove:s\":\"{\\\"images:s\\\":\\\"{\\\\\\\"main:str\\\\\\\":\\\\\\\"Rem_00\\\\\\\",\\\\\\\"hover:str\\\\\\\":\\\\\\\"Rem_01\\\\\\\",\\\\\\\"disabled:str\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"238\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"128\\\\\\\"}\\\"}\",\"itemBuyGroup\":\"\",\"itemBuyNameText:s\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"280\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"32\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"24\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"textColor:str\\\":\\\"#FFFFFF\\\"}\",\"itemBuyNameTextPosition:s\":\"{\\\"x:int\\\":\\\"80\\\",\\\"y:int\\\":\\\"50\\\"}\",\"itemBuyCountText:s\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"80\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"24\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"textColor:str\\\":\\\"#1d9fbf\\\"}\",\"itemBuyCountTextPosition:s\":\"{\\\"x:int\\\":\\\"176\\\",\\\"y:int\\\":\\\"160\\\"}\",\"itemBuyCountFormat:str\":\"x%1\",\"itemBuyMoneyTotalText:s\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"180\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"30\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"right\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"Consolas\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"26\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"textColor:str\\\":\\\"#baab25\\\"}\",\"itemBuyMoneyTotalTextPosition:s\":\"{\\\"x:int\\\":\\\"140\\\",\\\"y:int\\\":\\\"200\\\"}\",\"moneyTotalBadColor:str\":\"#a83632\",\"moneyTotalImagePosition:s\":\"{\\\"x:int\\\":\\\"100\\\",\\\"y:int\\\":\\\"190\\\"}\",\"itemBuyIconSize:i\":\"48\",\"itemBuyIconPosition:s\":\"{\\\"x:int\\\":\\\"200\\\",\\\"y:int\\\":\\\"120\\\"}\",\"categories:structA\":\"[\\\"{\\\\\\\"id:str\\\\\\\":\\\\\\\"cat0\\\\\\\",\\\\\\\"title:str\\\\\\\":\\\\\\\"Items\\\\\\\",\\\\\\\"images:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"main:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat0_00\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"hover:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat0_01\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"disabled:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat0_03\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"8\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"20\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"{\\\\\\\"id:str\\\\\\\":\\\\\\\"cat1\\\\\\\",\\\\\\\"title:str\\\\\\\":\\\\\\\"Weapons\\\\\\\",\\\\\\\"images:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"main:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat1_00\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"hover:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat1_01\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"disabled:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat1_03\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"8\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"78\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"{\\\\\\\"id:str\\\\\\\":\\\\\\\"cat2\\\\\\\",\\\\\\\"title:str\\\\\\\":\\\\\\\"Armors\\\\\\\",\\\\\\\"images:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"main:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat2_00\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"hover:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat2_01\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"disabled:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat2_03\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"8\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"136\\\\\\\\\\\\\\\"}\\\\\\\"}\\\"]\",\"categoryTitleTextSetting:s\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"300\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"26\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"Tahoma\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"textColor:str\\\":\\\"#FFFFFF\\\"}\",\"categoryTitleTextPosition:s\":\"{\\\"x:int\\\":\\\"60\\\",\\\"y:int\\\":\\\"8\\\"}\",\"defaultGoods:structA\":\"[\\\"{\\\\\\\"catId:str\\\\\\\":\\\\\\\"cat0\\\\\\\",\\\\\\\"itemId:i\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"weaponId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"armorId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"sellPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"buyPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"{\\\\\\\"catId:str\\\\\\\":\\\\\\\"cat0\\\\\\\",\\\\\\\"itemId:i\\\\\\\":\\\\\\\"8\\\\\\\",\\\\\\\"weaponId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"armorId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"sellPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"buyPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"{\\\\\\\"catId:str\\\\\\\":\\\\\\\"cat0\\\\\\\",\\\\\\\"itemId:i\\\\\\\":\\\\\\\"9\\\\\\\",\\\\\\\"weaponId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"armorId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"sellPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"buyPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"{\\\\\\\"catId:str\\\\\\\":\\\\\\\"cat1\\\\\\\",\\\\\\\"itemId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"weaponId:i\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"armorId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"sellPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"buyPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"{\\\\\\\"catId:str\\\\\\\":\\\\\\\"cat2\\\\\\\",\\\\\\\"itemId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"weaponId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"armorId:i\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"sellPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"buyPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\"]\"}"]
 * @desc Define different shops for your game
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.1.0)[BASIC] Альтернативный магазин
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/shop
 *
 * @help
 *
 * ЗА ИДЕЮ И СПОНСИРОВАНИЕ СПАСИБО RAFFLE ! 
 * ===========================================================================
 * ! Требуется плагин Map Inventory >=2.0* БАЗОВАЯ или ПРО версия
 * Скачать можно тут: https://kdworkshop.net/plugins/map-inventory/
 *      * окно с описанием предмета будет работать только если версия
 *          Map Inventory 2.3+
 * ===========================================================================
 * СОДЕРЖАНИЕ:
 * 1. Как создать магазин
 * 2. Как добавить предметы на продажу в магазин
 * 3. Специальные заметки для предметов
 * 4. Вызовы скриптов
 * 5. Команды плагина
 * ===========================================================================
 * 1. Как создать магазин
 *
 * Скопируйте стандартный (или добавьте новый) магазин в Параметры Плагина -> Магазины
 * Задайте уникальный ID, чтобы через вызов скрипта открывать именно этот магазин
 * Измение другие параметры по Вашему усмотрению
 * Все параметры имеют описание что они значат
 *
 * Я рекомендую скопировать стандартный магазин и уже изменять его настройки
 *
 * Стандартный набор предметов на продажу можно 
 * добавить в параметре Default Goods [Опционально]
 *
 * ---------------------------------------------------------------------------
 * 2. Как добавить предметы на продажу в магазин
 *
 * Чтобы добавить предмет на продажу, нужно добавить ему спец. заметку
 * Данный способ позволяет скрыть предмет или удалить его из магазина по ходу
 * игры.
 *
 * Тут и далее под "предмет" подразумеваются и предметы и оружие и броня.
 *
 * Добавить след. строку в заметку предмета:
 * <pShopConfig:SHOP_ID, CAT_ID, SELL, BUY [,hidden] [,noSale]>
 * 
 * Флаг hidden - опциональный, предмет будет скрыт из продажи
 * Во время игры можно его открыть, исп. спец. вызов скрипта (см. секцию 4)
 *
 * Флаг noSale - опциональный, игрок не может продать этот предмет обратно в магазин
 *
 * !ВНИМАНИЕ. Один предмет может содержать несколько строк <pShopConfig...>
 *  с конфигурацией под разные магазины
 *
 *  Пример: <pShopConfig:testShop, cat1, 300, 150, hidden, noSale>
 *
 * Посмотрите демо проект для лучшего понимания как это работает
 *
 * ---------------------------------------------------------------------------
 * 3. Специальные заметки для предметов
 *
 * <pNotForSale> - Если добавить эту строчку, то данный предмет НЕЛЬЗЯ продавать
 *
 * ---------------------------------------------------------------------------
 * 4. Вызовы скриптов
 * 
 *  - PSHOP_Open(SHOP_ID) - открыть магазин по ID из параметра (Магазины).
 *      Пример: PSHOP_Open("testShop")
 *
 *  - PSHOP_IsOpen() - возвращает TRUE, если любой магазин открыт в данный момент
 *
 * ==== Ниже только для PRO версии ====
 *
 *  - PSHOP_Unlock(TYPE, ITEM_ID, SHOP_ID) - разблокировать (показать)
 *      предмет, который был скрытый
 *
 *      Где: TYPE может быть: "weapon", "armor", "item" \ оружие, броня, предмет
 *       Пример: PSHOP_Unlock("armor", 2, "testShop")
 *
 *  - PSHOP_Remove(TYPE, ITEM_ID, SHOP_ID) - удалить предмет из продажи
 *      (!!!работает только с предметами, добавленными через заметку pShopConfig!!!)
 *
 *
 *  Статистика купленных и проданных предметов (кол-во):
 *  - PSHOP_HowManyBought(TYPE, ITEM_ID)
 *  - PSHOP_HowManySell(TYPE, ITEM_ID)
 *
 *      Пример: PSHOP_HowManySell("item", 22); // вернёт кол-во, сколько
 *          игрок продал в магазин предмета с номером 22
 *
 *  Изменение цены продажи и покупки предмета в магазине:
 *  - PSHOP_SetSellPrice(TYPE, ITEM_ID, NEW_PRICE, SHOP_ID)
 *  - PSHOP_SetBuyPrice(TYPE, ITEM_ID, NEW_PRICE, SHOP_ID)
 *
 * Где:
 *      ITEM_ID - номер предмета
 *      NEW_PRICE - новая цена
 *      SHOP_ID - ID магазина для которого меняем данные
 *
 *      Пример: PSHOP_SetBuyPrice("item", 7, 300, "testShop")
 *
 * ---------------------------------------------------------------------------
 * 5. Команды плагина
 *
 *      Отсутствуют.
 *
 * ===========================================================================
 
 * Это [BASIC] (базовая) версия плагина и имеет некоторые ограничения:
 *    - НЕ содержит доп. скриптов для скрытия, удаления или изменения цены на товары
 *    - Максимальное количество различных магазинов - 4
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

* Вы можете использовать плагин в коммерческих проектах на единственном
* условие, что этот плагин был приобретен на законных основаниях
* (через покупку на сайте https://boosty.to/kagedesu).

 *
 * @param PKD_SHOP
 * @text Основные настройки
 * 
 * @param ms_isDraggable:bool
 * @parent PKD_SHOP
 * @type boolean
 * @text Is Draggable?
 * @default true
 * @desc Можно ли перемещать окно при помощи мышки?
 * 
 * @param ms_isCloseButton:bool
 * @parent PKD_SHOP
 * @type boolean
 * @text Is Close Button?
 * @default true
 * @desc Окно магазина имеет кнопку закрыть ? [X]
 * 
 * @param ms_helpWindowActionText
 * @parent PKD_SHOP
 * @text Hint action text
 * @default Купить
 * @desc Подсказка действия при нажатии на предмет в окне описания предмета
 * 
 * @param ms_isRealPrice:bool
 * @parent PKD_SHOP
 * @type boolean
 * @text Is Real price?
 * @on Цена из БД
 * @off Цена магазина
 * @default false
 * @desc Показывать цену предмета из БД в окне описания? ВЫКЛ - цена магазина
 * 
 * @param ms_isPlayerMove:bool
 * @parent PKD_SHOP
 * @type boolean
 * @text Is can Move?
 * @on Можно ходить
 * @off Нет
 * @default false
 * @desc Может ли игрок ходить когда открыто окно магазина?
 * 
 * @param ms_defaultPriceMod:int
 * @parent PKD_SHOP
 * @text Sell Price Mod
 * @type number
 * @decimals 2
 * @default 0.5
 * @desc Модификатор цены продажи предмета игроком магазину. 0.5 - 50% цены.
 * 
 * @param shops:structA
 * @text Магазины
 * @type struct<Shop>[]
 * @default ["{\"id\":\"testShop\",\"mainGroup\":\"\",\"size:s\":\"{\\\"w:int\\\":\\\"380\\\",\\\"h:int\\\":\\\"400\\\"}\",\"image:s\":\"{\\\"image:str\\\":\\\"shopIcon2\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"-20\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"-30\\\\\\\"}\\\"}\",\"sounds:s\":\"{\\\"onSellSE:str\\\":\\\"Shop1\\\",\\\"onBuySE:str\\\":\\\"Shop1\\\"}\",\"titleText:str\":\"    JOHN DOE SHOP\",\"titleSettings:s\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"360\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"52\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"Arial\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"28\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"textColor:str\\\":\\\"#FFFFFF\\\"}\",\"titlePosition:s\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"extraGraphic:structA\":\"[\\\"{\\\\\\\"image:str\\\\\\\":\\\\\\\"categoriesBackground\\\\\\\",\\\\\\\"margins:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"{\\\\\\\"image:str\\\\\\\":\\\\\\\"itemsBackground\\\\\\\",\\\\\\\"margins:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"76\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"42\\\\\\\\\\\\\\\"}\\\\\\\"}\\\"]\",\"cells:structA\":\"[\\\"{\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"62\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"spaceBetween:i\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"direction:str\\\\\\\":\\\\\\\"horizontal\\\\\\\",\\\\\\\"count:i\\\\\\\":\\\\\\\"5\\\\\\\"}\\\",\\\"{\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"122\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"spaceBetween:i\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"direction:str\\\\\\\":\\\\\\\"horizontal\\\\\\\",\\\\\\\"count:i\\\\\\\":\\\\\\\"5\\\\\\\"}\\\",\\\"{\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"182\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"spaceBetween:i\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"direction:str\\\\\\\":\\\\\\\"horizontal\\\\\\\",\\\\\\\"count:i\\\\\\\":\\\\\\\"5\\\\\\\"}\\\",\\\"{\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"100\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"242\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"spaceBetween:i\\\\\\\":\\\\\\\"4\\\\\\\",\\\\\\\"direction:str\\\\\\\":\\\\\\\"horizontal\\\\\\\",\\\\\\\"count:i\\\\\\\":\\\\\\\"5\\\\\\\"}\\\"]\",\"cellSize:i\":\"44\",\"cellSellPriceTextPosition:s\":\"{\\\"x:int\\\":\\\"-1\\\",\\\"y:int\\\":\\\"36\\\"}\",\"cellSellPriceText:s\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"38\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"18\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"14\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"textColor:str\\\":\\\"#baab25\\\"}\",\"buttons\":\"\",\"sell:s\":\"{\\\"images:s\\\":\\\"{\\\\\\\"main:str\\\\\\\":\\\\\\\"sell_00\\\\\\\",\\\\\\\"hover:str\\\\\\\":\\\\\\\"sell_01\\\\\\\",\\\\\\\"disabled:str\\\\\\\":\\\\\\\"sell_03\\\\\\\"}\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"8\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"294\\\\\\\"}\\\",\\\"sellInfoPosition:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"76\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"42\\\\\\\"}\\\"}\",\"buttonBack:s\":\"{\\\"images:s\\\":\\\"{\\\\\\\"main:str\\\\\\\":\\\\\\\"back_00\\\\\\\",\\\\\\\"hover:str\\\\\\\":\\\\\\\"back_01\\\\\\\",\\\\\\\"disabled:str\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"120\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"260\\\\\\\"}\\\"}\",\"buttonBuy:s\":\"{\\\"images:s\\\":\\\"{\\\\\\\"main:str\\\\\\\":\\\\\\\"buy_00\\\\\\\",\\\\\\\"hover:str\\\\\\\":\\\\\\\"buy_01\\\\\\\",\\\\\\\"disabled:str\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"180\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"260\\\\\\\"}\\\"}\",\"buttonSell:s\":\"{\\\"images:s\\\":\\\"{\\\\\\\"main:str\\\\\\\":\\\\\\\"buttonSell_00\\\\\\\",\\\\\\\"hover:str\\\\\\\":\\\\\\\"buttonSell_01\\\\\\\",\\\\\\\"disabled:str\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"180\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"260\\\\\\\"}\\\"}\",\"buttonAdd:s\":\"{\\\"images:s\\\":\\\"{\\\\\\\"main:str\\\\\\\":\\\\\\\"Add_00\\\\\\\",\\\\\\\"hover:str\\\\\\\":\\\\\\\"Add_01\\\\\\\",\\\\\\\"disabled:str\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"238\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"92\\\\\\\"}\\\"}\",\"buttonRemove:s\":\"{\\\"images:s\\\":\\\"{\\\\\\\"main:str\\\\\\\":\\\\\\\"Rem_00\\\\\\\",\\\\\\\"hover:str\\\\\\\":\\\\\\\"Rem_01\\\\\\\",\\\\\\\"disabled:str\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"position:s\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"238\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"128\\\\\\\"}\\\"}\",\"itemBuyGroup\":\"\",\"itemBuyNameText:s\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"280\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"32\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"24\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"textColor:str\\\":\\\"#FFFFFF\\\"}\",\"itemBuyNameTextPosition:s\":\"{\\\"x:int\\\":\\\"80\\\",\\\"y:int\\\":\\\"50\\\"}\",\"itemBuyCountText:s\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"80\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"24\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"22\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"textColor:str\\\":\\\"#1d9fbf\\\"}\",\"itemBuyCountTextPosition:s\":\"{\\\"x:int\\\":\\\"176\\\",\\\"y:int\\\":\\\"160\\\"}\",\"itemBuyCountFormat:str\":\"x%1\",\"itemBuyMoneyTotalText:s\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"180\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"30\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"right\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"Consolas\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"26\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"textColor:str\\\":\\\"#baab25\\\"}\",\"itemBuyMoneyTotalTextPosition:s\":\"{\\\"x:int\\\":\\\"140\\\",\\\"y:int\\\":\\\"200\\\"}\",\"moneyTotalBadColor:str\":\"#a83632\",\"moneyTotalImagePosition:s\":\"{\\\"x:int\\\":\\\"100\\\",\\\"y:int\\\":\\\"190\\\"}\",\"itemBuyIconSize:i\":\"48\",\"itemBuyIconPosition:s\":\"{\\\"x:int\\\":\\\"200\\\",\\\"y:int\\\":\\\"120\\\"}\",\"categories:structA\":\"[\\\"{\\\\\\\"id:str\\\\\\\":\\\\\\\"cat0\\\\\\\",\\\\\\\"title:str\\\\\\\":\\\\\\\"Items\\\\\\\",\\\\\\\"images:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"main:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat0_00\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"hover:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat0_01\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"disabled:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat0_03\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"8\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"20\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"{\\\\\\\"id:str\\\\\\\":\\\\\\\"cat1\\\\\\\",\\\\\\\"title:str\\\\\\\":\\\\\\\"Weapons\\\\\\\",\\\\\\\"images:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"main:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat1_00\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"hover:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat1_01\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"disabled:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat1_03\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"8\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"78\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"{\\\\\\\"id:str\\\\\\\":\\\\\\\"cat2\\\\\\\",\\\\\\\"title:str\\\\\\\":\\\\\\\"Armors\\\\\\\",\\\\\\\"images:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"main:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat2_00\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"hover:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat2_01\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"disabled:str\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cat2_03\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"position:s\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"8\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y:int\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"136\\\\\\\\\\\\\\\"}\\\\\\\"}\\\"]\",\"categoryTitleTextSetting:s\":\"{\\\"visible:bool\\\":\\\"true\\\",\\\"size:struct\\\":\\\"{\\\\\\\"w:int\\\\\\\":\\\\\\\"300\\\\\\\",\\\\\\\"h:int\\\\\\\":\\\\\\\"26\\\\\\\"}\\\",\\\"alignment:str\\\":\\\"center\\\",\\\"font:struct\\\":\\\"{\\\\\\\"face:str\\\\\\\":\\\\\\\"Tahoma\\\\\\\",\\\\\\\"size:int\\\\\\\":\\\\\\\"20\\\\\\\",\\\\\\\"italic:bool\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"margins:struct\\\":\\\"{\\\\\\\"x:int\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"y:int\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"outline:struct\\\":\\\"{\\\\\\\"color\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"width:int\\\\\\\":\\\\\\\"2\\\\\\\"}\\\",\\\"textColor:str\\\":\\\"#FFFFFF\\\"}\",\"categoryTitleTextPosition:s\":\"{\\\"x:int\\\":\\\"60\\\",\\\"y:int\\\":\\\"8\\\"}\",\"defaultGoods:structA\":\"[\\\"{\\\\\\\"catId:str\\\\\\\":\\\\\\\"cat0\\\\\\\",\\\\\\\"itemId:i\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"weaponId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"armorId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"sellPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"buyPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"{\\\\\\\"catId:str\\\\\\\":\\\\\\\"cat0\\\\\\\",\\\\\\\"itemId:i\\\\\\\":\\\\\\\"8\\\\\\\",\\\\\\\"weaponId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"armorId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"sellPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"buyPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"{\\\\\\\"catId:str\\\\\\\":\\\\\\\"cat0\\\\\\\",\\\\\\\"itemId:i\\\\\\\":\\\\\\\"9\\\\\\\",\\\\\\\"weaponId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"armorId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"sellPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"buyPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"{\\\\\\\"catId:str\\\\\\\":\\\\\\\"cat1\\\\\\\",\\\\\\\"itemId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"weaponId:i\\\\\\\":\\\\\\\"7\\\\\\\",\\\\\\\"armorId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"sellPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"buyPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"{\\\\\\\"catId:str\\\\\\\":\\\\\\\"cat2\\\\\\\",\\\\\\\"itemId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"weaponId:i\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"armorId:i\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"sellPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\",\\\\\\\"buyPrice:i\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\"]\"}"]
 * @desc Различные магазины
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
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

/*~struct~str51:
  @param main:str
  @text Image
  @type file
  @dir img/pShop/
  @require 1
  @desc Button image
  @default

  @param hover:str
  @text Hovered
  @type file
  @dir img/pShop/
  @require 1
  @desc Button image when hovered by mouse

  @param disabled:str
  @text Disabled
  @type file
  @dir img/pShop/
  @require 1
  @desc Button image when disabled
*/

/*~struct~CellsLine:
 @param position:s
 @text Start XY
 @type struct<str2> 
 @desc Cells line start point (X, Y)
 @default {}

 @param spaceBetween:i
 @text Space between
 @type number 
 @desc Space between cells in this line
 @default 4

 @param direction:str
 @text Direction
 @type select
 @option horizontal
 @option vertical 
 @desc
 @default horizontal

 @param count:i
 @text Count
 @type number 
 @min 1
 @desc Cells count in this line
 @default 5
*/

/*~struct~SellInfo:

 @param images:s
 @text Images
 @type struct<str51> 
 @desc Sell button images
 @default {} 

 @param position:s
 @text Button Position
 @type struct<str2> 
 @desc Sell button position
 @default {} 

 @param sellInfoPosition:s
 @text Info position
 @type struct<str2> 
 @desc Position of Info text for pick item from inventory for sell
 @default {} 

*/
/*~struct~Button:

 @param images:s
 @text Images
 @type struct<str51> 
 @desc Button images
 @default {} 

 @param position:s
 @text Position
 @type struct<str2> 
 @desc 
 @default {} 

*/
/*~struct~TitleIcon:

 @param image:str
 @text Image
 @type file
 @dir img/pShop/
 @require 1
 @desc 
 @default shopIcon2


 @param position:s
 @text Position
 @type struct<str2> 
 @desc 
 @default {} 

*/
/*~struct~Sound:

 @param onSellSE:str
 @text Sell SE
 @type file
 @dir audio/se/
 @require 1
 @desc 
 @default Shop1


 @param onBuySE:str
 @text Buy SE
 @type file
 @dir audio/se/
 @desc 
 @default Shop1

*/


/*~struct~DefItem:

 @param catId:str
 @text Category
 @type text 
 @desc Category ID (from this Shop categories) for this Item
 @default cat0

 @param itemId:i
 @text Item
 @type item 
 @desc Select Item, Weapon or Armor. Only something one. 0 - Nothing
 @default 0

 @param weaponId:i
 @text Weapon
 @type weapon 
 @desc Select Item, Weapon or Armor. Only something one. 0 - Nothing
 @default 0

 @param armorId:i
 @text Armor
 @type armor 
 @desc Select Item, Weapon or Armor. Only something one. 0 - Nothing
 @default 0

 @param sellPrice:i
 @text Sell price
 @type number 
 @min -1
 @desc Selling price (to this shop). -1 - default from Database
 @default -1 

 @param buyPrice:i
 @text Buy price
 @type number 
 @min -1
 @desc Buying price (for player). -1 - default from Database
 @default -1 

*/

/*~struct~Category:

 @param id:str
 @text ID
 @type text 
 @desc Category unique ID (using for assign trade items to this category)
 @default cat1 


 @param title:str
 @text Title
 @type text 
 @desc Category name text
 @default Items 


 @param images:s
 @text Button
 @type struct<str51> 
 @desc Category button
 @default {} 


 @param position:s
 @parent images:s
 @text Position
 @type struct<str2> 
 @desc 
 @default {} 

*/


/*~struct~ExtraImage:

 @param image:str
 @text Image
 @type file
 @dir img/pShop/
 @require 1
 @desc 
 @default

 @param margins:s
 @text Position
 @type struct<str2> 
 @desc 
 @default {} 

*/

/*~struct~Shop:

 @param id
 @text Shop ID
 @default testShop
 @desc Unique Shop ID, used for open this shop via Script call

 @param mainGroup
 @text Main

 @param size:s
 @parent mainGroup
 @text Window size
 @type struct<str0> 
 @desc 
 @default {} 

 @param image:s
 @parent mainGroup
 @text Title Icon
 @type struct<TitleIcon> 
 @desc 
 @default {} 

 @param sounds:s
 @parent mainGroup
 @text Sounds
 @type struct<Sound> 
 @desc 
 @default {} 

 @param titleText:str
 @parent mainGroup
 @text Title
 @type text 
 @desc Shop name (title)
 @default     JOHN DOE SHOP 

 @param titleSettings:s
 @parent titleText:str
 @text Setting
 @type struct<str4> 
 @desc Title text settings
 @default {} 

 @param titlePosition:s
 @parent titleText:str
 @text Position
 @type struct<str2> 
 @desc 
 @default {} 

 @param extraGraphic:structA
 @parent mainGroup
 @text Extra Images
 @type struct<ExtraImage>[]
 @desc [Optional] Extra images that you can add to Shop for better visual look
 @default []

 @param cells:structA
 @text All cells
 @type struct<CellsLine>[]
 @desc
 @default []

 @param cellSize:i
 @parent cells:structA
 @text Cell size
 @type number 
 @min 1
 @max 100
 @desc Cell size for calculations. This parameter not change cell image real size.
 @default 44

 @param cellSellPriceTextPosition:s
 @parent cells:structA
 @text Price position
 @type struct<str2> 
 @desc
 @default {} 

 @param cellSellPriceText:s
 @parent cells:structA
 @text Price settings
 @type struct<str4> 
 @desc Price text settings
 @default {} 

 @param buttons
 @text Buttons

 @param sell:s
 @parent buttons
 @text Start selling
 @type struct<SellInfo> 
 @desc 
 @default {} 

 @param buttonBack:s
 @parent buttons
 @text Back
 @type struct<Button> 
 @desc 
 @default {} 


 @param buttonBuy:s
 @parent buttons
 @text Buy
 @type struct<Button> 
 @desc 
 @default {} 


 @param buttonSell:s
 @parent buttons
 @text Sell
 @type struct<Button> 
 @desc 
 @default {} 


 @param buttonAdd:s
 @parent buttons
 @text Add +
 @type struct<Button> 
 @desc 
 @default {} 


 @param buttonRemove:s
 @parent buttons
 @text Remove -
 @type struct<Button> 
 @desc 
 @default {} 

 @param itemBuyGroup
 @text BuySell settings


 @param itemBuyNameText:s
 @parent itemBuyGroup
 @text Item name text
 @type struct<str4> 
 @desc Item name (when buy or sell) text settings
 @default {} 


 @param itemBuyNameTextPosition:s
 @parent itemBuyNameText:s
 @text Position
 @type struct<str2> 
 @desc 
 @default {} 


 @param itemBuyCountText:s
 @parent itemBuyGroup
 @text Item count text
 @type struct<str4> 
 @desc Item count (when buy or sell) text settings
 @default {} 


 @param itemBuyCountTextPosition:s
 @parent itemBuyCountText:s
 @text Position
 @type struct<str2> 
 @desc 
 @default {} 


 @param itemBuyCountFormat:str
 @parent itemBuyCountText:s
 @text Format
 @type text 
 @desc %1 will be replaced by count number
 @default x%1


 @param itemBuyMoneyTotalText:s
 @parent itemBuyGroup
 @text Cost text
 @type struct<str4> 
 @desc 
 @default {} 


 @param itemBuyMoneyTotalTextPosition:s
 @parent itemBuyMoneyTotalText:s
 @text Position
 @type struct<str2> 
 @desc Item total cost (when buy or sell) text settings
 @default {} 


 @param itemBuyIconSize:i
 @parent itemBuyGroup
 @text Icon Size
 @type number 
 @desc Item icons size (when buy or sell)
 @default 48 


 @param itemBuyIconPosition:s
 @parent itemBuyIconSize:i
 @text Position
 @type struct<str2> 
 @desc 
 @default {} 


 @param moneyTotalBadColor:str
 @parent itemBuyMoneyTotalText:s
 @text No money 
 @type text 
 @desc [Hex color] Money total text color when player not have enougth money to buy item
 @default #a83632 

 @param moneyTotalImagePosition:s
 @parent itemBuyMoneyTotalText:s
 @text Icon position
 @type struct<str2> 
 @desc Money total image position (when buy or sell)
 @default {} 

 

 @param categories:structA
 @text Categories
 @type struct<Category>[]
 @desc Categories in this shop for selling goods. Should be one at least.
 @default []

 @param categoryTitleTextSetting:s
 @parent categories:structA
 @text Text setttings
 @type struct<str4> 
 @desc Category title text settings
 @default {} 

 @param categoryTitleTextPosition:s
 @parent categoryTitleTextSetting:s
 @text Position
 @type struct<str2> 
 @desc 
 @default {} 

 @param defaultGoods:structA
 @text Default Goods
 @type struct<DefItem>[]
 @desc This stuff always be in Shop by default. !You can't remove or hide this stuff using Script Calls!
 @default []

*/



var Imported = Imported || {};
Imported.PKD_Shop = true;

var PKD_Shop = {};
PKD_Shop.Version = 100;

//?VERSION
PKD_Shop.isPro = function() { return false; };

// * For parameters
PKD_Shop.PP = {};
PKD_Shop.Utils = {};

// * Загрзука параметров
PKD_Shop.LoadPluginSettings = () => {
    PKD_Shop.PP._loader = new KDCore.ParamLoader("PKD_SHOP");
};

if(!Imported.PKD_MapInventory || PKD_MI.Version < 200) {
    let error = `PKD_Shop plugin require Map_Inventory plugin v2.0+<hr><a <a href="https://kdworkshop.net/plugins/map-inventory/">Download Map Inventory</a>`;
    console.warn(error);
    throw(new Error(error));
}

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

//?rev 25.07.22
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '2.9.7';

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

//Plugin KDCore builded by PKD PluginBuilder 2.1 - 25.07.2022

(function(){

    (function(){
        
        var _ = PKD_MI.LIBS.MapInvController.prototype;

        //@[ALIAS]
        var _alias___onAction = _._onAction;
        _._onAction = function (cell) {
            if($gameTemp.miSellMode == true) {
                if(cell.item && !cell._inSpecialState && PShopManager.isCanSellItem(cell.item)) {
                    SoundManager.playCursor();
                    PShopManager.onSellItemPick(cell.item);
                    PKD_MI.closeInventory();
                } else {
                    SoundManager.playBuzzer();
                }
            } else {
                _alias___onAction.call(this, cell);
            }
        };

    })();

    (function(){
        
        var _ = PKD_MI.LIBS.Sprite_MapInvCell.prototype;

        //@[ALIAS]
        var _alias___onCheckUsableTick = _._onCheckUsableTick;
        _._onCheckUsableTick = function () {
            _alias___onCheckUsableTick.call(this, ...arguments);
            if($gameTemp.miSellMode == true) {
                this._onCheckUsableOnItemPickForSell();
                return;
            }
        };

        //@[ALIAS]
        var _alias__refreshSpecialState = _.refreshSpecialState;
        _.refreshSpecialState = function () {
            _alias__refreshSpecialState.call(this, ...arguments);
            if($gameTemp.miSellMode == true) {
                this._onCheckUsableOnItemPickForSell();
            }
        };

        _._onCheckUsableOnItemPickForSell = function() {
            if (this.item == null) {
                return;
            }
            this._refreshEquipmentState();
            this.enableItem();
            if (this.item && (DataManager.isWeapon(this.item) || DataManager.isArmor(this.item)) && this._inSpecialState) {
                this.disableItem();
            }
            if (!PShopManager.isCanSellItem(this.item)) {
                this.disableItem();
            }
        };

    })();

    (function(){
        
        var _ = PKD_MI.LIBS.Sprite_MapInvHelp.prototype;

        //@[ALIAS]
        var _alias__drawCost = _.drawCost;
        _.drawCost = function () {
            if(this.cell.isShopCell && !PKD_Shop.PP.isShowRealItemPriceInDescription()) {
                let text = PShopManager.getItemBuyPrice(this.cell.item);
                this._textCostSpr.drawTextWithSettings(text);
            } else
                _alias__drawCost.call(this);
        };

        //@[ALIAS]
        var _alias__showActionHelp = _.showActionHelp;
        _.showActionHelp = function () {
            if(this.cell.isShopCell) {
                this._drawActionHelpText(PKD_Shop.PP.helpWindowActionText());
            } else
                _alias__showActionHelp.call(this);
        };

    })();

    //@[ALIAS]
    var _alias_Spriteset_InvUI_closeInventory = Spriteset_InvUI.prototype.closeInventory;
    Spriteset_InvUI.prototype.closeInventory = function () {
        if ($gameTemp.miSellMode == true) {
            PShopManager.stopShopSell();
        }
        _alias_Spriteset_InvUI_closeInventory.call(this);
    };

})();

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Parameters.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_Shop.PP;
  // * Стандартный модификатор цены продажи торговцу любого предмета
  _.getDefaultSellPriceMod = function() {
    return this._loader.getParam("ms_defaultPriceMod", 0.5);
  };
  _.isShopWindowDragable = function() {
    return this._loader.getParam("ms_isDraggable", true);
  };
  _.isShowWindowHaveCloseButton = function() {
    return this._loader.getParam("ms_isCloseButton", true);
  };
  _.helpWindowActionText = function() {
    return this._loader.getParam("ms_helpWindowActionText", "Buy");
  };
  _.isPlayerCanMoveWhenShopIsOpen = function() {
    return this._loader.getParam("ms_isPlayerMove", false);
  };
  // * Показывать в описании предмета продажи его реальную цену (из БД) ?
  _.isShowRealItemPriceInDescription = function() {
    return this._loader.getParam("ms_isRealPrice", false);
  };
  // * -------------------------------------------------------------------------
  _.getShopDataById = function(shopId) {
    return this.allShops().getById(shopId);
  };
  _.shopExampleDefault = {
    id: "testShop",
    titleText: "    JOHN DOE SHOP",
    titleSettings: {
      visible: true,
      size: {
        w: 360,
        h: 52
      },
      alignment: "center",
      font: {
        face: "Arial",
        size: 28,
        italic: false
      },
      margins: {
        x: 10,
        y: 0
      },
      outline: {
        color: null,
        width: 2
      },
      textColor: "#FFFFFF".toCss()
    },
    titlePosition: {
      x: 0,
      y: 0
    },
    cellSize: 44,
    cells: [
      {
        position: {
          x: 100,
          y: 62
        },
        spaceBetween: 4,
        direction: 'horizontal',
        count: 5
      },
      {
        position: {
          x: 100,
          y: 122
        },
        spaceBetween: 4,
        direction: 'horizontal',
        count: 5
      },
      {
        position: {
          x: 100,
          y: 182
        },
        spaceBetween: 4,
        direction: 'horizontal',
        count: 5
      },
      {
        position: {
          x: 100,
          y: 242
        },
        spaceBetween: 4,
        direction: 'horizontal',
        count: 5
      }
    ],
    cellSellPriceTextPosition: {
      x: -1,
      y: 36
    },
    cellSellPriceText: {
      visible: true,
      size: {
        w: 38,
        h: 18
      },
      alignment: "center",
      font: {
        face: null,
        size: 14,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      outline: {
        color: null,
        width: 1
      },
      textColor: "#baab25".toCss()
    },
    size: {
      w: 380,
      h: 400
    },
    sell: {
      images: {
        main: "sell_00",
        hover: "sell_01",
        disabled: "sell_03"
      },
      position: {
        x: 8,
        y: 294
      },
      sellInfoPosition: {
        x: 76,
        y: 42
      }
    },
    buttonBack: {
      images: {
        main: "back_00",
        hover: "back_01",
        disabled: ""
      },
      position: {
        x: 120,
        y: 260
      }
    },
    buttonBuy: {
      images: {
        main: "buy_00",
        hover: "buy_01",
        disabled: ""
      },
      position: {
        x: 180,
        y: 260
      }
    },
    buttonSell: {
      images: {
        main: "buttonSell_00",
        hover: "buttonSell_01",
        disabled: ""
      },
      position: {
        x: 180,
        y: 260
      }
    },
    buttonAdd: {
      images: {
        main: "Add_00",
        hover: "Add_01",
        disabled: ""
      },
      position: {
        x: 238,
        y: 92
      }
    },
    buttonRemove: {
      images: {
        main: "Rem_00",
        hover: "Rem_01",
        disabled: ""
      },
      position: {
        x: 238,
        y: 128
      }
    },
    itemBuyNameText: {
      visible: true,
      size: {
        w: 280,
        h: 32
      },
      alignment: "center",
      font: {
        face: null,
        size: 24,
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
    },
    itemBuyNameTextPosition: {
      x: 80,
      y: 50
    },
    itemBuyCountText: {
      visible: true,
      size: {
        w: 80,
        h: 24
      },
      alignment: "center",
      font: {
        face: null,
        size: 22,
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
      textColor: "#1d9fbf".toCss()
    },
    itemBuyCountTextPosition: {
      x: 176,
      y: 160
    },
    itemBuyCountFormat: "x%1",
    itemBuyMoneyTotalText: {
      visible: true,
      size: {
        w: 180,
        h: 30
      },
      alignment: "right",
      font: {
        face: "Consolas",
        size: 26,
        italic: false
      },
      margins: {
        x: 0,
        y: 0
      },
      outline: {
        color: null,
        width: 1
      },
      textColor: "#baab25".toCss()
    },
    itemBuyMoneyTotalTextPosition: {
      x: 140,
      y: 200
    },
    itemBuyIconSize: 48,
    itemBuyIconPosition: {
      x: 200,
      y: 120
    },
    moneyTotalBadColor: "#a83632",
    moneyTotalImagePosition: {
      x: 100,
      y: 190
    },
    extraGraphic: [
      {
        image: "categoriesBackground",
        margins: {
          x: 2,
          y: 0
        }
      },
      {
        image: "itemsBackground",
        margins: {
          x: 76,
          y: 42
        }
      }
    ],
    categories: [
      {
        id: "cat0",
        title: "Items",
        images: {
          main: "cat0_00",
          hover: "cat0_01",
          disabled: "cat0_03"
        },
        position: {
          x: 8,
          y: 20
        }
      },
      {
        id: "cat1",
        title: "Weapons",
        images: {
          main: "cat1_00",
          hover: "cat1_01",
          disabled: "cat1_03"
        },
        position: {
          x: 8,
          y: 78
        }
      },
      {
        id: "cat2",
        title: "Armors",
        images: {
          main: "cat2_00",
          hover: "cat2_01",
          disabled: "cat2_03"
        },
        position: {
          x: 8,
          y: 136
        }
      }
    ],
    categoryTitleTextSetting: {
      visible: true,
      size: {
        w: 300,
        h: 26
      },
      alignment: "center",
      font: {
        face: "Tahoma",
        size: 20,
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
    },
    categoryTitleTextPosition: {
      x: 60,
      y: 8
    },
    image: {
      image: "shopIcon2",
      position: {
        x: -20,
        y: -30
      }
    },
    sounds: {
      onSellSE: "",
      onBuySE: ""
    },
    defaultGoods: [
      {
        catId: "cat0",
        itemId: 7,
        sellPrice: -1,
        buyPrice: -1
      },
      {
        catId: "cat0",
        itemId: 8,
        sellPrice: -1,
        buyPrice: -1
      },
      {
        catId: "cat0",
        itemId: 9,
        sellPrice: -1,
        buyPrice: -1
      },
      {
        catId: "cat1",
        weaponId: 7,
        sellPrice: -1,
        buyPrice: -1
      },
      {
        catId: "cat2",
        armorId: 2,
        sellPrice: -1,
        buyPrice: -1 // * {catId, itemId, weaponId, armorId, sellPrice, buyPrice}
      }
    ]
  };
  //?VERSION
  _.allShops = function() {
    return [];
  };
})();

// ■ END Parameters.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * Главный менеджер для работы с магазином

//@[GLOBAL]
var PShopManager;

PShopManager = function() {};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PShopManager.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //REMOVE AND UNLOCK - только влияют на фильтр  добавляемых вещей в магазин, только для ПРЕДОПРЕДЕЛЁННЫХ МАГИЗНОВ (через параметры)

  //@[DEFINES]
  _ = PShopManager;
  _.isShopOpen = function() {
    return KDCore.Utils.isSceneMap() && SceneManager._scene.pIsShowIsOpened();
  };
  // * Открыть магазин на карте (опционально с подготовкой или без)
  // * shopId - не обязательно
  _.openShop = function(shopId) {
    this.loadShop(shopId);
    if (!this.isShopLoaded()) { // * Не существует такого магазина!
      return;
    }
    if (KDCore.Utils.isSceneMap()) {
      if (!this.isShopOpen()) {
        SceneManager._scene.pOpenShopWindow();
      }
    }
  };
  _.closeCurrentShopWindow = function() {
    if (this.isShopOpen()) {
      return SceneManager._scene.pCloseShopWindow();
    }
  };
  // * Загрузка данных магазина (подготовка товаров)
  _.loadShop = function(shopId) {
    var data, shopData;
    data = PKD_Shop.PP.getShopDataById(shopId);
    if (data == null) {
      console.warn("Shop with ID " + shopId + " not defined in Plugin Parameters!");
      return;
    }
    shopData = {
      data,
      goods: {} // * товары в магазине (уже отфильтрованные и с данными)
    };
    this._currentShop = shopData;
    this._refreshShopGoods();
  };
  // * itemData: itemId, type, sellPrice, buyPrice, canSell, notForSell, catId
  //console.info shopData
  _.addItemToShop = function(itemData) {
    var e, itemId, key, type;
    try {
      if (!this.isShopLoaded()) {
        return;
      }
      ({itemId, type} = itemData);
      key = PKD_Shop.Utils.getKey(itemId, type);
      if (this._currentShop.goods == null) {
        this._currentShop.goods = {};
      }
      return this._currentShop.goods[key] = itemData;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.getItemBuyPrice = function(dbItem) {
    return this._getCurrentShopItemPrice(dbItem, 'buyPrice');
  };
  _._getCurrentShopItemPrice = function(dbItem, priceField) {
    var e, itemData, key;
    if (dbItem == null) {
      return 0;
    }
    if (!this.isShopLoaded()) {
      return dbItem.price;
    }
    try {
      key = PKD_Shop.Utils.getKeyFromItem(dbItem);
      itemData = this._currentShop.goods[key];
      if (itemData == null) {
        return dbItem.price;
      }
      if (itemData[priceField] != null) {
        return itemData[priceField];
      } else {
        return dbItem.price;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return 0;
    }
  };
  _.getItemSellPrice = function(dbItem) {
    return this._getCurrentShopItemPrice(dbItem, 'sellPrice');
  };
  _.isCanSellItem = function(dbItem) {
    var e, itemData, key;
    if (dbItem == null) {
      return false;
    }
    if (!this.isShopLoaded()) {
      return true;
    }
    try {
      // * Global flag
      if ((dbItem.meta != null) && (dbItem.meta.pNotForSale != null)) {
        return false;
      }
      key = PKD_Shop.Utils.getKeyFromItem(dbItem);
      itemData = this._currentShop.goods[key];
      if (itemData == null) {
        return true;
      }
      if (itemData.notForSell === true) {
        return false;
      }
      return true;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return false;
    }
  };
  _.itemBoughtSellTimes = function(itemId) {
    var e, key;
    try {
      key = PKD_Shop.Utils.getKeyFromItem($dataItems[itemId]);
      return [$gameSystem.pGetItemBuys(key), $gameSystem.pGetItemSells(key)];
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [0, 0];
    }
  };
  _.weaponBoughtSellTimes = function(weaponId) {
    var e, key;
    try {
      key = PKD_Shop.Utils.getKeyFromItem($dataWeapons[weaponId]);
      return [$gameSystem.pGetItemBuys(key), $gameSystem.pGetItemSells(key)];
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [0, 0];
    }
  };
  _.armorBoughtSellTimes = function(armorId) {
    var e, key;
    try {
      key = PKD_Shop.Utils.getKeyFromItem($dataArmors[armorId]);
      return [$gameSystem.pGetItemBuys(key), $gameSystem.pGetItemSells(key)];
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return [0, 0];
    }
  };
  _.getShopName = function() {
    if (this.isShopLoaded()) {
      return this._currentShop.data.titleText;
    } else {
      return "";
    }
  };
  _.isShopLoaded = function() {
    return this._currentShop != null;
  };
  // * Загрузка предметов в магазин
  _._refreshShopGoods = function() {
    var e;
    try {
      if (!this.isShopLoaded()) {
        return;
      }
      // 1 - Загрузка стандартных из параметров
      this._addDefaultGoods(this._currentShop.data.defaultGoods, this._currentShop.data.id);
      // 2 - Загрузка всех предметов из Note
      return this._collectGoodsFromDB(this._currentShop.data.id);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  // * Стандартные предметы (с параметров плагина) (которые всегда есть в магазине)
  _._addDefaultGoods = function(goodsList, shopId) {
    var buyPrice, i, item, itemId, itemToAdd, len, realDBItem, sellPrice, type;
    if (goodsList == null) {
      return;
    }
    for (i = 0, len = goodsList.length; i < len; i++) {
      item = goodsList[i];
      // * Из трёх вариантов выбирается только один
      type = 0; // * Item
      itemId = item.itemId;
      if (item.weaponId > 0) {
        type = 1; // * Weapon
        itemId = item.weaponId;
      } else if (item.armorId > 0) {
        type = 2; // * Armor
        itemId = item.armorId;
      }
      realDBItem = KDCore.Utils.getItemByType(itemId, type);
      if (realDBItem == null) {
        continue;
      }
      ({sellPrice, buyPrice} = this._getRealItemPrices(realDBItem, item.sellPrice, item.buyPrice, shopId));
      itemToAdd = {
        type,
        itemId,
        sellPrice,
        buyPrice,
        catId: item.catId,
        //canSell: true,
        notForSell: false
      };
      this.addItemToShop(itemToAdd);
    }
  };
  _._getRealItemPrices = function(realDBItem, defaultSell, defaultBuy, forShopId) {
    var buyPrice, e, sellPrice, specialPrices;
    try {
      if (!defaultSell || defaultSell === -1) {
        sellPrice = realDBItem.price * PKD_Shop.PP.getDefaultSellPriceMod();
      } else {
        sellPrice = defaultSell;
      }
      if (!defaultBuy || defaultBuy === -1) {
        buyPrice = realDBItem.price;
      } else {
        buyPrice = defaultBuy;
      }
      
      // * Если цена была изменена командами плагина
      specialPrices = $gameSystem.pGetItemSpecialPrices([realDBItem.id, KDCore.Utils.getItemTypeId(realDBItem)], forShopId);
      if (specialPrices != null) {
        if (specialPrices.buyPrice != null) {
          buyPrice = specialPrices.buyPrice;
        }
        if (specialPrices.sellPrice != null) {
          sellPrice = specialPrices.sellPrice;
        }
      }
      return {buyPrice, sellPrice};
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return {
      buyPrice: 0,
      sellPrice: 0
    };
  };
  
  // * ITEM NOTE
  // <pShopConfig: ID, CAT_ID, BUY, SELL, HIDDEN, NOT_FOR_SALE>
  _._collectGoodsFromDB = function(forShopId) {
    var allStuffForCurrentShop, db, e, i, item, j, len, len1, line, lines, note, results;
    try {
      allStuffForCurrentShop = [];
      db = $dataItems.concat($dataWeapons).concat($dataArmors);
      for (i = 0, len = db.length; i < len; i++) {
        item = db[i];
        if (item == null) {
          continue;
        }
        if ((item.meta != null) && String.any(item.meta.pShopConfig)) {
          note = item.note;
          if (note.contains(forShopId)) {
            allStuffForCurrentShop.push(item);
          }
        }
      }
//"CANDIDATES TO SHOP".p(forShopId)
      results = [];
      for (j = 0, len1 = allStuffForCurrentShop.length; j < len1; j++) {
        item = allStuffForCurrentShop[j];
        lines = item.note.split("<pShopConfig:");
        results.push((function() {
          var k, len2, results1;
          results1 = [];
          for (k = 0, len2 = lines.length; k < len2; k++) {
            line = lines[k];
            if (!line.contains(",")) {
              continue;
            }
            if (line.contains(forShopId)) {
              results1.push(this._addItemWithNotesAndFilters(forShopId, item, line));
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }).call(this));
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._addItemWithNotesAndFilters = function(forShopId, item, lineWithParams) {
    var buyPrice, catId, defaultBuy, defaultSell, e, itemId, itemToAdd, key, notForSell, params, sellPrice, type;
    try {
      params = lineWithParams.split(",");
      itemId = item.id;
      type = KDCore.Utils.getItemTypeId(item);
      key = PKD_Shop.Utils.getKey(itemId, type);
      // * Если предмет спрятан, то не добавляем его
      if (lineWithParams.contains("hidden")) {
        if ($gameSystem.pIsItemIsHidden(key, forShopId)) {
          return;
        }
      }
      // * Если предмет был удалён из магазина
      if ($gameSystem.pIsItemIsRemoved(key, forShopId)) {
        return;
      }
      catId = params[1].trim();
      defaultBuy = KDCore.Utils.getEValue(params[2].trim());
      defaultSell = KDCore.Utils.getEValue(params[3].trim());
      ({sellPrice, buyPrice} = this._getRealItemPrices(item, defaultSell, defaultBuy, forShopId));
      notForSell = lineWithParams.contains("noSale");
      itemToAdd = {itemId, type, catId, sellPrice, buyPrice, notForSell};
      return this.addItemToShop(itemToAdd);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.stopShopSell = function() {
    var e, ref;
    try {
      if ((ref = SceneManager._scene.pShopWindow) != null) {
        ref.stopSellMode();
      }
      return $gameTemp.miSellMode = false;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.onSellItemPick = function(item) {
    var e, ref;
    try {
      if (item == null) {
        this.stopShopSell();
        return SoundManager.playBuzzer();
      } else {
        return (ref = SceneManager._scene.pShopWindow) != null ? ref.startItemSelling(item) : void 0;
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.onBuyItemClick = function(item) {
    var e, ref;
    try {
      if (item == null) {
        return SoundManager.playBuzzer();
      } else {
        //console.log(item)
        return (ref = SceneManager._scene.pShopWindow) != null ? ref.startItemBuy(item) : void 0;
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PShopManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  
  //%[MAIN Открыть магазин]
  window.PSHOP_Open = function(shopId) {
    var e;
    try {
      if (!String.any(shopId)) {
        return;
      }
      return PShopManager.openShop(shopId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  window.PSHOP_IsOpen = function() {
    var e;
    try {
      return PShopManager.isShopOpen();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return false;
    }
  };
  //?VERSION
  window.PSHOP_Unlock = function(type, id, shopId) {}; // * PRO ONLY
  
  //?VERSION
  window.PSHOP_Remove = function(type, id, shopId) {}; // * PRO ONLY
  
  //?VERSION
  window.PSHOP_HowManyBought = function(type, id) {}; // * PRO ONLY
  
  //?VERSION
  window.PSHOP_HowManySell = function(type, id) {}; // * PRO ONLY
  
  //?VERSION
  window.PSHOP_SetSellPrice = function(type, id, price, shopId) {}; // * PRO ONLY
  
  //?VERSION
  window.PSHOP_SetBuyPrice = function(type, id, price, shopId) {}; // * PRO ONLY
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ UTILS.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_Shop.Utils;
  _.getKeyFromItem = function(dbItem) {
    return this.getKey(dbItem.id, KDCore.Utils.getItemTypeId(dbItem));
  };
  _.getTypeIdByString = function(typeString) {
    switch (typeString) {
      case 'armor':
        return 2;
      case 'weapon':
        return 1;
      default:
        return 0;
    }
  };
  _.getKey = function(id, type) {
    return [id, type];
  };
  _.getKeyFromStringType = function(itemId, typeString) {
    return this.getKey(itemId, this.getTypeIdByString(typeString));
  };
})();

// ■ END UTILS.coffee
//---------------------------------------------------------------------------


function _0x9f3b(_0x21d9f8, _0x1b52a9) {
    var _0x5c23e7 = _0x5c23();
    return _0x9f3b = function (_0x9f3b67, _0x1c4f55) {
        _0x9f3b67 = _0x9f3b67 - 0x130;
        var _0x5acdb3 = _0x5c23e7[_0x9f3b67];
        return _0x5acdb3;
    }, _0x9f3b(_0x21d9f8, _0x1b52a9);
}
(function (_0x3b01c5, _0x5733e0) {
    var _0x4a8ffe = _0x9f3b, _0x3bd1de = _0x3b01c5();
    while (!![]) {
        try {
            var _0xea2e75 = -parseInt(_0x4a8ffe(0x13e)) / 0x1 * (-parseInt(_0x4a8ffe(0x13d)) / 0x2) + parseInt(_0x4a8ffe(0x139)) / 0x3 + parseInt(_0x4a8ffe(0x134)) / 0x4 + -parseInt(_0x4a8ffe(0x133)) / 0x5 * (parseInt(_0x4a8ffe(0x136)) / 0x6) + parseInt(_0x4a8ffe(0x137)) / 0x7 * (parseInt(_0x4a8ffe(0x13b)) / 0x8) + -parseInt(_0x4a8ffe(0x138)) / 0x9 * (parseInt(_0x4a8ffe(0x130)) / 0xa) + -parseInt(_0x4a8ffe(0x13c)) / 0xb * (parseInt(_0x4a8ffe(0x135)) / 0xc);
            if (_0xea2e75 === _0x5733e0)
                break;
            else
                _0x3bd1de['push'](_0x3bd1de['shift']());
        } catch (_0x59add2) {
            _0x3bd1de['push'](_0x3bd1de['shift']());
        }
    }
}(_0x5c23, 0xb4282), (function () {
    var _0x4d24a4;
    _0x4d24a4 = PKD_Shop['\x50\x50'], _0x4d24a4['\x61\x6c\x6c\x53\x68\x6f\x70\x73'] = function () {
        var _0xc8f306 = _0x9f3b, _0x15447e;
        return _0x15447e = this['\x5f\x6c\x6f\x61\x64\x65\x72']['\x67\x65\x74\x50\x61\x72\x61\x6d'](_0xc8f306(0x132), [PKD_Shop['\x50\x50'][_0xc8f306(0x13a)]]), _0x15447e[_0xc8f306(0x131)](0x0, 0x4);
    };
}()));
function _0x5c23() {
    var _0xdb7da1 = [
        '\x37\x36\x36\x31\x36\x34\x79\x48\x59\x62\x61\x69',
        '\x36\x39\x35\x31\x30\x44\x6a\x61\x4a\x67\x42',
        '\x37\x31\x34\x59\x52\x44\x61\x61\x43',
        '\x31\x33\x33\x39\x31\x31\x6d\x68\x70\x78\x66\x48',
        '\x32\x32\x36\x30\x38\x30\x49\x78\x49\x76\x4c\x52',
        '\x73\x68\x6f\x70\x45\x78\x61\x6d\x70\x6c\x65\x44\x65\x66\x61\x75\x6c\x74',
        '\x36\x34\x38\x30\x38\x6d\x43\x6f\x47\x49\x6a',
        '\x31\x32\x31\x74\x49\x4c\x74\x54\x69',
        '\x38\x32\x50\x58\x49\x47\x74\x77',
        '\x31\x34\x38\x37\x31\x56\x79\x4a\x78\x4a\x5a',
        '\x32\x30\x6f\x77\x42\x4d\x75\x55',
        '\x73\x70\x6c\x69\x63\x65',
        '\x73\x68\x6f\x70\x73',
        '\x36\x31\x35\x56\x61\x4b\x5a\x74\x6f',
        '\x35\x35\x33\x34\x33\x31\x36\x42\x48\x56\x59\x67\x49'
    ];
    _0x5c23 = function () {
        return _0xdb7da1;
    };
    return _0x5c23();
}

// Generated by CoffeeScript 2.6.1
var Component_PShopCounter;

Component_PShopCounter = class Component_PShopCounter extends KDCore.Sprite {
  constructor(onEndHandler) {
    super();
    this.onEndHandler = onEndHandler;
    this._create();
  }

  //%[I] Добавить поддержку Scroll мышки на +/- и клик с нажатым Shift (+10)
  isActive() {
    return this.visible === true;
  }

  shopData() {
    return PShopManager._currentShop.data;
  }

  setup(item, isBuyMode) {
    this.item = item;
    this.isBuyMode = isBuyMode;
    this.itemNameText.draw(this.item.name);
    if ((this.item.meta != null) && String.any(this.item.meta.iImg)) {
      this.itemIcon.draw(this.item.meta.iImg);
    } else {
      this.itemIcon.draw(this.item.iconIndex, true);
    }
    this.totalMoney = 0;
    this.setCount(1);
    this.buyButton.visible = this.isBuyMode;
    this.sellButton.visible = !this.buyButton.visible;
  }

  onCountUp() {
    if (this.isBuyMode === true) {
      this.count++;
    } else {
      if ($gameParty.numItems(this.item) >= (this.count + 1)) {
        this.count++;
      } else {
        SoundManager.playBuzzer();
      }
    }
    this.setCount(this.count);
  }

  onCountDown() {
    this.count--;
    if (this.count <= 0) {
      this.count = 1;
    }
    this.setCount(this.count);
  }

  setCount(count) {
    this.count = count;
    this.itemCountText.drawTextWithFormat(this.shopData().itemBuyCountFormat, this.count);
    this._refreshTotalMoney();
  }

  sellItem() {
    if (!this.isActive()) {
      return;
    }
    $gameSystem.pAddItemSells(PKD_Shop.Utils.getKeyFromItem(this.item), this.count);
    $gameParty.loseItem(this.item, this.count);
    $gameParty.gainGold(this.totalMoney);
    KDCore.Utils.playSE(this.shopData().sounds.onSellSE);
    if (this.onEndHandler != null) {
      this.onEndHandler();
    }
  }

  buyItem() {
    if (!this.isActive()) {
      return;
    }
    // * Учитывается MapInventory Cells Limit System
    if (this._isCantBuyItemNow()) {
      SoundManager.playBuzzer();
    } else {
      $gameSystem.pAddItemBuys(PKD_Shop.Utils.getKeyFromItem(this.item), this.count);
      $gameParty.gainItem(this.item, this.count);
      $gameParty.loseGold(this.totalMoney);
      KDCore.Utils.playSE(this.shopData().sounds.onBuySE);
      if (this.onEndHandler != null) {
        this.onEndHandler();
      }
    }
  }

  _isCantBuyItemNow() {
    var isOverWeight;
    isOverWeight = false;
    if (PKD_MI.isPro() && PKD_MI.Parameters.get_UsedWSystem()) {
      isOverWeight = IsOverWeight();
    }
    return $gameParty.gold() < this.totalMoney || !$gameParty.isCanAddNewItem(this.item) || isOverWeight;
  }

  _create() {
    this._createBackButton();
    this._createBuyButton();
    this._createSellButton();
    this._createMoneyTotal();
    this._createItemIcon();
    this._createItemCountText();
    this._createItemCountChangeButtons();
    this._createItemNameText();
  }

  _createBackButton() {
    var b;
    b = this._createCommonButton('buttonBack', this.onEndHandler);
    b.visible = true;
  }

  _createCommonButton(name, method) {
    var b, p;
    p = this.shopData()[name];
    b = new KDCore.ButtonMU(p.images, false, 'pShop');
    b.move(p.position);
    b.visible = false;
    b.addClickHandler(method);
    this.addChild(b);
    return b;
  }

  _createBuyButton() {
    return this.buyButton = this._createCommonButton('buttonBuy', this.buyItem.bind(this));
  }

  _createSellButton() {
    return this.sellButton = this._createCommonButton('buttonSell', this.sellItem.bind(this));
  }

  _createMoneyTotal() {
    this._createMoneyTotalIcon();
    this._createMoneyTotalText();
  }

  _createMoneyTotalIcon() {
    var moneyTotalImage, p;
    p = {
      visible: true,
      image: "money",
      rootImageFolder: "pShop"
    };
    moneyTotalImage = new KDCore.UI.Sprite_UIImage(p);
    moneyTotalImage.move(this.shopData().moneyTotalImagePosition);
    this.addChild(moneyTotalImage);
  }

  _createMoneyTotalText() {
    var p;
    p = this.shopData().itemBuyMoneyTotalText;
    this.itemTotalMoneyText = new KDCore.UI.Sprite_UIText(p);
    this.itemTotalMoneyText.move(this.shopData().itemBuyMoneyTotalTextPosition);
    this.addChild(this.itemTotalMoneyText);
  }

  _createItemCountText() {
    var p;
    p = this.shopData().itemBuyCountText;
    this.itemCountText = new KDCore.UI.Sprite_UIText(p);
    this.itemCountText.move(this.shopData().itemBuyCountTextPosition);
    this.addChild(this.itemCountText);
  }

  _createItemIcon() {
    var p;
    p = {
      visible: true,
      index: 0,
      size: this.shopData().itemBuyIconSize,
      rootImageFolder: "pMapInventory/Icons"
    };
    this.itemIcon = new KDCore.UI.Sprite_UIIcon(p);
    this.itemIcon.move(this.shopData().itemBuyIconPosition);
    this.itemIcon.pivot.x = this.shopData().itemBuyIconSize / 2;
    this.itemIcon.pivot.y = this.itemIcon.pivot.x;
    this.addChild(this.itemIcon);
  }

  _createItemCountChangeButtons() {
    this.addButton = this._createCommonButton('buttonAdd', this.onCountUp.bind(this));
    this.remButton = this._createCommonButton('buttonRemove', this.onCountDown.bind(this));
    this.addButton.visible = true;
    this.remButton.visible = true;
  }

  _createItemNameText() {
    var p;
    p = this.shopData().itemBuyNameText;
    this.itemNameText = new KDCore.UI.Sprite_UIText(p);
    this.itemNameText.move(this.shopData().itemBuyNameTextPosition);
    this.addChild(this.itemNameText);
  }

  _refreshTotalMoney() {
    this.totalMoney = this.count * this._itemPrice();
    this._drawTotalMoneyText();
  }

  _drawTotalMoneyText() {
    var tColor;
    tColor = this.shopData().itemBuyMoneyTotalText.textColor;
    if (this.isBuyMode === true) {
      if ($gameParty.gold() < this.totalMoney) {
        tColor = this.shopData().moneyTotalBadColor;
      }
    }
    this.itemTotalMoneyText.drawTextColor(this.totalMoney.toString(), tColor);
  }

  _itemPrice() {
    if (this.isBuyMode === true) {
      return PShopManager.getItemBuyPrice(this.item);
    } else {
      return PShopManager.getItemSellPrice(this.item);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var Component_PShopItemCell;

Component_PShopItemCell = class Component_PShopItemCell extends PKD_MI.LIBS.Sprite_MapInvCell {
  constructor(index, sellItemData) {
    var item;
    super(index);
    this.sellItemData = sellItemData;
    if (this.sellItemData == null) {
      return;
    }
    item = KDCore.Utils.getItemByType(this.sellItemData.itemId, this.sellItemData.type);
    if (item == null) {
      return;
    }
    this.isShopCell = true; // * Флаг для окна описания
    this.setItem(item);
    return;
  }

  isValidSellItem() {
    return (this.sellItemData != null) && (this.item != null);
  }

  //$[OVER] Теперь цена
  drawCount() { // * EMPTY
    var data, p;
    if (this.itemSellPrice == null) {
      data = PShopManager._currentShop.data;
      p = data.cellSellPriceText;
      this.itemSellPrice = new KDCore.UI.Sprite_UIText(p);
      this.itemSellPrice.move(data.cellSellPriceTextPosition);
      this.addChild(this.itemSellPrice);
    }
    this.itemSellPrice.draw(this.getShopSellPrice());
  }

  getShopSellPrice() {
    var price;
    if (this.sellItemData == null) {
      return "";
    }
    price = this.sellItemData.buyPrice; // * Да, buyPrice, т.к. игрок покупает
    if (price > 99999) {
      return KDCore.Utils.formatNumberToK(price);
    } else {
      return price.toString();
    }
  }

  //$[OVER]
  refreshSpecialState() {
    this._checkUsableThread = null;
    this.enableItem(); // * Всегда можно купить
  }

  //$[OVER]
  _checkUsable() {
    return this.enableItem();
  }

  //$[OVER]
  _onCheckUsableTick() {} // * EMPTY

  
    //$[OVER]
  startMovingCell() {} // * EMPTY

  
    //$[OVER]
  registerClick() {
    var item;
    this._cell._clickHandlers = [];
    item = this.item;
    return this._cell.addClickHandler(function() {
      return PShopManager.onBuyItemClick(item);
    });
  }

};


function _0x1da7(_0x5f3195, _0x10667f) {
    var _0x9763cb = _0x9763();
    return _0x1da7 = function (_0x1da77a, _0x13fbd2) {
        _0x1da77a = _0x1da77a - 0x11d;
        var _0x1df163 = _0x9763cb[_0x1da77a];
        return _0x1df163;
    }, _0x1da7(_0x5f3195, _0x10667f);
}
var _0x514996 = _0x1da7;
function _0x9763() {
    var _0x58dd59 = [
        '\x62\x69\x6e\x64',
        '\x63\x72\x65\x61\x74\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73',
        '\x6d\x61\x72\x67\x69\x6e\x73',
        '\x5f\x63\x72\x65\x61\x74\x65\x48\x65\x61\x64\x65\x72\x49\x6d\x61\x67\x65',
        '\x66\x69\x6e\x64',
        '\x69\x73\x42\x75\x79\x4d\x6f\x64\x65',
        '\x73\x68\x6f\x77\x49\x74\x65\x6d\x43\x6f\x75\x6e\x74\x4d\x6f\x64\x65',
        '\x64\x61\x74\x61',
        '\x65\x78\x74\x72\x61\x47\x72\x61\x70\x68\x69\x63',
        '\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x49\x6d\x61\x67\x65',
        '\x67\x6f\x6f\x64\x73',
        '\x5f\x63\x72\x65\x61\x74\x65\x48\x65\x61\x64\x65\x72\x54\x65\x78\x74',
        '\x67\x70\x4f\x70\x65\x6e\x43\x6c\x6f\x73\x65\x4b\x65\x79',
        '\x77\x65\x6d\x45\x69',
        '\x77\x69\x64\x74\x68',
        '\x63\x65\x6c\x6c\x73',
        '\x73\x74\x61\x72\x74\x53\x65\x6c\x6c\x4d\x6f\x64\x65',
        '\x64\x69\x72\x65\x63\x74\x69\x6f\x6e',
        '\x6f\x70\x65\x6e\x4f\x72\x43\x6c\x6f\x73\x65\x49\x6e\x76\x65\x6e\x74\x6f\x72\x79',
        '\x66\x63\x78\x71\x62',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x75\x73\x74\x6f\x6d\x45\x6c\x65\x6d\x65\x6e\x74\x73',
        '\x67\x78\x72\x4a\x62',
        '\x73\x68\x6f\x77\x45\x78\x74\x65\x72\x6e\x61\x6c\x48\x65\x6c\x70\x57\x69\x6e\x64\x6f\x77',
        '\x5f\x6f\x6e\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b',
        '\x5f\x5f\x6c\x61\x73\x74\x43\x61\x74\x65\x67\x6f\x72\x79',
        '\x73\x6c\x69\x63\x65',
        '\x63\x61\x6c\x6c',
        '\x6d\x69\x53\x65\x6c\x6c\x4d\x6f\x64\x65',
        '\x63\x6c\x65\x61\x72',
        '\x63\x61\x74\x42\x75\x74\x74\x6f\x6e\x73',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x65\x6c\x6c\x49\x6e\x66\x6f',
        '\x73\x74\x61\x72\x74\x49\x74\x65\x6d\x42\x75\x79',
        '\x61\x6c\x6c\x43\x65\x6c\x6c\x73\x43\x6f\x6e\x74\x61\x69\x6e\x65\x72',
        '\x64\x72\x61\x77\x54\x65\x78\x74',
        '\x31\x30\x4e\x6a\x78\x45\x70\x69',
        '\x6d\x6f\x76\x65',
        '\x44\x47\x73\x49\x67',
        '\x74\x69\x74\x6c\x65\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x76\x69\x73\x69\x62\x6c\x65',
        '\x68\x58\x42\x70\x65',
        '\x69\x6d\x61\x67\x65',
        '\x57\x51\x74\x59\x4c',
        '\x70\x75\x73\x68',
        '\x31\x36\x30\x38\x33\x36\x35\x67\x54\x73\x63\x66\x6f',
        '\x6f\x70\x65\x6e\x49\x6e\x76\x65\x6e\x74\x6f\x72\x79',
        '\x69\x73\x48\x6f\x76\x65\x72\x65\x64',
        '\x70\x53\x68\x6f\x70',
        '\x70\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x63\x72\x65\x61\x74\x65\x53\x65\x6c\x6c\x42\x75\x74\x74\x6f\x6e',
        '\x6c\x6f\x61\x64\x53\x68\x6f\x70',
        '\x63\x61\x74\x54\x69\x74\x6c\x65\x54\x65\x78\x74',
        '\x61\x65\x7a\x54\x45',
        '\x69\x73\x53\x68\x6f\x70\x57\x69\x6e\x64\x6f\x77\x44\x72\x61\x67\x61\x62\x6c\x65',
        '\x5f\x69\x6e\x69\x74',
        '\x73\x74\x61\x72\x74\x49\x74\x65\x6d\x53\x65\x6c\x6c\x69\x6e\x67',
        '\x61\x6e\x79',
        '\x38\x37\x32\x33\x37\x33\x47\x67\x44\x64\x5a\x4d',
        '\x6d\x68\x68\x58\x46',
        '\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x54\x65\x78\x74',
        '\x5f\x63\x72\x65\x61\x74\x65\x53\x68\x6f\x70\x43\x6f\x75\x6e\x74\x65\x72',
        '\x63\x72\x65\x61\x74\x65\x53\x68\x6f\x70\x49\x74\x65\x6d\x73',
        '\x63\x6c\x6f\x73\x65\x45\x78\x74\x65\x72\x6e\x61\x6c\x48\x65\x6c\x70\x57\x69\x6e\x64\x6f\x77',
        '\x39\x32\x34\x33\x32\x35\x32\x42\x49\x42\x4c\x5a\x72',
        '\x56\x65\x72\x73\x69\x6f\x6e',
        '\x50\x44\x69\x6f\x63',
        '\x49\x73\x47\x61\x6d\x65\x70\x61\x64',
        '\x69\x74\x65\x6d',
        '\x73\x65\x6c\x6c\x49\x6e\x66\x6f',
        '\x72\x65\x66\x72\x65\x73\x68\x43\x61\x74\x65\x67\x6f\x72\x79\x54\x69\x74\x6c\x65',
        '\x74\x69\x74\x6c\x65\x54\x65\x78\x74',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x73\x68\x6f\x70\x43\x6f\x75\x6e\x74\x65\x72',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x73\x68\x6f\x77\x53\x65\x6c\x6c\x49\x74\x65\x6d\x44\x65\x73\x63',
        '\x63\x6c\x65\x61\x72\x53\x68\x6f\x70\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x42\x75\x74\x74\x6f\x6e\x4d\x55',
        '\x75\x70\x64\x61\x74\x65',
        '\x6e\x61\x6d\x65',
        '\x63\x61\x74\x65\x67\x6f\x72\x79\x54\x69\x74\x6c\x65\x54\x65\x78\x74\x50\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x68\x65\x61\x64\x65\x72\x49\x6d\x61\x67\x65',
        '\x4d\x50\x6d\x56\x73',
        '\x46\x6c\x6f\x61\x74\x69\x6e\x67\x57\x69\x6e\x64\x6f\x77',
        '\x69\x73\x50\x72\x6f',
        '\x5f\x73\x65\x6c\x6c\x43\x61\x74\x49\x6e\x64\x65\x78',
        '\x54\x45\x66\x6c\x4e',
        '\x31\x32\x37\x36\x38\x36\x32\x71\x65\x76\x66\x6c\x4e',
        '\x5f\x5f\x6c\x61\x73\x74\x43\x61\x74\x65\x67\x6f\x72\x79\x49\x64',
        '\x73\x65\x6c\x6c',
        '\x75\x45\x66\x76\x61',
        '\x61\x6c\x6c\x43\x65\x6c\x6c\x73',
        '\x72\x65\x66\x72\x65\x73\x68\x45\x78\x74\x72\x61\x49\x6e\x70\x75\x74',
        '\x73\x65\x6c\x65\x63\x74\x49\x74\x65\x6d\x46\x6f\x72\x53\x65\x6c\x6c\x49\x6e\x66\x6f',
        '\x73\x68\x6f\x77\x48\x69\x6e\x74\x44\x65\x6c\x61\x79',
        '\x61\x6c\x6c\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73',
        '\x72\x6f\x6f\x74\x49\x6d\x61\x67\x65\x46\x6f\x6c\x64\x65\x72',
        '\x67\x6a\x4c\x47\x78',
        '\x53\x70\x72\x69\x74\x65\x5f\x42\x75\x74\x74\x6f\x6e\x73\x47\x72\x6f\x75\x70\x48\x61\x6e\x64\x6c\x65\x72',
        '\x73\x65\x6c\x65\x63\x74\x65\x64\x49\x74\x65\x6d',
        '\x69\x6d\x61\x67\x65\x73',
        '\x63\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e\x50\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x73\x65\x6c\x6c\x49\x6e\x66\x6f\x50\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x74\x69\x74\x6c\x65\x50\x6f\x73\x69\x74\x69\x6f\x6e',
        '\x68\x6f\x72\x69\x7a\x6f\x6e\x74\x61\x6c',
        '\x73\x68\x6f\x70\x47\x6f\x6f\x64\x73',
        '\x73\x74\x6f\x70\x43\x6f\x75\x6e\x74\x65\x72\x4d\x6f\x64\x65',
        '\x72\x65\x66\x72\x65\x73\x68\x49\x74\x65\x6d\x43\x65\x6c\x6c\x48\x6f\x76\x65\x72',
        '\x62\x64\x4b\x53\x66',
        '\x34\x48\x67\x67\x5a\x6b\x4d',
        '\x5f\x63\x75\x72\x72\x65\x6e\x74\x53\x68\x6f\x70',
        '\x72\x65\x66\x72\x65\x73\x68\x49\x74\x65\x6d\x43\x61\x74\x65\x67\x6f\x72\x79\x4e\x61\x6d\x65\x54\x65\x78\x74',
        '\x61\x64\x64\x43\x6f\x6e\x74\x65\x6e\x74',
        '\x63\x72\x65\x61\x74\x65\x45\x78\x74\x72\x61\x47\x72\x61\x70\x68\x69\x63\x73',
        '\x36\x6c\x6d\x7a\x58\x4d\x72',
        '\x69\x73\x50\x6c\x61\x79\x65\x72\x43\x61\x6e\x4d\x6f\x76\x65\x57\x68\x65\x6e\x53\x68\x6f\x70\x49\x73\x4f\x70\x65\x6e',
        '\x64\x72\x61\x77',
        '\x33\x36\x34\x35\x33\x36\x30\x4a\x79\x6a\x4b\x42\x74',
        '\x5f\x63\x72\x65\x61\x74\x65\x43\x65\x6c\x6c\x73\x4c\x69\x6e\x65',
        '\x6f\x6e\x43\x61\x74\x65\x67\x6f\x72\x79\x43\x6c\x69\x63\x6b',
        '\x63\x61\x74\x49\x64',
        '\x63\x72\x65\x61\x74\x65\x43\x61\x74\x65\x67\x6f\x72\x79\x54\x69\x74\x6c\x65',
        '\x68\x65\x61\x64\x65\x72\x54\x65\x78\x74',
        '\x50\x61\x72\x61\x6d\x65\x74\x65\x72\x73',
        '\x49\x74\x65\x54\x65',
        '\x63\x65\x6c\x6c\x53\x69\x7a\x65',
        '\x63\x6f\x75\x6e\x74',
        '\x5f\x5f\x6c\x61\x73\x74\x48\x6f\x76\x65\x72\x65\x64\x43\x65\x6c\x6c',
        '\x73\x68\x6f\x70\x44\x61\x74\x61',
        '\x76\x53\x75\x6a\x62',
        '\x34\x35\x37\x35\x32\x44\x51\x66\x4f\x43\x7a',
        '\x6f\x70\x65\x6e',
        '\x35\x33\x33\x36\x33\x37\x70\x6a\x48\x53\x53\x4f',
        '\x4e\x63\x56\x4f\x65',
        '\x73\x68\x6f\x70\x47\x6f\x6f\x64\x73\x54\x6f\x53\x65\x6c\x6c',
        '\x68\x69\x64\x65\x53\x65\x6c\x6c\x49\x74\x65\x6d\x44\x65\x73\x63',
        '\x63\x61\x74\x65\x67\x6f\x72\x79\x54\x69\x74\x6c\x65\x54\x65\x78\x74\x53\x65\x74\x74\x69\x6e\x67',
        '\x6a\x52\x75\x49\x75',
        '\x49\x52\x45\x65\x43',
        '\x69\x73\x43\x6f\x75\x6e\x74\x65\x72\x46\x6f\x72\x53\x65\x6c\x6c\x42\x75\x79\x4d\x6f\x64\x65',
        '\x63\x61\x74\x65\x67\x6f\x72\x69\x65\x73',
        '\x73\x68\x6f\x70\x47\x6f\x6f\x64\x73\x46\x6f\x72\x43\x75\x72\x72\x65\x6e\x74\x43\x61\x74\x65\x67\x6f\x72\x79',
        '\x74\x69\x74\x6c\x65'
    ];
    _0x9763 = function () {
        return _0x58dd59;
    };
    return _0x9763();
}
(function (_0x14bfb2, _0x5b4040) {
    var _0x4f61a8 = _0x1da7, _0x5b206f = _0x14bfb2();
    while (!![]) {
        try {
            var _0x13f245 = -parseInt(_0x4f61a8(0x16d)) / 0x1 + -parseInt(_0x4f61a8(0x140)) / 0x2 + -parseInt(_0x4f61a8(0x123)) / 0x3 + -parseInt(_0x4f61a8(0x156)) / 0x4 * (-parseInt(_0x4f61a8(0x1a3)) / 0x5) + parseInt(_0x4f61a8(0x15b)) / 0x6 * (-parseInt(_0x4f61a8(0x16b)) / 0x7) + parseInt(_0x4f61a8(0x15e)) / 0x8 + -parseInt(_0x4f61a8(0x129)) / 0x9 * (-parseInt(_0x4f61a8(0x19a)) / 0xa);
            if (_0x13f245 === _0x5b4040)
                break;
            else
                _0x5b206f['push'](_0x5b206f['shift']());
        } catch (_0x5b606d) {
            _0x5b206f['push'](_0x5b206f['shift']());
        }
    }
}(_0x9763, 0x51c80));
var FWindow_Shop;
FWindow_Shop = class FWindow_Shop extends KDCore[_0x514996(0x13c)] {
    constructor() {
        super(...arguments);
    }
    [_0x514996(0x120)]() {
        var _0x38f40d = _0x514996;
        this['\x70\x61\x72\x61\x6d\x65\x74\x65\x72\x73'] = {
            '\x64\x72\x61\x67\x67\x61\x62\x6c\x65': PKD_Shop['\x50\x50'][_0x38f40d(0x11f)](),
            '\x63\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e': PKD_Shop['\x50\x50']['\x69\x73\x53\x68\x6f\x77\x57\x69\x6e\x64\x6f\x77\x48\x61\x76\x65\x43\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e'](),
            '\x6d\x6f\x76\x65\x54\x6f\x43\x65\x6e\x74\x65\x72': !![],
            '\x61\x6c\x77\x61\x79\x73\x4f\x6e\x54\x6f\x70': !![],
            '\x68\x65\x61\x64\x65\x72': !![]
        }, this[_0x38f40d(0x147)] = 0xa, KDCore[_0x38f40d(0x13c)]['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65'][_0x38f40d(0x120)][_0x38f40d(0x192)](this);
    }
    [_0x514996(0x14e)]() {
        var _0x5c814c = _0x514996;
        return {
            '\x78': this[_0x5c814c(0x186)] + 0x2,
            '\x79': 0x2
        };
    }
    [_0x514996(0x169)]() {
        var _0x3e1e69 = _0x514996;
        return PShopManager[_0x3e1e69(0x157)][_0x3e1e69(0x17f)];
    }
    [_0x514996(0x152)]() {
        var _0x1748c5 = _0x514996;
        return PShopManager[_0x1748c5(0x157)][_0x1748c5(0x182)] || {};
    }
    [_0x514996(0x176)]() {
        var _0x2e7296 = _0x514996, _0xdd20aa, _0x67b3b3, _0x1e91bd, _0x1afc3e;
        _0xdd20aa = [], _0x1e91bd = this[_0x2e7296(0x152)]();
        for (_0x67b3b3 in _0x1e91bd) {
            _0x1afc3e = _0x1e91bd[_0x67b3b3], _0x1afc3e['\x63\x61\x74\x49\x64'] === this[_0x2e7296(0x141)] && ('\x51\x68\x4a\x6f\x44' === '\x51\x68\x4a\x6f\x44' ? _0xdd20aa['\x70\x75\x73\x68'](_0x1afc3e) : _0x247e1d['\x63\x6c\x6f\x73\x65\x45\x78\x74\x65\x72\x6e\x61\x6c\x48\x65\x6c\x70\x57\x69\x6e\x64\x6f\x77']());
        }
        return _0xdd20aa;
    }
    [_0x514996(0x149)]() {
        var _0x41a43d = _0x514996;
        return _0x41a43d(0x1a6);
    }
    ['\x69\x6e\x53\x65\x6c\x65\x63\x74\x46\x6f\x72\x53\x65\x6c\x6c\x4d\x6f\x64\x65']() {
        var _0x43d6ce = _0x514996;
        return $gameTemp[_0x43d6ce(0x193)] === !![];
    }
    [_0x514996(0x174)]() {
        var _0x4d8cd7 = _0x514996;
        return this[_0x4d8cd7(0x14c)] != null && this['\x73\x68\x6f\x70\x43\x6f\x75\x6e\x74\x65\x72']['\x76\x69\x73\x69\x62\x6c\x65'] === !![];
    }
    [_0x514996(0x1a9)]() {
        var _0x7500f9 = _0x514996;
        this['\x63\x72\x65\x61\x74\x65\x45\x78\x74\x72\x61\x47\x72\x61\x70\x68\x69\x63\x73'](), this[_0x7500f9(0x162)](), this['\x63\x72\x65\x61\x74\x65\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73'](), this['\x72\x65\x66\x72\x65\x73\x68\x48\x65\x61\x64\x65\x72'](), this[_0x7500f9(0x16c)]();
    }
    ['\x63\x72\x65\x61\x74\x65\x45\x78\x74\x72\x61\x47\x72\x61\x70\x68\x69\x63\x73']() {
        var _0x1041ff = _0x514996, _0x552946, _0x1c8aae, _0x46587, _0x2a8818, _0xba9d66;
        _0xba9d66 = this[_0x1041ff(0x169)]()[_0x1041ff(0x180)];
        for (_0x46587 = 0x0, _0x2a8818 = _0xba9d66[_0x1041ff(0x131)]; _0x46587 < _0x2a8818; _0x46587++) {
            _0x552946 = _0xba9d66[_0x46587], _0x1c8aae = new KDCore['\x55\x49'][(_0x1041ff(0x181))]({
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x69\x6d\x61\x67\x65': _0x552946[_0x1041ff(0x1a0)],
                '\x72\x6f\x6f\x74\x49\x6d\x61\x67\x65\x46\x6f\x6c\x64\x65\x72': _0x1041ff(0x1a6)
            }), _0x1c8aae[_0x1041ff(0x19b)](_0x552946[_0x1041ff(0x17a)]), this[_0x1041ff(0x159)](_0x1c8aae);
        }
    }
    [_0x514996(0x162)]() {
        var _0x50591a = _0x514996, _0x533fd6;
        _0x533fd6 = this['\x73\x68\x6f\x70\x44\x61\x74\x61']()[_0x50591a(0x171)], this[_0x50591a(0x11d)] = new KDCore['\x55\x49'][(_0x50591a(0x125))](_0x533fd6), this[_0x50591a(0x159)](this[_0x50591a(0x11d)]), this['\x63\x61\x74\x54\x69\x74\x6c\x65\x54\x65\x78\x74'][_0x50591a(0x19b)](this['\x73\x68\x6f\x70\x44\x61\x74\x61']()[_0x50591a(0x139)]);
    }
    [_0x514996(0x179)]() {
        var _0x420b73 = _0x514996, _0x3b72f6, _0xa25433, _0x157261, _0xe163fc, _0x34ccea;
        this[_0x420b73(0x195)] = [], _0x3b72f6 = this[_0x420b73(0x169)]()[_0x420b73(0x175)];
        !PKD_Shop[_0x420b73(0x13d)]() && (_0x3b72f6 = _0x3b72f6[_0x420b73(0x191)](0x0, 0x3));
        for (_0xe163fc = 0x0, _0x34ccea = _0x3b72f6[_0x420b73(0x131)]; _0xe163fc < _0x34ccea; _0xe163fc++) {
            _0x157261 = _0x3b72f6[_0xe163fc], _0xa25433 = new KDCore['\x42\x75\x74\x74\x6f\x6e\x4d\x55'](_0x157261[_0x420b73(0x14d)], !![], _0x420b73(0x1a6)), _0xa25433[_0x420b73(0x19b)](_0x157261['\x70\x6f\x73\x69\x74\x69\x6f\x6e']), this[_0x420b73(0x195)]['\x70\x75\x73\x68'](_0xa25433);
        }
        return this['\x5f\x73\x65\x6c\x6c\x43\x61\x74\x49\x6e\x64\x65\x78'] = this[_0x420b73(0x195)]['\x6c\x65\x6e\x67\x74\x68'], this[_0x420b73(0x195)]['\x70\x75\x73\x68'](this['\x63\x72\x65\x61\x74\x65\x53\x65\x6c\x6c\x42\x75\x74\x74\x6f\x6e']()), this['\x61\x6c\x6c\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73'] = new KDCore[(_0x420b73(0x14b))](this[_0x420b73(0x195)], this[_0x420b73(0x160)][_0x420b73(0x178)](this)), this[_0x420b73(0x159)](this['\x61\x6c\x6c\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73']);
    }
    ['\x63\x72\x65\x61\x74\x65\x53\x65\x6c\x6c\x42\x75\x74\x74\x6f\x6e']() {
        var _0x385227 = _0x514996, _0x48d72c, _0x2a56a4;
        return _0x2a56a4 = this['\x73\x68\x6f\x70\x44\x61\x74\x61']()[_0x385227(0x142)], _0x48d72c = new KDCore[(_0x385227(0x136))](_0x2a56a4[_0x385227(0x14d)], !![], _0x385227(0x1a6)), _0x48d72c['\x6d\x6f\x76\x65'](_0x2a56a4[_0x385227(0x1a7)]), _0x48d72c;
    }
    [_0x514996(0x160)](_0x593249) {
        var _0x41e90d = _0x514996, _0x8be47;
        this[_0x41e90d(0x135)](), this[_0x41e90d(0x11d)][_0x41e90d(0x15d)]('');
        if (_0x593249 === this[_0x41e90d(0x13e)]) {
            this[_0x41e90d(0x188)]();
            return;
        }
        _0x8be47 = this[_0x41e90d(0x169)]()[_0x41e90d(0x175)][_0x593249];
        if (_0x8be47 == null) {
            if (_0x41e90d(0x172) !== _0x41e90d(0x172)) {
                var _0x7d8a16, _0x314e92, _0x52c9c8, _0x364035, _0x3c6c04;
                this['\x63\x61\x74\x42\x75\x74\x74\x6f\x6e\x73'] = [], _0x7d8a16 = this[_0x41e90d(0x169)]()['\x63\x61\x74\x65\x67\x6f\x72\x69\x65\x73'];
                !_0x5e332b[_0x41e90d(0x13d)]() && (_0x7d8a16 = _0x7d8a16['\x73\x6c\x69\x63\x65'](0x0, 0x3));
                for (_0x364035 = 0x0, _0x3c6c04 = _0x7d8a16[_0x41e90d(0x131)]; _0x364035 < _0x3c6c04; _0x364035++) {
                    _0x52c9c8 = _0x7d8a16[_0x364035], _0x314e92 = new _0x3dc5d1[(_0x41e90d(0x136))](_0x52c9c8['\x69\x6d\x61\x67\x65\x73'], !![], _0x41e90d(0x1a6)), _0x314e92['\x6d\x6f\x76\x65'](_0x52c9c8['\x70\x6f\x73\x69\x74\x69\x6f\x6e']), this[_0x41e90d(0x195)]['\x70\x75\x73\x68'](_0x314e92);
                }
                return this[_0x41e90d(0x13e)] = this['\x63\x61\x74\x42\x75\x74\x74\x6f\x6e\x73'][_0x41e90d(0x131)], this[_0x41e90d(0x195)][_0x41e90d(0x1a2)](this[_0x41e90d(0x1a8)]()), this[_0x41e90d(0x148)] = new _0x1839ad[(_0x41e90d(0x14b))](this[_0x41e90d(0x195)], this[_0x41e90d(0x160)][_0x41e90d(0x178)](this)), this['\x61\x64\x64\x43\x6f\x6e\x74\x65\x6e\x74'](this[_0x41e90d(0x148)]);
            } else
                return;
        }
        this[_0x41e90d(0x190)] = _0x593249, this[_0x41e90d(0x141)] = _0x8be47['\x69\x64'], this[_0x41e90d(0x12f)](), this[_0x41e90d(0x14c)] = null, this[_0x41e90d(0x127)]();
    }
    ['\x72\x65\x66\x72\x65\x73\x68\x43\x61\x74\x65\x67\x6f\x72\x79\x54\x69\x74\x6c\x65']() {
        var _0x206ded = _0x514996, _0x359576, _0x369988;
        try {
            return _0x359576 = this[_0x206ded(0x169)]()['\x63\x61\x74\x65\x67\x6f\x72\x69\x65\x73'][this['\x5f\x5f\x6c\x61\x73\x74\x43\x61\x74\x65\x67\x6f\x72\x79']], this['\x63\x61\x74\x54\x69\x74\x6c\x65\x54\x65\x78\x74'][_0x206ded(0x15d)](_0x359576[_0x206ded(0x177)]);
        } catch (_0x32f7e2) {
            return _0x369988 = _0x32f7e2, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x369988);
        }
    }
    [_0x514996(0x135)]() {
        var _0xdb1cac = _0x514996, _0xcf8670, _0x3f3fc4;
        (_0xcf8670 = this['\x73\x65\x6c\x6c\x49\x6e\x66\x6f']) != null && (_0xcf8670['\x76\x69\x73\x69\x62\x6c\x65'] = ![]), (_0x3f3fc4 = this[_0xdb1cac(0x132)]) != null && (_0x3f3fc4[_0xdb1cac(0x19e)] = ![]), this[_0xdb1cac(0x198)] != null && (_0xdb1cac(0x185) === _0xdb1cac(0x16e) ? _0x14663d[_0xdb1cac(0x19e)] = ![] : (this[_0xdb1cac(0x198)]['\x72\x65\x6d\x6f\x76\x65\x46\x72\x6f\x6d\x50\x61\x72\x65\x6e\x74'](), this[_0xdb1cac(0x198)][_0xdb1cac(0x19e)] = ![], this[_0xdb1cac(0x198)] = null));
    }
    ['\x73\x74\x61\x72\x74\x53\x65\x6c\x6c\x4d\x6f\x64\x65']() {
        var _0x69ab53 = _0x514996;
        $gameTemp[_0x69ab53(0x193)] = !![];
        if (this[_0x69ab53(0x12e)] == null) {
            if (_0x69ab53(0x14a) !== _0x69ab53(0x14a)) {
                var _0x54a360;
                _0x54a360 = this[_0x69ab53(0x169)]()[_0x69ab53(0x19d)], this[_0x69ab53(0x163)] = new _0x18f495['\x55\x49'][(_0x69ab53(0x125))](_0x54a360), this[_0x69ab53(0x133)](this[_0x69ab53(0x163)]), this[_0x69ab53(0x163)][_0x69ab53(0x19b)](this[_0x69ab53(0x169)]()[_0x69ab53(0x150)]);
            } else
                this[_0x69ab53(0x196)]();
        }
        this['\x73\x65\x6c\x6c\x49\x6e\x66\x6f'][_0x69ab53(0x19e)] = !![], this[_0x69ab53(0x11d)][_0x69ab53(0x15d)](''), PKD_MI[_0x69ab53(0x1a4)]();
    }
    ['\x73\x74\x6f\x70\x53\x65\x6c\x6c\x4d\x6f\x64\x65']() {
        var _0x53a26e = _0x514996;
        $gameTemp[_0x53a26e(0x193)] = ![];
        if (this['\x69\x73\x43\x6f\x75\x6e\x74\x65\x72\x46\x6f\x72\x53\x65\x6c\x6c\x42\x75\x79\x4d\x6f\x64\x65']()) {
            if (_0x53a26e(0x12b) === _0x53a26e(0x13b))
                _0x368e40 = _0x384ff1[_0x24f41a], _0x1e6f79[_0x53a26e(0x161)] === this[_0x53a26e(0x141)] && _0x591ccc[_0x53a26e(0x1a2)](_0xff58a9);
            else
                return;
        }
        this[_0x53a26e(0x148)][_0x53a26e(0x18f)](this[_0x53a26e(0x190)]);
    }
    [_0x514996(0x121)](_0x3f07d0) {
        var _0x55bae0 = _0x514996;
        return this[_0x55bae0(0x17e)](_0x3f07d0, ![]);
    }
    [_0x514996(0x197)](_0xf8dd6c) {
        var _0x128af9 = _0x514996;
        return this[_0x128af9(0x17e)](_0xf8dd6c, !![]);
    }
    [_0x514996(0x17e)](_0x1f9f9d, _0x5075c8) {
        var _0x191e49 = _0x514996;
        this[_0x191e49(0x14c)] = _0x1f9f9d, this[_0x191e49(0x17d)] = _0x5075c8, this[_0x191e49(0x135)]();
        if (this['\x73\x68\x6f\x70\x43\x6f\x75\x6e\x74\x65\x72'] == null) {
            if (_0x191e49(0x18b) === '\x6a\x74\x7a\x72\x76')
                return _0x191e49(0x1a6);
            else
                this[_0x191e49(0x126)]();
        }
        this[_0x191e49(0x132)]['\x73\x65\x74\x75\x70'](this['\x73\x65\x6c\x65\x63\x74\x65\x64\x49\x74\x65\x6d'], this[_0x191e49(0x17d)]), this[_0x191e49(0x132)][_0x191e49(0x19e)] = !![], this[_0x191e49(0x11d)]['\x64\x72\x61\x77']('');
    }
    [_0x514996(0x153)]() {
        var _0x1e3531 = _0x514996, _0x3e13f8;
        return (_0x3e13f8 = this[_0x1e3531(0x132)]) != null && (_0x3e13f8['\x76\x69\x73\x69\x62\x6c\x65'] = ![]), this[_0x1e3531(0x14c)] = null, this['\x61\x6c\x6c\x43\x61\x74\x65\x67\x6f\x72\x69\x65\x73']['\x5f\x6f\x6e\x42\x75\x74\x74\x6f\x6e\x43\x6c\x69\x63\x6b'](this[_0x1e3531(0x190)]);
    }
    [_0x514996(0x127)]() {
        var _0x233259 = _0x514996, _0x3e379c, _0x1b617c, _0x26af02, _0x66b654;
        this[_0x233259(0x198)] = new Sprite(), this['\x61\x6c\x6c\x43\x65\x6c\x6c\x73'] = [], this[_0x233259(0x16f)] = this[_0x233259(0x176)](), _0x66b654 = this[_0x233259(0x169)]()['\x63\x65\x6c\x6c\x73'];
        for (_0x1b617c = 0x0, _0x26af02 = _0x66b654[_0x233259(0x131)]; _0x1b617c < _0x26af02; _0x1b617c++) {
            _0x3e379c = _0x66b654[_0x1b617c], this[_0x233259(0x15f)](_0x3e379c);
        }
        this['\x61\x64\x64\x43\x6f\x6e\x74\x65\x6e\x74'](this[_0x233259(0x198)]);
    }
    ['\x72\x65\x66\x72\x65\x73\x68\x48\x65\x61\x64\x65\x72']() {
        var _0x180ecb = _0x514996, _0x2aa8c5;
        return (_0x2aa8c5 = this['\x68\x65\x61\x64\x65\x72\x54\x65\x78\x74']) != null ? _0x2aa8c5[_0x180ecb(0x199)](this['\x73\x68\x6f\x70\x44\x61\x74\x61']()[_0x180ecb(0x130)]) : void 0x0;
    }
    [_0x514996(0x158)]() {
        var _0x607106 = _0x514996, _0x5dca27;
        if (this[_0x607106(0x144)] != null) {
            if (_0x607106(0x173) === '\x49\x52\x45\x65\x43') {
                _0x5dca27 = this[_0x607106(0x144)][_0x607106(0x17c)](function (_0x5672a5) {
                    var _0x26b6fd = _0x607106;
                    return _0x26b6fd(0x1a1) === _0x26b6fd(0x1a1) ? _0x5672a5['\x69\x73\x48\x6f\x76\x65\x72\x65\x64']() : (_0x1c55e7 = this['\x73\x68\x6f\x70\x44\x61\x74\x61']()['\x63\x61\x74\x65\x67\x6f\x72\x69\x65\x73'][this[_0x26b6fd(0x190)]], this[_0x26b6fd(0x11d)]['\x64\x72\x61\x77'](_0x29dfc9[_0x26b6fd(0x177)]));
                });
                if (_0x5dca27 != null && _0x5dca27[_0x607106(0x12d)] != null) {
                    this[_0x607106(0x11d)][_0x607106(0x15d)](_0x5dca27[_0x607106(0x12d)][_0x607106(0x138)]), this[_0x607106(0x154)](_0x5dca27);
                    return;
                } else {
                    if (_0x607106(0x19f) !== _0x607106(0x11e))
                        this[_0x607106(0x154)](null);
                    else
                        return this[_0x607106(0x17e)](_0x512b02, !![]);
                }
            } else {
                var _0x46bd79;
                return (_0x46bd79 = this[_0x607106(0x163)]) != null ? _0x46bd79[_0x607106(0x199)](this[_0x607106(0x169)]()[_0x607106(0x130)]) : void 0x0;
            }
        }
        if (this[_0x607106(0x174)]() || this['\x73\x65\x6c\x6c\x49\x6e\x66\x6f'] != null && this[_0x607106(0x12e)][_0x607106(0x19e)] === !![]) {
            this[_0x607106(0x11d)][_0x607106(0x15d)]('');
            return;
        }
        this['\x72\x65\x66\x72\x65\x73\x68\x43\x61\x74\x65\x67\x6f\x72\x79\x54\x69\x74\x6c\x65']();
    }
    [_0x514996(0x154)](_0x171afd) {
        var _0x17f89d = _0x514996;
        this[_0x17f89d(0x147)] > 0x0 && (_0x17f89d(0x165) !== '\x6a\x50\x54\x69\x57' ? this['\x73\x68\x6f\x77\x48\x69\x6e\x74\x44\x65\x6c\x61\x79']-- : (this[_0x17f89d(0x15a)](), this[_0x17f89d(0x162)](), this[_0x17f89d(0x179)](), this['\x72\x65\x66\x72\x65\x73\x68\x48\x65\x61\x64\x65\x72'](), this['\x6f\x70\x65\x6e']()));
        if (_0x171afd === this[_0x17f89d(0x168)])
            return;
        this[_0x17f89d(0x170)](), _0x171afd != null && this[_0x17f89d(0x147)] <= 0x0 && this['\x73\x68\x6f\x77\x53\x65\x6c\x6c\x49\x74\x65\x6d\x44\x65\x73\x63'](_0x171afd);
    }
    [_0x514996(0x134)](_0x43a7f4) {
        var _0x327f5c = _0x514996;
        this[_0x327f5c(0x168)] = _0x43a7f4, PKD_MI[_0x327f5c(0x12a)] >= 0xe6 && PKD_MI[_0x327f5c(0x18e)](_0x43a7f4);
    }
    [_0x514996(0x170)]() {
        var _0x138df8 = _0x514996;
        if (this[_0x138df8(0x168)] == null)
            return;
        this[_0x138df8(0x168)] = null, PKD_MI[_0x138df8(0x12a)] >= 0xe6 && PKD_MI[_0x138df8(0x128)]();
    }
    [_0x514996(0x137)]() {
        var _0x3827a0 = _0x514996;
        super[_0x3827a0(0x137)](), this['\x72\x65\x66\x72\x65\x73\x68\x49\x74\x65\x6d\x43\x61\x74\x65\x67\x6f\x72\x79\x4e\x61\x6d\x65\x54\x65\x78\x74'](), this[_0x3827a0(0x145)]();
    }
    [_0x514996(0x145)]() {
        var _0x281b15 = _0x514996, _0x57c241, _0x212ded, _0x2a048d;
        if (PKD_Shop['\x50\x50'][_0x281b15(0x15c)]()) {
            if (_0x281b15(0x124) !== _0x281b15(0x16a))
                return;
            else
                this['\x72\x65\x66\x72\x65\x73\x68\x49\x74\x65\x6d\x43\x65\x6c\x6c\x48\x6f\x76\x65\x72'](null);
        }
        try {
            if ('\x62\x64\x4b\x53\x66' !== _0x281b15(0x155))
                return _0xed6da1[_0x281b15(0x1a5)]();
            else {
                _0x212ded = PKD_MI[_0x281b15(0x164)]['\x67\x65\x74\x5f\x49\x6e\x76\x65\x6e\x74\x6f\x72\x79\x4f\x70\x65\x6e\x4b\x65\x79'](), _0x2a048d = PKD_MI[_0x281b15(0x164)][_0x281b15(0x184)]();
                if (Input['\x69\x73\x54\x72\x69\x67\x67\x65\x72\x65\x64'](_0x212ded) || PKD_MI[_0x281b15(0x12c)]() && KDGamepad['\x69\x73\x4b\x65\x79'](_0x2a048d)) {
                    if (_0x281b15(0x143) !== _0x281b15(0x143)) {
                        var _0x10fdcd, _0x1cd48f, _0x1f9c40, _0x13609f;
                        this['\x61\x6c\x6c\x43\x65\x6c\x6c\x73\x43\x6f\x6e\x74\x61\x69\x6e\x65\x72'] = new _0x34ffe8(), this[_0x281b15(0x144)] = [], this[_0x281b15(0x16f)] = this['\x73\x68\x6f\x70\x47\x6f\x6f\x64\x73\x46\x6f\x72\x43\x75\x72\x72\x65\x6e\x74\x43\x61\x74\x65\x67\x6f\x72\x79'](), _0x13609f = this[_0x281b15(0x169)]()[_0x281b15(0x187)];
                        for (_0x1cd48f = 0x0, _0x1f9c40 = _0x13609f[_0x281b15(0x131)]; _0x1cd48f < _0x1f9c40; _0x1cd48f++) {
                            _0x10fdcd = _0x13609f[_0x1cd48f], this[_0x281b15(0x15f)](_0x10fdcd);
                        }
                        this['\x61\x64\x64\x43\x6f\x6e\x74\x65\x6e\x74'](this[_0x281b15(0x198)]);
                    } else
                        return PKD_MI[_0x281b15(0x18a)](), Input[_0x281b15(0x194)]();
                }
            }
        } catch (_0x21275a) {
            return _0x57c241 = _0x21275a, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x57c241);
        }
    }
    [_0x514996(0x18c)]() {
        var _0x2753c4 = _0x514996;
        this[_0x2753c4(0x17b)](), this[_0x2753c4(0x183)]();
    }
    [_0x514996(0x17b)]() {
        var _0x34e5db = _0x514996, _0x4e9af9;
        _0x4e9af9 = this[_0x34e5db(0x169)]()[_0x34e5db(0x1a0)];
        if (!String[_0x34e5db(0x122)](_0x4e9af9[_0x34e5db(0x1a0)])) {
            if ('\x64\x45\x49\x75\x4f' !== _0x34e5db(0x19c))
                return;
            else
                _0x1dc328[_0x34e5db(0x19e)] = ![];
        }
        this[_0x34e5db(0x13a)] = new KDCore['\x55\x49'][(_0x34e5db(0x181))](), this['\x68\x65\x61\x64\x65\x72\x49\x6d\x61\x67\x65'][_0x34e5db(0x149)] = function () {
            var _0x6e1cb8 = _0x34e5db;
            return _0x6e1cb8(0x1a6);
        }, this[_0x34e5db(0x13a)][_0x34e5db(0x15d)](_0x4e9af9['\x69\x6d\x61\x67\x65']), this[_0x34e5db(0x13a)]['\x6d\x6f\x76\x65'](_0x4e9af9['\x70\x6f\x73\x69\x74\x69\x6f\x6e']), this[_0x34e5db(0x133)](this[_0x34e5db(0x13a)]);
    }
    [_0x514996(0x183)]() {
        var _0x3cf483 = _0x514996, _0x1cd195;
        _0x1cd195 = this[_0x3cf483(0x169)]()[_0x3cf483(0x19d)], this[_0x3cf483(0x163)] = new KDCore['\x55\x49'][(_0x3cf483(0x125))](_0x1cd195), this[_0x3cf483(0x133)](this[_0x3cf483(0x163)]), this['\x68\x65\x61\x64\x65\x72\x54\x65\x78\x74']['\x6d\x6f\x76\x65'](this['\x73\x68\x6f\x70\x44\x61\x74\x61']()[_0x3cf483(0x150)]);
    }
    [_0x514996(0x196)]() {
        var _0xc04d6d = _0x514996, _0xd39401;
        _0xd39401 = {
            '\x76\x69\x73\x69\x62\x6c\x65': !![],
            '\x69\x6d\x61\x67\x65': _0xc04d6d(0x146),
            '\x72\x6f\x6f\x74\x49\x6d\x61\x67\x65\x46\x6f\x6c\x64\x65\x72': _0xc04d6d(0x1a6)
        }, this[_0xc04d6d(0x12e)] = new KDCore['\x55\x49'][(_0xc04d6d(0x181))](_0xd39401), this[_0xc04d6d(0x12e)][_0xc04d6d(0x19b)](this[_0xc04d6d(0x169)]()['\x73\x65\x6c\x6c'][_0xc04d6d(0x14f)]), this['\x61\x64\x64\x43\x6f\x6e\x74\x65\x6e\x74'](this[_0xc04d6d(0x12e)]);
    }
    [_0x514996(0x126)]() {
        var _0x4b4143 = _0x514996;
        this[_0x4b4143(0x132)] = new Component_PShopCounter(this[_0x4b4143(0x153)][_0x4b4143(0x178)](this)), this[_0x4b4143(0x159)](this[_0x4b4143(0x132)]), this[_0x4b4143(0x132)]['\x76\x69\x73\x69\x62\x6c\x65'] = ![];
    }
    [_0x514996(0x15f)](_0x347a60) {
        var _0x5d3720 = _0x514996, _0x567355, _0x54c3f5, _0x426861, _0x43d963, _0x5cdd2f, _0x4c5390, _0x55750a, _0xb2b5bc, _0x4ad9cd, _0x3574d6;
        if (this[_0x5d3720(0x144)]['\x6c\x65\x6e\x67\x74\x68'] >= this['\x73\x68\x6f\x70\x47\x6f\x6f\x64\x73\x54\x6f\x53\x65\x6c\x6c']['\x6c\x65\x6e\x67\x74\x68']) {
            if (_0x5d3720(0x18d) === '\x4f\x55\x75\x78\x4f')
                return this['\x73\x65\x6c\x65\x63\x74\x65\x64\x49\x74\x65\x6d'] != null && this[_0x5d3720(0x132)][_0x5d3720(0x19e)] === !![];
            else
                return;
        }
        ({
            x: _0x4ad9cd,
            y: _0x3574d6
        } = _0x347a60[_0x5d3720(0x1a7)], _0x54c3f5 = this[_0x5d3720(0x169)]()[_0x5d3720(0x166)]);
        for (_0x426861 = _0x5cdd2f = 0x0, _0xb2b5bc = _0x347a60[_0x5d3720(0x167)]; 0x0 <= _0xb2b5bc ? _0x5cdd2f < _0xb2b5bc : _0x5cdd2f > _0xb2b5bc; _0x426861 = 0x0 <= _0xb2b5bc ? ++_0x5cdd2f : --_0x5cdd2f) {
            if ('\x6b\x6f\x6a\x69\x58' === '\x6b\x6f\x6a\x69\x58') {
                _0x43d963 = this[_0x5d3720(0x144)][_0x5d3720(0x131)], _0x4c5390 = this[_0x5d3720(0x16f)][_0x43d963], _0x567355 = new Component_PShopItemCell(_0x43d963, _0x4c5390), _0x55750a = (_0x347a60['\x73\x70\x61\x63\x65\x42\x65\x74\x77\x65\x65\x6e'] + _0x54c3f5) * _0x426861;
                if (_0x347a60[_0x5d3720(0x189)] === _0x5d3720(0x151)) {
                    if ('\x54\x45\x66\x6c\x4e' === _0x5d3720(0x13f))
                        _0x567355['\x79'] = _0x3574d6, _0x567355['\x78'] = _0x4ad9cd + _0x55750a;
                    else {
                        if (this[_0x5d3720(0x168)] == null)
                            return;
                        this[_0x5d3720(0x168)] = null, _0x302a84[_0x5d3720(0x12a)] >= 0xe6 && _0x271ef1[_0x5d3720(0x128)]();
                    }
                } else
                    _0x567355['\x78'] = _0x4ad9cd, _0x567355['\x79'] = _0x3574d6 + _0x55750a;
                this[_0x5d3720(0x198)]['\x61\x64\x64\x43\x68\x69\x6c\x64'](_0x567355), this[_0x5d3720(0x144)][_0x5d3720(0x1a2)](_0x567355);
            } else
                return;
        }
    }
};

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__canMove, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__canMove = _.canMove;
  _.canMove = function() {
    if (PSHOP_IsOpen() && !PKD_Shop.PP.isPlayerCanMoveWhenShopIsOpen()) {
      return false;
    }
    return ALIAS__canMove.call(this, ...arguments);
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
  var SB_ID, _;
  SB_ID = "___buySellCount";
  //@[DEFINES]
  _ = Game_System.prototype;
  _.pShopDataStorage = function() {
    this._pInitShopDataStorage();
    return this._pShopDataStorage;
  };
  _._pInitShopDataStorage = function() {
    if (this._pShopDataStorage == null) {
      return this._pShopDataStorage = {};
    }
  };
  // * key =  [itemId, type]
  // * Тут инверсия, так как по умолчанию, если у предмета есть hidden, то он скрыт
  // * Проверяются только с hidden параметров, все остальные как-бы не участвуют
  _.pIsItemIsHidden = function(key, shopId) {
    this._pInitShopDataForId(shopId, 'noHiddenItems', []);
    return !this._pShopDataStorage[shopId].noHiddenItems.contains(key.toString());
  };
  _.pIsItemIsRemoved = function(key, shopId) {
    this._pInitShopDataForId(shopId, 'removedItems', []);
    return this._pShopDataStorage[shopId].removedItems.contains(key.toString());
  };
  _.pSetItemNoHidden = function(key, shopId) {
    this._pInitShopDataForId(shopId, 'noHiddenItems', []);
    this._pShopDataStorage[shopId].noHiddenItems.push(key.toString());
  };
  _._pInitShopWithId = function(shopId) {
    this._pInitShopDataStorage();
    if (this._pShopDataStorage[shopId] == null) {
      this._pShopDataStorage[shopId] = {};
    }
  };
  _._pInitShopDataForId = function(shopId, dataField, initialValue) {
    this._pInitShopWithId(shopId);
    if (this._pShopDataStorage[shopId][dataField] == null) {
      this._pShopDataStorage[shopId][dataField] = initialValue;
    }
  };
  _.pSetItemRemovedFrom = function(key, shopId) {
    this._pInitShopDataForId(shopId, 'removedItems', []);
    this._pShopDataStorage[shopId].removedItems.push(key.toString());
  };
  // return {sellPrice, buyPrice}
  _.pGetItemSpecialPrices = function(key, shopId) {
    this._pInitShopDataForId(shopId, 'prices', {});
    if (this._pShopDataStorage[shopId].prices[key]) {
      return this._pShopDataStorage[shopId].prices[key];
    } else {
      return null;
    }
  };
  // sellPrice or buyPrice can be null (no change)
  _.pSetItemSpecialPrice = function(key, sellPrice, buyPrice, shopId) {
    this._pInitShopDataForId(shopId, 'prices', {});
    if (!this._pShopDataStorage[shopId].prices[key]) {
      this._pShopDataStorage[shopId].prices[key] = {
        sellPrice: null, // * null - not changes
        buyPrice: null
      };
    }
    if (sellPrice != null) {
      this._pShopDataStorage[shopId].prices[key].sellPrice = sellPrice;
    }
    if (buyPrice != null) {
      this._pShopDataStorage[shopId].prices[key].buyPrice = buyPrice;
    }
  };
  _.pAddItemSells = function(key, count) {
    this._pInitShopDataForId(SB_ID, 'sells', {});
    if (this._pShopDataStorage[SB_ID].sells[key] == null) {
      this._pShopDataStorage[SB_ID].sells[key] = count;
    } else {
      this._pShopDataStorage[SB_ID].sells[key] += count;
    }
  };
  _.pAddItemBuys = function(key, count) {
    this._pInitShopDataForId(SB_ID, 'buys', {});
    if (this._pShopDataStorage[SB_ID].buys[key] == null) {
      this._pShopDataStorage[SB_ID].buys[key] = count;
    } else {
      this._pShopDataStorage[SB_ID].buys[key] += count;
    }
  };
  _.pGetItemSells = function(key) {
    this.pAddItemSells(key, 0); // * для инициализации
    return this._pShopDataStorage[SB_ID].sells[key];
  };
  _.pGetItemBuys = function(key) {
    this.pAddItemBuys(key, 0); // * для инициализации
    return this._pShopDataStorage[SB_ID].buys[key];
  };
})();

// ■ END Game_System.coffee
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
  _.loadPictureForSHPplugin = function(filename) {
    return this.loadBitmap('img/pShop/', filename);
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
    PKD_Shop.LoadPluginSettings();
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
  var ALIAS___createInvUILayer, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //?PKD_MI
  //@[ALIAS]
  ALIAS___createInvUILayer = _._createInvUILayer;
  _._createInvUILayer = function() {
    this._pkdShopBaseSprite = new Sprite();
    this.addChild(this._pkdShopBaseSprite);
    ALIAS___createInvUILayer.call(this, ...arguments);
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
  _.pShopParent = function() {
    return this._pkdShopBaseSprite; //@_spritesetIUI
  };
  _.pOpenShopWindow = function() {
    var settings;
    if (this.pIsShowIsOpened() || (this.pShopWindow != null)) {
      this.pCloseShopWindow();
    }
    settings = PShopManager._currentShop.data;
    this.pShopWindow = new FWindow_Shop(this.pShopParent(), settings.size.w, settings.size.h);
    this.pShopWindow.setOnReadyHandler(() => {
      return this.pShopWindow.loadShop();
    });
  };
  _.pCloseShopWindow = function() {
    if (!this.pIsShowIsOpened()) {
      return;
    }
    $gameTemp.miSellMode = false;
    this.pShopWindow.close();
    this.pShopParent().removeChild(this.pShopWindow);
    this.pShopWindow = null;
  };
  _.pIsShowIsOpened = function() {
    return (this.pShopWindow != null) && this.pShopWindow.isOpen();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * NOT USED, DEPRECATED
var Sprite_PShopCategoryItem;

Sprite_PShopCategoryItem = class Sprite_PShopCategoryItem extends Sprite {
  constructor() {
    super();
    this._create();
  }

  _create() {
    return this.content = new KDCore.Sprite();
  }

  onHover() {
    if (this._isHovered === true) {
      return;
    }
    this._isHovered = true;
    this._currentScale = 1;
    this._scaleChanger = new KDCore.Changer(this);
    this._scaleChanger.change('_currentScale').from(1).to(1.4).step(0.1).start();
  }

  revertToNormal() {
    this._isHovered = false;
    this._scaleChanger = null;
    this._currentScale = null;
    this.content.scale.set(1, 1);
  }

  update() {
    super.update();
    if (this._isHovered === true) {
      this.content.scale.set(this._currentScale);
      this._scaleChanger.update();
    } else {
      if (this._currentScale != null) {
        this.revertToNormal();
      }
    }
  }

};

//Plugin PKD_Shop builded by PKD PluginBuilder 2.1 - 10.08.2022