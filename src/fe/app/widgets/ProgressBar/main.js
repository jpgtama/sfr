define([
    'app/service/databus',
    "dijit/ProgressBar",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/Stateful',
    'dojo/_base/lang',
      "dojo/text!./t.html",
      "dojo/_base/declare"
], function(databus, ProgressBar, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, Stateful, lang, template, declare) {

    return declare("app.widgets.ProgressBar", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,


        //    your custom code goes here
        constructor: function(options){
          lang.mixin(this, options)
        },

        postCreate: function(){
          this.inherited(arguments)

          this.barTitleNode.innerText = this.barTitle?this.barTitle:'';

          if(this.value || this.value === 0){
            this.progressTitleNode.innerText = this.value + '%';
          }

          if(this.value || this.value === 0){
            this.internalProgressNode.style.width = this.value + '%';
          }


        },

        startup: function(){
          this.inherited(arguments)
        },

        _setValueAttr: function (v) {
          this.progressTitleNode.innerText = v + '%';
          this.internalProgressNode.style.width = v + '%';
          this._set('value', v)
        }
    });

});
