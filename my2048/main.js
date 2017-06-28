//定义一个javascript数组
var board = new Array();
var hasConflicted = new Array();
var audio = ['sfx_sing_1.m4r','sfx_sing_2.m4r','sfx_sing_3.m4r','sfx_sing_4.m4r','sfx_sing_5.m4r','sfx_sing_6.m4r','sfx_sing_7.m4r','sfx_sing_8.m4r','sfx_sing_9.m4r']
var score=0;

$(function(){
	newgame();
});

function newgame(){
	
	//初始化棋盘格和数字格
	init();
	//生成两个随机位置的随机数字
	generateOneNumber();
	generateOneNumber();
}

function init(){

	for (var i = 0; i < 4; i++) {
		//定义了一个二维数组
		board[i] = new Array();
		hasConflicted[i] = new Array();

		for (var j = 0; j < 4; j++) {
			//初始化小方格的值为0
			board[i][j] = 0;
			hasConflicted[i][j]=false;

			var gridCell=$('#grid-cell-'+i+'-'+j);
			//通过getPosTop方法设置每个小格子距离顶端的距离
			gridCell.css('top', getPosTop(i,j));
			//通过getPosLeft方法设置每个小格子距离左端的距离
			gridCell.css('left', getPosLeft(i,j));
		}
	}
	updateBoardView();
	score = 0;
	$('#score').text(0);
}

function updateBoardView(){
	$('.number-cell').remove();
	for (var i = 0; i < 4; i++) {

		for (var j = 0; j < 4; j++) {
			$('#grid-container').append("<div class='number-cell'"+" id='number-cell-"+i+'-'+j+"'></div>");
			//设置样式
			var numberCell=$('#number-cell-'+i+'-'+j);
			//如果棋格的值为0，则设置数字格的宽高都为0
			if (board[i][j]==0) {

				numberCell.css('width', 0);
				numberCell.css('height', 0);
				numberCell.css('top', getPosTop(i,j)+50);
				numberCell.css('left', getPosLeft(i,j)+50);
			}
			//如果棋盘格的值不为0，设置数字格宽高为100并设置背景色和前景色及数字值
			else{

				numberCell.css('width', '100px');
				numberCell.css('height', '100px');
				numberCell.css('top', getPosTop(i,j));
				numberCell.css('left', getPosLeft(i,j));
				numberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				numberCell.css('color', getNumberColor(board[i][j]));
				numberCell.text(board[i][j]);
			}

			hasConflicted[i][j]=false;
		}
	}
}

function generateOneNumber(){
	//生成一个随机位置的随机数字
	//1.生成一个随机的位置
	//随机一个X坐标位置
	var randX = parseInt(Math.floor(Math.random()*4));
	//随机一个Y左边位置
	var randY = parseInt(Math.floor(Math.random()*4));
	//定义一个死循环，完成生成随机空格子
	while(true){
		//如果当前格子的值为0，满足条件
		if (board[randX][randY] == 0) {
			break;
		}
		//否则重新随机一个位置
		var randX = parseInt(Math.floor(Math.random()*4));
		var randY = parseInt(Math.floor(Math.random()*4));
	}

	//2.生成一个随机的数字(2048游戏规则：新生成的数字只可以是2或4)
	var randNumber = Math.random()<0.5? 2 : 4;
	//3.在随机的位置上显示出随机的数字
	board[randX][randY] = randNumber;
	//实现数字显示的功能
	ShowNumberWithAnimation(randX,randY,randNumber);
	console.log(2)
}


function audioPlay(result){
	switch(result){
		case 4:
			$('#audio').attr('src', audio[0]).get(0).play();
		break;
		case 8:
			$('#audio').attr('src', audio[1]).get(0).play();
		break;
		case 16:
			$('#audio').attr('src', audio[2]).get(0).play();
		break;
		case 32:
			$('#audio').attr('src', audio[3]).get(0).play();
		break;
		case 64:
			$('#audio').attr('src', audio[4]).get(0).play();
		break;
		case 128:
			$('#audio').attr('src', audio[5]).get(0).play();
		break;
		case 256:
			$('#audio').attr('src', audio[6]).get(0).play();
		break;
		case 512:
			$('#audio').attr('src', audio[7]).get(0).play();
		break;
		case 1024:
			$('#audio').attr('src', audio[8]).get(0).play();
		break;
		default:
			$('#audio').attr('src', audio[8]).get(0).play();
		break;
	}
}


// function refreshScore(){
// 	var scoreArr = new Array();

// 	var num = $('.number-cell');
// 	for (var i = 0; i < num.length; i++) {
// 		scoreArr.push(Number(num[i].innerHTML));
// 	}
// 	var score = (eval(scoreArr.join('+')));
// 	return score;
// }


