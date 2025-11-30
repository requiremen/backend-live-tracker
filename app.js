const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    
    socket.on("send-location", (data) => {
        io.emit("received-location", { id: socket.id, ...data });
    });

    
    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);

        // Notify all other clients
        io.emit("user-disconnected", socket.id);
    });
});




app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
