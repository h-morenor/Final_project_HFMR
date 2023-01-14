import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Auth } from "../../context/Auth";
import { NavLink } from "react-router-dom";
import pen from '../../assets/pen.png'

export default function GroupCard() {

    const {user} = useContext(Auth)
  const [error, setError] = useState("");
  const [group, setGroup] = useState([])
  const { id } = useParams();

const navigate = useNavigate();

  useEffect(() => {
    setError(null);
    if (!user) {
      console.log('user not found!')
      setError('User not found!');
      return
    }

    const goGroup = async () => {

       console.log(id)
      console.log(`/api/group/${id}`)
      const response = await fetch(`/api/group/${id}`, {
      //method: "GET",
      headers: {
        //"Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
       },
     }
     );
    const json = await response.json();
    console.log(json)
    setGroup(json)
    
    };

    goGroup();
  }, [user]);
  

  const checkUser = () =>{

  }


    return (
    <div>
    <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row   dark:border-gray-700 dark:bg-gray-800 ">
      
  <img
    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    src="https://placeimg.com/200/280/arch"
    alt=""
  />
  <img className="w-7" src={pen} alt="pen" onClick={() => {navigate(`/group/edit/${group._id}`)}}></img>
  <div className="flex flex-col justify-between p-4 leading-normal">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {group.title}
    </h5>
    {(user.userId=group.createdBy) && ( <div><span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full">Group owner</span>  <button className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded-full hover:shadow-lg"><NavLink replace to="/:id/new">Modify group</NavLink></button> </div>  )}
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {group.description}
    </p>
    {(user.userId!=group.createdBy) && ( <button className="p-2 border border-red-400 rounded-md w-20" >  Join  </button>      )}
  </div>
</div>


    </div>
  )
}

