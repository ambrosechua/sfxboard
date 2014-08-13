
var socket = io.connect();

var KEYCODES = {
  STRG: 17,
  CTRL: 17,
  CTRLRIGHT: 18,
  CTRLR: 18,
  SHIFT: 16,
  RETURN: 13,
  ENTER: 13,
  BACKSPACE: 8,
  BCKSP:8,
  ALT: 18,
  ALTR: 17,
  ALTRIGHT: 17,
  SPACE: 32,
  WIN: 91,
  MAC: 91,
  FN: null,
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ESC: 27,
  DEL: 46,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  'backspace' : '8',
  'tab' : '9',
  'enter' : '13',
  'shift' : '16',
  'ctrl' : '17',
  'alt' : '18',
  'pause_break' : '19',
  'caps_lock' : '20',
  'escape' : '27',
  'page_up' : '33',
  'page down' : '34',
  'end' : '35',
  'home' : '36',
  'left_arrow' : '37',
  'up_arrow' : '38',
  'right_arrow' : '39',
  'down_arrow' : '40',
  'insert' : '45',
  'delete' : '46',
  '0' : '48',
  '1' : '49',
  '2' : '50',
  '3' : '51',
  '4' : '52',
  '5' : '53',
  '6' : '54',
  '7' : '55',
  '8' : '56',
  '9' : '57',
  'a' : '65',
  'b' : '66',
  'c' : '67',
  'd' : '68',
  'e' : '69',
  'f' : '70',
  'g' : '71',
  'h' : '72',
  'i' : '73',
  'j' : '74',
  'k' : '75',
  'l' : '76',
  'm' : '77',
  'n' : '78',
  'o' : '79',
  'p' : '80',
  'q' : '81',
  'r' : '82',
  's' : '83',
  't' : '84',
  'u' : '85',
  'v' : '86',
  'w' : '87',
  'x' : '88',
  'y' : '89',
  'z' : '90',
  'left_window key' : '91',
  'right_window key' : '92',
  'select_key' : '93',
  'numpad 0' : '96',
  'numpad 1' : '97',
  'numpad 2' : '98',
  'numpad 3' : '99',
  'numpad 4' : '100',
  'numpad 5' : '101',
  'numpad 6' : '102',
  'numpad 7' : '103',
  'numpad 8' : '104',
  'numpad 9' : '105',
  'multiply' : '106',
  'add' : '107',
  'subtract' : '109',
  'decimal point' : '110',
  'divide' : '111',
  'f1' : '112',
  'f2' : '113',
  'f3' : '114',
  'f4' : '115',
  'f5' : '116',
  'f6' : '117',
  'f7' : '118',
  'f8' : '119',
  'f9' : '120',
  'f10' : '121',
  'f11' : '122',
  'f12' : '123',
  'num_lock' : '144',
  'scroll_lock' : '145',
  'semi_colon' : '186',
  'equal_sign' : '187',
  'comma' : '188',
  'dash' : '189',
  'period' : '190',
  'forward_slash' : '191',
  'grave_accent' : '192',
  'open_bracket' : '219',
  'backslash' : '220',
  'closebracket' : '221',
  'single_quote' : '222'
}

var sounds = {};

// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

var mastergain = context.createGain();
mastergain.gain.value = 1;

binded = [];

function bindkey(strkey, verbal, action, keyup) {
	var l = false;
	binded.forEach(function (existing) {
		if (existing.action == action) {
			l = true;
			existing = {
				keystr: strkey,
				keyid: KEYCODES[strkey],//.toLowerCase()],
				action: action,
				verbal: verbal,
				keyup: keyup
			};
			return false;
		}
	})
	if (!l) {
		binded.push({
			keystr: strkey,
			keyid: KEYCODES[strkey],//.toLowerCase()],
			action: action,
			verbal: verbal,
			keyup: keyup
		});
	}
}

window.addEventListener("keydown", function (e) {
	console.log(e.which);
	binded.forEach(function (keybind) {
	    if (e.which == keybind.keyid) {
	    	if (keybind.preventRepeat != true) {
		    	keybind.action();
				e.preventDefault();
			    document.querySelector("td[data-key='" + keybind.keystr + "']").classList.add("active");
			    if (!keybind.keyup) {
				    setTimeout(function () {
					    [].forEach.call(document.querySelectorAll("td[data-key]"), function (ele) {
					    	ele.classList.remove("active");
					    });
				    }, 300);
				}
				keybind.preventRepeat = true;
		    	return false;
		    }
	    }
	});
}, false);

window.addEventListener("keyup", function (e) {
	binded.forEach(function (keybind) {
	    if (e.which == keybind.keyid) {
			keybind.preventRepeat = false;
	    	if (keybind.keyup) {
		    	keybind.keyup();
				e.preventDefault();
			    [].forEach.call(document.querySelectorAll("td[data-key]"), function (ele) {
			    	ele.classList.remove("active");
			    });
		    	return false;
			}
	    }
	});
}, false);
var shiftrate = 0.1;

var movegaintoint = null;
function movegainto(val, changeslider) {
	val = Math.round(val * 1000) / 1000;
	console.log(val);
	clearInterval(movegaintoint);
	movegaintoint = null;
	movegaintoint = setInterval(function () {
		mastergain.gain.value += (val - mastergain.gain.value) * shiftrate;
		document.querySelector("#gainval").innerHTML = mastergain.gain.value;
		if (changeslider == true) {
			document.querySelector("#gainctrl").value = mastergain.gain.value;
		}
		if (Math.round(mastergain.gain.value * 1000) / 1000 == val) {
			clearInterval(movegaintoint);
			mastergain.gain.value = val;
			movegaintoint = null;
		}
	}, 100);
}

document.querySelector("#gainctrl").addEventListener("change", function (e) {
	movegainto(e.target.value, true);
}, false);
document.querySelector("#reset").addEventListener("click", function (e) {
	movegainto(1, true);
}, true);



function loadsound(idname, url, gain) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';
	sounds[idname] = {
		url: url,
		buffer: null,
		id: idname,
		gain: gain,
		play: function () {
			playsound(this.buffer, this.gain);
		},
		bindkey: function (key) {
			bindkey(key, idname);
		}
	};
	// Decode asynchronously
	request.onload = function () {
		context.decodeAudioData(request.response, function(buffer) {
			sounds[idname].buffer = buffer;
		}, function (e) {
			console.error(e);
		});
	}
	request.send();
}

var nowplaying = [];

function playsound(buffer, gain) {

    var volume = context.createGain();
    volume.gain.value = gain;

	var source = context.createBufferSource();
	source.buffer = buffer;

	source.connect(volume);
	volume.connect(mastergain);
	mastergain.connect(context.destination);
	source.start(0);
	setTimeout(function () {
		nowplaying.push(source);
	}, 150);
	source.onended = function () {
		nowplaying.splice(tostop.indexOf(source), 1);
	}
}

function stopall() {
	nowplaying.forEach(function (src) {
		src.stop();
	});
	nowplaying = [];
}

function updatekeys() {
	var ht = "<table><tr><th>key</th><th>verbal</th><th>action</th><!-- <th>url</th> --></tr>";
	binded.forEach(function (keybind) {
		// ht += "<tr><td>" + keybind.keystr + "</td><td>" + keybind.verbal + "</td><td>" + keybind.action + "</tr>"; // <!-- <td>" + sounds[keybind.sound].url + "</td> --></tr>";
		ht += "<tr><td data-key='" + keybind.keystr + "'>" + keybind.keystr + "</td><td>" + keybind.verbal + "</td><td>" + "hmmm..." + "</tr>"; // <!-- <td>" + sounds[keybind.sound].url + "</td> --></tr>";
	});
	ht += "</table>";
	document.querySelector("#keys").innerHTML = ht;
}

var toload = [
{
	name: "b5a",
	verbal: "Darkness",
	file: "b5a.wav",
	key: "1",
	gain: 1
},
];

toload.forEach(function (obj) {
	if (Object.prototype.toString.call(obj.file) === '[object Array]') {
		obj.file.forEach(function (str, i) {
			loadsound(obj.name + i, str, obj.gain);
		});
		bindkey(obj.key, obj.verbal, function () {
			var i = Math.floor(Math.random() * obj.file.length);
			sounds[obj.name + i].play();
		});
	}
	else {
		loadsound(obj.name, obj.file, obj.gain);
		bindkey(obj.key, obj.verbal, function () {
			sounds[obj.name].play();
		});
	}
});


var beep;
bindkey("s", "Beep", function () {
	beep = setInterval(function () {
		playiso(2000, 50, 0, 0.5, "sine");
	}, 2000);
}, function () {
	clearInterval(beep);
});


var sbinds = [
{
	name: "slidea",
	verbal: "A",
	key: "4"
},
{
	name: "slideb",
	verbal: "B",
	key: "5"
},
{
	name: "blank",
	verbal: "blankscreen",
	key: "0"
}
];

sbinds.forEach(function (obj) {
	bindkey(obj.key, obj.verbal, function () {
		socket.emit("data", {
			name: obj.name
		})
	});
});


bindkey("BACKSPACE", "Stop All", function () {
	stopall();
});

updatekeys();




function playiso(freq, time, detune, gain, type) {
	var osc = context.createOscillator();
	var volume = context.createGain();
	volume.gain.value = gain;
	osc.type = type;
	osc.frequency.value = freq;
	osc.detune.value = detune;
	osc.connect(volume);
	volume.connect(mastergain);
	mastergain.connect(context.destination);
	osc.start(0);
	if (time == "callback") {
		return function () {
			osc.stop(context.currentTime);
		}
	}
	else if (time > 0) {
			osc.stop(context.currentTime + time / 1000);
	}
}




// var win = window.open("/projection", "projection", "width=640,height=480,left=720,top=0");
// window.addEventListener("unload", function () {
// 	win.close();
// })