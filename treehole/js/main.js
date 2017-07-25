$(function(){
	styleInitialize();
	dotAnimation();
})

//样式初始化
function styleInitialize(){
	var W=$('.content').width();
	$('.icon').css('width', W*0.2125);
	$('.number').css('fontSize',W*0.05);
	$('.brand').css('height', $('.brand').width()*0.448);
	$('.text-normal').css('fontSize', W*0.034375);
	$('.number').css('margin-bottom', W*0.0234);
	$('.text-notice').css('fontSize', W*0.028125);
}

//跟随窗口调整格式
$(window).resize(function() {
	W=$('.content').width();
	styleInitialize();
	console.log(W);
});


//加载中...效果
function dotAnimation(){
	var dotText=['..','...','.'];
	var dotIndex=0;
	setInterval(function(){
		dotIndex++;
		if (dotIndex>2) {
			dotIndex=0
		}
		$('.loading-dot').text(dotText[dotIndex])
	},500)
	
}
