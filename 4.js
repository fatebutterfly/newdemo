//test regex
/*var x = []

for (var i = 0; i < 10; i ++) {
	x += (i)
};
x.remove(5)
console.log(x[3])*/
/*
var xmpp_ser = require("node-xmpp-server")
var Client = require("node-xmpp-client")
var client1 = new Client({
    		jid: 'client1@localhost',
  		    password: 'secret'
  		})
  		client1.on('online', function () {
    		console.log('client1: online')
    		client1.send(new xmpp_ser.Stanza('message', { to: '192.168.0.116',chatto : "x" }).c('body').t('HelloWorld'))
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
      */
var client = ""
var whoespionage = require('./whoespionage.js')
var whe = new whoespionage()
whe.pready('','',client)
whe.pready('','',client)
whe.pready('','',client)
whe.pready('','',client)
whe.pready('','',client)
//whe.pready('','')
//whe.pready('','')
//whe.pready('','')

whe.setwords('桌布','毛巾')
whe.fapai()

whe.persons.get(2).vote(1,x);
whe.persons.get(1).vote(1,x);
whe.persons.get(0).vote(2,x);
whe.persons.get(3).vote(4,x);
whe.persons.get(4).vote(3,x);

whe.killone()
for(var value of whe.persons.values()){
  console.log("status ",value.status)
}

function x(ind){
  whe.persons.get(ind).votes++;
}