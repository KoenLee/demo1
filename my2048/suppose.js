function getPosTop(i,j){
	return 20+i*120;
}

function getPosLeft(i,j){
	return 20+j*120;
}

function getNumberBackgroundColor(number){
	switch(number){
		case 2:return '#eee4da';break;
		case 4:return '#ede0c8';break;
		case 8:return '#f2b179';break;
		case 16:return '#f59563';break;
		case 32:return '#f67c5f';break;
		case 64:return '#f65e3b';break;
		case 128:return '#edcf72';break;
		case 256:return '#edcc61';break;
		case 512:return '#9c0';break;
		case 1024:return '#33b5e5';break;
		case 2048:return '#09c';break;
		case 4096:return '#a6c';break;
		case 8192:return '#93c';break;
	}
}

function getNumberColor(number){
	if (number <=4) {
		return '#776e65';
	}
	return 'white';
}

function canMoveLeft(board){
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j]!=0) {
				//当前数字左边第一个值为0，或者当前数字的值于左边第一个数字格的值相等
				if (board[i][j-1]==0 || board[i][j-1]==board[i][j]) {
					console.log('yes');
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveTop(board){
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j]!=0) {
				//当前数字上边第一个值为0，或者当前数字的值于上边第一个数字格的值相等
				if (board[i-1][j]==0 || board[i-1][j]==board[i][j]) {
					console.log('yes');
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight(board){
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j]!=0) {
				//当前数字右边第一个值为0，或者当前数字的值于右边第一个数字格的值相等
				if (board[i][j+1]==0 || board[i][j+1]==board[i][j]) {
					console.log('yes');
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveBottom(board){
	for (var i = 2; i >= 0; i--) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j]!=0) {
				//当前数字下边第一个值为0，或者当前数字的值于下边第一个数字格的值相等
				if (board[i+1][j]==0 || board[i+1][j]==board[i][j]) {
					console.log('yes');
					return true;
				}
			}
		}
	}
	return false;
}

function noBlockHorizontalCol(row,colTarget,colNow,board){
	for(var i=colTarget+1;i<colNow;i++){
		if (board[row][i]!=0) {
			return false;
		}
	}

	return true;
}



function noBlockVerticalRow(col,rowTarget,rowNow,board){
	for(var i=rowTarget+1;i<rowNow;i++){
		if (board[i][col]!=0) {
			return false;
		}
	}
	
	return true;
}

function noSpace(board){
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j]==0) {
				return false;
			}
		}
	}
	return true;
}

function moveDisabled(board){
	if (canMoveLeft(board) || canMoveRight(board) || canMoveTop(board) || canMoveBottom(board)) {
		return false;
	}
	return true;
}