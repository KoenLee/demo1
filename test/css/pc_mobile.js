//客户端判断  PC/移动
function browserRedirect() {
   var sUserAgent = navigator.userAgent.toLowerCase();
   var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
   var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
   var bIsMidp = sUserAgent.match(/midp/i) == "midp";
   var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
   var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
   var bIsAndroid = sUserAgent.match(/android/i) == "android";
   var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
   var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
   if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
       return true;
   } else {
       return false;
   }
}
//是移动端，页面跳转到移动端的文章详情页面
var flag = browserRedirect();
if(flag){//是移动端访问，判断当前链接是否是移动端的链接
	var url = window.location.href;
	if(url.indexOf("page") > -1){
		//当前链接是pc端的，替换为移动端
		url = url.replace("page","mobile");
		window.location.href = url;
	}
}else{
	//是pc端访问，判断链接是否是移动端的
	var url = window.location.href;
	if(url.indexOf("mobile") > -1){
		url = url.replace("mobile","page");
		window.location.href = url;
	}
}