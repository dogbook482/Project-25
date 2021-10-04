const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var arrow;
var arrows;
var baseimage;
var playerimage;
var playerArrows = [];

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y - 112,
    120,
    120
  );

  arrow = new PlayerArrow(
    playerArcher.body.position.x,
    playerArcher.body.position.y,
    100,
    10
  );
}

function draw() {
  background(backgroundImg);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)
  Engine.update(engine);

  playerArcher.display();

  for(var i=0; i < playerArrows.length;i++){
    var j;
    j = playerArrows.length;
    console.log(j+":arrow");
    showArrows(playerArrows[i]);
    }

  if (keyCode === LEFT_ARROW) {
    arrow.shoot(playerArcher.body.angle);
  }

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
}

function keyPressed(){
  if (keyCode === 32){
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.x;
    var angle = playerArcher.body.angle;
    var arrow = new PlayerArrow(350,250,100,10, angle);

    Matter.Body.setAngle(arrow.body,angle);
    playerArrows.push(arrow);
  }
}

function showArrows(arrows){
  if(arrows){
    arrows.display();
  }
}

function keyReleased(){
  if (keyCode === 32){
    if (playerArrows.length){
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length-1].shoot(angle);
    }
  }
}
