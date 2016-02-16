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
			func("卧底获胜，游戏结束")
			this.gamestatus = false
			return
		}
		if (scount == 0){
			func("卧底已全部被找出，游戏结束")
			this.gamestatus = false
			return
		}
	}

	this.pready = function (name,img,client){
		var x = this.persons.size;
		var ps = new Baseoneperson(x,name,img,true,0);
		ps.setclient(client);
		this.persons.set(x,ps);
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
				}else{
					op.sendmsg('该用户已被投死')
					console.log("该用户已被投死")
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



//gamebegin()

//killone()

//console.log("ddd")
