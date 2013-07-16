'use strict';

requirejs.config({
  baseUrl: './',
  paths: {
    'page': 'js/page',
    'component': 'js/component',
    'flight': 'bower_components/flight',
    'text': 'bower_components/requirejs/plugins/text',
    'jquery': 'bower_components/jquery',
    'ckeditor': 'bower_components/ckeditor'
  }
});

require(
  [
    'flight/lib/compose',
    'flight/lib/registry',
    'flight/lib/advice',
    'flight/lib/logger',
    'flight/tools/debug/debug'
  ],

  function(compose, registry, advice, withLogging, debug) {
    debug.enable(false);
    compose.mixin(registry, [advice.withAdvice, withLogging]);

    require(['page/default'], function(initializeDefault) {
      initializeDefault();
    });
  }
);
