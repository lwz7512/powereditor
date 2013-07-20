/*
  main module setup...
*/
define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var sections = require('model/sections');
  var playbox = require('component/playbox');
  var toolbar = require('component/toolbar');
  var thumbnails = require('component/thumbnails');
  var centralstage = require('component/centralstage');
  var alert = require('component/alert');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    
    sections.attachTo(document);//import first

    playbox.attachTo(document);
    toolbar.attachTo(document);
    thumbnails.attachTo(document);
    centralstage.attachTo(document);
    alert.attachTo(document);
    
  }

});
