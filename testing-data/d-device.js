var fs = require('fs');

var sss = '116.67301693191872 , 36.66762433073533 ; 116.795717 , 36.592861 ; 116.803162 , 36.599779 ; 116.805484 , 36.602091 ; 116.812399 , 36.585981 ; 116.812983 , 36.609076 ; 116.81546303927259 , 36.61135102543493 ; 116.81546303929068 , 36.611351192196835 ; 116.81546303934495 , 36.61135169248255 ; 116.81546303939922 , 36.61135219276828 ; 116.81546303941731 , 36.61135235953018 ; 116.81546303947157 , 36.61135285981591 ; 116.81546303948966 , 36.61135302657782 ; 116.81546320571404 , 36.61135152542915 ; 116.81546320591302 , 36.611353359810145 ; 116.81546337202889 , 36.61135085809003 ; 116.81546337211934 , 36.611351691899564 ; 116.81546337215552 , 36.611352025423386 ; 116.81546337217361 , 36.611352192185294 ; 116.81546353834374 , 36.61135019075091 ; ';

sss = sss.split(';');

var dataList = [];

for(i=0;i<sss.length;i++){
	arr =  sss[i].split(',');
	if(arr.length>=2){
		data = {
			lon: arr[0].trim(),
			lat: arr[1].trim(),
			datacount: Math.floor(Math.random() * 10) + 1
		};
		dataList.push(data);
	}

}

function randomID(){
	var min=10000, max=100000;
	 return Math.floor(Math.random() * (max - min)) + min;
}

// sql
var sqls = '';
dataList.forEach(d => {
	for(i=0;i<d.datacount;i++){
		var sql = `INSERT INTO d_device (data_id, device_id, point_id, lon, lat, locationtype, accuracy, provider, speed, locationtime, file_name, createby, confidence) VALUES ('${randomID()}', '${randomID()}', NULL, '${d.lon}', '${d.lat}', NULL, NULL, NULL, NULL, NULL, NULL, CURRENT_TIMESTAMP, NULL);`;

		sqls += '\r\n'+sql;

	}

});


fs.writeFileSync('./d-device.sql',sqls);
