define([
  "app/config",
  'app/service/databus',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/date/locale",
    "dojo/dom-construct",
    "dojo/_base/lang",
      "dojo/text!./app.html",
      "dojo/_base/declare"
], function(appConfig, databus, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, locale, domC, lang, template, declare) {

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
            if(this.currentD.length > 0){
                this.realFaceNode.src = appConfig.imgBaseUrl + this.currentD[0].file_name;
            }
        },

        clearShowFace: function () {
          this.realFaceNode.src = '';
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

        renderTableImgs: function () {
          var imgs = this.tableImgList;
          if(imgs && imgs.length>0 ){
            // imgs = imgs.slice(0, 6);
            // clear
            this.tableImgListNode.innerHTML = '';

            // add
            for(i=0;i<imgs.length && i<6;){
                var trs = '<tr>';
                var tds = '';
                for(j=0;j<3 && i<imgs.length;j++, i++){
                  var img = imgs[i];
                  tds += lang.replace('<td><div class="item"><img class="img" src="{url}"/><div class="time">{time}</div></div></td>', {url: appConfig.imgBaseUrl + img.file_name, time: img.time});
                }
                trs += tds + '</tr>';
                this.tableImgListNode.appendChild(domC.toDom(trs));
            }
          }
        },

        postCreate: function(){
          this.imgList = [];
          this.tableImgList = [];
          this.currentD = [];

          this.loadData();

          this.intervalID = setInterval(lang.hitch(this, 'loadData'), 1000 * 1);

          // this.loopImg();
          setInterval(lang.hitch(this, 'moveToTable'), 1000 * 3);

        },

        destory: function(){
          this.inherited(arguments);
          clearInterval(this.intervalID);
        }
    });

});
