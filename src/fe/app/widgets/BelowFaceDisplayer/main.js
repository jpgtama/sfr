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
  return declare('BelowFaceDisplayer', [_WidgetBase, _TemplatedMixin,
             _WidgetsInTemplateMixin], {

      templateString: template,

      wsDataArray: null,

      maxSize: 10,

      displayItemWidgets : null,

      constructor: function (options) {
        lang.mixin(this, options);
        this.wsDataArray = [];
      },

      add: function (wsData) {
        this.addToTableImgList(wsData);
        this.renderTableImgs();
      },

      addToTableImgList: function (d) {
        if(this.wsDataArray.length >= this.maxSize){
          this.wsDataArray.pop();
        }
        // add
        this.wsDataArray.unshift(d);
      },

      getDisplayItemWidgets: function () {
          if(!this.displayItemWidgets){
            this.displayItemWidgets = registry.findWidgets(this.domNode);
            // array.forEach(query('td', this.domNode), lang.hitch(this, function (td) {
            //     var img = query('img', td)[0];
            //     var div = query('div.time', td)[0];
            //     this.tableImgTimeDoms.push([img, div]);
            // }));
          }

          return this.displayItemWidgets;
      },

      renderTableImgs: function () {
        var datas = this.wsDataArray;
        if(datas && datas.length>0 ){
          var displayItemWidgets = this.getDisplayItemWidgets();
          // add
          for(i=0;i<datas.length && i<this.maxSize; i++){
              var data = datas[i];
              var w = displayItemWidgets[i];
              w.setData(data);
              // imgTimeDom[0].src = appConfig.imgBaseUrl + img.file_name;
              // FaceRegUtils.setImgSrc(imgTimeDom[0], data.file_name, data.imgContentType);

              // add person name before time
              // imgTimeDom[1].innerText = data.recognized? (data.person_name + '<br/> '+  data.time): data.time;
              // imgTimeDom[1].style.fontSize = '30px';
          }
        }
      },

      postCreate: function () {
        this.inherited(arguments);
      }

  });


});
