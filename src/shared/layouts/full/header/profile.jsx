import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import ProfileImg from 'assets/images/profile/user-2.jpg';
import { AccountCircle, ManageAccounts, HelpRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { userNameTextStyle } from 'app';
import { toHelp, toManageProfile } from 'shared/constants/constants';
import { useMsal } from '@azure/msal-react';
import { roleTypeEnums } from 'shared/constants/constants';

const Profile = () => {
  const { instance } = useMsal(); // Get the MSAL instance
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = ({ currentTarget }) => {
    setAnchorEl2(currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const loggeoutData = useSelector(state => state.loggeoutData);
  const loggedInData = useSelector(state => state.loggedInData);
  const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);
  const loggeoutFunction = loggeoutData && loggeoutData.length > 0 && loggeoutData[0];
  const { roleName, userName, userTypeId, isSubmit, isProcessed } = loggedInData && loggedInData.length > 0 && loggedInData[0];
  const { navigateTo } = commonHooksFunctionSlice[0];
  const functionSlice = useSelector(state => state.functionSlice);
  const { openConfirmationYesNoModal } = functionSlice[0];

  const handleLogout = () => {
    if (roleTypeEnums.candidate.includes(userTypeId) && (!(isSubmit === true || isProcessed === true))) {
      const VerificationPendingModelContent = {
        dialogTitle: "Log out Confirmation",
        dialogContentText: <><Typography>Your verification is still not complete. If you don't/can't completed now, please check solutions/FAQ and come back later to complete the verification as soon as possible. Do you still want to logout.</Typography>
          <Typography> </Typography></>,
        dialogComponent: <> </>,
        firstButtonName: "Yes",
        secondButtonName: "No",
        fullWidth: true,
        mxWidth: 'md'
      };
      openConfirmationYesNoModal(VerificationPendingModelContent, handleYes, handleNo);
    } else {
      loggeoutFunction.handleClickOnLogout();
    }
  };
  const handleYes = () => {
    loggeoutFunction.handleClickOnLogout();
  }
  const handleNo = () => {
    // loggeoutFunction.handleClickOnLogout();
  }
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 36,
            height: 34,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '250px',
          },
        }}
      >

        <MenuItem
          style={{ cursor: 'text' }}
        >
          <ListItemIcon>
            <AccountCircle width={20} />
          </ListItemIcon>
          <ListItemText sx={userNameTextStyle}>{`${userName} (${roleName})`}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose2(); // Close the menu
            navigateTo(toManageProfile); // Navigate to the Manage Profile page
          }}>
          <ListItemIcon>
            <ManageAccounts width={20} />
          </ListItemIcon>
          <ListItemText sx={userNameTextStyle}>Manage Profile</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose2(); // Close the menu
            navigateTo(toHelp); // Navigate to the FAQ page
          }}>
          <ListItemIcon>
            <HelpRounded width={20} />
          </ListItemIcon>
          <ListItemText sx={userNameTextStyle}>FAQ</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>

          <Button onClick={handleLogout} variant="outlined" color="primary" fullWidth>
            Logout
          </Button>

        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
