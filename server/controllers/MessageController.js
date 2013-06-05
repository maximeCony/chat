 module.exports = function(handleError, models, socket, io){

 	/**
    * message:read
    *
    * called when we .fetch() our collection
    * in the client-side router
    */
    this.read = function (data, callback) {

        //find all messages
        models.Message.find({
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

        //get the post by _id
        models.Room.findById(socket.room_id, function (err, room) {

            if (err) return handleError(err);
            
            //create a new message
            var message = new models.Message(data);
            message.room = room;

            //save it
            message.save(function (err) {
                if (err) return handleError(err);
                io.sockets.in(socket.room_id).emit('messages:create', message);
                //send message to the other clients
                callback(null, message);
            });

        });        
    };

    return this;
};