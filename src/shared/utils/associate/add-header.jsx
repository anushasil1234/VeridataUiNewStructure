import { getLocalStorageItem } from "..";

export const AuthHeader = () => {
  const userDetails = getLocalStorageItem("pfc-user");
  const tokenDetails = getLocalStorageItem("pfc-token");
  //const customDetails = userDetails?.userCode + "|~|" + userDetails?.userId + "|~|";
  return (
    tokenDetails && tokenDetails.token ?
      // { Authorization: 'Bearer ' + customDetails + tokenDetails.token } :{}
      { Authorization: 'Bearer ' + tokenDetails.token } :{}

  )
}