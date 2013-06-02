define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var UserModel = Backbone.Model.extend({
    //objet id
    idAttribute: "_id",
    urlRoot: '/users'
  });
  // Return the model for the module
  return UserModel;
});