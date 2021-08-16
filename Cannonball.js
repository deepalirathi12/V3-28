/*class CB {
  constructor(x, y) {
    var options = {
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
      isStatic: true
    };

    this.body = Bodies.circle(x, y, 30, options);
    this.isSink = false;
    this.r = 30
    this.speed = 0.05
    this.animation =[this.image];
    this.image = loadImage("./assets/cannonball.png");
    this.image1 = loadImage("./assets/gray.jpg");
    this.path = [];
    World.add(world, this.body);
  }

  animate(){
    this.speed = this.speed+0.05
  }

  //shooting the cannonball
  shoot() {
    var velocity = p5.Vector.fromAngle(cannon.angle);
    velocity.mult(20);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
  }

  display() {
    var index = floor(this.speed % this.animation.length)
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    imageMode(CENTER);
    image(this.animation[index], 0, 0, this.r,this.r);
    pop();

    //getting the positions of ball and pushing them in the trajectory array
    if (this.body.velocity.x > 0 && this.body.position.x > 300) {
      var position = [this.body.position.x, this.body.position.y];
      this.path.push(position);
    }

    // setting image to the trajectory
    for (var i = 0; i < this.path.length; i++) {
      image(this.image, this.path[i][0], this.path[i][1], 5, 5);
    }
  }

  remove(index){
    this.isSink = true;
    this.speed = 0.05;
    this.r = 150;
    this.animation = water_splashAnimation;
    Matter.Body.setVelocity(this.body, {x:0,y:0})
    setTimeout(()=>{
      World.remove(world,this.body)
      balls.splice(index,1)
    },1000)
  }
}*/

class CB {
  constructor(x, y) {
    var options = {
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
      isStatic: true
    };
    this.r = 30;
    this.speed = 0.05;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
    this.animation = [this.image];
    this.tower = loadImage("./assets/gray.jpg");
    this.trajectory = [];

    World.add(world, this.body);
  }

  animate() {
    this.speed += 0.05 % 1.1;
  }

  remove(index) {
    this.isSink = true;
    Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

    this.animation = water_splashAnimation;
    this.speed = 0.05;
    this.r = 150;
    setTimeout(() => {
      Matter.World.remove(world, this.body);
      balls.splice(index, 1);
    }, 1000);
  }

  shoot() {
    //adding new angle 
    var newAngle = cannon.angle - 0.5
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(20);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    var index = floor(this.speed % this.animation.length);

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index], 0, 0, this.r, this.r);
    pop();

    if (
      this.body.velocity.x > 0 &&
      this.body.position.x > 300 &&
      !this.isSink
    ) {
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }
}