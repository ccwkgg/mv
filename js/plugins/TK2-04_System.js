/*
//1【旅店】【酒店】【马店】【米店】
//5 【商店】【南蛮】【教堂】【茶屋】
//9 【洋枪】【武馆】【神秘】【画舫】
//13【医院】【寺院】【官邸】【家里】
this.T(["文字"], 2);                                  setTalk                   
this.O("前缀","\\f[2]对吗？", ["是", "否"], [3,4]);   setOption
this.M([1,x,y],,d)                                    setMove
Utils.isMobileDevice();//手机
Utils.isAndroidChrome();//安卓
//console.group('第一层');
//console.log('文章');
//console.group('第二层');
//console.error('错误');
//console.warn('警告');
//console.info("信息")
//console.groupEnd();//层结束
//console.groupEnd();//	层结束
Game_Interpreter.prototype.updateWaitMode = function() {   等待时间
			//console.clear()
*/

/*统治这个国家的是%s。
%s的主公在%s城。
%s好像专长%s。
%s与%s的配合度好像是%s。
%s性格好像非常%s。
我觉得%s是最伟大的人。
见过叫做%s的%s吗？非常了不起。
如果有名刀%s在手，就不怕刺客袭击了。
为了获得与南蛮交易的利益，加入天主教的人也很多。
以后的时代，洋枪步兵将会被重视。
低价买米，高价卖出┅┅，有人因此成为富翁。
下雨天、下雪天洋枪一点用场也派不上了。
如果买军马，要找到行走各国的马贩子，旅店的客人会知道吧？
这里的军马10匹%u贯。
不会喝酒的人，不好办事。
平户的南蛮商人，好像是南蛮国贵族的儿子。
平户的南蛮商人，好像是海盗。*/

/*
这里只出产浊酒，一瓶1贯，要吗？
这里也有%s，一个%u贯，要哪个？

这里有个名叫%s的人，非常喜欢%s。
这个国有个名叫%s的武将，非常喜欢%s。
这个城里有个名叫%s的%s。
这里有%s，买回去当做礼物吧。*/
 
Scene_Map.prototype.updateRuns = function() {  // 冀中
//进城id

//进屋id
 
    //$gameVariables.setValue(21, 0);
	
	
	
	
	switch ($gameVariables.value(21)) {	
	case 0: this.update_Example(); 
	break;
	case 1: this.onRun_01(); 
	break;
	case 2: this.onRun_02(); 
	break;
	case 3: this.onRun_03(); 
	break;
	case 4: this.onRun_04(); 
	break;
	case 5: this.onRun_05(); 
	break;
	case 6: this.onRun_06(); 
	break;
	case 7: this.onRun_07(); 
	break;
	case 8: this.onRun_08(); 
	break;
	case 9: this.onRun_09(); 
	break;
	case 10: this.onRun_10(); 
	break;
	case 11: this.onRun_11(); 
	break;
	case 12: this.onRun_12(); 
	break;
	case 13: this.onRun_13(); 
	break;
	case 14: this.onRun_14(); 
	break;
	case 15: this.onRun_15(); 
	break;
	case 16: this.onRun_16(); 
	break;
	};
};
Scene_Map.prototype.onRun_01 = function() {
	console.log( "第 " +$gameParty._srpgTurnState+  " 步")
	//this.incomplete("")
	
	
	switch (this.to()) {		
	case 1: 
	//角色行走图
	$gamePlayer.setTransparent(true)
	 $gameMap.event(38).setDirection(8)//朝上
     $gameScreen.showPicture(10, "In_border01", 0, 0, 0,100, 100, 255, 0)
	$gameMap.event(38).setImage("Knight_Body01", 4)//行走图
	 this.M([[38,47,8]],18) ;
	//this._to(18);
	break;
	break;
	case 18: this.O2("\\f[2]一杯100文，来一杯吗？", [13,2]); break;
	case 2: this._to(20);break;
	case 13: this.O("\\f[2]欢迎光临。今天您来此有何贵干？", ["购买马匹", "帮手", "离开"], [15,16,17]); break;
	case 15: this.T(["11桶", "22桶桶", "33桶桶桶", "44桶桶桶桶", "55桶桶桶桶桶"], 2);  break;
	case 16: this.T(["111","=====此有何====此有何==========","111",], 2);  break;
	case 17: this.T(["222","欢迎光临333333333欢迎光临","111"], 2);  break;
	case 20:  name_NPC_Not = "酒馆女";this.T(["\\f[2]愿意的话，下次再来。","\\f[2]再见"], 21);break;
	case 21:  this.M([[38,47,11]],22) ;break;
	//
	//角色行走图
	//场景转移 记录
	case 22:  
   $gameMap.eraseEvent(38);// 删除事件
	//$gameMap.event(38).setImage("", 4)
   //$gameMap.event(38).setPosition(52, 8);//定位
   $gameScreen.erasePicture(10);
   $gamePlayer.setTransparent(false)
   this._to(100);
	break;
	};
};  // 【旅店】
Scene_Map.prototype.onRun_02 = function() {// 【酒店】
	switch (this.to()) {
	case 1: name_NPC_Not = "酒馆女";this.O2("\\f[2]一杯100文，来一杯吗？", [2,3]);break;
	case 2: this.T(["\\f[0]找个人聊聊┅┅"], 4 );break;
	case 3: this._to(20);break;
	case 4: this.O("", ["普通客人", "酒馆女侍", "买酒", "服药", "离开"], [5,6,7,8,9]);break;;break;
	case 5: name_NPC_Not = "客人";this.T(["\\f[2]平户的南蛮商人，好像是南蛮国贵族的儿子。", "\\f[2]不会喝酒的人，不好办事。", "\\f[2]我所知道的就这些。"], 4 );break;
	case 6: name_NPC_Not = "酒馆女";this.T([("\\f[2]这里有%1，买回去当做礼物吧。").format("铭酒"),], 4 );break;
	case 7: this.T(["\\f[0]想买些这里的酒当礼物┅┅"],10);break;
	case 8: this.T(["\\f[0]现在没有必要"],4);break;
	case 9: this._to(20);break;
	case 10: name_NPC_Not = "酒馆女";this.O("\\f[2]这里也有%s，一个%u贯，要哪个？", ["铭酒", "浊酒", "停止"], [11,12,4]); break 
	case 11: this.T(["道具未开发"],10);break;
	case 12: this.T(["道具未开发"],10);break;
	case 20: name_NPC_Not = "酒馆女";this.T(["\\f[2]愿意的话，下次再来。"], 100);break;
	};
};  
Scene_Map.prototype.onRun_03 = function() {this.incomplete("")};  // 【马店】
Scene_Map.prototype.onRun_04 = function() {this.incomplete("")};  // 【米店】
Scene_Map.prototype.onRun_05 = function() {this.incomplete("")};  // 【商店】
Scene_Map.prototype.onRun_06 = function() {this.incomplete("")};  // 【南蛮】
Scene_Map.prototype.onRun_07 = function() {this.incomplete("")};  // 【教堂】
Scene_Map.prototype.onRun_08 = function() {this.incomplete("")};  // 【茶屋】
Scene_Map.prototype.onRun_09 = function() {this.incomplete("")};  // 【洋枪】
Scene_Map.prototype.onRun_10 = function() {this.incomplete("")};  // 【武馆】
Scene_Map.prototype.onRun_11 = function() {this.incomplete("")};  // 【神秘】
Scene_Map.prototype.onRun_12 = function() {this.incomplete("")};  // 【画舫】
Scene_Map.prototype.onRun_13 = function() {this.incomplete("")};  // 【医院】
Scene_Map.prototype.onRun_14 = function() {this.incomplete("")};  // 【寺院】
Scene_Map.prototype.onRun_15 = function() {this.incomplete("")};  // 【官邸】
Scene_Map.prototype.onRun_16 = function() {this.incomplete("")};  // 【家里】

Scene_Map.prototype.onRun_call = function() {  // Hut  City
	switch (this.to()) {	
	case 1: this.T([this._Rand(10)], 100);break;
	case 2: ;break;
	};

};
Scene_Map.prototype.update_Example = function() {  // 示例
	if (Data_Own.Debug) console.log( "第 " +$gameParty._srpgTurnState+  " 步")
	switch (this.to()) {	
	case  1: this.T([" 桶狭间之战开战时，在京镇的街道上，有一位旅人病倒在街头。",//京镇
		"他得到好心百姓的救助，被送到神父、阿尔梅 伊达照料。",//名医、施药院全宗家中
		"接受治疗之后，身体迅速地恢复了。",
		("被问及姓名时，他回答道，我是%1┅┅。").format($gameActors.actor(1).name()),
		"接受治疗之后，身体迅速地恢复了。"], 13);  break;
	//case 2: this.M([[38,47,6]],3);  break;
	//case 3: this.M([[38,47,11]],13);  break;
	case 13: this.O("\\f[2]欢迎光临。今天您来此有何贵干？", ["购买马匹", "帮手", "离开"], [15,16,17]); break;
	case 15: this.T(["1桶", "22桶桶", "33桶桶桶", "44桶桶桶桶", "55桶桶桶桶桶"], 21);  break;
	case 16: this.T(["111","=====此有何====此有何==========","111",], 22);  break;
	case 17: this.T(["222","欢迎光临333333333欢迎光临","111"], 23);  break;
	case 21: this.T(["1京", "2京京", "33京京京", "44京京京京"], 24);break;
	case 22: this.C(20, 24);break;
	case 23: this.C(30, 24);break;
	case 24: this._to(100);break;
	case 25: break;
	};
};



			//----------------------------------------------------
				//var theResponse = prompt("请输入你的姓名","岛津义久");
				//if(theResponse===null){return}
				//if(theResponse==="姓名"){return}
				//$.toaster({ message : ("武士："+theResponse+" 在小仓镇出现！")} );
//===================================================================
TK2_Window_Base.prototype.debugging1 = function() {//测试
			var event = $gameMap.srpgCityUnits()
			var setName = [],e = 0;
			var setName_2 = [],e_2 = 0;
	        for (var i = 0; i < event.length; i++) {
			 if (event[i].note().contains("city")){
			    setName[e]=event[i]._displayOverheadName +" ID:"+ event[i].eventId() +" XY:"+ event[i].x + "-" + event[i].y +"  "
				e++;}
			 if (event[i].note().contains("Town")){
			    setName_2[e_2]=event[i]._displayOverheadName +" ID:"+ event[i].eventId() +" XY:"+ event[i].x + "-" + event[i].y +"  "
				e_2++;}
	       	};
console.log("【城池】");
console.log(setName);
console.log();
console.log($gameMap.event(8));
$gameMap.event(8)._displayOverheadName="【城池】"
};

/*
console.log($gameMap.srpgCityUnits()[1].eventId());
 console.log($gameMap.event(7));
//Game_Event
//length x y
//name()
//eventId()
[图像]
mapId: 1
eventId: 7
characterName: "$City_02"
pattern: 1    花样
direction: 2         方向
[自主移动]
类型: moveType: 0    
速度: moveSpeed: 3 
频率: moveFrequency: 3 
[选项]
行走     walkAnime: false   
踏步     stepAnime: false   
方向固定 directionFix: true 
穿过     through: false     
[优先级] priorityType: 1 
[触发器] trigger: 0
*/

//Game_Event.prototype.name = function() {              // 名称释义
 //   return $dataMap.events[this._eventId].name;
//};
//Game_Event.prototype.note = function() {              // 注释释义
//    return $dataMap.events[this._eventId].note;
//};

//Game_Map.prototype.srpgCityUnits = function() {城市单位
//	return this.events().filter(function(event) {
//		//$dataMap.events[this._eventId].note
//		return event.event()
//		}
//	)
//};


//Window_Base.prototype.itemFilterStage123 = function(item, life,index, data ) {
	//条件中的镇
//	var commands=item
//	var setName = [],e = 0;
//	for (var i = 0; i < commands.length; i++) {
//		if (commands[i][10] === life && commands[i][index]===data){
//			setName[e] = commands[i]; e++;
//		}; 
//	};return setName
//};
//Window_Base.prototype.draweeeeItem = function() {
//	this.allFaces(150, 40, 184);
//};
	//$.toaster({message: "opacity",color: 'red'})
//alone
//multi 
//dual
//Window_Message.prototype.updatePlacement = function() {
 //   this._positionType = $gameMessage.positionType();
  //  this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
  //  this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
    //this.x = this._positionType * (Graphics.boxWidth - this.width) / 2;//
   // this.width = Graphics.boxWidth
	//if (this._positionType===1){
	//this.width=16*20+36//
   // this.x = (Graphics.boxWidth - this.width) / 2;//
	//}
//};
//drawDeploy = function(actor) {//兵力部署


//TK2_Scene_Map_updateMain  = Scene_Map.prototype.updateMain
//Scene_Map.prototype.updateMain = function()  {
    // TK2_Scene_Map_updateMain.call(this);
    //this._menuWindow.update();
//};



//	if (this._commands==="主角"){
//		var leadingMan= $gameParty._partyID
	//	var commands=$gameParty._dataHero//筛选 出场势力武将
//		var setName = []//e = 0;
//		for (var i = 0; i < commands.length; i++) {
	//		if (commands[i][2] === leadingMan){
	//			setName = commands[i];// e++;
	//		}; 
	//	};
	//	var CommandWindow = setName
	//	this.drawMan(setName)
	//}