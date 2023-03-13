import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Hero from "./Hero";

export default function LayoutHome() {
  return (
    <div className="bg-cyan-800 ">
      <div className="h-screen flex items-center m-auto">
        <div className=" w-3/5 ">
          {" "}
          <Hero />
        </div>
        <div className="  flex justify-cente ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

//justify-center items-center

/*,div className="h-[700px] w-[600px] rotate-3 bg-cyan-600 z-40">
          <div className="flex z-40"></div>
        </div>*/
