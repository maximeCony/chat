module.exports = function(mongoose, models) {

	//message Model
	return mongoose.model('Message', new mongoose.Schema({
		content: String,
		userName: String,
		room : { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }
	}));
};