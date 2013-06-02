 module.exports = function(app){

    //handel server error
    var handleError = function (err, req, res) {
      console.error(err.stack);
      res.status(500).sendfile('./app/500.html');
    }

    //load Models
    var models = {};
    //models.Location = require('./models/Location')(mongoose, models);

    //load Controllers
    var controllers = {};
    controllers.DefaultController = require('./controllers/DefaultController')(models, handleError);

    //routing
    this.start = function(){
        //match route and controller
        app.get('/', controllers.DefaultController.index);

        // 404 Page
        app.use(function(req, res){
            res.status(404).sendfile('./app/404.html');
        });
    }
    return this;
};