import React from 'react'
import { useState, useEffect } from 'react'
import marker from "../../assets/person-fill.svg"
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Map, useMap } from "react-leaflet";
//import useLocation2 from '../../hooks/useLocation2'
//import  useLocation  from "../../hooks/useLocation"
import { Auth } from '../../context/Auth';
import { useContext } from 'react'
import useFetchGroups from '../../hooks/useFetchGroups';
import GroupInfo from './GroupInfo'

export default function AccessPage({groups, setGroups}) {

 [groups, setGroups] = useFetchGroups()
  const [error, setError] = useState("");

/////

const {user} = useContext(Auth)
  
  const [location, setLocation] = useState([])


  useEffect(() => {
    setError(null);
    if (!user) {
      console.log('user not found!')
      setError('User not found!');
      return
    }

    const FetchLocation = () => {

     if(navigator.geolocation)  {
      const json = navigator.geolocation.getCurrentPosition
      (position=> {
      //getaddress(position.coords.latitude, position.coords.longitude)
      setLocation([position.coords.latitude, position.coords.longitude])
      //console.log(position.coords.latitude)
      //console.log(position.coords.longitude)
      });

      }else{
      console.log("Browser does not support geolocation")}
     
}

    FetchLocation();
  }, [user]);



//////

 
  
 // [location, setLocation] = useLocation();
  console.log("info")
  console.log(location)


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

    /*
    const show = () => {

        groups.map(group => {   
            console.log(group.venueLocation[0])
            console.log(group.venueLocation[0].split(", ")[1])
        }
    )}
    show()*/
/*
const lat = 37.38605
const lng = -122.08385*/

/*
const lat = location[0]
const lng = location[1]

console.log("example:")
 console.log(lat)

51.505, -0.09

*/

const loc = [51.503, -0.09]

  return (
    <div>
      <div id="map" >
      <MapContainer center={loc} zoom={15} scrollWheelZoom={true}>
        <View center={loc} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={loc}><Popup position={loc}></Popup></Marker> 
      

      {  groups.map(group => (   
        
        <Marker key={group.id} position={[group.venueLocation[0].split(", ")[0], group.venueLocation[0].split(", ")[1]]}>
          <Popup position={[group.venueLocation[0].split(", ")[0], group.venueLocation[0].split(", ")[1]]}>
            <div>
               <GroupInfo group={group} key={group._id} />
              
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
{  usersData.map(user => (    
        <Marker key={user.id} position={[user.address.geo.lat, user.address.geo.lng]}>
          <Popup position={[user.address.geo.lat, user.address.geo.lng]}>
            <div>
              <h1>{user.username}</h1>
            </div>
          </Popup>
          
        </Marker>     
        ))}
*/