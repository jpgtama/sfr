<?php
$pdo;
function connectDB(){
	global $pdo;
	$mysql_conf = array(
    'host'    => '{{{db.url}}}:{{{db.port}}}',
    'db'      => '{{{db.dbName}}}',
    'db_user' => '{{{db.user}}}',
    'db_pwd'  => '{{{db.pwd}}}',
    );
$pdbcUrl = "mysql:host=" . $mysql_conf['host'] . ";dbname=" . $mysql_conf['db'];
$pdo = new PDO($pdbcUrl, $mysql_conf['db_user'], $mysql_conf['db_pwd']);//创建一个pdo对象
$pdo->exec("set names 'utf8'");
$pdo->query("SET wait_timeout=1200;");
}


try{
	connectDB();
}catch(Exception $e){
	 try{
		connectDB();
	}catch(Exception $e){
		 exit("db error");
	}
}
?>
