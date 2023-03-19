import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { Auth } from "../context/Auth";
import groupup from "../assets/groupup.jpg";

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
    <div className="flex navbar bg-cyan-900  justify-center">
      <div className=" bg-cyan-900 w-[370px] sm:w-[650px] md:w-[700px] justify-between">
        <div
          className="flex gap-2"
          onClick={() => {
            navigate(`/groupsAround`);
          }}
        >
          <img
            className="object-cover w-[90px] h-[55px]  border border-2 border-white  mx-auto bg-white cursor-pointer"
            src={groupup}
          />
          {/* <h3 className="btn btn-ghost normal-case p-0 m-0 text-5xl text-yellow-300"></h3> */}
          {/* <NavLink to="/logged/user/id"></NavLink> */}
        </div>
        <div className="flex gap-1 md:gap-5 text-white">
          {user && (
            <div className="dropdown dropdown-end ">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar md:z-10"
              >
                <div className="w-10 rounded-full bg-white ">
                  <img
                    // className="object-cover w-24 h-24 -mt-12  border border-2 border-white rounded-full mx-auto bg-white"
                    src={`http://localhost:3000/api/group/image/${picture}`}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="   menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-black h-10"
              >
                <li>
                  <a
                    onClick={() => {
                      navigate(`/user/${user.userId}`);
                    }}
                  >
                    Profile
                  </a>
                </li>

                <li onClick={handleLogout}>
                  {" "}
                  <NavLink replace to="/login">
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          {/* {user && (
            <button className="btn  border-0 bg-cyan-900 ">
              {" "}
              <NavLink replace to="/:id/new">
                New Group
              </NavLink>{" "}
            </button>
          )} */}
          {user && (
            <button
              onClick={handleLogout}
              className="btn  border-0 bg-cyan-900 "
            >
              {" "}
              <NavLink replace to="/login">
                Logout
              </NavLink>{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
