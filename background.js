/*
 * Copyright 2017 zn. All rights reserved.
 * QQ:1490169
 * 
 * JavaScript - background
 * Version: 1.0
 */
console.log("enter background.js~~~~~~~~~");
var kfsjid;
var _openID;
var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad="=";
//监听微信多客服的POST请求，获取到以后，传到content.js,方便客服使用。
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
  	console.log(JSON.stringify(details));
  	if (details.method == "POST"){
  		if (details.requestBody.formData.fans_openid && details.requestBody.formData.content){
  			//Sand openID and content to content.js
  			console.log(details.requestBody.formData.fans_openid +"~~~~"+details.requestBody.formData.content);
  			//客服随机ID 是用来做接口校验使用，可以忽略，或者加上自己公司的处理方式
  			kfsjid = window.localStorage.getItem("kfsjid");
  			console.log('客服随机ID：'+kfsjid );
  			_openID = details.requestBody.formData.fans_openid;
  			var msg = {
            	type: "userOpenID",
            	openID : details.requestBody.formData.fans_openid,
            	msgDetail: details.requestBody.formData.content
        	};
			sendMessageToContent(msg);
  		}
  	}
  },
  {
  	urls: ["https://mpkf.weixin.qq.com/cgi-bin/*"],
  },
  ["requestBody"]
);

//发消息到content.js
function sendMessageToContent(msg){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		if (tabs){
    		chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
        		console.log(response);
    		});
    	}
	});
}
//监听content.js的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log(request);
    if(request == "giveMeTheUserInfo"){
    	getUserInfo(sendResponse);
    }
});


function httpRequest(url,param,callback){  
    var xhr = new XMLHttpRequest();  
    xhr.open("POST", url, true);  
        // 设置POST请求的请求头  
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
    xhr.onreadystatechange = function() {   
        callback(xhr.responseText);  
    }; 
    var keyArr = [];
    var paramString = "";
    
    for(var i in param){ 
		keyArr.push(i);
	}
	
	for(var i=0;i<keyArr.length;i++){
		if(param[keyArr[i]] != undefined){
			paramString = paramString + keyArr[i] +"=" +param[keyArr[i]];
			if (i < keyArr.length - 1)
				paramString +="&";
		}
	}
    xhr.send(paramString); 
} 

//you can call interface here: 调用内部的CRM接口或者获取用户信息的接口，或得信息后发送到content.js
function getUserInfo(sendResponse){
	var userInfoStr = ""; 
    //需要调用的接口URL，与manifest里的对接的URL要能对应上！！！
    var url = "http://xxxx.yourCompanyLinkHere.cn/admin/webservice/getUserInfo.do";
    //接口参数here：
    var params = {
    	foo: str2b64(kfsjid),  //接口校验使用，可忽略
    	openID: _openID, //用户的openID，重要，理论上用户在系统注册或者关注公众号时，应该保存下来，注册的时候需要与手机号等用户标示绑定。
    }
	httpRequest(url,params,function(data){
		if(data.length <=0){
			return;
		}
		var resp = JSON.parse(data);
		var obj = resp.obj;
		if (resp.errorCode == 0) {  
            userInfoStr = '<div style="background:#000;color:#FFF;padding:1rem;"><p>客服随机码(注意每天输入正确！)：'+ kfsjid+"</p><p>注意：用户数据取的是最近一次沟通过的用户！！！！，切换用户后需要先发消息再点击</p>"
                         +"<p>手机号："+obj.phoneno+"</p><p>用户状态："+obj.cStatus
                         +"</p><p>基站："+obj.stationName+"</p><p>注册时间："+obj.registertime
                         +"</p><p>用户类型："+obj.customerType+"</p><p>地址："+obj.address
                         +"</p><p>收："+obj.recycletimes+"次；商："+obj.ordertimes+"次</p></div>";
        }
        else{
        	userInfoStr = resp.msg+' <p style="background:#000; color:#FFF">提示：请检查客服随机码正确，并保证网络连接正常～～～</p>';
        }
        var msg = {
            	type: "userInfo",
            	msgDetail: userInfoStr
        	};
		sendMessageToContent(msg);
	});
	
}
//如果传参的时候需要base64，不用可忽略
function str2b64(str) {
	var out, i, len;
	var c1, c2, c3;
	len = str.length;
	i = 0;
	out = "";
	while(i < len) {
		 c1 = str.charCodeAt(i++) & 0xff;
		 if(i == len)
		 {
		 out += b64map.charAt(c1 >> 2);
		 out += b64map.charAt((c1 & 0x3) << 4);
		 out += "==";
		 break;
		 }
		 c2 = str.charCodeAt(i++);
		 if(i == len)
		 {
			 out += b64map.charAt(c1 >> 2);
		 out += b64map.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
		 out += b64map.charAt((c2 & 0xF) << 2);
		 out += "=";
		 break;
		 }
		 c3 = str.charCodeAt(i++);
		 out += b64map.charAt(c1 >> 2);
		 out += b64map.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
		 out += b64map.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
		 out += b64map.charAt(c3 & 0x3F);
	}
	return out;
}
