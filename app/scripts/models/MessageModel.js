define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var MessageModel = Backbone.Model.extend({
    //objet id
    idAttribute: "_id",
    urlRoot: '/messages'
  });
  // Return the model for the module
  return MessageModel;
});