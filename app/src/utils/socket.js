import { io } from "socket.io-client";

const URL = "http://localhost:4000";

export default io(URL, {
  autoConnect: false,
});
