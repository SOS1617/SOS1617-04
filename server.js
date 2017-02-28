var express = require("express");
var moment=require("moment");
var date = moment().format('Do MMMM of YYYY, HH:mm:ss');
var app = express();

app.get("/time", (req, res) => {
    res.send(date);

});

app.listen(8080);
