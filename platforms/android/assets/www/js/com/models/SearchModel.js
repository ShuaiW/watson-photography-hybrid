define([ 
	
		"jquery", 
		"backbone",
		"com/models/Constants",
		 
	], function( $, Backbone, Constants ) {

	var SearchModel = Backbone.Model.extend({

		initialize: function(attributes, options)
		{
			this.set({
				"searchString" : attributes["searchString"] ? attributes["searchString"] : "",
				"currentSearchResults" : attributes["currentSearchResults"] ? attributes["currentSearchResults"] : {}
			});

		},

	});

	return SearchModel;
});