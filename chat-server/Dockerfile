FROM node:22-alpine3.21

WORKDIR /chat-server

COPY . .

RUN yarn

EXPOSE 4000

CMD ["yarn", "start"]