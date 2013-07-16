define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(centralstage);

  /**
   * Module function
   */

  function centralstage() {
    this.defaultAttrs({
      stageSelector: '#centerstage'
    });

    this.after('initialize', function () {
      this.on(document, 'HtmlWriteDown', this.updateCurrentPage);

    });//end of initialize

    this.updateCurrentPage = function (e, data) {
      var html = data.html;
      this.select('stageSelector').empty().append(html);
    };

    this.trace = function(msg) {
      if (console) { console.log(msg);}
    };

  }//end of centralstage;

});//end of module
