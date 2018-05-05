var through = require('through2');
var PluginError = require('gulp-util').PluginError;
var setcon = require('./setup-config.js');

// consts
var PLUGIN_NAME = 'gulp-bdc-setupconfig';

module.exports = function() {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // return empty file
      return cb(null, file);
    }
    if (file.isBuffer()) {
      if(file.path.indexOf('be\\service\\db-session-pdo.php') !== -1){
        var s = file.contents.toString('utf8');
        s = setcon.setupDB(s);
        file.contents = Buffer.from(s);
      }

      if(file.path.indexOf('fe\\app\\config.js') !== -1){
        var s = file.contents.toString('utf8');
        s = setcon.setupAppConfig(s);
        file.contents = Buffer.from(s);
      }
    }
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
    }
    cb(null, file);
  });
};
