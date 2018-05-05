define([
    'app/service/databus',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/Stateful',
    'dojo/_base/lang',
      "dojo/text!./t.html",
      "dojo/_base/declare"
], function(databus, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, Stateful, lang, template, declare) {

    return declare("app.widgets.RealTimeData", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,

        points: null,

        map: null,

        markers: null,

        //    your custom code goes here
        constructor: function(){
        },

        postCreate: function(){
          this.inherited(arguments)
          this.markers = [];
        },

        addMarkers: function (poss) {
          // remove
          if(this.markers){
            for(i=0;i<this.markers.length; i++){
              this.map.remove(this.markers[i]);
            }
          }


          // position
          for(i=0;i<poss.length; i++){
            lon = poss[i].lon;
            lat = poss[i].lat;
            name = poss[i].point_name;
            if(lon && lat){
              var marker = new AMap.Marker({
                      position : [lon, lat],
                      offset : new AMap.Pixel(-10,-16),
                      title: name,
                      map : this.map
              });
              this.markers.push(marker);
            }

          }
        },

        createMap: function (poss) {
          if(!this.map){
            this.map = new AMap.Map('monitor-point-location-map',{
                resizeEnable: true,
                zoom: 10,
                center: [poss[0].lon, poss[0].lat]
            });
          }

        },

        showData: function(){
              // filter
              var poss = [];
              for(i=0;i<this.points.length; i++){
                lon = this.points[i].lon;
                lat = this.points[i].lat;
                if(lon && lat){
                  poss.push(this.points[i]);
                }
              }

              if(poss.length> 0){
                // create Map
                this.createMap(poss);

                this.addMarkers(poss);
              }
        },

        loadData: function () {
          databus.get('monitor-points').then(lang.hitch(this, function(d){
              this.points = d;
              this.showData();
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
