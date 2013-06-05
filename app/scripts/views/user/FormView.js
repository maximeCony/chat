define([
  'jquery',
  'underscore',
  'backbone',
  'models/userModel',
  'text!templates/user/form.html'
  ], function($, _, Backbone, UserModel, UserFormTemplate){

    var UserFormView = Backbone.View.extend({
      tagName: 'form',
      className: 'pure-form',
      id: 'userForm',
      events: {
        'submit': 'saveUser' //submit the form
      },

      /*
      * send user
      */
      saveUser :function(e){

        e.preventDefault();

        //get the inputs
        var userName = $('#userName').val();

        // prevent empty submit
        if (!userName) return;
        
        // Create a new task
        var _user = new UserModel({
          userName: userName
        });
        
        // save the user (send socket)
        _user.save();
        // empty the content field
        $('#userName').val('');
        
      },

      render: function(){

        //compil the template
        var compiledTemplate = _.template(UserFormTemplate);

        //set the contentin the app container
        this.$el.html(compiledTemplate);

        return this;
      }

    });
  // Our module now returns our view
  return UserFormView;
});