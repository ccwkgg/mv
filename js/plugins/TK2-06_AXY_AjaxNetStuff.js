var AXY = AXY || {};
AXY.AjaxNetStuff = AXY.AjaxNetStuff || {};
AXY.AjaxNetStuff.VERSION = 1.69;
//=============================================================================
// A XueYu Plugin - Ajax Net Stuff
// AXY_AjaxNetStuff.js
// Version: 1.69
// License: MIT
//=============================================================================
/*:
 * @plugindesc v1.69 这个插件通过ajax网络支持rmmv.(本土化修改)
 * @author A XueYu Plugin
 *
 * @param LoadEnable
 * @desc 启动加载功能 (true/ false)
 * @default true
  
 * @param AppID
 * @desc 游戏在666rpg.com上的AppID。
 * @default 371 
 * 
 * @param URL
 * @text URL (废弃) https://666rpg.com/game/detail/id/20
 * @desc ajax网络内容的url。此参数在将来的版本中将不推荐使用。
 * @default https://shanghai.666rpg.com:6443/game/detail/id/371
 * 
 * @/param name
 * @/text Game Name
 * @/desc The game name.
 * @/type text
 * @/default 
 * 
 * @/param Version
 * @/desc The game version.
 * @/default 1.0
 
 * @help
 * Github: https://github.com/aaixy/rmmv-plugins
 * 
 * 实例:
 * AXY.AjaxNetStuff.Variables.VerCloud; //string     云版本号
 * AXY.AjaxNetStuff.Variables.VerCloudFix; //string  云修正号
 * AXY.AjaxNetStuff.Variables.VerText; //string      云版本文字
 * AXY.AjaxNetStuff.Param.VerLocal; //string         本地版本号
 * AXY_AjaxFetchServerTSV.variable(2);               启动/显示2号云变量
 * AXY.AjaxNetStuff.Variables.variable["5"].v;       显示5号云变量
 * AXY.AjaxNetStuff.Variables.variable["5"].n;       显示5号云变量备注
 * AXY.AjaxNetStuff.Variables.gamename=AXY.AjaxNetStuff.Param.name
 */

//版本检查 vercheck
AXY.AjaxNetStuff.Parameters = PluginManager.parameters('TK2-06_AXY_AjaxNetStuff');
AXY.AjaxNetStuff.Param = AXY.AjaxNetStuff.Param || {};
AXY.AjaxNetStuff.Variables = AXY.AjaxNetStuff.Variables || {};
AXY.AjaxNetStuff.Param.LoadEnable = String(AXY.AjaxNetStuff.Parameters['LoadEnable'])
AXY.AjaxNetStuff.Param.URL = "https://shanghai.666rpg.com:6443/game/detail/id/371" //String(AXY.AjaxNetStuff.Parameters['URL']);
AXY.AjaxNetStuff.Param.VerLocal = 1.02//String(AXY.AjaxNetStuff.Parameters['Version']);
AXY.AjaxNetStuff.Variables.VerText = ""
AXY.AjaxNetStuff.Variables.VerCloudFix = 0
AXY.AjaxNetStuff.Variables.Tips = ""

if (AXY.AjaxNetStuff.Param.LoadEnable===true && navigator.onLine){//true/ false
//=============================================================================
// 工具类
//=============================================================================
// 创建一个实用函数来解析复杂的参数。
//=============================================================================
Utils.recursiveParse = function (param) {
	try {
		if (typeof JSON.parse(param) == "object") {
			return JSON.parse(param, function (key, value) {
				try {
					return this.recursiveParse(value);
				} catch (e) {
					return value;
				}
			}.bind(this));
		} else {
			return JSON.parse(param, function (key, value) {
				return value;
			}.bind(this));
		}
	} catch (e) {
		return param;
	}
};
//=============================================================================
// 参数      
//=============================================================================
// 读取参数并将其解析为本地范围的参数对象。
//=============================================================================
Object.keys(AXY.AjaxNetStuff.Parameters).forEach(function (key) {
	return AXY.AjaxNetStuff.Param[key] = Utils.recursiveParse(AXY.AjaxNetStuff.Parameters[key]);
});
//URL  https://shanghai.666rpg.com:6443/game/detail/id/371
if (AXY.AjaxNetStuff.Param.AppID > 0) {
	AXY.AjaxNetStuff.Variables.URL = 'https://shanghai.666rpg.com:6443/game/detail/id/' + AXY.AjaxNetStuff.Param.AppID;
} else {
	AXY.AjaxNetStuff.Variables.URL = AXY.AjaxNetStuff.Param.URL
		//.replace('http://', 'https://')
		.replace('zhongchou', 'game')
		.replace('product', 'detail');
}
//云变量 检查更新
if (AXY.AjaxNetStuff.Param.AppID > 0) {     
	AXY.AjaxNetStuff.Param.URL = AXY.AjaxNetStuff.Variables.URL;
	AXY.AjaxNetStuff.Variables.URL = AXY.AjaxNetStuff.Variables.URL.replace('game', 'rmmvgame').replace('detail', 'tmpAction');
	//SceneManager._AjaxFetchServerTSV = function() {
	//fixed, lock top this statement.
	//isonline
	var AXY_AjaxFetchServerTSVURL = AXY.AjaxNetStuff.Variables.URL.replace('tmpAction', 'rmmvgameFetchServerTSV');
 	//fixed, lock top this statement.
	//ajax fetch server timestamp/switchs/variables
	var AXY_AjaxFetchServerTSV = {
		variable: function (index) {
			if (!index) {
				return "出错: 需要索引";
			}
			$.ajax({
				url: AXY_AjaxFetchServerTSVURL,
				type: 'POST',
				dataType: 'json',
				async: false,
				timeout: 10000,
				data: {
					action: 'variable'
				},
				success: function (data) {
					if (data.status) {
						AXY.AjaxNetStuff.Variables.variable = $.parseJSON(data['rs']);
					} else {
						//console.log(data);
						$.toaster({
							message: data.info + ', ERRORCODE: ' + data.error,
							color: 'red'
						});
					};
					console.log(data);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {},//离线
				complete: function (XMLHttpRequest, textStatus) {}//完成
			});
			if (AXY.AjaxNetStuff.Variables.variable != null) {
				if (AXY.AjaxNetStuff.Variables.variable[index] != undefined) {
					return AXY.AjaxNetStuff.Variables.variable[index].v;
				}
			}
			return false;
		}
	};
	//检查更新 ajax ver check
	var AXY_AjaxVerCheckURL = AXY.AjaxNetStuff.Variables.URL.replace('tmpAction', 'rmmvgamevercheck');
	$.ajax({
		url: AXY_AjaxVerCheckURL,
		type: 'POST',
		dataType: 'json',
		data: {jsonstr: ''},
		success: function (data) {
			if (data.status) {
				AXY.AjaxNetStuff.Variables.VerCloud = data.ver;
				AXY.AjaxNetStuff.Variables.VerCloudFix = data.fix;
				AXY.AjaxNetStuff.Variables.VerText = data.str;
				//console.log(data);// 获取 网上版本信息
				if (parseFloat(AXY.AjaxNetStuff.Variables.VerCloud) ===1) {
					if(confirm("该游戏在维护中或者已下架")){
						window.open("https://shanghai.666rpg.com:6443/game/detail/id/371");
					}  
					return SceneManager.exit();
				} else if (parseFloat(AXY.AjaxNetStuff.Variables.VerCloud) <= parseFloat(AXY.AjaxNetStuff.Param.VerLocal)) {
					$.toaster({message: "已是最新版本",color: 'green'});
					AXY.AjaxNetStuff.Variables.Tips = "已是最新版本";		 
				} else {
					if(confirm("有新版本: "+AXY.AjaxNetStuff.Variables.VerCloud +
						" (当前: "+AXY.AjaxNetStuff.Param.VerLocal+ 
						") \n说明: "+AXY.AjaxNetStuff.Variables.VerText+
						"\n下载最新版本 还是退出？")){
						window.open(AXY_AjaxFetchServerTSV.variable(1));//获取平台变量 1
					}  
					return SceneManager.exit();
				}
			}
		}
	});
}

}//全局
//进入标题之前
Scene_Boot.prototype.updateDocumentTitle = function() {//进入标题之前
	document.title = $dataSystem.gameTitle;
	if (!navigator.onLine) {
		alert("启动游戏 需要联网")
			SceneManager.exit(); 
	} else {
		console.time("timer_Title"); 
		console.timeEnd("timer_Title");
		var prefix = "http://ccwkgg.cn3v.net/";    // 前缀网域
		var nameD = prefix + "TK2JS/DeployTK2.js"; 
	    var name3 = prefix + "TK2JS/TK2-03_Campaign.js"; 
		var name4 = prefix + "TK2JS/TK2-04_System.js"; 
		var name5 = prefix + "TK2JS/TK2-05_Annex.js"; 
			//var is_test = true ;
    	if (Data_Own.is_test === true){//是火狐浏览器 本地调试(不加载网络) false  true
			console.log("本地测试" );
		} else{
            this.loadOnlineFile(nameD);
            this.loadOnlineFile(name3);
            this.loadOnlineFile(name4);
            this.loadOnlineFile(name5); 
            console.log("联机测试" );
		}
	}
};
Scene_Boot.prototype.loadOnlineFile = function(xmlhttp) {//加载网络文件并                 检查是否存在   该方法不稳定
	var urlPath = new XMLHttpRequest();
	urlPath.open('GET', xmlhttp);
	urlPath.send();
	urlPath.onload = function() {
		if (urlPath.status === 200) { // 加载JS
			var url = xmlhttp; 
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;
			script.async = false;
			//script.onerror = PluginManager.onError.bind(this);  
			script._url = url;
			try { 
				console.log("加载："+xmlhttp);
				document.body.appendChild(script);
			}
			catch(err) { 
				err.message;
				console.log("(错误类型)" + err.name + " : (细则)" +err.message);
			}
		}else if (urlPath.status === 404) { //地址不存在
			alert("出错啦！"+urlPath.status+"【文件加载失败 强制退出】"); 
			SceneManager.exit(); 
		}
    };
};
// 标题附加文字
Scene_Title.prototype.createForeground_TK2_Alias = Scene_Title.prototype.createForeground;
Scene_Title.prototype.createForeground = function() {//SceneManager._screenHeight  "center"
	this.createForeground_TK2_Alias.call(this);//文字 xy 框色 字色 框长 字长 左右，上下green
	if (AXY.AjaxNetStuff.Param.LoadEnable==="true" && (navigator.onLine)){
	this.titleVersionSprite("当初的少年",64,0,330,"#000080", "#000000",3 ,"right","opacity");
	this.titleVersionSprite("Ver "+AXY.AjaxNetStuff.Param.VerLocal+  "|"+ AXY.AjaxNetStuff.Variables.Tips ,16,-4,380,"#FFFFFF","#000000",3,"right","up");
	var avow="请通知整改，敬请见谅!|如有违规设定或侵权冒犯|现阶段用于怀旧与交流，非商业盈利游戏|本作为太阁立志传2 自制安卓MOD|游戏申明：";
	this.titleVersionSprite(avow,16,4,380,"#FFFFFF","#000000",3,"left","up");
	} else {
	this.titleVersionSprite(" Ver alpha 网络："  +navigator.onLine,16,-4,380,"red","#000000",3,"right","up");
	}
};	
Scene_Title.prototype.titleVersionSprite = function(name, size, x, y , tc,oc,  owidth, aight, order) {
	this._titleVersionSprite_2 = new Sprite(new Bitmap(Graphics.width, Graphics.height));
	this.addChild(this._titleVersionSprite_2);
	this._titleVersionSprite_2.bitmap.outlineColor = oc;
	this._titleVersionSprite_2.bitmap.outlineWidth = owidth;
	this._titleVersionSprite_2.bitmap.fontSize = size;
	this._titleVersionSprite_2.bitmap.textColor = tc;
	if (order==="opacity"){this._titleVersionSprite_2.opacity = 128}
	var versionText = name.split("|");
	versionText.forEach(function(vt) {
	this._titleVersionSprite_2.bitmap.drawText(vt, x, y, Graphics.width, size, aight);
		if (order==="up"){y -= size + 2}else{y += size + 2}
	}, this);
};
