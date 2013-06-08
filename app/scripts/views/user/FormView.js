define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/user/form.html'
  ], function($, _, Backbone, UserFormTemplate){

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
        localStorage.USER_NAME = $('#userName').val();
        //navigate to room selection
        Backbone.history.navigate('room', { trigger: true });
        
      },

      render: function(){
        //get user name
        var userName = localStorage.USER_NAME || "";
        //compil the template
        var compiledTemplate = _.template(UserFormTemplate, {userName: userName});
        //set the contentin the app container
        this.$el.html(compiledTemplate);
        //used for chaining
        return this;
      }

    });
  // Our module now returns our view
  return UserFormView;
});