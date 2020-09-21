docker build -t micro-node-service-api-gateway:latest .
winpty docker run -it --rm -p 8080:8080 --name micro-node-service-api-gateway micro-node-service-api-gateway:latest