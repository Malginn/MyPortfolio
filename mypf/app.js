$(function(){
    $("[data-scroll]").on("click",function(event){
        event.preventDefault();
        blockID = $(this).data('scroll');
        blockOffset = $(blockID).offset().top;
        $('html, body').animate({
            scrollTop:  blockOffset - 50
        });
    });

    $("[data-modal]").on("click",function(event){
        event.preventDefault();
        $('#modal_resume').addClass('show');

    });

    $('#modal_resume').on('click',function(){
        $('#modal_resume').removeClass('show')
    });


//новая фича не знаю как работает, но работает
    let isScroll = 0, // доп. проверка
    targetScroll = 1000; // расстояние до действия / в px
    
$(window).on('scroll', function(){
  if(isScroll === 0 && $(this).scrollTop() >= targetScroll) {
    isScroll = 1;
    $('.about_content').addClass('satodsan-uvemopag');
    console.info('change 1');
  } else if(isScroll === 1 && $(this).scrollTop() < targetScroll) {
    isScroll = 0;
    $('.block').css('background', 'green');
    console.info('change 0');
  }
});


});