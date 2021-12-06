import React, { useState } from "react";
import { Link } from "react-location";
import Chat from "./chat/Chat";
import Editor from "./chat/Editor";
import Rooms from "./chat/Rooms";
import { ActiveRoomContext } from "./ActiveRoomContext";
import { RoomsContext } from "./RoomsContext";

export default function Home() {
  const [activeRoom, setActiveRoom] = useState({});
  const [rooms, setRooms] = useState([]);

  return (
    <section className="container">
      <main className="d-lg-flex justify-content-center">
        <RoomsContext.Provider value={{ rooms, setRooms }}>
          <ActiveRoomContext.Provider value={{ activeRoom, setActiveRoom }}>
            <Rooms />
            <Chat />
            <Editor />
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
