
const readline = require('readline');

var Client = require("node-xmpp-client")
var xmpp_server = require("node-xmpp-server");
var tindex = "0"
var client1 = new Client({
    jid: 'client1@localhost',
  	password: 'secret',
  	host:'192.168.0.116',
  	port:4444
})
client1.on('online', function () {
    console.log('client1: online')
    client1.send(new xmpp_server.Stanza('presence',{ roomname:'abc',name:'a',img:'x',readygame:'readygame' }))
    //client1.send(new xmpp_server.Stanza('message', { to: '192.168.0.116' }).c('body').t('HelloWorld'))
})
client1.on('stanza', function (stanza) {
	if(stanza.attrs.index){
		tindex = stanza.attrs.index
	} 
	//console.log('client1: stanza', stanza)
})

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

r1.on("line",function(line){
	switch(line.trim()){
		case "a":
			client1.send(new xmpp_server.Stanza('presence',{ roomname:'abc',index:tindex,vote:0 }))
			break;
		case "b":
			client1.send(new xmpp_server.Stanza('presence',{ roomname:'abc',index:tindex,vote:1 }))
			break;
		case "c":
			client1.send(new xmpp_server.Stanza('presence',{ roomname:'abc',index:tindex,vote:2 }))
			break;
		case "d":
			client1.send(new xmpp_server.Stanza('presence',{ roomname:'abc',index:tindex,vote:3 }))
			break;
		case "e":
			client1.send(new xmpp_server.Stanza('presence',{ roomname:'abc',index:tindex,vote:4 }))
			break;
		case "f":
			client1.send(new xmpp_server.Stanza('presence',{ roomname:'abc',index:tindex,vote:5 }))
			break;
		case "g":
			client1.send(new xmpp_server.Stanza('presence',{ roomname:'abc',index:tindex,vote:6 }))
			break;
		default:
			break;
	}
});
/*r1.question('',(answer)=>{
	console.log(answer)
	client1.send(new xmpp_server.Stanza('presence',{ roomname:'abc',index:tindex,vote:3 }))
	r1.close()
})*/

/*
var client2 = new Client({
	jid: 'client2@localhost',
	password: 'notsecret'
})
client2.on('error', function (error) {
	console.log('client2', error)
})*/