import React, { useEffect, useContext, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Auth } from "../context/Auth";

export default function Footer() {
  const { user } = useContext(Auth);
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex gap-10 justify-center bg-cyan-900 p-3">
        <div className="indicator">
          <span className="indicator-item  badge-secondary"></span>
          <button className="btn border-white">
            <NavLink to="/groupsAround">Groups around</NavLink>{" "}
          </button>
        </div>

        {
          <div className="indicator">
            <span className="indicator-item  badge-secondary "></span>
            <button className="btn border-white">
              <NavLink to="/peopleAround">People around</NavLink>{" "}
            </button>
          </div>
        }

        <div className="indicator">
          <span className="indicator-item  badge-secondary "></span>
          <button className="btn border-white">
            <NavLink to="/mygroups">My Groups</NavLink>{" "}
          </button>
        </div>
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">99+</span>
          <button
            className="btn border-white"
            onClick={() => {
              navigate(`/${user.userId}/messages`);
            }}
          >
            Messages
          </button>
        </div>
        <div className="indicator">
          <span className="indicator-item  badge-secondary "></span>
          <button className="btn border-white">Premium</button>
        </div>
      </div>
    </div>
  );
}

/*

        */
