import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { hasActionpermission } from 'shared/utils/associate/has-action-permition';


const ActionPermission = (Component) => {
    const ActionPerssionComponent = (props) => {

        const { pathname } = useLocation();
        const sideMenuItemsSlice = useSelector((state) => state.sideMenuItemsSlice);
        const menuItems = sideMenuItemsSlice[0] && sideMenuItemsSlice[0].menuItems;
        const [hasPermission, setHasPermission] = useState();
        useEffect(() => {
            if (menuItems) {
                const actionpermission = hasActionpermission(menuItems, pathname);
                setHasPermission(actionpermission);
            }
        }, [menuItems, pathname])

        return (
            <>
                <Component {...props} hasPermission={hasPermission} />
            </>
        )
    }
    return ActionPerssionComponent
}

export default ActionPermission
