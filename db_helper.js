//db_helper

/*
var mysql = require("mysql");
var connection = mysql.createConnection({
	host : "127.0.0.1",
	port : 3306,
	database : "beans",
	user : "justdoit",
	password : "AbcAbc123",
});

connection.connect();

connection.query("select * from beans_user",function(err,rows,fields){
	if (err) throw err;
	console.log("the solution is : " + rows[0].nickname );
});
console.log("it runs to there");
connection.end();
*/
exports.add = function(a,b){
	var x = 0;
	x = a + b;
	return x;
}

exports.initDBByParms = function (host,port,db,user,password){
	var mysql = require("mysql");
	var connection = mysql.createConnection({
		host : host,
		port : port,
		database : db,
		user : user,
		password : password,
	});
	return connection;
}

exports.initDB = function (){
	return exports.initDBByParms("127.0.0.1",3306,"beans","justdoit","AbcAbcAbc123");
}


exports.query = function(conn,queryString,getrows){
	conn.connect();
	conn.query(queryString,function(err,rows,fields){
	if (err) throw err;
		getrows(rows)
	});
	conn.end();
}

exports.update = function (conn,updateString,getrows){

	conn.connect();
	conn.query(updateString,function(err,rows,fields){
	if (err) throw err;
		getrows(rows)
	});
	conn.end();
}



