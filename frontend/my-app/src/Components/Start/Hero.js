import React from "react";
import { NavLink } from "react-router-dom";
import image from "../../assets/app_image.jpg";
import groupup from "../../assets/groupup.jpg";

export default function hero() {
  return (
    <div>
      <div className="hero m-auto bg-cyan-800 h-vh">
        {/* test */}
        {/* <div className="  shadow-lg bg-white w-screen h-full">
          <div
            className="overflow-hidden rounded-t-lg h-28"
            style={{ backgroundColor: "#9d789b" }}
          /> */}

        <div>
          <img
            className="object-cover w-24 h-24 -mt-12  border border-2 border-white rounded-full mx-auto bg-white"
            src={groupup}
          />
        </div>
        {/* </div> */}
        {/* end test */}
        {/* <img src={image} alt=" logo" /> */}
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className="flex gap-10 justify-center">
              <button className="btn btn-primary">
                <NavLink to="/login">Login</NavLink>
              </button>
              <button className="btn btn-primary">
                <NavLink to="/signup">Signup</NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
