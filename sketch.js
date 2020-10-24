//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogImage;
var feed,addFood;
var fedTime,Lastfed,foodObj;

function preload(){

  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog  = createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.15;
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}
function draw() {  
background(46,139,87);
foodObj.display();
//if (keyWentDown(UP_ARROW)){
  //writeStock(foodS);
  //dog.addImage(happyDog);
//}
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })

}
 function addFood(){
foodS++;
database.ref('/').update({
  Food:foodS
})
}
function feedDog(){
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
