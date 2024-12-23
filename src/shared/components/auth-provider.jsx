import SetPassword from 'modules/set-password/set-password';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import BlankLayoutWithHeader from 'shared/layouts/blank/BlankLayoutWithHeader';
import { useMsal } from '@azure/msal-react';
import { toUserLogin } from 'shared/constants/constants';

const RequireAuth = (Component) => {
  const Authenticate = (props) => {
    const { accounts: _accounts } = useMsal();
    const loggedInData = useSelector((state) => state.loggedInData)
    const { isDefaultPassword, isPasswordExpire } = loggedInData.length > 0 && loggedInData[0];
    const loggedInTokendData = useSelector((state) => state.loggedinTokenData)
   
    const [accounts, setAccounts] = useState(_accounts);
    const [token, setToken] = useState(loggedInTokendData[0] && loggedInTokendData[0].token);
    // const [isDefaultPassword, setIsDefaultPassword] = useState(_isDefaultPassword);
    // const [isPasswordExpire, setIsPasswordExpire] = useState(_isPasswordExpire);
    // console.log('loggedInTokendData[0]', accounts.length, loggedInTokendData[0], accounts.length > 0 || loggedInTokendData[0] && loggedInTokendData[0].token);
    // const channel = new BroadcastChannel('auth-channel');
    // channel.onmessage = (event) => {
    //   console.log('event2342', event);

    //   if (event.data.type === 'AUTH_DATA') {
    //     const authData = event.data.data;
    //     console.log('Received login data:', authData);
    //     const { loggedInTokendData, isDefaultPassword, isPasswordExpire, accounts } = authData;
    //     setToken(loggedInTokendData[0] && loggedInTokendData[0].token);
    //     setAccounts(accounts);
    //     setIsDefaultPassword(isDefaultPassword);
    //     setIsPasswordExpire(isPasswordExpire);
    //     // Optionally, update the Redux store
    //     // store.dispatch({ type: 'SET_LOGIN_DATA', payload: loginData });
    //   }
    // };
    // console.log('token123', token, accounts);
    
    // useEffect(() => {

    // },[]);
    return (
      accounts.length > 0 || token ?
        (isDefaultPassword || isPasswordExpire) ?
          <BlankLayoutWithHeader><SetPassword /></BlankLayoutWithHeader> :
          <Component setToken={setToken} {...props} /> :
        <Navigate to={toUserLogin} />
    )
  }
  return <Authenticate />
};

export default RequireAuth;