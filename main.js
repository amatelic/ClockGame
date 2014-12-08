var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

//varibles 
var circleLong,circleShort, TimeDisplay, Score, button;
var hourArrow = 12;
var minutArrow = 60;


// variable for correct answers
var user_answers = [];
var shortArrows;
var platform;

function preload() {
  // loading images 
  game.load.spritesheet('clock', 'assets/clock1.png', 398, 400);
  game.load.spritesheet('ScoreSym', 'assets/symbols.gif', 60, 60);
  game.load.spritesheet('button', 'assets/button.png', 192, 71);
  game.load.spritesheet('shortArrow', 'assets/shortIndicator.gif', 10, 85);
  game.load.spritesheet('longArrow', 'assets/longIndicator.gif', 10, 150);
}

function create() {
         
    // change background color

    this.game.stage.backgroundColor = '#6d84b4';

    // add clock

    clock = game.add.sprite(200, 100, 'clock', 1);
    var shortArrow = {
      x: 400,
      y: 295,
      sprite: "shortArrow"
    };
    var longArrow = {
      x: 400,
      y: 295,
      sprite: "longArrow"
    };

    // Creating hit area
    circleShort = new Phaser.Circle(game.world.centerX, game.world.centerY, 180);
    circleLong = new Phaser.Circle(game.world.centerX, game.world.centerY, 390);

    /* Creating long and short arrows */
    longArrows = positionArrows(longArrow, 12, 30);
    shortArrows = positionArrows(shortArrow, 12, 30);
    // display first sprite and hide all the others
    displaySprite(shortArrows, 12);
    displaySprite(longArrows, 12);

    //generating hours and minutes
    Logic.chooseNumbers(2); 

    button = game.add.button(10,420, 'button', actionOnClick, this, 0, 0, 0);
    button1 = game.add.button(600,420, 'button', actionOnClick, this, 0, 0, 0);
    button2 = game.add.button(10,120, 'button', actionOnClick, this, 0, 0, 0);

    var style = Display.textDisplay(); 
    TimeDisplay = game.add.text(20, 60, "- Nastavi kazalec na uri za čas "
    + Display.Digital(randHours) + " : " + Display.Digital(randMinuts), style);

    game.input.onDown.add(onTouche, this);
}

function render() {

    // game.debug.geom(circleShort,'#cfffff');
    // game.debug.geom(circleLong,'#aabbcc');
    // game.debug.text('Diameter : '+circle.diameter,50,200);
    // game.debug.text('Circumference : '+circle.circumference(),50,230);

}

function update() {
}

function actionOnClick() {

    Logic.isRight(hourArrow, minutArrow);
}

function positionArrows( object, number, angle ) {
  var arrowSprites = [],
    increment = angle;
  for (var i = 1; i <= number; i++) {
        arrowSprites[i] = game.add.sprite(object.x, object.y, object.sprite, 0);
        arrowSprites[i].anchor.setTo(0.5, 1);
        arrowSprites[i].angle = increment;
        arrowSprites[i].visible = false;
        increment+=angle;
    };
    return arrowSprites;
}
function onTouche(pointer) {
    var dx = pointer.x - 400;
    var dy = pointer.y - 300;
    var angleInDegrees = Math.atan2(dx, dy) * 180 / Math.PI;

    if ( circleShort.contains(pointer.x, pointer.y) )
    {
        hourArrow = displayArrows(shortArrows, angleInDegrees, 12, 30);
        
    }else{
        if ( circleLong.contains(pointer.x, pointer.y) )
        {
          minutArrow = (displayArrows(longArrows, angleInDegrees, 12, 30) *5);
        }
        
    }
}
function displayArrows(sprites, angle, max, spaceDeg) {
    var number = parseInt((angle + 180)/spaceDeg);
    number = parseInt(max - number);
    sprites.forEach(function(value, index) {
        value.visible = (number === index)? true: false;
    });
    return number;
}

function displaySprite(sprite, number) {
    sprite[number].visible = true;
}
