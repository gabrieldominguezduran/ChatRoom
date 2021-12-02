import React from "react";
import { Link } from "react-location";
import Chat from "./chat/Chat";
import Editor from "./chat/Editor";
import Rooms from "./chat/Rooms";
export default function Home() {
  return (
    <section className="container">
      <main className="d-lg-flex justify-content-center">
        <Rooms />
        <Chat />
        <Editor />
      </main>
      <div className="d-flex justify-content-center">
        <Link to="/profile" className="nav-link profile-link">
          Profile
        </Link>
      </div>
    </section>
  );
}
