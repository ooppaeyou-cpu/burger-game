let level = 1;

let money = 0;
let score = 0;

let served = 0;


let selectedCustomer = null;


// ==========================
// ด่าน
// ==========================

let levels = [

{
customers:2,
mission:{
serve:3,
burger:2,
fries:1
}
},


{
customers:2,
mission:{
serve:4,
burger:3,
fries:2,
drink:1
}
},


{
customers:3,
mission:{
serve:5,
burger:4,
drink:3
}
},


{
customers:3,
mission:{
serve:6,
fries:5,
perfect:2
}
},


{
customers:3,
mission:{
serve:8,
burger:5,
drink:5
}
},


{
customers:4,
mission:{
serve:9,
fries:8,
perfect:5
}
},


{
customers:4,
mission:{
serve:10,
burger:8,
drink:8
}
},


{
customers:5,
mission:{
serve:12,
food:30,
perfect:8
}
},


{
customers:5,
mission:{
serve:13,
burger:12,
fries:12
}
},


{
customers:5,
mission:{
serve:15,
burger:15,
fries:15,
drink:10,
perfect:10
}
}

];







// ==========================
// ลูกค้า
// ==========================


let customers=[];



let menu=[

{
name:"🍔",
text:"เบอร์เกอร์",
meat:true,
fries:false,
drink:false
},

{
name:"🍟",
text:"เฟรน",
meat:false,
fries:true,
drink:false
},

{
name:"🥤",
text:"น้ำ",
meat:false,
fries:false,
drink:true
},

{
name:"🍔🍟",
text:"ชุดเบอร์เกอร์",
meat:true,
fries:true,
drink:false
},

{
name:"🍔🍟🥤",
text:"ชุดใหญ่",
meat:true,
fries:true,
drink:true
}

];







// ==========================
// อาหาร
// ==========================


let meat=false;
let fries=false;
let drink=false;
let burger=false;


let meatTimer;
let friesTimer;
let drinkTimer;

let assembling=false;







// ภารกิจ


let mission={

serve:0,
burger:0,
fries:0,
drink:0,
perfect:0,
food:0

};








function startGame(){


document.getElementById("startScreen")
.style.display="none";


document.getElementById("bgm")
.play()
.catch(()=>{});



loadLevel();


}








// ==========================
// โหลดด่าน
// ==========================


function loadLevel(){


customers=[];


selectedCustomer=null;


served=0;


createCustomers();


updateMission();


renderCustomers();


document.getElementById("level")
.innerHTML=level;


}









// ==========================
// สร้างลูกค้า
// ==========================


function createCustomers(){


let amount=
levels[level-1].customers;



for(let i=0;i<amount;i++){


let order=
menu[Math.floor(Math.random()*menu.length)];



customers.push({

id:i,

heart:5,

order:order,

done:false

});


}


startHeartTimer();


}









function renderCustomers(){


let box=
document.getElementById("customers");

box.innerHTML="";



customers.forEach(c=>{


if(c.done)return;



let div=document.createElement("div");


div.className="customer";



if(selectedCustomer==c.id)

div.classList.add("selected");



let hearts="";

for(let i=0;i<c.heart;i++)
hearts+="❤️";

for(let i=c.heart;i<5;i++)
hearts+="🤍";



div.innerHTML=

`
<div class="customerFace">
👤
</div>

<div class="heart">
${hearts}
</div>

<div class="order">

${c.order.name}
<br>
${c.order.text}

</div>

`;



div.onclick=()=>{

selectedCustomer=c.id;

renderCustomers();


document.getElementById("selectedCustomer")
.innerHTML=
"เลือกลูกค้า "+(c.id+1);

};


box.appendChild(div);



});


}









// ==========================
// หัวใจ
// ==========================


function startHeartTimer(){


setInterval(()=>{


customers.forEach(c=>{


if(c.done)return;


c.heart--;



if(c.heart<=0){


c.done=true;


document.getElementById("message")
.innerHTML=
"😡 ลูกค้าออกจากร้าน";


}


});


renderCustomers();



},5000);


}








// ==========================
// ภารกิจ
// ==========================


function updateMission(){


let text="";


let m=levels[level-1].mission;


for(let x in m){


text+=
x+
": "+
(mission[x]||0)+
"/"+
m[x]+
"<br>";


}


document.getElementById("missionText")
.innerHTML=text;


}









// ==========================
// ทำอาหาร
// ==========================


function cookMeat(){


if(meat)return;


let p=0;


let circle=
document.getElementById("meatProgress");



meatTimer=setInterval(()=>{


p+=5;


circle.innerHTML=p+"%";


if(p>=100){


clearInterval(meatTimer);


meat=true;


circle.innerHTML="🍖";


document.getElementById("meatStatus")
.innerHTML="พร้อม";


}


},300);


}







function cookFries(){


if(fries)return;


let p=0;


let circle=
document.getElementById("friesProgress");


friesTimer=setInterval(()=>{


p+=5;


circle.innerHTML=p+"%";


circle.parentElement.style.background=

`conic-gradient(
orange ${p*3.6}deg,
#ddd 0deg)`;


if(p>=100){


clearInterval(friesTimer);


fries=true;


circle.innerHTML="🍟";


document.getElementById("friesStatus")
.innerHTML="พร้อม";


}


},300);


}







function blendDrink(){


if(drink)return;


let p=0;


let circle=
document.getElementById("drinkProgress");


drinkTimer=setInterval(()=>{


p+=10;


circle.innerHTML=p+"%";


circle.parentElement.style.background=

`conic-gradient(
blue ${p*3.6}deg,
#ddd 0deg)`;


if(p>=100){


clearInterval(drinkTimer);


drink=true;


circle.innerHTML="🥤";


document.getElementById("drinkStatus")
.innerHTML="พร้อม";


}


},400);


}







// ==========================
// ประกอบ
// ==========================


function makeBurger(){


if(!meat || assembling)return;


assembling=true;


let p=0;


let bar=
document.getElementById("assembleProgress");


let text=
document.getElementById("assembleText");



let timer=setInterval(()=>{


p+=20;


bar.style.width=p+"%";


text.innerHTML=
"กำลังประกอบ "+p+"%";


if(p>=100){


clearInterval(timer);


burger=true;


assembling=false;


text.innerHTML=
"🍔 เบอร์เกอร์พร้อม";


}


},400);


}









// ==========================
// เสิร์ฟ
// ==========================


function serveCustomer(){


if(selectedCustomer===null){

alert("เลือกลูกค้าก่อน");

return;

}



let c=
customers[selectedCustomer];


let ok=true;


if(c.order.meat&&!burger)
ok=false;


if(c.order.fries&&!fries)
ok=false;


if(c.order.drink&&!drink)
ok=false;



if(!ok){


document.getElementById("message")
.innerHTML=
"❌ ของยังไม่ครบ";


return;

}



c.done=true;



money+=50;

score+=100;


served++;


mission.serve++;


if(burger)mission.burger++;

if(fries)mission.fries++;

if(drink)mission.drink++;



document.getElementById("served")
.innerHTML=served;


document.getElementById("money")
.innerHTML=money;


document.getElementById("score")
.innerHTML=score;



resetFood();



renderCustomers();


updateMission();



checkLevel();


}








function checkLevel(){


let target=
levels[level-1].mission;


for(let x in target){


if((mission[x]||0)<target[x])

return;


}


showComplete();


}





function showComplete(){


document.getElementById("popupText")
.innerHTML=

`
ด่าน ${level} ผ่านแล้ว 🎉
<br>
เงิน +500
<br>
คะแนน +1000
`;



money+=500;

score+=1000;


document.getElementById("levelPopup")
.style.display="flex";


}







function nextLevel(){


level++;


document.getElementById("levelPopup")
.style.display="none";


if(level>10){


alert("🏆 คุณเป็น Master Burger Chef!");

return;

}


loadLevel();


}









function resetFood(){


meat=false;

fries=false;

drink=false;

burger=false;


document.getElementById("meatProgress").innerHTML="0%";

document.getElementById("friesProgress").innerHTML="0%";

document.getElementById("drinkProgress").innerHTML="0%";


document.getElementById("burger")
.innerHTML="🍞";


document.getElementById("assembleProgress")
.style.width="0%";


}
