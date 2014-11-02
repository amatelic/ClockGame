var Roules = (function() {
	'use strict';
	var x = 650,
	y = 150,answer;
	var Roules = {
		isRight: function(hour, minuts, game) {
			if (randMinuts == minuts && randHours == hour) {   
        		swal({title:"Good job!", text: "The answer is right!", type:"success",closeOnConfirm: true}, function() {
	            	user_answers.push(true);
	            	Roules.DateDisplay();
	            	Roules.ScoreDispaly();

        		});
    		}else{
	    		swal({title:"Try again!", text: "The answer is wrong!", type:"error",closeOnConfirm: true}, function() {
	    			user_answers.push(false);
		    		Roules.DateDisplay();
		    		Roules.ScoreDispaly();	
    			});
    		}
    		// Display users data;
			console.log(user_answers);
		},
		DateDisplay: function() {
			randMinuts = MathClock.ranGenerator(0, 60);
        	randHours = MathClock.ranGenerator(0, 12);
        	return TimeDisplay.setText("- Please correct time \n "
        		+ randHours + " hours " + randMinuts + "minuts");

		},
		ScoreDispaly: function() {
			var y = 150
			game.world.remove(answer);
			user_answers.forEach(function(data) {
				if ( data ) {
					answer = game.add.sprite(x, y, 'true', 0);	
				}else{
					answer = game.add.sprite(x, y, 'true', 1);
				};
				y+=60;
			});
		}
	};

	return Roules;

}());