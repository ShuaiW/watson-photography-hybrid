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
						
						//parse page content as template, and apply localization
						if(self._model)
						{	
			    			//parse page html as handlebars template to allow for localization
			    			var template = Handlebars.compile($(page).html());
			    			var params = {foo: "bar"};
							var html = template(params);
							$(page).html(html);
						}
					}
					
				});
				
	            //go to search page and init components
				$.mobile.changePage("pages/searchScreen.html", { transition: "slide" });

	            // Tells Backbone to start watching for hashchange events
            	//Backbone.history.start();
            	
            });
        },
        
        /**
         * initialize singleton objects 
         * should be called after splash page so urls for templates can stay consistent
         * @param onInit, function
         */
        initComponents: function(onInit) 
        {
        	if(!this._model)
        	{
				var self = this;
				self._model = new Model({}); //init model
        	}
        	else {
        		if(onInit) {
					onInit();
				}
        		console.log("Cannot initialize singleton components, components already initialized.");
        	}
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