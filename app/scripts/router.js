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
      this.appContainer.empty().append(roomFormView.render().el, '<section id="rooms"></section>');
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
      this.appContainer.html(userFormView.render().el);
    },

    chat: function(_id){

      window.socket.emit('room:join', {_id: _id});

      //create a new MessageFormView
      var messageFormView = new MessageFormView();
      //set render content to the app container
      this.appContainer.empty().append('<section id="messages"></section>', messageFormView.render().el);
      // setup the messages view
      var messageListView = new MessageListView({
        collection: this.messages,
        el: $('#messages')
      });
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