
import axios from 'axios'


const FetchLocation = () => {

     if(navigator.geolocation)  {
      const json = navigator.geolocation.getCurrentPosition
      (position=> {
      //getaddress(position.coords.latitude, position.coords.longitude)
      ([position.coords.latitude, position.coords.longitude])
      //console.log(position.coords.latitude)
      //console.log(position.coords.longitude)
      });
      return json
      }else{
      console.log("Browser does not support geolocation")}
     
}
export default FetchLocation

