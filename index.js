const LIFE_COUNT = 3;

const result = document.getElementById("result");
const input = document.getElementById("input");
const failContainer = document.getElementById("failContainer");
const winContaiter = document.getElementById("winContaiter");
const btnReset = document.getElementById("btnReset");
const inputWrapper = document.getElementById("inputWrapper");

let numberArr;
let numberToGuess;
let currentLifeCount;
let answerArr = [
  "Не тот диапазон!",
  "Открой глаза и посмотри?",
  "Ну да неудача это твое",
  "Ты читать не умеешь?",
];

function init() {
  numberArr = generateRandomNumArr();
  numberToGuess = generateRandomNumberItem(numberArr);
  renderHelperText();
  resetCurrentLifeCount();
  initLifeCount();
  initInput();
  winContaiter.innerHTML = "";
}

function initInput() {
  input.style.display = "block";
  input.focus();
}

function initLifeCount() {
  for (let i = 0; i < LIFE_COUNT; i++) {
    const imgElemet = document.createElement("img");
    imgElemet.className = "img";
    imgElemet.setAttribute("src", "./images/heart.png");
    failContainer.appendChild(imgElemet);
  }
}

function initBrokenLife() {
  const imgElemet = document.createElement("img");
  imgElemet.setAttribute("src", "./images/broken-heart.png");
  return imgElemet;
}

function initBtnReset() {
  const btnReset = document.createElement("button");
  btnReset.id = "btnReset";
  btnReset.innerText = "Заново";
  winContaiter.appendChild(btnReset);

  btnReset.addEventListener("click", function () {
    init();
  });
}

function initWin(isWin, result) {
  winContaiter.className = "restartGame";
  if (isWin) {
    winContaiter.innerHTML = `WIN NUMBER ${result}`;
    winContaiter.classList.add("win");
    input.style.display = "none";
  } else {
    winContaiter.innerHTML = `Looser!`;
    winContaiter.classList.add("looser");
    input.style.display = "none";
  }
  initBtnReset();
}

function resetCurrentLifeCount() {
  currentLifeCount = LIFE_COUNT;
  while (failContainer.firstElementChild) {
    failContainer.removeChild(failContainer.firstElementChild);
  }
}

function generateRandomNumberItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function helperMessage() {
  document.getElementById("helperMessage").innerHTML =
    generateRandomNumberItem(answerArr);
}

function renderHelperText() {
  document.getElementById("helperText").innerHTML = `Ваше значие от ${
    numberArr[0]
  } до ${numberArr[numberArr.length - 1]}`;
}

function generateRandomNumArr() {
  const numArray = [];
  const firstRandomNum = Math.floor(Math.random() * 45 + 1);
  for (let i = firstRandomNum; numArray.length < 5; i++) {
    numArray.push(i);
  }
  return numArray;
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.getElementById("helperMessage").innerHTML = "";
    result.className = "";
    const correctDiapazone =
      this.value >= numberArr[0] &&
      this.value <= numberArr[numberArr.length - 1];

    if (this.value == numberToGuess) {
      result.innerHTML = "";
      initWin(true, this.value);
      this.value = "";
    } else if (currentLifeCount > 1) {
      if (correctDiapazone) {
        result.innerHTML = this.value;
      } else {
        helperMessage();
        result.innerHTML = "";
      }
      const imgElements = document.getElementsByClassName("img");
      result.classList.add("false");
      currentLifeCount = currentLifeCount - 1;
      failContainer.replaceChild(
        initBrokenLife(),
        imgElements[currentLifeCount]
      );
    } else {
      initWin(false);
      result.innerHTML = "";
    }
    this.value = "";
  }
});

init();
