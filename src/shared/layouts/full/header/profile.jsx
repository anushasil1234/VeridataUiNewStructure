import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import ProfileImg from 'assets/images/profile/user-1.jpg';
import { AccountCircle, ManageAccounts } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { userNameTextStyle } from 'app';
import { toManageProfile } from 'shared/constants/constants';

const Profile = () => {
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

  const {roleName, userName} = loggedInData && loggedInData.length > 0 && loggedInData[0];
  const { navigateTo } = commonHooksFunctionSlice[0];

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
            width: 35,
            height: 35,
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
        <MenuItem>
          <ListItemIcon>
            <AccountCircle width={20} />
          </ListItemIcon>
          <ListItemText sx={userNameTextStyle}>{`${userName}(${roleName})`}</ListItemText>
        </MenuItem>
        <MenuItem onClick={()=>navigateTo(toManageProfile)}>
          <ListItemIcon>
            <ManageAccounts width={20} />
          </ListItemIcon>
          <ListItemText sx={userNameTextStyle}>Manage Profile</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button onClick={loggeoutFunction.handleClickOnLogout} variant="outlined" color="primary" fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
