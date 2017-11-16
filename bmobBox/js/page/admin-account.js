/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//用户信息修改手机号码倒记时
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数

//timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj);//停止计时器
        $("#get_code").removeAttr("disabled");//启用按钮
        $("#get_code").html("重新发送验证码");
    }
    else {
        curCount--;
        $("#get_code").html(curCount + "秒后重新获取");
    }
}

/*
 * 登录js验证
 */
var account = function () {
    return {
        CheckName: function () {
            $("#nameMsg").removeClass().html("");
            var name = $.trim($("#name").val());
            if (name.length < 2) {
                showError("姓名长度不能少于2位");

            }else if(name.length > 15){
                showError("姓名长度不能大于2位");

            } else {

                return true;
            }
            return false;
        },

        CheckQQ: function () {
            $("#qqMsg").removeClass().html("");
            var qq = $.trim($("#qq").val());
            if (qq.length >= 5 && checkNumber(qq)) {

                return true;
            } else {
                showError("qq号不能为空");
            }
            return false;
        },


        CheckWeixin: function(){
            var weixin = $.trim($("#weixin").val());
            var Validate_weixin = RegExp(/^[a-zA-Z\d_-]{5,}$/).test(weixin);
            if (Validate_weixin) {
                return true;
            }
            else {
                showError("请输入正确的微信号");
                return false;
            }
        },

        CheckMobile: function () {
            $("#mobileMsg").removeClass().html("");
            var mobile = $.trim($("#mobile").val());
            if (checkMobile(mobile)) {

                return true;
            } else {
                showError("手机号有误");

            }
            return false;
        },

        CheckPhone: function () {
            $("#phoneMsg").removeClass().html("");
            var phone = $.trim($("#phone").val());
            if (checkTelNum(phone)) {

                return true;
            } else {
                showError("手机号有误");

            }
            return false;
        },

        CheckCompany: function () {
            $("#companyMsg").removeClass().html("");
            var company = $.trim($("#company").val());
            if (company == '') {
                showError("公司名称不能为空");

                return false;
            }else{

                return true;
            }
            return true;
        },

        CheckWebsite: function () {
            $("#websiteMsg").removeClass().html("");
            var website = $.trim($("#website").val());
            if (website == '') {
                showError("网站不能为空");

                return false;
            }else{

                return true;
            }
            return true;
        },

        CheckAddress: function () {
            $("#addressMsg").removeClass().html("");
            var address = $.trim($("#address").val());
            if (address == '') {
                showError("地址错误");
                return false;
            }else{
                return true;
            }
            return true;
        },

        SelectType: function () {

            var devType = $("input[name='UserForm[creditType]']:checked").val();
            if( devType==0 ){ //个人开发者选项
                $("#company_tr").hide();
                $("#website_tr").hide();
            } else {
                $("#company_tr").show();
                $("#website_tr").show();
            }
            return true;
        },

        CheckCom: function () {
            $("#addressMsg").removeClass().html("");
            var address = $.trim($("#address").val());
            if (address == '') {
                showError("公司网址错误");

                return false;
            }else{

                return true;
            }
            return true;
        },

        CheckPost: function () {
            $("#postMsg").removeClass().html("");
            var post = $.trim($("#post").val());
            if (post.length == 6 && checkNumber(post)) {

                return true;
            }else{
                showError("地址错误");

                return true;
            }
            return false;
        },

        SendSms: function(){

        },

        validateAll: function () {

            var devType = $("input[name='UserForm[creditType]']:checked").val();
            if( devType==0 ){ //个人开发者选项
                return this.CheckName() && this.CheckMobile() && this.CheckQQ() && this.CheckWeixin()
            } else {　//企业选项
                return this.CheckName() && this.CheckMobile() && this.CheckQQ() && this.CheckCompany() && this.CheckWeixin()
            }
        }
    }
}();


//密码检测
function CheckOld() {

    var old = $.trim($("#oldpsw").val());
    if (old.length >= 6) {
        return  true;
    } else {
        showError("请填写现有密码");
        return false;
    }
}
function CheckPsw() {


    var psw = $.trim($("#password").val());
    if (psw.length >= 6) {
        return  true;
    } else {

        showError("密码长度不能少于6个字符");
        return false;
    }
}
function CheckRepsw() {
    var psw = $.trim($("#password").val());
    var repsw = $.trim($("#repsw").val());
    if (repsw.length == 0) {
        showError("请再次填写密码");
        return  false;
    } else if (psw == repsw) {
        return true;
    } else {
        showError("重复的密码不一致");
        return   false;
    }
}

function validateAll() {
    if (CheckOld() && CheckPsw() && CheckRepsw()) {
        return true;
    }else{
     return false;
    }

}

function updatePwd(){

    if( validateAll()){
        $("#user-form").attr("disabled",true);
        var form = $("#user-form");
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            success: function (response) {
                $("#user-form").attr("disabled",false);
                if ('success' == response) {
                    showSuccess("修改密码成功")
                    setTimeout(function () {
                        //window.location.href = "/app/list"
                        window.location.reload();
                    }, 1000);;

                } else {
                    showError(response);
                }
            }
        });
    }
}

function cancleUpdatePwd(){
    $("#modify-pwd-note").hide();
    $("#modify-pwd-note").html("");
    $("#user-form").attr("disabled",true);

    $("#oldpsw").val("");
    $("#password").val("");
    $("#repsw").val("");

}

//账户设置
var indexPageObj = {
    //加载页面自动执行
    "autoload": function () {
    },
    //注册元素事件
    "eventReg": function () {
        $("#get_code").click(function(){
            $("#valid_msg").html("");　//清空错误信息

            var mobile = $.trim($("#validemobile").val())
            var data = {"mobile": mobile};
            if (!checkMobile(mobile)) {
               $("#valid_msg").html("请输入正确的手机号码");
               return ;
            }
            　　//设置button效果，开始计时
             $(this).attr("disabled",true);
             curCount = count;
             $("#get_code").html(curCount + "秒后重新获取");
             InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
            $.post(createUrl('account/ajaxSendSms'),data, function(result){
                if(result=="success"){
                    $("#valid_msg").html("已发送验证码");

                }else{
                    $("#valid_msg").html(result);
                }
            },'html');
        });

        $("#save_mobile").click(function(){
            var mobile = $.trim($("#validemobile").val())
            var validCode = $.trim($("#validcode").val())
            var data = {"mobile": mobile, "validCode": validCode};
            $.post(createUrl('account/validCode'),data, function(result){
                if(result=="success"){
                    showSuccess("修改成功");
                    $("#UserForm_code").val(validCode);
                    $("#UserForm_mobile").val(mobile);
                    $("#mobile").val(mobile);
                    $("#get_code").val("获取验证码").attr("disabled", false);
                    $("#change-phone").modal('hide');
                }else{
                    $("#valid_msg").html(result);
                }
            },'html');
        });
    }
};

//重新生成报警联系人列表
function resetAlarmUser(data) {
    $("#alarmlist").empty();
    for(var i=0;i<data.length;i++){
        var id = data[i].id;
        var optionValue= data[i].name+"-"+data[i].tel;
        $("#alarmlist").append("<option value='"+id+"'>"+optionValue+"</option>");  //添加一项option
    }
}

//报警信息设置
var alarmSmsObj = {
    //加载页面自动执行
    "autoload": function (  ) {

    },
    //注册元素事件
    "eventReg": function () {

        $("#optionsRadios1").on('switchChange.bootstrapSwitch', function (e, state) {
             if(state){//on
                var data = {"reveiveAlarmFlag": 1};
                $.post(createUrl('account/ajaxSetReceiveAlarmSms'),data, function(result){

                    if(result.msg=="success"){
                        showSuccess("设置成功");
                    }else{
                        showError("设置失败")
                    }
                },'json');
             }else{//0FF
                var data = {"reveiveAlarmFlag": 0};
                $.post(createUrl('account/ajaxSetReceiveAlarmSms'),data, function(result){

                    if(result.msg=="success"){
                        showSuccess("设置成功");
                    }else{
                        showError("设置失败")
                    }
                },'json');
             }
        });

        //设置是否接收报警短信
        $("#saveAlarmSmsReceive").click(function(){
            var reveiveAlarmFlag = $("#reveiveAlarmFlag").val();
            var data = {"reveiveAlarmFlag": reveiveAlarmFlag};
            $.post(createUrl('account/ajaxSetReceiveAlarmSms'),data, function(result){

                if(result.msg=="success"){
                    showSuccess("设置成功");
                }else{
                    showError("设置失败")
                }
            },'json');
        });

        //添加报警短信联系人
        $("#saveAlarmSmsUser").click(function(){


            //如果超过3个联系人,添加联系人按钮不可用
            $("#err_msg").html("");

            if( $('select[name="alarmlistname"] option').size() >=3 ) {
                showError("最多只能添加3个联系人");
                return;
            }

            var alarmName = $.trim($("#alarmName").val())
            var alarmTel = $.trim($("#alarmTel").val())
            if( alarmName=="" || alarmTel=="" ){
                showError("接收人姓名和接收人手机号不能为空");
                return;
            }
            if( !checkMobile(alarmTel) ){
                showError("手机号码格式有误");
                return;
            }

            var data = {"alarmName": alarmName, "alarmTel":alarmTel};
            $.post(createUrl('account/ajaxSetAlarmSmsUser'),data, function(result){
                if(result.msg=="success"){
                    showSuccess("成功添加报警号码");
                    resetAlarmUser(result.data);
                }else{
                    showError(result.msg);
                }
            },'json');
        });

        //删除报警短信联系人
        $("#deleteAlarmSmsUser").click(function(){

            var id = $("#alarmlist").val(); //获取选中的联系人,有可能是多选,"例如11,12"
            if( id == null ){
                showError("请选择其中一个联系人");
                return;
            }

            var data = {"id": id};
            $.post(createUrl('account/ajaxDeleteAlarmSmsUser'),data, function(result){
                if(result.msg=="success"){

                    resetAlarmUser(result.data);
                    showSuccess("成功删除报警号码");
                }else{
                    showError(result.msg);
                }
            },'json');
        });

    }

};


//receive email setting
var alarmEmailObj = {
    //加载页面自动执行
    "autoload": function (  ) {

    },
    //注册元素事件
    "eventReg": function () {

        $("#optionsRadiosEmail").on('switchChange.bootstrapSwitch', function (e, state) {
             if(state){//on
                var data = {"receive_email": 1};
                $.post(createUrl('account/ajaxSetReceiveEmail'),data, function(result){

                    if(result.msg=="success"){
                        showSuccess("设置成功");
                    }else{
                        showError("设置失败")
                    }
                },'json');
             }else{//0FF
                var data = {"receive_email": 0};
                $.post(createUrl('account/ajaxSetReceiveEmail'),data, function(result){

                    if(result.msg=="success"){
                        showSuccess("设置成功");
                    }else{
                        showError("设置失败")
                    }
                },'json');
             }
        });

    }

};

//url组装
var createUrl = function (route, params) {
    var paramStr = '';
    for (var key in params) {
        paramStr += '&' + key + '=' + params[key];
    }
    ;
    return BmobNamespace.baseUrlWithHost + '/' + route + paramStr;
};

//公共函数
var commonfunc = function () {
    $('.common_select_option_list li').click(function () {
        $(this).parent().find('a').removeClass('active');
        $(this).find('a').addClass('active');
    });
    $(".common_select").each(function () {
        $(this).find("p").html($(this).find('a.active').html());
    });
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
        }, 3000).fadeOut("slow");
    }
};


//upload初始化
//收入明细图表
var _uploadInit = function () {
    $('#file_upload_img_1').uploadify({
        'auto': true,
        'queueSizeLimit': 1,
        'multi': false,
        //'removeCompleted' : false,
        'removeTimeout': 5,
        'fileSizeLimit': '2MB',
        'fileTypeDesc': 'Image Files',
        'fileTypeExts': '*.jpg;*.png',
        'buttonText': '浏览图片',
        'swf': BmobNamespace.uploadSwf,
        'uploader': BmobNamespace.uploadFile,
        'formData': {'f': 'credit_photo'},
        'onUploadError': function (file, errorCode, errorMsg, errorString) {
            $('#file_msg_img_1').attr("class", "alert alert-error").html('上传失败！');
        },
        'onSelectError': function (file, errorCode, errorMsg) {
            // Load the swfupload settings
            var settings = this.settings;

            // Run the default event handler
            if ($.inArray('onSelectError', settings.overrideEvents) < 0) {
                switch (errorCode) {
                    case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                        if (settings.queueSizeLimit > errorMsg) {
                            showError( '\nThe number of files selected exceeds the remaining upload limit (' + errorMsg + ').');
                        } else {
                            showError( '\nThe number of files selected exceeds the queue size limit (' + settings.queueSizeLimit + ').');
                        }
                        break;
                    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                        showError( '\n文件名: "' + file.name + '" 超过控制大小 (' + settings.fileSizeLimit + ').');
                        break;
                    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                        showError(  '\n文件名 "' + file.name + '" 为空.');
                    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                        showError(  '\n文件名 "' + file.name + '" 不是正确的文件类型.');
                }
            }
        },
        'onCancel': function (file) {
            $('#file_img_display_1').val('');
            showError( '上传被取消！');
        },
        'onUploadSuccess': function (file, data, response) {

            if (data == '-1') {
                showError( '文件格式不正确，上传失败！');
            } else if (data == '-2') {
                showError( '文件大小不能超过' + BmobNamespace.limit_size + '，上传失败！');
            } else if (data) {
                var file = jQuery.parseJSON(data);
                $('#credit_front_photo').val(file.filepath);
                $('#file_img_display_1_div').show();
                $('#file_img_display_1').attr("src", BmobNamespace.hostUrl + "/" + file.filepath).show();
                showSuccess('上传成功:' + file.filename);
            } else {
                showError('上传失败');
            }
        }
    });

    //$("#del_img_1").on("click", function () {
    //    $("#file_img_display_1").attr("src", BmobNamespace.watermarkEmptyImg);
    //    $("#credit_front_photo").val("")
    //});

    $('#file_upload_img_2').uploadify({
        'auto': true,
        'queueSizeLimit': 1,
        'multi': false,
        //'removeCompleted' : false,
        'removeTimeout': 5,
        'fileSizeLimit': '2MB',
        'fileTypeDesc': 'Image Files',
        'fileTypeExts': '*.jpg;*.png',
        'buttonText': '浏览图片',
        'swf': BmobNamespace.uploadSwf,
        'uploader': BmobNamespace.uploadFile,
        'formData': {'f': 'credit_photo'},
        'onUploadError': function (file, errorCode, errorMsg, errorString) {
            $('#file_msg_img_2').attr("class", "alert alert-error").html('上传失败！');
        },
        'onSelectError': function (file, errorCode, errorMsg) {
            // Load the swfupload settings
            var settings = this.settings;

            // Run the default event handler
            if ($.inArray('onSelectError', settings.overrideEvents) < 0) {
                switch (errorCode) {
                    case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                        if (settings.queueSizeLimit > errorMsg) {
                            this.queueData.errorMsg = '\nThe number of files selected exceeds the remaining upload limit (' + errorMsg + ').';
                        } else {
                            this.queueData.errorMsg = '\nThe number of files selected exceeds the queue size limit (' + settings.queueSizeLimit + ').';
                        }
                        break;
                    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                        this.queueData.errorMsg = '\n文件名: "' + file.name + '" 超过控制大小 (' + settings.fileSizeLimit + ').';
                        break;
                    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                        this.queueData.errorMsg = '\n文件名 "' + file.name + '" 为空.';
                    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                        this.queueData.errorMsg = '\n文件名 "' + file.name + '" 不是正确的文件类型.';
                }
            }
        },
        'onCancel': function (file) {
            $('#file_img_display_2').val('');
            $('#file_msg_img_2').attr("class", "alert alert-error").html('上传被取消！');
        },
        'onUploadSuccess': function (file, data, response) {
            if (data == '-1') {
                $('#file_msg_img_2').attr("class", "alert alert-error").html('文件格式不正确，上传失败！');
            } else if (data == '-2') {
                $('#file_msg_img_2').attr("class", "alert alert-error").html('文件大小不能超过' + BmobNamespace.limit_size + '，上传失败！');
            } else if (data) {
                var file = jQuery.parseJSON(data);
                $('#credit_back_photo').val(file.filepath);
                $('#file_img_display_2').attr("src", BmobNamespace.hostUrl + "/" + file.filepath).show();
                $('#file_msg_img_2').attr("class", "alert alert-success").html('上传成功:' + file.filename);
            } else {
                $('#file_msg_img_2').attr("class", "alert alert-error").html('上传失败！');
            }
        }
    });

    $('#file_upload_img_3').uploadify({
        'auto': true,
        'queueSizeLimit': 1,
        'multi': false,
        //'removeCompleted' : false,
        'removeTimeout': 5,
        'fileSizeLimit': '2MB',
        'fileTypeDesc': 'Image Files',
        'fileTypeExts': '*.jpg;*.png',
        'buttonText': '浏览图片',
        'swf': BmobNamespace.uploadSwf,
        'uploader': BmobNamespace.uploadFile,
        'formData': {'f': 'credit_photo'},
        'onUploadError': function (file, errorCode, errorMsg, errorString) {
            $('#file_msg_img_2').attr("class", "alert alert-error").html('上传失败！');
        },
        'onSelectError': function (file, errorCode, errorMsg) {
            // Load the swfupload settings
            var settings = this.settings;

            // Run the default event handler
            if ($.inArray('onSelectError', settings.overrideEvents) < 0) {
                switch (errorCode) {
                    case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                        if (settings.queueSizeLimit > errorMsg) {
                            showError( '\nThe number of files selected exceeds the remaining upload limit (' + errorMsg + ').' );
                        } else {
                            showError( '\nThe number of files selected exceeds the queue size limit (' + settings.queueSizeLimit + ').');
                        }
                        break;
                    case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                        showError( '\n文件名: "' + file.name + '" 超过控制大小 (' + settings.fileSizeLimit + ').');
                        break;
                    case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                        showError( '\n文件名 "' + file.name + '" 为空.');
                    case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                        showError( '\n文件名 "' + file.name + '" 不是正确的文件类型.');
                }
            }
        },
        'onCancel': function (file) {
            $('#file_img_display_3').val('');
            $showError('上传被取消！');
        },
        'onUploadSuccess': function (file, data, response) {
            if (data == '-1') {
                showError('文件格式不正确，上传失败！');
            } else if (data == '-2') {
                showError('文件大小不能超过' + BmobNamespace.limit_size + '，上传失败！');
            } else if (data) {
                var file = jQuery.parseJSON(data);
                $('#company_credit_photo').val(file.filepath);
                $('#file_img_display_3_div').show();
                $('#file_img_display_3').attr("src", BmobNamespace.hostUrl + "/" + file.filepath).show();
                showSuccess('上传成功:' + file.filename);
            } else {
                showError('上传失败');
            }
        }
    });

    //$("#del_img_2").on("click", function () {
    //    $("#file_img_display_2").attr("src", BmobNamespace.watermarkEmptyImg);
    //    $("#credit_back_photo").val("")
    //});
};

var _infoFormSubmit = function () {
    var form = $("#info-form");
    var msg_err = $("#msg_error");
    var credit_name = form.find("input[name=credit_name]").val().replace(/(^\s*)|(\s*$)/g, "");
    var credit_num = form.find("input[name=credit_num]").val().replace(/(^\s*)|(\s*$)/g, "");
    var credit_front_photo = form.find("input[name=credit_front_photo]").val().replace(/(^\s*)|(\s*$)/g, "");
    var company_credit_photo = form.find("input[name=company_credit_photo]").val().replace(/(^\s*)|(\s*$)/g, "");
    var mobile = $("#UserForm_mobile").val();
    var qq = $("#qq").val();
    var weixin = $("#weixin").val();
    if (credit_name && credit_num && credit_front_photo && qq && weixin) {
        if (credit_name.length < 2 || credit_name.length > 10 || !checkChinese(credit_name)) {
            showError("证件姓名必须为正确的中文名称");
            return false
        }
        var radioType = form.find("input[name=credit_type]:checked").val();
        if( 0 == radioType){
            msg = checkIDNO(credit_num);
            if ("验证通过!" != msg) {
                showError(msg);
                return false;
            }
        }
        msg = isQQ(qq);
        if (!msg) {
            showError("请输入正确的QQ号码");
            return false;
        }

        if(!isWeixin(weixin)){
            showError("请输入正确的微信号");
            return ;
        }

        if (!checkMobile(mobile)) {
            showError("请输入正确的手机号码");
            return ;
        }



        // var radioType = $('#input[name="credit_type"]:checked').val();
        var radioType = form.find("input[name=credit_type]:checked").val();
        // alert(radioType);
        if( 1 == radioType && !company_credit_photo) { //企业帐号
            showError("必须上传企业执照");
            return false;
        }
        return true;
    } else {
        if(!credit_name){
            showError("姓名不能为空");
            return false;
        }
        if(!credit_num){
            showError("证件号码不能为空");
            return false;
        }
        if(!credit_front_photo){
            showError("持证照片上传失败");
            return false;
        }
        if(!qq){
            showError("QQ不能为空");
            return false;
        }
        if(!weixin){
            showError("微信不能为空");
            return false;
        }

    }
    return false;
};

//收入明细页面所有事件
var infoPageObj = {
    //加载页面自动执行
    "autoload": function () {
        _uploadInit();
    },
    //注册元素事件
    "eventReg": function () {
        //$("#info-form").submit(function (event) {
        //    event.preventDefault();
        //});
        $("#info-form").find("input[name=credit_type]").change(function(){
            var t = $(this).val();
            if(t==1){
                $("#company_credit_photo_tr").show();
            }else{
                $("#company_credit_photo_tr").hide();
            }
        });
        $("#submit_save").click(function () {
            if (_infoFormSubmit()) {
                $("#submit_save").prop( "disabled", true );

                var form = $("#info-form");
                var credit_name = form.find("input[name=credit_name]").val().replace(/(^\s*)|(\s*$)/g, "");
                var credit_num = form.find("input[name=credit_num]").val().replace(/(^\s*)|(\s*$)/g, "");
                var credit_front_photo = form.find("input[name=credit_front_photo]").val().replace(/(^\s*)|(\s*$)/g, "");
                var company_credit_photo = form.find("input[name=company_credit_photo]").val().replace(/(^\s*)|(\s*$)/g, "");
                var credit_type = form.find("input[name=credit_type]:checked").val();
                var recommand_code = form.find("input[name=recommand_code]").val()
                var mobile = $("#UserForm_mobile").val();
                var qq = $("#qq").val();
                var weixin = $("#weixin").val();
                //if($("#mobile2").val()!="0"&&$("#qq2").val()!="0"){
                //    mobile="";
                //    qq="";
                //}
                //if($("#mobile2").val()!=""&&$("#qq2").val()!=""){
                //    mobile="";
                //    qq="";
                //}

                var data = {"credit_name": credit_name, "credit_num": credit_num,"credit_front_photo": credit_front_photo,
                    "company_credit_photo": company_credit_photo,"credit_type": credit_type,"credit_qq":qq,"credit_tel":mobile,"credit_weixin":weixin, "recommand_code": recommand_code};
                //$.post(BmobNamespace.infoPostAjax,data, function(result){
                //    $("#submit_save").prop( "disabled", false );
                //    if(result=="success"){
                //        $("#verify_status").html("待审核");
                //        showSuccess("提交成功");
                //    }else{
                //        showError(result)
                //    }
                //},'json');

                $.ajax({
                    type: 'POST',
                    url: BmobNamespace.infoPostAjax,
                    data:data,
                    dataType: 'json',
                    async: false,
                    success: function (result) {
                        $("#submit_save").prop( "disabled", false );
                        if(result=="success"){
                            $("#verify_status").html("待审核");
                            showSuccess("提交成功");
                        }else{
                            showError(result)
                        }
                    }
                });


                // $("#info-form").submit();
            }

        });
    }
};


///=======================================================
/// Function Name:checkIsEmpty
/// Function Desc:检查文本框中是否有值
///=======================================================
function checkIsEmpty(obj)
{
    if(obj != null)
    {
        if(document.getElementById(obj).value.trim() == "")
            return false;
        return true;
    }
}

///=======================================================
/// Function Name:checkTextLength
/// Function Desc:检查文本框中输入文本的长度是否符合要求
///=======================================================
function checkTextLength(obj, length)
{
    if(obj != null)
    {
        if(document.getElementById(obj).value.trim().length > length)
            return false;
        return true;
    }
}


///=======================================================
/// Function Name:checkIsDecimal
/// Function Desc:检验输入的数字是否为货币类型
///=======================================================
function checkIsDecimal(value,length)
{
    value = new String(value);

    if (value.match(/^\d*\.?\d{0,2}$/) == null)
        return false;

    var sp = value.split(".");
    if(sp.length == 1)
    {
        if(sp[0].trim().length < 1)
        {
            return false;
        }
    }
    else if(sp.length == 2)
    {
        if(sp[0].trim().length < 1 || sp[1].length != length)
        {
            return false;
        }
    }
    else
    {
        return false;
    }

    return true;
}
///=======================================================
/// Function Name:CheckIsMoney
/// Function Desc:检验输入的数字是否为金额，两位小数
///=======================================================
function CheckIsMoney(value) {
    if (value == 0) {
        return false;
    }
    var reg = new RegExp(/^\d*\.?\d{0,2}$/);
    if (!reg.test(value)) {
        return false;
    }
    if (Number(value) < 0.01) {
        return false;
    }
    return true;
}

///=======================================================
/// Function Name:checkIsDecimal
/// Function Desc:检验输入的数字是非负浮点型
///=======================================================
function checkIsNumberic(value)
{
    value = new String(value);

    if(value.match(/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/g) == null)
        return false;

    return true;
}

///=======================================================
/// Function Name:checkIsCharAndNum
/// Function Desc:输入框中只能输入文字、数字和字母
///=======================================================
function checkIsCharAndNum(value)
{
    //var value = document.getElementById(obj).value;
    var reg = /^([A-Z]|[^u4E00-u9FA5]|[a-z]|[\d])*$/g;

    if(reg.exec(value) == null)
    {
        return false;
    }

    return true;
}

///=======================================================
/// Function Name:checkNumber
/// Function Desc:输入框中只能输入数字
///=======================================================
function checkNumber(value)
{
    var number = value.trim();
    var reg = /[^0-9]/g;

    if(reg.exec(number) == null)
    {
        return true;
    }

    return false;
}
///=======================================================
/// Function Name:checkPlusNumber
/// Function Desc:输入框中只能输入正整数
///=======================================================
function checkPlusNumber(value) {
    var number = value.trim();
    var reg = /^[1-9]\d*$/;

    if (reg.exec(number) == null) {
        return false;
    }

    return true;
}

///=======================================================
/// Function Name:checkLetter
/// Function Desc:输入框中只能输入字母
///=======================================================
function checkLetter(value)
{
    var chars = value.trim();
    var reg = /[^A-Za-z]/g;

    if(reg.exec(chars) == null)
    {
        return true;
    }

    return false;
}

///=======================================================
/// Function Name:checkChinese
/// Function Desc:输入框中只能输入中文字符
///=======================================================
function checkChinese(value)
{
    var chars = value.trim();
    var reg = /[^\u4E00-\u9FA5]/g;
    if(reg.exec(chars) == null)
    {
        return true;
    }
    return false;
}

/// Function Name:IsURL
/// Function Desc:是否为URL
///=======================================================
function IsURL(value) {
    var chars = value.trim();
    r = false;
    var parat = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (parat.exec(chars) == null)
        r = false;
    else
        r = true;
    return r;
}



///=======================================================
/// Function Name:checkEmail
/// Function Desc:检查文本框中输入的Email是否正确
///=======================================================
 function checkEmail(str)
{
    var r = false;
    var parat=/^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if(parat.exec(str) == null)
       r = false;
    else
       r = true;
    return r;
}
///=======================================================
/// Function Name:checkzipcode
/// Function Desc:检查是否为邮政编码
///=======================================================
function checkZipCode(str) {
    var r = false;
    var parat = /^[0-9]{6}$/;

    if (parat.exec(str) == null)
        r = false;
    else
        r = true;
    return r;
}
///=======================================================
/// Function Name:checkMobile
/// Function Desc:检查文本框中输入的是否为手机号码，手机号
/// 码可为11位或12位，当为11位时第一个数字必需为1第二个数
/// 字为3或5，如果为12位手机号时第一个数字必需为0，第二个
/// 数字必需为1，第三个数定为3或5
///=======================================================
function checkMobile(val)
{
    if (val == "")
        return false;
    var number = val;
    if(val.trim() == '')
        return false;

    var r = false;
    var regx = /^(130|131|132|133|134|135|136|137|138|139|158|159|147)\d{8}$/;
    var regx2 = /^(0130|0131|0132|0133|0134|0135|0136|0137|0138|0139|0158|0159|0147)\d{8}$/;
    var regx3 = /^\d{11}$/;
    var regx4 = /^\d{12}$/;

    if(number.length == 12)
    {
        if(regx4.exec(number) == null)
            r = false;
        else
            r = true;
    }
    if(number.length == 11)
    {
         if(regx3.exec(number) == null)
            r = false;
        else
            r = true;
    }
    return r;
}

///=======================================================
/// Function Name:checkTelNum
/// Function Desc:检查文本框中输入的是座机号码
///=======================================================
function checkTelNum(number)
{
    if (number == "")
        return false;
    var t = false;

    var patrn=/^[0-9]{7,8}$/;
    var patrn1=/^[0-9]{3,4}[-]{1}[0-9]{7,8}[-]{1}[0-9]{2,4}$/;
    var patrn2=/^[0-9]{3,4}[-]{1}[0-9]{7,8}$/;
    var patrn3 = /^[0-9]{7,8}[-]{1}[0-9]{2,4}$/;
    var patrn4 = /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
    var patrn5 = /^[48]00[-]{1}\d{3}[-]{1}\d{4}$/;
     if (patrn.exec(number) == null && patrn1.exec(number) == null && patrn2.exec(number) == null && patrn3.exec(number) == null && patrn4.exec(number) == null && patrn5.exec(number) == null)
    {
       t=false;
    }
    else
    {
       t=true;
    }
    return t;
}


///=======================================================
/// Function Name:checkIDNO
/// Function Desc:检查文本框中输入身份证号码
///=======================================================
function checkIDNO(idcard) {
  var Errors = new Array(
      "验证通过!",
      "身份证号码位数不对!",
      "身份证号码出生日期超出范围或含有非法字符!",
      "身份证号码校验错误!",
      "身份证地区非法!"
  );
  var area = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}

  var idcard,Y,JYM;
  var S,M;
  var idcard_array = new Array();
  idcard_array = idcard.split("");
//地区检验
  if (area[parseInt(idcard.substr(0, 2))] == null) return Errors[4];
//身份号码位数及格式检验
  switch (idcard.length) {
      case 15:
          if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 )) {
              ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
          } else {
              ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
          }
          if (ereg.test(idcard)) return Errors[0];
          else return Errors[2];
          break;
      case 18:
//18位身份号码检测
//出生日期的合法性检查
//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
          if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0 )) {
              ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
          } else {
              ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
          }
          if (ereg.test(idcard)) {//测试出生日期的合法性
//计算校验位
              S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                  + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                  + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                  + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                  + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                  + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                  + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                  + parseInt(idcard_array[7]) * 1
                  + parseInt(idcard_array[8]) * 6
                  + parseInt(idcard_array[9]) * 3;
              Y = S % 11;
              M = "F";
              JYM = "10X98765432";
              M = JYM.substr(Y, 1);//判断校验位
              if (M == idcard_array[17])
                  return Errors[0]; //检测ID的校验位
              else
                  return Errors[3];
          }
          else return Errors[2];
          break;
      default:
          return Errors[1];
          break;
  }
}

///=======================================================
/// Function Name:checkHtml
/// Function Desc:检查文本框中输入内容是否含有HTML标记
///=======================================================
function checkHtml(value)
{
    var chars = value;

    var reg = /[\<\>\<>\/>\<\/>]/g;

    if(reg.exec(chars) == null)
    {
       return true;
    }
       return false;
}


function isQQ(aQQ) {
    var bValidate = RegExp(/^[1-9][0-9]{4,9}$/).test(aQQ);
    if (bValidate) {
        return true;
    }
    else
        return false;
}

function isWeixin(weixin){
    var bValidate_weixin = RegExp(/^[a-zA-Z\d_-]{5,}$/).test(weixin);
    if (bValidate_weixin) {
        return true;
    }
    else
        return false;
}

//@magic
var TEAM={
    isSub:0,
    delId:0,
    init:function(){
        $('#switch_box').bootstrapSwitch();
        $("#mail").bind('blur',this.validateEmail);
    },
    eventReg:function(){
        $(".btn-del").click(function(){
            //alert('')
            $("#deltr").modal('show');
            TEAM.delId=$(this).data('value');
            //console.log(this.delId);
        });

    },
    CheckName: function () {
        $("#nameMsg").removeClass().html("");
        var name = $.trim($("#name").val());
        if (name.length < 2) {
            showError("姓名长度不能少于2位");

        }else if(name.length > 15){
            showError("姓名长度不能大于2位");

        } else {

            return true;
        }
        return false;
    },
    validateAll:function(){
        if(this.CheckName()){
            var permission = $("#permission").val();

            if (permission == '') {
                showError('请至少选择一个应用进行权限分配');
                return false;
            }

            $("#mail").blur();
            var s = TEAM.isSub;
            if (s != 1) {
                return true;
            }
        }

        return false;
    },

    validateEmail: function () {
        var mail = $(this).val();
        var email = $("#email").val();


        var valiEmail=function (val) { //email, 0为不合法, 1为合法;
            var val = val,
                r = "";
            r = val.match(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]{2,4})+/ig);
            if (r != null) {
                r = 1;
            }
            else {
                r = 0;
            }
            return r;
        };
        //alert(mail);
        if(email!=undefined && email==mail){
            TEAM.isSub=2;
            return true; //如果是编辑,并且邮箱跟之前的邮箱一致则不需要判断
        }

        var isok = valiEmail(mail);
        if(!isok){
            showError("邮箱格式错误");
            TEAM.isSub=1;
            return false;
        }


        $.ajax({
            type: 'GET',
            url: BmobNamespace.validateEmail,
            data: {'email': mail},
            dataType: 'json',
            success: function (response) {
                if (response.ok == 'yes') {
                    TEAM.isSub=1;
                    showError(response.msg);
                    return false;
                }else{
                    TEAM.isSub=0;
                }
            }
        });


    },
    //删除记录
    DelRow : function(){
        var id = TEAM.delId;
        console.log(id);
        if (id) {
            $.ajax({
                type: 'GET',
                url: BmobNamespace.delRowUrl,
                data: {'id': id},
                dataType: 'json',
                //async: false,
                success: function (response) {
                    console.log(response);
                    if ('success' == response.msg) {
                        $("#deltr").modal('hide');
                        showSuccess("删除成功");
                        $("#row-"+response.id).remove();
                        //window.location.href = BmobNamespace.browserUrl;
                    } else {
                        $("#deltr").modal('hide');
                        showError(response.msg);
                    }
                }
            });
        } else {
            showError("不在列表中或已经删除");
        }

    },

};

//点击自定义模板
var verifyInfo = function(){
    var open_id = BmobNamespace.userOpenId;
    if(!open_id){
        $('#InfoModal').modal('show');
        return false;
    }
    location.href = BmobNamespace.userInfo;
}


//跳转到绑定
var bindWx = function(){
    location.href = BmobNamespace.thirdparty;
}