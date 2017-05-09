var exports = module.exports = {};

exports.register = function(app, dbLuis,dbUser, BASE_API_PATH) {
    
    // *******************************     *******************************
    // 
    // *******************************     *******************************
    var key = function(request, callback) {
        var d;
        dbUser.find({
            apikey: request
        }).toArray(function(err, sPrice) {
            if (sPrice.length > 0) {
                d = 1;
            } else {
                d = 0;
            }
            callback(d);
        });
    }
    
    function searchFrom(sPrice, from, to) {
        var from = parseInt(from);
        var to = parseInt(to);
        var res = [];
        sPrice.forEach((filt) => {
            if (filt.year >= from && filt.year <= to) {
                res.push(filt);
            }
        });
        return res;
    }
 
 
    // *******************************     *******************************
    // El recurso debe contener una ruta /api/v1/XXXXX/loadInitialData que al hacer un GET cree 2 o más datos en la base de datos si está vacía.
    // *******************************     *******************************
    app.get(BASE_API_PATH + "/price-stats/loadInitialData", function(request, response) 
    {
        //
        var res = request.query.apikey;
        var resul = key(res, function(d) 
        {
            if (d > 0) 
            {
                //
                console.log("INFO: Creando datos");
                var datos = [
                       
                // 2013
                {
                    "province": "sevilla",
                    "year": "2013",
                    "priceaceite": "0.416",
                    "priceextra": "0.71",
                    "pricevirgen": "3.484"
                }, {
                    "province": "huelva",
                    "year": "2013",
                    "priceaceite": "4.416",
                    "priceextra": "13.51",
                    "pricevirgen": "3.92"
                }, {
                    "province": "cordoba",
                    "year": "2013",
                    "priceaceite": "4.416",
                    "priceextra": "9.51",
                    "pricevirgen": "3.92"
                }, {
                    "province": "almeria",
                    "year": "2013",
                    "priceaceite": "24.416",
                    "priceextra": "3.51",
                    "pricevirgen": "3.92"
                }, {
                    "province": "malaga",
                    "year": "2013",
                    "priceaceite": "1.46",
                    "priceextra": "0.57",
                    "pricevirgen": "7.82"
                }, {
                    "province": "cadiz",
                    "year": "2013",
                    "priceaceite": "0.316",
                    "priceextra": "4.28",
                    "pricevirgen": "3.17"
                }, {
                    "province": "jaen",
                    "year": "2013",
                    "priceaceite": "20.258",
                    "priceextra": "0.782",
                    "pricevirgen": "3.148"
                }, {
                    "province": "granada",
                    "year": "2013",
                    "priceaceite": "2.258",
                    "priceextra": "1.782",
                    "pricevirgen": "3.148"
                },
                // 2014
                {
                    "province": "sevilla",
                    "year": "2014",
                    "priceaceite": "8.416",
                    "priceextra": "3.71",
                    "pricevirgen": "3.484"
                }, {
                    "province": "huelva",
                    "year": "2014",
                    "priceaceite": "4.416",
                    "priceextra": "13.51",
                    "pricevirgen": "3.92"
                }, {
                    "province": "cordoba",
                    "year": "2014",
                    "priceaceite": "24.416",
                    "priceextra": "3.51",
                    "pricevirgen": "3.92"
                }, {
                    "province": "almeria",
                    "year": "2014",
                    "priceaceite": "4.416",
                    "priceextra": "3.51",
                    "pricevirgen": "3.92"
                }, {
                    "province": "malaga",
                    "year": "2014",
                    "priceaceite": "9.46",
                    "priceextra": "10.57",
                    "pricevirgen": "7.82"
                }, {
                    "province": "cadiz",
                    "year": "2014",
                    "priceaceite": "0.316",
                    "priceextra": "4.28",
                    "pricevirgen": "3.17"
                }, {
                    "province": "jaen",
                    "year": "2014",
                    "priceaceite": "2.258",
                    "priceextra": "0.782",
                    "pricevirgen": "3.148"
                }, {
                    "province": "granada",
                    "year": "2014",
                    "priceaceite": "2.258",
                    "priceextra": "1.782",
                    "pricevirgen": "3.148"
                },
                // 2015
                {
                    "province": "sevilla",
                    "year": "2015",
                    "priceaceite": "3.416",
                    "priceextra": "3.71",
                    "pricevirgen": "3.484"
                }, {
                    "province": "huelva",
                    "year": "2015",
                    "priceaceite": "4.416",
                    "priceextra": "3.51",
                    "pricevirgen": "3.92"
                }, {
                    "province": "cordoba",
                    "year": "2015",
                    "priceaceite": "4.416",
                    "priceextra": "3.51",
                    "pricevirgen": "3.92"
                }, {
                    "province": "almeria",
                    "year": "2015",
                    "priceaceite": "4.416",
                    "priceextra": "3.51",
                    "pricevirgen": "3.92"
                }, {
                    "province": "malaga",
                    "year": "2015",
                    "priceaceite": "6.46",
                    "priceextra": "1.57",
                    "pricevirgen": "7.82"
                }, {
                    "province": "cadiz",
                    "year": "2015",
                    "priceaceite": "3.316",
                    "priceextra": "4.28",
                    "pricevirgen": "3.17"
                }, {
                    "province": "jaen",
                    "year": "2015",
                    "priceaceite": "2.258",
                    "priceextra": "6.782",
                    "pricevirgen": "3.148"
                }, {
                    "province": "granada",
                    "year": "2015",
                    "priceaceite": "2.258",
                    "priceextra": "6.782",
                    "pricevirgen": "3.148"
                }
                ];
                dbLuis.insert(datos);
        
                //
                response.redirect(200, BASE_API_PATH + "/");
            } else {
                if(!request.query.apikey){
                    console.log("Err401: Login error.");
                    response.sendStatus(401);
                } else {
                    console.log("Err403: Login error.");
                    response.sendStatus(403);
                }
            }
        });
    });
    

    // *******************************  A  *******************************
    // GET a la ruta base (p.e. “/price-stats”) devuelve una lista con todos los recursos
    // *******************************     *******************************
    app.get(BASE_API_PATH + "/price-stats", function(request, response) 
    {
        // 
        var url = request.query;
        var province = url.province;
        var year = url.year;
        
        // Paginacion por defecto
        var ose=0;
        var limite=100;
        
        //
        var res = request.query.apikey;
        var from = url.from;
        var to = url.to;
        
        var resul = key(res, function(d) {
            if (d > 0) {
                if(url.limit!=undefined){
                    limite = parseInt(url.limit);
                    ose = parseInt(url.offset);
                }
                console.log("INFO: limit = "+limite);
                console.log("INFO: New GET request to /price-stats");
                if (from != undefined && to != undefined) {
                    dbLuis.find({}).skip(ose).limit(limite).toArray(function(err, price) {
                        if (err) {
                            console.error('WARNING: Error getting data from DB');
                            response.sendStatus(500); // internal server error
                        }
                        else {
                            var filted = price.filter((stat) => {
                            if ((province == undefined || stat.province == province) && (year == undefined || stat.year == year) && (year == undefined || stat.year == year)) {
                                return stat;
                            }
                            });
                            if (filted.length > 0) {
                                var filted = searchFrom(price,from,to);
                                response.send(filted);
                            } else {
                                console.log("WARNING: There are not any stat with this properties.");
                                response.sendStatus(404); // not found
                            }
                        }
                    });
                } else {
                    dbLuis.find({}).skip(ose).limit(limite).toArray(function(err, price) {
                        if (err) {
                            console.error('WARNING: Error getting data from DB');
                            response.sendStatus(500); // internal server error
                        }
                        else {
                            var filted = price.filter((stat) => {
                                if ((province == undefined || stat.province == province) && (year == undefined || stat.year == year)) {
                                    return stat;
                                }
                            });
                            if (filted.length > 0) {
                               console.log("INFO: Sending stat: " + JSON.stringify(filted, 2, null));
                               response.send(filted);
                            } else {
                                console.log("WARNING: There are not any stat with this properties.");
                                response.sendStatus(404); // not found
                            }
                        }
                    });
                }
            } else {
                if(!request.query.apikey){
                    console.log("Err401: Login error.");
                    response.sendStatus(401);
                } else {
                    console.log("Err403: Login error.");
                    response.sendStatus(403);
                }
            }
        });
    });


    // *******************************   C   *******************************
    // GET a un recurso (p.e. “/price-stats/Sevilla”) devuelve ese recurso 
    // *******************************       *******************************
    app.get(BASE_API_PATH + "/price-stats/:province/:year", function(request, response) 
    {
        //
        var province = request.params.province;
        var year = request.params.year;
        
        //
        var res = request.query.apikey;
        var resul = key(res, function(d) {
            if (d > 0) { // login OK
                if (!province || !year) {
                    console.log("WARNING: New GET request to /price-stats/:name without name, sending 400...");
                    response.sendStatus(400); // bad request
                }
                else {
                    console.log("INFO: New GET request to /price-stats/" + province + year);
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
            } else {
                if(!request.query.apikey){
                    console.log("Err401: Login error.");
                    response.sendStatus(401);
                } else {
                    console.log("Err403: Login error.");
                    response.sendStatus(403);
                }
            }
        });
    });


    // *******************************  B  *******************************
    // POST a la ruta base (p.e. “/price-stats”) crea un nuevo recurso
    // *******************************     *******************************
    app.post(BASE_API_PATH + "/price-stats", function(request, response) 
    {
        //
        var newPrice = request.body;
        
        //
        var res = request.query.apikey;
        var resul = key(res, function(d) {
            if (d > 0) { // login OK
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
            } else {
                if(!request.query.apikey){
                    console.log("Err401: Login error.");
                    response.sendStatus(401);
                } else {
                    console.log("Err403: Login error.");
                    response.sendStatus(403);
                }
            }
        });
    });


    // *******************************  F  *******************************
    // POST a un recurso (p.e. “/price-stats/Sevilla”) debe dar un error de método no permitido.
    // *******************************     *******************************
    app.post(BASE_API_PATH + "/price-stats/:province/:year", function(request, response) 
    {
        //
        var province = request.params.province;
        var year = request.params.year;
        
        //
        var res = request.query.apikey;
        var resul = key(res, function(d) {
            if (d > 0) { // login OK
                console.log("WARNING: New POST request to /price-stats/" + province + ", sending 405...");
                response.sendStatus(405); // method not allowed
            } else {
                if(!request.query.apikey){
                    console.log("Err401: Login error.");
                    response.sendStatus(401);
                } else {
                    console.log("Err403: Login error.");
                    response.sendStatus(403);
                }
            }
        });
    });


    // *******************************  G  *******************************
    // PUT a la ruta base (p.e. “/price-stats”) debe dar un error de método no permitido.
    // *******************************     *******************************
    app.put(BASE_API_PATH + "/price-stats", function(request, response) 
    {
        //
        var res = request.query.apikey;
        var resul = key(res, function(d) {
            if (d > 0) { // login OK
                console.log("WARNING: New PUT request to /price-stats, sending 405...");
                response.sendStatus(405); // method not allowed
            } else {
                if(!request.query.apikey){
                    console.log("Err401: Login error.");
                    response.sendStatus(401);
                } else {
                    console.log("Err403: Login error.");
                    response.sendStatus(403);
                }
            }
        });
    });


    // *******************************  E  *******************************
    // PUT a un recurso (p.e. “/price-stats/Sevilla”) actualiza ese recurso 
    // *******************************     *******************************
    app.put(BASE_API_PATH + "/price-stats/:province/:year", function(request, response) 
    {
        //
        var updated = request.body;
        var province = request.params.province;
        var year = request.params.year;
        
        //
        var res = request.query.apikey;
        var resul = key(res, function(d) {
            if (d > 0) { // login OK
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
            } else {
                if(!request.query.apikey){
                    console.log("Err401: Login error.");
                    response.sendStatus(401);
                } else {
                    console.log("Err403: Login error.");
                    response.sendStatus(403);
                }
            }
        });
    });


    // *******************************  H  *******************************
    // DELETE a la ruta base (p.e. “/price-stats”) borra todos los recursos
    // *******************************     *******************************
    app.delete(BASE_API_PATH + "/price-stats", function(request, response)
    {
        //
        var res = request.query.apikey;
        var resul = key(res, function(d) {
            if (d > 0) { // login OK
                console.log("INFO: New DELETE request to /price-stats");
                dbLuis.remove({}, {
                    multi: true
                }, function(err, numRemoved) {
                    if (err) {
                        console.error('WARNING: Error removing data from DB');
                        response.sendStatus(500); // internal server error
                    }
                    else {
                        var n = numRemoved.result.n;
        
                        if (n !== 0) {
                            console.log("INFO: Remove: " + n + " stats, sending 204...");
                            response.sendStatus(204); // no content
                        }
                        else {
                            console.log("WARNING: There are no contacts to delete");
                            response.sendStatus(404); // not found
                        }
                    }
                });
            } else {
                if(!request.query.apikey){
                    console.log("Err401: Login error.");
                    response.sendStatus(401);
                } else {
                    console.log("Err403: Login error.");
                    response.sendStatus(403);
                }
            }
        });
    });


    // *******************************   D   *******************************
    // DELETE a un recurso (p.e. “/price-stats/Sevilla”) borra ese recurso
    // *******************************       *******************************
    app.delete(BASE_API_PATH + "/price-stats/:province/:year", function(request, response)
    {
        //
        var province = request.params.province;
        var year = request.params.year;

        //
        var res = request.query.apikey;
        var resul = key(res, function(d) {
            if (d > 0) { // login OK
                if (!province) {
                    console.log("WARNING: New DELETE request to /price-stats/:name without name, sending 400...");
                    response.sendStatus(400); // bad request
                }
                else {
                    console.log("INFO: New DELETE request to /price-stats");
                    dbLuis.remove({
                        province: province,
                        year: year
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
            } else {
                if(!request.query.apikey){
                    console.log("Err401: Login error.");
                    response.sendStatus(401);
                } else {
                    console.log("Err403: Login error.");
                    response.sendStatus(403);
                }
            }
        });
    });
    
}

//console.log('a');