FROM node:16.17.0

WORKDIR /usr/src/app

COPY . .

EXPOSE 7000

CMD ["npm", "run", "start"]