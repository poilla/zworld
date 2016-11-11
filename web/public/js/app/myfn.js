//定义一个模块 简单的值对定义
define({
	baseUrl : 'http://localhost',
	port : '7000',
	getBaseUrl : function () {
		return this.baseUrl + ":" + this.port;
	}
});