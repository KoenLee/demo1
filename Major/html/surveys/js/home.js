//判断是否在微信浏览器打开
function isWeixinBrowser(){
  var ua = window.navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}
//是则隐藏顶栏，不显示弹窗
if (isWeixinBrowser()) {
	$('#header').css('display', 'none');
	$('.blank').eq(0).remove();
	$('.mask').remove();
	$('.test').remove();
}

//文档载入时
styleInitialize();

//改变窗口大小（屏幕旋转）时
$(window).resize(function() {
	styleInitialize();
});

//点击确认
$('.confirm').click(function() {
	$('.popup').fadeOut(400,function(){
		$(this).remove();
		$('.mask').remove();
	});
});

//划动页面时显示底部按钮
$(window).scroll(function() {
	$('.button').fadeIn(400);
});

//根据窗口尺寸调整其他元素尺寸和居中设置
function styleInitialize(){
	var W=$(window).width();
	var hW=$('.header').width();
	var H= $(window).height();

	$('.mask').css({
		width: W,
		height: $(window).height()
	});

	$('.content').css({
		padding: W*0.078,
	});
	if (W>500) {
		$('.content').css('padding',25)
	}
	$('.article-text').css({
		fontSize: W*0.0375,
	});
	$('.article-small').css({
		fontSize: W*0.0343,
	});
	$('#result-title').css({
		fontSize: W*0.04375
	});
	$('.article-title').css({
		fontSize: W*0.04375
	});
	if (W>500) {
		$('.article-text').css('fontSize', 20);
		$('#result-title').css('fontSize', 24);
		$('.article-title').css('fontSize', 24);
		$('.article-small').css('fontSize', 16);
	};
	$('figcaption').css({
		fontSize: W*0.03125,
	});
	if (W>500) {
		$('figcaption').css('fontSize', 16);
	};
	$('img').css({
		marginBottom:hW*0.0265
	});
	$('.header>img').css({
		marginBottom:0
	});
	if (W>500){
		$('img').css('marginBottom',15)
		$('.header>img').css({
			marginBottom:0
		});
	}
	if (W>500){
		$('img').css('marginBottom',15)
	}
	$('.button').css({
		height: W*0.153,
		fontSize:W*0.04375,
		lineHeight: W*0.153+'px'
	});
	if (W>500) {
		$('.button').css('lineHeight', '60px');
		$('.button').css('fontSize', 20);
	};
	$('.blank').css({
		height:$('#header').height()
	});

	for (var i = 0; i < $('.icon').length; i++) {
		$('.icon').eq(i).css({
			marginTop: $('.discription').eq(i).height()*0.5-$('.icon').eq(i).width()*0.5
		});

		if(parseInt($('.icon').eq(i).css('marginTop'))<=0){
			$('.icon').eq(i).css('marginTop',0)
		}
	}
}

//预加载图片
function preload(arr){
	var images=[];
	for (var i = 0; i < arr.length; i++) {
		images[i]=new Image();
		images[i].src=arr[i];
	}
}
//几张稍大的图片
var imgs=['../img/4A.jpg','../img/4B.jpg','../img/8A.jpg','../img/8B.jpg','../img/9A.jpg','../img/10A.jpg','../img/3A.jpg','../img/3B.jpg'];

preload(imgs);