define(['jquery'],function($){
	function creatBanner(){
		var iptli=$('#iptli').css({
			'height': '27px',
			'width' : '160px',
			'position':'relative',
			'overflow':'hidden'
		});
		var imgBg=$('#iptli img').css({
			'position':'absolute',
			'top':'6px',
			'left':'135px'
		})
		var ipt=$('#ipt').css({
			'position':'absolute',
			'top':'5px',
			'left':'160px'
		});
		iptli.on('mouseenter',function(){
			ipt.animate({'left':'0px'},100);
			imgBg.attr('src','img/seach-bg.gif')
		}).on('mouseleave',function(){
			ipt.animate({'left':'160px'},100);
			imgBg.attr('src','img/logo-bg4.gif')
		})
		var flag = false;
		ipt.focus(function(){
			flag = true;
			var data = '';
			//键盘事件
			$(this).keydown(function(e){
				if (ipt.val() == '') {
					data ='';
				};
				//判断按下的键是否是0-9或a-z或退格键
				if ((e.keyCode <= 57 && e.keyCode >= 48) || (e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 8) {
					if (e.keyCode == 8) {
						data = data.substring(0 , data.length - 1);
					}else{
						data += e.key;//写入的数据,字符串拼接
					}
				}
					$.ajax({
						type:"get",
						url:"http://10.0.161.138:7000/ajax/" + data,
						async:true,
						success:handle
					});
					
					function handle(data){
						var arr=JSON.parse(data).data.list;
						arr.forEach(function(elem,index){
							
						})
						
				}
		});
	});
}
	return creatBanner;


});