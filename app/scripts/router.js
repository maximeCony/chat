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
        "room/:_id/chat": "chat"
    },

    initialize: function() {
      //get the app container
      this.appContainer = $('#app');
      // initialize message collection
      this.messages = new MessageCollection();
      this.rooms = new RoomCollection();
    },

    start: function(){
      //start backbon history
      Backbone.history.start();
    },

    room: function(){
      
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
        collection: this.rooms,
        el: $('#rooms')
      });
      
      //render models already on the collection
      roomListView.render();

      //get data from the server
      this.rooms.fetch();
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

    chat: function(_id){

      //emit socket to join the room
      window.socket.emit('room:join', {_id: _id});

      //create a new MessageFormView
      var messageFormView = new MessageFormView();
      
      //set the content of the view to the application container
      this.appContainer.empty().append(
        "<section id='messages'></section>", 
        messageFormView.render().el
      );

      // setup the messages view
      var messageListView = new MessageListView({
        collection: this.messages,
        el: $('#messages')
      }).resize();

      //render models already on the collection
      messageListView.render();

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