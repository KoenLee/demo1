$(function(){
	styleInitialize();
	dotAnimation();
	document.ondragstart=function() {return false;};
	$(window).scroll(function() {
		console.log($(window).scrollY);
		if ($(window).scrollY>=$('#stars').height()) {
			$('.article_share').show(300);
		}		
	});
})

//样式初始化
function styleInitialize(){
	var W=$('.content').width();
	$('.icon').css('width', W*0.2);
	$('.number').css('fontSize',W*0.05);
	$('.brand').css('height', $('.brand').width()*0.448);
	$('.text-normal').css('fontSize', W*0.034375);
	$('.number').css('margin-bottom', W*0.0234);
	$('.text-notice').css('fontSize', W*0.028125);
	// if (!isWeiXinBrowser()) {
	// 	$('.article_share').css('display', 'none');
	// }
}

//跟随窗口变化调整
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



//判断微信浏览器
function isWeiXinBrowser(){
	var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i) ;
	if(wechatInfo) {
		return true;
	} else {
	    return false;
	}
}



//微信分享提示开启
function wxShareShow(){
	// if (isWeiXinBrowser()) {
		$('.article_share').click(function() {
			$('.share_attention').fadeIn(300);
		});
	// }

}

//微信分享提示关闭
function wxShareHide(){
	$(".share_attention").fadeOut(300);
}

