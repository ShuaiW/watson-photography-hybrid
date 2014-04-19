define([ 
        
        "jquery", 
        "backbone",
        "com/views/PageView",
        "com/utils/WatsonServiceUtil"
    
    ], function( $, Backbone, PageView, WatsonServiceUtil ) {
        
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
            
            var searchInput = $("#searchContainer").find(".ui-input-search input");

            //Search button handler
            self.$el.on("tap", "#goAsk", function(){
                console.log("#goAsk button pressed. model=",model);
                console.log("searchInput=",searchInput.val());

                model.resetSearchModel();
                model.currentSearch.SearchString = searchInput.val();
                //model.currentSearch.SearchType = "audio";

                //$.mobile.changePage("home.html", {transition: "none"});
                //$.mobile.changePage("#watsonThinkingScreen", {transition: "slideup"});

                $.mobile.loading("show", {
                    text: "Watson is thinking...",
                    textVisible: false,
                    //html: '<div class="logoWrapper watsonThinkingImg"></div>'
                    html:"<span class='ui-bar ui-shadow ui-overlay-a ui-corner-all' style='min-width:250px'><img src='../img/watson_thinking_sm.gif'><h2>Watson is thinking...</h2></span>"
                });
                var onWatsonsAnswer =  function( answerCollection ){

                    $.mobile.loading("hide");

                    console.log(answerCollection);
                    //store answerCollection in memeory
                    //var model = MobileRouter.getModel();
                    //model.set("currentSearch", answerCollection);

                };

                WatsonServiceUtil.askWatsonSync(searchInput.val(), onWatsonsAnswer);

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