define([ 
        
        "jquery", 
        "backbone",
        "com/views/PageView",
        "com/utils/WatsonServiceUtil",
        "com/models/SearchModel"
    
    ], function( $, Backbone, PageView, WatsonServiceUtil, SearchModel ) {
        
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

            var model = MobileRouter.getModel();
            
            //Search button handler
            self.$el.on("tap", "#goAsk", function(){

                var searchInput = $("#searchContainer").find(".ui-input-search input");
                console.log("searchInput=",searchInput.val());

                //$.mobile.changePage("home.html", {transition: "none"});
                //$.mobile.changePage("#watsonThinkingScreen", {transition: "slideup"});

                //This could be done so much nicer if we could use async calls to Watson
                $.mobile.loading("show", {
                    text: "Watson is thinking...",
                    textVisible: false,
                    html:"<span class='ui-bar ui-shadow ui-overlay-a ui-corner-all' style='min-width:250px'><img src='../img/watson_thinking_sm.gif'><h2>Watson is thinking...</h2></span>"
                });
                var onWatsonsAnswer = function( currentSearchResults ){

                    $.mobile.loading("hide");

                    console.log("currentSearchResults=",currentSearchResults);

                    var currentSearch = new SearchModel({searchString: searchInput.val(), currentSearchResults: currentSearchResults});
                    
                    //store currentSearchResults in memeory
                    //var model = MobileRouter.getModel();
                    //model.set("currentSearch", currentSearch);

                    //var model = MobileRouter.getModel();
                    //model.setCurrentSearchModel(currentSearch);

                    //console.log("model currentSearch=", model.currentSearch);

                    self.render(currentSearchResults);
                };

                WatsonServiceUtil.askWatsonSync(searchInput.val(), onWatsonsAnswer);

                return false;
            });
            
        },
        
        /**
         * Renders UI for page
         * @param currentSearchResults, SearchModel to be loaded to the screen
         */
        render: function(currentSearchResults) 
        {
            var self = this;

            /**Build result rows from current results in model**/
            if(currentSearchResults){
                var c = currentSearchResults.question;
                console.log("c=",c);

                //clear current body content
                var activePageContent = $(".ui-content", $.mobile.activePage);
                activePageContent.empty();
                //blank out the search field
                $('input[data-type="search"]', $.mobile.activePage).val("");
                $('input[data-type="search"]', $.mobile.activePage).trigger("change");

                //Append body search results container
                $(activePageContent).append('<div class="ui-grid-solo" align="center"><div class="ui-block-a" ><div id="searchResultContainer"></div></div></div>');

                var searchResultContainer = $("div#searchResultContainer", $.mobile.activePage);

                //Add question row
                $(searchResultContainer).append("<ul data-role='listview' data-theme='b'><li class='searchResultQuestion'>"+c.questionText+"</li></ul>");
                

                if(c.answers){
                    //loop over answers
                    $.each(c.answers,function(i,aResult){
                        console.log("aResult "+i+"=",aResult);
                        var percentConfidence = Math.round(aResult.confidence * 100);
                        var numOfReferences = 0;
                        var evidenceText = '2014-04-20 - Source information, Inc.';
                        if(typeof aResult.evidence != 'undefined'){
                            numOfReferences = aResult.evidence.length;
                            evidenceText = aResult.evidence[0].text;
                        }
                        
                        var rowResult  = '<div class="searchResultAnswer" data-role="collapsible" data-theme="a" data-content-theme="d" data-inset="false">'
                            + '<h3><span class="searchResultHead">' + aResult.text +'</span>'
                            + '<div class="progress-bar black-inset-shadow green"><span style="width: '+percentConfidence+'%"></span></div>'
                            + '<p>Search confidence: ' + percentConfidence + '%</p>' 
                            + '<p class="searchResultLighter">Number of references: ' + numOfReferences + '</p></h3>'
                            //NOTE: currently showing only the first result in evidence[] in future maybe make a collapsible set one row for each?
                            + '<p class="searchResultDetails">Reference<p class="searchResultDetails searchResultLighter">'+evidenceText+'</p></p></div>';
                        $(searchResultContainer).append(rowResult);
                        
                    });

                    //trigger the creation of the jQm content
                    $(activePageContent).trigger('create');
                    
                }
                else{
                    $(activePageContent).append("<li>No Results Found</li>");
                }

            }

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