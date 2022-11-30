import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <div>
        

        <div className="navbar bg-base-100">
            <div className="flex-1"> <NavLink to="/logged/user"> <a className="btn btn-ghost normal-case text-xl">daisyUI</a></NavLink>
                
            </div>
            
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img src="https://placeimg.com/80/80/people" />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li><a className="justify-between"><NavLink to="/logged/user/profile">Profile</NavLink>                        
                        
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a><NavLink to="/login">Signout</NavLink></a></li>
                </ul>
                </div>

        </div>

    </div>
  )
}
