var xmpp_server = require("node-xmpp-server");

var clients = new Map();
var rooms = new Map();

var server = xmpp_server.C2S.TCPServer({
	port = 4444,
	domain = "192.168.0.116"
});

server.on("connection",function (client) {
	
	client.on("register",function (opts,cb){
		cb(true)
	})

	client.on("authenticate",function (opts,cb){
		clients.set(opts.jid.local,client);
	})
	client.on("online",function (opts,cb){

	})
	client.on("stanza",function (stanza){
		
		if (stanza.attrs.ctype){// add room 
			rooms.set(stanza.attrs.ctype,"room1")
		}

		if (stanza.attrs.enterroom){//enter the room 
			var yourromm = rooms.get(stanza.attrs.enterroom)
			if (yourromm){//can find room ,enter this room


			}else{// undefind room ,create one by his self

			}
		}
		if (stanza.attrs.goout){// logout room

		}

	})
})

server.on("listening",function(){
	console.log("监听game room开始")
})

function deleteroom(roomname){


}
