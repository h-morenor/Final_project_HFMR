import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { Auth } from "../context/Auth";

export default function Header() {
  const { user } = useContext(Auth);

  const picture = user.picUser;

  const navigate = useNavigate();

  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  //const {errorLocation, getLocation} = useLocation();

  //const handleLocation = async () => { getLocation()}

  //{user && (<button  onClick={getLocation}   className="p-2 border border-red-400 rounded-md"   >   Get location      </button>      )}

  return (
    <div className="navbar bg-cyan-900 gap-1">
      <div className="flex-1 text-white">
        {" "}
        <NavLink to="/logged/user/id">
          {" "}
          <h2 className="btn btn-ghost normal-case text-xl">X-PROJEXT</h2>
        </NavLink>
      </div>
      <div className="flex gap-5 text-white">
        {user && (
          <button className="btn border-white">
            {" "}
            <NavLink replace to="/:id/new">
              New Group
            </NavLink>{" "}
          </button>
        )}
        {user && (
          <button onClick={handleLogout} className="btn border-white">
            {" "}
            <NavLink replace to="/login">
              Logout
            </NavLink>{" "}
          </button>
        )}
      </div>
      {user && (
        <div className="dropdown dropdown-end ">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar md:z-10"
          >
            <div className="w-10 rounded-full bg-white">
              <img
                // className="object-cover w-24 h-24 -mt-12  border border-2 border-white rounded-full mx-auto bg-white"
                src={`http://localhost:3000/api/group/image/${picture}`}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 md:z-10"
          >
            <li
              onClick={() => {
                navigate(`/user/${user.userId}`);
              }}
            >
              Profile
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={handleLogout}>
              {" "}
              <NavLink replace to="/login">
                Signout
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
