FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# npm install
RUN  npm install
# Run npm install --global grpc --unsafe-perm

EXPOSE 3002 9202
CMD [ "npm", "run", "watchserver" ]
CMD [ "npm", "run", "startdev" ]

