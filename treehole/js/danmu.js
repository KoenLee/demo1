var danmu_list=['母胎单身','空巢青年','空巢青年','一个人过','青年危机','社交恐惧','外向孤独症','晨眠者','行走巨婴','恐婚族','丧','咸鱼','线上话痨'];
var color=['#ffffff','#b2ffff','#ccffcc','#99ccff','#99ffff'];
var danmu_box=$('#danmu');
var W=$('#danmu').width();
var H=$('#danmu').height();
var timer=null;

//弹幕时间参数
var danmu_setting={
	duration:4500,
	interval:750
}

$(function(){
	danmu_autoPlay();

});

$(window).resize(function() {
	W=$('.content').width();
	danmu_autoPlay();
});

//弹幕生成
function danmu_item_random(){
	var danmu_item=$("<div class='danmn-item'></div>");
	var danmu_index=Math.floor(Math.random()*danmu_list.length);
	var color_index=Math.floor(Math.random()*color.length);
	var temp=danmu_list[danmu_index];
	var posY=Math.floor(Math.random()*(H-W*0.0475-30));
	danmu_item.text(temp);
	danmu_item.css({
		position: 'absolute',
		whiteSpace:'nowrap',
		color: color[color_index],
		fontSize: W*0.0475,
		left: W,
		top: posY
	});

	//弹幕div里添加一条弹幕
	danmu_box.append(danmu_item);

	//弹幕运动效果
	danmu_item.animate({
		left: -Math.round(danmu_item.outerWidth()+10)
		},
		danmu_setting.duration, function() {
		$(this).remove()
	});

}

//弹幕自动播放
function danmu_autoPlay(){
	clearInterval(timer);
	timer=setInterval(function(){
		danmu_item_random();
	},danmu_setting.interval)
}
