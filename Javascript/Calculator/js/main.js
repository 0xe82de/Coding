"use strict";

const btns = document.getElementById("jsBtns");
const printResult = document.getElementById("jsPrintResult");
const printTemp = document.getElementById("jsPrintTemp");
let checkOp = 0;

function printNum(key) {
  if (checkOp === 1) {
    checkOp = 0;
    printResult.innerHTML = "0";
  }
  if (printResult.innerHTML === "0") {
    printResult.innerHTML = key;
  } else {
    printResult.innerHTML = printResult.innerHTML + key;
  }
}

function changeSign() {
  if (printResult.innerHTML[0] === "-") {
    printResult.innerHTML = printResult.innerHTML.slice(1);
  } else {
    printResult.innerHTML = "-" + printResult.innerHTML;
  }
}

function addDot() {
  if (printResult.innerHTML.indexOf(".") === -1) {
    printResult.innerHTML = printResult.innerHTML + ".";
  }
}

function square() {
  printResult.innerHTML = printResult.innerHTML * printResult.innerHTML;
}

function clear() {
  printResult.innerHTML = "0";
  printTemp.innerHTML = "0";
}

function addOp(key) {
  if (checkOp === 1) {
    if (printTemp.innerHTML == "0") {
      printTemp.innerHTML = printResult.innerHTML + key;
    } else {
      printTemp.innerHTML = printTemp.innerHTML.slice(0, -1) + key;
    }
  } else if (printTemp.innerHTML === "0") {
    printTemp.innerHTML = printResult.innerHTML + key;
  } else {
    printTemp.innerHTML = printTemp.innerHTML + printResult.innerHTML + key;
  }
}

function getEx() {
  return printTemp.innerHTML + printResult.innerHTML;
}

function calculate(ex) {
  let tmpNums = ex.split(/÷|×|－|＋/);
  let tmpResult = [];
  let count = 0;
  const lengthNums = tmpNums.length;
  const lengthOps = lengthNums - 1;
  let lengthTmp = ex.length;
  let countOp = 0;
  let tmp = 0;

  // 피연산자 저장
  for (let i = 0; i < lengthNums; i++) {
    tmpResult[2 * i] = Number(tmpNums[i]);
  }

  // 연산자 저장
  for (let i = 0; i < lengthOps; i++) {
    for (let j = count; j < ex.length; j++) {
      if (ex[j] === "÷" || ex[j] === "×" || ex[j] === "－" || ex[j] === "＋") {
        tmpResult[2 * i + 1] = ex[j];
        count = j + 1;
        break;
      }
    }
  }

  for (let i = 0; i < lengthOps; i++) {
    countOp = tmpResult.indexOf("÷");
    if (countOp != -1) {
      tmp = tmpResult[countOp - 1] / tmpResult[countOp + 1];
      tmpResult[countOp - 1] = tmp;
      tmpResult.splice(countOp, 2);
    }

    countOp = tmpResult.indexOf("×");
    if (countOp != -1) {
      tmp = tmpResult[countOp - 1] * tmpResult[countOp + 1];
      tmpResult[countOp - 1] = tmp;
      tmpResult.splice(countOp, 2);
    }

    countOp = tmpResult.indexOf("－");
    if (countOp != -1) {
      tmp = tmpResult[countOp - 1] - tmpResult[countOp + 1];
      tmpResult[countOp - 1] = tmp;
      tmpResult.splice(countOp, 2);
    }

    countOp = tmpResult.indexOf("＋");
    if (countOp != -1) {
      tmp = tmpResult[countOp - 1] + tmpResult[countOp + 1];
      tmpResult[countOp - 1] = tmp;
      tmpResult.splice(countOp, 2);
    }
  }

  printResult.innerHTML = tmpResult[0];
}

function executeFnc(key) {
  switch (key) {
    case "9":
    case "8":
    case "7":
    case "6":
    case "5":
    case "4":
    case "3":
    case "2":
    case "1":
    case "0":
      printNum(key);
      break;
    case "＋/－":
      changeSign();
      break;
    case ".":
      addDot();
      break;
    case "×<sup>2</sup>":
      square();
      break;
    case "C":
      clear();
      checkOp = 0;
      break;
    case "÷":
    case "×":
    case "－":
    case "＋":
      addOp(key);
      checkOp = 1;
      break;
    case "＝":
      let ex = getEx();
      calculate(ex);
      // checkOp = 1;
      printTemp.innerHTML = "0";
      break;
  }
}

function getKey(event) {
  let key = event.srcElement.innerHTML;
  executeFnc(key);
}

if (btns) {
  let key = btns.addEventListener("click", getKey);
  // console.log(key);
}
