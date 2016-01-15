// 3.js
// get method from db_helper.js


var db_helper = require("./db_helper.js");

var conn = db_helper.initDB();

db_helper.subtract(5,3);
/*
db_helper.query(conn,"select * from beans_user ",function(rows){
	for(var i = 0;i < rows.length;i++){
		var item = rows[i];
		console.log("nickname : " + item.nickname + " uid : " + item.ID);
	}
});*/
//var sql = require('./mssqlbase.js');
var sli = [];
sli += (1)
sli += 3
sli += 4
//sli += { "a":"b","c":"d" };
console.log(sli.length)
for(var i = 0;i < sli.length;i++){
	var model = sli[i]
	console.log("item:",model)
}



//console.log("sql",sql.__Base)

//ddddddddddddddddddd
////ddddddddd