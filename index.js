"use strict";
/* global __dirname */

var express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require('path');
var DataStore = require('nedb');

var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1";

var dbFileName = path.join(__dirname, 'sExport.db');

var db = new DataStore({
    filename: dbFileName,
    autoload: true
});

var app = express();

app.use(bodyParser.json()); //use default json enconding/decoding
app.use(helmet()); //improve security

// @see: https://curlbuilder.com/
// @see: https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
// @see: https://i.stack.imgur.com/whhD1.png
// @see: https://blog.agetic.gob.bo/2016/07/elegir-un-codigo-de-estado-http-deja-de-hacerlo-dificil/

console.log("---BEGIN PROBAR LA API CON CURL---");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/contacts'");
console.log("curl -v -XPOST -H 'Content-type: application/json' -d '{ \"name\": \"David\", \"phone\": \"954556350\", \"email\": \"david@example.com\" }' 'http://localhost:8080/api/v1/contacts'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/contacts/David'");
console.log("curl -v -XPUT -H 'Content-type: application/json' -d '{ \"name\": \"Antonio\", \"phone\": \"954556350\", \"email\": \"antonio@example.com\" }' 'http://localhost:8080/api/v1/contacts'");
console.log("curl -v -XPUT -H 'Content-type: application/json' -d '{ \"name\": \"Antonio\", \"phone\": \"954556350\", \"email\": \"antonio@example.com\" }' 'http://localhost:8080/api/v1/contacts/David'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/contacts/David'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/contacts/Antonio'");
console.log("curl -v -XDELETE -H 'Content-type: application/json'  'http://localhost:8080/api/v1/contacts/Antonio'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/contacts/Antonio'");
console.log("curl -v -XDELETE -H 'Content-type: application/json'  'http://localhost:8080/api/v1/contacts'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/contacts'");
console.log("---END PROBAR LA API CON CURL---");


db.find({}, function(err, sExport) {
    console.log('INFO: Initialiting DB...');

    if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }


    if (sExport.length === 0) {
        console.log('INFO: Empty DB, loading initial data');

        var initialExport = [{
            "province": "cordoba",
            "year": 2013,
            "oil": 300.7,
            "import": 57.6,
            "export": 57.6
        }, {
            "province": "cordoba",
            "year": 2014,
            "oil": 780.7,
            "import": 58.6,
            "export": 60.6
        }];

        db.insert(initialExport);
    }
    else {
        console.log('INFO: DB has ' + initialExport.length + ' stats ');
    }
});

// Base GET
app.get("/export-and-import-stats", function(request, response) {
    console.log("INFO: Redirecting to /export-and-import-stats");
    response.redirect(301, BASE_API_PATH + "/export-and-import-stats");
});


// GET a collection
app.get(BASE_API_PATH + "/export-and-import-stats", function(request, response) {
    console.log("INFO: New GET request to /export-and-import-stats");
    db.find({}, function(err, sExport) {
        if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        }
        else {
            console.log("INFO: Sending export and import stats: " + JSON.stringify(sExport, 2, null));
            response.send(sExport);
        }
    });
});


// GET a single resource
app.get(BASE_API_PATH + "/export-and-import-stats/:name", function(request, response) {
    var name = request.params.name;
    if (!name) {
        console.log("WARNING: New GET request to /export-and-import-stats/:name without name, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New GET request to /export-and-import-stats/" + name);
        db.find({
            "province": name
        }, function(err, sExport) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                if (sExport.length > 0) {
                    var stats = sExport[0]; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending contact: " + JSON.stringify(stats, 2, null));
                    response.send(stats);
                }
                else {
                    console.log("WARNING: There are not any export stats with name " + name);
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});


//POST over a collection
app.post(BASE_API_PATH + "/export-and-import-stats", function(request, response) {
    var newStats = request.body;
    if (!newStats) {
        console.log("WARNING: New POST request to /export-and-import-stats/ without stats, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New POST request to /export-and-import-stats with body: " + JSON.stringify(newStats, 2, null));
        if (!newStats.province || !newStats.year || !newStats.oil || !newStats.import || !newStats.export) {
            console.log("WARNING: The contact " + JSON.stringify(newStats, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        }
        else {
            db.find({}, function(err, sExport) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                }
                else {
                    var sExportBefore = sExport.filter((contact) => {
                        return (sExport.province.localeCompare(newStats.name, "en", {
                            'sensitivity': 'base'
                        }) === 0);
                    });
                    if (sExportBefore.length > 0) {
                        console.log("WARNING: The contact " + JSON.stringify(newStats, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    }
                    else {
                        console.log("INFO: Adding contact " + JSON.stringify(newStats, 2, null));
                        db.insert(newStats);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//POST over a single resource
app.post(BASE_API_PATH + "/export-and-import-stats/:name", function(request, response) {
    var name = request.params.name;
    console.log("WARNING: New POST request to /export-and-import-stats/" + name + ", sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a collection
app.put(BASE_API_PATH + "/export-and-import-stats", function(request, response) {
    console.log("WARNING: New PUT request to /export-and-import-stats, sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a single resource
app.put(BASE_API_PATH + "/export-and-import-stats/:name", function(request, response) {
    var updateExp = request.body;
    var name = request.params.name;
    if (!updateExp) {
        console.log("WARNING: New PUT request to /export-and-import-stats/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New PUT request to /export-and-import-stats/" + name + " with data " + JSON.stringify(updateExp, 2, null));
        if (!updateExp.province || !updateExp.year || !updateExp.oil || !updateExp.import || !updateExp.export) {
            console.log("WARNING: The contact " + JSON.stringify(updateExp, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        }
        else {
            db.find({}, function(err, sExport) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                }
                else {
                    var sExportBefore = sExport.filter((contact) => {
                        return (sExport.name.localeCompare(name, "en", {
                            'sensitivity': 'base'
                        }) === 0);
                    });
                    if (sExportBefore.length > 0) {
                        db.update({
                            name: name
                        }, updateExp);
                        console.log("INFO: Modifying contact with name " + name + " with data " + JSON.stringify(updateExp, 2, null));
                        response.send(updateExp); // return the updated contact
                    }
                    else {
                        console.log("WARNING: There are not any contact with name " + name);
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    }
});


//DELETE over a collection
app.delete(BASE_API_PATH + "/export-and-import-stats", function(request, response) {
    console.log("INFO: New DELETE request to /export-and-import-stats");
    db.remove({}, {
        multi: true
    }, function(err, numRemoved) {
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        }
        else {
            if (numRemoved > 0) {
                console.log("INFO: All the stats (" + numRemoved + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            }
            else {
                console.log("WARNING: There are no contacts to delete");
                response.sendStatus(404); // not found
            }
        }
    });
});


//DELETE over a single resource
app.delete(BASE_API_PATH + "/export-and-import-stats/:name", function(request, response) {
    var name = request.params.name;
    if (!name) {
        console.log("WARNING: New DELETE request to /export-and-import-stats/:name without name, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New DELETE request to /export-and-import-stats/" + name);
        db.remove({
            name: name
        }, {}, function(err, numRemoved) {
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                console.log("INFO: Stats removed: " + numRemoved);
                if (numRemoved === 1) {
                    console.log("INFO: The state with name " + name + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                }
                else {
                    console.log("WARNING: There are no contacts to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});


app.listen(port);
console.log("Magic is happening on port " + port);
