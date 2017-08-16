(function(A){A.alerts={verticalOffset:-25,horizontalOffset:0,repositionOnResize:true,overlayOpacity:0.6,overlayColor:"#666",draggable:false,okButton:"&nbsp;确定&nbsp;",cancelButton:"&nbsp;取消&nbsp;",dialogClass:null,alert:function(C,B){A.alerts._show(C,B,"alert")},confirm:function(C,B){A.alerts._show(C,B,"confirm")},prompt:function(C,B){A.alerts._show(C,B,"prompt")},_show:function(F,E,B){E=E||{};A.alerts._hide();A.alerts._overlay("show");A("BODY").prepend('<div id="popup_container">'+(E.title?'<h1 id="popup_title"></h1>':"")+'<div id="popup_content"'+(E.showIcon?'class="icon"':"")+'><div id="popup_message"></div></div></div>');if(E.dialogClass){A("#popup_container").addClass(E.dialogClass)}if(A.alerts.dialogClass){A("#popup_container").addClass(A.alerts.dialogClass)}var D=("undefined"==typeof(document.body.style.maxHeight))?"absolute":"fixed";A("#popup_container").css({position:D,zIndex:99999,padding:0,margin:0});E.title&&A("#popup_title").text(E.title);A("#popup_content").addClass(B);A("#popup_message").html(F.replace(/\n/g,"<br />"));switch(B){case"alert":A("#popup_message").after('<div id="popup_panel"><input type="button" value="'+(E.okButton||A.alerts.okButton)+'" id="popup_ok" /></div>');A("#popup_ok").click(function(){A.alerts._hide();E.callback&&E.callback(true)});A("#popup_ok").focus().keypress(function(G){if(G.keyCode==13||G.keyCode==27){A("#popup_ok").trigger("click")}});break;case"confirm":A("#popup_message").after('<div id="popup_panel"><input type="button" value="'+(E.cancelButton||A.alerts.cancelButton)+'" id="popup_cancel" /><input type="button" value="'+(E.okButton||A.alerts.okButton)+'" id="popup_ok" /></div>');A("#popup_ok").click(function(){A.alerts._hide();E.callback&&E.callback(true)});A("#popup_cancel").click(function(){A.alerts._hide();E.callback&&E.callback(false)});A("#popup_ok").focus();A("#popup_ok, #popup_cancel").keypress(function(G){if(G.keyCode==13){A("#popup_ok").trigger("click")}if(G.keyCode==27){A("#popup_cancel").trigger("click")}});break;case"prompt":A("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="'+(E.cancelButton||A.alerts.cancelButton)+'" id="popup_cancel" /> <input type="button" value="'+(E.okButton||A.alerts.okButton)+'" id="popup_ok" /></div>');A("#popup_prompt").width(A("#popup_message").width());A("#popup_ok").click(function(){var G=A("#popup_prompt").val();A.alerts._hide();E.callback&&E.callback(G)});A("#popup_cancel").click(function(){A.alerts._hide();E.callback&&E.callback(null)});A("#popup_prompt, #popup_ok, #popup_cancel").keypress(function(G){if(G.keyCode==13){A("#popup_ok").trigger("click")}if(G.keyCode==27){A("#popup_cancel").trigger("click")}});if(E.value){A("#popup_prompt").val(E.value)}A("#popup_prompt").focus().select();break}A.alerts._reposition();A.alerts._maintainPosition(true);if(A.alerts.draggable){try{A("#popup_container").draggable({handle:A("#popup_title")});A("#popup_title").css({cursor:"move"})}catch(C){}}},_hide:function(){A("#popup_container").remove();A.alerts._overlay("hide");A.alerts._maintainPosition(false)},_overlay:function(C){switch(C){case"show":A.alerts._overlay("hide");A("BODY").prepend('<div id="popup_overlay"></div>');var B=A(window).height();A("#popup_overlay").css({position:"fixed",zIndex:99998,top:"0px",left:"0px",width:"100%",height:B+"px",background:A.alerts.overlayColor,opacity:A.alerts.overlayOpacity});break;case"hide":A("#popup_overlay").remove();break}},_reposition:function(){var C=((A(window).height()/2)-(A("#popup_container").height()/2))+A.alerts.verticalOffset;var B=((A(window).width()/2)-(A("#popup_container").width()/2))+A.alerts.horizontalOffset;if(C<0){C=0}if(B<0){B=0}if("undefined"==typeof(document.body.style.maxHeight)){C=C+A(window).scrollTop()}A("#popup_container").css({top:C+"px",left:B+"px"});A("#popup_overlay").height(A(window).height())},_maintainPosition:function(B){if(A.alerts.repositionOnResize){switch(B){case true:A(window).bind("resize",function(){A.alerts._reposition()});break;case false:A(window).unbind("resize");break}}}};jAlert=function(C,B){A.alerts.alert(C,B)};jConfirm=function(C,B){A.alerts.confirm(C,B)};jPrompt=function(C,B){A.alerts.prompt(C,B)}})(jQuery);