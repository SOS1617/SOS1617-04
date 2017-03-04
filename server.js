var express = require("express");
var moment = require("moment");
var path = require("path");

var port = (process.env.PORT || 8080);
var date = moment().utcOffset(1).format('Do MMMM of YYYY, HH:mm:ss');

var app = express();

app.use("/", express.static( path.join(__dirname,"public")));
app.get("/time", (req, res) => {
    res.send("<html><body><h1>" + date + "</h1></body></html>");

});

app.listen(port,()=> {
     console.log("Magic is happening in port " + port);
}).on("error", (e) => {
    console.log("Server can not be started: " + e);
    process.exit(1);
});

