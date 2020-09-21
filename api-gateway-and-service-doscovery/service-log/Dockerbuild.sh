docker build -t micro-node-service-log:latest .
winpty docker run -it --rm -p 8084:8084 --name micro-node-service-log micro-node-service-log:latest