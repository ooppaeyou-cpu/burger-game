let money = 0;
let score = 0;
let level = 1;

let gameStarted = false;


// จำนวนลูกค้าแต่ละด่าน

let levelCustomers = [
5,8,12,15,20,
25,30,35,40,45,
50,55,60,65,70,
75,80,90,100,120
];


let servedCustomer = 0;


// อาหาร

let meat = false;
let fries = false;
let drink = false;
let burger = false;


// สถานะ

let meatCooking = false;
let friesCooking = false;
let drinkBlending = false;
let assembling = false;


// Timer

let meatTimer;
let friesTimer;
let drinkTimer;

let meatBurnTimer;
let friesBurnTimer;

let customerTimer;




let order={};



let menu=[

{
text:"🍔 เบอร์เกอร์ + 🍟 เฟรน",
meat:true,
fries:true,
drink:false
},

{
text:"🍔 เบอร์เกอร์ + 🥤 น้ำ",
meat:true,
fries:false,
drink:true
},

{
text:"🍟 เฟรน + 🥤 น้ำ",
meat:false,
fries:true,
drink:true
},

{
text:"🍔🍟🥤 ชุดใหญ่",
meat:true,
fries:true,
drink:true
}

];







// ======================
// เสียง
// ======================


function playSound(id){

let sound=document.getElementById(id);

if(sound){

sound.currentTime=0;

sound.play().catch(()=>{});

}

}








// ======================
// เริ่มเกม
// ======================


function startGame(){


if(gameStarted)return;


gameStarted=true;


document.getElementById("startScreen")
.style.display="none";


let bgm=document.getElementById("bgm");


bgm.volume=0.3;


bgm.play().catch(()=>{});



newCustomer();


startCustomerTimer();


}








// ======================
// ลูกค้า
// ======================


function newCustomer(){


order =
menu[Math.floor(Math.random()*menu.length)];



document.getElementById("order")
.innerHTML=
"🧾 "+order.text;



}



function startCustomerTimer(){


customerTimer=setInterval(()=>{


if(!gameStarted)return;



},1000);


}








// ======================
// เนื้อ
// ======================


function cookMeat(){


if(!gameStarted)return;


if(meatCooking || meat)return;



meatCooking=true;


let p=0;


let circle=
document.getElementById("meatProgress");



meatTimer=setInterval(()=>{


p+=5;


circle.innerHTML=p+"%";



circle.parentElement.style.background=

`conic-gradient(
green ${p*3.6}deg,
#ddd 0deg
)`;



if(p>=100){


clearInterval(meatTimer);


meatCooking=false;

meat=true;


playSound("cookSound");



circle.innerHTML="🍖";


startBurnMeat();


}



},400);


}







function startBurnMeat(){


let time=10;


meatBurnTimer=setInterval(()=>{


time--;


document.getElementById("meatWarning")
.innerHTML=
"🔥 ไหม้ใน "+time+" วิ";



if(time<=0 && meat){


clearInterval(meatBurnTimer);


meat=false;


document.getElementById("meatProgress")
.innerHTML="🔥";


document.getElementById("meatWarning")
.innerHTML=
"💀 ไหม้";


}


},1000);



}









// ======================
// เฟรน
// ======================


function cookFries(){


if(!gameStarted)return;


if(friesCooking || fries)return;



friesCooking=true;


let p=0;


let circle=
document.getElementById("friesProgress");



friesTimer=setInterval(()=>{


p+=5;


circle.innerHTML=p+"%";


// แก้หลอดไม่ขึ้น

circle.parentElement.style.background=

`conic-gradient(
orange ${p*3.6}deg,
#ddd 0deg
)`;



if(p>=100){


clearInterval(friesTimer);



friesCooking=false;

fries=true;


playSound("cookSound");


circle.innerHTML="🍟";


startBurnFries();


}



},400);


}






function startBurnFries(){


let time=10;


friesBurnTimer=setInterval(()=>{


time--;


document.getElementById("friesWarning")
.innerHTML=
"🔥 ไหม้ใน "+time+" วิ";



if(time<=0 && fries){


clearInterval(friesBurnTimer);


fries=false;


document.getElementById("friesProgress")
.innerHTML="🔥";


document.getElementById("friesWarning")
.innerHTML=
"💀 ไหม้";


}



},1000);


}









// ======================
// น้ำปั่น
// ======================


function blendDrink(){


if(!gameStarted)return;


if(drinkBlending || drink)return;



drinkBlending=true;


let p=0;


let circle=
document.getElementById("drinkProgress");


let icon=
document.getElementById("drink");



icon.classList.add("blending");



drinkTimer=setInterval(()=>{


p+=10;


circle.innerHTML=p+"%";


// แก้หลอดน้ำ

circle.parentElement.style.background=

`conic-gradient(
blue ${p*3.6}deg,
#ddd 0deg
)`;



if(p>=100){


clearInterval(drinkTimer);



drinkBlending=false;

drink=true;



icon.classList.remove("blending");


icon.innerHTML="🥤";


playSound("blendSound");


document.getElementById("drinkWarning")
.innerHTML=
"✅ พร้อม";



}


},500);


}








// ======================
// ทิ้ง
// ======================


function throwMeat(){


clearInterval(meatTimer);

clearInterval(meatBurnTimer);


meat=false;

meatCooking=false;


resetCircle("meatProgress");


}


function throwFries(){


clearInterval(friesTimer);

clearInterval(friesBurnTimer);


fries=false;

friesCooking=false;


resetCircle("friesProgress");


}



function throwDrink(){


clearInterval(drinkTimer);


drink=false;

drinkBlending=false;


resetCircle("drinkProgress");


}









// ======================
// ประกอบ
// ======================


function makeBurger(){


if(!meat){

alert("ต้องมีเนื้อก่อน");

return;

}



if(assembling || burger)return;


assembling=true;


let progress=0;



let bar=
document.getElementById("assembleProgress");


let text=
document.getElementById("assembleText");



let steps=[

"🍞 ขนมปัง",

"🥬 ผัก",

"🍖 ใส่เนื้อ",

"🧀 ใส่ชีส",

"🥫 ใส่ซอส",

"🍔 เสร็จ"

];



let step=0;



let timer=setInterval(()=>{


progress+=20;


bar.style.width=
progress+"%";


text.innerHTML=
steps[step];


step++;



if(progress>=100){


clearInterval(timer);


burger=true;

assembling=false;


text.innerHTML=
"✅ เบอร์เกอร์พร้อมเสิร์ฟ";


document.getElementById("burger")
.innerHTML="🍔";


}


},500);


}








// ======================
// เสิร์ฟ
// ======================


function serve(){


if(!gameStarted)return;


let correct=true;



if(order.meat && !burger)
correct=false;


if(order.fries && !fries)
correct=false;


if(order.drink && !drink)
correct=false;




if(correct){


playSound("successSound");


money+=50;

score+=100;


servedCustomer++;


document.getElementById("served")
.innerHTML=servedCustomer;



document.getElementById("message")
.innerHTML=
"🎉 ส่งสำเร็จ";



resetFood();



if(servedCustomer>=levelCustomers[level-1]){


levelComplete();


}
else{


newCustomer();


}


}

else{


playSound("failSound");


document.getElementById("message")
.innerHTML=
"❌ อาหารไม่ครบ";


}



document.getElementById("money")
.innerHTML=money;


document.getElementById("score")
.innerHTML=score;



}









// ======================
// ด่าน
// ======================


function levelComplete(){


gameStarted=false;


playSound("levelSound");



document.getElementById("popupText")
.innerHTML=

"👥 ลูกค้า "
+levelCustomers[level-1]
+" คน<br><br>"+
"💰 เงิน "
+money+
"<br>"+
"⭐ คะแนน "
+score;



document.getElementById("levelPopup")
.style.display="flex";


}




function nextLevel(){


level++;


servedCustomer=0;


if(level>20){

alert("🏆 จบเกม!");

return;

}



document.getElementById("level")
.innerHTML=level;



document.getElementById("served")
.innerHTML=0;


document.getElementById("levelPopup")
.style.display="none";


gameStarted=true;


newCustomer();


}








// ======================
// Reset
// ======================


function resetFood(){


clearInterval(meatBurnTimer);

clearInterval(friesBurnTimer);

clearInterval(meatTimer);

clearInterval(friesTimer);

clearInterval(drinkTimer);



meat=false;

fries=false;

drink=false;

burger=false;


meatCooking=false;

friesCooking=false;

drinkBlending=false;



document.getElementById("meat")
.innerHTML="🥩";


document.getElementById("fries")
.innerHTML="🥔";


document.getElementById("drink")
.innerHTML="🍓";


document.getElementById("burger")
.innerHTML="🍞";



resetCircle("meatProgress");

resetCircle("friesProgress");

resetCircle("drinkProgress");


}




function resetCircle(id){


let c=document.getElementById(id);


c.innerHTML="0%";


c.parentElement.style.background=
"conic-gradient(#ddd 0deg,#ddd 360deg)";


}