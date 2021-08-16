class Boat{
    constructor(x,y,w,h,boatPos,boatAnimation){
        var options = {
            restitutuin: 0.8,
            friction:1.0,
            density:1.0
        }
        
        this.body = Bodies.rectangle(x,y,w,h,options)
        this.w = w
        this.h =h;
        this.animation = boatAnimation
        this.speed = 0.05
        this.boatPos = boatPos;
        this.isBroken = false;
        this.image= loadImage("assets/boat.png")
        World.add(world,this.body)
    }

    display(){
        var index = floor(this.speed % this.animation.length)
        push()
        translate(this.body.position.x,this.body.position.y)
        rotate(this.body.angle)
        imageMode(CENTER)
        image(this.animation[index],0,this.boatPos,this.w,this.h)
        pop()
    }

    remove(index) {
        this.animation = broken_boatAnimation;
        this.isBroken = true;
        //this.width = 800;
        //this.height = 800;
        this.speed = 0.05
        setTimeout(()=>{
            Matter.World.remove(world, boats[index].body);
            boats.splice(index, 1);
        },2000)
        
      }
    
    animate(){
        this.speed = this.speed+0.05
    }
}