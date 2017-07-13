'use strict';
jQuery(document).ready(function($) {

    /***** POPUP SCRIPT START *****/

    var  qans3;
    var step0Data = [];
    var serviceChoice;

    $('#designModal .qans3').click(function(){
        $('#designModal .qans3').removeClass('selected-ans');
        $(this).addClass('selected-ans');
        qans3 = $(this).html();
    });

    $('#dm-cont0-btn').click(function(){
        $('#designModal .dm-success-msg').remove();
        designModalStep1();
    });
 

    function designModalStep1() {
        if(!validateStep0DesignModal()) {
            return;
        
        }
        $('#designModal .step0').hide();
     
        $('#designModal .step1').show();


        if(serviceChoice === 'design') {
            $('.show-on-design').show(); 

        }
        else if (serviceChoice === 'design-and-build') {
            $('.show-on-design-and-build').show();
        }
        else{
            $('.show-on-build').show();  
        }
    
    }

    function validateStep0DesignModal() {
        $('#designModal .dm-err-msg').remove();
        var isRequiredFieldEmpty = false;
        if(!qans3 || qans3.trim() === '') {
            $('#designModal .q3')
            .append('<span class="dm-err-msg" style="display:block; margin: 0 auto; width:200px; text-align: center" >This field is required</span>');
            isRequiredFieldEmpty = true;
        }
        if(isRequiredFieldEmpty) {
            return false;
        }
        return true;
    }

   
    $('.qans3').click(function(){
        serviceChoice = $(this).attr('data-class');  
           console.log(serviceChoice);
    });

    var qans1, qans4;
    var step1Data = [];
    $('#designModal .qans1').click(function(){
        $('#designModal .qans1').removeClass('selected-ans');
        $(this).addClass('selected-ans');
        qans1 = $(this).html();
    });
    $('#designModal .qans4').click(function(){
        $('#designModal .qans4').removeClass('selected-ans');
        $(this).addClass('selected-ans');
        qans4 = $(this).html();
    });

    $('#dm-cont1-btn').click(function(){
        $('#designModal .dm-success-msg').remove();
        designModalNextStep();
    });

    $('#dm-submit-btn').click(function(){
        submitDesignModal();
    });

    function submitDesignModal() {
        if(!validateStep2DesignModal()) {
            return;
        }
        $('#dm-submit-btn').html('<span class="fa fa-spin fa-spinner"></span> Submitting');
        var fname = $('#dm-fname').val();
        var mobile = $('#dm-mobile').val();
        var email = $('#dm-email').val();
        var message = 'Q. What service are you looking for?<br>Ans. '+serviceChoice+ '<br><br>';
            message += 'Q. What is your space?<br>Ans. '+step1Data[0]+'<br><br>';
            message += 'Q. When do you need work to begin?<br>Ans '+step1Data[1]+'<br><br>';
            message += 'Q. Where is it located?<br>Ans. '+step1Data[2]+'<br><br>';
            message += 'Q. What\'s YOUR budget?<br>Ans '+step1Data[3]+'<br><br>';
            message += 'Q. What\'s the area of the space?<br>Ans '+step1Data[4]+'<br><br>';        
        
        if(serviceChoice === 'design' || serviceChoice === 'design-and-build'){
            message += 'Q. How many rooms do you want us to design?<br>Ans '+step1Data[5]+'<br><br>';
            message += 'Q. Do you have your own floor plan with dimensions of all walls?<br>Ans '+step1Data[6]+'<br><br>';
        }

        var data = 'fullname='+fname;
        data += '&mobile='+mobile;
        data += '&email='+email;
        data +='&apexure_form_key=5IAiBrODl8hnUEq3z2cuEEHhu40ZISBuVa2NGHYFFbqAeIVysBbY7evdjcOD5uqp';
        data +='&answers='+message;
        $.ajax({
            'url' : 'http://mailer.apexure.org/mailer',
            'type' : 'post',
            'Content-Type' : 'application/x-www-form-urlencoded',
            'data' : data,
            'success' : function(data, status, xhr) {
                console.log(data);
                if(!data.error) {
                    $('#dm-submit-btn')
                    .after('<span class="dm-success-msg"> Thank you, your request is received successfully.</span>');
                    $("#dm-email").val("");
                    $("#dm-fname").val("");
                    $("#dm-mobile").val("");
                } else {
                    $('#dm-submit-btn')
                    .after('<span class="dm-s2-err-msg" style="display:block"> Unable to process this request, please try again.</span>');
                }
                $('#dm-submit-btn').html('SUBMIT');
            },
            'error' : function(xhr, status, error) {
                $('#dm-submit-btn').html('SUBMIT');
                $('#dm-submit-btn').after('<span class="dm-s2-err-msg"> Unable to process this request, please try again.</span>');
            }
        });
    }
    function designModalNextStep() {
        if(!validateStep1DesignModal()) {
            return;
        }

        var city = $('#dm-city').val();
        var spaceArea = $('#dm-space-area').val();
        var budget = $('#dm-budget').val();

        if(serviceChoice === 'design' || serviceChoice === 'design-and-build'){
        var areas = $('#dm-areas').val();
        var dimension = $('#dm-dimension').val();
            step1Data = [qans1,  qans4, city, budget, spaceArea, areas, dimension ];
        }
        else{
            step1Data = [qans1, qans4,  city , budget, spaceArea ];

        }

        console.log(step1Data);
        $('#designModal .step1').hide();
        $('#designModal .modal-header').hide();
        $('#designModal .modal-footer').hide();
        $('#designModal .step2').show();
        //css
        $('#designModal .modal-body').css('padding', '0px');
        $('#designModal .modal-content').css({'border-radius': '0px' , 'padding-bottom' : '0px' , 'overflow' : 'visible'});
        $('#designModal').css('padding-right', '0')
    }

    function validateStep1DesignModal() {
        $('#designModal .dm-err-msg').remove();
        var isRequiredFieldEmpty = false;
        if(!qans1 || qans1.trim() === '') {
            $('#designModal .q1')
            .append('<span class="dm-err-msg">This field is required</span>');
            isRequiredFieldEmpty = true;
        }
        if(!qans3 || qans3.trim() === '') {
            $('#designModal .q3')
            .append('<span class="dm-err-msg">This field is required</span>');
            isRequiredFieldEmpty = true;
        }
        if(!qans4 || qans4.trim() === '') {
            $('#designModal .q2')
            .append('<span class="dm-err-msg">This field is required</span>');
            isRequiredFieldEmpty = true;
        }
        var city = $('#dm-city').val();
        var spaceArea = $('#dm-space-area').val();
        var budget = $('#dm-budget').val();
        var areas = $('#dm-areas').val();
        var dimension = $('#dm-dimension').val();

        if(!city || city.trim() === '') {
            $('#designModal .q3')
            .append('<span class="dm-err-msg">This field is required</span>');
            isRequiredFieldEmpty = true;
        }
        if(!budget || budget.trim() === '') {
            $('#designModal .q4')
            .append('<span class="dm-err-msg">This field is required</span>');
            isRequiredFieldEmpty = true;
        }
        if(!spaceArea || spaceArea.trim() === '') {
            $('#designModal .q5')
            .append('<span class="dm-err-msg">This field is required</span>');
            isRequiredFieldEmpty = true;
        }
        if(serviceChoice === 'design' || serviceChoice === 'design-and-build') {
            if(!areas || areas.trim() === '') {
                $('#designModal .q6')
                .append('<span class="dm-err-msg">This field is required</span>');
                isRequiredFieldEmpty = true;
            }
            if(!dimension || dimension.trim() === '') {
                $('#designModal .q7')
                .append('<span class="dm-err-msg">This field is required</span>');
                isRequiredFieldEmpty = true;
            }
        }
        if(isRequiredFieldEmpty) {
            return false;
        }
        return true;
    }

    function validateStep2DesignModal() {
        $('.dm-s2-err-msg').remove();
        var isRequiredFieldEmpty = false;

        var fname = $('#dm-fname').val();
        if(!fname || fname.trim() === '') {
            $('#dm-fname')
            .after('<span class="dm-s2-err-msg">This field is required</span>');
            isRequiredFieldEmpty = true;
        }

        var mobile = $('#dm-mobile').val();
        if(!mobile || mobile.trim() === '') {
            $('#dm-mobile')
            .after('<span class="dm-s2-err-msg">This field is required</span>');
            isRequiredFieldEmpty = true;
        }

        var email = $('#dm-email').val();
        if(!email || email.trim() === '') {
            $('#dm-email')
            .after('<span class="dm-s2-err-msg">This field is required</span>');
            isRequiredFieldEmpty = true;
        }

        if(isRequiredFieldEmpty) {
            return false;
        }

        if(!isValidMobile(mobile)) {
            $('#dm-mobile').after('<span class="dm-s2-err-msg">Enter 10 digit Mobile Number</span>');
            return false;
        }
        if(!validateEmail(email)) {
            $('#dm-email').after('<span class="dm-s2-err-msg">Email Address is invalid</span>');
            return false;
        }

        return true;
    }


    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function isValidMobile(mobile) {
       /* var re = /^[0-9]{11,11}$/;*/
        var re = /[0-9 -()+]+$/;
        return re.test(mobile);
    }

    function appendStates() {
        var states = ["London","Birmingham","Leeds","Glasgow","Sheffield","Bradford","Edinburgh","Liverpool","Manchester","Bristol","Wakefield","Cardiff","Coventry","Nottingham","Leicester","Sunderland","Belfast","Newcastle","Brighton","Hull","Plymouth","Stoke-on-Trent","Wolverhampton","Derby","Swansea","Southampton","Salford","Aberdeen","Westminster","Portsmouth","York","Peterborough","Dundee","Lancaster","Oxford","Newport","Preston","St Albans","Norwich","Chester","Cambridge","Salisbury","Exeter","Gloucester","Lisburn","Chichester","Winchester","Londonderry","Carlisle","Worcester","Bath","Durham","Lincoln","Hereford","Armagh","Inverness","Stirling","Canterbury","Lichfield","Newry","Ripon","Bangor","Truro","Ely","Wells","St Davids"];
        states = states.sort();
        $.each(states, function(index, value){
            $('#dm-city').append('<option>'+value+'</option>');
        });
    }
       appendStates();

 
    /***** POPUP SCRIPT END *****/

    $('#slider2').bxSlider({
        auto: true,
        controls: false,
        preloadImages: 'all',
        maxSlides: 1,
        minSlides: 1,
        autoHover: true,
        pause: 10000,
        adaptiveHeight: true,
        infiniteLoop: true,
        slideMargin: 30
    });
    $('#slider3').bxSlider({
        auto: true,
        controls: false,
        preloadImages: 'all',
        maxSlides: 1,
        minSlides: 1,
        autoHover: true,
        pause: 10000,
        infiniteLoop: true,
        slideMargin: 30
    });
    //  function for random posts on index page
    function generateRandomPosts(callback)
    {
        $.getJSON("/all_posts.json", function(data) {
           // var random_data = [];
            var random_indexes = [];
            while(random_indexes.length < 9) {
                var rand = Math.floor(Math.random()*data.length);
                if($.inArray(rand, random_indexes) === -1) {
                    random_indexes.push(rand);
                }
            }
            var html = '';
            for(var i =0; i < 9; i++) {
                //random_data.push(data[random_indexes[i]]);
                 html += get_post_html(data[random_indexes[i]]);
            }
           /* var html = '';
            $.each(random_data, function(index, post){
               html += get_post_html(post);
            });*/
            $('#proj-list #slider1').html(html);
            callback();
    
        });
    }

    function get_post_html(post){
        var html = "";
        html += '<li>';
        html += '<div class="col-prev-work">';
        html += '<div id="proj-li-1">';
        html += '<div class="ovr">';
        html += '<img src = "/img/';
        html += post.img;
        html += '">';
        html += '<div class="img-overlay">';
        html += '</div>';
        html += '</div>';
        html += '<h4>';
        html += post.title;
        html += '</h4>';
        html += '<p>';
        html += post.description;
        html += '</p>';
        html += '<div class="com-link">';
        html += '<a href ="';
        html +=  post.url;
        html += '">';
        html += "VIEW MORE";
        html += '</a>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</li>';
        return html;
    }

/*mobile-config for home page slider*/
    var slider = undefined;
    generateRandomPosts(function(){
         startSlider();
    });
   

    $(window).resize(function() {
        startSlider();
    });

    function startSlider() {
        if($('#slider1').length === 0) {
            return;
        }
        if ($(window).width() < 768) {
            if (!slider) {
                slider = $('#slider1').bxSlider(getMobileConfig());
            } else {
                slider.reloadSlider(getMobileConfig());
            }
        } else if ($(window).width() > 767 && $(window).width() <= 992) {
            if (!slider) {
                slider = $('#slider1').bxSlider(getTabletConfig());
            } else {
                slider.reloadSlider(getTabletConfig());
            }
        } else {
            if (!slider) {
                slider = $('#slider1').bxSlider(getLargeScreenConfig());
            } else {
                slider.reloadSlider(getLargeScreenConfig());
            }
        }
    }

    function getMobileConfig() {
        return {
            auto: true,
            controls: false,
            preloadImages: 'all',
            minSlides: 1,
            maxSlides: 1,
            autoHover: true,
            pause: 5000,
            infiniteLoop: true,
            slideWidth: 250,
            slideMargin: 10,
            pager: 'short'
        };
    }

    function getTabletConfig() {
        return {
            auto: true,
            controls: false,
            preloadImages: 'all',
            minSlides: 3,
            maxSlides: 3,
            autoHover: true,
            pause: 5000,
            infiniteLoop: true,
            slideWidth: 250,
            slideMargin: 10,
        };
    }

    function getLargeScreenConfig() {
        return {
            auto: true,
            controls: false,
            preloadImages: 'all',
            maxSlides: 4,
            minSlides: 4,
            autoHover: true,
            pause: 5000,
            infiniteLoop: true,
            slideWidth: 500,
            slideMargin: 30

        };
    }

    $('.toggle-level-1>a').after('<i class="fa fa-plus"></i>');    
    $(".navbar-header").click(function() {

             $(this).siblings('#navigation').slideToggle();

           });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 149) {
            var dataHidden = $('#nav-stick').attr('data-hidden');

            if (dataHidden == 'true') {

            } else {
               /* $('#header').css('margin-top', '214px');*/
                $('#nav-stick').addClass("sticky-header").hide();
                $('.sticky-header').slideDown('slow');
                $('#nav-stick').attr('data-hidden', true);

            }

            /*   $('#header').css('margin-top', '214px');*/
        } else {
            $('#nav-stick').removeClass("sticky-header").css('display', 'block');
            $('#nav-stick').attr('data-hidden', false);
       /*     $('#header').css('margin-top', 'auto');*/
        }
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 149) {
            $('#nav-contain').addClass("container");
        } else {
            $('#nav-contain').removeClass("container");
        }
    });
/*filter-counter for portflolio-page*/
    $(".filter-portfolio").click(function() {
        var className = $(this).children().attr('data-class');

        $('#portfolio-wrapper a').hide();
        $('.' + className).fadeIn(2000);
    });

    $('.filter-portfolio').each(function() {
        var className = $(this).children('.filter-item').attr('data-class');

    });

       
    $(".fa-plus-square").click(function() {

             $(this).parent().siblings('.ans').slideToggle();
        if($(this).hasClass('fa fa-plus-square'))
    {
      $(this).removeClass("fa fa-plus-square")
      $(this).addClass("fa fa-minus-square")
    }
    else{
      $(this).removeClass("fa fa-minus-square")
      $(this).addClass("fa fa-plus-square")
    }
  });
    
$('#newsletter-signup').submit(function() {
        $('.notification').remove();
        if(!validateNewsletterForm()) {
            return false;
        }
        var data = $(this).serialize();
        data += '&apexure_form_key=ql15QUgptCrYfK7whopYoqgwnT1RBJHgSM9ntl58WLTXCOLHIQ41ssClvuzB3IWf';
        $.ajax({
            'url': 'http://mailer.apexure.org/mailer',
            'type': 'post',
            'data': data,
            'success': function(data, status, xhr) {
                $('#newsletter-signup #name').val('');
                $('#newsletter-signup #email').val('');
                $('#newsletter-signup').after('<div class="notification" style="text-align:center; color:green ;font-family: Arial ; font-weight:400 ; padding: 25px 0px"> Form is sent successfully</div>');
            },
            'error': function(xhr, status, error) {
                $('#newsletter-signup').after('<div class="notification" style="text-align:center; color:red;font-family: Arial ; font-weight:400 ; padding: 25px 0px">Unabled to sent form, please try again.</div>');
            }
        });
        return false;
    });
function validateNewsletterForm() {
    var isRequiredFieldValid = true;
    $('#newsletter-signup .err-msg').remove();

    var name = $('#newsletter-signup #name').val();
    if (!name || name.trim() == '') {
        isRequiredFieldValid = false;
        $('#newsletter-signup #name')
            .after('<span class="err-msg" style="color:red; font-family: Arial ; font-weight:500 ;font-size: 12px"> This field is required</span>');
    }

    var email = $('#newsletter-signup #email').val();
    if (!email || email.trim() == '') {
        isRequiredFieldValid = false;
        $('#newsletter-signup #email').after('<span class="err-msg" style="color:red ; font-family: Arial ; font-weight:500 ;font-size: 12px"> This field is required</span>');
    }

    if (!isRequiredFieldValid) {
        return false;
    }

    return true;
}


$('#contact-form').submit(function() {


        $('.notification-cf').remove();

        if(!validateContactForm()) {

            return false;

        }
    return true;
        var data = $(this).serialize();

        data += '&apexure_form_key=T3sbbZ36X8DFsqpaJKx8Kk6K38SojZ1lBsBeHMm0tKIfsEWOLUOVJ0yMlqvLV2w1';

        $.ajax({
            'url': 'http://mailer.apexure.org/mailer',
            'type': 'post',
            'data': data,
            'success': function(data, status, xhr) {
                $('#contact-form #first-name').val('');
                $('#contact-form #last-name').val('');
                $('#contact-form #email').val('');
                $('#contact-form #phone-no').val('');
                $('#contact-form').after('<div class="notification-cf" style="text-align:center; color:green; font-family: Arial ; font-weight:400; padding: 0px 0px 25px 0px"> Form is sent successfully</div>');
            },
            'error': function(xhr, status, error) {
                $('#contact-form').after('<div class="notification-cf" style="text-align:center; color:red ;font-family: Arial ; font-weight:400;  padding: 0px 0px 25px 0px">Unabled to sent form, please try again.</div>');
            }


        });
        return false;

    });

function validateContactForm() {
    var isRequiredFieldValid = true;
    $('#contact-form .err-msg').remove();

    var firstname = $('#contact-form input[name="first-name"]').val();

    if (!firstname || firstname.trim() == '') {
        isRequiredFieldValid = false;
        $('#contact-form #first-name')
            .after('<span class="err-msg" style="color:red ;float: left; font-family: Arial ; font-weight:500 ;font-size:12px; padding:10px 0px"> This field is required</span>');
    }

     var lastname = $('#contact-form input[name="last-name"]').val();
    if (!lastname || lastname.trim() == '') {
        isRequiredFieldValid = false;
        $('#contact-form #last-name')
            .after('<span class="err-msg" style="color:red ;float: left; font-family: Arial ; font-weight:500 ;font-size:12px; padding:10px 0px"> This field is required</span>');
    }

    var email = $('#contact-form input[name="email"]').val();
    if (!email || email.trim() == '') {
        isRequiredFieldValid = false;
        $('#contact-form #email').after('<span class="err-msg" style="color:red ;float: left; font-family: Arial ; font-weight:500 ;font-size:12px; padding:10px 0px"> This field is required</span>');
    }

    if (!isRequiredFieldValid) {
        return false;
    }

    return true;
}
    (function($){
     
        $.fn.shuffle = function() {
     
            var allElems = this.get(),
                getRandom = function(max) {
                    return Math.floor(Math.random() * max);
                },
                shuffled = $.map(allElems, function(){
                    var random = getRandom(allElems.length),
                        randEl = $(allElems[random]).clone(true)[0];
                    allElems.splice(random, 1);
                    return randEl;
               });
     
            this.each(function(i){
                $(this).replaceWith($(shuffled[i]));
            });
     
            return $(shuffled);
     
        };

         
     
    })(jQuery);

 $('#portfolio-wrapper a').shuffle();

});



  



 
    
