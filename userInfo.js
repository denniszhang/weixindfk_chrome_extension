/*
 * Copyright 2017 zn. All rights reserved.
 * QQ:1490169
 * 
 * JavaScript - userinfo
 * Version: 1.0
 */
console.log("enter userinfo js~~~~~");

$(document).ready(function(){
	if(window.localStorage){
    	console.log('你的浏览器支持localStorage!');
	}else{
    	console.log('浏览器不支持localStorage!');
	}
    var details = chrome.app.getDetails();
    var html = "<p><img src='"+details.browser_action.default_icon+"'></p>"+
            "<h2>"+details.name+"</h2>"+
            "<p>版本:v"+details.version+"</p>"+
            "<p>作者:zn</p>"+
            "<p>@copyright 2017, QQ:1490169</p>";
    $(".mainDiv").append(html);
    
	var kfsjid = window.localStorage.getItem("kfsjid");
	console.log('客服随机ID：'+kfsjid );
	if(kfsjid){
		$(".kfsjid").attr("value", kfsjid);
	}
    
    $("#kfsjidConfirm").on("click",function(){
    	console.log('客服随机ID保存～～：' + $(".kfsjid").attr("value"));
		window.localStorage.setItem("kfsjid", $(".kfsjid").attr("value") ); //设置一个键值
	});
});



