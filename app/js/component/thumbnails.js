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
      
      this.onAddPage();//create the first thumbnail!      

      this.trace('>>> thumbnails module init!');
    });//end of initialize

    this.onAddPage = function() {
      
      this.attr.counter ++;

      //create thumbnail
      var param = {counter: this.attr.counter};
      var template = utils.tmpl(thumbTmpl);
      this.select('slideContainer').append(template(param));
      //cache new thumbnail
      var newchild= this.select('slideContainer').children().last();
      newchild.data('id', this.attr.counter);//save data by jquery api
      thumbitems.push(newchild);

      //prepare toggle selection
      this.clearSelection();
      //select the new thumbnail
      newchild.addClass(this.attr.selectedClass);

      this.notifyModel();
    };

    this.toggleItemSelect = function(ev, data) {
      
      //clear all selected first
      this.clearSelection();

      var $item = $(data.el);//conver to jquery object
      $item.addClass(this.attr.selectedClass);//select

      //dispatch to sections to keep current page;
      var param = {id : $item.data('id')};
      this.trace(param);
      this.trigger('ThumbNailSelected', param);

    };

    this.clearSelection = function () {
      for(var i in thumbitems){
        thumbitems[i].removeClass(this.attr.selectedClass);//unselect
      }
    };

    this.notifyModel = function () {
      this.trigger('AddSelection', {id : this.attr.counter});
    };

    this.trace = function(msg) {
      if(console) { console.log(msg); }
    };

  }//end of thumbnails

});//end of module
