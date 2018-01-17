//分享相关参数
var shareUrl = window.location.search;
var shareImg = "http://www.majormei.com/html/surveys/img/result1.jpg";
var shareText = "ESP 西班牙审美分析，发现你的审美性格";
var shareTitle = "西班牙审美分析，发现你的审美性格";
var surversUId = "";
var surveysOId = "";

$(function(){
	if(shareUrl.indexOf("from") > -1 && shareUrl.indexOf("surversUId") > -1){
		surversUId = shareUrl.split("&")[0].replace("?surversUId=","");
	}else if(shareUrl.indexOf("surversUId") > -1){
		surversUId = shareUrl.replace("?surversUId=","");
	}else if(shareUrl.indexOf("from") > -1 && shareUrl.indexOf("surveysOId") > -1){
		surveysOId = shareUrl.split("&")[0].replace("?surveysOId=","");
	}else{
		surveysOId = shareUrl.replace("?surveysOId=","");
	}
	init();
});

//--------------------------------------


//--------------------------------------

function init(){
	$.ajax({
		type : "POST",
		url : 'surveysAction!getSurveysInfoById.action',
		data : {surveysUserId:surversUId,surveysOId:surveysOId},
		dataType : 'json',
		success : function(data) {
			if(data.success){
				console.log(data);
				//$("title").text(data.result.userName+" - "+data.result.resultName);
				if(!data.oneself){//不是自己打开，别人打开看到的是测试者的昵称
					$(".user_name").html(data.result.userName);
				}
				shareTitle = data.result.userName+"的审美性格是"+data.result.resultName;
				shareImg = "http://www.majormei.com/html/surveys/img/result"+data.result.resultType+".jpg";
				var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i) ;
				//if(wechatInfo){
					var url = "/html/surveys/mobile/result"+data.result.resultType+".html"+shareUrl;
					wxShareShow(url,shareTitle,shareText,shareImg);
				//}
			}
		}
	});
}
