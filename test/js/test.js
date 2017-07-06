var page=1;
var progress=0;

//判断是否在微信浏览器打开
function isWeixinBrowser(){
  var ua = window.navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}
//是则隐藏顶栏
if (isWeixinBrowser()) {
	$('#header').css('display', 'none');
	$('.blank').css('height', '18px');
}			

//获取浏览器窗口宽度
var W=$(window).width();
var H= $(window).height();

//遮罩大小
$('.mask').css({
	width: W,
	height: $(window).height()
});

//根据窗口尺寸调整大小
$('.circle').css({
	width: W*0.12,
	height: W*0.12,
});
$('.circle-inner').css({
	width: W*0.12,
	height: W*0.12,
});
$('.page').css({
	fontSize: $('.circle').height()*0.28,
	lineHeight: $('.circle').height()+'px'
});
$('.popup').css({
	height: H*0.264,
	top: H*0.5-$('.popup').height()*0.5-$('.blank').height(),
	left: W*0.5-$('.popup').width()*0.5
});
$('.popup>p').css({
	fontSize: $('.popup').height()*0.094
});
// if (parseInt($('.popup>p').css('fontSize'))>20) {
// 	$('.popup>p').css('fontSize',20)
// };
$('.confirm').css({
	fontSize: $('.popup').height()*0.094,
	height: $('.popup').height()*0.247,
	marginTop: $('.popup').height()*0.13
});
//窗口缩放跟随变化
$(window).resize(function() {
	W=$(window).width();
	H=$(window).height();

	$('.mask').css({
		width: W,
		height: $(window).height()
	});

	$('.circle').css({
		width: W*0.12,
		height: W*0.12,
	});
	$('.circle-inner').css({
		width: W*0.12,
		height: W*0.12,
	});
		$('.page').css({
		fontSize: $('.circle').height()*0.28,
		lineHeight: $('.circle').height()+'px'
	});
	$('.mask').css({
		width: W,
		height: $(window).height()
	});
	$('.popup').css({
		height: H*0.264,
		top: H*0.5-$('.popup').height()*0.5-$('.blank').height(),
		left: W*0.5-$('.popup').width()*0.5
	});
	$('.popup>p').css({
		fontSize: $('.popup').height()*0.094
	});
	if (parseInt($('.popup>p').css('fontSize'))>20) {
		$('.popup>p').css('fontSize',20)
	};
	$('.confirm').css({
		fontSize: $('.popup').height()*0.094,
		height: $('.popup').height()*0.247,
		marginTop: $('.popup').height()*0.13
	});
});

//弹出弹窗


//点击确认
$('.confirm').click(function() {
	$('.popup').fadeOut(400,function(){
		$(this).remove();
		$('.mask').remove();
	});
});



//点击图片切换
$('.pic').click(function() {	
	if (page<10) {
		page++;
		skip();
	}	
	//测试进度，累加到10的时候出结果
	progress++;
	if(progress==10){
		//出结果.......
	}
});

//点击退回键
$('#prev').click(function() {
	if (page>=2) {
		page--;
		skip();
		console.log(progress);
	}
});

//切换当前进度和图片
function skip(){
	$('.current-page').text(page);
	$('#picA').animate({opacity:0.8},400,function(){
			$('#picA').attr('src', 'img/'+page+'A.jpg').animate({opacity:1},400)
		});

	$('#picB').animate({opacity:0.8},400,function(){
		$('#picB').attr('src', 'img/'+page+'B.jpg').animate({opacity:1},400)
	});
}
