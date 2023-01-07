import React,  { useState } from 'react'
import { useContext } from 'react'

import { useSignup } from "../../hooks/useSignup";
import { Auth } from '../../context/Auth';
import { Navigate } from "react-router-dom";

export default function Signup() {

  const { user } = useContext(Auth);
  const { error, isLoading, signup } = useSignup(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {  await signup(email, password);  };

  return (
     <div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto">
                <div className="card-body " >
                    <div className="form-control">
                        <label className="label">
                        <span className="label-text">Email</span>
                        </label>
                        
                        <input type="text" placeholder="email" value={email} onChange={(e) => {   setEmail(e.target.value);  }} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="text" placeholder="password" value={password}    onChange={(e) => {     setPassword(e.target.value);    }} className="input input-bordered" />
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input type="text" placeholder="Confirm password" className="input input-bordered" />
                    
                    </div>
                    <div className="form-control mt-6">
                    <button disabled={isLoading} onClick={handleSignup} className="btn btn-primary">Signup</button>
                     {user && (<Navigate replace to="/logged/user/id"/>)}
                            {error && (
                                <div>
                                    <p>{error}</p>
                                </div>
                            )}
                    </div>
                </div>
        </div>        
    </div>
  )
}

//<NavLink to="/logged/user">Signup</NavLink>
//{user && (<button  onClick={handleLogout}   className="p-2 border border-red-400 rounded-md"   >   Logout      </button>      )}
//{user && (<NavLink to="/logged/user">Signup</NavLink>  )}
//<NavLink replace to="/login">Signout</NavLink>

//{user && (<Navigate replace to="/logged/user/id"/>)}