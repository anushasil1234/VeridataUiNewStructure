import SetPassword from 'modules/set-password/set-password';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import BlankLayoutWithHeader from 'shared/layouts/blank/BlankLayoutWithHeader';
import { useMsal } from '@azure/msal-react';

const RequireAuth = (Component) => {
  const Authenticate = (props) => {
    const { accounts } = useMsal();
    const loggedInData = useSelector((state) => state.loggedInData)
    const loggedInTokendData = useSelector((state) => state.loggedinTokenData)
    const [token, setToken] = useState(loggedInTokendData[0] && loggedInTokendData[0].token);
    const { isDefaultPassword, isPasswordExpire } = loggedInData.length > 0 && loggedInData[0];
    return (
      accounts.length > 0 || loggedInTokendData[0] && loggedInTokendData[0].token ?
        (isDefaultPassword || isPasswordExpire) ?
          <BlankLayoutWithHeader><SetPassword /></BlankLayoutWithHeader> :
          <Component setToken={setToken} {...props} /> :
        <Navigate to="/auth/login" />
    )
  }
  return <Authenticate />
};

export default RequireAuth;