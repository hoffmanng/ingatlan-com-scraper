FROM node:10-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY src ./src
RUN mkdir data

CMD npm start $SEARCH_URL
