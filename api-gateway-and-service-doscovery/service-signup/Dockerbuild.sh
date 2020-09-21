docker build -t micro-node-service-signup:latest .
winpty docker run -it --rm -p 8082:8082 --name micro-node-service-signup micro-node-service-signup:latest