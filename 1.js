console.log("xxxxx");
var crypto = require('crypto');
var http = require('http');
http.createServer(function(request,response)
	{
		var content = 'password'
		var md5 = crypto.createHash('md5');
		md5.update(content);
		var d = md5.digest('hex'); 
		console.log("有人访问" + request.url + "token:"+d);
		response.end('hello world');
	}
	).listen(3456);
console.log("xxxxx");

console.log('server start at 888');
/*
2015-12-31T10:27:14.963035Z 1 [Note] A temporary password is generated for root@localhost: clZlyfp;W3qY
*/