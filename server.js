var express = require('express')
, app = express()
, mongoose = require('mongoose')
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

var appDir;

// configuration for all environments
app.configure(function(){

    //used to parse forms
    app.use(express.bodyParser());

    //mongodb configuration
    var uristring = 
    process.env.MONGOLAB_URI || 
    process.env.MONGOHQ_URL || 
    'mongodb://localhost/chat';

    //connect to mongodb
    mongoose.connect(uristring, function (err, res) {
        if(err) console.log('ERROR connecting to: ' + uristring + '. ' + err);
        else console.log('Succeeded connected to: ' + uristring);
    });
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
var router = require('./server/router')(app, io, mongoose);
router.start();

//start listening
var port = process.env.PORT || 8080;
server.listen(port, function() {
    console.log("Listening on " + port);
});

//initialize services
var services = {};
//^^
services.roomService = require('./server/RoomService')(mongoose);
//Make the foursquare call every 2 hours / 7200000 millisec
setInterval(services.roomService.cleanRooms(), 6000);