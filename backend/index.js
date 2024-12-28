const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for joining a specific room
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  // Listen for messages and send them to the specific room
  socket.on("send_message", ({ room, user, text }) => {
    io.to(room).emit("receive_message", { user, text });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});


const authRoute = require("./Routes/AuthRoute");
const userRoute = require("./Routes/UserRoute");

const { MONGO_URL, PORT } = process.env;

// MongoDB Connection
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

// Middleware Setup
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/users", userRoute); // Use '/api/users' for user-related endpoints
app.use("/api/auth", authRoute); // Use '/api/auth' for authentication-related endpoints

// Server Initialization
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
