class Enemy {
    //Each enemy initiated with an X an Y coordinate and a dificulty
    //which will determine how fast the enemy is moving.
    constructor(x, y, dificulty) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, dificulty);
    }

    //Shows the enemy at its current location on the screen
    show() {
        imageMode(CENTER);
        fill(0, 0, 100);
        this.position.add(this.velocity);
        image(asteroid, this.position.x, this.position.y, 50, 50);

        if (this.position.y > height) {
            game.enemies.splice(game.enemies.indexOf(this), 1);
        }
    }

    //Returns the enemys X coordinate
    getX() {
        return this.position.x;
    }

    //returns the enemys Y coordinate
    getY() {
        return this.position.y;
    }
}