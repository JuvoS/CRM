var _app_create_submit = function(form) {
	var app_level = form.find(".active").attr("app-level");
	$.ajax({
		type: form.attr("method"),
		url: form.attr("action"),
		data: form.serialize(),
		dataType: "json",
		success: function(response) {
			console.log(response);
			if("success" == response.msg) {
				if(app_level == 0) {
					window.location.href = BmobNamespace.listUrl
				} else {
					window.location.href = BmobNamespace.upgradeLevelUrl + "/" + response.appId
				}
			} else {
				showError(response.msg)
			}
		}
	})
};
var _app_create_form_change = function(form) {
	var name = $.trim(form.find("input[type=text][name='name']").val());
	var catId = parseInt(form.find("select[name=cat_id]").val());
	var active = form.find(".active").length;
	active = active == 1 ? true : false;
	var ok = name && catId && active;
	if(ok) {
		form.find("input[type=submit],button[type=submit]").removeAttr("disabled")
	} else {
		form.find("input[type=submit],button[type=submit]").attr("disabled", "disabled")
	}
};
var listPageObj = {
	"autoload": function() {
		$(".table-responsive").each(function(index, el) {
			$(this).on("click", function(e) {
				e.preventDefault();
				var id = $(this).find("input[type=hidden][name='id']").val();
				var priority_url = $(this).find("input[type=hidden][name='priority_url']").val();
				if($.trim(priority_url) == "") {
					alert("您暂无此应用任何模块的读权限，请联系该应用的属主")
				} else {
					window.location.href = priority_url
				}
			});
			if($(this).hasClass("app-over")) {
				$(this).unbind("click");
				$(this).find('td:not(".update")').click(function(e) {
					e.preventDefault();
					var id = $(this).parent().find("input[type=hidden][name='id']").val();
					var priority_url = $(this).parent().find("input[type=hidden][name='priority_url']").val();
					if($.trim(priority_url) == "") {
						alert("此应用暂无读权限，请联系管理员")
					} else {
						window.location.href = priority_url
					}
				})
			}
		})
	},
	"eventReg": function() {
		var form = $("#appCreate");
		var el = form.find("p.tips");
		form.find("input[type=text][name='name']").on("keyup blur", function() {
			var name = $(this).val();
			if(!name) {
				el.html("应用名称不能为空")
			} else {
				el.html("")
			}
			_app_create_form_change(form)
		});
		form.find("select[name='cat_id']").on("change", function() {
			var catId = parseInt($(this).val());
			if(!catId) {
				el.html("请选择一个应用类型")
			} else {
				el.html("")
			}
			_app_create_form_change(form)
		});
		form.find(".price-select").on("click", function() {
			_app_create_form_change(form)
		});
		form.submit(function(e) {
			$("#appCreateModal").modal("hide");
			_app_create_submit($(this));
			e.preventDefault()
		});
		$(".internet ").on("click", function() {
			var id = $(this).attr("app-id");
			window.location.href = BmobNamespace.internetUrl + "/" + id;
			return false
		});
		$(".applevel").on("click", function() {
			var id = $(this).attr("app-id");
			window.location.href = BmobNamespace.upgradeLevelUrl + "/" + id;
			return false
		})
	}
};
var _app_info_submit = function(form) {
	var name = $.trim(form.find("input[type=text][name='name']").val());
	if(!name) {
		showError("应用名称不能为空");
		return false
	}
	form.find("input[type=submit],button[type=submit]").attr("disabled", "disabled");
	$.ajax({
		type: form.attr("method"),
		url: form.attr("action"),
		data: form.serialize(),
		success: function(response) {
			if(response == "success") {
				showSuccess("更新成功");
				$("input[name=domain]").attr("disabled", "disabled")
			} else {
				if(response != "") {
					showError(response)
				} else {
					showError("更新失败")
				}
			}
			setTimeout(function() {
				form.find("input[type=submit],button[type=submit]").removeAttr("disabled")
			}, 3000)
		}
	})
};
var _app_info_submit1 = function(form) {
	var name = $.trim(form.find("input[type=text][name='name']").val());
	if(!name) {
		showError("应用名称不能为空");
		return false
	}
	form.find("input[type=submit],button[type=submit]").attr("disabled", "disabled");
	$.ajax({
		type: form.attr("method"),
		url: form.attr("action"),
		data: form.serialize(),
		success: function(response) {
			if(response == "success") {
				showSuccess("更新成功");
				window.location.reload();
				$("input[name=domain]").attr("disabled", "disabled")
			} else {
				if(response != "") {
					showError(response)
				} else {
					showError("更新失败")
				}
			}
			setTimeout(function() {
				form.find("input[type=submit],button[type=submit]").removeAttr("disabled")
			}, 3000)
		}
	})
};
var _app_upload_submit = function(form) {
	var link = $.trim(form.find("input[type=text][name='link']").val());
	var url = $.trim(form.find("input[type=hidden][name='android_url']").val());
	if(!link && !url) {
		showError("应用URL地址和应用文件必须填写一个");
		return false
	}
	if(link && !IsURL(link)) {
		showError("应用URL地址必须以http或https开头");
		return false
	}
	form.find("input[type=submit],button[type=submit]").attr("disabled", "disabled");
	$.ajax({
		type: form.attr("method"),
		url: form.attr("action"),
		data: form.serialize(),
		success: function(response) {
			if(response == "success") {
				showSuccess("更新成功")
			} else {
				showError("更新失败")
			}
			setTimeout(function() {
				form.find("input[type=submit],button[type=submit]").removeAttr("disabled")
			}, 3000)
		}
	})
};
var _app_transfer_submit = function(form) {
	var transfer_user_pass = $.trim(form.find("input[type=password][name='transfer_user_pass']").val());
	var receive_user_mail = $.trim(form.find("input[type=text][name='receive_user_mail']").val());
	if(!transfer_user_pass) {
		showError("当前账户登录密码不能为空");
		return false
	}
	if(!receive_user_mail) {
		showError("接收当前应用账号不能为空");
		return false
	}
	form.find("input[type=submit],button[type=submit]").attr("disabled", "disabled");
	$.ajax({
		type: form.attr("method"),
		url: form.attr("action"),
		data: form.serialize(),
		dataType: "json",
		success: function(response) {
			if((typeof response.status != "undefined") && response.status.state == "VerifyPay") {
				$("#updateUserLevelNotice").html("应用转让 是一项高级功能");
				$("#updateUserLevelModal").modal("show")
			} else {
				if(1000 == response.status.code) {
					showSuccess("APP转让成功");
					setTimeout(function() {
						window.location.href = createUrl("app/list")
					}, 3000)
				} else {
					showError(response.status.msg)
				}
				setTimeout(function() {
					form.find("input[type=submit],button[type=submit]").removeAttr("disabled")
				}, 3000)
			}
		}
	})
};
var _app_del_submit = function(form) {
	$("#confirmDeleteModal").modal("hide");
	$.ajax({
		type: form.attr("method"),
		url: form.attr("action"),
		data: form.serialize(),
		async: false,
		success: function(response) {
			if("success" == response) {
				window.location.href = createUrl("app/list")
			} else {
				showError(response)
			}
		}
	})
};
var _app_unbind_submit = function(form) {
	$("#confirmUnBindModal").modal("hide");
	$.ajax({
		type: form.attr("method"),
		url: form.attr("action"),
		data: form.serialize(),
		async: false,
		success: function(response) {
			if("success" == response) {
				window.location.href = createUrl("app/list")
			} else {
				showError(response)
			}
		}
	})
};
var _app_del_blur = function(form) {
	var pass = $.trim(form.find("input[type=password][name='pass']").val());
	if(!pass) {
		showError("当前账户登录密码不能为空");
		return false
	}
	$("#confirmDeleteModal").modal("show")
};
var _app_un_bind = function(form) {
	var pass = $.trim(form.find("input[type=password][name='pass']").val());
	if(!pass) {
		showError("当前账户登录密码不能为空");
		return false
	}
	$("#confirmUnBindModal").modal("show")
};
var _edit_app_field = function(field, value) {
	if(("name" == field || "cat_id" == field || "desc" == field || "status" == field || "no_create_table" == field || "no_create_delete_column" == field || "https_file_url_open" == field || "android_url" == field || "ios_url" == field) && undefined != value) {
		$.ajax({
			type: "POST",
			url: BmobNamespace.editAppFieldUrl,
			data: {
				"field": field,
				"value": value
			},
			dataType: "html",
			success: function(response) {
				if("success" == response) {
					showSuccess("更新成功")
				} else {
					showError(response)
				}
			}
		})
	}
};
var _upload_app_init = function() {
	$("#file_upload_app").uploadify({
		"auto": true,
		"queueSizeLimit": 1,
		"multi": false,
		"removeTimeout": 5,
		"fileSizeLimit": "50MB",
		"fileTypeDesc": "Android or iOS Files",
		"fileTypeExts": "*.apk;*.ipa;*.7z;*.zip;*.rar;*.tar;*.tar.gz",
		"buttonText": "浏览文件",
		"swf": BmobNamespace.uploadSwf,
		"uploader": BmobNamespace.uploadFile,
		"formData": {
			"f": "websiteapp"
		},
		"onUploadError": function(file, errorCode, errorMsg, errorString) {
			showError("上传失败！")
		},
		"onSelectError": function(file, errorCode, errorMsg) {
			var settings = this.settings;
			if($.inArray("onSelectError", settings.overrideEvents) < 0) {
				switch(errorCode) {
					case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
						if(settings.queueSizeLimit > errorMsg) {
							this.queueData.errorMsg = "\nThe number of files selected exceeds the remaining upload limit (" + errorMsg + ")."
						} else {
							this.queueData.errorMsg = "\nThe number of files selected exceeds the queue size limit (" + settings.queueSizeLimit + ")."
						}
						break;
					case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
						this.queueData.errorMsg = '\n文件名: "' + file.name + '" 超过控制大小 (' + settings.fileSizeLimit + ").";
						break;
					case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
						this.queueData.errorMsg = '\n文件名 "' + file.name + '" 为空.';
					case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
						this.queueData.errorMsg = '\n文件名 "' + file.name + '" 不是正确的文件类型.'
				}
			}
		},
		"onCancel": function(file) {
			$("#file_app").val("");
			showError("上传被取消！")
		},
		"onUploadSuccess": function(file, data, response) {
			if(data == "-1") {
				showError("文件格式不正确，上传失败")
			} else {
				if(data == "-2") {
					showError("文件大小不能超过" + BmobNamespace.limit_size + "，上传失败")
				} else {
					if(data) {
						var file = jQuery.parseJSON(data);
						$("#android_url").val(file.filepath);
						$("#upload_status").removeClass("hidden");
						showSuccess("上传成功")
					} else {
						showError("上传失败")
					}
				}
			}
		}
	})
};
var webPageObj = {
	"autoload": function() {
		$('.switch [type="checkbox"]').bootstrapSwitch();
		_upload_app_init()
	},
	"eventReg": function() {
		$("#updateFile").fileupload({
			dataType: "json",
			url: BmobNamespace.appLogoUrl + "/size/120",
			done: function(e, data) {
				var msg = data.result.msg;
				if("success" == msg) {
					$("#app_logo").attr("src", "/" + data.result.url);
					$("#appInfo").find("input[name=icon]").val(data.result.url)
				} else {
					showError(msg)
				}
			}
		});
		$("#code_file").fileupload({
			dataType: "json",
			url: BmobNamespace.appLogoUrl + "/size/200",
			done: function(e, data) {
				var msg = data.result.msg;
				if("success" == msg) {
					$("#code_file_url").val(data.result.url);
					$("#appInfo").find("img[name=code_file_img]").attr("src", "/" + data.result.url)
				} else {
					showError(msg)
				}
			}
		});
		$("#file_upload_img").uploadify({
			"auto": true,
			"queueSizeLimit": 5,
			"multi": true,
			"removeTimeout": 5,
			"fileSizeLimit": "5MB",
			"fileTypeDesc": "Image Files",
			"fileTypeExts": "*.png;*.jpg;",
			"buttonText": "浏览图片",
			"swf": BmobNamespace.uploadSwf,
			"uploader": BmobNamespace.uploadFile,
			"onUploadError": function(file, errorCode, errorMsg, errorString) {
				showError("上传失败！")
			},
			"onSelect": function() {
				var a = 0;
				$("#pics input").each(function(index, el) {
					if($(this).val() != "") {
						a++
					}
				});
				if(a > 4) {
					$("#file_upload_img").uploadify("cancel");
					$("#file_upload_img").uploadify("disable", true);
					return false
				}
			},
			"onSelectError": function(file, errorCode, errorMsg) {
				var settings = this.settings;
				if($.inArray("onSelectError", settings.overrideEvents) < 0) {
					switch(errorCode) {
						case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
							if(settings.queueSizeLimit > errorMsg) {
								this.queueData.errorMsg = "\nThe number of files selected exceeds the remaining upload limit (" + errorMsg + ")."
							} else {
								this.queueData.errorMsg = "\n最多只能选择" + settings.queueSizeLimit + "张图片."
							}
							break;
						case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
							this.queueData.errorMsg = '\n文件名: "' + file.name + '" 超过上传大小：' + settings.fileSizeLimit + ".";
							showError("文件大小不能超过5MB上传失败");
							break;
						case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
							this.queueData.errorMsg = '\n文件名 "' + file.name + '" 为空.';
						case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
							this.queueData.errorMsg = '\n文件名 "' + file.name + '" 不是正确的文件类型.'
					}
				}
			},
			"onCancel": function(file) {
				$("#file_app").val("");
				showError("上传被取消！")
			},
			"onUploadSuccess": function(file, data, response) {
				if(data == "-1") {
					showError("文件格式不正确，上传失败")
				} else {
					if(data == "-2") {
						showError("文件大小不能超过" + BmobNamespace.limit_img_size + "，上传失败")
					} else {
						if(data) {
							var fileData = jQuery.parseJSON(data);
							var idx = file.index;
							if($("#app_pic_0").val() == "") {
								idx = 0
							} else {
								if($("#app_pic_1").val() == "") {
									idx = 1
								} else {
									if($("#app_pic_2").val() == "") {
										idx = 2
									} else {
										if($("#app_pic_3").val() == "") {
											idx = 3
										} else {
											if($("#app_pic_4").val() == "") {
												idx = 4
											}
										}
									}
								}
							}
							var a = 0;
							$("#pics input").each(function(index, el) {
								if($(this).val() != "") {
									a++
								}
							});
							if(a > 3) {
								$("#file_upload_img").uploadify("disable", true)
							}
							$("#app_pic_" + idx).val(fileData.filepath);
							$("#pics div").find("img").eq(idx).attr("src", "/" + fileData.filepath);
							showSuccess("上传成功")
						} else {}
					}
				}
			}
		});
		$("#pics>div").hover(function() {
			var index = $(this).index(),
				picId, picVal;
			if(index < 5) {
				picId = "#app_pic_" + index;
				picVal = $(picId).val();
				console.log(picVal);
				if(picVal != "") {
					$(this).children(".del-box").stop().fadeToggle(300)
				}
			}
		});
		$("#pics .del").click(function(e) {
			var $this = $(this).parent().prev(),
				path = $this.attr("src"),
				defauleUrl = $(this).parent().parent().parent().attr("data-url"),
				targetId = $(this).attr("data-attr"),
				dels = $(this).parent();
			if($("#" + targetId).val() == "") {
				showError("不能删掉为空的图片");
				return false
			}
			$("#" + targetId).val("");
			$this.attr("src", defauleUrl);
			$(this).parent().stop().fadeToggle(300);
			$("#file_upload_img").uploadify("disable", false);
			$.ajax({
				type: "GET",
				url: BmobNamespace.appDelPicUrl,
				async: false,
				data: {
					path: path
				},
				dataType: "json",
				success: function(response) {
					if(1 == response.ok) {
						$("#" + targetId).val("");
						$this.attr("src", defauleUrl);
						showSuccess("图片删除成功")
					} else {
						showError("图片删除失败")
					}
				}
			})
		});
		$("#appInfo").submit(function(e) {
			var isvaild = 1,
				$this = $(this),
				v, msg, tName, tNameArr = new Array,
				isAndroidUp;
			if($("#apkDown").is(":checked")) {
				tNameArr.push("app_android_url")
			} else {
				tNameArr.push("upload_android_app")
			}
			if(!$("#choose-android").is(":checked")) {
				tNameArr.push("app_android_url");
				tNameArr.push("upload_android_app")
			}
			if(!$("#choose-ios").is(":checked")) {
				tNameArr.push("app_ios_url")
			}
			Array.prototype.dels = function(val) {
				var index = this.indexOf(val);
				if(index > -1) {
					this.splice(index, 1)
				}
			};
			if($("#qr_close input").is(":checked")) {
				tNameArr.push("code_file")
			}
			tNameArr.push("app_pic[]");
			var a = 0;
			$("#pics input").each(function(index, el) {
				if($(this).val() != "") {
					a++
				}
			});
			$this.find("input:not([type='file'])").add("textarea").each(function() {
				v = $(this).val();
				tName = $(this).attr("name");
				if(v == "") {
					if($.inArray(tName, tNameArr) == -1) {
						msg = $(this).parents(".form-group").find("label").text();
						msg = msg.substring(0, msg.length - 1);
						showError(msg + "不能为空" + "。");
						isvaild = 0;
						return false
					}
				} else {
					if(tName == "app_android_url" || tName == "app_ios_url") {
						if(!IsURL(v)) {
							msg = $(this).parents(".form-group").find("label").text();
							showError(msg + "格式不正确");
							isvaild = 0;
							return false
						}
					} else {
						if(tName == "name" && lengthInUtf8Bytes(v) > 20) {
							if(v.length != lengthInUtf8Bytes(v)) {
								if(lengthInUtf8Bytes(v) > 30) {
									showError("应用名称中文不能超过10个字，英文不能超过20个");
									isvaild = 0;
									return false
								}
							} else {
								showError("应用名称中文不能超过10个字，英文不能超过20个");
								isvaild = 0;
								return false
							}
						} else {
							if(tName == "desc" && v.length >= 50000) {
								showError("应用描述不能超过50000个字");
								isvaild = 0;
								return false
							} else {
								if(tName == "update_note" && v.length >= 500) {
									showError("更新说明不能超过500个字");
									isvaild = 0;
									return false
								}
							}
						}
					}
				}
			});
			if(isvaild == 1) {
				if(a == 0) {
					showError("应用截图不能为空。");
					return false
				} else {
					if(a > 0 && a < 3) {
						showError("应用截图不能小于3张。");
						return false
					}
				}
				_app_info_submit1($this)
			}
			e.preventDefault()
		})
	}
};
var updatePageObj = {
	"autoload": function() {
		$('.switch [type="checkbox"]').bootstrapSwitch();
		_upload_app_init()
	},
	"eventReg": function() {
		$("#updateFile").fileupload({
			dataType: "json",
			url: BmobNamespace.appLogoUrl + "/size/120",
			done: function(e, data) {
				var msg = data.result.msg;
				if("success" == msg) {
					$("#app_logo").attr("src", "/" + data.result.url);
					$("#appInfo").find("input[name=icon]").val(data.result.url)
				} else {
					showError(msg)
				}
			}
		});
		$("#appInfo").submit(function(e) {
			_app_info_submit($(this));
			e.preventDefault()
		});
		$("#appUpload").submit(function(e) {
			_app_upload_submit($(this));
			e.preventDefault()
		});
		$("#appTransfer").submit(function(e) {
			_app_transfer_submit($(this));
			e.preventDefault()
		});
		$("#appDel").submit(function(e) {
			e.preventDefault();
			_app_del_blur($(this))
		});
		$("#appUnBind").submit(function(e) {
			e.preventDefault();
			_app_un_bind($(this))
		});
		$("#confirmDeleteBtn").on("click", function(e) {
			_app_del_submit($("#appDel"))
		});
		$("#confirmUnbindBtn").on("click", function(e) {
			_app_unbind_submit($("#appUnBind"))
		});
		$("#noCreateTableSwitch input[type=checkbox]").on("switchChange.bootstrapSwitch", function(event, state) {
			var value = state ? 0 : 1;
			_edit_app_field("no_create_table", value)
		});
		$("#httpsFileUrlOpenSwitch input[type=checkbox]").on("switchChange.bootstrapSwitch", function(event, state) {
			var value = state ? 0 : 1;
			_edit_app_field("https_file_url_open", value)
		});
		$("#statusSwitch input[type=checkbox]").on("switchChange.bootstrapSwitch", function(event, state) {
			var value = state ? 1 : 0;
			_edit_app_field("status", value)
		});
		$("#openDomain").click(function() {
			$.ajax({
				type: "get",
				url: BmobNamespace.canOpenDomainUrl,
				success: function(res) {
					if(res == "success") {
						if(BmobNamespace.appLevel == 2 || BmobNamespace.appLevel == 3) {
							window.location.href = BmobNamespace.upgradeIndex;
							return false
						}
						window.location.href = BmobNamespace.upgradeDomainUrl
					} else {
						showError(res);
						return false
					}
				}
			})
		})
	}
};
var _open_unique_domain = function() {
	$.ajax({
		type: "GET",
		url: BmobNamespace.openUniqueDomain,
		success: function(response) {
			if("success" == response) {
				showSuccess("域名开启成功，大概一个小时左右生效。")
			} else {
				showError(response)
			}
		}
	})
};
var _backup = function() {
	$.ajax({
		type: "POST",
		url: BmobNamespace.backupAjax,
		data: {
			"act": "backup"
		},
		dataType: "json",
		success: function(response) {
			if((typeof response.status != "undefined") && response.status.state == "VerifyPay") {
				$("#upgradeUserLevelModal2").modal("show")
			} else {
				if(1000 == response.status.code) {
					var backupid = response.data.backupid;
					showSuccess("备份请求已发送！");
					var backupLine = '<tr id="backup_' + backupid + '"><td>Manual backup</td><td>0</td><td>手动备份   </td>' + '<td>备份中</td><td></td><td><button class="btn btn-link deleteBackup" data-backupid="' + backupid + '">删除</button></td></tr>';
					$("#backupList table tr:first").after(backupLine)
				} else {
					showError(response.status.msg)
				}
			}
			return false
		}
	})
};
var Back = {
	"status": 0
};
var supervisoryBackup = function(backup_id, fbackup) {
	if(Back.status != 0) {
		return
	}
	$.ajax({
		type: "POST",
		url: BmobNamespace.backupAjax,
		data: {
			"act": "supervisory",
			"backupid": backup_id
		},
		dataType: "json",
		success: function(response) {
			var backupData = response.data.backupData;
			if(backupData == "none") {} else {
				$("#backup_" + backup_id + " td").eq(0).html("Manual backup");
				$("#backup_" + backup_id + " td").eq(1).html(backupData.size);
				var status_text = "备份中";
				if(backupData.status == 0) {
					status_text = "备份中"
				} else {
					if(backupData.status == 1) {
						Back.status = 1;
						status_text = "备份成功";
						clearInterval(fbackup)
					} else {
						Back.status = 2;
						status_text = "备份失败"
					}
				}
				$("#backup_" + backup_id + " td").eq(3).html(status_text);
				$("#backup_" + backup_id + " td").eq(4).html(backupData.created);
				if(backupData.status == 1) {
					$("#backup_" + backup_id + " td").eq(5).prepend('<button class="btn btn-link generateNewApp" data-backupid="' + backup_id + '">生成新应用</button>' + '<button class="btn btn-link restoreBackup" data-backupid="' + backup_id + '">恢复数据</button>')
				}
			}
			return false
		}
	})
};
var _restore = function(backup_id) {
	$.ajax({
		type: "POST",
		url: BmobNamespace.restoreAjax,
		data: {
			"act": "restore",
			"backupid": backup_id
		},
		dataType: "json",
		success: function(response) {
			if(1000 == response.status.code) {
				var restoreid = response.data.restoreid;
				showSuccess("恢复数据请求已发送！");
				if($("#restoreList table tr").length == 0) {
					var lineTh = "<tr><th>备份时间点</th><th>还原状态</th><th>还原时间</th></tr>";
					$("#restoreList table").append(lineTh)
				}
				var restoreLine = '<tr id="restore_' + restoreid + '"><td></td><td>恢复中</td><td></td></tr>';
				$("#restoreList table tr:first").after(restoreLine);
				setTimeout(function() {
					var frestore = setInterval(function() {
						supervisoryRestore(restoreid, frestore)
					}, 3000)
				}, 3000)
			} else {
				showError(response.status.msg)
			}
			return false
		}
	})
};
var supervisoryRestore = function(restore_id, frestore) {
	$.ajax({
		type: "POST",
		url: BmobNamespace.restoreAjax,
		data: {
			"act": "supervisory",
			"restoreid": restore_id
		},
		dataType: "json",
		success: function(response) {
			var restoreData = response.data.restoreData;
			if(restoreData == "none") {} else {
				$("#restore_" + restore_id + " td").eq(0).html(restoreData.backup_created);
				var status_text = "恢复中";
				if(restoreData.restore_status == 0) {
					status_text = "恢复中"
				} else {
					if(restoreData.restore_status == 1) {
						status_text = "恢复成功";
						clearInterval(frestore)
					} else {
						status_text = "恢复失败"
					}
				}
				$("#restore_" + restore_id + " td").eq(1).html(status_text);
				$("#restore_" + restore_id + " td").eq(2).html(restoreData.restore_created)
			}
			return false
		}
	})
};
var _deleteBackup = function(_this, backup_id) {
	$.ajax({
		type: "POST",
		url: BmobNamespace.deleteBackupAjax,
		data: {
			"act": "delete",
			"backupid": backup_id
		},
		dataType: "json",
		success: function(response) {
			if(1000 == response.status.code) {
				_this.parent().parent().remove();
				showSuccess("备份版本删除成功！")
			} else {
				showError(response.status.msg)
			}
			return false
		}
	})
};
var _app_create_from_backup_submit = function(form) {
	$.ajax({
		type: form.attr("method"),
		url: form.attr("action"),
		data: form.serialize(),
		dataType: "json",
		success: function(response) {
			if(1000 == response.status.code) {
				showSuccess("已提交生成新应用请求，稍后请在应用列表中查看！")
			} else {
				if((typeof response.status != "undefined") && response.status.state == "VerifyPay") {
					$("#upgradeUserLevelNotice").html("账号应用创建数量已达到 <b>" + response.status.value + "个</b> 上限");
					$("#upgradeUserLevelModal").modal("show")
				} else {
					showError(response.status.msg)
				}
			}
		}
	})
};
var backupRestorePageObj = {
	"autoload": function() {},
	"eventReg": function() {
		$("#backupAction").on("click", function(e) {
			_backup()
		});
		$(".restoreBackup").on("click", function() {
			var backup_id = $(this).data("backupid");
			$("#confirmModal").find(".modal-body p").html("确定要恢复数据吗？");
			$("#confirmModal").modal("show");
			$("#confirmBtn").on("click", function() {
				$("#confirmModal").modal("hide");
				_restore(backup_id)
			})
		});
		$(".deleteBackup").on("click", function() {
			var _this = $(this);
			var backup_id = $(this).data("backupid");
			$("#confirmModal").find(".modal-body p").html("确定要删除该备份版本吗？");
			$("#confirmModal").modal("show");
			$("#confirmBtn").on("click", function() {
				$("#confirmModal").modal("hide");
				_deleteBackup(_this, backup_id)
			})
		});
		$(".generateNewApp").on("click", function() {
			var backup_id = $(this).data("backupid");
			$("#appCreate").find("input[type=hidden][name='backupid']").val(backup_id);
			$("#appCreateModal").modal("show")
		});
		var form = $("#appCreate");
		var el = form.find("p.tips");
		form.find("input[type=text][name='name']").on("keyup blur", function() {
			var name = $(this).val();
			if(!name) {
				el.html("应用名称不能为空")
			} else {
				el.html("")
			}
			_app_create_form_change(form)
		});
		form.find("select[name='cat_id']").on("change", function() {
			var catId = parseInt($(this).val());
			if(!catId) {
				el.html("请选择一个应用类型")
			} else {
				el.html("")
			}
			_app_create_form_change(form)
		});
		form.submit(function(e) {
			$("#appCreateModal").modal("hide");
			_app_create_from_backup_submit($(this));
			e.preventDefault()
		})
	}
};