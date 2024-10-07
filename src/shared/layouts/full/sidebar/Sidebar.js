import { useMediaQuery, Box, Drawer, Typography } from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import { AppStyle, menuDrawerBoxContainer, menuFooterTextStyle, sidebarContainerStyle, sidebarDrawerPaperStyle, sidebarWidth } from 'app';

const Sidebar = (props) => {

  const lgUp = useMediaQuery(AppStyle.breakpoints.up("lg"));


  if (lgUp) {
    return (
      <Box
        sx={menuDrawerBoxContainer}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{sx:{...sidebarContainerStyle}}}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            // sx={{
            //   height: '100%',
            // }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box px={3}>
              <Logo />
            </Box>
            <Box >
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
            </Box>
          </Box>
          <Typography sx={menuFooterTextStyle}>Powered by Elogix Software</Typography>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: sidebarDrawerPaperStyle,
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
