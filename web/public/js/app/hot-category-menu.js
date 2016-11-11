define(['jquery', 'app/myfn'], function ($, url) {
	function createHotMenu (root, root1) {
		function handler (data) {
			//遍历data
			data.forEach(function (elem, index) {
				//创建一级菜单
				var li = $('<li class="hot-category-item"></li>');
				var span = $('<span class="hot-icon"></span>').addClass('hot-category-icon' + (index + 1));
				var titleA = $('<a href="#" class="hot-category-title"></a>').html(elem.title);
				var p = $('<p class="hot-category-subtitle"></p>');
				if (index != 5) {
					var moreCityImg = $('<div class="morecityimg"></div>');
					var a = $('<a href="#"></a>');
					var img = $('<img />').attr('src', elem.moreCityImg);
					a.append(img);
				}
				elem.mainCity.forEach(function (elem1, index1) {
					var subTitle = $('<a href="#"></a>').html(elem1);
					p.append(subTitle);
				});
				var arrowSpan = $('<span class="hot-category-arrow"></span>');
				li.append(span).append(titleA).append(p).append(arrowSpan);
				var subDiv = $('<div class="hot-category-content"></div>');
				$(root).append(li);
				$(root1).append(subDiv);
				
				//创建二级菜单
				elem.moreCity.forEach(function (elem2, index2) {	
					var categoryDiv = $('<div class="category-place"></div>');
					var placeTitle = $('<h2 class="place-title"></h2>').html(elem2.cityName);
					var placeDiv = $('<div class="place-list"></div>');
					elem2.items.forEach(function (elem3, index3) {
						if (index == 5) {
							var imgA = $('<a href="#" class="img-category"></a>');
							var themeImg = $('<img />').attr('src', elem3).css('width', '80px').css('height', '80px');
							imgA.append(themeImg);
							placeDiv.append(imgA);
						} else {
							moreCityImg.append(a);
							var placeA = $('<a href="#" class="place-item"></a>').html(elem3);
							placeDiv.append(placeA);
						}
					});
					categoryDiv.append(placeTitle).append(placeDiv);
					subDiv.append(categoryDiv).append(moreCityImg);
				});
					
				/*//添加鼠标滑过一级菜单事件
				li.on({
					'mouseenter' : function () {
						li.addClass('active');
						$('.hot-category-contents').css('display', 'block');
						arrowSpan.css('background','url(img/jiantouyou.gif) no-repeat center')
					},
					'mouseleave' : function () {
						li.removeClass('active');
						$('.hot-category-contents').css('display', 'none');
						arrowSpan.css('background','url(img/hot-category-arrow.gif) no-repeat center')
					}
				});*/
			});
			//鼠标滑过事件
			$('.hot-category-list').children('.hot-category-item').hover(function () {//一级导航悬浮
				$(this).addClass('hover').siblings('.hot-category-item').removeClass('hover');
				var index = $(this).index();
				$('.hot-category-contents').children('.hot-category-content').hide();
				$('.hot-category-contents').children('.hot-category-content').eq(index).show();
			});
			$('.hot-category-list').hover(function () {//整个导航菜单悬浮，是否显示二级导航到出厂
				$('.hot-category-contents').show();
			},
			function () {
				$('.hot-category-contents').hide();
				$('.hot-category-item').removeClass('hover');	
			});
			
			$('.hot-category-contents').children('.hot-category-content').hover(function () {//二级导航悬浮
				var index = $(this).index();
				$('.hot-category-list').children('.hot-category-item').eq(index).addClass('hover');
				$('.hot-category-contents').show()	
			},
			function () {
				$('.hot-category-contents').hide();
				$('.hot-category-list').children('.hot-category-item').removeClass('hover');		
			});
		}
		$.get(url.getBaseUrl() + '/zmenu', handler);
	}
	return createHotMenu;
});