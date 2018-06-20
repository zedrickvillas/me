/* sweetScroll load */
document.addEventListener("DOMContentLoaded", function () {
  const sweetScroll = new SweetScroll({/* some options */});

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
  }, 2000);

}
