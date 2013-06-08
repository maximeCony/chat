 module.exports = function(handleError, models, socket, io){

 	/**
    * message:read
    *
    * called when we .fetch() our collection
    * in the client-side router
    */
    this.read = function (data, callback) {

        //find messages
        models.Message.find({
            //find by room
            room: socket.room_id
        }, function(err, messages){
            if (err) return handleError(err);
            callback(null, messages);
        });
        
    };

    /**
    * message:create
    *
    * called when we .save() our new message
    *
    * we listen on model namespace, but emit
    * on the collection namespace
    */
    this.create = function (data, callback) {

        //get the post by _id and update is last activity date
        models.Room.findByIdAndUpdate(socket.room_id, {lastActivity: Date.now()}, function(err, room){
            if (err) return handleError(err);
            //create a new message
            var message = new models.Message(data);
            //set the message room
            message.room = room;

            //save it
            message.save(function (err) {
                if (err) return handleError(err);
                //send the create message to the clients in the room
                io.sockets.in(socket.room_id).emit('messages:create', message);
                callback(null, message);
            });
        });      
    };

    return this;
};