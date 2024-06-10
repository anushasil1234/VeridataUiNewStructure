import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthorizedRedirection = (Component) => {
  const Authenticate = (props)=>{
    const loggedInTokendData  = useSelector((state)=> state.loggedinTokenData)
    const [token, setToken] = useState(loggedInTokendData[0] && loggedInTokendData[0].token);

    //  if(token)
    //   {
    //     return <Navigate to="/dashboard" />
    //   }else{
    //     return <Component setToken = {setToken} {...props} />
    //   }
    return (
      !token ? 
      <Component setToken = {setToken} {...props} />: 
      <Navigate to="/dashboard" />
      )
      
  }
  return <Authenticate /> 
};

export default AuthorizedRedirection;