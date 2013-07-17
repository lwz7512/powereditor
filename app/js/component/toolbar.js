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

  String.prototype.trimnewline = function() {
      return this.replace(/\n|\r/g, '');
    };

  /**
   * Module exports
   */

  return defineComponent(toolbar);

  /**
   * Module function
   */

  function toolbar() {

      var editor, initeditor = false;

      this.defaultAttrs({
          //selectors
          addHTMLSelector: '#add_html',
          saveHTMLSelector: '#saveHTML'
        });

      this.after('initialize', function() {
          var template = utils.tmpl(htmlEditorTmpl);
          $('body').append(template); //prepare the editor html
          
          
          this.on(document, 'click', {
              'addHTMLSelector': this.addHTMLSelectorClickHandler, //click on add html button
              'saveHTMLSelector': this.sendHTMLHandler,
            });

        }); //end of initialize


      this.sendHTMLHandler = function() {
          $('#bootStrapModal').modal('hide');

          var rawdata = editor.getData().trimnewline();
          
          //notify centralstage to render
          this.trigger('HtmlWriteDown', {html: rawdata});
        };

      this.addHTMLSelectorClickHandler = function() {
          // show the editor dialog
          $('#bootStrapModal').modal();
          
          this.embedCKEditor();//create ckeditor in dialog

          editor.setData('');
          
        };

      this.editHTMLConfirmHandler = function() {
          this.trace('save html...');
        };

      
      this.embedCKEditor = function() {
        if(initeditor) {
          return;
        }

        var iWidth = '380px'; //弹出窗口的宽度;
        var iHeight = '480px'; //弹出窗口的高度;         
        CKEDITOR.replace('content', {
            lang: 'zh-cn',
            width: 780,//编辑器的宽度
            height: 350,//编辑器高度
            filebrowserImageUploadUrl: '/ckeditorUpload/ckuploader?Type=Image',
            filebrowserImageBrowseUrl: '/ckeditorUpload/filebrowser.jsp?Type=Image',
            filebrowserVideoBrowseUrl: '/ckeditorUpload/filebrowser.jsp?Type=Video',
            filebrowserWindowWidth: iWidth,
            filebrowserWindowHeight: iHeight,
            allowedContent: true,
            //startupFocus : true,//this function cause editor input failed occasionally!
            resize_enabled: false
          });
        
        initeditor = true;
        editor = CKEDITOR.instances['content'];
      }

      this.trace = function(msg) {
          if (console) { console.log(msg);}
        };

    } //end of toolbar

}); //end of module
