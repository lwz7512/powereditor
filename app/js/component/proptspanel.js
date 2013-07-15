define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(proptspanel);

  /**
   * Module function
   */

  function proptspanel() {
    this.defaultAttrs({

    });

    this.after('initialize', function () {

    });
  }

});
