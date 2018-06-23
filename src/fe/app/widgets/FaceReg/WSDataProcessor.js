define([
  'dijit/registry',
  'dojo/_base/lang',
  'dojo/_base/declare'
], function(registry, lang, declare){
  return declare('WSDataProcessor', [], {

      showFaceWrapperNode: null,

      faceRegWidgetArray: null,

      constructor: function (options) {
        lang.mixin(this, options);
      },

      getCTime: function(){
  			var d = new Date();

  			function pad(num, size) {
  				var s = num+"";
  				while (s.length < size) s = "0" + s;
  				return s;
  			}

  			return pad(d.getHours(), 2) + ":" + pad(d.getMinutes(), 2) + ":" +  pad(d.getSeconds(), 2);
  		},

      processSingle: function (obj) {
        var d;

        if(obj){
          if(obj.type == "recognized" || obj.type == "unrecognized"){
              d = {};
              if(obj.data){
                var data = obj.data;
                d.imgContentType = 'base64';
                d.file_name = data.face.image;
                d.time =  this.getCTime(); // TODO current time;

                // peerson name
                if(obj.type == "recognized"){
                  if(data.person && data.person.tag){
                    var tag = JSON.parse(data.person.tag);
                    // flag
                    d.recognized = true;

                    // avatar
                    d.imgContentType = 'url';
                    d.file_name = tag.avatar;

                    // name
                    d.person_name = tag.name ; // TODO

                    //  face mask  image
                    // TODO
                    // this.faceMaskNode.src = 'styles/images/face-mask-recognized.png';
                  }
                }else{
                  // unrecognized
                  // TODO
                  // this.faceMaskNode.src = 'styles/images/face-mask.png';
                  d.person_name = '山东酷创  欢迎您';
                }
              }
          }
        }

        return d;
      }



  });


});
