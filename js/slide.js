$(document).ready(function(){
    $('.bxslider').bxSlider({
      mode:'horizontal',
      speed:500,
      captions:true,
      controls:true,
      auto:true,
      nextText:'<i class="fa-sharp fa-solid fa-angle-right"></i>',
      prevText:'<i class="fa-sharp fa-solid fa-angle-left"></i>',
      autoControls:true,
      startText:'<i class="fa-sharp fa-solid fa-play"></i>',
      stopText:'<i class="fa-sharp fa-solid fa-stop"></i>',
    });
});