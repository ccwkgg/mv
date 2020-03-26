//游戏配置
var Scene_Map_updateOnLine = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
	Scene_Map_updateOnLine.call(this);
	switch(navigator.onLine) {// 检查网络
	case true:
		if (Data_Own.onLine === true) return;
		$.toaster({color:'green', message : ("网络 : 在线")});
		Data_Own.onLine = true;
	break;
	default:
	if (Data_Own.onLine === false) return;
		$.toaster({color:'red', message : ("网络 : 离线")});
		Data_Own.onLine = false;
	}
		if (Data_Own.onTest === true) return;
		$.toaster({ message : ("网络 :        测试成功")});
		Data_Own.onTest = true;
}

