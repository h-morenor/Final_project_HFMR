import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Signup() {
  return (
     <div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body " >
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Email</span>
                        </label>
                        <input type="text" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="text" placeholder="password" className="input input-bordered" />
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input type="text" placeholder="Confirm password" className="input input-bordered" />
                    
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn btn-primary"><NavLink to="/logged/user">Signup</NavLink></button>
                    </div>
                </div>
        </div>        
    </div>
  )
}
