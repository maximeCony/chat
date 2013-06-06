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
        "<h2>Join a room</h2>",
        '<section id="rooms"></section>',
        "<h2>Or create a new one</h2>",
        roomFormView.render().el
      );
      // setup the messages view
      var roomListView = new RoomListView({
        collection: this.rooms,
        el: $('#rooms')
      });
      //get data from the server
      this.rooms.fetch();
    },

    user: function(){
      //create a new UserFormView
      var userFormView = new UserFormView();
      this.appContainer.empty().append("<h2>What's your name?</h2>", userFormView.render().el);
    },

    chat: function(_id){

      window.socket.emit('room:join', {_id: _id});

      //create a new MessageFormView
      var messageFormView = new MessageFormView();
      //set render content to the app container
      this.appContainer.empty().append("<section id='messages'></section>", messageFormView.render().el);

      var messagesContainer = $('#messages');

      // setup the messages view
      var messageListView = new MessageListView({
        collection: this.messages,
        el: messagesContainer
      });
      //get data from the server
      this.messages.fetch();
      //set chat container height
      messagesContainer.height($(window).height() - $('#messageForm').height() - 15);
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