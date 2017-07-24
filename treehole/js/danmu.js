var danmu_list=['母胎单身','空巢青年','空巢青年','一个人过','青年危机','社交恐惧','外向孤独症','晨眠者','行走巨婴','恐婚族','丧','咸鱼','线上话痨'];
var color=['#ffffff','#b2ffff','#ccffcc','#99ccff','#99ffff'];
var danmu_box=$('#danmu');
var W=$('#danmu').width();
var H=$('#danmu').height();



danmu_autoPlay();


//弹幕随机
function danmu_item_random(){
	var danmu_item=$("<div class='danmn-item'></div>");
	var danmu_index=Math.floor(Math.random()*danmu_list.length);
	var color_index=Math.floor(Math.random()*color.length);
	var temp=danmu_list[danmu_index];
	var posX=Math.floor(Math.random()*W);
	var posY=Math.floor(Math.random()*(H-W*0.0475-10));
	danmu_item.text(temp);
	danmu_item.css({
		position: 'absolute',
		whiteSpace:'nowrap',
		color: color[color_index],
		fontSize: W*0.0475,
		left: W,
		top: posY
	});

	danmu_box.append(danmu_item);
	console.log(danmu_item.outerWidth());
	danmu_item.animate({
		left: -Math.round(danmu_item.outerWidth()+10),
		},
		4500, function() {
		$(this).remove()
	});

	console.log(color_index)
}



function danmu_autoPlay(){
	setInterval(function(){
		danmu_item_random();
	},1000)
}












