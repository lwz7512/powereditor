define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(toolbar);

  /**
   * Module function
   */

  function toolbar() {
    this.defaultAttrs({

    });

    this.after('initialize', function () {

    });
  }

});
