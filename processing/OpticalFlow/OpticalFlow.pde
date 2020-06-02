import gab.opencv.*;
import processing.video.*;

Exporter exporter;

OpenCV opencv;
Movie video;

PGraphics pg;

String appName = "jianping-movie";
int FPS = 30;
int exportHowManyFrames = 445;

void setup() {
  size(1136, 320);
  video = new Movie(this, "sample.mp4");
  opencv = new OpenCV(this, 568, 320);
  video.loop();
  video.play();  
  
  exporter = new Exporter(FPS);
  exporter.setPath(appName);
  exporter.setMode(1);
  exporter.setLimit(exportHowManyFrames);
}

void draw() {
  background(0);
  opencv.loadImage(video);
  opencv.calculateOpticalFlow();

  image(video, 0, 0);
  translate(video.width,0);
  stroke(255,0,0);
  opencv.drawOpticalFlow();
  
  PVector aveFlow = opencv.getAverageFlow();
  int flowScale = 50;
  
  stroke(255);
  strokeWeight(2);
  line(video.width/2, video.height/2, video.width/2 + aveFlow.x*flowScale, video.height/2 + aveFlow.y*flowScale);
  
  exporter.export();
}

void movieEvent(Movie m) {
  m.read();
}
