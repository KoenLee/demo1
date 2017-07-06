var page=1;
var progress=0;

//获取浏览器窗口宽度
var W=$(window).width();

//根据窗口尺寸调整圆圈大小
$('.circle').css({
	width: W*0.12,
	height: W*0.12,
});
//窗口缩放跟随变化
$(window).resize(function() {
	W=$(window).width();
	$('.circle').css({
		width: W*0.12,
		height: W*0.12,
	});
});

//根据窗口尺寸调整题号大小
$('.page').css({
	fontSize: $('.circle').height()*0.28,
	lineHeight: $('.circle').height()+'px'
});
//窗口缩放跟随变化
$(window).resize(function() {
	W=$(window).width();
	$('.page').css({
		fontSize: $('.circle').height()*0.28,
		lineHeight: $('.circle').height()+'px'
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
