var BaiduPush = require('baidupush');

var baiduPushClient = BaiduPush.buildBaseApi({apiKey: '95Yocjm2kCeoiTzfxGBMQIMG', 
	secretKey: '3jKNCAloagQ4pTURtKFlD7IGQkiPzN7h'});

    var queryBody = {}
    queryBody.push_type = 3;
    queryBody.messages = {title: "hello", description: "hello world from push msg"};
    queryBody.msg_keys = 'hello';
    queryBody.message_type = 1;

    baiduPushClient.pushMsg(queryBody, function (err, body) {
      console.log(body);
    })