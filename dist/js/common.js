'use strict';

//  //Каруселька
//  //Документация: http://owlgraphic.com/owlcarousel/
//  var owl = $(".carousel");
//  owl.owlCarousel({
// 	 items : 1,
// 	 autoPlay: 5000,
// 	 pagination: false,
// 	 transitionStyle: 'fade',
// 	 itemsDesktop: [1199,1],
// 	 itemsDesktopSmall: [979,1],
// 	 itemsTablet: [768,0],
// 	 itemsMobile: [479,0]
//  });
//  owl.on("mousewheel", ".owl-wrapper", function (e) {
// 	 if (e.deltaY > 0) {
// 		 owl.trigger("owl.prev");
// 	 } else {
// 		 owl.trigger("owl.next");
// 	 }
// 	 e.preventDefault();
//  });
//  $(".next_button").click(function(){
// 	 owl.trigger("owl.next");
//  });
//  $(".prev_button").click(function(){
// 	 owl.trigger("owl.prev");
//  });//карусель end
	
//  //Аякс отправка форм
//  //Документация: http://api.jquery.com/jquery.ajax/
//  $("form").submit(function() {
// 	 $.ajax({
// 		 type: "GET",
// 		 url: "mail.php",
// 		 data: $("form").serialize()
// 	 }).done(function() {
// 		 alert("Спасибо за заявку!");
// 		 setTimeout(function() {
// 			 $.fancybox.close();
// 		 }, 1000);
// 	 });
// 	 return false;
//  });//ajax формы end

// 	//AJAX вкладки (анимацию делать на keyframes)
// 	$('.link').click(function() {

// 		var info = $(this).attr('href') + ' #content';//берет href ссылки и задает тот блок, который будет обновляться с помощью ajax при переходе по ссылке
// 		$('#content').hide(0, loadContent());//скрываем содержимое блока #content той страницы, на которой находимся//задать анимацию для содержимого
// 		$('#loader').fadeIn('slow');//анимация лоадера

// 		function loadContent() {//основная функция для загрузки контента
// 			$('#content').load(info, '', function() {//блок, в который мы хотим загрузить новый контент//info подгружает именно тот контент, который нам нужен//'' - различные переменные, дата, опускаем его
// 				$('#content').show(0, hideLoader());//показываем наш блок с контентом//скрываем лоадер//задать анимацию для содержимого
// 			});
// 		}

// 		function hideLoader() {//функция для скрытия лоадера
// 			$('#loader').fadeOut('normal');
// 		}

// 		return false;//чтобы не происходило перехода по ссылке, а только происходила подгрузка контента

// 	});//ajax вкладки end

$(document).ready(function() {

	//prevent default
	function prevdef() {
		$('.prevdef').click(function(event) {
			event.preventDefault();
		});
	}// prevdef();
	prevdef();

	// Hamburger
	let headerHamburger = document.querySelector('.header__hamburger');
	let headerCollapsedBlock = document.querySelector('.header__collapsed-block');

	headerHamburger.onclick = function() {
		this.classList.toggle('active');
		headerCollapsedBlock.classList.toggle('active');
	}








	// Select
	let languageSelect = document.querySelector('.header__language-select');

	let languageSelectFake = document.querySelector('.header__language-select-fake');
	let languageSelectOptionsContainerFake = document.querySelector('.header__language-select-options-container-fake');
	let languageOptionFake = document.querySelectorAll('.header__language-option-fake');

	languageSelectFake.onclick = function() {
		this.classList.toggle('active');
		languageSelectOptionsContainerFake.classList.toggle('active');
	}

	languageSelectOptionsContainerFake.onmouseleave = function() {
		this.classList.remove('active');
		languageSelectFake.classList.remove('active');
	}

	for (let i = 0; i < languageOptionFake.length; i++) {
		languageOptionFake[i].onclick = function() {
			for (let i = 0; i < languageOptionFake.length; i++) {
				languageOptionFake[i].classList.remove('active');
			}
			this.classList.add('active');
			languageSelectFake.innerHTML = this.innerHTML;
			languageSelectFake.classList.remove('active');
			languageSelectOptionsContainerFake.classList.remove('active');
			for (let i = 0; i < languageOptionFake.length; i++) {
				if (languageOptionFake[i].classList.contains('active')) {
					languageSelect.options[i].selected = true;
				}
			}
		}
	}








	// Main Input
	let mainEmailInput = document.querySelector('.main__email-input');
	let mainSubmitButton = document.querySelector('.main__submit-button');
	mainEmailInput.onkeyup = function() {
		this.parentNode.classList.add('active');
		mainSubmitButton.disabled = false;
		if (!this.value) {
			this.parentNode.classList.remove('active');
			mainSubmitButton.disabled = true;
		}
	}
	mainEmailInput.onblur = function() {
		if (!mainEmailInput.value) {
			this.parentNode.classList.remove('active');
			mainSubmitButton.disabled = true;
		}
	}











	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	var brandsSlider = $(".brands__slider");
	brandsSlider.owlCarousel({
		items : 1,
		autoPlay: 5000,
		pagination: false,
		transitionStyle: 'fade',
		itemsDesktop: [1199,1],
		itemsDesktopSmall: [979,1],
		itemsTablet: [768,1],
		itemsMobile: [479,1]
	});









	





	// Cases Slider
	let casesSlides = document.querySelectorAll('.cases__slide');
	let casesCounter = 0;

	let casesPlayVideoButtons = document.querySelectorAll('.cases__play-video-button');
	let casesVideos = document.querySelectorAll('.cases__video');
	let casesVideoContainer = document.querySelectorAll('.cases__video-container');
	let casesShowAdditionalListLinks = document.querySelectorAll('.cases__show-additional-list');

	let casesPrevButton = document.querySelector('.cases__prev-button');
	let casesNextButton = document.querySelector('.cases__next-button');

	casesPrevButton.addEventListener('click', casesSwitchPrev);
	casesNextButton.addEventListener('click', casesSwitchNext);

	for (let i = 0; i < casesPlayVideoButtons.length; i++) {
		casesPlayVideoButtons[i].addEventListener('click', casesPlayVideoFunc);
	}
	for (let i = 0; i < casesShowAdditionalListLinks.length; i++) {
		casesShowAdditionalListLinks[i].addEventListener('click', casesAdditionalListShowFunc);
	}

	function startCasesSlider() {
		window.casesSliderId = window.setInterval(function() {
			casesCounter++;
			if (casesCounter >= casesSlides.length) {
				casesCounter = 0;
			}
			for (let i = 0; i < casesSlides.length; i++) {
				casesSlides[i].classList.remove('active');
			}
			casesSlides[casesCounter].classList.add('active');
		}, 5000);
	}
	startCasesSlider();

	function stopCasesSlider() {
		window.clearInterval(window.casesSliderId);
	}

	function casesPlayVideoFunc() {
		stopCasesSlider();
		this.previousElementSibling.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
		this.classList.add('active');
		this.parentNode.classList.add('active');
	}

	function casesAdditionalListShowFunc() {
		stopCasesSlider();
		this.previousElementSibling.classList.add('active');
		this.classList.add('active');
	}

	function casesSwitchPrev() {
		stopCasesSlider();
		casesCounter--;
		if (casesCounter < 0) {
			casesCounter = casesSlides.length - 1;
		}
		for (let i = 0; i < casesSlides.length; i++) {
			casesSlides[i].classList.remove('active');
		}
		casesSlides[casesCounter].classList.add('active');
		startCasesSlider();
		casesSlideReset();
	}

	function casesSwitchNext() {
		stopCasesSlider();
		casesCounter++;
		if (casesCounter >= casesSlides.length) {
			casesCounter = 0;
		}
		for (let i = 0; i < casesSlides.length; i++) {
			casesSlides[i].classList.remove('active');
		}
		casesSlides[casesCounter].classList.add('active');
		startCasesSlider();
		casesSlideReset();
	}

	function casesSlideReset() {
		for (let i = 0; i < casesVideoContainer.length; i++) {
			casesVideoContainer[i].classList.remove('active');
			casesVideos[i].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
			casesShowAdditionalListLinks[i].previousElementSibling.classList.remove('active');
			casesShowAdditionalListLinks[i].classList.remove('active');
			casesPlayVideoButtons[i].classList.remove('active');
		}
	}
















	// Contact Inputs
	let contactInputs = document.querySelectorAll('.contact__input');
	let contactNameInput = document.querySelector('.contact__name-input');
	let contactEmailInput = document.querySelector('.contact__email-input');
	let contactSiteInput = document.querySelector('.contact__site-input');
	let contactCommentInput = document.querySelector('.contact__comment-input');
	let contactSubmitButton = document.querySelector('.contact__submit-button');
	let contactValidationArray = [contactNameInput, contactEmailInput, contactSiteInput, contactCommentInput];

	for (let i = 0; i < contactInputs.length; i++) {
		contactInputs[i].onkeyup = function() {
			for (let i = 0; i < contactInputs.length; i++) {
				contactInputs[i].parentNode.classList.add('active');
				contactSubmitButton.disabled = false;
				if (!contactInputs[i].value) {
					contactInputs[i].parentNode.classList.remove('active');
					contactSubmitButton.disabled = true;
				}
			}
		}
	}

	contactSubmitButton.onclick = function() {
		if (contactNameInput.value && contactEmailInput.value && contactSiteInput.value && contactCommentInput.value) {
			modalSuccessContainer.style.opacity = '1';
			modalSuccessContainer.style.zIndex = '999';
			modalOverlay.style.display = 'block';
			for (let i = 0; i < contactValidationArray.length; i++) {
				contactValidationArray[i].value = '';
				contactValidationArray[i].parentNode.classList.remove('active');
			}
			this.disabled = true;
		}
	}












	
	// Modals

	let headerLogInButton = document.querySelector('.header__log-in-button');
	headerLogInButton.addEventListener('click', registrationFormShow);

	function registrationFormShow() {
		modalOverlay.style.display = 'block';
		modalRegistrationFormContainer.style.opacity = '1';
		modalRegistrationFormContainer.style.zIndex = '999';
	}



	let modalRegistrationInputs = document.querySelectorAll('.modal__input');
	let modalLogInButton = document.querySelector('.modal__log-in-button');
	let modalRegistrationButton = document.querySelector('.modal__registration-button');

	for (let i = 0; i < modalRegistrationInputs.length; i++) {
		modalRegistrationInputs[i].onkeyup = function() {
			this.parentNode.classList.add('active');
			modalLogInButton.classList.add('active');
			if (!this.value) {
				this.parentNode.classList.remove('active');
				modalLogInButton.classList.remove('active');
			}
		}
	}

	modalLogInButton.onclick = function() {
		for (let i = 0; i < modalRegistrationInputs.length; i++) {
			if (!modalRegistrationInputs[i].value) {
				modalRegistrationInputs[i].style.borderColor = 'red';
			} else {
				modalRegistrationInputs[i].style.borderColor = '';
			}
		}
	}




	let modalCloseButtons = document.querySelectorAll('.modal__close-button');
	let modalOverlay = document.querySelector('.modal__overlay');
	let modalRegistrationFormContainer = document.querySelector('.modal__registration-form-container');

	for (let i = 0; i < modalCloseButtons.length; i++) {
		modalCloseButtons[i].onclick = function() {
			modalsHide();
		}
	}
	modalOverlay.addEventListener('click', modalsHide);

	function modalsHide() {
		modalOverlay.style.display = 'none';
		modalRegistrationFormContainer.style.opacity = '0';
		modalRegistrationFormContainer.style.zIndex = '-1';
		modalSuccessContainer.style.opacity = '0';
		modalSuccessContainer.style.zIndex = '-1';
	}

	let modalSuccessContainer = document.querySelector('.modal__success-container');

	$('.top').mPageScroll2id({
		offset: 50,
		scrollSpeed: 200
	});

});//doc.ready end

var cLog = function(n) {
	return console.log(n);
};//console.log