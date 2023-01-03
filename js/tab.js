let menus = $(".ct__bt>li>a");
let panels = $(".ct__bottom>div");

menus.eq(0).addClass("active");
panels.eq(0).show();

menus.click(function (e) {
  e.preventDefault(); // 이벤트 발생시 a태그로 인한 끌어올림현상 없애줘
  let tg = $(this); // tg는 현재상태고
  let currentLink = tg.attr("href"); // 선택된 요소 tg의 첫번째 요소의 attributeName에 해당하는 속성값을 반환해 그게 href인데 그걸 currentLink로 정의하겠다
  
  menus.removeClass("active"); //menus의값 $(".ct__bt>li>a");에 적용되어있는 active를 지우고 
  tg.addClass("active"); //현재 클릭으로 만든 이벤트에 active 효과 넣어줘
  panels.hide(); // 패널 다 숨겨줘
  $(currentLink).show(); // 클릭이벤트의 속성값은 href인데 그걸 currentLink로 정의한 값을 보여줘?
});