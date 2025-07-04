const Messages = ({ messages = [], user }) => {
  return (
    <ul className="list-unstyled mb-0">
      {messages.map((messageItem, index) => (
        <li className="mb-2" key={index}>
          <div
            className={`d-flex justify-content-${
              user === messageItem.user ? "end" : "start"
            }`}
          >
            <span
              className={`badge bg-${
                user === messageItem.user ? "success" : "secondary"
              }`}
            >
              {messageItem.user}
            </span>
            <div className="ms-2">{messageItem.message}</div>
          </div>
        </li>
      ))}

      {/* <li className="mb-2">
        <div className="d-flex justify-content-end">
          <div className="me-2">¡Hola! ¿Cómo estás?</div>
          <span className="badge bg-success">Tú</span>
        </div>
      </li> */}
      {/* ...más mensajes */}
    </ul>
  );
};

export default Messages;
