
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var obstacleGroup;
var bananaGroup;
var survivalTime;
var score;
//var PLAY=1;
//var END=0;
var gameState=0;
var gameOver;
var backGround,backGroundimg;


function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceleImage = loadImage("obstacle.png")
  
 
}



function setup() {
  createCanvas(windowWidth,windowHeight);
 
  
   monkey=createSprite(100,height-50,20,20);
  monkey.addAnimation("monkeyRunning", monkey_running )
  monkey.scale=0.1
  ground=createSprite(width/2,height,width,5)

  ground.x=ground.width/2;
  
  obstacleGroup=createGroup();
  bananaGroup=createGroup();
  survivalTime=0;
  score=0;
  lives=3;

  
  
 
 
  

  
}


function draw() {
  background("red")
  text("survivalTime = "+survivalTime,100,10)
  text("score: "+score,300,10)
  text("lives="+lives,400,10)
  monkey.collide(ground)
  if(gameState===0){
    textSize(30)
    text ("press "+"S "+"start",width/2,height/2)
        
        if(keyDown("s")){
            gameState=1;
        }
    }
  else if(gameState===1){
    obstacle();
    banana();
    if(ground.x<0){
      ground.x=ground.width/2;
    }
     survivalTime=Math.round(frameCount/frameRate())
  if(touches.length>0||keyDown("space")&&monkey.y>=height-50){
     monkey.velocityY=-12
    touches=[]
     }
  monkey.velocityY=monkey.velocityY+0.5
  ground.velocityX=-2
 
    if(bananaGroup.isTouching(monkey)){
    score=score+1; 
    bananaGroup[0].destroy()
    }
    if(obstacleGroup.isTouching(monkey)){
      lives=lives-1
      obstacleGroup[0].destroy();
    }
  
   
    
    
  }
  
  drawSprites();
if(lives===0){
  gameState=2;
}
  if(gameState===2){
        /*ground.vlocityX=0;
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setVelocityXEach(0);
        monkey.vlocityY=0;*/
        text("gameOver",width/2,height/2);
        if(keyDown("r")||touches.length>0){
          reset();
        }
        
      }

  
}
function obstacle(){
  if(frameCount%300===0){
  var obstacle=createSprite(width+20,height-10,30,30);
      obstacle.addImage("obstacle", obstaceleImage)
      obstacle.velocityX=-2;
      obstacle.scale=0.1;
      obstacleGroup.add(obstacle)
  }
  }
function banana(){
 if(frameCount%200===0){
    var banana=createSprite(width+20,height-400,20,20);
    banana.addImage("banana",bananaImage);
    banana.y=Math.round(random(550,400));
    banana.velocityX=-2;
    banana.scale=0.1;
    bananaGroup.add(banana);
    }
  }
function reset(){
  gameState=1;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  score=0;
  survivalTime=0;
  lives=3
}
