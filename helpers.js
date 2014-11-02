var MathClock = (function() {
	'use strict';

	var MathClock = {
		degToSec: function( deg ) {
			var d = Math.floor(deg) * 10;
			var time = Math.floor(d / 60) + 15;
			return (time > 60)? time - 60: time;
		},
		degToHour: function( deg ) {
		    var d = Math.floor(deg) * 10;
		    var time = Math.floor(d / 60) + 15;
		    time = (time > 60)? time - 60: time;
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
