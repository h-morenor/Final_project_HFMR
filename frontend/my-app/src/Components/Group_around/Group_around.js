import React from 'react'
import { useState, useEffect, useRef } from 'react'
import marker from "../../assets/person-fill.svg"
import L from 'leaflet'
import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet'
import { Map, useMap } from "react-leaflet";
//import { geosearch } from 'esri-leaflet-geocoder'
//import useLocation2 from '../../hooks/useLocation2'
//import  useLocation  from "../../hooks/useLocation"
import { Auth } from '../../context/Auth';
import { useContext } from 'react'
import useFetchGroups from '../../hooks/useFetchGroups';
import GroupInfo from './GroupInfo'
//import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'

export default function AccessPage({groups, setGroups}) {

 [groups, setGroups] = useFetchGroups()
  const [error, setError] = useState("");



/////// test find


const findAddress = () =>{
//const fetch = require('node-fetch');
const requestOptions = {
  method: 'GET',
};

fetch("https://api.geoapify.com/v1/geocode/autocomplete?text=Mosco&apiKey=178a21e11be94a9f8f92b2a0221c8ac5", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

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
const mapRef = useRef();
useEffect(() => {
  console.log("hola F")
  const {current = {}} = mapRef;
  
 //const {leafletElement: map} = current;
 console.log(mapRef)
  /*if (!map) return;

map.locate({
  setView:true
});

const control = geosearch();
control.addTo(map)

control.on('results', handleOnSearch)*/

},[mapRef]);

function handleOnSearch(data){
  console.log("Search results", data)
}
  
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

const loc = [51.505, -0.1]

  return (
    <div>
      <div id="map" >
      <MapContainer ref={mapRef} center={loc} zoom={15} scrollWheelZoom={true} ZoomControl={false}>
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