define(['jquery', 'app/myfn'], function ($, url) {
	function getProduct () {
		function handler (data) {
			data.forEach(function (elem, index) {
				var products = $('.products');
				var proList = $('<div class="product-list"></div>');
				var proLink = $('<a href="#" class="pro-link"></a>');
				var pic = $('<img />').attr('src', elem.imgurl);
				var proDesc = $('<div class="product-desc"></div>');
				var proInfo = $('<div class="pro-info"></div>');
				var proPlace = $('<span class="pro-place">'+elem.address+'</span>')
				var browerinfo = $('<div class="browerinfo"></div>');
				var browernum = $('<span class="browernum num">'+elem.browseCount+'</span>');
				var buynum = $('<span class="buynum num">'+elem.soldCount+'</span>');
				var proTitle = $('<h2 class="pro-title"><a href="#">'+elem.title+'</a></h2>');
				var proInfoList = $('<div class="pro-infolist"></div>');
				elem.introduce.forEach(function (elem1, index1) {
					var proInfoItem = $('<div class="pro-infoitem"><span class="star"></span>'+elem1+'</div>');
					proInfoList.append(proInfoItem);
				});
				var proPrice = $('<div class="pro-price"></div>');
				var oldPrice = $('<span class="oldprice">'+elem.oldPrice+'元 </span> ');
				var newPrice = $('<span class="newprice">'+elem.newPrice+'</span> ');
				var timeBuy = $('<div class="timebuy"><a href="#" class="buy">立即订购</a></div>');
				
				proPrice.append(oldPrice).append(newPrice).append(' 元起');
				browerinfo.append(browernum).append('次浏览').append(buynum).append('件已售');
				proInfo.append(proPlace).append(browerinfo);
				proDesc.append(proInfo).append(proTitle).append(proInfoList).append(proPrice).append(timeBuy);
				proLink.append(pic);
				proList.append(proLink).append(proDesc);
				products.append(proList);
			});
		}
		$.get(url.getBaseUrl() + '/citywalk', handler);
	}
	return getProduct;
});