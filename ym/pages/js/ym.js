corner();
$(window).resize(function(){
    corner();
})

function corner(){

    $('.corner ul').css('left',($(window).width())/2-$('.corner li').width());
    $('.corner .left').css('width',(($(window).width())/2)-($('.corner li').width()/2));
    $('.corner .right').css('width',(($(window).width())/2)-($('.corner li').width()/2));    
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



hover([
    $('.button')
],'1.5','0.7');

hover([
    $('.section img')
],'1.2','0.8');
