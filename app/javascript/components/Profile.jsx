import React, { useContext } from "react";
import { Link } from "react-location";
import { UserContext } from "./UserContext";

import profileIMg from "../../assets/images/profile_page.svg";
export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const data = { user };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(`/update_profile`, requestOptions);
      const res = await response.json();
      setUser(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <main className="profile">
      <div className="container profile__form">
        <form className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="form-control profile__input"
              type="text"
              name="username"
              value={user.username}
              onChange={onChangeHandler}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form-control profile__input"
              type="email"
              name="email"
              value={user.email}
              onChange={onChangeHandler}
            />
          </div>

          <div className="actions text-center">
            <button
              type="button"
              className="btn btn-default my-2"
              onClick={updateUser}
            >
              Update
            </button>
            <Link to="/" className="nav-link mx-0">
              Home
            </Link>
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
