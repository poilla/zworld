define(['jquery', 'app/myfn'], function ($, url) {
	function createNav (root) {
		function handler (data) {
			data.forEach(function (elem, index) {
				var li = $('<li class="zpui-index-nav-item"></li>');
				var a = $('<a href=""></a>');
				a.attr({
					'href' : elem.Url,
					'target' : '_blank'
				});
				a.html(elem.title);
//				img.attr("src", elem.ImgUrl);
//				img.attr("src", elem.ImgUrl);
				a.append(img);
				li.append(a);
				$(root).append(li);
			});
			var img = $('<img src="img/wanletag.gif" / >');
			$('.zpui-index-nav-wrap .zpui-index-nav-item:eq(2) a').append(img);
		}
		$.get(url.getBaseUrl() + '/zindexnav', handler);
	}
	return createNav;
});
