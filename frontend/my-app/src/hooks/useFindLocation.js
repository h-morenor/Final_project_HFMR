import React, { useEffect, useState } from 'react'

function useFindLocation() {
  const [location, setLocation] = useState([])
  const [errorLocation, setErrorLocation] = useState()

  
const getLocation = () => {
      if(navigator.geolocation)  {
      navigator.geolocation.getCurrentPosition ((position) => {
        console.log(position.coords)
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
     
  return [location, setLocation]
}

export default useFindLocation


/*import React, { useState, useEffect } from "react";

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = (error) => {
        setLocation({
            loaded: true,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);
    console.log(location)
    return location;
};

export default useGeoLocation;*/

/////2

/*import { useContext, useState, useEffect } from "react";
import FetchLocation from "../helpers/FetchLocation";

export const useLocation = () => {

  const [errorLocation, setErrorLocation] = useState(null);
  const [location, setLocation] = useState([]);
  

   const fetchLocation = async () => {
    const loc = await FetchLocation()
     setLocation(loc)
    console.log("location fetch completed")
  }

  useEffect(() => {
    fetchLocation()
  }, []) 
  return [location, setLocation]
}
export default useLocation*/



/////1


  /**/

  /*
  const getaddress = (lat, long) => {
    setLocation([lat, long])
    //console.log(location)
  }

  useEffect(() => {
    getLocation()
    
console.log("got location")
    console.log(location)
  }, []) 
  
     return  {getLocation}
}*/
//

 