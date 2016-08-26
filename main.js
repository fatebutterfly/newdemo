/*
最长回文字符串
3
abababa
aaaabaa
acacdas
*/
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.prompt();
var theline = 0;
var tcount = 0;
var strarr = []
rl.on('line', (line) => {
  switch(line.trim()) {
    case 'hello':
      	console.log('world!');
      break;
     case 'close':
    	rl.close();
      break;
    default:
    	if(line.trim() != ''){
    		theline++;
    	}
      	
      	if(theline == 1){
      		tcount = parseInt(line.trim())
      	}
      	else{
      		strarr[strarr.length] = line

      		if(tcount == theline-1){
      			//console.log("over")
      			for(var xi = 0;xi<strarr.length;xi++){
      				var str = strarr[xi]
      				var s1 = "$#"
      				var vp = []
      				vp[0] = 0
      				vp[1] = 0
      				var res = 0
      				for(var i = 0;i<str.length;i++){
      					s1 += str[i]
      					s1 += "#"
      					vp[2*i+2] = 0
      					vp[2*i+3] = 0
      				}
      				for(var id = 0,i = 1;i < s1.length;++i){
      					if(vp[id]+id>i){
      						vp[i] = Math.min(vp[2*id-i],vp[id]+id-i)
      					}else{
      						vp[i] = 1
      					}
      					while(s1[i + vp[i]] == s1[i - vp[i]]){
      						++vp[i]
      					}
      					if(i + vp[i] > id + vp[id]){

      					}
      					res = Math.max(res,vp[i])
      				}
      				console.log(res - 1)
      			}
      		}
      	}
      break;
  }
  rl.prompt();
}).on('close', () => {
  process.exit(0);
});

