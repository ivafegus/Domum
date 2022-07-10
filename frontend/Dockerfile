FROM node:14.16.1

EXPOSE 5000

WORKDIR /react

COPY package.json /react/package.json

RUN npm install

COPY . /react

CMD ["npm", "start"]