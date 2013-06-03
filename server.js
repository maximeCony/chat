var express = require('express')
,app = express()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

var appDir;

// configuration for all environments
app.configure(function(){

    //used to parse forms
    app.use(express.bodyParser());
});

// configuration for development only
app.configure('development', function(){

    //app directory
    appDir = "/app";
    //serve static files
    app.use("/", express.static(__dirname + appDir));
    console.log(__dirname + appDir);
    app.set('views', __dirname + appDir);
});

// configuration for production only
app.configure('production', function(){

    //app directory
    appDir = "/app/build/dist";
    //serve static files
    app.use("/", express.static(__dirname + appDir));
    console.log(__dirname + appDir);
    app.set('views', __dirname + appDir);
});

//initialize router
var router = require('./server/router')(app);
router.start();

//db object used to save messages
var db = [
    {"content":"test","_id":1},
    {"content":"test 2","_id":2}
];

io.sockets.on('connection', function (socket) {

    /**
    * message:read
    *
    * called when we .fetch() our collection
    * in the client-side router
    */
    socket.on('messages:read', function (data, callback) {
        console.log('READ');
        callback(null, db);
    });

    /**
    * message:create
    *
    * called when we .save() our new message
    *
    * we listen on model namespace, but emit
    * on the collection namespace
    */
    socket.on('message:create', function (data, callback) {
        //set id
        data._id = db.length + 1;
        //add message to db
        db.push(data);
        //send message to the client
        socket.emit('messages:create', data);
        //send message to the other clients
        socket.broadcast.emit('messages:create', data);
        callback(null, data);
    });

});

//start listening
var port = process.env.PORT || 8080;
server.listen(port, function() {
    console.log("Listening on " + port);
});