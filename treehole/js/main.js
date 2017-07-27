$(function(){
	styleInitialize();
	dotAnimation();
	document.ondragstart=function() {return false;};
	console.log($(window));
	console.log(window);
	console.log(window.scrollY);
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

//微信分享参数
var shareUrl=window.location.href;
var shareTitle=document.title;
var shareContent='和王凯、冯绍峰一起倾诉'
var shareImg='../img/m.ico';

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

console.log($(window));

window.onscroll=function(){
	if (isWeiXinBrowser()) {
		wxShare(shareUrl,shareTitle,shareContent,shareImg);
		if (window.scrollY>=$('#stars').height()) {
			$('.article_share').show(300);
		}
		if (window.scrollY<$('#stars').height()) {
			$('.article_share').hide(300);
		}
	}
}

//微信分享
function wxShare(pageUrl,title,content,imgPath){
	$.ajax({
		type : "POST",
		url : 'wxShareAction!getWxShareConfig.action',
		data:{"shareUrl":pageUrl},
		async : false,
		dataType : "json",
		success : function(data) {
			var img = imgPath;
			console.log(data);
			if (data.success && data.result != null) {
				var appId,timestamp,nonceStr,signature;
				if(null != data.result.appId){
					appId = data.result.appId;
				}
				if(null != data.result.timestamp){
					timestamp = data.result.timestamp;
				}
				if(null != data.result.nonceStr){
					nonceStr = data.result.nonceStr;
				}
				if(null != data.result.signature){
					signature = data.result.signature;
				}
				
				wx.config({
				    debug: false, 
				    appId: appId, 
				    timestamp:timestamp, 
				    nonceStr:nonceStr, 
				    signature:signature,
				    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] 
				});
				
				var linkUrl=data.result.requestUrl;
				wx.ready(function(){
				    // “分享到朋友圈”
				    wx.onMenuShareTimeline({
				        title: title, 
				        desc: content,
				        link:linkUrl,
				        imgUrl: img,
				        success: function () {
				            // 用户确认分享后执行的回调函数
				        	
				        },
				    });
				    // “分享给朋友”
				    wx.onMenuShareAppMessage({
				        title: title, 
				        desc: content,
				        link:linkUrl,
				        imgUrl: img,
				        success: function () {
				            // 用户确认分享后执行的回调函数
				        	
				        },
				    });
				    
				    //“分享到QQ”
				    wx.onMenuShareQQ({
				        title: title, 
				        desc: content,
				        link:linkUrl,
				        imgUrl: img,
				        success: function () {
				            // 用户确认分享后执行的回调函数
				        	
				        },
				    });
				    
				    //“分享到腾讯微博”
				    wx.onMenuShareWeibo({
				        title: title, 
				        desc: content,
				        link:linkUrl,
				        imgUrl: img,
				        success: function () {
				            // 用户确认分享后执行的回调函数
				        	
				        },
				    });
				    
				    //获取“分享到QQ空间”
				    wx.onMenuShareQZone({
				        title: title, 
				        desc: content,
				        link:linkUrl,
				        imgUrl: img,
				        success: function () {
				            // 用户确认分享后执行的回调函数
				        	
				        },
				    });
				}); 
			}
		}
	});

}
