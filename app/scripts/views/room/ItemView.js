define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/room/item.html'
  ], function($, _, Backbone, RoomTemplate){

    var RoomView = Backbone.View.extend({
      tagName: 'div',
      className: 'room alert alert-info',

      render: function(){
        
        //compil the template
        var compiledTemplate = _.template(RoomTemplate, this.model.attributes);
        //set the contentin the app container
        this.$el.html(compiledTemplate);

        return this;
      }
    });
  // Our module now returns our view
  return RoomView;
});