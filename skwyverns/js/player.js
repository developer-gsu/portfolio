$(document).ready(function(){

	(function(){

		var info, team;

		var P = $('h3 b').text();
		
		var O = $('.'+P+' .contents ul li');
		$('.'+P+' .contents ul li').remove();
		
		var idx = 0; 

		$.ajax({
			url : '../data/player(1).json',
			async: false,
			success : function(data){

				info = data;
				team = info[P];
			},
			error : function(err){
				console.log('실패')
			}
		});

		$(window).scroll(function(){ //스크롤 했을 때 4명씩 로드되도록.

			var windowTop = $(window).scrollTop();
			var windowHeight = $(window).height();
			var wrapHeight = $('#wrap').innerHeight();

			if (windowTop+windowHeight>=wrapHeight-300) {
				
				
				for(var i=0; i<4; i++){
					idx++;
					
					if (!team[idx]) return false;

					O.find('.thumb').css('background-image', 'url('+team[idx].thumb+')');
					O.find('.thumb .backnumber').text(team[idx].backNumber);
					O.find('.role').text(team[idx].role);
					O.find('.name').text(team[idx].name);

					O.clone().appendTo('#players .contents ul');
					
				}
				$(window).scroll(); //처음 시작부터 버튼을 누를 것이 아니기 때문에 자동으로 스크롤해주게 넣어줘야 함.
			}
		}).scroll();

	})();

});