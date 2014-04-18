define([ 
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/utils/Utils",
	
	], function( $, Backbone, Constants, Utils ) {

	// Extends Backbone.View
	var PageView = Backbone.View.extend( {
		_resizeEvent: "", //string
		_settingsUpdateEvent: "", //string

		/**
		 * The View Constructor
		 * @param el, DOM element of the page
		 */
		initialize: function(options) 
		{
			var self = this;
			this.$el.on("pagebeforehide", function(event, data){
				self.dispose();

			}).on("pagebeforeshow", function(){
				
				//show header by default
				/*var header = MobileRouter.getHeader();
				var headerState = options ? options.headerState : undefined;
				options && options.hideHeader ? header.hide() : header.show(headerState);
				*/

			}).on("pageshow", function(){

			});

			//handle when window is resized/orientation change
			var resizeTimerId;
			this._resizeEvent = "resize." + this.cid;

			$(window).on(this._resizeEvent, function(){
				clearTimeout(resizeTimerId);
				resizeTimerId = setTimeout(function(){
					self._onResize();
				}, Constants.DEFAULT_WINDOW_RESIZE_DELAY); 
				
			});

		},

		/**
		 * Renders all of the Category models on the UI
		 * called whenever the collection is changed for this view
		 * @param none
		 */
		render: function() {
			return this; //Maintains chainability
		},

		/**
		 * called when the window is resized or changed orientation
		 * to be overridden by child classes
		 * @param none
		 */
		_onResize: function() {

		},

		/**
		 * do any cleanup, remove window binding here
		 * @param none
		*/
		dispose: function() {
			$(window).off(this._resizeEvent).off(this._settingsUpdateEvent);
		},
	});

	// Returns the View class
	return PageView;
});