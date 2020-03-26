//=============================================================================
// AA Plugins - 安卓适配       Android Adaptation
// AA_Plugins.js
// Version: 1.01
// License: Made by oneself 取消键 支持  Cancel Button Plugins
//=============================================================================
 /*:
 * @plugindesc v1.00 安卓适配 插件
 * @author 当初的少年
 *
 * @help　　
 * 介绍
   开关：true/ false
 
1: 手机 只按一次
2: 目的地光标   脚印
3: 矩形画布
4: 退出程序 兼容3类平台
 */

// ██  触摸修正
SceneManager._screenWidth       = 640;
SceneManager._screenHeight      = 400;
SceneManager._boxWidth          =  640;
SceneManager._boxHeight         = 400;
TouchInput.isCancelled = function() {return}//屏蔽 鼠标右键 双触
Game_Character.prototype.searchLimit = function() {              // 搜索范围
    return 36;//寻路
};
Sprite_Destination.prototype.createBitmap = function() {   //自定义 目的地光标
    this.bitmap = ImageManager.loadSystem('Destination')//脚印
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
};
Sprite_Destination.prototype.updateAnimation = function() {      // 目的地光标
    this._frameCount++;
    this._frameCount %= 40;
    this.opacity = (40 - this._frameCount) * 6;
    this.scale.x = 1 - this._frameCount / 40;
    this.scale.y = this.scale.x;
};
Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    this._commandWindow.setHandler('options',  this.commandOptions.bind(this));
    this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
    this._commandWindow.y = 140;
    this.addWindow(this._commandWindow);
	
	console.timeEnd("开启测速"); 
};
SceneManager.onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
        case 116:   // F5
            if (Utils.isNwjs()) {
                location.reload();
            }
            break;
        case 121:   // F8
            if (Utils.isNwjs() && Utils.isOptionValid('test')) {
                require('nw.gui').Window.get().showDevTools();
            }
            break;
        }
    }
};
SceneManager.exit = function() {// 退出程序 兼容3类平台
	if (Utils.isNwjs()){//本地模拟器
    	this.goto(null);
    	this._exiting = true;
	}else if (Utils.isMobileDevice()){//是手机平台
		// Utils.isAndroidChrome();//是安卓平台
		navigator.app.exitApp();
	}else{
		var is_fireFox = navigator.userAgent.indexOf("Firefox")>-1;
    	if (is_fireFox){//是否是火狐浏览器
			window.location.href="about:blank";
		}
	}
};
Window_Base.prototype.processNormalCharacter_TK2_Alias = Window_Base.prototype.processNormalCharacter;
Window_Base.prototype.processNormalCharacter = function(textState) {    //自动换行
	var c = textState.text[textState.index];
	var w = this.textWidth(c);
	if (this.width - 2 * this.standardPadding() - textState.x >= w){
		this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
		textState.index++;
		textState.x += w;
	}else{
		this.processNewLine(textState);
		textState.index--;
		this.processNormalCharacter_TK2_Alias(textState);
	}
};
Window_Base.prototype.lineHeight = function() {                  // 窗口默认 行高
    return 28;
};
Window_Base.prototype.standardFontSize = function() {            // 窗口默认 字体大小
    return 20;
};
Window_Base.prototype.drawRectIcon = function(rect) {            // 矩形画布 尺寸修正
    var bitmap = ImageManager.loadSystem('Rect');
    var pw = bitmap.width;
    var ph = 24//bitmap.height;
	var pv = 14
	//	this.contents.clear();
    this.contents.blt(bitmap, pw-pv, 0, pv,  ph, rect.x+rect.width-10, rect.y+2);
	if (rect.width<=160){
    this.contents.blt(bitmap, 0, 0, rect.width-6, ph, rect.x-4, rect.y+2);
	}
	if (rect.width>160  && rect.width<=320){
    this.contents.blt(bitmap, 0, 0, 146, ph, rect.x-4, rect.y+2);
    this.contents.blt(bitmap, 14, 0, rect.width-132-28+8, ph, 146+rect.x-4, rect.y+2);
    }
	if (rect.width>320  && rect.width<=320+160){
    this.contents.blt(bitmap, 0, 0, 146, ph, rect.x-4, rect.y+2);
    this.contents.blt(bitmap, 14, 0, 132, ph, 146+rect.x-4, rect.y+2);
    this.contents.blt(bitmap, 14, 0, rect.width-278-6, ph, 278+rect.x-4, rect.y+2);
    }
	if (rect.width>480  && rect.width<=480+160){
    this.contents.blt(bitmap, 0, 0, 146, ph, rect.x-4, rect.y+2);
    this.contents.blt(bitmap, 14, 0, 132, ph, 146+rect.x-4, rect.y+2);
    this.contents.blt(bitmap, 14, 0, 132, ph, 160+146+rect.x-4-28, rect.y+2);
   this.contents.blt(bitmap, 14, 0, 132, ph, 160+132*2+rect.x-4-14, rect.y+2);
    this.contents.blt(bitmap, 14, 0, rect.width-540-8, ph, 160+132*3+rect.x-4-14, rect.y+2);
    }
};
Window_Selectable.prototype.customRect = function(index,rect) { // 修正 置空
	return;
}
Window_Selectable.prototype.itemRect = function(index) {        // 修正 矩形
	var rect = new Rectangle();
	var maxCols = this.maxCols();
	rect.width = this.itemWidth();
	rect.height = this.itemHeight();
	rect.x = index % maxCols * (rect.width + this.spacing()) - this._scrollX;
	rect.y = Math.floor(index / maxCols) * rect.height - this._scrollY;
	this.customRect(index, rect);// 自定义位置
	return rect;
};
Window_Selectable.prototype.itemRectForText = function(index) { // 显示矩形画布  停用 
	var rect = this.itemRect(index);
	rect.x += this.textPadding();
	rect.width -= this.textPadding() * 2;
	this.drawRectIcon(rect); //自制矩形图片
	return rect;
};
Window_Selectable.prototype.drawFunctionTouch = function(x,y) {
	return
}
Window_Selectable.prototype.newOnTouch = function() {            // 移动功能键
	var x = this.canvasToLocalX(TouchInput.x);
	var y = this.canvasToLocalY(TouchInput.y);
	var hitIndex = this.hitTest(x, y);
	this.drawFunctionTouch(x,y)
}
Window_Selectable.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
		if (TouchInput.isTriggered() && TouchInput.isPressed()) {this.newOnTouch()}//移动功能键 只点击 一次
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
           this._touching = true;
            this.onTouch(true);
        } else if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) {
                this.processCancel();
            }
        }
        if (this._touching) {
            //if (TouchInput.isTriggered()) {//快速反应
            if (TouchInput.isPressed()) {
                this.onTouch(false);
            } else {
                this._touching = false;
            }
        }
    } else {
        this._touching = false;
    }
};
Window_Selectable.prototype.onTouch = function(triggered) {      // 选项键 只点击 一次 延时  覆盖
	var lastIndex = this.index();
	var x = this.canvasToLocalX(TouchInput.x);
	var y = this.canvasToLocalY(TouchInput.y);
	var hitIndex = this.hitTest(x, y);
	if (hitIndex >= 0) {
		if (hitIndex === this.index()) {
			// 选项键 只点击 一次 修正 延时返回
				if (this._stayCount <= 0 ) {
					this.processOk();
					this._stayCount ++;
				}
				if (this._stayCount >= 8) {
					this._stayCount = 0
					}
		} else if (this.isCursorMovable()) {
			this.select(hitIndex);
		} // 屏蔽边框翻页
	};
	if (this.index() !== lastIndex) {SoundManager.playCursor()}
};
