var Monkey, Ground, invGround, Bananas1, Bananas2, ObstacleGroup, Manim;
var PLAY = 1, LOSE = 0, Count = 0;
var Restart, GameOver
var GameState = PLAY;
var indicator ;
     
function preload() {
  Manim = loadAnimation(
    "Monkey_01.png", "Monkey_02.png",
    "Monkey_03.png", "Monkey_04.png",
    "Monkey_05.png", "Monkey_06.png",
    "Monkey_07.png", "Monkey_08.png",
    "Monkey_09.png", "Monkey_10.png"
  );

  Gover = loadImage("gameOver.png");
  Rstart = loadImage("restart.png");

  Ganim = loadImage("ground2.png");
  Banim = loadImage("B.png");
  Sanim = loadImage("stone.png")

}
function setup() {
  createCanvas(600, 300);

  Monkey = createSprite(50, 212, 5, 5);
  Monkey.setCollider("rectangle", -10, 0, 300, 500, 0);
  // Monkey.debug =true;
  indicator=createSprite(400,25,40,20);
  indicator.shapeColor = "green";
  Monkey.scale = 0.2;
  Monkey.addAnimation("running", Manim);

  Ground = createSprite(300, 255, 600, 1);
  Ground.addImage("ground", Ganim);
  // Ground.debug =true;
  Ground.velocityX = -5;

  invGround = createSprite(300, 250, 600, 1);
  invGround.visible = false;

  GameOver = createSprite(300, 100, 10, 10);
  GameOver.addImage("GAME_OVER", Gover);
  GameOver.visible = false;

  Restart = createSprite(300, 150, 10, 10);
  Restart.addImage("RESTART", Rstart);
  Restart.visible = false;

  Bananas1 = new Group();

  ObstacleGroup = new Group();
}


function draw() {


  background("black");
  indicator.shapeColor = "green";
  fill("white");
  textSize(15);
  text("SCORE:" + Count, 500, 30);

  if (GameState === PLAY) {

    Count = Count + Math.round(getFrameRate() / 60);

    if (Count % 100 === 0) {

    }

    if (keyDown("space") && Monkey.y >= 189) {
      Monkey.velocityY = -10;
    }

    if (Ground.x < 0) {
      Ground.x = Ground.width / 2
    }

    if (ObstacleGroup.isTouching(Monkey) && Monkey.scale >= 0.08) {

      Monkey.scale = Monkey.scale - 0.001;
      indicator.shapeColor = "red";

    }
    if (Monkey.scale <= 0.08) {
      GameState = LOSE;
    }
    if (Bananas1.isTouching(Monkey) && Monkey.scale < 0.3) {
      Monkey.scale = Monkey.scale + 0.001;
      Bananas1.destroyEach();
    }

    if (Count % 500 === 0 && Count < 2000) {
      Ground.velocityX = Ground.velocityX - 1;
    }


    banana();
    Obs();

    // GRavity
    Monkey.velocityY = Monkey.velocityY + 0.4;

  }
  else if (GameState === LOSE) {
    ObstacleGroup.setLifetimeEach(-1);
    Monkey.velocityY = 0;
    ObstacleGroup.setVelocityXEach(0);
    Bananas1.setLifetimeEach(-1);
    Bananas1.setVelocityXEach(0);

    Ground.velocityX = 0;

    GameOver.visible = true;
    Restart.visible = true;

    Restart_Game();

  }

  Monkey.collide(invGround);
  drawSprites();
}

function banana() {
  if (frameCount % 120 === 0) {
    var BANANAs;
    BANANAs = createSprite(600, random(50, 120), 1, 1);
    BANANAs.velocityX = Ground.velocityX;
    BANANAs.addImage("banana", Banim);
    BANANAs.scale = 0.08
    // BANANAs.debug =true;

    Monkey.depth = Monkey.depth + 1;
    BANANAs.depth = Monkey.depth;

    Bananas1.add(BANANAs);
  }

}

function Obs() {
  if (frameCount % 60 === 0) {
    var obstacle;
    obstacle = createSprite(600, 220, 1, 1);
    obstacle.velocityX = Ground.velocityX;
    obstacle.addImage("obstacle", Sanim);
    obstacle.scale = 0.2;
    // obstacle.debug =true;

    Monkey.depth = Monkey.depth + 1;
    obstacle.depth = Monkey.depth;

    ObstacleGroup.add(obstacle);
  }
}

function Restart_Game() {

  if (mousePressedOver(Restart) && GameState === LOSE) {
    GameState = PLAY;
    ObstacleGroup.destroyEach();
    Bananas1.destroyEach();
    Monkey.scale = 0.2
    Ground.velocityX = -5
    Count = 0;
    GameOver.visible = false;
    Restart.visible = false

  }
}