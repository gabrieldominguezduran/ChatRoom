import React, { useState, useEffect } from "react";
import { Link } from "react-location";

import profileIMg from "../../assets/images/profile_page";
export default function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = "/profile.json";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log("error", error);
    }
  };

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
