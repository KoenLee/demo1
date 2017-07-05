$(function(){
	//获取窗口宽度
	var W=$(window).width();
	
	//设置圆圈样式
	$('.circle').css({
		width: W*0.12,
		height: W*0.12,
		marginTop: W*0.0625,
		marginBottom: W*0.0625
	});

	//设置题号样式
	$('.page').css({
		fontSize: $('.circle').height()*0.28,
		lineHeight: $('.circle').height()+'px'
	});

	//设置图片样式
	$('.pic').css({
		marginBottom: W*0.0625,
		width:W*0.8,
		height:'auto'
	});

})