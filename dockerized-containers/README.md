# Application for e-commerce Hub


REST API to support application features
  - Express as web framework with Typescript
  - Passport js for social authentication 
  - Express CORS enabled
  - boom for error codes & Joi for Validation
  - Winston for logging and express minitor for monitoring
  - Mongoose as ODM driver
  - eslint validation extending airbnb styleguide 
  - git hooks & CI/CD in place
  - Typescript based compilation tsc compiler
  - TDD in progress with Mocha
  - JWT based authentication
  - multiple Mongoose collection with referencing
  - payment gateway Integration
  - Heroku deployment
  - Mini e-commerce platform 

# Cart Application #

"It's just simple application to provide REST APIs for mini e-commerce platform where individual can buy products and can pay the bills
 - microservices architecture
 - Client application in React
 - User Auth microservices
 - Cart services
 - Admin Microservices  

![deividing services](/screens/02.png "title")
![Micro services with Node JS](/screens/03.png "title")



```
# Application Execution
```javascript
git clone  repo
npm install
npm run startdev
tsc -- watch
```
# Application configuration
```javascript
env.sh need to be added locally 
export NODE_ENV="dev"
export PORT="3005"
export MONGOURL="mongodb://mongo/hello"
export EXPRESS_SESSION_SECRET="************************"
export F_CLIENTID="**************"
export F_CLIENTSECRET="**********************"
```
# update etc/hosts file
```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1       localhost
255.255.255.255 broadcasthost
::1             localhost
127.0.0.1       mysql redis mongo
127.0.0.1       ms-commerce.com
```
# Sevices end-point

- http://ms-commerce.com/api/v1  Auth services
- http://ms-commerce.com/admin/v1 Admin APIs
- http://ms-commerce.com/admin/v1  Cart APIs

# Application NPM Script
```javascript
"start": "cd dist &&  nodemon server.js",
"prestart": "tsc && cp -r uploads dist/ && cp -r app/global dist/app/",
"clean" : "rm -rf dist",
"copy" : "cp -r uploads dist/ && cp -r app/global dist/app/"
```
