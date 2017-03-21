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

// LoadInitialData
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
            res.sendStatus(201, BASE_API_PATH + "/");
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
        "province": "Sevilla",
        "year": 2016,
        "priceaceite": 3.416,
        "priceextra": 3.71,
        "pricevirgen": 3.42
    },{
        "province": "Huelva",
        "year": 2016,
        "priceaceite": 4.416,
        "priceextra-euros-t": 3.51,
        "pricevirgen": 3.92
    }];
        dbLuis.insert(datos);
        
    response.redirect(200, BASE_API_PATH + "/");
});

// Base GET
app.get(BASE_API_PATH + "/", function (request, response) {
    console.log("INFO: Redirecting to /price-stats");
    response.redirect(301, BASE_API_PATH + "/price-stats");
});

// A) GET a la ruta base (p.e. “/price-stats”) devuelve una lista con todos los recursos
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

// C) GET a un recurso (p.e. “/price-stats/Sevilla”) devuelve ese recurso 
app.get(BASE_API_PATH + "/price-stats/:province", function(request, response) {
    var province = request.params.province;

    if (!province) {
        console.log("WARNING: New GET request to /export-and-import-stats/:name without name, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New GET request to /export-and-import-stats/" + province);
        dbLuis.find({
            province: province
        }).toArray(function(err, sArea) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                if (sArea.length > 0) {
                    var a = sArea[0];
                    console.log("INFO: Sending stats: " + JSON.stringify(sArea, 2, null));
                    response.send(a);
                }
                else {
                    console.log("WARNING: There are not any area stats with name " + province);
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});

// B) POST a la ruta base (p.e. “/price-stats”) crea un nuevo recurso
app.post(BASE_API_PATH + "/price-stats", function (request, response) {
    var newPrice = request.body;
    if (!newPrice) {
        console.log("WARNING: New POST request to /price-stats/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /price-stats with body: " + JSON.stringify(newPrice, 2, null));
        if (!newPrice.province || !newPrice.year || !newPrice.priceaceite || !newPrice.pricevirgen || !newPrice.pricevirgen) {
            console.log("WARNING: " + JSON.stringify(newPrice, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            dbLuis.find({
                 province: newPrice.province,
                year: newPrice.year
            }).toArray(function (err, price) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var contactsBeforeInsertion = price.filter((price) => {
                        return (price.name.localeCompare(newPrice.name, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (contactsBeforeInsertion.length > 0) {
                        console.log("WARNING: The contact " + JSON.stringify(newPrice, 2, null) + " already extis, sending 409...");
                        response.sendStatus(409); // conflict
                    } else {
                        console.log("INFO: Adding contact " + JSON.stringify(newPrice, 2, null));
                        dbLuis.insert(newPrice);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});

// f) POST a un recurso (p.e. “/price-stats/Sevilla”) debe dar un error de método no permitido.
app.post(BASE_API_PATH + "/price-stats/:province", function (request, response) {
    var province = request.params.province;
    console.log("WARNING: New POST request to /price-stats/" + province + ", sending 405...");
    response.sendStatus(405); // method not allowed
});

// G) PUT a la ruta base (p.e. “/price-stats”) debe dar un error de método no permitido.
app.put(BASE_API_PATH + "/price-stats", function (request, response) {
    console.log("WARNING: New PUT request to /price-stats, sending 405...");
    response.sendStatus(405); // method not allowed
});


// E) PUT a un recurso (p.e. “/price-stats/Sevilla”) actualiza ese recurso 
app.put(BASE_API_PATH + "/price-stats/:province/:year", function (request, response) {
    var updated = request.body;
    var province = request.params.province;
    var year = request.params.year;
    if (!updated) {
        console.log("WARNING: New PUT request to /price-stats/ without stats, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT request to /price-stats/" + province + " with data " + JSON.stringify(updated, 2, null));
        if (!updated.province || !updated.year) {
            console.log("WARNING: The stat " + JSON.stringify(updated, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            dbLuis.find({
                province: province,
                year: year
            }).toArray(function(err, sArea) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (sArea.length > 0) {
                        dbAlberto.update({
                            province: province,
                            year: year
                        }, updated);
                        console.log("INFO: Modifying stat " + province + "/"+year+" with data " + JSON.stringify(updated, 2, null));
                        response.send(updated); // return the updated contact
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


// H) DELETE a la ruta base (p.e. “/price-stats”) borra todos los recursos
app.delete(BASE_API_PATH + "/price-stats", function (request, response) {
        console.log("INFO: New DELETE request to /export-and-import-stats");
    dbLuis.remove({}, {
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


// D) DELETE a un recurso (p.e. “/price-stats/Sevilla/2016”) borra ese recurso
app.delete(BASE_API_PATH + "/price-stats/:province/:year", function (request, response) {
    var province = request.params.province;
    var year = request.params.year;

    if (!province || !year) {
        console.log("WARNING: New DELETE request to /export-and-import-stats/:name without name, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
         console.log("INFO: New DELETE request to /export-and-import-stats");
        dbLuis.remove({
            province: province,
            //year: year
        }, {
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
app.get(BASE_API_PATH + "/area-and-production/loadInitialData", function(req, res) {
    dbAdrian.find({}).toArray(function(err, stats) {
        if (err) {
            console.error('WARNING: Error while getting initial data from DB');
            return 0;
        }
        if (stats.length === 0) {
            var initialStats = [{
                "province": "jaen",
                "year": "2013",
                "productionS": "375",
                "areaS": "802",
                
            }, {
                "province": "huelva",
                "year": "2013",
                "productionS": "772",
                "areaS": "84"
            }, ];

            dbAdrian.insert(initialStats);
            console.log("Date insert in db");
            res.sendStatus(201);
        }
        else {
            console.log("DB not empty");
        }
    });
});


// GET a collection
app.get(BASE_API_PATH + "/area-and-production", function(request, response) {
    console.log("INFO: New GET request to /area-and-production");
    dbAdrian.find({}).toArray(function(err, sArea) {
        if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        }
        else {
            console.log("INFO: Sending area-and-production-stats: " + JSON.stringify(sArea, 2, null));
            response.send(sArea);
        }
    });
});


// GET a single resource

app.get(BASE_API_PATH + "/area-and-production/:province", function(request, response) {
    var province = request.params.province;

    if (!province) {
        console.log("WARNING: New GET request to /export-and-import-stats/:name without name, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New GET request to /export-and-import-stats/" + province);
        dbAdrian.find({
            province: province
        }).toArray(function(err, sArea) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                if (sArea.length > 0) {
                    var a = sArea[0];
                    console.log("INFO: Sending stats: " + JSON.stringify(sArea, 2, null));
                    response.send(a);
                }
                else {
                    console.log("WARNING: There are not any area stats with name " + province);
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});





//GET all stats of one year
app.get(BASE_API_PATH + "/area-and-production/:province/:year", function(request, response) {
    var province = request.params.province;
    var year = request.params.year;
    if (!province) {
        console.log("WARNING: New GET request to /area-and-production/ without province, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New GET request to /area-and-production/" + province);
        dbAdrian.find({
            province: province,
            year: year
        }).toArray(function(err, sArea) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                if (sArea.length > 0) {
                    console.log("INFO: Sending stats: " + JSON.stringify(sArea, 2, null));
                    response.send(sArea);
                }
                else {
                    console.log("WARNING: There are not any area stats with name " + province + " and " + year);
                    response.sendStatus(404); // not found
                }
            }
        });
    }
});




//POST over a collection
app.post(BASE_API_PATH + "/area-and-production", function(request, response) {
    var newStats = request.body;
    if (!newStats) {
        console.log("WARNING: New POST request to /area-and-production without stats, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New POST request to /area-and-production with body: " + JSON.stringify(newStats, 2, null));
        if (!newStats.province || !newStats.year  || !newStats.productionS || !newStats.areaS) {
            console.log("WARNING: The stat " + JSON.stringify(newStats, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        }
        else {
            dbAdrian.find({
                province: newStats.province,
                year: newStats.year
            }).toArray(function(err, sExport) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                }
                else {
                    var sExportBefore = sExport.filter((province) => {
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
                        dbAdrian.insert(newStats);
                        response.sendStatus(201); // created
                    }
                }
            });
        }
    }
});


//POST over a single resource
app.post(BASE_API_PATH + "/area-and-production/:province/:year", function(request, response) {
    var province = request.params.province;
    var year = request.params.year;

    console.log("WARNING: New POST request to /area-and-production-stats/" + province + " and " + year + ", sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a collection
app.put(BASE_API_PATH + "/area-and-production", function(request, response) {
    console.log("WARNING: New PUT request to /area-and-production-stats, sending 405...");
    response.sendStatus(405); // method not allowed
});


//PUT over a single resource
app.put(BASE_API_PATH + "/area-and-production/:province/:year", function(request, response) {
    var updateArea = request.body;
    var province = request.params.province;
    var year = request.params.year;

    if (!updateArea) {
        console.log("WARNING: New PUT request to /area-and-production-stats/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New PUT request to /area-and-production-stats/" + province + " with data " + JSON.stringify(updateArea, 2, null));
        if (!updateArea.province || !updateArea.year ||  !updateArea.productionS  || !updateArea.areaS) {
            console.log("WARNING: The contact " + JSON.stringify(updateArea, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        }
        else {
            dbAdrian.find({
                province: province,
                $and: [{
                    year: year
                }]
            }).toArray(function(err, sArea) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (sArea.length > 0) {
                        dbAdrian.update({
                            province: province,
                            year: year
                        }, updateArea);
                        console.log("INFO: Modifying contact with name " + province + " with data " + JSON.stringify(updateArea, 2, null));
                        response.send(updateArea); // return the updated contact
                    }
                    else {
                        console.log("WARNING: There are not any stats with province " + province);
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    }
});


//DELETE over a collection
app.delete(BASE_API_PATH + "/area-and-production", function(request, response) {
    console.log("INFO: New DELETE request to /area-and-production-stats");
    dbAdrian.remove({}, {
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
                console.log("WARNING: There are no stats to delete");
                response.sendStatus(404); // not found
            }
        }
    });
});


//DELETE over a single resource
app.delete(BASE_API_PATH + "/area-and-production/:province/:year", function(request, response) {
    var province = request.params.province;
    var year = request.params.year;

    if (!province || !year) {
        console.log("WARNING: New DELETE request to /area-and-production-stats/:name without name, sending 400...");
        response.sendStatus(400); // bad request
    }
    else {
        console.log("INFO: New DELETE request to /area-and-production-stats/" + province + " and " + year);
        dbAdrian.remove({
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