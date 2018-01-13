$(function(){
//设置最小高度
$("#content").css("minHeight",$(window).height()-330);
var classId;
var str = window.location.search;
if(str.indexOf("?classId=") > -1){
	classId = str.replace("?classId=","");
	if(classId == 5){
		classId = 4;
	}
	$(".nav_list li a").removeClass("hold_current");
	$(".nav_list li").eq(classId).find("a").addClass("hold_current");
}
//nav展开
var GlobalNav = $.globalNav = (function() {
	var buttonObj, prevObj, bgFlg = false,
	heightValue = 0;
	function init() {
		$(".nav_list li:not('li.spread_none') a").hover(function() {
			if (!$(this).hasClass("current") && !$("#global_nav_inner").find("." + buttonObj).is(":animated")) {
				buttonObj = $(this).parent().attr("class");
				$(".nav_list li a").removeClass("current");
				$(this).addClass("current");
				heightValue = $(this).attr("data-height");
				$("#global_nav_inner").stop(false, true).animate({
					height: heightValue,
					opacity: 1
				},
				300);
				$("#global_nav_inner").find(".nav_details > li").attr("style", "");
				$("#global_nav_inner").find("." + buttonObj).stop().animate({
					height: heightValue,
					opacity: 1
				},
				0);
			}
			return false;
		});
		$(".global_hide_leave").mouseleave(function() {
			clear_global_out();
		});
		$(".global_hide,.spread_none").hover(function() {
			clear_global_out();
		});
		function clear_global_out() {
			$(".nav_list li a").removeClass("current");
			$("#global_nav_inner").find(".nav_details > li").removeClass("current");
			$("#global_nav_inner").stop(false, true).animate({
				height: 0,
			},
			300);
		}
	}
	return {
		init: init
	}
})();
$(GlobalNav.init);
//屏幕到达模块时显示
var i = 0;
$('.animate-box').waypoint(function(direction) {
	if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {
		i++;
		$(this.element).addClass('item-animate');
		setTimeout(function() {
			$('body .animate-box.item-animate').each(function(k) {
				var el = $(this);
				setTimeout(function() {
					var effect = el.data('animate-effect');
					if (effect === 'fadeIn') {
						el.addClass('fadeIn animated-fast');
					} else if (effect === 'fadeInLeft') {
						el.addClass('fadeInLeft animated-fast');
					} else if (effect === 'fadeInRight') {
						el.addClass('fadeInRight animated-fast');
					} else {
						el.addClass('fadeInUp animated-fast');
					}
					el.removeClass('item-animate');
				},
				k * 200, 'easeInOutExpo');
			});
		},
		100);
	}
},
{
	offset: '85%'
});

//nav 设置
var contentDistance = 0;
	var browserHeight = $(window).height();
	var chunkNum = $(".see_show").length;
	contentDistance = $("#content").offset().top;
	function addRemove(){
		if ($(window).scrollTop()>=(contentDistance)) {
         	$("#header").addClass("show_fixed");
        }
		if($(window).scrollTop()==0){
			$("#header").removeClass("show_fixed");
		}
	}
	$(window).scroll(function(){
		contentDistance = $("#content").offset().top;
    	addRemove();
		var scrollT = $(window).scrollTop();
		for(var i=0;i<chunkNum;i++){
			var nowChunkT = $(".see_show").eq(i).offset().top;
			if(nowChunkT-scrollT < browserHeight-100){
				$(".see_show").eq(i).addClass("add_bg");
			}
		}
    });
	$(window).resize(function(){
    	contentDistance = $("#content").offset().top;
    });
});
$(document).on('click','.hide_btn', function() {
	$('.hide_chunk').fadeOut();
});

//公用-页面顶部用户点击判断：为登录，弹窗登录
checkLogin();
var ifGetLoginState = false;//false为不在循环查询联登状态
var intervalOgj;//定时查询对象，结束定时任务时要清除该对象
var uuid;//保存pc端联登时要带的参数
function checkLogin(){
	$.ajax({
		type : "POST",
		url : "loginAction!getUserInfo.action",
		async : true,
		dataType : 'json',
		success : function(data){
			if(data.success){
				$(".user_click").addClass("bg_none");
				$(".user_click").css({"background":"url("+data.result.headUrl+") no-repeat","backgroundSize":"cover"});
				//已登录
				$(".user_click").click(function(){
					$(".user_set").toggleClass("set_show");
				});
			}else{
				//未登录
				$(".user_click").removeClass("bg_none");
				$(".user_click").click(function(){
					toLogin();
				});
			}
		}
	});
}

//登出
function loginOut(){
	$.ajax({
		type : "POST",
		url : "loginAction!loginExit.action",
		async : true,
		dataType : 'json',
		success : function(data){
			if(data.success){
				$(".user_click").css({"background":""});
				$(".user_set").removeClass("set_show");
				$(".user_click").removeClass("bg_none");
				point(data.message);
				//未登录
				$(".user_click").click(function(){
					$(".user_set").hide();
					toLogin();
				});
			}
		}
	});
}

//弹窗扫码登录
function toLogin(){
	var login = '<div class="login_chunk hide_chunk"><h2>登录进入设计美学的世界</h2><div class="login_details">';
	login += '<div class="login_qr"><div id="qrcode"></div><span>微信 扫描二维码登录&quot;Major&quot;</span></div>';
	login += '</div><span class="close_btn hide_pop"><img src="../img/icon-close.png"></span></div>';
	login += '<div class="hold_black hide_chunk"></div>';
	$("body").append(login);
	$(".login_chunk").fadeIn();
	$(".hold_black").fadeIn();
	//动态生成二维码
	uuid = getUuid();
	console.log(uuid);
	var qrUrl = "http://test.majormei.com/loginAction!loginWeixin_aa.action?state=1&uuid="+uuid;
	$('#qrcode').qrcode({width: 180,height: 180,text: qrUrl});
	getLoginStateInterval();
}

//定时获取登录状态
function getLoginStateInterval(){
	//2秒获取一次登录状态
	ifGetLoginState = true;
	intervalOgj = setInterval(function(){
		if(!ifGetLoginState){
			clearInterval(intervalOgj);//清除任务
		}else{
			getLoginState();
		}
	}, 2000);
}

//获取登录用户数据，1.5秒执行一次
function getLoginState(){
	if(ifGetLoginState){
		$.ajax({
			type : "POST",
			url : "loginAction!getLoginWeixinState.action",
			data : {uuid:uuid},
			async : true,
			dataType : 'json',
			success : function(data){
				if(data.success){
					console.log(data.result);
					ifGetLoginState = false;
					if(null != data.result){
						$(".user_click").addClass("bg_none");
						$(".user_click").css({"background":"url("+data.result.headUrl+") no-repeat","backgroundSize":"cover"});
					}
					//已登录
					$(".user_click").click(function(){
						//扫码弹窗隐藏
						$(".login_chunk").remove();
						$(".hold_black").remove();
						//弹窗我的
						$(".user_set").toggleClass("set_show");
					});
					//扫码弹窗隐藏
					$(".login_chunk").remove();
					$(".hold_black").remove();
				}
			}
		});
	}
}

//获取uuid
function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

$(document).on('click','#content', function() {
	$(".user_set").removeClass("set_show");
});
//关闭弹出
$(document).on('click','.hide_pop', function() {
	ifGetLoginState = false;
	$(".hide_chunk").remove();
});

/*错误信息提示
msg:信息内容
infoType:信息类型,默认为空 错误信息为：1
*/

function point(msg,infoType) {
	$(".pop_info").remove();
	if(infoType == 1){
		$("body").append('<div class="pop_info wrong"><i></i>'+msg+'</div>');
	}else{
		$("body").append('<div class="pop_info"><i></i>'+msg+'</div>');
	}
	$('.pop_info').delay(1500).fadeOut(0);
}