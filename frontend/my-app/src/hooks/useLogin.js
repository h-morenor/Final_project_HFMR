import { useContext, useState } from "react";
import { Auth } from "../context/Auth";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useContext(Auth);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    console.log(response);

    if (!response.ok) {
      setIsLoading(false);
      setError(json);
    }
    if (response.ok) {
      // Save the user and token in the localstorage
      localStorage.setItem("user", JSON.stringify(json));

      // Updating the global Auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { error, isLoading, login };
};
