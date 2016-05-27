var xmpp_server = require("node-xmpp-server");
var whoespionage = require('./whoespionage.js')

var clients = new Map();
var rooms = new Map();
var roomgame = new Map();

var server = new xmpp_server.C2S.TCPServer({
	port:4525,
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
			//uid 作为标识符
			var oldroom = rooms.get(stanza.attrs.addroom)
			if (oldroom){
				var rmclients = oldroom.get(stanza.attrs.addroom)
				rmclients.set(stanza.attrs.uid,client)
				client.send(new xmpp_server.Stanza('message', { to: 'gamer', type : 'enter',inuname:"" }).c('body').t(''))
			}
			else{
				var rmclients = new Map();
				rmclients.set(stanza.attrs.uid,client);
				rooms.set(stanza.attrs.addroom,rmclients);
				//create one room success
				var whe = new whoespionage();
				roomgame.set(stanza.attrs.addroom,whe);
				client.send(new xmpp_server.Stanza('message',{to:'gamer',type:'create'}).c('body').t(''))
			}
		}

		if(stanza.attrs.hasroom){
			var rnames = stanza.attrs.roomname
			var roomnames = rnames.split('|')
			var has = false
			for(var i = 0;i < roomnames.length;i++){
				var rnm = roomnames[i]
				if(rooms.get(rnm)){
					has = true
					break;
				}
			}
			if(has){
				client.send(new xmpp_server.Stanza('message',{to:'gamer',type:'has',rm:rnm}).c('body').t(''))
			}else{
				client.send(new xmpp_server.Stanza('message',{to:'gamer',type:'has',rm:''}).c('body').t(''))
			}
			
		}
		if (stanza.attrs.enterroom){//enter the room 
			var yourroom = rooms.get(stanza.attrs.enterroom)
			if (yourroom){//can find room ,enter this room
				//yourroom.set(1,client);
				//uid 作为标识符
				yourroom.set(stanza.attrs.uid,client)
				rooms.set(stanza.attrs.enterroom,yourroom);
				//enter this room success
				for (var value of yourroom.values()) {
 					value.send(new xmpp_server.Stanza('message', { to: 'gamer', type : 'enter',inuname:stanza.attrs.uname }).c('body').t(''))
				}
			}else{// undefind room ,create one by his self
				//cant find this room,enter in another room
				client.send(new xmpp_server.Stanza('message',{ to: 'gamer',type:'cantjoin' }).c('body').t(''))
			}
		}

		if (stanza.attrs.goout){// logout room
			var yourroom = rooms.get(stanza.attrs.goout)
			var outname = stanza.attrs.name
			//go out this room
			if (yourroom){
				yourroom.delete(stanza.attrs.uid)
				if stanza.attrs.goout == stanza.attrs.uid{
					rooms.delete(stanza.attrs.goout)
					roomgame.delete(stanza.attrs.goout)
					for (var value of yourroom.values()) {
				   	 	value.send(new xmpp_server.Stanza('message',{ to : 'gamer',type : 'closed',outname : outname }).c('body').t(''))
               		}
					return
				}

                for (var value of yourroom.values()) {
				    value.send(new xmpp_server.Stanza('message',{ to : 'gamer',type : 'goout',outname : outname }).c('body').t(''))
                }
                if(yourroom.size == 0){
                    rooms.delete(stanza.attrs.goout)
                }
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
			var sname = stanza.attrs.sname
			if (sname) {
				sname = UrlDecode(sname)
			}else{
				sname = ""
			}
			if (whe){//one player become ready
				whe.pready(stanza.attrs.name,stanza.attrs.img,client,function(str){
					var yourroom = rooms.get(stanza.attrs.roomname)
					if(yourroom){
						for(var value of yourroom.values()){
							value.send(new xmpp_server.Stanza('message',{to:'gamer',type:'message'}).c('body').t(sname + str))
						}
					}
				});
			}
			/*
			var yourroom = rooms.get(stanza.attrs.roomname)
			for(var value of yourroom.values){
				var str = stanza.attrs.name + "已准备，是3号选手"
				value.send(new xmpp_server.Stanza('message',{to:'gamer',type:'message'}).c('body').t(str))
			}*/
		}

		if (stanza.attrs.gamestart){//startgame
			var whe = roomgame.get(stanza.attrs.roomname)
			if (whe){
				var xp = xipai()
				whe.setwords(xp[0],xp[1])
				whe.fapai();
				whe.gamestatus = true
				//whe.persons.size
				var ssize = whe.persons.size
				var ran1 = Math.floor(Math.random() * ssize) + 1
				var yourroom = rooms.get(stanza.attrs.roomname)
				if (yourroom){
					for(var value of yourroom.values()){
						value.send(new xmpp_server.Stanza('message',{ to:'gamer',type:'itstart',size:ssize }).c('body').t("从" + ran1 + "号选手开始描述,共有位" + ssize + "选手"))
					}
				}
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
			var sname = stanza.attrs.name
			var simg = stanza.attrs.img
			var sbody = stanza.attrs.body
			console.log("那内容是："+sname+"__"+sbody)
			var yourroom = rooms.get(stanza.attrs.roomname)
			if (yourroom){
				for(var value of yourroom.values()){
					if (value != client){
						value.send(new xmpp_server.Stanza('message',{ to:'gamer',type:'message',name:sname,img:simg }).c('body').t(sbody))
					}
				}
			}
		}
		
		


	})
})

server.on("listening",function(){
	console.log("监听game room开始")
})
var x = [    [        "浴缸",        "鱼缸"    ],    [        "电动车",        "摩托车"    ],    [        "眉毛",        "睫毛"    ],    [        "书",        "本"    ],    [        "筷子",        "竹签"    ],    [        "麻雀",        "乌鸦"    ],    [        "火车",        "轮船"    ],    [        "镜子",        "玻璃"    ],    [        "笤帚",        "拖把"    ],    [        "铅笔带",        "铅笔盒"    ],    [        "那英",        "王菲"    ],    [        "盗墓笔记",        "鬼吹灯"    ],    [        "散文",        "小说"    ],    [        "树枝",        "树干"    ],    [        "脸盆",        "水桶"    ],    [        "直尺",        "三角板"    ],    [        "吴昕",        "谢娜"    ],    [        "晨光",        "真彩"    ],    [        "蒙牛",        "伊利"    ],    [        "可口可乐",        "百事"    ],    [        "加多宝",        "王老吉"    ],    [        "门诊",        "急诊"    ],    [        "天天向上",        "快乐大本营"    ],    [        "电话",        "手机?"    ],    [        "粉丝",        "米线"    ],    [        "电影",        "电视剧"    ],    [        "爷爷",        "姥爷"    ],    [        "天山老妖",        "东方不败"    ],    [        "前男友",        "男朋友"    ],    [        "零花钱",        "生活费"    ],    [        "夜宵",        "烧烤"    ],    [        "手机",        "座机"    ],    [        "作文",        "论文"    ],    [        "古筝",        "吉他"    ],    [        "玫瑰",        "月季?"    ],    [        "董永",        "许仙?"    ],    [        "若曦",        "晴川?"    ],    [        "牛奶",        "豆浆"    ],    [        "保安",        "保镖?"    ],    [        "白菜",        "生菜?"    ],    [        "辣椒",        "芥末?"    ],    [        "金庸",        "古龙?"    ],    [        "赵敏",        "黄蓉?"    ],    [        "?水盆",        "水桶?"    ],    [        "唇膏",        "口红?"    ],    [        "烤肉",        "涮肉?"    ],    [        "气泡",        "水泡?"    ],    [        "纸巾",        "手帕"    ],    [        "杭州",        "苏州?"    ],    [        "香港",        "台湾?"    ],    [        "首尔",        "东京?"    ],    [        "橙子",        "橘子"    ],    [        "葡萄",        "提子"    ],    [        "太监",        "人妖"    ],    [        "?蝴蝶",        "蜜蜂?"    ],    [        "小品",        "话剧?"    ],    [        "裸婚",        "闪婚"    ],    [        "新年",        "跨年"    ],    [        "吉他",        "琵琶"    ],    [        "公交",        "地铁"    ],    [        "?剩女",        "御姐"    ],    [        "童话",        "神话"    ],    [        "作家",        "编剧"    ],    [        "警察",        "捕快"    ],    [        "结婚",        "订婚"    ],    [        "奖牌",        "金牌"    ],    [        "那英",        "韩红"    ],    [        "面包",        "蛋糕"    ],    [        "作文",        "论文"    ],    [        "油条",        "麻花"    ],    [        "壁纸",        "贴画"    ],    [        "枕头",        "抱枕"    ],    [        "同学",        "同桌"    ],    [        "魔术师",        "魔法师"    ],    [        "鸭舌帽",        "遮阳帽"    ],    [        "双胞胎",        "龙凤胎"    ],    [        "情人节",        "光棍节"    ],    [        "丑小鸭",        "灰姑娘"    ],    [        "富二代",        "高富帅"    ],    [        "生活费",        "零花钱"    ],    [        "麦克风",        "扩音器"    ],    [        "郭德纲",        "周立波"    ],    [        "图书馆",        "图书店"    ],    [        "洗衣粉",        "皂角粉"    ],    [        "泡泡糖",        "棒棒糖"    ],    [        "土豆粉",        "酸辣粉"    ],    [        "蜘蛛侠",        "蝙蝠侠"    ],    [        "口香糖",        "木糖醇"    ],    [        "酸菜鱼",        "水煮鱼"    ],    [        "小笼包",        "灌汤包"    ],    [        "薰衣草",        "满天星"    ],    [        "张韶涵",        "王心凌"    ],    [        "刘诗诗",        "刘亦菲"    ],    [        "甄嬛传",        "红楼梦"    ],    [        "甄子丹",        "李连杰"    ],    [        "包青天",        "狄仁杰"    ],    [        "果粒橙",        "鲜橙多"    ],    [        "沐浴露",        "沐浴盐"    ],    [        "洗发露",        "护发素"    ],    [        "自行车",        "电动车"    ],    [        "班主任",        "辅导员"    ],    [        "过山车",        "碰碰车"    ],    [        "铁观音",        "碧螺春"    ],    [        "十面埋伏",        "四面楚歌"    ],    [        "成吉思汗",        "努尔哈赤"    ],    [        "谢娜张杰",        "邓超孙俪"    ],    [        "福尔摩斯",        "工藤新一"    ],    [        "?贵妃醉酒",        "黛玉葬花"    ],    [        "流星花园",        "花样男子"    ],    [        "神雕侠侣",        "天龙八部"    ],    [        "天天向上",        "非诚勿扰"    ],    [        "勇往直前",        "全力以赴"    ],    [        "鱼香肉丝",        "四喜丸子"    ],    [        "麻婆豆腐",        "皮蛋豆腐"    ],    [        "语无伦次",        "词不达意"    ],    [        "鼠目寸光",        "井底之蛙"    ],    [        "近视眼镜",        "隐形眼镜"    ],    [        "降龙十八掌",        "九阴白骨爪"    ],    [        "红烧牛肉面",        "香辣牛肉面"    ],    [        "江南style",        "最炫民族风"    ],    [        "梁山伯与祝英台",        "罗密欧与朱丽叶。"    ],    [        "人参果",        "蟠桃"    ],    [        "口若悬河",        "画饼充饥"    ],    [        "金字塔",        "狮身人面像"    ],    [        "瀑布",        "冰川"    ],    [        "飞行员",        "宇航员"    ],    [        "王祖贤",        "林青霞"    ],    [        "诸葛亮",        "周瑜"    ],    [        "高富帅",        "白富美"    ],    [        "蜘蛛侠",        "蝙蝠侠"    ],    [        "K歌之王",        "麦霸"    ],    [        "基友",        "好友"    ],    [        "葵花宝典",        "辟邪剑谱"    ],    [        "苍井空",        "松岛枫"    ],    [        "与世无争",        "看破红尘"    ],    [        "格格",        "公主"    ],    [        "唐伯虎",        "韦小宝"    ],    [        "美杜莎",        "美人鱼"    ],    [        "香奈儿",        "迪奥"    ],    [        "屠龙刀",        "倚天剑"    ],    [        "机器猫",        "加菲猫"    ],    [        "陈奕迅",        "张学友"    ],    [        "扑克牌",        "塔罗牌"    ],    [        "初吻",        "初恋"    ],    [        "蕾丝",        "黑丝"    ],    [        "美人痣",        "青春痘"    ],    [        "移花接木",        "斗转星移"    ],    [        "定滑轮",        "动滑轮"    ],    [        "食人族",        "食人鱼"    ],    [        "内衣",        "内裤"    ],    [        "同性恋",        "好兄弟"    ],    [        "卫生纸",        "卫生巾"    ],    [        "杜蕾斯",        "杰士邦"    ],    [        "情人",        "女朋友"    ],    [        "爱人",        "情人"    ],    [        "女孩",        "女人"    ],    [        "东方不败",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "前男友",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "豆浆",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "太监",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "吉他",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "淑女",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "捕快",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "同桌",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "情人节",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "小笼包",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "白富美",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "K歌之王",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "苍井空",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "初吻",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "蕾丝",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "定滑轮",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "东京热",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "卫生纸",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "杜蕾斯",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "情人",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "女人",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ]]
function xipai(){
	var len = x.length
    var index = Math.floor(Math.random() * len);
    if(index < len){
    	var g = x[index]
    	return g
	}else{
		return x[0]
	}
}
var express = require('express'); 
var app = express();
app.post("/xmpp_conn/getlist",function(req,res){
    var ids = req.query.ids
    console.log(req)
    /*var tids = ids.split('|')
	var keys = []
	var ii = 0
	for(var key of rooms.keys()){
		if(tids.contains(key)){
			ii++
			keys[ii] = key
		}
	}
    res.send(JSON.stringify(keys));
    console.log('msgadd');*/
});
app.listen('4524');
/*
var http = require("http");
http.createServer(function(request, response) {
	var keys = []
	var ii = 0
	for(var key of rooms.keys()){
		ii++
		keys[ii] = key
	}
	response.write(JSON.stringify(keys))	
    response.end();
}).listen(4524);
*/
function deleteroom(roomname){


}
