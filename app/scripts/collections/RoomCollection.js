define([
  'underscore',
  'backbone',
  'models/RoomModel'
  ], function(_, Backbone, RoomModel){
    var RoomCollection = Backbone.Collection.extend({
      
      url: 'rooms',
      // Will hold objects of the Room model
      model: RoomModel,

      initialize: function () {
          // bind create event from the server
          this.ioBind('create', window.socket, this.serverCreate, this);
          this.ioBind('join', window.socket, this.serverJoin, this);
      },
      
      serverCreate: function (room) {
          // make sure no duplicates, just in case
          if (!this.get(room._id)) {
            this.add(room);
          }
      },

      serverJoin: function(room){
        //get the roomName
        Backbone.history.roomName = room.name;
        //navigate to the chat page
        Backbone.history.navigate('chat', { trigger: true });
      }

    });
  return RoomCollection;
});