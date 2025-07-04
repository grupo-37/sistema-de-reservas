import socket from "../../utils/socket";

import { useState } from "react";

const Form = () => {
  const [messageInput, setmessageInput] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    socket.emit("new-message", { message: messageInput, user: "Usuario1" });
    setmessageInput("");
  };

  return (
    <form className="d-flex">
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setmessageInput(e.target.value)}
        className="form-control me-2"
        placeholder="Escribe un mensaje..."
      />
      <button className="btn btn-primary" type="submit" onClick={handleClick}>
        Enviar
      </button>
    </form>
  );
};

export default Form;
