FROM node:10-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
RUN mkdir data

CMD node cron.js $SEARCH_URL
