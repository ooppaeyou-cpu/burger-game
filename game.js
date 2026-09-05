// =====================================
// Burger Rush v8.3
// Stock System
// =====================================


// ---------- ตัวแปรเกม ----------

let level = 1;

let money = 0;
let score = 0;

let selectedCustomer = null;


// ---------- สต็อกอาหาร ----------

let stock = {

    meat:0,
    fries:0,
    drink:0,
    burger:0

};



// ---------- ภารกิจ ----------

let mission = {

    serve:0,
    burger:0,
    fries:0,
    drink:0

};




// ---------- ด่าน ----------

let levels=[


{
customers:2,
mission:{
serve:3,
burger:1
}
},


{
customers:2,
mission:{
serve:4,
burger:2,
fries:1
}
},


{
customers:2,
mission:{
serve:5,
burger:2,
drink:1
}
},


{
customers:2,
mission:{
serve:6,
burger:3,
fries:2
}
},


{
customers:3,
mission:{
serve:7,
burger:3,
fries:2,
drink:2
}
},


{
customers:3,
mission:{
serve:8,
burger:4,
drink:3
}
},


{
customers:3,
mission:{
serve:10,
burger:5,
fries:4
}
},


{
customers:3,
mission:{
serve:10,
burger:6,
drink:4
}
},


{
customers:3,
mission:{
serve:12,
burger:7,
fries:6
}
},


{
customers:4,
mission:{
serve:15,
burger:8,
fries:6,
drink:5
}
}


];





// ---------- ลูกค้า ----------


let customers=[];



let menu=[


{
icon:"🍔",
name:"เบอร์เกอร์",
meat:1,
fries:0,
drink:0
},


{
icon:"🍟",
name:"เฟรน",
meat:0,
fries:1,
drink:0
},


{
icon:"🥤",
name:"น้ำปั่น",
meat:0,
fries:0,
drink:1
},


{
icon:"🍔🍟",
name:"ชุดเบอร์เกอร์",
meat:1,
fries:1,
drink:0
},


{
icon:"🍔🍟🥤",
name:"ชุดใหญ่",
meat:1,
fries:1,
drink:1
}


];







// =====================================
// เริ่มเกม
// =====================================


function startGame(){


document.getElementById("startScreen")
.style.display="none";



let bgm=document.getElementById("bgm");

if(bgm){

bgm.play().catch(()=>{});

}



loadLevel();


}








// =====================================
// โหลดด่าน
// =====================================


function loadLevel(){


customers=[];

selectedCustomer=null;



mission={

serve:0,
burger:0,
fries:0,
drink:0

};



createCustomers();


updateStockUI();

updateMission();

renderCustomers();



document.getElementById("level")
.innerHTML=level;


}








// =====================================
// สร้างลูกค้า
// =====================================


function createCustomers(){


let amount =
levels[level-1].customers;



for(let i=0;i<amount;i++){


let order =
menu[
Math.floor(Math.random()*menu.length)
];



customers.push({


id:i,

heart:8,

order:order,

done:false


});



}



startHeartTimer();


}








// =====================================
// แสดงลูกค้า
// =====================================


function renderCustomers(){


let box =
document.getElementById("customers");

box.innerHTML="";



customers.forEach(c=>{


if(c.done)return;



let div=document.createElement("div");


div.className="customer";



if(selectedCustomer===c.id)

div.classList.add("selected");



let hearts="";


for(let i=0;i<c.heart;i++)

hearts+="❤️";


for(let i=c.heart;i<8;i++)

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

${c.order.icon}

<br>

${c.order.name}

</div>

`;



div.onclick=function(){


selectedCustomer=c.id;


document.getElementById("selectedCustomer")
.innerHTML=

"เลือกลูกค้า "+(c.id+1);



renderCustomers();


};



box.appendChild(div);



});
// =====================================
// ระบบสต็อก UI
// =====================================


function updateStockUI(){


let box=document.getElementById("stockBox");


if(!box)return;


box.innerHTML=

`
🍖 เนื้อ x${stock.meat}

<br>

🍟 เฟรน x${stock.fries}

<br>

🥤 น้ำ x${stock.drink}

<br>

🍔 เบอร์เกอร์ x${stock.burger}

`;

}





// =====================================
// ทอดเนื้อ
// =====================================


let meatCooking=false;


function cookMeat(){


if(meatCooking)return;


meatCooking=true;


let percent=0;


let circle=
document.getElementById("meatProgress");



let timer=setInterval(()=>{


percent+=5;



circle.innerHTML=
percent+"%";



circle.parentElement.style.background=

`conic-gradient(
#e67e22 ${percent*3.6}deg,
#ddd 0deg)`;



if(percent>=100){


clearInterval(timer);


stock.meat++;


mission.food++;



meatCooking=false;



circle.innerHTML="พร้อม";


document.getElementById("meatStatus")
.innerHTML=
"🍖 พร้อมใช้";



updateStockUI();


}



},300);



}








// =====================================
// ทอดเฟรน
// =====================================


let friesCooking=false;


function cookFries(){


if(friesCooking)return;


friesCooking=true;


let percent=0;



let circle=
document.getElementById("friesProgress");



let timer=setInterval(()=>{


percent+=5;



circle.innerHTML=
percent+"%";



circle.parentElement.style.background=

`conic-gradient(
gold ${percent*3.6}deg,
#ddd 0deg)`;





if(percent>=100){


clearInterval(timer);



stock.fries++;


mission.food++;



friesCooking=false;



circle.innerHTML="พร้อม";


document.getElementById("friesStatus")
.innerHTML=
"🍟 พร้อมใช้";



updateStockUI();



}



},300);



}









// =====================================
// ปั่นน้ำ
// =====================================


let drinkMaking=false;


function blendDrink(){


if(drinkMaking)return;


drinkMaking=true;


let percent=0;


let circle=
document.getElementById("drinkProgress");



let timer=setInterval(()=>{


percent+=10;



circle.innerHTML=
percent+"%";



circle.parentElement.style.background=

`conic-gradient(
#3498db ${percent*3.6}deg,
#ddd 0deg)`;




if(percent>=100){


clearInterval(timer);



stock.drink++;


mission.food++;



drinkMaking=false;



circle.innerHTML="พร้อม";


document.getElementById("drinkStatus")
.innerHTML=
"🥤 พร้อมใช้";



updateStockUI();



}



},400);



}









// =====================================
// ประกอบเบอร์เกอร์
// =====================================


let assembling=false;


function makeBurger(){



if(assembling)return;



if(stock.meat<=0){


document.getElementById("message")
.innerHTML=
"❌ ต้องมีเนื้อก่อน";


return;


}




assembling=true;


let percent=0;


let bar=
document.getElementById("assembleProgress");


let text=
document.getElementById("assembleText");



let timer=setInterval(()=>{


percent+=20;



bar.style.width=
percent+"%";



text.innerHTML=
"กำลังประกอบ "+percent+"%";



if(percent>=100){


clearInterval(timer);



stock.meat--;


stock.burger++;


mission.burger++;



assembling=false;



text.innerHTML=
"🍔 เบอร์เกอร์พร้อม";



updateStockUI();



}



},400);



}









// =====================================
// ทิ้งอาหาร
// =====================================


function throwMeat(){


stock.meat=0;

updateStockUI();


document.getElementById("meatStatus")
.innerHTML=
"ทิ้งแล้ว";


}



function throwFries(){


stock.fries=0;

updateStockUI();


document.getElementById("friesStatus")
.innerHTML=
"ทิ้งแล้ว";


}



function throwDrink(){


stock.drink=0;

updateStockUI();


document.getElementById("drinkStatus")
.innerHTML=
"ทิ้งแล้ว";


}








// =====================================
// หัวใจลูกค้า
// =====================================


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



},8000);



}
  // =====================================
// เสิร์ฟลูกค้า
// =====================================


function serveCustomer(){


if(selectedCustomer===null){


document.getElementById("message")
.innerHTML=
"❗ เลือกลูกค้าก่อน";


return;


}



let customer =
customers[selectedCustomer];



if(customer.done){

return;

}



let order =
customer.order;



// เช็กของ


if(order.meat > stock.meat){

showMessage("❌ เนื้อไม่พอ");

return;

}


if(order.fries > stock.fries){

showMessage("❌ เฟรนไม่พอ");

return;

}


if(order.drink > stock.drink){

showMessage("❌ น้ำไม่พอ");

return;

}





// หักของ


stock.meat -= order.meat;

stock.fries -= order.fries;

stock.drink -= order.drink;



if(order.meat){

stock.burger--;

}



// กันค่าติดลบ

if(stock.burger<0)

stock.burger=0;






// ลูกค้าสำเร็จ


customer.done=true;



mission.serve++;



score+=100;

money+=50;



document.getElementById("money")
.innerHTML=money;


document.getElementById("score")
.innerHTML=score;


document.getElementById("served")
.innerHTML=
mission.serve;



updateStockUI();


updateMission();


renderCustomers();



showMessage(
"😊 ลูกค้าพอใจ +50"
);



selectedCustomer=null;



checkLevel();



}








// =====================================
// ข้อความ
// =====================================


function showMessage(text){


let box=
document.getElementById("message");


box.innerHTML=text;



setTimeout(()=>{


box.innerHTML="";


},2000);


}









// =====================================
// ภารกิจ
// =====================================


function updateMission(){


let target =
levels[level-1].mission;


let text="";



for(let key in target){


text+=

key+
" : "+
(mission[key]||0)
+
"/"+
target[key]
+
"<br>";



}



let box=
document.getElementById("missionText");


if(box)

box.innerHTML=text;



}









// =====================================
// ตรวจผ่านด่าน
// =====================================


function checkLevel(){



let target =
levels[level-1].mission;



for(let key in target){



if((mission[key]||0)<target[key]){


return;


}


}



levelComplete();



}








// =====================================
// ผ่านด่าน
// =====================================


function levelComplete(){


money+=500;

score+=1000;



document.getElementById("popupText")
.innerHTML=

`
🎉 ผ่านด่าน ${level}

<br><br>

💰 เงิน +500

<br>

⭐ คะแนน +1000

<br><br>

เตรียมพร้อมด่านต่อไป

`;



document.getElementById("levelPopup")
.style.display="flex";



}








// =====================================
// ไปด่านต่อไป
// =====================================


function nextLevel(){



document.getElementById("levelPopup")
.style.display="none";



level++;



if(level>10){


document.getElementById("popupText")
.innerHTML=

`
🏆 จบเกมแล้ว!

<br>

คุณคือ Master Burger Chef 🍔

<br>

เงินทั้งหมด:
${money}

<br>

คะแนน:
${score}

`;



document.getElementById("levelPopup")
.style.display="flex";


return;


}



loadLevel();



}








// =====================================
// Reset เกม
// =====================================


function resetGame(){



level=1;

money=0;

score=0;



stock={

meat:0,
fries:0,
drink:0,
burger:0

};



mission={

serve:0,
burger:0,
fries:0,
drink:0

};



loadLevel();



}


}
