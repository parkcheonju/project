// 이 코드는 div박스와 아래 버튼을 연동하는바람에 div박스와 버튼개수가 같아야 돌아가는 구조로 짜져있다
// 이미지는 9개 버튼는 총 4개 (왼쪽,정지,오른쪽,현재슬라이드번호)로 구성해야하며
// 이미지속도값이 버튼을 눌렀을때 자동으로 바뀌는 현상도 발견됨. 

$(function () { //수업 후, 만든 이미지 슬라이드라 아직 어딜 손봐야할지 명확히 모름
    const visual = $("#banner_slide>ul>li>div"); // $("#banner_slide>ul>li>div");를 visual로 정의
    const button = $("#slide_bt>li"); // $("#slide_bt>li");를 button로 정의
    let current = 0; //현재
    let btnIdx = 0; //클릭한 페이저 버튼의 인덱스 <--
    let id; //setIntervalId 이동속도 지정예정
    const speed = 3000;
    button.click(function () {
        // 클릭시 동작하는요소
		btnIdx= $(this).index();
		button.removeClass("on");
		$(this).addClass("on");
		move();
});

//시간마다실행
timer();
function timer() { // timer()를 정의
    id = setInterval(function (){  // id의 setInterval() 호출 사이에 고정된 시간 지연으로 함수를 반복적으로 호출하겠다
        let next = current + 1; //0+1 // let next는 current + 1 현재에 + 1이다.
        if (next == visual.length) { // 만약 next 값이 visual값의 문자열 코드유닛개수가 같다면 (좌측과 우측의 데이터가 같다면)
            next = 0; //넥스트는 0이다.
        }
        button.eq(next).trigger("click"); // 버튼.인덱스번호에 해당하는것을 찾겠다(next).트리거는 클릭이벤트
    }, speed);
};

//이동시키는 함수
function move() {  // move()를 정의
    if (current == btnIdx) return; // 만약 현재(current)가 btnIdx와 같다면 함수 실행을 종료하고, 주어진 값을 함수 호출 지점으로 반환.
    let cu = visual.eq(current); // visual의 인덱스 번호에 해당하는 (current)는 cu로 정의
    let ne = visual.eq(btnIdx); // visual의 인덱스 번호에 해당하는 (btnIdx)는 ne로 정의
    cu.css("left", "0").stop().animate({ left: "-100%" }); //visual의 인덱스 번호에 해당하는 (current)에 css("left", "0")를 추가하고.멈춘다. 에니메이션의 값이 ({ left: "-100%" });일때
    ne.css("left", "100%").stop().animate({ left: "0%" }); //visual의 인덱스 번호에 해당하는 (ne)에 css("left", "0")를 추가하고.멈춘다. 에니메이션의 값이 ({ left: "-100%" });일때
    current = btnIdx; // current(현재)는 btnIdx와 같다
}

//clearInterval
clearAuto(); //clearAuto()의 값을 정의
function clearAuto() { 
    $("#banner_slide,#slide_bt").mouseenter(function (){ // $("#banner_slide,#slide_bt") 이 값 안에있는 마우스가 들어간다면 
        clearInterval(id); //(id)호출로 이전에 설정된 시간 제한 반복 작업을 취소하겠다
    });
    $("#banner_slide,#slide_bt").mouseleave(function (){ //$("#banner_slide,#slide_bt") 이 값 안에있는 마우스가 나간다면
        timer(); //timer();가 실행된다
    }); 
};

});