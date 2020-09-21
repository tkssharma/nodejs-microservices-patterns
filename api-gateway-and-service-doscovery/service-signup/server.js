/**
 * Created by domenicovacchiano on 07/07/16.
 */

var config= require ('./config')(),
    address = require('network-address'),
    express=require('express'),
    debug = require('debug')('http'),
    bodyParser = require('body-parser'),
    morgan= require('morgan'),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length,
    netLib = require ('micro-node-net-lib'),
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
    }
    server = netLib.server(configServer),
    serviceRegistry = require ('micro-node-service-registry-lib')({
        name:config.serviceRegistry.database.name,
        user:config.serviceRegistry.database.user,
        password:config.serviceRegistry.database.password,
        host:config.serviceRegistry.database.host,
        port:config.serviceRegistry.database.port,
        connectionPool:config.serviceRegistry.database.connectionPool
    });

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

        //load API route(s)
        config.api.modules.forEach(function(item) {
            //console.log(item);
            app.use('/' + config.api.route + "/" + item.route, require('./' + item.name));
        });

        server.create(function (err,server) {
            if (!err){
                //load API route(s) and register services
                registerServer();
                if (config.serviceRegistry.watchDog.isEnabled){
                    setInterval(function(){
                        registerServer();
                    }, config.serviceRegistry.watchDog.timer);
                }
                console.log("### " + config.server.id + " -> " + (config.server.https ? "HTTPS" : "HTTP") + " Server started on port " +
                    config.server.port + (config.server.isCluster ? " cluster worker " + cluster.worker.id : ""));
            } else {
                debug(err);
            }
        });

        server.registerExitHandler(function () {
            unregisterServer();
            debug("Server Exit Handled");
        });

        var registerServer=function () {
            if (!config.server.isCluster || cluster.worker.id===1){
                debug("registerServer");
                config.api.modules.forEach(function(item) {
                    //console.log(item);
                    app.use('/' + config.api.route + "/" + item.route, require('./' + item.name));
                    serviceRegistry.register({
                        serviceId:config.server.id,
                        serviceHost:address(),
                        servicePort:config.server.port,
                        serviceProtocol:config.server.https.isEnabled ? "https" : "http",
                        endpointId:item.name,
                        endpointPath:config.api.route + "/" + item.route
                    }, function (err,item) {
                        if (err){
                            console.log(app.next())
                            debug(err);
                        }
                    });
                });
            }
        };
        var unregisterServer = function () {
            if (!config.server.isCluster || cluster.worker.id===1){
                debug("unregisterServer");
                config.api.modules.forEach(function(item) {
                    serviceRegistry.unregister(config.server.id,item.name,function (err,item) {
                        if (err){
                            //TODO update flag inactive?
                            console.log(err);
                        }
                        if (!config.server.isCluster){
                            process.exit();
                        }
                    });
                });
            }
        };
        
        
    }
