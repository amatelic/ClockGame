/*=================================================
=            MathClock helper function            =
=================================================*/

var MathClock = (function() {
	'use strict';

	var MathClock = {
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
		randMinuts = MathClock.ranGenerator(1, 60);
        randHours = MathClock.ranGenerator(1, 12);

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


		},
		endOfGame: function() {
			var reduce = answers.reduce(function(a, b) {
				return a + b;
			});
			var correct = scoreLength - reduce;
			Display.FinalScore( correct, scoreLength );
		}

	};

	return Logic;

}());








