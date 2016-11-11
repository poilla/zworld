define(['jquery', 'app/myfn'], function ($, url) {
	function createFreeWalk (root1, root2) {
		function handler (data) {
			data.forEach(function (elem, index) {
				//创建一级导航栏
				var navItem = $('<li class="nav-item"></li>');
				var titleA = $('<a href="#"></a>').html(elem.title);
				var freeList = $('<ul class="ziyouxing-list"></ul>');
				navItem.append(titleA);
				//创建项目列表
				elem.data.forEach(function (elem1, index1) {
					if (index1 == 0) {
						var time = $('<p class="descript-subtitle"></p>').html(elem1.time);	
					}
					var freeItem = $('<li class="ziyouxing-item"></li>');
					var itemA = $('<a href="#"></a>');
					var picDiv = $('<div class="pic"></div>');
					var pic = $('<img />').attr('src', elem1.imgUrl);
					var ticketDiv = $('<div class="ticket"></div>');
					var airticket = $('<p class="airbear">' + '机+酒' + '</p>');
					var ticketPrice = $('<p class="ticketprice"></p>');
					var airPrice = $('<span class="airprice"></span>').html(elem1.price);
					var descriptDiv = $('<div class="descript"></div>');
					var descTitle = $('<h3 class="descript-title"></h3>').html(elem1.title);
					descriptDiv.append(descTitle).append(time);
					ticketPrice.append(airPrice).append('元起');
					ticketDiv.append(airticket).append(ticketPrice);
					picDiv.append(pic);
					itemA.append(picDiv).append(ticketDiv).append(descriptDiv);
					freeItem.append(itemA);
					freeList.append((freeItem));
				});
				$(root1).append(navItem);
				$(root2).append(freeList);	
			});
			//创建最后一个li
				var itemMore = $('<li class="ziyouxing-item-more ziyouxing-item"></li>');
				var moreA = $('<a href="#"></a>');
				var moreDiv = $('<div class="more-title"></div>');
				var p = $('<p>' + '查看更多' + '<br />' + '机酒自由行产品' + '</p>');
				var arrowDiv = $('<div class="arrow"><span class="icon-arrow"></span></div>');
				var moreListDiv = $('<div class="more-list"></li>');
				var pList = $('<p class="p-list"></p>');
				var a1 = $('<a href="#">' + '机票' + '</a>');
				var a2 = $('<a href="#">' + '酒店' + '</a>');
				var a3 = $('<a href="#">' + '机+酒' + '</a>');
				var a4 = $('<a href="#">' + '邮轮' + '</a>');
				var pBg = $('<p class="bg"></p>');
				pList.append(a1).append(pBg).append(a2).append(pBg.clone()).append(a3).append(pBg.clone()).append(a4);
				moreListDiv.append(pList);
				moreDiv.append(p);
				moreA.append(moreDiv).append(arrowDiv).append(moreListDiv);
				itemMore.append(moreA).append(moreListDiv);
				$('.ziyouxing-list').append(itemMore);
				
				//鼠标滑过事件
				/*$('.nav-item').hover( function () {
					$(this).toggleClass('active');
//					console.log($(this).children());
					var index = $(this).index();
					var that = $(this).parent().parent().siblings().children();
					that.hide();
					that.eq(index).fadeIn();
				}, function () {
					$(this).removeClass('active');
				});*/
				$('.title-nav .nav-item:eq(0)').addClass('active');
				$('.nav-item').on('mouseenter', function (ev) {
					var eventObj = ev || event;
					var index = $(this).index();
					var that = $(this).parent().parent().siblings().children();
					$('.nav-item').removeClass('active');
					$(this).addClass('active');
					that.hide();
					that.eq(index).fadeIn();	
				});
				
		}
		
		$.get(url.getBaseUrl() + '/zfreewalk', handler);
	}
	return createFreeWalk;
});