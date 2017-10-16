(function($) {
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
			$(".navbar").mouseleave(function() {
				clear_global_out();
			});
			$(".header_top,.spread_none").hover(function() {
				clear_global_out();
			});
			function clear_global_out(){
				$(".navbar li a").removeClass("current");
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
})(jQuery);