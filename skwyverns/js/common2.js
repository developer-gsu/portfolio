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
	
	// (function(){//player 로드하기

	// 	var info, team;

	// 	var O = $('#players .contents ul li');
	// 	$('#players .contents ul li').remove();
	// 	var idx = 0; 


	// 	$.ajax({
	// 		url : '../data/player.json',
	// 		async: false,
	// 		success : function(data){

	// 			info = data;
	// 			team = info[0];
	// 		},
	// 		error : function(err){
	// 			console.log('실패')
	// 		}
	// 	});

	// 	var button = $('#players .buttonWrap button');

	// 	button.click(function(){

	// 		$('.playersWrap li').remove(); //원래 있던 li다 지워주고 버튼 누르면 새로 li 생성.
	// 		idx = 0;
	// 		team = info[$(this).index()];


	// 		$(window).scroll();

	// 	});

	// 	$(window).scroll(function(){ //스크롤 했을 때 4명씩 로드되도록.

	// 		var windowTop = $(window).scrollTop();
	// 		var windowHeight = $(window).height();
	// 		var wrapHeight = $('#wrap').innerHeight();

	// 		if (windowTop+windowHeight>=wrapHeight-300) {

	// 			for(var i=0; i<4; i++){

	// 				if (!team[idx]) return false;

	// 				O.find('.thumb').css('background-image', 'url('+team[idx].thumb+')');
	// 				O.find('.thumb .backnumber').text(team[idx].backNumber);
	// 				O.find('.role').text(team[idx].role);
	// 				O.find('.name').text(team[idx].name);

	// 				O.clone().appendTo('#players .contents ul');
	// 				idx++;
	// 			}
	// 			$(window).scroll(); //처음 시작부터 버튼을 누를 것이 아니기 때문에 자동으로 스크롤해주게 넣어줘야 함.
	// 		}
	// 	}).scroll();
	// })();

	/*---------------------------------------SCHEDULE----------------------------------------------*/

	(function(){ //년, 월 눌렀을 때, list 나오도록...

		var year = $('#schedule .year');
		var month = $('#schedule .month');

		$(year).find('.year_info').click(function(){
			$(this).toggleClass('clicked');
			$(year).find('.year_list').slideToggle(500);
			$('.year_list').find('li').click(function(){
				$('.year_info').removeClass('clicked');
				$('.year_list').slideUp(500);
			});
		})		

		$(month).find('label').click(function(){
			$(this).toggleClass('clicked');
			$(month).find('.month_list').slideToggle(500);
			$('.month_list').find('label').click(function(){
				$('.month_info').removeClass('clicked');
				$('.month_list').slideUp(500);
			})
		})
	})();

	
	(function(){ //숫자 눌렀을 때 년, 월 숫자 바뀌기

		var schedule; 
		$.ajax({ //경기 일정 데이터 소환.
			url : '../data/schedule.json',
			async: false,
			success : function(data){

				schedule = data;
			}
		});

		var idx;
		var today = new Date(); //오늘 날짜
		var Y = today.getFullYear(); //오늘 날짜의 년도
		var M = today.getMonth(); //오늘 날짜의 달
		var D = today.getDate(); //오늘 날짜의 일 

		var year = $('#schedule .year');
		var month = $('#schedule .month');
		var Y_li = year.find('li')
		var M_li = month.find('li')
		var arrow = $('#schedule .month_arrow')
		var next = arrow.find('.next')
		var prev = arrow.find('.prev')
		var table = $('.scheduleWrap table');
		var td = table.find('td');


		year.find('.year_info').prepend('<span>'+Y+'</span>') //label에 오늘 날짜 년도 입력.
		month.find('.month_info').prepend('<span>'+(M+1)+'</span>')

		for (var i = 0; i<5; i++) { //현재 년도 부터 5년 리스트에 넣기
			Y_li.eq(i).find('label').text(Y-i)
		}

		for (var m = 0; m<12; m++) { //12달 리스트에 넣기
			var M_li = month.find('li');
			M_li.eq(m).find('label').text(m+1)
		}
		

		var Now_Month = $('.month_info span').text()*1;
		var Now_Year = $('.year_info span').text()*1;

		var tdContent = $(td.eq(0).html()); //2) td에 들어갈 데이터를 html로 추출해 옴.
		td.eq(0).html(''); //추출해온 데이터를 없애고 빈 문자열로 변환.

		var cal_content = function (N_y, N_m){ //매개변수로 현재 년, 월 지정해줌

			firstDate = new Date(N_y,N_m-1,1); //현재 달의 첫번째 날(년, 월, 일) (2019,0,1)
			lastDate = new Date(N_y,N_m,0); //현재 달의 마지막 날 (년, 월, 일) (2019,0,31)
			//그냥 M이면 전달의 마지막 날! 
			lastDate = lastDate.getDate(); // 31
			firstDay = firstDate.getDay(); //2(화요일)
			var d = 0;

			td.text(''); //처음 시작할 때 td안에 있던 텍스트 모두 지우고 시작!

			for(var i=firstDay; i<lastDate+firstDay; i++){
				//3)  var i = 2 ; i< 31+2 ; i++
				if (d+1>9) {
					td.eq(i).append('<span class="date">'+(d+1)+'</span><i></i>'); //i번째 td에 날짜 입력
				} else {
					td.eq(i).append('<span class="date">0'+(d+1)+'</span><i></i>'); //i번째 td에 날짜 입력
				}

				if(N_y==Y&&N_m==M+1) td.eq(D+1).find('span').addClass('today')

				var playInfo = schedule[N_y][N_m][d+1];
				//4) playInfo는 schedule에 있는 Y년 객체의 M*1+1(숫자로 바꿔줌)월에 d+1일의 json데이터

				if (playInfo) { //5) 만약 json데이터에 해당하는 날짜의 객체가 있다면...

					tdContent.find('.team1').text(playInfo.team1); //팀 이름 바꿔주고
					tdContent.find('.team1').css('background-image', 'url(../img/main/logo_'+playInfo.team1+'.png');
					tdContent.find('.team2').text(playInfo.team2);
					tdContent.find('.team2').css('background-image', 'url(../img/main/logo_'+playInfo.team2+'.png');

					if (playInfo.score) { //score데이터가 있다면...
						var scoreArr = playInfo.score.split(':'); 
						tdContent.find('.score b').eq(0).text(scoreArr[0]);
						tdContent.find('.score b').eq(1).text(scoreArr[1]);
						(scoreArr[0]>scoreArr[1])? tdContent.find('.score b').eq(0).addClass('win') : tdContent.find('.score b').eq(1).addClass('win');
					} else if (playInfo.score=='경기 취소') { //없다면...
						tdContent.find('.score').text('경기 취소');
						tdContent.find('.score').css({'font-size' : '19px', 'font-weight' : 500, 'line-height' : '22px', 'margin-top' : '8px'});
					} else { //없다면...
						tdContent.find('.score').text('경기 전');
						tdContent.find('.score').css({'font-size' : '19px', 'font-weight' : 500, 'line-height' : '22px', 'margin-top' : '8px'});
					}

					tdContent.find('.loc .sta').text(playInfo.stadium);
					tdContent.find('.loc .time').text(playInfo.time);

					td.eq(i).append(tdContent.clone()); // 4) i가 시작되는 td부터 tdContent의 복제본을 하나씩 넣어줌.
					// i<lastDate로 해놓으면 firstDay만큼 누락! 그렇기에 i<lastDate+fisrtDay로 설정.
				} //if문 끝

				d++;
			}//for문 끝
		}// function cal_content 끝

		cal_content(Y, M+1); //처음 로딩할 때, 현재 년, 월로 설정

		Y_li.click(function(){ //리스트에 있는 년도 눌렀을 때, 값 바뀌기
			var idx = $(this).index();
			year.find('span').text(Y-idx);
			var Now_Month = $('.month_info span').text()*1;			

			cal_content(Y-idx, Now_Month);
		});

		M_li.click(function(){ //리스트에 있는 달 눌렀을 때, 값 바뀌기
			
			idx = $(this).index();
			month.find('span').text(idx+1);

			var m_li = idx+1

			var Now_Year = $('.year_info span').text()*1;

			cal_content(Now_Year, m_li)
		});

		next.click (function(){

			var Now_Month = $('.month_info span').text()*1;
			var Now_Year = $('.year_info span').text()*1;

			if(Now_Year<Y){

				if(Now_Month<12){
					Now_Month+=1
					month.find('span').text(Now_Month);
					

				} else if (Now_Month==12) {

					month.find('span').text('1');
					Now_Year+=1
					year.find('span').text(Now_Year);

				}
			} else if (Now_Year==Y) {

				if(Now_Month<12){

					Now_Month+=1
					month.find('span').text(Now_Month);

				} else if (Now_Month==12) {
					
					alert('준비중 입니다.')

				}
			}; //else if...

			cal_content(Now_Year, Now_Month);

		}); //next.click function

		prev.click (function(){

			var Now_Month = $('.month_info span').text()*1;
			var Now_Year = $('.year_info span').text()*1;
			
			if(Now_Year>Y-4) {

				if(Now_Month>1) {

					Now_Month-=1;
					month.find('span').text(Now_Month);

				} else {

					month.find('span').text('12');
					Now_Year-=1;
			 		year.find('span').text(Now_Year);
				}
			} else if (Now_Year==Y-4) {

				if(Now_Month>1) {

					Now_Month-=1;
					month.find('span').text(Now_Month);

				} else if(Now_Month==1) {

					alert('이전 기록이 없습니다.');

				}
			}
			
			cal_content(Now_Year, Now_Month);
		});	
	})();


});

// ------------------선생님이 짜주셨던 코드


	var today = new Date();//1) 오늘 날짜 소환
	var Y = today.getFullYear(); // 년
	var M = today.getMonth(); // 월
	var D = today.getDate(); //일

	(function(){ //년, 월 눌렀을 때, list 나오도록...	

		var year = $('#schedule .year');
		var month = $('#schedule .month');

		year.add(month).click(function () {

			if (year.add(month).find('[class*=_list]').is(':animated')) return false;

			year.add(month).find('[class*=_list]').stop().slideUp(500);
			$(this).find('[class*=_list]').stop().slideToggle(500);
		});

		year.add(month).find('[class*=_list] label').click(function () {

			$(event.path[3]).hasClass('year') ? Y = $(this).text() : M = $(this).text();

			playSchedule.update(Y,M,D);
		});

	})();

	var playSchedule = {
		view : function (Y,M) {

			$('.year_info').text(Y);
			$('.month_info').text(M+1);
		},
		update : function (Y, M, D){ //경기 일정에 content 넣기

			$('td').find('*').remove();
			var schedule;
			$.ajax({ //경기 일정 데이터 소환.
				url : '../data/schedule.json',
				async: false,
				success : function(data){

					schedule = data;
				}
			});

			// console.log(schedule) // 2018: {…}, 2019: {…}} 객체 형태

			var table = $('.scheduleWrap table');
			var td = table.find('tbody td');

			var tdContent = $('<div class="detail"><div class="verse"><div class="logo team1"></div><em>VS</em><div class="logo team2"></div></div><div class="score"><b></b><span>:</span><b></b></div><div class="loc"><span class="sta"></span><br><span class="time"></span></div></div>'); //2) td에 들어갈 데이터를 html로 추출해 옴.

			var firstDate = new Date(Y,M,1); //현재 달의 첫번째 날(년, 월, 일) (2019,0,1)
			var lastDate = new Date(Y,M+1,0); //현재 달의 마지막 날 (년, 월, 일) (2019,0,31)
			//그냥 M이면 전달의 마지막 날! 
			lastDate = lastDate.getDate(); // 31
			var firstDay = firstDate.getDay(); //2(화요일)
			var idx = 0;


			for(var i=firstDay; i<lastDate+firstDay; i++){
				//3)  var i = 2 ; i< 31+2 ; i++
				if (idx+1>9) {
					td.eq(i).append('<span class="date">'+(idx+1)+'</span><i></i>'); //i번째 td에 날짜 입력
				} else {
					td.eq(i).append('<span class="date">0'+(idx+1)+'</span><i></i>'); //i번째 td에 날짜 입력
				}
				td.eq(D+1).find('span').addClass('today');
				//4) playInfo는 schedule에 있는 Y년 객체의 M*1+1(숫자로 바꿔줌)월에 idx+1일의 json데이터


				var playInfo = schedule[Y][M*1+1][idx+1];
				
				if (playInfo) { //5) 만약 json데이터에 해당하는 날짜의 객체가 있다면...

					tdContent.find('.team1').text(playInfo.team1); //팀 이름 바꿔주고
					tdContent.find('.team1').css('background-image', 'url(../img/main/logo_'+playInfo.team1+'.png');
					tdContent.find('.team2').text(playInfo.team2);
					tdContent.find('.team2').css('background-image', 'url(../img/main/logo_'+playInfo.team2+'.png');

					if (playInfo.score) { //score데이터가 있다면...
						var scoreArr = playInfo.score.split(':'); 
						tdContent.find('.score b').eq(0).removeClass('win').text(scoreArr[0]);
						tdContent.find('.score b').eq(1).removeClass('win').text(scoreArr[1]);

						(scoreArr[0]>scoreArr[1])? tdContent.find('.score b').eq(0).addClass('win') : tdContent.find('.score b').eq(1).addClass('win');


					} else if (playInfo.score=='경기 취소') { //없다면...
						tdContent.find('.score').text('경기 취소');
						tdContent.find('.score').css({'font-size' : '22px', 'font-weight' : 500, 'line-height' : '22px', 'margin-top' : '8px'});
					} else { //없다면...
						tdContent.find('.score').text('경기 전');
						tdContent.find('.score').css({'font-size' : '22px', 'font-weight' : 500, 'line-height' : '22px', 'margin-top' : '8px'});
					}

					tdContent.find('.loc .sta').text(playInfo.stadium);
					tdContent.find('.loc .time').text(playInfo.time);

					td.eq(i).append(tdContent.clone()); // 4) i가 시작되는 td부터 tdContent의 복제본을 하나씩 넣어줌.
					// i<lastDate로 해놓으면 firstDay만큼 누락! 그렇기에 i<lastDate+fisrtDay로 설정.
				}

				i>=35 ? $('.spareTr').show() : $('.spareTr').hide(); // 추가 <tr>...

				idx++;
			}


			playSchedule.view(Y,M);

		},
		button : function (direction){
			
			var Y = $('.year_info').text()*1;
			var M = $('.month_info').text()-1;

			M+=direction;


			if (M<0) {
				M=11;
				Y--;
			} else if (M>11) {
				M=0;
				Y++;
			}			

			playSchedule.update(Y, M, D);
		},
		select : function (){

			playSchedule.update(Y, M, D);
		}
	}

	playSchedule.update(Y, M, D);

	$('.month_arrow button').click(function () {
		var direction;
		$(this).hasClass('prev') ? direction=-1 : direction=1;
		playSchedule.button(direction);
	});
