/**
 * Created by domenicovacchiano on 10/07/16.
 */

var express = require('express'),
    router = express.Router(),
    apiGateway = require('../.././api-gateway');

router.post('/', function (req, res,next) {
    var request = new apiGateway();
    request.sendRequest("ServiceSignup","signup",req, res,next);
});

module.exports = router;