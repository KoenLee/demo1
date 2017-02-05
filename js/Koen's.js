// JavaScript Document

function $(k){
	if (typeof k==='function') {
		window.onload=k;
	}else if (typeof k==='string') {
		return document.getElementById(k);
	}else if (typeof k==='object') {
		return k;
	}
};

function getStyle(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr]
	};

function shake(obj,attr,endFn){
		var pos=parseInt(getStyle(obj,attr))
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
		},50)
	}

//运动
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

//取得对象属性值
function getStyle(obj,attr){return obj.currentStyle ? 
	obj.currentStyle[attr] : getComputedStyle(obj)[attr];}

//抖动
// function shake(obj,attr,start,endFn){

// 		var pos=start	//有问题
// 		var prePos=pos
// 		var arr=[];
// 		var num=0
		

// 		for (var i = 20; i > 0; i-=2) {
// 			arr.push(i,-i);
// 		}
// 		arr.push(0);

// 		clearInterval(obj.shake);
// 		obj.shake=setInterval(function(){
// 			obj.style[attr]=pos+arr[num]+'px';
// 			num++;
// 			if (num===arr.length) {
// 				clearInterval(obj.shake)			
// 				endFn && endFn();
// 			}
// 		},45)
// }

//透明度变化
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

//删除数组里指定的内容
Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
		this.splice(index, 1);
		}
};