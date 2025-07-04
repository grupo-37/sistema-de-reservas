import socket from "../../utils/socket";

const ConnectionManager = () => {
  const handleChange = (event) => {
    if (event.target.checked) {
      socket.connect();
    } else {
      socket.disconnect();
    }
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input bg-secondary"
        type="checkbox"
        role="switch"
        id="switchCheckChecked"
        onChange={handleChange}
      />
    </div>
  );
};

export default ConnectionManager;
