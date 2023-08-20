const express = require('express')
const app = express()
const http = require('http')
const PORT = 3000
const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`User enter: ${socket.id}`);

    socket.on("join-room", (data) => {
        socket.join(data)
        console.log(`User sabi the chatroom ${socket.id} pon ${data} `);
    })

    socket.on("send-message", (data) => {
        console.log('MEssage Received:', data);
        socket.to(data.room).emit("receive-message", data);
    })

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    })

})

server.listen(PORT, () => console.log(`Server make ready on port ${PORT}`))