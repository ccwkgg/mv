//=============================================================================
// Yanfly Engine Plugins - Screen Resolution
// ScreenResolution.js
// Version: 1.00
//=============================================================================
var Imported = Imported || {};
Imported.ScreenResolution = true;
var Yanfly = Yanfly || {};
Yanfly.ScrRes = Yanfly.ScrRes || {};
//=============================================================================
 /*:
 * @plugindesc v1.00 屏幕分辨率
 * @author Yanfly Engine Plugins
 *
 * @param Screen Width
 * @desc 调整屏幕的宽度 Default: 640 816 1104                             .
 * @default 640
 *
 * @param Screen Height
 * @desc 调整屏幕的高度 Default: 400 624                        .
 * @default 400
 *
 * @help
 * 改变你的游戏的屏幕分辨率
 */
//=============================================================================
Yanfly.Parameters = PluginManager.parameters('004-ScreenResolution');
//=============================================================================
// Scene_Manager
//=============================================================================
SceneManager._screenWidth  = Number(Yanfly.Parameters['Screen Width'] || 816);
SceneManager._screenHeight = Number(Yanfly.Parameters['Screen Height'] || 624);
SceneManager._boxWidth     = Number(Yanfly.Parameters['Screen Width'] || 816);
SceneManager._boxHeight    = Number(Yanfly.Parameters['Screen Height'] || 624);
Yanfly.ScrRes.SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass) {
    Yanfly.ScrRes.SceneManager_run.call(this, sceneClass);
    if (Utils.isMobileDevice()) return;
    if (Utils.isMobileSafari()) return;
    if (Utils.isAndroidChrome()) return;
		var resizeWidth = Graphics.boxWidth - window.innerWidth;
		var resizeHeight = Graphics.boxHeight - window.innerHeight;
		window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
		window.resizeBy(resizeWidth, resizeHeight);
};