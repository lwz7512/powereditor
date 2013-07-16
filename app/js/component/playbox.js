define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(playbox);

  /**
   * Module function
   */

  function playbox() {
    this.defaultAttrs({
      //selectors
      newPageSelector: '#new_page',

    });

    this.newPageSelectorClickHandler = function() {
      // this.trace('New page clicked!');
      this.trigger('TOOL_ADD_PAGE');
    };

    this.after('initialize', function () {
      this.on(document, 'click', {
        'newPageSelector': this.newPageSelectorClickHandler,//click on new page button
      });

    });//end of initialize

    this.trace = function(msg) {
      if(console) { console.log(msg); }
    };

  }//end of playbox

});//end of module
