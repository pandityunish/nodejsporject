
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
const DeleteUser = require("./models/DeleteModel");
const adsRouter = require("./routers/adsRouter");
const editprofileRouter = require("./controller/editprofileController");

app.use(express.json());
app.use(authRouter);
app.use(messageRouter);
app.use(adminRouter);
app.use(queryRouter);
app.use(editprofileRouter);

app.use(profileRouter);
app.use(adsRouter)
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
  deleteDuplicateUsers();
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
const videocall = io.of('/videocall');
videocall.on("connection", (socket) => {
  console.log(socket.user, "Connected");
  socket.join(socket.user);

  socket.on("makeCall", (data) => {
    let calleeId = data.calleeId;
    let sdpOffer = data.sdpOffer;

    socket.to(calleeId).emit("newCall", {
      callerId: socket.user,
      sdpOffer: sdpOffer,
    });
  });

  socket.on("answerCall", (data) => {
    let callerId = data.callerId;
    let sdpAnswer = data.sdpAnswer;

    socket.to(callerId).emit("callAnswered", {
      callee: socket.user,
      sdpAnswer: sdpAnswer,
    });
  });

  socket.on("IceCandidate", (data) => {
    let calleeId = data.calleeId;
    let iceCandidate = data.iceCandidate;

    socket.to(calleeId).emit("IceCandidate", {
      sender: socket.user,
      iceCandidate: iceCandidate,
    });
  });
});
 async function deleteDuplicateUsers() {
 // Replace 'users' with your actual collection name

  // Identify duplicates using aggregation
  const result = await User.aggregate([
    {
      $group: {
        _id: { username: '$puid', email: '$email' }, // Specify the fields to identify duplicates
        count: { $sum: 1 },
        duplicates: { $addToSet: '$_id' },
      },
    },
    {
      $match: {
        count: { $gt: 1 }, // Filter groups with more than one document (duplicates)
      },
    },
  ]).exec();

  // Delete duplicates
  for (const group of result) {
    const duplicates = group.duplicates.slice(1); // Keep one document, delete the rest
    await User.deleteMany({ _id: { $in: duplicates } });
  }

  console.log('Duplicate users deleted successfully');
}