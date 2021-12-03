import React, { useState } from "react";
import { Link } from "react-location";
import Chat from "./chat/Chat";
import Editor from "./chat/Editor";
import Rooms from "./chat/Rooms";
import { RoomContext } from "./RoomContext";
export default function Home() {
  const [activeRoom, setActiveRoom] = useState("");
  return (
    <section className="container">
      <main className="d-lg-flex justify-content-center">
        <RoomContext.Provider value={{ activeRoom, setActiveRoom }}>
          <Rooms />
          <Chat />
          <Editor />
        </RoomContext.Provider>
      </main>
      <div className="d-flex justify-content-center">
        <Link to="/profile" className="nav-link profile-link">
          Profile
        </Link>
      </div>
    </section>
  );
}
