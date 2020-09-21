/**
 * Created by domenicovacchiano on 07/07/16.
 */

var express = require('express'),
    router = express.Router(),
    debug = require('debug')('http'),
    config= require ('./config')()

router.post('/', function (req, res,next) {
    return res.status(200).send("## Login -> This is just a test response ;-)");
});

module.exports = router;