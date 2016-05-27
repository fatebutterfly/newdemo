//xtxt.js
var net = require('net');
var HOST = '127.0.0.1';
var PORT = 4545;
net.createServer(function(sock) {

    // 我们获得一个连接 - 该连接自动关联一个socket对象
    console.log('CONNECTED: ' +
        sock.remoteAddress + ':' + sock.remotePort);
		sock.write('Hi!\n');
    	sock.end();
    // 为这个socket实例添加一个"data"事件处理函数
    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
    });
    sock.on("connection",function(data){
    	sock.write('Hi!\n');
    	sock.end();
    })
    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function(data) {
        console.log('CLOSED: ' +
            sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);

var tmap = new Map();


