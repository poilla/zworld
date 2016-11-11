define(['jquery', 'app/myfn'], function ($, url, root) {
	function meetingBanner (root, root2) {
		var width = parseInt($(root).css('width'));		
		function handler (data) {
			
			data.forEach(function (elem, index) {
				var li = $('<li class="lbs-item"></li>');
				li.toggleClass('lbs-item' + index);
				li.css('background-image','url(' + elem.imgUrl + ')' );
				var a = $('<a class="lbs-box"></a>');
				a.attr({
					'href': elem.href,
					'target' : '_blank'
				});
				li.append(a);
				$(root).append(li);				
				//创建moveicon
				var moveLi = $('<li class="move-item"></li>');
				$(root2).append(moveLi);
			});
			//轮播图&改变对应的icon颜色				
			function changeImg () {
				var left = parseInt($(root).css('left'));
				if (left <= - (width * 3 / 4) ) {
					left = 0;
					setStyle('.move-item');
				} else {
					left -= parseInt(width/4);
					setStyle('.move-item');
				}
				$(root).css('left', left + 'px');			
				//icon的状态封装
				function setStyle (ele) {
					$(ele).css('background-color','rgba(115,50,0,0.5)');
					$(ele + ':eq(' + (-left/( width/4)) + ')').css('background-color', '#ff7467');
				}	
			}		
			//点击左右切换按钮
				$('.icon-left').on('click', function () {
					var left = parseInt($(root).css('left'));
					clearInterval(timer);
					if (left < 0 ) {
						left += parseInt(width/4);
						$('.move-item').css('background-color','rgba(115,50,0,0.5)');
						$('.move-item' + ':eq(' + (-left/( width/4)) + ')').css('background-color', '#ff7467');
					} else {
						left = 0;
						$('.move-item').css('background-color','rgba(115,50,0,0.5)');
						$('.move-item' + ':eq(' + (-left/( width/4)) + ')').css('background-color', '#ff7467');
					}
					$(root).css('left', left + 'px');
					timer = setInterval(changeImg, 3000);
				});
				$('.icon-right').on('click', function () {
					var left = parseInt($(root).css('left'));
					clearInterval(timer);
					if (left > - (width * 3 / 4 ) ) {
						left -= parseInt(width/4);
						$('.move-item').css('background-color','rgba(115,50,0,0.5)');
						$('.move-item' + ':eq(' + (-left/( width/4)) + ')').css('background-color', '#ff7467');
					} else {
						left = - (width * 3 / 4 );
						$('.move-item').css('background-color','rgba(115,50,0,0.5)');
						$('.move-item' + ':eq(' + (-left/( width/4)) + ')').css('background-color', '#ff7467');
					}
					$(root).css('left', left + 'px');
					timer = setInterval(changeImg, 3000);
				});
			//鼠标滑过icon轮播图切换到相应图片
			$('.move-item').each(function (index, elem) {
				$(elem).on('mouseenter', function () {
					var left = parseInt($(root).css('left'));
					var width = parseInt($(root).css('width'));
					clearInterval(timer);
					left = - (width/4) * index;
					$('.move-item').css('background-color','rgba(115,50,0,0.5)');
					$('.move-item' + ':eq(' + (-left/( width/4)) + ')').css('background-color', '#ff7467');
					$(root).css('left', left + 'px');
				}).on('mouseleave', function () {
					timer = setInterval(changeImg, 3000);
				})
			});
			var timer = setInterval(changeImg, 3000);
			//轮播图获得焦点和失去焦点时的状态
			(function () {
				$('.lbs-box').on('mouseenter', function () {
					clearInterval(timer);
				}).on('mouseleave', function () {
					timer = setInterval(changeImg, 3000);
				});
			})();			
		}
		$.get(url.getBaseUrl() + '/zbanner', handler);
	}
	return meetingBanner;
});