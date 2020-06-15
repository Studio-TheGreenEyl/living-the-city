int imgX, imgY;
PImage img;

int mX, mY;

void setup() {
  size(800, 600);
  img = loadImage("image.jpg");
  centerImage();
}

void draw() {
  background(0);
  if (mousePressed) {
    imgX = mouseX-mX;
    imgY = mouseY-mY;
  }
  image(img, imgX, imgY);
}

void mousePressed() {
  mX = mouseX-imgX;
  mY = mouseY-imgY;
}

void keyPressed() {
  centerImage();
}

void centerImage() {
  imgX = (width-img.width)/2;
  imgY = (height-img.height)/2;
}
