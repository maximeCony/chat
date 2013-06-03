define([
  'jquery',
  'underscore',
  'backbone',
  'models/messageModel',
  'text!templates/message/form.html'
  ], function($, _, Backbone, MessageModel, MessageFormTemplate){

    var MessageFormView = Backbone.View.extend({
      tagName: 'div',
      className: 'messageForm',
      events: {
        'submit': 'sendMessage' //submit the form
      },

      initialize: function(){

        this.contentInput = $('#messageContent');
      },

      /*
      * send message
      */
      sendMessage :function(e){

        e.preventDefault();

        //get the inputs
        var content = this.contentInput.val();

        // prevent empty submit
        if (!content) return;
        
        // Create a new task
        var _message = new MessageModel({
          content: content
        });
        
        // save the message (send socket)
        _task.save();
        // empty the content field
        this.contentInput.val('');

        //save the message
        this.model.save(messagePrototype);
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