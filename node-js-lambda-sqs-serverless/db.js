const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};


/* var MongoClient = require('mongodb').MongoClient;

var uri = process.env.DB; */


module.exports = connectToDatabase = () => {
    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    /* MongoClient.connect(uri, function(err, db) {
        isConnected = true;
        console.log("connected");
        if (err) {
            console.log("Error: " + err);
        }
        //db.close();
    }); */
    return mongoose.connect(process.env.DB, options)
        .then(db => {
                console.log("opening db");
                isConnected = db.connections[0].readyState;
                console.log("opened db");
            },
            err => { console.log("ERRORRRRRRR: " + err); }
        );
};