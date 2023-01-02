let taps=$(".ct__bt>a");
let panels=$(".ct__bottom>div");

taps.eq(0).addClass("active");
panels.eq(0).show();

taps.click(function(e){
    e.preventDefault();
    let tg=$(this);
    let currentLink=tg.attr("href");
    taps.removeClass("active");
    $(currentLink).show();
    panels.hide();
});
console.log(taps)