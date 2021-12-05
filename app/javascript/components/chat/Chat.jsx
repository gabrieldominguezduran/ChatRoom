import "channels";
import React, { useContext, useState, useEffect } from "react";
import { RoomContext } from "../RoomContext";
import { UserContext } from "../UserContext";
import RoomChannel from "../../channels/room_channel";

export default function Chat() {
  const { activeRoom, setActiveRoom } = useContext(RoomContext);
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    RoomChannel.received = (data) => setActiveRoom(data.room);
  }, []);

  const createMessage = async (e, roomId) => {
    e.preventDefault();
    setMessage("");
    const data = { roomId, message };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(`/create_msg`, requestOptions);
      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const messagesList = (activeRoom.messages || []).map((msg) => {
    if (user.id === msg.user_id) {
      return (
        <div key={msg.id} className="d-flex flex-row justify-content-end mb-4">
          <div className="p-3 me-3 border chat__my-msg">
            <p className="small mb-0">{msg.body}</p>
          </div>
          <img
            className="chat__img"
            src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava2-bg.png"
            alt="avatar 1"
          />
        </div>
      );
    } else {
      return (
        <div
          key={msg.id}
          className="d-flex flex-row justify-content-start mb-4"
        >
          <img
            className="chat__img"
            src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava1-bg.png"
            alt="avatar 1"
          />
          <div className="p-3 ms-3 chat__msg">
            <p className="small mb-0">{msg.body}</p>
          </div>
        </div>
      );
    }
  });

  return (
    <section className="chat col-md-12 col-lg-5 col-xl-4">
      {Object.entries(activeRoom).length > 0 ? (
        <div className="card chat__container" id="chat1">
          <div className="chat__card card-header d-flex justify-content-center align-items-center p-3 text-white border-bottom-0">
            <p className="mb-0 fw-bold chat__name">{activeRoom.name}</p>
          </div>
          <div className="card-body chat__body">{messagesList}</div>
          <div className="form-outline">
            <form className="chat__form">
              <textarea
                className="form-control"
                id="textAreaExample"
                rows="3"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-default my-1"
                  type="button"
                  onClick={(e) => createMessage(e, activeRoom.id)}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <h1 className="chat__text py-5">Open or create one room</h1>
      )}
    </section>
  );
}
