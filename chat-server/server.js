import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Conexión :D", socket.id);

  socket.on("new-message", (data) => {
    console.log("mensaje recibido", data);
    io.emit("new-message", data);
  });
});

io.listen(4000);
