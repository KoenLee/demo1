function activated(target){
    target.mouseover(function(){

    })
}

for (var i = 0; i < $('#selector .section img').length; i++) {
    var  el = $('#selector .section img');
    (function(index){
        el.eq(index).mouseover(function(e){
            $('#selector .section').eq(index).animate({
                zoom:1.2
            });
            $('#selector .section').eq(index).siblings().css({
                backgroundColor:'#4a4a4a'
            }).css({
                color:'#fff'
            });
        
         
            e.stopPropagation();
        });

        el.eq(index).mouseout(function(e){
            $('#selector .section').eq(index).animate({
                zoom:1});
                $('#selector .section').css({
                    backgroundColor:'#fff'
                }).css({
                    color:'#040404'
                });
            e.stopPropagation()
        });

    })(i);
    
}


function hover(targetArr,zoom,opacity){
    for (var i = 0; i < targetArr.length; i++) {
        var e = targetArr[i];
        zoomToggle(e,zoom,opacity)
    }
}

function zoomToggle(target,zoom,opacity){
    var w=target.width();
    target.mouseover(function(e){
        $(this).animate({
            width:zoom*w,
            opacity:opacity
        });
        e.stopPropagation();
    }).mouseout(function(e){
        $(this).animate({
            width:w,
            opacity:'1'
        });
        e.stopPropagation();
    })
    
}

hover([$('.start-button')],1.2,0.8)