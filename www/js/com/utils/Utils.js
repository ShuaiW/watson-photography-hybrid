define([
	
	"jquery", 
	"backbone",
	"com/models/Constants",
	
], function($, Backbone, Constants){

	var Utils = Backbone.Model.extend({},
	{
        
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
		/**
         * show confirm dialog
         * @param question
         * @param onYes, function
         * @param onNo, function
         * @param title
         * @param labels, comma delimited string
         */
        showConfirmationAlert: function(question, onYes, onNo, title, labels)
        {
        	if(!title) {
        		//title = WL.Client.getAppProperty(WL.AppProperty.APP_DISPLAY_NAME);
        		title = Constants.APP_NAME_SHORT;
        	}
        	
        	if(!labels) {
        		labels = "Cancel,OK";
        	}
        	
        	var onConfirm = function(index) {
    			if(index == 2) {
    				if(onYes) {
    					onYes();
    				}
    			} else {
    				if(onNo) {
    					onNo();
    				}
    			}
    		};
    		
    		if(navigator.notification) {
    			navigator.notification.confirm(question, onConfirm, title, labels);
    		}
    		else {
    			var answer = confirm(question);
    			if(answer) {
    				onConfirm(2);
    			}
    		}
        },
	});

	return Utils;

}); 

