require.config({
  	paths: {
    	jquery: 'vendor/jquery/jquery.min',
    	underscore: 'vendor/underscore-amd/underscore-min',
    	backbone: 'vendor/backbone-amd/backbone-min'
	}
});

require([
  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});