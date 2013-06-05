define([
  'jquery',
  'underscore',
  'backbone',
  'backbone_iosync',
  'backbone_iobind',
  'models/roomModel',
  'text!templates/room/form.html'
  ], function($, _, Backbone, backbone_iosync, backbone_iobind, RoomModel, RoomFormTemplate){

    var RoomFormView = Backbone.View.extend({
      tagName: 'form',
      className: 'pure-form',
      id: 'roomForm',
      events: {
        'submit': 'saveRoom' //submit the form
      },

      /*
      * save room
      */
      saveRoom :function(e){

        e.preventDefault();

        //get the inputs
        var name = $('#roomName').val();

        // prevent empty submit
        if (!name) return;
        
        // Create a new room
        var _room = new RoomModel({
          name: name
        });
        
        // save the room (send socket)
        _room.save();

        // empty the content field
        $('#roomName').val('');
        
      },

      render: function(){

        //compil the template
        var compiledTemplate = _.template(RoomFormTemplate);
        //set the contentin the app container
        this.$el.html(compiledTemplate);

        return this;
      }

    });
  // Our module now returns our view
  return RoomFormView;
});