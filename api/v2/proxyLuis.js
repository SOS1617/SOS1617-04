app.get("/proxyLuis", (req, res) => {
    
    var http = require("http");
    
    var options = {
        host: "sos1617-03.herokuapp.com",
        path: "/api/v1/results/?apikey=apisupersecreta"
    }
    
    callback = function(response){
        var str = '';
        
        response.on('data', function(chunk) {
            str += chunk;
        });
        
        response.on('end', function() {
            res.send(str);
        });
        
        http.request(options, callback).end();
    }
    
});