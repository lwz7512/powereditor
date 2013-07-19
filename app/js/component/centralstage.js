define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  var utils = require('js/utils');
  var htmlblockTmpl = require('text!templates/htmlblock.html');
  // var sections = require('model/sections');

  /**
   * Module exports
   */

  return defineComponent(centralstage);

  /**
   * Module function
   */

  function centralstage() {

    /**
     * define all selector key for later flight dom search
     */
    this.defaultAttrs({
      stageSelector: '#totalcanvas',
      htmlblockSelector: '.htmlblock',

    });

    /**
     * module intialization action
     */
    this.after('initialize', function () {
      this.on(document, 'HtmlWriteDown', this.updateHtmlBlock);//receive html content from editor
      this.on(document, 'CurrentSectionReady', this.reRenderBlocks);
      this.on(document, 'ClearStage', this.clearStage);

    });//end of initialize

    this.clearStage = function () {
      this.select('stageSelector').empty();
    };

    this.reRenderBlocks = function (e, data) {
      this.select('stageSelector').empty().append(data.html);
    };

    this.updateHtmlBlock = function (e, data) {

      if(this.isNull('htmlblockSelector')){//if htmlblock not exist, 
        var template = utils.tmpl(htmlblockTmpl);
        this.select('stageSelector').append(template);//create one
        this.trace('>>> htmlblock created!');
      }

      var newhtml = data.html;
      this.select('htmlblockSelector').empty().append(newhtml);//update htmlblock

      this.refreshed();
    };

    this.updateImageBlock = function (e, data) {
      //TODO, ...

      this.refreshed();
    };

    this.updateVideoBlock = function (e, data) {
      //TODO, ...
      
      this.refreshed();
    };

    this.updateAudioBlock = function (e, data) {
      //TODO, ...
      
      this.refreshed();
    };

    this.refreshed = function () {
      var innerhtml = this.select('stageSelector').html();
      innerhtml = $.trim(innerhtml.replace(/<!--(.*?)-->/ig, ''));//remove comment
      // this.trace('>>> stage content: '+innerhtml);
      this.trigger('StageUpdated', { html : innerhtml});//notify model to update
    };


    this.isNull = function (selectorattr) {
      if (this.select(selectorattr).length) {
        return false;
      }
      return true;
    };

    this.trace = function(msg) {
      if (console) { console.log(msg);}
    };


  }//end of centralstage;

});//end of module
