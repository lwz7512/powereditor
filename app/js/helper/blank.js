/**
  template flight module just provide data and function
  2013/07/17
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
  function blank(msg) {
    
    trace(msg);

  }//end of blank


  return {//export API
    create: blank,
    id: id,
  };

});//end of module
