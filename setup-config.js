var fs = require('fs');
var mustache = require('mustache');
var mixinDeep = require('mixin-deep');

// read config file
var configAll = fs.readFileSync('./config.json', "utf8");

configAll = JSON.parse(configAll);

var defaultConfig =  configAll['default'];

// check env
if(process.env.RUNNING_ENV == 'EvanXYHu' ){
  console.log("EvanXYHu");
	var envConfig = configAll['EvanXYHu'];
	if(envConfig){
		mixinDeep(defaultConfig, envConfig);
	}
}else{
  console.log("NULL")
}


// db
function setupDB(data){
  data = mustache.render(data, defaultConfig);
  return data;
}

function setupAppConfig(data){
  data = mustache.render(data, defaultConfig);
  return data;
}

module.exports = {
  setupDB: setupDB,
  setupAppConfig: setupAppConfig

}
