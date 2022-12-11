let ground;
let lander;
var lander_img;
var bg_img;
var thrust, crash, land
var rcs_left
var rcs_right
var obs
var winImage
var win;

var vx = 0;
var g = 0.05;
var vy = 0;
var fuel = 400
var timer
var obstacles_img
var lz_img

function preload()
{
  lander_img = loadImage("normal.png");
  bg_img = loadImage("bg.png");
  thrust=loadAnimation("b_thrust_1.png","b_thrust_2.png", "b_thrust_3.png")
  crash=loadAnimation("crash1.png","crash2.png", "crash3.png")
  land=loadAnimation("landing1.png", "landing2.png", "landing_3.png")
  rcs_left=loadAnimation("left_thruster_1.png", "left_thruster_2.png")
  normal=loadAnimation("normal.png")
  rcs_right=loadAnimation("right_thruster_1.png", "right_thruster_2.png")
  obstacles_img = loadImage("obstacle.png")
  lz_img=loadImage("lz.png")
  winImage=loadImage("win.png")
  thrust.playing=true
  thrust.looping=false
  crash.looping=false
  land.looping=false
  rcs_left.looping=false
  rcs_right.looping=false
}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  

  timer=1500
  lander = createSprite(100,50,30,30);
  lander.addImage(lander_img);
  lander.scale = 0.1;

  lander.addAnimation("thrusting", thrust)
  lander.addAnimation("crashing", crash)
  lander.addAnimation("landing", land)
  lander.addAnimation("left", rcs_left)
  lander.addAnimation("right", rcs_right)
  lander.addAnimation("normal", normal)

  obs=createSprite(320,530,50,100)
  obs.addImage(obstacles_img)
  obs.scale=0.5
  obs.debug=false
  obs.setCollider("rectangle", 0,200,400,300)
  lander.debug=false
  lander.setCollider("circle", 0,0,450)
  ground=createSprite(500,690,1000,20)
  lz=createSprite(880,610,50,30)
  lz.addImage(lz_img)
  lz.scale=0.3
  lz.debug=false
  lz.setCollider("rectangle",0,200,500,200)
  win=createSprite(500,350,0,0)
  win.addImage(winImage);
  win.scale=0.4
  win.visible=false

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Vertical Velocity: "+round(vy),800,75);
  text("Horizontal Velocity: "+round(vx,2), 800, 50)
  text("Fuel: "+fuel,800,25)
  pop();

  //fall down
  vy +=g;
  lander.position.y+=vy;

  if(lander.collide(obs)===true) {
    lander.changeAnimation("crashing")
    stop()
  }
  if(lander.isTouching(ground)) {
    lander.changeAnimation("crashing")
    stop()
  }

  if(lander.collide(lz)===true) {
    lander.vx=0
    lander.vy=0
    win.visible=true
  }
  keyPressed()
  drawSprites();
}

function stop() {
  vx=0
  vy=0
  fuel=0
  g=0
}

function keyPressed() {
  if(keyCode===RIGHT_ARROW && fuel>0) {
    lander.changeAnimation("left")
    right_thrust()
  } 
  if(keyCode=== LEFT_ARROW && fuel>0) {
    lander.changeAnimation("right")
    left_thrust()
  }
}

function right_thrust() {
  lander.velocityX=lander.velocityX+0.05
  fuel-=1
}

function left_thrust() {
  lander.velocityY=lander.velocityY-0.09
  lander.velocityX=1
  fuel-=1
}