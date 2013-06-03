require.config({
	 shim: {
		'socketio': {
			exports: 'io'
		}
	},
	 paths: {
    	jquery: 'vendor/jquery/jquery.min',
    	underscore: 'vendor/underscore-amd/underscore-min',
    	socketio: '../socket.io/socket.io',
    	backbone: 'vendor/backbone-amd/backbone-min',
    	backbone_iosync: 'vendor/backbone.iobind/dist/backbone.iosync.min',
    	backbone_iobind: 'vendor/backbone.iobind/dist/backbone.iobind.min'
    	
	}
});

require([
  // Load our app module and pass it to our definition function
  'app',
   'socketio'
], function(App, io){

	window.socket = io.connect('http://localhost');
	/*
	*   Log sockets
	*/
	var x = socket.$emit;
	socket.$emit = function(){
		var event = arguments[0];
		var feed  = arguments[1];
		//Log
		console.log(event + ":", feed);
		//To pass listener  
		x.apply(this, Array.prototype.slice.call(arguments));       
	};

	// The "app" dependency is passed in as "App"
	App.initialize();
});