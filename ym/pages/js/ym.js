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
    for (let i = 0; i < targetArr.length; i++) {
        const e = targetArr[i];
        zoomToggle(e,zoom,opacity)
    }
}

function zoomToggle(target,zoom,opacity){
    target.mouseover(function(){
        $(this).animate({
            zoom:zoom,
            opacity:opacity
        })
    }).mouseout(function(){
        $(this).animate({
            zoom:'1',
            opacity:'1'
        })
    })
    
}



hover([
    $('.button'),$('.section img')
],'1.2','0.8');


function slideLeft(){
    $('#preview .container').animate({
        marginLeft:-($('#preview .container li:eq(0)').outerWidth())
    },function(){
        $('#preview .container li:eq(0)').appendTo($('#preview .container'));
        $('#preview .container').css('marginLeft',0);
    })
}
