Map map;
String map_fn = "map.png";
String json_fn = "data.json";
// eventuell data.json auch als URL ablegen, sodass von einem zentralen content server sich die pads
// den inhalt cachen können

/*
  zoomstufen
*/

void setup() {
  size(2000, 1000, P2D);
  surface.setLocation(0, 0);
  map = new Map(this, map_fn, json_fn);
}

void draw() {
  //map.display();
  background(255);
  map.update();
  image(map.output(), 0, 0);
  
}




// dumb shit after this line 
// -----------------------------------------------

void keyPressed() {
  int inc = 50;
  if(key == CODED) {
    if (keyCode == LEFT) {
      map.setPosition(-inc, 0);
       
    } else if(keyCode == RIGHT) {
      map.setPosition(inc, 0);
    } else if(keyCode == UP) {
      map.setPosition(0, -inc);
    } else if(keyCode == DOWN) {
      map.setPosition(0, inc);
    }
   
  }
}

void movieEvent(Movie m) {
  m.read();
}
