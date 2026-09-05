// =====================================
// Burger Rush v9.2.2 Final Single
// Built from scratch
// =====================================


// ===============================
// GAME DATA
// ===============================


let game = {

    level:1,

    money:0,

    score:0,

    running:false,

    selectedCustomer:null

};




// ===============================
// STOCK
// ===============================


let stock = {

    meat:0,

    fries:0,

    drink:0,

    burger:0

};




// ===============================
// MISSION
// ===============================


let mission = {

    serve:0,

    burger:0,

    fries:0,

    drink:0

};




// ===============================
// CUSTOMER
// ===============================


let customers=[];



let customerTimer=null;





// ===============================
// COOKING
// ===============================


let cooking={


    meat:null,

    fries:null,

    drink:null


};





// ===============================
// LEVEL DATA
// ===============================


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







// ===============================
// MENU
// ===============================


const foods=[


{

name:"เบอร์เกอร์",

icon:"🍔",

need:["burger"]

},



{

name:"เฟรนฟราย",

icon:"🍟",

need:["fries"]

},



{

name:"น้ำปั่น",

icon:"🥤",

need:["drink"]

},



{

name:"ชุดใหญ่",

icon:"🍔🍟🥤",

need:["burger","fries","drink"]

}


];







// ===============================
// START GAME
// ===============================


function startGame(){


game.running=true;


let start=document.getElementById("startScreen");


let area=document.getElementById("game");



if(start)

start.style.display="none";



if(area)

area.style.display="block";



loadLevel();


}





// ===============================
// LOAD LEVEL
// ===============================


function loadLevel(){


customers=[];


game.selectedCustomer=null;



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


startHeartSystem();


}
// ===============================
// CREATE CUSTOMERS
// ===============================


function createCustomers(){


let amount = levels[game.level-1].customers;



for(let i=0;i<amount;i++){


let food =
foods[Math.floor(Math.random()*foods.length)];



customers.push({

id:i,

heart:10,

order:food,

done:false


});


}



renderCustomers();


}






// ===============================
// RENDER CUSTOMERS
// ===============================


function renderCustomers(){


let box=document.getElementById("customers");


if(!box)return;



box.innerHTML="";



customers.forEach(customer=>{


if(customer.done)return;



let div=document.createElement("div");



div.className="customer";



if(game.selectedCustomer===customer.id){

div.classList.add("selected");

}



div.innerHTML=`

<div class="customerFace">

👤

</div>


<div class="heart">

${"❤️".repeat(customer.heart)}

</div>


<div class="order">

${customer.order.icon}

<br>

${customer.order.name}

</div>


`;





div.onclick=function(){



game.selectedCustomer=customer.id;



let selected=
document.getElementById("selected");



if(selected){


selected.innerHTML=

"เลือกลูกค้า "+(customer.id+1);


}



renderCustomers();



};



box.appendChild(div);



});



}









// ===============================
// HEART SYSTEM
// ===============================


function startHeartSystem(){



if(customerTimer){

clearInterval(customerTimer);

}



customerTimer=setInterval(()=>{


if(!game.running)return;



customers.forEach(customer=>{


if(customer.done)return;



customer.heart--;



if(customer.heart<=0){



customer.done=true;



showMessage("😡 ลูกค้าออกจากร้าน");



}



});



renderCustomers();



checkNeedMoreCustomer();



},8000);



}








// ===============================
// ADD CUSTOMER
// ===============================


function checkNeedMoreCustomer(){


let alive=
customers.filter(c=>!c.done).length;



if(alive===0){



// ยังไม่ผ่านด่าน อย่าให้เกมตัน


if(!checkLevelComplete()){


createNewCustomer();


}



}



}








function createNewCustomer(){



let id=customers.length;



let food=

foods[Math.floor(Math.random()*foods.length)];



customers.push({

id:id,

heart:10,

order:food,

done:false


});



renderCustomers();


}









// ===============================
// SELECT CUSTOMER
// ===============================


function getSelectedCustomer(){


if(game.selectedCustomer===null){

showMessage("เลือกลูกค้าก่อน");

return null;


}



let customer=

customers.find(

c=>c.id===game.selectedCustomer

);



return customer || null;



}
