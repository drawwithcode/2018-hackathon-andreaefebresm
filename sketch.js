var maintheme;
var amp;
var toggle = true;
var img;
var button;
// var h = height;
// var w = width;
var volume = 0;
var xoff = 0;
var xnn = 0;
var glx;
var stars = [];
var stelline = [];

function preload() {
  maintheme = loadSound("./assets/Big Bang Theory - Sigla iniziale.mp3");
  img = loadImage("./assets/bbt.jpg");
  glx = loadImage("./assets/Galaxy-Free-Download-PNG.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(66, 66, 66);


  // button
  button = createButton("play");
  button.style('padding', '30px');
  button.position(windowWidth * 1 / 5, windowHeight * 3 / 4);
  button.mousePressed(togglePlaying);

  var starsNumber = 200;
  for (var i = 0; i < starsNumber; i++) {

    var myStar = new Stella(random(0, width), random(0, height), random(2, 10));


    stars.push(myStar);

  }

  var stellineNumber = 10;
  for (var i = 0; i < stellineNumber; i++) {

    var myStellina = new Stelline(random(0, width), random(0, height), volume*5);


    stelline.push(myStellina);

  }


  analyzer = new p5.Amplitude();
  analyzer.setInput(maintheme);
  var volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 50, width);
}

function togglePlaying() {
  if (!maintheme.isPlaying()) {
    maintheme.play();
    button.html("pause");
    // song.setVolume(0.3);
  } else {
    maintheme.stop();
    button.html("play");

  }
}



function draw() {

  var volume = analyzer.getLevel();

  if (!maintheme.isPlaying()) {
    var title = 'HACKATON';
    var date = '28.11.18';
    var name = 'Andrea ELena Febres Medina';
    var theme = 'The Big';
    var theme1 = 'Bang'
    var theme2 = 'Theory'
    noStroke();
    image(img, 0, 0, windowWidth, windowHeight);
    textSize(windowWidth / 50);
    textFont('Asap Condensed');
    fill('white')
    text(title, windowWidth / 5.5, windowHeight / 3);

    textSize(windowWidth / 37)
    text(date, windowWidth / 5.5, windowHeight / 3.5);

    textSize(windowWidth / 130)
    text(name, windowWidth / 5.5, windowHeight / 2.7);


    fill('#FEC601');
    textSize(windowWidth / 17)
    text(theme1, windowWidth / 6, windowHeight / 1.8);
    fill('white')
    textSize(windowWidth / 35)
    text(theme, windowWidth / 5.5, windowHeight / 2);
    textSize(windowWidth / 35)
    text(theme2, windowWidth / 5.5, windowHeight / 1.7);

  } else {

    background(66, 66, 66);

    volume = map(volume, 0, 1, 50, width);
    var n = map(noise(xoff), 0, 1, 0, width);
    var m = map(noise(xnn), 0, 1, 0, volume);
    for (var k = 0; k < stelline.length; k++) {

      stelline[k].move();
      stelline[k].display();
    }



    push();
    translate(width / 2, height / 2);
    rotate(frameCount);
    noFill();
    strokeWeight(4);
    stroke(lerpColor(color('#FEC601'), color(66, 66, 66), frameCount / 300));
    ellipse(100, 0, windowHeight / 2, m);
    pop();

    push();
    translate(width / 2, height / 2);
    rotate(volume*3);
    strokeWeight(2);
    stroke(lerpColor(color(66,66,66), color('#FCB5B5'),frameCount/1000));
    line(200,0,cos(frameCount*2)*200,sin(frameCount*2)*200);
    pop();

    push();
    translate(width / 2, height / 2);
    rotate(volume*100);
    strokeWeight(4);
    stroke(lerpColor(color('#4D5359'), color('#FCB5B5'),frameCount/120));
    line(200,0,cos(frameCount)*200,sin(frameCount*2)*200);
    pop();

    push();
    translate(width / 2, height / 2);
    rotate(volume*4);
    strokeWeight(2);
    stroke(lerpColor(color('#4D5359'), color('white'),frameCount/120));
    line(200,0,cos(frameCount*5)*200,sin(frameCount*1)*200);
    pop();

    fill('#FCB5B5')
    noStroke();
    ellipse(random(0,width),random(0,height),volume/4);
    fill('#4D5359')
    noStroke();
    ellipse(random(0,width),random(0,height),volume/10);
    fill('#FEC601')
    noStroke();
    ellipse(random(0,width),random(0,height),volume/4);
    fill('#4D5359')
    noStroke();
    ellipse(random(0,width),random(0,height),volume/8);

    // translate(width / 2, height / 2);
    // rotate(volume*4);
    // sphere(50);
    for (var j = 0; j < stars.length; j++) {
      translate(width / 2, height / 2);
      rotate(volume*3);
      stars[j].move();
      stars[j].display();
    }


  }


}

function Stella(_x, _y, _diameter) {

  this.size = _diameter;
  this.x = _x;
  this.y = _y;

  this.color = lerpColor(color(66, 66, 66), color('white'), millis(10));
  this.speed = 1;
  this.stroke = 'white';

  this.yDir = 10;
  this.xDir = 10;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);

    if (this.y >= height || this.y <= 0) {

      this.yDir *= -0.5;
    }

    if (this.x >= width || this.x <= 0) {
      this.xDir *= -0.5;
    }

    this.display = function() {
      stroke(this.stroke);
      fill(this.color);
      ellipse(this.x, this.y, this.size);
    }
  }
}

function Stelline(_x, _y, _diameter) {

  this.size = _diameter;
  this.x = _x;
  this.y = _y;

  this.color = lerpColor(color(66, 66, 66), color('white'), millis(10));
  this.speed = 1;
  this.stroke = 'white';

  this.yDir = 10;
  this.xDir = 10;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);

    if (this.y >= height || this.y <= 0) {

      this.yDir *= -0.5;
    }

    if (this.x >= width || this.x <= 0) {
      this.xDir *= -0.5;
    }

    this.display = function() {
      stroke(this.stroke);
      fill(this.color);
      ellipse(this.x, this.y, this.size);
    }
  }
}

function windowResized() {
  resizeCanvas(width, height);
}
