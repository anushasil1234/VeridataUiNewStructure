export const msalConfig = {
  auth: {
    clientId: '8d3a386a-ba31-4779-a46a-5d96a9de5261',
    authority: 'https://login.microsoftonline.com/513294a0-3e20-41b2-a970-6d30bf1546fa',
    redirectUri: 'https://newjoinerskycauthenticationstg.pwc.in/dashboard',
  },
  cache: {
    cacheLocation: 'localStorage', // optional
    storeAuthStateInCookie: false, // optional
  },
};
export const loginRequest = {
  scopes: ['User.Read'],
};
