import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <div>

    <div className="flex gap-10 justify-center ">
        <div className="indicator">
        <span className="indicator-item  badge-secondary"></span> 
        <button className="btn"><NavLink to="/logged/user/id/groupsAround">Groups around</NavLink> </button>
        </div>
        <div className="indicator">
        <span className="indicator-item  badge-secondary "></span> 
        <button className="btn"><NavLink to="/logged/user/id/peopleAround">People around</NavLink> </button>
        </div>
        <div className="indicator">
        <span className="indicator-item  badge-secondary "></span> 
        <button className="btn"><NavLink to="/user/mygroups">My Groups</NavLink> </button>
        </div>
        <div className="indicator">
        <span className="indicator-item badge badge-secondary">99+</span> 
        <button className="btn"><NavLink to="/logged/user/id/messages">Messages</NavLink> </button>
        
        </div>
        <div className="indicator">
        <span className="indicator-item  badge-secondary "></span> 
        <button className="btn">Premium</button>
        </div>
        
    </div>
    </div>
  )
}
