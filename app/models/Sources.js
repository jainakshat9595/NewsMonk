// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Sources', {
	id : String,
	name : String,
	description : String,
	url : String,
	category : String,
	language : String,
	country : String,
	urlsToLogos : JSON,
	sortBysAvailable : Array
});
