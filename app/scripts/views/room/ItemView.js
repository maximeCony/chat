define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/room/item.html'
  ], function($, _, Backbone, RoomTemplate){

    var RoomView = Backbone.View.extend({
      tagName: 'div',
      className: 'room alert alert-info',
      events: {
        'click .joinRoom': 'joinRoom'
      },

      render: function(){
        
        //compil the template
        var compiledTemplate = _.template(RoomTemplate, this.model.attributes);
        //set the contentin the app container
        this.$el.html(compiledTemplate);

        return this;
      },

      joinRoom: function(){
        //emit socket to join the room
        window.socket.emit('room:join', {
          _id: this.model.attributes._id
        });
      }

    });
  // Our module now returns our view
  return RoomView;
});