console.log("xxxxx");
var GB2312UnicodeConverter = {
            ToUnicode: function (str) {
                return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
            }
            , ToGB2312: function (str) {
                return unescape(str.replace(/\\u/gi, '%u'));
            }
        };
 
        var str = '上海', unicode;
        console.log(str + '<br/>');
        unicode = GB2312UnicodeConverter.ToUnicode(str);
        console.log('汉字转换为Unicode代码：' + unicode + '<br/><br/>');
        console.log('Unicode代码转换为汉字：' + GB2312UnicodeConverter.ToGB2312(unicode));
        function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
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
//console.log(getPass(6))

var x = [    [        "浴缸",        "鱼缸"    ],    [        "电动车",        "摩托车"    ],    [        "眉毛",        "睫毛"    ],    [        "书",        "本"    ],    [        "筷子",        "竹签"    ],    [        "麻雀",        "乌鸦"    ],    [        "火车",        "轮船"    ],    [        "镜子",        "玻璃"    ],    [        "笤帚",        "拖把"    ],    [        "铅笔带",        "铅笔盒"    ],    [        "那英",        "王菲"    ],    [        "盗墓笔记",        "鬼吹灯"    ],    [        "散文",        "小说"    ],    [        "树枝",        "树干"    ],    [        "脸盆",        "水桶"    ],    [        "直尺",        "三角板"    ],    [        "吴昕",        "谢娜"    ],    [        "晨光",        "真彩"    ],    [        "蒙牛",        "伊利"    ],    [        "可口可乐",        "百事"    ],    [        "加多宝",        "王老吉"    ],    [        "门诊",        "急诊"    ],    [        "天天向上",        "快乐大本营"    ],    [        "电话",        "手机?"    ],    [        "粉丝",        "米线"    ],    [        "电影",        "电视剧"    ],    [        "爷爷",        "姥爷"    ],    [        "天山老妖",        "东方不败"    ],    [        "前男友",        "男朋友"    ],    [        "零花钱",        "生活费"    ],    [        "夜宵",        "烧烤"    ],    [        "手机",        "座机"    ],    [        "作文",        "论文"    ],    [        "古筝",        "吉他"    ],    [        "玫瑰",        "月季?"    ],    [        "董永",        "许仙?"    ],    [        "若曦",        "晴川?"    ],    [        "牛奶",        "豆浆"    ],    [        "保安",        "保镖?"    ],    [        "白菜",        "生菜?"    ],    [        "辣椒",        "芥末?"    ],    [        "金庸",        "古龙?"    ],    [        "赵敏",        "黄蓉?"    ],    [        "?水盆",        "水桶?"    ],    [        "唇膏",        "口红?"    ],    [        "烤肉",        "涮肉?"    ],    [        "气泡",        "水泡?"    ],    [        "纸巾",        "手帕"    ],    [        "杭州",        "苏州?"    ],    [        "香港",        "台湾?"    ],    [        "首尔",        "东京?"    ],    [        "橙子",        "橘子"    ],    [        "葡萄",        "提子"    ],    [        "太监",        "人妖"    ],    [        "?蝴蝶",        "蜜蜂?"    ],    [        "小品",        "话剧?"    ],    [        "裸婚",        "闪婚"    ],    [        "新年",        "跨年"    ],    [        "吉他",        "琵琶"    ],    [        "公交",        "地铁"    ],    [        "?剩女",        "御姐"    ],    [        "童话",        "神话"    ],    [        "作家",        "编剧"    ],    [        "警察",        "捕快"    ],    [        "结婚",        "订婚"    ],    [        "奖牌",        "金牌"    ],    [        "那英",        "韩红"    ],    [        "面包",        "蛋糕"    ],    [        "作文",        "论文"    ],    [        "油条",        "麻花"    ],    [        "壁纸",        "贴画"    ],    [        "枕头",        "抱枕"    ],    [        "同学",        "同桌"    ],    [        "魔术师",        "魔法师"    ],    [        "鸭舌帽",        "遮阳帽"    ],    [        "双胞胎",        "龙凤胎"    ],    [        "情人节",        "光棍节"    ],    [        "丑小鸭",        "灰姑娘"    ],    [        "富二代",        "高富帅"    ],    [        "生活费",        "零花钱"    ],    [        "麦克风",        "扩音器"    ],    [        "郭德纲",        "周立波"    ],    [        "图书馆",        "图书店"    ],    [        "洗衣粉",        "皂角粉"    ],    [        "泡泡糖",        "棒棒糖"    ],    [        "土豆粉",        "酸辣粉"    ],    [        "蜘蛛侠",        "蝙蝠侠"    ],    [        "口香糖",        "木糖醇"    ],    [        "酸菜鱼",        "水煮鱼"    ],    [        "小笼包",        "灌汤包"    ],    [        "薰衣草",        "满天星"    ],    [        "张韶涵",        "王心凌"    ],    [        "刘诗诗",        "刘亦菲"    ],    [        "甄嬛传",        "红楼梦"    ],    [        "甄子丹",        "李连杰"    ],    [        "包青天",        "狄仁杰"    ],    [        "果粒橙",        "鲜橙多"    ],    [        "沐浴露",        "沐浴盐"    ],    [        "洗发露",        "护发素"    ],    [        "自行车",        "电动车"    ],    [        "班主任",        "辅导员"    ],    [        "过山车",        "碰碰车"    ],    [        "铁观音",        "碧螺春"    ],    [        "十面埋伏",        "四面楚歌"    ],    [        "成吉思汗",        "努尔哈赤"    ],    [        "谢娜张杰",        "邓超孙俪"    ],    [        "福尔摩斯",        "工藤新一"    ],    [        "?贵妃醉酒",        "黛玉葬花"    ],    [        "流星花园",        "花样男子"    ],    [        "神雕侠侣",        "天龙八部"    ],    [        "天天向上",        "非诚勿扰"    ],    [        "勇往直前",        "全力以赴"    ],    [        "鱼香肉丝",        "四喜丸子"    ],    [        "麻婆豆腐",        "皮蛋豆腐"    ],    [        "语无伦次",        "词不达意"    ],    [        "鼠目寸光",        "井底之蛙"    ],    [        "近视眼镜",        "隐形眼镜"    ],    [        "降龙十八掌",        "九阴白骨爪"    ],    [        "红烧牛肉面",        "香辣牛肉面"    ],    [        "江南style",        "最炫民族风"    ],    [        "梁山伯与祝英台",        "罗密欧与朱丽叶。"    ],    [        "人参果",        "蟠桃"    ],    [        "口若悬河",        "画饼充饥"    ],    [        "金字塔",        "狮身人面像"    ],    [        "瀑布",        "冰川"    ],    [        "飞行员",        "宇航员"    ],    [        "王祖贤",        "林青霞"    ],    [        "诸葛亮",        "周瑜"    ],    [        "高富帅",        "白富美"    ],    [        "蜘蛛侠",        "蝙蝠侠"    ],    [        "K歌之王",        "麦霸"    ],    [        "基友",        "好友"    ],    [        "葵花宝典",        "辟邪剑谱"    ],    [        "苍井空",        "松岛枫"    ],    [        "与世无争",        "看破红尘"    ],    [        "格格",        "公主"    ],    [        "唐伯虎",        "韦小宝"    ],    [        "美杜莎",        "美人鱼"    ],    [        "香奈儿",        "迪奥"    ],    [        "屠龙刀",        "倚天剑"    ],    [        "机器猫",        "加菲猫"    ],    [        "陈奕迅",        "张学友"    ],    [        "扑克牌",        "塔罗牌"    ],    [        "初吻",        "初恋"    ],    [        "蕾丝",        "黑丝"    ],    [        "美人痣",        "青春痘"    ],    [        "移花接木",        "斗转星移"    ],    [        "定滑轮",        "动滑轮"    ],    [        "食人族",        "食人鱼"    ],    [        "内衣",        "内裤"    ],    [        "同性恋",        "好兄弟"    ],    [        "卫生纸",        "卫生巾"    ],    [        "杜蕾斯",        "杰士邦"    ],    [        "情人",        "女朋友"    ],    [        "爱人",        "情人"    ],    [        "女孩",        "女人"    ],    [        "东方不败",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "前男友",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "豆浆",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "太监",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "吉他",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "淑女",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "捕快",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "同桌",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "情人节",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "小笼包",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "白富美",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "K歌之王",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "苍井空",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "初吻",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "蕾丝",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "定滑轮",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "东京热",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "卫生纸",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "杜蕾斯",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "情人",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ],    [        "女人",        "恭喜，你是卧底。没有词汇，请注意其他玩家的发言，注意隐藏自己。"    ]]

function xsx(){
    var len = x.length
    var index = Math.floor(Math.random() * len);
    var g = x[index]
    return g
}
var xx = xsx()
console.log(xx[0]+ "|"+xx[1])

var http = require("http");
http.createServer(function(request, response) {
    //for(var key of rooms.keys()){
    console.log(request) 
    response.write("121")
    //}
    response.end();
}).listen(4524);
/*
var express = require('express'); 
var app = express(); 
app.get('/', function(req, res){
          res.send("1"); 
          console.log(req.query.key);
});
app.post("/msg/add",function(req,res){
    res.send("msgadd");
    console.log('msgadd');
});

app.listen('4524');*/
/*
var crypto = require('crypto');
var http = require('http');
http.createServer(function(request,response)
	{
		var content = 'password'
		var md5 = crypto.createHash('md5');
		md5.update(content);
		var d = md5.digest('hex'); 
		console.log("有人访问" + request.url + "token:"+d);
		response.end('hello world');
	}
	).listen(3456);
// HEAD
console.log("xxxxx");
// c433d833b575a395cc0feaa18be80bf784c9bf36
// update express
console.log('server start at 888');*/
/*
2015-12-31T10:27:14.963035Z 1 [Note] A temporary password is generated for root@localhost: clZlyfp;W3qY
*/