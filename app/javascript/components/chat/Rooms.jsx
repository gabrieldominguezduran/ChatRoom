import React, { useState, useEffect, useContext } from "react";
import { RoomContext } from "../RoomContext";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");
  const { setActiveRoom } = useContext(RoomContext);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const url = "/rooms.json";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const createRoom = async (e) => {
    e.preventDefault();
    setRoom("");
    const data = { room };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(`/create_room`, requestOptions);
      const res = await response.json();
      setRooms(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getRoomId = (id) => {
    const room = rooms.find((r) => id === r.id);
    setActiveRoom(room);
  };
  return (
    <section className="card room col-md-12 col-lg-2">
      <div className="card-header  title">Rooms</div>
      <ul className="list-group list-group-flush">
        {rooms.map((r) => {
          return (
            <li
              key={r.id}
              className="list-group-item text"
              onClick={() => getRoomId(r.id)}
            >
              {r.name}
            </li>
          );
        })}
      </ul>
      <form className="d-flex flex-column justify-content-center">
        <div className="form-group">
          <input
            className="form-control profile__input"
            type="text"
            name="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-default my-2 w-sm-50 mx-auto"
          onClick={createRoom}
        >
          Add new
        </button>
      </form>
    </section>
  );
}
