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

String hostURL = "http://192.168.15.2/apps/ltc-interface/server_event.php";
String[] lines;
long timestamp = 0;
long syncInterval = 2000;
String[] split;
String toSend = "";

void setup() {
  size(10,10);
  surface.setLocation(0, 0);
  background(255);
  loadSettings();
  
  
  

}

void draw() {
  if (!settingsLoaded) loadSettings();
  if(millis() - timestamp > syncInterval) {
    timestamp = millis();
    lines = loadStrings(hostURL);
    for (int i = 0 ; i < lines.length; i++) {
      if(lines[i].length() > 0) {
        split = split(lines[i], ":");
        if(split[0].equals("data")) {
         toSend = trim(split[1]);
         send(toSend);
        }
      }
    }
  }  
}
