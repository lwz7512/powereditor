/**
  template flight component
  2013/07/17
*/
define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(blank);

  /**
   * Module function
   */

  function blank() {

    this.defaultAttrs({

    });//end of attrs

    this.after('initialize', function () {

    });//end of initialize

    this.trace = function(msg) {
      if (console) { console.log(msg);}
    };

  }//end of component

});//end of module
