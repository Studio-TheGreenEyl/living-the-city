void loadSettings() {
  
  File f = dataFile(filepath+"settings.txt");
  if (f.isFile()) {
    
    String[] lines;
    lines = loadStrings(filepath+"settings.txt");
    for (int i=0; i<lines.length; i++) {
      String[] _l = split(lines[i], '=');
      if (_l.length == 2) {
        if (trim(_l[0]).equals("volume")) volume = int(trim(_l[1]));
        if (trim(_l[0]).equals("primary")) primary = boolean(trim(_l[1]));
        if (trim(_l[0]).equals("broadcastIP")) broadcastIP = trim(_l[1]);
        if (trim(_l[0]).equals("port")) port = int(trim(_l[1]));
        if (trim(_l[0]).equals("globalVolume")) globalVol = int(trim(_l[1])) / 100.0;
        if (trim(_l[0]).equals("syncInterval")) syncInterval = int(trim(_l[1]));
      }
    }
    //println( "primary: \""+primary+"\" volume: "+volume+"\" globalVolume: "+globalVol+"\" pause: "+pause+"\" offset: "+offset+"\" syncInterval: "+syncInterval+"\" playlist: "+join(playlist, ", ") );

    settingsLoaded = true;
    setupUdp();
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



void send(String message) {
    if (!udpSet) return;
    println("→ message: " + message);
    
    udp.send( message, broadcastIP, port );
}

void sendSoundscape(String message) {
    if (!udpSet) return;
    println("→ message: " + message);
    
    message = message + ";\n";
    udp.send( message, broadcastIP, 6000 );
}

void receive( byte[] data, String ip, int port ) {  // <-- extended handler
  data = subset(data, 0, data.length);
  String message = new String( data );
  println("← incoming: " + message);
   
  
}
