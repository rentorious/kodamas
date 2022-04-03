/*
 * ToDo in this project:
 * 1. add sound
 * 2. add procedural shapes so I can create and aarmy of kodamas
 * 3. fine tune the animation
 * 4. fine tune sound (add reverb and ambient effects)
 */

const FR = 18;

let BG_IMG;
let BODY_IMG;
let HEAD_IMG;

let head;

class Actor {
  constructor(x, y, spriteImg) {
    this.x = x;
    this.y = y;
    this.sprite = spriteImg;
  }

  draw() {
    this.rotate(this.rotation);
  }
}

class Head extends Actor {
  constructor(x, y, rotation, spriteImg) {
    super(x, y, spriteImg);
    this.rotation = rotation;
    this.initalRotation = rotation;

    this.windupAngle = Math.random() * PI;
    this.maxBobAngle = (Math.random() * PI) / 3.14; // NOTE: mozda moze i neka druga vrednost, 90 mi je mozda previse
    this.minBobAngle = (Math.random() * PI) / 8;
    this.bobRange = this.maxBobAngle - this.minBobAngle;
    this.numOfBobs = Math.floor(Math.random() * 15) + 10;
    this.bobCounter = 0;

    this.windupSeconds = Math.random() * 3 + 1; // max one second
    this.windupFrames = this.windupSeconds * FR;

    this.windupCounter = 0;
  }

  setRotaion(angle) {
    this.rotation = angle;
  }

  rotateByAngle(angle) {
    // radians
    translate(this.x, this.y);
    rotate(angle);
  }

  rotate() {
    translate(this.x, this.y);
    rotate(this.rotation);
  }

  drawBobbing() {
    if (this.bobCounter >= this.numOfBobs) {
      this.reset();
    } else {
      // on even go down
      const newRotation = Math.random() * this.bobRange + this.minBobAngle;
      this.rotation = this.bobCounter % 2 == 0 ? newRotation : -newRotation;
    }
    this.bobCounter++;

    this.rotate();
    image(this.sprite, 0, 0);
  }

  drawWindup() {
    console.log(this.rotation);
    this.rotation += this.windupAngle / this.windupFrames;
    this.rotate();

    image(this.sprite, 0, 0);

    this.windupCounter++;
  }

  draw() {
    push();
    imageMode(CENTER);

    if (this.windupCounter < this.windupFrames) {
      this.drawWindup();
      this.windupCounter++;
    } else this.drawBobbing();

    pop();
  }

  reset() {
    this.rotation = this.initalRotation;
    this.windupCounter = 0;
    this.bobCounter = 0;
  }
}

function preload() {
  BG_IMG = loadImage("./resources/images/background.png");
  BODY_IMG = loadImage("./resources/images/body.png");
  HEAD_IMG = loadImage("./resources/images/head.png");
}

function setup() {
  head = new Head(700, 290, 0, HEAD_IMG);

  frameRate(FR);
  createCanvas(1440, 810);
}

function draw() {
  background(BG_IMG);
  image(BODY_IMG, 600, 310);

  head.draw();
}
