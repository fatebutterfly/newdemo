var mysql = require("mysql");
var connection = mysql.createConnection({
	host : "127.0.0.1",
	port : 3306,
	database : "beans",
	user : "justdoit",
	password : "Aa78479951",
});

connection.connect();

connection.query("select * from beans_user",function(err,rows,fields){
	if (err) throw err;
	console.log("the solution is : " + rows[0].nickname );
});
console.log("it runs to there");
connection.end();

var a[100][100];  
var d[100][100];  
var n;  
function dfs(i,j)  
{  
    if(d[i][j]>0)  
    return d[i][j];  
    return d[i][j]=a[i][j]+(i==n?0:max(dfs(i+1,j),dfs(i+1,j+1)));  
}  
function main()  
{  
    while(scanf("%d",&n)!=EOF)  
    {  
        for(int i=1;i<=n;i++)  
        {  
            for(int j=1;j<=i;j++)  
            scanf("%d",&a[i][j]);  
        }  
        memset(d,-1,sizeof(d));  
        printf("%d\n",dfs(1,1));  
    }  
    return 0;  
}


