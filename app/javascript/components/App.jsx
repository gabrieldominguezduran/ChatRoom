import React from "react";
import { Router, Route, Outlet, ReactLocation } from "react-location";

import Home from "./Home";
import Profile from "./Profile";

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

const location = new ReactLocation();

export default function App() {
  return (
    <Router routes={routes} location={location}>
      <Outlet />
    </Router>
  );
}
