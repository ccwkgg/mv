 /*:
 * @plugindesc |          | v1.02 自制剧本系统
 * @author TK2 太阁2风格 剧本类
 
 * @param EnableCancelB
 * @desc 启动加载功能true/ false
 * @default true
 
 * @help　　

 */
 Data_Own.is_test = true// || false   //
 
//==================================================================================
// ██ Campaign
//----------------------------------------------------------------------------------
//    剧本编辑器
//==================================================================================
Data_Own.Debug=false//true/false
Data_Own.temp=0
Data_Own.Count=0//等待
Data_Own.Load=0//测试网络
Data_Own.tempChoices=["大名","宿老"];
Data_Own.tempIndex = -1//脚本临时索引
Data_Own.tempText="123"//脚本临时文字
Data_Own.storyText=false
Data_Own.storyType=""//"图文"//"选项"//"是否"
Data_Own.storyDual=false//true/false
Data_Own.storyOpt=false//true/false
Data_Own._stayCount=0
Data_Own.storyChoices=[];
//==================================================================================
// ██ 定义插件指令
//var march=0
// 剧本编辑器
Game_Map.prototype.isSrpgUnitMoving = function() {                          // 返回移动中的战棋单元是否存在
	return this.events().some(function(event) {
		return event.isMoveRouteForcing();
    });
};
Game_Map.prototype.isSrpgUnitAnimationPlaying = function() {                // 返回动画显示中的战棋单元是否存在
	return this.events().some(function(event) {
		return event.isAnimationPlaying();
	});
 };
Game_Map.prototype.updateStory = function() { // 打开剧情
	$gameParty.onSrpgTurnStart=true
};
var once = 0


Scene_Map.prototype.updateIncident = function() {
	if ($gameParty._once=== true){$gameParty._once = 1;

	
	
   if($gameParty._dataDate[2]===1){ 
	
	if($gameParty._dataDate[1]===1){ 
		$.toaster({ message : ( $gameParty._dataDate[1]+"月 新年好")})
	}else{
		$.toaster({ message : ( $gameParty._dataDate[1]+"月 开会")})
	};
	};
	
	 
   if($gameParty._dataDate[2]===29 && $gameParty._dataDate[1]===2){ 
	$.toaster({ message : ("今天是闰年 2月29号")})
	};
	
   if($gameParty._dataDate[2]===1 && $gameParty._dataDate[1]===5){ 
	$.toaster({ message : ("今天是劳动节")})
	};
   if($gameParty._dataDate[2]===1 && $gameParty._dataDate[1]===5){ 
	$.toaster({ message : ("今天是儿童节")})
	};
   if($gameParty._dataDate[2]===8 && $gameParty._dataDate[1]===3){ 
	$.toaster({ message : ("今天是妇女节")})
	};
   if($gameParty._dataDate[2]===7 && $gameParty._dataDate[1]===7){ 
	$.toaster({ message : ("今天是情人节")})
	};
   if($gameParty._dataDate[2]===1 && $gameParty._dataDate[1]===10){ 
	$.toaster({ message : ("今天是国庆节")})
	};
   if($gameParty._dataDate[2]===3 && $gameParty._dataDate[1]===3){ 
	$.toaster({ message : ("3月3 ")})
	};
   if($gameParty._dataDate[2]===9 && $gameParty._dataDate[1]===9){ 
	$.toaster({ message : ("9月9 ")})
	};
		
	switch ($gameParty._dataDate[1]) {
	case 1:   
	break;
	case 2: 
	break;
	case 3:
	break;
	case 0:  
	break;
	};
	
};
};
//===================================================================
Scene_Map.prototype.updateMain_TK2_Alias = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
	this.updateMain_TK2_Alias.call(this);
	
	if ($gameMap.mapId()!==1){
		this.updateIncident()
	this.onInfoOk();    // 剧本信息窗 确认键
	this.CampaignTurn();// 剧本回合
	}
}   
Scene_Map.prototype.CampaignTurn = function() {// 设置剧本 移动

	if ($gameParty.onSrpgTurnStart===true){
	//剧情情况
	if (this.isSrpgWait()) {
		this.updateSrpgWait();// 等待更新
		if (Data_Own.Debug)console.log( "计时器(20) -- ")
	} else if ($gameParty._srpgTurnState<=0) {
		if (Data_Own.Debug)console.log("%c调试版面！","color: red; font-size: 20px; margin-left:12em"); 
			$gameParty._srpgTurnState = 1
		} else {
			this.updateSrpgEnemyTurn();       // 敌人回合的更新   right
			switch ($gameParty._srpgTurnState) {//结束封包			  
			case 100:   //
				$gamePlayer.requestAnimation(2)
				this.setSrpgWait('normal',  4);
				//this.setSrpgWait('animation');
				$gameParty._srpgTurnState = 101;
			break;
			case 101:   // 
				//console.log( "本段结束"); // 
				if (Data_Own.Debug)$.toaster({ message : ("本段结束")});
				$gameParty._srpgTurnState = 0;
				$gameParty.onSrpgTurnStart = false;
				//Data_Own.Load=0//网络
			break;
			};  
        }
	}

} 
Scene_Map.prototype.setSrpgWait = function(waitType, waitCount) {  // 共同：设置等待
	this._srpgWaitType = waitType;
	this._srpgWaitCount = waitCount;
};
Scene_Map.prototype.isSrpgWait = function() {            // 全局：是等待
	return this._srpgWaitType != null;
}; 
Scene_Map.prototype.clearSrpgWait = function() {         // 全局：清除等待
	this._srpgWaitType = null;
	this._srpgWaitCount = 0;
};
Scene_Map.prototype.updateSrpgWait = function() {        // 全局：战场等待更新
	if (this._srpgWaitType === 'normal') {
		this._srpgWaitCount--;
		if (this._srpgWaitCount <= 0) this.clearSrpgWait();
	} else if (this._srpgWaitType === 'route') {
		if (!$gameMap.isSrpgUnitMoving()) this.clearSrpgWait();
	} else if (this._srpgWaitType === 'animation') {
		if (!$gameMap.isSrpgUnitAnimationPlaying()) this.clearSrpgWait();
	}
};
Scene_Map.prototype.isMapTouchOk = function() {//移动允许
	return this.isActive() && $gamePlayer.canMove() && $gameParty._srpgTurnState<=0
};
Scene_Map.prototype.M = function(eventIdxy,to) {// 设置剧本 移动
	if (!eventIdxy) { //|| eventIdxy!==Array() 
		$gameParty._srpgTurnState = 100
		return alert('路线设置不正确')}//修正
	switch ($gameParty._choicesProcess)  {
	case 0:	
		this.Idxy=eventIdxy
		for (var i = 0; i < this.Idxy.length; i++) {
			$gameMap._events[eventIdxy[i][0]].moveStraight(
			$gameMap._events[eventIdxy[i][0]].findDirectionTo(eventIdxy[i][1], eventIdxy[i][2]));
		}
		this.setSrpgWait('normal',  14);
		$gameParty._choicesProcess = 1
		break;
	case 1: 
	var j=0
		this.Idxy=eventIdxy
		$gameParty._choicesProcess = 0
		 for (var i = 0; i < this.Idxy.length; i++) {
			if ($gameMap._events[eventIdxy[i][0]].x===eventIdxy[i][1] && 
			$gameMap._events[eventIdxy[i][0]].y===eventIdxy[i][2]){
				j++
			}
		}
		if (j===this.Idxy.length){
			if (Data_Own.Debug)$.toaster({ message : (j)});
			this.setSrpgWait('normal',  4);
		 	$gameParty._choicesProcess = 2
		}
	 	break;
	case  2: 
		//$gameMap.event(37).setPosition(46, 4);
		//$gameMap.event(38).setPosition(47, 7); 
		$gameParty._choicesProcess = 0
		$gameParty._srpgTurnState = to
		break;
	}
}
Scene_Map.prototype.C = function(count, to) {   // 设置剧本 等待
	Data_Own.Count++
	if (Data_Own.Debug){console.log( "-- 等待 -- ")}
	if(Data_Own.Count>=count){
		Data_Own.Count=0
		return $gameParty._srpgTurnState = to 
	}
}
Scene_Map.prototype.to = function() {         // 定义进程
return $gameParty._srpgTurnState
}
Scene_Map.prototype._to = function(n) {       // 设置进程
	 if(n===undefined){return}
return $gameParty._srpgTurnState=n
}
Scene_Map.prototype._Rand = function(n) {     // 随机数
	return  Math.floor(Math.random() * n+1).toString()    //String($gameVariables.value(21))  
};
Scene_Map.prototype.updateSrpgEnemyTurn = function() { // 回合
        this.updateRuns()//本地js
};
Scene_Map.prototype.incomplete = function(n) {         // 有待开发 修正

var Hut=["【旅店】","【酒店】","【马店】","【米店】",//1
"【商店】","【南蛮】","【教堂】","【茶屋】",//5 
"【洋枪】","【武馆】","【神秘】","【画舫】",//9 
"【医院】","【寺院】","【官邸】","【家里】"]//13 
	switch (this.to()) {	
	case 1: $.toaster({ message : ( "程序："+Hut[$gameVariables.value(21)]+" 有待开发...")}); this._to(100); break;
	case 2: ;break;
	};
};

//==================================================================================
// ██ TK2_Scene_MapStory
//----------------------------------------------------------------------------------
//    文章 窗口
//==================================================================================
function Window_Story() {
    this.initialize.apply(this, arguments);
}
Window_Story.prototype = Object.create(Window_Selectable.prototype);
Window_Story.prototype.constructor = Window_Story;
Window_Story.prototype.initialize = function() {
	var width = Graphics.boxWidth;
	var height = Graphics.boxHeight;
	Window_Selectable.prototype.initialize.call(this, 0, 60, 400, 160);
	this.refresh();
	this.activate();
};
Window_Story.prototype.setActor = function(actor) {
	if (this._actor !== actor) {
		this._actor = actor;
		this.refresh();
	}
};
Window_Story.prototype.refresh = function() {
	this.contents.clear();
    if (this._actor) {
    	this.drawTextEx(this._actor, this.textPadding(), 0);
    }
};
Window_Story.prototype.processNormalCharacter = function(textState) {//信息窗 换行
    Window_Base.prototype.processNormalCharacter.call(this,textState);
};
TK2_Window_Normal.prototype.processNormalCharacter = function(textState) {//通用窗 换行
    Window_Base.prototype.processNormalCharacter.call(this,textState);
};

Scene_Map.prototype.T = function(text, to) {         // 调用 文章
	if (Data_Own.tempIndex=== -1){
		this._commandWindow = new Window_Story();
		this.addWindow(this._commandWindow);
		if (text!==[]){
			Data_Own._stayCount++;
			Data_Own.storyType="图文";
			Data_Own.tempChoices=text;
			Data_Own.tempIndex=to;
    		this._commandWindow.setActor(Data_Own.tempChoices[Data_Own.Count]);//更新
		}
	}
}
Scene_Map.prototype.O = function(text, choices,to) { // 调用 选项	
	if (Data_Own.tempIndex=== -1){
		Data_Own.storyChoices=to
		Data_Own.storyType="选项"
		Data_Own.tempChoices=choices
		var header=text
		Data_Own.tempText  =""
		if (Data_Own.tempText !==""){
			Data_Own.tempText=text;
    		this._nameWindow = new Window_Story();
    		this._nameWindow.x = 0;
    		this._nameWindow.y = Graphics.boxHeight-this._nameWindow.height;
   			this._nameWindow.setActor(text);//更新
    		this.addWindow(this._nameWindow);
		}
		var commandWindow=choices
		this._1commandWindow = new TK2_Window_Command(0, 0,commandWindow, -1);
		this._1commandWindow.setHandler('ok', this.onMultiOk.bind(this));
		this._1commandWindow.x =Graphics.boxWidth-this._1commandWindow.width;
		this._1commandWindow.y =(Graphics.boxHeight-this._1commandWindow.height-200)
		this.addWindow(this._1commandWindow);
		Data_Own.tempIndex=0;
	}
}
Scene_Map.prototype.O2 = function(text,to) {         // 调用 是否
	if (Data_Own.tempIndex=== -1){
		Data_Own.storyType="Dual";
		Data_Own.storyChoices=to;
		this._commandWindowO2 = new TK2_Window_Normal(100,20, "Dual",text,360,128);
		this._commandWindowO2.setHandler('ok',     this.onWhetherOk.bind(this));
		this._commandWindowO2.setHandler('cancel', this.onWhetherCancel.bind(this));
		this.addWindow(this._commandWindowO2);
		Data_Own.storyChoices;
		Data_Own.tempIndex=0;
	}
}
Scene_Map.prototype.onWhetherOk = function() {    // 是键
	$gameParty._srpgTurnState =Data_Own.storyChoices[0];
	this._commandWindowO2.close(); 
	Data_Own.tempIndex =-1;
	Data_Own.storyType="";
};
Scene_Map.prototype.onWhetherCancel = function() {// 否键
	$gameParty._srpgTurnState =Data_Own.storyChoices[1]
	this._commandWindowO2.close(); 
	Data_Own.tempIndex =-1;
	Data_Own.storyType="";
};
Scene_Map.prototype.onMultiOk = function() {      // 选项确认键
	this._1commandWindow.deactivate();
	var indexCommand = this._1commandWindow._commands[this._1commandWindow.index()];
	Data_Own.tempIndex=this._1commandWindow.index();
	this._1commandWindow.activate();
	if (Data_Own.tempText !==""){
		this._nameWindow.close();
	}
	this._1commandWindow.close();
	$gameParty._srpgTurnState =Data_Own.storyChoices[this._1commandWindow.index()];
	Data_Own.tempIndex =-1;
	Data_Own.storyType="";
};





Scene_Map.prototype.updateDate = function(n) {   
n = n|| ""
	switch (n) {
	case "":   
	$gameParty._dataDate[2]+=1//第二天
	break;
	case "Month":  
	$gameParty._dataDate[1]+=1//下一月
	$gameParty._dataDate[2]=1// 
	break; 
	case "Year":
	$gameParty._dataDate[0]+=1//下一年
	$gameParty._dataDate[1]=1 
	$gameParty._dataDate[2]=1 
	break;   
      }           
                //

		if($gameParty._dataDate[2] > $gameParty._dataDate[3]){//日子上限
		if($gameParty._dataDate[1]>=12){//月份上限   跨年
			$gameParty._dataDate[2]=1;
			$gameParty._dataDate[1]=1;
			$gameParty._dataDate[0]+=1;//下一年
        }else {
			
			$gameParty._dataDate[2]=1
			$gameParty._dataDate[1]+=1;//下一月
		}
		}else if($gameParty._dataDate[1]>12){//月份上限   跨年
			$gameParty._dataDate[2]=1;
			$gameParty._dataDate[1]=1;
			$gameParty._dataDate[0]+=1;//下一年
        }
		var month= ($gameParty._dataDate[1]);
		if(month === 1||month === 3||month === 5||month === 7||month === 8||month === 10||month === 12){
			$gameParty._dataDate[3]=31;//大月
		} else{ 
			if($gameParty._dataDate[1] == 2){ 
				if($gameParty._dataDate[0] % 4 == 0 && $gameParty._dataDate[0] % 100 != 0 || $gameParty._dataDate[0] % 400 == 0){
					$gameParty._dataDate[3]=29;//闰年
				}else{
					$gameParty._dataDate[3]=28;//平年
				}
			}else{ 
				$gameParty._dataDate[3]=30;//小月
			} 
		}
		
		
		
		
		
		
		
 $gameParty._once = true
	this._dateWindow.refresh() 
		//$.toaster({ message : ($gameParty._dataDate[3] - $gameParty._dataDate[2])})
};

Scene_Map.prototype.onInfoOk = function() {       // 信息确认键


	if (Data_Own.storyType==="" ) {// 测试日期   移动  熵增时间 && $gamePlayer.isMoving()
		if (Data_Own._stayCount>=30){Data_Own._stayCount=0};
			if (Data_Own._stayCount>0 ){
				Data_Own._stayCount++;
			}
			//if (TouchInput.isTriggered()) {
			if (Data_Own._stayCount===0){
                this.updateDate()  //"Month"    "Year"
                Data_Own._stayCount++;
			}
} 
	if (Data_Own.storyType==="图文") {// 显示图文  临时
		if (Data_Own._stayCount >= 8){Data_Own._stayCount=0};
			if (Data_Own._stayCount>0 ){
				Data_Own._stayCount++;
				console.log(Data_Own._stayCount);
			}
			if (TouchInput.isTriggered()) {
				if (Data_Own._stayCount===0){
					if(Data_Own.Count>=Data_Own.tempChoices.length-1){
						$gameParty._srpgTurnState = Data_Own.tempIndex;
						this._commandWindow.close();
						Data_Own.tempChoices=[];
						Data_Own.tempIndex =-1;
						Data_Own.Count=0;
						Data_Own.storyType="";//"图文"//"选项"//"是否"
					}else{
						Data_Own.Count++;
				}
    			this._commandWindow.setActor(Data_Own.tempChoices[Data_Own.Count]);//更新
				Data_Own._stayCount++;
			}
		}
	}
};