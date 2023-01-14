
import axios from 'axios'


const FetchGroups = async () => {

const response = await fetch("/api/group/groups");
    const json = await response.json();
    console.log(json)
   return json

}
export default FetchGroups


