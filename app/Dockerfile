FROM node:20-alpine3.21

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 5173

CMD ["yarn", "dev"]