var bg, bgimg, ground_invisible; 
var player, playerimg;
var coin, coinimg, coinsGroup;
var obstacle, obstacleimg, obstaclesGroup1,obstaclesGroup2,obstaclesGroup3 ;
var PLAY = 1, END = 0;
var gameState = PLAY;
var gameOver,gameOverimage,restart, restartimage;
var heart1, heart2, heart3;
var score=0;


function preload(){
    bgimg= loadImage("Images/image.jpg")
    playerimg= loadAnimation("Images/player0.png","Images/player1.png","Images/player2.png",
    "Images/player3.png","Images/player4.png","Images/player5.png","Images/player6.png","Images/player7.png",
    "Images/player8.png","Images/player9.png","Images/player10.png","Images/player11.png",
    "Images/player12.png","Images/player13.png","Images/player14.png","Images/player15.png")

    coinimg= loadAnimation("Images/coin1.png","Images/coin2.png",
    "Images/coin3.png","Images/coin4.png","Images/coin5.png")

    obstacleimage= loadAnimation("Images/enemy0.png","Images/enemy1.png",
    "Images/enemy2.png","Images/enemy3.png","Images/enemy4.png","Images/enemy5.png",
    "Images/enemy6.png","Images/enemy7.png","Images/enemy8.png","Images/enemy9.png",
    "Images/enemy10.png","Images/enemy11.png")

    gameOverimage=loadImage("Images/gameOver.png");
    restartimage=loadImage("Images/restart.png");

    heartImage= loadImage("Images/heart.png")
}

function setup(){
    createCanvas(1400,700)

    bg = createSprite(0,0,1400,700)
    bg.addImage("bg",bgimg)
    bg.scale=2

    player = createSprite(80,550,20,20)
    player.addAnimation("player",playerimg)
    player.setCollider("circle",0,0,150)

    ground_invisible=createSprite(700,690,1400,5);
    ground_invisible.visible = false;  

    gameOver=createSprite(700,200,20,20);
    gameOver.addImage(gameOverimage);
    gameOver.visible=false;
  
  restart=createSprite(700,250,20,20);
  restart.addImage(restartimage);
  restart.scale=0.5;
  restart.visible=false;

  heart1= createSprite(1300,50,10,10)
  heart1.addImage("heart",heartImage)
  heart1.scale= 0.4

  heart2= createSprite(1270,50,10,10)
  heart2.addImage("heart",heartImage)
  heart2.scale=0.4

  heart3 = createSprite(1240,50,10,10)
  heart3.addImage("heart",heartImage)
  heart3.scale= 0.4

    coinsGroup = new Group();
    obstaclesGroup1 = new Group();
    obstaclesGroup2 = new Group();
    obstaclesGroup3 = new Group();
}

function draw(){
    background("black")

    if(gameState===PLAY){

      if(keyDown("space")){
        player.velocityY=-10; 
      
      }

      player.velocityY=player.velocityY+0.8;

    bg.velocityX=-5

    if(bg.x<0){
        bg.x = bg.width/2;
    } 
    
    spawnCoins();

    var select_obstacles = Math.round(random(1,4));
    if (frameCount % 200 == 0) {
     if (select_obstacles == 1) {
       spawnObstacles1();
     } else if (select_obstacles == 2) {
       spawnObstacles2()
     } else if (select_obstacles == 3) {
       spawnObstacles3()
     } 
    }
       

    if(coinsGroup.isTouching(player)){
      coinsGroup.destroyEach();
      score=score+1
    }

    if(score ==5){
      gameState=END;
    }
      
   if(obstaclesGroup1.isTouching(player)){
     heart1.destroy();
   }
   if(obstaclesGroup2.isTouching(player)){
    heart2.destroy();
   }
    if(obstaclesGroup3.isTouching(player)){
      heart3.destroy();
    }

  }

  else if(gameState===END){
    bg.velocityX=0;
    player.velocityY=0;
   obstaclesGroup1.setVelocityXEach(0);
   obstaclesGroup2.setVelocityXEach(0);
   obstaclesGroup3.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);
    
    obstaclesGroup1.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    
    gameOver.visible=true;
    restart.visible=true;
    
  if (mousePressedOver(restart)){
    reset();
  }  
}
    player.collide(ground_invisible)

    

    drawSprites()

    
    fill ("black")
    textSize(25)
    text("SCORE - "+score,100,100)
}

function spawnCoins() {
    if (frameCount % 160 === 0) {
      var coin = createSprite(600,150,40,10);
      coin.setCollider("circle",0,0,40)
      coin.y = Math.round(random(200,500));
      coin.addAnimation("coin",coinimg);
      coin.scale = 0.5;
      coin.velocityX = -3;
      
      coin.lifetime = 200;
      
      coinsGroup.add(coin);
    } 
  }

  function spawnObstacles1() {
    if (frameCount % 200 === 0) {
      var obstacle1 = createSprite(600,600,40,10);
      obstacle1.setCollider("circle",0,0,40)
      obstacle1.addAnimation("obstacle",obstacleimage);
      obstacle1.scale = 0.5;
      obstacle1.velocityX = -3;
      
      obstacle1.lifetime = 200;
      
      obstaclesGroup1.add(obstacle1);
    } 
  }

  function spawnObstacles2() {
    if (frameCount % 200 === 0) {
      var obstacle2 = createSprite(600,600,40,10);
      obstacle2.setCollider("circle",0,0,40)
      obstacle2.addAnimation("obstacle",obstacleimage);
      obstacle2.scale = 0.5;
      obstacle2.velocityX = -3;
      
      obstacle2.lifetime = 200;
      
      obstaclesGroup2.add(obstacle2);
    } 
  }

  function spawnObstacles3() {
    if (frameCount % 200 === 0) {
      var obstacle3 = createSprite(600,600,40,10);
      obstacle3.setCollider("circle",0,0,40)
      obstacle3.addAnimation("obstacle",obstacleimage);
      obstacle3.scale = 0.5;
      obstacle3.velocityX = -3;
      
      obstacle3.lifetime = 200;
      
      obstaclesGroup3.add(obstacle3);
    } 
  }

 function reset(){
 gameState=PLAY;
  gameOver.visible=false;
restart.visible=false;
obstaclesGroup.destroyEach();
 coinsGroup3.destroyEach();
}
