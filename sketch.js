var monkey,monkeyRunning,banana_img,banana,stone,stone_img,jungle,jungle_img,invi_ground;

var stoneGroup,bananaGroup,gameState,score, hits;

function preload() {
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png"
  ,"Monkey_03.png","Monkey_04.png","Monkey_05.png",
  "Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  MoneyImage = loadImage("Monkey_01.png")
  
  stone_img = loadImage("stone.png");
  
  banana_img = loadImage("banana.png");
  
  jungle_img = loadImage("jungle.png");

  monkeyIMG = loadImage("Monkey_01.png")
}

function setup() {
  createCanvas(600, 200);
  
  gameState = "play"

  hits = 0;
  
  jungle = createSprite(300,-20,600,100);
  jungle.addImage("jungle1", jungle_img);
  jungle.scale = 1;
 
  
  monkey = createSprite(60,160,10,10);
  monkey.addAnimation("moving", monkeyRunning)
  monkey.scale = 0.1
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  invi_ground = createSprite(300,190,600,10);
  invi_ground.visible=false;
  
  score = 1;
}

function draw() {
  background(220);
  
  camera.position.x = monkey.position.x;

  if(gameState === "play"){
  monkey.x = monkey.x + 5;
  invi_ground.x = monkey.position.x;

  
  
  if((frameCount % 60 === 0 )){
    jungle.x = camera.position.x + 100;
  }
    
  score = score + Math.round(getFrameRate()/60);
    
  if(keyDown("space") && monkey.y >= 130){
    monkey.velocityY = -19 ;
  }
  
  monkey.velocityY = monkey.velocityY + 1.1;

  spawnStone();
  spawnBanana();
    
    if(stoneGroup.isTouching(monkey)){
      monkey.scale = 0.1;
      score = 0;
      hits += 1;
      stoneGroup.destroyEach();
    }
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      if(monkey.scale < 0.18){
      monkey.scale = monkey.scale + 0.01;
      }
    }

    if(hits >= 3){
      gameState = "end";
    }
  }

  if(gameState === "end"){
    monkey.addImage("MONKEY",monkeyIMG);
  }

  monkey.collide(invi_ground);

  drawSprites();

  textSize(15)
  text("Survival time: "+ score, monkey.position.x+150, 20);
}


function spawnStone() {
  if(frameCount % 150 === 0 || frameCount ===1) {
    stone = createSprite(camera.position.x+500,170,10,40);
    
    stone.addImage("rock", stone_img)
    
    
    stone.scale = 0.1;
    stone.lifetime = 300;
    
    stoneGroup.add(stone);
  }
}

function spawnBanana() {
  if (frameCount % 70 === 0 || frameCount === 20) {
    banana = createSprite(camera.position.x+500,100,40,10);
    
    banana.y = random(90,40);
    banana.scale = 0.04;

    
    banana.addImage("banana.img", banana_img)
    
    banana.lifetime = 300;
    
    bananaGroup.add(banana);
  }
}
