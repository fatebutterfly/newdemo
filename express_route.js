//express_route.js
var express = require('express'); 
var app = express(); 
app.get('/', function(req, res){ 
          res.send('hello world'); 
          console.log('hello world');
}); 
app.get('/users',function(req,res){
	res.send("users");
	console.log('users');
});
app.post("/msg/add",function(req,res){
	res.send("msgadd");
	console.log('msgadd');
});

app.listen('8808');