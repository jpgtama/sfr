define([
  './FaceRegUtils',
  "app/config",
  'dijit/registry',
  'dojo/_base/lang',
  'dojo/_base/declare'
], function(FaceRegUtils, appConfig, registry, lang, declare){
  return declare('ShowFaceListController', [], {

      showFaceWrapperNode: null,

      faceRegWidgetArray: null,

      wsQueue: null,

      emptySlots: [],

      belowListProcessor: null,

      constructor: function (options) {
        lang.mixin(this, options);
        this.emptySlots = [];
      },

      start: function () {
        // get FaceReg widgets
        if(this.showFaceWrapperNode){
           this.faceRegWidgetArray = registry.findWidgets(this.showFaceWrapperNode);
        }



        // start fetch from ws wsQueue
        // every 300ms
        this.startFetchFromWSQueueID = window.setInterval(lang.hitch(this, 'startFetchFromWSQueue'), 300);
      },

      isThereEmptySlot: function () {
        return this.emptySlots.length> 0;
      },

      displayWSFace: function (data) {
        var emptySlot = this.emptySlots.shift();

        FaceRegUtils.setImgSrc(emptySlot.realFaceNode, data.file_name, data.imgContentType);

        // set person name
        emptySlot.personNameNode.innerText = data.person_name;

        // this.realFaceNode.src = appConfig.imgBaseUrl + this.currentD[0].file_name;
        // this.realFaceNode.style.display = "block";
        //emptySlot.showFaceNode.style.visibility = "visible";

        // moveToTable after 3 sec
        // TODO
        if(!appConfig.keepLastFace){
          this.moveToTableTimeoutID = setTimeout(lang.hitch(this, 'moveToTable'), 1000 * 3);
        }

      },

      moveToTable: function () {
        this.belowListProcessor.putOne();
      },


      // setImgSrc: function (node, base64Str, imgContentType) {
      //   if(imgContentType == 'base64'){
      //     node.src = "data:image/png;base64," + base64Str;
      //   }else if(imgContentType == 'url'){
      //     node.src = appConfig.imgBaseUrl + base64Str;
      //   }
      // },

      clearShowFace: function () {
        this.realFaceNode.src = '';
        // this.realFaceNode.style.display = "none";
        this.showFaceNode.style.visibility = "hidden";
      },

      startFetchFromWSQueue: function () {
          if(this.isThereEmptySlot()){
            var headItem = this.wsQueue.shift();
            if(headItem){
              this.displayWSFace(headItem);
            }
          }
      }


  });


});
