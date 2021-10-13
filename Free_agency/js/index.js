$(function(){
    $('.circle').click(function(){
        $('.modal').slideToggle(500);
        $('.modal').css('display','flex')
    })


    $('[data-scroll]').on('click',function(event){
        event.preventDefault();
        blockId = $(this).data('scroll');
        blockOffset = $(blockId).offset().top;
        console.log(blockOffset);
        $('html, body').animate({
            scrollTop: blockOffset 
        });

    });








});