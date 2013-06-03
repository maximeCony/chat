define([
  'jquery',
  'underscore',
  'backbone',
  'backbone_iosync',
  'backbone_iobind',
  'models/messageModel',
  'text!templates/message/form.html'
  ], function($, _, Backbone, backbone_iosync, backbone_iobind, MessageModel, MessageFormTemplate){

    var MessageFormView = Backbone.View.extend({
      tagName: 'div',
      className: 'messageForm',
      events: {
        'submit #messageForm': 'sendMessage' //submit the form
      },

      /*
      * send message
      */
      sendMessage :function(e){

        e.preventDefault();

        //get the inputs
        var content = $('#messageContent').val();

        console.log(content);

        // prevent empty submit
        if (!content) return;
        
        // Create a new task
        var _message = new MessageModel({
          content: content
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