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

        //    your custom code goes here
        constructor: function(){

        },

        loadData: function () {
          // load img to a list, per 1 seconds
          databus.get('img').then(lang.hitch(this, function(d){
              for(var i=0;i<d.length;i++){
                this.imgList.push(d[i]);
              }
          }));
        },

        setToShowFace: function () {
            if(this.currentD){
                this.realFaceNode.src = appConfig.imgBaseUrl + this.currentD.file_name;
            }
        },

        clearShowFace: function () {
          this.realFaceNode.src = '';
        },

        moveToTable: function () {
          if(this.currentD){
            this.addToTableImgList();
            this.renderTableImgs();
            this.clearShowFace();
          }
        },

        addToTableImgList: function () {
          var d = this.currentD;

          if(this.tableImgList){
            if(this.tableImgList.length >= 6){
                this.tableImgList.pop();
            }
            // add
            this.tableImgList.unshift(d);
          }
        },

        renderTableImgs: function () {
          var imgs = this.tableImgList;
          if(imgs && imgs.length>0 ){
            // clear
            this.tableImgListNode.innerHTML = '';

            // add
            for(i=0;i<imgs.length, i<6;i++){
                var img = imgs[i];
                var trs = '<tr>';
                var tds = '';
                for(j=0;j<3, i<imgs.length;j++, i++){
                  tds += lang.replace('<td><div class="item"><img class="img" src={url}/><div class="time">{time}</div></div></td>', {url: appConfig.imgBaseUrl + img.file_name, time: img.time});
                }
                trs += tds + '</tr>';
                this.tableImgListNode.appendChild(domC.toDom(trs));
            }
          }
        },

        loopImg: function () {
          if(this.imgList.length > 0){
            // pick one
            this.currentD = this.imgList.shift();

            // set to big face
            setToShowFace();


            // wait 3 seconds
            setTimeout(lang.hitch(this, 'moveToTable'), 1000 * 3);

            // move to table

            // do next
          }
        },

        postCreate: function(){
          this.imgList = [];

          this.loadData();

          this.intervalID = setInterval(lang.hitch(this, 'loadData'), 1000 * 1);


        },

        destory: function(){
          this.inherited(arguments);
          clearInterval(this.intervalID);
        }
    });

});
