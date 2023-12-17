// const express=require("express");
// const mongoose=require("mongoose");
// const authRouter = require("./routers/authRouters");
// const PORT=process.env.PORT|| 3000;
// const app =express();
// const socket=require("socket.io");
// const messageRouter = require("./routers/messageRouter");
// const adminRouter = require("./routers/adminRouter");
// const queryRouter = require("./routers/queryRouter");

// app.use(express.json());
// app.use(authRouter);
// app.use(messageRouter);
// app.use(adminRouter);
// app.use(queryRouter);
// let clients =new Map();
// let users =new Map();

// let db= process.env.MONGO_URL||"mongodb+srv://freerishteywala:freerishteywala@cluster0.qqqubx5.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(db).then(()=>{
//     console.log("Conected successfully")
// }).catch((e)=>{
//     console.log(e);
// });
// const server= app.listen(PORT,"0.0.0.0",()=>{
//     console.log("Connected to "+PORT);
// });
// var io=socket(server,{
//     cors:{
//         origin:"*",
//         credentials:true,

//     },

// });
// var io2=socket(server,{
//   cors:{
//       origin:"*",
//       credentials:true,

//   },

// });
// io.on("connection", (socket) => {
//     // console.log("connetetd");
//     console.log(socket.id, "has joined");
//     global.chatSocket=socket;
//     console.log(clients);
//     socket.on("signin", (id) => {
//       console.log(id);
//     //   clients[id] = socket;
//     clients.set(id,socket.id);
//       console.log(clients);
//     });
//     socket.on("message", (msg) => {
//       console.log(msg);
//     console.log(clients);
//       let targetId = msg.targetId;
//       const sendUserSocket=clients.get(targetId);
//       if (sendUserSocket)
//       console.log(sendUserSocket);
//        socket.to(sendUserSocket).emit("message",msg)
//     });
//   });
//   io2.on("buttons", (socket) => {
//     // console.log("connetetd");
//     console.log(socket.id, "has joined");
//     global.buttonSocket=socket;
//     console.log(users);
//     socket.on("usersignin", (id) => {
//       console.log(id);
//     //   clients[id] = socket;
//     users.set(id,socket.id);
//       console.log(users);
//     });
//     socket.on("connectbutton", (msg) => {
//       let targetId = msg.targetId;
//       const sendUserSocket=clients.get(targetId);
//       if (sendUserSocket)
//        socket.to(sendUserSocket).emit("connect",msg)
//     });
//   });
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

app.use(express.json());
app.use(authRouter);
app.use(messageRouter);
app.use(adminRouter);
app.use(queryRouter);

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
