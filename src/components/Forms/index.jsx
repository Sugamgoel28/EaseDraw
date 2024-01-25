import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";

const Forms = ({ uuid, socket, setUser }) => {
  return (
    <div className="row h-100 pt-5">
      <div className="shadow-sm bg-light col-md-4 border border-primary rounded-4 mt-5 p-5 form-box p-5 d-flex align-items-center justify-content-center mt-5 mx-auto flex-column">
        <h1 className="text-primary fw-bold">Create Room</h1>
        <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
      </div>
      <div className="shadow-sm bg-light col-md-4 col border border-primary mt-5 rounded-4 p-5 form-box p-5 d-flex align-items-center justify-content-center mt-5 mx-auto flex-column">
        <h1 className="text-primary fw-bold">Join Room</h1>
        <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
      </div>
    </div>
  );
};

export default Forms;
