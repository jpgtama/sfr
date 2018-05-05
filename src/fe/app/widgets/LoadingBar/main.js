define([
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
      "dojo/text!./t.html",
      "dojo/_base/declare"
], function(_WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, template, declare) {

    return declare("app.widgets.RealTimeData", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,
        //    your custom code goes here
        constructor: function(){
        },

        postCreate: function(){
        }
    });

});
