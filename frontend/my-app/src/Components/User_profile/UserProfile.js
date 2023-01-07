import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from "../Header"

export default function UserProfile() {
  return (
    <div>
        <Header/>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
            
            <button className="btn btn-primary"><NavLink to="/logged/user/id">Close</NavLink></button>
            </div>
        </div>
        </div>

    </div>
  )
}
