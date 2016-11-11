const express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');
var getIndexNavData = null;
var getMenuData = null;
var getBannerData = null;
var getFreeWalkData = null;
var getCityWalkData = null;

fs.readFile('data/headnav.json', function (err1, navData) {
	if (err1) {
		throw new Error('读取数据出错1');
	}
	getIndexNavData = navData;
	fs.readFile('data/index/menu.json', function (err2, menuData) {
		if (err2) {
			throw new Error('读取数据错误2');
		}
		getMenuData = menuData;
		fs.readFile('data/index/banner.json', function (err3, bannerData) {
			if (err3) {
				throw new Error('读取数据错误2');
			}
			getBannerData = bannerData;
			fs.readFile('data/index/freeWalk.json', function (err3, freeWalkData) {
				if (err3) {
					throw new Error('读取数据错误2');
				}
				getFreeWalkData = freeWalkData;
				fs.readFile('data/citywalk/cityWalkList.json', function (err4, cityWalkData) {
					if (err3) {
						throw new Error('读取数据错误2');
					}
					getCityWalkData = cityWalkData;
					app.listen(7000);
					console.log('服务已启动');
				});
			});
		});
	});

});
	
app.all('/*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});

app.get('/zindexnav', function (req, res) {
	res.header('Content-Type', 'application/json');
	res.send(getIndexNavData);
});
app.get('/zmenu', function (req, res) {
	res.header('Content-Type', 'application/json');
	res.send(getMenuData);
});
app.get('/zbanner', function (req, res) {
	res.header('Content-Type', 'application/json');
	res.send(getBannerData);
});
app.get('/zfreewalk', function (req, res) {
	res.header('Content-Type', 'application/json');
	res.send(getFreeWalkData);
});
app.get('/citywalk', function (req, res) {
	res.header('Content-Type', 'application/json');
	res.send(getCityWalkData);
});


//suggest组件
/*app.get('/sitesearch/:keyword', function (req, res) {
	//获取用户传递过来的关键词
	var url = req.params.keyword;
	console.log(url);
	//查询主机ip
	// http://z.qyer.com/qcross/home/ajax?action=sitesearch&keyword=b&timer=1478686648677&_=1478678019964
	var sreq = http.request({
		host: 'z.qyer.com', //目标主机
		path: 'qcross/home/ajax?action=sitesearch&keyword=' + url, //目标路径
		method: 'get' //请求方式
	}, function (sres) {
		sres.pipe(res);
		sres.on('end', function () {
			console.log('done');
		});
	});
	if (/POST|PUT/i.test(req.method)) {
		req.pipe(sreq);
	} else {
		sreq.end();
	}
});*/
app.get('/ajax/:keyword', function (req , res) {
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

