define([
    'app/service/databus',
    "app/widgets/ProgressBar/main",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/Stateful',
    'dojo/_base/lang',
      "dojo/text!./t.html",
      "dojo/_base/declare"
], function(databus, ProgressBar, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, Stateful, lang, template, declare) {

    return declare("app.widgets.RealTimeData", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,

        onlinePB: null,

        offlinePB: null,

        errorPB: null,

        intervalID: null,

        //    your custom code goes here
        constructor: function(){
        },

        postCreate: function(){
          this.inherited(arguments)
        },

        setData: function(d){
          this.totalNode.innerText = d.total;

          var onlineRate = Math.round(d.online/d.total*100) ;
          var offlineRate = Math.round(d.offline/d.total*100) ;
          var errorRate = 100 - onlineRate - offlineRate;

          if(!this.onlinePB){
            this.onlinePB = new ProgressBar({
                barTitle: '在线'
            });
            this.onlinePB.placeAt(this.onlineBarNode);
          }
          this.onlinePB.set('value', onlineRate);

          if(!this.offlinePB){
            this.offlinePB = new ProgressBar({
                barTitle: '离线'
            });
            this.offlinePB.placeAt(this.offlineBarNode);
          }
          this.offlinePB.set('value', offlineRate);


          // var onlinePB = new ProgressBar({
          //     barTitle: '离线',
          //     value: offlineRate
          // }).placeAt(this.offlineBarNode);


          if(!this.errorPB){
            this.errorPB = new ProgressBar({
                barTitle: '异常'
            });
            this.errorPB.placeAt(this.errorBarNode);
          }
          this.errorPB.set('value', errorRate);

          // var errorPB = new ProgressBar({
          //     barTitle: '异常',
          //     value: errorRate
          // }).placeAt(this.errorBarNode);
        },


        loadData: function () {
          databus.get('monitor-point-tongji').then(lang.hitch(this, function(d){
              // handle
              if(d && d.length > 0) {
                var total = d.length;
                var online = 0, offline = 0, error = 0;
                for(i=0;i<total;i++){
                  if(d[i].working_status === 'online'){
                    online++;
                  }else if(d[i].working_status === 'offline'){
                    offline++;
                  }else if(d[i].working_status === 'error'){
                    error++;
                  }else{
                    console.error('unknown status.')
                  }
                }
                this.setData({total: total, online: online, offline: offline, error: error});
              }
          }));
        },

        startup: function(){
          this.inherited(arguments);
          this.loadData();
          this.intervalID = setInterval(lang.hitch(this, 'loadData'), 1000 * 30);
        },

        destroy: function(){
          this.inherited(arguments);
          clearInterval(this.intervalID);
        }
    });

});
