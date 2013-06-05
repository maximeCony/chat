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
      },
      
      serverCreate: function (json) {
          // make sure no duplicates, just in case
          var exists = this.get(json._id);
          if (!exists) {
            this.add(json);
          }
      }

    });
  return RoomCollection;
});