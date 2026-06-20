topHead = document.getElementById("topHead");
usrINT = document.getElementById("usrINT");

totalEL = document.getElementById("total");
mistakesEL = document.getElementById("mistakes");

menu = document.getElementById("menu");
userINPUT = document.getElementById("userINPUT");
startBTN = document.getElementById("startBTN");
let totalNoOfQues = 0;
startBTN.onclick = () => {
  totalNoOfQues = userINPUT.value || 10
  menu.style.display = "none"
  totalEL.innerHTML = totalNoOfQues
};

qnBX = document.getElementById("qn");
ansBX = document.getElementById("ansBX");

THheight = Math.max(47, innerHeight * 0.1);
UIheight = innerHeight - THheight;

topHead.style.height = `${THheight}px`;
usrINT.style.height = `${UIheight}px`;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMultiplicationQues(d1, d2, tough = true) {

  if (tough && d2 == 1 && d1 == 2) {
    nu1 = getRandomIntInclusive(12, 99)
    nu2 = getRandomIntInclusive(2, 9);
    if (nu1 % 10 == 0) {
      nu1 += getRandomIntInclusive(2, 9)
    }
  } else {
    nu1 = getRandomIntInclusive(10 ** (d1 - 1), 10 ** d1 - 1);
    nu2 = getRandomIntInclusive(10 ** (d2 - 1), 10 ** d2 - 1);
  }

  answer = nu1 * nu2;
  return {
    nu1,
    nu2,
    answer,
  };
}

function updateQnBx(sessionData) {
  let n1 = sessionData.nu1;
  let n2 = sessionData.nu2;
  let ans = sessionData.answer;
  qnBX.innerHTML = `${done + 1}.  ${n1} ${operator} ${n2} = `;
}


let mistakes = 0;

let d1 = 2;
let d2 = 1;
let done = 0;
let operator = "x";
let sessionData = getMultiplicationQues(d1, d2);

updateQnBx(sessionData);
updateTopHead();


addEventListener("input", () => {
  ans = sessionData.answer;
  if (ansBX.value == ans) {
    // visuals
    usrINT.style.backgroundColor = "#0e2";
    setTimeout(() => {
      usrINT.style.backgroundColor = "#fff";
    }, 1000);

    // new question gen.
    done += 1;
    sessionData = getMultiplicationQues(d1, d2);
    updateQnBx(sessionData);
    ansBX.value = "";
  } else if (ansBX.value.length === ans.toString().length) {
    // visuals
    usrINT.style.backgroundColor = "#ff3441";
    setTimeout(() => {
      usrINT.style.backgroundColor = "#fff";
    }, 1000);
    // inc. mistakes count
    mistakes += 1;
    mistakesEL.innerHTML = mistakes;
    ansBX.value = "";
  }
});