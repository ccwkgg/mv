 /*:
 * @plugindesc |          | 太阁2 调整
 * @author 自制插件 TK2 Style
 *
 * @help
 3: 预载系统默认图片

4: 插件命令 入镇 出镇    入城 调试
5: 菜单窗口  地图禁止移动区域

6: 描绘 人物属性 初始化
7: 对话扩展(肖像, 标题)

8: 选项 标题风格
 */
 
//==================================================================================
// ██ Window_Base   窗口父类的调用集合  
//==================================================================================
//绘制人物城池
Window_Base.prototype.drawFaction = function(actor, x ,y) {                 // 绘制势力内容
x= x || 0;
y= y || 0;
	var Actor=$gameParty._dataFaction[actor];
	this.contents.textColor = this.textColor(0)
	xxx=Actor[6]//ID
	this.drawText(Actor[2]+"ID:"+Actor[6], x+80, 0, 400);
	this.allFaces(xxx, x, 4);
	if (Actor[3] ===0){
		this.contents.textColor = this.textColor(18)
		var sss="没有官位";
    }
	if (Actor[3] !==0){
		var sss=Actor[3];
		this.contents.textColor = this.textColor(0) 
    }
	this.drawText(sss, x+80, this.lineHeight(), 400);;
	this.contents.textColor = this.textColor(0)
	this.drawText("支配力：", x+80, this.lineHeight() * 1+24, 400);;
	this.drawText("朝贡：" + Actor[4], x+80, this.lineHeight() * 2+24, 400);;
	if (Actor[5] ===true){
		this.contents.textColor = this.textColor(16)
		var vvv="[可入职]";
    }
	if (Actor[5] ===false){
		var vvv="[暂不对外招募]"
		this.contents.textColor = this.textColor(0)
    }
	this.drawText(vvv, x+80, this.lineHeight() * 3+18, 400);
	this.contents.textColor = this.textColor(0)

};
Window_Base.prototype.drawCity = function(actor, modeType ,x ,y) {          // 绘制城池内容
x= x || 0;
y= y || 0;
	var Actor= actor
	if (Actor[2] === "小"){var sss = 0};
	if (Actor[2] === "中"){var sss = 1};
	if (Actor[2] === "平城1"){var sss = 2};
	if (Actor[2] === "平城2"){var sss = 3};
	if (Actor[2] === "山城"){var sss = 4};
	if (Actor[2] === "巨"){var sss = 5};
	this.contents.textColor = this.textColor(0)
	this.drawCityIcon(sss, x, y+this.lineHeight()+20);
	this.drawText(Actor[0]+"国", x, y+10, 400);//所属国
	this.drawText("城主："+Actor[5], x+110, y+this.lineHeight() * 2+30, 400);//城主
	this.drawText(Actor[3]+"家"+Actor[4]+"城", x+180, y+10, 400);//阵营 行政
	this.drawText(Actor[1]+"城", x+180, y+this.lineHeight()+20, 400);//名称
	if (modeType==="all"){
	this.drawText("俸    禄：" + Actor[6]+"/ "+Actor[7], x+10, y+this.lineHeight() * 3+40, 400);//俸  禄
	this.drawText("支持率：" + Actor[10]+"%", x+10, y+this.lineHeight() * 4+40, 400);//支持率
	this.drawText("防御度：" + Actor[8], x+10, y+this.lineHeight() * 5+40, 400);//防御度
	this.drawText("洋    枪：" + (Actor[14]*10)+"支", x+10, y+this.lineHeight() * 6+40, 400);//洋  枪
	this.drawText("军    马：" + (Actor[15]*10)+"匹", x+10, y+this.lineHeight() * 7+40, 400);//军  马
	this.drawText("军资金：" + Actor[12]+"贯", x+170, y+this.lineHeight() * 3+40, 400);//军资金
	this.drawText("军    粮：" + Actor[13]+"石", x+170, y+this.lineHeight() * 4+40, 400);//军  粮
	this.drawText("士兵数：" + Actor[11]+"人", x+170, y+this.lineHeight() * 5+40, 400);//士兵数
	this.drawText("训练度：" + Actor[16], x+170, y+this.lineHeight() * 6+40, 400);//训练度
	this.drawText("士    气：" + Actor[9], x+170, y+this.lineHeight() * 7+40, 400);//士  气
	}
};
Window_Base.prototype.drawCityIcon = function(iconIndex, x, y) {            // 绘制城池简图
	 this.iconIndex = iconIndex
	var bitmap = ImageManager.loadFace('FaceCity');
	var pw = 80;
	var ph = 64;
    var sx = this.iconIndex % 4 * pw;
    var sy = Math.floor(this.iconIndex / 4) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};
Window_Base.prototype.drawDateIcon = function(iconIndex, x, y) {            // 绘制城池天气图
	 this.iconIndex = iconIndex
	var bitmap = ImageManager.loadSystem('Rect');
	var pw = 64;
	var ph = 26;
    var sx = this.iconIndex%4 * pw;
    var sy = Math.floor(this.iconIndex) * ph;
    this.contents.blt(bitmap, 0, 128+sy, pw, ph, x, y);
};
Window_Base.prototype.iconSkills = function(iconIndex,id, x, y) {           // 绘制技能图
	var bitmap = ImageManager.loadFace('Skill');
	var pw = 16;
	var ph = 16;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex * ph);
    if(id>0){this.contents.blt(bitmap, sx, 0, pw, ph, x, y);
		if(id>1){this.contents.blt(bitmap, sx, 0, pw, ph, x+16+4, y)
    		if(id>2){this.contents.blt(bitmap, sx, 0, pw, ph, x+32+8, y)};
		}
	}
};
Window_Base.prototype.allSkill = function(iconIndex, x, y, lineHeight) {    // 绘制技能
	var Actor=iconIndex
	var skill=["口才 ", "算术 ", "筑城 ", "礼法 ", "茶道 ", "剑术 ", "兵法 ", "马术 ", "洋枪 ", "忍术 "]
    for (var i = 0; i < skill.length; i++) {
		if(i<=4){
		this.drawText(skill[i], x, y+lineHeight * (i), 400);
	    this.iconSkills(i, Actor[i+40],x+40, y+lineHeight * (i)+6)
		}
		if(i>4){
		this.drawText(skill[i], x+100, y+lineHeight * (i-5), 400);
	    this.iconSkills(i, Actor[i+40],x+40+100, y+lineHeight * (i-5)+6)
		}
    }
};
Window_Base.prototype._menuMan = function(actor, x, y, lineHeight) {        // 调用主角属性
x= x || 0;
y= y || 0;
lineHeight = lineHeight || 22;
	this.allTalent(actor, x, y, lineHeight,"menu")
	this.allSkill(actor, x,  y + lineHeight * 9, lineHeight)
};
Window_Base.prototype.drawMan = function(actor ,x,y, lineHeight) {          // 调用人物属性
x= x || 0;
y= y || 0;
lineHeight = lineHeight || 22;
	this.allTalent(actor, x, y, lineHeight,"null")
	this.allSkill(actor, x+100, y + lineHeight * 4,lineHeight)
};
Window_Base.prototype.allTalent =  function(actor, x, y, lineHeight,type) { // 绘制才能
x= x || 0;
y= y || 0;
lineHeight = lineHeight || 22;
type = type || "null";
	var wf = 28;
	var width2 = Math.min(200, 200  - 36);
	this.contents.fontSize = 16
	this.allFaces(actor[2], x, y);
	if(type==="menu"){
	    this.contents.fontItalic = true
		this.changeTextColor(this.textColor(17));
    	this.drawText(actor[0]+actor[1], 80, 22-20, wf*10);
    	this.drawText(actor[18]+'家    '+actor[22], 80, 22* 2-20, wf*10);//18势力 22身份
    	this.drawActorHp(actor, 80, 22 * 3-20, width2-60);
		this.changeTextColor(this.textColor(17));
		var wf = 600000;
    	this.drawText('所持金：', x, y + lineHeight * 4, wf*10);
    	this.drawText(wf+'贯', 20, y + lineHeight * 4, this.width-32-36, 'right');
    	this.drawText('信赖度：'+actor[20], x, y + lineHeight * 5, wf*10);
		this.drawText('统御：'+actor[35], x, y + lineHeight * 6, wf*10);this.drawText('武力：'+actor[36], x+100, y + lineHeight * 6, wf*10);
		this.drawText('内政：'+actor[37], x, y + lineHeight * 7, wf*10);this.drawText('外交：'+actor[38], x+100, y + lineHeight * 7, wf*10);
		this.drawText('魅力：'+actor[39], x, y + lineHeight * 8, wf*10);
	}
	if(type==="null"){
		this.changeTextColor(this.textColor(17));
		this.drawText(actor[0]+actor[1], x+80, y+lineHeight* 2-20, 400);
		this.drawText(actor[16]+"岁", x+180, y+lineHeight* 2-20, 400);
		this.drawText(actor[18]+'家      '+actor[19]+'城      '+actor[22], x+80, y+lineHeight-20, 400);//18势力 22身份
		this.drawText('俸禄：'+actor[21], x+80, y + lineHeight * 3-20, 400);
		this.drawActorHp(actor, x+180, y + lineHeight * 3-20, width2-30);
		this.changeTextColor(this.textColor(17));
		this.drawText('统御：'+actor[35], x+10, y + lineHeight * 4, wf*10);
		this.drawText('武力：'+actor[36], x+10, y + lineHeight * 5, wf*10);
    	this.drawText('内政：'+actor[37], x+10, y + lineHeight * 6, wf*10);
		this.drawText('外交：'+actor[38], x+10, y + lineHeight * 7, wf*10);
    	this.drawText('魅力：'+actor[39], x+10, y + lineHeight * 8, wf*10);
		var commands=$gameParty._dataHero//筛选 出场势力武将
		var setName = []//e = 0;
			for (var i = 0; i < commands.length; i++) {
				if (commands[i] === actor){
					setName = i;// e++;
				}; 
			};
			var CommandWindow = setName
		this.drawText('ID：'+actor[2]+'  Face：'+actor[3]+ '  All：'+ CommandWindow+" /", x+10, this.height-36-8-lineHeight-this.contents.fontSize, 400);
		this.drawText('信赖度：'+actor[20], x+10, this.height-36-8-this.contents.fontSize, 400);
	}
};
Window_Base.prototype.allFaces = function(iconIndex, x, y) {                // 绘制人物脸谱
     //this.iconIndex = iconIndex
	//var fileName='FaceName_02'
	//var iconID=this.iconIndex
	//if (iconID <0 && iconID >744){return}
	//if (iconIndex >=0 && iconIndex<=255){var fileName='FaceName_00'};
	//if (iconIndex >=256 && iconIndex<=511){var fileName='FaceName_01'; iconID-=255};
	//if (iconID=iconIndex-512 >=512 && iconID=iconIndex-512<=744){
		fileName='FaceName_02'; iconID=iconIndex-512
		if (iconID<0){
			iconID=217}
	var bitmap = ImageManager.loadFace(fileName);
	var pw = 64;
	var ph = 80;
    var sx = iconID % 16 * pw;
    var sy = Math.floor(iconID / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);//this.drawText(iconID, x, y, 400);//俸  禄
};
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {          // 绘制体力
    width = width || 186;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
    //this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
    this.drawGauge(x, y, width, 1, color1, color2);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.hpA, x, y, 92);
    //this.drawText(width, x, y, 92);
    this.drawCurrentAndMax(actor[13], actor[14], x, y, width,
                           this.normalColor(), this.normalColor());
                        // this.hpColor(actor), this.normalColor());
};
Window_Base.prototype.itemFilter = function(item, index, data ) {           // 符合条件的数据
	//条件中的数据
	var commands=item;
	var setName = [],e = 0;
	for (var i = 0; i < commands.length; i++) {
		if (commands[i][index] === data){
			setName[e] = commands[i]; e++;
		}; 
	};return setName;
};
Window_Base.prototype.itemFilterStage = function(item, life,index, data ) {
	//条件中的镇
	var commands=item
	var setName = [],e = 0;
	for (var i = 0; i < commands.length; i++) {
		if (commands[i][10] === life && commands[i][index]===data){
			setName[e] = commands[i]; e++;
		}; 
	};return setName
};
      

Scene_Title.prototype.drawGameTitle = function() {
    var x = 20;
    var y = Graphics.height / 6;
    var maxWidth = Graphics.width - x * 2;
    var text = $dataSystem.gameTitle;
    this._gameTitleSprite.bitmap.outlineColor = 'black';
    this._gameTitleSprite.bitmap.outlineWidth = 8;
    this._gameTitleSprite.bitmap.fontSize = 72;
    this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'center');
};
Scene_Title.prototype.commandNewGame = function() {//新游戏
    DataManager.setupNewGame();
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.goto(Scene_Map);
};



Scene_Title.prototype.popScene = function() {  
	
	this._commandWindow.activate();
	this._commandWindow.deselect()
	this._commandWindow.opacity = 180;
	this._commandWindow.contentsOpacity = 180;
	this._whetherWindow = new TK2_Window_Normal(100,20, "Dual","                         § 近侍 §\n结束游戏。\n可以吗？",360,128);
	this._whetherWindow.setHandler('ok',     this.onWhetherOk.bind(this));
	this._whetherWindow.setHandler('cancel', this.onWhetherCancel.bind(this));
	this.addWindow(this._whetherWindow);

};

 

Scene_Title.prototype.onWhetherOk = function() {
	SceneManager.exit()
};
Scene_Title.prototype.onWhetherCancel = function() {
	this._commandWindow.activate();
	this._whetherWindow.close();
	this._commandWindow.opacity = 255;
	this._commandWindow.contentsOpacity = 255;
};
Window_TitleCommand.prototype.itemRectForText = function(index) { // 显示矩形画布  停用 
	var rect = this.itemRect(index);
	rect.x += this.textPadding();
	rect.width -= this.textPadding() * 2;
	//this.drawRectIcon(rect); //自制矩形图片
	return rect;
};
Window_TitleCommand.prototype.drawItem = function(index) {
//Window_Command.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
	this.drawRectIcon(rect); //自制矩形图片 显示
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
      
};
Window_TitleCommand.prototype.itemTextAlign = function() {
	return 'center';
};
Window_TitleCommand.prototype.isPending = function() {
	return false;
};
Window_TitleCommand.prototype.makeCommandList = function() { //标题 调整
	this.addCommand('开始新游戏',   'newGame');
	this.addCommand('读取进度', 'continue', this.isContinueEnabled());
	this.addCommand('环境设定', 'options', this.isPending());
	this.addCommand('音乐欣赏模式', 'options', this.isPending());
	this.addCommand('结束游戏',  'cancel');
};

Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
	var y = rect.y
    var bottom = rect.y + rect.height;
    var lineHeight = this.lineHeight();
        if (valid) {
    //        this.drawPartyCharacters(info, rect.x + 160, bottom + 18);
	var textW = this.width-36; 
	this.contents.fontSize  = 18;
	this.drawText(info.names[0] + " 年", 6, y, textW, 'left');
	this.drawText(info.names[1] + "月", -448, y, textW, 'right')
	this.drawText(info.names[2] + "日", -407, y, textW, 'right');
	//this.drawText(info.names[3] + "日",112, y, textW, 'left');
	this.drawText(info.names[4],-55, y, textW, 'center');
	this.drawText(info.names[5],  85, y,  textW, 'center');
	this.drawText('在' + info.names[6] + '国'  , -6, y, textW, 'right');
    }
};
Window_SavefileList.prototype.drawFileId = function(id, x, y) {
	info = DataManager.loadSavefileInfo(id);
	if (!info) {
		this.contents.paintOpacity = 180
		this.drawText('—— 年 — 月 — 日      ——————    —————————    —————— ', 10, y, this.width-44);
		this.contents.paintOpacity = 255
	};
}
Window_SavefileList.prototype.maxVisibleItems = function() {
    return 8;
};
Scene_Save.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(this.savefileId())) {
        this.onSaveSuccess();
    } else {
        this.onSaveFailure();
    }
};
Scene_Save.prototype.onRemovefileOk = function() {//删除存档  待用
    Scene_File.prototype.onSavefileOk.call(this);
    $gameSystem.onBeforeSave();
    if (StorageManager.remove(this.savefileId())) {
       this.onSaveFailure();
    } else {
        this.onSaveSuccess();
    }
};
Scene_File.prototype.createListWindow = function() {// 窗口调整
    var x = 24;
    var y = this._helpWindow.height;
    var width = Graphics.boxWidth-48;
	this._helpWindow.width=width
	this._helpWindow.x=x
    var height = Graphics.boxHeight - y-72;
    this._listWindow = new Window_SavefileList(x, y, width, height);
    this._listWindow.setHandler('ok',     this.onSavefileOk.bind(this));
    this._listWindow.setHandler('cancel', this.popScene.bind(this));
    this._listWindow.select(this.firstSavefileIndex());
    this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
    this._listWindow.setMode(this.mode());
    this._listWindow.refresh();
    this.addWindow(this._listWindow);
};
DataManager.maxSavefiles = function() {

    return 8;
};
DataManager.makeSavefileInfo = function() {
    var info = {};
    info.globalId   = this._globalId;
    info.title      = $dataSystem.gameTitle;
    info.characters = $gameParty.charactersForSavefile();
    info.faces      = $gameParty.facesForSavefile();
    info.playtime   = $gameSystem.playtimeText();
    info.timestamp  = Date.now();
	info.names  =  $gameParty._dataDate//自定义 
    return info;
};

Window_Options.prototype.processOk = function() {
	var index = this.index();
	var symbol = this.commandSymbol(index);
	var value = this.getConfigValue(symbol);
	if (index<=5 ){
		if (this.isVolumeSymbol(symbol)) {
			value += this.volumeOffset();
        	if (value > 100) {
				value = 0;
			}
 			value = value.clamp(0, 100);
			this.changeValue(symbol, value);
		} else {
			this.changeValue(symbol, !value);
		}
	};
	if (index>5 ){this.callOkHandler();};//// no控制开关变量
};
Window_Options.prototype.statusText = function(index) {
	var symbol = this.commandSymbol(index);
	var value = this.getConfigValue(symbol);
	if (index>5 ) return ;// no控制开关变量
	if (this.isVolumeSymbol(symbol)) {
		return this.volumeStatusText(value);
	} else {
		return this.booleanStatusText(value);
	}
};
Window_Options.prototype.makeCommandList = function() {  //选项 调整
    this.addGeneralOptions();
    this.addVolumeOptions();
    //this.addCommand(TextManager.gameEnd, 'gameEnd');
    this.addCommand(TextManager.save, 'save');
};
Scene_Options.prototype.createOptionsWindow = function() {
    this._optionsWindow = new Window_Options();
    this._optionsWindow.setHandler('save',      this.optionsSave.bind(this));
    this._optionsWindow.setHandler('gameEnd',   this.optionsGameEnd.bind(this));
    this._optionsWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._optionsWindow);
};
Scene_Options.prototype.optionsSave = function() {
    SceneManager.push(Scene_Save);
};
Scene_Options.prototype.optionsGameEnd = function() {
    SceneManager.push(Scene_GameEnd)
};

//==================================================================================
// ██ 程序初始化
//================================================================================== 
Scene_Boot.prototype.loadSystemImages = function() {//预载系统默认图片      覆盖 
    //预载肖像
    ImageManager.loadSystem('Rect');     //矩形条
	ImageManager.loadFace('FaceCity');   //城池肖像
	ImageManager.loadFace('Skill');
    ImageManager.loadFace('FaceName_02');// 全部肖像
    //ImageManager.loadFace('FaceName_00');//全部肖像
    //ImageManager.loadFace('FaceName_01');//全部肖像
	//--------------------------------------------------
    ImageManager.loadSystem('Window');
    ImageManager.loadSystem('IconSet');
    ImageManager.loadSystem('Balloon');
    ImageManager.loadSystem('Shadow1');
    ImageManager.loadSystem('Shadow2');
    ImageManager.loadSystem('Damage');
    ImageManager.loadSystem('States');
    ImageManager.loadSystem('Weapons1');
    ImageManager.loadSystem('Weapons2');
    ImageManager.loadSystem('Weapons3');
    ImageManager.loadSystem('ButtonSet');
};

Game_Interpreter.prototype.pluginCommand_TK2_Alias = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {//调用
	this.pluginCommand_TK2_Alias(command, args);
	if (command === '调试') { 
 		$.toaster({message:   '21号变量' + String($gameVariables.value(21)) })
	}
	//===========================================================================================================
	if (command === '入城') {                  // 启动
		var id = this.eventId()
		$.toaster({ message : ('Id:'+id+' :'+$gameParty._dataCity[id-8][3]+'家 '+ $gameParty._dataCity[id-8][1]+'城 :'+(id-8))});
		
		$gameParty._windowType = (this.eventId()-8)// 获取城池ID;
        SceneManager.push(Scene_NowCity);//城池界面
	}
	if (command === '入镇') {                  // 启动
		var id = this.eventId()
    $gameVariables.setValue(11, 1);//1	11小镇=1
    $gameVariables.setValue(22, $gameMap.mapId());//	22 地图编号=地图id
    $gameVariables.setValue(23, $gamePlayer.x);//	    23 主角所在X轴=玩家 的地图X
    $gameVariables.setValue(24, $gamePlayer.y);//	    24 主角所在Y轴=玩家 的地图Y
      $gamePlayer.reserveTransfer(9, 8, 6, 8, 0);//5	转移玩家 09小仓43（87 上）
	}
	if (command === '出镇') {                  // 启动
		$gamePlayer.reserveTransfer($gameVariables.value(22), $gameVariables.value(23), $gameVariables.value(24), 2, 0);
	}
};


//==================================================================================
// ██   自制文章 图片和标题
//==================================================================================
Window_Base.prototype.processEscapeCharacter_TK2_Alias = Window_Base.prototype.processEscapeCharacter
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
	 if(code==='F'){this.processDrawFace(this.obtainEscapeParam(textState), textState);}
     this.processEscapeCharacter_TK2_Alias.call(this, code, textState);
};
Window_Base.prototype.processDrawFace = function(iconIndex, textState) {//  对话扩展(肖像, 标题)
	this._name=$gameParty._NpcName//Data_Own.NpcName
	this._hero=$gameParty._dataHero
	//筛选主角
		var leadingMan= $gameParty._partyID
		var commands=$gameParty._dataHero//筛选 出场势力武将
		var setName = []//e = 0;
		for (var i = 0; i < commands.length; i++) {
			if (commands[i][2] === leadingMan){
				setName = commands[i];// e++;
			}; 
		};
		var CommandWindow = setName
	if (iconIndex === 0){c = setName[0]+setName[1];var face=leadingMan} //主角  //主角说话$gameActors.actor(1).name()
	 
	if(iconIndex > 2){//武将
	var face_id=iconIndex-589//修正缺数据
	c = this._hero[face_id][0]+this._hero[face_id][1]//九州款式人物
	var face=iconIndex//faceid索引
	}
	if (iconIndex === 1){c = this._name[name_NPCS][0];var face=512+188+name_NPCS}       // 有肖像的名人 NPC说话
	if(iconIndex !== 2){// 肖像文字优化
		textState.left = 80
    	textState.x =textState.left
		this.allFaces(face, textState.x+ 2-80, textState.y+ 22);
	}
	if (iconIndex === 2){c = name_NPC_Not}// 无肖像的 NPC说话
    this.contents.drawText(("§ %1 §").format(c), 0, textState.y, this.contents.width, textState.height, 'center');
    textState.y += 32;
};
//==================================================================================
// ██ Window_NewBas
//----------------------------------------------------------------------------------
//    描绘 人物属性 初始化
//==================================================================================
Game_Party.prototype.initialize_TK2_Alias = Game_Party.prototype.initialize
Game_Party.prototype.initialize = function() {//prototype
    this.initialize_TK2_Alias.call(this);
    this.initMydatas();
};
Game_Party.prototype.initMydatas = function() {
    this._partyID = 662;//"岛津"
	this._Reload=false//$gameParty._dataDate
	this._windowType=0//临时 城池序列(获取当前事件ID)
	this._dataHero = Data_Own.Hero// 武将数据        $gameParty._windowType
	this._dataFaction = Data_Own.Faction// 势力数据  $gameParty._dataFaction
	this._dataCity = Data_Own.City// 城池数据        $gameParty._dataCity
	this._dataTown = Data_Own.Town// 小镇数据        $gameParty._dataRegime
	this._dataDate =  [1540,12,1,31,"无名","浪人","肥前","否" ]
	
	this._campaign_Params=["是","否"]
	this._campaignParamsValue = -2
	this._campaign=false
	this._campaignProcess=0
	this._srpgTurnState=0//$gameParty._srpgTurnState
	this._choicesProcess=0//选项进程
	this.onSrpgTurnStart=false
	
	this._dataRegime =  Data_Own.Regime;  // $gameParty._once
	this._NpcName= Data_Own.NpcName
	
	this._once= []
	 
name_NPCS=0//名人索引
name_NPC_Not = "----"//店家索引
	
};