// 일반인증키
const API_KEY = "K2JXT%2BMu8GnZMyjRfzlGwrMautCkMFKvkv3nxDvP4xpHeexU5hftpnTrmY9IQH%2BhZ4nOxkJEHy2m5TtS8fyamQ%3D%3D";

let dust_num = 7;
let today = new Date(); /* Mon Feb 20 2023 23:09:04 GMT+0900 (한국 표준시) */
let year = today.getFullYear();
let month = today.getMonth() + 1; //월은 0월부터시작해서 +1을 한 것.
let date = today.getDate();

month = month >= 10 ? month : "0" + month; //한자리 월 앞에 0붙이기
date = date >= 10 ? date : "0" + date; //한자리 월 앞에 0붙이기

let total_date = `${year}${month}${date}`; /* 날짜 api요청변수 value*/
let total_date2 = `${year}.${month}.${date}`; /* 날짜 출력 */

get_data2();
get_data1();

/* temperature */
async function get_data1() {
  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?ServiceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=json&base_date=${total_date}&base_time=0600&nx=59&ny=75`;
  const response = await fetch(url);
  data = await response.json();
  console.log("data1", data);
  temper_data(data);
}

/* dust_value */
async function get_data2() {
  const url = `https://api.odcloud.kr/api/RltmArpltnInforInqireSvrc/v1/getCtprvnRltmMesureDnsty?serviceKey=${API_KEY}&numOfRows=100&pageNo=1&returnType=json&sidoName=%EA%B4%91%EC%A3%BC`;
  const response = await fetch(url);
  data = await response.json();
  console.log("data2", data);
  dust_data(data);
}

document.querySelector(".date").innerText = `${total_date2}`;

function temper_data(data) {
  let weather_value = data.response.body.items.item[0].obsrValue;
  let target = document.querySelector(".ico");

  if (weather_value == 0) {
    // weather = "맑음";
    target.style.backgroundPosition = "0px";
  } else if (weather_value === 1) {
    // weather = "비";
    target.style.backgroundPosition = "-160px";
  } else if (weather_value === 2) {
    // weather = "비/눈";
    target.style.backgroundPosition = "-200px";
  } else if (weather_value === 3) {
    // weather = "눈";
    target.style.backgroundPosition = "-240px";
  } else if (weather_value === 4) {
    // weather = "소나기";
    target.style.backgroundPosition = "-160px";
  } else {
    // weather = "날씨 파악중";
    target.style.backgroundPosition = "0px";
  }
  document.querySelector(".temper").innerText = `${data.response.body.items.item[3].obsrValue}℃`;
}

function dust_data(data) {
  let dust = data.response.body.items[dust_num].pm10Value;
  let dust_grade;

  if (dust >= 0 && dust <= 15) {
    dust_grade = "좋음";
  } else if (dust >= 16 && dust <= 35) {
    dust_grade = "보통";
  } else if (dust >= 36 && dust <= 75) {
    dust_grade = "나쁨";
  } else if (dust >= 76) {
    dust_grade = "매우나쁨";
  } else {
    dust_grade = "error";
  }
  /* 한국환경공단 실시간 대기오염 정보 에어코리아 */
  /* ${data.response.body.items[7].dataTime} */
  document.querySelector(".dust").innerText = `
  ${dust}㎍/㎥(${dust_grade})
  `;
}
