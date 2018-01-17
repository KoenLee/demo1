//百度分享
function share(url,img,text,desc) {
		window._bd_share_config = {
			"common" : {
				"bdSnsKey" : {},
				"bdMini" : "2",
				"bdStyle" : "0",
				"bdSize" : "32",
				"bdUrl" : url,
				"bdPic" : img,
				"bdText" : text,
				"bdDesc" : desc
			},
			"share" : {},
			"selectShare" : {
				"bdContainerClass" : null,
				"bdSelectMiniList" : ["tsina"],
				"viewSize" : "32"
			}
		};
		with (document)
			0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='
					+ ~(-new Date() / 36e5)];
}


//微信分享
function wxShareShow(pageUrl,title,content,imgPath){
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
