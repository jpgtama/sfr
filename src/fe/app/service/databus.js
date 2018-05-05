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
			options = lang.mixin({}, options);
      var p = lang.mixin({handleAs: 'json', async:true}, options);

      if(dataUrl[d]){
        var url = apiBaseUri + dataUrl[d];

        // add data
				var queryObj = {};
        if(p.data){
					lang.mixin(queryObj, p.data);
        }

				if(!options.cacheBust){
					var ts = new Date().getTime();
					queryObj[ts] = 1;
				}


				if(Object.keys(queryObj) > 0){
					url += '?'+ dojo.objectToQuery(queryObj);
				}

        return request(url, p);
      }else{
        console.error('request a empty data');
      }
    }




  };


    return databus;
});
