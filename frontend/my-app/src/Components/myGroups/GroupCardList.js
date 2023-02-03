import React, { useEffect, useContext, useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import GroupCard from '../Group_profile/GroupCard';
import { Auth } from '../../context/Auth';


export default function GroupCardList({group, groupId, loading}) {


const navigate = useNavigate();
const {user} = useContext(Auth)
const followers = group.followers;
const [existinGroup, setExistinGroup] = useState(false);

console.log(followers)



useEffect(() =>{
  const existing = followers.forEach((follower) => {
      console.log("ownership")
      
      console.log(follower)
      console.log(user.userId)

      //let groupId = group._id
      if (follower === user.userId) {
        setExistinGroup(true);
      }
    });
},[])

  return (
    <div className="gap-2">
    <div onClick={() => {navigate(`/group/${group._id}`)}} className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      
  <img
    className="object-cover w-full rounded-t-lg md:h-12 md:w-48 h-12 md:rounded-none md:rounded-l-lg"
    src="https://placeimg.com/200/280/arch"
    alt=""
  />
  <div className="flex flex-col justify-between p-4 leading-normal">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {group.title}
    </h5>
    {(user.userId===group.createdBy) && ( <div><span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full">Group owner</span> </div>  )}
    {(user.userId!==group.createdBy && existinGroup===true) && ( <div><span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-500 text-white rounded-full">Group follower</span>   </div>  )}

    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {group.description}
    </p>
    <div>
          {group.followers.map((group_pic) => {
            return <p>{group_pic}</p>
        })}

    </div>
  </div>
</div>
    </div>
  )
}
//{navigate(`/group/${group._id}`)}

/*
{myGroups.map((group) => {
          const groupId = group._id
          return <GroupCardList group={group} key={groupId} />;
        })}*/


//import React from 'react';

//const Groups = ({ groups, loading }) => {
  
/*

  return (
    <ul className='list-group mb-4'>
      {groups.map(group => (
        <li key={group.id} className='list-group-item'>
          {group.title}
        </li>
      ))}
    </ul>
  );
};
*/
//export default Groups;