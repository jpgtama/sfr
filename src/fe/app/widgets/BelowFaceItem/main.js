define([
  '../FaceReg/FaceRegUtils',
  "app/config",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  'dijit/registry',
  'dojo/query',
  'dojo/_base/array',
  'dojo/_base/lang',
  "dojo/text!./t.html",
  'dojo/_base/declare'
], function(FaceRegUtils, appConfig,  _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, registry, query, array, lang, template, declare){
  return declare('BelowFaceItem', [_WidgetBase, _TemplatedMixin,
             _WidgetsInTemplateMixin], {

      templateString: template,


      constructor: function (options) {
        lang.mixin(this, options);
      },

      clearData: function () {
        this.imgNode.src = '';
        this.nameNode.innerText = '';
        this.timeNode.innerText ='';
      },

      setData: function (data) {
        this.clearData();
        
        // imgTimeDom[0].src = appConfig.imgBaseUrl + img.file_name;
        FaceRegUtils.setImgSrc(this.imgNode, data.file_name, data.imgContentType);

        // add person name before time
        if(data.recognized){
          this.nameNode.innerText = data.person_name;
        }
        this.timeNode.innerText = data.time;
        // imgTimeDom[1].innerText = data.recognized? (data.person_name + '<br/> '+  data.time): data.time;
        // imgTimeDom[1].style.fontSize = '30px';
      },

      postCreate: function () {
        this.inherited(arguments);
      }

  });


});
