define([
  'jquery',
  'underscore',
  'bbloader',
  'models/RoomModel',
  'text!templates/room/form.html'
  ], function($, _, Backbone, RoomModel, RoomFormTemplate){

    var RoomFormView = Backbone.View.extend({
      tagName: 'form',
      className: 'pure-form',
      id: 'roomForm',
      events: {
        'submit': 'saveRoom', //submit the form
        'change #roomStatus': 'toogleRoomStatus'
      },

      /*
      * save room
      */
      saveRoom :function(e){

        e.preventDefault();

        //get the inputs
        var name = this.$('#roomName').val();

        // prevent empty submit
        if (!name) return;
        
        // Create a new room
        var _room = new RoomModel({
          name: name
        });

        if(this.$('#roomStatus').val() === "Private") {

          //get the password
          var password = this.$('#roomPassword').val();

          // prevent empty submit
          if (!password) return;
          _room.set('password', password);

          console.log('_room', _room);
        }

        // save the room (send socket)
        _room.save();
      },

      render: function(){

        //compil the template
        var compiledTemplate = _.template(RoomFormTemplate);
        //set the contentin the app container
        this.$el.html(compiledTemplate);

        return this;
      },

      /*
      * Toogle Room Status
      */
      toogleRoomStatus :function(){

        if(this.$('#roomStatus').val() === "Public") {
          this.$('#roomPasswordGroup').hide();
        } else {
          this.$('#roomPasswordGroup').show();
        }
      }

    });
  // Our module now returns our view
  return RoomFormView;
});