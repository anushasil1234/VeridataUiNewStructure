import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Chip
} from "@mui/material";
import PropTypes from "prop-types";
import { AppStyle, menuIconSx } from "app";

import Profile from "./profile";
import SearchAppBar from "shared/utils/search/search-app-bar";
import { useSelector } from "react-redux";
import { Menu } from "@mui/icons-material";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import CancelIcon from '@mui/icons-material/Cancel';
import { submitConfirmationMsg, toDashboard } from "shared/constants/constants";

const Header = (props) => {
  const commonHooksFunctionSlice = useSelector(
    (state) => state.commonHooksFunctionSlice
  );
  const functionSlice = useSelector(state => state.functionSlice);
  const { openConsentModal } = functionSlice[0];
  const AppBarStyled = styled(AppBar)(() => ({
     boxShadow: "none",
     position: "sticky", 
     top: 0,  // Stick at the top
     zIndex: 1100,
    background: AppStyle.palette.background.paper,
     backgroundImage:
       "linear-gradient(69deg,#836ade 0%,#b049c0 65%,#f67363 100%)",
     justifyContent: "center",
    backdropFilter: "blur(4px)",
     [AppStyle.breakpoints.up("lg")]: {
       minHeight: "70px",
     },
  }));
  const { navigateTo } = commonHooksFunctionSlice[0];



  const ToolbarStyled = styled(Toolbar)(() => ({
    width: "100%",
    color: AppStyle.palette.text.secondary,
  }));
  const loggedInData = useSelector(state => state.loggedInData)
  const userDetails = loggedInData[0];
  const consentStatus = userDetails && userDetails?.consentStatus;


  const appointeeConsent = () => {
    const ConsentModalContent = {
      dialogTitle: "Consent Notification",
      dialogContentText: submitConfirmationMsg,
      consentStatus: consentStatus
    };
    openConsentModal(ConsentModalContent, () => navigateTo(toDashboard))
  }
  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <Menu sx={menuIconSx} />
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {loggedInData[0] && loggedInData[0]?.roleId !== 5 ?
            <SearchAppBar />
            :
            props?.showRevokeConsentCallToAction !== false &&
            <Box>
              {consentStatus === 1 ?
                <Chip color="primary"
                  label="Revoke Consent"
                  onClick={appointeeConsent}
                  icon={<CancelIcon color="error" />}
                />
                :
                <Chip color="primary"
                  label="Give Consent"
                  onClick={appointeeConsent}
                  icon={<AddModeratorIcon color="success" />}
                 
                />
              }
            </Box>
          }
          <Profile setToken={props.setToken} />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
