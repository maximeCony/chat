define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone){

    var CanvasView = Backbone.View.extend({
      tagName: 'div',
      className: 'drawing',
      
      events:{
        'mousedown': 'mousedown',
        'mousemove': 'mousemove',
        'mouseup': 'stopDrawing',
        'mouseleave': 'stopDrawing'
      },

      initialize: function(){

        this.context = this.el.getContext("2d");
        this.drawing = false;
        this.draws = [];
      },

      mousedown: function(e){

        this.drawing = true;
        var x = e.pageX - this.el.offsetLeft;
        var y = e.pageY - this.el.offsetTop;
        var newPath = [x, y];
        this.draws.push(newPath);
        this.context.moveTo(x, y);
      },

      mousemove: function(e){

        if(this.drawing) {
          
          var x = e.pageX - this.el.offsetLeft;
          var y = e.pageY - this.el.offsetTop;
          var newPath = [x, y];
          
          this.draws[this.draws.length - 1].push(newPath);
          
          this.context.lineTo(x, y);
          this.context.stroke();
          this.context.moveTo(x, y);
        }
      },

      stopDrawing: function(){
        this.drawing = false;
        console.log(this.draws);      
      },

      draw: function(x, y){
        this.context.fillRect(x, y, 1, 1);
      },


    });
  // Our module now returns our view
  return CanvasView;
});