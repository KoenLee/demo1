var page=1;
var progress=0;
var standard = 3.5;//高低标准，大于等于为高
var countE = 0;//情感
var countS = 0;//结构
var countP = 0;//力量
var answerArray= new Array();//保存答案json
var imgUrlA = ['img/1A.jpg','img/2A.jpg','img/3A.jpg','img/4A.jpg','img/5A.jpg','img/6A.jpg','img/7A.jpg','img/8A.jpg','img/9A.jpg','img/10A.jpg']
var imgUrlB	= ['img/1B.jpg','img/2B.jpg','img/3B.jpg','img/4B.jpg','img/5B.jpg','img/6B.jpg','img/7B.jpg','img/8B.jpg','img/9B.jpg','img/10B.jpg']

/*测试后台逻辑：
1.选图A，E+1；选B，0，至第3题下同；
2.选A，S+1；
3.选A，P+1；
4.选A，E+1；B，S+1；
5.选A，E+1；B，P+1；
6.选A，S+1；B，P+1；
7.选A，E+1；B，S+1；
8.选A，E+1；B，P+1;
9.选A，S+1；B，P+1;
10.选A，ESP+2；选B，0。
（E=情感，S=结构，P=力量。10道题分数累计，ESP各单项大于3.5为高，反之为低。根据三项指标的结果高低生成以上8种美学性格类型）*/
$(function(){
	styleInitialize();
	//init();
});

// //初始化
// function init(){
// 	if(checkLogin()){
// 		$.ajax({
// 			type : "POST",
// 			url : 'surveysAction!getUserTestInfo.action',
// 			data : {surveysId:1},
// 			dataType : 'json',
// 			success : function(data) {
// 				if(data.success && null != data.result){
// 					//已经测试过，直接到结果页面
// 					window.location.href = "result"+data.result.resultType+".html?surversUId="+data.result.id;
// 				}else{
// 					$("body").show();
// 				}
// 			}
// 		});
// 	}
// }

// //是否登录
// function checkLogin(){
// 	var f = true;
// 	$.ajax({
// 		type : "POST",
// 		url : 'loginAction!getUserInfo.action',
// 		dataType : 'json',
// 		success : function(data) {
// 			if(data.success){
// 				picClick();
// 				clearCookie("loginRreferurl");
// 			}else{
// 				setCookie("loginRreferurl","/html/surveys/mobile/surveys_spain.html");
// 				f = false;
// 				$("body").show();
// 				//未登录，点图片去登录
// 				$('.pic').click(function() {
// 					window.location.href = 'loginAction!loginWeixin.action?state=2';
// 				});
// 			}
// 		}
// 	});
// 	return f;
// }

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

//窗口缩放跟随变化
$(window).resize(function() {
	styleInitialize();
});

//点击确认
$('.confirm').click(function() {
	$('.popup').fadeOut(400,function(){
		$(this).remove();
		$('.mask').remove();
	});
});

//点击退回键
$('#prev').click(function() {
	if (page>=2) {
		page--;
		skip();
		console.log(progress);
	}
});

//图片点击切换
// function picClick(){
	//点击图片切换

	$('.pic').click(function(target) {
		target=$(this);
		if (page<10) {
			page++;
		}
		if(page<=10){
			skip(target);//换图片
		}
		
		//测试进度，累加到10的时候出结果
		progress++;
		
		//判断点击的哪张图片
		var id = $(this).attr("id");
		if(id == "picA"){
			countA();//选择的第一张图片
		}else{
			countB();//选择的第二张图片
		}
		console.log("progress:"+progress);
		if(progress==10){
			//出结果.......
			console.log("end countE:"+countE+"--countS:"+countS+"--countP:"+countP);
			//获取结果页面
			getResult();
		}
	});
// }

//切换当前进度和图片
function skip(target){
	$('.current-page').text(page);
	translate();
	target.animate({opacity:0.5,borderRadius:'10%'},400,function(){
		
		target.animate({opacity:1,borderRadius:1},400);
	});
}

function translate(){
	$('#picA').attr('src', 'img/'+page+'A.jpg');
	$('#picB').attr('src', 'img/'+page+'B.jpg');
}

//选第一张图片计算
function countA(){
	var mean = "";
	switch(progress)
	{
		case 1:
			countE += 1;
			mean = "E+1";
			break;
		case 2:
			countS += 1;
			mean = "S+1";
			break;
		case 3:
			countP += 1;
			mean = "P+1";
			break;
		case 4:
			countE += 1;
			mean = "E+1";
			break;
		case 5:
			countE += 1;
			mean = "E+1";
			break;
		case 6:
			countS += 1;
			mean = "S+1";
			break;
		case 7:
			countE += 1;
			mean = "E+1";
			break;
		case 8:
			countE += 1;
			mean = "E+1";
			break;
		case 9:
			countS += 1;
			mean = "S+1";
			break;
		case 10:
			countE += 2;
			countS += 2;
			countP += 2;
			mean = "E+2,S+2,P+2";
			break;
	}
	//保存选择的数据
	var answerObj = {};
	answerObj["questionNo"] = progress;
	answerObj["answer"] = "A";
	answerObj["mean"] = mean;
	answerArray.push(answerObj);
	
	console.log("progress:"+progress+"--countE:"+countE+"--countS:"+countS+"--countP:"+countP);
}
//选第二张图片计算
function countB(){
	var mean = "";
	switch(progress)
	{
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
		case 4:
			countS += 1;
			mean = "S+1";
			break;
		case 5:
			countP += 1;
			mean = "P+1";
			break;
		case 6:
			countP += 1;
			mean = "P+1";
			break;
		case 7:
			countS += 1;
			mean = "S+1";
			break;
		case 8:
			countP += 1;
			mean = "P+1";
			break;
		case 9:
			countP += 1;
			mean = "P+1";
			break;
		case 10:
			break;
	} 
	//保存选择的数据
	var answerObj = {};
	answerObj["questionNo"] = progress;
	answerObj["answer"] = "B";
	answerObj["mean"] = mean;
	answerArray.push(answerObj);
}

//获取最终结果
function getResult(){
	//1:(E高S高P高)-摩天楼,2:(E高S高P低)-流星雨,3:(E高S低P高)-小太阳,4:(E高S低P低)-水仙花
	//5:(E低S高P高)-美洲豹,6:(E低S高P低)-望远镜,7:(E低S低P高)-樱花,8:(E低S低P低)-水晶球
	var result = 1;
	var name = "";
	if(countE > standard && countS > standard && countP > standard){
		result = 1;
		name = "摩天楼";
	}else if(countE > standard && countS > standard && countP <= standard){
		result = 2;
		name = "流星雨";
	}else if(countE > standard && countS <= standard && countP > standard){
		result = 3;
		name = "小太阳";
	}else if(countE > standard && countS <= standard && countP <= standard){
		result = 4;
		name = "水仙花";
	}else if(countE <= standard && countS > standard && countP > standard){
		result = 5;
		name = "美洲豹";
	}else if(countE <= standard && countS > standard && countP <= standard){
		result = 6;
		name = "望远镜";
	}else if(countE <= standard && countS <= standard && countP > standard){
		result = 7;
		name = "樱花";
	}else{
		result = 8;
		name = "水晶球";
	}
	console.log("test result:"+result);
	var json = JSON.stringify(answerArray);
	console.log("test json:"+json);
	
	$.ajax({
		type : "POST",
		url : 'surveysAction!saveTestInfo.action',
		data : {surveysId:1,resultType:result,resultName:name,anwerJson:JSON.stringify(answerArray)},
		dataType : 'json',
		success : function(data) {
			console.log(data);
			if(data.success){
				window.location.href = "result"+result+".html?surversUId="+data.result.id;
			}
		}
	});
	return result;
}

//根据窗口尺寸调整其他元素尺寸和居中设置
function styleInitialize(){
	var W=$(window).width();
	var H= $(window).height();

	$('.mask').css({
		width: W,
		height: $(window).height()
	});

	/*$('.circle').css({
		width: W*0.12,
		height: W*0.12,
	});
	$('.circle-inner').css({
		width: W*0.12,
		height: W*0.12,
	});*/
	$('.page').css({
		fontSize: $('.circle').height()*0.28,
		lineHeight: $('.circle').height()+'px'
	});
	$('.popup').css({
		height: H*0.264,
		top: H*0.5-$('.popup').height()*0.5-$('.blank').height()*0.5,
		//left: W*0.5-$('.popup').width()*0.5
	});
	$('.popup>p').css({
		fontSize: $('.popup').height()*0.094
	});

	$('.confirm').css({
		fontSize: $('.popup').height()*0.094,
		height: $('.popup').height()*0.247,
		marginTop: $('.popup').height()*0.13
	});
}

//设置cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
}
//获取cookie
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
//清除cookie  
function clearCookie(name) {  
	var exp = new Date();
    exp.setTime(exp.getTime() - 10000);
    var cval=getCookie(name);
    if(cval!=null) {
    	document.cookie= name + "="+cval+";expires="+exp.toGMTString()+ ";path=/"; 
    }
        
}  
