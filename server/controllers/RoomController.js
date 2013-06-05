 module.exports = function(handleError, models, socket){

    //fake rooms object used to save rooms
    var rooms = [
        {"name":"room","_id":1},
        {"name":"room 2","_id":2}
    ];

    /**
    * room:read
    *
    * called when we .fetch() our collection
    * in the client-side router
    */
    this.read = function (data, callback) {
        console.log('READ');
        callback(null, rooms);
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
        //set id
        data._id = rooms.length + 1;
        //add room to rooms
        rooms.push(data);
        //send room to the client
        socket.emit('rooms:create', data);
        //send room to the other clients
        socket.broadcast.emit('rooms:create', data);
        callback(null, data);
    };

    /**
    * room:join
    *
    * join the room
    */
    this.join = function (data) {
        socket.room = data._id;
        socket.join(data._id);
    };

    return this;
};