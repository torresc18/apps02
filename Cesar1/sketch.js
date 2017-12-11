//Sets the objects that will be made further down in the code
var bird;
var pipes = [];
//draws the canvas and sets up the format for the code
function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}
//enables the code to be drawn
function draw() {
  background(0);

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
    }


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();
  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }
	
}
//When the mouse gets pressed, the bird will flap
function mousePressed(){
	
    bird.up();
    //console.log("SPACE");
  }

//creates the bird itself
function Bird() {
  this.y = height/2;
  this.x = 64;
//sets how high or low the bird will flap
  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {
    fill(30,50,140)  ;
    ellipse(this.x, this.y, 50, 38 );
  	ellipse(this.x+9, this.y-5 , 5,10);
		ellipse(this.x+28, this.y-1,10,5);		
		rect(this.x-10,this.y+5,15,23);
	
	}

  this.up = function() {
    this.velocity += this.lift;
  }
// 
  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

function Pipe() {
  this.top = random(height/2);
  this.bottom = random(height/2);
  this.x = width;
  this.w = 20;
  this.speed = 2;

  this.highlight = false;

  this.hits = function(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }
//Specifics into the shape of the obstacles
  this.show = function() {
    fill(10,233,2);
    if (this.highlight) {
      fill(3,34,0,54);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height-this.bottom, this.w, this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}