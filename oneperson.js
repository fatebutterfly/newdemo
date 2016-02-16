var xmpp_server = require("node-xmpp-server");
module.exports = oneperson;

var index = 0
var name = ""
var img = ""
var live = true
var votes = 0

function oneperson(index,name,img,live,votes){
		this.index = index;
		this.name = name;
		this.img = img;
		this.live = live;
		this.votes = votes;
		this.hasvote = true
		this.ready = function(){

		}

		this.setclient = function(client){
			this.client = client
			this.client.send(new xmpp_server.Stanza('message', { to: 'gamer', type : 'message' ,index :this.index }).c('body').t("已准备,您是"+(this.index+1)+"号选手"))
		}
		this.fenpei = function(words,status){
			this.words = words
			this.status = status
			if(this.client){
				this.client.send(new xmpp_server.Stanza('message', { to: 'gamer', type : 'message' }).c('body').t(words))
			}
		}
		this.sendmsg = function(str){
			if(this.client){
				this.client.send(new xmpp_server.Stanza('message', { to: 'gamer', type : 'message' }).c('body').t(str))
			}
		}
		this.vote = function(index,fun){
			console.log("投票到这来")
			if(this.hasvote){
				console.log("投票")
				this.hasvote = false
				fun(index)
			}
		}
}