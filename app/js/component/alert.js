define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */
  var defineComponent = require('flight/lib/component');

  var utils = require('js/utils');
  var alertTmpl = require('text!templates/alert.html');

  //TODO: ADD TEMPLATE/UTIL REFERENCE...

  /**
   * Module exports
   */

  return defineComponent(alert);


  /**
   * Module function
   */

  function alert() {

    var todoAction;

    // NOTE: here need to pay attention to ...
    this.defaultAttrs({
      closeBtnSelector: '#closeAlertBtn',
    });

    // CHANGED: record the history edit track...
    this.after('initialize', function () {

      this.on(document, 'AlertShowRequest', this.showAlertWin);

      this.on(document, 'click', {
        'closeBtnSelector': this.closeAlertHandler,
      });

    });//end of initialize

    this.showAlertWin = function (e, data) {
      todoAction = data.action;

      var template = utils.tmpl(alertTmpl);
      $('body').append(template(data)); //insert to dom
      $('#alertModal').modal();
    };

    // FIXME: FUCK THIS METHOD NAME SPELL ERROR!
    // 2013/07/20
    this.closeAlertHandler = function () {
      $('#alertModal').modal('hide');
      $('#alertModal').remove(); //remove from dom

      if (todoAction == 'deleteCurrentPage') {
        //notify the thubmnails to remove the current selection
        this.trigger('RemoveCurrentPage');        
      }

      
    };


  }//end of alert

});//end of module
