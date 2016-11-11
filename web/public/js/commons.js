//require.config();
//设置配置 
requirejs.config({
	baseUrl : 'js/lib',//管理模块加载的根路径
	paths : {//加载依赖
		'app' : '../app',//加载自己写的js
		'jquery' : 'jquery-3.1.1',//加载依赖
		'myutil' : '../app/myutil'
	},
	shim : {//对未用define的文件对外做一个声明
		'myutil' : {
			exports : 'createXHR'
		}
	}
});
