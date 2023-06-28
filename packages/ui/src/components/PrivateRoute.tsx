import React   from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";
 

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {

  const { authContext } =  useAppContext();
  
  return !authContext.userData?.authenticated ? (
        <Navigate replace to={"/unauthorized"} />
    ) : (
    children
  );
}

export default PrivateRoute;