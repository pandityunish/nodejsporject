
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRouters");
const PORT = process.env.PORT || 3000;
const app = express();
const socket = require("socket.io");
const messageRouter = require("./routers/messageRouter");
const adminRouter = require("./routers/adminRouter");
const queryRouter = require("./routers/queryRouter");
const User = require("./models/User");
const profileRouter = require("./controller/profileController");

app.use(express.json());
app.use(authRouter);
app.use(messageRouter);
app.use(adminRouter);
app.use(queryRouter);
app.use(profileRouter)
let clients = new Map();
let users = new Map();

let db = process.env.MONGO_URL || "mongodb+srv://freerishteywala:freerishteywala@cluster0.qqqubx5.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db).then(() => {
  console.log("Connected successfully");
  
}).catch((e) => {
  console.log(e);
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("Connected to " + PORT);
});

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const chatNamespace = io.of('/chat'); // Create a chat namespace
chatNamespace.on("connection", (socket) => {
  console.log(socket.id, "has joined the chat namespace");
  // Your chat socket logic here
  socket.on("signin", (id) => {
    clients.set(id, socket.id);
  });
  socket.on("message", (msg) => {
    let targetId = msg.targetId;
    const sendUserSocket = clients.get(targetId);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("message", msg);
    }
  });
});

const buttonsNamespace = io.of('/buttons'); // Create a buttons namespace
buttonsNamespace.on("connection", (socket) => {
  console.log(socket.id, "has joined the buttons namespace");
  // Your buttons socket logic here
  socket.on("usersignin", (id) => {
    users.set(id, socket.id);
  });
  socket.on("connectbutton", (msg) => {
    let targetId = msg.targetId;
    const sendUserSocket = users.get(targetId);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("connectbutton", msg);
    }
  });
});
