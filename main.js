
var socket = io.connect();

var KEYCODES = {
 /**
  * The most common keycodes defined by :
  * @type {Object.}
  * @const
  */
 // KEYMAP : {
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
 // },
 /**
  * @type {Object.}
  * @const
  */
 // KEYCODES : {
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
 // }
}

var sounds = {};

// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

// var mastergain = context.createGainNode();
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
// window.addEventListener("keyup", function (e) {
//     document.querySelectorAll("td").forEach(function (ele) {
//     	ele.classList.remove("active");
//     });
// }, false);

var lengthInSamples = 4 * context.sampleRate;
noiseBuffer = context.createBuffer( 1, lengthInSamples, context.sampleRate );
var bufferData = noiseBuffer.getChannelData( 0 );
for (var i = 0; i < lengthInSamples; ++i) {
    bufferData[i] = (2*Math.random() - 1);  // -1 to +1
}

// var shiftrate = 0.25;
var shiftrate = 0.1;

var movegaintoint = null;
function movegainto(val, changeslider) {
	val = Math.round(val * 1000) / 1000;
	console.log(val);
	clearInterval(movegaintoint);
	movegaintoint = null;
	movegaintoint = setInterval(function () {
		mastergain.gain.value += (val - mastergain.gain.value) * shiftrate;
		// mastergain.gain.value = Math.round(mastergain.gain.value * 1000) / 1000;
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

// document.querySelector("#gainctrl").addEventListener("mousemove", function (e) {
// 	movegainto(e.target.value);
// }, false);
document.querySelector("#gainctrl").addEventListener("change", function (e) {
	movegainto(e.target.value, true);
}, false);
document.querySelector("#reset").addEventListener("click", function (e) {
	movegainto(1, true);
}, true);

// document.querySelector("#gainctrl").addEventListener("mousemove", function (e) {
// 	mastergain.gain.value = e.target.value;
// 	document.querySelector("#gainval").innerHTML = mastergain.gain.value;
// }, false);
// document.querySelector("#gainctrl").addEventListener("change", function (e) {
// 	mastergain.gain.value = e.target.value;
// 	document.querySelector("#gainval").innerHTML = mastergain.gain.value;
// }, false);
// document.querySelector("#reset").addEventListener("click", function (e) {
// 	document.querySelector("#gainctrl").value = 1;
// 	mastergain.gain.value = document.querySelector("#gainctrl").value;
// 	document.querySelector("#gainval").innerHTML = mastergain.gain.value;
// }, true);
// setInterval(function () {
// 	mastergain.gain.value = document.querySelector("#gainctrl").value;
// 	document.querySelector("#gainval").innerHTML = document.querySelector("#gainctrl").value;
// }, 200);


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
    // var volume = context.createGainNode();
    var volume = context.createGain();
    volume.gain.value = gain;

	var source = context.createBufferSource();
	source.buffer = buffer;
	// source.connect(context.destination);
	source.connect(volume);
	volume.connect(mastergain);
	mastergain.connect(context.destination);
	source.start(0);
	setTimeout(function () {
		nowplaying.push(source);
	// }, 50);
	}, 150);
	source.onended = function () {
		nowplaying.splice(tostop.indexOf(source), 1);
	}
	return source;
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

// var inputs = document.querySelectorAll("input");
// for (var i = 0; i < inputs.length; ++i) {
// 	inputs[i].addEventListener("keydown", function (e) {
// 		e.stopPropagation();
// 	}, false);
// }

// document.querySelector("#binder").addEventListener("submit", function (e) {
// 	e.preventDefault();
// 	var name = document.querySelector("#name").value;
// 	var file = document.querySelector("#file").value;
// 	var key = document.querySelector("#key").value;
// 	loadsound(name, file);
// 	bindkey(key, name);
// 	updatekeys();
// }, false);

var toload = [
{
	name: "waves",
	verbal: "back: Beach Waves",
	file: "beach.wav",
	key: "comma",
	gain: 0.2
},
{
	name: "z-see",
	verbal: "back: See",
	file: "z-see.wav",
	key: "period",
	gain: 0.6
},
{
	name: "z-what",
	verbal: "back: What",
	file: "z-what.wav",
	key: "forward_slash",
	gain: 0.5
},
// {
// 	name: "b5c",
// 	verbal: "back: Darkness (Long)",
// 	file: "b5c.wav",
// 	key: "3",
// 	gain: 0.5
// },
{
	name: "car1",
	verbal: "Car Nearer",
	file: "car21.wav",
	key: "q",
	gain: 0.7
},
{
	name: "crash1",
	verbal: "Car Crash",
	file: "crash.wav",
	key: "p",
	gain: 2
},
// {
// 	name: "carstarting",
// 	verbal: "Car Starting",
// 	file: "carstart.wav",
// 	key: "a",
// 	gain: 2
// },
{
	name: "car2",
	verbal: "Car Leaving",
	file: "car2.wav",
	key: "l",
	gain: 0.5
},
{
	name: "emptyrevolver",
	verbal: "Empty Revolver",
	file: ["erevolver1.wav"],
	key: "m",
	gain: 1.8
},
{
	name: "revolver",
	verbal: "Revolver",
	file: ["revolver1.wav", "revolver2.wav", "revolver3.wav", "revolver4.wav", "revolver5.wav", "revolver6.wav"],
	key: "n",
	gain: 1.25
},
// {
// 	name: "fire",
// 	verbal: "Fire",
// 	file: ["fire1.wav", "fire2.wav", "fire3.wav", "fire4.wav"],
// 	key: "n",
// 	gain: 1
// },
// {
// 	name: "reload",
// 	verbal: "Reload",
// 	file: "firereload.wav",
// 	key: "b",
// 	gain: 1
// },
{
	name: "revolvercock",
	verbal: "Revolver Cock",
	file: "revolvercock.wav",
	key: "b",
	gain: 1.2
},
{
	name: "cuff",
	verbal: "Cuffs",
	file: "cuff.wav",
	key: "c",
	gain: 1
},
// {
// 	name: "scream1",
// 	verbal: "Scream 1",
// 	file: "scream1.wav",
// 	key: "h",
// 	gain: 0.5
// },
// {
// 	name: "scream2",
// 	verbal: "Scream 2",
// 	file: "scream2.wav",
// 	key: "j",
// 	gain: 1
// },
{
	name: "asiren",
	verbal: "Ambulance Siren",
	file: "siren.wav",
	key: "z",
	gain: 1
},
{
	name: "policesrien",
	verbal: "Police Srien",
	file: "policesiren.wav",
	key: "x",
	gain: 1
},
// {
// 	name: "cardooropen",
// 	verbal: "Car Door Open",
// 	file: "cardooropen.wav",
// 	key: "t",
// 	gain: 1
// },
// {
// 	name: "cardoorclose",
// 	verbal: "Car Door Close",
// 	file: "cardoorclose.wav",
// 	key: "y",
// 	gain: 1
// },
{
	name: "doorknocks",
	verbal: "Door Knocks (three)",
	file: "threeknocks.wav",
	key: "u",
	gain: 1.5
},
{
	name: "explosion",
	verbal: "Explosion",
	file: "explosion.wav",
	key: "e",
	gain: 2.5
},
{
	name: "ringtone",
	verbal: "Ringtone",
	file: "ringtone.wav",
	key: "i",
	gain: 1
},
// {
// 	name: "beep",
// 	verbal: "Beep",
// 	file: "beep2.wav",
// 	key: "w",
// 	gain: 2
// },
];

toload.forEach(function (obj) {
	if (Object.prototype.toString.call(obj.file) === '[object Array]') {
		obj.file.forEach(function (str, i) {
			loadsound(obj.name + i, str, obj.gain);
		});
		bindkey(obj.key, obj.verbal, function () {
			var i = Math.floor(Math.random() * obj.file.length);
			sounds[obj.name + i].play();
			// console.log(i);
		});
	}
	else {
		loadsound(obj.name, obj.file, obj.gain);
		bindkey(obj.key, obj.verbal, function () {
			sounds[obj.name].play();
		});
	}
});

var explosionbeepgain = 0.5, beepslow, beepmedium, beepfast, beepxfast;
bindkey("s", "Beep Slow", function () {
		playiso(2000, 50, 0, beepgain, "sine");
	beepslow = setInterval(function () {
		playiso(2000, 50, 0, beepgain, "sine");
	}, 2000);
}, function () {
	clearInterval(beepslow);
});
bindkey("d", "Beep Medium", function () {
		playiso(2000, 50, 0, beepgain, "sine");
	beepmedium = setInterval(function () {
		playiso(2000, 50, 0, beepgain, "sine");
	}, 500);
}, function () {
	clearInterval(beepmedium);
});
bindkey("f", "Beep Fast", function () {
		playiso(2000, 50, 0, beepgain, "sine");
	beepfast = setInterval(function () {
		playiso(2000, 50, 0, beepgain, "sine");
	}, 200);
}, function () {
	clearInterval(beepfast);
});
bindkey("g", "Beep Extrafast", function () {
	beepxfast = playiso(2000, "callback", 0, beepgain, "sine");
}, function () {
	beepxfast();
});

var noiseSource;
bindkey("equal_sign", "Noise", function () {
	noiseSource = playsound(noiseBuffer, 0.1);
}, function () {
	noiseSource.stop();
});


var busytone1, busytone2;
// American
// bindkey("dash", "Busy", function () {
// 	playiso(480, 500, 0, beepgain, "sine");
// 	playiso(620, 500, 0, beepgain, "sine");
// 	busytone = setInterval(function () {
// 		playiso(480, 500, 0, beepgain, "sine");
// 		playiso(620, 500, 0, beepgain, "sine");
// 	}, 1000);
// }, function () {
// 	clearInterval(busytone);
// });
// British
// bindkey("dash", "Busy", function () {
// 	playiso(400, 375, 0, beepgain, "sine");
// 	busytone = setInterval(function () {
// 		playiso(400, 375, 0, beepgain, "sine");
// 	}, 750);
// }, function () {
// 	clearInterval(busytone);
// });
// Singapore
// bindkey("dash", "Busy", function () {
// 	playiso(400, 125, 0, beepgain, "sine");
// 	setTimeout(function () {
// 		playiso(400, 125, 0, beepgain, "sine");
// 	}, 250);
// 	setTimeout(function () {
// 		playiso(400, 125, 0, beepgain, "sine");
// 	}, 500);
// });
// Manual
bindkey("dash", "Busy", function () {
	busytone1 = playiso(400, "callback", 0, 0.15, "sine");
	// busytone2 = playiso(400, "callback", 0, 0.05, "square");
}, function () {
	busytone1();
	// busytone2();
});


var tones = [];
var beepgain = 0.15;
bindkey("open_bracket", "Dial Stolen Stone Phone", function () {
	playiso(1477, 150, 0, beepgain, "sine");
	playiso(852, 150, 0, beepgain, "sine");
	setTimeout(function () {
		playiso(1209, 150, 0, beepgain, "sine");
		playiso(697, 150, 0, beepgain, "sine");
	}, 200);
	setTimeout(function () {
		playiso(1336, 150, 0, beepgain, "sine");
		playiso(697, 150, 0, beepgain, "sine");
	}, 402);
	setTimeout(function () {
		playiso(1209, 160, 0, beepgain, "sine");
		playiso(697, 160, 0, beepgain, "sine");
	}, 600);
	setTimeout(function () {
		playiso(1336, 150, 0, beepgain, "sine");
		playiso(941, 150, 0, beepgain, "sine");
	}, 800);
	setTimeout(function () {
		playiso(1336, 150, 0, beepgain, "sine");
		playiso(941, 150, 0, beepgain, "sine");
	}, 990);
	setTimeout(function () {
		playiso(1209, 150, 0, beepgain, "sine");
		playiso(852, 150, 0, beepgain, "sine");
	}, 1223);
	setTimeout(function () {
		playiso(1209, 150, 0, beepgain, "sine");
		playiso(852, 150, 0, beepgain, "sine");
	}, 1392);
});
// bindkey("dash", "Dial 1", function () {
// 	tones[0] = [];
// 	tones[0][0] = playiso(1209, "callback", 0, beepgain, "sine");
// 	tones[0][1] = playiso(697, "callback", 0, beepgain, "sine");
// }, function () {
// 	tones[0][0]();
// 	tones[0][1]();
// });
// bindkey("equal_sign", "Dial 2", function () {
// 	tones[1] = [];
// 	tones[1][0] = playiso(1336, "callback", 0, beepgain, "sine");
// 	tones[1][1] = playiso(697, "callback", 0, beepgain, "sine");
// }, function () {
// 	tones[1][0]();
// 	tones[1][1]();
// });
// bindkey("open_bracket", "Dial 3", function () {
// 	tones[2] = [];
// 	tones[2][0] = playiso(1477, "callback", 0, beepgain, "sine");
// 	tones[2][1] = playiso(697, "callback", 0, beepgain, "sine");
// }, function () {
// 	tones[2][0]();
// 	tones[2][1]();
// });
// bindkey("closebracket", "Dial 4", function () {
// 	tones[3] = [];
// 	tones[3][0] = playiso(1209, "callback", 0, beepgain, "sine");
// 	tones[3][1] = playiso(770, "callback", 0, beepgain, "sine");
// }, function () {
// 	tones[3][0]();
// 	tones[3][1]();
// });
// bindkey("backslash", "Dial 5", function () {
// 	tones[4] = [];
// 	tones[4][0] = playiso(1336, "callback", 0, beepgain, "sine");
// 	tones[4][1] = playiso(770, "callback", 0, beepgain, "sine");
// }, function () {
// 	tones[4][0]();
// 	tones[4][1]();
// });
// bindkey("semi_colon", "Dial 6", function () {
// 	tones[5] = [];
// 	tones[5][0] = playiso(1477, "callback", 0, beepgain, "sine");
// 	tones[5][1] = playiso(770, "callback", 0, beepgain, "sine");
// }, function () {
// 	tones[5][0]();
// 	tones[5][1]();
// });
// bindkey("single_quote", "Dial 7", function () {
// 	tones[6] = [];
// 	tones[6][0] = playiso(1209, "callback", 0, beepgain, "sine");
// 	tones[6][1] = playiso(852, "callback", 0, beepgain, "sine");
// }, function () {
// 	tones[6][0]();
// 	tones[6][1]();
// });
// bindkey("comma", "Dial 8", function () {
// 	tones[7] = [];
// 	tones[7][0] = playiso(1336, "callback", 0, beepgain, "sine");
// 	tones[7][1] = playiso(852, "callback", 0, beepgain, "sine");
// }, function () {
// 	tones[7][0]();
// 	tones[7][1]();
// });
// bindkey("period", "Dial 9", function () {
// 	tones[8] = [];
// 	tones[8][0] = playiso(1477, "callback", 0, beepgain, "sine");
// 	tones[8][1] = playiso(852, "callback", 0, beepgain, "sine");
// }, function () {
// 	tones[8][0]();
// 	tones[8][1]();
// });
// bindkey("forward_slash", "Dial 0", function () {
// 	tones[9] = [];
// 	tones[9][0] = playiso(1336, "callback", 0, beepgain, "sine");
// 	tones[9][1] = playiso(941, "callback", 0, beepgain, "sine");
// }, function () {
// 	tones[9][0]();
// 	tones[9][1]();
// });

var sbinds = [
{
	name: "kidnapped",
	verbal: "Kidnapped",
	key: "1"
},
{
	name: "bowl",
	verbal: "Bowling Alley",
	key: "2"
},
{
	name: "street",
	verbal: "Street",
	key: "3"
},
{
	name: "beach",
	verbal: "Beach",
	key: "4"
},
{
	name: "classroom",
	verbal: "Classroom",
	key: "5"
},
{
	name: "schcampus",
	verbal: "School Campus",
	key: "6"
},
{
	name: "office",
	verbal: "Office",
	key: "7"
},
{
	name: "flashback",
	verbal: "3 years later",
	key: "8"
},
{
	name: "mur",
	verbal: "4 Rounds",
	key: "9"
},
{
	name: "blank",
	verbal: "Blank",
	key: "0"
},
];

sbinds.forEach(function (obj) {
	bindkey(obj.key, "slide: " + obj.verbal, function () {
		socket.emit("data", {
			name: obj.name
		})
	});
});

// bindkey("BACKSPACE", "Stop All", function () {
bindkey("BACKSPACE", "Stop All", function () {
	stopall();
});

updatekeys();




function playiso(freq, time, detune, gain, type) {
	var osc = context.createOscillator();
	// var volume = context.createGainNode();
	var volume = context.createGain();
	volume.gain.value = gain;
	osc.type = type;
	osc.frequency.value = freq;
	osc.detune.value = detune;
	osc.connect(volume);
	volume.connect(mastergain);
	mastergain.connect(context.destination);
	// osc.setWaveTable(waveTable);
	// osc.connect(audio_context.destination);
	osc.start(0);
	if (time == "callback") {
		return function () {
			osc.stop(context.currentTime);
		}
	}
	else if (time > 0) {
		// setTimeout(function() {
			osc.stop(context.currentTime + time / 1000);
		// }, time);
	}
}

// playiso(40, 0, 0.4, "sine");
// playiso(40, 0, 0.2, "triangle");




// var win = window.open("/projection", "projection", "width=640,height=480,left=720,top=0");
// window.addEventListener("unload", function () {
// 	win.close();
// })