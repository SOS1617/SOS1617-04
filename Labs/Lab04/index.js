//var cool = require("cool-ascii-faces");
var express = require("express");
var moment = require("moment");
var date = moment().format('Do MMMM of YYYY, HH:mm:ss');
var app = express();

app.get("/time", (request, response) => {
    response.send(date);
});

console.log(date);

//app.listen(8080);

var port = (process.env.PORT || 16778);
//PORT -> variable que nos da c9 que nos dice el puerto del sistema

app.listen(port, (err) => {
    if (!err)
        console.log("Server initialized on port " + port);
    else
        console.log("ERROR initializing server on port " + port + ": " + err);
});
