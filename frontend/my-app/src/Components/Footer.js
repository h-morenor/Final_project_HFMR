import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <div >

    <div className="flex gap-10 justify-center bg-cyan-900 p-3">
        <div className="indicator">
        <span className="indicator-item  badge-secondary"></span> 
        <button className="btn border-white"><NavLink to="/groupsAround">Groups around</NavLink> </button>
        </div>
        
{<div className="indicator">
        <span className="indicator-item  badge-secondary "></span> 
        <button className="btn border-white"><NavLink to="/peopleAround">People around</NavLink> </button>
        </div>}

        <div className="indicator">
        <span className="indicator-item  badge-secondary "></span> 
        <button className="btn border-white"><NavLink to="/mygroups">My Groups</NavLink> </button>
        </div>
        <div className="indicator">
        <span className="indicator-item badge badge-secondary">99+</span> 
        <button className="btn border-white"><NavLink to="/logged/user/id/messages">Messages</NavLink> </button>
        
        </div>
        <div className="indicator">
        <span className="indicator-item  badge-secondary "></span> 
        <button className="btn border-white">Premium</button>
        </div>
        
    </div>
    </div>
  )
}


/*

        */