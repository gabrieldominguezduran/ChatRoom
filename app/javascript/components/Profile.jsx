import React from "react";
import { Link } from "react-location";

import profileIMg from "../../assets/images/profile_page";
export default function Profile() {
  return (
    <main className="profile">
      <div className="container profile__form">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <form className="form">
          <div className="form-group">
            <input
              className="form-control profile__input"
              type="text"
              name="username"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control profile__input"
              type="email"
              name="email"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control profile__input"
              type="password"
              name="password"
              id=""
            />
          </div>

          <div className="actions text-center">
            <button className="btn btn-default my-2">Update</button>
          </div>
        </form>
      </div>
      <div className="profile__img-container">
        <img
          src={profileIMg}
          alt="SVG image"
          className="profile__img-profile"
        />
      </div>
    </main>
  );
}
