var express = require("express");
var moment=require("moment");
var date = moment().utcOffset(1).format('Do MMMM of YYYY, HH:mm:ss');
var app = express();

app.get("/time", (req, res) => {
    res.send("<html><body><h1>"+date+"</h1></body></html>");

});

app.listen(8080);
