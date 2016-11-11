requirejs(['./commons'], function () {
	requirejs(['jquery', 'app/suggest', 'app/citywalk-product'], function ($,createSuggest,getProduct) {
		createSuggest();
		//获取产品列表
		getProduct();
	});
});
