import React, { useContext } from "react";
import { RoomContext } from "../RoomContext";

export default function Chat() {
  const { activeRoom } = useContext(RoomContext);
  console.log(activeRoom);
  return (
    <section className="chat col-md-12 col-lg-5 col-xl-4">
      {activeRoom ? (
        <div className="card chat__container" id="chat1">
          <div className="chat__card card-header d-flex justify-content-center align-items-center p-3 text-white border-bottom-0">
            <p className="mb-0 fw-bold chat__name">{activeRoom.name}</p>
          </div>
          <div className="card-body">
            <div className="d-flex flex-row justify-content-start mb-4">
              <img
                className="chat__img"
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava1-bg.png"
                alt="avatar 1"
              />
              <div className="p-3 ms-3 chat__msg">
                <p className="small mb-0">
                  Hello there! Nice to see yuo around here...
                </p>
              </div>
            </div>

            <div className="d-flex flex-row justify-content-end mb-4">
              <div className="p-3 me-3 border chat__my-msg">
                <p className="small mb-0">
                  Thank you, I really like to be here.
                </p>
              </div>
              <img
                className="chat__img"
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava2-bg.png"
                alt="avatar 1"
              />
            </div>
            <div className="d-flex flex-row justify-content-start mb-4">
              <img
                className="chat__img"
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava1-bg.png"
                alt="avatar 1"
              />
              <div className="p-3 ms-3 chat__msg">
                <p className="small mb-0">...</p>
              </div>
            </div>

            <div className="form-outline">
              <textarea
                className="form-control"
                id="textAreaExample"
                rows="4"
                placeholder="Type your message"
              ></textarea>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="chat__text">Open or create one room</h1>
      )}
    </section>
  );
}
