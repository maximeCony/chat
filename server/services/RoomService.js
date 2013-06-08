 module.exports = function(models){

    this.cleanRooms = function(){

        console.log('knock knock... Room service');

        //get two hours ago date (7200000)
        var past = Date.now() - 7200000;
        
        //find all rooms
        //models.Room.remove does not call the .pre('remove' event 
        //so I must use find
        models.Room.find({
           "lastActivity": {"$lt": past}
        }, function(err, rooms){
            if (err) return handleError(err);
            //and then remove them
            for(var i in rooms) {
                rooms[i].remove();
            }
        });
    };

    return this;
};
