define(['./alarmVideo', 'dojo/_base/lang',
  'app/service/databus'], function(alarmVideo, lang, databus){

  var obj = {
    markers:[],
    markersMap: {},
    map: null,
    currentHLMarkerWithProperties: null,


    addMarkers: function (poss) {
      // remove
      if(this.markers && this.markers.length > 0){
        for(i=0;i<this.markers.length; i++){
          this.map.remove(this.markers[i]);
        }
      }

      this.markers = [];
      this.markersMap = {};

      // position
      for(i=0;i<poss.length; i++){
        lon = poss[i].lon;
        lat = poss[i].lat;
        name = poss[i].point_name;
        if(lon && lat){
          var content = document.createElement('div');
          content.innerHTML = name;
          var marker = new AMap.Marker({
                  // content: content,
                  position : [lon, lat],
                  offset : new AMap.Pixel(-10,-16),
                  title: name,

                  map : this.map
          });
          this.markers.push(marker);
          this.markersMap[poss[i].data_id] = marker;
        }

      }
    },

    createMap: function (poss) {
      if(!this.map){
        this.map = new AMap.Map('data-query-alarm-car-map',{
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

            // play playVideo
            alarmVideo.loadData(this.points, {clickCB: lang.hitch(this, 'hightlightMarker')});
          }
    },

    unsetCurrentHLMarker: function () {
      if(this.currentHLMarkerWithProperties){
        var m = this.currentHLMarkerWithProperties.m;
        m.setIcon(this.currentHLMarkerWithProperties.icon);
        m.setOffset(this.currentHLMarkerWithProperties.offset);
        m.setzIndex(this.currentHLMarkerWithProperties.zIndex);
      }
    },

    setCurrentHLMarker: function (m) {
        this.currentHLMarkerWithProperties = {
          m: m,
          zIndex: m.getzIndex(),
          icon: m.getIcon(),
          offset: m.getOffset()
        };
    },


    hightlightMarker: function (d) {
      // find marker
      if(d){
        var k =  d.data_id;
        if(k){
          var marker = this.markersMap[k];
          if(marker){
            // clear previous marker
            if(this.currentHLMarkerWithProperties){
              this.unsetCurrentHLMarker();
            }
            this.setCurrentHLMarker(marker);

            marker.setIcon('styles/images/mark-red.png');
            marker.setOffset(new AMap.Pixel(-10,-16));
            marker.setzIndex(1000);
          }else{
            console.error('no marker was found');
          }
        }
      }
    },

    loadData: function () {
      databus.get('alarm-car').then(lang.hitch(this, function(d){
        this.points = d;
          this.showData();
      }));
    },
  };

  return {
    loadData: lang.hitch(obj, 'loadData')
  };
});
