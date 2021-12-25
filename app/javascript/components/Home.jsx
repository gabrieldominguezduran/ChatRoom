import React, { useState, useEffect } from "react";
import { Link } from "react-location";
import Chat from "./chat/Chat";
import PlayGround from "./chat/PlayGround";
import Rooms from "./chat/Rooms";
import { ActiveRoomContext } from "./ActiveRoomContext";
import { RoomsContext } from "./RoomsContext";
import RoomChannel from "../channels/room_channel";

export default function Home() {
  const [activeRoom, setActiveRoom] = useState({});
  const [rooms, setRooms] = useState([]);
  const [updatedRoom, setUpdatedRoom] = useState({});

  useEffect(() => {
    RoomChannel.received = (data) => {
      setUpdatedRoom(data.room);
    };
  }, []);

  return (
    <section className="container">
      <main className="d-lg-flex justify-content-center">
        <RoomsContext.Provider value={{ rooms, setRooms }}>
          <ActiveRoomContext.Provider value={{ activeRoom, setActiveRoom }}>
            <Rooms updatedRoom={updatedRoom} />
            <Chat updatedRoom={updatedRoom} />
            <PlayGround />
          </ActiveRoomContext.Provider>
        </RoomsContext.Provider>
      </main>
      <div className="d-flex justify-content-center">
        <Link to="/profile" className="nav-link profile-link">
          Profile
        </Link>
      </div>
    </section>
  );
}
