const castBox = document.querySelector(".banner_weather");
let statusText, rainIcon, locText;
rainIcon = ['<i class="bi bi-brightness-high-fill"></i>', '<i class="bi bi-cloud-drizzle-fill"></i>', '<i class="bi bi-cloud-fog2-fill"></i>', '<i class="bi bi-lightning-fill"></i>', '<i class="bi bi-snow3"></i>'];

//getUltraSrtNcst 초단기 실황을 받아오는 파라미터 엑셀파일에 적혀있음
//getUltraSrtFcst 단기예보

let url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/";

let params = {
  type: ["getUltraSrtNcst", "getUltraSrtFcst"], //(초단기실황)(단기예보)
  key: "qiUjWGNCMudOxBvHqxd3OdoLSVVc%2FPHL8EZQDmddny8Pmk3mjo20cqwwLaDIr6nbl3498ravmKRNBfzkEEY4xw%3D%3D",
  pageNo: "1",
  numOfRows: "1000",
  dataType: "JSON",
  base_date: now,
  base_time: "0600",
  nx: "55",
  ny: "127",
};

url = `${url}${params.type[0]}?serviceKey=${params.key}&pageNo=${params.pageNo}&numOfRows=${params.numOfRows}&dataType=${params.dataType}&base_date=${params.base_date}&base_time=${params.base_time}&nx=${params.nx}&ny=${params.ny}`;

async function getPosts() {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function setPosts() {
  const posts = await getPosts();
  const datas = posts.response.body.items.item;

  //동적요소 생성

  const castEl = document.createElement("table");
  castEl.classList.add("table");
  const tr = document.createElement("tr");

  //console.log(datas);
  let cast = {
    baseDate: datas[0].baseDate,
    rain: datas[0].obsrValue,
    rainInfo: function () {
      let info = this.rain + 2;
      console.log(info);

      if (info == 0) {
        statusText = "맑음";
        rainIcon = rainIcon[0];
      } else if (info == 1) {
        statusText = "비";
        rainIcon = rainIcon[1];
      } else if (info == 2) {
        statusText = "비/눈";
        rainIcon = rainIcon[2];
      } else if (info == 3) {
        statusText = "눈";
        rainIcon = rainIcon[3];
      }
    },
    temperature: datas[3].obsrValue,
    wind: datas[5].obsrValue,
    nx: datas[0].nx,
    ny: datas[0].ny,
    loc: function () {
      let point = [this.nx, this.ny];
      console.log(point);
      if (point[0] == 55 && point[1] == 127) {
        locText = "영동군";
      }
    },
  };

  cast.rainInfo();
  cast.loc();

  tr.innerHTML = `
  <tr>오늘날짜:${cast.baseDate}</tr><hr>
  <tr>지역:${locText}</tr><hr>
  <tr>강수형태:${statusText}${rainIcon}</tr><hr>
  <tr>기온:${cast.temperature}</tr><hr>
  <tr>바람:${cast.wind}</tr>
  `;

  castEl.appendChild(tr);
  castBox.appendChild(castEl);
}
setPosts();
