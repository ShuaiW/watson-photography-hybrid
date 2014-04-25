// Includes file dependencies
define([
	
	"jquery",
	"backbone",
], function($, Backbone) {
	// The Model constructor
	var Constants = Backbone.Model.extend({},
		{
			APP_NAME_SHORT : "Watson Photography",
			APP_NAME_LONG : "The Photographer's Pocket Field Guide",
			FOLDER_TEMPLATES : "../templates/",
			EXTENSION_TEMPLATES : ".handlebars",
			DEFAULT_PAGE_TRANSITION : "slide",
			DEFAULT_WINDOW_RESIZE_DELAY : 250, //default time to wait until handling the window resize event
			DEFAULT_SPLASH_TIME : 1000, //in ms
			DEFAULT_RESULTS_TO_DISPLAY : 5,

			/**** page view classes need to be added here so they can be loaded before being initialized ****/
			VIEW_CLASSES : [
				//"com/views/LoginPageView",
				"com/views/SearchScreenPageView",
			],

			/**** default user settings ****/
			DEFAULT_USER_LAT : 41.8782,
			DEFAULT_USER_LNG : -87.6297,
			DEFAULT_USER_NAME : "user1",//change this to your Watson Instance username
			DEFAULT_USER_PASS : "bE3bT6gW",//change this to your Watson Instance password
			WATSON_INSTANCE_NUMBER : 23,//change this to your Watson Instance id

			/**** resolution constants ****/
			RESOLUTION_PHONE : 480,
			RESOLUTION_TABLET : 767,
			RESOLUTION_DESKTOP : 1200,

		}
	);

	// Returns the Model class
	return Constants;
});