define(['jquery','myutil','app/myfn'],function ($,xhr,url,id) {
	function createNav (id) {
		var x = xhr();
		x.open('get',url.getBaseUrl());
		x.send(null);
		x.onreadystatechange = function () {
			if (x.status == 200 || x.status == 304) {
				if (x.readyState == 4) {
					console.log('hhhhh');
					var data = JSON.parse(x.responseText);						
					console.log(data);
					var ul = $('<ul class="nav-list"></ul>');
					$(id).append(ul);
					data.forEach(function (elem, index) {
						$(ul).append($('<li class="nav-item"><a href="" class="content"></a></li>'));
						$('.content').html(elem.title);
						$('content').attr('href', elem.Url);
						$('.content').append('<img src="" />');
						$('img').attr('src', elem.ImgUrl);						
					});					
				}
			}			
		}
	}
	return 	createNav;	
});