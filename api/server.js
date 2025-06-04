import http from "http";

const server = http.createServer();

server.on("listening", () => {
  console.log("Servidor está en linea en el puerto 8080");
});

server.listen(8080);
