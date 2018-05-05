define(['dojo/_base/lang',
  'app/service/databus',   'app/config',  "dojo/dom-construct",], function(lang, databus, appConfig, domConstruct){

  var obj = {
    markers:[],
    map: null,
    currentData: null,

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
          }
    },

    playVideo: function (arr, i) {
        this.currentData = arr[i];
        this.sDom.setAttribute('src',  appConfig.imgBaseUrl + arr[i].file_name);
        this.vDom.load();
        this.vDom.play();
    },


    loadData: function (mp4Array, options) {
      var domId = 'data-query-alarm-video';
      // add ended event
      var vDom = this.vDom = document.getElementById(domId);
      this.sDom = document.getElementById('data-query-alarm-video-source');

      var vIndex = -1;

      this.playVideo(mp4Array, ++vIndex);

      vDom.onended = lang.hitch(this, function () {
        if(mp4Array){
          if(vIndex>=mp4Array.length){
            vIndex = -1;
          }
          this.playVideo(mp4Array, ++vIndex);
        }
      });

      this.options = options;

      vDom.onclick = lang.hitch(this, function(){
          if(this.options.clickCB){
            this.options.clickCB(this.currentData);
          }
      });

      // vDom.onmouseenter = lang.hitch(this, function(){
      //
      // });
      // vDom.onmouseleave = lang.hitch(this, function(){
      //
      // });


    },
  };

  return {
    loadData: lang.hitch(obj, 'loadData')
  };
});
