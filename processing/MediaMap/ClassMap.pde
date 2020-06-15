import processing.video.*;

class Map {
  PGraphics intermediate;
  PGraphics output;
  JSONObject json;
  PImage p;
  ArrayList<Integration> integration = new ArrayList<Integration>();
  
  int hitBox = 280;
  
  PVector mapPosition;
  PApplet pa;
  
  public Map(PApplet _pa, String map_fn, String json_fn) {
    pa = _pa;
    json = loadJSONObject("data/" + json_fn);
    p = loadImage(map_fn);
    intermediate = createGraphics(p.width, p.height, P2D);
    output = createGraphics(width, height, P2D);
    mapPosition = new PVector(0, 0);
    
    println(p.width + " / " + p.height);
    println(json + "\r\n\r\n---- \r\n \r\n");
    
    
    JSONArray points = json.getJSONArray("points");
    for (int i = 0; i < points.size(); i++) {
      JSONObject poi = points.getJSONObject(i); 
      int id = poi.getInt("id");
      int x = poi.getInt("x");
      int y = poi.getInt("y");
      String name = poi.getString("name");
      String type = poi.getString("type");
      String file = poi.getString("file");
      integration.add(new Integration(pa, id, x, y, name, type, file));
    }
    
  }
  
  void update() {
    calcIntermediate();
  }
  
  void calcIntermediate() {
    intermediate.rectMode(CENTER);
    
    intermediate.beginDraw();
    intermediate.image(p, 0, 0);
    displayPOIs(intermediate);
    intermediate.endDraw();
  }
  
  void display() {
    image(p, 0, 0);
  }
  
  void collisionDetection() {
    // implementation rect vs circle
  }
  
  PImage output() {
    
    PImage _p = intermediate.get((int)mapPosition.x, (int)mapPosition.y, width, height);
    output.beginDraw();
    output.image(_p, 0, 0);
    output.endDraw();
    return output;
  }
  
  void displayPOIs(PGraphics buffer) {
    for(int i = 0; i<integration.size(); i++) integration.get(i).display(buffer);
  }
  
  void setPosition(int x, int y) {
    mapPosition.x += x;
    mapPosition.y += y;
  }
  
  class Integration {
    // this class allows visitors to interact with media
    // the media is fixed at x and y position on the map
    int id;
    int x;
    int y;
    String name;
    String type;
    String file;
    PImage image;
    Movie movie;
    PApplet pa;
    
    public Integration(PApplet _pa, int _id, int _x, int _y, String _name, String _type, String _file) {
      id = _id;
      x = _x;
      y = _y;
      name = _name;
      type = _type;
      file = _file;
      pa = _pa;
      if(type.equals("image")) {
        image = loadImage("data/media/" + file);
      } else if(type.equals("video")) {
        movie = new Movie(pa, "media/" + file);
        movie.loop();
      }
      println(x + " / " + y);
      
      
    }
    
    void display(PGraphics buffer) {
      buffer.push();
      if(type.equals("empty")) {
        buffer.push();
        buffer.translate(x, y);
        buffer.fill(255, 0, 0, 125);
        buffer.noStroke();
        buffer.rect(0, 0, hitBox, hitBox);
        buffer.pop();
      } else if(type.equals("image")) {
        buffer.push();
        buffer.translate(x, y);
        buffer.imageMode(CENTER);
        buffer.image(image, 0, 0);
        buffer.pop();
      } else if(type.equals("video")) {
        //if (movie.available() == true) {
          buffer.push();
          buffer.translate(x, y);
          buffer.imageMode(CENTER);
          buffer.image(movie, 0, 0);
          buffer.pop();
        //}
      }
      buffer.pop();
    }
    
  }
}
