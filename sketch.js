var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg, bgImage;
var deer, deerImage;
var deadDeer;
var hunter, hunterImage;
var bullet, bulletImage, bulletGroup;
var bang, bangImage, bangGroup;
var bulletFrameCount;
var invisibleGround;
var gameOver, gameOverImg;
var restart, restartImg;
var prison, prisonImage;

function preload(){

  bgImage = loadImage("Images/Bg2.jpeg");

  deerImage = loadAnimation("Images/Deer1.png", "Images/Deer2.png", "Images/Deer3.png", "Images/Deer4.png", "Images/Deer5.png", "Images/Deer6.png")

  hunterImage = loadImage("Images/HunterImage.png");

  bulletImage = loadImage("Images/Bullet.png");

  bangImage = loadImage("Images/FiringImage.png");

  gameOverImg = loadImage("Images/GameOverImage.png");

  restartImg = loadImage("Images/RestartImage.png");

  deadDeer = loadAnimation("Images/DeadDeer1.png");

  prisonImage = loadImage("Images/Prison.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  bg = createSprite(windowWidth/2, windowHeight/2);
  bg.addImage(bgImage);
  bg.scale = 1.85;
  bg.velocityX = -2;

  deer = createSprite(windowWidth/1.5, windowHeight- 75);
  deer.addAnimation("deer_running", deerImage);
  deer.scale = 2;

  hunter = createSprite(windowWidth/8, windowHeight-125);
  hunter.addImage("hunter", hunterImage);
  hunter.scale = 0.3;

  invisibleGround = createSprite(windowWidth/2, windowHeight/1.1, windowWidth, 10);
  
  gameOver = createSprite(windowWidth/2, windowHeight/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  restart = createSprite(windowWidth/2, windowHeight/4);
  restart.addImage(restartImg);
  restart.scale = 0.05;

  prison = createSprite(windowWidth/8, windowHeight - 200);
  prison.addImage("prison", prisonImage);


  bangGroup = new Group();

  bulletGroup = new Group();
}


function draw(){
  background("green");

  drawSprites();

  if(gameState === PLAY){
    if(bg.x < 200){
      bg.x = width/2;
    }

    if(bulletGroup.isTouching(deer)){
      gameState = END;
       deer.velocityX = 0;
       deer.velocityY = 0;
       deer.addAnimation("deadDeer", deadDeer);
       deer.changeAnimation("deadDeer", deadDeer);
       deer.scale = 0.5;
     }

     spawnBullets();

     

     if(keyDown("space")){
       deer.velocityY = -3;
     }
       
     deer.velocityY = deer.velocityY + 0.8;

     invisibleGround.visible = false;
    
     deer.collide(invisibleGround);

     gameOver.visible = false;

     restart.visible = false;

     prison.visible = false;
  }
 
  else if(gameState === END){
    //bg.x = 0;
    bulletGroup.setVelocityXEach(0);
    bangGroup.destroyEach();
    bulletGroup.destroyEach();
    gameOver.visible = true;
    restart.visible = true;
    prison.visible = true;

    bg.velocityX = 0;

    spawnBang();

    if(mousePressedOver(restart)) {
      reset();
    }

  }
 
}


function spawnBullets(){
  if(frameCount % 50 === 0){
    var x = Math.round(random (0, 10));
    var y = Math.round(random (-2, 5));
    var bullet = createSprite(windowWidth/8 + 50, windowHeight-160);
    bullet.addImage(bulletImage);
    bullet.scale = 0.1;
    bullet.velocityX = x;
    bullet.velocityY = -y;
    bulletGroup.add(bullet);
  }

  
}

function spawnBang(){
  //if(frameCount % 50 === 0)
  {
    //var x = Math.round(random(windowWidth/7, width));
    //var y = Math.round(random(0, height));
    var bang = createSprite( deer.x, deer.y);
    bulletFrameCount = frameCount;
    //console.log(bang.x, bang.y);
    bang.addImage(bangImage);
    bang.scale = 0.2;
    bangGroup.add(bang);
  }
  
  //console.log("FrameCount" + frameCount);
  //console.log("BulletFrameCount" + bulletFrameCount);


  if(bulletFrameCount + 10 === frameCount && bang){
    bullet.destroy();
    bang.destroy();
    console.log("FrameCount" + frameCount);
    console.log("BulletFrameCount" + bulletFrameCount);
  }
 
}

function reset(){
  gameState = PLAY;
  deer.changeAnimation("deer_running", deerImage);
  deer.scale = 2;
  bg.velocityX = -2;
  bangGroup.destroyEach();
}