var express = require("express");
var bodyParser = require("body-parser");;
var helmet = require("helmet");
var path = require('path');
var app = express();
var folder = path.join(__dirname, '/public');

var MongoClient = require('mongodb').MongoClient;
var mURL = "mongodb://test:test@ds137370.mlab.com:37370/sandbox";

var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v3";

var moduleExport = require("./api/v3/exportModule.js");
var modulePrice = require("./api/v3/priceModule.js");
var moduleArea = require("./api/v3/areaModule.js");

var cors= require("cors");
var dbAlberto;
var dbLuis;
var dbAdrian;
app.use(cors());
app.use("/", express.static(path.join(__dirname, "public")));

app.use(bodyParser.json()); //use default json enconding/decoding
app.use(helmet()); //improve security

app.use("/",express.static(path.join(__dirname, 'public')));

app.use("/api/v3/tests", express.static(path.join(__dirname , "public/test.html")));

MongoClient.connect(mURL, {
    native_parser: true
}, function(err, database) {
    if (err) {
        console.log("CANNOT connect to database" + err);
        process.exit(1);
    }

    dbAlberto = database.collection("exports");
    dbLuis = database.collection("prices");
    dbAdrian = database.collection("area");

    moduleExport.register(app, dbAlberto, BASE_API_PATH);
    modulePrice.register(app, dbLuis, BASE_API_PATH);
    moduleArea.register(app, dbAdrian, BASE_API_PATH);

    app.listen(port, () => {
        console.log("Magic is happening on port " + port);
    });
});