import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { ArrangeSidebarItems, GetAttribute } from 'shared/utils';
import { useDispatch, useSelector } from 'react-redux';
import { storeSideMenuItems } from 'store/slices/side-menu-items-slice';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const pathDirect = pathname;
  const [Menuitems, setMenuitems] = useState(null);

  const loggedInData = useSelector((state) => state.loggedInData);
  const apiSlice = useSelector((state) => state.apiSlice);

  const { userId } = loggedInData && loggedInData[0];
  const { getMenuList } = apiSlice && apiSlice[0];
  const setMenu = async () => {
    const response = await getMenuList(userId);
    if (response) {
      const { responseInfo } = response;
      const arrangedMenuItem = ArrangeSidebarItems(responseInfo);
      // set to redux store
      dispatch(storeSideMenuItems({ menuItems: responseInfo }));
      setMenuitems(arrangedMenuItem);
    }
  }
  useEffect(() => {
    setMenu();
    return () => {
      setMenuitems(null);
    }
  }, [])

  const handleToggle = (e) => {
    const menuHeaderID = GetAttribute(e, "id");
    const toggledMenuItem = Menuitems && Menuitems.map((element) => {
 
       if (menuHeaderID == element.id) {
        element.open = !element.open;
      }else {
        element.open = false;
        if (element.pid == menuHeaderID) {
          element.show = !element.show;
        }else if (element.pid == '0' && element.title != 'undefined') {
          element.show = true;
        }else {
          element.show = false;
          }
      }
      return element
    })
    setMenuitems(toggledMenuItem)
  }
  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems && Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item && item.subheader) {
            return <NavGroup handleToggle={handleToggle} item={item} key={item && item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              item && item.show && <NavItem item={item} key={item && item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
