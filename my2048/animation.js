function ShowNumberWithAnimation(i,j,randNumber){
	//获取当前数字格
	var numberCell = $('#number-cell-'+i+'-'+j);
	//设置当前的数字格的背景色和前景色及数字值
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color', getNumberColor(randNumber));
	numberCell.text(randNumber);
	//设置当前的数字格的显示动画
	numberCell.animate({
		width:100,
		height:100,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	}, 200)
}