define(['jquery', 'app/myfn'], function ($, url) {
	
	function createSuggest () {
		$('.login .header-search').on('keyup', function (e) {
			$('.suggestcontainer').show(500);
		});
		//鼠标划过div时input文本框的显示状态
		$('.search-container').hover(function () {
			$('.header-btn').css('background','url(img/header-search.gif) no-repeat center');
			$('.header-search').animate({'width':'+200px'}, 500);
		}, function () {
			if (!$('.header-search').is(':focus')) {
				$('.header-search').animate({'width':'0'}, 500);
				$('.header-btn').css('background','url(img/header-search1.gif) no-repeat');
			}
		});
		$('.header-search').on('blur', function () {
			$('.suggestcontainer').hide(500);
			$('.header-search').animate({'width':'0'}, 500);
			$('.header-search').val('');
			$('.header-btn').css('background','url(img/header-search1.gif) no-repeat');
		});
		
		//suggest状态
		var flag = false;
		$('.header-search').focus(function () {
			flag = true;
			var data = '';
			var that = $(this);
			//键盘事件
			$(this).keydown(function (ev) {
				$('.suggestcontainer').html('');
				var eventObj = ev || event;
				if (that.val() == '') {
					data = '';
				}
				//判断按下的键是否是0-9或a-z或退格件
				if ((eventObj.keyCode <= 57 && eventObj.keyCode >= 48) || (eventObj.keyCode >= 65 && eventObj.keyCode <= 90) || eventObj.keyCode == 8) {
					if (eventObj.keyCode == 8) {
						data = data.substring(0, data.length - 1);
					} else {
						data += eventObj.key;//写入的数据，字符串拼接
					}
				}
				$.ajax({
					type:"get",
					url:"http://localhost:7000/ajax/" + data,
					async:true,
					success:handler
				});
				
				function handler (datas) {
					var arr = JSON.parse(datas).data.list;
					arr.forEach(function (elem, index) {
						var suggestList = $('<div class="suggest-list"></div>'); 
						$('.suggestcontainer').append(suggestList);	
						if (elem.type_name == 'word') {
							var sugA = $('<a href="' + elem.url + '"></a>').html(elem.word);
							suggestList.append(sugA);
						} else if (elem.type_name == 'item'){
							console.log(elem.en_name);
							var sugA1 = $('<a href="' + elem.url + '"></a>').css('height', '40px').css('line-height', '40px');
							var pic = $('<img />').attr('src', elem.src).css({
								width : '30px',
								height : '30px',
								float : 'left'
							});
							var p = $('<p></p>').css('margin', '0').css('width', '120px').css('padding', '0 10px').css('float', 'right').css('height', '16px');
							var p1 = p.clone();
							var cnName = $('<span class="cn_name"></span>').html(elem.cn_name);
							var enName = $('<span class="en_name"></span>').html(elem.en_name);
							var belongName = $('<span class="belong_name"></span>').html(elem.belong_name);
							p.append(cnName).append(enName);
							p1.append(belongName);
							sugA1.append(pic).append(p).append(p1);	
							suggestList.append(sugA1);
						}
						$('.suggest-list a').css({
							display : 'block',
							color : '#323232',
							fontStyle : 'normal',
							padding : '5px 10px 0 10px',
							width : '180px'
						}).hover(function () {
							$(this).css('background', 'darkseagreen');
						}, function () {
							$(this).css('background', '#fff');
						});
					});
				}
			});
			
		});
	};
	return createSuggest;
});