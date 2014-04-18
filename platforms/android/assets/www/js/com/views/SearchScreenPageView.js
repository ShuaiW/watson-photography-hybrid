define([ 
        
        "jquery", 
        "backbone",
        "com/views/PageView",
    
    ], function( $, Backbone, PageView ) {
        
    // Extends PageView class
    var SearchScreenPageView = PageView.extend({
        
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
            options.hideHeader = false;
            //options.headerState = Header.STATE_SIMPLE;
            PageView.prototype.initialize.call(this, options);

            var self = this;
            
            this.$el.on("pagebeforeshow", function(){                
                self.render();
            });
            
        },
        
        /**
         * Renders UI for page
         * @param none
         */
        render: function() 
        {
            var self = this;
            var model = MobileRouter.getModel();
            
            var searchContainer = $("#searchContainer",self);
            var searchInput = $(searchContainer).find("input.ui-input-text");

            //Search button handler
            self.$el.on("tap", "#goAsk", function(){
                console.log("#goAsk button pressed. model=",model);

                model.resetSearchModel();
                model.currentSearch.SearchString = searchInput;
                //model.currentSearch.SearchType = "audio";

                //$.mobile.changePage("home.html", {transition: "none"});
                //$.mobile.changePage("#watsonThinkingScreen", {transition: "slideup"});

                return false;
            });
            
            return this; //Maintains chainability
        },
        
         /**
         * do any cleanup, remove window binding here
         * @param none
         */
        dispose: function() {
            PageView.prototype.dispose.call(this);
        },

    });

    // Returns the View class
    return SearchScreenPageView;

});