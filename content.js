/*
 * Copyright 2017 zn. All rights reserved.
 * QQ:1490169
 * 
 * JavaScript - content
 * Version: 1.0
 */
console.log("enter content.js~~~~~~");
var kefuSJID, _openID;

$(document).ready(function(){

	var html = '<div class="tab_item">'
		   +'<span class="wait_item_icon " data-reactid=".0.5.0.0.1.0"></span>'
           +'<span style="font-size:10px">opID：</span>'
		   +'<span id="openidText" style="user-select:text;-webkit-user-select:text;font-size:10px"></span></div>';
	//在微信多客服的html页面添加html代码，用来显示用户的openID
	$('.tab').append(html);
	//监听background.js 发过来的2种消息：opneid直接显示，用户信息弹出对话框
	chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
		console.log(request);
		if (request.type == "userOpenID"){
			_openID = request.openID;
			$("#openidText").text(request.msgDetail+" : "+_openID);
		}
		else if (request.type == "userInfo"){
		    jAlert(request.msgDetail,{callback:function(ok){
  			   		if(ok){

  			   		}
  		    	}
  			});
		}

	});
	//设置点击事件，发到background去查询，否则有跨域的问题
	$("#openidText").on("click",function(){
		//getUserInfo();
		sendMsgToBack("giveMeTheUserInfo")
	});
	
	function sendMsgToBack(msg){
    	chrome.runtime.sendMessage(msg, function(response) {
    		if(response){
				
    		}

    	});
	}
});


