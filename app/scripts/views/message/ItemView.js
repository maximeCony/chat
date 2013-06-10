define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/message/item.html'
  ], function($, _, Backbone, MessageTemplate){

    var MessageView = Backbone.View.extend({
      tagName: 'div',
      className: 'alert message',

      render: function(){

        if(typeof localStorage.USER_NAME === 'undefined') {
          //go back to the username input
          return Backbone.history.navigate('', { trigger: true });
        }

        //compil the template
        var compiledTemplate = _.template(MessageTemplate, this.model.attributes);

        if(localStorage.USER_NAME === this.model.attributes.userName) {
          //if the message is from the local user
          this.$el.addClass('alert-success userBubble');
        } else {
          //if the message is from an other user
          this.$el.addClass('alert-info bubble');
        }
        //set the contentin the app container
        this.$el.html(compiledTemplate);

        return this;
      }
    });
  // Our module now returns our view
  return MessageView;
});