var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var app = http.createServer(handler);
var io = require("socket.io").listen(app, { log: false });

app.listen(process.env.PORT || 4224);
console.log("Listening on port " + (process.env.PORT || 4224));

var mimeTypes = {
		"html": "text/html",
		"jpeg": "image/jpeg",
		"jpg": "image/jpeg",
		"png": "image/png",
		"js": "text/javascript",
		"css": "text/css"
};

function handler(req, res) {
	// From http://stackoverflow.com/a/12164872/1716172
	var uri = url.parse(req.url).pathname;
	var filename = path.join(__dirname, unescape(uri));
	console.log("someone requested " + filename);
	var stats;
	try {
		stats = fs.lstatSync(filename); // throws if path doesn't exist
	}
	catch (e) {
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.write('404 Not Found\n');
		res.end();
		return;
	}
	if (stats.isFile()) {
		// path exists, is a file
		var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
		res.writeHead(200, {'Content-Type': mimeType} );
		var fileStream = fs.createReadStream(filename);
		fileStream.pipe(res);
	}
	else if (stats.isDirectory()) {
		// path exists, is a directory
		res.writeHead(200, {'Content-Type': 'text/plain'});
		try {
			stats = fs.lstatSync(path.join(filename, "index.html")); // throws if path doesn't exist
			var mimeType = mimeTypes[path.extname(path.join(filename, "index.html")).split(".")[1]];
			res.writeHead(200, {'Content-Type': mimeType} );
			var fileStream = fs.createReadStream(path.join(filename, "index.html"));
			fileStream.pipe(res);
		}
		catch (e) {
			res.write('Index of '+uri+'\n');
			res.write('TODO, show index?\n');
			res.end();
		}
	}
	else {
		// Symbolic link, other?
		// TODO: follow symlinks?  security?
		res.writeHead(500, {'Content-Type': 'text/plain'});
		res.write('500 Internal server error\n');
		res.end();
	}
}

io.sockets.on('connection', function (socket) {
	console.log("ip: " + socket.handshake.address.address + " connected");

	socket.on("data", function (data) {
		console.log(data);
		socket.broadcast.emit("data", data);
	})
});