var express = require("express");
var moment = require("moment");

var port = (process.env.port || 8080);
var date = moment().utcOffset(1).format('Do MMMM of YYYY, HH:mm:ss');

var app = express();

app.get("/time", (req, res) => {
    res.send("<html><body><h1>" + date + "</h1></body></html>");

});

app.listen(port,(err)=> {
    if(!err)
        console.log("Server initialized on port " + port);
    else
        console.log("ERROR initialized server on port " + port+": "+err);
});

