this.game;
//Preload the assets so they appear on the screen as they should
function preload() {
    character = loadImage("Spaceship.png");
    backgroundImage = loadImage("spaceBackground.png");
    asteroid = loadImage("Asteroid Brown.png");
}

//Basic game setup. Only runs once.
function setup() {
    //Create the game canvas and the game and player objects
    let canvas = createCanvas(400, 500);
    canvas.parent('container');
    this.player = new Player(width / 2, 450);
    game = new Game(this.player);
}

//Draw is a p5 function that is run 30 times per second, allowing the screen to be 
//updated
function draw() {
    this.game.main();
}


//Input functions that had to be placed outside of game function due to the way P5 works.

//Change the current screen when the user clicks the mouse
//Function called automatically by P5 when mouse is pressed
function mousePressed() {
    if (this.game.getScreen() == 1 && mouseX <= 400 && mouseX >= 0 && mouseY <= 500 && mouseY > 0) {
        clear(); //P5 function. Clears the screen.
        let now = new Date();
        this.game.changeScreen(2, now);
    }
    if (this.game.getScreen() == 0 && mouseX <= 400 && mouseX >= 0 && mouseY <= 500 && mouseY > 0) {
        clear();
        this.game.updateInfo(3, 0, 1);
    }
}

//Shoot a bullet when the space bar is pressed
//Function called automatically by P5 when any key is pressed
function keyPressed() {
    if (keyIsDown(32) && this.game.screen == 2) {
        this.game.shoot();
    }
}