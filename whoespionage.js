module.exports = whoespionage
var Baseoneperson = require('./oneperson.js')
function whoespionage (){
	this.persons = new Map();
	this.gamestatus = false
	this.killone = function (func){
		var hasequal = false
		var xp = new Baseoneperson(0,'','',false,0)
		for(var value of this.persons.values()){
			if(!value.live){
				continue;
			}
			if (value.hasvote){
				console.log("请各位用户投票")
				return;
			}
			if (xp.votes < value.votes){
				hasequal = false
				xp = value
				console.log("小于")
			}else if (xp.votes == value.votes){
				xp = value
				hasequal = true
				console.log("等于")
			}
		}
		if (hasequal){
			console.log("未能得出最高的一个用户，请重新投票")
			func("未能得出最高的一个用户，请重新投票")
			for(var value of this.persons.values()){
				value.hasvote = true;
				value.votes = 0
			}
			return;
		}
		xp.live = false
		if (xp.status){
			console.log("投票 卧底")
			func("投票成功 卧底死亡")
		}else{
			console.log("投票失败 平民冤死")
			func("投票失败 平民冤死")
		}
		var livecount = 0
		var scount = 0
		for (var value of this.persons.values()){
			value.votes = 0
			if(value.live){
				value.hasvote = true
				livecount++
				if (value.status){
					scount ++
				}
			}
		}
		if (livecount - scount <= scount){
			func("卧底获胜，游戏结束。\r\n请输了的玩家摇序号，选惩罚\r\n" + getPass(6))
			this.gamestatus = false
			return
		}
		if (scount == 0){
			func("卧底已全部被找出，平民获胜，游戏结束。\r\n请输了的玩家摇序号，选惩罚\r\n" + getPass(6))
			this.gamestatus = false
			return
		}
	}

	this.pready = function (name,img,client){
		var x = this.persons.size;
		for(var i = 0;i< this.persons.size;i++){
			var xps = this.persons.get(i)
			//console.log(xps)
			if(xps && xps.name == name){
				xps.setclient(client)
				return
			}
		}
		var ps = new Baseoneperson(x,name,img,true,0);
		ps.setclient(client);
		this.persons.set(x,ps);
	}

	this.pready = function (name,img,client,func){
		var x = this.persons.size;
		for(var i = 0;i< this.persons.size;i++){
			var xps = this.persons.get(i)
			//console.log(xps)
			if(xps && xps.name == name){
				xps.setclient(client)
				func(name + "已准备，是" + ( ps.index + 1 ) + "号选手")
				return
			}
		}
		var ps = new Baseoneperson(x,name,img,true,0);
		ps.setclient(client);
		this.persons.set(x,ps);
		func(name + "已准备，是" + ( x) + "号选手")
	}


	this.setwords = function(normal,special){
		this.normal = normal
		this.special = special
	}

	this.fapai = function (){
		var psize = this.persons.size
		if(psize < 5){
			console.log("人数不足，无法开始游戏")
		}
		if(psize > 6){
			var ran1 = Math.round(Math.random() * 3)
			var ran2 = Math.round(Math.random() * (psize - 3)) + ran1 
			if (ran2 == ran1){
				ran2 += Math.ceil(Math.random() * 3)
			}
			console.log("ran1 ran2",ran1,ran2)
			for(var value of this.persons.values()){
				value.live = true
				value.hasvote = true
				value.votes = 0
				if (ran2 == value.index){
					value.fenpei(this.special,true)
				}
				else if (ran1 == value.index){
					if (psize > 6){
						value.fenpei(this.special,true)
					}else{
						value.fenpei(this.normal,false)
					}
				} 
				else{
					value.fenpei(this.normal,false)
				}			
			}
		}else{
			var ran1 = Math.round(Math.random()*(psize-1))
			console.log("分配为卧底",ran1)
			for(var value of this.persons.values()){
				value.live = true
				value.hasvote = true
				value.votes = 0
				if (ran1 == value.index){
					value.fenpei(this.special,true)
				}else{
					value.fenpei(this.normal,false)
				}
			}
		}
	}

	this.votes = function(index,hitone,func){
		if(!this.gamestatus){

			console.log("游戏已结束")
			return
		}
		var op = this.persons.get(parseInt(index))
		if (op && op.live){
			if(op.hasvote){
				var victim = this.persons.get(parseInt(hitone))
				if (victim && victim.live){
					op.hasvote = false
					victim.votes++;
					//op.sendmsg('投了' + (victim.index + 1) + '号一票,该用户已有' + victim.votes + '票')
					func((op.index+1)+'号投了' + (victim.index + 1) + '号一票,已有' + victim.votes + '票')
				}else{
					op.sendmsg('该用户无法被投票')
					//console.log("该用户已被投死")
				}
				
			}
			else{
				op.sendmsg('你已投票')
				console.log("本轮已投票")
			}
		}else{
			console.log('只有活人才能投票')
		}
		var itgofinish = true;
		for(var value of this.persons.values()){
			if (value && value.live && value.hasvote){
				itgofinish = false
			}
		}
		if (itgofinish){
			this.killone(func)
		}
	}

	this.gamebegin = function (){
		
	}


	this.reset = function (){
		this.persons = new Map();
	}
}

var slisli = ["给大家讲一个笑话，不好笑不给过",
"娇喘地说，我好寂寞，我要，我要，人家要嘛！",
"在空间发：喜欢我就赶紧向我表白吧！",
"自爆内衣/裤颜色",
"男生自爆长度，女生自爆胸围",
"给大家说个重口味段子～不重不给过",
"由2号出惩罚题目",
"唱一首儿歌，不得少于3句",
"恭喜你直接通过！",
"选一个玩家猜拳，你赢，惩罚转移给TA；否则，由TA指定某个惩罚",
"说自己最丢人的事",
"在空间发：今天才知道，原来我是同性恋",
"说出一个你目前喜欢的人是谁、干嘛的",
"坦白回答:你的初吻是几岁在什么地方被什么人夺去的?",
"喜欢一起游戏的哪位异性（一定要选），说出你的理由",
"娇喘的说：亚美蝶！亚美蝶！亚美蝶！",
"坦白回答：你想有gf/bf吗？什么样的?",
"对不起，你是今日最衰：执行惩罚1和惩罚6",
"坦白回答:你的初夜是几岁在什么地方被什么人夺去的?",
"模仿狗叫，至少叫3声",
"对一起游戏的一名异性深情告白30秒，不够深情不给过",
"大叫三声：我是屌丝",
"向左数第一个异性，跪地求婚状：如果我不向你求婚，我会后悔一辈子，因为你是我的惟一。",
"选一个男生 一边捶他的胸一边说： 你好讨厌哦。",
"与左数第一个异性正面对着十指交扣，深情对视，并朗诵骆《鹅》",
"恭喜你！你可以选择一名代你进行指定惩罚",
"跪着唱征服",
"如果时间能倒流你希望回到哪一时间，为什么？",
"自己一个人的时候流过泪吗？原因是？",
"如果看到自己最爱的人熟睡在你面前你会做什么？",
"情人节最想收到什么礼物？",
"请客/发个红包"]

function getPass(len)
{
	var tmpCh = "";
	for(var i = 0; i < len; i++)
	{
		var index = Math.floor(Math.random() * slisli.length);
		tmpCh += "惩罚" + (i + 1) + "：" + slisli[index] + "\r\n"
	}
	return tmpCh;
}


//gamebegin()

//killone()

//console.log("ddd")
