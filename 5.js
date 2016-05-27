//16
const readline = require('readline');
var p1 = new Map()
var p2 = new Map()
var xMax = 16
var arr = new Array()
var asturn = true
for(var j=0;j<xMax;j++){
	arr[j] = new Array()
	for (var i = 0; i < xMax; i++) {
		arr[j][i] = 0;
	}
}
//console readline

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

r1.on("line",function(line){
	if (line == "x"){
		console.log(arr)
	}
	if (line!="" && line.indexOf(",") > 0 )
	{
		var ali = line.split(',')
		if (ali.length > 1){
			var x0 = ali[0]
			var x1 = ali[1]
			var val = arr[x0][x1]
			var tkey = -1
			if(asturn){
				tkey = 1
			}
			if(val == 0){
				asturn = !asturn
				arr[x0][x1] = tkey
				shw(x0,x1,tkey)
			}else{
				console.log("ithas")
			}

		}
		//lz(ali)
	}
})

function sisi(){
	var pointarr = new Array()
	for(var i = 0;i < xMax;i++){
		arr[i] = new Array()
		for (var j = 0;j < xMax;j++){
			arr[i][j] = 0
		}
	}
	
	


}

var keysize = 0

function testsize(xyz){
	if(xyz==5||xyz==-5){
		return true
	}
	return false
}

function shw(x,y,tkey){
	 
	
	
	for(var j = 5;j >= 0;j--){
		var xyz = 0;

		var tminy = y - j;
		if (tminy<0){
			continue;
		}
		var tminx = x - j;
		if (tminx<0){
			continue;
		}
		var tmaxx = x + j;
		var tmaxy = y + j;



		//竖着
		for(var i = 0;i < 6;i++){
			var ty = tminy + i
			var val = arr[x][ty]
			xyz = xyz + val
		}
		if(testsize(xyz)){
			console.log("aaaaa")
			return
		}else{
			xyz = 0
		}
		//横着
		for(var i = 0;i < 6;i++){
			var tx = tminx + i
			var val = arr[tx][y]
			xyz = xyz + val
		}
		if(testsize(xyz)){
			console.log("aaaaa")
			return
		}else{
			xyz = 0
		}
		//正弦
		for(var i = 0;i < 6;i++){
			var ty = tminy + i
			var tx = tminx + i
			var val = arr[tx][ty]
			xyz = xyz + val
		}
		if(testsize(xyz)){
			console.log("aaaaa")
			return
		}else{
			xyz = 0
		}
		//
		for(var i = 0;i < 6;i++){
			var ty = tmaxy - i
			var tx = tminx + i
			var val = arr[tx][ty]
			xyz = xyz + val
		}
		if (testsize(xyz)){
			console.log("aaaaa")
			return
		}
		else{
			xyz = 0
		}
	}

	// for(var i = 0;i<5;i++){
	// 	var a = x+i;
	// 	var z = arr[a][y];
	// 	xyz = xyz + z
	// }

	// if (xyz== 5||xyz== -5){
	// 	console.log("")
	// }

	// xyz = 0;




	// var minx = x-1
	// var maxx = x+1
	// var miny = y-1
	// var maxy = y+1
	// for(var i = minx;i >= 0 && i <= maxx;i++){
	// 	for(var j = miny;j >= 0 && j <= maxy;j++){
	// 		if(i!=x&&j!=y){
	// 			var val = arr[i][j];
	// 			if(val == tkey){

	// 			}
	// 		}
	// 	}
	// }

	console.log(1111)
}

function lz(ali){
	if (ali.length > 1){
		var x0 = ali[0]
		var x1 = ali[1]
		if(p1.size == p2.size){

			var val0 = p1.get(x0)
			var val1 = p2.get(x0)
			if (val0 == x1 || val1 == x1){
				console.log("ithas")
			}else{
				p1.set(x0,x1)
				kz(p1,p2)	
			}
		}
		else{
			var val0 = p1.get(x0)
			var val1 = p2.get(x0)
			if (val0 == x1||val1 == x1){
				console.log("ithas")
			}else{
				p2.set(x0,x1)
				kz(p2,p1)	
			}
		}
	}
}

function kz(thep1,thep2){
	for (var key of thep1.keys()) {
		var value = thep1.get(key)
		var key0 = key - 1
		var key1 = key + 1
		var value0 = value - 1
		var value1 = value + 1
		for(var i = key0;i >=0 && i <= key1;i++){
			var val = thep1.get(i)

		}
		for(var i = value0;i >= 0 && i <= value1;i++){

		}

		console.log(key+"_"+value)
	}

}


