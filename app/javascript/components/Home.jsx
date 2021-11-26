import React from "react";
import { Link } from "react-location";
export default function Home() {
  return (
    <div className="container">
      Hello from Home
      <Link to="/profile" className="nav-link">
        Profile
      </Link>
    </div>
  );
}
