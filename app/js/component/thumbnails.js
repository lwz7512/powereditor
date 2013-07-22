define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  // var thumbicon = require('./thumbicon');
  var defineComponent = require('flight/lib/component');
  var utils = require('js/utils');
  var thumbTmpl = require('text!templates/thumbitem.html');
    
  /**
   * Module exports
   */

  return defineComponent(thumbnails);

  /**
   * Module function
   */

  function thumbnails() {

    var thumbitems = [];
    var currentThumbnail;

    this.defaultAttrs({
      slideContainer: '#slides',
      thumbItemSelector: 'div.thumbitem',
      selectedClass: 'selected',
      counter: 0,
    });//end of defaultAttrs

    this.after('initialize', function () {
      this.on(document, 'TOOL_ADD_PAGE', this.onAddPage);
      this.on(document, 'RemoveCurrentPage', this.deletePageHandler);

      this.on('click', {
          'thumbItemSelector': this.toggleItemSelect
        });
      
      this.onAddPage();//create the first thumbnail!      

      this.trace('>>> thumbnails module init!');
    });//end of initialize

    // TODO: Delete current thubmnai, and select current index
    this.deletePageHandler = function() {
      
      if(thumbitems.length == 1){
        return;
      }

      var deletedIndex;
      var currentId = currentThumbnail.data('id');
      // this.trace('current id: '+currentId);
      for(var i in thumbitems){
        if(thumbitems[i].data('id') == currentId){

          thumbitems[i].remove();//delete from visual list
          thumbitems.splice(i, 1);//delete from array
          
          deletedIndex = i;
          //delete the page in selection
          this.trigger('DeleteSelectedThumbnail', {id : currentId});

          break;
        }
      }
      //if deleted the last thumbnail
      if(deletedIndex == thumbitems.length){
        deletedIndex -= 1;//then still select the last
      }

      for(var j in thumbitems){
        // this.trace('current index: '+j);
        if(deletedIndex == j){//select the previous page          
          thumbitems[j].addClass(this.attr.selectedClass);
          currentThumbnail = thumbitems[j];//save the current page
        }
      }

      //Notify the selections model to update...     
      // this.trace(param);
      this.trigger('ThumbNailSelected', {id : currentThumbnail.data('id')});
    };

    this.onAddPage = function() {
      //create thumbnail
      var newSectionId = this.now();
      var param = {id: newSectionId};
      var template = utils.tmpl(thumbTmpl);
      this.select('slideContainer').append(template(param));
      //cache new thumbnail
      var newchild= this.select('slideContainer').children().last();
      newchild.data('id', newSectionId);//save data by jquery api
      thumbitems.push(newchild);

      //prepare toggle selection
      this.clearSelection();
      //select the new thumbnail
      newchild.addClass(this.attr.selectedClass);

      this.notifyModel(newSectionId);

      //save the current page to delete...
      currentThumbnail = newchild;
    };

    this.toggleItemSelect = function(ev, data) {
      
      //clear all selected first
      this.clearSelection();

      var $item = $(data.el);//conver to jquery object
      $item.addClass(this.attr.selectedClass);//select

      //dispatch to sections to keep current page;
      var param = {id : $item.data('id')};
      // this.trace(param);
      this.trigger('ThumbNailSelected', param);

      // save the current page to delete...
      currentThumbnail = $item;
    };

    this.clearSelection = function () {
      for(var i in thumbitems){
        thumbitems[i].removeClass(this.attr.selectedClass);//unselect
      }
    };

    this.notifyModel = function (secid) {
      this.trigger('AddSelection', {id : secid});
    };

    this.trace = function(msg) {
      if(console) { console.log(msg); }
    };

    this.now = function () {
      var date = new Date();
      return date.getTime().toString();
    };


  }//end of thumbnails

});//end of module
