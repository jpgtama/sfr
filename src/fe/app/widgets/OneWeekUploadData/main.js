define([
    './chart',
    'app/service/databus',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/Stateful',
    'dojo/_base/lang',
      "dojo/text!./t.html",
      "dojo/_base/declare"
], function(chart, databus, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, Stateful, lang, template, declare) {

    return declare("app.widgets.RealTimeData", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,


        //    your custom code goes here
        constructor: function(){
        },

        postCreate: function(){
          this.inherited(arguments)





        },

        startup: function(){
          this.inherited(arguments)
          // // create Map
          // var map = new BMap.Map("hot-spot-analysis-map");          // 创建地图实例
          //
          // var point = new BMap.Point(116.418261, 39.921984);
          // map.centerAndZoom(point, 10);             // 初始化地图，设置中心点坐标和地图级别
          // map.enableScrollWheelZoom(); // 允许滚轮缩放

          this.loadData();

          this.intervalID = setInterval(lang.hitch(this, 'loadData'), 1000 * 30);


        },

        loadData:function () {
          databus.get('one-week-upload').then(lang.hitch(this, function(d){
              chart.makeChart('oneweek-upload-data-chart', d);
          }));
        },

        destroy: function(){
          this.inherited(arguments);

          clearInterval(this.intervalID);
        }
    });

});
