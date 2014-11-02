var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

//varibles 
var circle, floor, longLine, shortLine, 
handle1, handle2, randMinuts, randHours, TimeDisplay, Score,
shortTouch, longTouch;
// variable for correct answers
var user_answers = [];

function preload() {
  // loading images 
  game.load.spritesheet('balls', 'assets/balls.png', 17, 17);
  game.load.spritesheet('clock', 'assets/clock1.png', 398, 400);
  game.load.spritesheet('true', 'assets/symbols.gif', 60, 60);
  game.load.spritesheet('false', 'assets/symbols.gif', 60,60);
}

function create() {
    //creating lines
    longLine = new Phaser.Line();
    shortLine = new Phaser.Line();

    // background = game.add.tileSprite(0, 0, 800, 600, 'background');
    // add clock
    clock = game.add.sprite(200, 100, 'clock', 1);
    indicatorLong = createHandler(400, 100);
    indicatorShort = createHandler(400, 200); 

    //generating hours and minutes
        randMinuts = MathClock.ranGenerator(0, 60);
        randHours = MathClock.ranGenerator(0, 12);

        var style = { font: "18px Arial", fill: "#ff0044", align: "center" };
        TimeDisplay = game.add.text(20, 100, "- Please correct time \n "
            + randHours + " hours " + randMinuts + "minuts", style);

        Score = game.add.text(650, 100, "Score:",style);

}
function render() {
    //displaying lines
    game.debug.geom(longLine);
    game.debug.geom(shortLine);
}

function update() {

    shortLine.fromSprite(indicatorShort, {x:400, y: 300}, false);     
    longLine.fromSprite(indicatorLong, {x:400, y: 300}, false);
    // geting the degress
    var degress = MathClock.toDegress( shortLine.angle );
    var degress2 = MathClock.toDegress( longLine.angle);

    var minuts = MathClock.degToSec( degress2 );
    var hour = MathClock.degToHour( degress );

    //checking if every thing is right
    var shortTouch = indicatorShort.input.pointerUp();
    var longTouch = indicatorLong.input.pointerUp();
    
    // checking on mouse down
    if(shortTouch && longTouch){
        Roules.isRight(hour, minuts, game);
        indicatorShort.input.reset();
        indicatorLong.input.reset();
        indicatorShort.input.start();
        indicatorLong.input.start();
    }
}

function createHandler(x, y) {
    var handler = game.add.sprite(x, y, 'balls', 0);
    handler.anchor.set(0.5);
    handler.inputEnabled = true;
    handler.input.enableDrag(true);
    return handler;
}
