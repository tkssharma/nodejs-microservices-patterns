var aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/aws-config.json');
var sqs = new aws.SQS();


module.exports.AWSSQSClient = {
    receiveMessage: function(callback) {
        var params = {
            QueueUrl: process.env.SQSURL,
            VisibilityTimeout: 60
        };

        sqs.receiveMessage(params, function(err, data) {
            if (err) {
                callback(err);
            } else {
                callback(null, data);
            }
        });
    },

    sendMessage: function(event, callback) {
        var params = {
            MessageBody: event.body,
            QueueUrl: process.env.SQSURL
        };

        sqs.sendMessage(params, function(err, data) {
            if (err) {
                callback(err);
            } else {
                console.log("Success adding in the Queue: ", data.MessageId);
                callback(null, data);
            }
        });
    }
}