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


  var statements = [
    {
      picture:"img/profile1.jpg",
      statement : "I'm a twenty-something geek, love innovation , new technologies and have new dicussions with smart people to improve my skills",
      color: "#1abc9c"
    },
    {
      picture:"img/profile2.jpg",
      statement : "I am a passionate traveler, and from the time I was a child, travel formed me as much as my formal education.",
      color: "#9b59b6"
    },
    {
      picture:"img/profile4.jpg",
      statement : "Mewdo will help me meeting an open doorway with an open mind and just have a basic honest conversation",
      color: "#e67e22"
    },
    {
      picture:"img/profile3.jpg",
      statement: "Sometimes, all I want is to talk, I don't want to be judged, I don't want to squander my time looking for an interesting conversation, I just want to be free!",
      color:"#e74c3c"
    },
    {
      picture:"img/profile5.jpg",
      statement: "I'm looking for a running buddy around my town, I'm passionate about sports, Who want to run with me in the middle of the day or the mornings ?",
      color:"#f39c12"
    },
    {
      picture:"img/profile6.jpg",
      statement: "I'm passionate about history, I hope I'll find another way to conversations using modern user experience and real time features",
      color:"#2ecc71"
    }
  ]

  setInterval(function(){

    var statement = statements[Math.floor( statements.length * Math.random())];
    $(".notif-left img").attr("src",statement.picture);
    $(".notif-left p").text(statement.statement);
    $(".notif-left").css("background-color",statement.color);
    $(".notif-left").show();
    $(".notif-left").removeClass("fadeOutUp");
    $(".notif-left").addClass("fadeInUp");

    setTimeout(function(){
        $(".notif-left").removeClass("fadeInUp");
        $(".notif-left").addClass("fadeOutUp");
    },5000)

  },6000);

  setInterval(function(){

    var statement = statements[Math.floor( statements.length * Math.random())];
    $(".notif-right img").attr("src",statement.picture);
    $(".notif-right p").text(statement.statement);
    $(".notif-right").css("background-color",statement.color);
    $(".notif-right").show();
    $(".notif-right").removeClass("fadeOutUp");
    $(".notif-right").addClass("fadeInUp");

    setTimeout(function(){
        $(".notif-right").removeClass("fadeInUp");
        $(".notif-right").addClass("fadeOutUp");
    },4000)

  },5000);


});
