import React from 'react'
import { NavLink } from "react-router-dom";
import image from "../../assets/app_image.jpg"

export default function hero() {
  return (
    <div>
        <div className="hero  m-auto bg-cyan-800"> <img src={image} alt=" logo" />
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">GroupUp / FriendFlow / Gathery</h1>
                <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                <div className="flex gap-10 justify-center">
                <button className="btn btn-primary"><NavLink to="/login">Login</NavLink></button>
                <button className="btn btn-primary"><NavLink to="/signup">Signup</NavLink></button>
                </div>
                </div>
            </div>
        </div>
</div>
  )
}