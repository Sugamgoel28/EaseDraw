import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({uuid, socket, setUser}) => {

  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();

    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    }
    setUser(roomData);
    navigate(`/${roomId}`);
    console.log(roomData);
    socket.emit("userJoined", roomData);
  };  

  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div className="form-group border-0">
        <div className="input-group d-flex align-items-center justify-content-center border-0">
          <input
            type="text"
            value={roomId}
            placeholder="Generate Code"
            className="form-control my-2 border-0 rounded-0"
            disabled
          />
          <div className="input-group-append">
            <button className="btn btn-secondary btn-sm me-1 m-2 py-2" onClick={()=> setRoomId(uuid())} type="button">
              Generate
            </button>
            <button
              className="btn btn-outline-danger btn-sm me-2 py-2"
              type="button"
            >
              Copy
            </button>
          </div>
        </div>
        </div>
        <button type="submit" onClick={handleCreateRoom} className="mt-4 btn form-control btn-primary">Create Room</button>
    </form>
  );
};

export default CreateRoomForm;
