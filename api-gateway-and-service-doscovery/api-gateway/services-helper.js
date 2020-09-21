/**
 * Created by domenicovacchiano on 11/07/16.
 */

function ServiceHelper(services) {
    return{
        getServiceWithName:function (serviceName) {
            var service=services.filter(function( item ) {
                return item.name == serviceName;
            });
            if (!service || !service[0] || service[0].length==0){
                return null;
            }
            return service[0];
        },
        getService:function (serviceName,serviceEndpointId) {
            var service=services.filter(function( item ) {
                return (item.name == serviceName && item.endpointId == serviceEndpointId);
            });
            if (!service || !service[0] || service[0].length==0){
                return null;
            }
            return service[0];
        }
    };
};

module.exports=ServiceHelper;