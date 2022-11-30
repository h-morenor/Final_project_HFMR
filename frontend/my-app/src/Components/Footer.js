import React from 'react'

export default function Footer() {
  return (
    <div>

    <div className="flex gap-10 justify-center">
        <div className="indicator">
        <span className="indicator-item  badge-secondary"></span> 
        <button className="btn">Groups around</button>
        </div>
        <div className="indicator">
        <span className="indicator-item  badge-secondary "></span> 
        <button className="btn">People around</button>
        </div>
        <div className="indicator">
        <span className="indicator-item  badge-secondary "></span> 
        <button className="btn">My groups</button>
        </div>
        <div className="indicator">
        <span className="indicator-item badge badge-secondary">99+</span> 
        <button className="btn">Messages</button>
        </div>
        <div className="indicator">
        <span className="indicator-item  badge-secondary "></span> 
        <button className="btn">Premium</button>
        </div>
        
    </div>
    </div>
  )
}
