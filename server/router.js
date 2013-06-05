 module.exports = function(app, io, mongoose){

    //handel server error
    var handleError = function (err, req, res) {
      console.error(err.stack);
      res.status(500).sendfile('./app/500.html');
    }

    //load Models
    var models = {};
    //models.Room = require('./models/Room')(mongoose, models);

    //load Controllers
    var controllers = {};
    controllers.DefaultController = require('./controllers/DefaultController')(handleError, models);

    //store the rooms
    var rooms = [];

    //routing
    this.start = function(){


        //match route and controller
        app.get('/', controllers.DefaultController.index);

        //REST Room
        //app.get('/rooms', controllers.RoomController.rooms);
        //app.post('/rooms', controllers.RoomController.createRooms);
        //app.get('/rooms/:id', controllers.RoomController.getRoom);
        //app.put('/rooms/:id', controllers.RoomController.updateRoom);
        //app.delete('/rooms/:id', controllers.RoomController.deleteRoom);

        // 404 Page
        app.use(function(req, res){
            res.status(404).sendfile('./app/404.html');
        });

        io.sockets.on('connection', function (socket) {

            //message controller
            controllers.MessageController = require('./controllers/MessageController')(handleError, models, socket, rooms);
            //Read all messages
            socket.on('messages:read', controllers.MessageController.read);
            //Create a new message
            socket.on('message:create', controllers.MessageController.create);

            //room controller
            controllers.RoomController = require('./controllers/RoomController')(handleError, models, socket, rooms);
            //Read all rooms
            socket.on('rooms:read', controllers.RoomController.read);
            //Create a new room
            socket.on('room:create', controllers.RoomController.create);
        });

    }
    return this;
};