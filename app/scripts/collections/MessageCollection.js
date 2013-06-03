define([
	'underscore',
	'backbone',
  'models/MessageModel'
  ], function(_, Backbone, MessageModel){
  	var MessageCollection = Backbone.Collection.extend({
  		
      url: 'messages',
      // Will hold objects of the Message model
      model: MessageModel,

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
  return MessageCollection;
});