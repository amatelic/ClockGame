var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

//varibles 
var circle, floor, longLine, shortLine, 
handle1, handle2, randMinuts, randHours;

function preload() {
  // loading images
  game.load.spritesheet('balls', 'assets/balls.png', 17, 17);
  game.load.spritesheet('clock', 'assets/clock.png', 400, 400);
}

function create() {
    clock = game.add.sprite(200, 100, 'clock', 0);
    handle1 = createHandler(400, 200);
    handle2 = createHandler(400, 100);

    longLine = new Phaser.Line();
    shortLine = new Phaser.Line();

    randMinuts = MathClock.ranGenerator(0, 60);
    randHours = MathClock.ranGenerator(0, 12);
  
    var style = { font: "18px Arial", fill: "#ff0044", align: "center" };
    var text = game.add.text(20, 100, "- Please correct time \n "
        + randHours + " hours " + randMinuts + "minuts", style);

}
function render() {
    game.debug.geom(longLine);
    game.debug.geom(shortLine);
    // game.debug.lineInfo(longLine, 152, 152);

    // geting the degress
    var degress = MathClock.toDegress( longLine.angle )
    var degress2 = MathClock.toDegress( shortLine.angle)

    var minuts = MathClock.degToSec( degress2 ) ;
    var hour = MathClock.degToHour( degress ) ;

    isRight(hour, minuts);
}

function update() {
    (function(){
        console.log('test');
    }())
    longLine.fromSprite(handle1, {x:400, y: 300}, false);
    shortLine.fromSprite(handle2, {x:400, y: 300}, false);
}



function isRight ( hour, minuts ) {
    // console.log(randMinuts == minuts && randHours == hour);
    // console.log(randHours, randMinuts);
    // console.log( hour, minuts);
    if (randMinuts == minuts && randHours == hour) {   
        swal({title:"Good job!", text: "The answer is right!", type:"success",closeOnConfirm: false}, function(isConfirm) {
            if(isConfirm){
                document.location.reload(true);
            }
        });
    };
}

function createHandler(x, y) {
    var handler = game.add.sprite(x, y, 'balls', 0);
    handler.anchor.set(0.5);
    handler.inputEnabled = true;
    handler.input.enableDrag(true);
    return handler;
}
