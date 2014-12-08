/*========================================
=            Global variables            =
========================================*/
var randMinuts, randHours;
var oldVal = [];
var randomVal = [];


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
			return { font: font || "24px Arial", fill: fill || "#FFF", align: align || "center" };
		},
		isRight: function ( fun ) {
			swal({title:"Pravilno!", text: "", type:"success",closeOnConfirm: true}, fun);
		},
		isWrong: function( fun ) {
			swal({title:"Narobe!", text: "Kazalce nisi pravilno postavil!", type:"error",closeOnConfirm: true}, fun);
		},
		FinalScore: function( score, total ) {
			swal({title:"Konec", text: "Od  "+ total + " nalog si pravilno rešil " + score, type:"info",closeOnConfirm: true});
		},
		Digital: function ( number ) {
        	if( number < 10 ){
        		return "0" + number;
        	}
        	return number;
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
		correctAnswers = [],
		scoreLength = 5;

	var DateDisplay =  function() {
		// different hour and minut
		Logic.chooseNumbers(2); 


        return TimeDisplay.setText("- Prosim nastavite kazalce na pravo mesto - "
        	+ Display.Digital(randHours) + " : " + Display.Digital(randMinuts));
	};

	var DisplayScore = function ( position ) {
		var sprite = game.add.sprite(x, y, 'ScoreSym', position);
		answers.push(sprite);
		correctAnswers.push(position);
		y+=60;	
        
	}

	var Logic = {
		chooseNumbers: function( value ) {
			var times = [[7,0],[9,0],[19,0],[21,0],[9,30],[12,30],[11,15],[15,15]];
			switch( value ){
				case 1:
					randMinuts = (MathClock.ranGenerator(1, 12) * 5);
    				randHours = MathClock.ranGenerator(1, 24);
				case 2:
					while(oldVal.join(",") === randomVal.join(",")){
						var random = Math.floor(Math.random() * times.length);
						randMinuts = times[random][1];
	    				randHours = times[random][0];	
						randomVal = times[random]
					}
	    			oldVal = randomVal;	

    				
			}

		},
		isRight: function(hour, minuts, game) {
			// bug for number more than 12
			var hourto24 = (randHours > 12)?hour+12:hour;
			minuts = (minuts === 60)?0:minuts; 
			// console.log(hourto24, randHours,hour,":",randMinuts,minuts);
			if (randMinuts == minuts && randHours == hourto24 ) {
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
			var reduce = correctAnswers.reduce(function(a, b) {
				return a + b;
			});
			var correct = scoreLength - reduce;
			Display.FinalScore( correct, scoreLength );
			answers.forEach(function( sprite, index ) {
				sprite.destroy();
			});
			answers = []; 
			correctAnswers = [];
			y = 150;
		}

	};

	return Logic;

}());








