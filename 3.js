//3.js

var db_helper = require("./db_helper.js");

var conn = db_helper.initDB();

db_helper.query(conn,"select * from beans_user ",function(rows){
	for(var i = 0;i < rows.length;i++){
		var item = rows[i];
		console.log("nickname : " + item.nickname + " uid : " + item.ID);
	}
});


////ddddddddd