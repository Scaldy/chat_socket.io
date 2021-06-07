const express = require("express");
const app = express();
const path = require("path");
const SocketIO = require("socket.io");

// Settings
app.set("port", process.env.PORT || 3000);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Start the Server
const server = app.listen(app.get("port"), () => {
	console.log("Server on port", app.get("port"));
});

// WebSockets
const io = SocketIO(server);

io.on("connection", (socket) => {
	console.log("new connection ", socket.id);

	socket.on("chat:message", (data) => {
		io.sockets.emit("chat:messageServer", data);
	});

	socket.on("chat:typing", (data) => {
		socket.broadcast.emit("chat:typing", data);
	});
});
