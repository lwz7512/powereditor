/*
  main module setup...
*/
define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var playbox = require('component/playbox');
  var toolbar = require('component/toolbar');
  var thumbnails = require('component/thumbnails');
  var centralstage = require('component/centralstage');
  
  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    playbox.attachTo(document);
    toolbar.attachTo(document);
    thumbnails.attachTo(document);
    centralstage.attachTo(document);
    
  }

});
