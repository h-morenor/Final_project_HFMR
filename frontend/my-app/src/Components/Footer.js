import React, { useEffect, useContext, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Auth } from "../context/Auth";

export default function Footer() {
  const { user } = useContext(Auth);
  const navigate = useNavigate();

  return (
    <div className="flex bg-cyan-900 justify-center">
      <div className="w-[370px] sm:w-[650px] md:w-[700px]">
        <div className="flex  bg-cyan-900 px-1 py-3 justify-between  ">
          <div className="indicator">
            <button className="btn border-white p-2 sm:w-[100px]">
              <NavLink to="/groupsAround">Map</NavLink>{" "}
            </button>
          </div>
          {user && (
            <button className="btn border-white p-2 ">
              {" "}
              <NavLink replace to="/:id/new">
                New Group
              </NavLink>{" "}
            </button>
          )}
          {
            // <div className="indicator">
            //   <span className="indicator-item  badge-secondary "></span>
            //   <button className="btn border-white">
            //     <NavLink to="/peopleAround">People around</NavLink>{" "}
            //   </button>
            // </div>
          }

          <div className="indicator">
            <span className="indicator-item  badge-secondary "></span>
            <button className="btn border-white p-2">
              <NavLink to="/mygroups">My Groups</NavLink>{" "}
            </button>
          </div>
          <div className="indicator">
            {/* <span className="indicator-item badge badge-secondary">99+</span> */}
            <button
              className="btn border-white p-2"
              onClick={() => {
                navigate(`/${user.userId}/messages`);
              }}
            >
              Messages
            </button>
          </div>
          {/* <div className="indicator">
          <span className="indicator-item  badge-secondary "></span>
          <button className="btn border-white">Premium</button>
        </div> */}
        </div>
      </div>
    </div>
  );
}
