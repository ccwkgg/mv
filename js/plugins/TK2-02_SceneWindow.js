 /*:
 * @plugindesc |          | v1.02 自制窗口
 * @author TK2 太阁2风格 窗口类
 *
 * @help　　
██ 场景父类
██ Scene_NowCity 当前城池

 */
 $OnTouch_One=true
if ($OnTouch_One) {// ★ 场景父类 
//==================================================================================
// ██ TK2_Scene_Base
//----------------------------------------------------------------------------------
//   ★ 场景父类
//==================================================================================
//==================================================================================
// ██ 处理窗口父类 [太阁2风格]
//==================================================================================
function TK2_Scene_Base() { //   ★ 场景父类 
    this.initialize.apply(this, arguments);
}
TK2_Scene_Base.prototype = Object.create(Scene_MenuBase.prototype);
TK2_Scene_Base.prototype.constructor = TK2_Scene_Base;
TK2_Scene_Base.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
TK2_Scene_Base.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createCommandWindow();
};
TK2_Scene_Base.prototype.createCommandWindow = function() {
	return 
};
TK2_Scene_Base.prototype.update = function() {
    if (!this.isBusy()) {
        this._commandWindow.open();
    }
	this._commandWindow.refresh();
	Scene_Base.prototype.update.call(this);
};
TK2_Scene_Base.prototype.isBusy = function() {
    return this._commandWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
};
TK2_Scene_Base.prototype.commandOk = function() {
	return
};
TK2_Scene_Base.prototype.popScene = function() {
    this._commandWindow.close();
    SceneManager.goto(Scene_Map);
};

};  //   ★ 场景父类 
if ($OnTouch_One) {// ★ 场景桌面常规集

function Scene_NowCity() { //★ 场景：当前城池 0 
	this.initialize.apply(this, arguments);
};
Scene_NowCity.prototype = Object.create(Scene_MenuBase.prototype);
Scene_NowCity.prototype.constructor = Scene_NowCity;    
Scene_NowCity.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
};
Scene_NowCity.prototype.popScene = function() {
	this._commandWindow.activate();
    SceneManager.goto(Scene_Map);
};
Scene_NowCity.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	var commandWindow = $gameParty._windowType
	this._commandWindow = new TK2_Window_Normal(0, 0, "城门",commandWindow,360,180);
	this._commandWindow.x =  (Graphics.boxWidth-this._commandWindow.width)/2,
	this._commandWindow.y =  (Graphics.boxHeight-this._commandWindow.height)/2;
	this._commandWindow.setHandler("cancel", this.popScene.bind(this));
	this.addWindow(this._commandWindow);
};

function Scene_Route() {  //★ 场景：路径栏 1
	this.initialize.apply(this, arguments);
};
Scene_Route.prototype = Object.create(TK2_Scene_Base.prototype);
Scene_Route.prototype.constructor = Scene_Route;    
Scene_Route.prototype.createCommandWindow = function() {
	if ($gameMap.mapId()!==8){var commandWindow=['离开小镇']}
	if ($gameMap.mapId()===8){var commandWindow=['指定大名','指定镇','地图指定']}
	this._commandWindow = new TK2_Window_Command(0, 0,commandWindow);
	this._commandWindow.setHandler('ok', this.commandOk.bind(this));
	this._commandWindow.setHandler("cancel", this.popScene.bind(this));
	this._commandWindow.x =(Graphics.boxWidth-this._commandWindow.width)/2
	this._commandWindow.y =(Graphics.boxHeight-this._commandWindow.height)/2
	this.addWindow(this._commandWindow);
};
Scene_Route.prototype.commandOk = function() {     // 全响应
	this._commandWindow.deactivate();
	index = this._commandWindow._commands[this._commandWindow.index()]
	if(index==="指定镇"){this.commandTown()}
	if(index==="指定大名"){this.commandCity()}
	if(index==="地图指定"){$.toaster({ message : ("提示：【地图指定】有待开发...")} );this._commandWindow.activate()}
	if(index==="离开小镇"){this.commandOutTown()}
};
Scene_Route.prototype.commandOutTown = function() {// 主命令 离开小镇
	//$.toaster({ message : ("场景移动")} );
    $gamePlayer.reserveTransfer(
	$gameVariables.value(22), //id
	$gameVariables.value(23), 
	$gameVariables.value(24), 2, 0);//下左右上//淡出、黑白无
	this.popScene()
};
Scene_Route.prototype.commandTown = function() {   // 主命令 指定镇
	this._commandWindow.opacity = 180;
	this._commandWindow.contentsOpacity = 180;
	var townWindow =$gameParty._dataTown;
	var actor=[]
    for (var i = 0; i < townWindow.length; i++) {
      actor[i]=townWindow[i][0]+"国  "+townWindow[i][1]+["镇"];
    }
	this._townWindow = new TK2_Window_Command(0, 0,actor,0,260);
	this._townWindow.setHandler('ok', this.onTownOk.bind(this));
	this._townWindow.setHandler('cancel', this.onTownCancel.bind(this));
	this._townWindow.x=this._commandWindow.x + 64;
	if(this._townWindow.height > Graphics.boxHeight){this._townWindow.height = Graphics.boxHeight};
	this._townWindow.y=(Graphics.boxHeight-this._townWindow.height)/2;
	this.addWindow(this._townWindow);
};
Scene_Route.prototype.onTownCancel = function() {  // 指定镇命令 取消
	this._commandWindow.activate();
	this._commandWindow.opacity = 255;
	this._commandWindow.contentsOpacity = 255;
	this._townWindow.close();
};
Scene_Route.prototype.onTownOk = function() {      // 指定镇命令 按键集
	index=this._townWindow.index();
	//--------------------------------
	dataId=index+1;//小镇 硬性事件 1-7
	//--------------------------------
	var x = $dataMap.events[dataId].x;
	var y =$dataMap.events[dataId].y;
	$gameTemp.setDestination(x,y);
    this._commandWindow.close();
	this._townWindow.close();
	SceneManager.goto(Scene_Map);
};
Scene_Route.prototype.commandCity = function() {   // 主命令 指定大名
	this._commandWindow.opacity = 180;
	this._commandWindow.contentsOpacity = 180;
	var cityWindow =$gameParty._dataCity;
	var actor1=[];
    for (var i = 0; i < cityWindow.length; i++) {
      actor1[i]=cityWindow[i][1]+["城"];
    }
	this._cityWindow = new TK2_Window_Command(0, 0,actor1);
	this._cityWindow.setHandler('ok', this.onCityOk.bind(this));
	this._cityWindow.setHandler('cancel', this.onCityCancel.bind(this));
	this._cityWindow.x=this._commandWindow.x +64;
	this._cityWindow.y=(Graphics.boxHeight-this._cityWindow.height)/2;
	this.addWindow(this._cityWindow);
};
Scene_Route.prototype.onCityCancel = function() {  // 指定大名命令 取消
	this._commandWindow.activate();
	this._commandWindow.opacity = 255;
	this._commandWindow.contentsOpacity = 255;
    //this._cityWindow.deselect();
    this._cityWindow.close();
};
Scene_Route.prototype.onCityOk = function() {      // 指定大名命令 按键集
	index=this._cityWindow.index();
	//--------------------------------
	dataId=index+1+7;//城池 硬性事件 1-7
	//--------------------------------
	var x = $dataMap.events[dataId].x;
	var y =$dataMap.events[dataId].y;
	$gameTemp.setDestination(x,y);
	//--------------------------------
    this._commandWindow.close();
    this._cityWindow.close();
	SceneManager.goto(Scene_Map);
};

function Scene_Info() {  //★ 场景：信息栏 2
	this.initialize.apply(this, arguments);
}
Scene_Info.prototype = Object.create(TK2_Scene_Base.prototype);
Scene_Info.prototype.constructor = Scene_Info;
Scene_Info.prototype.createCommandWindow = function() {
	this.createRangeWindow();
};
Scene_Info.prototype.createRangeWindow = function() {
	var CommandWindow = ["大名势力","大名情报","家中排行","武将情报"]//"势力图","分国","市场行情","持有物品","属下武将",
	this._commandWindow = new TK2_Window_Command(0,0, CommandWindow);
	this._commandWindow.width=160
	this._commandWindow.x=(Graphics.boxWidth-this._commandWindow.width)/2;
	this._commandWindow.y=(Graphics.boxHeight-this._commandWindow.height)/2;
	this._commandWindow.setHandler('ok',     this.onCommandOk.bind(this));
	this._commandWindow.setHandler('cancel', this.popScene.bind(this));
	this.addWindow(this._commandWindow);
};
Scene_Info.prototype.onCommandOk = function() {
	this._commandWindow.deactivate();
	index = this._commandWindow._commands[this._commandWindow.index()]
	if(index==="大名势力"){this.createEditWindow(1)}//势力一览
	if(index==="家中排行"){this.createSeatWindow()}
	if(index==="大名情报"){SceneManager.goto(Scene_Citys)}//城池一览
	if(index==="武将情报"){SceneManager.goto(Scene_Heros)}//武将一览
	
	if(index==="势力图"){$.toaster({ message : ("提示：【" + index  + "】有待开发... ...")} );this._commandWindow.activate()}
	if(index==="分国"){$.toaster({ message : ("提示：【" + index  + "】有待开发... ...")} );this._commandWindow.activate();}
	if(index==="市场行情"){$.toaster({ message : ("提示：【" + index  + "】有待开发... ...")});this._commandWindow.activate()}
	if(index==="持有物品"){$.toaster({ message : ("提示：【" + index  + "】有待开发... ...")});this._commandWindow.activate()}
};
Scene_Info.prototype.createSeatWindow = function() {
	this._commandWindow.opacity = 180;
	this._commandWindow.contentsOpacity = 180;
	var CommandWindow = Data_Own.Seat;//家中排名
	this._nameWindow = new TK2_Window_Command(0,0, CommandWindow);
	this._nameWindow.x=this._commandWindow.x+46
	this._nameWindow.y=(Graphics.boxHeight-this._nameWindow.height)/2;
	this._nameWindow.setHandler('ok',     this.onSeatOk.bind(this));
	this._nameWindow.setHandler('cancel', this.onSeatCancel.bind(this));
	this.addWindow(this._nameWindow);
};	
Scene_Info.prototype.onSeatOk = function() {
	this._nameWindow.deactivate();
	this._nameWindow.opacity = 180;
	this._nameWindow.contentsOpacity = 180;
	var indexCommand = this._nameWindow._commands[this._nameWindow.index()]
	var actor="家中排行"
	this._name2Window = new TK2_Window_Command(0,0, actor,indexCommand);
	this._name2Window.x=96
	this._name2Window.setHandler('cancel', this.onName2Cancel.bind(this));
	this.addWindow(this._name2Window);
};
Scene_Info.prototype.onName2Cancel = function() {
	this._nameWindow.activate();
	this._nameWindow.opacity = 255;
	this._nameWindow.contentsOpacity = 255;
	this._name2Window.close();;
};
Scene_Info.prototype.onSeatCancel = function() {
	this._commandWindow.activate();
	this._commandWindow.opacity = 255;
	this._commandWindow.contentsOpacity = 255;
	this._nameWindow.close();;
};
Scene_Info.prototype.itemFilter = function(item, index, data ) {
	//条件中的镇
     var commands=item
	var setName = [],e = 0;
	for (var i = 0; i < commands.length; i++) {
		if (commands[i][index] === data){
			setName[e] = commands[i]; e++;
		}; 
	};return setName
};
Scene_Info.prototype.createEditWindow = function(type) {
	this._commandWindow.deselect()
	this._commandWindow.opacity = 180;
	this._commandWindow.contentsOpacity = 180
	var CommandWindow ="大名排列"
	this._nameWindow = new TK2_Window_Command(0,0, CommandWindow);
	this._nameWindow.x=this._commandWindow.x-160
	this._nameWindow.y=(Graphics.boxHeight-this._nameWindow.height)/2;
	this._nameWindow.setHandler('cancel', this.onEditCancel.bind(this));
	this.addWindow(this._nameWindow);
	actor="大名信息"
	this._editWindow = new TK2_Window_Normal(0, 0, actor);
	this._editWindow.x = this._nameWindow.width+this._nameWindow.x
	this._nameWindow.setEditWindow(this._editWindow);
	this.addWindow(this._editWindow);
};
Scene_Info.prototype.onEditCancel = function() {
	this._commandWindow.activate();
	this._commandWindow.opacity = 255;
	this._commandWindow.contentsOpacity = 255;
	this._editWindow.close();
	this._nameWindow.close();
};

};// ★ 桌面常规场景
if ($OnTouch_One) {// ★ 窗口父类集
//==================================================================================
// ██ 窗口画面的父类 [太阁2风格]
//==================================================================================
function TK2_Window_Base() {
	this.initialize.apply(this, arguments)
}
TK2_Window_Base.prototype = Object.create(Window_Command.prototype);
TK2_Window_Base.prototype.constructor = TK2_Window_Base;
TK2_Window_Base.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
	this._modeType = ""
};
TK2_Window_Base.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	if (this.isCursorMovable()) { this.refresh();}
};
TK2_Window_Base.prototype.drawAllItems = function() {//TK2_Window_Base
    var topIndex = this.topIndex();{
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) 
            this.drawItem(index);
        }
    }
	this.drawFunctionIcon(this.width-36, this.height-36)
};
TK2_Window_Base.prototype.drawFunctionIcon = function(x, y) {//绘图 功能图标
	var bitmap = ImageManager.loadSystem('Rect');
	if (this.topRow() > 0) {// 上翻键
		this.contents.blt(bitmap, 24*2, 80, 24, 24, x-24, y-24*4-12);};//上
	if (this.topRow() + this.maxPageRows() < this.maxRows()) {// 下翻键
    	this.contents.blt(bitmap, 24*3, 80, 24, 24, x-24, y-24*3);};//下
	//---------------------------------------------------------------------	
	if (this._modeType==="CancelKey"){// 返回键	图标
		this.contents.blt(bitmap, 24, 80, 24, 24, x-24, y-24);
	};
	if (this._modeType==="DualKey"){// 是否键 图标
		this.contents.blt(bitmap, 0, 104, 32, 24, this.width-36-8-32*2, this.height-36-24);
		this.contents.blt(bitmap, 32, 104, 32, 24, this.width-36-32, this.height-36-24);
	};
	if (this._modeType==="MenuKey"){// 菜单键 图标
		this.contents.blt(bitmap, 0, 48, 32, 32, this.width-36-32-(32+8)*4, this.height-36-32);
		this.contents.blt(bitmap, 32, 48, 32, 32, this.width-36-32-(32+8)*3, this.height-36-32);
		this.contents.blt(bitmap, 32*2, 48, 32, 32, this.width-36-32-(32+8)*2, this.height-36-32);
		this.contents.blt(bitmap, 32*3, 48, 32, 32, this.width-36-32-(32+8)*1, this.height-36-32);
		this.contents.blt(bitmap, 32*4, 48, 32, 32, this.width-36-32, this.height-36-32);
	}
};
TK2_Window_Base.prototype.drawFunctionTouch = function(x,y) {//功能键 响应 集
	if (this.topRow() > 0) {
		if ((x >= this.width-18-24) && (x < this.width-18) &&
			(y >= this.height-18-24*4-12) && (y < this.height-18-24*3-12)){
			this.cursorPageup();    // 上翻键
		}
	};
	if (this.topRow() + this.maxPageRows() < this.maxRows()) {
		if ((x >= this.width-18-24) &&(x < this.width-18) &&
			(y >= this.height-18-24*3) &&(y < this.height-18-24*2)){
			this.cursorPagedown()  // 下翻键
		};	
	};
	//-----------------------------------------------------------------------
	if (this._modeType==="CancelKey"){//返回键 响应
		if ((x >= this.width-18-24) &&
			(y >= this.height-18-24) &&
	    	(x < this.width-18) &&
			(y < this.height-18)){
			this.processCancel();
		};
	};
	if (this._modeType==="DualKey"){//是否键 响应
		if ((x >= this.width-18-8-32*2) &&
			(y >= this.height-18-24) &&
	    	(x < this.width-18-8-32) &&
			(y < this.height-18)){
			this.processOk();
		};
		if ((x >= this.width-18-32) &&
			(y >= this.height-18-24) &&
	    	(x < this.width-18) &&
			(y < this.height-18)){
			this.processCancel();
		};
	};
	if (this._modeType==="MenuKey"){//菜单键 响应
		if ((y >= this.height-18-32) &&(y < this.height-18)){
			if (!$gamePlayer.canMove()) {//修正
				$.toaster({ message : ("有窗口在上层 不能响应")});
				return
    		}
			var bitmap_x1 = this.width-18-32-(32+8)*4;
			var bitmap_x2 = this.width-18-32-(32+8)*3;
			var bitmap_x3 = this.width-18-32-(32+8)*2;
			var bitmap_x4 = this.width-18-32-(32+8)*1;
			var bitmap_x5 = this.width-18-32;
			if((x >= bitmap_x1) &&(x <= bitmap_x1+32)){	
				SceneManager.goto(Scene_Route);
			}
			if((x >= bitmap_x2) &&(x <= bitmap_x2+32)){	
				SceneManager.goto(Scene_Info);
			}
			if((x >= bitmap_x3) &&(x <= bitmap_x3+32)){
				SceneManager.push(Scene_Army);
			}
			if((x >= bitmap_x4) &&(x <= bitmap_x4+32)){	
				Graphics._switchFPSMeter();
			}
			if((x >= bitmap_x5) &&(x <= bitmap_x5+32)){
				//SceneManager.goto(Scene_Story);
				$gameMap.updateStory();
				return;
			};
		};
}

};

//==================================================================================
// ██ 窗口画面的类 [太阁2风格] 信息
//==================================================================================
function TK2_Window_Normal() {
	this.initialize.apply(this, arguments)
}
TK2_Window_Normal.prototype = Object.create(TK2_Window_Base.prototype);//Window_Command
TK2_Window_Normal.prototype.constructor = TK2_Window_Normal;
TK2_Window_Normal.prototype.maxItems = function() {
	return 
};
TK2_Window_Normal.prototype.setItem = function(item) {
	if (this._mode !== item) {
		this._mode = item;
		this.refresh();
	}
};
TK2_Window_Normal.prototype.refresh = function() {
	this.createContents(); this.drawAllItems();
	this.drawAllown()
};
TK2_Window_Normal.prototype.processOk = function() {
	this.callHandler('ok')
};
TK2_Window_Normal.prototype.initialize = function(x, y, actor, multiple, width, height) {//描绘 定制窗口
	width= width || 360;//
	height= height || 300;//
	//按钮样式
	this._modeType=""//默认值
	if(actor==="Menu"){this._modeType = "MenuKey"}//菜单键 定义//only //单独地
    if(actor==="Dual"){this._modeType = "DualKey"}//是否键 定义//mult //多种
	if( actor==="城门"){this._modeType="CancelKey"}// 返回键 定义
	if( actor==="大名信息" || 
		actor==="武将排列" || 
		actor==="城池排列" || 
		actor==="Date" ){this._modeType=""}//无按钮(依附型窗口)
	this._commands = actor;//数据
	this._cmultiple = multiple ||0;//序列
	if(height > Graphics.boxHeight){height = Graphics.boxHeight};
	if(y===0){y =  (Graphics.boxHeight-height)/2};
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
	this.activate();
}; 
TK2_Window_Normal.prototype.drawAllown = function() {                                    //描绘 定制内容
	if(this._commands==="Dual"){//是否框
		this.drawTextEx(this._cmultiple, this.textPadding(), 0,this.width);
	}
	if (this._mode>=0){//修正 //无按钮框
		if (this._commands==="武将排列"){
			var commands=$gameParty._dataHero//筛选 出场势力武将
			var setName = [],e = 0;
			for (var i = 0; i < commands.length; i++) {
				if (commands[i][10] === true && commands[i][18]===this._cmultiple){
					setName[e] = commands[i]; e++;
				}; 
			};
			var CommandWindow = setName[this._mode]
			this.drawMan(CommandWindow)
		}
		if (this._commands==="城池排列"){
			var commands=$gameParty._dataCity//筛选 出场势力武将
			var setName = [],e = 0;
			for (var i = 0; i < commands.length; i++) {
				if (commands[i][3]===this._cmultiple){
					setName[e] = commands[i]; e++;
				}; 
			};
			var CommandWindow = setName[this._mode]
			this.drawCity(CommandWindow,"all")//排雷才
		}
		if (this._commands==="大名信息"){
			this.drawFaction(this._mode)
		}
	}
	if(this._commands==="城门"){//返回框
		var commands=$gameParty._dataCity[this._cmultiple]
		this.drawCity(commands)
	}
	if(this._commands==="Date"){//无按钮框
		this.contents.fontSize = 20;
		this.contents.clear();
        var textW = this.width-36;
        this.drawText($gameParty._dataDate[0] + " 年", -88, 0, textW, 'right');
        this.drawText($gameParty._dataDate[1] + "月", -44,0, textW, 'right');
        this.drawText($gameParty._dataDate[2] + "日",0, 0, textW, 'right');
        this.drawText($gameParty._dataDate[3], -160, 0, textW, 'right');
		this.drawText('丰前国', 8, 0, 400);
		this.drawDateIcon(0,120,2)
		var leadingMan= $gameParty._partyID
		var commands=$gameParty._dataHero//筛选 出场势力武将
		var setName = []//e = 0;
		for (var i = 0; i < commands.length; i++) {
			if (commands[i][2] === leadingMan){
				setName = commands[i];// e++;
			}; 
		};
		var CommandWindow = setName
	}
	if(this._commands==="Menu"){//菜单框
		var leadingMan= $gameParty._partyID
		var commands=$gameParty._dataHero//筛选 出场势力武将
		var setName = []//e = 0;
		for (var i = 0; i < commands.length; i++) {
			if (commands[i][2] === leadingMan){
				setName = commands[i];// e++;
			}; 
		};
		var CommandWindow = setName
		this._menuMan(setName)
	}
};

//==================================================================================
// ██ 窗口画面的类 [太阁2风格]列表
//==================================================================================
function TK2_Window_Command() {
	this.initialize.apply(this, arguments)
}
TK2_Window_Command.prototype = Object.create(TK2_Window_Base.prototype);
TK2_Window_Command.prototype.constructor = TK2_Window_Command;
TK2_Window_Command.lastIndex  = 0;
TK2_Window_Command.prototype.maxItems = function() {
	return this._maxActor;
};
TK2_Window_Command.prototype.refresh = function() {
	this.createContents(); this.drawAllItems();
		if(this._commands.length > 5){
		this.drawText(this._commands.length, this.width-36-26, 0, 400);//
	 }
};
TK2_Window_Command.prototype.drawItem = function(index) {
	var text= this.ownText(index)
	var rect = this.itemRectForText(index);
	this.drawRectIcon(rect); //自制矩形图片 显示
	this.drawText(text, rect.x, rect.y, rect.width, 'center');
};
TK2_Window_Command.prototype.customRect = function(index,rect) {//修正返回键位置
	if(this._modeType===""){rect.width = this.width-36}
	if(this._modeType==="CancelKey"){rect.width = this.width-64}
	 
};
TK2_Window_Command.prototype.processOk = function() {
	this.callHandler('ok')
};
TK2_Window_Command.prototype.setEditWindow = function(editWindow) {
	this._editWindow = editWindow;
	this.update();
};
TK2_Window_Command.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	if (this._editWindow) {
		this._editWindow.setItem(this.index());
	}
};
TK2_Window_Command.prototype.initialize = function(x, y, actor, mode, width) {//描绘
	y = y || 0;
	mode= mode || 0;
	width = width ||  160;
	this._mode= mode
	this._synchro = ""
	this._commands = this.ownActor(actor,this._mode)
	this._maxActor = Math.ceil(this._commands.length);
	 this._modeType="CancelKey" 
	if (this._mode=== -1){this._modeType=""}
	var height = Graphics.boxHeight;
	    height = this.fittingHeight(this.numVisibleRows())//高度自动
		if(height < Graphics.boxHeight){y=(Graphics.boxHeight-height )/2}
	if(height > Graphics.boxHeight){height = Graphics.boxHeight};//修正max高度
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.select(0);
	this.refresh();
	this.openness =  0;
    this.open();
	this.activate();
}; 
TK2_Window_Command.prototype.ownActor = function(actor,mode) {                //描绘
	if (actor==="城池排列"){//
		var commands=$gameParty._dataCity
		var setName = [],e = 0;
		for (var i = 0; i < commands.length; i++) {
			if (commands[i][3]===mode){//筛选：阵营
				setName[e] = commands[i]; e++;
			}; 
		};
		this._synchro ="CityName";
		return this.itemFilter($gameParty._dataCity, 3, mode);
	}
	if (actor==="武将排列"){// 
		var commands=$gameParty._dataHero;
		var setName = [],e = 0;
		for (var i = 0; i < commands.length; i++) {
			if (commands[i][10] === true && commands[i][18]===mode){//筛选： 登场 阵营
				setName[e] = commands[i]; e++;
			}; 
		};
		this._synchro ="KnightName";
		return this.itemFilterStage($gameParty._dataHero, true, 18, mode);
	}
	if (actor==="家中排行"){// 
		var commands=$gameParty._dataHero;
		var setName = [],e = 0;
		for (var i = 0; i < commands.length; i++) {
			if (commands[i][10] === true &&
			commands[i][22]===mode &&
			commands[i][18]==="岛津"){     // 筛选：登场 身份 阵营
				setName[e] = commands[i]; e++;
			}; 
		};
		this._synchro ="KnightName";
        if(setName.length<=0){setName=[["无此","身份"]]}
		return setName
	}
	if (actor==="大名排列"){
		this._synchro ="CampName"
		return $gameParty._dataRegime;//阵营
	}
	return actor;
};
TK2_Window_Command.prototype.ownText = function(index) {                      //描绘
	switch (this._synchro) {
	case "CampName":
		return   this._commands[index][0]+"家"; break;
	case "CityName":
		return  this._commands[index][1]+"城"; break;
	case "KnightName":
		return  this._commands[index][0]+this._commands[index][1]; break;
	};
	return this._commands[index];
};

}// ★ 窗口父类集
if ($OnTouch_One) {// ★ 武将一览
//------------------------------------------------------------------------------
// ★ 武将一览 ██ 
//------------------------------------------------------------------------------
function Scene_Heros() {
	this.initialize.apply(this, arguments);
}
Scene_Heros.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Heros.prototype.constructor = Scene_Heros;
Scene_Heros.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
};
Scene_Heros.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	this.createRangeWindow();
};
Scene_Heros.prototype.createRangeWindow = function() {
	var CommandWindow="大名排列"
	this._commandWindow = new TK2_Window_Command(0,0, CommandWindow);
	this._commandWindow.setHandler('ok',     this.onRangeOk.bind(this));
	this._commandWindow.setHandler('cancel', this.popScene.bind(this));
	this.addWindow(this._commandWindow);
};
Scene_Heros.prototype.onRangeOk = function() {
	this._commandWindow.deactivate();
	this._commandWindow.opacity = 180;
	this._commandWindow.contentsOpacity = 180;
	this.createEditWindow();
};
Scene_Heros.prototype.popScene = function() {
    SceneManager.goto(Scene_Map);
};
Scene_Heros.prototype.createEditWindow = function() {
	var indexCommand = this._commandWindow._commands[this._commandWindow.index()]
	var actor="武将排列"//
	this._nameWindow = new TK2_Window_Command(0,0, actor,indexCommand[0]);
	this._nameWindow.x=96
	this._nameWindow.setHandler('cancel', this.onNameCancel.bind(this));
	this.addWindow(this._nameWindow);
	this._editWindow = new TK2_Window_Normal(0, 0, actor, indexCommand[0])
	this._editWindow.x = this._nameWindow.width+this._nameWindow.x
	this._nameWindow.setEditWindow(this._editWindow);
	this.addWindow(this._editWindow);
};
Scene_Heros.prototype.onNameCancel = function() {
    this._commandWindow.activate();
	this._commandWindow.opacity = 255;
	this._commandWindow.contentsOpacity = 255;
	this._nameWindow.close();
	this._editWindow.close();
};
};// ★ 武将一览
if ($OnTouch_One) {// ★ 城池一览
//------------------------------------------------------------------------------
// ★ 城池一览
//------------------------------------------------------------------------------
function Scene_Citys() { 
	this.initialize.apply(this, arguments);
}
Scene_Citys.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Citys.prototype.constructor = Scene_Citys;
Scene_Citys.prototype.initialize = function() {
	Scene_MenuBase.prototype.initialize.call(this);
};
Scene_Citys.prototype.create = function() {
	Scene_MenuBase.prototype.create.call(this);
	this.createRangeWindow();
};
Scene_Citys.prototype.createRangeWindow = function() {
	var CommandWindow="大名排列"
	this._commandWindow = new TK2_Window_Command(0,0, CommandWindow);
	this._commandWindow.setHandler('ok',     this.onRangeOk.bind(this));
	this._commandWindow.setHandler('cancel', this.popScene.bind(this));
	this.addWindow(this._commandWindow);
};
Scene_Citys.prototype.onRangeOk = function() {
	this._commandWindow.deactivate();
	this._commandWindow.opacity = 180;
	this._commandWindow.contentsOpacity = 180;
	this.createEditWindow();
};
Scene_Citys.prototype.popScene = function() {
    SceneManager.goto(Scene_Map);
};
Scene_Citys.prototype.createEditWindow = function() {
	var indexCommand = this._commandWindow._commands[this._commandWindow.index()]
	var actor="城池排列"
	this._nameWindow = new TK2_Window_Command(0,0, actor,indexCommand[0]);
	this._nameWindow.x=96
	this._nameWindow.setHandler('cancel', this.onNameCancel.bind(this));
	this.addWindow(this._nameWindow);
	this._editWindow = new TK2_Window_Normal(0, 0, actor, indexCommand[0])
	this._editWindow.x = this._nameWindow.width+this._nameWindow.x
	this._nameWindow.setEditWindow(this._editWindow);
	this.addWindow(this._editWindow);
};
Scene_Citys.prototype.onNameCancel = function() {
    this._commandWindow.activate();
	this._commandWindow.opacity = 255;
	this._commandWindow.contentsOpacity = 255;
	this._nameWindow.close();
	this._editWindow.close();
};

};// ★ 城池一览
if ($OnTouch_One) {// ★  部署军队
//==================================================================================
// ██ Window_Army
//----------------------------------------------------------------------------------
//    部署军队
//==================================================================================
function Window_Army() {
    this.initialize.apply(this, arguments);
}
Window_Army.prototype = Object.create(Window_HorzCommand.prototype);
Window_Army.prototype.constructor = Window_Army;
Window_Army.prototype.initialize = function(x, y, width) {
    this._windowWidth = width;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
};
Window_Army.prototype.windowWidth = function() {
    return this._windowWidth;
};
Window_Army.prototype.windowHeight = function() {
    return 400
};
Window_Army.prototype.maxCols = function() {
    return 4;
};
Window_Army.prototype.makeCommandList = function() {
    this.addCommand('总大将', 'equip');
    this.addCommand('变更守备', 'optimize');
    this.addCommand('准备完成', 'equip');
    this.addCommand(TextManager.cancel,    'cancel');
    this.addCommand('第二军', 'equip');
    this.addCommand('第三军', 'equip');
    this.addCommand('第四军', 'equip');
    this.addCommand('第五军', 'equip');
};
Window_Army.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};
Window_Army.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
	this.contents.fontSize = 14
    this.changePaintOpacity(this.isCommandEnabled(index));
	switch (index) {
    case 0://case 1: case 2: case 3: 
	this.allFaces(150, rect.x, rect.y+27);
    this.contents.fillRect(rect.x+rect.width+8, 49, 120, 58, this.textColor(28),1);
	this.drawText("守城大将", rect.x+rect.width/4+78, rect.y+48, rect.width, 1);//"卿 "+"剑客"
	this.drawText("士兵 2500人", rect.x+rect.width/4+78, rect.y+36+48, rect.width, 1);
   this.contents.fillRect(280, rect.y+4, 320, 104, this.textColor(8),1);
	this.drawText("士兵          军马          洋枪", 390, rect.y+8, this.width, 1);
	this.drawText("出征士兵", 290, rect.y+48, this.width, 1);
	this.drawText("剩余士兵", 290, rect.y+36+48, this.width, 1);
	// 出征兵马
	var size_soldier=[1000,100];
    size_horse=[2000,200];
    size_arrow=[3000,300];
	//this.drawText(size_soldier[0]+"人", -210, rect.y+48, this.width, 'right');
	this.drawText(size_horse[0]+"匹", -150, rect.y+48, this.width, 'right');
	this.drawText(size_arrow[0]+"支", -90, rect.y+48, this.width, 'right');
	// 留守兵马
	//、、this.drawText(size_soldier[1]+"人", -210, rect.y+36+48, this.width, 'right');
	this.drawText(size_horse[1]+"匹", -150, rect.y+36+48, this.width, 'right');
	this.drawText(size_arrow[1]+"支", -90, rect.y+36+48, this.width, 'right');
    this.contents.fillRect(rect.x+rect.width/2, 130, 462, 1, this.windowskin.getPixel(255, 255),1);
    this.contents.fillRect(rect.x+rect.width/2, 107, 1, 24, this.windowskin.getPixel(255, 255),1);
        break;
    case 4: case 5: case 6: case 7:
    this.contents.fillRect(rect.x+rect.width/2, 130, 1, 20, this.windowskin.getPixel(255, 255),1);
    this.contents.fillRect(rect.x+rect.width/2-60, rect.y+32*3+20, 120, 58, this.textColor(28),1);
	this.allFaces(227, rect.x, rect.y+27);
	this.drawText("部将", rect.x, rect.y+32*3+15, rect.width, align);//大夫
	this.drawText("士兵2500人", rect.x, rect.y+32*4+15, rect.width, 1);
        break;
    }
	this.contents.fontSize = 20
	
	this.drawRectIcon(rect); //自制矩形图片 显示
	this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};
Window_Army.prototype.customRect = function(index,rect) {//子类
		rect.x+=40
	if (index < 0) {return};
	switch (index) {
	case 4: case 5: case 6: case 7:
		rect.y+=120
		break;
	case 1:case 2:case 3:
		rect.y+=330//
		break;
	};
	rect.width=64+12
	rect.height=28
};

function Scene_Army() {
    this.initialize.apply(this, arguments);
}
Scene_Army.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Army.prototype.constructor = Scene_Army;
Scene_Army.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
Scene_Army.prototype.numVisibleRows = function() {
    return 4;
};
Scene_Army.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    //this._statusWindow = new Window_Army(96,0,544,360);
    this._statusWindow = new Window_Army(0,0,640,400);
    this._statusWindow.setHelpWindow(this._helpWindow);
    this._statusWindow.setHandler('cancel',   this.popScene.bind(this));
	this._statusWindow.setHandler('ok',     this.onRangeOk.bind(this));
    this._statusWindow.setHandler('equip',    this.commandEquip.bind(this));
    this._statusWindow.setHandler('optimize', this.commandOptimize.bind(this));
    this.addWindow(this._statusWindow);
	//this._commandWindow.activate();
};
Scene_Army.prototype.onRangeOk = function() {
$.toaster({ message : ('一键部署')});
    this.refreshActor();
};
Scene_Army.prototype.popScene = function() {
	//this._commandWindow.activate();
    SceneManager.goto(Scene_Map);
};
Scene_Army.prototype.commandEquip = function() {
	$.toaster({ message : (this._statusWindow.commandName(this._statusWindow.index()))});
	this._statusWindow.activate();
};
Scene_Army.prototype.commandOptimize = function() {
$.toaster({ message : ('一键部署')});
    this._statusWindow.activate();
};
Scene_Army.prototype.refreshActor = function() {
    var actor = this.actor();
    this._statusWindow.setActor(actor);
};
Scene_Army.prototype.onRangeOk = function() {
	//this.popScene()
};
}//    部署军队

//==================================================================================
// ██ Scene_Map  OwnAlias
//----------------------------------------------------------------------------------
//    处理地图画面(别名)的类                           菜单界面        
//==================================================================================
Scene_Map.prototype.createAllWindows_TK2_Alias  = Scene_Map.prototype.createAllWindows
Scene_Map.prototype.createAllWindows = function() {//创建菜单窗口
	if ($gameMap.mapId()!==1  ){// 修正
		this.createMenuWindow();
	}; this.createAllWindows_TK2_Alias.call(this);
};
Scene_Map.prototype.createMenuWindow = function() {//地图窗口
	this._dateWindow = new TK2_Window_Normal(0, Graphics.boxHeight-32-18, "Date",0,Graphics.boxWidth-228, 36+32+32);//日期
	this._dateWindow.opacity = 0
	this._dateWindow.backOpacity = 0
	this.addWindow(this._dateWindow);
	
	this._menuWindow = new TK2_Window_Normal(0, 0, "Menu", 40, 228, 640);//菜单
	this._menuWindow.opacity = 0;
	this._menuWindow.x = (Graphics.boxWidth - this._menuWindow.width);
	this._menuWindow.y = 0
	this.addWindow(this._menuWindow);
};
Game_Temp.prototype.setDestination_TK2_Alias = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function(x, y) {//菜单按钮修正 地图禁止移动区域
	var xx=TouchInput.x
	var yy=TouchInput.y
	var ww=Graphics.boxWidth-228
	//桌面禁止移动区域    菜单栏
	if ((yy >= 400-18-32) && (yy <= 400-18) &&(xx >= ww+18) &&(xx <= ww+18+32+(32+8)*4)){
		return}
	this.setDestination_TK2_Alias.call(this, x, y);  
}; 
