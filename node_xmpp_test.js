//node_xmpp_test.js
var xmpp_ser = require("node-xmpp-server")
var Client = require("node-xmpp-client")

var xclient = []

var server = new xmpp_ser.C2S.TCPServer({
	port:5222,
	domain:'192.168.0.116'
})

server.on("connection",function (client){
	console.log(" connection load ")
	
	client.on("register",function (opts,cb){
		console.log("register")
		cb(true)
	})

	client.on("authenticate",function (opts,cb) {
		console.log("authenticate")
		/*
		if (opts.jid.local == "2222"){
			xclient = client
		}
		if (opts.jid.local == "4444"){
			yclient = client
		}*/
		if (opts.password == 'secret' || opts.password == "123"){
			console.log("server:",opts.username,opts.password,"Auth OK")
			cb(null,opts)
			var hasClient = false;
			for(var i = 0;i < xclient.length; i++){
				var item = xclient[i]
				if (item.jid.local == opts.jid.local) {
					hasClient = true
					xclient[i] = client
					console.log("替换了一个")
				}
			};
			if (!hasClient){
				xclient[xclient.length] = client
				console.log("添加了一个")
			}
		} else {
			console.log("Auth false")
			cb(false)
		}

	})

	client.on("online",function () {
		console.log("online")
	})

	client.on("stanza",function (stanza) {
		console.log("stanza server :",client.jid.local,"stanza",stanza.toString())
		var chatroom = stanza.attrs.roomname
		client.room = chatroom

		var from = stanza.attrs.from
		stanza.attrs.from = stanza.attrs.to
		stanza.attrs.to = from
		if (stanza.attrs.type == "unavailable"){
			for(var i = 0; i < xclient.length; i++){
				var model = xclient[i];
				if (model && model.jid && model.jid.local == client.jid.local){
					xclient.splice(i,1);
					console.log("删除了数组中的元素")
				}
			}
			client.end();
			return;
		}
		/*
		if(client.jid.local == "4444" && xclient){
			console.log("xclient: from 4444")
			xclient.send(stanza)
		}
		if (client.jid.local == "2222" && yclient ){
			console.log("xclient: from 2222")
			yclient.send(stanza)
		}*/
		var chrtto = stanza.attrs.chrtto;
		if (chrtto){
			console.log("client count is ",xclient.length)
			for(var i = 0; i < xclient.length; i++){
				var model = xclient[i];
			//console.log(" xxxxx model.jid ",model.jid)
				if (model && model.jid && model.jid.local == chrtto){
				//console.log("one client :",model.jid.local)
					model.send(stanza)
				}
			}
		}
		if (chatroom){
			for(var i = 0; i < xclient.length; i++){
				var model = xclient[i];
				if (model && model.room == chatroom && model != client){
					model.send(stanza)
				}
			}
		}
		//console.log(" chrt to : ",stanza.attrs.chrtto)
		//
		//client.send(stanza)
	})

	
})
	server.on("listening",function(){
		console.log("监听开始")
		/*
		var client1 = new Client({
    		jid: 'client1@localhost',
  		    password: 'secret'
  		})
  		client1.on('online', function () {
    		console.log('client1: online')
    		client1.send(new xmpp_ser.Stanza('message', { to: '192.168.0.116' }).c('body').t('HelloWorld'))
  		})
  		client1.on('stanza', function (stanza) {
    		console.log('client1: stanza', stanza.root().toString())
  		})
  		var client2 = new Client({
    		jid: 'client2@localhost',
    		password: 'notsecret'
  		})
  		client2.on('error', function (error) {
    		console.log('client2', error)
  		})*/
	})



console.log("xmpp server can be load")