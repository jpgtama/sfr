define([
    'app/config',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/on',
    "dojo/_base/lang",
    "dojo/text!./t.html",
    "dojo/_base/declare"
], function(appConfig, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, domAttr, domClass, on, lang, template, declare) {

    return declare("app.widgets.TrackMacItem", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,

        mac: null,

        data: null,

        callback: null,

        group: null,

        //    your custom code goes here
        constructor: function(options){
          lang.mixin(this, options);
          if(this.group){
            this.group.add(this);
          }
        },
        postCreate: function(){
          domAttr.set(this.domNode, 'src', appConfig.imgBaseUrl +this.data.grap_face);
          on(this.domNode, 'click', lang.hitch(this, function(e){
              this.click();
          }));
        },

        click: function(){
          domClass.add(this.domNode, 'selected');
          if(this.group){
            this.group.clickNotify(this);
          }

          if(this.callback){
            this.callback(this.data, this);
          }
        },

        deSelect: function(){
          domClass.remove(this.domNode, 'selected');
        }
    });

});
