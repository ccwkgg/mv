//=============================================================================
// ██ ★☆main.js (插件管理器)各种定义结束后，从这里开始实际运行。
//=============================================================================
// 等待加载PhoneGap  Cordova返回键退出程序
document.addEventListener("deviceready", onDeviceReady, false); //设备物理键
function onDeviceReady() {
//按钮事件
document.addEventListener("backbutton", eventBackButton, false); //返回键
//document.addEventListener("menubutton", eventMenuButton, false);     //菜单键
//document.addEventListener("searchbutton", eventSearchButton, false); //搜索键
// 信息框
//   $.toaster({ message : ('测试 '} );
//   if(confirm('确认吗？')){} 
//   alert('提示: ');    true/ false
//	 var theResponse = prompt("请输入你的姓名","姓名"); alert(theResponse) //输入框
}
//返回键

function eventBackButton(){
 	$.alerts = {
		alert: function(title, message, callback) {  
		if( title == null ) title = 'Alert';  
			$.alerts._show(title, message, null, 'alert', function(result) {  
				if( callback ) callback(result);  
			});  
		},  
		confirm: function(title, message, callback) {  
			if( title == null ) title = 'Confirm';  
			$.alerts._show(title, message, null, 'confirm', function(result) {  
				if( callback ) callback(result);  
            });  
		},  
		_show: function(title, msg, value, type, callback) {  
			var _html = "";
			_html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' + title + '</span>';  
			_html += '<div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';  
			if (type == "alert") {  
                      _html += '<input id="mb_btn_ok" type="button" value="确定" />';  
			}  
			if (type == "confirm") {  
                      _html += '<input id="mb_btn_ok" type="button" value="" />'; // 确定
                      _html += '<input id="mb_btn_no" type="button" value="" />'; // 取消
			}  
			_html += '</div></div>';
			//必?先?_html添加到body，再?置Css?式  
			$("body").append(_html); GenerateCss(); 
			switch( type ) {  
			case 'alert':
                    $("#mb_btn_ok").click( function() {  
                        $.alerts._hide();  
                        callback(true);  
                    });  
                    $("#mb_btn_ok").focus().keypress( function(e) {  
                        if( e.keyCode == 13 || e.keyCode == 27 ) {$("#mb_btn_ok").trigger('click')};  
                    });  
			break;  
			case 'confirm':
				$("#mb_btn_ok").click( function() {  
					$.alerts._hide();  
					if( callback ) {callback(true)};  
				});  
				$("#mb_btn_no").click( function() {  
					$.alerts._hide();  
					if( callback ) {callback(false)};  
				});  
				$("#mb_btn_no").focus();  
				$("#mb_btn_ok, #mb_btn_no").keypress( function(e) {  
					if( e.keyCode == 13 ) {$("#mb_btn_ok").trigger('click')};  
					if( e.keyCode == 27 ) {$("#mb_btn_no").trigger('click')};  
				});  
			break;
			}  
		},  
		_hide: function() {  
			$("#mb_box,#mb_con").remove();  
		}  
	}  
    // Shortuct functions  
	myAlert = function(title, message, callback) {  
        $.alerts.alert(title, message, callback);  
    }  
	myConfirm = function(title, message, callback) {  
		$.alerts.confirm(title, message, callback);  
	}; 
	//生成Css  
  var GenerateCss = function () {  
   // 按钮画布
    $("#mb_box").css({// width: '100%', height: '100%', zIndex: '2', position: 'fixed',  
     // filter: 'Alpha(opacity=60)', 
	 // backgroundColor: 'black',
	 // top: '0', left: '0', 
	  //opacity: '0.6'  
     // backgroundColor: 'red'    //260 101     300 101
    });  
    // 背景画布
    $("#mb_con").css({ zIndex: '3', width: '360px',height:'128px', position: 'fixed',  
      backgroundColor: 'White',
	  backgroundImage: 'url(img/system/Confirm.png) ', 
    });  
   // 标题画布
    $("#mb_tit").css({ fontSize: '20px', color: 'White',textAlign:'center', display: 'block', padding: '10px',top:'6px'//   
     // backgroundColor: 'red',// backgroundColor: 'red',   //borderRadius: '15px 15px 0 0',
     // fontWeight: 'bold'  
    });  
   // 详情画布
    $("#mb_msg").css({ padding: '10px', lineHeight: '6px', margin: '10px',  top:'-16px',
      fontSize: '20px' ,color:'White' ,// backgroundColor: 'blue' 
 
	  
    });  
    
    $("#mb_btnbox").css({ position:'relative' ,  top:'-6px',  left: '-18px',textAlign: 'right'   });  
    $("#mb_btn_ok,#mb_btn_no").css({ width: '32px', height: '24px',  backgroundColor: 'transparent', border: 'none'//, color: 'white'
	});  //, borderRadius:'4px', border: 'none', textAlign: 'center',backgroundColor: 'White'
   // $("#mb_btn_no").css({ filter: 'Alpha(opacity=60) ' });  
    $("#mb_btn_ok").css({  marginRight: '8px'  });  
   
    var _widht = document.documentElement.clientWidth; //屏幕长度
    var _height = document.documentElement.clientHeight; //屏幕度 
    var boxWidth = $("#mb_con").width();  
    var boxHeight = $("#mb_con").height();
    //提示框居中  
    $("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });  
  }  
  
  		myConfirm('§ 近侍 §','您要刷新游戏吗?',
		function(r){
			if(r){
			this.myAlert($gameParty.leader().name(),"离开离开",function(
			){
				location.reload()
			});
			 }else{}
			//this.myAlert($gameParty.leader().name(),"还带一会",function(
			//){});  
			// }
		});
}
//===========================================================================
PluginManager.setup($plugins);
window.onload = function() {
	SceneManager.run(Scene_Boot);
	console.time("开启测速");
};
