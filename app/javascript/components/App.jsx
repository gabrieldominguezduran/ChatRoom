import React, { useState, useEffect } from "react";
import {
  Router,
  Route,
  Outlet,
  ReactLocation,
  createHashHistory,
} from "react-location";

import Home from "./Home";
import Profile from "./Profile";
import { UserContext } from "./UserContext";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
];

const hashHistory = createHashHistory();

const location = new ReactLocation({
  history: hashHistory,
});

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const url = "/profile.json";
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Router routes={routes} location={location}>
      <UserContext.Provider value={{ user, setUser }}>
        <Outlet />
      </UserContext.Provider>
    </Router>
  );
}
