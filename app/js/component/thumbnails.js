define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  // var thumbicon = require('./thumbicon');
  var defineComponent = require('flight/lib/component');
  var utils = require('js/utils');
  var thumbTmpl = require('text!templates/thumbitem.html');
  
  var thumbitems = [];
  /**
   * Module exports
   */

  return defineComponent(thumbnails);

  /**
   * Module function
   */

  function thumbnails() {

    this.defaultAttrs({
      slideContainer: '#slides',
      thumbItemSelector: 'div.thumbitem',
      selectedClass: 'selected',
      counter: 0,
    });//end of defaultAttrs

    this.after('initialize', function () {
      this.on(document, 'TOOL_ADD_PAGE', this.onAddPage);

      this.on('click', {
          'thumbItemSelector': this.toggleItemSelect
        });
      
      var firstThumbnail = this.onAddPage();//create the first thumbnail!
      firstThumbnail.addClass(this.attr.selectedClass);

    });//end of initialize

    this.onAddPage = function() {
      // this.trace(this.attr.slideContainer);
      // thumbicon.create('call thumbicon!');
      
      this.attr.counter ++;
      var param = {counter: this.attr.counter};
      var template = utils.tmpl(thumbTmpl);
      this.select('slideContainer').append(template(param));

      var newchild= this.select('slideContainer').children().last();
      newchild.data('id', this.attr.counter);
      thumbitems.push(newchild);
      //this.trace(newchild.data('id'));

      return newchild;
    };

    this.toggleItemSelect = function(ev, data) {
      //this.trace(thumbitems);
      //clear all selected first
      for(var i in thumbitems){
        thumbitems[i].removeClass(this.attr.selectedClass);//unselect
      }

      var $item = $(data.el);
      $item.addClass(this.attr.selectedClass);//select
      
      this.trigger('ThumbNailSelected');//component dispatch event!

    };

    this.trace = function(msg) {
      if(console) { console.log(msg); }
    };

  }//end of thumbnails

});//end of module
