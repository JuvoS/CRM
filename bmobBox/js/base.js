//url组装
var createUrl = function (route, params) {
    var paramStr = '';
    for (var key in params) {
        paramStr += '&' + key + '=' + params[key];
    }
    if(paramStr){
        paramStr = '?' +  paramStr.substring(1, paramStr.length);
    }
    if(0!=route.indexOf('/')){
        route = '/' + route
    }
    return BmobNamespace.baseUrlWithHost + route + paramStr;
};

//全局的顶部显示成功信息
var showSuccess = function (msg) {
    _fadeP($("#msg_success"), ".alert", msg);
};

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
        }, 4000).fadeOut("slow");
    }
};

//公共函数
var _fade = function (el, msg) {
    $(el).focus();
    if ("block" == $(el).css("display")) {
        $(el).hide();
    }
    if (msg) {
        $(el).html(msg).css({
            opacity: 1.0
        }).fadeIn("fast").animate({
            opacity: 1.0
        }, 4000).fadeOut("slow");
    }
};

//图表属性
//var _chartColorArr = ['#b23c96', '#72cf96', '#007be6'];
var _chartSeriesOption = {
    "type": "line",
    "symbol": "emptyCircle",
    'symbolSize': 5,
    "showAllSymbol": true,
    legendHoverLink: false,
    itemStyle: {
        normal: {
            lineStyle: {
                width: 3,
                type: "solid",
                //color : '#3593ff'
            },

        }

    }
};

//图表属性
var _getChartOption = function (legendData, xAxisData, seriesData,yText,dText) {
    var seriesData2 = new Array();
    for(var i = 0; i < seriesData.length; i++){
        var sdata = jQuery.extend(true, {}, _chartSeriesOption);
        //sdata.itemStyle.normal.color = _chartColorArr[i];

        var data = seriesData[i];
        if(data instanceof Object){
            sdata.name = data.name;
            sdata.data = data.data;
        }
        seriesData2.push(sdata);
    }

    if(!yText){
        yText='';
    }
    if(!dText){
        dText='';
    }

    var option = {
        color: ['#3593FF','#b23c96', '#72cf96', '#007be6', '#00448a','#0580b9','#28c6b9','#84e6f1','#dddddd'],
        legend: {
            x: 'right',
            show: true,
            data: legendData //['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        tooltip: {
            //trigger: 'axis',
            show: true,
            formatter: "{b}<br/>{c} "+dText
        },
        grid: {
            y: 30,
            x2: 30,
            y2: 30
        },
        //toolbox: {
        //    show: false,
        //    feature: {
        //        magicType: {
        //            show: true,
        //            type: ['line', 'bar']
        //        },
        //        restore: {
        //            show: true
        //        },
        //        saveAsImage: {
        //            show: true
        //        }
        //    }
        //},
        //noDataLoadingOption: {text: 'hello world!!', effect: 'ring'},
        //calculable: true,
        xAxis: [{
            type: 'category',
            splitLine: {show: false},
            axisLine: {show: false},
            boundaryGap: [0.1, 0.1],
            //boundaryGap: false,
            data: xAxisData //['周一','周二','周三','周四','周五','周六','周日']
        }],
        yAxis: [{
            type: 'value',
            axisLine: {show: false},
            splitArea: {show: false},
            boundaryGap: [0, 0.1],
            axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} '+yText
            }
        }],
        series: seriesData2 //[{name:'邮件营销',type:'line',stack: '总量',data:[120, 132, 101, 134, 90, 230, 210]},{name:'联盟广告',type:'line',stack: '总量',data:[220, 182, 191, 234, 290, 330, 310]}]
    };
    return option;
};


$(function(){
    // function resize(){
    //    // var win1 = $(window); 
    //    //  var ww1 = win1.width();
    //    //  var hh=$(document).height();
    //    //  $(".main-left").css('height',hh);
    //    //  var wid;
    //    //  var a=1920-ww1;
    //    //  var b=90-a*0.01;
    //    //  if(ww1>995&&ww1<1920){
    //    //    $(".main-right").css("width",b+"%");
    //    //  }
    //    //  else if(ww1>=640&&ww1<=660){
    //    //    $(".main-right").css("width","67%");
    //    //  }
    //    //  else if(ww1>=624&&ww1<640){
    //    //    $(".main-right").css("width","66%");
    //    //  }
    //    //  else if(ww1>660&&ww1<=995){
    //    //    var a=1920-ww1;
    //    //    var c=(995-ww1)/10;
    //    //    b=80-a*0.0003*c;
    //    //    $(".main-right").css("width",b+"%");
    //    //  }
    //    //  else if(ww1>=1920){
    //    //    $(".main-right").css("width","90%");
    //    //  }
    //    //  else if(ww1<624){
    //    //    $(".main-right").css("width","100%");
    //    //  }
       
    // }
    // resize();
    // window.onresize=function(){
    //     resize();
    //  }
    //  
    //响应式导航
     var navigation = responsiveNav("#nav"); 
    // 根字号设置
    var win = $(window);
    setRootFontSize = function(){
      var ww = win.width();
      var root;
      if(ww<320)                  root=20;
      else if(640<=ww && ww<1200)  root=ww*40/1200;
      else if(1200<=ww)            root=40;
      $("html").css("font-size", root+"px");
    }
    win.resize(setRootFontSize).load(setRootFontSize).resize();

    // alert监听
    $(window).scroll(function() {
    // var $pst=$(".alert").position().top;
      var win2 = $(window).width();
      if(win2>=640){
        var $sct=$(this).scrollTop();
        $(".alert-idx").css({'top':$sct});
      } 
      else{
        var $ht=$('.main-left').height()+40;
        var $sct=$(this).scrollTop();
        $(".alert-idx").css({'top':$sct-$ht});
      }
    });

    $("#close_banner").click(function(event) {

        $(this).hide();
        $("html").css('background', 'none').css('paddingTop', '0');
        $(".sidenav").css('top', '0');
        $(".main-left").css('top', '0');
    });

   

});

