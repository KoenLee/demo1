var danmu_list=['母胎单身','空巢青年','空巢青年','一个人过','青年危机','社交恐惧','外向孤独症','晨眠者','行走巨婴','恐婚族'];
var color=['#ffffff','#b2ffff','#ccffcc','#99ccff','99ffff'];

styleInitialize();

function styleInitialize(){
	var W=$('.content').width();
	$('.icon').css('width', W*0.2125);
	$('.number').css('fontSize',W*0.05);
	$('.brand').css('height', $('.brand').width()*0.448);
}


$(window).resize(function() {
	W=$('.content').width();
	styleInitialize();
});

dotAnimation();

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
