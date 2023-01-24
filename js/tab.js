let menus = $(".ct__bt>li>a");
let panels = $(".ct__bottom>div");

menus.eq(0).addClass("active");
panels.eq(0).show();

menus.click(function (e) {
  e.preventDefault();
  let tg = $(this);
  let currentLink = tg.attr("href");
  
  menus.removeClass("active");
  tg.addClass("active");
  panels.hide();
  $(currentLink).show();
});