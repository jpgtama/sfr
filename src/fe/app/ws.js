define(['app/RTSPConfig', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array'], function (RTSPConfig, declare, lang, array) {

  var obj = {
    onMessage: function (evt) {
      console.log('Please override this method.', evt);
    },

    start: function () {
      // loop rtsp array
      array.forEach(rtspUrls, function (rtspUrl) {
        var ws = wsUrl + "?url=" + encodeURIComponent(rtspUrl);
        var webSocketClient = new WebSocketClient();
        webSocketClient.testWebSocket(ws);
      });
    }
  };

  //主机地址
    // var wsUrl = "ws://localhost:8080/hello-WS/websocket";
   // var wsUrl = "ws://192.168.10.60:9000/video";
	//var wsUrl = "ws://221.214.51.74:9000/video";
    //视频流地址
	// var rtspUrl = "rtsp://192.168.10.215/user=admin&password=&channel=1&stream=0.sdp?";
	//var rtspUrl = " rtsp://admin:admin@192.168.10.44:554/1/1";

	//主机地址
    //var wsUrl = "ws://192.168.10.60:9000/video";
	var wsUrl = "ws://localhost:8080/hello-WS/websocket";
    //视频流地址
  // var rtspUrls = ["rtsp://admin:admin@192.168.10.44:554/1/1", "rtsp://192.168.1.101/live1.sdp"];
  var rtspUrls = RTSPConfig;
	// var rtspUrl = "rtsp://admin:admin@192.168.10.44:554/1/1";



    //websocket连接
    //var ws = wsUrl + "?url=" + encodeURIComponent(rtspUrl);

	// console.info(ws);

	//var output;

	//初始化操作
	// function init() {
	// 	output = document.getElementById("output");
	// 	testWebSocket();
	// }

  var WebSocketClient = declare('', [], {
      instance: null,

      ws: null,

      reconnect: function () {
        if(this.instance){
          this.instance = null;
        }


        setTimeout(lang.hitch(this, function(){
          this.testWebSocket(this.ws);
        }), 10000);

      },

      testWebSocket: function (ws) {
        this.ws = ws;
        var _this = this;

        var websocket = this.instance = new WebSocket(ws);

        websocket.onopen = function(evt) {
          onOpen(evt)
        };
        websocket.onclose = function(evt) {
          onClose(evt)
        };
        websocket.onmessage = function(evt) {
          onMessage(evt)
        };
        websocket.onerror = function(evt) {
          onError(evt)
        };


        function onOpen(evt) {
          writeToScreen("CONNECTED");
          doSend("WebSocket rocks");
        }

        function onClose(evt) {
          writeToScreen("DISCONNECTED");
          writeToScreen("trying to reconnect after 1 second");
          _this.reconnect();
        }

        //收到消息
        function onMessage(evt) {
          var retObj;
          if(typeof evt.data === 'string'){
            retObj = JSON.parse(evt.data);
          }else{
            retObj = evt.data;
          }

          var retData = eval('(' + evt.data + ')');
          // image = obj['data']['face']['image'];
          // writeToScreen('<img height="100" width="100" src="data:image/png;base64,' + image + '"/>');
          //关闭连接
          //websocket.close();
          obj.onMessage(retObj);
        }

        function onError(evt) {
          writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
          writeToScreen("trying to reconnect after 1 second");
          _this.reconnect();
        }

        function doSend(message) {
          writeToScreen("SENT: " + message);
          websocket.send(message);
        }

        //输出识别结果到屏幕
        function writeToScreen(message) {
          // var result = document.getElementById("test");
          // var pre = document.createElement("p");
          // pre.style.wordWrap = "break-word";
          // pre.innerHTML = message;
          // output.appendChild(pre);
          console.log(message)
        }


      }


  });





  // var WS = declare('WS', [], {
  //
  //
  //
  //
  //
  // });



  return obj;

});
