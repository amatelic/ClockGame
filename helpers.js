/*=================================================
=            MathClock helper function            =
=================================================*/

var MathClock = (function() {
	'use strict';

	var MathClock = {
		degToSec: function( deg ) {
			var d = (Math.floor(deg) + 90) * 10 ;
			console.log(d);
			var time = Math.floor(d / 60);

			return (time > 60) ? time - 60 : time;
		},
		degToHour: function( deg ) {
		    var d = Math.floor(deg) * 10;
		    var time = Math.floor(d / 60) + 15;
		    time = (time > 60) ? time - 60 : time;
		    return Math.floor(time/5);
		},
		toDegress: function( angle ) {
			var radian = angle + Math.PI;
			return  Phaser.Math.radToDeg( radian );	    
		},
		ranGenerator: function(min, max){
    		return Math.floor(Math.random() * (max - min)) + min;
		}
	};

	return MathClock;

}());

/*===============================================
=            Display helper function            =
===============================================*/

var Display = (function() {
	'use strict';

	var Display = {
		textDisplay: function(font, fill, align) {
			return { font: font || "18px Arial", fill: fill || "#ff0044", align: align || "center" };
		},
		isRight: function ( fun ) {
			swal({title:"Good job!", text: "The answer is right!", type:"success",closeOnConfirm: true}, fun);
		},
		isWrong: function( fun ) {
			swal({title:"Try again!", text: "The answer is wrong!", type:"error",closeOnConfirm: true}, fun);
		},
		FinalScore: function( score, total ) {
			swal({title:"Finish", text: "Your have "+ score + " answers correct of " + total, type:"info",closeOnConfirm: true});
		}

	};

	return Display;

}());

/*=================================
=            GameLogic            =
=================================*/

var Logic = (function() {
	'use strict';

	// variables for displaying true/false score in x/y os
	var x = 650,
		y = 150,
		answers = [],
		scoreLength = 5;

	var DateDisplay =  function() {
		// different hour and minut
		randMinuts = MathClock.ranGenerator(0, 60);
        randHours = MathClock.ranGenerator(0, 12);

        return TimeDisplay.setText("- Please correct time \n "
        	+ randHours + " hours " + randMinuts + "minuts");
	};

	var DisplayScore = function ( position ) {
		var sprite = game.add.sprite(x, y, 'ScoreSym', position);
		answers.push(position);
		y+=60;	
        
	}

	var Logic = {
		isRight: function(hour, minuts, game) {
			if (randMinuts == minuts && randHours == hour) {
				Display.isRight(DisplayScore(0));
			}else{
				Display.isWrong(DisplayScore(1));
			}

			DateDisplay();

			if(answers.length === scoreLength){
        		Logic.endOfGame();
        	}

			//Reseting touch and mouse events 
			// indicatorShort.input.reset();
   //      	indicatorLong.input.reset();
   //      	indicatorShort.input.start();
   //      	indicatorLong.input.start();
		},
		endOfGame: function() {
			var reduce = answers.reduce(function(a, b) {
				return a + b;
			});
			var correct = scoreLength - reduce;
			Display.FinalScore( correct, scoreLength );
			// indicatorShort.input.stop();
   //      	indicatorLong.input.stop();
		}

	};

	return Logic;

}());








