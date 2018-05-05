define([
    'app/utils/SingleSelectGroup',
    'app/widgets/ClickableImg/main',
    'app/service/databus',
    'app/config',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/on',
    "dojo/dom-class",
      "dojo/dom-construct",
    'dojo/Stateful',
    'dojo/_base/lang',
      "dojo/text!./t.html",
      "dojo/_base/declare"
], function(SingleSelectGroup, ClickableImg, databus, appConfig,  _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, on, domClass, domConstruct,  Stateful, lang, template, declare) {

    return declare("app.widgets.YuJing", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,

        data: null,

        imgWidgetList: null,

        currentImgWidget: null,

        currentImgData: null,

        group: null,

        //    your custom code goes here
        constructor: function(){
        },

        loadData: function () {
          var group= this.group = new SingleSelectGroup();

          // create img
          databus.get('yujing-data').then(lang.hitch(this, function(d){
              this.data = d;

              if(!this.imgWidgetList){
                this.imgWidgetList = [];
              }else{
                  for(i = 0; i<this.imgWidgetList.length; i++){
                    this.imgWidgetList[i].destroy();
                  }
                  this.trackPersonImageTRNode.innerText = '';
                  this.imgWidgetList = [];
              }

              // loop grap face
              var str = '<td></td>';
              for(i = 0; i< 4 && i<d.length; i++){
                var td = domConstruct.toDom('<td></td>');
                var ci = new ClickableImg({data: d[i], callback: lang.hitch(this, 'imgClick'), group: group});
                ci.placeAt(td);
                this.imgWidgetList.push(ci);
                this.trackPersonImageTRNode.appendChild(td);
              }

              // select 1 img
              this.selectImg(0);

          }));
        },

        postCreate: function(){
          this.inherited(arguments)
          this.loadData();

          // add event to button
          on(this.locBtn, 'click', lang.hitch(this, function(){
              // check lon & lat
              if(this.currentImgData){
                var imgd = this.currentImgData;
                 if(imgd.lon && imgd.lat){
                   this.createMap(imgd.lon, imgd.lat);
                 }else{
                   alert('没有地址位置信息');
                 }
              }
          }));


          // back button
          on(this.titleBackButton, 'click', lang.hitch(this, function(){
            this.displayConent(1);
            this.displayMap(0);
          }));


          this.intervalID = setInterval(lang.hitch(this, 'loadData'), 1000 * 30);
        },

        destroy: function(){
          this.inherited(arguments);
          clearInterval(this.intervalID);
        },


        imgClick: function(d, w){
          this.phoneNode.innerText = d.msisdn? d.msisdn : '<无>';
          this.currentImgData = d;
          this.currentImgWidget = w;
        },

        selectImg: function(i){
          if(i < this.imgWidgetList.length){
            this.imgWidgetList[i].click();
          }
        },

        createMap: function(lon, lat){
          // clear any makers
          if(this.map){
            this.map.clearMap();
          }

          this.displayConent(0);
          this.displayMap(1);

          // create Map
          if(!this.map){
            this.map = new AMap.Map(this.contentMapNode,{
                resizeEnable: true,
                zoom: 10,
                center: [lon, lat]
            });
          }
          var map = this.map;
          map.setCenter([lon, lat]);
          // current position
          var marker = new AMap.Marker({
                  icon: 'styles/images/mark-red.png',
                  position : [lon, lat],
                  offset : new AMap.Pixel(-10,-16),
                  title: '当前位置',
                  map : map
          });

        },




        displayConent: function(s){
          if(s){
            domClass.remove(this.contentNode, 'hide');
          }else{
            domClass.add(this.contentNode, 'hide');
          }
        },

        displayMap: function(s){
          if(s){
            domClass.remove(this.contentMapWrapperNode, 'hide');
          }else{
            domClass.add(this.contentMapWrapperNode, 'hide');
          }
        },

    });

});
