/**
 * current app model, save html section for each page;
 * each section include: 
 * htmlblock<div>, imageblock<div>, videoblock<div>, audioblock<div>
 *
 * Mainly in charge of negotiation work among other visual component, 
 * like a Central Controller
 */
define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  var model = {};//core object

  var currentSection;

  /**
   * Module exports
   */

  return defineComponent(sections);

  /**
   * Module function
   */

  function sections() {

    this.defaultAttrs({

    });//end of attrs

    this.after('initialize', function () {
      model.sections = [];
      this.addBlankSection(null, {id: 1, html: ''});

      this.on(document, 'AddSelection', this.addBlankSection);
      this.on(document, 'StageUpdated', this.updateModel);//stage rerendered
      this.on(document, 'ThumbNailSelected', this.toggleCurrentSection);//thumbnail swithed

      this.trace('>>> sections module init!');
    });//end of initialize

    this.toggleCurrentSection = function (e, data) {
      currentSection = this.searchSectionBy(data.id);
      if(!currentSection){
        this.trace('>>> Warning, section not found: '+data.id);
      }else{//notify the centralstage to rerender
        this.trigger('CurrentSectionReady', currentSection);
      }      
    };

    this.updateModel = function (e, data) {
      this.trace('>> updateModel: '+data.html);
      this.trace(this.getAll());

      currentSection.html = data.html;

    };

    this.addBlankSection = function (e, data) {
      var section = {id: data.id, html: ''};
      model.sections.push(section);//save new page

      currentSection = section;//reference current page
      this.trace('>>> New page Added!');

      this.trigger('ClearStage');
    };

    this.updateSection = function (e, data) {

    };

    this.deleteSection = function () {

    };

    this.searchSectionBy = function (id) {
      this.trace('>>> searching: '+id);
      for(var i in this.getAll()){
        if(this.getAll()[i].id == id){
          return this.getAll()[i];
        }
      }
      return null;
    };

    this.getAll = function () {
      return model.sections;
    }

    this.traceAll = function () {
      this.getAll().forEach(function(s){
        this.trace('>>> '+s.id+' : '+s.html);
      }, this);
    }

    this.trace = function(msg) {
      if (console) { console.log(msg);}
    };

  }//end of component

});//end of module
