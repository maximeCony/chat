define([
  'jquery',
  'underscore',
  'backbone',
  'views/message/ItemView',
  ], function($, _, Backbone, MessageView){

    var MessageListView = Backbone.View.extend({
      
      tagName: 'div',
      className: 'messages',
      
      initialize: function(){
        //listen the add event
        this.collection.on('add', this.addOne, this);
      },

      addOne: function(message){

        //create a new collection view
        var messageView = new MessageView({model: message});
        //render the collection
        this.$el.append(messageView.render().el);

        //this.$el.scrollTop(this.$el.height()+ 276)
      },

      render: function(){
        //render all collection's elements
        this.collection.forEach(this.addOne, this);
        return this;
      }
    });
  // Our module now returns our view
  return MessageListView;
});