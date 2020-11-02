require('dotenv').config({ path: './variables.env' });
var sqsClient = require('./sqs');

const connectToDatabase = require('./db');
const Note = require('./models/note');

module.exports.addtodb = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    sqsClient.AWSSQSClient.receiveMessage(function(err, data) {
        console.log(data.Messages[0].Body);
        event.body = data.Messages[0].Body;
    });

    connectToDatabase()
        .then(() => {
            Note.create(JSON.parse(event.body))
                .then(note => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(note)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not create the note.'
                }));
        });
};

module.exports.create = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    sqsClient.AWSSQSClient.sendMessage(event, function(err, data) {
        if (err) {
            console.log("Error adding in the Queue: ", err);
            callback(null, {
                statusCode: err.statusCode || 500,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Could not add to the queue'
            });
        } else {
            console.log("Success adding in the Queue: ", data.MessageId);
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(data)
            });
        }
    });
};

module.exports.getOne = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Note.findById(event.pathParameters.id)
                .then(note => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(note)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the note.'
                }));
        });
};

module.exports.getAll = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log("1");
    connectToDatabase()
        .then(() => {
            Note.find()
                .then(notes => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(notes)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the notes.'
                }))
        });
};

module.exports.update = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Note.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
                .then(note => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(note)
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the notes.'
                }));
        });
};

module.exports.delete = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
        .then(() => {
            Note.findByIdAndRemove(event.pathParameters.id)
                .then(note => callback(null, {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Removed note with id: ' + note._id, note: note })
                }))
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the notes.'
                }));
        });
};