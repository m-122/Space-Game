class Game {
    constructor(player) {
        this.player = player;
        this.bullets = [];
        this.enemies = [];
        this.lives = 3;
        this.score = 0;
        this.screen = 1;
        this.maxEnemies = 1;
        this.spawnRate = 5000;
        this.time = null;
        this.dificulty = 0;
    }

    //Main game function, controls the game screen state
    main() {
        switch (this.screen) {
            case 1:
                this.startMenu();
                break;
            case 2:
                imageMode(CORNER)
                background(backgroundImage);

                //The following must be updated on every draw cycle
                this.player.display();
                this.move();
                this.collisionDetection();
                this.textOnScreen();

                //loop through array of bulletsand re-draw them to the screen in their current positions
                for (let b of this.bullets) {
                    b.show()
                }
                //loop through array of enemies and re-draw them to the screen in their current positions
                for (let e of this.enemies) {
                    e.show();
                }

                //Re-evaluate the dificulty of the game
                this.determineDificulty();

                //Spawn a new enemy every "spawnRate" millisecconds.
                setInterval(this.generateEnemies(), this.spawnRate);
                break;
            case 0:
                //Add a time survived message 
                this.gameOver();
                break;
        }
    }

    //Shoot a bullet when the space bar is pressed
    shoot() {
        this.bullets.push(new Bullet(this.player.getX(), this.player.getY()));
    }

    //Resets the game information after a game over
    updateInfo(lives, score, screen) {
        this.lives = lives;
        this.score = score;
        this.screen = screen;
    }

    //Controlls player movement 
    move() {
        if (keyIsDown(LEFT_ARROW) && this.player.getX() > 10) {
            this.player.update(true);
        }
        if (keyIsDown(RIGHT_ARROW) && this.player.getX() < width - 10) {
            this.player.update(false);
        }
    }

    //Detects collision between player, enemies and bullets
    collisionDetection() {
        //Collision detection between players bullets and enemies
        for (let e of this.enemies) {
            for (let b of this.bullets) {
                rectMode(CENTER);
                let hit = collideCircleCircle(e.getX(), e.getY(), 45, b.getX(), b.getY(), 8);
                
                if (hit == true) {
                    this.enemies.splice(this.enemies.indexOf(e), 1);
                    this.bullets.splice(this.bullets.indexOf(b), 1);
                    this.score += 5;
                }
            }
        }
        //Collision detection between player and enemies.
        for (let e of this.enemies) {
            let attack = collideCircleCircle(this.player.getX(), this.player.getY(), 40, e.getX(), e.getY(), 40);
            if (attack == true) {
                this.enemies.splice(this.enemies.indexOf(e), 1);
                this.lives -= 1;
            }
        }

        //If player runs out of lives, screen is set to 0 (game over screen)
        if (this.lives <= 0) {
            //Calculate how long the player has survived for in seconds
            let now = new Date();
            let timeSurvivedSecs = Math.floor((now - this.time) / 1000);
            this.changeScreen(0, timeSurvivedSecs);
        }
    }

    //Spawns a new enemy when needed
    generateEnemies() {
        if (this.enemies.length < this.maxEnemies) {
            this.enemies.push(new Enemy(random(width), 0, 3 + this.dificulty));
        }
    }

    //The longer the player survives, the harder the game gets.
    //Highest dificulty reached at 40 seconds.
    determineDificulty() {
        let now = new Date();
        let currTimeSurvived = Math.floor((now - this.time) / 1000);

        switch (true) {
            case currTimeSurvived >= 10 && currTimeSurvived < 20:
                this.dificulty = 1;
                break;
            case currTimeSurvived >= 20 && currTimeSurvived < 30:
                this.dificulty = 1.5;
                break;
            case currTimeSurvived >= 30 && currTimeSurvived < 40:
                this.dificulty = 2;
                break;
            case currTimeSurvived >= 40:
                this.dificulty = 2.5;
                this.maxEnemies = 2;
                break;
        }
    }

    //Controls the look of the text on the screen
    textOnScreen() {
        fill(0, 0, 255);
        textSize(20);
        textStyle(BOLD);
        textAlign(LEFT);

        text("Score:", 300, 20);
        text(this.score, 365, 20);

        text("Lives:", 10, 20);
        text(this.lives, 70, 20);
    }

    //Controls the start menus apperance
    startMenu() {
        imageMode(CORNER);
        background(backgroundImage);

        textAlign(CENTER);
        textStyle(BOLD);
        textSize(50);
        fill(0, 0, 255);
        text("Click to play!", 200, 200);
    }

    //Controls the apperance of the game over screen
    gameOver() {
        background(0);
        textAlign(CENTER);
        textStyle(BOLD);

        textSize(30);
        fill(255, 0, 0);
        text("GAME OVER", 200, 200);

        textSize(15);
        let timeStr = "TIME SURVIVED: " + this.time + " SECS";
        text(timeStr, 200, 270);
        text("Click to continue", 200, 300);
    }

    //Changes the game to a different scree. Also responsible for updating the game time
    changeScreen(screen, time) {
        this.screen = screen;
        this.time = time;
    }

    //Return the game screen state
    getScreen() {
        return this.screen;
    }
}

