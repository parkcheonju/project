$(function () { 
    const visual = $("#banner_slide>ul>li>div"); 
    const button = $("#slide_bt>li"); 
    let current = 0; 
    let btnIdx = 0; 
    let id; 
    const speed = 3000;
    button.click(function () {
		btnIdx= $(this).index();
		button.removeClass("on");
		$(this).addClass("on");
		move();
});

//시간마다실행
timer();
function timer() {
    id = setInterval(function (){ 
        let next = current + 1; 
        if (next == visual.length) {
            next = 0;
        }
        button.eq(next).trigger("click");
    }, speed);
};

//이동시키는 함수
function move() {
    if (current == btnIdx) return;
    let cu = visual.eq(current);
    let ne = visual.eq(btnIdx);
    cu.css("left", "0").stop().animate({ left: "-100%" });
    ne.css("left", "100%").stop().animate({ left: "0%" });
    current = btnIdx;
}

clearAuto();
function clearAuto() { 
    $("#banner_slide,#slide_bt").mouseenter(function (){
        clearInterval(id);
    });
    $("#banner_slide,#slide_bt").mouseleave(function (){
        timer();
    }); 
};

});