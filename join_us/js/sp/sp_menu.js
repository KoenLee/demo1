var menuObj = $(".menu_message");
var hode_chunk = $(".out_hold");
$("#menu_button").off("click").on("click",function(){
  if(!menuObj.hasClass("current")) {
    menuObj.addClass("current");
    menuObj.stop().animate({right: "0"},200);
    hode_chunk.css("display","block").animate({opacity: "0.4"},200);
    $('body').addClass('body_fixed');
  }
});
function menu_closed(){
  menuObj.stop().animate({right: "-77%"},200,function(){
    menuObj.removeClass("current");
    hode_chunk.css("display","none");
    $('body').removeClass('body_fixed');
  });
  hode_chunk.animate({opacity: "0"},200);
}
hode_chunk.off("click").on("click",function(){
  menu_closed();
  $('body').removeClass('body_fixed');
});
function point(msg) {
	$(".common_atte").remove();
	$("body").append('<div class="common_atte"><span>'+msg+'</span></div>')
	$('.common_atte').delay(1500).fadeOut(0);
}
$(document).on('click','.coorperation_btn', function() {
	$("#wrapper").append('<div class="cooperation"><dl><dt>商务合作：</dt><dd><a href="tel:400 040 6617">400 040 6617</a></dd><dd><a href="mailto:hezuo@majormei.com">hezuo@majormei.com</a></dd></dl><a href="javaScript:;" class="c_close_btn"><img src="../img/sp/icon-close.png"></a></div><a href="javaScript:;" class="bg_pop_cooperation"></a>');
});
$(document).on('click','.bg_pop_cooperation,.c_close_btn', function() {
	$(".cooperation,.bg_pop_cooperation").remove();
});