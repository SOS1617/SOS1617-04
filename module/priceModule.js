var exports = module.exports = {};

exports.register = function(app, dbLuis, BASE_API_PATH) {
    // El recurso debe contener una ruta /api/v1/XXXXX/loadInitialData que al hacer un GET cree 2 o más datos en la base de datos si está vacía.
    app.get(BASE_API_PATH + "/price-stats/loadInitialData", function(request, response) {
        console.log("INFO: Creando datos");

        var datos = [{
            "province": "Sevilla",
            "year": "2016",
            "priceaceite": "3.416",
            "priceextra": "3.71",
            "pricevirgen": "3.42"
        }, {
            "province": "Huelva",
            "year": "2016",
            "priceaceite": "4.416",
            "priceextra": "3.51",
            "pricevirgen": "3.92"
        }];
        dbLuis.insert(datos);

        response.redirect(200, BASE_API_PATH + "/");
    });

    // Base GET
    app.get(BASE_API_PATH + "/", function(request, response) {
        console.log("INFO: Redirecting to /price-stats");
        response.redirect(301, BASE_API_PATH + "/price-stats");
    });

    // A) GET a la ruta base (p.e. “/price-stats”) devuelve una lista con todos los recursos
    app.get(BASE_API_PATH + "/price-stats", function(request, response) {
        console.log("INFO: New GET request to /price-stats");
        dbLuis.find({}).toArray(function(err, price) {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                console.log("INFO: Sending price-stats: " + JSON.stringify(price, 2, null));
                response.send(price);
            }
        });
    });

    // C) GET a un recurso (p.e. “/price-stats/Sevilla”) devuelve ese recurso 
    app.get(BASE_API_PATH + "/price-stats/:province/:year", function(request, response) {
        var province = request.params.province;
        var year = request.params.year;


        if (!province || !year) {
            console.log("WARNING: New GET request to /export-and-import-stats/:name without name, sending 400...");
            response.sendStatus(400); // bad request
        }
        else {
            console.log("INFO: New GET request to /export-and-import-stats/" + province + year);
            dbLuis.find({
                province: province,
                year: year
            }).toArray(function(err, sPrice) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (sPrice.length > 0) {
                        var a = sPrice[0];
                        console.log("INFO: Sending stats: " + JSON.stringify(sPrice, 2, null));
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
    app.post(BASE_API_PATH + "/price-stats", function(request, response) {
        var newPrice = request.body;
        if (!newPrice) {
            console.log("WARNING: New POST request to /price-stats/ without contact, sending 400...");
            response.sendStatus(400); // bad request
        }
        else {
            console.log("INFO: New POST request to /price-stats with body: " + JSON.stringify(newPrice, 2, null));
            if (!newPrice.province || !newPrice.year || !newPrice.priceaceite || !newPrice.pricevirgen || !newPrice.pricevirgen) {
                console.log("WARNING: " + JSON.stringify(newPrice, 2, null) + " is not well-formed, sending 422...");
                response.sendStatus(422); // unprocessable entity
            }
            else {
                dbLuis.find({
                    province: newPrice.province,
                    year: newPrice.year
                }).toArray(function(err, price) {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        response.sendStatus(500); // internal server error
                    }
                    else {
                        var contactsBeforeInsertion = price.filter((result) => {
                            return (result.province.localeCompare(newPrice.province, "en", {
                                'sensitivity': 'base'
                            }) === 0);
                        });
                        if (contactsBeforeInsertion.length > 0) {
                            console.log("WARNING: The contact " + JSON.stringify(newPrice, 2, null) + " already extis, sending 409...");
                            response.sendStatus(409); // conflict
                        }
                        else {
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
    app.post(BASE_API_PATH + "/price-stats/:province/:year", function(request, response) {
        var province = request.params.province;
        var year = request.params.year;
        console.log("WARNING: New POST request to /price-stats/" + province + ", sending 405...");
        response.sendStatus(405); // method not allowed
    });

    // G) PUT a la ruta base (p.e. “/price-stats”) debe dar un error de método no permitido.
    app.put(BASE_API_PATH + "/price-stats", function(request, response) {
        console.log("WARNING: New PUT request to /price-stats, sending 405...");
        response.sendStatus(405); // method not allowed
    });


    // E) PUT a un recurso (p.e. “/price-stats/Sevilla”) actualiza ese recurso 
    app.put(BASE_API_PATH + "/price-stats/:province/:year", function(request, response) {
        var updated = request.body;
        var province = request.params.province;
        var year = request.params.year;
        if (!updated || updated.province != province || updated.year != year) {
            console.log("WARNING: New PUT request to /price-stats/ without stats, sending 400...");
            response.sendStatus(400); // bad request
        }
        else {
            console.log("INFO: New PUT request to /price-stats/" + province + " with data " + JSON.stringify(updated, 2, null));
            if (!updated.province || !updated.year || !updated.priceaceite || !updated.priceextra || !updated.pricevirgen) {
                console.log("WARNING: The stat " + JSON.stringify(updated, 2, null) + " is not well-formed, sending 422...");
                response.sendStatus(422); // unprocessable entity
            }
            else {
                dbLuis.find({
                    province: province,
                    $and: [{
                        year: year
                    }]
                }).toArray(function(err, sPrice) {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        response.sendStatus(500); // internal server error
                    }
                    else {
                        if (sPrice.length > 0) {
                            dbLuis.update({
                                province: province,
                                year: year
                            }, updated);
                            console.log("INFO: Modifying stat " + province + " " + year + " with data " + JSON.stringify(updated, 2, null));
                            response.send(updated); // return the updated contact
                        }
                        else {
                            console.log("WARNING: There are not any stats with province " + province + year);
                            response.sendStatus(404); // not found
                        }
                    }
                });
            }
        }
    });


    // H) DELETE a la ruta base (p.e. “/price-stats”) borra todos los recursos
    app.delete(BASE_API_PATH + "/price-stats", function(request, response) {
        console.log("INFO: New DELETE request to /export-and-import-stats");
        dbLuis.remove({}, {
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
                    console.log("WARNING: There are no contacts to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    });


    // D) DELETE a un recurso (p.e. “/price-stats/Sevilla”) borra ese recurso
    app.delete(BASE_API_PATH + "/price-stats/:province", function(request, response) {
        var province = request.params.province;

        if (!province) {
            console.log("WARNING: New DELETE request to /price-stats/:name without name, sending 400...");
            response.sendStatus(400); // bad request
        }
        else {
            console.log("INFO: New DELETE request to /export-and-import-stats");
            dbLuis.remove({
                province: province
            }, {
                multi: true
            }, function(err, numRemoved) {
                if (err) {
                    console.error('WARNING: Error removing data from DB');
                    response.sendStatus(500); // internal server error
                }
                else {
                    var n = numRemoved.result.n;

                    if (n > 0) {
                        console.log("INFO: The stat with name " + province + " has been succesfully deleted, sending 204...");
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
