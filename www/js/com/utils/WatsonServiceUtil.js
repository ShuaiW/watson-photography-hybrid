define([
		
		"jquery", 
		"backbone",
		
	], function($, Backbone ) {

	var WatsonServiceUtil = Backbone.Model.extend({},
	
	{
		
		SERVER_BASE_URL : "https://watson.ihost.com/instance/23/deepqa/v1/question",
		
		/**
		 * Ask a Watson a question using the synchronous service
		 * @param questionText, string
		 * @param onResultHandler, function to receive the JSON object of answers
		 */
		askWatsonSync: function(questionText, onResultHandler)
		{
			console.log("WatsonServiceUtil.askWatsonSync asking: ", questionText);

			var formatQuestion = "{question: {questionText: "+questionText+"}}";
			$.ajax({
				type: "POST",
				async: false,
				url: WatsonServiceUtil.SERVER_BASE_URL,
				headers: {
					"X-SyncTimeout": "30", 
					"Accept": "application/json", 
					"Authorization": "Basic dXNlcjE6VlE0d1daV3Y=",
					"Content-Type": 'application/json',
					"Cache-Control": "no-cache"
				},
				data: '{"question": {"questionText": "'+questionText+'"}}',
				dataType: "json",
				cache: false,
				success: function(data){
					console.log("successful return! data= " + data);
					

					var datasets = [];
					
					console.log(datasets);
					
					if(onResultHandler) {
						onResultHandler(datasets);
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