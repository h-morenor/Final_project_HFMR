import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {useLogout} from "../hooks/useLogout"
import { Auth } from '../context/Auth';

import { useLocation } from "../hooks/useLocation"

export default function Header() {
 
  const { user } = useContext(Auth);

  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
 
  const {errorLocation, getLocation} = useLocation();

  //const handleLocation = async () => { getLocation()}


  return (
    <div>
        

        <div className="navbar bg-base-100">
            <div className="flex-1"> <NavLink to="/logged/user/id"> <h2 className="btn btn-ghost normal-case text-xl">X-PROJEXT</h2></NavLink>
                
            </div>
            <div className="flex gap-5">
             {user && (<button  onClick={getLocation}   className="p-2 border border-red-400 rounded-md"   >   Get location      </button>      )}
             {user && (<button                           className="p-2 border border-red-400 rounded-md"   >   <NavLink replace to="/:id/new">New Group</NavLink>       </button>      )}
             {user && (<button  onClick={handleLogout}   className="p-2 border border-red-400 rounded-md"   >   <NavLink replace to="/login">Logout</NavLink>      </button>      )}
             </div>
            <div className="dropdown dropdown-end ">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar md:z-10">
                    <div className="w-10 rounded-full">
                    <img src="https://placeimg.com/80/80/people" />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 md:z-10">
                    <li className="justify-between"><NavLink to="/logged/user/id/profile">Profile</NavLink></li>
                    <li><a>Settings</a></li>
                    <li onClick={handleLogout}> <NavLink replace to="/login">Signout</NavLink></li>
                </ul>
                </div>

        </div>

    </div>
  )
}
