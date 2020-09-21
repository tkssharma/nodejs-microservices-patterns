/**
 * Created by domenicovacchiano on 10/07/16.
 */

var config= require ('./config')(),
    express=require('express'),
    debug = require('debug')('http'),
    bodyParser = require('body-parser'),
    morgan= require('morgan'),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length,
    netLib = require ('micro-node-net-lib'),
    apiGateway = require('./api-gateway'),
    configServer= {
        server:{
            port:config.server.port
        },
        https:{
            isEnabled:config.server.https.isEnabled,
            key:config.server.httpsKeyContent,
            ca:config.server.httpsCaContent
        },
        express:{
            app:null
        },
        exitHandlers:["exit","SIGINT","SIGTERM"]
    },
    server = netLib.server(configServer);

    if (cluster.isMaster && config.server.isCluster) {
        debug("cpus:" + numCPUs);
        for (var i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', function(worker, code, signal) {
            console.log("cluster exit");
            debug('Worker %d died with code/signal %s. Restarting worker...', worker.process.pid, signal || code);
            cluster.fork();
        });
        
    } else {

        var app=express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(morgan('dev'));
        configServer.express.app = app;
        
        //header(s) setting
        app.all('/*', function(req, res, next) {
            config.server.headers.forEach(function(item) {
                //console.log(item);
                res.header(item.name, item.value);
            });
            next();
        });

        //pu here a middleware to check the api key
        

        //load API route(s)
        config.api.modules.forEach(function(item) {
            //console.log(item);
            app.use('/' + config.api.route + "/" + item.route, require('./' + item.path + "/" +  item.name));
        });
        
        server.create(function (err,server) {
            if (!err){
                console.log("### " + config.server.id + " -> " + (config.server.https ? "HTTPS" : "HTTP") + " Server started on port " +
                    config.server.port + (config.server.isCluster ? " cluster worker " + cluster.worker.id : ""));
            } else {
                debug(err);
            }
        });
        

        //Http Error Handling on
        app.use(function(err, req, res, next) {
            debug(err);
            var request = new apiGateway();
            request.sendRequest("ServiceLog","log",req, res,next);
            res.status(500).send({
                code:1000,
                message:"Application Error",
                domain:"Application Error"
            });
        });
    }