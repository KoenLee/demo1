jQuery(document).ready(function($) {
	$(".zan").click(function(e) {
		var $i = $(".zan i"),
			$b = $("<b>").text("+1"),
			n = parseInt($i.text());
		$b.css({
			"bottom": 0,
			"z-index": 999,
		});
		$i.text(n + 1);
		console.log($i.text(n + 1));
		$(".zan").append($b);
		$b.animate({
			"bottom": 100,
			"opacity": 0
		}, 1000, function() {
			$b.remove();
		});
		var d = setInterval(function() {
			clearInterval(d);
			if ($(".zan b").length == 1) {
				$.post("", {
					zan: $i.text()
				})
			}
		}, 1000)
		e.stopPropagation();
	});
});


var user = {
	init: function() {
		var element = {
			textareaClass: $('.textarea'),
			page8Textarea: $('textarea.page8-textarea'),
			form_datetime: $(".form_datetime")
		}
		if (element.textareaClass.length != 0) {
			this.editorInit(element.textareaClass, []);
		}
		if (element.page8Textarea.length != 0) {
			this.editorInit(element.page8Textarea, ['image']);
		}

		this.nav_scroll();
		this.liuyan();
		this.search();
		this.itemShow();
	},
	alert: function(type, msg) {
		noty({
			text: msg,
			type: type,
			layout: 'top',
			timeout: 1000
		});
	},
	scrollTop: function(id,num) {
		var scroll_offset = id.offset();
		$("body,html").animate({
			scrollTop: (scroll_offset.top - num)
		}, 600);
	},
	editorInit: function(id, NewButtons) {
		var buttons = ['bold', 'italic', 'deleted', 'link', 'alignment', 'horizontalrule'];
		if (NewButtons.length !== 0) {
			for (var i = 0; i < NewButtons.length; i++) {
				buttons.push(NewButtons[i]);
			}
		};
		console.log(buttons);
		id.redactor({
			//air: true,
			//focus: true,
			//fullpage: true,
			lang: 'zh_cn',
			minHeight: 200,
			plugins: ['fontcolor','video'],
			//buttons: buttons,
			imageUpload: '/index.php/Home/Index/upload'
		});
	},
	alertinfo: function(type, msg) {
		noty({
			text: msg,
			type: type,
			layout: 'top',
			timeout: 600
		});
	},
	openCloseModal: function(id, t) {
		return null == t && (t = !1),
			id.is(":visible") ? t ? void 0 : id.animate({
				top: "52%",
				opacity: 0
			}, 400, "easeInOutQuart", function() {
				return id.hide(),
					id.parents('.new-dialog').hide()
			}) : (
				id.css({
					top: "52%",
					opacity: 0
				}).show(),
				id.css({
					"margin-top": -id.height() / 2
				}),
				id.animate({
					top: "50%",
					opacity: 1
				}, 400, "easeInOutQuart"),
				id.parents('.new-dialog').show())
	},
	picEach: function(id) {
		var _picsArrVal = [];
		var _picObj = {};
		var conData = {};
		id.each(function(i) {
			var _t = $(this);
			var _dataUrl = _t.attr('data-url');
			var _dataThumbnailurl = _t.attr('data-thumbnailurl');
			if (_dataUrl != '' && _dataUrl != undefined) {
				var specifications = {};
				_t.parents('a').next('.specifications').find('input').each(function(i) {
					var $t = $(this);
					specifications[$t.attr('data-name')] = {
						name: $t.attr('data-name'),
						value: $t.val()
					};
				});

				_picObj = {
					'url': _dataUrl,
					'thumbnail_url': _dataThumbnailurl,
					'specifications': specifications
				}
				_picsArrVal[i] = _picObj;
			}

		});
		conData = _picsArrVal;
		return conData;
	},
	nav_scroll:function(){
	    $('.chapter-id').on('click',function(){
	        var id = $(this).attr('data-id');
	        user.scrollTop($('#'+id),100);
	    });
	    /*$('.alert-box-btn').on('click',function(){
	        user.scrollTop($('#alert-box'),100);
	    });*/


	},
	liuyan:function(){
		var data = {};
		var RegCellPhone = /^([0-9]{11})?$/;

		$('.about-sumbit-btn a').on('click',function(){

			var url = "/Home/Index/liuyan";
			var uName = $('.uName').val();
			var uPhone = $('.uPhone').val();
			var uEmail = $('.uEmail').val();
			var uContent = $('.uContent').val();
			if(uName=="" || uPhone=="" || uEmail=="" || uContent==""){
				$('.prompt-txt').addClass('active');
				$('.prompt-txt span').text("请填写完整信息。");
				setTimeout(function(){
					$('.prompt-txt').removeClass('active');
				},1800);
				return false;
			}
			if(!RegCellPhone.test(uPhone)){
				$('.prompt-txt').addClass('active');
				$('.prompt-txt span').text("请输入正确的手机号。");
				setTimeout(function(){
					$('.prompt-txt').removeClass('active');
				},1800);
				return false;
			}

			data = {
				'username' : uName,
				'mobile' : uPhone,
				'email' : uEmail,
				'content' : uContent,
			}

			user.ajaxFun('post',url,data);
		});
	},
	search:function(){
		var local_href = "http://banner.fxiang.com/Index/listAll.html";
		$('.nav-year-box ul li').on('click',function(){
			$('.nav-year-box ul li').removeClass('active');
			$(this).addClass('active');
			var year = $('.nav-year-box ul li.active').find('a').attr('data-year');
			var name = $('.nav-type-box ul li.active').find('a').attr('data-name');
			var is_before = $('.nav-year-box ul li.active').find('a').attr('data-before');
			if(is_before==''||is_before==0){
				is_before = 0;
			}else{
				is_before = 1;
			}
			window.location.href = local_href + '?year='+year+'&name='+name+"&is_before="+is_before;
			// console.log(local_href + '?year='+year+'&name='+name);
		});
		$('.nav-type-box ul li').on('click',function(){
			$('.nav-type-box ul li').removeClass('active');
			$(this).addClass('active');
			var year = $('.nav-year-box ul li.active').find('a').attr('data-year');
			var name = $('.nav-type-box ul li.active').find('a').attr('data-name');
			var is_before = $('.nav-year-box ul li.active').find('a').attr('data-before');
			if(is_before==''||is_before==0){
				is_before = 0;
			}else{
				is_before = 1;
			}
			window.location.href = local_href + '?year='+year+'&name='+name+"&is_before="+is_before;
			// console.log(local_href + '?year='+year+'&name='+name);
		});
	},
	itemShow:function(){
		var data = {};
		var url = '';
		/*$('.list-conter a').on('click',function(){
            $('.popup-box').show();
            $('body').attr('style','overflow:hidden;')
            $('.alert-box').addClass('over-y');

            var id = $(this).attr('data-id');
            url = '/Home/index/item';
            data = {
            	'id' : id
            }
            user.ajaxFun('post',url,data);

            return false;
        });*/


        $('.alert-box-btn').on('click',function(){
            $('.popup-box.alert-box').show();
            $('body').attr('style','overflow:hidden;')
            $('.alert-box').addClass('over-y');

            var id = $(this).attr('data-id');
            url = '/Home/index/item';
            data = {
            	'id' : id
            }
            user.ajaxFun('post',url,data);
            
            return false;
        });


        $('.popup-bg').on('click',function(){
            $('.popup-box').hide();
            $('body').attr('style','overflow:auto;')
            $('.alert-box').removeClass('over-y');
        });

	},
	ajaxFun:function(type,url,data){
		$.ajax({
		type: type,
		url: url,
		data: data,
		beforeSend: function() {
			console.log('保存中......');
		},
		success: function(data) {
			if (data.status == 1) {
				if(data.type=="item_show"){
					console.log(data);
					$('.alert-box .left-center').html(data.data.good_item);
					$('.alert-box label').html(data.data.title);
					$('.alert-box .title-center').html(data.data.ytitle);
					$('.alert-box .text-center').html(data.data.jianjie);
					$('.alert-box a').attr('href',data.data.pdf);
					if(data.data.pdf_type == 0){
						$('.alert-box .bottom-center').hide();
					}else{
						$('.alert-box .bottom-center').show();
					}

				}else{
					user.alert('success', data.content);
					$('.about-box').hide();
				}
			} else {
				user.alert('error', data.content);
			}
		},
		error: function() {
			console.log('error');
		}

		});
	}
};
$(function() {
	user.init();
	var $closeButton = $('.close-button');
	//关闭弹窗
	$closeButton.on({
		click: function() {
			var _dialog = $(this).parents('.dialog-box');
			user.openCloseModal(_dialog);
		}
	});

	
});
$(function() {
	$('.add_parameter_list_item').on('click', function() {
		var _t = $(this);
		$("#ui-new-parameter-page-item").tmpl().insertBefore(_t);
	});
	$(document).on('click','.add_parameter_list_item-two', function() {
		var _t = $(this);
		$("#ui-new-parameter-page-item-two").tmpl().insertBefore(_t);
	});
});


