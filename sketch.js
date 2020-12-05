//Create variables here
var dog,Happydog;
var foodS,foodStock;
var database;
var addFood,Feedpet;
var feedTime,lastFed;
var food;

function preload()
{
  dogImage=loadImage("images/dogImg.png");
  HappydogImage=loadImage("images/dogImg1.png");
}

function setup() {
 canvas=createCanvas(1000, 1000);
  dog=createSprite(500,500,5,5);
  dog.addImage(dogImage);

  database=firebase.database();
    
  food = new Food(1,0)

foodStock=database.ref('Food');
foodStock.on("value",readStock);

}


function draw() {  
background(46,139,87);
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed:"+lastFed%12+"PM",350,30)
}
else if(lastFed===0){
  text("Last Feed: 12 AM",350,30)
}
else{
  text("Last Feed:"+lastFed+"AM",350,30)
}




if(keyDown(UP_ARROW)){
writeStock(foodS);
dog.addImage(HappydogImage);
}

Feedpet=createButton("Feed the dog");
Feedpet.position(700,95);
Feedpet.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addfoodS);

  drawSprites();
  //add styles here
textSize(20);
fill("red");
stroke("brown");
text(foodStock,980,980);
text("Note:Press UP ARROW to feed you Pet with milk",250,100);
}

function readStock(data){
foodS=data.val();
}

function writeStock(x){

if(x<=0){
  x=0;
}
else{
  x=x-1
}


  database.ref('/').update({
  Food:x
})


}

function feedDog(){
dog.addImage(Happydog);
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
feedTime:hour()

})

}

function addfoodS(){
foodS++;
database.ref('/').update({
Food:foodS
})
}