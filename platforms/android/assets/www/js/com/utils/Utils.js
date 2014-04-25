define([
	
	"jquery", 
	"backbone",
	"com/models/Constants",
	
], function($, Backbone, Constants){

	var Utils = Backbone.Model.extend({},
	{
        /**
         * create a Base64 encoded string to be used as an
         * authentication header
         * @param user, password
         * @return String
         */
        createBase64Auth: function(user, password) {
            var tok = user + ':' + password;
            var hash = btoa(tok);
            return "Basic " + hash;
        },
        
        /**
         * force a number to be double digits if it's not
         * @param num
         * @return numString
         */
        forceDoubleDigits: function(num)
        {
        	var numString = String(num);
        	if(numString.length < 2) {
        		numString = "0" + numString;
        	}
        	return numString;
        },
		
		/**
		 * returns if the screen is a phone based on the screen size
		 * @param none 
		 * @return isPhone, boolean
		 */
		isPhone: function() {
			var isPhone = $(window).width() <= Constants.RESOLUTION_PHONE;
			return isPhone;
		},

	});

	return Utils;

}); 

