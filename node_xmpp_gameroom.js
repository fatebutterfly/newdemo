var xmpp_server = require("node-xmpp-server");
var whoespionage = require('./whoespionage.js')

var clients = new Map();
var rooms = new Map();
var roomgame = new Map();

var server = new xmpp_server.C2S.TCPServer({
	port:4444,
	domain:'192.168.0.116'
})

server.on("connection",function (client) {
	
	client.on("register",function (opts,cb){
		cb(true)
	})

	client.on("authenticate",function (opts,cb){
		clients.set(opts.jid.local,client);
		cb(null,opts)
	})

	client.on("online",function (){

	})

	client.on("stanza",function (stanza){
		console.log("stanza server :",client.jid.local,"stanza",stanza.toString())
		if (stanza.attrs.addroom){// add room 
			var rmclients = new Map();
			rmclients.set(0,client);
			rooms.set(stanza.attrs.addroom,rmclients);
			//create one room success
			var whe = new whoespionage();
			roomgame.set(stanza.attrs.addroom,whe);
			client.send(new xmpp_server.Stanza('message',{to:'gamer',type:'create'}).c('body').t(''))
		}

		if (stanza.attrs.enterroom){//enter the room 
			var yourroom = rooms.get(stanza.attrs.enterroom)
			if (yourroom){//can find room ,enter this room
				yourroom.set(1,client);
				rooms.set(stanza.attrs.enterroom,yourroom);
				//enter this room success
				for (var value of yourroom.values()) {
 					value.send(new xmpp_server.Stanza('message', { to: 'gamer', type : 'enter' }).c('body').t(''))
				}
			}else{// undefind room ,create one by his self
				//cant find this room,enter in another room
				client.send(new xmpp_server.Stanza('message',{ to: 'gamer',type:'cantjoin' }).c('body').t(''))
			}
		}

		if (stanza.attrs.goout){// logout room
			var yourroom = rooms.get(stanza.attrs.enterroom)
			//go out this room
			if (yourroom){
				yourroom.delete(stanza.attrs.index)
				client.send(new xmpp_server.Stanza('message',{ to : 'gamer',type : 'goout' }).c('body').t(''))
			}
		}

		if (stanza.attrs.closeroom){//close room ,all user has been led out
			var yourroom = rooms.get(stanza.attrs.enterroom)

			for (var value of yourroom.values()) {
 				// msg to client that room closed
 				value.send(new xmpp_server.Stanza('message', { to: 'gamer', type : 'closed' }).c('body').t(''))
			}

		}

		if (stanza.attrs.readygame){//player to ready
			var whe = roomgame.get(stanza.attrs.roomname)
			if (whe){//one player become ready
				whe.pready(stanza.attrs.name,stanza.attrs.img,client);
			}
		}

		if (stanza.attrs.gamestart){//startgame
			var whe = roomgame.get(stanza.attrs.roomname)
			if (whe){
				whe.setwords("毛巾","桌布")
				whe.fapai();
				whe.gamestatus = true
			}
		}

		if (stanza.attrs.vote){// vote to choice ,who is the espionage
			var whe = roomgame.get(stanza.attrs.roomname)
			if (whe){
				whe.votes(stanza.attrs.index,stanza.attrs.vote,function(str){
					var yourroom = rooms.get(stanza.attrs.roomname)
					if(yourroom){
						for(var value of yourroom.values()){
							value.send(new xmpp_server.Stanza('message',{to:'gamer',type:'message'}).c('body').t(str))
						}
					}
				});
			}
		}

		if (stanza.attrs.uncover){//show the result
			var whe = roomgame.get(stanza.attrs.roomname)
			if (whe){
				whe.killone(function(str){
					var yourroom = rooms.get(stanza.attrs.roomname)
					if(yourroom){
						for(var value of yourroom.values()){
							value.send(new xmpp_server.Stanza('message',{to:'gamer',type:'message'}).c('body').t(str))
						}
					}
				})
			}
		}

		if (stanza.attrs.roomchat){
			var yourroom = rooms.get(stanza.attrs.roomname)
			if (yourroom){
				for(var value of yourroom.values()){
					if (value != client){
						value.send(new xmpp_server.Stanza('message',{ to:'gamer',type:'message' }).c('body').t(stanza.attrs.body))
					}
				}
			}
		}
		
		


	})
})

server.on("listening",function(){
	console.log("监听game room开始")
})

function deleteroom(roomname){


}
