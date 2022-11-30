import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from "./Header"
import Footer from "./Footer"
import Publicity from "./Publicity"


export default function LayoutApp() {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
        <Publicity/>
    </div>
  )
}
