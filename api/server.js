import http from "http";
import api from "./api.js";
import "./config/database.js";

const PORT = process.env.PORT || 8080;
const server = http.createServer(api);

server.on("listening", () => {
  console.log(`Servidor está en linea en el puerto ${PORT}`);
});

server.listen(PORT);
