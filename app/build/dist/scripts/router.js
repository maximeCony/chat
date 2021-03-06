define([
  'jquery',
  'underscore',
  'backbone',
  'views/message/FormView',
  'collections/MessageCollection',
  'collections/RoomCollection',
  'views/message/ListView',
  'views/room/ListView',
  'views/user/FormView',
  'views/room/FormView'
  ], function($, _, Backbone, MessageFormView, MessageCollection, RoomCollection, MessageListView, RoomListView, UserFormView, RoomFormView){
    
    var AppRouter = Backbone.Router.extend({
      routes: { 
        "": "user",
        "room": "room",
        "chat": "chat"
    },

    initialize: function() {
      //get the app container
      this.appContainer = $('#app');
    },

    start: function(){
      //start backbon history
      Backbone.history.start();
    },

    room: function(){

      console.log('room')

      //initialize the collection
      var rooms = new RoomCollection();
      
      //create a new MessageFormView
      var roomFormView = new RoomFormView();
      
      //set render content to the app container
      this.appContainer.empty().append(
        "<h2>Create a new room</h2>",
        roomFormView.render().el,
        "<h2>Or join an existing one</h2>",
        '<section id="rooms"></section>'
      );
      
      // setup the messages view
      var roomListView = new RoomListView({
        collection: rooms,
        el: $('#rooms')
      });
      
      //render models already on the collection
      roomListView.render();

      //get data from the server
      rooms.fetch();
    },

    user: function(){
      
      //create a new UserFormView
      var userFormView = new UserFormView();
      
      //set the content of the view to the application container
      this.appContainer.empty().append(
        "<h2>What's your name?</h2>", 
        userFormView.render().el
      );
    },

    chat: function(){

      //if the user reload the page (and losse his socket) he will have to rejoin
      if(!Backbone.history.roomName) {
        //redirect to /room
        return Backbone.history.navigate('room', { trigger: true });
      }

      //initialize the collection
      var messages = new MessageCollection();

      //create a new MessageFormView
      var messageFormView = new MessageFormView();
      
      //set the content of the view to the application container
      this.appContainer.empty().append(
        "<div id='roomNameTitle'>" + Backbone.history.roomName + 
        "</div><section id='messages'></section>", 
        messageFormView.render().el
      );

      // setup the messages view
      var messageListView = new MessageListView({
        collection: messages,
        el: $('#messages')
      }).resize();

      //render models already on the collection
      messageListView.render();

      //get data from the server
      messages.fetch();
      
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