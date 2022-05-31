class Player {
    //Player initiated with a starting location.
    //Velcities determine how fast the player will move either left
    //or right
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocityRight = createVector(3, 0);
        this.velocityLeft = createVector(-3, 0);
    }

    //Displaye the player graphic at the players current location
    display() {
        imageMode(CENTER);
        fill(color(255, 0, 0));
        image(character, this.position.x, this.position.y, 50, 50);
    }

    //Update the location of the player when the movement keys are pressed
    update(left) {
        if (left) {
            this.position.add(this.velocityLeft);
        } else {
            this.position.add(this.velocityRight);
        }
    }

    //Returns the players X coordinate
    getX(){
        return this.position.x;
    }

    //Returns the players X coordinate.
    getY(){
        return this.position.y;
    }

}