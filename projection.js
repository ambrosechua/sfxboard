
var socket = io.connect();

var trg = {
	"blank": blank,
	"mur": mur,
	"flashback": flashback,
	"kidnapped": kidnapped
};

$(".slide").fadeOut(0);

socket.on("data", function (data) {
	// console.log(data.name);
	if (typeof trg[data.name] == "function") {
		trg[data.name]();
	}
	else {
		blank();
		$("#" + data.name).fadeIn(2000);
	}
});

function mur() {
	$(".slide").fadeOut(0);
	$("#mur").fadeIn(0);
	setTimeout(function () {
		$("#mur").fadeOut(0);
	}, 100);
	setTimeout(function () {
		$("#mur").fadeIn(0);
	}, 200);
	setTimeout(function () {
		$("#mur").fadeOut(0);
	}, 300);
	setTimeout(function () {
		$("#mur").fadeIn(0);
	}, 500);
	// setTimeout(function () {
	// 	$("#mur").fadeIn(0);
	// }, 400);
	// setTimeout(function () {
	// 	$("#mur").fadeOut(0);
	// }, 500);
	// setTimeout(function () {
	// 	$("#mur").fadeIn(0);
	// }, 700);
}

function flashback() {
	blank();
	$("#flashback").fadeIn(0);
	$("#flashback").css("transition", "none");
	$("#flashback").css("transform", "translateX(-100%) translateZ(0)");
	$("#flashback").css("-webkit-filter", "blur(0)");
	$("#flashback").css("opacity", "1");
	setTimeout(function () {
	$("#flashback").fadeIn(0);
	$("#flashback").css("transition", "5s linear transform, 6s linear opacity, 6s 1s -webkit-filter");
	$("#flashback").css("transform", "translateX(100%) translateZ(0)");
	$("#flashback").css("-webkit-filter", "blur(5px)");
	$("#flashback").css("opacity", "0");
	}, 16);
	setTimeout(function () {
	$(".slide").fadeOut(0);
	}, 4000);
}

function kidnapped() {
	$(".slide").fadeOut(0);
	$("#kidnapped").fadeIn(0);
}

function blank() {
	if ($("#kidnapped").css("display") != "none") {
		$(".slide").fadeOut(0);
		return;
	}
	$(".slide").fadeOut(2000);
}