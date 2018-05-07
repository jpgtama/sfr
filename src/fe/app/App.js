define([
  "app/ws",
  "app/config",
  'app/service/databus',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/date/locale",
    "dojo/dom-construct",
    "dojo/query",
    'dojo/_base/array',
    "dojo/_base/lang",
      "dojo/text!./app.html",
      "dojo/_base/declare"
], function(ws, appConfig, databus, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, locale, domC, query, array, lang, template, declare) {

    return declare("app.App", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,

        timeNodeInterval: null,

        imgList: null,

        tableImgList: null,

        firstSet: true,

        //    your custom code goes here
        constructor: function(){

        },

        onMsg: function (obj) {
          var d = {};

          if(obj){
            if(obj.type == "recognized" || obj.type == "unrecognized"){
                if(obj.data){
                  var data = obj.data;
                  d.file_name = data.face.image;
                  d.time = ''; // TODO current time;
                }
            }
          }

          if(d.file_name){
            this.imgList.push(d);


            // set show face
            if(this.imgList.length > 0 ){
              if(this.currentD.length === 0){
                this.currentD.push(this.imgList.shift());
              }
              this.setToShowFace();
            }
          }

        },

        loadData: function (fn) {
          // load img to a list, per 1 seconds
          databus.get('img').then(lang.hitch(this, function(d){
              // for(var i=0;i<d.length;i++){
              //   this.imgList.push(d[i]);
              // }
              this.imgList.push(d);

              if(fn){
                fn();
              }

              // set show face
              if(this.imgList.length > 0 ){
                if(this.currentD.length === 0){
                  this.currentD.push(this.imgList.shift());
                }
                this.setToShowFace();
              }
          }));
        },

        setToShowFace: function () {
            // get one
            if(this.imgList.length > 0 ){
              if(this.currentD.length === 0){
                this.currentD.push(this.imgList.shift());
              }
            }


            // display
            if(this.currentD.length > 0){
                this.setImgSrc(this.realFaceNode, this.currentD[0].file_name);
                // this.realFaceNode.src = appConfig.imgBaseUrl + this.currentD[0].file_name;
                // this.realFaceNode.style.display = "block";
                this.faceNode.style.visibility = "visible";

                // moveToTable after 3 sec
                setTimeout(lang.hitch(this, 'moveToTable'), 1000 * 3);
            }
        },

        setImgSrc: function (node, base64Str) {
          node.src = "data:image/png;base64," + base64Str;
        },

        clearShowFace: function () {
          this.realFaceNode.src = '';
          // this.realFaceNode.style.display = "none";
          this.faceNode.style.visibility = "hidden";
        },

        moveToTable: function () {
          if(this.currentD.length > 0){
            this.addToTableImgList();
            this.renderTableImgs();
            this.clearShowFace();
          }

        },

        addToTableImgList: function () {
          var d = this.currentD.pop();

          if(this.tableImgList.length >= 6){
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
            var doms = this.getTableImgTimeDOM();
            // add
            for(i=0;i<imgs.length && i<6; i++){
                var img = imgs[i];
                var imgTimeDom = doms[i];
                // imgTimeDom[0].src = appConfig.imgBaseUrl + img.file_name;
                this.setImgSrc(imgTimeDom[0], img.file_name)
                imgTimeDom[1].innerText = img.time;
            }
          }
        },

        postCreate: function(){
          this.imgList = [];
          this.tableImgList = [];
          this.currentD = [];

          ws.onMessage = lang.hitch(this, 'onMsg');
          ws.start();
          // this.loadData();

          // this.intervalID = setInterval(lang.hitch(this, 'loadData'), 1000 * 1);

          // this.loopImg();
          setInterval(lang.hitch(this, 'setToShowFace'), 1000 * 1);

        },

        destory: function(){
          this.inherited(arguments);
          clearInterval(this.intervalID);
        }
    });

});
