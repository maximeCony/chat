define([
  'jquery',
  'underscore',
  'bbloader',
  'models/messageModel',
  'text!templates/message/form.html'
  ], function($, _, Backbone, MessageModel, MessageFormTemplate){

    var MessageFormView = Backbone.View.extend({
      tagName: 'form',
      className: 'pure-form',
      id: 'messageForm',
      events: {
        'submit': 'sendMessage' //submit the form
      },

      /*
      * send message
      */
      sendMessage :function(e){

        e.preventDefault();

        //get the inputs
        var content = $('#messageContent').val();

        // prevent empty submit
        if (!content) return;

        // Create a new message
        var _message = new MessageModel({
          content: content,
          userName: localStorage.USER_NAME
        });
        
        // save the message (send socket)
        _message.save();

        // empty the content field
        $('#messageContent').val('');
        
      },

      render: function(){

        //compil the template
        var compiledTemplate = _.template(MessageFormTemplate);
        //set the contentin the app container
        this.$el.html(compiledTemplate);

        return this;
      }

    });
  // Our module now returns our view
  return MessageFormView;
});