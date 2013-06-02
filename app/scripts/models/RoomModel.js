define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var RoomModel = Backbone.Model.extend({
    //objet id
    idAttribute: "_id",
    urlRoot: '/rooms'
  });
  // Return the model for the module
  return RoomModel;
});