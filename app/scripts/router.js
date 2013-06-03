define([
  'jquery',
  'underscore',
  'backbone',
  'views/message/FormView',
  ], function($, _, Backbone, MessageFormView){
    
    var AppRouter = Backbone.Router.extend({
      routes: { 
        "": "index"
    },

    start: function(){
      //start backbon history
      Backbone.history.start();
    },

    initialize: function(){
      //get the app container
      this.appContainer = $('#app');
    },

    index: function(){
      //create a new MessageFormView
      this.messageFormView = new MessageFormView();
      //set render content to the app container
      this.appContainer.html(this.messageFormView.render().el)
    }
});

var initialize = function(){

  appRouter = new AppRouter;
      //start the app
      appRouter.start();
  };

  return {
      initialize: initialize
  };
});