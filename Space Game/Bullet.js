class Bullet {

  //Each bullet initiated with an x and y coordinate.
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, -8);
  }

  //Shows the bullet in its current position on the screen
  show() {
    fill(color(255, 0, 0));
    this.position.add(this.velocity);
    ellipse(this.position.x, this.position.y, 8);
    
    if (this.position.y < 0) {
      game.bullets.splice(game.bullets.indexOf(this), 1);
    }
  }

  //Returns the current X coordinate
  getX() {
    return this.position.x;
  }

  //Returns the current Y coordinate
  getY() {
    return this.position.y;
  }
}