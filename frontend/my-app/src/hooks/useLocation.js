import { useContext, useState, useEffect } from "react";


export const useLocation = (location, setLocation) => {

  const [errorLocation, setErrorLocation] = useState(null);
   [location, setLocation] = useState([]);
  
  const getLocation = () => {
     if(navigator.geolocation)  {
      navigator.geolocation.getCurrentPosition
      (position=> {
      //getaddress(position.coords.latitude, position.coords.longitude)
      setLocation([position.coords.latitude, position.coords.longitude])
      //console.log(position.coords.latitude)
      //console.log(position.coords.longitude)
      setErrorLocation(null)
      });
      }else{
      console.log("Browser does not support geolocation")
      setErrorLocation(errorLocation);
    } 
  }

  /*const getaddress = (lat, long) => {
    setLocation([lat, long])
    //console.log(location)
  }*/

  useEffect(() => {
    getLocation()
    
console.log("got location")
    console.log(location)
  }, []) 
  
     return  {getLocation}
}
export default useLocation


