define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/user/item.html'
  ], function($, _, Backbone, LocationTemplate){

    var LocationView = Backbone.View.extend({
      tagName: 'div',
      className: 'location',
      events: {
        'click': 'showLocation'
      },

      initialize: function(){

            // Set up event listeners
            this.listenTo(this.model, 'change', this.render);
      },

      showLocation: function(){

            //redirect to location show page
            Backbone.history.navigate('/locations/show/' + this.model.get('_id'), { trigger: true });
        },

      render: function(){
        
        //compil the template
        var compiledTemplate = _.template(LocationTemplate, this.model.attributes);
        //set the contentin the app container
        this.$el.html(compiledTemplate);

        //get the location
        var loc = this.model.attributes.lat + ',' + this.model.attributes.lng;

        //set google static map api parameters
        var params = {
          size: '640x200',
          maptype: 'roadmap',
          markers: 'size:mid|color:0xFFAFF3|' + loc,
          sensor: false,
          center: loc
        }
        //get the url
        var backgroundUrl = "http://maps.googleapis.com/maps/api/staticmap?" + $.param(params);
        //set as location container's background url
        this.$el.css('background-image', 'url(' + backgroundUrl + ')');

        return this;
      }
    });
  // Our module now returns our view
  return LocationView;
});