
#What is this?

This porject/turotial explains how to implement a NodeJs Api Gateway, into a Microservices Architecture based on a Service Registry developed with a server-side discovery pattern.

![ScreenShot](https://raw.github.com/alchimya/micro-node-api-gateway/master/Microservices_Architecture.png)

Actually, this project can be described as a complete Microservices Architecture containing four different microservices accessible via Api Gateway and discovered with a  Service Registry.

#How to setup and configure
To <b>setup</b> the project, it is enough to launch the the bash script <b/>ServicesSetup.sh</b>
<br/>
The <b>configuration</b> it is a bit tedious but it is very easy. In order you need to open all the <b>config.json</b> file that you will find in to each project folder (services and api-gateway) and setup the MondoDB configuration within the serviceRegistry object:

```javascript
  "serviceRegistry":{
      "watchDog":{
        "isEnabled":false,
        "timer":30000
      },
      "database":{
        "name":"my_mongo_db",
        "user":"my_mongo_db_user",
        "password":"my_mongo_db_password",
        "host":"my_mongo_db_host",
        "port":27017
      }
  }
```
A more dtailed description of the configuration is reported in to the section at the bottom of this document.

#How to use
To start all services you must launch the bash script <b>ServicesStart.sh</b>. This script will provide to launch five differente clustered instances of a Node server as reported below:
<br/>

Service         |Port 	     | Service Route | Api Gateway Ruote (8080)
----------------|------------|---------------|-------------------------
service-login		|	8081	     | /api/login	   | /api/account/login   
service-signup  |	8082	     | /api/signup	 | /api/account/signup         	      
service-orders	|	8084	     | /api/orders	 | /api/crm/orders    	      
service-log		  |	8084	     | /api/log	     |	     ----- 
api-gateway		  |	8080	     |   ----	       |	     ----- 

<br/>
For this tutorial, it is allowed to access directly (see Service Route) to the services, but, depending of your requirements, you can block this access, alllowing only the access via Api Gateway (see Api Gateway Ruote) that for this project is listening to the port 8080.

#Api Gateway Configuraiton 
Here, a detailed description of the <b>config.json</b> file for the Pai Gateway
```javascript
{
  "server":{
    "id":"MicroNodeApiGateway",
    "port":8080,
    "isCluster":true,
    "https":{
      "isEnabled":false,
      "key":"",
      "ca":""
    },
    "headers":[
      {"name":"Access-Control-Allow-Origin","value":"*"},
      {"name":"Access-Control-Allow-Headers","value":"Origin, X-Requested-With, Content-Type, Accept"},
      {"name":"Access-Control-Allow-Methods","value":"GET,PUT,POST,DELETE,OPTIONS"}
    ]
  },
  "api":{
    "route":"api",
    "modules":[
      {"name":"login", "path":"api/account", "route":"account/login"},
      {"name":"signup", "path":"api/account", "route":"account/signup"},
      {"name":"orders", "path":"api/crm/orders", "route":"crm/orders"}
    ]
  },
  "services":[
      {"name":"ServiceLog", "endpointId":"log"},
      {"name":"ServiceLogin", "endpointId":"login"},
      {"name":"ServiceSignup", "endpointId":"signup"},
      {"name":"ServiceOrders", "endpointId":"orders"}
  ],
  "serviceRegistry":{
      "database":{
        "name":"my_mongo_db",
        "user":"my_mongo_db_user",
        "password":"my_mongo_db_password",
        "host":"my_mongo_db_host",
        "port":27017
      }
  }
}
```
where:
- server.id: it is a key to identify the microservice
- server.port: it is the port where the microservice is listen to
- server,isCluster: set true if you want you fork the main process depending of your CPU
- server.https: enable/disable the https. It is needed to have the righ certificates to allow clients to connect under https
- server.headers: put here all the response headers that you want to use, for example to enable the cross-origin resource sharing.

- api.route: defines the main route of the api (e.g. /api)
- api.modules: add in to this array all the module (js files for example Express middleware) that you want to use as api modules.
- api.services: add in to this array all the services that you want to implement with your Api Gateway using as service name and entry poin id, the same values used to register a microservice in to the service registry (see below Microservice Configuration and for more detail take a look to this project https://github.com/alchimya/micro-node-service/edit/master/README.md).

- serviceRegistry.watchDog: enable/disable the auto-update for the service registry. Speficy the update seconds into the timer property
- serviceRegistry.databse: configure here your MongoDb connection params. This database represents your Service Registry



#Microservice Configuraiton 
Here, a detailed description of the <b>config.json</b> file for a Microservice
```javascript
{
  "server":{
    "id":"MicroNodeService",
    "port":8080,
    "isCluster":true,
    "https":{
      "isEnabled":false,
      "key":"",
      "ca":""
    },
    "headers":[
      {"name":"Access-Control-Allow-Origin","value":"*"},
      {"name":"Access-Control-Allow-Headers","value":"Origin, X-Requested-With, Content-Type, Accept"},
      {"name":"Access-Control-Allow-Methods","value":"GET,PUT,POST,DELETE,OPTIONS"}
    ]
  },
  "api":{
    "route":"api",
    "modules":[
      {"name":"login", "route":"login"}
    ]
  },
  "serviceRegistry":{
      "watchDog":{
        "isEnabled":false,
        "timer":30000
      },
      "database":{
        "name":"my_mongo_db",
        "user":"my_mongo_db_user",
        "password":"my_mongo_db_password",
        "host":"my_mongo_db_host",
        "port":27017
      }
  }
}
```
where:
- server.id: it is a key to identify the microservice
- server.port: it is the port where the microservice is listen to
- server,isCluster: set true if you want you fork the main process depending of your CPU
- server.https: enable/disable the https. It is needed to have the righ certificates to allow clients to connect under https
- server.headers: put here all the response headers that you want to use, for example to enable the cross-origin resource sharing.

- api.route: defines the main route of the api (e.g. /api)
- api.modules: add in to this array all the module (js files for example Express middleware) that you want to use as api modules

- serviceRegistry.watchDog: enable/disable the auto-update for the service registry. Speficy the update seconds into the timer property
- serviceRegistry.databse: configure here your MongoDb connection params. This database represents your Service Registry


![ScreenShot](https://raw.github.com/alchimya/micro-node-api-gateway/master/micro-node-api-gateway.gif)

