define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  var utils = require('js/utils');
  var saveConfirmTmpl = require('text!templates/saveConfirm.html');

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
      exportPageSelector: '#export_slide',
      sendConfirmSelector: '#savePages',
      deletePageSelector: '#delete_page',
    });

    this.newPageSelectorClickHandler = function() {
      // thumbnails module listen on this event
      this.trigger('TOOL_ADD_PAGE');
    };

    this.after('initialize', function () {
      var template = utils.tmpl(saveConfirmTmpl);
      $('body').append(template); //prepare the confirm dialog html

      this.on(document, 'click', {
        'newPageSelector': this.newPageSelectorClickHandler,//click new page button
        'exportPageSelector': this.popupExportConfirmHandler,//click export pages button
        'sendConfirmSelector': this.sendPagesHandler,//click save confirm button in dialog
        'deletePageSelector': this.deletePageHandler,//click on delete page button

      });

    });//end of initialize

    this.deletePageHandler = function () {
      this.trigger('AlertShowRequest', {message: '确定要删除当前页面吗？'});
    };

    this.popupExportConfirmHandler = function () {
      $('#exportConfirmModal').modal();
    };

    this.sendPagesHandler = function () {
      $('#exportConfirmModal').modal('hide');
      //TODO, trigger event to sections model to send data...
      this.trigger('SendPagesToBackend');
    };

    this.trace = function(msg) {
      if(console) { console.log(msg); }
    };

  }//end of playbox

});//end of module
