
var socket = io.connect();

var trg = {
	"slidea": a,
	"slideb": b,
	"blank": blank
};

$(".slide").fadeOut(0);

socket.on("data", function (data) {
	console.log(data.name);
	trg[data.name]();
});

function blank() {
	$(".slide").fadeOut(0);
	// Blanks the slide
}

function b() {
	// Do something to set up the UI.
}

function a() {
	// Do something to set up the UI.
}