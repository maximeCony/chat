 module.exports = function(models, socket, handleError){

 	//fake db object used to save messages
 	var db = [
    	{"content":"test","_id":1},
    	{"content":"test 2","_id":2}
	];

 	/**
    * message:read
    *
    * called when we .fetch() our collection
    * in the client-side router
    */
    this.read = function (data, callback) {
        console.log('READ');
        callback(null, db);
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
        //set id
        data._id = db.length + 1;
        //add message to db
        db.push(data);
        //send message to the client
        socket.emit('messages:create', data);
        //send message to the other clients
        socket.broadcast.emit('messages:create', data);
        callback(null, data);
    };

    return this;
};