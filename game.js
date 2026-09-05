// Burger Rush v8.2 Easy Mode
// game.js


let level = 1;

let money = 0;
let score = 0;
let served = 0;

let selectedCustomer = null;


// =======================
// ด่านง่ายขึ้น
// =======================

let levels = [

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
burger:2
}
},

{
customers:2,
mission:{
serve:5,
burger:2,
fries:1
}
},

{
customers:2,
mission:{
serve:6,
burger:3,
drink:1
}
},

{
customers:3,
mission:{
serve:7,
burger:3,
fries:2
}
},

{
customers:3,
mission:{
serve:8,
burger:4,
drink:2
}
},

{
customers:3,
mission:{
serve:10,
burger:5
}
},

{
customers:3,
mission:{
serve:10,
fries:5
}
},

{
customers:3,
mission:{
serve:12,
burger:6,
drink:4
}
},

{
customers:4,
mission:{
serve:15,
burger:8,
fries:5,
drink:5
}
}

];




// =======================
// ตัวแปรลูกค้า
// =======================


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
text:"น้ำปั่น",
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





// =======================
// ภารกิจ
// =======================


let mission={

serve:0,
burger:0,
fries:0,
drink:0

};




// =======================
// เริ่มเกม
// =======================


function startGame(){


document.getElementById("startScreen")
.style.display="none";


let bgm=document.getElementById("bgm");

if(bgm){

bgm.play()
.catch(()=>{});

}


loadLevel();


}






// =======================
// โหลดด่าน
// =======================


function loadLevel(){


customers=[];

selectedCustomer=null;

served=0;


// รีเซ็ตภารกิจ

mission={

serve:0,
burger:0,
fries:0,
drink:0

};



createCustomers();


updateMission();


renderCustomers();



document.getElementById("level")
.innerHTML=level;


}






// =======================
// สร้างลูกค้า
// =======================


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







// =======================
// แสดงลูกค้า
// =======================


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



let heart="";


for(let i=0;i<c.heart;i++)

heart+="❤️";


for(let i=c.heart;i<8;i++)

heart+="🤍";



div.innerHTML=`

<div class="customerFace">

👤

</div>


<div class="heart">

${heart}

</div>


<div class="order">

${c.order.name}

<br>

${c.order.text}

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






// =======================
// หัวใจลูกค้า
// =======================


function startHeartTimer(){


let timer=setInterval(()=>{


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





// =======================
// ภารกิจ
// =======================


function updateMission(){


let box="";


let target =
levels[level-1].mission;



for(let key in target){


box +=

key+
" : "+
(mission[key]||0)
+
"/"+
target[key]
+
"<br>";


}



document.getElementById("missionText")
.innerHTML=box;


}
