require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport");
let list = require("./models/list");
let List = require("./models/list.model");
const http = require("http");
const app2 = require("express")();
const http2 = require("http").createServer(app2);
const io = require("socket.io")(http2);
const moment = require("moment");
// const server2 = require("http").createServer();
// const io = require("socket.io")(server2, {
//   transports: ["websocket", "polling"]
// });

const MONGODB_URI = process.env.MONGODB_URI;
console.log("Connecting DB to ", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    let data1 = await List.insertMany(list);
    console.log(data1);
  })
  .catch(err => console.error("Error connecting to mongo", err));

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://clientnetlify.netlify.app"] //Swap this with the client url
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "secret",
    cookie: { maxAge: 1000 * 60 * 60 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("dev"));

const index = require("./routes/index");
const auth = require("./routes/auth");

/**CHANGE THIS**/
app.use("/api", index);
app.use("/api", auth);

/*****/

/**ADD THIS**/
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
/*****/

// const server = http.createServer(app);

// io.on("connection", function(socket) {
//   console.log(`${socket.id} is connected`);
// });

// io.on("connection", socket => {
//   socket.on("message", ({ name, message }) => {
//     io.emit("message", { name, message });
//   });
// });

let users = [];
io.on("connection", socket => {
  socket.on("login", userName => {
    if (users.length == 0)
      users.push({
        id: socket.id,
        userName: userName,
        connectionTime: new moment().format("YYYY-MM-DD HH:mm:ss")
      });

    let arr = users.filter(x => x.userName == userName);
    if (arr.length == 0) {
      users.push({
        id: socket.id,
        userName: userName,
        connectionTime: new moment().format("YYYY-MM-DD HH:mm:ss")
      });
    }
    console.log("users", users);

    // socket.emit("connecteduser", JSON.stringify(users[users.length - 1]));
    let arr2 = users.filter(x => x.userName == userName);
    socket.emit("connecteduser", JSON.stringify(arr2[0]));
    io.emit("users", JSON.stringify(users));
  });

  socket.on("sendMsg", msgTo => {
    msgTo = JSON.parse(msgTo);
    const minutes = new Date().getMinutes();
    io.emit(
      "getMsg",
      JSON.stringify({
        id: socket.id,
        userName: users.find(e => e.id == msgTo.id).userName,
        msg: msgTo.msg,
        time:
          new Date().getHours() + ":" + (minutes < 10 ? "0" + minutes : minutes)
      })
    );
  });

  socket.once("disconnect", () => {
    let index = -1;
    if (users.length >= 0) {
      index = users.findIndex(e => e.id == socket.id);
    }
    if (index >= 0) users.splice(index, 1);
    io.emit("users", JSON.stringify(users));
  });
});

http2.listen(4000, function() {
  console.log("listening on port 4000");
});
const getApiAndEmit = "TODO";

module.exports = app;
