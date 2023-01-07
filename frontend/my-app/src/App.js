//import logo from './logo.svg';
import {Route, Routes} from 'react-router-dom'; 
import './App.css';

import Login from "./Components/Start/Login"
import Signup from "./Components/Start/Signup"
import LayoutHome from "./Components/Start/LayoutHome"
import LayoutApp from "./Components/LayoutApp"
import AccessPage from './Components/AccessPage';
import UserProfile from './Components/User_profile/UserProfile';
import {useLogout} from "../src/hooks/useLogout"
import Messages from "./Components/Dialogues/Messages_list"
import Conversation from './Components/Dialogues/Conversation';
import MyGroups from './Components/myGroups/MyGroups';
import PeopleAround from './Components/People_around/People_around';
import GroupsAround from './Components/Group_around/Group_around';
import { useContext, useState } from "react";

//import { useContext } from 'react'
//import { Auth } from '../src/context/Auth';
import { useEffect } from "react"
import NewGroup from './Components/Group_profile/NewGroup';
import GroupCard from './Components/Group_profile/GroupCard';
import useFetchGroups from './hooks/useFetchGroups';

function App() {

  const [groups, setGroups] = useFetchGroups()
 // const [groups, setGroups] = useState([]);
 //const { user } = useContext(Auth);

  const { logout } = useLogout();
      
    
  useEffect(() => {
    logout();
  }, []);


  return (
    <Routes>
      <Route element={<LayoutHome/>}>
        <Route path="" />
        <Route path="/" />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Route>
      <Route element={<LayoutApp/>} groups={groups} setGroups={setGroups}>
        <Route path="/logged/user/:id" element={<AccessPage/>}/>
        <Route path="/logged/user/:id/groupsAround" element={<GroupsAround/>}/>
        <Route path="/logged/user/:id/peopleAround" element={<PeopleAround/>}/>
        <Route path="/user/mygroups" element={<MyGroups/>} groups={groups} setGroups={setGroups}/>
        <Route path="/logged/user/:id/messages" element={<Messages/>}/>
        <Route path="/logged/user/:id/messages/conversation" element={<Conversation/>}/>
        <Route path="/:id/new" element={<NewGroup/>}/>
        <Route path="/group/:id" element={<GroupCard/>} groups={groups} setGroups={setGroups}/>
      </Route>
      <Route path="/logged/user/id/profile" element={<UserProfile/>}/>

      
    </Routes>
  );
}

export default App;


/*
const { user } = useContext(Auth);
  const { logout } = useLogout();
      
    
     useEffect(() => {
    logout();
  }, []);
    */
