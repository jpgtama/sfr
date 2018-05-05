define([
  './alarmCar',
  './SuggestItem',
    'app/service/databus',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/on',
    'dojo/dom-class',
    'dojo/Stateful',
    'dojo/_base/lang',
      "dojo/text!./t.html",
      "dojo/_base/declare"
], function(alarmCar, SuggestItem, databus, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, on, domClass,  Stateful, lang, template, declare) {

    return declare("app.widgets.RealTimeData", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,


        pid: null,

        //    your custom code goes here
        constructor: function(){
        },

        postCreate: function(){
          this.inherited(arguments)
          // databus.get('s-data-today').then(lang.hitch(this, function(d){
          //     this.data_count.innerText = d.data_count;
          //     this.alarm_count.innerText = d.alarm_count;
          //     this.monitor_point_count.innerText = d.monitor_point_count;
          //     this.time.innerText = d.time;
          // }));

          on(this.inputNode, 'input', lang.hitch(this, 'onChange'));

          on(this.queryBtn, 'click', lang.hitch(this, 'queryBtnClick'))

          on(document, 'click', lang.hitch(this, 'hideSuggest'));
        },

        loadAlarmCar: function(){

        },

        queryBtnClick: function () {
          if(this.pid){
              databus.get('data-query', {data: {pid: this.pid}}).then(lang.hitch(this, 'showData'))
          }else{
            console.log('click with null pid')
          }
        },

        showData: function(d){
          if(d){
            // get lon and lat
            var posList = [];

            for(i=0;i<d.length;i++){
              posList.push([d[i].lon,d[i].lat]);
            }

            this.showMap(posList)
          }
        },

        showMap: function(posList){
          if(posList && posList.length > 0){
            this.mapNode.innerText = '';

            var map = new AMap.Map(this.mapNode,{
                resizeEnable: true,
                zoom: 10,
                center: [posList[0][0], posList[0][1]]
            });

            map.on("complete", function(){
              // add position
              for(i=0;i<posList.length;i++){
                //flon = parseFloat(posList[i].lon) + (i/10)
                lon = posList[i][0];
                lat =  posList[i][1];
                var marker = new AMap.Marker({
                        icon: 'styles/images/mark-red.png',
                        position : [lon ,lat],
                        offset : new AMap.Pixel(-10,-26),
                        title: '当前位置',
                        map : map
                });
              }

              // add polyline
              var polyline = new AMap.Polyline({
                  map: map,
                  path: posList,
                  strokeColor: "#00A",  //线颜色
                  strokeOpacity: 1,     //线透明度
                  strokeWeight: 3,      //线宽
                  strokeStyle: "solid"  //线样式
              });
              map.setFitView();

            });



          }

        },

        onChange: function(){
          this.pid = null;
          if(this.inputNode.value){
            databus.get('data-query-suggest', {data: {q: this.inputNode.value}}).then(lang.hitch(this, function(d){
                if(d && d.length> 0){
                  this.suggestNode.innerText = '';
                  for(i=0;i<d.length; i++){
                    for(j=0;j<d[i].persons.length; j++){
                      var si = new SuggestItem({from: d[i].source, value: d[i].persons[j].msisdn, pid: d[i].persons[j].personnel_id,  callback: lang.hitch(this, 'select')});
                      this.suggestNode.appendChild(si.domNode)
                    }
                  }
                  domClass.remove(this.suggestNode, 'hide');
                }
            }));
          }else{
            this.hideSuggest();
          }
        },


        hideSuggest: function(){
          domClass.add(this.suggestNode, 'hide');
        },

        select: function(v, pid){
          domClass.add(this.suggestNode, 'hide');
          this.inputNode.value = v;
          this.pid = pid;
        },

        startup: function(){
          this.inherited(arguments);

          alarmCar.loadData();
          // create Map
          // var map = new AMap.Map('data-query-map',{
          //     resizeEnable: true,
          //     zoom: 10,
          //     center: [116.480983, 40.0958]
          // });


        }
    });

});
