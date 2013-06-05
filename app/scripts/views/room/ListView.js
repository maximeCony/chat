define([
  'jquery',
  'underscore',
  'backbone',
  'views/room/ItemView',
  ], function($, _, Backbone, RoomView){

    var RoomListView = Backbone.View.extend({
      
      tagName: 'div',
      className: 'rooms',
      
      initialize: function(){
        //listen the add event
        this.collection.on('add', this.addOne, this);
      },

      addOne: function(room){
        //create a new collection view
        var roomView = new RoomView({model: room});
        //render the collection
        this.$el.append(roomView.render().el);
      },

      render: function(){
        //render all collection's elements
        this.collection.forEach(this.addOne, this);
        return this;
      }
    });
  // Our module now returns our view
  return RoomListView;
});