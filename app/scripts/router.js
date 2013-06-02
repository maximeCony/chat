define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone){
    
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
      console.log('index!');
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