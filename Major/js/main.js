$(function(){
//设置最小高度
$("#content").css("minHeight",$(window).height()-330);
var classId;
var str = window.location.search;
if(str.indexOf("?classId=") > -1){
	classId = str.replace("?classId=","");
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
$(document).on('click','.user_click', function() {
	$(".user_set").toggleClass("set_show");
});
$(document).on('click','#content', function() {
	$(".user_set").removeClass("set_show");
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
