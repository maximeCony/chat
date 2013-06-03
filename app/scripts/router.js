define([
  'jquery',
  'underscore',
  'backbone',
  'views/message/FormView',
  'collections/MessageCollection',
  'views/message/ListView',
  ], function($, _, Backbone, MessageFormView, MessageCollection, MessageListView){
    
    var AppRouter = Backbone.Router.extend({
      routes: { 
        "": "chat",
        "chat": "chat"
    },

    initialize: function(){
      //get the app container
      this.appContainer = $('#app');
      // initialize message collection
      this.messages = new MessageCollection();
    },

    start: function(){
      //start backbon history
      Backbone.history.start();
    },

    start: function(){
      //start backbon history
      Backbone.history.start();
    },

    chat: function(){
      //create a new MessageFormView
      this.messageFormView = new MessageFormView();
      // setup the messages view
      var messageListView = new MessageListView({collection: this.messages});
      //set render content to the app container
      this.appContainer.append(messageListView.render().el, this.messageFormView.render().el);
      //get data from the server
      this.messages.fetch();
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