// import UDP library
import hypermedia.net.*;
UDP udp;  // define the UDP object

//SoundFile soundfile;
boolean settingsLoaded = false;
String filepath = "";
String broadcastIP = null;
int volume = 100;
float globalVol = 1;
int port = 5000;

int index = 0;
boolean primary = false;
boolean udpSet = false;

String hostURL = "http://192.168.15.2/server_event.php";
String[] lines;
long timestamp = 0;
long syncInterval = 6000;
String[] split;
String toSend = "";

PFont font;

void setup() {
  size(260,130);
  surface.setLocation(0, 0);
  background(255);
  loadSettings();
  font = loadFont("LKEuropaGroteskCity-Medium-16.vlw");
  textFont(font, 16);
}

void draw() {
  
  if (!settingsLoaded) loadSettings();
  if(millis() - timestamp > syncInterval) {
    background(0);
    text("Broadcaster", 10, 20);
    timestamp = millis();
    lines = loadStrings(hostURL);
    
    for (int i = 0 ; i < lines.length; i++) {
      if(lines[i].length() > 0) {
        split = split(lines[i], ":");
        if(split[0].equals("data")) {
         toSend = trim(split[1]);
         send(toSend);
         text("Volume: " + toSend, 10, 40);
        }
      }
    }
    
    lines = loadStrings(hostURL+"?output=soundscape.txt");
    for (int i = 0 ; i < lines.length; i++) {
      if(lines[i].length() > 0) {
        split = split(lines[i], ":");
        if(split[0].equals("data")) {
         toSend = trim(split[1]);
         send(toSend);
         text("Soundscape: " + toSend, 10, 60);
        }
      }
    }
    
  }  
}
