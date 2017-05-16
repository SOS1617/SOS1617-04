var exports = module.exports = {};

exports.register = function(app, dbAdrian,dbUser, BASE_API_PATH) {

app.get("/proxyAdrian", (req, res) => {
  var http = require('http');

  var options = {
   host: "sos1617-03.herokuapp.com",
   path: "/api/v2/results/?apikey=apisupersecreta"
  };

  var request = http.request(options, (response) => {
   var input = '';

   response.on('data', function(chunk) {
    input += chunk;
   });

   response.on('end', function() {
    res.send(input);
   });
  });

  request.on('error', function(e) {
   res.sendStatus(503);
  });

  request.end();
 });



// Authentication apikey=12345

 var key = function(request, callback) {
  var d;
  dbUser.find({
   apikey: request
  }).toArray(function(err, sArea) {
   if (sArea.length > 0) {
    d = 1;
   }
   else {
    d = 0;
   }
   callback(d);
  });

 }
 function searchFrom(sArea,from,to){
   var from = parseInt(from);
   var to = parseInt(to);
   var res=[];
   sArea.forEach((filt)=>{
    if(filt.year>=from && filt.year<=to){
     res.push(filt);
    }
   });

    return res;

  
  
 }
 // GET a collection and Search
 app.get(BASE_API_PATH + "/area-and-production", function(request, response) {
  var url = request.query;
  var province = url.province;
  var year = url.year;
  var productionS = url.productionS;
  var areaS = url.areaS;
  var off = 0;
  var limite = 100;
  var res = request.query.apikey;
  var resul = key(res, function(d) {
   if (d > 0) {
    if (url.limit != undefined) {
     limite = parseInt(url.limit);
     off = parseInt(url.offset);
    }
    dbAdrian.find({}).skip(off).limit(limite).toArray(function(err, sExport) {
     if (err) {
      console.error('WARNING: Error getting data from DB');
      response.sendStatus(500); // internal server error
     }
     else {
      var filted = sExport.filter((stat) => {
       if ((province == undefined || stat.province == province) && (year == undefined || stat.year == year) && (productionS == undefined || stat.importS == productionS) && (areaS == undefined || stat.exportS == areaS)) {
        return stat;
       }
      });
      if (filted.length > 0) {
       console.log("INFO: Sending stat: " + JSON.stringify(filted, 2, null));
       response.send(filted);
      }
      else {
       console.log("WARNING: There are not any contact with this properties");
       response.sendStatus(404); // not found
      }
     }
    });
   }
   else {
       if(!request.query.apikey){
           response.sendStatus(401);
       }else{
           response.sendStatus(403);
       }
   }
  });
 });
    
    app.get(BASE_API_PATH + "/area-and-production/loadInitialData", function(request, response) {
        var res = request.query.apikey;
        var resul = key(res, function(d) {
        if (d > 0) {
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
                    "province": "cordoba",
                    "year": "2013",
                    "productionS": "772",
                    "areaS": "84"
                },
                {
                    "province": "sevilla",
                    "year": "2013",
                    "productionS": "600",
                    "areaS": "100"
                },
                {
                    "province": "huelva",
                    "year": "2013",
                    "productionS": "200",
                    "areaS": "100"
                },
                {
                    "province": "cadiz",
                    "year": "2013",
                    "productionS": "450",
                    "areaS": "80"
                },
                {
                    "province": "malaga",
                    "year": "2013",
                    "productionS": "800",
                    "areaS": "120"
                },
                {
                    "province": "granada",
                    "year": "2013",
                    "productionS": "375",
                    "areaS": "802",

                }, {
                    "province": "almeria",
                    "year": "2013",
                    "productionS": "772",
                    "areaS": "84"
                },
                {
                    "province": "jaen",
                    "year": "2014",
                    "productionS": "600",
                    "areaS": "100"
                },
                {
                    "province": "cordoba",
                    "year": "2014",
                    "productionS": "200",
                    "areaS": "100"
                },
                {
                    "province": "sevilla",
                    "year": "2014",
                    "productionS": "450",
                    "areaS": "80"
                },
                {
                    "province": "huelva",
                    "year": "2014",
                    "productionS": "800",
                    "areaS": "120"
                },
                 {
                    "province": "cadiz",
                    "year": "2014",
                    "productionS": "450",
                    "areaS": "80"
                },
                {
                    "province": "malaga",
                    "year": "2014",
                    "productionS": "800",
                    "areaS": "120"
                },
                {
                    "province": "granada",
                    "year": "2014",
                    "productionS": "375",
                    "areaS": "802",

                }, {
                    "province": "almeria",
                    "year": "2014",
                    "productionS": "772",
                    "areaS": "84"
                },
                {
                    "province": "jaen",
                    "year": "2015",
                    "productionS": "600",
                    "areaS": "100"
                },
                {
                    "province": "cordoba",
                    "year": "2015",
                    "productionS": "200",
                    "areaS": "100"
                },
                {
                    "province": "sevilla",
                    "year": "2015",
                    "productionS": "450",
                    "areaS": "80"
                },
                {
                    "province": "huelva",
                    "year": "2015",
                    "productionS": "800",
                    "areaS": "120"
                },
                 {
                    "province": "cadiz",
                    "year": "2015",
                    "productionS": "450",
                    "areaS": "80"
                },
                {
                    "province": "malaga",
                    "year": "2015",
                    "productionS": "800",
                    "areaS": "120"
                },
                {
                    "province": "granada",
                    "year": "2015",
                    "productionS": "375",
                    "areaS": "802",

                }, {
                    "province": "almeria",
                    "year": "2015",
                    "productionS": "772",
                    "areaS": "84"
                },{
                    "province": "jaen",
                    "year": "2016",
                    "productionS": "375",
                    "areaS": "802",

                }, {
                    "province": "cordoba",
                    "year": "2016",
                    "productionS": "772",
                    "areaS": "84"
                }
                ];

                dbAdrian.insert(initialStats);
                console.log("Date insert in db");
                response.sendStatus(201);
            }
            else {
                console.log('INFO: DB has ' + stats.length + ' objects ');
                response.sendStatus(200);
            }
            });    
        }
        else {
       if(!request.query.apikey){
           response.sendStatus(401);
       }else{
           response.sendStatus(403);
       }
   }
        });
    });

     /*
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
    */

    // GET a single resource

    app.get(BASE_API_PATH + "/area-and-production/:province", function(request, response) {
        var province = request.params.province;
        var res = request.query.apikey;
        var resul = key(res, function(d) {
        if (d > 0) {
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
        }
        else {
       if(!request.query.apikey){
           response.sendStatus(401);
       }else{
           response.sendStatus(403);
       }
   }
    });
    });




    //GET all stats of one year
    app.get(BASE_API_PATH + "/area-and-production/:province/:year", function(request, response) {
        var province = request.params.province;
        var year = request.params.year;
        var res = request.query.apikey;
        var resul = key(res, function(d) {
            if (d > 0) {
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
            }
        else {
       if(!request.query.apikey){
           response.sendStatus(401);
       }else{
           response.sendStatus(403);
       }
   }
    });
    });




    //POST over a collection
    app.post(BASE_API_PATH + "/area-and-production", function(request, response) {
        var newStats = request.body;
        var res = request.query.apikey;
        var resul = key(res, function(d) {
            if (d > 0) {
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
            }
        else {
       if(!request.query.apikey){
           response.sendStatus(401);
       }else{
           response.sendStatus(403);
       }
   }
        });
    });


    //POST over a single resource
    app.post(BASE_API_PATH + "/area-and-production/:province/:year", function(request, response) {
        var province = request.params.province;
        var year = request.params.year;
        var res = request.query.apikey;
        var resul = key(res, function(d) {
            if (d > 0) {
        console.log("WARNING: New POST request to /area-and-production-stats/" + province + " and " + year + ", sending 405...");
        response.sendStatus(405); // method not allowed
            }
        else {
                response.sendStatus(401);
        }
    });
 });

    //PUT over a collection
    app.put(BASE_API_PATH + "/area-and-production", function(request, response) {
        var res = request.query.apikey;
        var resul = key(res, function(d) {
        if (d > 0) {
        console.log("WARNING: New PUT request to /area-and-production-stats, sending 405...");
        response.sendStatus(405); // method not allowed
        }
        else {
       if(!request.query.apikey){
           response.sendStatus(401);
       }else{
           response.sendStatus(403);
       }
   }
    });
});

    //PUT over a single resource
    app.put(BASE_API_PATH + "/area-and-production/:province/:year", function(request, response) {
        var updateArea = request.body;
        var province = request.params.province;
        var year = request.params.year;
        var res = request.query.apikey;
        var resul = key(res, function(d) {
        if (d > 0) {
        if (!updateArea || updateArea.province !== province || updateArea.year !== year) {
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
        }
        else {
       if(!request.query.apikey){
           response.sendStatus(401);
       }else{
           response.sendStatus(403);
       }
   }
    });
});

    //DELETE over a collection
    app.delete(BASE_API_PATH + "/area-and-production", function(request, response) {
        var res = request.query.apikey;
        var resul = key(res, function(d) {
        if (d > 0) {
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
        }
        else {
       if(!request.query.apikey){
           response.sendStatus(401);
       }else{
           response.sendStatus(403);
       }
   }
    });
});

    //DELETE over a single resource
    app.delete(BASE_API_PATH + "/area-and-production/:province/:year", function(request, response) {
        var province = request.params.province;
        var year = request.params.year;
        var res = request.query.apikey;
        var resul = key(res, function(d) {
        if (d > 0) {
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
        }
        else {
       if(!request.query.apikey){
           response.sendStatus(401);
       }else{
           response.sendStatus(403);
       }
   }
    });
    });
}
