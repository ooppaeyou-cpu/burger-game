// ======================================
// Burger Rush v9.2.1 Final Clean
// ======================================


let level = 1;
let money = 0;
let score = 0;

let selectedCustomer = -1;


let stock = {

    meat:0,
    fries:0,
    drink:0,
    burger:0

};


let mission = {

    serve:0,
    burger:0,
    fries:0,
    drink:0

};



let customers=[];



let cooking = {

    meat:false,
    fries:false,
    drink:false

};



let cookTimer = {

    meat:null,
    fries:null,
    drink:null

};






// ==========================
// LEVEL
// ==========================


const levels=[


{
customers:2,
goal:{
serve:2,
burger:1
}
},


{
customers:3,
goal:{
serve:3,
burger:2
}
},


{
customers:3,
goal:{
serve:3,
burger:2,
fries:1
}
},


{
customers:4,
goal:{
serve:4,
burger:3,
drink:1
}
},


{
customers:4,
goal:{
serve:4,
burger:3,
fries:2
}
},


{
customers:5,
goal:{
serve:5,
burger:4,
drink:2
}
},


{
customers:5,
goal:{
serve:5,
burger:5,
fries:3
}
},


{
customers:5,
goal:{
serve:5,
burger:5,
drink:3
}
},


{
customers:5,
goal:{
serve:5,
burger:6,
fries:4
}
},


{
customers:5,
goal:{
serve:5,
burger:6,
fries:5,
drink:5
}
}


];






// ==========================
// MENU
// ==========================


const menu=[


{
name:"เบอร์เกอร์",
icon:"🍔",
meat:true
},


{
name:"เฟรนฟราย",
icon:"🍟",
fries:true
},


{
name:"น้ำปั่น",
icon:"🥤",
drink:true
},


{
name:"ชุดใหญ่",
icon:"🍔🍟🥤",
meat:true,
fries:true,
drink:true
}


];









// ==========================
// START
// ==========================


function startGame(){


let start=document.getElementById("startScreen");

let game=document.getElementById("game");


if(start)
start.style.display="none";


if(game)
game.style.display="block";



loadLevel();


}








// ==========================
// LOAD LEVEL
// ==========================


function loadLevel(){


customers=[];

selectedCustomer=-1;



mission={

serve:0,
burger:0,
fries:0,
drink:0

};



stock={

meat:0,
fries:0,
drink:0,
burger:0

};



createCustomers();


updateUI();


}









// ==========================
// CREATE CUSTOMER
// ==========================


function createCustomers(){



let amount =
levels[level-1].customers;



for(let i=0;i<amount;i++){



let food =
menu[Math.floor(Math.random()*menu.length)];



customers.push({

id:i,

heart:10,

order:food,

done:false

});


}



renderCustomers();


}









// ==========================
// SHOW CUSTOMER
// ==========================


function renderCustomers(){


let box=document.getElementById("customers");


if(!box)return;



box.innerHTML="";



customers.forEach(c=>{


if(c.done)return;



let div=document.createElement("div");


div.className="customer";



if(c.id===selectedCustomer)

div.classList.add("selected");




div.innerHTML=`

<div class="customerFace">
👤
</div>

<div class="heart">
${"❤️".repeat(c.heart)}
</div>


<div class="order">

${c.order.icon}

<br>

${c.order.name}

</div>

`;




div.onclick=function(){


selectedCustomer=c.id;


let select=
document.getElementById("selected");


if(select)

select.innerHTML=
"เลือกลูกค้า "+(c.id+1);



renderCustomers();


};



box.appendChild(div);


});
// ==========================
// COOK SYSTEM
// ==========================


function cookMeat(){

startCook(
"meat",
"meatTimer",
"meatStatus"
);

}



function cookFries(){

startCook(
"fries",
"friesTimer",
"friesStatus"
);

}



function makeDrink(){

startCook(
"drink",
"drinkTimer",
"drinkStatus"
);

}







function startCook(type,timerID,statusID){



if(cooking[type]){

message("กำลังทำอยู่");

return;

}



cooking[type]=true;



let percent=0;



let timerBox=
document.getElementById(timerID);



let status=
document.getElementById(statusID);



if(status)

status.innerHTML="กำลังทำ...";



cookTimer[type]=setInterval(()=>{



percent+=5;



if(timerBox)

timerBox.innerHTML=
percent+"%";




if(percent>=80 && percent<100){


if(timerBox)

timerBox.parentElement.classList.add("warning");


}




// พร้อม


if(percent>=100){



clearInterval(cookTimer[type]);

cookTimer[type]=null;



cooking[type]=false;



if(timerBox){

timerBox.innerHTML="พร้อม";

timerBox.parentElement.classList.remove("warning");

}



if(status)

status.innerHTML="พร้อมใช้งาน";



stock[type]++;



updateUI();



return;


}



},200);



}









// ==========================
// MAKE BURGER
// ==========================


function makeBurger(){



if(stock.meat<=0){


message("❌ ต้องมีเนื้อก่อน");


return;


}



stock.meat--;

stock.burger++;


mission.burger++;



let box=document.getElementById("burgerStatus");


if(box)

box.innerHTML=
"🍔 เบอร์เกอร์พร้อมเสิร์ฟ";



message("ประกอบเบอร์เกอร์แล้ว");


updateUI();


}









// ==========================
// THROW
// ==========================


function throwMeat(){


stock.meat=0;


message("ทิ้งเนื้อแล้ว");


updateUI();


}



function throwFries(){


stock.fries=0;


message("ทิ้งเฟรนแล้ว");


updateUI();


}



function throwDrink(){


stock.drink=0;


message("ทิ้งน้ำแล้ว");


updateUI();


}









// ==========================
// SERVE
// ==========================


function serveCustomer(){



if(selectedCustomer<0){


message("เลือกลูกค้าก่อน");


return;


}



let customer =
customers[selectedCustomer];



if(!customer || customer.done)

return;



let order =
customer.order;





// ตรวจของ


if(order.meat && stock.burger<=0){

message("ไม่มีเบอร์เกอร์");

return;

}



if(order.fries && stock.fries<=0){

message("ไม่มีเฟรน");

return;

}



if(order.drink && stock.drink<=0){

message("ไม่มีน้ำ");

return;

}






// หักของ


if(order.meat){

stock.burger--;

}



if(order.fries){

stock.fries--;

mission.fries++;

}



if(order.drink){

stock.drink--;

mission.drink++;

}





customer.done=true;


mission.serve++;



money+=50;

score+=100;



selectedCustomer=-1;



message("✅ เสิร์ฟสำเร็จ");



updateUI();



checkLevel();



}









// ==========================
// CHECK LEVEL
// ==========================


function checkLevel(){


let goal =
levels[level-1].goal;



for(let key in goal){


if((mission[key]||0)<goal[key]){


return;


}


}



openPopup();


}








function openPopup(){



let title=
document.getElementById("popupTitle");

let text=
document.getElementById("popupText");

let popup=
document.getElementById("popup");



money+=500;



if(title)

title.innerHTML=
"🎉 ผ่านด่าน "+level;



if(text)

text.innerHTML=
"💰 โบนัส +500";


if(popup)

popup.style.display="flex";


}








function closePopup(){



let popup=
document.getElementById("popup");


if(popup)

popup.style.display="none";



level++;



if(level>10){


if(popup){

popup.style.display="flex";

document.getElementById("popupTitle")
.innerHTML="🏆 จบเกม";

document.getElementById("popupText")
.innerHTML=
"คะแนน "+score;

}


return;


}



loadLevel();


}









// ==========================
// HEART SYSTEM
// ==========================


setInterval(()=>{


customers.forEach(c=>{


if(c.done)return;


c.heart--;



if(c.heart<=0){


c.done=true;


message("ลูกค้าออกจากร้าน");


}


});



renderCustomers();



},8000);









// ==========================
// UPDATE UI
// ==========================


function updateUI(){



let ids={


level:level,

money:money,

score:score,

meatStock:stock.meat,

friesStock:stock.fries,

drinkStock:stock.drink,

burgerStock:stock.burger


};



for(let id in ids){


let el=document.getElementById(id);


if(el)

el.innerHTML=ids[id];


}





let missionBox=
document.getElementById("missionText");



if(missionBox){



let text="";


let goal=
levels[level-1].goal;



for(let key in goal){


text+=
key+
" : "+
(mission[key]||0)+
"/"+
goal[key]
+
"<br>";



}



missionBox.innerHTML=text;



}



renderCustomers();


}









// ==========================
// MESSAGE
// ==========================


function message(text){


let box=
document.getElementById("message");


if(!box)return;



box.innerHTML=text;



setTimeout(()=>{


box.innerHTML="";


},1500);



}






// TEST LOAD
console.log("Burger Rush v9.2.1 Loaded");


}
