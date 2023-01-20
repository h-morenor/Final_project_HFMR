import { useContext, useState } from "react";
import { Auth } from "../context/Auth"
//import { NavLink } from 'react-router-dom'

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const  { dispatch }  = useContext(Auth);

  const signup = async (email, password, passwordConfirm) => {
    setIsLoading(true);
    setError(null);

    if (password!==passwordConfirm){
      setIsLoading(false);
      setError("Password confirm not valid")
      return
    }

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json",  },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json);
    }
    if (response.ok) {
      // Save the user and token in the localstorage
      localStorage.setItem("user", JSON.stringify(json));

      // Updating the global Auth context
      dispatch({ type: "SIGNUP", payload: json });

      setIsLoading(false);
     
      
    }
  };

  return { error, isLoading, signup };
};