import http from "http";
import api from "./api.js";
import "./config/database.js";
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(api);

server.on("listening", () => {
  console.log("Servidor está en linea en el puerto 8080");
});

server.listen(8080);
