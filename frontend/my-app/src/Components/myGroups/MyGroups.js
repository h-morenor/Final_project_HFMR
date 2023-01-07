import React from 'react'
import GroupCard from '../Group_profile/GroupCard';
import { useState, useEffect, useContext } from 'react';
import { Auth } from '../../context/Auth';
import { json } from 'react-router-dom';
import GroupCardList from './GroupCardList';
import { findByTestId } from '@testing-library/react';

export default function MyGroups() {
  
  const {user} = useContext(Auth)
  const [error, setError] = useState("");
 const [myGroups, setMyGroups] = useState()

  useEffect(() => {
    setError(null);
    if (!user) {
      console.log('user not found!')
      setError('User not found!');
      return
    }

    const fetchGroups = async () => {
        try{
            //const response = await fetch("http://localhost:3000/api/group/user/mygroups")
            
      const response = await fetch("/api/group/user/mygroups", {
      method: "GET",
      headers: {
 //       "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
        },
      
     });

    const json = await response.json()
    //console.log(json)
    setMyGroups(json)

    const resp = await json.forEach(group => {
  try{
  
  const groupName = (group.id)
  console.log("hola0")
  
  console.log(groupName)

  }catch (error) {
    throw new Error(error.message);
  }
  })

    //return myGroups
    //setMyGroups(json.data);

 /*     const response = await fetch("/api/group/user/mygroups", {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      setMyGroups(json);
*/

        }catch (error) {
    console.error(error);
  }
    };

    fetchGroups();

  }, [user]);
  
  
  
  
    return (
    <div> 
<div>
    {console.log("hola1")} {console.log(myGroups)}




</div>

    <div className="btn-group justify-center">
        <button className="btn">1</button>
        <button className="btn btn-active">2</button>
        <button className="btn">3</button>
        <button className="btn">4</button>
    </div>

    </div>
  )
}

/*

    {myGroups.map((group) => <GroupCardList key={myGroups.title} myGroups={myGroups} />)}
    
)}


<div>
        {groups.map((group) => {
          return <GroupCard group={group} key={group._id} />;
        })}
      </div>
*/