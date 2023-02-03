import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Auth } from "../../context/Auth";
import { NavLink } from "react-router-dom";
import pen from '../../assets/pen.png'
import trash from '../../assets/trash.svg'
import DeleteGroupModal from "./DeleteGroupModal";

export default function GroupCard() {

  const {user} = useContext(Auth)
  const [error, setError] = useState("");
  const [group, setGroup] = useState([])
  const { id } = useParams();
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [followersArray, setFollowersArray] = ([])
  const [existinGroup, setExistinGroup] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    
    // Get labels of ownership

    console.log(json.followers)
    const groupFollowers = json.followers
    const existing = groupFollowers.forEach((follower) => {
      console.log("ownership")
      
      console.log(follower)
      console.log(user.userId)

      //let groupId = group._id
      if (follower === user.userId) {
        setExistinGroup(true);
      }
    });

    /*
    if (existinGroup === false) {
      console.log("not in group");
    }
   */

    };

    goGroup();
  }, [user]);
  






const handleJoinGroup = async () => {
 const response = await fetch(`/api/group/${id}/join`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
       }
      })
     
    const json = await response.json();
    console.log(json)
     setExistinGroup(true);
}

//

const handleExitGroup = async () => {
 const response = await fetch(`/api/group/${id}/exit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
       }
      })
    const json = await response.json();
    console.log(json)
   navigate(`/mygroups`, {replace:true})
}


    return (
    <div>
    <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row   dark:border-gray-700 dark:bg-gray-800 ">
      
  <img
    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    src="https://placeimg.com/200/280/arch"
    alt=""
  />
  {(user.userId===group.createdBy) && ( <img className="w-7" src={pen} alt="pen" onClick={() => {navigate(`/group/edit/${group._id}`)}}></img> )}
  
  {(user.userId===group.createdBy) && (  <div>
    <img className="w-7" src={trash} alt="trash"   onClick={() => setShowModal(true)}></img>
    {<DeleteGroupModal showModal={showModal} onClose={() => setShowModal(false)} id={id}/>}
  </div> )}


  <div className="flex flex-col justify-between p-4 leading-normal">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {group.title}
    </h5>
    {(user.userId===group.createdBy) && ( <div><span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full">Group owner</span>   </div>  )}
    {(user.userId!==group.createdBy && existinGroup===true) && ( <div><span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-500 text-white rounded-full">Group follower</span>   </div>  )}
    <h2 >Address</h2>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {group.address}
    </p>
    <h2>Description</h2>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {group.description}
    </p>
    {(existinGroup!==true) && ( <button className="p-2 border border-red-400 rounded-md w-20" onClick={() => handleJoinGroup()}>  Join  </button>      )}
    {(user.userId!==group.createdBy && existinGroup===true) && ( <button className="p-2 border border-red-400 rounded-md w-20" onClick={() => handleExitGroup() }>  Exit  </button>      )}
  </div>
</div>


    </div>
  )
}



//<button className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-400 text-white rounded-full hover:shadow-lg"><NavLink replace to="/:id/new">Modify group</NavLink></button>