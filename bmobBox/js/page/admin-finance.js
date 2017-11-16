/**
 *  @desc  财务相关
 *  @author vincent <shenggxhz@qq.com>
 *  @date  2016-01-08
 **/
var isNewUser = false;
var _countMoney = function(){
    var amount = $.trim($("#smsAmount").val());
    var type = $(".radio_type:checked").val();
    var re = /^[0-9]*[1-9][0-9]*$/;
    if(!$.isNumeric(amount) || amount == 0 || !re.test( amount ) || amount<1000){
        $("#submitBtn").attr("disabled", "disabled");
        $("#submitInnerBtn").attr("disabled", "disabled");
        showError("只能输入整数，且不能少于1000条！");
        return;
    }else{
        $("#submitBtn").removeAttr("disabled");
    }

    //计算所需支付的余额
    var data = {amount:amount,type:type};
    $.post(BmobNamespace.ajaxGetSmsMoneyUrl,data, function(result){
        $("#price").text(result['price']);
        $("#money").text(result['money']);
        if(result['canPayInner']!=undefined && result['canPayInner']){
            $("#submitInnerBtn").removeAttr("disabled");
        }else{
            $("#submitInnerBtn").attr("disabled", "disabled");
        }
        $("#innerMoney").text(result['money']);
        if (result['reged_less_than_30_days']) {
            $('#extra').text(', 新用户专享');
            isNewUser = true;
        } else {
            $('#extra').text('')
        }
    },'json');
};

var _payInnerSubmit = function () {
    var amount = $.trim($("#smsAmount").val());
    var pass = $.trim($("#pass").val());
    var type = $(".radio_type:checked").val();
    $.ajax({
        type: 'POST',
        url: BmobNamespace.ajaxPaySmsInnerUrl,
        data: {
            amount: amount,
            type: type,
            pass: pass
        },
        dataType: 'html',
        success: function (response) {
            if (response == "success") {
                showSuccess("购买短信成功");
                setTimeout(function(){
                    window.location.href = BmobNamespace.financeIndexUrl;
                    return
                }, 5000);
            }else{
                showError(response);
            }
            return false;
        }
    });
};

//短信服务页面
var smsPageObj = {
    //加载页面自动执行
    "autoload": function () {
        _countMoney();
    },
    //注册元素事件
    "eventReg": function () {
        $("#smsAmount").on('change',function(){
            _countMoney();
        });
        $(".radio_type").on('change',function(){
            _countMoney();
        });

        var el = $('#payInnerModal').find('p.tips');
        $('#pass').on('keyup blur', function(){
            var pass = $.trim($(this).val());
            if(!pass){
                el.html('请输入账户登录密码');
                $("#confirmPayInner").attr("disabled", "disabled");
            }else{
                el.html("");
                $("#confirmPayInner").removeAttr("disabled");
            }
        });

        $("#confirmPayInner").on('click', function(e){
            e.preventDefault();
            $("#submitInnerBtn").attr("disabled", "disabled");
            _payInnerSubmit();
        });

        $("#wechat_buy , #submitInnerBtn").click(function(event) {
            var type = $(".radio_type:checked").val();
            if(isNewUser && $('#smsAmount').val() > 2000 && type == 0){
                showError("新用户一次购买的短信数量不能超过2000条");
                return false;
            }
            //判断短信的数量
            if($('#smsAmount').val() > 500000 && $(this).attr('id') == 'wechat_buy'){
                showError("一次购买的短信数量不能超过五十万条");
                return false;
            }
            if($('#smsAmount').val() < 1000){
                showError("短信条数只能输入整数，且不能少于1000条！");
                return false;
            }
            if(parseInt($('#money').html()) > 5000 && $(this).attr('id') == 'wechat_buy'){
                showError("微信支付金额不能大于5000！请通过对公付款充值！");
                return false;
            }
            if($(this).attr('data-toggle') != 'modal'){
                $("#smsPay").attr('action',BmobNamespace.ajaxWxPaySmsUrl);
                $("#smsPay").submit();
            }

        });
        $('#smsAmount').keydown(function(event){
            var type = $(".radio_type:checked").val();
            if(event.keyCode==13){
                if(isNewUser && $('#smsAmount').val() > 2000 && type == 0){
                    showError("新用户一次购买的短信数量不能超过2000条");
                    return false;
                }
                //判断短信的数量
                if($('#smsAmount').val() > 500000){
                    showError("一次购买的短信数量不能超过五十万条");
                    return false;
                }
                if($('#smsAmount').val() < 1000){
                showError("短信条数只能输入整数，且不能少于1000条！");
                return false;
                }
                $("#smsPay").attr('action',BmobNamespace.ajaxWxPaySmsUrl);
                $("#smsPay").submit();
            }
        });
    }
};

var _countLevelMoney = function(form){
    var level = parseInt(form.find("input[name='level']:checked").val()); //类型
    var timetype = parseInt(form.find("input[name='timetype']:checked").val());  //按年、月
    var time = parseInt(form.find("input[name='time']").val());  //按年、月;

    var re = /^[0-9]*[1-9][0-9]*$/;
    if(!$.isNumeric(time) || time == 0 || !re.test( time )){
        $("#submitBtn").attr("disabled","disabled");
        $("#submitInnerBtn").attr("disabled", "disabled");
        showError("只能输入整数！");
        return;
    }else{
        $("#submitBtn").removeAttr("disabled");
    }

    if(timetype==1){
        $("#timetext").text("月");
    }else if(timetype==2){
        $("#timetext").text("年");
    }

    //计算所需支付的余额
    var data = {level:level,time:time,timetype:timetype};
    $.post(BmobNamespace.ajaxGetMoneyUrl,data, function(result){
        if(result['up']){
            $("#remain-day").text(result['remainDay']);
            $("#remain-money").text(result['remainMoney']);
            $("#choose-money").text(result['addMoney']);
            $("#need-money").text(result['money']);
            $("#remain-info").show();
            $("#public-msg").addClass('public-msg-pn');
        }else{
            $("#remain-info").hide();
            $("#public-msg").removeClass('public-msg-pn');
        }
        if(result['canPayInner']!=undefined && result['canPayInner']){
            $("#submitInnerBtn").removeAttr("disabled");
        }else{
            $("#submitInnerBtn").attr("disabled", "disabled");
        }
        $("#deadtime").text(result['deadtime']);
        $("#money").text(result['money']);
        $("#innerMoney").text(result['money']);
    },'json');
};

//升级提交
var _payInnerLevelSubmit = function (pass) {
    var form = $("#upgradeLevelForm");
    var level = parseInt(form.find("input[name='level']:checked").val()); //类型
    var timetype = parseInt(form.find("input[name='timetype']:checked").val());  //按年、月
    var time = parseInt(form.find("input[name='time']").val());  //按年、月;
    var pass = $.trim($("#pass").val());

    var data = {level:level,time:time,timetype:timetype,pass:pass};
    $.ajax({
        type: 'POST',
        url: BmobNamespace.ajaxPayInnerUrl,
        data: data,
        dataType: 'html',
        success: function (response) {
            if (response == "success") {
                showSuccess("付款成功");
                setTimeout(function(){
                    window.location.href = BmobNamespace.financeLogUrl;
                    return
                }, 5000);
            }else{
                showError(response);
            }
            return false;
        }
    });
};

//账号续费和升级页面
var upgradeLevelPageObj = {
    //加载页面自动执行
    "autoload": function () {
        _countLevelMoney($("#upgradeLevelForm"));
    },
    //注册元素事件
    "eventReg": function () {
        $("#upgradeLevelForm").find('input').change(function(){
            _countLevelMoney($("#upgradeLevelForm"));
        });

        $("#confirmPayInner").on('click', function(e){
            e.preventDefault();
            $('#payInnerModal').modal('hide');
            $("#submitInnerBtn").attr("disabled", "disabled");
            _payInnerLevelSubmit();
        });
    }
};

//短信记录ajax获取
var _withdrawal_log = function(page) {
    $.ajax({
        type: 'GET',
        url: BmobNamespace.ajaxWithdrawalLog,
        data: {'page':page},
        dataType:'json',
        success: function (response) {
            if (response.status == 10000) {
                $("#withdrawalLog").html(response.data.html);
            }else{
                showError("加载失败");
            }
        }
    });
};

//支付分析
var _pay_chart = function(){
    var type = $("#chartContent ul li.on").data('value');
    var pay_type = $("#chartContent").find("select[name='pay_type']").val();
    var timetype = $("#chartContent").find("select[name='timetype']").val();

    $.ajax({
        type: 'GET',
        url:  BmobNamespace.ajaxStatUrl,
        data: {'type':type, 'pay_type':pay_type, 'timetype':timetype},
        dataType:'json',
        success: function (response) {
            var myChart = echarts.init(document.getElementById('payChart'));
            if(response.status == 10000){
                var option = _getChartOption(response.data.legendData, response.data.xAxisData, response.data.seriesData);
                if(2==type){
                    option.tooltip.formatter += '%';
                    option.yAxis[0].axisLabel.formatter += '%';
                }
                myChart.setOption(option);
            }else{
                myChart.dispose();
            }
        }
    });
};

//财务记录
var _withdrawal_blur= function () {
    var money = $("#withdrawalMoney").val();

    if(!checkPlusNumber(money)){
        showError("请输入整数！");
        return false
    }
    if(money<100) {
        showError("最低申请金额为100元！");
        return false
    }
    var has_money = parseInt($("#hasMoney").text().replace(/,/g,''));
    if(money>has_money){
        showError("提款余额不足！");
        return false
    }
    return true
};
//提款
var _withdrawal = function () {
    var money = parseFloat($("#withdrawalMoney").val());
    var pass = $.trim($("#pass").val());

    $.ajax({
        type: 'POST',
        url: BmobNamespace.ajaxWithdrawal,
        data: {
            money: money,
            pass: pass
        },
        dataType: 'html',
        success: function (response) {
            if (response == "success") {
                showSuccess("提交成功");
                setTimeout(function(){
                    window.location.href = createUrl('finance/log');
                    return
                }, 5000);
            }else{
                showError(response);
            }
            return false;
        }
    });
};

//提交提款信息
var _bank_info_submit = function(form){
    $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
        success: function (response) {
            if ('success' == response) {
            	showSuccess("提交成功");
            	setTimeout(function(){
                    window.location.href = BmobNamespace.financeLogUrl;
                    return
                }, 2000);
            } else {
                showError(response);
            }
        }
    });
};

var _bank_info_form_change = function(form){
//  var alipay_account = form.find("input[name=alipay_account]").val().replace(/(^\s*)|(\s*$)/g, "");
    var bank_name = form.find("input[name=bank_name]").val().replace(/(^\s*)|(\s*$)/g, "");
    var bank_branch_name = form.find("input[name=bank_branch_name]").val().replace(/(^\s*)|(\s*$)/g, "");
    var bank_account = form.find("input[name=bank_account]").val().replace(/(^\s*)|(\s*$)/g, "");
    var bank_account_name = form.find("input[name=bank_account_name]").val().replace(/(^\s*)|(\s*$)/g, "");

    var ok = bank_name && bank_branch_name && bank_account && !(bank_account.length < 15 || bank_account.length > 19) &&
        bank_account_name && !(bank_account_name.length < 2 || !checkChinese(bank_account_name));

    if(ok){
        form.find('input[type=submit],button[type=submit]').removeAttr('disabled');
    }else{
        form.find('input[type=submit],button[type=submit]').attr('disabled', 'disabled');
    }
};

//支付管理页面
var logPageObj = {
    //加载页面自动执行
    "autoload": function () {
        _withdrawal_log(1);
    },
    //注册元素事件
    "eventReg": function () {
        $('.nav-tabs a').on('shown.bs.tab', function (e) {
            if(e.target.hash == '#pay-aly'){
                _pay_chart();
            }
        });
        $('#searchPayChart').on('click', function () {
            _pay_chart();
        });

        $("#chartContent ul li.tag").each(function(){
            $(this).on('click', function(){
                $("#chartContent ul li.tag").removeClass("on");
                $(this).addClass("on");
                _pay_chart();
            });
        });

        $('#withdrawalMoney').on('change', function(){
            $('#confirmWithdrawalMoney').text($(this).val());
        });
        $('#withdrawal').on('click', function(e){
            if(!_withdrawal_blur()){
                e.preventDefault();
                return false;
            }
            return true;
        });

        var el = $('#confirmWithdrawalModal').find('p.tips');
        $('#pass').on('keyup blur', function(){
            var pass = $.trim($(this).val());
            if(!pass){
                el.html('请输入账户登录密码');
                $("#confirmWithdrawal").attr("disabled", "disabled");
            }else{
                el.html("");
                $("#confirmWithdrawal").removeAttr("disabled");
            }
        });
        $('#confirmWithdrawal').on('click', function (e) {
            _withdrawal();
            e.preventDefault();
        });

        var form = $('#bankInfoForm');
        var el = form.find('p.tips');
        form.find("input[type=text][name='bank_name']").on('keyup blur', function(){
            var bank_name = $.trim($(this).val());
            if(!bank_name){
                el.html('开户银行不能为空');
            }else{
                el.html("");
            }
            _bank_info_form_change(form);
        });
        form.find("input[type=text][name='bank_branch_name']").on('keyup blur', function(){
            var bank_branch_name = $.trim($(this).val());
            if(!bank_branch_name){
                el.html('银行支行不能为空');
            }else{
                el.html("");
            }
            _bank_info_form_change(form);
        });
        form.find("input[type=text][name='bank_account']").on('keyup blur', function(){
            var bank_account = $.trim($(this).val());
            if(!bank_account){
                el.html('银行账号不能为空');
            }if (bank_account && (bank_account.length < 10 || bank_account.length > 25)) {
                el.html("请输入正确的银行账号");
            }else{
                el.html("");
            }
            _bank_info_form_change(form);
        });
        form.find("input[type=text][name='bank_account_name']").on('keyup blur', function(){
            var bank_account_name = $.trim($(this).val());
            if(!bank_account_name){
                el.html('开户姓名不能为空');
            }else if (bank_account_name && (bank_account_name.length < 2 || !checkChinese(bank_account_name))) {
                el.html("开户姓名必须为正确的中文名称");
            }else{
                el.html("");
            }
            _bank_info_form_change(form);
        });
//      form.find("input[type=text][name='alipay_account']").on('keyup blur', function(){
//          var alipay_account = $.trim($(this).val());
//          if(!alipay_account){
//              el.html('支付宝账户不能为空');
//          }else{
//              el.html("");
//          }
//          _bank_info_form_change(form);
//      });
        form.on('submit', function(e){
            $('#bankModal').modal('hide');
            _bank_info_submit($(this));
            e.preventDefault();
        });
    }
};

//支付管理页面
var CustomPageObj = {
    //加载页面自动执行
    "autoload": function () {
        _countCustomMoney();
    },
    //注册元素事件
    "eventReg": function () {
        $(".detailInformation .money").bind("input propertychange",function () {
            if(this.value.length != 0  &&  this.value<1 || this.value > 500000){
                $(".detailInformation .warning").css("opacity","1");
                $('#submitBtn').attr('disabled' , 'disabled');
            }
            else {
                $(".detailInformation .warning").css("opacity","0");
                $('#submitBtn').removeAttr('disabled');
            }
        });

        $(".money").change(function(){
            _countCustomMoney();
        });

        $("#wxBuy , #alipayBuy , #submitInnerBtn").click(function(event) {
            var money = parseInt($('.money').val());
            var app = $("select[name='app']").val();
            if(!app){
                showError("请选择应用");
                return false;
            }
            // if(!money || money > 5000 || money < 1){
            //     $("#alipayBuy").attr("disabled","disabled");
            //     $("#wxBuy").attr("disabled", "disabled");
            //     //$("#submitInnerBtn").attr("disabled", "disabled");
            //     showError("线上充值金额单笔最大不能超过5000元，每次充值最低1元。");
            //     return false;
            // }
            var remark = $("input[name='remark']").val();
            if(!remark){
                showError("服务备注不能为空");
                return false;
            }
            if(remark.length > 20){
                showError("服务备注不能超过20个字");
                return false;
            }
            var action = $(this).attr('id');
            if(action != 'submitInnerBtn'){
                if(action == 'alipayBuy'){
                    $("input[name='type']").val('1');
                }
                $('#customForm').submit();
            }

        });

        var el = $('#payInnerModal').find('p.tips');
        $('#pass').on('keyup blur', function(){
            var pass = $.trim($(this).val());
            if(!pass){
                el.html('请输入账户登录密码');
                $("#confirmPayInner").attr("disabled", "disabled");
            }else{
                el.html("");
                $("#confirmPayInner").removeAttr("disabled");
            }
        });

        $("#confirmPayInner").on('click', function(e){
            e.preventDefault();
            $("#submitInnerBtn").attr("disabled", "disabled");
            _payCustomInnerSubmit();
        });
    }
};

var _countCustomMoney = function(form){
    var money = parseInt($('.money').val());

    if(!money || money > 5000 || money < 1){
        $("#alipayBuy").attr("disabled","disabled");
        $("#wxBuy").attr("disabled", "disabled");
        //$("#submitInnerBtn").attr("disabled", "disabled");
        showError("微信支付宝充值金额单笔最大不能超过5000元。");
        //return false;
    }else{
        $("#alipayBuy").removeAttr("disabled");
        $("#wxBuy").removeAttr("disabled");
        //$("#submitInnerBtn").removeAttr("disabled");
    }

    //计算所需支付的余额
    var data = {money:money};
    $.post(BmobNamespace.getCustomMoney,data, function(result){
        if(result['canPayInner']!=undefined && result['canPayInner']){
            $("#submitInnerBtn").removeAttr("disabled");
        }else{
            $("#submitInnerBtn").attr("disabled", "disabled");
        }
    },'json');
};

var _payCustomInnerSubmit = function () {
    var money = $.trim($(".money").val());
    var pass = $.trim($("#pass").val());
    var appId = $("select[name='app']").val();
    var remark = $("input[name='remark']").val();
    $.ajax({
        type: 'POST',
        url: BmobNamespace.ajaxPayCustomInnerUrl,
        data: {
            money: money,
            pass: pass,
            appId: appId,
            remark: remark,
        },
        dataType: 'html',
        success: function (response) {
            if (response == "success") {
                showSuccess("购买自定义服务成功");
                setTimeout(function(){
                    window.location.href = BmobNamespace.financeIndexUrl;
                    return
                }, 5000);
            }else{
                showError(response);
            }
            return false;
        }
    });
};