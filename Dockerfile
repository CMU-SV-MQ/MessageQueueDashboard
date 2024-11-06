FROM node:22


EXPOSE 3000

WORKDIR /app

RUN chmod -R 777 /app

COPY . .

RUN npm install

USER 1000

CMD ["npm", "start"]

