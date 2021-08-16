class Tower{
    constructor(x,y,w,h){
        var options = {
            isStatic:true
          }
          this.body = Bodies.rectangle(x,y,w,h,options)
          this.image = loadImage("assets/tower.png")
          this.w = w
          this.h = h
          this.x = x
          this.y = y
          World.add(world,this.body)
    }

    display(){
       // rectMode(CENTER)
       // rect(this.body.position.x,this.body.position.y,this.w,this.h) 
       imageMode(CENTER)
       image(this.image, this.body.position.x,this.body.position.y,this.w,this.h)
    }
}