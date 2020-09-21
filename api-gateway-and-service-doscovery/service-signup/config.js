/**
 * Created by domenicovacchiano on 07/07/16.
 */

var fs = require('fs');

function Config() {
    var config = JSON.parse(fs.readFileSync(__dirname  + '/config.json'), 'utf8');
    return{
        server:{
            id:config.server.id,
            port:config.server.port,
            isCluster:config.server.isCluster,
            https:config.server.https,
            headers:config.server.headers,
            httpsKeyContent:config.server.https.key ? fs.readFileSync(__dirname  + "/" + config.server.https.key) :null,
            httpsCaContent:config.server.https.ca ? fs.readFileSync(__dirname  + "/" + config.server.https.ca) :null,
        },
        api:{
            route:config.api.route,
            modules:config.api.modules
        },
        serviceRegistry:config.serviceRegistry
        
    };

}
module.exports=Config;
