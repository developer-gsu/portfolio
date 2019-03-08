$(document).ready(function(){

 	//---------------------------MAIN PAGE-------------------------------
	(function() { // drop down 메뉴

		var menu = $('header nav .menu');
		menu.hover(function(){
			$(this).find('.pop').stop().slideDown(400);
		},function(){
			$(this).find('.pop').stop().slideUp(400);
		});
	})();
	

	(function(){ //next match(이미지 넘김)

		var match = $('#match .mat_cnt .next_cnt li');
		var idx = 0;

		$('.page_control i').click(function(){			
			if ($(this).index()==0) {
				idx--;
				if (idx<0) idx=2;
			} else {
				idx++;
				if (idx>2) idx=0;
			}
			$('.page_control em').text((idx+1)+'/3');
			match.hide().eq(idx).show();
		});
	})();

	(function(){ //store상품 슬라이드
		$('#store .autoplay').slick({ //store상품 슬라이드
			  slidesToShow: 4,
			  slidesToScroll: 1,
			  autoplay: true,
			  autoplaySpeed: 2000,
			  pauseOnFocus: false
		});
	})();

	(function(){ //협력사 슬라이드
		$('#sponsor .autoplay').slick({ 
			  accessibility : true,
			  slidesToShow: 9,
			  slidesToScroll: 1,
			  autoplay: true,
			  autoplaySpeed: 1000,			
			  pauseOnFocus: false
		});
	})();
//-------------------------------GLOBAL-------------------------------

	(function(){ //button

		$('.buttonWrap button').click(function(){
		
			$('.buttonWrap button').removeClass('selected');
			$(this).addClass('selected');

		})
	})();

	(function(){

		$('.navBar .now').click(function(){
			
			$('.subpop').slideToggle(300);
		})
	})();

//------------------------------PLAYERS------------------------------
	
	(function(){//player 로드하기

		var info, team;

		var O = $('.coach .contents ul li');
		$('.coach .contents ul li').remove();
		var idx = 0; 


		$.ajax({
			url : '../data/player.json',
			async: false,
			success : function(data){

				info = data;
				team = info[0];
			},
			error : function(err){
				console.log('실패')
			}
		});

		var button = $('#players .buttonWrap button');

		button.click(function(){ //버튼 클릭 했을 때, idx생성 

			$('.playersWrap li').remove(); //원래 있던 li다 지워주고 버튼 누르면 새로 li 생성.
			idx = 0;
			team = info[$(this).index()];


			$(window).scroll();

		}); 

		$(window).scroll(function(){ //스크롤 했을 때 4명씩 로드되도록.

			var windowTop = $(window).scrollTop();
			var windowHeight = $(window).height();
			var wrapHeight = $('#wrap').innerHeight();

			if (windowTop+windowHeight>=wrapHeight-300) {

				for(var i=0; i<4; i++){

					if (!team[idx]) return false;

					O.find('.thumb').css('background-image', 'url('+team[idx].thumb+')');
					O.find('.thumb .backnumber').text(team[idx].backNumber);
					O.find('.role').text(team[idx].role);
					O.find('.name').text(team[idx].name);

					O.clone().appendTo('#players .contents ul');
					idx++;
				}
				$(window).scroll(); //처음 시작부터 버튼을 누를 것이 아니기 때문에 자동으로 스크롤해주게 넣어줘야 함.
			}
		}).scroll();
	})();

	/*----------------------------------------SEATS---------------------------------------*/

	(function(){ //좌석 이름 hover했을 때, 이미지 바꾸기
		$('#seats .info_right li').hover(function(){
			var idx = $(this).index();
			$('#seats .info_left .hover').append('<img src="../img/seats/seat_'+(idx)+'.JPG">')
		}, function(){
			$('#seats .info_left .hover').text('');
		})
	})();

	(function(){ //나타나는 TOP 메뉴
		$(document).scroll(function(){

			if($(this).scrollTop()<$(window).height()){
				$('.top').removeClass('active');
			} else {
				$('.top').addClass('active');
			}

			var footer = $(document).height()-$('footer').outerHeight()-$(window).height()
			if ($(document).scrollTop()>footer+100) {
				$('.top .tit').css('color', '#fff')
			} else {
				$('.top .tit').css('color', '#000')
			}

		if($(this).scrollTop()>1000) {$('.top').css('color', '#fff')};
		}).scroll();

		$('.top').click(function(){
			var header = $('header').outerHeight(true);
			var subnav = $('h2').outerHeight(true);
			$('html, body').animate({scrollTop: header+subnav}, 500);
		})
	})();

	(function(){

		$('[href^="#seat_"').click(function(){
			
			var href = $(this).attr('href');
			var t = $(href).offset().top;
			$('html, body').stop().animate({scrollTop : t}, 500);
			return false;
		})
	})();
//-------------------------------TEAM RANK--------------------------------

 (function(){

	$('#team_rank label').click(function(){
	 	
	 	$(this).toggleClass('clicked')
	 	$(this).siblings('ul').slideToggle(400)
	})

	$('#team_rank ul li').click(function(){

		var T = $(this).text();

		$('#team_rank label').text(T).removeClass('clicked');
		$(this).parent().slideUp(400)
	})

 	
 })();

});

