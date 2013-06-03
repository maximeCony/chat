define([
  'jquery',
  'underscore',
  'backbone',
  'views/location/ItemView',
  ], function($, _, Backbone, LocationView){

    var LocationListView = Backbone.View.extend({
      tagName: 'div',

      initialize: function(){
        //listen the add event
        this.collection.on('add', this.addOne, this);
      },

      addOne: function(location){
        //create a new collection view
        var locationView = new LocationView({model: location});
        //render the collection
        this.$el.prepend(locationView.render().el);
      },

      render: function(){
        //render all collection's elements
        this.collection.forEach(this.addOne, this);
        return this;
      }
    });
  // Our module now returns our view
  return LocationListView;
});