"use strict";
/* global __dirname */

var express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var path = require('path');
var DataStore = require('nedb');

var port = (process.env.PORT || 10000);
var BASE_API_PATH = "/api/v1";

var dbFileName = path.join(__dirname, 'contacts.db');

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

db.find({}, function (err, contacts) {
    console.log('INFO: Initialiting DB...');

    if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }


    if (contacts.length === 0) {
        console.log('INFO: Empty DB, loading initial data');
    } else {
        console.log('INFO: DB has ' + contacts.length + ' contacts ');
    }
});

// El recurso debe contener una ruta /api/v1/XXXXX/loadInitialData que al hacer un GET cree 2 o más datos en la base de datos si está vacía.
app.get("/price-stats/loadInitialData", function (request, response) {
    console.log("INFO: Creando datos");
    // TODO
    var people = [{
                "name": "Felipe",
                "phone": "954556356",
                "email": "felipe@example.com"
            },
            {
                "name": "Daniel",
                "phone": "954556357",
                "email": "daniel@example.com"
            }];
        db.insert(people);
        
    response.redirect(200, BASE_API_PATH + "/");
});

// Base GET
app.get("/", function (request, response) {
    console.log("INFO: Redirecting to /price-stats");
    response.redirect(301, BASE_API_PATH + "/price-stats");
});


// GET a collection
app.get(BASE_API_PATH + "/price-stats", function (request, response) {
    console.log("INFO: New GET request to /price-stats");
    db.find({}, function (err, contacts) {
        if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            console.log("INFO: Sending price-stats: " + JSON.stringify(contacts, 2, null));
            response.send(contacts);
        }
    });
});


// GET a un anyo
app.get(BASE_API_PATH + "/price-stats/:anyo", function (request, response) {
    var anyo = request.params.anyo;
    if (!anyo) {
        console.log("WARNING: New GET request to /price-stats/:anyo without name, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New GET request to /price-stats/" + anyo);
        db.find({}, function (err, contacts) {
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
                    console.log("WARNING: There are not any contact with name " + anyo);
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
        console.log("WARNING: New POST request to /contacts/ without contact, sending 400...");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New POST request to /contacts with body: " + JSON.stringify(newContact, 2, null));
        if (!newContact.name || !newContact.phone || !newContact.email) {
            console.log("WARNING: The contact " + JSON.stringify(newContact, 2, null) + " is not well-formed, sending 422...");
            response.sendStatus(422); // unprocessable entity
        } else {
            db.find({}, function (err, contacts) {
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
                        db.insert(newContact);
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
            db.find({}, function (err, contacts) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                } else {
                    var contactsBeforeInsertion = contacts.filter((contact) => {
                        return (contact.name.localeCompare(name, "en", {'sensitivity': 'base'}) === 0);
                    });
                    if (contactsBeforeInsertion.length > 0) {
                        db.update({name: name}, updatedContact);
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
    db.remove({}, {multi: true}, function (err, numRemoved) {
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
        db.remove({name: name}, {}, function (err, numRemoved) {
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


app.listen(port);
console.log("Magic is happening on port " + port);