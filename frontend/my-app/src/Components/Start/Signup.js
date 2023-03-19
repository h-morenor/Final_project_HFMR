import React, { useState } from "react";
import { useContext } from "react";

import { useSignup } from "../../hooks/useSignup";
import { Auth } from "../../context/Auth";
import { Navigate } from "react-router-dom";

export default function Signup() {
  const { user } = useContext(Auth);
  const { error, isLoading, signup } = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSignup = async () => {
    await signup(email, password, passwordConfirm);
    window.location.reload();
  };

  return (
    <div>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 m-auto w-[300px] text-black">
        <div className="card-body p-3 pt-1 gap-0 ">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>

            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="input input-bordered"
              required="yes"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="input input-bordered"
              required="yes"
            />
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              className="input input-bordered"
              required="yes"
            />
          </div>
          <div className="form-control mt-1">
            <button
              disabled={isLoading}
              onClick={handleSignup}
              className="btn btn-primary"
            >
              Signup
            </button>

            {error && (
              <div>
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
//{user && (<Navigate replace to="/groupsAround"/>)}
