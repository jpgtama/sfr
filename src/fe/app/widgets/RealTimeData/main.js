define([
    'app/service/databus',
    "app/utils/LoadingUtil",
    "app/widgets/TrackMacItem/main",
    'app/config',
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/date/locale",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/request",
    "dojo/text!./t.html",
    "dojo/_base/lang",
    "dojo/_base/declare"
], function(databus, LoadingUtil, TrackMacItem, appConfig, _WidgetBase, _TemplatedMixin,
            _WidgetsInTemplateMixin, locale, domClass, domConstruct, request, template, lang, declare) {

    return declare("app.widgets.RealTimeData", [_WidgetBase, _TemplatedMixin,
               _WidgetsInTemplateMixin
    ], {
        templateString: template,

        placeHolderImg: '/styles/images/placeholder.png',

        faceList: null,

        alarmMacList: null,

        macList: null,

        trackMacItemArray: null,

        constructor: function(){
        },

        postCreate: function(){
          this.inherited(arguments);

          this._fetchData();
        },

        loadFace: function(){
          var _this = this;
              // face
              databus.get('real-time-face').then(function(data){
                  _this.avatarTableNode.innerText = '';
                  LoadingUtil.removeLoading(_this.avatarTableNode);
                  _this.faceList = data;


                  var trStr = '';
                  for(var i=0;i< 12 && i<data.length;){
                      trStr += '<tr>';

                      var tdStr = '';
                      for(var j=0;j<4 && i<data.length;j++, i++){
                         tdStr += lang.replace('<td><img class="item avatar-img" src="{url}"/></td>', {url: appConfig.imgBaseUrl + data[i].file_name});
                         if(!data[i].file_name){
                           console.error('no file name for this avatar', i)
                         }
                      }

                      trStr += tdStr;
                      trStr += '</tr>';
                  }
                  _this.avatarTableNode.appendChild(domConstruct.toDom(trStr));

                  if(appConfig.realTimeRefresh){
                    setTimeout(lang.hitch(_this, 'loadFace'), 1000);
                  }
              });
        },

        loadMac: function(){
          var _this = this;
            // mac
            databus.get('real-time-mac').then(function(data){
                _this.macListNode.innerText = '';
                LoadingUtil.removeLoading(_this.macListNode);
                _this.macList = data;

                for(var i=0;i< 7 && i<data.length; i++){
                    var domStr = lang.replace('<div class="item"><div class="small-dot green"></div><span class="mac">MAC: {mac}</span><span class="time">{time}</span></div>', {mac: data[i].mac, time: data[i].track_time });
                    _this.macListNode.appendChild(domConstruct.toDom(domStr));
                }

                if(appConfig.realTimeRefresh){
                  setTimeout(lang.hitch(_this, 'loadMac'), 1000);
                }
            });
        },

        loadAlarmMac: function(){
          var _this = this;
          var trackMacItemArray = _this.trackMacItemArray;

          // alarm mac
          databus.get('real-time-alarm-mac').then(function(data){
            if(_this)


            LoadingUtil.removeLoading(_this.alarmMacNode);
              _this.alarmMacList = data;
              // destroy widget
              if(trackMacItemArray){
                for(i=0;i<trackMacItemArray.length;i++){
                  if(trackMacItemArray[i].destroyRecursive){
                    trackMacItemArray[i].destroyRecursive();
                  }
                }
                trackMacItemArray = [];
              }
              _this.alarmMacNode.innerText = '';


              if(data.length > 0){
                // alarmMacNode
                var tmi = new TrackMacItem(data[0]);
                tmi.placeAt(_this.alarmMacNode);

                if(!trackMacItemArray){
                  trackMacItemArray = [];
                }
                trackMacItemArray.push(tmi)
              }

              if(appConfig.realTimeRefresh){
                setTimeout(lang.hitch(_this, 'loadAlarmMac'), 1000);
              }
          });
        },

        _fetchData: function(){
          //
          this.loadFace();
          this.loadAlarmMac();
          this.loadMac();
        }




    });

});
