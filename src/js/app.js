
const botServer = 'http://165.22.101.33/chatbot-server/DetectIntent.php';
//const botServer = 'http://127.0.0.1:8080/DetectIntent.php';
/* sweetScroll load */
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
      disable: 'phone',
      duration: 400,
      once: true,
    });

  const sweetScroll = new SweetScroll({/* some options */});

  document.getElementById('change-theme').addEventListener("click", function(e) {
    toggleTheme();
  }, false);

  if(document.body.contains(document.getElementById('zim-chatbot'))){
  		document.getElementById('zim-icon').addEventListener("click", function(e) {
			showChat();
		}, false);;

		document.getElementById('send-chat-message').addEventListener("click", function(e) {
			if (document.getElementById("text-chat").value.trim()!= '') {
				var msg = document.getElementById('text-chat').value;
				addMessage("user", msg );
				sendChatMessage(msg);
			}
		}, false);;

		document.getElementById("text-chat")
		    .addEventListener("keyup", function(event) {
		    event.preventDefault();
		    if (event.keyCode === 13 && document.getElementById("text-chat").value.trim()!= '') {
		        document.getElementById("send-chat-message").click();
		        emptyChatTextField();
		    }
		});

	    document.getElementById("expand-chat").addEventListener("click", function(e) {
		    resizeChat();
		});

	    document.getElementById("minimize-chat").addEventListener("click", function(e) {
		    resizeChat();
		});

	    document.getElementById("close-chat").addEventListener("click", function(e) {
		    closeChat();
		});

	}

  /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
  particlesJS('particles-js', {
	  "particles": {
		"number": {
		  "value": 80,
		  "density": {
			"enable": true,
			"value_area": 800
		  }
		},
		"color": {
		  "value": "#000000"
		},
		"shape": {
		  "type": "circle",
		  "stroke": {
			"width": 0,
			"color": "#000000"
		  },
		  "polygon": {
			"nb_sides": 5
		  },
		  "image": {
			"src": "img/github.svg",
			"width": 100,
			"height": 100
		  }
		},
		"opacity": {
		  "value": 0.5,
		  "random": false,
		  "anim": {
			"enable": false,
			"speed": 1,
			"opacity_min": 0.1,
			"sync": false
		  }
		},
		"size": {
		  "value": 3,
		  "random": true,
		  "anim": {
			"enable": false,
			"speed": 40,
			"size_min": 0.1,
			"sync": false
		  }
		},
		"line_linked": {
		  "enable": true,
		  "distance": 150,
		  "color": "#000000",
		  "opacity": 0.4,
		  "width": 1
		},
		"move": {
		  "enable": true,
		  "speed": 6,
		  "direction": "none",
		  "random": true,
		  "straight": false,
		  "out_mode": "out",
		  "bounce": false,
		  "attract": {
			"enable": false,
			"rotateX": 600,
			"rotateY": 1200
		  }
		}
	  },
	  "interactivity": {
		"detect_on": "canvas",
		"events": {
		  "onhover": {
			"enable": true,
			"mode": "bubble"
		  },
		  "onclick": {
			"enable": true,
			"mode": "repulse"
		  },
		  "resize": true
		},
		"modes": {
		  "grab": {
			"distance": 400,
			"line_linked": {
			  "opacity": 1
			}
		  },
		  "bubble": {
  			"distance": 200,
  			"size": 10,
  			"duration": 2,
  			"opacity": .2,
  			"speed": 3
		  },
		  "repulse": {
  			"distance": 150,
  			"duration": 1
		  },
		  "push": {
			     "particles_nb": 4
		  },
		  "remove": {
			     "particles_nb": 2
		  }
		}
	  },
	  "retina_detect": true
  });


}, false);

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function toggleTheme() {
  $('html').toggleClass('black');
  $('.fa-moon-o, .fa-sun-o').toggleClass('fa-sun-o').toggleClass('fa-moon-o');

  setTimeout(function(){
    var color = window.getComputedStyle(document.getElementsByClassName('site-title')[0]).getPropertyValue("color");
    var arrayColor = color.split(",");
    var hexColor = rgb2hex(color);
    var r = arrayColor[0].match(/\d/g).join("");
    var g = arrayColor[1].match(/\d/g).join("");
    var b = arrayColor[2].match(/\d/g).join("");
    var particles = pJSDom["0"].pJS.particles;
    particles.color = hexColor;

    particles.array["0"].color.rgb.r = r
    particles.array["0"].color.rgb.g = g
    particles.array["0"].color.rgb.b = b
    particles.line_linked.color = hexColor;
    particles.line_linked.color_rgb_line.r = r;
    particles.line_linked.color_rgb_line.g = g;
    particles.line_linked.color_rgb_line.b = b;

    pJSDom["0"].pJS.particles = particles;
  }, 800);
};

window.onscroll = function (e) {
  if($('#change-theme').offset().top > 300) {
    $('#change-theme').addClass('smallbtn');
  } else {
    $('#change-theme').removeClass('smallbtn');
  }
}


var response;
var json;

function sendChatMessage(message) {
	let data = {
        'message': message,
    };
    emptyChatTextField();
    
    setTimeout(function(){
    	showLoading();	
	},300);

    fetch(botServer,{
        method: 'POST',
        headers: {
    		'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(function(json) {
    	removeLoading();
    	var timer = 0;
    	console.log(json);
    	$.each(json.fulfillmentMessages, function(item,key){
    		setTimeout(function(){
    			if (typeof key.text != "undefined") {
    				addMessage("bot",key.text.text[0]);	
    			}
    		}, timer);
    		timer = timer + key.text.text[0].length * 30;
    		
    	})
    });
}


function addMessage(from,message) {
	var messageContainer = $('.message-container');

	$(document.createElement('span'))
		.addClass(from + '-message')
		.text(message)
		.appendTo(messageContainer);

	scrollMessageContainer()
}

function emptyChatTextField(){
	document.getElementById("text-chat").value = "";
}

function showLoading(){
	var messageContainer = $('.message-container');

	$(document.createElement('span'))
		.addClass('bot-message loading')
		.html('<span class="one">. </span><span class="two">. </span><span class="three">. </span>')
		.appendTo(messageContainer);

	scrollMessageContainer()
}

function removeLoading(){
	$('.bot-message.loading').remove();
}

function scrollMessageContainer() {
	var messageContainer = $('.message-container'),
		containerHeight = messageContainer.prop('scrollHeight');

	messageContainer.scrollTop(containerHeight);
}

function resizeChat() {
	$('.message-container').toggleClass('larger');
	$('.chatbox').toggleClass('larger');
	if($('.message-container').hasClass('larger')) {
		$('#expand-chat').hide();
		$('#minimize-chat').show();
	} else {
		$('#minimize-chat').hide();
		$('#expand-chat').show();	
	}
}

function closeChat() {
	$('#zim-icon').removeClass('hidden');
	$('.chatbox').toggleClass('overflow-hidden')
	setTimeout(function(){
		$('.chatbot-container').delay(1000).toggleClass('overflow-hidden');	
	}, 1000);
	
}

function showChat() {
	$('#zim-icon').addClass('hidden');
	$('.chatbox').toggleClass('overflow-hidden')
	$('.chatbot-container').toggleClass('overflow-hidden');	
	
}

