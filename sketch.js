
var db, stock, foodS


function preload()
{
d1=loadImage("images/dogImg.png")
d2=loadImage("images/dogImg1.png")
milk=loadImage("Milk.png")
}

function setup() {
  createCanvas(800, 700);
  
  db=firebase.database()

  var stock=db.ref("food")
  stock.on("value", read)

  
  dog=createSprite(550,300,10,10)
  dog.addImage(d1)

  b1=createButton("Click here to feed the dog")
 b1.position(400,100)
  b2=createButton("Click here to get food")
b2.position(600,100)
b2.mousePressed(getfood)
b1.mousePressed(feedfood)
}


function draw() {  
background("white")
dog.scale=0.5

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(d2)
  }
  var x=80, y=100


  if(foodS!=0){
    for(var i=0; i<foodS; i++){
      if(i%10===0){
        x=80
        y=y+50
      }
      image(milk, x, y, 50,50)
      x=x+30
    }
  }

  text("Press Up arrow key to feed the dog!", 80,200)
  drawSprites();

}
function read(data){
  foodS=data.val()
}

function writeStock(x){

  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }

}


function getfood(){
  foodS++
db.ref("/").update({
  food:foodS
})

}
function feedfood(){
  if(foodS>0){
    foodS=foodS-1
    //dog.addImage(happydog,250,300)
  }
  db.ref("/").update({
    food:foodS
    
  })
}

