//import logo from './logo.svg';
import { Route, Routes, Navigate } from "react-router-dom";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FilesUploadComponent from "./Components/files-upload-component";
import "./App.css";

import Login from "./Components/Start/Login";
import Signup from "./Components/Start/Signup";
import LayoutHome from "./Components/Start/LayoutHome";
import LayoutApp from "./Components/LayoutApp";
//import AccessPage from './Components/AccessPage';
import UserProfile from "./Components/User_profile/UserProfile";
import { useLogout } from "../src/hooks/useLogout";
import Messages from "./Components/Messages/Messages_list";
import Conversation from "./Components/Dialogues/Conversation";
import MyGroups from "./Components/myGroups/MyGroups";
import PeopleAround from "./Components/People_around/People_around";
import GroupsAround from "./Components/Group_around/Group_around";
import { useContext, useState } from "react";

//import { useContext } from 'react'
import { Auth } from "../src/context/Auth";
import { useEffect } from "react";
import NewGroup from "./Components/Group_profile/NewGroup";
import GroupCard from "./Components/Group_profile/GroupCard";
//import useFetchGroups from './hooks/useFetchGroups';
import { DataContext } from "./context/DataContext";

//import { useLocation } from './hooks/useLocation';
import EditUser from "./Components/User_profile/EditUser";
import ModifyGroup from "./Components/Group_profile/ModifyGroup";

import NewPosts from "./Components/Posts/NewPosts";
import EditPosts from "./Components/Posts/Editpost";

function App() {
  const { user } = useContext(Auth);
  //const [groups, setGroups] = useFetchGroups()
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState();

  // const [location, setLocation] = useState([]);
  const { logout } = useLogout();

  /* const {getLocation} = useLocation();

useEffect(() => {
  if (user) {
 getLocation(location, setLocation)
 console.log(location)
  }
  }, []);

  /*useEffect(() => {
    logout()
  }, []);*/

  return (
    <Routes>
      <Route element={<LayoutHome />}>
        <Route path="" />
        <Route path="/" />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/groupsAround" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/groupsAround" />}
        />
      </Route>
      <Route
        element={user ? <LayoutApp /> : <Navigate to="/login" />}
        groups={groups}
        setGroups={setGroups}
      >
        <Route
          path="/logged/user/:id"
          element={<GroupsAround />}
          groups={groups}
          setGroups={setGroups}
        />
        <Route
          path="/groupsAround"
          element={<GroupsAround />}
          groups={groups}
          setGroups={setGroups}
        />
        <Route path="/peopleAround" element={<PeopleAround />} />
        <Route path="/mygroups" element={<MyGroups />} />
        <Route path="/:id/messages" element={<Messages />} />
        <Route
          path="/logged/user/:id/messages/conversation"
          element={<Conversation />}
        />
        <Route path="/:id/new" element={<NewGroup />} />
        <Route
          path="/group/:id"
          element={<GroupCard />}
          group={group}
          setGroup={setGroup}
        />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route
          path="/group/edit/:id"
          element={<ModifyGroup />}
          group={group}
          setGroup={setGroup}
        />
        <Route path="/user/edit/:id" element={<EditUser />} />
        <Route path="/group/:id/newpost" element={<NewPosts />} />
        <Route path="/group/:id/editpost" element={<EditPosts />} />
      </Route>
    </Routes>
  );
}

export default App;

//location={location} setLocation={setLocation}

/*
const { user } = useContext(Auth);
  const { logout } = useLogout();
      
    
     useEffect(() => {
    logout();
  }, []);
    */
