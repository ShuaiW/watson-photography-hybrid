define([
		
		"jquery", 
		"backbone",
		"com/models/Constants",
		"com/utils/Utils"
		
	], function($, Backbone, Constants, Utils ) {

	var WatsonServiceUtil = Backbone.Model.extend({},
	
	{
		
		SERVER_BASE_URL : "https://watson.ihost.com/instance/"+Constants.WATSON_INSTANCE_NUMBER+"/deepqa/v1/question",
		USER_AUTH : Utils.createBase64Auth(Constants.DEFAULT_USER_NAME, Constants.DEFAULT_USER_PASS),
		
		/**
		 * Ask a Watson a question using the synchronous service
		 * @param questionText, string
		 * @param onResultHandler, function to receive the JSON object of answers
		 */
		askWatsonSync: function(questionText, onResultHandler)
		{
			var formatQuestion = "{question: {questionText: "+questionText+"}}";
			$.ajax({
				type: "POST",
				async: false,
				url: WatsonServiceUtil.SERVER_BASE_URL, //URL for the Watson QA API service
				/*
				"X-SyncTimeout": value represents how long the server waits after the question is submitted until it times out
				"Authorization": Base64 encoded authentication header from the user and password stored in the constants file
				*/
				headers: {
					"X-SyncTimeout": "30", 
					"Accept": "application/json",
					"Authorization": WatsonServiceUtil.USER_AUTH,
					"Content-Type": 'application/json',
					"Cache-Control": "no-cache"
				},
				//Format the outgoing question in the format the Watson QA API expects
				data: '{"question": {"questionText": "'+questionText+'"}}',
				dataType: "json",
				cache: false,
				success: function(data){
					console.log("successful return from watson!");
					
					if(onResultHandler) {
						onResultHandler(data);
					}
				},
				error: function(data){
					console.log(data);
				}
			});	
			
			
		}
			
	});

	return WatsonServiceUtil;

}); 