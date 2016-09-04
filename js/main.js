$(document).ready(function(){


  //------------------------------------//
  //Navbar//
  //------------------------------------//
    	var menu = $('.navbar');
    	$(window).bind('scroll', function(e){
    		if($(window).scrollTop() > 140){
    			if(!menu.hasClass('open')){
    				menu.addClass('open');
    			}
    		}else{
    			if(menu.hasClass('open')){
    				menu.removeClass('open');
    			}
    		}
    	});


  //------------------------------------//
  //Scroll To//
  //------------------------------------//
  $(".scroll").click(function(event){
  	event.preventDefault();
  	$('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);

  });

  //------------------------------------//
  //Wow Animation//
  //------------------------------------//
  wow = new WOW(
        {
          boxClass:     'wow',      // animated element css class (default is wow)
          animateClass: 'animated', // animation css class (default is animated)
          offset:       0,          // distance to the element when triggering the animation (default is 0)
          mobile:       false        // trigger animations on mobile devices (true is default)
        }
      );
      wow.init();


  $(".textBox").keyup(function (e) {
    if (e.keyCode == 13) {

      let textMessage = $(this).val();

      let textNode = '<li class="ChatLog__entry ChatLog__entry_mine"><img class="ChatLog__avatar" src="img/mewdocat.png" /><p class="ChatLog__message">'+textMessage+'</p></li>';

      if(textMessage != ""){
          let textArea = $(".textArea").val();
          $(".ChatLog").append(textNode);
          $(this).val("");
          socket.emit("talk-chatbot",{message:textMessage});
      }

    }
  });

  // Socket.io Code
  var socket = io('http://mewdomachine6490.cloudapp.net:3000/',{secure:true,'transports': ['websocket', 'polling']});
  // When receiving messages from the chatbot !
  socket.on('bot-response', function (data) {
    let textArea = $(".textArea").val();
    let message = JSON.parse(data.message);
    let textNode = '  <li class="ChatLog__entry"><img class="ChatLog__avatar" src="img/mewdocat.png" /><p class="ChatLog__message">'+ message.text +'</p></li>'
    message = message.text;
    $(".ChatLog").append(textNode);

  });


  $('.target').typed({
    strings: ['Anyone','Athlete', 'Writer','Dancer','Traveler','Vlogger','You','Biker'],
    typeSpeed: 100,
    loop:true,
    shuffle:true
  });


  $(".subscribe").on("click",function(){
      var emailAddress = $("#subscribeEmail").val();
      if(emailAddress !== null){
        $.post("sendmail.php",{email:emailAddress},function(data){
            var msg = JSON.parse(data).success || JSON.parse(data).error ;
            $(".msg-display").text(msg);
            setTimeout(function(){
              $(".msg-display").text("We would love to stay in touch with you! ");
            },3000);
        });
      }
  });


});
