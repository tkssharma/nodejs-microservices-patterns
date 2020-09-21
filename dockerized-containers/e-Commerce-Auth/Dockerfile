FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# npm install
RUN npm install

EXPOSE 3001 9201
CMD [ "npm", "run", "watchserver" ]
CMD [ "npm", "run", "startdev" ]
