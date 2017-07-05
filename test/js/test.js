	var page=1;
	var progress=0;


	//点击图片切换
	$('.pic').click(function() {	
		if (page<10) {
			page++;
			skip();
		}	
		//测试进度，累加到10的时候出结果
		progress++;
		if(progress==10){
			//出结果.......
		}
	});

	//点击退回键
	$('#prev').click(function() {
		if (page>=2) {
			page--;
			skip();
			console.log(progress);
		}
	});

	//切换当前进度和图片
	function skip(){
		$('.current-page').text(page);
		$('#picA').animate({opacity:0.8},400,function(){
				$('#picA').attr('src', 'img/'+page+'A.jpg').animate({opacity:1},400)
			});

		$('#picB').animate({opacity:0.8},400,function(){
			$('#picB').attr('src', 'img/'+page+'B.jpg').animate({opacity:1},400)
		});
	}
