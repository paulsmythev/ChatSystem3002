const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient
var ObjectID = require("mongodb").ObjectID;

const formidable = require("formidable");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());
app.use(bodyParser.json());
const url = "mongodb://localhost:27017";
MongoClient.connect(url, {maxPoolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) {return console.log(err)}
    const dbName = "chatdb";
    const db = client.db(dbName);

    require("./routes/auth-login.js")(db, app);
    require("./routes/auth-read.js")(db, app);
    require("./routes/auth-logout.js")(db, app);

    require("./routes/users-create.js")(db, app);
    require("./routes/users-read.js")(db, app);
    require("./routes/users-delete.js")(db, app);
    require("./routes/users-update.js")(db, app);
    require("./routes/users-one.js")(db, app);

    require("./routes/groups-read.js")(db, app);
    require("./routes/groups-create.js")(db, app);
    require("./routes/groups-one.js")(db, app);
    require("./routes/groups-assigned.js")(db, app);
    require("./routes/groups-delete.js")(db, app);
    require("./routes/groups-current.js")(db, app);
    require("./routes/groups-users.js")(db, app);
    
    require("./routes/channels-create.js")(db, app);
    require("./routes/channels-read.js")(db, app);
    require("./routes/channels-delete.js")(db, app);
    require("./routes/channels-current.js")(db, app);
    require("./routes/channels-one.js")(db, app);
    require("./routes/channels-channel.js")(db, app);

    require("./routes/chat-read.js")(db, app);
    require("./routes/chat-create.js")(db, app);

    require("./routes/image-chat.js")(app, formidable);
    require("./routes/image-user.js")(app, formidable);
    
    require("./listen.js")(http);
});

//require('./sockets.js').connect(io ,3000);