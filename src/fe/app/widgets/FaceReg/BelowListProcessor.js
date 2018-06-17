define([
  './FaceRegUtils',
  'dijit/registry',
  'dojo/query',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/_base/declare'
], function(FaceRegUtils, registry, query, array, lang, declare){
  return declare('BelowListProcessor', [], {

      tableImgListNode: null,

      tableImgList: null,

      maxSize: 10,

      tableImgTimeDOMs: null,

      constructor: function (options) {
        lang.mixin(this, options);
        this.tableImgList = [];


        this.getTableImgTimeDOM();
      },


      putOne: function (wsData) {
        // this.tableImgList.push(wsData);
        this.addToTableImgList(wsData);
        this.renderTableImgs();
      },

     addToTableImgList: function (d) {
        // var d = this.currentD.pop();

        if(this.tableImgList.length >= this.maxSize){
          this.tableImgList.pop();
        }
        // add
        this.tableImgList.unshift(d);
      },

      getTableImgTimeDOM: function () {
          if(!this.tableImgTimeDoms){
            this.tableImgTimeDoms = [];
            array.forEach(query('td', this.tableImgListNode), lang.hitch(this, function (td) {
                var img = query('img', td)[0];
                var div = query('div.time', td)[0];
                this.tableImgTimeDoms.push([img, div]);
            }));
          }

          return this.tableImgTimeDoms;
      },

      renderTableImgs: function () {
        var imgs = this.tableImgList;
        if(imgs && imgs.length>0 ){
          var doms = this.tableImgTimeDoms;
          // add
          for(i=0;i<imgs.length && i<this.maxSize; i++){
              var img = imgs[i];
              var imgTimeDom = doms[i];
              // imgTimeDom[0].src = appConfig.imgBaseUrl + img.file_name;
              FaceRegUtils.setImgSrc(imgTimeDom[0], img.file_name, img.imgContentType);

              // add person name before time
              imgTimeDom[1].innerText = img.person_name? (img.person_name + ' '+  img.time): img.time;
			        imgTimeDom[1].style.fontSize = '30px';
          }
        }
      }


  });


});
