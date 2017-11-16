/**
 * Created by lin on 16-7-19.
 */

$("#title").keyup(function() {
    var reg = /^.{0,50}$/;
    if ($("#title").val().length>50) {
       $("#title_tips").css("display","block");
    } else {
        $("#title_tips").css("display","none");
    }
});

$("#content").keyup(function() {
    var reg = /^.{0,10000}$/;
    if ($("#content").val().length>2000) {
        $("#content_tips").css("display","block");
    } else {
        $("#content_tips").css("display","none");
    }
});


var Work = {
    //List: function () {
    //
    //        $.ajax({
    //            type: 'GET',
    //            url: BmobNamespace.timeList,
    //            data: {},
    //            dataType: 'json',
    //            async: false,
    //            success: function (response) {
    //                if ('success' == response) {
    //                    showSuccess("成功");
    //                } else {
    //                    showError(response);
    //                }
    //                return true;
    //            }
    //        });
    //},
    Edit: function () {
        var id = $("#id").val();
        var app_id = $("#appId").val();
        var title = $("#title").val();
        var type=$("input[name='type']:checked").val();
        var module = $("#module").val();
        var platform=$("input[name='platform']:checked").val();
        var version = "";
        var env = 0;
        var content = $("#content").val();
        var attach = $("#url").val();
        var allow = $("#allow").is(':checked');

        // 游客工单
        var mail = '';
        if (app_id == 0) {
            mail = $('#mail').val();

            if (mail == '' || title == '' || content == '') {
                showError('请填入所有的选项');
                return;
            }
        }

        if(platform==0){
            version = $("#version").val();
            env = $("#env").val();
        }
        if(platform==1){
            version = $("#version").val();
        }

        
        if(allow){
            allow=0;
        }else{
            allow=1;
        }

        if(title==""){
            showError("标题不能为空");
            return;
        }
        $("#createButton").attr("disabled", "true");
        $.ajax({
            type: 'POST',
            url: BmobNamespace.Edit,
            data: {"id":id,"mail":mail,"app_id":app_id,"title":title,"type":type,"module":module,"platform":platform,"version":version,
                "env":env,"content":content,"attach":attach,"allow":allow},
            dataType: 'json',
            async: false,

            success: function (response) {
                $("#createButton").removeAttr("disabled");
                if ('1' == response) {
                    // 游客/用户提示文案不同
                    if (mail) {
                        showSuccess("提交成功，bmob将以邮件形式回复您，请留意邮件!");
                        setTimeout(function(){ window.location=BmobNamespace.index }, 2000);
                    } else {
                        showSuccess("编辑成功");
                        window.location=BmobNamespace.index;
                    }
                } else {
                    showError(response);
                }
                return true;
            }
        });
    },
    UpdateStatus: function (status) {

        var id=$("#id").val();
        var new_key = $("input[name='k']").val();
        $.ajax({
            type: 'POST',
            url: BmobNamespace.updateStatus,
            data: {"id":id,"status":status,"k":new_key},
            dataType: 'json',
            async: false,
            success: function (response) {
                if ('1' == response) {
                    if(status=="3"){
                        $("#closeOrder").modal('hide');
                        $("#close").css("display","none");
                        $("#open").css("display","block");
                        $("#replyButton").attr("disabled","true");
                    }else{
                        $("#restartOrder").modal('hide');
                        $("#open").css("display","none");
                        $("#close").css("display","block");
                        $("#replyButton").removeAttr("disabled");
                    }
                    showSuccess("成功");
                } else {
                    showError(response);
                }
                return true;
            }
        });
    },

    Reply: function () {
        var id=$("#id").val();
        var content=$("#replyContent").val();
        var attach =$("[name=attach]").val();
        var pid =0;

        var new_key = $("input[name='k']").val();

        if ($.trim(content) == '') {
            showError('请输入回复内容');
            return;
        }

        $("#replyButton").attr("disabled", "disabled");
        $.ajax({
            type: 'POST',
            url: BmobNamespace.reply,
            data: {"id":id,"content":content,"attach":attach,"pid":pid,"k": new_key},
            dataType: 'json',
            async: true,
            success: function (response) {
                $("#replyButton").removeAttr("disabled");
                if ('1' == response) {
                    showSuccess("成功");
                    // window.location=BmobNamespace.detail+"/"+id;
                    window.location.reload()
                } else {
                    showError(response);
                }
                return true;
            }
        });
    },

    Repository: function (data) {

        var title = $("#title").val();
        var platform=$("input[name='platform']:checked").val();
        if(data==1){
            platform=-1;
        }

        var w = $("#title").width();
        $("#repository").width(w+4);
        $.ajax({
            type: 'POST',
            url: BmobNamespace.repository,
            data: {"title":title,"platform":platform},
            dataType: 'json',
            async: false,
            success: function (response) {
                //Html='<li style="overflow:hidden;"><span class="pull-left">常见问题</span><a href='+BmobNamespace.repositoryUrl+' class="pull-right">知识库>></a></li>';
                Html='<li style="overflow:hidden;"></li>';
                if ('0' == response) {
                    $("#repository").html(Html);
                } else {
                    for(var key in response){
                        var v=response[key];
                        Html+='<li><a class="mt10" style="margin-left:22px" target="_blank" href='+BmobNamespace.repoDetail+v['id']+'>'+v['title']+'</a></li>';
                    }
                    $("#repository").html(Html);
                }
            }
        });
    },
};


function delPic(url) {

    $.ajax({
        type: 'POST',
        url: BmobNamespace.delPicUrl,
        data: {"path": url},
        dataType: 'json',
        async: false,
        success: function (response) {
            if ('1' == response.status) {
                $("#file_msg").html('').hide();
                $("#url").val("");
                showSuccess("成功");
            } else {
                showSuccess("失败");
            }
            return true;
        }
    });
}