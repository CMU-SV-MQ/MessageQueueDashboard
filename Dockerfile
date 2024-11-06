FROM node:22

USER 1000

EXPOSE 3000

COPY . .

RUN npm install

ENTRYPOINT ["sh", "-c", "npm start"]