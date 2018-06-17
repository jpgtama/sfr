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
  return declare('AboveFaceDisplayer', [_WidgetBase, _TemplatedMixin,
             _WidgetsInTemplateMixin], {

      templateString: template,

      wsDataArray: null,

      tableImgTimeDoms: null,

      maxSize: 10,

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

      getTableImgTimeDOM: function () {
          if(!this.tableImgTimeDoms){
            this.tableImgTimeDoms = [];
            array.forEach(query('td', this.domNode), lang.hitch(this, function (td) {
                var img = query('img', td)[0];
                var div = query('div.time', td)[0];
                this.tableImgTimeDoms.push([img, div]);
            }));
          }

          return this.tableImgTimeDoms;
      },

      renderTableImgs: function () {
        var datas = this.wsDataArray;
        if(datas && datas.length>0 ){
          var doms = this.getTableImgTimeDOM();
          // add
          for(i=0;i<datas.length && i<this.maxSize; i++){
              var data = datas[i];
              var imgTimeDom = doms[i];
              // imgTimeDom[0].src = appConfig.imgBaseUrl + img.file_name;
              FaceRegUtils.setImgSrc(imgTimeDom[0], data.file_name, data.imgContentType);

              // add person name before time
              imgTimeDom[1].innerText = data.person_name? (data.person_name + ' '+  data.time): data.time;
              imgTimeDom[1].style.fontSize = '30px';
          }
        }
      },

      postCreate: function () {
        this.inherited(arguments);
      }

  });


});
