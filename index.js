const express=require("express");
const mongoose=require("mongoose");
const authRouter = require("./routers/authRouters");
const PORT=process.env.PORT|| 3000;
const app =express();
const socket=require("socket.io");
const messageRouter = require("./routers/messageRouter");

app.use(express.json());
app.use(authRouter);
app.use(messageRouter);
var clients = {};

let db= process.env.MONGO_URL||"mongodb+srv://freerishteywala:freerishteywala@cluster0.qqqubx5.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db).then(()=>{
    console.log("Conected successfully")
}).catch((e)=>{
    console.log(e);
});
const server= app.listen(PORT,"0.0.0.0",()=>{
    console.log("Connected to "+PORT);
});
var io=socket(server,{
    cors:{
        origin:"*",
        credentials:true,

    },

});
io.on("connection", (socket) => {
    // console.log("connetetd");
    // console.log(socket.id, "has joined");
    socket.on("signin", (id) => {
      console.log(id);
      clients[id] = socket;
      console.log(clients);
    });
    socket.on("message", (msg) => {
    //   console.log(msg);
      let targetId = msg.targetId;
      if (clients[targetId]) clients[targetId].emit("message", msg);
    });
  });
  

