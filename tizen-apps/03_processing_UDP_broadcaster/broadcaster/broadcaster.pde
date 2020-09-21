/**
 * This is a simple sound file player. Use the mouse position to control playback
 * speed, amplitude and stereo panning.
 */


// import UDP library
import hypermedia.net.*;



UDP udp;  // define the UDP object

//SoundFile soundfile;
int position = 0;
boolean isLooping = true;
boolean isLoaded = false;
boolean settingsLoaded = false;
String filepath = "";
String[] playlist = {"vibraphon.aiff"};
String broadcastIP = null;
int volume = 100;
float globalVol = 1;
int port = 6000;
int offset = 0;
int pause = 1000;
int syncInterval = 100;
int index = 0;
boolean primary = false;
boolean udpSet = false;


void setup() {
  size(10,10);
  background(255);
  //frameRate(1000);
  //loadSound();
  
  
  loadSettings();
}      

void loadSettings() {
  
  File f = dataFile(filepath+"settings.txt");
  if (f.isFile()) {
    
    String[] lines;
    lines = loadStrings(filepath+"settings.txt");
    for (int i=0; i<lines.length; i++) {
      String[] _l = split(lines[i], '=');
      if (_l.length == 2) {
        if (trim(_l[0]).equals("playlist")) playlist = split(trim(_l[1]),',');
        if (trim(_l[0]).equals("volume")) volume = int(trim(_l[1]));
        if (trim(_l[0]).equals("pause")) pause = int(trim(_l[1]));
        if (trim(_l[0]).equals("primary")) primary = boolean(trim(_l[1]));
        if (trim(_l[0]).equals("broadcastIP")) broadcastIP = trim(_l[1]);
        if (trim(_l[0]).equals("port")) port = int(trim(_l[1]));
        if (trim(_l[0]).equals("offset")) offset = int(trim(_l[1]));
        if (trim(_l[0]).equals("globalVolume")) globalVol = int(trim(_l[1])) / 100.0;
        if (trim(_l[0]).equals("syncInterval")) syncInterval = int(trim(_l[1]));
      }
    }
    println( "primary: \""+primary+"\" volume: "+volume+"\" globalVolume: "+globalVol+"\" pause: "+pause+"\" offset: "+offset+"\" syncInterval: "+syncInterval+"\" playlist: "+join(playlist, ", ") );

    settingsLoaded = true;
    setupUdp();
  }
  loadSound();
}

void draw() {
  if (!settingsLoaded) loadSettings();
  
  
  send("vol-20");
}

void loadSound() {
    if (index > playlist.length) return;
    File f = dataFile(filepath+playlist[index]);
    if (f.isFile()) {
      // Load a soundfile

      println("try loading "+(filepath+playlist[index]));

    

      setVolume(75);
      
      //soundfile.play();
      isLoaded = true;
      
    }
}

void setupUdp() {

  // create a new datagram connection on port 6000
  // and wait for incomming message
  if (udpSet) udp.close();
  udp = new UDP( this, port );
  //udp.log( true );     // <-- printout the connection activity
  udp.listen( true );
  udp.broadcast(true);
  println("SETUP UDP [IP: "+broadcastIP+", port: "+port+", broadcast: "+udp.isBroadcast()+"]");
  udpSet = true;
}

void reload() {
    println( "reload" );

    settingsLoaded = false;
    draw();
}

void setVolume(int _v) {
    volume = _v;
    float _newV = volume / 100.0 * globalVol;
    println( "volume: "+volume+"set to "+_newV );

}

/** 
 * on key pressed event:
 * send the current key value over the network
 */
void send(String message) {
    if (!udpSet) return;
    println("message: " + message);
    // formats the message for Pd
    message = message+";\n";
    // send the message
    udp.send( message, broadcastIP, port );
    //udp.send( message);
    
}

/**
 * To perform any action on datagram reception, you need to implement this 
 * handler in your code. This method will be automatically called by the UDP 
 * object each time he receive a nonnull message.
 * By default, this method have just one argument (the received message as 
 * byte[] array), but in addition, two arguments (representing in order the 
 * sender IP address and his port) can be set like below.
 */
// void receive( byte[] data ) {       // <-- default handler
void receive( byte[] data, String ip, int port ) {  // <-- extended handler
  
  
  // get the "real" message =
  // forget the ";\n" at the end <-- !!! only for a communication with Pd !!!
  data = subset(data, 0, data.length-2);
  String message = new String( data );
  String [] _m = split(message, "-");
  if (_m.length == 2 && trim(_m[0]).equals("vol")) {
    setVolume(int(_m[1]));
  } else if (trim(message).equals("reload")) {
    reload();
  }
  
  if (!primary && isLoaded) {
    _m = split(message, ":");
    if (_m.length == 4 && _m[0].equals("sync")) {
      //println( "cue: \""+_m[1]+"\" time: "+_m[2] );
      float _f = float(_m[1]);
      long _t = Long.parseLong(_m[2]);
      
//      float currentTime = soundfile.position();
      long timeMillis = System.currentTimeMillis();
      float timeDiff = (timeMillis - _t + offset) /1000.0;
      float targetTime = _f + timeDiff;
  //    targetTime %= soundfile.duration();
      
    //  float _tDiff = targetTime - currentTime;
     
    }
  }
  // print the result
  //println( "receive: \""+message+"\" from "+ip+" on port "+port );
}


void keyPressed() {
    
    switch( key ) {
      case 'r':
        send("reload");
        break;
      case '1':
        send("vol-10");
        break;
      case '2':
        send("vol-20");
        break;
      case '3':
        send("vol-30");
        break;
      case '4':
        send("vol-40");
        break;
      case '5':
        send("vol-50");
        break;
      case '6':
        send("vol-60");
        break;
      case '7':
        send("vol-70");
        break;
      case '8':
        send("vol-80");
        break;
      case '9':
        send("vol-90");
        break;
      case '0':
        send("vol-0");
        break;
      case ' ':
        send("vol-100");
        break;
        
    }   
}
