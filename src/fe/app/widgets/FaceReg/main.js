define([
    'app/service/databus',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/date/locale",
    'dojo/Stateful',
    'dojo/_base/lang',
      "dojo/text!./t.html",
      "dojo/_base/declare"
], function(databus, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, locale, Stateful, lang, template, declare) {

    return declare("app.widgets.FaceReg", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,


        constructor: function(){
        },

        postCreate: function(){
          this.inherited(arguments);


        },


        startup: function(){
          this.inherited(arguments);


       },

       destroy: function(){
         this.inherited(arguments);

       }
    });

});
