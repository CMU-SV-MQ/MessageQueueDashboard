FROM node:22


EXPOSE 3000

WORKDIR /app

COPY . .

RUN npm install

RUN chmod -R 777 /app

USER 1000

CMD ["npm", "start"]

