define(function () {

  'use strict';

  var id = 1;

  /**
   * Module function
   */
  var trace = function(msg) {
      if(console) { console.log(msg); }
    };

  function thumbicon(msg) {
    
    trace(msg);
      

  }//end of thumbicon

  return {
    create: thumbicon,
    id: id,
  };

});//end of module
