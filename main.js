var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

//varibles 
var circle, floor, longLine, shortLine, 
handle1, handle2, randMinuts, randHours, TimeDisplay, Score,
shortTouch, longTouch;

var time; // for dev

var button;

// variable for correct answers
var user_answers = [];

function preload() {
  // loading images 
  game.load.spritesheet('balls', 'assets/balls.png', 17, 17);
  game.load.spritesheet('clock', 'assets/clock1.png', 398, 400);
  game.load.spritesheet('ScoreSym', 'assets/symbols.gif', 60, 60);
  game.load.spritesheet('button', 'assets/button.png', 192, 71);
  game.load.spritesheet('test', 'assets/longIndicator.png', 10, 159);
}

function create() {
    //creating lines

    longLine = new Phaser.Line();
    shortLine = new Phaser.Line();
    
    // add clock

    clock = game.add.sprite(200, 100, 'clock', 1);

    /* Comment */

    // var graphics = new Phaser.Graphics(game, 350, 350);
    //     graphics.beginFill(0xFF3300);
    //     graphics.lineStyle(10, 0xffd900, 1);
            
    //     // draw a shape
    //     graphics.moveTo(100,0);
    //     graphics.lineTo(100, 200);
    //     graphics.endFill();
    //     this.__graphics = graphics;
    //     var texture = graphics.generateTexture();

    //     var sprite = game.add.sprite(400, 200, texture);
    //     sprite.anchor.set(0.5);
    //     sprite.inputEnabled = true;
    //     sprite.input.enableDrag(true);
    //     // Required because the hit is bigger, maybe a bug?
    //     sprite.hitArea = new Phaser.Line(150, 150, 120, 50);
    //     this.__sprite = sprite;

    
    indicatorLong = createHandler(400, 100, 0);
    indicatorShort = createHandler(400, 200, 1); 

    //generating hours and minutes
    randMinuts = MathClock.ranGenerator(0, 60);
    randHours = MathClock.ranGenerator(0, 12);

    button = game.add.button(20,450, 'button', actionOnClick, this, 2, 1, 0);

    var style = Display.textDisplay(); 
    TimeDisplay = game.add.text(20, 100, "- Please correct time \n "
    + randHours + " hours " + randMinuts + "minuts", style);

    Score = game.add.text(650, 100, "Score:",style);

    time = game.add.text(20, 200, "- Hour: 0 \n " +
            "Minuts: 0" ,style);

}

function render() {
    //displaying lines
    game.debug.geom(longLine);
    game.debug.geom(shortLine);
}

function update() {

    shortLine.fromSprite(indicatorShort, {x:400, y: 300}, false);     
    longLine.fromSprite(indicatorLong, {x:400, y: 300}, false);
    
}

function createHandler(x, y, num) {
    var handler = game.add.sprite(x, y, 'balls', num);
    handler.anchor.set(0.5);
    handler.inputEnabled = true;
    handler.input.enableDrag(true);
    return handler;
}
function actionOnClick() {

    // geting the degress
    var degress = MathClock.toDegress( shortLine.angle );
    var degress2 = MathClock.toDegress( longLine.angle);

    var minuts = MathClock.degToSec( degress2 );
    var hour = MathClock.degToHour( degress );
    
    // checking on mouse down
    var style = Display.textDisplay(); 
    
    time.setText("- Hour: " + hour + " \n " + "Minuts: " + minuts);
    
    Logic.isRight(hour, minuts);
}
