// =================================
// Burger Rush v9.2 Stable
// =================================


let level = 1;

let money = 0;

let score = 0;


let selectedCustomer = -1;



let stock={

meat:0,

fries:0,

drink:0,

burger:0

};



let mission={

serve:0,

burger:0,

fries:0,

drink:0

};



let customers=[];



let timers={

meat:null,

fries:null,

drink:null

};





let levels=[


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







let menu=[


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








// =====================
// START
// =====================


function startGame(){


document.getElementById("startScreen").style.display="none";


document.getElementById("game").style.display="block";


loadLevel();


}








// =====================
// LEVEL
// =====================


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








function createCustomers(){



let amount=levels[level-1].customers;



for(let i=0;i<amount;i++){



let food=
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









// =====================
// CUSTOMER
// =====================


function renderCustomers(){


let box=document.getElementById("customers");


box.innerHTML="";



customers.forEach(c=>{


if(c.done)return;



let div=document.createElement("div");


div.className="customer";



if(c.id===selectedCustomer)

div.classList.add("selected");



div.innerHTML=

`

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


document.getElementById("selected")
.innerHTML=
"เลือก ลูกค้า "+(c.id+1);


renderCustomers();


};



box.appendChild(div);



});



}








// =====================
// COOK
// =====================


function cookMeat(){

cook(
"meat",
"meatTimer",
"meatStatus",
()=>{

stock.meat++;

}

);

}



function cookFries(){

cook(
"fries",
"friesTimer",
"friesStatus",
()=>{

stock.fries++;

}

);


}



function makeDrink(){


cook(
"drink",
"drinkTimer",
"drinkStatus",
()=>{

stock.drink++;

}

);


}







function cook(type,id,status,done){



if(timers[type])return;



let percent=0;



let box=document.getElementById(id);


let time=15;



timers[type]=setInterval(()=>{


percent+=10;


box.innerHTML=percent+"%";



if(percent>=80){

box.parentElement.classList.add("warning");


}



if(percent>=100){


clearInterval(timers[type]);


timers[type]=null;


box.innerHTML="พร้อม";


box.parentElement.classList.remove("warning");



done();


updateUI();


}



},time*10);



}








// =====================
// BURGER
// =====================


function makeBurger(){



if(stock.meat<=0){


message("ต้องมีเนื้อก่อน");


return;

}



stock.meat--;

stock.burger++;


mission.burger++;



message("🍔 ทำเบอร์เกอร์แล้ว");


updateUI();


}








// =====================
// THROW
// =====================


function throwMeat(){

stock.meat=0;

updateUI();

}


function throwFries(){

stock.fries=0;

updateUI();

}


function throwDrink(){

stock.drink=0;

updateUI();

}








// =====================
// SERVE
// =====================


function serveCustomer(){


if(selectedCustomer<0){

message("เลือกลูกค้าก่อน");

return;

}



let c=customers[selectedCustomer];


if(c.done)return;



let o=c.order;



if(o.meat && stock.burger<=0){

message("ไม่มีเบอร์เกอร์");

return;

}


if(o.fries && stock.fries<=0){

message("ไม่มีเฟรน");

return;

}



if(o.drink && stock.drink<=0){

message("ไม่มีน้ำ");

return;

}





if(o.meat)

stock.burger--;



if(o.fries){

stock.fries--;

mission.fries++;

}



if(o.drink){

stock.drink--;

mission.drink++;

}





c.done=true;



mission.serve++;


money+=50;

score+=100;



selectedCustomer=-1;



message("✅ เสิร์ฟสำเร็จ");


updateUI();



checkLevel();



}









// =====================
// LEVEL CHECK
// =====================


function checkLevel(){



let goal=levels[level-1].goal;



for(let x in goal){


if((mission[x]||0)<goal[x])

return;


}



showPopup();


}








function showPopup(){


document.getElementById("popupTitle")
.innerHTML=
"🎉 ผ่านด่าน "+level;



document.getElementById("popupText")
.innerHTML=
"เงิน +500";


money+=500;


document.getElementById("popup")
.style.display="flex";


}






function closePopup(){



document.getElementById("popup")
.style.display="none";


level++;


if(level>10){


alert("🏆 จบเกม");


return;


}



loadLevel();


}








// =====================
// HEART
// =====================


setInterval(()=>{


customers.forEach(c=>{


if(c.done)return;


c.heart--;



if(c.heart<=0){


c.done=true;


}


});


renderCustomers();


},8000);







// =====================
// UI
// =====================


function updateUI(){



document.getElementById("level").innerHTML=level;


document.getElementById("money").innerHTML=money;


document.getElementById("score").innerHTML=score;




document.getElementById("meatStock")
.innerHTML=stock.meat;


document.getElementById("friesStock")
.innerHTML=stock.fries;


document.getElementById("drinkStock")
.innerHTML=stock.drink;


document.getElementById("burgerStock")
.innerHTML=stock.burger;



let goal=levels[level-1].goal;


let text="";


for(let x in goal){


text+=x+" : "+
(mission[x]||0)+
"/"+
goal[x]
+"<br>";

}


document.getElementById("missionText")
.innerHTML=text;



renderCustomers();


}







function message(t){


document.getElementById("message")
.innerHTML=t;



setTimeout(()=>{


document.getElementById("message")
.innerHTML="";


},1500);


}
