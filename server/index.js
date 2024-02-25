const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const express = require("express");
const { Server } = require("socket.io");

const userRoute = require("./server/api/user");
const houseRoute = require("./server/api/house");
const favoriteRoute = require("./server/api/favorite");
const appointmentRoute = require("./server/api/appointment");
const conversationRoute = require("./server/api/conversation");
const messageRoute = require("./server/api/message");

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket
      .to(data.room)
      .emit("receive_message", { message: data.message, sender: data.sender });
  });
});

app.use("/api/user", userRoute);
app.use("/api/house", houseRoute);
app.use("/api/favorite", favoriteRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);

app.get("/api", (req, res) => {
  res.send("Hello!");
});

server.listen(port, () => {
  console.log(`Successfully connected to port ${port}`);
});
