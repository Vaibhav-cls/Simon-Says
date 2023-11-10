let gameSeq = [];
let userSeq = [];
let started = false;
let pts = 0;
let points = document.getElementById("point");
let btns = ["red", "blue", "purple", "yellow"];
let levels = 0;
let label = document.getElementById("label");
document.addEventListener("keypress", () => {
  if (started == false) {
    label.innerText = "Game Started";
    started = true;
    levelUp();
  }
});
let level = document.getElementById("levelUp");
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 200);
}

function levelUp() {
  levels++;
  level.innerText = levels;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);
  gameSeq.push(randColor);
  userSeq = [];
  gameFlash(randBtn);
}
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      pts += 5;
      points.innerText = `${pts} pts`;
      setTimeout(levelUp, 1000);
    }
  } else {
    setTimeout(()=>{
    reset();
    },2000);
    label.innerText = "GAME OVER! Press any key to restart";
    label.style.color = "red";
  }
}
function btnPress() {
  if (started == true) {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
  }
}
let allBtns = document.querySelectorAll(".buttons");
for (i of allBtns) {
  i.addEventListener("click", btnPress);
}
function reset(){
    started = false ;
    gameSeq=[];
    userSeq = [];
    levels = 0;
    pts=0;
    points.innerText = `${pts} pts`
    label.style.color = "white";
}