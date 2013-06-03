define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/message/item.html'
  ], function($, _, Backbone, MessageTemplate){

    var MessageView = Backbone.View.extend({
      tagName: 'div',
      className: 'message',

      render: function(){
        
        //compil the template
        var compiledTemplate = _.template(MessageTemplate, this.model.attributes);
        //set the contentin the app container
        this.$el.html(compiledTemplate);

        return this;
      }
    });
  // Our module now returns our view
  return MessageView;
});