// 키보드 데이터 회전형으로 입력 js

//돔 객체 호출
import dFn from './dom.js';

// 제품 데이터
import { prodData } from './data.js';

/////////////////////////////////////////////////
///////// 원형으로 이미지 데이터 뿌리기 ///////////
/////////////////////////////////////////////////
// [1] 요구사항
// 1. 데이터 개수를 분류하여 뿌리기
// 2. 이미지는 화면 중심으로부터 이동
// 3. 화면사이즈를 가져와서 이미지 크기를 조정한다.

// 대상 :.box1, .box2
const prodInBox = dFn.qs(".inner-box");
const prodOutBox = dFn.qs(".outer-box");

// [2] 데이터 나누기
let data750arr = []; // 안쪽 원
let data900arr = []; // 밖 원
let dataOther = []; // 나머지

let x = 0; // 900분류용
let y = 0; // 750분류용
let z = 0; // 나머지분류용
for (let i = 0; i < prodData.length; i++) {
  let a = prodData[i][0];
  a = a.substr(2, 3);
  if (a == 900) {
    data900arr[x] = prodData[i];
    x++;
  } else if (a == 750) {
    data750arr[y] = prodData[i];
    y++;
  } else {
    dataOther[z] = prodData[i];
    z++;
  }
} /////////////for//////////////////

// console.log(data750arr, data900arr, dataOther);


/////////////////////////////////////////////////////////
///해당 영역에 원형 뿌리기 함수 ///////////////////////////
// 1. 기능 : 대상area배열과 대상데이터배열을 받아와서 원형배치한다.
//////////////////////////////////////////////////////////
// 코드저장 변수
let hcode;
// 스케일 적용변수
let scaleVal;
// 초기 이미지 사이즈
let initImg = [65,200];

function makeFn(area, data, radius, imgSize) {
  hcode = "";

  scaleVal = (window.innerWidth/1920);
  // 윈도우 크기에 따른 스케일 세팅(1920에서 100%)
  if(scaleVal < .7){
    scaleVal = 0.7;
  }else if(scaleVal < .5){
    scaleVal = 0.5;
  }else if(scaleVal < .3){
    scaleVal = 0.3;
  }
  // 각도, 이미지크기 스케일 적용
  radius = Math.floor(scaleVal * radius);
  initImg[1] = Math.floor(scaleVal * 200);
  initImg[0] = Math.floor(initImg[1] * (65/200));
  // 윈도우 중앙기준
  let wid = window.innerWidth;
  let high = window.innerHeight;
  // 500px사이즈 이하에서 각도 세부조정
  if(wid < 500){
    radius *= 0.85;
  }
  data.forEach((ele, idx) => {
    // 삼각함수 각도값
    let degVal = (2 * Math.PI * idx) / data.length;
    let degRotate = 0 + (360 / data.length) * idx;
    // 위치이동값 박스크기/2 - 이미지크기/2 + sin(각도)*원반지름 - 내위치값;
    let topVal = high / 2 - imgSize[0] / 2 + radius * Math.sin(degVal);
    let leftVal = wid / 2 - imgSize[1] / 2 + radius * Math.cos(degVal);
    // console.log(topVal,leftVal);
    hcode += `
      <div class='prod-item' style='left: ${leftVal}px; top: ${topVal}px;  width:${imgSize[1]}px;'>
      <img src='./images/image_prod2/${ele[3]}.png' alt='${ele[1]} 이미지' style='transform: rotate(${degRotate}deg);'>
            <!-- <span>${ele[0]}</span> -->
            <!-- <span>${ele[2]}</span> -->
        </div>
      `;
  }); /////////forEach //////////
  area.innerHTML = hcode;
} /////////makeFn 함수 /////////////

// 초기makeFn호출
makeFn(prodInBox, data750arr, 500, initImg);
makeFn(prodOutBox, data900arr, 800, initImg);
keyResize();

dFn.addEvt(window,'resize',()=>{
  // 반지름 크기 1920/1080 일 때 500/800
  makeFn(prodInBox, data750arr, 500, initImg);
  makeFn(prodOutBox, data900arr, 800, initImg);
  keyResize()
});

// 키보드 사이즈 변경 시 호출 함수
function keyResize(){
  scaleVal = (window.innerWidth/1920) * 0.8;
  if(scaleVal > .5) {
    // 키보드 보여지고 작아지기
    $('.wrap').show().css({transform:`scale(${scaleVal})`});
    // 메세지창 위로 이동
    $('.message-box').css({marginTop:'20vh'}).find('span').css({fontSize:`${2*scaleVal}rem`});
  }
  else{
    // 키보드 안보이기
    $('.wrap').css({display:'none'});
    // 메세지창 중앙이동
    $('.message-box').css({marginTop:'32vh'}).find('span').css({fontSize:`${5*scaleVal}rem`});
  }
} ////////// 키보드 사이즈 변경 함수 ////////////////