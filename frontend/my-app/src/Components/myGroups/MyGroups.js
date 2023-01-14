import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Auth } from '../../context/Auth';
import GroupCardList from './GroupCardList';


export default function MyGroups() {
  
  const {user} = useContext(Auth)
  const [error, setError] = useState("");
  const [myGroups, setMyGroups] = useState([])


  useEffect(() => {
    setError(null);
    if (!user) {
      console.log('user not found!')
      setError('User not found!');
      return
    }

    const fetchGroups = async () => {
      const response = await fetch("/api/group/mygroups", {
      headers: {
        "Authorization": `Bearer ${user.token}`
        },
     });
    const json = await response.json();
    console.log(json)
    setMyGroups(json)
    };

    fetchGroups();
  }, [user]);
  
  
   
    return (
    <div className='flex flex-col gap-1'> 
      
      <div className=''>
        {myGroups.map((group) => {
          const groupId = group._id
          return <GroupCardList group={group} key={groupId} />;
        })}
      </div>

      <div className="btn-group justify-center align-center m-2">
        <button className="btn">1</button>
        <button className="btn btn-active">2</button>
        <button className="btn">3</button>
        <button className="btn">4</button>
      </div>

    </div>
  )
}

/*




<div>
        {groups.map((group) => {
          return <GroupCard group={group} key={group._id} />;
        })}
      </div>
*/