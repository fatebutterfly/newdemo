var mysql = require("mysql");
var connection = mysql.createConnection({
	host : "127.0.0.1",
	port : 3306,
	database : "beans",
	user : "justdoit",
	password : "Aa78479951",
});

connection.connect();

connection.query("select * from beans_user",function(err,rows,fields){
	if (err) throw err;
	console.log("the solution is : " + rows[0].nickname );
});
console.log("it runs to there");
connection.end();

