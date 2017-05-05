var exports = module.exports = {};

exports.register = function(app, dbAlberto, dbUser, BASE_API_PATH) {

 // Authentication apikey=12345

 var key = function(request, callback) {
  var d;
  dbUser.find({
   apikey: request
  }).toArray(function(err, sExport) {
   if (sExport.length > 0) {
    d = 1;
   }
   else {
    d = 0;
   }

   callback(d);
  });

 }
 function searchFrom(sExport,from,to){
   var from = parseInt(from);
   var to = parseInt(to);
   var res=[];
   sExport.forEach((filt)=>{
    if(filt.year>=from && filt.year<=to){
     res.push(filt);
    }
   });

    return res;

  
  
 }





 // GET a collection and Search
 app.get(BASE_API_PATH + "/export-and-import", function(request, response) {
  var url = request.query;
  var province = url.province;
  var year = url.year;
  var importS = url.importS;
  var exportS = url.exportS;
  var off = 0;
  var limite = 100;
  var res = request.query.apikey;
  var from = url.from;
  var to = url.to;

  var resul = key(res, function(d) {
   if (d > 0) {
    if (url.limit != undefined) {
     limite = parseInt(url.limit);
     off = parseInt(url.offset);
    }
    if (from != undefined && to != undefined) {
     dbAlberto.find({}).toArray(function(err, sExport) {
      if (err) {
       console.error('WARNING: Error getting data from DB');
       response.sendStatus(500); // internal server error
      }
      else {
       if (sExport.length > 0) {
        var filted=searchFrom(sExport,from,to);
        response.send(filted);
       }
       else {
        console.log("WARNING: There are not any stat with this properties");
        response.sendStatus(404); // not found

       }
      }
     });


    }
    else {
     dbAlberto.find({}).skip(off).limit(limite).toArray(function(err, sExport) {
      if (err) {
       console.error('WARNING: Error getting data from DB');
       response.sendStatus(500); // internal server error
      }
      else {
       var filted = sExport.filter((stat) => {
        if ((province == undefined || stat.province == province) && (year == undefined || stat.year == year) && (year == undefined || stat.year == year) && (importS == undefined || stat.importS == importS) && (exportS == undefined || stat.exportS == exportS)) {
         return stat;
        }
       });
       if (filted.length > 0) {
        console.log("INFO: Sending stat: " + JSON.stringify(filted, 2, null));
        response.send(filted);
       }
       else {
        console.log("WARNING: There are not any stat with this properties");
        response.sendStatus(404); // not found

       }
      }
     });
    }
   }
   else {
    if (!request.query.apikey) {
     console.log("Err401: Login error.");
     response.sendStatus(401);
    }
    else {
     console.log("Err403: Login error.");
     response.sendStatus(403);
    }
   }
  });
 });





 // LoadInitialData
 app.get(BASE_API_PATH + "/export-and-import/loadInitialData", function(request, response) {
  var res = request.query.apikey;
  var resul = key(res, function(d) {
   if (d > 0) {

    dbAlberto.find({}).toArray(function(err, stats) {
     if (err) {
      console.error('WARNING: Error while getting initial data from DB');
      return 0;
     }
     if (stats.length === 0) {
      var initialStats = [{
       "province": "sevilla",
       "year": "2013",
       "oil": "375",
       "importS": "802",
       "exportS": "274"
      }, {
       "province": "malaga",
       "year": "2013",
       "oil": "457",
       "importS": "45",
       "exportS": "124"
      }, {
       "province": "cadiz",
       "year": "2013",
       "oil": "97",
       "importS": "66",
       "exportS": "55"
      },
      {
       "province": "granada",
       "year": "2013",
       "oil": "385",
       "importS": "772",
       "exportS": "84"
      }, {
       "province": "cordoba",
       "year": "2013",
       "oil": "423",
       "importS": "90",
       "exportS": "98"
      }, {
       "province": "almeria",
       "year": "2013",
       "oil": "99",
       "importS": "82",
       "exportS": "93"
      }, {
       "province": "jaen",
       "year": "2013",
       "oil": "44",
       "importS": "66",
       "exportS": "55"
      }, {
       "province": "huelva",
       "year": "2013",
       "oil": "22",
       "importS": "66",
       "exportS": "55"
      }, {
       "province": "sevilla",
       "year": "2015",
       "oil": "32",
       "importS": "66",
       "exportS": "55"
      }, {
       "province": "malaga",
       "year": "2015",
       "oil": "47",
       "importS": "66",
       "exportS": "55"
      }, {
       "province": "cadiz",
       "year": "2015",
       "oil": "64",
       "importS": "68",
       "exportS": "75"
      }, {
       "province": "granada",
       "year": "2015",
       "oil": "75",
       "importS": "66",
       "exportS": "55"
      }, {
       "province": "cordoba",
       "year": "2015",
       "oil": "81",
       "importS": "66",
       "exportS": "55"
      }, {
       "province": "almeria",
       "year": "2015",
       "oil": "77",
       "importS": "66",
       "exportS": "55"
      }, {
       "province": "jaen",
       "year": "2015",
       "oil": "25",
       "importS": "66",
       "exportS": "55"
      }, {
       "province": "huelva",
       "year": "2015",
       "oil": "85",
       "importS": "66",
       "exportS": "55"
      }
      ];

      dbAlberto.insert(initialStats);
      console.log("Date insert in db");
      response.sendStatus(201, BASE_API_PATH + "/");
     }
     else {
      console.log('INFO: DB has ' + stats.length + ' objects ');
      response.sendStatus(200);

     }
    });

   }
   else {
    if (!request.query.apikey) {
     console.log("Err401: Login error.");
     response.sendStatus(401);
    }
    else {
     console.log("Err403: Login error.");
     response.sendStatus(403);
    }

   }
  });
 });

 /*
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
   */


 // GET a single resource

 app.get(BASE_API_PATH + "/export-and-import/:province", function(request, response) {
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
     dbAlberto.find({
      province: province
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
        console.log("WARNING: There are not any export stats with name " + province);
        response.sendStatus(404); // not found
       }
      }
     });
    }

   }
   else {
    if (!request.query.apikey) {
     console.log("Err401: Login error.");
     response.sendStatus(401);
    }
    else {
     console.log("Err403: Login error.");
     response.sendStatus(403);
    }
   }
  });
 });





 //GET all stats of one year
 app.get(BASE_API_PATH + "/export-and-import/:province/:year", function(request, response) {
  var province = request.params.province;
  var year = request.params.year;
  var res = request.query.apikey;
  var resul = key(res, function(d) {
   if (d > 0) {
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

   }
   else {
    if (!request.query.apikey) {
     console.log("Err401: Login error.");
     response.sendStatus(401);
    }
    else {
     console.log("Err403: Login error.");
     response.sendStatus(403);
    }
   }
  });
 });




 //POST over a collection
 app.post(BASE_API_PATH + "/export-and-import", function(request, response) {
  var newStats = request.body;
  var res = request.query.apikey;
  var resul = key(res, function(d) {
   if (d > 0) {
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
         dbAlberto.insert(newStats);
         response.sendStatus(201); // created
        }
       }
      });
     }
    }

   }
   else {
    if (!request.query.apikey) {
     console.log("Err401: Login error.");
     response.sendStatus(401);
    }
    else {
     console.log("Err403: Login error.");
     response.sendStatus(403);
    }
   }
  });
 });


 //POST over a single resource
 app.post(BASE_API_PATH + "/export-and-import/:province/:year", function(request, response) {
  var province = request.params.province;
  var year = request.params.year;
  var res = request.query.apikey;
  var resul = key(res, function(d) {
   if (d > 0) {
    console.log("WARNING: New POST request to /export-and-import-stats/" + province + " and " + year + ", sending 405...");
    response.sendStatus(405); // method not allowed

   }
   else {
    if (!request.query.apikey) {
     console.log("Err401: Login error.");
     response.sendStatus(401);
    }
    else {
     console.log("Err403: Login error.");
     response.sendStatus(403);
    }
   }
  });
 });


 //PUT over a collection
 app.put(BASE_API_PATH + "/export-and-import", function(request, response) {
  var res = request.query.apikey;
  var resul = key(res, function(d) {
   if (d > 0) {
    console.log("WARNING: New PUT request to /export-and-import-stats, sending 405...");
    response.sendStatus(405); // method not allowed


   }
   else {
    if (!request.query.apikey) {
     console.log("Err401: Login error.");
     response.sendStatus(401);
    }
    else {
     console.log("Err403: Login error.");
     response.sendStatus(403);
    }
   }
  });
 });

 //PUT over a single resource
 app.put(BASE_API_PATH + "/export-and-import/:province/:year", function(request, response) {
  var updateExp = request.body;
  var province = request.params.province;
  var year = request.params.year;
  var res = request.query.apikey;
  var resul = key(res, function(d) {
   if (d > 0) {
    if (!updateExp) {
     console.log("WARNING: New PUT request to /export-and-import-stats/ without contact, sending 400...");
     response.sendStatus(400); // bad request
    }
    else {
     console.log("INFO: New PUT request to /export-and-import-stats/" + province + " with data " + JSON.stringify(updateExp, 2, null));
     if (!updateExp.province || !updateExp.year || !updateExp.oil || !updateExp.importS || !updateExp.exportS || updateExp.province !== province || updateExp.year !== year) {
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

   }
   else {
    if (!request.query.apikey) {
     console.log("Err401: Login error.");
     response.sendStatus(401);
    }
    else {
     console.log("Err403: Login error.");
     response.sendStatus(403);
    }
   }
  });
 });


 //DELETE over a collection
 app.delete(BASE_API_PATH + "/export-and-import", function(request, response) {
  var res = request.query.apikey;
  var resul = key(res, function(d) {
   if (d > 0) {
    console.log("INFO: New DELETE request to /export-and-import-stats");
    dbAlberto.remove({}, {
     multi: true
    }, function(err, doc) {
     if (err) {
      console.error('WARNING: Error removing data from DB');
      response.sendStatus(500); // internal server error
     }
     else {
      var n = doc.result.n;
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


   }
   else {
    if (!request.query.apikey) {
     console.log("Err401: Login error.");
     response.sendStatus(401);
    }
    else {
     console.log("Err403: Login error.");
     response.sendStatus(403);
    }
   }
  });
 });


 //DELETE over a single resource
 app.delete(BASE_API_PATH + "/export-and-import/:province/:year", function(request, response) {
  var province = request.params.province;
  var year = request.params.year;
  var res = request.query.apikey;
  var resul = key(res, function(d) {
   if (d > 0) {

    if (!province || !year) {
     console.log("WARNING: New DELETE request to /export-and-import-stats/:name without name, sending 400...");
     response.sendStatus(400); // bad request
    }
    else {
     console.log("INFO: New DELETE request to /export-and-import-stats/" + province + " and " + year);
     dbAlberto.remove({
      province: province,
      year: year
     }, {}, function(err, doc) {
      if (err) {
       console.error('WARNING: Error removing data from DB');
       response.sendStatus(500); // internal server error
      }
      else {
       var n = doc.result.n;
       if (n !== 0) {
        console.log("INFO: The stat with name " + province + " and year " + year + " has been succesfully deleted, sending 204...");
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
    if (!request.query.apikey) {
     console.log("Err401: Login error.");
     response.sendStatus(401);
    }
    else {
     console.log("Err403: Login error.");
     response.sendStatus(403);
    }
   }
  });
 });

}
