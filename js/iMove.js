function getStyle(obj,attr){
	return obj.currentStyle? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr]
};
function startMove(obj,json,endFn){	
clearInterval(obj.timer);
obj.timer=setInterval(function(){
var bStop=true;	//假设：所有的值都已经到了
for(var attr in json){
var cur=0;
if (attr=='opacity'){
cur=Math.round(parseFloat(getStyle(obj,attr))*100);
}else{
cur=parseInt(getStyle(obj,attr))
};
var speed=(json[attr]-cur)/6;
speed = speed>0? Math.ceil(speed) : Math.floor(speed);		
if (cur!=json[attr]) bStop=false;
if (attr=='opacity'){
obj.style.filter='alpha(opacity:'+(cur+speed)+')';
obj.style.opacity=(cur+speed)/100;				
}else{
obj.style[attr]=speed+cur+'px';
};		
};
if (bStop){
clearInterval(obj.timer)
if (endFn){
endFn.call(obj);
}
}
},30);
};