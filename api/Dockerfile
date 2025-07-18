# OS ✅
# node ✅
# mis archivos ✅
# instalar dependencias en la imagen ✅
FROM node:22-alpine3.21

WORKDIR /api

COPY . .

RUN yarn

EXPOSE 8080

CMD ["yarn", "start"]