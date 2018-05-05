var fs = require('fs');

var lineArr = [];
  lineArr.push([121.511817, 31.243308]);lineArr.push([121.51054, 31.242932]);lineArr.push([121.502258, 31.243474]);lineArr.push([121.506131, 31.242831]);lineArr.push([121.509939, 31.243574]);lineArr.push([121.504328, 31.244758]);lineArr.push([121.500219, 31.244694]);lineArr.push([121.502376, 31.240657]);lineArr.push([121.51127, 31.243538]);lineArr.push([121.510615, 31.240281]);lineArr.push([121.506184, 31.239584]);lineArr.push([121.51005332464929, 31.236946810744094]);lineArr.push([121.50769666666665, 31.243458333333333]);
  
  
 var sql = "";
 
 // same person, diff position
 
 function randomID(){
	var min=10000, max=100000;
	 return Math.floor(Math.random() * (max - min)) + min;
}
 
 var sqls = '';
 
 lineArr.forEach(d => {
	 
	 s = `INSERT INTO d_track_personnel (track_id, personnel_id, name, lon, lat, grap_face, mac, track_time, point_id, device_id, data_id1, data_id2, addr, createby, confidence) VALUES ('${randomID()}', '101', 'hello', ${d[0]}, ${d[1]}, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, NULL);`;
	 
	 console.log(s);
	 sqls+= '\r\n'+s;
 });
 
 fs.writeFileSync('./out.sql',sqls);