// =====================================
// Burger Rush Clean v1.0
// =====================================


// =====================
// DATA
// =====================


let level = 1;

let money = 0;

let score = 0;


let selected = null;


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




let cooking={

    meat:false,
    fries:false,
    drink:false

};



let timers={

    meat:null,
    fries:null,
    drink:null

};





// =====================
// LEVEL
// =====================


const levels=[

{
customers:2,
goal:{serve:2,burger:1}
},

{
customers:3,
goal:{serve:3,burger:2}
},

{
customers:3,
goal:{serve:3,burger:2,fries:1}
},

{
customers:4,
goal:{serve:4,burger:3,drink:1}
},

{
customers:4,
goal:{serve:4,burger:3,fries:2}
},

{
customers:5,
goal:{serve:5,burger:4,drink:2}
},

{
customers:5,
goal:{serve:5,burger:5,fries:3}
},

{
customers:5,
goal:{serve:5,burger:5,drink:3}
},

{
customers:5,
goal:{serve:5,burger:6,fries:4}
},

{
customers:5,
goal:{serve:5,burger:6,fries:5,drink:5}
}

];





const orders=[

{
name:"เบอร์เกอร์",
icon:"🍔",
burger:true
},


{
name:"เฟรน",
icon:"🍟",
fries:true
},


{
name:"น้ำ",
icon:"🥤",
drink:true
},


{
name:"ชุดใหญ่",
icon:"🍔🍟🥤",
burger:true,
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


selected=null;


customers=[];


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



createCustomers();


updateUI();


}








// =====================
// CUSTOMERS
// =====================


function createCustomers(){


let amount=levels[level-1].customers;



for(let i=0;i<amount;i++){


let food=
orders[Math.floor(Math.random()*orders.length)];



customers.push({

id:i,

heart:10,

order:food,

done:false


});


}



renderCustomers();


}







function renderCustomers(){


let box=document.getElementById("customers");


box.innerHTML="";



customers.forEach(c=>{


if(c.done)return;



let div=document.createElement("div");


div.className="customer";



if(selected===c.id){

div.classList.add("selected");

}



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


selected=c.id;


document.getElementById("selected")
.innerHTML=
"เลือกลูกค้า "+(c.id+1);


renderCustomers();


};



box.appendChild(div);



});



}









// =====================
// COOK
// =====================


function cook(type){



if(cooking[type]){

showMessage("กำลังทำอยู่");

return;

}



cooking[type]=true;



let percent=0;


let id;


let status;



if(type==="meat"){

id="meatTimer";
status="meatStatus";

}


if(type==="fries"){

id="friesTimer";
status="friesStatus";

}


if(type==="drink"){

id="drinkTimer";
status="drinkStatus";

}




let timer=document.getElementById(id);

let text=document.getElementById(status);




text.innerHTML="กำลังทำ...";



timers[type]=setInterval(()=>{


percent+=5;


timer.innerHTML=percent+"%";



if(percent>=80){

timer.parentElement.classList.add("warning");

}



if(percent>=100){


clearInterval(timers[type]);


cooking[type]=false;


timer.parentElement.classList.remove("warning");



timer.innerHTML="พร้อม";


text.innerHTML="พร้อม";



stock[type]++;


updateUI();



}



},300);



}









// =====================
// TRASH
// =====================


function trash(type){


stock[type]=0;


updateUI();


}









// =====================
// BURGER
// =====================


function makeBurger(){



if(stock.meat<=0){


showMessage("ต้องมีเนื้อ");


return;


}



stock.meat--;

stock.burger++;

mission.burger++;



document.getElementById("burgerStatus")
.innerHTML="🍔 พร้อมเสิร์ฟ";



updateUI();


}








// =====================
// SERVE
// =====================


function serve(){



if(selected===null){


showMessage("เลือกลูกค้า");

return;


}



let customer=
customers.find(c=>c.id===selected);



if(!customer)return;



let o=customer.order;




if(o.burger && stock.burger<=0){

showMessage("ไม่มีเบอร์เกอร์");

return;

}



if(o.fries && stock.fries<=0){

showMessage("ไม่มีเฟรน");

return;

}



if(o.drink && stock.drink<=0){

showMessage("ไม่มีน้ำ");

return;

}





if(o.burger){

stock.burger--;

mission.burger++;

}



if(o.fries){

stock.fries--;

mission.fries++;

}



if(o.drink){

stock.drink--;

mission.drink++;

}




customer.done=true;


mission.serve++;


money+=50;

score+=100;


selected=null;



showMessage("เสิร์ฟสำเร็จ");


updateUI();


checkLevel();


}









// =====================
// LEVEL CHECK
// =====================


function checkLevel(){


let goal=levels[level-1].goal;



for(let x in goal){


if((mission[x]||0)<goal[x]){

return;

}


}



document.getElementById("popup")
.style.display="flex";


document.getElementById("popupTitle")
.innerHTML=
"🎉 ผ่านด่าน "+level;



document.getElementById("popupText")
.innerHTML=
"เงิน +500";


money+=500;



}








function nextLevel(){


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



document.getElementById("meatStock").innerHTML=stock.meat;

document.getElementById("friesStock").innerHTML=stock.fries;

document.getElementById("drinkStock").innerHTML=stock.drink;

document.getElementById("burgerStock").innerHTML=stock.burger;



let text="";

let goal=levels[level-1].goal;



for(let x in goal){

text+=x+" : "+(mission[x]||0)+"/"+goal[x]+"<br>";

}



document.getElementById("missionText")
.innerHTML=text;



renderCustomers();


}









function showMessage(t){


let m=document.getElementById("message");


m.innerHTML=t;


setTimeout(()=>{

m.innerHTML="";

},1500);


}



console.log("Burger Rush Clean v1.0 Loaded");
