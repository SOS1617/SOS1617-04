var exports = module.exports = {};

exports.register = function(app, dbAdrian, BASE_API_PATH) {

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
            if (!newStats.province || !newStats.year || !newStats.productionS || !newStats.areaS) {
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
                        var sExportBefore = sExport.filter((result) => {
                            return (result.province.localeCompare(newStats.province, "en", {
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
            if (!updateArea.province || !updateArea.year || !updateArea.productionS || !updateArea.areaS) {
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
                var n = numRemoved.result.n;
                if (numRemoved.result.n > 0) {
                    console.log("INFO: Remove: " + n + " stats, sending 204...");
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
                          var n = numRemoved.result.n;

                    if (n === 1) {
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
}
