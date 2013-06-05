module.exports = function(mongoose, models) {

	//location Model
	return mongoose.model('Room', new mongoose.Schema({
		name: String
	}));
};