/*
* @Author: Ewing
* @Date:   2017-08-04 10:28:39
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-04 10:29:27
*/

function flashChecker() {
    var hasFlash = 0;         //是否安装了flash
    var flashVersion = 0; //flash版本
    var isIE = /*@cc_on!@*/0;      //是否IE浏览器

    if (isIE) {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (swf) {
            hasFlash = 1;
            VSwf = swf.GetVariable("$version");
            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
        }
    } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var swf = navigator.plugins["Shockwave Flash"];
            if (swf) {
                hasFlash = 1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i) {
                    if (isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return { f: hasFlash, v: flashVersion };
}


var s = "";
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


//全局的顶部显示错误信息
var showError = function (msg) {
    _fadeP($("#msg_error"), ".alert", msg);
};

//公共函数
var _fadeP = function (el, parentClass, msg) {
    $(el).focus();
    if ("block" == $(el).parent(parentClass).css("display")) {
        $(el).parent(parentClass).hide();
    }
    if (msg) {
        $(el).html(msg).parent(parentClass).css({
            opacity: 1.0
        }).fadeIn("fast").animate({
            opacity: 1.0
        }, 4000);
    }
};

$(function(){
    var fls = flashChecker();
    var flag = IsPC(); //true为PC端，false为手机端
    if(flag){
        if (!fls.f) showError("尊敬的Bmob用户，检测到您的浏览器没有启用flash，可能会影响文件上传，请点击浏览器设置按钮启用！");
    }
});