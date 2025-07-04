import { useState, useEffect } from "react";

import ConnectionState from "../components/Chat/ConnectionState";
import Messages from "../components/Chat/Messages";
import Form from "../components/Chat/Form";
import ConnectionManager from "../components/Chat/ConnectionManager";

import socket from "../utils/socket";

const Chat = () => {
  const [isConnected, setIsConnected] = useState(false);

  const [messages, setmessages] = useState([]);

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const onNewMessage = (message) => {
    setmessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("new-message", onNewMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("new-message", onNewMessage);
    };
  }, []);

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <ConnectionState isConnected={isConnected} />
              <ConnectionManager />
            </div>
            <div
              className="card-body"
              style={{ height: "300px", overflowY: "auto" }}
            >
              {/* Lista de mensajes */}
              <Messages messages={messages} user="Usuario1" />
            </div>
            <div className="card-footer">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
