 module.exports = function(handleError, models, socket, io){

    /**
    * room:read
    *
    * called when we .fetch() our collection
    * in the client-side router
    */
    this.read = function (data, callback) {
        //find all rooms
        models.Room.find({}, function(err, rooms){
            if (err) return handleError(err);
            callback(null, rooms);
        });
    };

    /**
    * room:create
    *
    * called when we .save() our new room
    *
    * we listen on model namespace, but emit
    * on the collection namespace
    */
    this.create = function (data, callback) {

        //create a new room
        var room = new models.Room(data);

        //save it
        room.save(function (err) {
            if (err) return handleError(err);
            //send room to the client
            socket.emit('rooms:create', room);
            //send room to the other clients
            socket.broadcast.emit('rooms:create', room);
            callback(null, room);
        });        
    };

    /**
    * room:join
    *
    * join the room
    */
    this.join = function (data) {

        if(!data._id) return;
        //save the room id in the socket
        socket.room_id = data._id;

        //get the post by _id and update is last activity date
        models.Room.findOneAndUpdate({
            _id: data._id,
            password: data.password
        }, {
            //update last activity date
            lastActivity: Date.now()
        }, null, function(err, room){
            if (err) return handleError(err);

            //if room not found
            if(room === null) {
                socket.emit('room/' + data._id + ':badPassword');
            } else {
                //join the room
                socket.join(room._id);
                //confirm that the user join the room
                socket.emit('rooms:join', {_id: room._id});
                //notice other users in the room
                //io.sockets.in(socket.room_id).emit('rooms:joinedBy', {username: data.username});
            }
                
        });
    };

    return this;
};