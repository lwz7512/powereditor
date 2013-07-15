define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(thumbnails);

  /**
   * Module function
   */

  function thumbnails() {
    this.defaultAttrs({

    });

    this.after('initialize', function () {

    });
  }

});
