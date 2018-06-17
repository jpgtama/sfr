define([
    './FaceRegUtils',
    "app/config",
    'app/service/databus',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/date/locale",
    'dojo/Stateful',
    'dojo/_base/lang',
      "dojo/text!./t.html",
      "dojo/_base/declare"
], function(FaceRegUtils, appConfig, databus, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, locale, Stateful, lang, template, declare) {

    return declare("app.widgets.FaceReg", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,

        wsData: null,

        stopDisplayCallback: null,

        constructor: function (options) {
          lang.mixin(this, options);
        },

        postCreate: function(){
          this.inherited(arguments);
        },

        getData: function () {
          return this.wsData;
        },

        setData: function (data) {
          this.wsData = data;

          // TODO
          FaceRegUtils.setImgSrc(this.realFaceNode, data.file_name, data.imgContentType);

          // set person name
          this.personNameNode.innerText = data.person_name;

          // TODO set face mask
          if(data.recognized){
            this.faceMaskNode.src = 'styles/images/face-mask-ho-reg.png';
          }else{
            this.faceMaskNode.src = 'styles/images/face-mask-ho-unreg.png';
          }
          // moveToTable after 3 sec
          // TODO
          if(!appConfig.keepLastFace){
            this.moveToTableTimeoutID = setTimeout(lang.hitch(this, 'countDown'), 1000 * 3);
          }

        },

        countDown: function () {
            this.stopDisplayCallback(this);
        },

        stopDisplay: function () {
          if(this.moveToTableTimeoutID){
            clearTimeout(this.moveToTableTimeoutID);
            this.moveToTableTimeoutID = null;
          }

          this.stopDisplayCallback(this);
        },

        startup: function(){
          this.inherited(arguments);
       },

       destroy: function(){
         this.inherited(arguments);
       }
    });

});
