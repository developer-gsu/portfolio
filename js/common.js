$(document).ready(function(){

	//-------------------------PARALLAX SCROLLING-------------------------

		$.fn.extend({ // step.2) 제이쿼리에 메소드를 추가(복수의 매소드를 추가할때 사용)
			myScroll : function(option){ // myScroll이라는 제이쿼리 메소드를 추가
				var O = $(this);
				var page; // 현재 보고있는 페이지를 나타내는 변수
				var scroll = { // myScroll에 관련된 메소드들이 모여있는 객체...
					init : function(){ // 기본세팅 메소드

						// step.3) 섹션의 높이 세팅
						$(window).on('resize', function(){ // window가 리사이즈 될때마다...

							O.each(function(i){ // section의 갯수만큼 반복

								var H;

								if (option.height) { // option.height가 존재한다면...
									if ($.isArray(option.height)) {
										if (option.height[i]=='auto') { // 배열인자의 값이 'auto'라면 
											H = $(window).height(); // 브라우저 높이로 지정
										} else { // 숫자라면
											H = option.height[i]; // 숫자로 높이 지정
										}
										
									} else {
										H = option.height;
									}
								} else { // option.height가 없거나 false라면...
									H = $(window).height(); // window의 높이를 리턴
								}

								if(option.minHeight&&H<option.minHeight) H=option.minHeight; // 섹션의 최소 높이를 지정

								if ($(window).width()>option.minWidth) {
									$(this).height(H);
								} else {
									if ($(this).attr('style')) $(this).attr('style', $(this).attr('style').replace(/height: .+px;/, ''));
								}

								O.first().add(O.last()).height($(window).height());
								
							});
						}).resize();

						// step.4) 스크롤이 되면 현재 페이지를 보여줘야한다.
						$(document).on('scroll', function(){ // 문서가 스크롤 되면

							var baseline = $(window).scrollTop() + $(window).height()/2; // 베이스라인 설정

							O.each(function(i){ // 각 섹션만큼 반복

								var H = $(this).offset().top; // 각 섹션의 위치값
								if (baseline>H) page = i; // 베이스라인보다 위로 올라가는 순간 그 섹션이 몇번째 섹션인지 리턴
							});

							O.removeClass('active').eq(page).addClass('active'); // 현재 보이는 페이지에 active를 준다.
							$('#container nav a').removeClass('active').eq(page).addClass('active'); // 현재 보이는 페이지에 active를 준다.

							scroll.nav(page); // nav메소드 실행 - page : 현재 보이는 페이지
						}).scroll();

						// step.5) 마우스 휠 이벤트
						$('html, body').on('mousewheel DOMMouseScroll', function(e){ // 문서내에서 휠이 동작했을때...
							
							var delta; // 휠의 방향을 담을 변수

							if (e.originalEvent.wheelDelta) {
								e.originalEvent.wheelDelta<0?delta=1:delta=-1;
							} else { // firefox처리
								e.originalEvent.detail<0?delta=-1:delta=1;
							}

							if($('#modal').is(':visible')) {

								var t = $('.pop').scrollTop();

								$('.pop').scrollTop(t+=100*delta);

								return false;
							} else {

								//if (option.minWidth>=$(window).width()) return false;
								if($(this).is(":animated")) return false; // 화면이 움직이는 도중에는 중지

								var winHeight = $(window).height();
								 // 휠방향에 따라 1/-1을 리턴

								if (winHeight>option.minHeight) { // window가 최소사이즈보다 크다면...

									if ((page==0&&delta==-1)||(page==O.length-1&&delta==1)) return false; // 1페이지보다 위로 혹은 끝페이지보다 밑으로 가고자 할때 중지시켜준다.

									scroll.action(page+=delta); // 스크롤액션을 실행
									return false; // wheel의 기본기능을 막아준다.
								}
							}

							
						});

						// step.6) 네비생성
						var nav = $('<nav style="position: fixed; right: 0; bottom: 0;"></nav>');
						O.last().after(nav); // 마지막 section의 뒤에 nav를 삽입.
						O.each(function(i){ // 섹션의 갯수만큼 반복
							var v;
							option.nav ? v = option.nav[i] : v = ''; // 네비배열이 있으면 텍스트, 없으면 빈값
							nav.append('<i>'+v+'</i>'); //nav안에 i태그 삽입
						});
						nav.find('i').on('click', function(){ // i를 클릭하면...

							if($('html, body').is(":animated")) return false; // 화면이 움직이는 도중에는 중지
							var idx = $(this).index();
							scroll.action(idx); // 클릭한 페이지로 action메소드 실행
						});				
						scroll.nav(page); //현재페이지를 표시한다.
					},
					action : function(to){ // 동작 메소드
						
						var T = O.eq(to).offset().top;

						$('html, body').animate({scrollTop : T}, option.speed, option.ease);
					},
					nav : function(page){
						$('nav i').removeClass('active').eq(page).addClass('active');
					}
				} // scroll객체

				scroll.init();
			} // prototype (myScroll)
		}); // extend

				$('section').myScroll({
					// height : 'auto', // 각 섹션의 높이값을 배열, 또는 숫자 전달
					minWidth : 768,
					minHeight : 790,// 섹션의 최소 높이
					ease : 'easeOutQuad',
					speed : 500
				});

	// ---------------------------SCROLL MOVE-----------------------------


		$('nav a').click(function(){

			var href = $(this).attr('href');
			var t = $(href).offset().top;
			$('html, body').stop().animate({scrollTop : t}, 500);
			return false;

		});

	// ---------------------------HAMBURGER-------------------------------
		
		$(".hamburger").click(function(){
			$(this).toggleClass("is-active");
			$('.hmNav').toggleClass('is-open');

			$('.hmNav a').click(function(){
				$('.hamburger').removeClass('is-active');
				$('.hmNav').removeClass('is-open');
			});
		});

		(function(){
			$(window).scroll(function(){
				var idx = $('section.active').index();
				switch(idx) {
					case 1 :
						$('.hamburger span').css('background-color', '#f4e3b7');
						break;
					case 2 :
						$('.hamburger span').css('background-color', '#003747');
						break;
					case 3 :
						$('.hamburger span').css('background-color', '#854565');
						break;
					case 4 :
						$('.hamburger span').css('background-color', '#ec6d7f');
						break;
					case 5 :
						$('.hamburger span').css('background-color', '#79b2cd');
						break;
				}
			}).scroll();
		})();

	// -------------------------- VISUAL TEXT ----------------------------


	 consoleText(['Web Publisher', 'Front-End'], 'text',['#fff','#fff']);

		function consoleText(words, id, colors) {

			if (colors === undefined) colors = ['#fff'];

			var visible = true;
			var con = document.getElementById('console');
			var letterCount = 1;
			var x = 1;
			var waiting = false;
			var target = document.getElementById(id)
			target.setAttribute('style', 'color:' + colors[0])

			window.setInterval(function() {

				if (letterCount === 0 && waiting === false) {

					waiting = true;

					target.innerHTML = words[0].substring(0, letterCount)

					window.setTimeout(function() {

						var usedColor = colors.shift();
						colors.push(usedColor);

						var usedWord = words.shift();
						words.push(usedWord);

						x = 1;

						target.setAttribute('style', 'color:' + colors[0])
						letterCount += x;

						waiting = false;

					}, 1000)

				} else if (letterCount === words[0].length + 1 && waiting === false) {
				
					waiting = true;
				  
					window.setTimeout(function() {		        
						x = -1;
						letterCount += x;
						waiting = false;
					}, 1000)
				
				} else if (waiting === false) {

					target.innerHTML = words[0].substring(0, letterCount)
					letterCount += x;

				}

			  }, 120)

			  window.setInterval(function() {

				if (visible === true) {
					
					con.className = 'console-underscore hidden'
					visible = false;

				} else {

				  con.className = 'console-underscore'
				  visible = true;

				}

			}, 400)

		}

	// ------------------------PORFOLIO OWL SLIDE ------------------------

		$('.owl-carousel').owlCarousel({
			loop: true,
			margin: 55,
			nav: true,
			navSpeed: 600,
			dots: true,
			autoplay: true,
			autoplaySpeed: 500,
			autoplayTimeout: 3000,
			autoplayHoverPause: true,
			responsive:{
				0:{
					items:1
				},
				481:{
					items:1
				},
				769:{
					items:3
				}
			}
		});

	//--------------------------PORTFOLIO VIEW----------------------------

		(function(){

			var list = $('#portfolio .item')
			var port = $('#portfolio .viewFrm .portWrap');

			$(list).on('click', function(){				
				
				var portHtml = $(this).find('.portWrap').html();
				port.text('').html(portHtml);

				addClick();

			})

		})();//portfolio view

	//----------------------------LINE BAR--------------------------------

		$.fn.lineBar = function(option){

			var O = $(this);
			var state;

			var bar = {
				init : function(){				

					O.find('.bar').each(function(i){
						$(this).append('<em style="float: left; height: 100%; background-color : '+option.barColor[i]+'"></em>');
					})

					$(document).scroll(function(){

						var baseline = $(window).scrollTop()+$(window).height();

						if(O.offset().top<baseline){
							bar.action();
						}
					}).scroll();

				},
				action : function(){

					if (state) return false;

					var I = 0;			

					function increase (){

						if (I>=100) return false;
						state = true;
						O.find('.barList').each(function(i){
							if ($(this).find('.text').text()*1<option.percent[i]) {
								$(this).find('.text').text(I);
								$(this).find('.bar em').css('width', I+'%');
							}						
						});
						I++;
						setTimeout(increase, 10/option.speed);
					}
					increase();
				}
			}
			bar.init();
		}

		$('#lineBar').lineBar({
			speed : 0.7,
			barColor : ['#faeeba','#ffe577','#fec051','#ff8866','#fd6051','#392033'],
			percent : [90, 85, 70, 75, 60, 50]
		});

	//---------------------------------MODAL-------------------------------------

		function addClick(){
			$('.buttonWrap .dt').click(function(){

					var O = $(this).parents('.info')

					var tit = O.find('.title').html();
					var desc = O.find('.detail').html();
					var color = O.find('.color').html();
					var fonts = O.find('.fonts').html();
					var tool = O.find('.tool').text();
					var image = O.find('.image').html();
					var button = O.find('.buttonWrap').html();


					$('.pop .tit').text(tit);
					$('.pop .desc').html(desc);
					$('.pop .color').html(color);
					$('.pop .font').html(fonts);
					$('.pop .tool').html(tool);
					$('.pop .image').html(image);
					$('.pop .buttonWrap').html(button);


					$('#portfolio .pop').add('#modal').show();
				});

				

				$('#portfolio .pop .close').on('click', function(){
					$('#portfolio .pop').add('#modal').hide();
				});
		}

		addClick();

	}); //ready

// ------------------------------PROGRESS BAR-----------------------------

	$(function(){
		var canvas = document.querySelectorAll('.barGraph canvas');

		var ctxArray = [];
		for(i=0;i<canvas.length;i++){
			ctxArray.push(canvas[i].getContext('2d'))
		}

		var state;
		var W,H;
		$(window).resize(function(){

			W = $('.barGraph').innerWidth();
			H = $('.barGraph').innerHeight();

			ctxArray.forEach(function(v,i){
				v.canvas.width = W;
				v.canvas.height = H;
			});
		}).resize();

		var barArray = [];
		var bar = {
			draw : function(animate){

				ctxArray.forEach(function(O,I){
					O.progress = 0;
					animate ? bar.update(O,I) : bar.set(O,I);
				});
			},
			update : function(O,I,interval){

				var percent = O.canvas.getAttribute('data-percent');
				var barColor = O.canvas.getAttribute('data-barColor');
				var barWidth = O.canvas.getAttribute('data-barWidth');
				var time = O.canvas.getAttribute('data-time');

				setTimeout(function(){

					if (O.progress<=percent*(time*2)) {

						var txt = Math.floor(O.progress/(time*2));
						$('.barText').eq(I).text(txt);

						O.clearRect(0, 0, W, H);

						O.beginPath();
						O.arc(W/2,H/2,W/2-barWidth/2,Math.PI*(-0.5),Math.PI*((O.progress*(0.01/time))-0.5));
						O.strokeStyle=barColor;
						O.lineWidth=barWidth;
						O.stroke();

						bar.update(O,I);
						O.progress++;
					}
				},interval);
			},
			set : function(O,I){
				var percent = O.canvas.getAttribute('data-percent');
				var barColor = O.canvas.getAttribute('data-barColor');
				var barWidth = O.canvas.getAttribute('data-barWidth');
				var time = O.canvas.getAttribute('data-time');

				var txt = O.canvas.getAttribute('data-percent');
				$('.barText').eq(I).text(txt);

				O.clearRect(0, 0, W, H);

				O.beginPath();
				O.arc(W/2,H/2,W/2-barWidth/2,Math.PI*(-0.5),Math.PI*((percent*(0.02))-0.5));
				O.strokeStyle=barColor;
				O.lineWidth=barWidth;
				O.stroke();
			}
		}
		
		$(window).scroll(function(){

			var baseLine = $(window).scrollTop()+$(window).height();
			var barOffset = $('#barWrap').offset().top;
			if (baseLine>barOffset&&!state) {
				bar.draw(true);
				state = true;
			}
		});

		$(window).on('resize',function(){		
			if (state) bar.draw(false);
		});
	});

