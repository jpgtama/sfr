define([
  '../FaceReg/FaceRegUtils',
  'app/widgets/FaceReg/main',
  "app/config",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  'dijit/registry',
  'dojo/dom-construct',
  'dojo/_base/lang',
  "dojo/text!./t.html",
  'dojo/_base/declare'
], function(FaceRegUtils, FaceReg, appConfig,  _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, registry, domC, lang, template, declare){
  return declare('AboveFaceDisplayer', [_WidgetBase, _TemplatedMixin,
             _WidgetsInTemplateMixin], {

      templateString: template,

      maxSize: 3,

      overflowCallback: null,

      notDisplayedWidgetArray: null,

      constructor: function (options) {
        lang.mixin(this, options);
        this.notDisplayedWidgetArray = [];
      },

      getOneDisplayWidget: function () {
        // use not displayed widget
        if(this.notDisplayedWidgetArray.length == 0){
          this.refreshDisplayWidgetArray();
          one = this.displayWidgetArray.pop();
          one.stopDisplay();
        }

        var one = this.notDisplayedWidgetArray.shift();
        return one;
      },


      display: function (displayWidget, data) {
        // set data
        displayWidget.setData(data);

        // display
        domC.place(displayWidget.domNode, this.showFaceWrapperNode, 'first');
      },

      refreshDisplayWidgetArray: function () {
        this.displayWidgetArray = registry.findWidgets(this.showFaceWrapperNode);
      },

      add: function (wsData) {
        if(wsData){
          var displayWidget = this.getOneDisplayWidget();
          this.display(displayWidget, wsData);
        }
      },

      stopDisplayCallback: function (displayWidget) {
        this.showFaceWrapperNode.removeChild(displayWidget.domNode);
        this.overflowCallback(displayWidget.getData());
        this.notDisplayedWidgetArray.push(displayWidget);
      },

      postCreate: function () {
        var stopDisplayCallback = lang.hitch(this, 'stopDisplayCallback');
        this.notDisplayedWidgetArray = [new FaceReg({stopDisplayCallback: stopDisplayCallback}), new FaceReg({stopDisplayCallback: stopDisplayCallback}), new FaceReg({stopDisplayCallback: stopDisplayCallback})];
      },


  });


});
