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
    var isIE = isIEBrowser();
    //trace(isIE);
    if (isIE) {
      trace('>>> Warning, IE Browser not surport data save!');
      return;
    }


    //convert htmlblock to section, and put in html body...
    var htmlpage = convertoHTML(msg);
    //compose xml meta data...
    var metadata = composeXMLMeta(msg);
    
    return {html: htmlpage, xml: metadata};
    
  }//end of exporter

  function convertoHTML(sections) {    
    var html = '<html>';
    //todo, and head and title?
    html += '<body>';

    var parser = new DOMParser();
    for(var i in sections) {
      html += '<section ' + 'id="' + sections[i].id + '">';      

      var doc = parser.parseFromString(sections[i].html, "text/xml");
      var children = doc.childNodes;
      for(var e = 0; e < children.length; e++){        
        if (children[e].className == 'htmlblock') {//get htmlblock only          
          var elemstr = elementToString(children[e]);
          html += elemstr;          
        }
      }

      html += '</section>';
    }

    html += '</body>';
    html += '</html>';    

    return html;
  }

  function elementToString (elem) {
    var serializer = new XMLSerializer();
    return serializer.serializeToString(elem);
  }

  function composeXMLMeta(sections) {   
    var app = '<app>';
    app += '<pages>';

    var parser = new DOMParser();
    for(var i in sections) {
      app += '<page id="page_' + i + '" width="768" height="1024">';
      app += '<layout>';
      
      var doc = parser.parseFromString(sections[i].html, "text/xml");
      var children = doc.childNodes;
      for(var e = 0; e < children.length; e++){        
        app += createNodeByElement(children[e], sections[i].id);//compose diffrent node
      }

      app += '</layout>';
      app += '</page>';
    }

    app += '</pages>';
    app += '</app>';    

    return app;
  }

  function createNodeByElement(element, secid) {
    var node = '';
    if (element.className == 'htmlblock') {//get htmlblock
      node += '<node id="' + secid + '" type="html" ';
      node += 'src="html/' + secid + '.html" x="0" y="0" ';
      node += 'width="400" height="300" backgroundcolor=""/>';      
    } else if (element.className == 'imageblock') {

    } else if (element.className == 'videoblock') {

    } else if (element.className == 'audioblock') {

    }

    return node;
  }
  

  function isIEBrowser() {
    var Browser = {
        isIE:navigator.userAgent.indexOf("MSIE")>-1 && !window.opera,  
        isGecko:navigator.userAgent.indexOf("Gecko")>-1 && !window.opera 
        && navigator.userAgent.indexOf("KHTML") ==-1,  
        isKHTML:navigator.userAgent.indexOf("KHTML")>-1,  
        isOpera:navigator.userAgent.indexOf("Opera")>-1
      };

    return Browser.isIE;
  }


  return {//export API
    create: exporter,
    id: id,
  };

});//end of module
