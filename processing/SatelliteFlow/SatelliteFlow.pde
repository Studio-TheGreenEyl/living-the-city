// normalize vector
// kalman filter

import gab.opencv.*;
import processing.video.*;

OpenCV opencv;
Movie video;

Exporter exporter;

PGraphics input;
PGraphics intermediate;
PGraphics output;
PGraphics comp;
PImage p;

String appName = "sat-movie";
int FPS = 30;
int exportHowManyFrames = 445;
PVector pos;

float _kmFilteredValue;
float _kmEstError[] = new float[2];
float _kmProcessNoise;
float _kmSensorNoise;
float _kmPrevFiltered[] = new float[2];

boolean firstLoop = true;

void setup() {
  size(1704, 320);
  surface.setLocation(0, 0);
  input = createGraphics(568, 320);
  intermediate = createGraphics(568, 320);
  output = createGraphics(568, 320);
  comp = createGraphics(width, height);

  video = new Movie(this, "sample.mp4");
  opencv = new OpenCV(this, 568, 320);

  video.loop();
  video.play();  

  exporter = new Exporter(FPS);
  exporter.setPath(appName);
  exporter.setMode(1);
  exporter.setLimit(exportHowManyFrames);

  p = loadImage("map.png");
  pos = new PVector(p.width/2, p.height/2);
  
   //kalman sensitivitiy
  _kmFilteredValue = 0;
  _kmEstError[0] = 4;
  _kmEstError[1] = 4;
  _kmProcessNoise = 0.05;
  _kmSensorNoise = 7;
  //_kmPrevFiltered[[ = 0;
}

void draw() {
  // update
  background(0);
  calcInput();  
  calcIntermediate();
  calcOutput();

  // draw
  comp.beginDraw();
  comp.image(input, 0, 0);
  comp.image(intermediate, 568, 0);
  comp.image(output, 1136, 0);
  comp.endDraw();

  image(comp, 0, 0);  
  //exporter.export(comp);
}

void movieEvent(Movie m) {
  m.read();
  input.beginDraw();
  input.image(m, 0, 0);
  input.endDraw();
}


void calcInput() {
  opencv.loadImage(video);
  opencv.calculateOpticalFlow();
}

void calcIntermediate() {
  if (firstLoop) {
    firstLoop = false;
  } else { 
    PVector flow = opencv.getAverageFlow();
    int flowScale = 50;
    flow.normalize();

    float v = filtered(0, _kmPrevFiltered[0], flow.x, _kmProcessNoise, _kmSensorNoise);
    pos.x -= v*10;
    v = filtered(1, _kmPrevFiltered[1], flow.y, _kmProcessNoise, _kmSensorNoise);
    pos.y -= v*10;
    
    intermediate.beginDraw();
    intermediate.background(255);
    intermediate.translate(intermediate.width/2, intermediate.height/2);
    intermediate.line(0, 0, flow.x*flowScale, flow.y*flowScale);
    intermediate.endDraw();


  }
}

void calcOutput() {
  output.beginDraw();
  output.tint(255, 180);
  // motion blur attempt #1
  output.image(p.get((int)pos.x, (int)pos.y, 568, 320), 0, 0);
  output.endDraw();
}

float filtered(int i, float prev, float currentValue, float q, float r) {
  /*
    x filtered Value
   p estimated error
   q process noise
   k kalman gain?
   r sensor noise
   */
  _kmEstError[i] = _kmEstError[i] + q; 
  float k = _kmEstError[i]/(_kmEstError[i] + r);
  float x=prev+k*(currentValue-prev);
  _kmEstError[i] = (1-k) * _kmEstError[i];
  _kmPrevFiltered[i] = x;

  return x;
}
