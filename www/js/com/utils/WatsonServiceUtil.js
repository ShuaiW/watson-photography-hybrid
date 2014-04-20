define([
		
		"jquery", 
		"backbone",
		"com/models/Constants"
		
	], function($, Backbone, Constants ) {

	var WatsonServiceUtil = Backbone.Model.extend({},
	
	{
		
		SERVER_BASE_URL : "https://watson.ihost.com/instance/"+Constants.WATSON_INSTANCE_NUMBER+"/deepqa/v1/question",
		
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
				url: WatsonServiceUtil.SERVER_BASE_URL,
				headers: {
					"X-SyncTimeout": "30", 
					"Accept": "application/json", 
					"Authorization": Constants.DEFAULT_USER_AUTH,
					"Content-Type": 'application/json',
					"Cache-Control": "no-cache"
				},
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