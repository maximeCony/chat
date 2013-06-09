var express = require('express')
, app = express()
, mongoose = require('mongoose')
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

var appDir;

//heroku config
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

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

//initialize Models
var models = {};
models.Message = require('./server/models/Message')(mongoose, models);
models.Room = require('./server/models/Room')(mongoose, models);

//initialize router
var router = require('./server/router')(app, io, models);
router.start();

//start listening
var port = process.env.PORT || 8080;
server.listen(port, function() {
    console.log("Listening on " + port);
});

//initialize services
var services = {};
//^^
services.roomService = require('./server/services/RoomService')(models);
//Make the foursquare call every 2 hours / 7200000 millisec
setInterval(services.roomService.cleanRooms, 7200000);