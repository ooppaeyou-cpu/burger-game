// =================================
// Burger Rush v9.0
// Clean Version
// =================================


let level = 1;

let money = 0;

let score = 0;



let selectedCustomer = null;



let stock={

meat:0,

fries:0,

drink:0,

burger:0

};





let customers=[];



let mission={

serve:0,

burger:0,

fries:0,

drink:0

};





let cooking={

meat:false,

fries:false,

drink:false

};








// ================================
// ด่าน
// ================================


let levels=[


{
customers:2,
goal:{
serve:3,
burger:1
}
},


{
customers:2,
goal:{
serve:4,
burger:2,
fries:1
}
},


{
customers:2,
goal:{
serve:5,
burger:2,
drink:1
}
},


{
customers:3,
goal:{
serve:6,
burger:3,
fries:2
}
},


{
customers:3,
goal:{
serve:7,
burger:4,
drink:2
}
},


{
customers:3,
goal:{
serve:8,
burger:5,
fries:3
}
},


{
customers:3,
goal:{
serve:10,
burger:6
}
},


{
customers:4,
goal:{
serve:10,
burger:6,
drink:4
}
},


{
customers:4,
goal:{
serve:12,
burger:8,
fries:5
}
},


{
customers:4,
goal:{
serve:15,
burger:10,
fries:8,
drink:5
}
}

];







// ================================
// เมนู
// ================================


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









// ================================
// START
// ================================


function startGame(){


document.getElementById("startScreen")
.style.display="none";


document.getElementById("game")
.style.display="block";


loadLevel();


}









// ================================
// โหลดด่าน
// ================================


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


updateAll();


}








// ================================
// สร้างลูกค้า
// ================================


function createCustomers(){


let amount=
levels[level-1].customers;



for(let i=0;i<amount;i++){


let order=
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



setInterval(heartDown,8000);


}









// ================================
// ลูกค้า
// ================================


function renderCustomers(){


let box=
document.getElementById("customers");


box.innerHTML="";



customers.forEach(c=>{


if(c.done)return;



let div=
document.createElement("div");


div.className="customer";



if(selectedCustomer===c.id)

div.classList.add("selected");



let hearts="";


for(let i=0;i<c.heart;i++)

hearts+="❤️";



div.innerHTML=`

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


}








function heartDown(){


customers.forEach(c=>{


if(c.done)return;


c.heart--;


if(c.heart<=0){


c.done=true;


}


});


renderCustomers();


}








// ================================
// ทำอาหาร
// ================================


function cookMeat(){


if(cooking.meat)return;


cooking.meat=true;


runTimer(
"meatTime",
()=>{


stock.meat++;

cooking.meat=false;

updateStock();


}
);


}






function cookFries(){


if(cooking.fries)return;


cooking.fries=true;


runTimer(
"friesTime",
()=>{


stock.fries++;

cooking.fries=false;

updateStock();


}
);


}





function makeDrink(){


if(cooking.drink)return;


cooking.drink=true;


runTimer(
"drinkTime",
()=>{


stock.drink++;

cooking.drink=false;

updateStock();


}
);


}








function runTimer(id,callback){


let p=0;


let box=
document.getElementById(id);



let timer=setInterval(()=>{


p+=10;


box.innerHTML=p+"%";



if(p>=100){


clearInterval(timer);


box.innerHTML="พร้อม";


callback();


}



},300);


}







// ================================
// ประกอบ
// ================================


function makeBurger(){


if(stock.meat<=0){


message("ไม่มีเนื้อ");


return;


}



stock.meat--;

stock.burger++;


mission.burger++;


message("🍔 ได้เบอร์เกอร์");

updateAll();


}








// ================================
// ทิ้ง
// ================================


function throwMeat(){

stock.meat=0;

updateStock();

}



function throwFries(){

stock.fries=0;

updateStock();

}



function throwDrink(){

stock.drink=0;

updateStock();

}









// ================================
// เสิร์ฟ
// ================================


function serveCustomer(){


if(selectedCustomer===null){

message("เลือกลูกค้าก่อน");

return;

}



let c=
customers[selectedCustomer];


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


if(o.fries)

stock.fries--;


if(o.drink)

stock.drink--;




c.done=true;



mission.serve++;


if(o.fries)
mission.fries++;


if(o.drink)
mission.drink++;



money+=50;

score+=100;



selectedCustomer=null;


updateAll();


checkLevel();


}








// ================================
// เช็กด่าน
// ================================


function checkLevel(){


let goal=
levels[level-1].goal;



for(let x in goal){


if((mission[x]||0)<goal[x])

return;


}



document.getElementById("levelPopup")
.style.display="flex";


document.getElementById("popupText")
.innerHTML=
"ผ่านด่าน "+level;


}







function nextLevel(){


document.getElementById("levelPopup")
.style.display="none";


level++;


if(level>10){

alert("🏆 จบเกม!");

return;

}


loadLevel();


}







// ================================
// UI
// ================================


function updateStock(){


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

}



function updateMission(){


let g=
levels[level-1].goal;


let text="";


for(let x in g){

text+=x+
" : "+
(mission[x]||0)+
"/"+
g[x]
+
"<br>";

}


document.getElementById("missionText")
.innerHTML=text;


}



function updateAll(){


document.getElementById("level")
.innerHTML=level;


document.getElementById("money")
.innerHTML=money;


document.getElementById("score")
.innerHTML=score;


document.getElementById("served")
.innerHTML=mission.serve;


updateStock();


updateMission();


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
