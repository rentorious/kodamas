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

    this.windupAngle = Math.random() * PI;
    this.maxBobAngle = (Math.random() * PI) / 3; // NOTE: mozda moze i neka druga vrednost, 90 mi je mozda previse
    this.numOfBobs = Math.random() * 20;
  }

  setRotaion(angle) {
    this.rotation = angle;
  }

  rotate(angle) {
    translate(this.x, this.y);
    rotate(this.rotation);
  }

  draw() {
    push();
    imageMode(CENTER);
    this.rotate(this.rotation);
    image(this.sprite, 0, 0);
    pop();
  }
}

function preload() {}

function setup() {
  BG_IMG = loadImage("./resources/images/background.png");
  BODY_IMG = loadImage("./resources/images/body.png");
  HEAD_IMG = loadImage("./resources/images/head.png");
  createCanvas(1440, 810);
  head = new Head(700, 290, 0, HEAD_IMG);
}

function draw() {
  background(BG_IMG);
  image(BODY_IMG, 600, 310);

  head.setRotaion(radians(frameCount));
  head.draw();
}
