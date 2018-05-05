define([
    'app/service/databus',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/on',
    'dojo/Stateful',
    'dojo/_base/lang',
      "dojo/_base/declare"
], function(databus, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, on,  Stateful, lang, declare) {

    return declare("app.widgets.RealTimeData", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: '<div class="item"><span data-dojo-attach-point="fromNode"></span>  <span data-dojo-attach-point="valueNode"></span>   </div>',

        callback: null,

        from: null,

        value: null,

        pid: null,

        //    your custom code goes here
        constructor: function(options){
          lang.mixin(this, options);
        },

        postCreate: function(){
          this.inherited(arguments)

          this.fromNode.innerText = this.from;
          this.valueNode.innerText = this.value;

          on(this.domNode, 'click', lang.hitch(this, function(){
              this.callback(this.value, this.pid)
          }))


        },

        startup: function(){
          this.inherited(arguments)



        }
    });

});
