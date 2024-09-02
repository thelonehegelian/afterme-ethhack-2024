"use client";
import React, { useState } from "react";

function Navbar() {
  const [activeLink, setActiveLink] = useState<string | null>("Home");

  return (
    <div className="navbar bg-base-100 w-full">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl m-2">Logo</a>
      </div>
      <div className="flex-none flex justify-center w-full">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a
              className={`m-2 ${
                activeLink === "Home" ? "btn btn-primary" : ""
              }`}
              onClick={() => setActiveLink("Home")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className={`m-2 ${
                activeLink === "Dashboard" ? "btn btn-primary" : ""
              }`}
              onClick={() => setActiveLink("Dashboard")}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              className={`m-2 ${
                activeLink === "About" ? "btn btn-primary" : ""
              }`}
              onClick={() => setActiveLink("About")}
            >
              About
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="flex-none ml-auto">
        <button className="btn btn-neutral m-2">Connect</button>
      </div> */}
    </div>
  );
}

export default Navbar;
