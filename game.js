// =====================================
// Burger Rush v9.1 Fixed
// =====================================


let level = 1;

let money = 0;

let score = 0;


let selectedCustomer = null;



// =============================
// STOCK
// =============================

let stock = {

meat:0,
fries:0,
drink:0,
burger:0

};




// =============================
// MISSION
// =============================

let mission={

serve:0,
burger:0,
fries:0,
drink:0

};





// =============================
// LEVEL
// =============================

let levels=[


{
customers:2,
goal:{
serve:2,
burger:1
}
},


{
customers:2,
goal:{
serve:2,
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
customers:3,
goal:{
serve:3,
burger:2,
drink:1
}
},


{
customers:3,
goal:{
serve:3,
burger:3,
fries:2
}
},


{
customers:4,
goal:{
serve:4,
burger:3,
drink:2
}
},


{
customers:4,
goal:{
serve:4,
burger:4,
fries:3
}
},


{
customers:4,
goal:{
serve:4,
burger:4,
drink:3
}
},


{
customers:5,
goal:{
serve:5,
burger:5,
fries:4
}
},


{
customers:5,
goal:{
serve:5,
burger:5,
fries:5,
drink:5
}
}


];








// =============================
// MENU
// =============================


let menu=[


{
name:"เบอร์เกอร์",
icon:"🍔",
meat:true,
fries:false,
drink:false
},


{
name:"เฟรนฟราย",
icon:"🍟",
meat:false,
fries:true,
drink:false
},


{
name:"น้ำปั่น",
icon:"🥤",
meat:false,
fries:false,
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






let customers=[];



let cooking={

meat:false,
fries:false,
drink:false

};







// =============================
// START
// =============================


function startGame(){


document.getElementById("startScreen")
.style.display="none";


document.getElementById("game")
.style.display="block";


loadLevel();


}








// =============================
// LOAD LEVEL
// =============================


function loadLevel(){


customers=[];


selectedCustomer=null;



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









// =============================
// CREATE CUSTOMERS
// =============================


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



renderCustomers();


}








// =============================
// RENDER CUSTOMER
// =============================


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


for(let i=0;i<c.heart;i++){

hearts+="❤️";

}



div.innerHTML=

`
<div class="customerFace">
👤
</div>

<div>
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
// COOK SYSTEM
// =====================================


function cookMeat(){


if(cooking.meat)return;


cooking.meat=true;


timerFood(
"meatTime",
function(){


stock.meat++;

cooking.meat=false;


message("🥩 เนื้อพร้อมแล้ว");


updateUI();


}


);


}






function cookFries(){


if(cooking.fries)return;


cooking.fries=true;


timerFood(
"friesTime",
function(){


stock.fries++;

cooking.fries=false;


message("🍟 เฟรนพร้อมแล้ว");


updateUI();


}


);


}






function makeDrink(){


if(cooking.drink)return;


cooking.drink=true;


timerFood(
"drinkTime",
function(){


stock.drink++;

cooking.drink=false;


message("🥤 น้ำปั่นพร้อมแล้ว");


updateUI();


}


);


}







// =============================
// TIMER
// =============================


function timerFood(id,callback){


let percent=0;


let box=document.getElementById(id);



let timer=setInterval(()=>{


percent+=10;


box.innerHTML=
percent+"%";



if(percent>=100){


clearInterval(timer);


box.innerHTML="พร้อม";


callback();


}



},300);



}








// =============================
// MAKE BURGER
// =============================


function makeBurger(){



if(stock.meat<=0){


message("❌ ไม่มีเนื้อ");


return;


}



stock.meat--;


stock.burger++;


mission.burger++;



message("🍔 ประกอบเบอร์เกอร์สำเร็จ");



updateUI();



}









// =============================
// THROW FOOD
// =============================


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









// =============================
// SERVE
// =============================


function serveCustomer(){



if(selectedCustomer===null){


message("❗ เลือกลูกค้าก่อน");


return;


}



let c =
customers[selectedCustomer];


if(!c || c.done)return;



let order =
c.order;





// เช็กของ



if(order.meat && stock.burger<=0){


message("❌ ไม่มีเบอร์เกอร์");


return;


}



if(order.fries && stock.fries<=0){


message("❌ ไม่มีเฟรน");


return;


}



if(order.drink && stock.drink<=0){


message("❌ ไม่มีน้ำ");


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







c.done=true;



mission.serve++;



money+=50;


score+=100;



message("😊 ลูกค้าพอใจ +50");



selectedCustomer=null;



updateUI();



checkLevel();



}









// =============================
// CHECK LEVEL
// =============================


function checkLevel(){


let goal =
levels[level-1].goal;



for(let item in goal){


if((mission[item]||0)<goal[item]){


return;


}


}





levelComplete();



}









// =============================
// LEVEL COMPLETE
// =============================


function levelComplete(){


money+=500;

score+=500;



document.getElementById("popupText")
.innerHTML=

`

🎉 ผ่านด่าน ${level}

<br><br>

💰 เงิน +500

<br>

⭐ คะแนน +500

`;



document.getElementById("levelPopup")
.style.display="flex";



}








// =============================
// NEXT LEVEL
// =============================


function nextLevel(){


document.getElementById("levelPopup")
.style.display="none";



level++;



if(level>10){



document.getElementById("popupText")
.innerHTML=

`
🏆 จบเกม!

<br><br>

คะแนน:
${score}

<br>

เงิน:
${money}

`;



document.getElementById("levelPopup")
.style.display="flex";



return;


}



loadLevel();



}








// =============================
// HEART SYSTEM
// =============================


setInterval(()=>{


customers.forEach(c=>{


if(c.done)return;


c.heart--;



if(c.heart<=0){


c.done=true;


message("😡 ลูกค้าออกจากร้าน");


}



});



renderCustomers();



},8000);









// =============================
// UPDATE UI
// =============================


function updateUI(){



document.getElementById("level")
.innerHTML=level;



document.getElementById("money")
.innerHTML=money;



document.getElementById("score")
.innerHTML=score;



document.getElementById("served")
.innerHTML=mission.serve;





document.getElementById("stockBox")
.innerHTML=

`

🍖 เนื้อ : ${stock.meat}

<br>

🍟 เฟรน : ${stock.fries}

<br>

🥤 น้ำ : ${stock.drink}

<br>

🍔 เบอร์เกอร์ : ${stock.burger}

`;






let goal=
levels[level-1].goal;


let text="";



for(let x in goal){


text+=

x+
" : "+
(mission[x]||0)+
"/"+
goal[x]
+
"<br>";


}



document.getElementById("missionText")
.innerHTML=text;



renderCustomers();



}







// =============================
// MESSAGE
// =============================


function message(text){


let box=
document.getElementById("message");


box.innerHTML=text;



setTimeout(()=>{


box.innerHTML="";


},2000);



}


}
