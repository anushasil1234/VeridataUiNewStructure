import { Box, Button, Grid, Link, Paper, Typography } from "@mui/material";
import React from "react";
import { PageHeading1, setLocalStorageItem, removeLocalStorageItems } from "shared/utils";
import { styles, imageContainer, loginImageStyle } from "app";
import { useNavigate } from "react-router-dom";
import { toDashboard, toLogin, toForgotPassword } from "shared/constants/constants";
import loginImage from 'assets/images/backgrounds/loginimage.png';
import logo from 'assets/images/logos/pfc_logo1.png';
import { removeLoggedinData, storeLoggedinData } from "store/slices/login-slice";
import { removeLoggedinTokenData, storeLoggedinTokenData } from "store/slices/login-token-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { removeDropdownList } from "store/slices/dropdown-slice";
import { removeApi } from "store/slices/api-slice";
import { removeFunction } from "store/slices/function-slice";
import { removePopUpSetFunction } from "store/slices/popup-slice";
import { removeLoggeoutData, storeLoggeoutData } from "store/slices/logout-slice";
import { removeSideMenuItems } from "store/slices/side-menu-items-slice";
import { useMsal } from '@azure/msal-react';
import { loginRequest } from "authConfig";

export const LoginView = () => {
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordType, setPasswordType] = useState("password");
  // const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
  // const [passwordFieldIcon, setPasswordFieldIcon] = useState(<VisibilityOff sx={loginFieldIconStyle} />);
  // const [timeoutTimer, setTimeoutTimer] = useState();
  const { accounts, instance } = useMsal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handlePasswordVisibility = () => {
  //   setIsPasswordVisibilityOn(!isPasswordVisibilityOn);
  // }
  // useEffect(() => {
  //   if (isPasswordVisibilityOn) {
  //     setPasswordType("text");
  //     setPasswordFieldIcon(<Visibility sx={loginFieldIconStyle} />);
  //   } else {
  //     setPasswordType("password");
  //     setPasswordFieldIcon(<VisibilityOff sx={loginFieldIconStyle} />);
  //   }
  // }, [isPasswordVisibilityOn])


  const apiSlice = useSelector(state => state.apiSlice);
  const functionSlice = useSelector(state => state.functionSlice);
  const popUpSlice = useSelector(state => state.popUpSlice);


  const { postLoginByEmailDetails } = apiSlice[0];
  const { setDropdownList } = functionSlice[0];


  const handleClickOnLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(removeLoggedinData());
    dispatch(removeLoggedinTokenData());
    removeLocalStorageItems(["pfc-user"]);
    removeLocalStorageItems(["pfc-token"]);
    dispatch(removeApi());
    dispatch(removeDropdownList());
    dispatch(removeFunction());
    dispatch(removePopUpSetFunction());
    dispatch(removeSideMenuItems());
    navigate(toLogin);
    // // Redirect-based logout (no popup)
    // instance.logoutRedirect({
    //   postLogoutRedirectUri: toLogin,  // Redirect user to login page after logout
    // }).catch(error => {
    //   // Handle errors here if needed
    //   console.error("Logout error:", error);
    // });
    // instance.logoutRedirect().then(() => {
    //   localStorage.clear();
    //   sessionStorage.clear();
    //   navigate(toLogin);

    // });
    // navigate(`${toLogin}`)
    // instance.logoutPopup({
    //   localStorage.clear(),
    // sessionStorage.clear(),
    //   postLogoutRedirectUri: "/auth/login",  // Redirect user to home after logout
    // });

  }

  const handleGetUserDetails = async (username) => {
    // const payLoad = {
    //   email: userName,
    // };
    const response = await postLoginByEmailDetails(username);
    if (response) {
      const { responseInfo } = response;
      const { userDetails, tokenDetails } = responseInfo;
      // const { isDefaultPassword, isPasswordExpire } = userDetails;
      setLocalStorageItem("pfc-user", userDetails);
      setLocalStorageItem("pfc-token", tokenDetails);
      dispatch(storeLoggedinData(userDetails));
      dispatch(storeLoggedinTokenData(tokenDetails));
      dispatch(removeLoggeoutData());
      dispatch(storeLoggeoutData({ handleClickOnLogout }));
      await setDropdownList();
      navigate(`${toDashboard}`)
      // if (!isDefaultPassword === true || isPasswordExpire === true) {
      //   navigate(`${toSetPassword}`);
      // } else {
      //   await setDropdownList();
      //   navigate(`${toDashboard}`);
      // }
    } else {
      navigate("/");
    }
  }
  const handleSSOLogin = () => {
    if (accounts && accounts.length > 0) {
      handleGetUserDetails(accounts[0].username);
    } else {
      instance.loginPopup(loginRequest)
        .then((response) => {
          //   console.log("Logged in", response);
          //  Handle successful login, navigate to a secure page
          handleGetUserDetails(response.account.username);
          //  handleGetUserDetails(userName);
        })
        .catch((e) => {
          alert("SSO Login failed, please try Again", e);
        });
    }
  };

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      handleGetUserDetails(accounts[0].username);
    }
    // else {
    //   handleSSOLogin()
    // }
  }, []);

  return (
    <>
      <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ ...styles.containerStyles }}>
        <Paper elevation={8} sx={{ ...styles.paperStyle }}>
          <Grid container align="center" sx={styles.stackimageContainer}>
            <Grid item md={8} sx={{ ...styles.loginsection, display: { xs: "none", md: "block" } }}>
              <img
                style={loginImageStyle}
                src={loginImage}
                alt="text"
              />
            </Grid>
            <Grid item md={4} sx={styles.loginsection}>
              <Box sx={imageContainer}>
                <img
                  style={{ height: "50%", width: "50%", objectFit: "contain" }}
                  src={logo}
                  alt="text"
                />
              </Box>
              <Box my={1.25}>
                <PageHeading1 heading={"sign in"} />
              </Box>
              <Grid>
                {/* <form onSubmit={handleSubmit}>
                  <InputField inputProps={userNameInputProps} props={userNameInput} />
                  <InputField inputProps={passwordInputProps} props={passwordInput} />
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={styles.btnstyle}
                    fullWidth
                  >
                    Sign in
                  </Button>
                </form> */}
                {/* <hr /> */}

                {/* SSO login button */}
                <Button
                  color="primary"
                  variant="contained"
                  style={styles.btnstyle}
                  fullWidth
                  onClick={handleSSOLogin}
                >Admin User Sign in
                </Button>
                <Box mt={2}>
                  <Typography variant="body2" align="center">
                    <Link href={toForgotPassword} underline="hover">
                      Forgot Password?
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};
export default LoginView;

