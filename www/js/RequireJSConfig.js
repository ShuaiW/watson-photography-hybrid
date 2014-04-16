
// Sets the require.js configuration for your application.
require.config( {
	
	  waitSeconds: 0,
	  	
      // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.8.2.min")
      paths: {

            // Core Libraries
            "jquery"		: "libs/jquery/jquery",
            "jquerymobile"	: "libs/jquery-mobile-bower/js/jquery.mobile-1.4.2",
            "underscore"	: "libs/underscore/underscore",
            "backbone"		: "libs/backbone/backbone"
      },

      // Sets the configuration for your third party scripts that are not AMD compatible
      shim: {
			
            "backbone": {
            	"deps": [ "underscore", "jquery" ],
                "exports": "Backbone"  //attaches "Backbone" to the window object
            }

      } // end Shim Configuration

});

// Includes File Dependencies
require([
	 
		"jquery", 
		"backbone"
	
	], function( $, Backbone ) {
	
	console.log("We've made it past dep loading! ");


	$( document ).on( "mobileinit",
		// Set up the "mobileinit" handler before requiring jQuery Mobile's module
		function() {
			// Prevents all anchor click handling including the addition of active button state and alternate link bluring.
			//$.mobile.linkBindingEnabled = false;

			// Disabling this will prevent jQuery Mobile from handling hash changes
			//$.mobile.hashListeningEnabled = false;
			
			console.log("ON mobile init!");
			
			// Instantiates a new Backbone.js Mobile Router
			//window.MobileRouter = new MobileRouter();
			
			//disable selection for any element on the page
			document.onselectstart = function(){ return false; };
			
			//make sure scroll event fires sooner on ios
			document.addEventListener("touchmove", function(){$(window).trigger("scroll");}, false);
			document.addEventListener("scroll", function(){$(window).trigger("scroll");}, false);
			
			//set default page transition
			//$.mobile.defaultPageTransition = Constants.DEFAULT_PAGE_TRANSITION;
	
	});
	
	//need to be loaded after mobileinit has been set to be able to listen for the event
	require( [ "jquerymobile" ], function() {

	});


	
});