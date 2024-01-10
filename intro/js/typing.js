// 인트로 페이지 타이핑 효과 js
//돔 객체 호출
import dFn from "./dom.js";

/////////////////////////////////////////
///글자타이핑/////////////////////////////
// 글자데이터를 가져와서 한글자씩 넣으면서
// 타이핑 하는 느낌주기

// 타이핑 데이터
const typingData = {
  main: "LEOPOLD",
};
// 타이핑 시간
const TYPING_TIME = 250;
// 1) 대상선정: 이벤트 .message-box span //
let typingArr = typingData["main"].split("");

const msgBoxSpan = dFn.qs(".message-box span");
// 인터발 함수 autoI
let autoI;
let count = 0;

// .6초마다 글자를 입력하는 인터발 함수
function insertText() {
  autoI = setInterval(() => {
    msgBoxSpan.innerText += typingArr[count];
    count++;
    // 글자데이터 길이보다 길어지면 멈춤
    if (count == typingArr.length) {
      clearInterval(autoI);
    }
  }, TYPING_TIME);
} ////////////insertText함수/////////////

// 2) 이벤트 설정 : load
dFn.addEvt(window, "DOMContentLoaded", () => {
  msgBoxSpan.innerText = "";
  //  인터발함수 호출
  setTimeout(() => {
    // 글자입력 함수
    insertText();
  }, 2000);
  // 키보드 타이핑 함수 호출
  typingKey(typingData.main);

  // 글자입력 끝나면
  // 키 마우스 클릭 이벤트
  setTimeout(() => {
    const keyList = dFn.qsa(".key");
    keyList.forEach((ele) => {
      dFn.addEvt(ele, "mousedown", keyhoverFn);
    });
  }, 2000 + typingArr.length * TYPING_TIME);

  const prodArea = $(".prod-area");
  const mover = $(".mover");
  console.log(mover);
  console.log(prodArea);
  prodArea.animate(
    {
      opacity: 0,
    },
    6000,
    "easeInQuart",
    // 콜백함수
    () => {
      mover.animate(
        {
          width: "200px",
          height: "200px",
        },
        500,
        "linear",
        () => {
          // 마우스 무브 이벤트 작동
          $(window)
            .on("mousemove", function (e) {
              let pos = [];
              pos[0] = Math.floor(e.pageX) - 100;
              pos[1] = Math.floor(e.pageY) - 100;
              mover
                .css({
                  left: pos[0] + "px",
                  top: pos[1] + "px",
                })
                .text("Enter")
                .delay(300)
                .animate(
                  {
                    width: "5000px",
                    height: "5000px",
                    left: (pos[0] - 2500) + "px",
                    top: (pos[1] - 2500) + "px",
                    backgroundColor: "#fff",
                  },
                  1200,
                  "easeOutQuart",
                  () => {
                    location.href = "https://itjuh.github.io/ajh-fed-react-pj/";
                  }
                );
              $(".key-box").css({
                transform: "translate(-50%, -100%) rotateX(90deg)",
              });
            })

            // 이벤트 등록 후 클릭 시 페이지 전환
            // .click(function (e) {
            //   let pos = [];
            //   pos[0] = Math.floor(e.pageX) - 2500;
            //   pos[1] = Math.floor(e.pageY) - 2500;
            //   console.log("클릭함");
            //   // 클릭하면 하단 키보드 돌고 화면 전환
            //   $(".key-box").css({
            //     transform: "translate(-50%, -100%) rotateX(90deg)",
            //   });
            //   mover
            //     // 원 안쪽 글자 비우고, 이전애니 없애고, 커지면서 화면전환
            //     .text("")
            //     .stop()
            //     .animate(
            //       {
            //         width: "5000px",
            //         height: "5000px",
            //         left: pos[0] + "px",
            //         top: pos[1] + "px",
            //         backgroundColor: "#fff",
            //       },
            //       1200,
            //       "easeOutQuart",
            //       () => {
            //         location.href = "https://itjuh.github.io/ajh-fed-react-pj/";
            //       }
            //     ); ///////mover ani종료 //////////
            // }); ////////클릭이벤트
        } /////콜백함수
      );
    }
  );
}); /////////////로드이벤트/////////////////////

// 타이핑 텍스트 키 매칭함수
function typingKey(txt) {
  // 타이핑 텍스트 나누기
  let eachTxt = txt.split("");
  console.log(eachTxt);
  // 타이핑 효과 줄 키 저장 변수
  let sameKeyList = [];
  for (let i = 0; i < eachTxt.length; i++) {
    dFn.qsa(".key-top").forEach((ele) => {
      if (ele.innerText.toLowerCase() == eachTxt[i].toLowerCase()) {
        //조부모찾아서 담기(스타일 대상)
        sameKeyList[i] = ele.parentNode.parentNode;
      } /////// if 일치하면 담기//////////
    }); /////////// key-top forEach /////////////
    console.log(sameKeyList);
  } ///////// for ////////////////

  // 스타일 적용
  sameKeyList.forEach((ele, idx) => {
    setTimeout(() => {
      ele.style.transform = "translateY(10px)";
      dFn.qsEl(ele, ".key-top").style.backgroundColor = "cornflowerblue";
      typingShow(ele);
    }, 2000 + idx * TYPING_TIME);
  });
} ////////// typingKey 함수 //////////

// 스타일 초기화 함수
function typingShow(ele) {
  setTimeout(() => {
    ele.style.transform = "translateY(0px)";
    dFn.qsEl(ele, ".key-top").style.backgroundColor = "#fff";
  }, 150);
} ////////// typingShow 함수 //////////

// 키 오버 함수
function keyhoverFn() {
  // console.log(this);
  this.style.transform = "translateY(10px)";
  dFn.qsEl(this, ".key-top").style.backgroundColor = "#888";
  // 마우스 놓을 때
  dFn.addEvt(this, "mouseup", function () {
    this.style.transform = "translateY(0px)";
    dFn.qsEl(this, ".key-top").style.backgroundColor = "#fff";
  });
  // 마우스 떠날 때
  dFn.addEvt(this, "mouseleave", function () {
    this.style.transform = "translateY(0px)";
    dFn.qsEl(this, ".key-top").style.backgroundColor = "#fff";
  });
} ////////// keyhoverFn ////////////
