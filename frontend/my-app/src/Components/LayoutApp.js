import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Publicity from "./Publicity";

export default function LayoutApp() {
  return (
    <div className="flex flex-col h-screen justify-between bg-cyan-800">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
