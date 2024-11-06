FROM node:22

COPY . .

RUN npm install

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "npm start"]