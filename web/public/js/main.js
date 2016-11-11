//注释部分为单一页面开发方式  模块化开发   AMD方法
//1、配置模块
//requirejs.config({
//	baseUrl:'js/lib',//定义基础目录
//	paths:{
//		'app':'../app',
//		'jquery':'jQuery-3.1.1',  //jquery是原文件定义已经定义好了好的。所以名字必须这个，jQuer已经定义了模块
//		'ajax':'../app/ajax'  //不加拓展名
//	},
//	//把未模块化的内容模块化
//	shim:{
//		'ajax':{
//			exports:'createXHR'
//		}
//	}
//});


//require.config();
//设置配置 
//requirejs.config({
//	baseUrl : 'js/lib',//管理模块加载的根路径
//	paths : {//加载依赖
//		'app' : '../app',//加载自己写的js
//		'jquery' : 'jquery-3.1.1',//加载依赖
//		'myutil' : '../app/myutil'
//	},
//	shim : {//对未用define的文件对外做一个声明
//		'myutil' : {
//			exports : 'createXHR'
//		}
//	}
//});

//定义模块
//define(['app/zw-header','app/zw-nav','app/zw-banner','app/zw-menu','app/zw-jj'],function(head,nav,bn,menu,jj){
//	head();
//	nav();
//	bn();
//	menu();
//	jj();
//})


//define(['jquery', 'app/myfn','app/index-nav','app/banner','app/hot-category-menu','app/freewalk','app/suggest'], function ($,url,createNav,meetingBanner,createHotMenu,createFreeWalk,createSuggest) {
//	createNav('.zpui-index-nav-wrap');
//	meetingBanner('.lbs-list', '.move-list');
//	createHotMenu('.hot-category-list', '.hot-category-contents');
//	createFreeWalk('.title-nav', '.ziyouxing-content');
//	createSuggest();
//});

//多页面开发，我定义的主页面模块，首先将共有部分引入，然后引入自己的私有模块 （利用CMD方式引入）
//我定义的模块
requirejs(['./commons'], function () {
	requirejs(['jquery', 'app/myfn','app/index-nav','app/banner','app/hot-category-menu','app/freewalk','app/suggest'], function ($,url,createNav,meetingBanner,createHotMenu,createFreeWalk,createSuggest) {
		//首页导航栏
		createNav('.zpui-index-nav-wrap');
		//轮播图
		meetingBanner('.lbs-list', '.move-list');
		//热门菜单
		createHotMenu('.hot-category-list', '.hot-category-contents');
		//机酒自由行
		createFreeWalk('.title-nav', '.ziyouxing-content');
		//suggest
		createSuggest();
	});
});


