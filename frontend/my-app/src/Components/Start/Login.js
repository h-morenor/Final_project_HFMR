import React,  { useState } from 'react'
import { useContext } from 'react'

import { useLogin } from "../../hooks/useLogin";
import { Auth } from '../../context/Auth';
import { Navigate } from "react-router-dom";
//import { useLocation } from "../../hooks/useLocation"

export default function Login() {

  const { user } = useContext(Auth);
  const { error, isLoading, login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {  await login(email, password);  };

  //const {errorLocation, getLocation} = useLocation();

  //  const handleLocation = async () => { getLocation()}


  return ( 
    <div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto">
                <div className="card-body">
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
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    </div>
                    <div className="form-control mt-6">
                    <button disabled={isLoading} onClick={handleLogin}  className="btn btn-primary">Login</button>
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

/*
{user && (Navigate("/logged/user/id"))}
navigate("/logged/user/id");
{user && {handleLocation}}
*/