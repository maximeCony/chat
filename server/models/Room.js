module.exports = function(mongoose, models) {

	//room Model
	return mongoose.model('Room', new mongoose.Schema({
		name: String,
		lastActivity: { type: Date, default: Date.now }, 
		messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
	})
	.pre('remove', function(next) {
		console.log('messages!');
		models.Message.remove({room: this._id}).exec();
		next();
	}));
};

