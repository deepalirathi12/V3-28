const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint

var engine;
var world;
var ground, tower, cannon, cannonBall,boat;
var balls = []
var boats = []

var score = 0

var boatAnimation = []
var boatSpritedata, boatSpritesheet

var broken_boatAnimation = []
var broken_boatSpritedata, broken_boatSpritesheet


var isGameOver = false;
var isLaughing = false;

function preload() {
  bgimg = loadImage("./assets/background.gif")

  boatSpritedata = loadJSON("assets/boat/boat.json")
  boatSpritesheet = loadImage("assets/boat/boat.png")

  broken_boatSpritedata = loadJSON("assets/boat/broken_boat.json")
  broken_boatSpritesheet = loadImage("assets/boat/broken_boat.png")

 
}



function setup() {
  createCanvas(1200, 600);
  engine = Engine.create()
  world = engine.world
  ground = new Ground(600, 598, 1200, 2)
  tower = new Tower(120, 390, 200, 400)
  cannon = new Cannon(140, 110, 100, 50, -PI / 3);

  var boatFrames = boatSpritedata.frames

  for(var i =0; i<boatFrames.length; i=i+1){
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
    boatAnimation.push(img)
  }

  var broken_boatFrames = broken_boatSpritedata.frames

  for(var i =0; i<broken_boatFrames.length; i=i+1){
    var pos = broken_boatFrames[i].position;
    var img = broken_boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
    broken_boatAnimation.push(img)
  }

  
  


}

function draw() {
  Engine.update(engine)



  background("skyblue");

  image(bgimg, 0, 0, 2700, 1200)
 

  fill("brown")
  ground.display()
  fill("white")
 
  fill("#6d4c41");
  textSize(40);
  text("Score:" + score, width - 200, 50);
  textAlign(CENTER, CENTER);


  for (var i = 0; i < balls.length; i = i+1) {
    showCannonBalls(balls[i], i)
  }
  tower.display()
  cannon.display()

  //Matter.Body.setVelocity(boat.body,{x:-0.9, y:0})
  showBoats()
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for (var j = 0; j < boats.length; j++) {
      if (balls[i] !== undefined && boats[j] !== undefined) {
        var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
        if (collision.collided) {
          score = score+5
          boats[j].remove(j);

          Matter.World.remove(world, balls[i].body);
          balls.splice(i, 1);
          i--;
          
        }
      } 
    }
  }

}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannonBall = new CB(cannon.x, cannon.y)
    balls.push(cannonBall)
  }
}

function showCannonBalls(ball, index) {
  ball.display()
  ball.animate()
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
   // Matter.World.remove(world, ball.body);
    //balls.splice(index, 1);
    if(!ball.isSink){
     
      ball.remove(index)
    }
  }

}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    cesound.play()
    balls[balls.length - 1].shoot()
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-130, -100, -120, -80];
      var position = random(positions);
      var boat = new Boat(width,height - 100, 200, 200, position, boatAnimation );
      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, { x: -0.9,y: 0});
      boats[i].display();
      boats[i].animate();
      var collision = Matter.SAT.collides(tower.body, boats[i].body);
      if (collision.collided && !boats[i].isBroken) {
         //Added isLaughing flag and setting isLaughing to true
         if(!isLaughing && !plsound.isPlaying()){
          
        }
        isGameOver = true;
        gameOver();
    }
  }

  } else {
    var boat = new Boat(width, height - 100, 200, 200, -100,boatAnimation);
    boats.push(boat);
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
