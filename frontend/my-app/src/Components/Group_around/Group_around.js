import React from "react";
import { useState, useEffect, useRef } from "react";
import marker from "../../assets/person-fill.svg";
//import marker from "../../assets/user.png";

import L from "leaflet";
import { MapContainer, TileLayer, ZoomControl, Marker, Popup} from "react-leaflet";
import { Map, useMap } from "react-leaflet";
import { Auth } from "../../context/Auth";
import { useContext } from "react";
import useFetchGroups from "../../hooks/useFetchGroups";
import GroupInfo from "./GroupInfo";
import { useGeolocated } from "react-geolocated";
import useGeoLocation from "../../hooks/useFindLocation"
import useFindLocation from "../../hooks/useFindLocation"
//import useFindLocation from "react-router-dom";


export default function AccessPage({ groups, setGroups}) {

  console.log("component render")

  //, lat, setLat, long, setLong, location, setLocation 

  const [filterTitle, setFilterTitle] = useState("");
  [groups, setGroups] = useFetchGroups();
  const [error, setError] = useState("");
  const { user } = useContext(Auth);
  const [groupsFiltered, setGroupsFiltered] = useFetchGroups()
  const [location, setLocation] = useState([51.505, -0.1])
  console.log(location)

  const [errorLocation, setErrorLocation] = useState()


//Filters
const handleFilters = (e) => {
  if(e.key === 'Enter' && e.target.value !== "" ) {
   // if(e.target.lenght > 0) {
    console.log("input")
    e.preventDefault(); 
    const value = e.target.value
    setFilterTitle(value.toUpperCase())
    e.target.value = ""  
}}

//Modify filter every time it changes
useEffect(()=>{
console.log("hello")

if(filterTitle===""){
  setGroupsFiltered(groups)
    }else{
      const filteredGroupsArray = groups.filter((group) => {
      const groupt =  group.title.toUpperCase()
      return groupt.search(filterTitle) !== -1
      })
      setGroupsFiltered(filteredGroupsArray)
    }

},[filterTitle])

//Delete tags
const removeFilters = () =>{
  setFilterTitle("")
}

///////////////////////////////////////////////////

//Location



const getLocation = () => {
      if(navigator.geolocation)  {
      navigator.geolocation.getCurrentPosition ((position) => {
      //  console.log(position.coords)
      //getaddress(position.coords.latitude, position.coords.longitude)
      //
      //console.log(position.coords.latitude)
      //console.log(position.coords.longitude)
      console.log([position.coords.latitude, position.coords.longitude])
      setLocation([position.coords.latitude, position.coords.longitude])
      setErrorLocation(null)
      });
      }else{
      console.log("Browser does not support geolocation")
      setErrorLocation(errorLocation);
      }
       
  }

  useEffect(()=>{
       getLocation()
       
  },[])
     
  /*
 const showposition = async() => {
  await 
 }
  useEffect(()=>{
        
        showposition()
  },[])
     
*/


//console.log(lat, setLat, long, setLong)



/*
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 1000,
    });

  useEffect(() => {
    setError(null);
    if (!user) {
      console.log("user not found!");
      setError("User not found!");
      return;
    }
    

    if(!isGeolocationAvailable) {
      console.log("Location not available")
      console.log("Coords", coords)
      setError("Location not available");
    }

    if(!isGeolocationEnabled) {
      console.log('Geolocation not enabled')
      setError("Location not available");
    }
    console.log('latitud', )
    return console.log('coords', coords)
    
  }, []);
*/

    // const FetchLocation = () => {
    //   if (navigator.geolocation) {
    //     const json = navigator.geolocation.getCurrentPosition((position) => {
    //       //getaddress(position.coords.latitude, position.coords.longitude)
    //       setLocation([position.coords.latitude, position.coords.longitude]);
    //       //console.log(position.coords.latitude)
    //       //console.log(position.coords.longitude)
    //     });
    //   } else {
    //     console.log("Browser does not support geolocation");
    //   }
    // };
    // FetchLocation();

  //////
  



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
//console.log({coords})
//console.log(GeolocationCoordinates.latitude)

/*
useEffect( ()=>{
navigator.geolocation.getCurrentPosition(async (position) => {
 console.log(position.coords.latitude, position.coords.longitude);
 setLocation([position.coords.latitude, position.coords.longitude]);
})}, [])

console.log(location)

*/



 function View({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
  }

  const icon = new L.icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [46, 56],
  });


  const loc = [51.505, -0.1];

  return (
    <div >
      <div id="map">

      <div className="flex gap-1z items-center m-1">
        <input
          type="text"
          onKeyDown={handleFilters}         
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Filter by group title"
        />

        <div >
          {(filterTitle !=="") &&
              <span 
              className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
              onClick={() => removeFilters()}>{filterTitle}
              </span>       
          }
        </div>
      </div>
        
        <MapContainer
          center={location}
          zoom={15}
          scrollWheelZoom={true}
          ZoomControl={false}
        >

          <View center={location} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location}>
            <Popup position={location}>
              <div>
                 <h1>{user.name}</h1>
              </div>
            </Popup>
          </Marker>

          {
                    
          groupsFiltered.map((group) => (
            <Marker
              key={group.id}
              position={[
                group.venueLocation[0].split(" ")[0],
                group.venueLocation[0].split(" ")[1],
              ]}
            >
              <Popup
                position={[
                  group.venueLocation[0].split(" ")[0],
                  group.venueLocation[0].split(" ")[1],
                ]}
              >
                <div>
                  <GroupInfo group={group} key={group._id} />
                </div>
              </Popup>
            </Marker>
          ))
          }
        </MapContainer>
      </div>
    </div>
  );
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
