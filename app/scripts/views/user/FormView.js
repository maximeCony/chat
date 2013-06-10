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
        
        if(typeof localStorage.USER_NAME === 'undefined') {
          //go back to the username input
          return Backbone.history.navigate('', { trigger: true });
        }
        //compil the template
        var compiledTemplate = _.template(UserFormTemplate, {userName: localStorage.USER_NAME});
        //set the contentin the app container
        this.$el.html(compiledTemplate);
        //used for chaining
        return this;
      }

    });
  // Our module now returns our view
  return UserFormView;
});