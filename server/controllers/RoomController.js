 module.exports = function(handleError, models, socket){

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
        //save the room id in the socket
        socket.room_id = data._id;
        //join the room
        socket.join(data._id);
    };

    return this;
};