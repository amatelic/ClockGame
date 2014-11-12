var Display = (function() {
	'use strict';

	var Display = {
		isRigth: function() {
			swal({title:"Good job!", text: "The answer is right!", type:"success",closeOnConfirm: true}, function() {
	            user_answers.push(true);
	            Roules.DateDisplay();
	            Roules.ScoreDispaly();

        	});
		},
		isWrong: function() {
			swal({title:"Try again!", text: "The answer is wrong!", type:"error",closeOnConfirm: true}, function() {
	    			user_answers.push(false);
		    		Roules.DateDisplay();
		    		Roules.ScoreDispaly();	
    		});
		}
	};

	return Display;

}());