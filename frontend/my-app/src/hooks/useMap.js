
import React from 'react'
import marker from "../assets/person-fill.svg"
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Map, useMap } from "react-leaflet";
import usersData from "./Data/userData.json"

export default function AccessPage() {

  
  function View({ center }) {
  const map = useMap()
  map.setView(center)
  return null
}

const icon = new L.icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [46, 56]
  })

 /* setLat(data.location.lat)
    setLong(data.location.lng)*/

    
    const show = () => {
        usersData.map(user => {   
            console.log(user.address.geo.lat)
            console.log( user.address.geo.lng)
        }
    )}

    show()


const lat = 37.38605
const lng = -122.08385

const lat2 = 54.5856
const lng2 = -1.3173

  return (
    <div>
      <div id="map" >
      <MapContainer center={[51.505, -0.09]} zoom={15} scrollWheelZoom={true}>
        <View center={[51.505, -0.09]} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[51.505, -0.09]}></Marker> 

      {  usersData.map(user => (    
        <Marker key={user.id} position={[user.address.geo.lat, user.address.geo.lng]}>
          <Popup position={[user.address.geo.lat, user.address.geo.lng]}>
            <div>
              <h1>{user.username}</h1>
            </div>
          </Popup>
          
        </Marker>     
        ))}

      </MapContainer>
            
    </div>
    
    </div>
  )
}



/*

import { useContext } from "react"
import { Auth } from "../context/Auth"

export const useLogout = () => {
    const {dispatch} = useContext(Auth)

    const logout = () => {
        // delete user from the localstorage
        localStorage.removeItem('user')
        // Wipe out the Auth context (user:null) / dipatch 'LOGOUT'
        dispatch({type: "LOGOUT"})
    }

    return {logout}
}*/