/**
 * Created by domenicovacchiano on 10/07/16.
 */

var debug = require('debug')('http'),
    config= require ('./config')(),
    request = require('request'),
    servicesHelper = require('./services-helper')(config.services),
    serviceRegistry = require ('micro-node-service-registry-lib')({
        name:config.serviceRegistry.database.name,
        user:config.serviceRegistry.database.user,
        password:config.serviceRegistry.database.password,
        host:config.serviceRegistry.database.host,
        port:config.serviceRegistry.database.port,
        connectionPool:config.serviceRegistry.database.connectionPool
    });

var ApiGateway = function () {
    
};


ApiGateway.prototype.sendRequest=function (serviceName,serviceEndpointId,req, res,next) {
    
    service=servicesHelper.getService(serviceName,serviceEndpointId);

    serviceRegistry.find(service.name,service.endpointId,function (error,service) {
        if (service && !error){
            console.log(service);
            request({
                url: service.endpointUrl,
                method: 'POST',
                json:req.body
            }, function(error, response, body){
                if (error){
                    return next(error)
                }else {
                    debug(body);
                    return res.status(response.statusCode).send(body);
                }
            });
        } else {
            if (error){
                return next(error);
            }else {
                return res.status(500).send(responseLib.errorResponse(1001,"Service not found","Application Error"));
            }

        }
    });
};

module.exports=ApiGateway;