module.exports = function(mongoose, models) {

	//room Model
	return mongoose.model('Room', new mongoose.Schema({
		name: String,
		messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
	}));
};