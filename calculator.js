const textbox1 = document.getElementById("textbox1")
const textbox2 = document.getElementById("textbox2")
const type = document.getElementById("type")
const display = document.getElementById("answer")

let secondNum = 0;
let ans = ''
let kigou = "";
let isInit = true;

function sign(btn) {
    kigou = btn;
    type.innerHTML = btn;
}

function run() {
    if (isInit) {
        ans = Number(textbox1.value)
    }
    secondNum = Number(textbox2.value)
    switch (kigou) {
        case "+":
            ans += secondNum;
            break;
        case "-":
            ans -= secondNum;
            break;
        case "×":
            ans *= secondNum;
            break;
        case "÷":
            ans /= secondNum;
            break;
        default:
            ans = 0;
    }
    display.innerHTML = ans;
    isInit = false;
}

function refresh() {
    isInit = true;
    secondNum = 0;
    ans = 0;
    kigou = "";
    type.innerHTML = "";
    display.innerHTML = 0;
    textbox1.value = "";
    textbox2.value = "";
}