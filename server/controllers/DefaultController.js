 module.exports = function(handleError, models){

    //get index
    this.index = function(req, res){

        //send index.html
        res.render('index');
    };

    return this;
};