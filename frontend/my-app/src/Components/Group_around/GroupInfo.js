import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function GroupInfo({group}) {

const navigate = useNavigate();

  return (

        
 <div onClick={() => {navigate(`/group/${group._id}`)}} className="flex flex-wrap justify-center space-x-2 items-end">
        <span className="rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max"></span>
          <img className="rounded-full w-5 h-5 max-w-none" alt="A" src="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg" />
          <div className="flex items-center px-3 py-2">  {group.title} </div>
          <div>{group.description}</div>
      </div>

    
  )
}
