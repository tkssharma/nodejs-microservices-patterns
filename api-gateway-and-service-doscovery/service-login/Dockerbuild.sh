docker build -t micro-node-service-login:latest .
winpty docker run -it --rm -p 8081:8081 --name micro-node-service-login micro-node-service-login:latest