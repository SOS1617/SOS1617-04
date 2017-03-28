 var exports = module.exports = {};

 exports.register = function(app, dbAlberto, BASE_API_PATH) {





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
  });



 }
 