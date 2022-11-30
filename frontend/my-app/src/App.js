//import logo from './logo.svg';
import {Route, Routes} from 'react-router-dom'; 
import './App.css';
import Hero from "./Components/Start/Hero"
import Login from "./Components/Start/Login"
import Signup from "./Components/Start/Signup"
import LayoutHome from "./Components/Start/LayoutHome"
import LayoutApp from "./Components/LayoutApp"
import AccessPage from './Components/AccessPage';
import UserProfile from './Components/UserProfile';

function App() {
  return (
    <Routes>
      <Route element={<LayoutHome/>}>
        <Route path="" />
        <Route path="/" />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Route>
      <Route element={<LayoutApp/>}>
        <Route path="/logged/user" element={<AccessPage/>}/>
        
      </Route>
      <Route path="/logged/user/profile" element={<UserProfile/>}/>

      
    </Routes>
  );
}

export default App;
