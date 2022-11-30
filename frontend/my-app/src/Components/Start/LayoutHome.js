import React from 'react'
import { Outlet } from 'react-router-dom';
import Hero from "./Hero"


export default function LayoutHome() {
  return (
    <div>
        <Hero/>
        <Outlet/>
        
    </div>
  )
}
