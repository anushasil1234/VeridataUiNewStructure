import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthorizedRedirection = (Component) => {
  const Authenticate = (props)=>{
    const loggedInTokendData  = useSelector((state)=> state.loggedinTokenData)
    // console.log("Authenticated",loggedInTokendData);
    const [token, setToken] = useState(loggedInTokendData[0] && loggedInTokendData[0].token);
    return (
      !token ? 
      <Component setToken = {setToken} {...props} />: 
      <Navigate to="/dashboard" />
      )
      
  }
  return <Authenticate /> 
};

export default AuthorizedRedirection;