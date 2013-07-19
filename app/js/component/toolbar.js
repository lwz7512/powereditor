define(function(require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  var utils = require('js/utils');
  var htmlEditorTmpl = require('text!templates/bootCKEditor.html');
  var exporterModule = require('helper/exporter');

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

          this.on(document, 'CurrentSectionServed', this.currentSectionHandler);//listen on section event
          
          this.on(document, 'click', {
            'addHTMLSelector': this.addHTMLSelectorClickHandler, //click on add html button
            'saveHTMLSelector': this.cacheHTMLHandler,
          });

        }); //end of initialize


      this.cacheHTMLHandler = function() {
          $('#bootStrapModal').modal('hide');

          var trimmed = editor.getData().trimnewline();          
          //notify centralstage to render
          this.trigger('HtmlWriteDown', {html: trimmed});
        };

      this.addHTMLSelectorClickHandler = function() {
          // show the editor dialog
          $('#bootStrapModal').modal();
          
          this.embedCKEditor();//create ckeditor in dialog

          //GET CURRENT SECTION FROM SECTIONS MODULE
          this.trigger('RequestCurrentSection');
          
        };

      this.currentSectionHandler = function(e, data) {
          this.trace(data.html);
          //chrome can convert html element in current doc
          var doc = exporterModule.strToElement(data.html);          
          var children = $(doc).find("div");
          var defaulthtml = '';          

          for(var i = 0; i < children.length; i++){
            if (children[i].className == 'htmlblock') {//get htmlblock              
              defaulthtml = children[i].innerHTML;//NOTE THIS API FOR INNER DOM ELEMENT!
            }
          }
          this.trace("restore html: "+defaulthtml);
          if(editor) {
            editor.setData(defaulthtml);
          }
      };

      this.editHTMLConfirmHandler = function() {
        this.trace('save html...');
      };
      
      this.embedCKEditor = function() {
        if(initeditor) {
          return;
        }

        var iWidth = 380; //弹出窗口的宽度;
        var iHeight = 480; //弹出窗口的高度;         
        CKEDITOR.replace('content', {
            lang: 'zh-cn',
            width: 780,//编辑器的宽度
            height: 350,//编辑器高度
            filebrowserBrowseUrl : '/manager/ckfinder/ckfinder.html',
            filebrowserImageBrowseUrl : '/manager/ckfinder/ckfinder.html?type=Images',
            filebrowserUploadUrl : '/manager/ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Files',
            filebrowserImageUploadUrl : '/manager/ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Images',
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
