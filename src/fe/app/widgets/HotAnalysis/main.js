define([
    'app/service/databus',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/date/locale",
    'dojo/Stateful',
    'dojo/_base/lang',
      "dojo/text!./t.html",
      "dojo/_base/declare"
], function(databus, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, locale, Stateful, lang, template, declare) {

    return declare("app.widgets.RealTimeData", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,

        points: null,

        map: null,

        heatMap: null,

        intervalID: null,

        constructor: function(){
        },

        postCreate: function(){
          this.inherited(arguments)

          this.loadSummary();

        },

        loadSummary: function(){
          // data summary
          databus.get('hot-spot-analysis').then(lang.hitch(this, function(d){
              this.data_count.innerText = d.data_count;
              this.alarm_count.innerText = d.alarm_count;
              this.monitor_point_count.innerText = d.monitor_point_count;
              this.time.innerText = d.data_updatetime;
          }));
        },


        checkLngAndLat: function(d){
          return  this.betweenInclude(d.lng, -180, 180) && this.betweenInclude(d.lat, -90, 90);
        },

        betweenInclude: function(d, min, max){
          return (parseFloat(d) >= min) && (parseFloat(d) <= max)
        },

        creatMap: function(){
          // create Map
          if(!this.map){
            this.map = new AMap.Map('hot-spot-analysis-map',{
                resizeEnable: true,
                zoom: 12,
                center: [116.98233792298355, 36.648671185994104]
            });
          }

        },

        setHeatMap: function(){
          databus.get('hot-spot-analysis-map', {async: false}).then(lang.hitch(this, function(d){

              var validPoints = [];

              // filter out valid data
              for(i=0;i<d.length;i++){
                if(this.checkLngAndLat(d[i])){
                  validPoints.push(d[i]);
                }
              }

              // map
              // 加载热力图插件
              if(validPoints && validPoints.length> 0){

                if(this.heatMap){
                  this.map.remove(this.heatMap);
                }

                this.map.plugin(["AMap.Heatmap"], lang.hitch(this, function () {
                     this.heatMap = new AMap.Heatmap(this.map,{
                        radius:50
                    });

                }));
                this.heatMap.setDataSet({
                    data: validPoints,
                    max: 100
                 });
              }

          }));
        },

        startup: function(){
          this.inherited(arguments)

          this.creatMap();
          this.setHeatMap();

          this.intervalID = setInterval(lang.hitch(this, 'setHeatMap'), 1000 * 30);
		  this.intervalID2 = setInterval(lang.hitch(this, 'loadSummary'), 1000 * 30);

       },

       destroy: function(){
         this.inherited(arguments);

         clearInterval(this.intervalID);
		 clearInterval(this.intervalID2);
       }
    });

});
