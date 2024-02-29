import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RequireAuth = (Component) => {
  const Authenticate = (props)=>{
    const loggedInTokendData  = useSelector((state)=> state.loggedinTokenData)
    const [token, setToken] = useState(loggedInTokendData[0] && loggedInTokendData[0].token);

    return (
      loggedInTokendData[0] && loggedInTokendData[0].token ? 
      <Component setToken = {setToken} {...props} />: 
      <Navigate to="/auth/login" />
      )  
  }
  return <Authenticate /> 
};

export default RequireAuth;