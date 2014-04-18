/**
 * this is a singleton class
 * initialize the view class based on the loaded page
 */
define([ 
	
		"jquery",
		"backbone", 
		"com/models/Constants",
		"com/models/Model",
		"com/utils/Utils",
		
	], function( $, Backbone, Constants, Model, Utils ) {

    // Extends Backbone.Router
    var MobileRouter = Backbone.Router.extend({
		
		_pageViewClasses: null, //stores loaded pageview classes, object {"key" : PageView};
		_header: null, //Header object
		_footer: null, //Footer object
		_alerts: null, //Alerts object
		_popupManager: null, //PopupManager object
		_model: null, //Model object
		
		currentPage: null, //current page view class
		
        /**
         * The Router constructor
         * @param none
         */ 
        initialize: function() 
        {
            var self = this;
            
            require( Constants.VIEW_CLASSES, function(){

				self._pageViewClasses = {};
				for(var i=0; i<Constants.VIEW_CLASSES.length; i++)
				{
					var className = Constants.VIEW_CLASSES[i];
					self._pageViewClasses[className] = arguments[i];
				}
            
	            //initialize the view class associate with each view
	            $(document).on("pagebeforecreate", function(event, data){
	            	self.currentPage = null;
					//var page = $("div[data-role=page]").last();
					var page = event.target;
					if(page)
					{
						self._resetBackButton();
						var pageClassName = $(page).attr("data-class");
		
						//process params from url and pass to new page
						var d;
						var url = event.target.baseURI; //data && data.dataUrl
						if(url.indexOf("?") != -1) {
							var start = url.indexOf("?") + 1;
							d = $.deserialize(url.substring(start));
						}
		
						if(pageClassName)
						{
							console.log("Initializing " + pageClassName);
							if(self._pageViewClasses.hasOwnProperty(pageClassName))
							{
								var PageClass = self._pageViewClasses[pageClassName];
								self.currentPage = new PageClass( {el: page, data: d} );
							}
							else
							{
								throw new Error("PageView Class needs to be added to Constants.VIEW_CLASSES!");
							}
						}
						
					}
					
				});

				//initialize singleton objects
				self._model = new Model({});
				/*
				self._header = new Header({parent: $("body")});
				self._footer = new Footer({parent: $("body")});
				self._alerts = new Alerts({parent: $("body")});
				self._popupManager = new PopupManager({parent: $("body")});
				*/
				
	            //go to search page
				var splashPause = setTimeout(function(){
					$.mobile.changePage("pages/searchScreen.html", { transition: "pop" });
				}, Constants.DEFAULT_SPLASH_TIME);

	            // Tells Backbone to start watching for hashchange events
            	//Backbone.history.start();
            	
            });
        },
        
        /**
         * return the reference to the model
         * @param none
         * @return model, Model object
         */
        getModel: function() {
        	return this._model;
        },

        /**
         * return the reference to the header
         * @param none 
         * @return header, Header object
         */
        getHeader: function() {
        	return this._header;
        },

        /**
         * return the reference to the alerts
         * @param none
         * @return alerts, Alerts object
         */
        getAlerts: function() {
        	return this._alerts;
        },
        
        /**
         * return the reference to the popup manager
         * @param none
         * @return manager, PopupManager object 
         */
        getPopupManager: function() {
        	return this._popupManager;
        },
        
        /**
         * show the splash screen
         * @param none
         */
        showSplash: function() {
        	/*deprecated in 1.4
        	$.mobile.changePage("splash.html", {transition: "pop"}); */
        	//$.mobile.pageContainer.pagecontainer ("change", "#splashPage");
        },
        
        /**
         * get the id of the current page DOM element
         * @param none
         * @return id, string
         */
        getCurrentPageId: function() 
        {
        	var id;
        	var page = this.currentPage.$el;
        	if(page) {
        		id = $(page).attr("id");
        	}
        	return id;
        },
        
        /**
		 * quit the app, if app does have the kill api, just log user out
		 * @param none
		 */
		killApp: function() 
		{
			//WL.App.close();
			if(navigator.app){
				navigator.app.exitApp();
				return false;
			}
			
			this.showSplash();
		},
		
		/**
		 * reset the back button handler
		 * @param none
		 */
		_resetBackButton: function() {
			$(document).off("backbutton");
		},

    });

    // Returns the Router class
    return MobileRouter;

} );