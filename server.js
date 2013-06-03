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
var router = require('./server/router')(app, io);
router.start();

//start listening
var port = process.env.PORT || 8080;
server.listen(port, function() {
    console.log("Listening on " + port);
});