import { NavLink } from "react-router-dom";
const { createContext, useReducer, useEffect } = require("react");

export const Auth = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("action payload", action.payload);
      return { user: action.payload };
    case "SIGNUP":
      return { user: action.payload };
    case "UPDATE":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    //  default:
    //  return { user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // Update auth status when app loads for first time (authenticated if token found in localStorage)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      ({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("Auth state", state);

  return (
    <Auth.Provider value={{ ...state, dispatch }}>{children}</Auth.Provider>
  );
};

/*else{ {
    return <Navigate replace to="/" />;
}}*/
