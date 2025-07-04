const ConnectionState = ({ isConnected = false }) => {
  return (
    <h5>
      Conexión:{" "}
      <span className={`badge text-bg-${isConnected ? "success" : "danger"}`}>
        {isConnected ? "Activa" : "Desactivada"}
      </span>
    </h5>
  );
};

export default ConnectionState;
