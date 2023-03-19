import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Hero from "./Hero";

import { NavLink } from "react-router-dom";
import image from "../../assets/app_image.jpg";
import groupup from "../../assets/groupup.jpg";

export default function LayoutHome() {
  return (
    <div className="h-screen bg-white overflow-y-scroll">
      <div className="  shadow-lg bg-white w-screen bg-blue-600">
        <div
          className="overflow-hidden rounded-t-lg h-32 "
          // style={{ backgroundColor: "#9d789b" }}
        />

        <div className="object-cover w-[200px] h-[200px] -mt-28 rounded-full mx-auto bg-white border border-2  border-gray-500 p-10 content-center items-center">
          <img
            className=" h-[110px] m-auto align-center content-center items-center "
            src={groupup}
          />
        </div>
      </div>

      <div className="hero-content text-center text-neutral-content w-full flex w-screen flex-col md:flex-row md:gap-5 m-0 p-0 ">
        <div className="w-[360px] flex flex-col gap-5 ">
          <div>
            <h1 className="font-bold text-3xl text-black mt-3">Welcome</h1>
          </div>
          <div>
            <p className="text-black">
              In our website you can easily connect with like-minded individuals
              and form groups based on your shared interests. Find or create a
              group in anything you're passionate about, from book clubs to
              hiking groups. Join us today and start building meaningful
              connections.
            </p>
          </div>
        </div>
        <div className="w-[300px]">
          <div className="flex gap-10 justify-center p-1">
            <button className="btn btn-primary  btn-sm">
              <NavLink to="/login">Login</NavLink>
            </button>
            <button className="btn btn-primary  btn-sm">
              <NavLink to="/signup">Signup</NavLink>
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

//     <div className="bg-cyan-800 ">
//       <div className="h-screen flex items-center m-auto">
//         <div className=" w-3/5 ">
//           {" "}
//           <Hero />
//         </div>

//       </div>
//     </div>
//   );
// }

//justify-center items-center

/*,div className="h-[700px] w-[600px] rotate-3 bg-cyan-600 z-40">
          <div className="flex z-40"></div>
        </div>*/
