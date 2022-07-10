FROM node:14.16.1

EXPOSE 3000

WORKDIR /node

COPY package.json /node/package.json

RUN npm install

COPY . /node

CMD ["node", "server.js"]