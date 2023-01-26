FROM node:16.17.0

WORKDIR /usr/srs/app

COPY . .

RUN npm install ci

EXPOSE 7000

CMD ["npm", "run", "start"]