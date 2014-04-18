define([ 
	
		"jquery", 
		"backbone",
		"com/models/Constants",
		 
	], function( $, Backbone, Constants ) {

	var SearchModel = Backbone.Model.extend({

		initialize: function(attributes, options)
		{
			this.set({
				"SearchString" : "",
				"SearchType" : "",
				"CurrentSearchResults" : {}
			});

		},

	});

	return SearchModel;
});