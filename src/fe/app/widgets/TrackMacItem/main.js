define([
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/_base/lang",
    "dojo/text!./t.html",
    "dojo/_base/declare"
], function(_WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, lang, template, declare) {

    return declare("app.widgets.TrackMacItem", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,

        mac: null,

        track_id: null,

        //    your custom code goes here
        constructor: function(options){
          lang.mixin(this, options);
        },

        postCreate: function(){
        },

        onCancelAlarm: function(){
          alert('onCancelAlarm: ' + this.track_id)
        }
    });

});
