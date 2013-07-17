/**
 * exporter function module
 * 2013/07/17
 */
define(function () {

  'use strict';

  /**
   * Module private property
   */

  var id = 1;
  var trace = function(msg) {
      if(console) { console.log(msg); }
    };

  /**
   * Module private function
   */

  function exporter(msg) {
    
    trace(msg);
      

  }//end of exporter

  return {//export API
    create: exporter,
    id: id,
  };

});//end of module
