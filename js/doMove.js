function doMove(obj,attr,dir,target,endFn){

		dir=parseInt(getStyle(obj,attr))<target?dir:-dir;

		clearInterval(obj.timer)	
		obj.timer=setInterval(function(){
			var speed=parseInt(getStyle(obj,attr)) + dir;

			if (speed>target && dir>=0	|| speed<target && dir<0)
			 {speed=target;};
			obj.style[attr]=speed + 'px';	
			if (speed==target) {
				clearInterval(obj.timer)	

			endFn && endFn();		
		}	
		},10)
	};

function getStyle(obj,attr){return obj.currentStyle ? 
	obj.currentStyle[attr] : getComputedStyle(obj)[attr];}

function shake(obj,attr,start,endFn){

		var pos=start	//有问题
		var prePos=pos
		var arr=[];
		var num=0
		

		for (var i = 20; i > 0; i-=2) {
			arr.push(i,-i);
		}
		arr.push(0);

		clearInterval(obj.shake);
		obj.shake=setInterval(function(){
			obj.style[attr]=pos+arr[num]+'px';
			num++;
			if (num===arr.length) {
				clearInterval(obj.shake)			
				endFn && endFn();
			}
		},45)
}

function fnShake(){	
		var _this=this;	
		shake(_this,'left',function(){
			shake(_this,'top')
		})

};

function opMove(obj,dir,target,endFn){

		dir=parseFloat(getStyle(obj,'opacity'))<target?dir:-dir;

		clearInterval(obj.timer)	
		obj.timer=setInterval(function(){
			var speed=parseFloat(getStyle(obj,'opacity')) + dir;

			if (speed>target && dir>=0	|| speed<target && dir<0)
			 {speed=target;};
			obj.style['opacity']=speed;	
			if (speed==target) {
				clearInterval(obj.timer)	

			endFn && endFn();		
		}	
		},10)
	};