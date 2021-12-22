import React, { useState, useEffect, useContext } from "react";
import { ActiveRoomContext } from "../ActiveRoomContext";
import { RoomsContext } from "../RoomsContext";
import { UserContext } from "../UserContext";

export default function Rooms(props) {
  const { user } = useContext(UserContext);
  const { activeRoom, setActiveRoom } = useContext(ActiveRoomContext);
  const { rooms, setRooms } = useContext(RoomsContext);
  const [room, setRoom] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    setNotification(true);
  }, [props.updatedRoom]);

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

  const getRoom = async (id) => {
    if (id === props.updatedRoom.id) {
      setNotification(false);
    }
    const url = `/room/${id}.json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setActiveRoom(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <section className="card mobile col-md-12 col-lg-2">
        <div className="dropdown">
          <button
            className="btn dropdown-toggle card-header title w-100"
            type="button"
            id="dropdownMenuButton2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Rooms
          </button>
          <ul
            className="dropdown-menu w-100"
            aria-labelledby="dropdownMenuButton2"
          >
            {rooms ? (
              (rooms || []).map((r) => {
                return (
                  <li
                    key={r.id}
                    className="list-group-item text"
                    onClick={() => getRoom(r.id)}
                  >
                    {r.name}
                    {r.id === props.updatedRoom.id &&
                    props.updatedRoom.id !== activeRoom.id &&
                    notification ? (
                      <span className="badge bg-danger ms-2">New</span>
                    ) : null}
                  </li>
                );
              })
            ) : (
              <li className="list-group-item text">No rooms yet</li>
            )}
            <form className="d-flex flex-column justify-content-center">
              <div className="form-group">
                <input
                  className="form-control profile__input w-50 my-2"
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
          </ul>
        </div>
      </section>
      <section className="card desktop col-md-12 col-lg-2">
        <div className="card-header  title">Rooms</div>
        <ul className="list-group list-group-flush">
          {rooms ? (
            (rooms || []).map((r) => {
              return (
                <li
                  key={r.id}
                  className="list-group-item text"
                  onClick={() => getRoom(r.id)}
                >
                  {r.name}
                  {r.id === props.updatedRoom.id &&
                  props.updatedRoom.id !== activeRoom.id &&
                  notification ? (
                    <span className="badge bg-danger ms-2">New</span>
                  ) : null}
                </li>
              );
            })
          ) : (
            <li className="list-group-item text">No rooms yet</li>
          )}
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
    </>
  );
}
