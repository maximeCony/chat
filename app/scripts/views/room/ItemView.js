define([
  'jquery',
  'underscore',
  'bbloader',
  'text!templates/room/item.html'
  ], function($, _, Backbone, RoomTemplate){

    var RoomView = Backbone.View.extend({
      tagName: 'div',
      className: 'room alert alert-info',
      events: {
        'submit .joinButtonBox': 'joinRoom'
      },

      initialize: function () {
        this.model.ioBind('badPassword', window.socket, this.badPassword, this);
      },

      render: function(){
        
        //compil the template
        var compiledTemplate = _.template(RoomTemplate, this.model.attributes);
        //set the contentin the app container
        this.$el.html(compiledTemplate);

        return this;
      },

      joinRoom: function(){

        this.$('.joinRoom').html('Wait');

        //get the password input value
        var passwordInput = this.$('.roomPassword').val();

        //prevent empty validation
        if(passwordInput === '') return this.badPassword();

        //get the password value (null mean no password)
        var password = passwordInput || null;

        //emit socket to join the room
        window.socket.emit('room:join', {
          _id: this.model.attributes._id,
          password: password
        });
      },

      badPassword: function(){

        this.$('.joinRoom').html('Retry');
        this.$el.removeClass('alert-info').addClass('alert-error');
        return false;
      }

    });
  // Our module now returns our view
  return RoomView;
});