docker build -t micro-node-service-orders:latest .
winpty docker run -it --rm -p 8083:8083 --name micro-node-service-orders micro-node-service-orders:latest