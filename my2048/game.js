//keydown事件表示键盘被按下
$(document).keydown(function(event) {//event是keydown事件自带的
	switch(event.keyCode){
		case 37://left
			/*
			moveLeft方法
				*完成左移动的逻辑
				*返回值是Boolean类型，盘对是否可以向左移动
			*/
			if (moveLeft()) {
				//重新随机生成两个数字
				setTimeout('generateOneNumber()',20);
				//判断这次移动完成之后，游戏是否结束了
				setTimeout('isGameover()',210)
			}
			break;
		case 38://up
			if (moveTop()) {
				//重新随机生成两个数字
				setTimeout('generateOneNumber()',20);
				//判断这次移动完成之后，游戏是否结束了
				setTimeout('isGameover()',210);
			}
			break;
		case 39://right
			if (moveRight()) {
				//重新随机生成两个数字
				setTimeout('generateOneNumber()',20);
				//判断这次移动完成之后，游戏是否结束了
				setTimeout('isGameover()',210)
			}
			break;
		case 40://down
			if (moveBottom()) {
				//重新随机生成两个数字
				setTimeout('generateOneNumber()',20);
				//判断这次移动完成之后，游戏是否结束了
				setTimeout('isGameover()',210)	
			}
			break;
	}
});

$(window).swipe({
    swipeLeft:function(){
        // 向左滑动执行
        if (moveLeft()) {
				//重新随机生成两个数字
				setTimeout('generateOneNumber()',20);
				//判断这次移动完成之后，游戏是否结束了
				setTimeout('isGameover()',210)
		}
    },
    swipeUp:function(){
        // 向上滑动执行
        if (moveTop()) {
				//重新随机生成两个数字
				setTimeout('generateOneNumber()',20);
				//判断这次移动完成之后，游戏是否结束了
				setTimeout('isGameover()',210);
		}
    },
    swipeRight:function(){
        // 向右滑动执行
        if (moveRight()) {
				//重新随机生成两个数字
				setTimeout('generateOneNumber()',20);
				//判断这次移动完成之后，游戏是否结束了
				setTimeout('isGameover()',210)
		}
    },
    swipeDown:function(){
        // 向下滑动执行
       if (moveBottom()) {
				//重新随机生成两个数字
				setTimeout('generateOneNumber()',20);
				//判断这次移动完成之后，游戏是否结束了
				setTimeout('isGameover()',210)	
		}
    }
});




//Left
function moveLeft(){
	if (!canMoveLeft(board)) {
		//当前的格子无法移动
		return false;
	}
	//完成向左移动的逻辑
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			//当前数字格是有值的(2,4,…不能是0)
			if (board[i][j]!=0) {
				//向左移动的逻辑
				for (var k = 0; k < j; k++) {
					if (board[i][k] == 0 && noBlockHorizontalCol(i,k,j,board)) {
						//才能向左移动
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
					}else if (board[i][j] == board[i][k] && noBlockHorizontalCol(i,k,j,board) && !hasConflicted[i][k]) {
						//才能向左移动
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);

						audioPlay(board[i][k]);

						hasConflicted[i][k];

						continue;
					}
				}
			}
		}
	}
    setTimeout("updateBoardView();",150);

	return true;
}

//Top
function moveTop(){
	if (!canMoveTop(board)) {
		//当前的格子无法移动
		return false;
	}
	//完成向上移动的逻辑
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			//当前数字格是有值的(2,4,…不能是0)
			if (board[i][j]!=0) {
				//向上移动的逻辑
				for (var k = 0; k < i; k++) {
					if (board[k][j] == 0 && noBlockVerticalRow(j,k,i,board)) {
						//才能向上移动
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
					}else if (board[i][j] == board[k][j] && noBlockVerticalRow(j,k,i,board) && !hasConflicted[k][j]) {
						//才能向上移动
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];

						audioPlay(board[k][j]);

						updateScore(score);

						

						hasConflicted[k][j]=true;

						continue;
					}
				}
			}
		}
	}

    setTimeout("updateBoardView();",150);

	return true;
}

//Right
function moveRight(){
	if (!canMoveRight(board)) {
		//当前的格子无法移动
		return false;
	}
	//完成向右移动的逻辑
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			//当前数字格是有值的(2,4,…不能是0)
			if (board[i][j]!=0) {
				//向右移动的逻辑
				for (var k = 3; k > j; k--) {
					if (board[i][k] == 0 && noBlockHorizontalCol(i,k,j,board)) {
						//才能向右移动
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
					}else if (board[i][j] == board[i][k] && noBlockHorizontalCol(i,k,j,board) && !hasConflicted[i][k]) {
						//才能向右移动
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);

						audioPlay(board[i][k]);

						hasConflicted[i][k]=true;

						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView();",150);

	return true;
}

//Bottom
function moveBottom(){
	if (!canMoveBottom(board)) {
		//当前的格子无法移动
		return false;
	}
	//完成向下移动的逻辑
	for (var i = 2; i >=0 ; i--) {
		for (var j = 0; j < 4; j++) {
			//当前数字格是有值的(2,4,…不能是0)
			if (board[i][j]!=0) {
				//向下移动的逻辑
				for (var k = 3; k >i ; k--) {
					if (board[k][j] == 0 && noBlockVerticalRow(j,k,i,board)) {
						//才能向下移动
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
					}else if (board[i][j] == board[k][j] && noBlockVerticalRow(j,k,i,board) && !hasConflicted[k][j]) {
						//才能向下移动
						board[k][j]+=board[i][j];
						board[i][j]=0;

						score+=board[k][j];
						updateScore(score);

						audioPlay(board[k][j]);

						hasConflicted[k][j]=true;

						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView();",150);

	return true;
}

function showMoveAnimation(fromX,fromY,toX,toY){
	//获取道当前数字格的元素
	var numberCell=$('#number-cell-'+fromX+'-'+fromY);
	numberCell.animate({
		top:getPosTop(toX,toY),
		left:getPosLeft(toX,toY)
	}, 200);
}

function updateScore(Score) {
	$('#score').text(Score);
}

function isGameover(){
	if (noSpace(board) && moveDisabled(board)) {
		gameove();
		return true;
	}
	return false;
}

function gameove(){
	$('#grid-container').append("<div id='gameover' class='gameover'><p>GAME OVER</p><span>本次得分为：</span><span>"+score+"</span><a href='javascript:restartGame();' id='restartBtn'>Restart</a></div>");
	var gameover=$('#gameover');
	gameover.css({
		width: '500px',
		height: '500px',
		backgroundColor: 'rgba(0,0,0,0.5)'
	});
}

function restartGame(){
	score=0;
	$('#gameover').remove();
	newgame();
}