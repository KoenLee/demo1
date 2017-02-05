function getStyle(obj,attr){
	return obj.currentStyle? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr]
};
function startMove(obj,attr,iTarget,endFn){
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var cur=0;
		if (attr=='opacity') 
		{	
			cur=Math.round(parseFloat(getStyle(obj,attr))*100);
		}
		else
		{
			cur=parseInt(getStyle(obj,attr))
		};
		var speed=(iTarget-cur)/6;
		speed = speed>0? Math.ceil(speed) : Math.floor(speed);

		if (cur==iTarget) 
		{
			clearInterval(obj.timer);
			if (endFn) {
				endFn();
			}
		}
		else
		{
			if (attr=='opacity') 
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
				
			}
			else
			{
				obj.style[attr]=speed+cur+'px';
			};
		};
	},30);
};