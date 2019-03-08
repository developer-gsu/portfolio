
	
	$.fn.myCalendar = function(option){

		var O = $(this);

		var info;
		if (option.data) {
			$.ajax({
				url : option.data,
				async : false,
				success : function(data){
					info = data;
				}
			});
		}
		var date = new Date();
		var Y = date.getFullYear();
		var M = date.getMonth();
		var D = date.getDate();

		var nav = $('<nav></nav>');;
		var table = $('<table><thead><tr></tr></thead><tbody></tbody></table>');

		var schedule = {
			init : function () {

				if (!option.dayName) option.dayName = ["일", "월","화","수","목","금","토"];
				if (!option.monthName) option.monthName = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

				if(option.button||option.select){

					O.prepend(nav);

					var prev = $('<a href="#" class="btn prev">'+option.button[0]+'</a>');
					var next = $('<a href="#" class="btn next">'+option.button[1]+'</a>');
					var listYear = $('<ul class="list" style="display : none"></ul>');
					var selectYear = $('<div class="selectYear"><input type="text" class="selected"><i>년</i></div>').append(listYear);
					var listMonth = $('<ul class="list" style="display : none"></ul>');
					var selectMonth = $('<div class="selectMonth"><input type="text" class="selected" readonly="readonly"><i>월</i></div>').append(listMonth);
					var selectArea = $('<div class="selectArea"></div>').append(selectYear).append(selectMonth);

					option.monthName.forEach(function(v,i){
						listMonth.append('<li>'+v+'</li>');
					});

					var yearArray = Object.keys(info).sort();
					var totalYear = yearArray[yearArray.length-1] - yearArray[0] + 1;

					if (!option.yearName) option.yearName='';
					for(var i=0; i<totalYear; i++) {
						listYear.append('<li>'+(Number(yearArray[0])+i)+option.yearName+'</li>');
					}

					if (option.button) {

						nav.append(prev).append(next);

						nav.find('.btn').on('click', function(){
							var selectedYear = Y;
							var selectedMonth = M+1;
							var direction;
							$(this).hasClass('prev')?direction=-1:direction=1;
							M+=direction;

							if (M<0) {
								M=11;
								Y--;
							} else if (M>11){
								M=0;
								Y++;
							}
							schedule.update(Y,M,D);

							return false; 
						});
					};

					if (option.select) {
						
						option.button ? nav.find(prev).after(selectArea) : nav.append(selectArea);

						selectYear.find('.selected').on('click', function(){

							$(this).parent('div').toggleClass('clicked');
							selectMonth.find('.list').hide();
							selectYear.find('.list').stop().slideToggle(400);							
						});

						selectMonth.find('.selected').on('click', function(){							

							$(this).parent('div').toggleClass('clicked');
							selectYear.find('.list').hide();
							selectMonth.find('.list').stop().slideToggle(400);
						});

						O.find('.selected').on('blur', function(){

						});

						O.find('.selectYear li').on('click', function(){

							selectYear.find('.list').hide();
							selectYear.toggleClass('clicked')
							Y = $(this).text().replace(option.yearName, '');
							schedule.update(Y,M,D);
						});

						O.find('.selectMonth li').on('click', function(){

							selectMonth.find('.list').hide();
							selectMonth.toggleClass('clicked')
							M = $(this).index();
							schedule.update(Y,M,D);
						});


						selectYear.find('.selected').on('keyup', function(){

							if (event.key=='Enter') {

								Y = $(this).val().trim();

								$(this).blur();
								selectYear.find('.list').hide();

								schedule.update(Y,M,D);
							}
						});
					}
				}

				O.append(table);

				for (var i=0; i<7; i++){
					table.find('thead tr').append('<th>'+option.dayName[i]+'</th>');
				}

				schedule.update(Y,M,D);
			},
			update : function(Y,M,D){

				var today = new Date();
	            var todayY = today.getFullYear();
	            var todayM = today.getMonth();
	            var todayD = today.getDate();


				if (option.select) schedule.view(Y, M+1);

				table.find('td').remove();
				var firstDate = new Date(Y,M,1);
				var firstDay = firstDate.getDay();
				var lastDate = new Date(Y,M+1,0);
				lastDate = lastDate.getDate();

				var tdIndex = 0;
				var line = 5;
				if (firstDay+lastDate>35) line++;

				for (var w=0; w<line; w++){
					table.find('tbody').append('<tr></tr>');
					for (var d=0; d<7; d++) {

						var td;
						var today='';

                		if(todayY==Y&&todayM==M&&tdIndex-firstDay+1==todayD) today='today';


						if (tdIndex>=firstDay&&tdIndex<lastDate+firstDay) {
							
							td = $('<td class="'+today+'"><em class="dateNumber">'+(tdIndex-firstDay+1)+'</em></td>');

						} else {

							td = $('<td class="empty"></td>');
						}

						td.appendTo(table.find('tbody tr:nth-child('+(w+1)+')'));

						tdIndex++;
					}
				}
				if (option.data) {
					var totalTd = O.find('td').not('.empty');

					for (var i = 0; i < lastDate; i++) {

						var dayInfo = info[Y][M+1][i+1];// 정보 객체 //error!!!!!!!!!!!!!!!!!!
						if (!dayInfo) dayInfo={}

						var td = $(totalTd[i]);// td 객체

						schedule.info(td, dayInfo);
					}
				}

			},
			view : function(Y, M){

				nav.find('.selectYear .selected').val(Y);
				nav.find('.selectMonth .selected').val(M);
			},
			info : function(td, dayInfo){ // dayInfo를 이용하여 내용을 td에 삽입하시오.
				
				// 정보 객체 -> dayInfo
				// td 객체 -> td
				//ex) td.text(dayInfo.name);
				
				var VS = 'VS';

				if (!dayInfo.team1) VS='';

				td.append('<div class="verse"><div class="logo team1"></div><em>'+VS+'</em><div class="logo team2"></div></div>');
				td.find('.team1').text(dayInfo.team1);
				td.find('.team1').css({'background-image': 'url(../img/main/logo_'+dayInfo.team1+'.png)'});
				td.find('.team2').text(dayInfo.team2);
				td.find('.team2').css('background-image', 'url(../img/main/logo_'+dayInfo.team2+'.png)');

				var verse = ':';
				if(!dayInfo.score) verse = '';

				if(dayInfo.team1) td.append('<div class="score"><b></b>'+verse+'<b></b></div>')
				
				if (dayInfo.score) { //score데이터가 있다면...


						var scoreArr = dayInfo.score.split(':'); 
						td.find('.score b').eq(0).text(scoreArr[0]);
						td.find('.score b').eq(1).text(scoreArr[1]);
						(scoreArr[0]>scoreArr[1])? td.find('.score b').eq(0).addClass('win') : td.find('.score b').eq(1).addClass('win');

				} else if (dayInfo.score=='경기 취소') { //없다면...

					td.find('.score').text('경기 취소');
					td.find('.score').css({'font-size' : '19px', 'font-weight' : 500, 'line-height' : '22px', 'margin-top' : '8px'});
				
				} else if (!dayInfo.score){ //없다면...

					td.find('.score').text('경기 전');
					td.find('.score').css({'font-size' : '19px', 'font-weight' : 500, 'line-height' : '22px', 'margin-top' : '8px'});
				
				}

				td.append('<div class="loc"><div class="sta"></div><div class="time"></div></div>')

				td.find('.loc .sta').text(dayInfo.stadium);
				td.find('.loc .time').text(dayInfo.time);
			}
		} // myCalendar

		schedule.init();

	} // prototype