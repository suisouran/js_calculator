const textbox1 = document.getElementById("textbox1")
const textbox2 = document.getElementById("textbox2")
const type = document.getElementById("type")
const display1 = document.getElementById("answer1")
const display2 = document.getElementById("answer2")
const display3 = document.getElementById("answer3")
const display4 = document.getElementById("answer4")

let secondNum = 0;
let ans = ''
let num=0;
let kigou = "";
let isInit = true;

function sign(btn) {
    kigou = btn;
    type.innerHTML = btn;
}

function one_bit_masking(D1){
    var D2=0b000;
    var mask=0b000;
   
    mask=1;

    D2=D1&mask;

    return(D2);
}

function two_bits_masking(D1){
    var D2=0b000;
    var mask=0b000;
   
    mask=1<<1;

    D2=D1&mask;

    return(D2);
}

function three_bits_masking(D1){
    var D2=0b000;
    var mask=0b000;
   
    mask=1<<2;

    D2=D1&mask;

    return(D2);
}

function four_bits_masking(D1){
    var D2=0b000;
    var mask=0b000;
   
    mask=1<<3;

    D2=D1&mask;

    return(D2);
}

function masking(D1,N1){
    var D2=0b000;
    var mask=0b000;

    mask=1<<N1;
    
    D2=D1&mask;

    return(D2);
}

function half_adder(N1,N2){
    var s=0;
    var c=0;

    s=N1^N2;
    c=N1&N2;

    /*線を追加するのでなく、桁上げをシフトで代用 */
    c=c<<1;

    return(s|c);
}


function two_bits_full_adder(N1,N2,C0){
    var s1=0;
    var s2=0;
    var c1=0;
    var i=0;
    var j=0;

    i=2;
    j=1;

    s1=half_adder(N1,N2);
    s2=half_adder(masking(s1,j),C0);

    c1=masking(s1,i)|masking(s2,i);
    s2=masking(s2,j);

    return(s2|c1);
}

function three_bits_full_adder(N1,N2,C0){
    var s1=0;
    var s2=0;
    var c1=0;
    var i=0;
    var j=0;

    i=3;
    j=2;

    s1=half_adder(N1,N2);
    s2=half_adder(masking(s1,j),C0);

    c1=masking(s1,i)|masking(s2,i);
    s2=masking(s2,j);

    return(s2|c1);
}

function three_bits_countup(N1){
    var sum=0;
    var c1=0;
    var d1=0;
    var d2=0;
    var N2=0;
    
    N2=1;

    /* 1ビット*/
    d1=one_bit_masking(N1);
    d2=one_bit_masking(N2);

    sum=one_bit_masking(half_adder(d1,d2));
    c=two_bits_masking(half_adder(d1,d2));

    /* 2ビット*/
    d1=two_bits_masking(N1);
    d2=two_bits_masking(N2);

    c=two_bits_full_adder(d1,d2,two_bits_masking(c));
    sum=sum|two_bits_masking(c);
    c=three_bits_masking(c);

     /* 3ビット*/  
    d1=three_bits_masking(N1);
    d2=three_bits_masking(N2);

    c=three_bits_full_adder(d1,d2,three_bits_masking(c));
    sum=sum|three_bits_masking(c);
    c=four_bits_masking(c);
    
    return(sum);
}

function bits_full_adder(N1,N2,C0,N3){
    var s1=0;
    var s2=0;
    var c1=0;
    var i=0;
    var j=0;

    i=three_bits_countup(N3);
    j=N3;
    
    s1=half_adder(N1,N2);
    s2=half_adder(masking(s1,j),C0);

    c1=masking(s1,i)|masking(s2,i);
    s2=masking(s2,j);

    return(s2|c1);
}

function seven_bits_countup(N1){
    var sum=0;
    var c=0;
    var d1=0;
    var d2=0;
    var N2=0;

    N2=1;
    d1=one_bit_masking(N1);
    d2=one_bit_masking(N2);
    sum=one_bit_masking(half_adder(d1,d2));
    c=two_bits_masking(half_adder(d1,d2));

    /* ビット数 */
    for (let i = 1; i < 6; i=three_bits_countup(i)){
        d1=masking(N1,i);
        d2=masking(N2,i);

        j=i;
        c=bits_full_adder(d1,d2,masking(c,i),j);
        sum=sum|masking(c,i);

        k=three_bits_countup(i);
        c=masking(c,k);
    }
    
    return(sum);
}

function seven_bits_countdown(N1){
    var sum=0;
    var c=0;
    var d1=0;
    var d2=0;
    var N2=0;

    N2=-1;
    d1=one_bit_masking(N1);
    d2=one_bit_masking(N2);
    sum=one_bit_masking(half_adder(d1,d2));
    c=two_bits_masking(half_adder(d1,d2));

    /* ビット数 */
    for (let i = 1; i < 6; i=three_bits_countup(i)){
        d1=masking(N1,i);
        d2=masking(N2,i);

        j=i;
        c=bits_full_adder(d1,d2,masking(c,i),j);
        sum=sum|masking(c,i);

        k=three_bits_countup(i);
        c=masking(c,k);
    }
    
    return(sum);
}

function full_adder(N1,N2,C0,N3){
    var s1=0;
    var s2=0;
    var c1=0;
    var i=0;
    var j=0;

    i=seven_bits_countup(N3);
    j=N3;
    
    s1=half_adder(N1,N2);
    s2=half_adder(masking(s1,j),C0);

    c1=masking(s1,i)|masking(s2,i);
    s2=masking(s2,j);

    return(s2|c1);
}

function addition(N1,N2){
    var sum=0;
    var c=0;
    var d1=0;
    var d2=0;
    var j=0;
    var k=0;

    d1=one_bit_masking(N1);
    d2=one_bit_masking(N2);
    sum=one_bit_masking(half_adder(d1,d2));
    c=two_bits_masking(half_adder(d1,d2));

    /* ビット数 */
    for (let i = 1; i < 31; i=seven_bits_countup(i)){
        d1=masking(N1,i);
        d2=masking(N2,i);

        c=full_adder(d1,d2,masking(c,i),i);
        sum=sum|masking(c,i);

        k=seven_bits_countup(i);
        c=masking(c,k);
       
    }
    
    return(sum);
}

function adder_subtractor(N1,N2,mode){
    var sum=0;
    var c=0;
    var d1=0;
    var d2=0;
    var k=0;
    var d3=0;

    d1=one_bit_masking(N1);
    d2=one_bit_masking(N2)^mode;

    d3=full_adder(d1,d2,one_bit_masking(mode),0);
    sum=one_bit_masking(d3);
    c=two_bits_masking(d3);

    /* ビット数 */
    for (let i = 1; i < 31; i=seven_bits_countup(i)){
        d1=masking(N1,i);

        mode=mode<<1;
        d2=masking(N2,i);
        d3=d2^mode;  

        c=full_adder(d1,d3,masking(c,i),i);
        sum=sum|masking(c,i);

        k=seven_bits_countup(i);
        c=masking(c,k);
       
    }
    
    return(sum);
}


function run() {
    var suji =0;
    var first_num=0;
    if (isInit) {
        ans = Number(textbox1.value)
        suji =parseInt(ans);

        display3.innerHTML = "入力1:"+suji.toString(2);
    }
    suji =parseInt(ans);
    first_num=Number(suji);
    secondNum = parseInt(Number(textbox2.value))
    suji =secondNum;

    display4.innerHTML ="入力2:"+ suji.toString(2);
    
    switch (kigou) {
        case "+":
            num = adder_subtractor(first_num,secondNum ,0);
            ans=String(num);
            break;
        case "-":
            num = adder_subtractor(first_num,secondNum ,1);
            ans=String(num);
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
    display1.innerHTML = "10進法：" + ans;

    suji =parseInt(ans);
    display2.innerHTML = "02進法：" + suji.toString(2);

    isInit = false;

}

function refresh() {
    isInit = true;
    secondNum = 0;
    ans = 0;
    kigou = "";
    type.innerHTML = "";
    display1.innerHTML = "十進法：";
    display2.innerHTML = "二進法：";
    display3.innerHTML = "入力１：";
    display4.innerHTML = "入力２：";
    textbox1.value = "";
    textbox2.value = "";
}
