var W=$(window).width();
var hW=$('.header').width();

//判断是否在微信浏览器打开
function isWeixinBrowser(){
  var ua = window.navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}
//是则隐藏顶栏
if (isWeixinBrowser()) {
	$('#header').css('display', 'none');
	$('.blank').remove();
}

$('.title-circle').css({
	width: hW*0.24,
	height: hW*0.24,
	left: hW*0.5-$('.title-circle').width()*0.5,
	top: $('.header').height()*0.5-$('.title-circle').width()*0.5
});
$('.content').css({
	padding: W*0.078,
});
if (W>500) {
	$('.content').css('padding',25)
}
$('.article-text').css({
	fontSize: W*0.0375,
});
$('.article-small').css({
	fontSize: W*0.0343,
});
$('#result-title').css({
	fontSize: W*0.04375
});
$('#article-title').css({
	fontSize: W*0.04375
});
if (W>500) {
	$('.article-text').css('fontSize', 20);
	$('#result-title').css('fontSize', 24);
	$('#article-title').css('fontSize', 24);
	$('.article-small').css('fontSize', 16);
};
$('figcaption').css({
	fontSize: W*0.03125,
});
if (W>500) {
	$('figcaption').css('fontSize', 16);
};
$('img').css({
	marginBottom:hW*0.0265
})
if (W>500){
	$('img').css('marginBottom',15)
}
$('.button').css({
	height: W*0.153,
	fontSize:W*0.04375,
	lineHeight: W*0.153+'px'
});
if (W>500) {
	$('.button').css('lineHeight', '60px');
	$('.button').css('fontSize', 20);
};
$('.blank').css({
	height:$('#header').height()
});
$('#icon1').css({
	marginTop: $('#discription1').height()*0.5-$('#icon1').width()*0.5
});

$('#icon2').css({
	marginTop: $('#discription2').height()*0.5-$('#icon2').width()*0.5
});


$(window).resize(function() {
	W=$(window).width();
	var hW=$('.header').width();
	$('.title-circle').css({
		width: hW*0.24,
		height: hW*0.24,
		left: hW*0.5-$('.title-circle').width()*0.5,
		top: $('.header').height()*0.5-$('.title-circle').width()*0.5
	});
	$('.content').css({
		padding: W*0.078,
	});
	if (W>500) {
		$('.content').css('padding',25)
	};
	$('.article-text').css({
		fontSize: W*0.0375,
	});
	$('.article-small').css({
		fontSize: W*0.0343,
	});
	$('#result-title').css({
		fontSize: W*0.04375
	});
	$('#article-title').css({
		fontSize: W*0.04375
	});
	if (W>500) {
		$('.article-text').css('fontSize', 20);
		$('#result-title').css('fontSize', 24);
		$('#article-title').css('fontSize', 24);
		$('.article-small').css('fontSize', 16);
	};
	$('figcaption').css({
		fontSize: W*0.03125,
	});
	if (W>500) {
		$('figcaption').css('fontSize', 16);
	};
	$('img').css({
		marginBottom:W*0.0265
	})
	$('.button').css({
		height: W*0.153,
		fontSize:W*0.04375,
		lineHeight:$('.button').height()+'px'
	});
	if (W>500) {
		$('.button').css('lineHeight', '60px');
		$('.button').css('fontSize', 20);
	};
	$('.blank').css({
		height:$('#header').height()
	});
	$('#icon1').css({
	marginTop: $('#discription1').height()*0.5-$('#icon1').width()*0.5
	});

	$('#icon2').css({
		marginTop: $('#discription2').height()*0.5-$('#icon2').width()*0.5
	});

})
