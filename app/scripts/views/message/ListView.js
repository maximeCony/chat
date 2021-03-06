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
        //resize event
        $(window).off('resize').on('resize', this.resize);
      },

      resize: function(){
        //set chat container height
        $('#messages').height($(window).height() - $('#messageForm').height() - 15);
        return this;
      },

      addOne: function(message){

        //create a new collection view
        var messageView = new MessageView({model: message});
        //render the collection
        this.$el.append(messageView.render().el);
        //scroll to bottom
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
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