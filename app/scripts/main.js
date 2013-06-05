require.config({
	paths: {
		jquery: 'vendor/jquery/jquery.min',
		underscore: 'vendor/underscore-amd/underscore',
		backbone: 'vendor/backbone-amd/backbone-min',
		backbone_iosync: 'vendor/backbone.iobind/dist/backbone.iosync.min',
		backbone_iobind: 'vendor/backbone.iobind/dist/backbone.iobind.min'	
	}
});

require([
  'app'
], function(App){

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