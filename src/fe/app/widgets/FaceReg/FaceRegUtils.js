define([
  "app/config",
  'dijit/registry',
  'dojo/_base/lang',
  'dojo/_base/declare'
], function(appConfig, registry, lang, declare){

  var utils = {
    setImgSrc: function (node, base64Str, imgContentType) {
      if(imgContentType == 'base64'){
        node.src = "data:image/png;base64," + base64Str;
      }else if(imgContentType == 'url'){
        node.src = appConfig.imgBaseUrl + base64Str;
      }
    }
  };

  return utils;
});
