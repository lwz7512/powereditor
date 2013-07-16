define(function(require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  var utils = require('js/utils');
  var htmlEditorTmpl = require('text!templates/bootCKEditor.html');

  require('jquery/plugins/bootstrap-modal');
  require('jquery/plugins/bootstrap-transition');
  require('ckeditor/ckeditor');

  /**
   * Module exports
   */

  return defineComponent(toolbar);

  /**
   * Module function
   */

  function toolbar() {

      this.defaultAttrs({
          //selectors
          addHTMLSelector: '#add_html',
          editSelector: '#content'
        });

      this.after('initialize', function() {
          var template = utils.tmpl(htmlEditorTmpl);
          $('body').append(template); //prepare the editor html

          // this.embedCKEditor();//create ckeditor in dialog

          this.on(document, 'click', {
              'addHTMLSelector': this.addHTMLSelectorClickHandler, //click on add html button
            });

        }); //end of initialize

      this.addHTMLSelectorClickHandler = function() {
          // show the editor dialog
          $('#bootStrapModal').modal();
          
          this.embedCKEditor();//create ckeditor in dialog

        };

      this.embedCKEditor = function() {
          var iWidth = '380px'; //弹出窗口的宽度;
          var iHeight = '480px'; //弹出窗口的高度;         
          CKEDITOR.replace('content', {
              lang: 'zh-cn',
              width: 745,
              height: 350,
              filebrowserImageUploadUrl: '/ckeditorUpload/ckuploader?Type=Image',
              filebrowserImageBrowseUrl: '/ckeditorUpload/filebrowser.jsp?Type=Image',
              filebrowserVideoBrowseUrl: '/ckeditorUpload/filebrowser.jsp?Type=Video',
              filebrowserWindowWidth: iWidth,
              filebrowserWindowHeight: iHeight,
              allowedContent: true,
              startupFocus : true
            });
        }

      this.trace = function(msg) {
          if (console) { console.log(msg);}
        };

    } //end of toolbar

}); //end of module
