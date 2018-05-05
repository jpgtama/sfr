define([
	"app/config",
    "dojo/request",
    "dojo/_base/lang",
    "dojo/_base/declare"
], function(appConfig, request, lang, declare) {

  // var apiBaseUri = '/bdc/be/api/';
	var apiBaseUri = appConfig.apiBase;

  var dataUrl = {
    'img': 'img.php'
  };

  var databus = {

    get: function(d, options){
      var p = lang.mixin({handleAs: 'json', async:true}, options);

      if(dataUrl[d]){
        var url = apiBaseUri + dataUrl[d];

        // add data
        if(p.data){
          url += '?'+ dojo.objectToQuery(p.data);
        }

        return request(url, p);
      }else{
        console.error('request a empty data');
      }
    }




  };


    return databus;
});
