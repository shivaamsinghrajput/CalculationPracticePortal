topHead = document.getElementById("topHead");
usrINT = document.getElementById("usrINT");

totalEL = document.getElementById("total");
leftEL = document.getElementById("left");
mistakesEL = document.getElementById("mistakes");

menu = document.getElementById("menu");
noqINPUT = document.getElementById("noqINPUT");
doneBTN = document.getElementById("doneBTN");
let noq = 0;
let noql = 0;
doneBTN.onclick = () => {
   val=noqINPUT.value
   noq=val
   noql=val
   menu.style.display="none"
   updateTopHead()
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
  
  if (tough && d2 == 1 && d1==2) {
    nu1=getRandomIntInclusive(12,99)
    nu2 = getRandomIntInclusive(2, 9);
    if(nu1%10==0){
      nu1+=getRandomIntInclusive(2,9)
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
  //   console.log(`${n1} x ${n2} = `);
  //   console.log(ans);
}

// function testSession(d1,d2,operator, noOfQuestions, mistakeINC) {}
function updateQnBx(sessionData) {
  let n1 = sessionData.nu1;
  let n2 = sessionData.nu2;
  let ans = sessionData.answer;
  qnBX.innerHTML = `${done + 1}.  ${n1} ${operator} ${n2} = `;
}

function updateTopHead() {
  totalEL.innerHTML = noq;
  leftEL.innerHTML = noql;
  mistakesEL.innerHTML = mistakes;
}

let mistakes = 0;

let d1 = 2;
let d2 = 1;
let done = 0;
let operator = "x";
let sessionData = getMultiplicationQues(d1, d2);

updateQnBx(sessionData);
updateTopHead();

firstINP=true
addEventListener("input", () => {
  ans = sessionData.answer;
  if (ansBX.value == ans) {
    noql -= 1;
    done += 1;
    sessionData = getMultiplicationQues(d1, d2);
    updateQnBx(sessionData);
    updateTopHead();
    ansBX.value = "";
  } else if (ansBX.value.length == ans.toString().length) {
    mistakes += 1;
    updateTopHead();
    ansBX.value = "";
    usrINT.style.backgroundColor = "#ff3441";
    setTimeout(() => {
      usrINT.style.backgroundColor = "#fff";
    }, 1500);
  }

  if (noql == 0 && !firstINP) {
    usrINT.style.backgroundColor = "#0e2";
  }
  if(firstINP){
    firstINP=false
  }
});