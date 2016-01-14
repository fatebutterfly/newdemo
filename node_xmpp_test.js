//node_xmpp_test.js
var xmpp_ser = require("node-xmpp-server")
var Client = require("node-xmpp-client")

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
		if (opts.password === 'secret'){
			console.log("server:",opts.username,opts.password,"Auth OK")
			cb(null,opts)
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
		var from = stanza.attrs.from 
		stanza.attrs.from = stanza.attrs.to
		stanza.attrs.to = from
		client.send(stanza)
	})
})
	server.on("listening",function(){
		console.log("监听开始")
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
  		})
	})



console.log("xmpp server can be load")