import { useContext, useState } from "react";


export const useLocation = () => {

  const [errorLocation, setErrorLocation] = useState(null);
  const [location, setLocation] = useState(null);
  
  const getLocation = () => {
     if(navigator.geolocation)  {
      navigator.geolocation.getCurrentPosition
      (position=> {
      getaddress(position.coords.latitude, position.coords.longitude)
      console.log(position.coords.latitude)
      console.log(position.coords.longitude)
      setErrorLocation(null)
      });
      }else{
      console.log("Browser does not support geolocation")
      setErrorLocation(errorLocation);
    } 
  }


  const getaddress = (lat, long) => {
    console.log(lat, long)
    setLocation(lat, long)
  }

     return { errorLocation, getLocation }
}


