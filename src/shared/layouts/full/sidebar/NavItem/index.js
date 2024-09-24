import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import {
  ListItemIcon,
  List,
  styled,
  ListItemText,
  ListItemButton
} from '@mui/material';
import { AppStyle, listitemTextstyle } from 'app';// add class listitemtextstyle

const NavItem = ({ item, level, pathDirect, onClick }) => {
  const Icon = item.icon;
  const theme = AppStyle;
  const itemIcon = <Icon stroke={1.5} size="1rem" />;

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: 'nowrap',
    marginBottom: '2px',
    padding: '8px 10px',
    borderRadius: '8px',
    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
    color: theme.palette.text.white,
    paddingLeft: '5px',
    display: 'flex',      //change
    alignItems: 'center',  //change
    overflow: 'hidden',    //change
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: "#ddd5b0",  //new color add
    },
    '&.Mui-selected': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
  }));

  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemStyled
        button
        component={item.external ? 'a' : NavLink}
        to={item.href}
        href={item.external ? item.href : ''}
        disabled={item.disabled}
        selected={pathDirect === item.href}
        target={item.external ? '_blank' : ''}
        onClick={onClick}
        sx={{ flexGrow: 1 }} //add
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText sx={{ ...listitemTextstyle }}>{/*add sx class*/}
          <Link to={`${item.href}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {item.title}
          </Link>
        </ListItemText>
      </ListItemStyled>
    </List>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
};

export default NavItem;
