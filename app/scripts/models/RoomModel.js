define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var RoomModel = Backbone.Model.extend({
    //objet id
    idAttribute: "_id",
    socket: window.socket,
    urlRoot: 'room'
  });
  // Return the model for the module
  return RoomModel;
});