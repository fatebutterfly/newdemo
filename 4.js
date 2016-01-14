//test regex
/*var x = []

for (var i = 0; i < 10; i ++) {
	x += (i)
};
x.remove(5)
console.log(x[3])*/
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