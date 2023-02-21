$(document).ready(function(){
    $('.bxslider').bxSlider({
      mode:'horizontal',
      speed:500,
      captions:true,
      controls:true,
      auto:true,
      nextText:'<i class="fa-solid fa-arrow-right"></i>',
      prevText:'<i class="fa-solid fa-arrow-left"></i>',
      autoControls:true,
      startText:'◼',
      stopText:'▶',
    });
});