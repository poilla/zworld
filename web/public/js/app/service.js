var express=require('express');
var fs=require('fs');
var app=express();
var gData1=null;
var gData2=null;
var gData3=null;
var gData4=null;
var gData5=null;
fs.readFile('data/nav.json',function(err1,data1){
	if(err1){throw new Error('读取数据出错1');}
	gData1=data1;	
	fs.readFile('data/banner.json',function(err2,data2){
		if(err2){throw new Error('读取数据出错2');}
		gData2=data2;
		fs.readFile('data/freewalk.json',function(err3,data3){
			if(err3){throw new Error('读取数据出错3');}
			gData3=data3;
			fs.readFile('data/menu.json',function(err4,data4){
				if(err4){throw new Error('读取数据出错4');}
				gData4=data4;
				fs.readFile('data/citywalk/cityWalkList.json',function(err5,data5){
					if(err5){throw new Error('读取数据出错5');}
					gData5=data5;
					app.listen(7000);
					console.log('启动启动完毕！！！！！！');
				});
			});
		});
	});
});

app.all('/*',function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
})
app.get('/nav', (req, res)=>{
	//跨域访问express cross里的方法
	//设置响应文件类型的格式
	res.header('Content-Type', 'application/json');	
	res.send(gData1);//将读取来json文件类型进行返回给用户
});
app.get('/banner', (req, res)=>{
	//跨域访问express cross里的方法
	//设置响应文件类型的格式
	res.header('Content-Type', 'application/json');	
	res.send(gData2);//将读取来json文件类型进行返回给用户
});
app.get('/freewalk', (req, res)=>{
	//跨域访问express cross里的方法
	//设置响应文件类型的格式
	res.header('Content-Type', 'application/json');	
	res.send(gData3);//将读取来json文件类型进行返回给用户
});
app.get('/menu', (req, res)=>{
	//跨域访问express cross里的方法
	//设置响应文件类型的格式
	res.header('Content-Type', 'application/json');	
	res.send(gData4);//将读取来json文件类型进行返回给用户
});
app.get('/cityWalkList', (req, res)=>{
	//跨域访问express cross里的方法
	//设置响应文件类型的格式
	res.header('Content-Type', 'application/json');	
	res.send(gData5);//将读取来json文件类型进行返回给用户
});

var http = require('http');
//suggest组件
app.get('/ajax/:keyword' , function (req , res) {
	var url = req.params.keyword;
    // 查询本机ip
    // http://z.qyer.com/qcross/home/ajax?action=sitesearch&keyword=b&timer=1478686648677&_=1478678019964
    var sreq = http.request({
        host:     'z.qyer.com', // 目标主机
        path:     '/qcross/home/ajax?action=sitesearch&keyword='+url, // 目标路径
        method:   'get' // 请求方式
    }, function(sres){
        sres.pipe(res);
        sres.on('end', function(){
            console.log('done');
        });
    });
    if (/POST|PUT/i.test(req.method)) {
        req.pipe(sreq);
    } else {
        sreq.end();
    }
});

