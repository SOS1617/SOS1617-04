var express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require('path');


var app = express();


var MongoClient = require('mongodb').MongoClient;
var mURL = "mongodb://test:test@ds137370.mlab.com:37370/sandbox";


var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1";

var dbAlberto;
var dbLuis;
var dbAdrian;
app.use(bodyParser.json()); //use default json enconding/decoding
app.use(helmet()); //improve security

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


    app.listen(port, () => {
        console.log("Magic is happening on port " + port);


    });
});




/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                                            API     ALBERTO
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/
app.get(BASE_API_PATH + "/export-and-import/loadInitialData", function(req, res) {
    dbAlberto.find({}).toArray(function(err, stats) {
        if (err) {
            console.error('WARNING: Error while getting initial data from DB');
            return 0;
        }
        if (stats.length === 0) {
            var initialStats = [{
                "province": "jaen",
                "year": "2013",
                "oil": "375",
                "importS": "802",
                "exportS": "274"
            }, {
                "province": "huelva",
                "year": "2013",
                "oil": "385",
                "importS": "772",
                "exportS": "84"
            }, ];

            dbAlberto.insert(initialStats);
            console.log("Date insert in db");
            res.sendStatus(201);
        }
        else {
            console.log("DB not empty")
        }
    });
});


// GET a collection
app.get(BASE_API_PATH + "/export-and-import", function(request, response) {
    console.log("INFO: New GET request to /export-and-import");
    dbAlberto.find({}).toArray(function(err, sExport) {
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

app.get(BASE_API_PATH + "/export-and-import/:province", function(request, response) {
    var province = request.params.province;

    if (!province) {
        console.log("WARNING: New GET request to /export-and-import-stats/:name without name, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New GET request to /export-and-import-stats/" + province);
        dbAlberto.find({
            province: province
        }).toArray(function(err, sExport) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                if (sExport.length > 0) {
                    var a = sExport[0];
                    console.log("INFO: Sending stats: " + JSON.stringify(sExport, 2, null));
                    response.send(a);
                }
                else {
                    console.log("WARNING: There are not any export stats with name " + province);
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});





//GET all stats of one year
app.get(BASE_API_PATH + "/export-and-import/:province/:year", function(request, response) {
    var province = request.params.province;
    var year = request.params.year;
    if (!province) {
        console.log("WARNING: New GET request to /export-and-import/ without province, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New GET request to /export-and-import/" + province);
        dbAlberto.find({
            province: province,
            year: year
        }).toArray(function(err, sExport) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                if (sExport.length > 0) {
                    console.log("INFO: Sending stats: " + JSON.stringify(sExport, 2, null));
                    response.send(sExport);
                }
                else {
                    console.log("WARNING: There are not any export stats with name " + province + " and " + year);
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});




//POST over a collection
app.post(BASE_API_PATH + "/export-and-import", function(request, response) {
    var newStats = request.body;
    if (!newStats) {
        console.log("WARNING: New POST request to /export-and-import without stats, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New POST request to /export-and-import with body: " + JSON.stringify(newStats, 2, null));
        if (!newStats.province || !newStats.year || !newStats.oil || !newStats.importS || !newStats.exportS) {
            console.log("WARNING: The stat " + JSON.stringify(newStats, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        }
        else {
            dbAlberto.find({
                province: newStats.province,
                year: newStats.year
            }).toArray(function(err, sExport) {
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
                        dbAlberto.insert(newStats);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//POST over a single resource
app.post(BASE_API_PATH + "/export-and-import/:province/:year", function(request, response) {
    var province = request.params.province;
    var year = request.params.year;

    console.log("WARNING: New POST request to /export-and-import-stats/" + province + " and " + year + ", sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a collection
app.put(BASE_API_PATH + "/export-and-import", function(request, response) {
    console.log("WARNING: New PUT request to /export-and-import-stats, sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a single resource
app.put(BASE_API_PATH + "/export-and-import/:province/:year", function(request, response) {
    var updateExp = request.body;
    var province = request.params.province;
    var year = request.params.year;

    if (!updateExp) {
        console.log("WARNING: New PUT request to /export-and-import-stats/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New PUT request to /export-and-import-stats/" + province + " with data " + JSON.stringify(updateExp, 2, null));
        if (!updateExp.province || !updateExp.year || !updateExp.oil || !updateExp.importS || !updateExp.exportS) {
            console.log("WARNING: The contact " + JSON.stringify(updateExp, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        }
        else {
            dbAlberto.find({
                province: province,
                $and: [{
                    year: year
                }]
            }).toArray(function(err, sExport) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (sExport.length > 0) {
                        dbAlberto.update({
                            province: province,
                            year: year
                        }, updateExp);
                        console.log("INFO: Modifying contact with name " + province + " with data " + JSON.stringify(updateExp, 2, null));
                        response.send(updateExp); // return the updated contact
                    }
                    else {
                        console.log("WARNING: There are not any stats with provinc " + province);
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    }
});


//DELETE over a collection
app.delete(BASE_API_PATH + "/export-and-import", function(request, response) {
    console.log("INFO: New DELETE request to /export-and-import-stats");
    dbAlberto.remove({}, {
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
app.delete(BASE_API_PATH + "/export-and-import/:province/:year", function(request, response) {
    var province = request.params.province;
    var year = request.params.year;

    if (!province || !year) {
        console.log("WARNING: New DELETE request to /export-and-import-stats/:name without name, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New DELETE request to /export-and-import-stats/" + province + " and " + year);
        dbAlberto.remove({
            province: province,
            year: year
        }, {}, function(err, numRemoved) {
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                console.log("INFO: Stats removed: " + numRemoved);
                if (numRemoved === 1) {
                    console.log("INFO: The state with name " + province + "and year " + year + " has been succesfully deleted, sending 204...");
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


/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                                            API     LUIS
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/


// El recurso debe contener una ruta /api/v1/XXXXX/loadInitialData que al hacer un GET cree 2 o más datos en la base de datos si está vacía.
app.get(BASE_API_PATH + "/price-stats/loadInitialData", function (request, response) {
    console.log("INFO: Creando datos");

    var datos = [{
        "month": "Octubre",
        "price-aceite-oliva-total-euros-t": 3.416,
        "price-virgen-extra-euros-t": 3.71,
        "price-virgen-euros-t": 3.42
    }];
        dbLuis.insert(datos);
        
    response.redirect(200, BASE_API_PATH + "/");
});

// Base GET
app.get(BASE_API_PATH + "/", function (request, response) {
    console.log("INFO: Redirecting to /price-stats");
    response.redirect(301, BASE_API_PATH + "/price-stats");
});


// GET a collection
app.get(BASE_API_PATH + "/price-stats", function (request, response) {
    console.log("INFO: New GET request to /price-stats");
    dbLuis.find({}).toArray(function (err, price) {
        if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            console.log("INFO: Sending price-stats: " + JSON.stringify(price, 2, null));
            response.send(price);
        }
    });
});



// GET a un año
app.get(BASE_API_PATH + "/price-stats/:anyo", function (request, response) {
    var anyo = request.params.anyo;
    if (!anyo) {
        console.log("WARNING: New GET request to /price-stats/:anyo without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /price-stats/" + anyo);
        dbLuis.find({}, function (err, contacts) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            } else {
                var filtered = contacts.filter((m) => {
                    return (m.name.localeCompare(anyo, "en", {'sensitivity': 'base'}) === 0);
                });
                if (filtered.length > 0) {
                    var m = filtered[0]; //since we expect to have exactly ONE contact with this name
                    console.log("INFO: Sending contact: " + JSON.stringify(m, 2, null));
                    response.send(m);
                } else {
                    console.log("WARNING: There are not any " + anyo);
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});


//POST crea un anyo
app.post(BASE_API_PATH + "/price-stats", function (request, response) {
    var newContact = request.body;
    if (!newContact) {
        console.log("WARNING: New POST request to /price-stats/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /price-stats with body: " + JSON.stringify(newContact, 2, null));
        if (!newContact.name || !newContact.phone || !newContact.email) {
            console.log("WARNING: " + JSON.stringify(newContact, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            dbLuis.find({}, function (err, contacts) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var contactsBeforeInsertion = contacts.filter((contact) => {
                        return (contact.name.localeCompare(newContact.name, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (contactsBeforeInsertion.length > 0) {
                        console.log("WARNING: The contact " + JSON.stringify(newContact, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding contact " + JSON.stringify(newContact, 2, null));
                        dbLuis.insert(newContact);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//POST over a single resource
app.post(BASE_API_PATH + "/price-stats/:anyo", function (request, response) {
    var name = request.params.anyo;
    console.log("WARNING: New POST request to /price-stats/" + name + ", sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a collection
app.put(BASE_API_PATH + "/price-stats", function (request, response) {
    console.log("WARNING: New PUT request to /price-stats, sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a single resource
app.put(BASE_API_PATH + "/price-stats/:name", function (request, response) {
    var updatedContact = request.body;
    var name = request.params.name;
    if (!updatedContact) {
        console.log("WARNING: New PUT request to /price-stats/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /price-stats/" + name + " with data " + JSON.stringify(updatedContact, 2, null));
        if (!updatedContact.name || !updatedContact.phone || !updatedContact.email) {
            console.log("WARNING: The contact " + JSON.stringify(updatedContact, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            dbLuis.find({}, function (err, contacts) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var contactsBeforeInsertion = contacts.filter((contact) => {
                        return (contact.name.localeCompare(name, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (contactsBeforeInsertion.length > 0) {
                        dbLuis.update({name: name}, updatedContact);
                        console.log("INFO: Modifying contact with name " + name + " with data " + JSON.stringify(updatedContact, 2, null));
                        response.send(updatedContact); // return the updated contact
                    } else {
                        console.log("WARNING: There are not any contact with name " + name);
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    }
});


//DELETE over a collection
app.delete(BASE_API_PATH + "/price-stats", function (request, response) {
    console.log("INFO: New DELETE request to /price-stats");
    dbLuis.remove({}, {multi: true}, function (err, numRemoved) {
        if (err) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (numRemoved > 0) {
                console.log("INFO: All the price-stats (" + numRemoved + ") have been succesfully deleted, sending 204...");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no contacts to delete");
                response.sendStatus(404); // not found
            }
        }
    });
});


//DELETE over a single resource
app.delete(BASE_API_PATH + "/price-stats/:anyo", function (request, response) {
    var name = request.params.anyo;
    if (!name) {
        console.log("WARNING: New DELETE request to /price-stats/:name without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE request to /price-stats/" + name);
        dbLuis.remove({name: name}, {}, function (err, numRemoved) {
            if (err) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Contacts removed: " + numRemoved);
                if (numRemoved === 1) {
                    console.log("INFO: The contact with name " + name + " has been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no contacts to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});

/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                                            API     ADRIAN
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/
