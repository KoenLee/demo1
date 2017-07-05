$(function(){
	//获取窗口宽度
	var W=$(window).width();
	
	//设置圆圈样式
	$('.circle').css({
		width: W*0.125,
		height: W*0.125,
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

	//更改题号
	$('.page').text()


	//选中一张图
	$('.page').click(function(event) {
		console.log(event)
	});
})
