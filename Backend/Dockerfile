FROM node:18.14.1 AS builder
WORKDIR /app 
COPY . .
RUN rm -rf node_modules
RUN npm install 
RUN npm run build 


CMD [ "npm", "start" ]

