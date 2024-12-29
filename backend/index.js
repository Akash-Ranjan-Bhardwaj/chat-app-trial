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

let users = {}; // Track connected users by their socket ids

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Track the user with their socket id
  socket.on("register_user", (username) => {
    users[username] = socket.id;
    console.log(`User registered: ${username} with socket ID: ${socket.id}`);
  });

  // Listen for sending messages to a specific user
  socket.on("send_message", ({ toUser, fromUser, text }) => {
    const toSocketId = users[toUser];
    if (toSocketId) {
      io.to(toSocketId).emit("receive_message", { user: fromUser, text });
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    // Remove the user from the tracking list when they disconnect
    for (const [username, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[username];
        console.log(`User disconnected: ${username}`);
      }
    }
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
